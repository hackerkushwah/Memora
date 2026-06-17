"use server";

import crypto from "crypto";
import bcrypt from "bcryptjs";
import { createSupabaseServerClient, supabaseAdmin } from "@/lib/supabase-server";

type Memory = {
  id: string;
  thumbnailUrl: string;
  imageUrls: string[];
  imageDescriptions?: string[];
  title: string;
  description: string;
  category: string;
  uploadedBy: string;
  ownerEmail?: string;
  date: string;
  passwordHash: string;
};

// ── Helper: Convert Supabase row (snake_case) to app Memory (camelCase) ──
function rowToMemory(row: any): Memory {
  return {
    id: row.id,
    thumbnailUrl: row.thumbnail_url,
    imageUrls: row.image_urls || [],
    imageDescriptions: row.image_descriptions || [],
    title: row.title,
    description: row.description || "",
    category: row.category || "The Journey",
    uploadedBy: row.uploaded_by,
    ownerEmail: row.owner_email,
    date: row.date,
    passwordHash: row.password_hash,
  };
}

// ── Security: Rate limiting for password attempts (persisted in Supabase) ──
const MAX_PASSWORD_ATTEMPTS = 5;
const PASSWORD_LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

async function checkPasswordRateLimit(memoryId: string): Promise<{ allowed: boolean; error?: string }> {
  const now = new Date();

  const { data } = await supabaseAdmin
    .from("rate_limits")
    .select("*")
    .eq("memory_id", memoryId)
    .single();

  if (!data || now > new Date(data.reset_at)) {
    // No entry or expired — reset
    await supabaseAdmin.from("rate_limits").upsert({
      memory_id: memoryId,
      attempt_count: 0,
      reset_at: new Date(Date.now() + PASSWORD_LOCKOUT_MS).toISOString(),
    });
    return { allowed: true };
  }

  if (data.attempt_count >= MAX_PASSWORD_ATTEMPTS) {
    const minutesLeft = Math.ceil((new Date(data.reset_at).getTime() - now.getTime()) / 60000);
    return { allowed: false, error: `Too many attempts. Try again in ${minutesLeft} minutes.` };
  }

  return { allowed: true };
}

async function recordPasswordAttempt(memoryId: string): Promise<void> {
  // Increment attempt_count using RPC or read-then-write
  const { data } = await supabaseAdmin
    .from("rate_limits")
    .select("attempt_count")
    .eq("memory_id", memoryId)
    .single();

  if (data) {
    await supabaseAdmin
      .from("rate_limits")
      .update({ attempt_count: data.attempt_count + 1 })
      .eq("memory_id", memoryId);
  }
}

async function resetPasswordAttempts(memoryId: string): Promise<void> {
  await supabaseAdmin.from("rate_limits").delete().eq("memory_id", memoryId);
}

// ── Database queries ──
export async function getMemories(): Promise<Memory[]> {
  const { data, error } = await supabaseAdmin
    .from("memories")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getMemories error:", error.message, error.code, error.details);
    return [];
  }

  return (data || []).map(rowToMemory);
}

export async function getMemoryById(id: string): Promise<Memory | null> {
  const { data, error } = await supabaseAdmin
    .from("memories")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return rowToMemory(data);
}

// ── Security: Server-side safe memory fetching (strips sensitive fields) ──
export async function getMyMemories(): Promise<Omit<Memory, 'passwordHash'>[]> {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) return [];

  const { data, error } = await supabaseAdmin
    .from("memories")
    .select("*")
    .eq("owner_email", user.email)
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map(rowToMemory).map(({ passwordHash, ...safe }) => safe);
}

// ── Security: Server-side password verification ──
export async function verifyPassword(
  memoryId: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  // Rate limit check
  const rateCheck = await checkPasswordRateLimit(memoryId);
  if (!rateCheck.allowed) {
    return { success: false, error: rateCheck.error };
  }

  const memory = await getMemoryById(memoryId);
  if (!memory) return { success: false, error: "Memory not found." };

  const isMatch = await bcrypt.compare(password, memory.passwordHash);

  if (!isMatch) {
    await recordPasswordAttempt(memoryId);
    return { success: false, error: "Incorrect vault key." };
  }

  // Success — reset rate limiter
  await resetPasswordAttempts(memoryId);
  return { success: true };
}

// ── Upload with bcrypt hashing (images uploaded client-side to Supabase Storage) ──
export async function uploadMemories(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    // Security: Require authentication
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) {
      return { success: false, error: "You must be signed in to upload." };
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string || "";
    const category = formData.get("category") as string || "The Journey";
    const password = formData.get("password") as string;
    // Images are now URLs (uploaded client-side to Supabase Storage)
    const imageUrls = formData.getAll("imageUrls") as string[];
    const imageDescriptions = formData.getAll("imageDescriptions") as string[];

    if (!title || !password || !imageUrls || imageUrls.length === 0) {
      return { success: false, error: "Missing required fields or images." };
    }

    // Security: Hash password with bcrypt
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const date = new Date().toLocaleDateString("en-US", { month: 'short', year: 'numeric' });

    const { error } = await supabaseAdmin.from("memories").insert({
      thumbnail_url: imageUrls[0],
      image_urls: imageUrls,
      image_descriptions: imageDescriptions.length === imageUrls.length
        ? imageDescriptions
        : Array(imageUrls.length).fill(""),
      title,
      description,
      category,
      uploaded_by: user.user_metadata?.full_name || user.user_metadata?.name || "Unknown",
      owner_email: user.email,
      date,
      password_hash: passwordHash,
    });

    if (error) {
      console.error("Upload insert error:", error);
      return { success: false, error: "Upload failed. Please try again." };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Upload error:", err);
    return { success: false, error: "Upload failed. Please try again." };
  }
}

// ── Delete with server-side session auth ──
export async function deleteMemory(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Security: Require authentication and ownership
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) {
      return { success: false, error: "Authentication required." };
    }

    const memory = await getMemoryById(id);
    if (!memory) return { success: false, error: "Memory not found" };

    // Security: Only the owner can delete
    if (memory.ownerEmail !== user.email) {
      return { success: false, error: "You can only delete your own stacks." };
    }

    // Delete image files from Supabase Storage
    if (memory.imageUrls && memory.imageUrls.length > 0) {
      const storagePaths = memory.imageUrls
        .map(url => extractStoragePath(url))
        .filter(Boolean) as string[];

      if (storagePaths.length > 0) {
        await supabaseAdmin.storage.from("memories").remove(storagePaths);
      }
    }

    // Delete from database (cascades to rate_limits, recovery_codes, email_cooldowns)
    const { error } = await supabaseAdmin.from("memories").delete().eq("id", id);

    if (error) {
      console.error("Delete error:", error);
      return { success: false, error: "Delete failed. Please try again." };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Delete error:", err);
    return { success: false, error: "Delete failed. Please try again." };
  }
}

// ── Delete single photo with session auth ──
export async function deleteSinglePhoto(memoryId: string, urlToRemove: string): Promise<{ success: boolean; shouldClose: boolean; error?: string }> {
  try {
    // Security: Require authentication and ownership
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) {
      return { success: false, shouldClose: false, error: "Authentication required." };
    }

    const memory = await getMemoryById(memoryId);
    if (!memory) return { success: false, shouldClose: false, error: "Memory not found" };

    // Security: Only the owner can delete photos
    if (memory.ownerEmail !== user.email) {
      return { success: false, shouldClose: false, error: "You can only modify your own stacks." };
    }

    // Check if the URL exists in the memory
    if (!memory.imageUrls || !memory.imageUrls.includes(urlToRemove)) {
      return { success: false, shouldClose: false, error: "Image not found in this stack" };
    }

    // Delete file from Supabase Storage
    const storagePath = extractStoragePath(urlToRemove);
    if (storagePath) {
      await supabaseAdmin.storage.from("memories").remove([storagePath]);
    }

    // Filter out the URL
    const urlIndex = memory.imageUrls.indexOf(urlToRemove);
    const newImageUrls = memory.imageUrls.filter((_, i) => i !== urlIndex);
    const newDescriptions = memory.imageDescriptions
      ? memory.imageDescriptions.filter((_, i) => i !== urlIndex)
      : [];

    let shouldClose = false;

    if (newImageUrls.length === 0) {
      // If no images left, delete the entire memory
      await supabaseAdmin.from("memories").delete().eq("id", memoryId);
      shouldClose = true;
    } else {
      // Update the memory with remaining images
      await supabaseAdmin.from("memories").update({
        image_urls: newImageUrls,
        image_descriptions: newDescriptions,
        thumbnail_url: newImageUrls[0],
      }).eq("id", memoryId);
    }

    return { success: true, shouldClose };
  } catch (err: any) {
    console.error("Delete error:", err);
    return { success: false, shouldClose: false, error: "Delete failed. Please try again." };
  }
}

// ── Add photo with session auth (image uploaded client-side) ──
export async function addPhotoToMemory(
  memoryId: string,
  imageUrl: string,
  description: string = ""
): Promise<{ success: boolean; error?: string }> {
  try {
    // Security: Require authentication and ownership
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) {
      return { success: false, error: "Authentication required." };
    }

    const memory = await getMemoryById(memoryId);
    if (!memory) return { success: false, error: "Memory not found" };

    // Security: Only the owner can add photos
    if (memory.ownerEmail !== user.email) {
      return { success: false, error: "You can only modify your own stacks." };
    }

    const newImageUrls = [...memory.imageUrls, imageUrl];
    const newDescriptions = memory.imageDescriptions
      ? [...memory.imageDescriptions, description]
      : [...Array(memory.imageUrls.length).fill(""), description];

    const { error } = await supabaseAdmin.from("memories").update({
      image_urls: newImageUrls,
      image_descriptions: newDescriptions,
    }).eq("id", memoryId);

    if (error) {
      console.error("Add photo error:", error);
      return { success: false, error: "Add photo failed. Please try again." };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Add photo error:", err);
    return { success: false, error: "Add photo failed. Please try again." };
  }
}

// ── Helper: Extract the storage path from a Supabase public URL ──
// URL format: https://xxx.supabase.co/storage/v1/object/public/memories/uploads/filename.jpg
// We need: uploads/filename.jpg
function extractStoragePath(url: string): string | null {
  try {
    const marker = "/storage/v1/object/public/memories/";
    const idx = url.indexOf(marker);
    if (idx === -1) return null;
    return url.substring(idx + marker.length);
  } catch {
    return null;
  }
}

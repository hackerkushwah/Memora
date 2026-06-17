import { getMemoryById } from "@/actions/memory-actions";
import { LockScreen } from "./LockScreen";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function SharedMemoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const memory = await getMemoryById(resolvedParams.id);
  
  if (!memory) {
    notFound();
  }

  // Security: Check ownership server-side so we never send ownerEmail to client
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isOwner = user?.email === memory.ownerEmail;

  // Security: Strip sensitive fields before sending to client (Fix #2)
  const { passwordHash, ownerEmail, ...safeMemory } = memory;

  return (
    <main className="min-h-screen bg-pure-black flex items-center justify-center p-4">
      <LockScreen memory={safeMemory} isOwner={isOwner} />
    </main>
  );
}

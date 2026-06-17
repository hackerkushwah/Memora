"use server";

import nodemailer from "nodemailer";
import { getMemoryById } from "./memory-actions";
import { supabaseAdmin } from "@/lib/supabase-server";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD, // Gmail App Password (not your regular password)
  },
});

// ── Security: HTML escape to prevent XSS in emails ──
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const EMAIL_COOLDOWN_MS = 60 * 1000; // 60 seconds between sends
const MAX_CODE_ATTEMPTS = 5; // Max wrong code entries before invalidation

// ── Security: 6-digit codes ──
function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Always 6 digits
}

export async function sendRecoveryCode(
  memoryId: string
): Promise<{ success: boolean; maskedEmail?: string; error?: string }> {
  try {
    // Security: Rate limit email sends (persisted in Supabase)
    const { data: cooldown } = await supabaseAdmin
      .from("email_cooldowns")
      .select("last_sent_at")
      .eq("memory_id", memoryId)
      .single();

    if (cooldown) {
      const elapsed = Date.now() - new Date(cooldown.last_sent_at).getTime();
      if (elapsed < EMAIL_COOLDOWN_MS) {
        const secondsLeft = Math.ceil((EMAIL_COOLDOWN_MS - elapsed) / 1000);
        return {
          success: false,
          error: `Please wait ${secondsLeft} seconds before requesting another code.`,
        };
      }
    }

    const memory = await getMemoryById(memoryId);

    if (!memory) {
      return { success: false, error: "Memory stack not found." };
    }

    if (!memory.ownerEmail) {
      return {
        success: false,
        error: "No email linked to this stack. Recovery is not available.",
      };
    }

    // Generate a 6-digit code
    const code = generateCode();

    // Store the code in Supabase with 10-minute expiry and 0 attempts
    await supabaseAdmin.from("recovery_codes").upsert({
      memory_id: memoryId,
      code,
      expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
      attempts: 0,
    });

    // Record cooldown in Supabase
    await supabaseAdmin.from("email_cooldowns").upsert({
      memory_id: memoryId,
      last_sent_at: new Date().toISOString(),
    });

    // Create masked email for UI feedback
    const emailParts = memory.ownerEmail.split("@");
    const name = emailParts[0];
    const maskedName =
      name.length <= 2
        ? name[0] + "***"
        : name[0] + "***" + name[name.length - 1];
    const maskedEmail = maskedName + "@" + emailParts[1];

    // Security: Escape user-provided values in email HTML
    const safeTitle = escapeHtml(memory.title);
    const safeUploadedBy = escapeHtml(memory.uploadedBy);

    // Send the code via email
    await transporter.sendMail({
      from: `"Memora Vault" <${process.env.SMTP_EMAIL}>`,
      to: memory.ownerEmail,
      subject: `🔐 Your Recovery Code — "${memory.title}"`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin:0; padding:0; background-color:#000000; font-family:'Segoe UI', Helvetica, Arial, sans-serif;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#000000; padding:40px 20px;">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; background-color:#0a0a0a; border:1px solid #1a1a1a; border-radius:16px; overflow:hidden;">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #1a0b2e 0%, #070211 100%); padding:40px 40px 30px; text-align:center; border-bottom:1px solid #2d1b4e;">
                      <div style="width:60px; height:60px; margin:0 auto 20px; background:#111; border:2px solid #D4AF37; border-radius:50%; line-height:60px; font-size:28px;">
                        🔐
                      </div>
                      <h1 style="margin:0; color:#D4AF37; font-size:22px; font-weight:700; letter-spacing:3px; text-transform:uppercase;">
                        Recovery Code
                      </h1>
                      <p style="margin:8px 0 0; color:#666; font-size:13px; letter-spacing:1px;">
                        MEMORA — THE ETERNAL BATCH
                      </p>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:36px 40px;">
                      <p style="color:#999; font-size:14px; line-height:1.8; margin:0 0 24px;">
                        A password recovery was requested for your memory stack. Use the code below to unlock your vault.
                      </p>

                      <!-- Stack Info -->
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#111; border:1px solid #222; border-radius:12px; margin-bottom:28px;">
                        <tr>
                          <td style="padding:20px 24px;">
                            <p style="margin:0 0 4px; color:#666; font-size:11px; text-transform:uppercase; letter-spacing:2px;">Stack Name</p>
                            <p style="margin:0 0 16px; color:#fff; font-size:18px; font-weight:600;">${safeTitle}</p>
                            <p style="margin:0 0 4px; color:#666; font-size:11px; text-transform:uppercase; letter-spacing:2px;">Uploaded By</p>
                            <p style="margin:0; color:#fff; font-size:15px;">${safeUploadedBy}</p>
                          </td>
                        </tr>
                      </table>

                      <!-- 6-Digit Code Display -->
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg, #1a0f00 0%, #0d0800 100%); border:1px solid #D4AF37; border-radius:12px; margin-bottom:28px;">
                        <tr>
                          <td style="padding:30px; text-align:center;">
                            <p style="margin:0 0 12px; color:#D4AF37; font-size:11px; text-transform:uppercase; letter-spacing:3px; font-weight:700;">Your Verification Code</p>
                            <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                              <tr>
                                ${code
                                  .split("")
                                  .map(
                                    (digit) =>
                                      `<td style="padding:0 4px;"><div style="width:44px; height:56px; background:#111; border:2px solid #D4AF37; border-radius:10px; font-size:28px; font-weight:800; color:#fff; font-family:'Courier New', monospace; line-height:56px; text-align:center;">${digit}</div></td>`
                                  )
                                  .join("")}
                              </tr>
                            </table>
                            <p style="margin:16px 0 0; color:#666; font-size:11px;">This code expires in <span style="color:#D4AF37; font-weight:700;">10 minutes</span></p>
                          </td>
                        </tr>
                      </table>

                      <p style="color:#555; font-size:12px; line-height:1.6; margin:0; text-align:center;">
                        If you did not request this, ignore this email. Your stack remains secure.
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding:24px 40px; border-top:1px solid #1a1a1a; text-align:center;">
                      <p style="margin:0; color:#333; font-size:11px; letter-spacing:1px;">
                        © ${new Date().getFullYear()} Memora — Proof That We Lived
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    return { success: true, maskedEmail };
  } catch (err: any) {
    console.error("Email recovery error:", err);

    if (err.code === "EAUTH") {
      return {
        success: false,
        error:
          "Email service authentication failed. Check SMTP credentials in .env.local",
      };
    }

    return {
      success: false,
      error: "Failed to send recovery email. Please try again later.",
    };
  }
}

// ── Security: Verify code — auto-unlocks, never reveals password ──
export async function verifyRecoveryCode(
  memoryId: string,
  code: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { data: stored } = await supabaseAdmin
      .from("recovery_codes")
      .select("*")
      .eq("memory_id", memoryId)
      .single();

    if (!stored) {
      return {
        success: false,
        error: "No recovery code found. Please request a new one.",
      };
    }

    // Check expiry
    if (Date.now() > new Date(stored.expires_at).getTime()) {
      await supabaseAdmin.from("recovery_codes").delete().eq("memory_id", memoryId);
      return {
        success: false,
        error: "Code has expired. Please request a new one.",
      };
    }

    // Security: Check attempt count
    if (stored.attempts >= MAX_CODE_ATTEMPTS) {
      await supabaseAdmin.from("recovery_codes").delete().eq("memory_id", memoryId);
      return {
        success: false,
        error: "Too many incorrect attempts. Please request a new code.",
      };
    }

    // Check code
    if (stored.code !== code.trim()) {
      await supabaseAdmin
        .from("recovery_codes")
        .update({ attempts: stored.attempts + 1 })
        .eq("memory_id", memoryId);
      const remaining = MAX_CODE_ATTEMPTS - (stored.attempts + 1);
      return { success: false, error: `Incorrect code. ${remaining} attempts remaining.` };
    }

    // Code is correct — delete the used code
    await supabaseAdmin.from("recovery_codes").delete().eq("memory_id", memoryId);

    // Security: Just confirm success — never return the password
    return { success: true };
  } catch (err: any) {
    console.error("Verify code error:", err);
    return { success: false, error: "Verification failed. Please try again." };
  }
}

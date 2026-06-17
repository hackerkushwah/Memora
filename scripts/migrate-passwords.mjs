// One-time migration: Convert base64-encoded passwords to bcrypt hashes
// Run with: node scripts/migrate-passwords.mjs

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, "..", "data", "memories.json");

async function migrate() {
  console.log("📦 Reading memories.json...");
  const raw = readFileSync(DB_PATH, "utf-8");
  const memories = JSON.parse(raw);

  console.log(`🔐 Migrating ${memories.length} memories from base64 to bcrypt...\n`);

  for (const memory of memories) {
    // Decode the base64 "hash" to get the original plaintext password
    const plaintext = Buffer.from(memory.passwordHash, "base64").toString("utf-8");

    // Check if already bcrypt (starts with $2a$ or $2b$)
    if (memory.passwordHash.startsWith("$2a$") || memory.passwordHash.startsWith("$2b$")) {
      console.log(`  ✅ "${memory.title}" — already bcrypt, skipping`);
      continue;
    }

    // Hash with bcrypt
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(plaintext, salt);

    console.log(`  🔄 "${memory.title}" — base64("${plaintext}") → bcrypt`);
    memory.passwordHash = hash;
  }

  // Write back
  writeFileSync(DB_PATH, JSON.stringify(memories, null, 2));
  console.log("\n✅ Migration complete! All passwords are now bcrypt-hashed.");
  console.log("⚠️  Original plaintext passwords still work — they are just hashed securely now.");
}

migrate().catch(console.error);

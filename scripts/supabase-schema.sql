-- ============================================
-- Memora Vault — Supabase Database Schema
-- Run this ONCE in Supabase SQL Editor
-- (Dashboard → SQL Editor → New Query → Paste → Run)
-- ============================================

-- Memories table (replaces data/memories.json)
CREATE TABLE IF NOT EXISTS memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thumbnail_url TEXT NOT NULL,
  image_urls TEXT[] NOT NULL DEFAULT '{}',
  image_descriptions TEXT[] DEFAULT '{}',
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  category TEXT DEFAULT 'The Journey',
  uploaded_by TEXT NOT NULL,
  owner_email TEXT,
  date TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast owner lookups (profile page)
CREATE INDEX IF NOT EXISTS idx_memories_owner ON memories(owner_email);

-- Users table (replaces data/users.json)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  image TEXT,
  joined_at TIMESTAMPTZ DEFAULT now()
);

-- Rate limits for password attempts (replaces in-memory Map)
CREATE TABLE IF NOT EXISTS rate_limits (
  memory_id UUID PRIMARY KEY REFERENCES memories(id) ON DELETE CASCADE,
  attempt_count INT DEFAULT 0,
  reset_at TIMESTAMPTZ NOT NULL
);

-- Recovery codes for email verification (replaces in-memory Map)
CREATE TABLE IF NOT EXISTS recovery_codes (
  memory_id UUID PRIMARY KEY REFERENCES memories(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  attempts INT DEFAULT 0
);

-- Email cooldowns (replaces in-memory Map)
CREATE TABLE IF NOT EXISTS email_cooldowns (
  memory_id UUID PRIMARY KEY REFERENCES memories(id) ON DELETE CASCADE,
  last_sent_at TIMESTAMPTZ NOT NULL
);

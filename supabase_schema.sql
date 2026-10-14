-- ==============================================================================
-- ASTRION 2K26 — IIC Workshop Registration Database Schema
-- Supabase / PostgreSQL Migration Script
-- 
-- Workshop: Venture Launchpad: From Idea Generation to Business Creation
-- Organizer: Institution's Innovation Council (IIC), VVIT University
-- ==============================================================================

-- 1. Enable UUID extension if not already present
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    college VARCHAR(200) NOT NULL,
    department VARCHAR(120) NOT NULL,
    year VARCHAR(60) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Case-insensitive unique constraint on email
-- This prevents any duplicate registrations regardless of letter casing or accidental whitespace.
CREATE UNIQUE INDEX IF NOT EXISTS idx_registrations_email_unique 
    ON registrations (LOWER(TRIM(email)));

-- 4. Fast lookup index for registration timeline and exports
CREATE INDEX IF NOT EXISTS idx_registrations_created_at 
    ON registrations (created_at DESC);

-- 5. Enable Row Level Security (RLS) for data protection
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies
-- Backend using SUPABASE_SERVICE_ROLE_KEY has full access by default.
-- For environments using anon key from backend, grant INSERT permission:
DROP POLICY IF EXISTS "Allow backend and public registration insert" ON registrations;
CREATE POLICY "Allow backend and public registration insert"
    ON registrations
    FOR INSERT
    TO anon, authenticated, service_role
    WITH CHECK (true);

-- Deny public reading of registrant contact information (PII protection)
DROP POLICY IF EXISTS "Deny public select" ON registrations;
CREATE POLICY "Deny public select"
    ON registrations
    FOR SELECT
    TO anon
    USING (false);

-- Grant select to service_role for organizer exports and status queries
DROP POLICY IF EXISTS "Allow service role read" ON registrations;
CREATE POLICY "Allow service role read"
    ON registrations
    FOR SELECT
    TO service_role
    USING (true);

-- ==============================================================================
-- INSTRUCTIONS FOR SETUP IN SUPABASE:
-- 1. Open your Supabase Dashboard: https://supabase.com/dashboard/
-- 2. Select your project and navigate to the "SQL Editor" tab on the left sidebar.
-- 3. Paste this entire script and click "Run".
-- 4. Navigate to "Project Settings" -> "API" to copy:
--    - Project URL (use as SUPABASE_URL)
--    - service_role key (use as SUPABASE_SERVICE_ROLE_KEY in Render/backend)
-- ==============================================================================

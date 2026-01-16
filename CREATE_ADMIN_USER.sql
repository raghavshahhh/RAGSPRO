-- ============================================
-- CREATE ADMIN USER FOR RAGSPRO
-- Run this in Supabase SQL Editor
-- ============================================

-- Email: ragsproai@gmail.com
-- Password: Raghav@03

-- Step 1: Enable pgcrypto extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Step 2: Create admin user in auth.users table
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  email_change_confirm_status,
  recovery_token,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  created_at,
  updated_at,
  phone,
  phone_confirmed_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token_hash
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'ragsproai@gmail.com',
  crypt('Raghav@03', gen_salt('bf')),
  NOW(),
  0,
  '',
  NULL,
  NULL,
  '{"provider":"email","providers":["email"]}',
  '{"name":"Raghav Shah","phone":"8826073013"}',
  false,
  NOW(),
  NOW(),
  '8826073013',
  NULL,
  '',
  '',
  '',
  ''
)
ON CONFLICT (email) DO NOTHING;

-- Step 3: Create user profile (if user_profiles table exists)
INSERT INTO public.user_profiles (
  id,
  name,
  email,
  phone,
  company,
  metadata,
  created_at,
  updated_at
)
SELECT 
  id,
  'Raghav Shah',
  'ragsproai@gmail.com',
  '8826073013',
  'RAGSPRO',
  '{"role":"admin","isFounder":true}',
  NOW(),
  NOW()
FROM auth.users
WHERE email = 'ragsproai@gmail.com'
ON CONFLICT (id) DO NOTHING;

-- Verify user was created
SELECT 
  id,
  email,
  email_confirmed_at,
  created_at,
  raw_user_meta_data->>'name' as name
FROM auth.users 
WHERE email = 'ragsproai@gmail.com';

-- ============================================
-- DONE! Admin user created successfully
-- ============================================
-- 
-- Login credentials:
-- Email: ragsproai@gmail.com
-- Password: Raghav@03
--
-- Access admin dashboard at: /admin
-- ============================================

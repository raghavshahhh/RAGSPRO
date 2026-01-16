# 🗄️ DATABASE SETUP - DO THIS NOW

## ✅ Your Supabase Details:
```
URL: https://wipcbdqqlryctwnlembh.supabase.co
ANON_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpcGNiZHFxbHJ5Y3R3bmxlbWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1NTA2MjMsImV4cCI6MjA4NDEyNjYyM30.4kMSfJ0gmGDDHxXOJEpZj_yPAxa53KXGyitokCc33BY
```

---

## 🎯 STEP 1: Add Missing Vercel Variables (2 mins)

Go to: https://vercel.com/dashboard → ragspro → Settings → Environment Variables

**Add these NOW:**

```env
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpcGNiZHFxbHJ5Y3R3bmxlbWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1NTA2MjMsImV4cCI6MjA4NDEyNjYyM30.4kMSfJ0gmGDDHxXOJEpZj_yPAxa53KXGyitokCc33BY

COMPANY_EMAIL=ragsproai@gmail.com

ENABLE_AUTO_BLOG=true

CRON_SECRET=ragspro_cron_secret_2026_secure
```

**For each variable:**
- ✅ Production
- ✅ Preview  
- ✅ Development

Then click **"Redeploy"**

---

## 🗄️ STEP 2: Setup Supabase Database (3 mins)

### A. Open Supabase SQL Editor
1. Go to: https://supabase.com/dashboard/project/wipcbdqqlryctwnlembh
2. Click **"SQL Editor"** in left sidebar
3. Click **"New Query"**

### B. Run Database Schema
1. Copy the content from `SUPABASE_SCHEMA.sql` file below
2. Paste in SQL Editor
3. Click **"Run"** button
4. Wait for "Success" message
5. ✅ All 12 tables created!

### C. Create Admin User
1. Click **"New Query"** again
2. Copy the content from `CREATE_ADMIN_USER.sql` file below
3. Paste in SQL Editor
4. Click **"Run"**
5. ✅ Admin user created!

**Your Admin Login:**
```
Email: ragsproai@gmail.com
Password: Raghav@03
```

---

## 📝 SQL FILE 1: SUPABASE_SCHEMA.sql

**Copy this entire content and run in Supabase SQL Editor:**

```sql
-- ============================================
-- RAGSPRO Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. USER PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  phone TEXT,
  company TEXT,
  avatar_url TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 2. LEADS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  source TEXT DEFAULT 'website',
  page TEXT DEFAULT '/',
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);

-- ============================================
-- 3. PAYMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT UNIQUE,
  razorpay_signature TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  description TEXT,
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  receipt_url TEXT,
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_created_at ON payments(created_at DESC);

-- Enable RLS
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Users can view their own payments
CREATE POLICY "Users can view own payments" ON payments
  FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- 4. PROJECTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  type TEXT,
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'paused', 'completed', 'cancelled')),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  start_date DATE,
  end_date DATE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_status ON projects(status);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Users can view their own projects
CREATE POLICY "Users can view own projects" ON projects
  FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- 5. COMMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blog_slug TEXT NOT NULL,
  blog_title TEXT,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT DEFAULT 'Anonymous',
  author_email TEXT,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  status TEXT DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'spam', 'flagged', 'deleted')),
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_comments_blog_slug ON comments(blog_slug);
CREATE INDEX idx_comments_status ON comments(status);
CREATE INDEX idx_comments_parent_id ON comments(parent_id);

-- ============================================
-- 6. COMMENT REPORTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS comment_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  reporter_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_comment_reports_comment_id ON comment_reports(comment_id);

-- ============================================
-- 7. NEWSLETTER SUBSCRIBERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  source TEXT DEFAULT 'website',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
  metadata JSONB DEFAULT '{}',
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ,
  resubscribed_at TIMESTAMPTZ
);

CREATE INDEX idx_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX idx_subscribers_status ON newsletter_subscribers(status);

-- ============================================
-- 8. BLOG RUNS TABLE (AI Blog Generation)
-- ============================================
CREATE TABLE IF NOT EXISTS blog_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blog_slug TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed')),
  error_log TEXT,
  token_usage INTEGER,
  prompt TEXT,
  generated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_blog_runs_status ON blog_runs(status);
CREATE INDEX idx_blog_runs_generated_at ON blog_runs(generated_at DESC);

-- ============================================
-- 9. SYSTEM LOGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS system_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  message TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_system_logs_type ON system_logs(type);
CREATE INDEX idx_system_logs_status ON system_logs(status);
CREATE INDEX idx_system_logs_created_at ON system_logs(created_at DESC);

-- ============================================
-- 10. ERROR LOGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS error_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  message TEXT NOT NULL,
  stack TEXT,
  error_name TEXT,
  level TEXT DEFAULT 'error' CHECK (level IN ('debug', 'info', 'warning', 'error', 'fatal')),
  url TEXT,
  user_agent TEXT,
  context JSONB DEFAULT '{}',
  resolved BOOLEAN DEFAULT FALSE,
  resolution_notes TEXT,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_error_logs_level ON error_logs(level);
CREATE INDEX idx_error_logs_resolved ON error_logs(resolved);
CREATE INDEX idx_error_logs_created_at ON error_logs(created_at DESC);

-- ============================================
-- 11. TRAFFIC STATS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS traffic_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  page TEXT NOT NULL,
  source TEXT DEFAULT 'direct',
  views INTEGER DEFAULT 1,
  metadata JSONB DEFAULT '{}',
  UNIQUE(date, page, source)
);

CREATE INDEX idx_traffic_stats_date ON traffic_stats(date DESC);
CREATE INDEX idx_traffic_stats_page ON traffic_stats(page);

-- ============================================
-- 12. PORTFOLIO PROJECTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT[] DEFAULT '{}',
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT[] DEFAULT '{}',
  live_link TEXT,
  github_link TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_portfolio_projects_display_order ON portfolio_projects(display_order);
CREATE INDEX idx_portfolio_projects_is_active ON portfolio_projects(is_active);

-- Enable RLS
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;

-- Public can view active projects
CREATE POLICY "Anyone can view active portfolio projects" ON portfolio_projects
  FOR SELECT USING (is_active = TRUE);

-- Authenticated users can manage
CREATE POLICY "Authenticated users can insert portfolio projects" ON portfolio_projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update portfolio projects" ON portfolio_projects
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete portfolio projects" ON portfolio_projects
  FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables with updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolio_projects_updated_at
  BEFORE UPDATE ON portfolio_projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- DONE! Your database is ready.
-- ============================================
```

---

## 📝 SQL FILE 2: CREATE_ADMIN_USER.sql

**Copy this entire content and run in Supabase SQL Editor:**

```sql
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
```

---

## ✅ STEP 3: Verify Setup (1 min)

### Check Tables Created
Run this query in Supabase SQL Editor:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
```

**You should see 12 tables:**
1. blog_runs
2. comment_reports
3. comments
4. error_logs
5. leads
6. newsletter_subscribers
7. payments
8. portfolio_projects
9. projects
10. system_logs
11. traffic_stats
12. user_profiles

### Check Admin User Created
Run this query:

```sql
SELECT email, created_at 
FROM auth.users 
WHERE email = 'ragsproai@gmail.com';
```

**You should see:** ragsproai@gmail.com with today's date

---

## 🎉 STEP 4: Test Admin Login

1. Go to: https://ragspro.com
2. Scroll to footer
3. Click "Admin" link
4. Login with:
   ```
   Email: ragsproai@gmail.com
   Password: Raghav@03
   ```
5. ✅ Should see admin dashboard!

---

## 🤖 BLOG AUTOMATION SETUP

Blog automation is already built and will work automatically once you:

1. ✅ Add `ENABLE_AUTO_BLOG=true` to Vercel (done above)
2. ✅ Add `GEMINI_API_KEY` to Vercel (already added)
3. ✅ Add `CRON_SECRET` to Vercel (done above)

**How it works:**
- Runs daily at 4:30 AM IST
- Generates 1 blog post automatically
- Uses Gemini AI
- Posts to your blog
- Tracks in `blog_runs` table

**Manual trigger (for testing):**
```bash
curl -X POST https://ragspro.com/api/cron/daily-blog \
  -H "x-cron-secret: ragspro_cron_secret_2026_secure"
```

---

## 📋 FINAL CHECKLIST

- [ ] Added `NEXT_PUBLIC_SUPABASE_ANON_KEY` to Vercel
- [ ] Added `COMPANY_EMAIL` to Vercel
- [ ] Added `ENABLE_AUTO_BLOG` to Vercel
- [ ] Added `CRON_SECRET` to Vercel
- [ ] Redeployed on Vercel
- [ ] Ran `SUPABASE_SCHEMA.sql` in Supabase
- [ ] Ran `CREATE_ADMIN_USER.sql` in Supabase
- [ ] Verified 12 tables created
- [ ] Verified admin user created
- [ ] Tested admin login at ragspro.com/admin
- [ ] ✅ Everything working!

---

## 🚀 YOU'RE DONE!

**Website:** https://ragspro.com  
**Admin:** https://ragspro.com/admin  
**Login:** ragsproai@gmail.com / Raghav@03

**All features active:**
- ✅ Admin dashboard
- ✅ Leads tracking
- ✅ Portfolio manager
- ✅ Email notifications
- ✅ Blog automation
- ✅ Payment processing (when Razorpay keys added)

**Time to get clients!** 🎉

---

**Last Updated:** January 16, 2026

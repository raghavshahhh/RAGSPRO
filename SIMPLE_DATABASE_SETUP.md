# 🎯 SUPER SIMPLE DATABASE SETUP

## Ye 5 Minute Mein Ho Jayega! 

---

## 📋 STEP 1: Open Supabase (30 seconds)

1. **Open this link:** https://supabase.com/dashboard/project/wipcbdqqlryctwnlembh
2. **Login** if needed
3. **Click** "SQL Editor" in left sidebar (icon looks like `</>`)
4. **Click** "New Query" button (top right)

---

## 📋 STEP 2: Create Tables (2 minutes)

### Copy This SQL:

Open file `SUPABASE_SCHEMA.sql` in your project folder.

**OR** copy from here (scroll down to see full SQL):

<details>
<summary>Click to expand SUPABASE_SCHEMA.sql (Click here!)</summary>

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USER PROFILES TABLE
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

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

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

-- 2. LEADS TABLE
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

-- 3. PAYMENTS TABLE
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

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own payments" ON payments
  FOR SELECT USING (auth.uid() = user_id);

-- 4. PROJECTS TABLE
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

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own projects" ON projects
  FOR SELECT USING (auth.uid() = user_id);

-- 5. COMMENTS TABLE
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

-- 6. COMMENT REPORTS TABLE
CREATE TABLE IF NOT EXISTS comment_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  reporter_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_comment_reports_comment_id ON comment_reports(comment_id);

-- 7. NEWSLETTER SUBSCRIBERS TABLE
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

-- 8. BLOG RUNS TABLE
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

-- 9. SYSTEM LOGS TABLE
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

-- 10. ERROR LOGS TABLE
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

-- 11. TRAFFIC STATS TABLE
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

-- 12. PORTFOLIO PROJECTS TABLE
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

ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active portfolio projects" ON portfolio_projects
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Authenticated users can insert portfolio projects" ON portfolio_projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update portfolio projects" ON portfolio_projects
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete portfolio projects" ON portfolio_projects
  FOR DELETE USING (auth.role() = 'authenticated');

-- HELPER FUNCTIONS
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

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
```

</details>

### Now:
1. **Select All** (Ctrl+A or Cmd+A)
2. **Copy** (Ctrl+C or Cmd+C)
3. **Paste** in Supabase SQL Editor
4. **Click "Run"** button (bottom right)
5. **Wait** for "Success" message (10-15 seconds)
6. ✅ **Done!** 12 tables created!

---

## 📋 STEP 3: Create Admin User (1 minute)

### In Same SQL Editor:

1. **Click "New Query"** again
2. **Copy this SQL:**

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;

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

SELECT 
  id,
  email,
  email_confirmed_at,
  created_at,
  raw_user_meta_data->>'name' as name
FROM auth.users 
WHERE email = 'ragsproai@gmail.com';
```

3. **Paste** in SQL Editor
4. **Click "Run"**
5. **See** your admin user details in result
6. ✅ **Done!** Admin created!

---

## 📋 STEP 4: Verify (30 seconds)

### Check Tables:
Run this query:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
```

**You should see 12 tables!**

---

## 🎉 STEP 5: Test Login (1 minute)

1. **Go to:** https://ragspro.com
2. **Scroll** to footer
3. **Click** "Admin"
4. **Login:**
   ```
   Email: ragsproai@gmail.com
   Password: Raghav@03
   ```
5. ✅ **You're in!**

---

## 🚀 DONE!

**Total Time:** 5 minutes  
**Admin Dashboard:** https://ragspro.com/admin  
**Leads:** https://ragspro.com/admin/leads  
**Portfolio:** https://ragspro.com/admin/portfolio

**All features working!** 🎉

---

**Last Updated:** January 16, 2026

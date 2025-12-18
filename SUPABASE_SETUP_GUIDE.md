# 🗄️ SUPABASE DATABASE SETUP GUIDE

## 🎯 WHY SUPABASE?

Your dashboard now tracks REAL data:
- ✅ Blog automation success/failure logs
- ✅ System event logs
- ✅ Traffic analytics
- ✅ Lead management
- ✅ AI visibility tracking

**Without database:** Dashboard shows only filesystem data (blogs exist or not)  
**With database:** Dashboard shows complete history, analytics, and insights

---

## 📋 STEP 1: CREATE SUPABASE ACCOUNT

1. Go to: https://supabase.com
2. Sign up (free tier is enough)
3. Create new project:
   - Name: `ragspro-dashboard`
   - Database Password: (save this!)
   - Region: Choose closest to India (Singapore recommended)

---

## 📋 STEP 2: RUN SQL SCHEMA

Go to **SQL Editor** in Supabase dashboard and run this:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE 1: Blog Automation Runs
-- ============================================
CREATE TABLE blog_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blog_slug TEXT,
  status TEXT NOT NULL CHECK (status IN ('success', 'failed', 'running')),
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  error_log TEXT,
  token_usage INTEGER DEFAULT 0,
  prompt TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_blog_runs_status ON blog_runs(status);
CREATE INDEX idx_blog_runs_created ON blog_runs(created_at DESC);
CREATE INDEX idx_blog_runs_slug ON blog_runs(blog_slug);

COMMENT ON TABLE blog_runs IS 'Tracks every blog generation attempt (success/failure)';

-- ============================================
-- TABLE 2: System Logs
-- ============================================
CREATE TABLE system_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('cron', 'api', 'ai', 'email', 'error', 'info')),
  status TEXT NOT NULL CHECK (status IN ('success', 'failed', 'info', 'warning')),
  message TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_system_logs_type ON system_logs(type);
CREATE INDEX idx_system_logs_status ON system_logs(status);
CREATE INDEX idx_system_logs_created ON system_logs(created_at DESC);

COMMENT ON TABLE system_logs IS 'All system events (API calls, cron jobs, errors)';

-- ============================================
-- TABLE 3: Traffic Stats
-- ============================================
CREATE TABLE traffic_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  page TEXT NOT NULL,
  views INTEGER DEFAULT 1,
  source TEXT CHECK (source IN ('organic', 'ai', 'direct', 'referral', 'social', 'unknown')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(date, page, source)
);

CREATE INDEX idx_traffic_date ON traffic_stats(date DESC);
CREATE INDEX idx_traffic_page ON traffic_stats(page);
CREATE INDEX idx_traffic_source ON traffic_stats(source);

COMMENT ON TABLE traffic_stats IS 'Daily page view tracking by source';

-- ============================================
-- TABLE 4: Leads
-- ============================================
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  source TEXT,
  page TEXT,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created ON leads(created_at DESC);
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_source ON leads(source);

COMMENT ON TABLE leads IS 'Lead tracking and CRM';

-- ============================================
-- TABLE 5: AI Visibility Tracking
-- ============================================
CREATE TABLE ai_visibility (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  engine TEXT NOT NULL CHECK (engine IN ('google_ai', 'chatgpt', 'gemini', 'claude', 'perplexity', 'other')),
  query TEXT,
  mentioned BOOLEAN DEFAULT FALSE,
  position INTEGER,
  context TEXT,
  screenshot_url TEXT,
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  checked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_ai_visibility_engine ON ai_visibility(engine);
CREATE INDEX idx_ai_visibility_checked ON ai_visibility(checked_at DESC);
CREATE INDEX idx_ai_visibility_mentioned ON ai_visibility(mentioned);

COMMENT ON TABLE ai_visibility IS 'Track when/where RAGSPRO is mentioned by AI engines';

-- ============================================
-- FUNCTIONS: Auto-update timestamps
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================
-- Insert sample blog run
INSERT INTO blog_runs (blog_slug, status, token_usage, prompt) VALUES
('test-blog-2025-12-18', 'success', 1500, 'Test blog generation');

-- Insert sample system log
INSERT INTO system_logs (type, status, message, metadata) VALUES
('ai', 'success', 'Dashboard initialized', '{"version": "1.0"}');

-- Insert sample traffic
INSERT INTO traffic_stats (date, page, views, source) VALUES
(CURRENT_DATE, '/', 10, 'direct'),
(CURRENT_DATE, '/blog', 5, 'organic');

-- Insert sample lead
INSERT INTO leads (name, email, phone, source, page, message, status) VALUES
('Test User', 'test@example.com', '+91-9999999999', 'website', '/', 'Test inquiry', 'new');
```

---

## 📋 STEP 3: GET API KEYS

1. Go to **Settings** → **API** in Supabase
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Service Role Key** (secret key - keep safe!)

---

## 📋 STEP 4: ADD ENVIRONMENT VARIABLES

### Local Development (`.env.local`)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your_service_role_key_here

# Admin
ADMIN_SECRET=ragspro2025
```

### Vercel Production

1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Add:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://your-project.supabase.co`
   - `SUPABASE_SERVICE_KEY` = `your_service_role_key`
   - `ADMIN_SECRET` = `ragspro2025`

---

## 📋 STEP 5: TEST CONNECTION

```bash
# Start dev server
npm run dev

# Visit dashboard
http://localhost:3000/admin/dashboard

# Check browser console - should see no Supabase errors
```

---

## 🎯 WHAT YOU'LL SEE NOW

### Before Database
- ❌ "Database not configured" messages
- ❌ No blog run history
- ❌ No system logs
- ❌ No analytics
- ❌ No lead tracking

### After Database
- ✅ Complete blog automation history
- ✅ Success/failure logs with error messages
- ✅ System event timeline
- ✅ Traffic analytics (when you add tracking)
- ✅ Lead management CRM
- ✅ AI visibility tracking

---

## 📊 DASHBOARD FEATURES (WITH DATABASE)

### Overview Tab
- Real system health
- Recent blog runs (success/fail)
- Today's traffic
- New leads count

### Blogs Tab
- **Automation History:**
  - Last 50 blog generation attempts
  - Success rate
  - Error logs
  - Token usage
  - Execution time
- **Current Blogs:** Filesystem scan (as before)

### Analytics Tab
- **Traffic Stats:**
  - Total views (last 30 days)
  - Top 10 pages
  - Source breakdown (organic, AI, direct, referral)
  - Daily trend chart
- **Real Numbers:** Not fake data!

### Leads Tab
- **Lead List:**
  - All leads with contact info
  - Status (new, contacted, qualified, converted, lost)
  - Source tracking
  - Update status directly
- **Stats:**
  - Total leads
  - Today's leads
  - Conversion rate
  - Source breakdown

### System Logs Tab (New!)
- All system events
- Filter by type (cron, api, ai, email, error)
- Success/failure tracking
- Error debugging

---

## 🔧 HOW DATA GETS LOGGED

### Blog Generation
Every time a blog is generated (manual or cron):
```javascript
// Logs to blog_runs table
{
  blog_slug: "new-blog-2025-12-18",
  status: "success",
  token_usage: 1500,
  prompt: "Write about MVP development",
  generated_at: "2025-12-18T10:00:00Z"
}
```

### System Events
Every important action:
```javascript
// Logs to system_logs table
{
  type: "ai",
  status: "success",
  message: "Blog generated successfully",
  metadata: { executionTime: 5000, wordCount: 1500 }
}
```

### Traffic (Manual Tracking)
You can track page views:
```javascript
// In your pages, add:
import { trackPageView } from '../utils/supabase'

useEffect(() => {
  trackPageView('/blog/my-post', 'organic')
}, [])
```

### Leads (Form Submissions)
When someone submits a form:
```javascript
import { saveLead } from '../utils/supabase'

await saveLead({
  name: "John Doe",
  email: "john@example.com",
  phone: "+91-9999999999",
  source: "website",
  page: "/pricing",
  message: "Interested in MVP development"
})
```

---

## 🎯 REAL-TIME DASHBOARD FEATURES

### Auto-Refresh (30 seconds)
Dashboard fetches:
1. Blog runs (last 50)
2. System logs (last 100)
3. Traffic stats (last 30 days)
4. Leads (all)
5. Filesystem blogs (as before)

### What's Real Now
- ✅ Blog automation success/failure
- ✅ Error messages and debugging
- ✅ Token usage tracking
- ✅ System event timeline
- ✅ Lead management
- ✅ Traffic analytics (when you add tracking)

### What's Still Pending
- ⏳ AI referral tracking (impossible to track directly)
- ⏳ Google Analytics integration (optional)
- ⏳ Automatic page view tracking (needs middleware)

---

## 🚀 DEPLOYMENT

```bash
# Commit changes
git add .
git commit -m "feat: Add Supabase database integration for real tracking"
git push origin main

# Vercel will auto-deploy
# Don't forget to add environment variables on Vercel!
```

---

## 🧪 TESTING

### Test Blog Generation
1. Go to `/admin/blog-generator`
2. Generate a blog
3. Check dashboard → Blogs tab → Automation History
4. Should see the run logged with status

### Test System Logs
1. Dashboard auto-logs events
2. Check System Logs tab
3. Should see initialization, API calls, etc.

### Test Leads (Manual)
```javascript
// In browser console on any page:
fetch('/api/admin/leads', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ragspro2025'
  },
  body: JSON.stringify({
    name: 'Test Lead',
    email: 'test@example.com',
    source: 'test',
    page: '/',
    message: 'Test message'
  })
})
```

---

## 📚 SUPABASE DASHBOARD

Access your data directly:
1. Go to Supabase Dashboard
2. Table Editor
3. View/edit all tables
4. Run SQL queries
5. Export data

---

## 🎉 YOU'RE DONE!

Your dashboard now has:
- ✅ Real blog automation tracking
- ✅ Complete system logs
- ✅ Lead management CRM
- ✅ Traffic analytics foundation
- ✅ Error debugging
- ✅ Production-grade monitoring

**No more fake data. Everything is real! 🚀**

---

## 🆘 TROUBLESHOOTING

### "Database not configured" error
- Check environment variables are set
- Verify Supabase URL and key are correct
- Restart dev server

### No data showing
- Check Supabase tables exist (run SQL schema)
- Verify API keys have correct permissions
- Check browser console for errors

### Connection errors
- Verify Supabase project is active
- Check network/firewall
- Verify service role key (not anon key)

---

**Setup time: 10-15 minutes**  
**Result: Production-grade dashboard with real tracking! 🎯**

# 🚀 RAGSPRO Production Setup Guide
**Domain:** ragspro.com  
**Supabase URL:** https://wipcbdqqlryctwnlembh.supabase.co

---

## 📋 COMPLETE CHECKLIST

### ✅ Step 1: Supabase Setup (10 mins)
### ✅ Step 2: Get API Keys (5 mins)
### ✅ Step 3: Vercel Environment Variables (5 mins)
### ✅ Step 4: Create Admin User (2 mins)
### ✅ Step 5: Test Everything (5 mins)

**Total Time:** 27 minutes

---

## 🗄️ STEP 1: SUPABASE DATABASE SETUP

### 1.1 Access Supabase Dashboard
1. Go to: https://supabase.com/dashboard
2. Select your project: `wipcbdqqlryctwnlembh`
3. Click on **SQL Editor** (left sidebar)

### 1.2 Run Database Schema
1. Click **"New Query"**
2. Open file: `SUPABASE_SCHEMA.sql` from your project
3. Copy ALL content (Ctrl+A, Ctrl+C)
4. Paste in SQL Editor
5. Click **"Run"** button
6. Wait for success message
7. ✅ All 12 tables created!

**Tables Created:**
- user_profiles
- leads
- payments
- projects
- comments
- comment_reports
- newsletter_subscribers
- blog_runs
- system_logs
- error_logs
- traffic_stats
- portfolio_projects ✨ NEW

### 1.3 Create Admin User
1. Stay in SQL Editor
2. Click **"New Query"**
3. Open file: `CREATE_ADMIN_USER.sql`
4. Copy ALL content
5. Paste in SQL Editor
6. Click **"Run"**
7. ✅ Admin user created!

**Credentials:**
```
Email: ragsproai@gmail.com
Password: Raghav@03
```

### 1.4 Verify Setup
Run this query to verify:
```sql
-- Check tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check admin user
SELECT email, created_at 
FROM auth.users 
WHERE email = 'ragsproai@gmail.com';
```

---

## 🔑 STEP 2: GET ALL API KEYS

### 2.1 Supabase Keys (Already Have)

#### Get Supabase Keys:
1. Go to: https://supabase.com/dashboard/project/wipcbdqqlryctwnlembh/settings/api
2. Copy these keys:

```env
# Supabase Keys
NEXT_PUBLIC_SUPABASE_URL=https://wipcbdqqlryctwnlembh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[Copy from "Project API keys" → "anon public"]
SUPABASE_SERVICE_KEY=[Copy from "Project API keys" → "service_role" (click "Reveal")]
```

⚠️ **IMPORTANT:** Keep service_role key SECRET!

---

### 2.2 Gemini AI Key (For Blog Automation)

#### Get Gemini API Key:
1. Go to: https://makersuite.google.com/app/apikey
2. Click **"Create API Key"**
3. Select **"Create API key in new project"** (or existing)
4. Copy the key

```env
# Gemini AI (Blog Automation)
GEMINI_API_KEY=[Paste your key here]
ENABLE_AUTO_BLOG=true
```

**Cost:** ₹0.50-2 per blog post  
**Free Tier:** 60 requests/minute

---

### 2.3 Resend Email Key (For Email Notifications)

#### Get Resend API Key:
1. Go to: https://resend.com/api-keys
2. Sign up/Login with GitHub
3. Click **"Create API Key"**
4. Name: "RAGSPRO Production"
5. Copy the key

```env
# Resend Email
RESEND_API_KEY=[Paste your key here]
COMPANY_EMAIL=ragsproai@gmail.com
```

**Cost:** Free up to 3,000 emails/month  
**Then:** $20/month for 50,000 emails

---

### 2.4 Razorpay Keys (For Payments)

#### Get Razorpay Keys:
1. Go to: https://dashboard.razorpay.com/app/keys
2. Login to your account
3. Go to **Settings** → **API Keys**
4. Click **"Generate Test Keys"** (for testing)
5. Click **"Generate Live Keys"** (for production)
6. Copy both keys

```env
# Razorpay Payment Gateway
NEXT_PUBLIC_RAZORPAY_KEY_ID=[Paste Key ID here]
RAZORPAY_KEY_SECRET=[Paste Key Secret here]
```

**Note:** Use Test keys first, then switch to Live keys

---

### 2.5 Google Analytics (Optional)

#### Get GA4 Measurement ID:
1. Go to: https://analytics.google.com
2. Create property for ragspro.com
3. Copy Measurement ID (starts with G-)

```env
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

### 2.6 Cron Secret (Generate Random)

#### Generate Secret:
Run this in terminal:
```bash
openssl rand -base64 32
```

Or use: https://generate-secret.vercel.app/32

```env
# Cron Job Security
CRON_SECRET=[Paste generated secret]
```

---

## ⚙️ STEP 3: ADD TO VERCEL

### 3.1 Access Vercel Dashboard
1. Go to: https://vercel.com/dashboard
2. Select project: **ragspro**
3. Go to **Settings** → **Environment Variables**

### 3.2 Add All Variables

Click **"Add New"** for each variable:

#### Critical (Required):
```env
NEXT_PUBLIC_SITE_URL=https://ragspro.com

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://wipcbdqqlryctwnlembh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your_anon_key]
SUPABASE_SERVICE_KEY=[your_service_key]

# Email
RESEND_API_KEY=[your_resend_key]
COMPANY_EMAIL=ragsproai@gmail.com

# Payment
NEXT_PUBLIC_RAZORPAY_KEY_ID=[your_razorpay_key]
RAZORPAY_KEY_SECRET=[your_razorpay_secret]
```

#### Optional (For Blog Automation):
```env
# AI Blog Generation
GEMINI_API_KEY=[your_gemini_key]
ENABLE_AUTO_BLOG=true
CRON_SECRET=[your_random_secret]
```

#### Optional (Analytics):
```env
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3.3 Environment Selection
For each variable, select:
- ✅ Production
- ✅ Preview
- ✅ Development

### 3.4 Save & Redeploy
1. Click **"Save"** after adding all variables
2. Go to **Deployments** tab
3. Click **"..."** on latest deployment
4. Click **"Redeploy"**
5. Wait for deployment to complete
6. ✅ Done!

---

## 👤 STEP 4: TEST ADMIN LOGIN

### 4.1 Access Admin
1. Go to: https://ragspro.com
2. Scroll to footer
3. Click **"Admin"** link
4. Login with:
   ```
   Email: ragsproai@gmail.com
   Password: Raghav@03
   ```
5. Should redirect to: https://ragspro.com/admin
6. ✅ Success!

### 4.2 Test Dashboards
- [ ] Main dashboard loads
- [ ] Leads dashboard accessible
- [ ] Portfolio manager accessible
- [ ] Can sign out

---

## 🧪 STEP 5: TEST ALL FEATURES

### 5.1 Test Lead Capture
1. Go to: https://ragspro.com/get-quote
2. Fill form with test data
3. Submit
4. Check admin dashboard → Leads
5. ✅ Lead should appear

### 5.2 Test Email Notifications
1. Submit a form
2. Check email: ragsproai@gmail.com
3. Should receive notification
4. ✅ Email received

### 5.3 Test Portfolio Manager
1. Go to: https://ragspro.com/admin/portfolio
2. Click **"Add Project"**
3. Fill details
4. Save
5. Go to: https://ragspro.com/projects
6. ✅ Project should appear

### 5.4 Test Blog Automation (Optional)
1. Wait for cron (4:30 AM daily) OR
2. Manually trigger:
   ```bash
   curl -X POST https://ragspro.com/api/cron/daily-blog \
     -H "x-cron-secret: YOUR_CRON_SECRET"
   ```
3. Check: https://ragspro.com/blog
4. ✅ New blog post should appear

### 5.5 Test Payment Flow
1. Go to: https://ragspro.com/pricing
2. Click any package
3. Test with Razorpay test card:
   ```
   Card: 4111 1111 1111 1111
   CVV: 123
   Expiry: Any future date
   ```
4. Complete payment
5. Check admin → Leads
6. ✅ Payment recorded

---

## 📊 VERIFICATION CHECKLIST

### Database ✅
- [ ] All 12 tables created
- [ ] Admin user exists
- [ ] RLS policies active
- [ ] Indexes created

### Environment Variables ✅
- [ ] Supabase keys added
- [ ] Resend key added
- [ ] Razorpay keys added
- [ ] Gemini key added (optional)
- [ ] Site URL correct

### Features ✅
- [ ] Admin login works
- [ ] Leads dashboard shows data
- [ ] Portfolio manager works
- [ ] Forms submit successfully
- [ ] Emails send correctly
- [ ] Payments process (test mode)
- [ ] Blog automation ready

### Pages ✅
- [ ] Homepage loads
- [ ] /get-quote works
- [ ] /projects shows items
- [ ] /blog lists posts
- [ ] /admin requires login
- [ ] /admin/leads shows data
- [ ] /admin/portfolio works

---

## 🔧 TROUBLESHOOTING

### Issue: Admin login not working
**Solution:**
1. Check Supabase connection
2. Verify user was created (run SQL query)
3. Check browser console for errors
4. Try password reset

### Issue: Forms not submitting
**Solution:**
1. Check Supabase keys in Vercel
2. Verify tables exist
3. Check browser console
4. Test API endpoint directly

### Issue: Emails not sending
**Solution:**
1. Verify Resend API key
2. Check email domain verification
3. Check Resend dashboard for logs
4. Verify COMPANY_EMAIL is correct

### Issue: Blog automation not working
**Solution:**
1. Check ENABLE_AUTO_BLOG=true
2. Verify GEMINI_API_KEY is valid
3. Check Vercel cron logs
4. Test API endpoint manually

### Issue: Payments failing
**Solution:**
1. Use Razorpay test keys first
2. Verify keys are correct
3. Check Razorpay dashboard
4. Test with test card numbers

---

## 📝 QUICK REFERENCE

### Important URLs:
```
Website: https://ragspro.com
Admin: https://ragspro.com/admin
Leads: https://ragspro.com/admin/leads
Portfolio: https://ragspro.com/admin/portfolio
Get Quote: https://ragspro.com/get-quote

Supabase: https://supabase.com/dashboard/project/wipcbdqqlryctwnlembh
Vercel: https://vercel.com/dashboard
Resend: https://resend.com/emails
Razorpay: https://dashboard.razorpay.com
```

### Admin Credentials:
```
Email: ragsproai@gmail.com
Password: Raghav@03
```

### API Endpoints:
```
/api/submit-lead - Lead capture
/api/admin/leads - Leads management
/api/admin/portfolio-projects - Portfolio CRUD
/api/generate-blog - AI blog generation
/api/cron/daily-blog - Daily blog automation
```

---

## 🎯 PRIORITY ORDER

### Do First (Critical):
1. ✅ Run SUPABASE_SCHEMA.sql
2. ✅ Run CREATE_ADMIN_USER.sql
3. ✅ Add Supabase keys to Vercel
4. ✅ Add Resend key to Vercel
5. ✅ Redeploy on Vercel
6. ✅ Test admin login

### Do Next (Important):
7. ✅ Add Razorpay keys
8. ✅ Test form submissions
9. ✅ Test email notifications
10. ✅ Add portfolio projects

### Do Later (Optional):
11. ⚠️ Add Gemini key for blog automation
12. ⚠️ Add Google Analytics
13. ⚠️ Setup custom email domain
14. ⚠️ Enable blog automation

---

## 💰 COST BREAKDOWN

### Free Tier:
- Supabase: Free (500MB database, 2GB bandwidth)
- Vercel: Free (100GB bandwidth)
- Resend: Free (3,000 emails/month)
- Gemini AI: Free (60 requests/min)

### Paid (When Needed):
- Supabase Pro: $25/month (8GB database, 250GB bandwidth)
- Vercel Pro: $20/month (1TB bandwidth)
- Resend: $20/month (50,000 emails)
- Gemini AI: Pay-as-you-go (~₹50-100/month for daily blogs)

**Total Free:** $0/month  
**Total Paid:** ~$70-80/month (when you scale)

---

## ✅ FINAL CHECKLIST

Before going live:
- [ ] Database schema executed
- [ ] Admin user created
- [ ] All environment variables added
- [ ] Vercel redeployed
- [ ] Admin login tested
- [ ] Forms tested
- [ ] Emails tested
- [ ] Portfolio manager tested
- [ ] Mobile responsive checked
- [ ] All links working
- [ ] Analytics setup (optional)
- [ ] Blog automation enabled (optional)

---

## 🎉 YOU'RE LIVE!

Once all steps complete:
1. ✅ Website: https://ragspro.com
2. ✅ Admin: https://ragspro.com/admin
3. ✅ All features working
4. ✅ Ready to accept clients!

**Time to Complete:** 30 minutes  
**Status:** Production Ready  
**Next:** Start marketing! 🚀

---

**Last Updated:** January 16, 2026  
**Created By:** Kiro AI Assistant  
**Project:** RAGSPRO Production Setup

# 🚀 RAGSPRO Admin Setup - Quick Start

**Your Website:** https://ragspro.com  
**Your Supabase:** https://wipcbdqqlryctwnlembh.supabase.co

---

## ⚡ SETUP IN 3 STEPS (15 MINUTES)

### STEP 1: Setup Database (5 mins)

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard
   - Login and select your project

2. **Run Database Schema**
   - Click **"SQL Editor"** in left sidebar
   - Click **"New Query"**
   - Open file `SUPABASE_SCHEMA.sql` from your project
   - Copy ALL content (Ctrl+A, Ctrl+C)
   - Paste in SQL Editor
   - Click **"Run"** button
   - ✅ Wait for "Success" message

3. **Create Admin User**
   - Click **"New Query"** again
   - Open file `CREATE_ADMIN_USER.sql`
   - Copy ALL content
   - Paste in SQL Editor
   - Click **"Run"**
   - ✅ Admin user created!

**Your Admin Login:**
```
Email: ragsproai@gmail.com
Password: Raghav@03
```

---

### STEP 2: Get API Keys (5 mins)

#### A. Supabase Keys (Required)
1. Go to: https://supabase.com/dashboard/project/wipcbdqqlryctwnlembh/settings/api
2. Copy these 2 keys:
   - **anon public** key
   - **service_role** key (click "Reveal" first)

#### B. Resend Email Key (Required)
1. Go to: https://resend.com/api-keys
2. Sign up/Login
3. Click **"Create API Key"**
4. Name it "RAGSPRO"
5. Copy the key

#### C. Razorpay Keys (Required for Payments)
1. Go to: https://dashboard.razorpay.com/app/keys
2. Login
3. Click **"Generate Test Keys"** (for testing)
4. Copy both:
   - Key ID
   - Key Secret

#### D. Gemini AI Key (Optional - for blog automation)
1. Go to: https://makersuite.google.com/app/apikey
2. Click **"Create API Key"**
3. Copy the key

---

### STEP 3: Add to Vercel (5 mins)

1. **Open Vercel Dashboard**
   - Go to: https://vercel.com/dashboard
   - Select your **ragspro** project
   - Go to **Settings** → **Environment Variables**

2. **Add These Variables** (Click "Add New" for each):

```env
# Site URL
NEXT_PUBLIC_SITE_URL=https://ragspro.com

# Supabase (paste your keys from Step 2A)
NEXT_PUBLIC_SUPABASE_URL=https://wipcbdqqlryctwnlembh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[paste anon key here]
SUPABASE_SERVICE_KEY=[paste service_role key here]

# Email (paste your key from Step 2B)
RESEND_API_KEY=[paste resend key here]
COMPANY_EMAIL=ragsproai@gmail.com

# Payment (paste your keys from Step 2C)
NEXT_PUBLIC_RAZORPAY_KEY_ID=[paste key id here]
RAZORPAY_KEY_SECRET=[paste key secret here]

# Blog Automation (optional - paste key from Step 2D)
GEMINI_API_KEY=[paste gemini key here]
ENABLE_AUTO_BLOG=true

# Security (generate random string)
CRON_SECRET=[any random string like: abc123xyz789]
```

3. **For each variable:**
   - Select: ✅ Production, ✅ Preview, ✅ Development
   - Click **"Save"**

4. **Redeploy:**
   - Go to **Deployments** tab
   - Click **"..."** on latest deployment
   - Click **"Redeploy"**
   - Wait 2-3 minutes

---

## ✅ TEST YOUR SETUP

### Test 1: Admin Login
1. Go to: https://ragspro.com
2. Scroll to footer
3. Click **"Admin"** link
4. Login with:
   ```
   Email: ragsproai@gmail.com
   Password: Raghav@03
   ```
5. ✅ Should see admin dashboard

### Test 2: Submit a Form
1. Go to: https://ragspro.com/get-quote
2. Fill form with test data
3. Submit
4. Go to: https://ragspro.com/admin/leads
5. ✅ Should see your test lead

### Test 3: Add Portfolio Project
1. Go to: https://ragspro.com/admin/portfolio
2. Click **"Add Project"**
3. Fill details
4. Save
5. Go to: https://ragspro.com/projects
6. ✅ Should see your project

---

## 🎯 WHAT YOU GET

### Working Features:
- ✅ Admin dashboard at `/admin`
- ✅ Real-time leads tracking at `/admin/leads`
- ✅ Portfolio manager at `/admin/portfolio`
- ✅ Email notifications on form submissions
- ✅ Payment processing (test mode)
- ✅ Blog automation (if Gemini key added)
- ✅ Mobile-optimized design
- ✅ WhatsApp integration (8826073013)

### Admin Pages:
- `/admin` - Main dashboard
- `/admin/leads` - View all form submissions
- `/admin/portfolio` - Manage projects

---

## 🔧 TROUBLESHOOTING

**Problem: Admin login not working**
- Check if you ran both SQL files in Supabase
- Try clearing browser cache
- Check browser console for errors

**Problem: Forms not submitting**
- Verify Supabase keys are correct in Vercel
- Check if tables were created (run SQL query in Supabase)
- Redeploy on Vercel

**Problem: Emails not sending**
- Verify Resend API key is correct
- Check Resend dashboard for logs
- Make sure COMPANY_EMAIL is set

**Problem: Can't see leads in dashboard**
- Check Supabase connection
- Verify environment variables in Vercel
- Try redeploying

---

## 📞 QUICK REFERENCE

**Website:** https://ragspro.com  
**Admin:** https://ragspro.com/admin  
**Leads:** https://ragspro.com/admin/leads  
**Portfolio:** https://ragspro.com/admin/portfolio

**Admin Login:**
- Email: ragsproai@gmail.com
- Password: Raghav@03

**Phone:** 8826073013  
**Email:** ragsproai@gmail.com

---

## 💰 COSTS

**Free Tier (Current):**
- Supabase: Free (500MB database)
- Vercel: Free (100GB bandwidth)
- Resend: Free (3,000 emails/month)
- Gemini AI: Free (60 requests/min)

**Total: ₹0/month** 🎉

---

## 🎉 YOU'RE DONE!

Your website is now fully functional with:
- ✅ Admin dashboard
- ✅ Lead tracking
- ✅ Portfolio management
- ✅ Email notifications
- ✅ Payment processing
- ✅ Blog automation (optional)

**Time to start getting clients!** 🚀

---

**Need Help?**
- Check `PRODUCTION_SETUP_GUIDE.md` for detailed instructions
- Check `COMPLETE_SYSTEM_ANALYSIS.md` for all features
- All code is on GitHub and deployed on Vercel

**Last Updated:** January 16, 2026

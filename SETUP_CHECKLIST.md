# ✅ RAGSPRO Setup Checklist

**Follow this checklist in order. Check each box as you complete it.**

---

## 📋 STEP 1: DATABASE SETUP

### Supabase Dashboard
- [ ] Go to https://supabase.com/dashboard
- [ ] Login to your account
- [ ] Select project: `wipcbdqqlryctwnlembh`

### Run Database Schema
- [ ] Click "SQL Editor" in left sidebar
- [ ] Click "New Query"
- [ ] Open file: `SUPABASE_SCHEMA.sql`
- [ ] Copy ALL content (Ctrl+A, Ctrl+C)
- [ ] Paste in SQL Editor
- [ ] Click "Run" button
- [ ] Wait for "Success" message
- [ ] ✅ 12 tables created!

### Create Admin User
- [ ] Click "New Query" again
- [ ] Open file: `CREATE_ADMIN_USER.sql`
- [ ] Copy ALL content
- [ ] Paste in SQL Editor
- [ ] Click "Run"
- [ ] See success message
- [ ] ✅ Admin user created!

**Your Login:**
```
Email: ragsproai@gmail.com
Password: Raghav@03
```

---

## 🔑 STEP 2: GET API KEYS

### A. Supabase Keys
- [ ] Go to: https://supabase.com/dashboard/project/wipcbdqqlryctwnlembh/settings/api
- [ ] Copy "anon public" key → Save it
- [ ] Click "Reveal" on "service_role"
- [ ] Copy "service_role" key → Save it
- [ ] ✅ Got both Supabase keys

### B. Resend Email Key
- [ ] Go to: https://resend.com/api-keys
- [ ] Sign up or login
- [ ] Click "Create API Key"
- [ ] Name: "RAGSPRO"
- [ ] Copy the key → Save it
- [ ] ✅ Got Resend key

### C. Razorpay Keys
- [ ] Go to: https://dashboard.razorpay.com/app/keys
- [ ] Login to account
- [ ] Click "Generate Test Keys"
- [ ] Copy "Key ID" → Save it
- [ ] Copy "Key Secret" → Save it
- [ ] ✅ Got Razorpay keys

### D. Gemini AI Key (Optional)
- [ ] Go to: https://makersuite.google.com/app/apikey
- [ ] Click "Create API Key"
- [ ] Copy the key → Save it
- [ ] ✅ Got Gemini key (optional)

---

## ⚙️ STEP 3: ADD TO VERCEL

### Open Vercel
- [ ] Go to: https://vercel.com/dashboard
- [ ] Select project: "ragspro"
- [ ] Click "Settings"
- [ ] Click "Environment Variables"

### Add Variables (Click "Add New" for each)

#### Required Variables:
- [ ] Add: `NEXT_PUBLIC_SITE_URL` = `https://ragspro.com`
- [ ] Add: `NEXT_PUBLIC_SUPABASE_URL` = `https://wipcbdqqlryctwnlembh.supabase.co`
- [ ] Add: `NEXT_PUBLIC_SUPABASE_ANON_KEY` = [paste your anon key]
- [ ] Add: `SUPABASE_SERVICE_KEY` = [paste your service_role key]
- [ ] Add: `RESEND_API_KEY` = [paste your Resend key]
- [ ] Add: `COMPANY_EMAIL` = `ragsproai@gmail.com`
- [ ] Add: `NEXT_PUBLIC_RAZORPAY_KEY_ID` = [paste your Razorpay Key ID]
- [ ] Add: `RAZORPAY_KEY_SECRET` = [paste your Razorpay Secret]

#### Optional Variables:
- [ ] Add: `GEMINI_API_KEY` = [paste your Gemini key]
- [ ] Add: `ENABLE_AUTO_BLOG` = `true`
- [ ] Add: `CRON_SECRET` = [any random string like: abc123xyz789]

### For Each Variable:
- [ ] Select: ✅ Production
- [ ] Select: ✅ Preview
- [ ] Select: ✅ Development
- [ ] Click "Save"

### Redeploy:
- [ ] Go to "Deployments" tab
- [ ] Click "..." on latest deployment
- [ ] Click "Redeploy"
- [ ] Wait 2-3 minutes for deployment
- [ ] ✅ Redeployed successfully!

---

## 🧪 STEP 4: TEST EVERYTHING

### Test Admin Login
- [ ] Go to: https://ragspro.com
- [ ] Scroll to footer
- [ ] Click "Admin" link
- [ ] Enter email: `ragsproai@gmail.com`
- [ ] Enter password: `Raghav@03`
- [ ] Click "Sign In"
- [ ] Should redirect to: https://ragspro.com/admin
- [ ] ✅ Admin login works!

### Test Leads Dashboard
- [ ] Click "Leads Dashboard" card
- [ ] Should see empty leads list
- [ ] ✅ Leads dashboard loads!

### Test Portfolio Manager
- [ ] Go back to admin home
- [ ] Click "Portfolio Manager" card
- [ ] Should see empty projects list
- [ ] ✅ Portfolio manager loads!

### Test Form Submission
- [ ] Open new tab: https://ragspro.com/get-quote
- [ ] Fill form with test data:
  - Name: Test User
  - Email: test@example.com
  - Phone: 9999999999
  - Message: This is a test
- [ ] Click "Submit"
- [ ] Should see success message
- [ ] Go to: https://ragspro.com/admin/leads
- [ ] Should see your test lead
- [ ] ✅ Form submission works!

### Test Email Notification
- [ ] Check email: ragsproai@gmail.com
- [ ] Should have received notification email
- [ ] ✅ Email notifications work!

### Test Portfolio Add
- [ ] Go to: https://ragspro.com/admin/portfolio
- [ ] Click "Add Project" button
- [ ] Fill form:
  - Title: Test Project
  - Category: Web Development
  - Image URL: https://via.placeholder.com/600x400
  - Description: This is a test project
  - Technologies: React, Next.js
- [ ] Click "Save"
- [ ] Should see project in list
- [ ] Go to: https://ragspro.com/projects
- [ ] Should see your test project
- [ ] ✅ Portfolio manager works!

---

## 🎉 FINAL VERIFICATION

### All Features Working:
- [ ] ✅ Website loads: https://ragspro.com
- [ ] ✅ Admin login works
- [ ] ✅ Leads dashboard shows data
- [ ] ✅ Portfolio manager works
- [ ] ✅ Forms submit successfully
- [ ] ✅ Emails send correctly
- [ ] ✅ Mobile responsive
- [ ] ✅ WhatsApp button works (8826073013)

### Admin Access:
- [ ] ✅ Can access: https://ragspro.com/admin
- [ ] ✅ Can access: https://ragspro.com/admin/leads
- [ ] ✅ Can access: https://ragspro.com/admin/portfolio
- [ ] ✅ Can sign out

### Optional Features:
- [ ] Blog automation enabled (if Gemini key added)
- [ ] Google Analytics setup (optional)

---

## 🚀 YOU'RE LIVE!

**Congratulations!** Your website is fully functional and ready to accept clients.

**What You Have:**
- ✅ Professional website at ragspro.com
- ✅ Admin dashboard for managing everything
- ✅ Real-time lead tracking
- ✅ Portfolio management system
- ✅ Email notifications
- ✅ Payment processing (test mode)
- ✅ Mobile-optimized design
- ✅ WhatsApp integration

**Next Steps:**
1. Switch Razorpay from Test to Live keys when ready
2. Add real portfolio projects
3. Start marketing your services
4. Monitor leads in admin dashboard

**Time to get clients!** 🎉

---

## 📞 QUICK LINKS

**Website:** https://ragspro.com  
**Admin:** https://ragspro.com/admin  
**Leads:** https://ragspro.com/admin/leads  
**Portfolio:** https://ragspro.com/admin/portfolio

**Login:**
- Email: ragsproai@gmail.com
- Password: Raghav@03

**Contact:**
- Phone: 8826073013
- Email: ragsproai@gmail.com

---

**Setup Time:** ~15 minutes  
**Status:** Production Ready  
**Cost:** ₹0/month (free tier)

**Last Updated:** January 16, 2026

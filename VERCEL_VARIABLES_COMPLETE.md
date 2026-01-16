# ⚙️ Complete Vercel Environment Variables

## 🎯 Copy-Paste Ready Variables

Go to: https://vercel.com/dashboard → ragspro → Settings → Environment Variables

---

## ✅ ALREADY ADDED (From Screenshot)

```env
GEMINI_API_KEY=AIzaSyDCseLkH03Ft7HZQHNuA18T...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SUPABASE_URL=https://wipcbdqqlryctwnlembh.supabase.co
RESEND_API_KEY=re_7B6rm1Q5_4SHcGgAv5ptNPtpwNDt...
NEXT_PUBLIC_SITE_URL=https://ragspro.com
```

---

## 🔴 MISSING - ADD THESE NOW

### 1. Supabase Anon Key (CRITICAL!)
```env
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpcGNiZHFxbHJ5Y3R3bmxlbWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1NTA2MjMsImV4cCI6MjA4NDEyNjYyM30.4kMSfJ0gmGDDHxXOJEpZj_yPAxa53KXGyitokCc33BY
```

### 2. Company Email
```env
COMPANY_EMAIL=ragsproai@gmail.com
```

### 3. Blog Automation
```env
ENABLE_AUTO_BLOG=true
```

### 4. Cron Secret
```env
CRON_SECRET=ragspro_cron_secret_2026_secure
```

### 5. Razorpay Keys (Add when you get them)
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_secret_here
```

---

## 📋 COMPLETE LIST (All Variables)

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://ragspro.com

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=https://wipcbdqqlryctwnlembh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpcGNiZHFxbHJ5Y3R3bmxlbWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1NTA2MjMsImV4cCI6MjA4NDEyNjYyM30.4kMSfJ0gmGDDHxXOJEpZj_yPAxa53KXGyitokCc33BY
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpcGNiZHFxbHJ5Y3R3bmxlbWJoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODU1MDYyMywiZXhwIjoyMDg0MTI2NjIzfQ.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Email Service
RESEND_API_KEY=re_7B6rm1Q5_4SHcGgAv5ptNPtpwNDt...
COMPANY_EMAIL=ragsproai@gmail.com

# AI Blog Generation
GEMINI_API_KEY=AIzaSyDCseLkH03Ft7HZQHNuA18T...
ENABLE_AUTO_BLOG=true
CRON_SECRET=ragspro_cron_secret_2026_secure

# Payment Gateway (Add when ready)
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

---

## 🎯 HOW TO ADD IN VERCEL

### For Each Variable:

1. Click **"Add New"**
2. Enter **Key** (variable name)
3. Enter **Value** (the value)
4. Select environments:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
5. Click **"Save"**

### After Adding All:

1. Go to **"Deployments"** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes
5. ✅ Done!

---

## ✅ VERIFICATION

After redeployment, check:

1. **Website loads:** https://ragspro.com ✅
2. **Admin login works:** https://ragspro.com/admin ✅
3. **Forms submit:** https://ragspro.com/get-quote ✅
4. **Leads show:** https://ragspro.com/admin/leads ✅
5. **Portfolio works:** https://ragspro.com/admin/portfolio ✅

---

## 🔧 TROUBLESHOOTING

### If admin login fails:
- Check `NEXT_PUBLIC_SUPABASE_ANON_KEY` is added
- Check `SUPABASE_SERVICE_KEY` is correct
- Redeploy on Vercel
- Clear browser cache

### If forms don't submit:
- Check Supabase keys are correct
- Check database tables are created
- Check browser console for errors

### If emails don't send:
- Check `RESEND_API_KEY` is correct
- Check `COMPANY_EMAIL` is set
- Check Resend dashboard for logs

---

## 📞 QUICK REFERENCE

**Vercel Dashboard:** https://vercel.com/dashboard  
**Supabase Dashboard:** https://supabase.com/dashboard/project/wipcbdqqlryctwnlembh  
**Website:** https://ragspro.com  
**Admin:** https://ragspro.com/admin

**Admin Login:**
```
Email: ragsproai@gmail.com
Password: Raghav@03
```

---

**Last Updated:** January 16, 2026  
**Status:** Ready to Deploy

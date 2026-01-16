# 🔧 Vercel Environment Variables - Final Setup

## ⚠️ CRITICAL: Missing Variable Causing "Auth not configured" Error

**Problem:** `NEXT_PUBLIC_SUPABASE_ANON_KEY` is missing!

---

## 📋 ALL REQUIRED VARIABLES

Go to: https://vercel.com/dashboard → ragspro → Settings → Environment Variables

**Click "Add New" for each variable below:**

---

### 1. Site URL
```
Key: NEXT_PUBLIC_SITE_URL
Value: https://ragspro.com
Environments: ✅ Production ✅ Preview ✅ Development
```

---

### 2. Supabase URL
```
Key: NEXT_PUBLIC_SUPABASE_URL
Value: https://wipcbdqqlryctwnlembh.supabase.co
Environments: ✅ Production ✅ Preview ✅ Development
```

---

### 3. Supabase Anon Key (MISSING - ADD THIS!)
```
Key: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpcGNiZHFxbHJ5Y3R3bmxlbWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1NTA2MjMsImV4cCI6MjA4NDEyNjYyM30.4kMSfJ0gmGDDHxXOJEpZj_yPAxa53KXGyitokCc33BY
Environments: ✅ Production ✅ Preview ✅ Development
```

---

### 4. Supabase Service Key
```
Key: SUPABASE_SERVICE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpcGNiZHFxbHJ5Y3R3bmxlbWJoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODU1MDYyMywiZXhwIjoyMDg0MTI2NjIzfQ.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
Environments: ✅ Production ✅ Preview ✅ Development
```

---

### 5. Resend API Key
```
Key: RESEND_API_KEY
Value: re_7B6rm1Q5_4SHcGgAv5ptNPtpwNDt
Environments: ✅ Production ✅ Preview ✅ Development
```

---

### 6. Company Email
```
Key: COMPANY_EMAIL
Value: ragsproai@gmail.com
Environments: ✅ Production ✅ Preview ✅ Development
```

---

### 7. Gemini API Key
```
Key: GEMINI_API_KEY
Value: AIzaSyDCseLkH03Ft7HZQHNuA18T
Environments: ✅ Production ✅ Preview ✅ Development
```

---

### 8. Enable Auto Blog
```
Key: ENABLE_AUTO_BLOG
Value: true
Environments: ✅ Production ✅ Preview ✅ Development
```

---

### 9. Cron Secret
```
Key: CRON_SECRET
Value: ragspro_cron_secret_2026_secure
Environments: ✅ Production ✅ Preview ✅ Development
```

---

### 10. Razorpay Key ID (Optional - Add when ready)
```
Key: NEXT_PUBLIC_RAZORPAY_KEY_ID
Value: your_razorpay_key_id
Environments: ✅ Production ✅ Preview ✅ Development
```

---

### 11. Razorpay Secret (Optional - Add when ready)
```
Key: RAZORPAY_KEY_SECRET
Value: your_razorpay_secret
Environments: ✅ Production ✅ Preview ✅ Development
```

---

## 🚀 AFTER ADDING ALL VARIABLES:

1. Go to **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes for deployment to complete

---

## ✅ TEST LOGIN

After redeployment:

1. Go to: https://ragspro.com
2. Click "Admin" in footer
3. Login with:
   ```
   Email: ragsproai@gmail.com
   Password: Raghav@03
   ```
4. ✅ Should work now!

---

## 🔍 VERIFY VARIABLES

To check if all variables are added:

1. Go to Vercel Dashboard
2. Settings → Environment Variables
3. You should see 9-11 variables listed

---

## ⚠️ COMMON ISSUES

### Issue: Still getting "Auth not configured"
**Solution:**
- Make sure `NEXT_PUBLIC_SUPABASE_ANON_KEY` is added
- Make sure all environments are selected (Production, Preview, Development)
- Redeploy after adding variables
- Clear browser cache

### Issue: Login not working
**Solution:**
- Check if user exists in Supabase (Authentication → Users)
- If not, create user in Supabase dashboard
- Or run the SQL script to create admin user

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

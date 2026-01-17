# 🔴 FIX LOGIN ERROR - "Auth not configured"

## Problem
Login modal dikha raha hai: **"Auth not configured"**

## Reason
`.env.local` file missing hai jisme Supabase credentials hone chahiye

---

## ✅ SOLUTION (2 Options)

### Option 1: Automated Setup (Easiest)

```bash
# Run this script
./setup-auth.sh
```

Script will ask for:
1. Supabase Project URL
2. Supabase Anon Key
3. Supabase Service Role Key

Then automatically create `.env.local` file.

---

### Option 2: Manual Setup

**Step 1: Get Supabase Credentials**

1. Go to: https://supabase.com/dashboard
2. Login / Sign up
3. Select your project (or create new one)
4. Go to: **Settings** → **API**
5. Copy these 3 values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (starts with `eyJ...`)
   - **service_role** key (starts with `eyJ...`)

**Step 2: Create `.env.local` file**

```bash
# Create file
touch .env.local

# Open in editor
nano .env.local
```

**Step 3: Add this content:**

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_KEY=your_service_role_key_here

# Admin
ADMIN_SECRET=ragspro2025

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
COMPANY_EMAIL=ragsproai@gmail.com
```

**Step 4: Replace placeholders** with your actual Supabase values

**Step 5: Save file** (Ctrl+X, then Y, then Enter)

---

## 🔄 Restart Server

```bash
# Stop current server (Ctrl+C in terminal)
# Then start again:
npm run dev
```

---

## ✅ Test Login

1. Open: http://localhost:3000
2. Click any admin link
3. Login modal should open
4. **"Auth not configured" error should be GONE** ✅
5. You can now sign up / login

---

## 🔐 Create Admin Account

1. Click "Sign Up"
2. Email: `ragsproai@gmail.com`
3. Password: (your choice)
4. Sign up
5. Check email for verification
6. Login
7. **Admin button will appear in navbar** ✅

---

## 🆘 Agar Supabase Project Nahi Hai?

### Create New Project (5 minutes):

1. **Go to:** https://supabase.com
2. **Sign up** (free)
3. **New Project:**
   - Name: `ragspro-auth`
   - Password: (create strong password)
   - Region: **Singapore** (India ke paas)
   - Click "Create"
   - Wait 2-3 minutes

4. **Enable Email Auth:**
   - Go to: **Authentication** → **Providers**
   - Enable **Email**
   - Save

5. **Get API Keys:**
   - Go to: **Settings** → **API**
   - Copy URL, anon key, service key

6. **Add to `.env.local`** (as shown above)

7. **Run SQL Schema:**
   - Go to: **SQL Editor**
   - Copy content from `SUPABASE_SCHEMA.sql`
   - Run it

8. **Restart server**

---

## 📝 Files Created

- ✅ `QUICK_AUTH_FIX.md` - Detailed English guide
- ✅ `setup-auth.sh` - Automated setup script
- ✅ `FIX_LOGIN_NOW.md` - This file (Hindi + English)

---

## 🎯 Quick Commands

```bash
# Option 1: Automated
./setup-auth.sh

# Option 2: Manual
nano .env.local
# (add credentials)
# Save and exit

# Restart server
npm run dev
```

---

## ✅ Success Checklist

- [ ] `.env.local` file created
- [ ] Supabase credentials added
- [ ] Server restarted
- [ ] Login modal opens (no error)
- [ ] Can sign up / login
- [ ] Admin button visible

---

**Time needed: 2-5 minutes**  
**Result: Login working! 🎉**

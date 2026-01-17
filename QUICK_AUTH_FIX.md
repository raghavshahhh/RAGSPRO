# 🔧 QUICK FIX: "Auth not configured" Error

## Problem
Login modal shows "Auth not configured" because Supabase environment variables are missing.

---

## ✅ SOLUTION (2 Minutes)

### Option 1: Use Existing Supabase Project (If you have one)

1. **Get your Supabase credentials:**
   - Go to: https://supabase.com/dashboard
   - Select your project
   - Go to **Settings** → **API**
   - Copy:
     - **Project URL** (e.g., `https://xxxxx.supabase.co`)
     - **anon public key** (starts with `eyJ...`)
     - **service_role key** (starts with `eyJ...`)

2. **Create `.env.local` file:**

```bash
# Run this command in terminal:
cat > .env.local << 'EOF'
# Supabase Auth
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_KEY=your_service_role_key_here

# Admin
ADMIN_SECRET=ragspro2025

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
COMPANY_EMAIL=ragsproai@gmail.com
EOF
```

3. **Replace the placeholder values** with your actual Supabase credentials

4. **Restart dev server:**
```bash
# Stop current server (Ctrl+C)
npm run dev
```

---

### Option 2: Create New Supabase Project (If you don't have one)

1. **Go to Supabase:**
   - Visit: https://supabase.com
   - Sign up / Login
   - Click "New Project"

2. **Create project:**
   - Name: `ragspro-auth`
   - Database Password: (create a strong password)
   - Region: Singapore (closest to India)
   - Click "Create new project"
   - Wait 2-3 minutes for setup

3. **Enable Email Auth:**
   - Go to **Authentication** → **Providers**
   - Enable **Email** provider
   - Save

4. **Enable Google OAuth (Optional):**
   - Go to **Authentication** → **Providers**
   - Enable **Google** provider
   - Add your Google OAuth credentials
   - Save

5. **Get API Keys:**
   - Go to **Settings** → **API**
   - Copy:
     - Project URL
     - anon public key
     - service_role key

6. **Create `.env.local`** (same as Option 1 above)

7. **Run SQL Schema:**
   - Go to **SQL Editor** in Supabase
   - Copy content from `SUPABASE_SCHEMA.sql` file
   - Run it

8. **Restart dev server**

---

## 🎯 Quick Test

After setup:

1. **Restart server:**
```bash
npm run dev
```

2. **Open browser:**
```
http://localhost:3000
```

3. **Try to login:**
   - Click any admin link
   - Login modal should open
   - "Auth not configured" error should be GONE
   - You can now sign up / login

---

## 🔐 Create Admin Account

After Supabase is configured:

1. **Sign up with your email:**
   - Email: `ragsproai@gmail.com`
   - Password: (your choice)

2. **Verify email** (check inbox)

3. **Login** - Admin button will appear in navbar

---

## 📝 What Each Variable Does

```env
# Public URL - used by client-side code
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co

# Public key - safe to expose in browser
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

# Secret key - NEVER expose in browser, server-only
SUPABASE_SERVICE_KEY=eyJhbGc...

# Admin dashboard password
ADMIN_SECRET=ragspro2025

# Your site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Company email
COMPANY_EMAIL=ragsproai@gmail.com
```

---

## 🚨 Important Notes

1. **Never commit `.env.local`** to git (already in .gitignore)
2. **Use different keys** for production (add to Vercel)
3. **Service role key** is very powerful - keep it secret
4. **Anon key** is safe to expose in browser

---

## 🆘 Still Not Working?

### Check 1: File exists
```bash
ls -la .env.local
```
Should show the file

### Check 2: Variables loaded
```bash
# Add this to any page temporarily:
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
```

### Check 3: Restart server
```bash
# Kill all node processes
killall node
# Start fresh
npm run dev
```

### Check 4: Clear Next.js cache
```bash
rm -rf .next
npm run dev
```

---

## ✅ Success Checklist

- [ ] `.env.local` file created
- [ ] Supabase credentials added
- [ ] Dev server restarted
- [ ] Login modal opens without "Auth not configured" error
- [ ] Can sign up / login
- [ ] Admin button appears for ragsproai@gmail.com

---

**Setup time: 2-5 minutes**  
**Result: Working authentication! 🎉**

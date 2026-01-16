# 🔐 Admin Login Setup Guide

## ✅ What's Done

1. **Footer Admin Button Added** ✅
   - "Admin" link added in footer
   - Triggers login modal
   - Auto-redirects to `/admin` after login

2. **Login Modal Integrated** ✅
   - Opens when "Admin" clicked
   - Supports email/password login
   - Google login option
   - Auto-redirect to admin dashboard

3. **Admin Dashboard Ready** ✅
   - `/admin` - Main dashboard
   - `/admin/leads` - Leads management
   - `/admin/portfolio` - Portfolio management

---

## 🚀 How to Create Admin User

### Method 1: Using Supabase Dashboard (Recommended)

#### Step 1: Go to Supabase Dashboard
1. Open: https://supabase.com/dashboard
2. Select your project
3. Go to **Authentication** → **Users**

#### Step 2: Create Admin User
1. Click **"Add User"** button
2. Fill in details:
   ```
   Email: ragsproai@gmail.com
   Password: Raghav@03
   ```
3. Click **"Create User"**
4. ✅ Done!

#### Step 3: Verify Email (Optional)
- If email verification is required:
  - Go to user details
  - Click **"Confirm Email"**
  - Or check email for verification link

---

### Method 2: Using Signup on Website

#### Step 1: Go to Website
1. Open: `http://localhost:3000`
2. Scroll to footer
3. Click **"Admin"** link

#### Step 2: Sign Up
1. Click **"Sign Up"** tab
2. Fill in:
   ```
   Name: Raghav Shah
   Email: ragsproai@gmail.com
   Phone: 8826073013
   Password: Raghav@03
   ```
3. Click **"Sign Up"**
4. Check email for verification link
5. Click verification link
6. ✅ Done!

---

### Method 3: Using SQL (Advanced)

#### Run this in Supabase SQL Editor:

```sql
-- Create admin user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  confirmation_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'ragsproai@gmail.com',
  crypt('Raghav@03', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Raghav Shah","phone":"8826073013"}',
  false,
  ''
);
```

**Note:** This requires `pgcrypto` extension enabled.

---

## 🔑 Admin Login Flow

### Step 1: Access Login
**Option A:** Click "Admin" in footer  
**Option B:** Go to: `http://localhost:3000/?login=true`  
**Option C:** Go to: `http://localhost:3000/admin` (auto-redirects to login)

### Step 2: Enter Credentials
```
Email: ragsproai@gmail.com
Password: Raghav@03
```

### Step 3: Auto-Redirect
- After successful login → Redirects to `/admin`
- See admin dashboard with:
  - Leads Dashboard
  - Portfolio Manager
  - Quick links

---

## 🎯 Admin Dashboard Features

### Main Dashboard (`/admin`)
- Welcome message
- Leads dashboard card
- Portfolio manager card
- Quick links to pages
- Sign out button

### Leads Dashboard (`/admin/leads`)
- View all form submissions
- Real-time updates (30s refresh)
- Filter by status
- Update lead status
- WhatsApp/Email/Call buttons
- Lead details view

### Portfolio Manager (`/admin/portfolio`)
- Add new projects
- Edit existing projects
- Delete projects
- Upload images
- Set display order
- Activate/deactivate projects

---

## 🔒 Security Features

### Authentication
- ✅ Supabase Auth (secure)
- ✅ Password hashing
- ✅ Session management
- ✅ Protected routes
- ✅ Auto-redirect if not logged in

### Authorization
- ✅ Only authenticated users can access admin
- ✅ RLS policies on database
- ✅ API endpoint protection
- ✅ CSRF protection

---

## 🐛 Troubleshooting

### Issue: Can't create user
**Solution:** 
- Check Supabase project is active
- Verify email settings in Supabase
- Check if email already exists

### Issue: Login not working
**Solution:**
- Verify credentials are correct
- Check Supabase connection
- Check browser console for errors
- Verify environment variables

### Issue: Not redirecting to admin
**Solution:**
- Check AuthContext is working
- Verify user session exists
- Check browser console
- Try refreshing page

### Issue: Admin pages show "Not authorized"
**Solution:**
- Verify user is logged in
- Check session hasn't expired
- Try logging out and in again
- Clear browser cache

---

## 📝 Environment Variables Required

Make sure these are set in `.env.local`:

```env
# Supabase (Required for auth)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_KEY=xxx

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## ✅ Testing Checklist

- [ ] Admin button visible in footer
- [ ] Clicking "Admin" opens login modal
- [ ] Can enter email and password
- [ ] Login button works
- [ ] Redirects to `/admin` after login
- [ ] Can see admin dashboard
- [ ] Can access leads dashboard
- [ ] Can access portfolio manager
- [ ] Can sign out
- [ ] Protected routes work (redirect if not logged in)

---

## 🎉 Quick Start

### Fastest Way to Get Started:

1. **Create User in Supabase:**
   - Go to Supabase Dashboard
   - Authentication → Users → Add User
   - Email: `ragsproai@gmail.com`
   - Password: `Raghav@03`
   - Confirm email

2. **Login on Website:**
   - Go to footer
   - Click "Admin"
   - Enter credentials
   - ✅ You're in!

**Total Time:** 2 minutes

---

## 📞 Support

If you face any issues:
1. Check browser console for errors
2. Verify Supabase connection
3. Check environment variables
4. Try incognito mode
5. Clear cache and cookies

---

**Last Updated:** January 16, 2026  
**Created By:** Kiro AI Assistant  
**Project:** RAGSPRO Admin System

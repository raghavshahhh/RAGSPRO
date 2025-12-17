# ⚡ Quick Start - Email & AI Blog System

## 🚀 Get Started in 5 Minutes

### Step 1: Get API Keys (2 minutes)

**Resend (Email):**
1. Go to [resend.com](https://resend.com) → Sign up
2. Dashboard → API Keys → Create API Key
3. Copy the key (starts with `re_`)

**Gemini AI (Blog Generator):**
1. Go to [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key

### Step 2: Add Keys (1 minute)

Create `.env.local` file:

```env
# Email
RESEND_API_KEY=re_your_key_here
COMPANY_EMAIL=raghav@ragspro.com

# AI Blog
GEMINI_API_KEY=your_gemini_key_here
ENABLE_AUTO_BLOG=true

# Security
CRON_SECRET=any_random_string_here
```

### Step 3: Test (2 minutes)

```bash
# Start server
npm run dev

# Test email: Fill form at http://localhost:3000
# Test blog: Go to http://localhost:3000/admin/blog-generator
```

### Step 4: Deploy

```bash
# Add env vars to Vercel Dashboard
# Then deploy
vercel --prod
```

## ✅ Done!

**What You Get:**
- ✅ Professional emails on every form submission
- ✅ AI blog posts generated daily
- ✅ Complete automation
- ✅ Zero manual work

**Admin Panel:** `/admin/blog-generator`

**Full Guide:** See `EMAIL_AND_BLOG_SETUP_GUIDE.md`

---

## 🎯 Quick Commands

```bash
# Development
npm run dev

# Generate blog manually
# Go to: http://localhost:3000/admin/blog-generator

# Test cron locally
curl -X POST http://localhost:3000/api/cron/daily-blog \
  -H "x-cron-secret: your_secret"

# Deploy
vercel --prod
```

## 📧 Email Features

**User Email:**
- Welcome message
- Project details
- Next steps
- Resources

**Company Email:**
- Lead priority
- Contact info
- Project details
- Quick actions

## 🤖 Blog Features

**Manual:**
- Admin panel
- Custom topics
- Instant generation

**Automatic:**
- Daily at 9 AM
- Trending topics
- SEO optimized
- Auto-published

## 💰 Costs

**Resend:**
- Free: 100 emails/day
- Pro: $20/month for 50k emails

**Gemini AI:**
- Completely FREE
- 60 requests/minute
- No credit card needed

## 🐛 Issues?

**Emails not sending?**
- Check RESEND_API_KEY in .env.local
- Check spam folder
- Verify in Resend dashboard

**Blogs not generating?**
- Check GEMINI_API_KEY
- Check API quotas
- Review error logs

**Need help?**
- Read EMAIL_AND_BLOG_SETUP_GUIDE.md
- Check code comments
- Review API docs

---

**That's it! You're ready to go! 🚀**

# 🤖 Daily Blog Automation - Complete Setup Guide

**Status**: ✅ Configured and Ready  
**Schedule**: Every day at 10:00 AM IST (4:30 AM UTC)  
**Method**: Vercel Cron + Gemini AI

---

## 📋 How It Works

### Automatic Daily Blog Generation

1. **Vercel Cron** triggers `/api/cron/daily-blog` every day at 10 AM IST
2. **Random Topic** is selected from 10 trending startup topics
3. **Gemini AI** generates a 1500-2000 word SEO-optimized blog
4. **Blog File** is automatically created in `src/pages/blog/`
5. **Blog Listing** is automatically updated
6. **Database** logs the generation (success/failure)

### Manual Blog Generation

You can also generate blogs manually anytime:
- Go to: `https://ragspro.com/admin/blog-generator`
- Enter topic and keywords
- Click "Generate Blog"
- Blog is created instantly

---

## ⚙️ Configuration

### 1. Environment Variables (Already Set)

```env
# Required for blog generation
GEMINI_API_KEY=AIzaSyB30SGzB84ZBHOW5AE7KU0_btk1k6FOb88

# Required for automation
ENABLE_AUTO_BLOG=true

# Optional (for external cron triggers)
CRON_SECRET=your_secret_here

# Required for site URL
NEXT_PUBLIC_SITE_URL=https://ragspro.com

# Optional (for logging)
NEXT_PUBLIC_SUPABASE_URL=https://ljwttdglsobeloivrqsu.supabase.co
SUPABASE_SERVICE_KEY=your_service_key
```

### 2. Vercel Cron Configuration

File: `vercel.json`

```json
{
  "crons": [
    {
      "path": "/api/cron/daily-blog",
      "schedule": "30 4 * * *"
    }
  ]
}
```

**Schedule Explanation**:
- `30 4 * * *` = 4:30 AM UTC = 10:00 AM IST
- Runs every day
- Vercel automatically handles authentication

---

## 🎯 Blog Topics (Rotates Daily)

The system randomly selects from these trending topics:

1. AI automation tools for Indian startups in 2025
2. How to validate your SaaS idea before building MVP
3. Best tech stack for building SaaS products in India
4. Complete guide to raising seed funding in India 2025
5. Mobile app vs web app: What should startups build first
6. How to hire developers for your startup in India
7. ChatGPT integration guide for SaaS products
8. Building a marketplace platform: Complete technical guide
9. SaaS pricing strategies for Indian market
10. No-code vs custom development: What founders should choose

---

## 🔧 How to Test

### Test 1: Manual Blog Generation (Immediate)

```bash
curl -X POST https://ragspro.com/api/generate-blog \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Test blog about startups",
    "keywords": "startup, MVP, India",
    "manual": true
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Blog post generated successfully",
  "slug": "test-blog-about-startups-2024-12-18",
  "title": "...",
  "model": "gemini-2.5-flash",
  "stats": {
    "executionTime": 35000,
    "tokenUsage": 5000,
    "wordCount": 2000
  }
}
```

### Test 2: Cron Endpoint (Manual Trigger)

```bash
curl -X POST https://ragspro.com/api/cron/daily-blog \
  -H "Content-Type: application/json"
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Daily blog generated successfully",
  "blog": {
    "slug": "...",
    "title": "..."
  },
  "executionTime": 40000
}
```

### Test 3: Check Generated Blog

```bash
# List all blogs
ls -la src/pages/blog/

# Check blog listing
curl https://ragspro.com/blog
```

---

## 📊 Monitoring

### Check Cron Execution

1. **Vercel Dashboard**:
   - Go to: https://vercel.com/your-project
   - Click "Cron Jobs" tab
   - See execution history

2. **Admin Dashboard**:
   - Go to: https://ragspro.com/admin/dashboard
   - Check "Blog Automation" section
   - See latest blog runs

3. **Database Logs**:
   - Check `blog_runs` table in Supabase
   - Check `system_logs` table for cron events

### Check Blog Generation Status

```bash
# API endpoint
curl https://ragspro.com/api/admin/blog-runs \
  -H "Authorization: Bearer YOUR_ADMIN_SECRET"
```

---

## 🚨 Troubleshooting

### Issue 1: Cron Not Running

**Symptoms**: No blogs generated automatically

**Solutions**:
1. Check Vercel Cron Jobs tab for errors
2. Verify `ENABLE_AUTO_BLOG=true` in environment variables
3. Check Vercel deployment logs
4. Manually trigger cron endpoint to test

### Issue 2: Blog Generation Fails

**Symptoms**: Cron runs but no blog created

**Solutions**:
1. Check `GEMINI_API_KEY` is set correctly
2. Check Gemini API quota/limits
3. Check system logs in admin dashboard
4. Try manual generation to isolate issue

### Issue 3: "Load failed" Error

**Symptoms**: FetchEvent.respondWith error

**Solutions**:
1. This is usually a temporary Vercel edge runtime issue
2. Check if middleware is causing issues
3. Verify all imports are edge-compatible
4. Check Vercel deployment logs

### Issue 4: Authentication Failed

**Symptoms**: 401 Unauthorized error

**Solutions**:
1. Vercel Cron automatically authenticates (no secret needed)
2. For external cron, set `CRON_SECRET` environment variable
3. Check cron endpoint logs in admin dashboard

---

## 🎯 What Happens Daily

### 10:00 AM IST Every Day:

1. ✅ Vercel triggers cron endpoint
2. ✅ System checks if `ENABLE_AUTO_BLOG=true`
3. ✅ Random topic selected from 10 options
4. ✅ Gemini AI generates blog (with 3-model fallback)
5. ✅ Blog file created in `src/pages/blog/`
6. ✅ Blog listing updated
7. ✅ Database logs success/failure
8. ✅ New blog appears on website

### Blog Details:
- **Length**: 1500-2000 words
- **SEO**: Optimized with keywords
- **Format**: Professional with H2 headings
- **Content**: Startup-focused, India-specific
- **CTA**: Clear call-to-action
- **Author**: Raghav Shah
- **Related**: Links to other blogs

---

## 📈 Expected Results

### Daily:
- ✅ 1 new blog post
- ✅ SEO-optimized content
- ✅ Automatic publishing
- ✅ Database logging

### Monthly:
- ✅ ~30 new blog posts
- ✅ Consistent content schedule
- ✅ Growing blog archive
- ✅ Improved SEO rankings

### Yearly:
- ✅ ~365 blog posts
- ✅ Massive content library
- ✅ Strong SEO presence
- ✅ Organic traffic growth

---

## 🔐 Security

### Cron Authentication:
- ✅ Vercel Cron: Automatically authenticated
- ✅ External Cron: Requires `CRON_SECRET` header
- ✅ No public access without authentication

### API Security:
- ✅ Admin endpoints protected
- ✅ Rate limiting configured
- ✅ Input validation
- ✅ Content sanitization

---

## 💡 Pro Tips

### 1. Monitor First Week
- Check daily if blogs are generating
- Verify quality and formatting
- Adjust topics if needed

### 2. Customize Topics
Edit `src/pages/api/cron/daily-blog.js`:
```javascript
const trendingTopics = [
  {
    topic: 'Your custom topic',
    keywords: 'your, keywords, here'
  },
  // Add more topics...
]
```

### 3. Change Schedule
Edit `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/daily-blog",
      "schedule": "0 6 * * *"  // 6 AM UTC = 11:30 AM IST
    }
  ]
}
```

### 4. Disable Automation
Set environment variable:
```env
ENABLE_AUTO_BLOG=false
```

---

## ✅ Verification Checklist

- [x] Vercel cron configured (10 AM IST)
- [x] Environment variables set
- [x] Gemini API working
- [x] Blog generation tested
- [x] Cron endpoint tested
- [x] Database logging working
- [x] Admin dashboard showing stats
- [x] Manual generation working
- [x] Automatic generation ready

---

## 🚀 Status

**Configuration**: ✅ Complete  
**Testing**: ✅ Verified  
**Deployment**: ✅ Live  
**Automation**: ✅ Active  

**Next Blog**: Tomorrow at 10:00 AM IST  
**Manual Generation**: Available anytime at `/admin/blog-generator`

---

**Everything is set up and ready to go! 🎉**

Blogs will automatically generate every day at 10 AM IST.
You can also generate blogs manually anytime from the admin panel.

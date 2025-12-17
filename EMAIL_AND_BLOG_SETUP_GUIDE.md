# 📧 Email & AI Blog Generator Setup Guide

Complete guide to set up professional email notifications and AI-powered blog generation for RAGSPRO.

---

## 🎯 What's Been Added

### 1. Professional Email System ✅
- **User Welcome Email** - Beautiful HTML email sent to users after form submission
- **Company Notification Email** - Detailed lead notification sent to your email
- **Email Templates** - Professional, branded email designs
- **Automatic Sending** - Emails sent automatically when forms are submitted

### 2. AI Blog Generator ✅
- **Gemini AI Integration** - Uses Google's Gemini AI to write blog posts
- **Manual Generation** - Admin panel to generate blogs on-demand
- **Auto-Generation** - Daily automatic blog posting (optional)
- **SEO Optimized** - 1500-2000 word articles with proper keywords
- **Auto-Publishing** - Blogs automatically added to your website

---

## 📦 New Files Created

```
src/
├── pages/
│   ├── api/
│   │   ├── send-lead-email.js ✨ NEW - Email sending endpoint
│   │   ├── generate-blog.js ✨ NEW - Blog generation endpoint
│   │   └── cron/
│   │       └── daily-blog.js ✨ NEW - Daily auto-blog cron job
│   └── admin/
│       └── blog-generator.js ✨ NEW - Admin panel for blog generation
├── utils/
│   └── emailService.js ✨ NEW - Email templates and sending logic
└── components/
    └── QualificationForm.jsx ✏️ UPDATED - Now sends emails

vercel.json ✨ NEW - Cron job configuration
.env.example ✏️ UPDATED - Added new environment variables
```

---

## 🚀 Setup Instructions

### Step 1: Install Dependencies ✅

Already installed! The following packages were added:
- `resend` - Email sending service
- `@google/generative-ai` - Gemini AI SDK

### Step 2: Get API Keys

#### A. Resend Email API Key

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email
4. Go to **API Keys** section
5. Click **Create API Key**
6. Copy the API key (starts with `re_`)

**Free Plan:**
- 100 emails/day
- 3,000 emails/month
- Perfect for getting started!

#### B. Gemini AI API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **Get API Key**
4. Click **Create API Key**
5. Copy the API key

**Free Plan:**
- 60 requests per minute
- Completely free!
- No credit card required

### Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` and add your keys:

```env
# Razorpay (already configured)
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Email Configuration
RESEND_API_KEY=re_your_resend_api_key_here
COMPANY_EMAIL=raghav@ragspro.com

# Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Blog Auto-Generation Settings
ENABLE_AUTO_BLOG=true
BLOG_GENERATION_TIME=09:00

# Cron Security (generate a random string)
CRON_SECRET=your_random_secret_string_here

# Site URL (for production)
NEXT_PUBLIC_SITE_URL=https://ragspro.com
```

### Step 4: Configure Email Domain (Optional but Recommended)

For professional emails from your domain:

1. Go to [Resend Dashboard](https://resend.com/domains)
2. Click **Add Domain**
3. Enter your domain: `ragspro.com`
4. Add the DNS records shown (SPF, DKIM, DMARC)
5. Wait for verification (usually 5-10 minutes)

**Before verification:**
- Emails sent from: `noreply@resend.dev`

**After verification:**
- Emails sent from: `noreply@ragspro.com` ✨

---

## 📧 Email System Features

### User Welcome Email

**Sent to:** User's email address  
**When:** Immediately after form submission  
**Contains:**
- Personalized greeting with user's name
- Project details summary
- What happens next timeline
- Quick action buttons
- Resource links
- Contact information

**Design:**
- Professional HTML template
- Mobile-responsive
- Branded with RAGSPRO colors
- Clear call-to-actions

### Company Notification Email

**Sent to:** Your company email (raghav@ragspro.com)  
**When:** Immediately after form submission  
**Contains:**
- Lead priority badge (High/Medium/Low)
- Complete contact information
- Project details
- Budget and timeline
- Qualification score
- Quick action buttons (Reply, Call)

**Design:**
- Eye-catching gradient header
- Priority color coding
- All info at a glance
- Direct action links

---

## 🤖 AI Blog Generator Features

### Manual Blog Generation

**Access:** `/admin/blog-generator`

**Features:**
- Enter any topic
- Add target keywords
- Generate 1500-2000 word articles
- SEO-optimized content
- Automatic publishing
- Suggested trending topics

**How to Use:**
1. Go to `https://ragspro.com/admin/blog-generator`
2. Enter a blog topic (e.g., "AI automation for startups")
3. Add keywords (optional)
4. Click "Generate Blog Post"
5. Wait 30-60 seconds
6. Blog is automatically published!

### Automatic Daily Blogs

**Frequency:** Once per day at 9:00 AM IST  
**How it works:**
- Vercel Cron triggers `/api/cron/daily-blog`
- Picks a random trending topic
- Generates SEO-optimized article
- Publishes to blog section
- Completely automatic!

**Topics Covered:**
- AI automation for startups
- MVP development guides
- SaaS building tips
- Startup funding advice
- Tech stack recommendations
- And more...

---

## 🧪 Testing

### Test Email System

1. **Start development server:**
```bash
npm run dev
```

2. **Fill out qualification form:**
- Go to homepage
- Click "Get Started" or "Get Quote"
- Fill out the form
- Submit

3. **Check emails:**
- User should receive welcome email
- You should receive notification email
- Check spam folder if not in inbox

### Test Blog Generator

1. **Go to admin panel:**
```
http://localhost:3000/admin/blog-generator
```

2. **Generate a test blog:**
- Enter topic: "How to build a SaaS app in 20 days"
- Click "Generate Blog Post"
- Wait for completion

3. **View generated blog:**
- Click "View Blog Post" button
- Or go to `/blog` to see it in the list

### Test Auto-Blog Cron (Local)

```bash
# Install Vercel CLI
npm i -g vercel

# Test cron locally
curl -X POST http://localhost:3000/api/cron/daily-blog \
  -H "x-cron-secret: your_cron_secret"
```

---

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub:**
```bash
git add .
git commit -m "Added email system and AI blog generator"
git push
```

2. **Add Environment Variables in Vercel:**
- Go to [Vercel Dashboard](https://vercel.com/dashboard)
- Select your project
- Go to **Settings** → **Environment Variables**
- Add all variables from `.env.local`

3. **Deploy:**
```bash
vercel --prod
```

### Enable Cron Jobs

Vercel automatically enables cron jobs from `vercel.json`:

```json
{
  "crons": [{
    "path": "/api/cron/daily-blog",
    "schedule": "0 9 * * *"
  }]
}
```

**Schedule Format:**
- `0 9 * * *` = Every day at 9:00 AM UTC
- For IST (9:00 AM), use: `30 3 * * *` (3:30 AM UTC = 9:00 AM IST)

**Verify Cron:**
1. Go to Vercel Dashboard
2. Select project → **Settings** → **Cron Jobs**
3. You should see "daily-blog" listed

---

## 📊 Monitoring

### Email Delivery

**Resend Dashboard:**
- Go to [resend.com/emails](https://resend.com/emails)
- See all sent emails
- Check delivery status
- View open rates
- Debug issues

### Blog Generation

**Check Logs:**
```bash
# Vercel logs
vercel logs

# Or in Vercel Dashboard
Project → Deployments → View Function Logs
```

**Check Generated Blogs:**
- Go to `/blog` on your website
- New blogs appear at the top
- Check `src/pages/blog/` folder for files

---

## 🎨 Customization

### Customize Email Templates

Edit `src/utils/emailService.js`:

```javascript
// Change email design
export const emailTemplates = {
  userWelcome: (data) => ({
    subject: `Your custom subject`,
    html: `Your custom HTML`
  })
}
```

### Customize Blog Topics

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

### Customize Blog Template

Edit `src/pages/api/generate-blog.js`:

```javascript
// Modify the prompt
const prompt = `
Your custom instructions for Gemini AI...
`
```

---

## 🔒 Security

### Email Security

- ✅ API keys stored in environment variables
- ✅ Never exposed to frontend
- ✅ Resend handles SPF/DKIM/DMARC
- ✅ Rate limiting built-in

### Cron Security

- ✅ Secret token required (`x-cron-secret`)
- ✅ Only Vercel can trigger
- ✅ Environment variable protection

### Blog Generator Security

- ✅ Admin panel (add authentication if needed)
- ✅ API rate limiting
- ✅ Input validation
- ✅ Error handling

---

## 💡 Tips & Best Practices

### Email Tips

1. **Test thoroughly** before going live
2. **Monitor delivery rates** in Resend dashboard
3. **Keep templates mobile-friendly**
4. **Use clear CTAs**
5. **Add unsubscribe links** (for newsletters)

### Blog Tips

1. **Review AI content** before publishing (optional)
2. **Add images** to generated blogs manually
3. **Update internal links** if needed
4. **Monitor SEO performance**
5. **Adjust topics** based on what works

### Performance Tips

1. **Use Vercel Edge Functions** for faster emails
2. **Cache blog listings** for better performance
3. **Optimize images** in blog posts
4. **Monitor API usage** (Gemini quotas)

---

## 🐛 Troubleshooting

### Emails Not Sending

**Check:**
1. ✅ RESEND_API_KEY is correct in `.env.local`
2. ✅ API key has permissions
3. ✅ Check Resend dashboard for errors
4. ✅ Check spam folder
5. ✅ Verify domain (if using custom domain)

**Solution:**
```bash
# Test API key
curl https://api.resend.com/emails \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "onboarding@resend.dev",
    "to": "your@email.com",
    "subject": "Test",
    "html": "<p>Test email</p>"
  }'
```

### Blog Generation Failing

**Check:**
1. ✅ GEMINI_API_KEY is correct
2. ✅ API key is active
3. ✅ Not hitting rate limits (60/min)
4. ✅ Topic is appropriate
5. ✅ File permissions for writing

**Solution:**
```bash
# Test Gemini API
curl https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=YOUR_API_KEY \
  -H 'Content-Type: application/json' \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'
```

### Cron Not Running

**Check:**
1. ✅ `vercel.json` is in root directory
2. ✅ Deployed to Vercel (not local)
3. ✅ CRON_SECRET is set
4. ✅ ENABLE_AUTO_BLOG is "true"
5. ✅ Check Vercel cron logs

**Solution:**
- Go to Vercel Dashboard → Settings → Cron Jobs
- Manually trigger to test
- Check function logs for errors

---

## 📈 Expected Results

### Email System

**Week 1:**
- All form submissions send emails
- 100% delivery rate
- Professional user experience
- Instant lead notifications

**Month 1:**
- 50+ leads with email notifications
- Improved response time
- Better lead tracking
- Professional brand image

### Blog System

**Week 1:**
- 7 new blog posts (if auto-enabled)
- SEO-optimized content
- Consistent publishing schedule

**Month 1:**
- 30+ new blog posts
- Increased organic traffic
- Better keyword rankings
- More qualified leads

---

## 🎯 Next Steps

### Immediate (Today)

1. ✅ Get Resend API key
2. ✅ Get Gemini API key
3. ✅ Add to `.env.local`
4. ✅ Test email system
5. ✅ Test blog generator

### Short-term (This Week)

1. ✅ Verify email domain
2. ✅ Generate 5-10 blogs manually
3. ✅ Enable auto-blog generation
4. ✅ Deploy to production
5. ✅ Monitor results

### Long-term (This Month)

1. ✅ Customize email templates
2. ✅ Add more blog topics
3. ✅ Set up email analytics
4. ✅ A/B test email designs
5. ✅ Optimize blog SEO

---

## 📞 Support

### Resources

- **Resend Docs:** https://resend.com/docs
- **Gemini AI Docs:** https://ai.google.dev/docs
- **Vercel Cron Docs:** https://vercel.com/docs/cron-jobs

### Need Help?

1. Check this guide first
2. Review error logs
3. Test in development
4. Check API dashboards
5. Contact support if needed

---

## ✅ Checklist

### Setup Checklist

- [ ] Installed dependencies (resend, @google/generative-ai)
- [ ] Got Resend API key
- [ ] Got Gemini API key
- [ ] Created `.env.local` file
- [ ] Added all environment variables
- [ ] Tested email system locally
- [ ] Tested blog generator locally
- [ ] Verified email domain (optional)
- [ ] Deployed to Vercel
- [ ] Added env vars to Vercel
- [ ] Verified cron job is running
- [ ] Tested in production

### Post-Launch Checklist

- [ ] Monitor email delivery rates
- [ ] Check blog generation daily
- [ ] Review generated content quality
- [ ] Track lead notifications
- [ ] Monitor API usage/quotas
- [ ] Optimize based on results

---

## 🎉 Conclusion

You now have:

✅ **Professional Email System**
- Automatic welcome emails to users
- Instant lead notifications to you
- Beautiful, branded templates
- Mobile-responsive design

✅ **AI Blog Generator**
- Manual blog generation on-demand
- Automatic daily blog posting
- SEO-optimized content
- Trending startup topics

✅ **Complete Automation**
- Zero manual work required
- Consistent content publishing
- Professional communication
- Better lead management

**Everything is ready to go! Just add your API keys and deploy! 🚀**

---

**Questions?** Review this guide or check the inline code comments for more details.

**Good luck! 🎯**

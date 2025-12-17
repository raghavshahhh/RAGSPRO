# ⚡ RAGSPRO Quick Setup Guide

**Time Required:** 15-20 minutes  
**Difficulty:** Easy

---

## 🎯 Step 1: Environment Variables (5 min)

### Create `.env.local` file:

```bash
cp .env.example .env.local
```

### Fill in the values:

```bash
# Required for basic functionality
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXX
RAZORPAY_KEY_SECRET=XXXXXXXXXX

# Optional (for full features)
GEMINI_API_KEY=XXXXXXXXXX
RESEND_API_KEY=re_XXXXXXXXXX
COMPANY_EMAIL=ragsproai@gmail.com
CRON_SECRET=$(openssl rand -base64 32)
ENABLE_AUTO_BLOG=false
```

---

## 🔑 Step 2: Get API Keys (10 min)

### 2.1 Razorpay (Required for payments)
1. Go to https://razorpay.com
2. Sign up / Log in
3. Dashboard → Settings → API Keys
4. Generate Test Keys
5. Copy `Key ID` and `Key Secret`

### 2.2 Gemini AI (Optional - for blog generation)
1. Go to https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy the key

### 2.3 Resend (Optional - for emails)
1. Go to https://resend.com
2. Sign up with email
3. Dashboard → API Keys
4. Create new API key
5. Copy the key

---

## 🚀 Step 3: Run Locally (2 min)

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open http://localhost:3000

---

## ☁️ Step 4: Deploy to Vercel (3 min)

### Option A: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables
vercel env add NEXT_PUBLIC_RAZORPAY_KEY_ID
vercel env add RAZORPAY_KEY_SECRET
# ... add all other variables
```

### Option B: Using Vercel Dashboard
1. Go to https://vercel.com
2. Click "Import Project"
3. Connect your GitHub repo
4. Add environment variables in Settings
5. Deploy!

---

## ✅ Step 5: Verify Everything Works

### Test Checklist:
- [ ] Website loads properly
- [ ] Mobile view looks good
- [ ] Navbar shrinks/expands on scroll
- [ ] Project images load
- [ ] Testimonials show avatars
- [ ] Contact forms work
- [ ] Payment flow works (test mode)
- [ ] Blog pages load

---

## 🎨 Step 6: Customize Content

### Update Your Information:

**1. Contact Details** (`src/components/Footer.js`):
```javascript
// Update email and phone
<a href="mailto:YOUR_EMAIL">YOUR_EMAIL</a>
<a href="tel:YOUR_PHONE">YOUR_PHONE</a>
```

**2. Social Links** (`src/components/Footer.js`):
```javascript
// Update social media URLs
<a href="https://instagram.com/YOUR_HANDLE">
<a href="https://linkedin.com/in/YOUR_PROFILE">
```

**3. Projects** (`src/components/HeroSection.js`):
```javascript
// Update projects array with your projects
const projects = [
  { 
    id: 1, 
    name: 'Your Project', 
    image: '/images/projects/your-project.jpg', 
    url: 'https://yourproject.com'
  },
  // ... more projects
]
```

**4. Testimonials** (`src/components/TeamSection.js`):
```javascript
// Update testimonials with real client feedback
const testimonials = [
  {
    quote: "Real client testimonial...",
    name: "Client Name",
    title: "Client Title",
    avatar: "image-url"
  },
  // ... more testimonials
]
```

---

## 🤖 Step 7: Enable Blog Automation (Optional)

### If you want daily auto-generated blogs:

1. **Get Gemini API Key** (Step 2.2 above)

2. **Add to Vercel Environment Variables:**
   ```
   GEMINI_API_KEY=your_key
   CRON_SECRET=random_secret
   ENABLE_AUTO_BLOG=true
   ```

3. **Cron will run automatically** at 10 AM IST daily

4. **Manual trigger for testing:**
   ```bash
   curl -X POST https://your-site.com/api/cron/daily-blog \
     -H "x-cron-secret: YOUR_CRON_SECRET"
   ```

---

## 📧 Step 8: Enable Email Notifications (Optional)

### If you want email notifications for leads:

1. **Get Resend API Key** (Step 2.3 above)

2. **Add to Vercel Environment Variables:**
   ```
   RESEND_API_KEY=your_key
   COMPANY_EMAIL=your_email@domain.com
   ```

3. **Verify Domain** (recommended):
   - Go to Resend Dashboard
   - Add your domain
   - Add DNS records
   - Verify

4. **Test:**
   - Submit a contact form
   - Check your email

---

## 🔒 Security Checklist

- [ ] Never commit `.env.local` to git
- [ ] Use test keys for development
- [ ] Use production keys only in Vercel
- [ ] Keep `CRON_SECRET` random and secure
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Review Vercel security headers

---

## 🐛 Troubleshooting

### Website not loading?
- Check if dev server is running: `npm run dev`
- Check for port conflicts (default: 3000)
- Clear `.next` folder: `rm -rf .next`

### Images not showing?
- Check if images exist in `/public/images/`
- Check image paths are correct
- Check browser console for errors

### Payment not working?
- Verify Razorpay keys are correct
- Check if using test keys in test mode
- Check browser console for errors
- Verify webhook URL in Razorpay dashboard

### Emails not sending?
- Verify Resend API key is correct
- Check if domain is verified (for production)
- Check Resend dashboard logs
- Test with a simple email first

### Cron job not running?
- Verify `CRON_SECRET` matches in Vercel
- Check Vercel cron logs
- Verify `ENABLE_AUTO_BLOG=true`
- Test endpoint manually first

---

## 📞 Need Help?

### Resources:
- Check `SYSTEM_STATUS_REPORT.md` for detailed status
- Check `EMAIL_AND_BLOG_SETUP_GUIDE.md` for email/blog setup
- Check `RAZORPAY_SETUP.md` for payment setup

### Common Issues:
- **Build fails:** Check Node version (use 18.x or 20.x)
- **API errors:** Check environment variables
- **Styling issues:** Clear cache and rebuild

---

## ✅ You're Done!

Your RAGSPRO website is now:
- ✅ Running locally
- ✅ Deployed to production
- ✅ Mobile optimized
- ✅ Payment ready
- ✅ SEO optimized

**Next Steps:**
1. Add your real content
2. Test everything thoroughly
3. Share with clients
4. Start getting leads!

---

**Happy Building! 🚀**

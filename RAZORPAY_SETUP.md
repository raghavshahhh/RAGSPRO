# Razorpay Integration Setup Guide

## Prerequisites
- Razorpay account (Sign up at https://razorpay.com)
- Node.js and npm installed

## Step 1: Install Razorpay Package

```bash
npm install razorpay
```

## Step 2: Get Razorpay API Keys

1. Go to https://dashboard.razorpay.com/app/keys
2. Copy your **Key ID** and **Key Secret**
3. For testing, use **Test Mode** keys
4. For production, use **Live Mode** keys

## Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Add your Razorpay keys in `.env.local`:
```
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxx
```

**Important:** Never commit `.env.local` to git!

## Step 4: Test the Integration

1. Start your development server:
```bash
npm run dev
```

2. Go to `/pricing` page
3. Click "Get Started" on any plan
4. Use Razorpay test cards:
   - Card: 4111 1111 1111 1111
   - CVV: Any 3 digits
   - Expiry: Any future date

## Step 5: Go Live

1. Switch to **Live Mode** in Razorpay dashboard
2. Get your Live API keys
3. Update `.env.local` with live keys
4. Test thoroughly before going live

## Payment Flow

1. User clicks "Get Started" button
2. System creates order via `/api/razorpay/create-order`
3. Razorpay checkout opens
4. User completes payment
5. Payment verified via `/api/razorpay/verify-payment`
6. User redirected to `/payment-success`

## Files Created

- `src/utils/razorpay.js` - Razorpay utility functions
- `src/pages/api/razorpay/create-order.js` - Create order API
- `src/pages/api/razorpay/verify-payment.js` - Verify payment API
- `src/pages/payment-success.js` - Success page
- `.env.example` - Environment variables template

## Troubleshooting

### Payment not working?
- Check if Razorpay script is loaded
- Verify API keys are correct
- Check browser console for errors
- Ensure you're using test mode for testing

### Signature verification failing?
- Verify RAZORPAY_KEY_SECRET is correct
- Check if signature generation matches Razorpay docs

## Support

For Razorpay support: https://razorpay.com/support/
For integration docs: https://razorpay.com/docs/

## Security Notes

- Never expose `RAZORPAY_KEY_SECRET` in frontend
- Always verify payments on backend
- Use HTTPS in production
- Implement rate limiting on API endpoints

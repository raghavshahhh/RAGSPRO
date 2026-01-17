#!/bin/bash

# RAGSPRO Auth Setup Script
# This script helps you configure Supabase authentication

echo "🔧 RAGSPRO Authentication Setup"
echo "================================"
echo ""

# Check if .env.local already exists
if [ -f .env.local ]; then
    echo "⚠️  .env.local already exists!"
    echo ""
    read -p "Do you want to overwrite it? (y/n): " overwrite
    if [ "$overwrite" != "y" ]; then
        echo "❌ Setup cancelled"
        exit 0
    fi
    echo ""
fi

echo "📝 Please enter your Supabase credentials:"
echo "(Get them from: https://supabase.com/dashboard → Settings → API)"
echo ""

# Get Supabase URL
read -p "Supabase Project URL (e.g., https://xxxxx.supabase.co): " supabase_url
if [ -z "$supabase_url" ]; then
    echo "❌ Error: Supabase URL is required"
    exit 1
fi

# Get Anon Key
echo ""
read -p "Supabase Anon Key (public key, starts with eyJ...): " anon_key
if [ -z "$anon_key" ]; then
    echo "❌ Error: Anon key is required"
    exit 1
fi

# Get Service Role Key
echo ""
read -p "Supabase Service Role Key (secret key, starts with eyJ...): " service_key
if [ -z "$service_key" ]; then
    echo "❌ Error: Service role key is required"
    exit 1
fi

# Create .env.local file
echo ""
echo "📝 Creating .env.local file..."

cat > .env.local << EOF
# ============================================
# RAGSPRO Environment Variables
# ============================================

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase Authentication & Database
NEXT_PUBLIC_SUPABASE_URL=$supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=$anon_key
SUPABASE_SERVICE_KEY=$service_key

# Admin Dashboard
ADMIN_SECRET=ragspro2025

# Company Info
COMPANY_EMAIL=ragsproai@gmail.com

# Optional: Add these later if needed
# NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
# RAZORPAY_KEY_SECRET=your_razorpay_secret
# GEMINI_API_KEY=your_gemini_api_key
# RESEND_API_KEY=your_resend_api_key
# NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
EOF

echo "✅ .env.local file created successfully!"
echo ""

# Check if dev server is running
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Development server is running on port 3000"
    echo ""
    echo "Please restart it to load new environment variables:"
    echo "  1. Press Ctrl+C to stop the server"
    echo "  2. Run: npm run dev"
else
    echo "🚀 Start your development server:"
    echo "   npm run dev"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "  1. Restart dev server (if running)"
echo "  2. Open http://localhost:3000"
echo "  3. Try to login - 'Auth not configured' error should be gone"
echo "  4. Sign up with: ragsproai@gmail.com"
echo "  5. Admin button will appear in navbar"
echo ""
echo "📚 For more details, see: QUICK_AUTH_FIX.md"
echo ""

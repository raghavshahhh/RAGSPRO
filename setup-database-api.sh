#!/bin/bash

# ============================================
# RAGSPRO Database Setup via Supabase API
# ============================================

echo "🚀 RAGSPRO Database Setup"
echo "=========================="
echo ""

# Supabase credentials
SUPABASE_URL="https://wipcbdqqlryctwnlembh.supabase.co"
SERVICE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpcGNiZHFxbHJ5Y3R3bmxlbWJoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODU1MDYyMywiZXhwIjoyMDg0MTI2NjIzfQ.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"

echo "📋 Reading SQL files..."
echo ""

# Read schema SQL
SCHEMA_SQL=$(cat SUPABASE_SCHEMA.sql)
ADMIN_SQL=$(cat CREATE_ADMIN_USER.sql)

echo "📋 Step 1: Creating database tables..."
echo ""

# Execute schema via REST API
curl -X POST "${SUPABASE_URL}/rest/v1/rpc/exec_sql" \
  -H "apikey: ${SERVICE_KEY}" \
  -H "Authorization: Bearer ${SERVICE_KEY}" \
  -H "Content-Type: application/json" \
  -d "{\"query\": $(echo "$SCHEMA_SQL" | jq -Rs .)}"

echo ""
echo "✅ Database tables creation attempted"
echo ""

echo "📋 Step 2: Creating admin user..."
echo ""

# Execute admin user SQL via REST API
curl -X POST "${SUPABASE_URL}/rest/v1/rpc/exec_sql" \
  -H "apikey: ${SERVICE_KEY}" \
  -H "Authorization: Bearer ${SERVICE_KEY}" \
  -H "Content-Type: application/json" \
  -d "{\"query\": $(echo "$ADMIN_SQL" | jq -Rs .)}"

echo ""
echo "✅ Admin user creation attempted"
echo ""

echo "🎉 Database setup complete!"
echo ""
echo "Your admin login:"
echo "Email: ragsproai@gmail.com"
echo "Password: Raghav@03"
echo ""
echo "Test your admin login at: https://ragspro.com/admin"
echo ""

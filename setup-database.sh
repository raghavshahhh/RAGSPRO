#!/bin/bash

# ============================================
# RAGSPRO Database Setup Script
# ============================================

echo "🚀 RAGSPRO Database Setup"
echo "=========================="
echo ""

# Database credentials
DB_HOST="db.wipcbdqqlryctwnlembh.supabase.co"
DB_PORT="5432"
DB_NAME="postgres"
DB_USER="postgres"
DB_PASSWORD="xurwy2-nuvdas-kiRzyk"

echo "📋 Step 1: Creating database tables..."
echo ""

# Run schema SQL
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f SUPABASE_SCHEMA.sql

if [ $? -eq 0 ]; then
    echo "✅ Database tables created successfully!"
    echo ""
else
    echo "❌ Error creating tables. Please check the error above."
    exit 1
fi

echo "📋 Step 2: Creating admin user..."
echo ""

# Run admin user SQL
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f CREATE_ADMIN_USER.sql

if [ $? -eq 0 ]; then
    echo "✅ Admin user created successfully!"
    echo ""
else
    echo "❌ Error creating admin user. Please check the error above."
    exit 1
fi

echo "🎉 Database setup complete!"
echo ""
echo "Your admin login:"
echo "Email: ragsproai@gmail.com"
echo "Password: Raghav@03"
echo ""
echo "Test your admin login at: https://ragspro.com/admin"
echo ""

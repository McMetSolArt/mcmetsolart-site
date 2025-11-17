#!/bin/bash
# Startup script for Render deployment
# This script prepares the database and runs migrations before starting the app

set -e

echo "🔑 Initializing MC MetSolArt backend..."
echo "📊 Setting up database..."

# Run migration to add api_token column if needed
python migrate_add_api_token.py || true

echo "✅ Initialization complete"
echo "🚀 Starting Gunicorn server..."

# Start the app
exec gunicorn -w 2 -b 0.0.0.0:${PORT:-8000} app:app

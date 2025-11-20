#!/usr/bin/env python3
"""
Test rapid backend local pentru a vedea erorile
"""

import sys
import os

# Add backend to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'McMetSolArtBackend'))

print("🧪 Testing backend imports...")

try:
    print("1. Testing translations import...")
    from translations import t
    print("   ✅ translations.py OK")
    print(f"   Test: {t('success', 'ro')}")
except Exception as e:
    print(f"   ❌ translations.py FAILED: {e}")

try:
    print("\n2. Testing email_service import...")
    from email_service import send_contact_email, send_order_notification_email
    print("   ✅ email_service.py OK")
except Exception as e:
    print(f"   ❌ email_service.py FAILED: {e}")

try:
    print("\n3. Testing Flask app import...")
    from app import app, init_db
    print("   ✅ app.py OK")
except Exception as e:
    print(f"   ❌ app.py FAILED: {e}")
    import traceback
    traceback.print_exc()

print("\n✅ All imports successful!")
print("\n🚀 Starting test server...")
print("   Run: cd McMetSolArtBackend && python app.py")

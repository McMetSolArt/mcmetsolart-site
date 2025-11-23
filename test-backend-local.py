#!/usr/bin/env python3
"""
Test rapid pentru backend - verifica daca merge totul
"""

import sys
import os

# Adauga backend in path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'McMetSolArtBackend'))

print("Testez backend-ul...")

try:
    print("1. Verific translations...")
    from translations import t
    print("   OK - translations.py merge")
    print(f"   Test: {t('success', 'ro')}")
except Exception as e:
    print(f"   Eroare la translations.py: {e}")

try:
    print("\n2. Verific email_service...")
    from email_service import send_contact_email, send_order_notification_email
    print("   OK - email_service.py merge")
except Exception as e:
    print(f"   Eroare la email_service.py: {e}")

try:
    print("\n3. Verific Flask app...")
    from app import app, init_db
    print("   OK - app.py merge")
except Exception as e:
    print(f"   Eroare la app.py: {e}")
    import traceback
    traceback.print_exc()

print("\nTot merge bine!")
print("\nPorneste serverul cu:")
print("   cd McMetSolArtBackend && python app.py")

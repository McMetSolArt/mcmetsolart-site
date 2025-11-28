#!/usr/bin/env python3
"""
Script de inițializare a bazei de date
Rulează automat la deploy pe Render pentru a crea tabelele necesare
"""
import os
import sys

# Adaugă directorul curent la path pentru import-uri
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import init_db

if __name__ == '__main__':
    print("\n" + "="*60)
    print("  INIȚIALIZARE BAZĂ DE DATE")
    print("="*60 + "\n")
    
    try:
        init_db()
        print("\n✅ Baza de date a fost inițializată cu succes!")
        print("="*60 + "\n")
        sys.exit(0)
    except Exception as e:
        print(f"\n❌ EROARE la inițializarea bazei de date: {str(e)}")
        print("="*60 + "\n")
        import traceback
        traceback.print_exc()
        sys.exit(1)

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script pentru actualizarea schemei tabelei orders
Adaugă coloanele necesare pentru Admin Panel
"""

import sqlite3
import os

# Change to backend directory
os.chdir('McMetSolArtBackend')

conn = sqlite3.connect('mc_metsolart.db')
cursor = conn.cursor()

# Add missing columns
columns_to_add = [
    ('country', 'TEXT DEFAULT "Romania"'),
    ('product_type', 'TEXT DEFAULT "Cupola"'),
    ('quantity', 'INTEGER DEFAULT 1'),
    ('shipping_date', 'TEXT'),
    ('payment_percentage', 'INTEGER DEFAULT 0'),
    ('payment_amount_paid', 'REAL DEFAULT 0'),
    ('payment_remaining', 'REAL DEFAULT 0'),
    ('confirmed_by_admin', 'INTEGER DEFAULT 0'),
    ('confirmation_date', 'TEXT'),
    ('production_start_date', 'TEXT'),
    ('production_end_date', 'TEXT'),
    ('estimated_delivery', 'TEXT'),
    ('actual_delivery', 'TEXT'),
    ('shipping_company', 'TEXT'),
    ('internal_notes', 'TEXT'),
    ('order_history', 'TEXT DEFAULT "[]"')
]

print("🔧 Actualizare schemă tabel orders...")
print("=" * 60)

for col_name, col_type in columns_to_add:
    try:
        cursor.execute(f'ALTER TABLE orders ADD COLUMN {col_name} {col_type}')
        print(f'✅ Coloană adăugată: {col_name}')
        conn.commit()
    except Exception as e:
        if 'duplicate column' in str(e).lower():
            print(f'⚠️  Coloană există deja: {col_name}')
        else:
            print(f'❌ Eroare la adăugare {col_name}: {e}')

print("=" * 60)
print("✅ Schema bazei de date actualizată cu succes!")

# Verify columns
cursor.execute('PRAGMA table_info(orders)')
columns = cursor.fetchall()
print(f"\n📊 Total coloane în tabel orders: {len(columns)}")
print("\nColoane disponibile:")
for col in columns:
    print(f"  - {col[1]} ({col[2]})")

conn.close()

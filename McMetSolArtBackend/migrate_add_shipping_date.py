#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de migrare: Adaugă coloana shipping_date în tabela orders
"""

import sqlite3
import os

DB_PATH = 'mc_metsolart.db'

def migrate():
    """Adaugă coloana shipping_date în tabela orders"""
    
    if not os.path.exists(DB_PATH):
        print(f"❌ Baza de date {DB_PATH} nu există!")
        return
    
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        # Verifică dacă coloana există deja
        columns = cursor.execute("PRAGMA table_info(orders)").fetchall()
        column_names = [col['name'] for col in columns]
        
        if 'shipping_date' in column_names:
            print("⚠️  Coloana 'shipping_date' există deja!")
        else:
            print("📝 Adăugare coloană 'shipping_date' în tabela orders...")
            
            # Adaugă coloana
            cursor.execute("ALTER TABLE orders ADD COLUMN shipping_date TEXT")
            conn.commit()
            print("✅ Coloană adăugată cu succes!")
        
        # Afișează statistici
        print("\n" + "="*60)
        print("  STATISTICI")
        print("="*60)
        
        total_orders = cursor.execute("SELECT COUNT(*) as count FROM orders").fetchone()['count']
        print(f"📦 Total comenzi: {total_orders}")
        
        orders_with_date = cursor.execute(
            "SELECT COUNT(*) as count FROM orders WHERE shipping_date IS NOT NULL"
        ).fetchone()['count']
        print(f"📅 Comenzi cu dată livrare: {orders_with_date}")
        
        print("="*60)
        
        conn.close()
        print("\n✅ Migrare finalizată cu succes!")
        
    except Exception as e:
        print(f"❌ Eroare la migrare: {e}")
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    migrate()

#!/usr/bin/env python3
"""
Export simplu date în CSV - doar coloane existente
"""

import sqlite3
import csv
import os

DATABASE = 'mc_metsolart.db'
EXPORT_DIR = 'exports'

os.makedirs(EXPORT_DIR, exist_ok=True)

def export_profiles():
    """Export profiles.csv"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    
    profiles = conn.execute('SELECT * FROM users').fetchall()
    
    with open(os.path.join(EXPORT_DIR, 'profiles.csv'), 'w', newline='', encoding='utf-8') as f:
        if profiles:
            writer = csv.DictWriter(f, fieldnames=profiles[0].keys())
            writer.writeheader()
            for profile in profiles:
                writer.writerow(dict(profile))
    
    conn.close()
    print(f"✅ Profiles: {len(profiles)} exportate → exports/profiles.csv")
    return len(profiles)

def export_orders():
    """Export orders.csv"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    
    orders = conn.execute('''
        SELECT o.*, u.api_token, u.email as customer_email,
               u.first_name || ' ' || u.last_name as customer_name
        FROM orders o
        JOIN users u ON o.user_id = u.id
    ''').fetchall()
    
    with open(os.path.join(EXPORT_DIR, 'orders.csv'), 'w', newline='', encoding='utf-8') as f:
        if orders:
            writer = csv.DictWriter(f, fieldnames=orders[0].keys())
            writer.writeheader()
            for order in orders:
                writer.writerow(dict(order))
    
    conn.close()
    print(f"✅ Orders: {len(orders)} exportate → exports/orders.csv")
    return len(orders)

def export_order_items():
    """Export order_items.csv"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    
    items = conn.execute('''
        SELECT oi.*, o.order_number, u.api_token
        FROM order_items oi
        JOIN orders o ON oi.order_id = o.id
        JOIN users u ON o.user_id = u.id
    ''').fetchall()
    
    with open(os.path.join(EXPORT_DIR, 'order_items.csv'), 'w', newline='', encoding='utf-8') as f:
        if items:
            writer = csv.DictWriter(f, fieldnames=items[0].keys())
            writer.writeheader()
            for item in items:
                writer.writerow(dict(item))
    
    conn.close()
    print(f"✅ Order Items: {len(items)} exportate → exports/order_items.csv")
    return len(items)

if __name__ == '__main__':
    print("\n" + "="*60)
    print("  EXPORT CSV - MC MetSolArt")
    print("="*60 + "\n")
    
    export_profiles()
    export_orders()
    export_order_items()
    
    print(f"\n📂 Fișiere în: {os.path.abspath(EXPORT_DIR)}\n")

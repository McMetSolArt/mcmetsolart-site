#!/usr/bin/env python3
"""
Export automat date în CSV
Profiles și Orders
"""

import sqlite3
import csv
import os
from datetime import datetime

DATABASE = 'mc_metsolart.db'
EXPORT_DIR = 'exports'

# Creează directorul de export dacă nu există
os.makedirs(EXPORT_DIR, exist_ok=True)

def export_profiles_csv():
    """Exportă toate profilurile în profiles.csv"""
    try:
        conn = sqlite3.connect(DATABASE)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        # Obține toate profilurile
        profiles = cursor.execute('''
            SELECT id, email, first_name, last_name, api_token, phone, 
                   company, address, city, county, postal_code, country,
                   role, created_at, last_login
            FROM users
            ORDER BY created_at DESC
        ''').fetchall()
        
        conn.close()
        
        # Scrie în CSV
        csv_file = os.path.join(EXPORT_DIR, 'profiles.csv')
        
        with open(csv_file, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            
            # Header
            writer.writerow([
                'id', 'email', 'first_name', 'last_name', 'api_token',
                'phone', 'company', 'address', 'city', 'county', 
                'postal_code', 'country', 'role', 'created_at', 'last_login'
            ])
            
            # Date
            for profile in profiles:
                writer.writerow([
                    profile['id'],
                    profile['email'],
                    profile['first_name'],
                    profile['last_name'],
                    profile['api_token'],
                    profile['phone'] or '',
                    profile['company'] or '',
                    profile['address'] or '',
                    profile['city'] or '',
                    profile['county'] or '',
                    profile['postal_code'] or '',
                    profile['country'] or '',
                    profile['role'],
                    profile['created_at'],
                    profile['last_login'] or ''
                ])
        
        print(f"✅ Export profiles: {csv_file}")
        print(f"📊 {len(profiles)} profiluri exportate")
        return csv_file
        
    except Exception as e:
        print(f"❌ Eroare export profiles: {str(e)}")
        return None

def export_orders_csv():
    """Exportă toate comenzile în orders.csv"""
    try:
        conn = sqlite3.connect(DATABASE)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        # Obține toate comenzile cu detalii utilizator
        orders = cursor.execute('''
            SELECT 
                o.id as order_id,
                o.order_number,
                u.api_token as profile_token,
                u.email as customer_email,
                u.first_name || ' ' || u.last_name as customer_name,
                o.status,
                o.total_amount,
                o.currency,
                o.payment_method,
                o.shipping_address,
                o.tracking_number,
                o.notes,
                o.created_at,
                o.confirmed_at,
                o.shipped_at,
                o.delivered_at
            FROM orders o
            JOIN users u ON o.user_id = u.id
            ORDER BY o.created_at DESC
        ''').fetchall()
        
        conn.close()
        
        # Scrie în CSV
        csv_file = os.path.join(EXPORT_DIR, 'orders.csv')
        
        with open(csv_file, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            
            # Header
            writer.writerow([
                'order_id', 'order_number', 'profile_token', 'customer_email',
                'customer_name', 'status', 'total_amount', 'currency',
                'payment_method', 'shipping_address',
                'tracking_number', 'notes', 'created_at', 'confirmed_at',
                'shipped_at', 'delivered_at'
            ])
            
            # Date
            for order in orders:
                writer.writerow([
                    order['order_id'],
                    order['order_number'],
                    order['profile_token'],
                    order['customer_email'],
                    order['customer_name'],
                    order['status'],
                    order['total_amount'],
                    order['currency'],
                    order['payment_method'] or '',
                    order['shipping_address'] or '',
                    order['tracking_number'] or '',
                    order['notes'] or '',
                    order['created_at'],
                    order['confirmed_at'] or '',
                    order['shipped_at'] or '',
                    order['delivered_at'] or ''
                ])
        
        print(f"✅ Export orders: {csv_file}")
        print(f"📦 {len(orders)} comenzi exportate")
        return csv_file
        
    except Exception as e:
        print(f"❌ Eroare export orders: {str(e)}")
        return None

def export_order_items_csv():
    """Exportă toate produsele din comenzi în order_items.csv"""
    try:
        conn = sqlite3.connect(DATABASE)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        # Obține toate produsele din comenzi
        items = cursor.execute('''
            SELECT 
                oi.id as item_id,
                o.order_number,
                u.api_token as profile_token,
                oi.product_name,
                oi.quantity,
                oi.price,
                oi.discount,
                oi.tax,
                oi.subtotal
            FROM order_items oi
            JOIN orders o ON oi.order_id = o.id
            JOIN users u ON o.user_id = u.id
            ORDER BY o.created_at DESC
        ''').fetchall()
        
        conn.close()
        
        # Scrie în CSV
        csv_file = os.path.join(EXPORT_DIR, 'order_items.csv')
        
        with open(csv_file, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            
            # Header
            writer.writerow([
                'item_id', 'order_number', 'profile_token', 'product_name',
                'quantity', 'price', 'discount', 'tax', 'subtotal'
            ])
            
            # Date
            for item in items:
                writer.writerow([
                    item['item_id'],
                    item['order_number'],
                    item['profile_token'],
                    item['product_name'],
                    item['quantity'],
                    item['price'],
                    item['discount'],
                    item['tax'],
                    item['subtotal']
                ])
        
        print(f"✅ Export order items: {csv_file}")
        print(f"📦 {len(items)} produse exportate")
        return csv_file
        
    except Exception as e:
        print(f"❌ Eroare export order items: {str(e)}")
        return None

def export_all():
    """Exportă toate datele"""
    print("\n" + "="*60)
    print("  EXPORT DATE ÎN CSV")
    print("="*60 + "\n")
    
    print(f"📁 Director export: {os.path.abspath(EXPORT_DIR)}\n")
    
    # Exportă profiluri
    profiles_file = export_profiles_csv()
    
    # Exportă comenzi
    orders_file = export_orders_csv()
    
    # Export order items
    items_file = export_order_items_csv()
    
    print("\n" + "="*60)
    print("  EXPORT FINALIZAT")
    print("="*60)
    
    if profiles_file:
        print(f"✅ Profiles: {profiles_file}")
    if orders_file:
        print(f"✅ Orders: {orders_file}")
    if items_file:
        print(f"✅ Order Items: {items_file}")
    
    print(f"\n📂 Toate fișierele sunt în: {os.path.abspath(EXPORT_DIR)}")
    print("\n")

if __name__ == '__main__':
    export_all()

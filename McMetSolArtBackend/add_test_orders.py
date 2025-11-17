import sqlite3
from datetime import datetime, timedelta
import random

DATABASE = 'mc_metsolart.db'

def add_test_orders():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Creează tabelele dacă nu există
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            order_number TEXT UNIQUE NOT NULL,
            status TEXT DEFAULT 'pending',
            total_amount REAL NOT NULL,
            currency TEXT DEFAULT 'RON',
            payment_method TEXT,
            payment_status TEXT DEFAULT 'unpaid',
            tracking_number TEXT,
            created_at TEXT NOT NULL
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS order_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id INTEGER NOT NULL,
            product_name TEXT NOT NULL,
            product_description TEXT,
            quantity INTEGER NOT NULL,
            price REAL NOT NULL,
            FOREIGN KEY (order_id) REFERENCES orders (id)
        )
    ''')
    
    # Comenzi de test
    test_orders = [
        {
            'order_number': f'ORD-2024-{random.randint(1000, 9999)}',
            'status': 'delivered',
            'total_amount': 1250.00,
            'items': [
                {'name': 'Panou Solar 300W', 'desc': 'Panou fotovoltaic monocristalin', 'qty': 4, 'price': 250.00},
                {'name': 'Invertor 3kW', 'desc': 'Invertor hibrid cu baterie', 'qty': 1, 'price': 250.00}
            ],
            'tracking': 'FAN123456789RO',
            'days_ago': 15
        },
        {
            'order_number': f'ORD-2024-{random.randint(1000, 9999)}',
            'status': 'shipped',
            'total_amount': 3500.00,
            'items': [
                {'name': 'Sistem Complet 5kW', 'desc': 'Include panouri, invertor și baterii', 'qty': 1, 'price': 3500.00}
            ],
            'tracking': 'FAN987654321RO',
            'days_ago': 3
        },
        {
            'order_number': f'ORD-2024-{random.randint(1000, 9999)}',
            'status': 'processing',
            'total_amount': 850.00,
            'items': [
                {'name': 'Baterie Litiu 5kWh', 'desc': 'Baterie pentru stocare energie', 'qty': 1, 'price': 850.00}
            ],
            'tracking': None,
            'days_ago': 1
        },
        {
            'order_number': f'ORD-2024-{random.randint(1000, 9999)}',
            'status': 'pending',
            'total_amount': 450.00,
            'items': [
                {'name': 'Cablu Solar 6mm', 'desc': 'Cablu pentru panouri fotovoltaice', 'qty': 50, 'price': 5.00},
                {'name': 'Conectori MC4', 'desc': 'Set conectori pentru panouri', 'qty': 10, 'price': 20.00}
            ],
            'tracking': None,
            'days_ago': 0
        }
    ]
    
    user_id = 1  # Primul utilizator
    
    for order_data in test_orders:
        created_at = (datetime.now() - timedelta(days=order_data['days_ago'])).isoformat()
        
        # Inserează comanda
        cursor.execute('''
            INSERT INTO orders (
                user_id, order_number, status, total_amount, currency,
                payment_method, payment_status, tracking_number, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            user_id,
            order_data['order_number'],
            order_data['status'],
            order_data['total_amount'],
            'RON',
            'card',
            'paid' if order_data['status'] != 'pending' else 'unpaid',
            order_data['tracking'],
            created_at
        ))
        
        order_id = cursor.lastrowid
        
        # Inserează items
        for item in order_data['items']:
            cursor.execute('''
                INSERT INTO order_items (
                    order_id, product_name, product_description, quantity, price
                ) VALUES (?, ?, ?, ?, ?)
            ''', (
                order_id,
                item['name'],
                item['desc'],
                item['qty'],
                item['price']
            ))
    
    conn.commit()
    conn.close()
    
    print(f"✅ Adăugate {len(test_orders)} comenzi de test!")
    print("📊 Statusuri:")
    print("  - 1 comandă livrată (delivered)")
    print("  - 1 comandă expediată (shipped)")
    print("  - 1 comandă în procesare (processing)")
    print("  - 1 comandă în așteptare (pending)")

if __name__ == '__main__':
    add_test_orders()

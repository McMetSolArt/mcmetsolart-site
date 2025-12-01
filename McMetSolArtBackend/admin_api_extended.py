#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
API-uri extinse pentru Admin Panel
Sistem avansat de gestionare comenzi cu plăți și statusuri
"""

from flask import request, jsonify
import sqlite3
from datetime import datetime
import uuid
import json

def get_db_connection():
    """Conectare la baza de date"""
    conn = sqlite3.connect('mc_metsolart.db')
    conn.row_factory = sqlite3.Row
    return conn

def add_to_history(order_id, action, details, conn=None):
    """Adaugă eveniment în istoricul comenzii"""
    should_close = False
    if conn is None:
        conn = get_db_connection()
        should_close = True
    
    try:
        # Obține istoricul curent
        order = conn.execute('SELECT order_history FROM orders WHERE id = ?', (order_id,)).fetchone()
        
        if order:
            history = json.loads(order['order_history'] or '[]')
            
            # Adaugă eveniment nou
            history.append({
                'timestamp': datetime.now().isoformat(),
                'action': action,
                'details': details
            })
            
            # Salvează istoricul actualizat
            conn.execute(
                'UPDATE orders SET order_history = ? WHERE id = ?',
                (json.dumps(history), order_id)
            )
            conn.commit()
    finally:
        if should_close:
            conn.close()

def register_admin_api_routes(app):
    """Înregistrează rutele API pentru admin"""
    print("🔧 Înregistrare rute admin API extended...")
    
    @app.route('/api/stats', methods=['GET'])
    def get_stats():
        """Statistici generale"""
        try:
            conn = get_db_connection()
            
            total_users = conn.execute('SELECT COUNT(*) as count FROM users').fetchone()['count']
            total_orders = conn.execute('SELECT COUNT(*) as count FROM orders').fetchone()['count']
            
            orders_by_status = conn.execute('''
                SELECT status, COUNT(*) as count 
                FROM orders 
                GROUP BY status
            ''').fetchall()
            
            # Calculează venituri pe valută
            revenue_by_currency = conn.execute('''
                SELECT currency, SUM(total_amount) as total 
                FROM orders 
                WHERE status != "anulat"
                GROUP BY currency
            ''').fetchall()
            
            conn.close()
            
            # Construiește dicționar cu venituri pe valută
            revenue_dict = {}
            for row in revenue_by_currency:
                currency = row['currency'] or 'RON'
                revenue_dict[currency] = float(row['total'])
            
            return jsonify({
                'total_users': total_users,
                'total_orders': total_orders,
                'orders_by_status': [dict(row) for row in orders_by_status],
                'revenue_by_currency': revenue_dict
            })
        except Exception as e:
            print(f"❌ Eroare /api/stats: {str(e)}")
            return jsonify({'error': str(e)}), 500
    
    @app.route('/api/users', methods=['GET'])
    def get_all_users():
        """Lista tuturor utilizatorilor"""
        try:
            conn = get_db_connection()
            
            # Query simplu fără JOIN pentru a evita erori
            users = conn.execute('''
                SELECT 
                    id,
                    first_name,
                    last_name,
                    email,
                    phone,
                    created_at
                FROM users
                ORDER BY created_at DESC
            ''').fetchall()
            
            conn.close()
            
            # Returnează lista de utilizatori
            result = []
            for user in users:
                result.append({
                    'id': user['id'],
                    'first_name': user['first_name'],
                    'last_name': user['last_name'],
                    'email': user['email'],
                    'phone': user['phone'] or '',
                    'created_at': user['created_at'],
                    'total_orders': 0,
                    'total_spent': 0
                })
            
            return jsonify(result)
        except Exception as e:
            print(f"❌ Eroare /api/users: {str(e)}")
            import traceback
            traceback.print_exc()
            return jsonify({
                'success': False,
                'error': str(e),
                'message': 'Eroare la încărcarea utilizatorilor'
            }), 500
    
    @app.route('/api/orders', methods=['GET', 'POST'])
    def manage_orders():
        """GET: Lista comenzi | POST: Creează comandă nouă"""
        
        if request.method == 'GET':
            status_filter = request.args.get('status', 'all')
            
            conn = get_db_connection()
            
            query = '''
                SELECT 
                    o.id,
                    o.order_number,
                    o.user_id,
                    u.first_name,
                    u.last_name,
                    u.email,
                    u.phone,
                    o.status,
                    o.total_amount,
                    o.quantity,
                    o.shipping_date,
                    o.admin_notes,
                    o.created_at,
                    o.updated_at
                FROM orders o
                JOIN users u ON o.user_id = u.id
            '''
            
            if status_filter != 'all':
                query += f" WHERE o.status = '{status_filter}'"
            
            query += ' ORDER BY o.created_at DESC'
            
            orders = conn.execute(query).fetchall()
            conn.close()
            
            return jsonify([dict(row) for row in orders])
        
        elif request.method == 'POST':
            # Creează comandă nouă
            data = request.get_json()
            
            user_id = data.get('user_id')
            country = data.get('country', 'Romania')
            product_type = data.get('product_type', 'Cupola')
            cupola_type = data.get('cupola_type', 'MC01')
            quantity = data.get('quantity', 1)
            total_amount = data.get('total_amount')
            currency = data.get('currency', 'RON')
            status = data.get('status', 'in_asteptare')
            shipping_date = data.get('shipping_date')
            admin_notes = data.get('admin_notes', '')
            products = data.get('products', [])
            
            if not user_id or not total_amount:
                return jsonify({'success': False, 'error': 'Date incomplete'}), 400
            
            conn = get_db_connection()
            
            # Generează număr comandă bazat pe tip produs
            # MC01, MC02, MC03 pentru cupole
            # LOGO pentru logo-uri
            # STRUCT pentru structuri
            # SOLAR pentru panouri solare
            # OTHER pentru altele
            
            if product_type == 'Cupola':
                # Folosește modelul selectat: MC01, MC02 sau MC03
                prefix = cupola_type if cupola_type else 'MC01'
            elif product_type == 'Logo':
                prefix = 'LOGO'
            elif product_type == 'Structura Metalica':
                prefix = 'STRUCT'
            elif product_type == 'Panou Solar':
                prefix = 'SOLAR'
            else:
                prefix = 'OTHER'
            
            # Obține ultimul număr pentru acest prefix
            last_order = conn.execute(
                "SELECT order_number FROM orders WHERE order_number LIKE ? ORDER BY id DESC LIMIT 1",
                (f"{prefix}-%",)
            ).fetchone()
            
            if last_order:
                # Extrage numărul și incrementează
                try:
                    last_num = int(last_order['order_number'].split('-')[1])
                    next_num = last_num + 1
                except:
                    next_num = 1
            else:
                next_num = 1
            
            # Generează număr comandă: MC01-001, MC01-002, LOGO-001, etc.
            order_number = f"{prefix}-{next_num:03d}"
            
            try:
                cursor = conn.execute('''
                    INSERT INTO orders (
                        order_number, user_id, country, product_type, status, 
                        total_amount, currency, quantity, shipping_date, 
                        admin_notes, payment_remaining, created_at, updated_at
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    order_number,
                    user_id,
                    country,
                    product_type,
                    status,
                    total_amount,
                    currency,
                    quantity,
                    shipping_date,
                    admin_notes,
                    total_amount,
                    datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                    datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                ))
                
                order_id = cursor.lastrowid
                
                # Adaugă produsele în order_items
                if products:
                    for product in products:
                        conn.execute('''
                            INSERT INTO order_items (
                                order_id, product_name, quantity, price, subtotal
                            ) VALUES (?, ?, ?, ?, ?)
                        ''', (
                            order_id,
                            product.get('name', 'Produs'),
                            product.get('quantity', 1),
                            product.get('price', 0),
                            product.get('quantity', 1) * product.get('price', 0)
                        ))
                
                conn.commit()
                order_id = cursor.lastrowid
                conn.close()
                
                return jsonify({
                    'success': True,
                    'message': 'Comandă creată cu succes',
                    'order_id': order_id,
                    'order_number': order_number
                })
            except Exception as e:
                conn.close()
                return jsonify({'success': False, 'error': str(e)}), 500
    
    @app.route('/api/orders/<int:order_id>', methods=['GET', 'PUT'])
    def manage_order(order_id):
        """GET: Detalii comandă | PUT: Actualizează comandă"""
        
        conn = get_db_connection()
        
        if request.method == 'GET':
            order = conn.execute('''
                SELECT 
                    o.*,
                    u.first_name,
                    u.last_name,
                    u.email,
                    u.phone
                FROM orders o
                JOIN users u ON o.user_id = u.id
                WHERE o.id = ?
            ''', (order_id,)).fetchone()
            
            if not order:
                conn.close()
                return jsonify({'error': 'Comandă negăsită'}), 404
            
            items = conn.execute('''
                SELECT * FROM order_items WHERE order_id = ?
            ''', (order_id,)).fetchall()
            
            conn.close()
            
            return jsonify({
                'order': dict(order),
                'items': [dict(item) for item in items]
            })
        
        elif request.method == 'PUT':
            data = request.get_json()
            
            quantity = data.get('quantity')
            total_amount = data.get('total_amount')
            status = data.get('status')
            shipping_date = data.get('shipping_date')
            admin_notes = data.get('admin_notes')
            
            try:
                conn.execute('''
                    UPDATE orders 
                    SET quantity = ?, 
                        total_amount = ?, 
                        status = ?, 
                        shipping_date = ?,
                        admin_notes = ?,
                        updated_at = ?
                    WHERE id = ?
                ''', (
                    quantity,
                    total_amount,
                    status,
                    shipping_date,
                    admin_notes,
                    datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                    order_id
                ))
                
                conn.commit()
                conn.close()
                
                return jsonify({
                    'success': True,
                    'message': 'Comandă actualizată cu succes'
                })
            except Exception as e:
                conn.close()
                return jsonify({'success': False, 'error': str(e)}), 500

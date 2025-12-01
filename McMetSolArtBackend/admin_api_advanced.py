#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
API-uri Avansate pentru Admin Panel
Gestionare profesională comenzi cu plăți, statusuri și istoric
"""

from flask import request, jsonify
import sqlite3
from datetime import datetime
import json

def get_db_connection():
    """Conectare la baza de date"""
    conn = sqlite3.connect('mc_metsolart.db')
    conn.row_factory = sqlite3.Row
    return conn

def add_to_history(order_id, action, details, conn):
    """Adaugă eveniment în istoricul comenzii"""
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
            'UPDATE orders SET order_history = ?, updated_at = ? WHERE id = ?',
            (json.dumps(history), datetime.now().isoformat(), order_id)
        )

def register_advanced_admin_routes(app):
    """Înregistrează rutele API avansate pentru admin"""
    
    @app.route('/api/admin/order/<int:order_id>/confirm', methods=['POST'])
    def confirm_order(order_id):
        """Confirmă comanda"""
        try:
            conn = get_db_connection()
            
            # Verifică dacă comanda există
            order = conn.execute('SELECT * FROM orders WHERE id = ?', (order_id,)).fetchone()
            if not order:
                conn.close()
                return jsonify({'success': False, 'message': 'Comanda nu există'}), 404
            
            # Confirmă comanda
            now = datetime.now().isoformat()
            conn.execute('''
                UPDATE orders 
                SET confirmed_by_admin = 1,
                    confirmation_date = ?,
                    status = 'confirmata',
                    updated_at = ?
                WHERE id = ?
            ''', (now, now, order_id))
            
            # Adaugă în istoric
            add_to_history(order_id, 'Comandă confirmată', 'Admin a confirmat comanda', conn)
            
            conn.commit()
            conn.close()
            
            return jsonify({
                'success': True,
                'message': 'Comandă confirmată cu succes!'
            })
            
        except Exception as e:
            return jsonify({'success': False, 'message': str(e)}), 500
    
    @app.route('/api/admin/order/<int:order_id>/payment', methods=['POST'])
    def update_payment(order_id):
        """Actualizează plata comenzii"""
        try:
            data = request.get_json()
            percentage = int(data.get('percentage', 0))
            
            if percentage not in [0, 25, 50, 75, 100]:
                return jsonify({'success': False, 'message': 'Procent invalid'}), 400
            
            conn = get_db_connection()
            
            # Obține comanda
            order = conn.execute('SELECT * FROM orders WHERE id = ?', (order_id,)).fetchone()
            if not order:
                conn.close()
                return jsonify({'success': False, 'message': 'Comanda nu există'}), 404
            
            total_amount = float(order['total_amount'])
            amount_paid = (total_amount * percentage) / 100
            remaining = total_amount - amount_paid
            
            # Actualizează plata
            now = datetime.now().isoformat()
            conn.execute('''
                UPDATE orders 
                SET payment_percentage = ?,
                    payment_amount_paid = ?,
                    payment_remaining = ?,
                    payment_date = ?,
                    updated_at = ?
                WHERE id = ?
            ''', (percentage, amount_paid, remaining, now, now, order_id))
            
            # Adaugă în istoric
            add_to_history(
                order_id, 
                'Plată actualizată', 
                f'Plată {percentage}% - {amount_paid:.2f} RON',
                conn
            )
            
            conn.commit()
            conn.close()
            
            return jsonify({
                'success': True,
                'message': f'Plată actualizată: {percentage}%',
                'data': {
                    'percentage': percentage,
                    'amount_paid': amount_paid,
                    'remaining': remaining
                }
            })
            
        except Exception as e:
            return jsonify({'success': False, 'message': str(e)}), 500
    
    @app.route('/api/admin/order/<int:order_id>/status', methods=['POST'])
    def update_order_status(order_id):
        """Actualizează statusul comenzii"""
        try:
            data = request.get_json()
            new_status = data.get('status')
            notes = data.get('notes', '')
            
            valid_statuses = [
                'in_asteptare',
                'confirmata',
                'in_procesare',
                'in_productie',
                'finalizata',
                'expediata',
                'in_tranzit',
                'livrata',
                'anulata'
            ]
            
            if new_status not in valid_statuses:
                return jsonify({'success': False, 'message': 'Status invalid'}), 400
            
            conn = get_db_connection()
            
            # Verifică comanda
            order = conn.execute('SELECT * FROM orders WHERE id = ?', (order_id,)).fetchone()
            if not order:
                conn.close()
                return jsonify({'success': False, 'message': 'Comanda nu există'}), 404
            
            old_status = order['status']
            now = datetime.now().isoformat()
            
            # Actualizează statusul
            update_query = '''
                UPDATE orders 
                SET status = ?,
                    updated_at = ?
            '''
            params = [new_status, now]
            
            # Actualizări specifice pe status
            if new_status == 'in_productie' and not order['production_start_date']:
                update_query += ', production_start_date = ?'
                params.append(now)
            
            if new_status == 'finalizata' and not order['production_end_date']:
                update_query += ', production_end_date = ?'
                params.append(now)
            
            if new_status == 'livrata' and not order['actual_delivery']:
                update_query += ', actual_delivery = ?'
                params.append(now)
            
            update_query += ' WHERE id = ?'
            params.append(order_id)
            
            conn.execute(update_query, params)
            
            # Adaugă în istoric
            status_names = {
                'in_asteptare': 'În așteptare',
                'confirmata': 'Confirmată',
                'in_procesare': 'În procesare',
                'in_productie': 'În producție',
                'finalizata': 'Finalizată',
                'expediata': 'Expediată',
                'in_tranzit': 'În tranzit',
                'livrata': 'Livrată',
                'anulata': 'Anulată'
            }
            
            details = f'Status schimbat din "{status_names.get(old_status, old_status)}" în "{status_names.get(new_status, new_status)}"'
            if notes:
                details += f' - {notes}'
            
            add_to_history(order_id, 'Status actualizat', details, conn)
            
            conn.commit()
            conn.close()
            
            return jsonify({
                'success': True,
                'message': f'Status actualizat: {status_names.get(new_status, new_status)}'
            })
            
        except Exception as e:
            return jsonify({'success': False, 'message': str(e)}), 500
    
    @app.route('/api/admin/order/<int:order_id>/shipping', methods=['POST'])
    def update_shipping_info(order_id):
        """Actualizează informații transport"""
        try:
            data = request.get_json()
            
            conn = get_db_connection()
            
            # Verifică comanda
            order = conn.execute('SELECT * FROM orders WHERE id = ?', (order_id,)).fetchone()
            if not order:
                conn.close()
                return jsonify({'success': False, 'message': 'Comanda nu există'}), 404
            
            # Actualizează informații transport
            now = datetime.now().isoformat()
            conn.execute('''
                UPDATE orders 
                SET shipping_company = ?,
                    tracking_number = ?,
                    estimated_delivery = ?,
                    updated_at = ?
                WHERE id = ?
            ''', (
                data.get('shipping_company'),
                data.get('tracking_number'),
                data.get('estimated_delivery'),
                now,
                order_id
            ))
            
            # Adaugă în istoric
            details = f'Transport: {data.get("shipping_company", "N/A")}'
            if data.get('tracking_number'):
                details += f' - AWB: {data.get("tracking_number")}'
            
            add_to_history(order_id, 'Informații transport', details, conn)
            
            conn.commit()
            conn.close()
            
            return jsonify({
                'success': True,
                'message': 'Informații transport actualizate'
            })
            
        except Exception as e:
            return jsonify({'success': False, 'message': str(e)}), 500
    
    @app.route('/api/admin/order/<int:order_id>/history', methods=['GET'])
    def get_order_history(order_id):
        """Obține istoricul comenzii"""
        try:
            conn = get_db_connection()
            
            order = conn.execute('SELECT order_history FROM orders WHERE id = ?', (order_id,)).fetchone()
            
            if not order:
                conn.close()
                return jsonify({'success': False, 'message': 'Comanda nu există'}), 404
            
            history = json.loads(order['order_history'] or '[]')
            conn.close()
            
            return jsonify({
                'success': True,
                'history': history
            })
            
        except Exception as e:
            return jsonify({'success': False, 'message': str(e)}), 500
    
    @app.route('/api/admin/order/<int:order_id>/details', methods=['GET'])
    def get_admin_order_details(order_id):
        """Obține detalii complete comandă"""
        try:
            conn = get_db_connection()
            
            order = conn.execute('''
                SELECT 
                    o.*,
                    u.first_name,
                    u.last_name,
                    u.email,
                    u.phone,
                    u.address,
                    u.city,
                    u.county
                FROM orders o
                JOIN users u ON o.user_id = u.id
                WHERE o.id = ?
            ''', (order_id,)).fetchone()
            
            if not order:
                conn.close()
                return jsonify({'success': False, 'message': 'Comanda nu există'}), 404
            
            # Obține produsele comenzii
            items = conn.execute('''
                SELECT * FROM order_items WHERE order_id = ?
            ''', (order_id,)).fetchall()
            
            # Obține istoricul
            history = json.loads(order['order_history'] or '[]')
            
            conn.close()
            
            order_dict = dict(order)
            order_dict['items'] = [dict(item) for item in items]
            order_dict['history'] = history
            
            return jsonify({
                'success': True,
                'order': order_dict
            })
            
        except Exception as e:
            return jsonify({'success': False, 'message': str(e)}), 500
    
    @app.route('/api/admin/orders/advanced', methods=['GET'])
    def get_orders_advanced():
        """Lista comenzi cu informații avansate"""
        try:
            conn = get_db_connection()
            
            orders = conn.execute('''
                SELECT 
                    o.id,
                    o.order_number,
                    o.user_id,
                    u.first_name,
                    u.last_name,
                    u.email,
                    u.phone,
                    o.country,
                    o.product_type,
                    o.status,
                    o.total_amount,
                    o.currency,
                    o.payment_percentage,
                    o.payment_amount_paid,
                    o.payment_remaining,
                    o.confirmed_by_admin,
                    o.confirmation_date,
                    o.shipping_date,
                    o.estimated_delivery,
                    o.actual_delivery,
                    o.shipping_company,
                    o.tracking_number,
                    o.admin_notes,
                    o.internal_notes,
                    o.created_at,
                    o.updated_at
                FROM orders o
                JOIN users u ON o.user_id = u.id
                ORDER BY o.created_at DESC
            ''').fetchall()
            
            conn.close()
            
            return jsonify({
                'success': True,
                'orders': [dict(row) for row in orders]
            })
            
        except Exception as e:
            return jsonify({'success': False, 'message': str(e)}), 500

    print("✅ API-uri avansate admin înregistrate")

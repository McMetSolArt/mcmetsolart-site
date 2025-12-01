"""
ORDERS SYNC API - Sincronizare comenzi Admin-Client
Real-time updates pentru status comenzi
"""

from flask import Blueprint, request, jsonify
from datetime import datetime
import sqlite3
import os

orders_sync_bp = Blueprint('orders_sync', __name__)

DATABASE = os.getenv('DATABASE', 'mc_metsolart.db')

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def get_current_user_from_token():
    """Extrage user_id din token Authorization header"""
    auth_header = request.headers.get('Authorization', '')
    if not auth_header:
        return None
    
    try:
        token = auth_header.split(' ')[1] if ' ' in auth_header else auth_header
        conn = get_db()
        user = conn.execute('SELECT id, email, first_name, last_name FROM users WHERE api_token = ?', (token,)).fetchone()
        conn.close()
        return dict(user) if user else None
    except:
        return None

@orders_sync_bp.route('/api/orders/client', methods=['GET'])
def get_client_orders():
    """Obține comenzile clientului curent"""
    try:
        user = get_current_user_from_token()
        if not user:
            return jsonify({
                'success': False,
                'message': 'Autentificare necesară'
            }), 401
        
        conn = get_db()
        orders = conn.execute('''
            SELECT o.*, 
                   GROUP_CONCAT(oi.product_name || ' x' || oi.quantity) as items_summary
            FROM orders o
            LEFT JOIN order_items oi ON o.id = oi.order_id
            WHERE o.user_id = ?
            GROUP BY o.id
            ORDER BY o.created_at DESC
        ''', (user['id'],)).fetchall()
        
        # Get items for each order
        orders_list = []
        for order in orders:
            order_dict = dict(order)
            items = conn.execute('''
                SELECT product_name, quantity, price, subtotal
                FROM order_items
                WHERE order_id = ?
            ''', (order['id'],)).fetchall()
            order_dict['items'] = [dict(item) for item in items]
            orders_list.append(order_dict)
        
        conn.close()
        
        return jsonify({
            'success': True,
            'data': orders_list,
            'count': len(orders_list)
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Eroare server: {str(e)}'
        }), 500

@orders_sync_bp.route('/api/orders/<int:order_id>', methods=['GET'])
def get_order_details(order_id):
    """Obține detalii complete comandă"""
    try:
        user = get_current_user_from_token()
        if not user:
            return jsonify({
                'success': False,
                'message': 'Autentificare necesară'
            }), 401
        
        conn = get_db()
        order = conn.execute('''
            SELECT o.*, u.first_name, u.last_name, u.email, u.phone
            FROM orders o
            JOIN users u ON o.user_id = u.id
            WHERE o.id = ? AND o.user_id = ?
        ''', (order_id, user['id'])).fetchone()
        
        if not order:
            conn.close()
            return jsonify({
                'success': False,
                'message': 'Comandă negăsită'
            }), 404
        
        order_dict = dict(order)
        
        # Get items
        items = conn.execute('''
            SELECT * FROM order_items WHERE order_id = ?
        ''', (order_id,)).fetchall()
        order_dict['items'] = [dict(item) for item in items]
        
        conn.close()
        
        return jsonify({
            'success': True,
            'data': order_dict
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Eroare server: {str(e)}'
        }), 500

@orders_sync_bp.route('/api/orders/<order_id>/status', methods=['GET'])
def get_order_status(order_id):
    """Obține doar status-ul comenzii (pentru polling rapid)"""
    try:
        # TODO: Verifică că comanda aparține utilizatorului curent
        # user_id = get_current_user_id()
        # status = db.get_order_status(order_id, user_id)
        
        # Mock data
        status = {
            'order_id': order_id,
            'status': 'expediat',
            'updated_at': '2024-01-18T14:30:00Z',
            'tracking_number': 'TRACK123456'
        }
        
        return jsonify({
            'success': True,
            'data': status
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Eroare server: {str(e)}'
        }), 500

# NOTA: Clientul NU poate anula comenzi
# Doar adminul poate anula comenzi prin panoul de admin
# Endpoint-ul de anulare a fost eliminat pentru clienți

@orders_sync_bp.route('/api/orders/stats', methods=['GET'])
def get_orders_stats():
    """Statistici comenzi pentru dashboard"""
    try:
        user = get_current_user_from_token()
        if not user:
            return jsonify({
                'success': False,
                'message': 'Autentificare necesară'
            }), 401
        
        conn = get_db()
        
        # Total orders and spent
        total_stats = conn.execute('''
            SELECT COUNT(*) as total_orders, 
                   COALESCE(SUM(total_amount), 0) as total_spent,
                   MAX(created_at) as last_order_date
            FROM orders
            WHERE user_id = ?
        ''', (user['id'],)).fetchone()
        
        # Active orders (not delivered/cancelled)
        active_count = conn.execute('''
            SELECT COUNT(*) as count
            FROM orders
            WHERE user_id = ? AND status NOT IN ('livrat', 'anulat')
        ''', (user['id'],)).fetchone()
        
        # Completed orders
        completed_count = conn.execute('''
            SELECT COUNT(*) as count
            FROM orders
            WHERE user_id = ? AND status = 'livrat'
        ''', (user['id'],)).fetchone()
        
        # By status
        status_counts = conn.execute('''
            SELECT status, COUNT(*) as count
            FROM orders
            WHERE user_id = ?
            GROUP BY status
        ''', (user['id'],)).fetchall()
        
        conn.close()
        
        by_status = {
            'in_asteptare': 0,
            'confirmat': 0,
            'in_procesare': 0,
            'expediat': 0,
            'livrat': 0,
            'anulat': 0
        }
        
        for row in status_counts:
            if row['status'] in by_status:
                by_status[row['status']] = row['count']
        
        stats = {
            'total_orders': total_stats['total_orders'],
            'total_spent': f"{total_stats['total_spent']:.2f}",
            'currency': 'RON',
            'active_orders': active_count['count'],
            'completed_orders': completed_count['count'],
            'by_status': by_status,
            'last_order_date': total_stats['last_order_date']
        }
        
        return jsonify({
            'success': True,
            'data': stats
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Eroare server: {str(e)}'
        }), 500

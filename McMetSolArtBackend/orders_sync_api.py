"""
ORDERS SYNC API - Sincronizare comenzi Admin-Client
Real-time updates pentru status comenzi
"""

from flask import Blueprint, request, jsonify
from datetime import datetime

orders_sync_bp = Blueprint('orders_sync', __name__)

# Mock database - în producție folosește baza de date reală
ORDERS_DB = {}

@orders_sync_bp.route('/api/orders/client', methods=['GET'])
def get_client_orders():
    """Obține comenzile clientului curent"""
    try:
        # TODO: Obține user_id din sesiune/token
        # user_id = get_current_user_id()
        # orders = db.get_user_orders(user_id)
        
        # Mock data
        orders = [
            {
                'id': 1,
                'order_number': 'ORD-2024-001',
                'status': 'livrat',
                'total_amount': '1250.00',
                'currency': 'EUR',
                'created_at': '2024-01-15T10:30:00Z',
                'updated_at': '2024-01-20T14:00:00Z',
                'items': [
                    {
                        'product_name': 'Cupolă Decorativă Mare',
                        'quantity': 1,
                        'price': '1250.00'
                    }
                ],
                'shipping_address': 'Str. Exemplu nr. 123, București',
                'tracking_number': 'TRACK123456',
                'invoice_url': '/invoices/ORD-2024-001.pdf'
            },
            {
                'id': 2,
                'order_number': 'ORD-2024-002',
                'status': 'in_procesare',
                'total_amount': '850.00',
                'currency': 'EUR',
                'created_at': '2024-02-01T09:15:00Z',
                'updated_at': '2024-02-01T09:15:00Z',
                'items': [
                    {
                        'product_name': 'Cupolă Decorativă Mică',
                        'quantity': 1,
                        'price': '850.00'
                    }
                ],
                'shipping_address': 'Str. Test nr. 45, Cluj-Napoca',
                'tracking_number': None,
                'invoice_url': None
            }
        ]
        
        return jsonify({
            'success': True,
            'data': orders,
            'count': len(orders)
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Eroare server: {str(e)}'
        }), 500

@orders_sync_bp.route('/api/orders/<order_id>', methods=['GET'])
def get_order_details(order_id):
    """Obține detalii complete comandă"""
    try:
        # TODO: Verifică că comanda aparține utilizatorului curent
        # user_id = get_current_user_id()
        # order = db.get_order(order_id, user_id)
        
        # Mock data
        order = {
            'id': order_id,
            'order_number': f'ORD-2024-{order_id.zfill(3)}',
            'status': 'expediat',
            'status_history': [
                {
                    'status': 'in_asteptare',
                    'timestamp': '2024-01-15T10:30:00Z',
                    'note': 'Comandă plasată'
                },
                {
                    'status': 'confirmat',
                    'timestamp': '2024-01-15T11:00:00Z',
                    'note': 'Comandă confirmată'
                },
                {
                    'status': 'in_procesare',
                    'timestamp': '2024-01-16T09:00:00Z',
                    'note': 'În producție'
                },
                {
                    'status': 'expediat',
                    'timestamp': '2024-01-18T14:30:00Z',
                    'note': 'Expediat prin curier'
                }
            ],
            'total_amount': '1250.00',
            'currency': 'EUR',
            'items': [
                {
                    'product_name': 'Cupolă Decorativă Mare',
                    'product_code': 'CDP-001',
                    'quantity': 1,
                    'unit_price': '1250.00',
                    'total_price': '1250.00',
                    'image_url': '/images/products/cupola-mare.jpg'
                }
            ],
            'shipping_address': {
                'name': 'Ion Popescu',
                'address': 'Str. Exemplu nr. 123',
                'city': 'București',
                'country': 'România',
                'postal_code': '010101',
                'phone': '+40 721 234 567'
            },
            'billing_address': {
                'name': 'Ion Popescu',
                'address': 'Str. Exemplu nr. 123',
                'city': 'București',
                'country': 'România',
                'postal_code': '010101',
                'phone': '+40 721 234 567'
            },
            'tracking_number': 'TRACK123456',
            'tracking_url': 'https://tracking.example.com/TRACK123456',
            'invoice_url': f'/invoices/ORD-2024-{order_id.zfill(3)}.pdf',
            'estimated_delivery': '2024-01-22T00:00:00Z',
            'created_at': '2024-01-15T10:30:00Z',
            'updated_at': '2024-01-18T14:30:00Z'
        }
        
        return jsonify({
            'success': True,
            'data': order
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

@orders_sync_bp.route('/api/orders/<order_id>/cancel', methods=['POST'])
def cancel_order(order_id):
    """Anulare comandă (doar dacă status permite)"""
    try:
        data = request.get_json()
        reason = data.get('reason', '')
        
        # TODO: Verifică că comanda aparține utilizatorului curent
        # user_id = get_current_user_id()
        # order = db.get_order(order_id, user_id)
        
        # Verifică dacă comanda poate fi anulată
        # Doar comenzile în status: in_asteptare, confirmat pot fi anulate
        allowed_statuses = ['in_asteptare', 'confirmat']
        
        # Mock check
        current_status = 'in_asteptare'  # TODO: get from DB
        
        if current_status not in allowed_statuses:
            return jsonify({
                'success': False,
                'message': 'Comanda nu poate fi anulată în acest moment'
            }), 400
        
        # TODO: Update status în baza de date
        # db.update_order_status(order_id, 'anulat', reason)
        
        return jsonify({
            'success': True,
            'message': 'Comandă anulată cu succes'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Eroare server: {str(e)}'
        }), 500

@orders_sync_bp.route('/api/orders/stats', methods=['GET'])
def get_orders_stats():
    """Statistici comenzi pentru dashboard"""
    try:
        # TODO: Obține user_id din sesiune/token
        # user_id = get_current_user_id()
        # stats = db.get_user_orders_stats(user_id)
        
        # Mock data
        stats = {
            'total_orders': 5,
            'total_spent': '4250.00',
            'currency': 'EUR',
            'active_orders': 2,
            'completed_orders': 3,
            'by_status': {
                'in_asteptare': 0,
                'confirmat': 1,
                'in_procesare': 1,
                'expediat': 0,
                'livrat': 3,
                'anulat': 0
            },
            'last_order_date': '2024-02-01T09:15:00Z'
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

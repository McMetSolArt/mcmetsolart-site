#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Panou de Administrare MC MetSolArt
Gestionare utilizatori și comenzi
"""

from flask import Blueprint, render_template, request, jsonify, session, redirect, url_for
from functools import wraps
import sqlite3
from datetime import datetime
import os

admin_bp = Blueprint('admin', __name__, url_prefix='/admin')

# Parola de admin (în producție, folosește hash-uri și baza de date)
# ⚠️ SCHIMBĂ PAROLA ÎNAINTE DE A PUNE SITE-UL LIVE!
ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD', 'admin123')  # Folosește variabilă de mediu

def admin_required(f):
    """Decorator pentru a verifica dacă utilizatorul este admin"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('is_admin'):
            return jsonify({'error': 'Acces interzis'}), 403
        return f(*args, **kwargs)
    return decorated_function

def get_db_connection():
    """Conectare la baza de date"""
    conn = sqlite3.connect('mc_metsolart.db')
    conn.row_factory = sqlite3.Row
    return conn

# ==========================================
# AUTENTIFICARE ADMIN
# ==========================================

@admin_bp.route('/login', methods=['GET', 'POST'])
def login():
    """Pagina de login pentru admin"""
    if request.method == 'POST':
        data = request.get_json()
        password = data.get('password')
        
        if password == ADMIN_PASSWORD:
            session['is_admin'] = True
            return jsonify({'success': True, 'message': 'Autentificare reușită'})
        else:
            return jsonify({'success': False, 'message': 'Parolă incorectă'}), 401
    
    return render_template('admin_login.html')

@admin_bp.route('/logout')
def logout():
    """Logout admin"""
    session.pop('is_admin', None)
    return redirect(url_for('admin.login'))

# ==========================================
# DASHBOARD PRINCIPAL
# ==========================================

@admin_bp.route('/')
@admin_required
def dashboard():
    """Dashboard principal admin"""
    return render_template('admin_dashboard_new.html')

@admin_bp.route('/api/stats')
@admin_required
def get_stats():
    """Statistici generale"""
    conn = get_db_connection()
    
    # Total utilizatori
    total_users = conn.execute('SELECT COUNT(*) as count FROM users').fetchone()['count']
    
    # Total comenzi
    total_orders = conn.execute('SELECT COUNT(*) as count FROM orders').fetchone()['count']
    
    # Comenzi pe status
    orders_by_status = conn.execute('''
        SELECT status, COUNT(*) as count 
        FROM orders 
        GROUP BY status
    ''').fetchall()
    
    # Venit total
    total_revenue = conn.execute('SELECT SUM(total_amount) as total FROM orders WHERE status != "anulat"').fetchone()['total'] or 0
    
    conn.close()
    
    return jsonify({
        'total_users': total_users,
        'total_orders': total_orders,
        'orders_by_status': [dict(row) for row in orders_by_status],
        'total_revenue': float(total_revenue)
    })

# ==========================================
# GESTIONARE UTILIZATORI
# ==========================================

@admin_bp.route('/api/users')
@admin_required
def get_users():
    """Lista utilizatori"""
    conn = get_db_connection()
    
    users = conn.execute('''
        SELECT 
            u.id,
            u.first_name,
            u.last_name,
            u.email,
            u.phone,
            u.created_at,
            COUNT(o.id) as total_orders,
            COALESCE(SUM(o.total_amount), 0) as total_spent
        FROM users u
        LEFT JOIN orders o ON u.id = o.user_id
        GROUP BY u.id
        ORDER BY u.created_at DESC
    ''').fetchall()
    
    conn.close()
    
    return jsonify([dict(row) for row in users])

# ==========================================
# GESTIONARE COMENZI
# ==========================================

@admin_bp.route('/api/orders')
@admin_required
def get_orders():
    """Lista comenzi"""
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

@admin_bp.route('/api/orders/<int:order_id>')
@admin_required
def get_order_details(order_id):
    """Detalii comandă"""
    conn = get_db_connection()
    
    # Informații comandă
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
    
    # Produse din comandă
    items = conn.execute('''
        SELECT * FROM order_items WHERE order_id = ?
    ''', (order_id,)).fetchall()
    
    conn.close()
    
    return jsonify({
        'order': dict(order),
        'items': [dict(item) for item in items]
    })

@admin_bp.route('/api/orders/<int:order_id>/status', methods=['PUT'])
@admin_required
def update_order_status(order_id):
    """Actualizează statusul comenzii"""
    data = request.get_json()
    new_status = data.get('status')
    
    # Validare status
    valid_statuses = ['in_asteptare', 'confirmat', 'in_procesare', 'expediat', 'livrat', 'anulat']
    if new_status not in valid_statuses:
        return jsonify({'error': 'Status invalid'}), 400
    
    conn = get_db_connection()
    
    # Actualizează status
    conn.execute('''
        UPDATE orders 
        SET status = ?, updated_at = ?
        WHERE id = ?
    ''', (new_status, datetime.now().strftime('%Y-%m-%d %H:%M:%S'), order_id))
    
    conn.commit()
    conn.close()
    
    return jsonify({
        'success': True,
        'message': 'Status actualizat cu succes',
        'new_status': new_status
    })

# ==========================================
# EXPORT DATE
# ==========================================

@admin_bp.route('/api/export/orders')
@admin_required
def export_orders():
    """Export comenzi în CSV"""
    import csv
    from io import StringIO
    
    conn = get_db_connection()
    
    orders = conn.execute('''
        SELECT 
            o.id,
            o.order_number,
            u.first_name,
            u.last_name,
            u.email,
            u.phone,
            o.status,
            o.total_amount,
            o.created_at,
            o.updated_at
        FROM orders o
        JOIN users u ON o.user_id = u.id
        ORDER BY o.created_at DESC
    ''').fetchall()
    
    conn.close()
    
    # Creează CSV
    output = StringIO()
    writer = csv.writer(output)
    
    # Header
    writer.writerow([
        'ID Comandă', 'Număr Comandă', 'Prenume', 'Nume', 'Email', 
        'Telefon', 'Status', 'Total (EUR)', 'Data Comandă', 'Data Actualizare'
    ])
    
    # Date
    for order in orders:
        writer.writerow([
            order['id'],
            order['order_number'],
            order['first_name'],
            order['last_name'],
            order['email'],
            order['phone'],
            order['status'],
            order['total_amount'],
            order['created_at'],
            order['updated_at']
        ])
    
    output.seek(0)
    
    from flask import Response
    return Response(
        output.getvalue(),
        mimetype='text/csv',
        headers={'Content-Disposition': 'attachment; filename=comenzi_export.csv'}
    )

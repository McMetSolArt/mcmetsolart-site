#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Sistem de Autentificare pentru Admin Panel
Securitate: Email + Parolă + Token JWT
"""

from flask import request, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
from functools import wraps
import sqlite3
import jwt
import datetime
import os

# Secret key pentru JWT (în producție, folosește variabilă de mediu)
JWT_SECRET = os.getenv('JWT_SECRET', 'admin-secret-key-change-in-production-' + os.urandom(16).hex())
JWT_ALGORITHM = 'HS256'
JWT_EXPIRATION_HOURS = 24

def get_db_connection():
    """Conectare la baza de date"""
    conn = sqlite3.connect('mc_metsolart.db')
    conn.row_factory = sqlite3.Row
    return conn

def admin_token_required(f):
    """Decorator pentru protejarea rutelor admin"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = None
        
        # Verifică header Authorization
        auth_header = request.headers.get('Authorization', '')
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
        
        if not token:
            return jsonify({
                'success': False,
                'message': 'Token lipsă. Autentificare necesară.'
            }), 401
        
        try:
            # Decodifică token-ul
            data = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
            
            # Verifică că este admin
            if data.get('role') != 'admin':
                return jsonify({
                    'success': False,
                    'message': 'Acces interzis. Doar administratori.'
                }), 403
            
            # Adaugă datele admin în request
            request.admin_id = data.get('user_id')
            request.admin_email = data.get('email')
            
        except jwt.ExpiredSignatureError:
            return jsonify({
                'success': False,
                'message': 'Token expirat. Te rugăm să te autentifici din nou.'
            }), 401
        except jwt.InvalidTokenError:
            return jsonify({
                'success': False,
                'message': 'Token invalid.'
            }), 401
        
        return f(*args, **kwargs)
    
    return decorated_function

def init_admin_table():
    """Inițializează tabela pentru administratori"""
    conn = get_db_connection()
    
    # Creează tabela admin_users dacă nu există
    conn.execute('''
        CREATE TABLE IF NOT EXISTS admin_users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            full_name TEXT NOT NULL,
            role TEXT DEFAULT 'admin',
            is_active INTEGER DEFAULT 1,
            created_at TEXT NOT NULL,
            last_login TEXT,
            login_attempts INTEGER DEFAULT 0,
            locked_until TEXT
        )
    ''')
    
    conn.commit()
    conn.close()
    print("✅ Tabela admin_users inițializată")

def create_default_admin():
    """Creează admin default dacă nu există"""
    conn = get_db_connection()
    
    # Verifică dacă există admin
    admin = conn.execute('SELECT * FROM admin_users WHERE email = ?', ('admin@mcmetsolart.com',)).fetchone()
    
    if not admin:
        # Creează admin default
        password_hash = generate_password_hash('Admin123!@#')
        created_at = datetime.datetime.now().isoformat()
        
        conn.execute('''
            INSERT INTO admin_users (email, password_hash, full_name, created_at)
            VALUES (?, ?, ?, ?)
        ''', ('admin@mcmetsolart.com', password_hash, 'Administrator', created_at))
        
        conn.commit()
        print("✅ Admin default creat: admin@mcmetsolart.com / Admin123!@#")
    
    conn.close()

def register_admin_auth_routes(app):
    """Înregistrează rutele de autentificare admin"""
    
    @app.route('/api/admin/auth/login', methods=['POST'])
    def admin_login():
        """Login admin cu email și parolă"""
        try:
            data = request.get_json()
            email = data.get('email', '').strip().lower()
            password = data.get('password', '')
            
            if not email or not password:
                return jsonify({
                    'success': False,
                    'message': 'Email și parolă sunt obligatorii'
                }), 400
            
            conn = get_db_connection()
            
            # Găsește admin
            admin = conn.execute('SELECT * FROM admin_users WHERE email = ?', (email,)).fetchone()
            
            if not admin:
                conn.close()
                return jsonify({
                    'success': False,
                    'message': 'Email sau parolă incorectă'
                }), 401
            
            # Verifică dacă contul este blocat
            if admin['locked_until']:
                locked_until = datetime.datetime.fromisoformat(admin['locked_until'])
                if datetime.datetime.now() < locked_until:
                    conn.close()
                    return jsonify({
                        'success': False,
                        'message': f'Cont blocat până la {locked_until.strftime("%H:%M:%S")}'
                    }), 403
            
            # Verifică parola
            if not check_password_hash(admin['password_hash'], password):
                # Incrementează încercări eșuate
                login_attempts = admin['login_attempts'] + 1
                
                # Blochează după 5 încercări
                if login_attempts >= 5:
                    locked_until = (datetime.datetime.now() + datetime.timedelta(minutes=30)).isoformat()
                    conn.execute('''
                        UPDATE admin_users 
                        SET login_attempts = ?, locked_until = ?
                        WHERE id = ?
                    ''', (login_attempts, locked_until, admin['id']))
                else:
                    conn.execute('''
                        UPDATE admin_users 
                        SET login_attempts = ?
                        WHERE id = ?
                    ''', (login_attempts, admin['id']))
                
                conn.commit()
                conn.close()
                
                return jsonify({
                    'success': False,
                    'message': f'Email sau parolă incorectă. Încercări rămase: {5 - login_attempts}'
                }), 401
            
            # Verifică dacă contul este activ
            if not admin['is_active']:
                conn.close()
                return jsonify({
                    'success': False,
                    'message': 'Cont dezactivat. Contactează administratorul.'
                }), 403
            
            # Resetează încercări și actualizează last_login
            now = datetime.datetime.now().isoformat()
            conn.execute('''
                UPDATE admin_users 
                SET login_attempts = 0, locked_until = NULL, last_login = ?
                WHERE id = ?
            ''', (now, admin['id']))
            conn.commit()
            conn.close()
            
            # Generează JWT token
            expiration = datetime.datetime.utcnow() + datetime.timedelta(hours=JWT_EXPIRATION_HOURS)
            token = jwt.encode({
                'user_id': admin['id'],
                'email': admin['email'],
                'role': 'admin',
                'exp': expiration
            }, JWT_SECRET, algorithm=JWT_ALGORITHM)
            
            return jsonify({
                'success': True,
                'message': 'Autentificare reușită',
                'data': {
                    'token': token,
                    'admin': {
                        'id': admin['id'],
                        'email': admin['email'],
                        'fullName': admin['full_name'],
                        'role': admin['role']
                    },
                    'expiresIn': JWT_EXPIRATION_HOURS * 3600  # secunde
                }
            }), 200
            
        except Exception as e:
            print(f"❌ Eroare login admin: {str(e)}")
            return jsonify({
                'success': False,
                'message': 'Eroare la autentificare'
            }), 500
    
    @app.route('/api/admin/auth/verify', methods=['GET'])
    @admin_token_required
    def verify_admin_token():
        """Verifică dacă token-ul admin este valid"""
        return jsonify({
            'success': True,
            'message': 'Token valid',
            'data': {
                'adminId': request.admin_id,
                'email': request.admin_email
            }
        }), 200
    
    @app.route('/api/admin/auth/change-password', methods=['POST'])
    @admin_token_required
    def change_admin_password():
        """Schimbă parola admin"""
        try:
            data = request.get_json()
            old_password = data.get('oldPassword', '')
            new_password = data.get('newPassword', '')
            
            if not old_password or not new_password:
                return jsonify({
                    'success': False,
                    'message': 'Parola veche și nouă sunt obligatorii'
                }), 400
            
            if len(new_password) < 8:
                return jsonify({
                    'success': False,
                    'message': 'Parola nouă trebuie să aibă minim 8 caractere'
                }), 400
            
            conn = get_db_connection()
            admin = conn.execute('SELECT * FROM admin_users WHERE id = ?', (request.admin_id,)).fetchone()
            
            if not check_password_hash(admin['password_hash'], old_password):
                conn.close()
                return jsonify({
                    'success': False,
                    'message': 'Parola veche este incorectă'
                }), 401
            
            # Actualizează parola
            new_password_hash = generate_password_hash(new_password)
            conn.execute('''
                UPDATE admin_users 
                SET password_hash = ?
                WHERE id = ?
            ''', (new_password_hash, request.admin_id))
            conn.commit()
            conn.close()
            
            return jsonify({
                'success': True,
                'message': 'Parolă schimbată cu succes'
            }), 200
            
        except Exception as e:
            print(f"❌ Eroare schimbare parolă: {str(e)}")
            return jsonify({
                'success': False,
                'message': 'Eroare la schimbarea parolei'
            }), 500
    
    print("✅ Rute autentificare admin înregistrate")

# Inițializare la import
init_admin_table()
create_default_admin()

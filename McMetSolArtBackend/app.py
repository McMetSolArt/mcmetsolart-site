from flask import Flask, request, jsonify, send_from_directory, send_file
import os
try:
    # optional: load .env during development
    from dotenv import load_dotenv
    load_dotenv()
except Exception:
    pass
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
import sqlite3
from datetime import datetime, timedelta
import secrets
import re
import uuid
try:
    # Prefer package-relative imports when running as a package (recommended)
    from .translations import t
    from .email_service import send_contact_email, send_order_notification_email
except Exception:
    # Fallback: allow running app.py directly (script mode) by adjusting sys.path
    import sys
    sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
    from translations import t
    from email_service import send_contact_email, send_order_notification_email

# Determine static folder path (serve frontend from parent if index.html exists there)
frontend_static_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
index_html_path = os.path.join(frontend_static_path, 'index.html')
if not os.path.exists(index_html_path):
    frontend_static_path = None

# Debug: print resolved static path and whether index.html exists
try:
    print("DEBUG frontend_static_path =", frontend_static_path, "index_html_path=", index_html_path, "index_exists=", os.path.exists(index_html_path))
except Exception as _e:
    # Keep startup robust even if printing fails
    print("DEBUG: failed to print frontend_static_path:", _e)

if frontend_static_path:
    # In production / Render: serve static files from parent (index.html, css/, js/, images/)
    # Use static_url_path='/' so static files are served from root (e.g. /css/, /js/)
    app = Flask(__name__, static_folder=frontend_static_path, static_url_path='/')
else:
    # Dev mode: no static files needed (served separately)
    app = Flask(__name__)

CORS(app)  # Permite cereri de la frontend

# Load configuration from environment (sa fie ușor de configurat în producție)
print("🔑 Sistem cu Token Permanent - inițializare cu variabile de mediu dacă sunt setate")

# Configurare Email (va fi implementat ulterior cu SendGrid sau SMTP)
EMAIL_ENABLED = os.getenv('EMAIL_ENABLED', 'False').lower() in ('1', 'true', 'yes')

# Path la baza de date (poate fi fișier sqlite local sau calea completă)
DATABASE = os.getenv('DATABASE', 'mc_metsolart.db')

# Debug / host / port
FLASK_DEBUG = os.getenv('FLASK_DEBUG', 'False').lower() in ('1', 'true', 'yes')
HOST = os.getenv('HOST', '0.0.0.0')
PORT = int(os.getenv('PORT', '5000'))

# -------------------------
# Decorator pentru autentificare cu token permanent
# -------------------------
def token_required(f):
    """Decorator pentru endpoint-uri protejate - folosește api_token permanent"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization', '')
        
        if not auth_header:
            return jsonify({
                'success': False,
                'message': 'Token de autentificare lipsă. Te rugăm să te autentifici.'
            }), 401
        
        try:
            token = auth_header.split(' ')[1] if ' ' in auth_header else auth_header
        except:
            return jsonify({
                'success': False,
                'message': 'Format token invalid.'
            }), 401
        
        try:
            conn = sqlite3.connect(DATABASE)
            conn.row_factory = sqlite3.Row
            user = conn.execute('SELECT * FROM users WHERE api_token = ?', (token,)).fetchone()
            conn.close()
            
            if not user:
                return jsonify({
                    'success': False,
                    'message': 'Token invalid. Te rugăm să te autentifici din nou.'
                }), 401
            
            request.current_user_id = user['id']
            request.current_user = dict(user)
            
            return f(*args, **kwargs)
            
        except Exception as e:
            print(f"❌ Eroare verificare token: {str(e)}")
            return jsonify({
                'success': False,
                'message': 'Eroare la verificarea token-ului.'
            }), 500
    
    return decorated_function

# -------------------------
# Funcții pentru baza de date
# -------------------------
def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Inițializează baza de date cu toate tabelele necesare"""
    conn = get_db()
    c = conn.cursor()
    
    # Tabela utilizatori
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            phone TEXT,
            company TEXT,
            address TEXT,
            city TEXT,
            postal_code TEXT,
            county TEXT,
            country TEXT DEFAULT 'România',
            alternative_phone TEXT,
            whatsapp TEXT,
            avatar TEXT,
            language TEXT DEFAULT 'ro',
            role TEXT DEFAULT 'user',
            email_verified INTEGER DEFAULT 0,
            api_token TEXT UNIQUE,
            created_at TEXT NOT NULL,
            last_login TEXT,
            updated_at TEXT
        )
    ''')
    
    # Tabela comenzi
    c.execute('''
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            order_number TEXT UNIQUE NOT NULL,
            status TEXT DEFAULT 'pending',
            total_amount REAL NOT NULL,
            currency TEXT DEFAULT 'RON',
            payment_method TEXT,
            payment_status TEXT DEFAULT 'unpaid',
            shipping_address TEXT,
            billing_address TEXT,
            shipping_method TEXT,
            tracking_number TEXT,
            notes TEXT,
            admin_notes TEXT,
            confirmed_at TEXT,
            shipped_at TEXT,
            delivered_at TEXT,
            cancelled_at TEXT,
            created_at TEXT NOT NULL,
            updated_at TEXT,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    
    # Tabela produse comandă
    c.execute('''
        CREATE TABLE IF NOT EXISTS order_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id INTEGER NOT NULL,
            product_id TEXT,
            product_name TEXT NOT NULL,
            product_description TEXT,
            quantity INTEGER NOT NULL,
            price REAL NOT NULL,
            discount REAL DEFAULT 0,
            tax REAL DEFAULT 0,
            subtotal REAL NOT NULL,
            FOREIGN KEY (order_id) REFERENCES orders (id)
        )
    ''')
    
    # Tabela setări utilizator
    c.execute('''
        CREATE TABLE IF NOT EXISTS user_settings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER UNIQUE NOT NULL,
            email_notifications INTEGER DEFAULT 1,
            sms_notifications INTEGER DEFAULT 0,
            newsletter INTEGER DEFAULT 1,
            two_factor_auth INTEGER DEFAULT 0,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    
    # Tabela mesaje suport
    c.execute('''
        CREATE TABLE IF NOT EXISTS support_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT NOT NULL,
            message TEXT NOT NULL,
            status TEXT DEFAULT 'open',
            created_at TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    
    # Tabela resetare parolă
    c.execute('''
        CREATE TABLE IF NOT EXISTS password_resets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            token TEXT UNIQUE NOT NULL,
            expires_at TEXT NOT NULL,
            used INTEGER DEFAULT 0,
            created_at TEXT NOT NULL
        )
    ''')
    
    # Tabela notificări
    c.execute('''
        CREATE TABLE IF NOT EXISTS notifications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            type TEXT NOT NULL,
            title TEXT NOT NULL,
            message TEXT NOT NULL,
            link TEXT,
            read INTEGER DEFAULT 0,
            created_at TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    
    # Tabela adrese livrare
    c.execute('''
        CREATE TABLE IF NOT EXISTS shipping_addresses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            label TEXT,
            full_name TEXT NOT NULL,
            phone TEXT NOT NULL,
            address TEXT NOT NULL,
            city TEXT NOT NULL,
            county TEXT NOT NULL,
            postal_code TEXT NOT NULL,
            country TEXT DEFAULT 'România',
            is_default INTEGER DEFAULT 0,
            created_at TEXT NOT NULL,
            updated_at TEXT,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    
    # Tabela log emailuri
    c.execute('''
        CREATE TABLE IF NOT EXISTS email_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            recipient TEXT NOT NULL,
            subject TEXT NOT NULL,
            template TEXT NOT NULL,
            status TEXT DEFAULT 'sent',
            error_message TEXT,
            sent_at TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    
    # Tabela sesiuni
    c.execute('''
        CREATE TABLE IF NOT EXISTS sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            token TEXT UNIQUE NOT NULL,
            ip_address TEXT,
            user_agent TEXT,
            expires_at TEXT NOT NULL,
            created_at TEXT NOT NULL,
            last_activity TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    
    # Tabela log activități
    c.execute('''
        CREATE TABLE IF NOT EXISTS activity_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            action TEXT NOT NULL,
            description TEXT,
            ip_address TEXT,
            user_agent TEXT,
            created_at TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    
    conn.commit()
    conn.close()
    print("✅ Baza de date inițializată cu succes!")
    print("📊 Tabele create: users, orders, order_items, user_settings, support_messages,")
    print("   password_resets, notifications, shipping_addresses, email_logs, sessions, activity_logs")

# -------------------------
# Funcții helper
# -------------------------
def validate_email(email):
    """Validează formatul email-ului"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_password(password):
    """Validează puterea parolei"""
    if len(password) < 6:
        return False, "Parola trebuie să aibă minim 6 caractere"
    return True, ""

def get_user_by_email(email):
    """Returnează utilizatorul după email"""
    conn = get_db()
    user = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
    conn.close()
    return dict(user) if user else None

def get_user_by_id(user_id):
    """Returnează utilizatorul după ID"""
    conn = get_db()
    user = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
    conn.close()
    return dict(user) if user else None

def log_activity(user_id, action, description=None, ip_address=None, user_agent=None):
    """Înregistrează activitatea utilizatorului"""
    try:
        conn = get_db()
        conn.execute('''
            INSERT INTO activity_logs (user_id, action, description, ip_address, user_agent, created_at)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (user_id, action, description, ip_address, user_agent, datetime.now().isoformat()))
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"❌ Eroare log activitate: {str(e)}")

def create_notification(user_id, notification_type, title, message, link=None):
    """Creează o notificare pentru utilizator"""
    try:
        conn = get_db()
        conn.execute('''
            INSERT INTO notifications (user_id, type, title, message, link, created_at)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (user_id, notification_type, title, message, link, datetime.now().isoformat()))
        conn.commit()
        conn.close()
        return True
    except Exception as e:
        print(f"❌ Eroare creare notificare: {str(e)}")
        return False

def send_email(recipient, subject, template, user_id=None, **kwargs):
    """Trimite email și înregistrează în log"""
    try:
        if EMAIL_ENABLED:
            # Aici vei implementa trimiterea reală de email cu SendGrid sau SMTP
            # from sendgrid import SendGridAPIClient
            # from sendgrid.helpers.mail import Mail
            # message = Mail(from_email='mc_metsolart@yahoo.com', to_emails=recipient, subject=subject, html_content='...')
            # sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
            # response = sg.send(message)
            pass
        
        # Înregistrează în log
        conn = get_db()
        conn.execute('''
            INSERT INTO email_logs (user_id, recipient, subject, template, status, sent_at)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (user_id, recipient, subject, template, 'queued' if not EMAIL_ENABLED else 'sent', datetime.now().isoformat()))
        conn.commit()
        conn.close()
        
        print(f"📧 Email {'trimis' if EMAIL_ENABLED else 'înregistrat'} către {recipient}: {subject}")
        return True
    except Exception as e:
        print(f"❌ Eroare trimitere email: {str(e)}")
        return False

def generate_order_number():
    """Generează un număr unic de comandă"""
    timestamp = datetime.now().strftime('%Y%m%d')
    random_part = secrets.token_hex(3).upper()
    return f"ORD-{timestamp}-{random_part}"

def get_language():
    """Obține limba din header-ul Accept-Language"""
    lang = request.headers.get('Accept-Language', 'ro')
    # Extrage doar codul limbii (primele 2 caractere)
    lang = lang[:2].lower()
    # Validează limba
    if lang not in ['ro', 'en', 'uk', 'it']:
        lang = 'ro'
    return lang

# -------------------------
# Rute API - Autentificare
# -------------------------
@app.route('/')
def index():
    """Serve index.html if available, else return API info"""
    if frontend_static_path:
        return app.send_static_file('index.html')
    return jsonify({
        'message': 'MC MetSolArt Backend API',
        'version': '1.0',
        'status': 'active'
    })

@app.route('/<path:path>')
def serve_static(path):
    """Serve static files (css, js, images, etc.)"""
    if frontend_static_path and path:
        file_path = os.path.join(frontend_static_path, path)
        if os.path.isfile(file_path):
            return send_from_directory(frontend_static_path, path)

        # If the requested path is not a file, but we have an index.html,
        # serve index.html to support client-side routing (SPA fallback).
        index_file = os.path.join(frontend_static_path, 'index.html')
        if os.path.exists(index_file):
            return app.send_static_file('index.html')

    # Fall back to API routes
    return jsonify({'error': 'Not found'}), 404

# -------------------------
# Health Check
# -------------------------
@app.route('/api/health', methods=['GET'])
def health_check():
    """Verifică starea backend-ului"""
    try:
        # Verifică conexiunea la baza de date
        conn = get_db()
        conn.execute('SELECT 1')
        conn.close()
        
        return jsonify({
            'success': True,
            'status': 'healthy',
            'message': 'Backend funcționează corect',
            'timestamp': datetime.now().isoformat(),
            'database': 'connected'
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'status': 'unhealthy',
            'message': f'Eroare: {str(e)}',
            'timestamp': datetime.now().isoformat()
        }), 500


@app.route('/debug', methods=['GET'])
def debug_info():
    """Return runtime debug info useful in Render logs."""
    try:
        index_exists = False
        try:
            index_exists = bool(index_html_path and os.path.exists(index_html_path))
        except Exception:
            index_exists = False

        return jsonify({
            'frontend_static_path': frontend_static_path,
            'index_html_path': index_html_path,
            'index_exists': index_exists,
            'cwd': os.getcwd()
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/debug/list', methods=['GET'])
def debug_list():
    """Return a sample list of files under the resolved frontend_static_path."""
    try:
        if not frontend_static_path:
            return jsonify({'error': 'frontend_static_path not set', 'index_html_path': index_html_path}), 404

        files = []
        # walk the frontend folder but limit to first 200 files for safety
        for root_dir, dirs, filenames in os.walk(frontend_static_path):
            for fname in filenames:
                rel = os.path.relpath(os.path.join(root_dir, fname), frontend_static_path)
                files.append(rel.replace('\\', '/'))
                if len(files) >= 200:
                    break
            if len(files) >= 200:
                break

        return jsonify({'files_sample_count': len(files), 'files_sample': files}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# -------------------------
# Autentificare
# -------------------------
@app.route('/api/auth/register', methods=['POST'])
def register():
    """Înregistrare utilizator nou"""
    try:
        data = request.json
        
        # Validare date
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        first_name = data.get('first_name', '').strip()
        last_name = data.get('last_name', '').strip()
        language = data.get('language', 'ro')
        
        lang = get_language()
        
        if not all([email, password, first_name, last_name]):
            return jsonify({
                'success': False,
                'message': t('auth.validation.allFieldsRequired', lang)
            }), 400
        
        if not validate_email(email):
            return jsonify({
                'success': False,
                'message': t('auth.validation.emailInvalid', lang)
            }), 400
        
        is_valid, msg = validate_password(password)
        if not is_valid:
            return jsonify({
                'success': False,
                'message': t('auth.validation.passwordWeak', lang)
            }), 400
        
        # Verifică dacă email-ul există deja
        if get_user_by_email(email):
            return jsonify({
                'success': False,
                'message': t('auth.register.emailExists', lang)
            }), 400
        
        # Creează utilizatorul
        password_hash = generate_password_hash(password)
        avatar = f"https://ui-avatars.com/api/?name={first_name}+{last_name}&background=176f87&color=fff&size=128"
        api_token = str(uuid.uuid4())  # Generează token permanent unic
        created_at = datetime.now().isoformat()
        
        conn = get_db()
        cursor = conn.execute('''
            INSERT INTO users (email, password_hash, first_name, last_name, avatar, language, api_token, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (email, password_hash, first_name, last_name, avatar, language, api_token, created_at))
        
        user_id = cursor.lastrowid
        
        # Creează setări default
        conn.execute('''
            INSERT INTO user_settings (user_id)
            VALUES (?)
        ''', (user_id,))
        
        conn.commit()
        conn.close()
        
        # Returnează datele utilizatorului CU TOKEN PERMANENT
        user = get_user_by_id(user_id)
        user_data = {
            'id': user['id'],
            'email': user['email'],
            'firstName': user['first_name'],
            'lastName': user['last_name'],
            'avatar': user['avatar'],
            'language': user['language'],
            'role': user['role'],
            'apiToken': user['api_token']
        }
        
        print(f"✅ Utilizator nou: {email} | Token: {api_token}")
        
        return jsonify({
            'success': True,
            'message': t('auth.register.success', lang),
            'data': {
                'user': user_data,
                'token': api_token  # Token permanent (nu JWT!)
            }
        }), 201
        
    except Exception as e:
        print(f"❌ Eroare înregistrare: {str(e)}")
        lang = get_language()
        return jsonify({
            'success': False,
            'message': t('error', lang)
        }), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    """Autentificare utilizator"""
    try:
        data = request.json
        lang = get_language()
        
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        
        if not email or not password:
            return jsonify({
                'success': False,
                'message': t('auth.validation.allFieldsRequired', lang)
            }), 400
        
        # Găsește utilizatorul
        user = get_user_by_email(email)
        
        if not user or not check_password_hash(user['password_hash'], password):
            return jsonify({
                'success': False,
                'message': t('auth.login.error', lang)
            }), 401
        
        # Actualizează last_login
        conn = get_db()
        conn.execute('UPDATE users SET last_login = ? WHERE id = ?',
                    (datetime.now().isoformat(), user['id']))
        conn.commit()
        conn.close()
        
        # Returnează token-ul PERMANENT (NU se regenerează!)
        user_data = {
            'id': user['id'],
            'email': user['email'],
            'firstName': user['first_name'],
            'lastName': user['last_name'],
            'phone': user['phone'],
            'company': user['company'],
            'address': user['address'],
            'city': user['city'],
            'postalCode': user['postal_code'],
            'county': user['county'],
            'country': user['country'],
            'alternativePhone': user['alternative_phone'],
            'whatsapp': user['whatsapp'],
            'avatar': user['avatar'],
            'language': user['language'],
            'role': user['role'],
            'apiToken': user['api_token']
        }
        
        print(f"✅ Login: {email} | Token: {user['api_token']}")
        
        return jsonify({
            'success': True,
            'message': t('auth.login.success', lang),
            'data': {
                'user': user_data,
                'token': user['api_token']  # Token permanent (același mereu!)
            }
        }), 200
        
    except Exception as e:
        print(f"❌ Eroare autentificare: {str(e)}")
        lang = get_language()
        return jsonify({
            'success': False,
            'message': t('error', lang)
        }), 500

@app.route('/api/auth/logout', methods=['POST'])
@token_required
def logout():
    """Logout utilizator"""
    lang = get_language()
    return jsonify({
        'success': True,
        'message': t('auth.logout.success', lang)
    }), 200

# -------------------------
# Rute API - Profil Utilizator
# -------------------------
@app.route('/api/user/profile', methods=['GET'])
@token_required
def get_profile():
    """Obține profilul utilizatorului curent"""
    try:
        user_id = request.current_user_id
        user = get_user_by_id(user_id)
        
        lang = get_language()
        
        if not user:
            return jsonify({
                'success': False,
                'message': t('profile.notFound', lang)
            }), 404
        
        user_data = {
            'id': user['id'],
            'email': user['email'],
            'firstName': user['first_name'],
            'lastName': user['last_name'],
            'phone': user['phone'],
            'company': user['company'],
            'address': user['address'],
            'city': user['city'],
            'postalCode': user['postal_code'],
            'county': user['county'],
            'country': user['country'],
            'alternativePhone': user['alternative_phone'],
            'whatsapp': user['whatsapp'],
            'avatar': user['avatar'],
            'language': user['language'],
            'role': user['role'],
            'createdAt': user['created_at'],
            'lastLogin': user['last_login']
        }
        
        return jsonify({
            'success': True,
            'data': {'user': user_data}
        }), 200
        
    except Exception as e:
        print(f"❌ Eroare obținere profil: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Eroare la obținerea profilului'
        }), 500

@app.route('/api/user/profile', methods=['PUT'])
@token_required
def update_profile():
    """Actualizează profilul utilizatorului"""
    try:
        user_id = request.current_user_id
        data = request.json
        
        print(f"📝 Update profile pentru user_id: {user_id}")
        print(f"📋 Date primite: {data}")
        
        # Câmpuri permise pentru actualizare
        allowed_fields = {
            'first_name': data.get('firstName'),
            'last_name': data.get('lastName'),
            'phone': data.get('phone'),
            'company': data.get('company'),
            'address': data.get('address'),
            'city': data.get('city'),
            'postal_code': data.get('postalCode'),
            'county': data.get('county'),
            'country': data.get('country'),
            'alternative_phone': data.get('alternativePhone'),
            'whatsapp': data.get('whatsapp'),
            'language': data.get('language')
        }
        
        print(f"✅ Câmpuri procesate: {allowed_fields}")
        
        # Construiește query-ul de update
        update_fields = []
        update_values = []
        
        for field, value in allowed_fields.items():
            if value is not None:
                update_fields.append(f"{field} = ?")
                update_values.append(value)
        
        if not update_fields:
            return jsonify({
                'success': False,
                'message': 'Nu există date pentru actualizare'
            }), 400
        
        update_values.append(user_id)
        query = f"UPDATE users SET {', '.join(update_fields)} WHERE id = ?"
        
        conn = get_db()
        conn.execute(query, update_values)
        conn.commit()
        conn.close()
        
        # Returnează profilul actualizat
        user = get_user_by_id(user_id)
        user_data = {
            'id': user['id'],
            'email': user['email'],
            'firstName': user['first_name'],
            'lastName': user['last_name'],
            'phone': user['phone'],
            'company': user['company'],
            'address': user['address'],
            'city': user['city'],
            'postalCode': user['postal_code'],
            'county': user['county'],
            'country': user['country'],
            'alternativePhone': user['alternative_phone'],
            'whatsapp': user['whatsapp'],
            'avatar': user['avatar'],
            'language': user['language']
        }
        
        lang = get_language()
        return jsonify({
            'success': True,
            'message': t('profile.update.success', lang),
            'data': {'user': user_data}
        }), 200
        
    except Exception as e:
        print(f"❌ Eroare actualizare profil: {str(e)}")
        import traceback
        traceback.print_exc()
        lang = get_language()
        return jsonify({
            'success': False,
            'message': t('profile.update.error', lang)
        }), 500

@app.route('/api/user/avatar', methods=['PUT'])
@token_required
def update_avatar():
    """Actualizează avatarul utilizatorului"""
    try:
        user_id = request.current_user_id
        data = request.json
        
        avatar = data.get('avatar')
        
        if not avatar:
            return jsonify({
                'success': False,
                'message': 'Avatar lipsă'
            }), 400
        
        # Validare base64 image
        if not avatar.startswith('data:image/'):
            return jsonify({
                'success': False,
                'message': 'Format imagine invalid'
            }), 400
        
        # Verifică dimensiunea (aproximativ, base64 este ~33% mai mare)
        max_size = 7 * 1024 * 1024  # 7MB pentru base64 (~5MB original)
        if len(avatar) > max_size:
            return jsonify({
                'success': False,
                'message': 'Imaginea este prea mare. Dimensiunea maximă este 5MB'
            }), 400
        
        print(f"📸 Update avatar pentru user_id: {user_id}")
        
        # Actualizează avatarul în baza de date
        conn = get_db()
        conn.execute('UPDATE users SET avatar = ? WHERE id = ?', (avatar, user_id))
        conn.commit()
        conn.close()
        
        # Returnează profilul actualizat
        user = get_user_by_id(user_id)
        user_data = {
            'id': user['id'],
            'email': user['email'],
            'firstName': user['first_name'],
            'lastName': user['last_name'],
            'phone': user['phone'],
            'company': user['company'],
            'address': user['address'],
            'city': user['city'],
            'postalCode': user['postal_code'],
            'county': user['county'],
            'country': user['country'],
            'alternativePhone': user['alternative_phone'],
            'whatsapp': user['whatsapp'],
            'avatar': user['avatar'],
            'language': user['language']
        }
        
        lang = get_language()
        return jsonify({
            'success': True,
            'message': t('profile.avatar.success', lang) if 'profile.avatar.success' in t.__dict__ else 'Avatar actualizat cu succes!',
            'data': {'user': user_data}
        }), 200
        
    except Exception as e:
        print(f"❌ Eroare actualizare avatar: {str(e)}")
        import traceback
        traceback.print_exc()
        lang = get_language()
        return jsonify({
            'success': False,
            'message': 'Eroare la actualizarea avatarului'
        }), 500

# -------------------------
# Rute API - Comenzi
# -------------------------
@app.route('/api/user/orders', methods=['GET'])
@token_required
def get_orders():
    """Obține comenzile utilizatorului"""
    try:
        user_id = request.current_user_id
        lang = get_language()
        
        conn = get_db()
        orders = conn.execute('''
            SELECT * FROM orders 
            WHERE user_id = ? 
            ORDER BY created_at DESC
        ''', (user_id,)).fetchall()
        
        orders_data = []
        for order in orders:
            # Obține produsele comenzii
            items = conn.execute('''
                SELECT * FROM order_items WHERE order_id = ?
            ''', (order['id'],)).fetchall()
            
            orders_data.append({
                'id': order['id'],
                'orderNumber': order['order_number'],
                'status': order['status'],
                'totalAmount': float(order['total_amount']) if order['total_amount'] else 0.0,
                'currency': order['currency'] or 'RON',
                'paymentMethod': order['payment_method'],
                'paymentStatus': order.get('payment_status', 'unpaid'),
                'shippingAddress': order['shipping_address'],
                'trackingNumber': order.get('tracking_number'),
                'notes': order['notes'],
                'createdAt': order['created_at'],
                'updatedAt': order.get('updated_at'),
                'confirmedAt': order.get('confirmed_at'),
                'shippedAt': order.get('shipped_at'),
                'deliveredAt': order.get('delivered_at'),
                'items': [{
                    'id': item['id'],
                    'productId': item.get('product_id'),
                    'productName': item['product_name'],
                    'productDescription': item.get('product_description', ''),
                    'quantity': int(item['quantity']) if item['quantity'] else 1,
                    'price': float(item['price']) if item['price'] else 0.0,
                    'subtotal': float(item.get('subtotal', 0)) if item.get('subtotal') else 0.0
                } for item in items]
            })
        
        conn.close()
        
        return jsonify({
            'success': True,
            'data': {'orders': orders_data}
        }), 200
        
    except Exception as e:
        print(f"❌ Eroare obținere comenzi: {str(e)}")
        import traceback
        traceback.print_exc()
        lang = get_language()
        return jsonify({
            'success': False,
            'message': t('error', lang)
        }), 500

# -------------------------
# Rute API - Setări
# -------------------------
@app.route('/api/user/settings', methods=['GET'])
@token_required
def get_settings():
    """Obține setările utilizatorului"""
    try:
        user_id = request.current_user_id
        
        conn = get_db()
        settings = conn.execute('''
            SELECT * FROM user_settings WHERE user_id = ?
        ''', (user_id,)).fetchone()
        conn.close()
        
        if not settings:
            return jsonify({
                'success': False,
                'message': 'Setări negăsite'
            }), 404
        
        settings_data = {
            'emailNotifications': bool(settings['email_notifications']),
            'smsNotifications': bool(settings['sms_notifications']),
            'newsletter': bool(settings['newsletter']),
            'twoFactorAuth': bool(settings['two_factor_auth'])
        }
        
        return jsonify({
            'success': True,
            'data': {'settings': settings_data}
        }), 200
        
    except Exception as e:
        print(f"❌ Eroare obținere setări: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Eroare la obținerea setărilor'
        }), 500

@app.route('/api/user/settings', methods=['PUT'])
@token_required
def update_settings():
    """Actualizează setările utilizatorului"""
    try:
        user_id = request.current_user_id
        data = request.json
        
        conn = get_db()
        conn.execute('''
            UPDATE user_settings 
            SET email_notifications = ?,
                sms_notifications = ?,
                newsletter = ?,
                two_factor_auth = ?
            WHERE user_id = ?
        ''', (
            int(data.get('emailNotifications', True)),
            int(data.get('smsNotifications', False)),
            int(data.get('newsletter', True)),
            int(data.get('twoFactorAuth', False)),
            user_id
        ))
        conn.commit()
        conn.close()
        
        return jsonify({
            'success': True,
            'message': 'Setări actualizate cu succes'
        }), 200
        
    except Exception as e:
        print(f"❌ Eroare actualizare setări: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Eroare la actualizarea setărilor'
        }), 500

# -------------------------
# Rute API - Suport
# -------------------------
@app.route('/api/support/message', methods=['POST'])
def send_support_message():
    """Trimite mesaj către suport"""
    try:
        data = request.json
        lang = get_language()
        
        name = data.get('name', '').strip()
        email = data.get('email', '').strip().lower()
        subject = data.get('subject', '').strip()
        message = data.get('message', '').strip()
        phone = data.get('phone', '').strip() if data.get('phone') else None
        
        if not all([name, email, subject, message]):
            return jsonify({
                'success': False,
                'message': t('auth.validation.allFieldsRequired', lang)
            }), 400
        
        if not validate_email(email):
            return jsonify({
                'success': False,
                'message': t('auth.validation.emailInvalid', lang)
            }), 400
        
        # Verifică dacă utilizatorul este autentificat
        user_id = None
        try:
            from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
            verify_jwt_in_request(optional=True)
            user_id = request.current_user_id
        except:
            pass
        
        created_at = datetime.now().isoformat()
        
        # Salvează în baza de date
        conn = get_db()
        conn.execute('''
            INSERT INTO support_messages (user_id, name, email, subject, message, created_at)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (user_id, name, email, subject, message, created_at))
        conn.commit()
        conn.close()
        
        # Trimite email REAL către mc_metsolart@yahoo.com
        email_success, email_error = send_contact_email(name, email, subject, message, phone)
        
        if email_success:
            print(f"✅ Email de contact trimis cu succes de la {name} ({email})")
        else:
            print(f"⚠️ Email nu a putut fi trimis: {email_error}")
        
        return jsonify({
            'success': True,
            'message': t('support.message.success', lang)
        }), 201
        
    except Exception as e:
        print(f"❌ Eroare trimitere mesaj: {str(e)}")
        lang = get_language()
        return jsonify({
            'success': False,
            'message': t('support.message.error', lang)
        }), 500

# -------------------------
# Rute API - Comenzi Complete
# -------------------------
@app.route('/api/orders/create', methods=['POST'])
@token_required
def create_order():
    """Creează o comandă nouă"""
    try:
        user_id = request.current_user_id
        data = request.json
        
        # Validare date
        items = data.get('items', [])
        shipping_address = data.get('shipping_address')
        payment_method = data.get('payment_method', 'card')
        notes = data.get('notes', '')
        
        lang = get_language()
        
        if not items or len(items) == 0:
            return jsonify({
                'success': False,
                'message': t('order.create.noItems', lang)
            }), 400
        
        if not shipping_address:
            return jsonify({
                'success': False,
                'message': t('order.create.noAddress', lang)
            }), 400
        
        # Calculează totalul
        total_amount = sum(item.get('price', 0) * item.get('quantity', 1) for item in items)
        
        # Generează număr comandă
        order_number = generate_order_number()
        created_at = datetime.now().isoformat()
        
        conn = get_db()
        
        # Creează comanda
        cursor = conn.execute('''
            INSERT INTO orders (
                user_id, order_number, status, total_amount, currency,
                payment_method, shipping_address, notes, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            user_id, order_number, 'pending', total_amount, 'RON',
            payment_method, shipping_address, notes, created_at, created_at
        ))
        
        order_id = cursor.lastrowid
        
        # Adaugă produsele
        for item in items:
            subtotal = item.get('price', 0) * item.get('quantity', 1)
            conn.execute('''
                INSERT INTO order_items (
                    order_id, product_id, product_name, product_description,
                    quantity, price, subtotal
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (
                order_id,
                item.get('product_id'),
                item.get('product_name'),
                item.get('product_description', ''),
                item.get('quantity', 1),
                item.get('price', 0),
                subtotal
            ))
        
        conn.commit()
        conn.close()
        
        # Creează notificare
        create_notification(
            user_id,
            'order',
            t('notification.order.placed.title', lang),
            t('notification.order.placed.message', lang, order_number=order_number),
            f'/account/orders/{order_id}'
        )
        
        # Trimite email confirmare către client
        user = get_user_by_id(user_id)
        send_email(
            user['email'],
            f'Confirmare comandă #{order_number}',
            'order_confirmation',
            user_id=user_id
        )
        
        # Trimite notificare email către admin (mc_metsolart@yahoo.com)
        user_name = f"{user['first_name']} {user['last_name']}"
        send_order_notification_email(user['email'], user_name, order_number, total_amount)
        
        # Log activitate
        log_activity(user_id, 'order_created', f'Comandă #{order_number} creată')
        
        return jsonify({
            'success': True,
            'message': t('order.create.success', lang),
            'data': {
                'order_id': order_id,
                'order_number': order_number,
                'total_amount': total_amount,
                'status': 'pending'
            }
        }), 201
        
    except Exception as e:
        print(f"❌ Eroare creare comandă: {str(e)}")
        lang = get_language()
        return jsonify({
            'success': False,
            'message': t('order.create.error', lang)
        }), 500

@app.route('/api/orders/<int:order_id>', methods=['GET'])
@token_required
def get_order_details(order_id):
    """Obține detaliile unei comenzi"""
    try:
        user_id = request.current_user_id
        
        conn = get_db()
        
        # Obține comanda
        order = conn.execute('''
            SELECT * FROM orders WHERE id = ? AND user_id = ?
        ''', (order_id, user_id)).fetchone()
        
        if not order:
            conn.close()
            return jsonify({
                'success': False,
                'message': 'Comandă negăsită'
            }), 404
        
        # Obține produsele
        items = conn.execute('''
            SELECT * FROM order_items WHERE order_id = ?
        ''', (order_id,)).fetchall()
        
        conn.close()
        
        order_data = {
            'id': order['id'],
            'orderNumber': order['order_number'],
            'status': order['status'],
            'totalAmount': order['total_amount'],
            'currency': order['currency'],
            'paymentMethod': order['payment_method'],
            'paymentStatus': order['payment_status'],
            'shippingAddress': order['shipping_address'],
            'trackingNumber': order['tracking_number'],
            'notes': order['notes'],
            'createdAt': order['created_at'],
            'updatedAt': order['updated_at'],
            'confirmedAt': order['confirmed_at'],
            'shippedAt': order['shipped_at'],
            'deliveredAt': order['delivered_at'],
            'items': [{
                'id': item['id'],
                'productId': item['product_id'],
                'productName': item['product_name'],
                'productDescription': item['product_description'],
                'quantity': item['quantity'],
                'price': item['price'],
                'subtotal': item['subtotal']
            } for item in items]
        }
        
        return jsonify({
            'success': True,
            'data': {'order': order_data}
        }), 200
        
    except Exception as e:
        print(f"❌ Eroare obținere comandă: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Eroare la obținerea comenzii'
        }), 500

# -------------------------
# Rute API - Notificări
# -------------------------
@app.route('/api/notifications', methods=['GET'])
@token_required
def get_notifications():
    """Obține notificările utilizatorului"""
    try:
        user_id = request.current_user_id
        
        conn = get_db()
        notifications = conn.execute('''
            SELECT * FROM notifications 
            WHERE user_id = ? 
            ORDER BY created_at DESC 
            LIMIT 50
        ''', (user_id,)).fetchall()
        conn.close()
        
        notifications_data = [{
            'id': n['id'],
            'type': n['type'],
            'title': n['title'],
            'message': n['message'],
            'link': n['link'],
            'read': bool(n['read']),
            'createdAt': n['created_at']
        } for n in notifications]
        
        return jsonify({
            'success': True,
            'data': {'notifications': notifications_data}
        }), 200
        
    except Exception as e:
        print(f"❌ Eroare obținere notificări: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Eroare la obținerea notificărilor'
        }), 500

@app.route('/api/notifications/<int:notification_id>/read', methods=['PUT'])
@token_required
def mark_notification_read(notification_id):
    """Marchează o notificare ca citită"""
    try:
        user_id = request.current_user_id
        
        conn = get_db()
        conn.execute('''
            UPDATE notifications 
            SET read = 1 
            WHERE id = ? AND user_id = ?
        ''', (notification_id, user_id))
        conn.commit()
        conn.close()
        
        return jsonify({
            'success': True,
            'message': 'Notificare marcată ca citită'
        }), 200
        
    except Exception as e:
        print(f"❌ Eroare marcare notificare: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Eroare la marcarea notificării'
        }), 500

# -------------------------
# Rute API - Adrese Livrare
# -------------------------
@app.route('/api/shipping-addresses', methods=['GET'])
@token_required
def get_shipping_addresses():
    """Obține adresele de livrare ale utilizatorului"""
    try:
        user_id = request.current_user_id
        
        conn = get_db()
        addresses = conn.execute('''
            SELECT * FROM shipping_addresses 
            WHERE user_id = ? 
            ORDER BY is_default DESC, created_at DESC
        ''', (user_id,)).fetchall()
        conn.close()
        
        addresses_data = [{
            'id': addr['id'],
            'label': addr['label'],
            'fullName': addr['full_name'],
            'phone': addr['phone'],
            'address': addr['address'],
            'city': addr['city'],
            'county': addr['county'],
            'postalCode': addr['postal_code'],
            'country': addr['country'],
            'isDefault': bool(addr['is_default']),
            'createdAt': addr['created_at']
        } for addr in addresses]
        
        return jsonify({
            'success': True,
            'data': {'addresses': addresses_data}
        }), 200
        
    except Exception as e:
        print(f"❌ Eroare obținere adrese: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Eroare la obținerea adreselor'
        }), 500

@app.route('/api/shipping-addresses', methods=['POST'])
@token_required
def add_shipping_address():
    """Adaugă o adresă de livrare nouă"""
    try:
        user_id = request.current_user_id
        data = request.json
        
        conn = get_db()
        
        # Dacă este adresă default, resetează celelalte
        if data.get('isDefault'):
            conn.execute('''
                UPDATE shipping_addresses 
                SET is_default = 0 
                WHERE user_id = ?
            ''', (user_id,))
        
        # Adaugă adresa nouă
        cursor = conn.execute('''
            INSERT INTO shipping_addresses (
                user_id, label, full_name, phone, address, city, county,
                postal_code, country, is_default, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            user_id,
            data.get('label'),
            data.get('fullName'),
            data.get('phone'),
            data.get('address'),
            data.get('city'),
            data.get('county'),
            data.get('postalCode'),
            data.get('country', 'România'),
            int(data.get('isDefault', False)),
            datetime.now().isoformat()
        ))
        
        address_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        return jsonify({
            'success': True,
            'message': 'Adresă adăugată cu succes',
            'data': {'address_id': address_id}
        }), 201
        
    except Exception as e:
        print(f"❌ Eroare adăugare adresă: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Eroare la adăugarea adresei'
        }), 500

# -------------------------
# Rute API - Admin (Confirmare Comenzi)
# -------------------------
@app.route('/api/admin/orders', methods=['GET'])
@token_required
def admin_get_orders():
    """Obține toate comenzile (doar admin)"""
    try:
        user_id = request.current_user_id
        user = get_user_by_id(user_id)
        
        if user['role'] != 'admin':
            return jsonify({
                'success': False,
                'message': 'Acces interzis'
            }), 403
        
        conn = get_db()
        orders = conn.execute('''
            SELECT o.*, u.email, u.first_name, u.last_name
            FROM orders o
            JOIN users u ON o.user_id = u.id
            ORDER BY o.created_at DESC
        ''').fetchall()
        conn.close()
        
        orders_data = [{
            'id': order['id'],
            'orderNumber': order['order_number'],
            'status': order['status'],
            'totalAmount': order['total_amount'],
            'customerEmail': order['email'],
            'customerName': f"{order['first_name']} {order['last_name']}",
            'createdAt': order['created_at'],
            'confirmedAt': order['confirmed_at']
        } for order in orders]
        
        return jsonify({
            'success': True,
            'data': {'orders': orders_data}
        }), 200
        
    except Exception as e:
        print(f"❌ Eroare obținere comenzi admin: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Eroare la obținerea comenzilor'
        }), 500

@app.route('/api/admin/orders/<int:order_id>/confirm', methods=['PUT'])
@token_required
def admin_confirm_order(order_id):
    """Confirmă o comandă (doar admin)"""
    try:
        user_id = request.current_user_id
        user = get_user_by_id(user_id)
        
        if user['role'] != 'admin':
            return jsonify({
                'success': False,
                'message': 'Acces interzis'
            }), 403
        
        data = request.json
        admin_notes = data.get('admin_notes', '')
        
        conn = get_db()
        
        # Obține comanda
        order = conn.execute('SELECT * FROM orders WHERE id = ?', (order_id,)).fetchone()
        
        if not order:
            conn.close()
            return jsonify({
                'success': False,
                'message': 'Comandă negăsită'
            }), 404
        
        # Actualizează comanda
        confirmed_at = datetime.now().isoformat()
        conn.execute('''
            UPDATE orders 
            SET status = 'confirmed', 
                confirmed_at = ?,
                admin_notes = ?,
                updated_at = ?
            WHERE id = ?
        ''', (confirmed_at, admin_notes, confirmed_at, order_id))
        conn.commit()
        conn.close()
        
        # Obține limba utilizatorului
        customer = get_user_by_id(order['user_id'])
        customer_lang = customer.get('language', 'ro')
        
        # Creează notificare pentru client
        create_notification(
            order['user_id'],
            'order',
            t('notification.order.confirmed.title', customer_lang),
            t('notification.order.confirmed.message', customer_lang, order_number=order["order_number"]),
            f'/account/orders/{order_id}'
        )
        
        # Trimite email către client
        send_email(
            customer['email'],
            t('notification.order.confirmed.title', customer_lang) + f' #{order["order_number"]}',
            'order_confirmed',
            user_id=order['user_id']
        )
        
        # Log activitate
        log_activity(user_id, 'order_confirmed', f'Comandă #{order["order_number"]} confirmată de admin')
        
        lang = get_language()
        return jsonify({
            'success': True,
            'message': t('order.confirm.success', lang)
        }), 200
        
    except Exception as e:
        print(f"❌ Eroare confirmare comandă: {str(e)}")
        lang = get_language()
        return jsonify({
            'success': False,
            'message': t('admin.order.confirmError', lang)
        }), 500

@app.route('/api/admin/orders/<int:order_id>/status', methods=['PUT'])
@token_required
def admin_update_order_status(order_id):
    """Actualizează statusul unei comenzi (doar admin)"""
    try:
        user_id = request.current_user_id
        user = get_user_by_id(user_id)
        
        if user['role'] != 'admin':
            return jsonify({
                'success': False,
                'message': 'Acces interzis'
            }), 403
        
        data = request.json
        new_status = data.get('status')
        tracking_number = data.get('tracking_number')
        
        if not new_status:
            return jsonify({
                'success': False,
                'message': 'Status-ul este obligatoriu'
            }), 400
        
        conn = get_db()
        order = conn.execute('SELECT * FROM orders WHERE id = ?', (order_id,)).fetchone()
        
        if not order:
            conn.close()
            return jsonify({
                'success': False,
                'message': 'Comandă negăsită'
            }), 404
        
        # Actualizează statusul
        update_fields = ['status = ?', 'updated_at = ?']
        update_values = [new_status, datetime.now().isoformat()]
        
        if new_status == 'shipped' and tracking_number:
            update_fields.append('tracking_number = ?')
            update_fields.append('shipped_at = ?')
            update_values.extend([tracking_number, datetime.now().isoformat()])
        elif new_status == 'delivered':
            update_fields.append('delivered_at = ?')
            update_values.append(datetime.now().isoformat())
        
        update_values.append(order_id)
        
        conn.execute(f'''
            UPDATE orders 
            SET {', '.join(update_fields)}
            WHERE id = ?
        ''', update_values)
        conn.commit()
        conn.close()
        
        # Creează notificare
        status_messages = {
            'confirmed': 'Comanda ta a fost confirmată',
            'processing': 'Comanda ta este în procesare',
            'shipped': 'Comanda ta a fost expediată',
            'delivered': 'Comanda ta a fost livrată',
            'cancelled': 'Comanda ta a fost anulată'
        }
        
        create_notification(
            order['user_id'],
            'order',
            'Status comandă actualizat',
            status_messages.get(new_status, f'Status comandă: {new_status}'),
            f'/account/orders/{order_id}'
        )
        
        return jsonify({
            'success': True,
            'message': 'Status actualizat cu succes'
        }), 200
        
    except Exception as e:
        print(f"❌ Eroare actualizare status: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Eroare la actualizarea statusului'
        }), 500

# -------------------------
# Pornirea aplicației
# -------------------------
if __name__ == '__main__':
    print("🚀 Inițializare MC MetSolArt Backend...")
    init_db()
    print("✅ Backend pornit pe http://localhost:3000")
    print("📚 Documentație API: http://localhost:3000")
    # Dezactivat use_reloader pentru a păstra aceeași cheie JWT
    app.run(debug=True, host='0.0.0.0', port=3000, use_reloader=False)

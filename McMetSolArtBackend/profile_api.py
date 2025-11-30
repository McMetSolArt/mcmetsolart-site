"""
PROFILE API - Gestionare profil utilizator
Endpoint-uri pentru update profil, upload imagine, validări
"""

from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from PIL import Image
import os
import uuid
from datetime import datetime

profile_bp = Blueprint('profile', __name__)

# Configurare upload
UPLOAD_FOLDER = 'uploads/avatars'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def validate_email(email):
    """Validare format email"""
    import re
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_phone(phone):
    """Validare format telefon"""
    import re
    # Acceptă formate: +40 123 456 789, 0123456789, +40123456789
    pattern = r'^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$'
    return re.match(pattern, phone) is not None

@profile_bp.route('/api/profile/update', methods=['POST'])
def update_profile():
    """Update profil utilizator cu validări"""
    try:
        data = request.get_json()
        
        # Validări
        errors = {}
        
        # Email
        if 'email' in data:
            if not validate_email(data['email']):
                errors['email'] = 'Format email invalid'
        
        # Telefon
        if 'phone' in data:
            if not validate_phone(data['phone']):
                errors['phone'] = 'Format telefon invalid'
        
        # Nume
        if 'firstName' in data:
            if len(data['firstName'].strip()) < 2:
                errors['firstName'] = 'Prenumele trebuie să aibă minim 2 caractere'
        
        if 'lastName' in data:
            if len(data['lastName'].strip()) < 2:
                errors['lastName'] = 'Numele trebuie să aibă minim 2 caractere'
        
        # Țară
        if 'country' in data:
            if not data['country'].strip():
                errors['country'] = 'Țara este obligatorie'
        
        # Oraș
        if 'city' in data:
            if not data['city'].strip():
                errors['city'] = 'Orașul este obligatoriu'
        
        # Adresă
        if 'address' in data:
            if len(data['address'].strip()) < 5:
                errors['address'] = 'Adresa trebuie să aibă minim 5 caractere'
        
        if errors:
            return jsonify({
                'success': False,
                'errors': errors,
                'message': 'Validare eșuată'
            }), 400
        
        # TODO: Update în baza de date
        # user_id = get_current_user_id()
        # db.update_user(user_id, data)
        
        return jsonify({
            'success': True,
            'message': 'Profil actualizat cu succes',
            'data': data
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Eroare server: {str(e)}'
        }), 500

@profile_bp.route('/api/profile/upload-avatar', methods=['POST'])
def upload_avatar():
    """Upload și procesare imagine profil"""
    try:
        if 'avatar' not in request.files:
            return jsonify({
                'success': False,
                'message': 'Niciun fișier selectat'
            }), 400
        
        file = request.files['avatar']
        
        if file.filename == '':
            return jsonify({
                'success': False,
                'message': 'Niciun fișier selectat'
            }), 400
        
        # Verifică dimensiune
        file.seek(0, os.SEEK_END)
        file_size = file.tell()
        file.seek(0)
        
        if file_size > MAX_FILE_SIZE:
            return jsonify({
                'success': False,
                'message': 'Fișierul este prea mare (max 5MB)'
            }), 400
        
        if file and allowed_file(file.filename):
            # Generează nume unic
            ext = file.filename.rsplit('.', 1)[1].lower()
            filename = f"{uuid.uuid4()}.{ext}"
            filepath = os.path.join(UPLOAD_FOLDER, filename)
            
            # Salvează temporar
            file.save(filepath)
            
            # Procesează imaginea (resize + crop)
            try:
                img = Image.open(filepath)
                
                # Convertește la RGB dacă e necesar
                if img.mode in ('RGBA', 'LA', 'P'):
                    background = Image.new('RGB', img.size, (255, 255, 255))
                    if img.mode == 'P':
                        img = img.convert('RGBA')
                    background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                    img = background
                
                # Crop la pătrat (centrat)
                width, height = img.size
                size = min(width, height)
                left = (width - size) // 2
                top = (height - size) // 2
                img = img.crop((left, top, left + size, top + size))
                
                # Resize la 400x400
                img = img.resize((400, 400), Image.Resampling.LANCZOS)
                
                # Salvează optimizat
                img.save(filepath, quality=85, optimize=True)
                
                # TODO: Salvează în baza de date
                # user_id = get_current_user_id()
                # db.update_user_avatar(user_id, filename)
                
                return jsonify({
                    'success': True,
                    'message': 'Imagine încărcată cu succes',
                    'data': {
                        'avatar_url': f'/uploads/avatars/{filename}'
                    }
                })
                
            except Exception as e:
                # Șterge fișierul dacă procesarea eșuează
                if os.path.exists(filepath):
                    os.remove(filepath)
                raise e
        
        return jsonify({
            'success': False,
            'message': 'Tip fișier invalid. Folosește: PNG, JPG, GIF, WEBP'
        }), 400
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Eroare la încărcarea imaginii: {str(e)}'
        }), 500

@profile_bp.route('/api/profile/get', methods=['GET'])
def get_profile():
    """Obține datele profilului"""
    try:
        # TODO: Obține din baza de date
        # user_id = get_current_user_id()
        # user = db.get_user(user_id)
        
        # Mock data
        user = {
            'id': 1,
            'firstName': 'Ion',
            'lastName': 'Popescu',
            'email': 'ion@test.ro',
            'phone': '+40 721 234 567',
            'company': 'SC Test SRL',
            'country': 'România',
            'city': 'București',
            'address': 'Str. Exemplu nr. 123',
            'postalCode': '010101',
            'avatar_url': None,
            'language': 'ro',
            'created_at': '2024-01-01T00:00:00Z'
        }
        
        return jsonify({
            'success': True,
            'data': user
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Eroare server: {str(e)}'
        }), 500

@profile_bp.route('/api/profile/delete-avatar', methods=['DELETE'])
def delete_avatar():
    """Șterge imaginea de profil"""
    try:
        # TODO: Șterge din baza de date și filesystem
        # user_id = get_current_user_id()
        # avatar_path = db.get_user_avatar(user_id)
        # if avatar_path and os.path.exists(avatar_path):
        #     os.remove(avatar_path)
        # db.update_user_avatar(user_id, None)
        
        return jsonify({
            'success': True,
            'message': 'Imagine ștearsă cu succes'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Eroare server: {str(e)}'
        }), 500

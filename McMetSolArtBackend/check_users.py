#!/usr/bin/env python3
"""
Verifică utilizatorii din baza de date
"""

import sqlite3
from werkzeug.security import generate_password_hash

DATABASE = 'mc_metsolart.db'

def check_users():
    """Afișează toți utilizatorii din baza de date"""
    print("\n" + "="*60)
    print("  UTILIZATORI ÎN BAZA DE DATE")
    print("="*60 + "\n")
    
    try:
        conn = sqlite3.connect(DATABASE)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        users = cursor.execute('SELECT * FROM users').fetchall()
        
        if not users:
            print("❌ Nu există utilizatori în baza de date!")
            print("\n💡 Sugestie: Înregistrează-te pe site pentru a crea un utilizator.")
        else:
            print(f"✅ Găsiți {len(users)} utilizatori:\n")
            
            for user in users:
                print(f"📧 Email: {user['email']}")
                print(f"👤 Nume: {user['first_name']} {user['last_name']}")
                print(f"🆔 ID: {user['id']}")
                print(f"🔑 Role: {user['role']}")
                print(f"🎫 API Token: {user['api_token'] if user['api_token'] else 'LIPSĂ'}")
                print(f"📅 Creat: {user['created_at']}")
                print(f"🔐 Password Hash: {user['password_hash'][:50]}...")
                print("-" * 60)
        
        conn.close()
        
    except Exception as e:
        print(f"❌ Eroare: {str(e)}")

def reset_password(email, new_password):
    """Resetează parola pentru un utilizator"""
    print("\n" + "="*60)
    print("  RESETARE PAROLĂ")
    print("="*60 + "\n")
    
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        # Verifică dacă utilizatorul există
        user = cursor.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
        
        if not user:
            print(f"❌ Utilizatorul cu email {email} nu există!")
            conn.close()
            return False
        
        # Generează hash pentru noua parolă
        password_hash = generate_password_hash(new_password)
        
        # Actualizează parola
        cursor.execute('UPDATE users SET password_hash = ? WHERE email = ?', 
                      (password_hash, email))
        conn.commit()
        conn.close()
        
        print(f"✅ Parola pentru {email} a fost resetată cu succes!")
        print(f"🔑 Noua parolă: {new_password}")
        print(f"\n💡 Acum te poți autentifica cu:")
        print(f"   Email: {email}")
        print(f"   Parolă: {new_password}")
        
        return True
        
    except Exception as e:
        print(f"❌ Eroare: {str(e)}")
        return False

if __name__ == '__main__':
    import sys
    
    # Verifică utilizatorii
    check_users()
    
    # Dacă există argumente, resetează parola
    if len(sys.argv) >= 3:
        email = sys.argv[1]
        password = sys.argv[2]
        print("\n")
        reset_password(email, password)
    else:
        print("\n💡 Pentru a reseta parola, rulează:")
        print("   python check_users.py EMAIL PAROLA_NOUA")
        print("\n   Exemplu:")
        print("   python check_users.py barbucatalin999@yahoo.com password123")
    
    print("\n")

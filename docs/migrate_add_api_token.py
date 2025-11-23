#!/usr/bin/env python3
"""
Migrare: Adaugă coloana api_token în tabela users
Generează token-uri permanente pentru utilizatorii existenți
"""

import sqlite3
import uuid
from datetime import datetime

DATABASE = 'mc_metsolart.db'

def migrate():
    """Adaugă coloana api_token și generează token-uri pentru utilizatorii existenți"""
    print("\n" + "="*60)
    print("  MIGRARE: Adăugare API Token Permanent")
    print("="*60 + "\n")
    
    try:
        conn = sqlite3.connect(DATABASE)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        # Verifică dacă coloana există deja
        columns = cursor.execute("PRAGMA table_info(users)").fetchall()
        column_names = [col['name'] for col in columns]
        
        if 'api_token' in column_names:
            print("⚠️  Coloana 'api_token' există deja!")
            
            # Verifică câți utilizatori au token
            users_without_token = cursor.execute(
                "SELECT COUNT(*) as count FROM users WHERE api_token IS NULL"
            ).fetchone()
            
            if users_without_token['count'] > 0:
                print(f"📝 Găsiți {users_without_token['count']} utilizatori fără token")
                print("🔄 Generare token-uri pentru utilizatorii existenți...")
                
                # Generează token-uri pentru utilizatorii fără token
                users = cursor.execute("SELECT id, email FROM users WHERE api_token IS NULL").fetchall()
                
                for user in users:
                    api_token = str(uuid.uuid4())
                    cursor.execute(
                        "UPDATE users SET api_token = ? WHERE id = ?",
                        (api_token, user['id'])
                    )
                    print(f"  ✅ Token generat pentru {user['email']}: {api_token}")
                
                conn.commit()
                print(f"\n✅ Token-uri generate pentru {len(users)} utilizatori!")
            else:
                print("✅ Toți utilizatorii au deja token-uri!")
        else:
            print("📝 Adăugare coloană 'api_token' în tabela users...")
            
            # Adaugă coloana (fără UNIQUE, îl adăugăm după)
            cursor.execute("ALTER TABLE users ADD COLUMN api_token TEXT")
            print("✅ Coloană adăugată cu succes!")
            
            # Generează token-uri pentru utilizatorii existenți
            users = cursor.execute("SELECT id, email FROM users").fetchall()
            
            if users:
                print(f"\n🔄 Generare token-uri pentru {len(users)} utilizatori existenți...")
                
                for user in users:
                    api_token = str(uuid.uuid4())
                    cursor.execute(
                        "UPDATE users SET api_token = ? WHERE id = ?",
                        (api_token, user['id'])
                    )
                    print(f"  ✅ Token generat pentru {user['email']}: {api_token}")
                
                conn.commit()
                print(f"\n✅ Token-uri generate pentru {len(users)} utilizatori!")
            else:
                print("\nℹ️  Nu există utilizatori în baza de date")
        
        # Afișează statistici
        print("\n" + "="*60)
        print("  STATISTICI")
        print("="*60)
        
        total_users = cursor.execute("SELECT COUNT(*) as count FROM users").fetchone()['count']
        users_with_token = cursor.execute(
            "SELECT COUNT(*) as count FROM users WHERE api_token IS NOT NULL"
        ).fetchone()['count']
        
        print(f"📊 Total utilizatori: {total_users}")
        print(f"🔑 Utilizatori cu API token: {users_with_token}")
        print(f"✅ Migrare completă: {'DA' if total_users == users_with_token else 'NU'}")
        
        conn.close()
        
        print("\n✅ Migrare finalizată cu succes!")
        return True
        
    except Exception as e:
        print(f"\n❌ Eroare migrare: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == '__main__':
    migrate()

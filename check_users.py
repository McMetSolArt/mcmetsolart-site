import sqlite3

conn = sqlite3.connect('McMetSolArtBackend/mc_metsolart.db')
cursor = conn.cursor()

cursor.execute('SELECT email, first_name, last_name FROM users LIMIT 10')
rows = cursor.fetchall()

print(f'\n✅ Utilizatori în baza de date: {len(rows)}\n')

if rows:
    for row in rows:
        print(f'  📧 {row[0]} - {row[1]} {row[2]}')
else:
    print('  ⚠️ Nu există utilizatori. Creează un cont nou în aplicație!')

conn.close()

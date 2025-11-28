import sqlite3

conn = sqlite3.connect('mc_metsolart.db')
cursor = conn.cursor()

try:
    cursor.execute('ALTER TABLE orders ADD COLUMN country TEXT DEFAULT "Romania"')
    print('✅ Coloană country adăugată')
except:
    print('⚠️ Coloană country există deja')

try:
    cursor.execute('ALTER TABLE orders ADD COLUMN product_type TEXT DEFAULT "Cupola"')
    print('✅ Coloană product_type adăugată')
except:
    print('⚠️ Coloană product_type există deja')

conn.commit()
conn.close()
print('✅ Migrare completă!')

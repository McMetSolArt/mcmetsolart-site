# ⚡ Comenzi Rapide - Admin Panel

## 🚀 Pornire Sistem

### 1. Pornește Backend
```bash
cd McMetSolArtBackend
python app.py
```
**Verificare:** Vezi `✅ Backend pornit pe http://localhost:3000`

### 2. Pornește Frontend
```bash
python server_static.py
```
**Verificare:** Vezi `🚀 Server Frontend pornit pe: http://localhost:4000`

### 3. Deschide Admin Panel
```
http://localhost:4000/admin-private/admin-professional.html
```
**Parolă:** `admin123`

---

## 🔍 Verificări Rapide

### Verifică Backend
```bash
curl http://localhost:3000/api/health
```
**Rezultat așteptat:** `{"status": "healthy"}`

### Verifică Clienți
```bash
curl http://localhost:3000/api/users
```
**Rezultat așteptat:** Lista cu 5 clienți

### Verifică Comenzi
```bash
curl http://localhost:3000/api/admin/orders/advanced
```
**Rezultat așteptat:** Lista cu comenzi

---

## 🗄️ Baza de Date

### Vezi Toți Clienții
```bash
python -c "import sqlite3; conn = sqlite3.connect('McMetSolArtBackend/mc_metsolart.db'); cursor = conn.cursor(); users = cursor.execute('SELECT id, first_name, last_name, email FROM users').fetchall(); [print(f'{u[0]}. {u[1]} {u[2]} - {u[3]}') for u in users]; conn.close()"
```

### Vezi Toate Comenzile
```bash
python -c "import sqlite3; conn = sqlite3.connect('McMetSolArtBackend/mc_metsolart.db'); cursor = conn.cursor(); orders = cursor.execute('SELECT id, order_number, user_id, status, total_amount, currency FROM orders').fetchall(); [print(f'{o[0]}. {o[1]} - User {o[2]} - {o[3]} - {o[4]} {o[5]}') for o in orders]; conn.close()"
```

### Vezi Comenzile unui Client
```bash
# Înlocuiește USER_ID cu ID-ul clientului
python -c "import sqlite3; conn = sqlite3.connect('McMetSolArtBackend/mc_metsolart.db'); cursor = conn.cursor(); orders = cursor.execute('SELECT order_number, status, total_amount, currency FROM orders WHERE user_id = 1').fetchall(); [print(f'{o[0]} - {o[1]} - {o[2]} {o[3]}') for o in orders]; conn.close()"
```

---

## 🧹 Curățare & Reset

### Clear Cache Admin Panel
```
http://localhost:4000/admin-private/clear-cache-admin.html
```
Apasă butonul "Șterge Cache & Reîncarcă"

### Clear Cache Site Principal
```
http://localhost:4000/clear-cache-account.html
```

### Restart Backend
```bash
# În terminalul backend-ului
Ctrl + C  # Oprește
python app.py  # Pornește din nou
```

### Reset Bază de Date (ATENȚIE!)
```bash
cd McMetSolArtBackend
rm mc_metsolart.db
python app.py  # Va crea bază nouă goală
```

---

## 👥 Conturi de Test

### Admin
- **URL:** `http://localhost:4000/admin-private/admin-professional.html`
- **Parolă:** `admin123`

### Clienți
1. **test@test.com** / `test123`
2. **john@example.com** / `pass123`
3. **maria@example.com** / `pass123`
4. **alex@example.com** / `pass123`

---

## 🔧 Troubleshooting Rapid

### Problema: Admin Panel nu se încarcă
```bash
# 1. Verifică frontend
curl http://localhost:4000

# 2. Restart frontend
Ctrl + C
python server_static.py
```

### Problema: Comenzile nu apar
```bash
# 1. Verifică backend
curl http://localhost:3000/api/admin/orders/advanced

# 2. Restart backend
cd McMetSolArtBackend
Ctrl + C
python app.py

# 3. Clear cache
http://localhost:4000/admin-private/clear-cache-admin.html
```

### Problema: Eroare 500
```bash
# Vezi logurile backend-ului în terminal
# Caută linia cu "❌ Eroare"
# Restart backend
```

---

## 📊 Testare Sincronizare

### Test Complet în 5 Pași

```bash
# 1. Creează comandă în Admin Panel
# - Deschide Admin Panel
# - Clienți → Test User → Comandă Nouă
# - Completează și salvează

# 2. Verifică în baza de date
python -c "import sqlite3; conn = sqlite3.connect('McMetSolArtBackend/mc_metsolart.db'); cursor = conn.cursor(); orders = cursor.execute('SELECT order_number, user_id FROM orders ORDER BY id DESC LIMIT 1').fetchone(); print(f'Ultimă comandă: {orders[0]} pentru user_id={orders[1]}'); conn.close()"

# 3. Deschide site-ul
# http://localhost:4000

# 4. Login cu test@test.com / test123

# 5. Verifică "Comenzile Mele"
# Ar trebui să vezi comanda creată!
```

---

## 🎯 Comenzi Utile

### Pornire Rapidă (Un Singur Command)
```bash
# Terminal 1
cd McMetSolArtBackend && python app.py

# Terminal 2
python server_static.py
```

### Verificare Completă
```bash
# Verifică tot sistemul
curl http://localhost:3000/api/health && curl http://localhost:4000 && echo "✅ Totul funcționează!"
```

### Backup Bază de Date
```bash
cp McMetSolArtBackend/mc_metsolart.db McMetSolArtBackend/mc_metsolart_backup_$(date +%Y%m%d_%H%M%S).db
```

### Restore Bază de Date
```bash
# Înlocuiește TIMESTAMP cu data backup-ului
cp McMetSolArtBackend/mc_metsolart_backup_TIMESTAMP.db McMetSolArtBackend/mc_metsolart.db
```

---

**Tip:** Salvează acest fișier în bookmark-uri pentru acces rapid! 🔖

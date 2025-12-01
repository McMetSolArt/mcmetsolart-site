# 📁 Fișiere Importante - Admin Panel

## 🎯 Fișiere Esențiale (NU ȘTERGE!)

### Backend - McMetSolArtBackend/

```
📂 McMetSolArtBackend/
│
├── 🔴 app.py                          # PRINCIPAL - Backend Flask
│   ├── Endpoint: /api/user/orders    # Comenzi client
│   ├── Endpoint: /api/auth/login     # Autentificare
│   └── Endpoint: /api/auth/register  # Înregistrare
│
├── 🔴 admin_api_extended.py          # API-uri Admin
│   ├── /api/stats                    # Statistici
│   ├── /api/users                    # Lista clienți
│   └── /api/orders (POST)            # Creează comandă
│
├── 🔴 admin_api_advanced.py          # API-uri Avansate Admin
│   ├── /api/admin/order/{id}/confirm # Confirmă comandă
│   ├── /api/admin/order/{id}/status  # Schimbă status
│   ├── /api/admin/order/{id}/payment # Actualizează plată
│   └── /api/admin/order/{id}/details # Detalii comandă
│
├── 🔴 mc_metsolart.db                # BAZA DE DATE
│   └── Conține: users, orders, order_items
│
├── orders_sync_api.py                # Sincronizare comenzi
├── profile_api.py                    # API profil utilizator
├── email_service.py                  # Serviciu email
└── translations.py                   # Traduceri
```

### Frontend Admin - admin-private/

```
📂 admin-private/
│
├── 🔴 admin-professional.html        # INTERFAȚĂ ADMIN
│   └── Panoul principal de administrare
│
├── 📂 js/
│   └── 🔴 admin-final.js             # LOGICĂ ADMIN
│       ├── loadClients()             # Încarcă clienți
│       ├── loadOrders()              # Încarcă comenzi
│       ├── createOrderForClient()    # Creează comandă
│       ├── confirmOrder()            # Confirmă comandă
│       ├── showPaymentModal()        # Modal plată
│       └── showStatusModal()         # Modal status
│
├── 📂 css/
│   └── admin-final.css               # Stiluri admin
│
└── clear-cache-admin.html            # Curățare cache
```

### Frontend Client - /

```
📂 / (Root)
│
├── 🔴 index.html                     # SITE PRINCIPAL
│   └── Conține tot site-ul + cont client
│
├── 📂 js/
│   ├── 🔴 account-panel-redesign.js  # PANOU CONT CLIENT
│   │   ├── loadOrders()              # Încarcă comenzi client
│   │   ├── showOrderDetails()        # Detalii comandă
│   │   └── updateProfile()           # Actualizează profil
│   │
│   ├── auth-professional.js          # Autentificare
│   ├── session-manager.js            # Gestionare sesiuni
│   └── script.js                     # Funcții generale
│
├── 📂 css/
│   ├── styles.css                    # Stiluri principale
│   └── account-panel-redesign.css    # Stiluri cont
│
└── server_static.py                  # Server frontend
```

---

## 🔗 Conexiuni între Fișiere

### Flux Creare Comandă

```
1. ADMIN PANEL
   admin-professional.html
   ↓ (user click "Comandă Nouă")
   admin-final.js → createOrderForClient()
   ↓ (POST request)
   
2. BACKEND
   admin_api_extended.py → /api/orders
   ↓ (salvează în DB)
   mc_metsolart.db → orders table
   ↓
   
3. CLIENT PANEL
   index.html → Cont → Comenzile Mele
   ↓ (GET request)
   account-panel-redesign.js → loadOrders()
   ↓ (fetch cu token)
   app.py → /api/user/orders
   ↓ (citește din DB)
   mc_metsolart.db → orders table
   ↓ (returnează comenzi)
   ✅ Client vede comanda!
```

### Flux Actualizare Status

```
1. ADMIN PANEL
   admin-final.js → showStatusModal()
   ↓ (user selectează status)
   saveStatus() → POST /api/admin/order/{id}/status
   ↓
   
2. BACKEND
   admin_api_advanced.py → update_order_status()
   ↓ (UPDATE în DB)
   mc_metsolart.db → orders.status
   ↓
   
3. CLIENT PANEL
   account-panel-redesign.js → loadOrders()
   ↓ (refresh)
   ✅ Client vede status actualizat!
```

---

## 📊 Structura Bază de Date

### Tabele Principale

```sql
-- Utilizatori
users (
    id INTEGER PRIMARY KEY,
    email TEXT UNIQUE,
    password_hash TEXT,
    first_name TEXT,
    last_name TEXT,
    phone TEXT,
    api_token TEXT UNIQUE,  -- Token permanent pentru autentificare
    created_at TEXT
)

-- Comenzi
orders (
    id INTEGER PRIMARY KEY,
    order_number TEXT UNIQUE,  -- MC01-001, LOGO-001, etc.
    user_id INTEGER,           -- Link către users.id
    status TEXT,               -- in_asteptare, confirmata, etc.
    total_amount REAL,
    currency TEXT,             -- RON, EUR, USD, UAH
    country TEXT,
    product_type TEXT,
    quantity INTEGER,
    payment_percentage INTEGER, -- 0, 25, 50, 75, 100
    payment_amount_paid REAL,
    payment_remaining REAL,
    confirmed_by_admin INTEGER,
    created_at TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
)

-- Produse comandă
order_items (
    id INTEGER PRIMARY KEY,
    order_id INTEGER,          -- Link către orders.id
    product_name TEXT,
    quantity INTEGER,
    price REAL,
    subtotal REAL,
    FOREIGN KEY (order_id) REFERENCES orders(id)
)
```

---

## 🔑 Variabile Importante

### Backend (app.py)

```python
# Configurare
DATABASE = 'mc_metsolart.db'
HOST = '0.0.0.0'
PORT = 3000

# Funcții cheie
@token_required              # Decorator pentru autentificare
get_db()                     # Conexiune bază de date
init_db()                    # Inițializare bază de date
```

### Frontend Admin (admin-final.js)

```javascript
// Configurare
const API_URL = 'http://localhost:3000';
const ADMIN_PASSWORD = 'admin123';

// Variabile globale
let allOrders = [];          // Toate comenzile
let allClients = [];         // Toți clienții
let currentFilter = 'all';   // Filtru curent

// Funcții cheie
loadAllData()                // Încarcă tot
loadStats()                  // Încarcă statistici
loadOrders()                 // Încarcă comenzi
loadClients()                // Încarcă clienți
```

### Frontend Client (account-panel-redesign.js)

```javascript
// Configurare
window.API_BASE_URL = 'http://localhost:5000';

// Funcții cheie
loadOrders()                 // Încarcă comenzile clientului
showOrderDetails()           // Afișează detalii comandă
updateProfile()              // Actualizează profil
```

---

## ⚠️ Fișiere de NU Modificat

### 🔴 CRITIC - Nu modifica fără backup!

1. **mc_metsolart.db** - Baza de date
   - Conține toate datele
   - Fă backup înainte de orice modificare

2. **app.py** - Backend principal
   - Conține toate endpoint-urile
   - Modificări greșite = sistem nefuncțional

3. **admin-final.js** - Logică admin
   - Conține toate funcțiile admin
   - Modificări greșite = admin panel nefuncțional

4. **account-panel-redesign.js** - Logică cont client
   - Conține funcțiile contului
   - Modificări greșite = clienții nu văd comenzi

### ✅ OK de Modificat

1. **CSS files** - Stiluri
   - Poți schimba culori, fonturi, layout
   - Nu afectează funcționalitatea

2. **HTML files** - Structură
   - Poți schimba texte, layout
   - Atenție la ID-uri și clase folosite în JS

3. **translations.py** - Traduceri
   - Poți adăuga/modifica traduceri
   - Nu afectează logica

---

## 🔄 Dependențe între Fișiere

### Admin Panel depinde de:

```
admin-professional.html
├── admin-final.js (OBLIGATORIU)
├── admin-final.css (OBLIGATORIU)
└── Backend:
    ├── /api/stats
    ├── /api/users
    ├── /api/orders
    ├── /api/admin/orders/advanced
    └── /api/admin/order/{id}/*
```

### Cont Client depinde de:

```
index.html
├── account-panel-redesign.js (OBLIGATORIU)
├── account-panel-redesign.css (OBLIGATORIU)
├── auth-professional.js (OBLIGATORIU)
├── session-manager.js (OBLIGATORIU)
└── Backend:
    ├── /api/auth/login
    ├── /api/auth/register
    ├── /api/user/orders
    └── /api/user/profile
```

### Backend depinde de:

```
app.py
├── admin_api_extended.py (OBLIGATORIU)
├── admin_api_advanced.py (OBLIGATORIU)
├── orders_sync_api.py
├── profile_api.py
├── email_service.py
├── translations.py
└── mc_metsolart.db (OBLIGATORIU)
```

---

## 📝 Notițe Importante

### 1. Token-uri
- Fiecare client are un token permanent în `users.api_token`
- Token-ul este salvat în `localStorage.authToken`
- Backend verifică token-ul cu `@token_required`

### 2. Sincronizare
- Admin și Client folosesc aceeași bază de date
- Comenzile sunt legate de `user_id`
- Nu există delay - sincronizare instant

### 3. Statusuri Comenzi
```
in_asteptare → confirmata → in_procesare → 
in_productie → finalizata → expediata → 
in_tranzit → livrata
```

### 4. Plăți
```
0% → 25% → 50% → 75% → 100%
```

---

**Tip:** Salvează acest fișier pentru referință rapidă! 📌

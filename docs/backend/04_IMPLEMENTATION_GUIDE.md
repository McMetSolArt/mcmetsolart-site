# 🚀 GHID IMPLEMENTARE BACKEND
## MC MetSolArt - Implementation & Security Guide

---

## 📧 CONFIGURARE EMAIL SERVICE

### Opțiune 1: SendGrid (Recomandat)
```env
MAIL_MAILER=sendgrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
MAIL_FROM_ADDRESS=noreply@mcmetsolart.com
MAIL_FROM_NAME="MC MetSolArt"
```

### Opțiune 2: SMTP Propriu
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=mc_metsolart@yahoo.com
MAIL_PASSWORD=[PAROLA_APP]
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=mc_metsolart@yahoo.com
MAIL_FROM_NAME="MC MetSolArt"
```

### Template-uri Email Necesare

**1. Welcome Email (Înregistrare)**
```html
Bun venit la MC MetSolArt, {{first_name}}!

Contul tău a fost creat cu succes.
Email: {{email}}

Începe să explorezi produsele noastre!
[Buton: Vezi Produse]
```

**2. Reset Password**
```html
Salut {{first_name}},

Ai solicitat resetarea parolei.
Click pe link-ul de mai jos (valabil 1 oră):
{{reset_link}}

Dacă nu ai solicitat, ignoră acest email.
```

**3. Order Confirmation**
```html
Comandă confirmată #{{order_number}}

Mulțumim pentru comandă!
Total: {{total}} RON

Produse:
{{#items}}
- {{name}} x {{quantity}} = {{price}} RON
{{/items}}

Status: {{status}}
```

---

## 🔐 SECURITATE - IMPLEMENTARE

### 1. Criptare Parole
```php
// PHP - bcrypt
$hashedPassword = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
$isValid = password_verify($inputPassword, $hashedPassword);
```

```javascript
// Node.js - bcrypt
const bcrypt = require('bcrypt');
const hashedPassword = await bcrypt.hash(password, 12);
const isValid = await bcrypt.compare(inputPassword, hashedPassword);
```

### 2. JWT Tokens
```javascript
// Generare token
const jwt = require('jsonwebtoken');
const token = jwt.sign(
  { userId: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);

// Verificare token
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

### 3. Validare Input
```javascript
// Exemplu validare înregistrare
const registerSchema = {
  email: 'required|email|unique:users',
  password: 'required|min:8|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/',
  first_name: 'required|string|max:100',
  last_name: 'required|string|max:100',
  phone: 'nullable|regex:/^\\+?[0-9]{10,15}$/'
};
```

### 4. Rate Limiting
```javascript
// Express.js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute
  max: 100, // max 100 requests per IP
  message: 'Prea multe cereri, încercați mai târziu'
});

app.use('/api/', limiter);
```

### 5. CORS Configuration
```javascript
const cors = require('cors');

app.use(cors({
  origin: 'https://mcmetsolart.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

---

## 🗄️ CONFIGURARE BAZĂ DE DATE

### .env Configuration
```env
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=mc_metsolart
DB_USERNAME=mc_app
DB_PASSWORD=[PAROLA_PUTERNICA]

# Backup
DB_BACKUP_USER=mc_backup
DB_BACKUP_PASSWORD=[PAROLA_PUTERNICA]
```

### Migrații Bază de Date
```bash
# Creare bază de date
mysql -u root -p -e "CREATE DATABASE mc_metsolart CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Rulare migrații
php artisan migrate
# sau
npm run migrate
```

---

## 👨‍💼 PANEL ADMINISTRARE

### Dashboard Statistici
```
/admin/dashboard
- Total utilizatori
- Comenzi noi (astăzi)
- Mesaje suport nerezolvate
- Vânzări luna curentă
- Grafic comenzi (ultimele 30 zile)
```

### Gestionare Utilizatori
```
/admin/users
- Listă utilizatori (tabel paginat)
- Căutare după email/nume
- Filtrare după rol/status
- Acțiuni: Vezi detalii, Editează, Dezactivează
```

### Gestionare Comenzi
```
/admin/orders
- Listă comenzi (tabel paginat)
- Filtrare după status/dată
- Update status comandă
- Export comenzi (CSV/Excel)
```

### Mesaje Suport
```
/admin/support
- Listă mesaje (inbox style)
- Filtrare după status
- Răspuns direct din panel
- Marcare ca rezolvat
```

---

## 🔄 INTEGRARE FRONTEND-BACKEND

### JavaScript API Client
```javascript
// api-client.js
class APIClient {
  constructor() {
    this.baseURL = 'https://api.mcmetsolart.com/v1';
    this.token = localStorage.getItem('authToken');
  }

  async request(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Language': localStorage.getItem('language') || 'ro',
      ...options.headers
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API Error');
    }

    return data;
  }

  // Auth
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    this.token = data.data.token;
    localStorage.setItem('authToken', this.token);
    return data;
  }

  // User
  async getProfile() {
    return this.request('/user/profile');
  }

  async updateProfile(profileData) {
    return this.request('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  }

  // Orders
  async getOrders() {
    return this.request('/user/orders');
  }

  // Support
  async sendSupportMessage(messageData) {
    return this.request('/support/message', {
      method: 'POST',
      body: JSON.stringify(messageData)
    });
  }
}

// Export
window.API = new APIClient();
```

### Utilizare în Frontend
```javascript
// Login
const result = await window.API.login('user@example.com', 'password');
localStorage.setItem('currentUser', JSON.stringify(result.data.user));

// Update Profile
const updated = await window.API.updateProfile({
  first_name: 'Ion',
  last_name: 'Popescu',
  phone: '+40123456789'
});

// Get Orders
const orders = await window.API.getOrders();
```

---

## 🚀 DEPLOYMENT

### Server Requirements
- **OS:** Ubuntu 22.04 LTS
- **Web Server:** Nginx 1.18+
- **PHP:** 8.1+ (cu extensions: mbstring, xml, pdo, mysql)
- **Node.js:** 18+ (dacă backend în Node)
- **MySQL:** 8.0+
- **SSL:** Let's Encrypt
- **RAM:** Minim 2GB
- **Storage:** Minim 20GB SSD

### Nginx Configuration
```nginx
server {
    listen 443 ssl http2;
    server_name api.mcmetsolart.com;

    ssl_certificate /etc/letsencrypt/live/api.mcmetsolart.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.mcmetsolart.com/privkey.pem;

    root /var/www/mc-backend/public;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \\.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
}
```

---

## ✅ CHECKLIST FINAL

### Pre-Launch
- [ ] Toate endpoint-urile API testate
- [ ] Validări input implementate
- [ ] Criptare parole funcțională
- [ ] JWT tokens configurate
- [ ] Email service funcțional
- [ ] Bază de date optimizată
- [ ] SSL certificate instalat
- [ ] Rate limiting activ
- [ ] CORS configurat corect
- [ ] Backup automat configurat

### Post-Launch
- [ ] Monitorizare server (Uptime)
- [ ] Log-uri erori (Sentry/Bugsnag)
- [ ] Analytics API (requests/min)
- [ ] Backup verificat (restore test)
- [ ] Training echipa MC
- [ ] Documentație actualizată

---

## 📞 SUPORT TEHNIC

**Pentru întrebări tehnice:**
- Email: mc_metsolart@yahoo.com
- Documentație: docs/backend/

**Timeline Estimat:** 4-6 săptămâni
**Buget Estimat:** 3000-5000 EUR (variază în funcție de dezvoltator)

---

✅ **GATA PENTRU IMPLEMENTARE!**

# 🚀 MC MetSolArt - Deployment Guide

## 📦 Ce am pregătit pentru deployment

### ✅ Fișiere create/actualizate:

1. **`js/api-config-production.js`** - Configurare automată API pentru producție
2. **`McMetSolArtBackend/deploy-guide.md`** - Ghid complet de deployment
3. **`test-api-connection.html`** - Pagină de testare conexiune API
4. **`McMetSolArtBackend/start-backend.bat`** - Script Windows pentru pornire backend
5. **`McMetSolArtBackend/start-backend.sh`** - Script Linux/Mac pentru pornire backend
6. **`index.html`** - Actualizat cu includerea configurației de producție

## 🎯 Cum funcționează

### Detectare automată mediu

Sistemul detectează automat dacă rulează local sau pe server:

- **Local (Development)**: `http://localhost:5000/api`
- **Production**: `${location.protocol}//${location.host}/api`

### Structura comunicării

```
Frontend (Browser)
    ↓
js/config.js (configurare de bază)
    ↓
js/api-config-production.js (detectare mediu)
    ↓
js/api-client.js (client API)
    ↓
Backend Flask (Python)
    ↓
SQLite Database
```

## 🧪 Testare Locală

### 1. Pornește Backend-ul

**Windows:**
```cmd
cd McMetSolArtBackend
start-backend.bat
```

**Linux/Mac:**
```bash
cd McMetSolArtBackend
chmod +x start-backend.sh
./start-backend.sh
```

**Manual:**
```bash
cd McMetSolArtBackend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### 2. Deschide Frontend-ul

Opțiune A - Folosind backend-ul (recomandat):
```
http://localhost:5000
```

Opțiune B - Folosind Live Server (VSCode):
```
http://localhost:5500
```

### 3. Testează Conexiunea

Deschide în browser:
```
http://localhost:5500/test-api-connection.html
```

Sau din consolă:
```bash
curl http://localhost:5000/api/health
```

## 🌐 Deployment pe Server

### Opțiunea 1: Server Propriu (VPS/Dedicated)

Vezi ghidul complet: `McMetSolArtBackend/deploy-guide.md`

**Pași rapizi:**

1. **Instalare dependențe:**
```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv nginx -y
```

2. **Configurare aplicație:**
```bash
cd /var/www/mcmetsolart
python3 -m venv venv
source venv/bin/activate
pip install -r McMetSolArtBackend/requirements.txt
```

3. **Configurare Nginx:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /var/www/mcmetsolart;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

4. **SSL (HTTPS):**
```bash
sudo certbot --nginx -d your-domain.com
```

### Opțiunea 2: Render.com (Simplu și Gratuit)

1. Creează cont pe [render.com](https://render.com)
2. Conectează repository-ul GitHub
3. Creează Web Service:
   - **Build Command**: `cd McMetSolArtBackend && pip install -r requirements.txt`
   - **Start Command**: `cd McMetSolArtBackend && gunicorn --bind 0.0.0.0:$PORT app:app`
4. Adaugă variabile de mediu:
   - `FLASK_DEBUG=False`
   - `DATABASE=mc_metsolart.db`
   - `EMAIL_ENABLED=True`

### Opțiunea 3: Heroku

```bash
# Creează Procfile în root
echo "web: cd McMetSolArtBackend && gunicorn app:app" > Procfile

# Deploy
heroku login
heroku create mcmetsolart
git push heroku main
```

## 🔧 Configurare Email

Pentru ca emailurile să funcționeze, editează `.env`:

```env
EMAIL_ENABLED=True
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=mc_metsolart@yahoo.com
SMTP_PASSWORD=your_app_password_here
SMTP_USE_TLS=True
```

**Obținere App Password Yahoo:**
1. Mergi la [Yahoo Account Security](https://login.yahoo.com/account/security)
2. Activează "Two-step verification"
3. Generează "App password"
4. Folosește parola generată în `.env`

## 📊 Verificare Deployment

### Checklist:

- [ ] Backend pornește fără erori
- [ ] Frontend se încarcă corect
- [ ] API health check funcționează: `/api/health`
- [ ] Înregistrare utilizator funcționează
- [ ] Login funcționează
- [ ] Comenzi se salvează în baza de date
- [ ] Emailuri se trimit corect
- [ ] SSL activat (HTTPS)

### Teste:

```bash
# Health check
curl https://your-domain.com/api/health

# Register test
curl -X POST https://your-domain.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123","first_name":"Test","last_name":"User"}'

# Login test
curl -X POST https://your-domain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

## 🐛 Troubleshooting

### Backend nu pornește

```bash
# Verifică logs
python app.py

# Verifică dependențe
pip install -r requirements.txt

# Verifică port
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # Linux/Mac
```

### Frontend nu se conectează la API

1. Verifică URL-ul API în consolă browser (F12)
2. Verifică CORS în `app.py`
3. Verifică firewall/antivirus
4. Testează cu `test-api-connection.html`

### Erori de autentificare

```bash
# Verifică token în localStorage
localStorage.getItem('authToken')

# Șterge token invalid
localStorage.removeItem('authToken')
localStorage.removeItem('currentUser')
```

### Baza de date locked

```bash
# Oprește backend
# Șterge fișierul lock
rm mc_metsolart.db-journal

# Repornește backend
python app.py
```

## 📁 Structura Finală

```
McMetSolArt/
├── index.html                          # Frontend principal
├── test-api-connection.html            # Pagină de testare
├── DEPLOYMENT-README.md                # Acest fișier
├── css/                                # Stiluri
├── js/
│   ├── config.js                       # Configurare de bază
│   ├── api-config-production.js        # Config producție (NOU)
│   ├── api-client.js                   # Client API
│   └── ...                             # Alte scripturi
├── images/                             # Imagini
└── McMetSolArtBackend/
    ├── app.py                          # Backend Flask
    ├── requirements.txt                # Dependențe Python
    ├── .env                            # Configurare (NU include în Git!)
    ├── .env.example                    # Template configurare
    ├── deploy-guide.md                 # Ghid detaliat deployment
    ├── start-backend.bat               # Script Windows (NOU)
    ├── start-backend.sh                # Script Linux/Mac (NOU)
    └── mc_metsolart.db                 # Baza de date SQLite
```

## 🔒 Securitate

### Înainte de deployment:

1. **Schimbă SECRET_KEY** în `app.py`
2. **Creează .env** cu date reale (nu include în Git!)
3. **Activează HTTPS** (SSL certificate)
4. **Configurează firewall**
5. **Activează backup-uri automate**

### .gitignore

Asigură-te că ai:
```
.env
*.db
*.db-journal
__pycache__/
venv/
*.pyc
```

## 📞 Suport

- **Email**: mc_metsolart@yahoo.com
- **Documentație**: `McMetSolArtBackend/deploy-guide.md`
- **Test API**: `test-api-connection.html`

## 🎉 Gata de Deployment!

Site-ul tău este acum pregătit pentru deployment pe server. Toate fișierele de configurare sunt create și sistemul detectează automat mediul (development/production).

**Next Steps:**
1. Testează local cu `test-api-connection.html`
2. Alege platforma de deployment (VPS, Render, Heroku)
3. Urmează pașii din `deploy-guide.md`
4. Configurează emailurile în `.env`
5. Activează SSL pentru HTTPS
6. Enjoy! 🚀

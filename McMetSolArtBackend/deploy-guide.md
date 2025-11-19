# 🚀 Ghid Deployment MC MetSolArt

## 📋 Pregătire pentru Deployment

### 1. Structura Proiectului

```
McMetSolArt/
├── McMetSolArtBackend/          # Backend Flask
│   ├── app.py                   # Aplicația principală
│   ├── requirements.txt         # Dependențe Python
│   ├── .env                     # Configurare (NU include în Git!)
│   └── mc_metsolart.db         # Baza de date SQLite
├── index.html                   # Frontend
├── css/                         # Stiluri
├── js/                          # JavaScript
│   ├── config.js               # Configurare API
│   ├── api-client.js           # Client API
│   └── api-config-production.js # Config producție
└── images/                      # Imagini
```

### 2. Configurare Backend

#### A. Fișier `.env` (Creează în `McMetSolArtBackend/`)

```env
# Flask Configuration
FLASK_DEBUG=False
HOST=0.0.0.0
PORT=5000

# Database
DATABASE=mc_metsolart.db

# Email Configuration
EMAIL_ENABLED=True
ADMIN_EMAIL=mc_metsolart@yahoo.com

# SMTP Settings (pentru trimitere emailuri)
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=mc_metsolart@yahoo.com
SMTP_PASSWORD=your_app_password_here
SMTP_USE_TLS=True
```

#### B. Verifică `requirements.txt`

```txt
Flask==3.0.0
Flask-CORS==4.0.0
Flask-JWT-Extended==4.6.0
Werkzeug==3.0.1
python-dotenv>=1.0
requests>=2.0
gunicorn>=20.0
waitress>=2.0
```

### 3. Configurare Frontend

#### A. Actualizează `index.html`

Adaugă înainte de `</head>`:

```html
<!-- API Configuration -->
<script src="js/config.js"></script>
<script src="js/api-config-production.js"></script>
```

#### B. Verifică `js/config.js`

Fișierul detectează automat mediul:
- **Local**: `http://localhost:5000/api`
- **Production**: `${location.protocol}//${location.host}/api`

## 🖥️ Deployment pe Server

### Opțiunea 1: Server Linux (VPS/Dedicated)

#### 1. Instalare Dependențe

```bash
# Update sistem
sudo apt update && sudo apt upgrade -y

# Instalare Python și pip
sudo apt install python3 python3-pip python3-venv -y

# Instalare Nginx (pentru reverse proxy)
sudo apt install nginx -y
```

#### 2. Configurare Aplicație

```bash
# Creează director pentru aplicație
sudo mkdir -p /var/www/mcmetsolart
cd /var/www/mcmetsolart

# Copiază fișierele (folosește SCP, FTP sau Git)
# Exemplu cu Git:
git clone https://github.com/your-repo/mcmetsolart.git .

# Creează virtual environment
cd McMetSolArtBackend
python3 -m venv venv
source venv/bin/activate

# Instalează dependențe
pip install -r requirements.txt

# Creează fișierul .env
nano .env
# (Adaugă configurația de mai sus)

# Inițializează baza de date
python3 app.py
# (Oprește după ce vezi "Baza de date inițializată")
```

#### 3. Configurare Gunicorn (Production Server)

```bash
# Creează fișier de serviciu
sudo nano /etc/systemd/system/mcmetsolart.service
```

Conținut:

```ini
[Unit]
Description=MC MetSolArt Backend
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/mcmetsolart/McMetSolArtBackend
Environment="PATH=/var/www/mcmetsolart/McMetSolArtBackend/venv/bin"
ExecStart=/var/www/mcmetsolart/McMetSolArtBackend/venv/bin/gunicorn --workers 4 --bind 0.0.0.0:5000 app:app

[Install]
WantedBy=multi-user.target
```

```bash
# Activează serviciul
sudo systemctl daemon-reload
sudo systemctl start mcmetsolart
sudo systemctl enable mcmetsolart
sudo systemctl status mcmetsolart
```

#### 4. Configurare Nginx

```bash
sudo nano /etc/nginx/sites-available/mcmetsolart
```

Conținut:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Frontend static files
    root /var/www/mcmetsolart;
    index index.html;

    # Servește fișierele statice direct
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy pentru API
    location /api {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Cache pentru fișiere statice
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
# Activează site-ul
sudo ln -s /etc/nginx/sites-available/mcmetsolart /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 5. SSL Certificate (HTTPS)

```bash
# Instalare Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obține certificat SSL
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal
sudo systemctl status certbot.timer
```

### Opțiunea 2: Render.com (Simplu și Gratuit)

#### 1. Pregătire Repository

Creează `render.yaml` în root:

```yaml
services:
  - type: web
    name: mcmetsolart
    env: python
    buildCommand: "cd McMetSolArtBackend && pip install -r requirements.txt"
    startCommand: "cd McMetSolArtBackend && gunicorn --bind 0.0.0.0:$PORT app:app"
    envVars:
      - key: FLASK_DEBUG
        value: False
      - key: DATABASE
        value: mc_metsolart.db
      - key: EMAIL_ENABLED
        value: True
```

#### 2. Deploy pe Render

1. Creează cont pe [render.com](https://render.com)
2. Conectează repository-ul GitHub
3. Selectează `render.yaml`
4. Adaugă variabilele de mediu în dashboard
5. Deploy automat!

### Opțiunea 3: Heroku

```bash
# Creează Procfile în root
echo "web: cd McMetSolArtBackend && gunicorn app:app" > Procfile

# Deploy
heroku login
heroku create mcmetsolart
git push heroku main
```

### Opțiunea 4: Docker

Creează `Dockerfile` în `McMetSolArtBackend/`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "4", "app:app"]
```

```bash
# Build și run
docker build -t mcmetsolart .
docker run -p 5000:5000 mcmetsolart
```

## 🧪 Testare

### 1. Test Local

```bash
# Pornește backend
cd McMetSolArtBackend
python app.py

# Deschide browser
http://localhost:5000
```

### 2. Test API

```bash
# Health check
curl http://localhost:5000/api/health

# Test register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123","first_name":"Test","last_name":"User"}'
```

### 3. Test Production

```bash
# Health check
curl https://your-domain.com/api/health

# Verifică frontend
curl https://your-domain.com
```

## 📊 Monitorizare

### Logs Backend

```bash
# Systemd logs
sudo journalctl -u mcmetsolart -f

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Database Backup

```bash
# Backup automat
crontab -e

# Adaugă:
0 2 * * * cp /var/www/mcmetsolart/McMetSolArtBackend/mc_metsolart.db /var/backups/mcmetsolart_$(date +\%Y\%m\%d).db
```

## 🔒 Securitate

### 1. Firewall

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 2. Fail2Ban

```bash
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
```

### 3. Actualizări

```bash
# Actualizări automate
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

## 📝 Checklist Final

- [ ] Backend pornește fără erori
- [ ] Frontend se încarcă corect
- [ ] API health check funcționează
- [ ] Înregistrare utilizator funcționează
- [ ] Login funcționează
- [ ] Comenzi se salvează în baza de date
- [ ] Emailuri se trimit corect
- [ ] SSL activat (HTTPS)
- [ ] Backup-uri configurate
- [ ] Monitorizare activă

## 🆘 Troubleshooting

### Backend nu pornește

```bash
# Verifică logs
sudo journalctl -u mcmetsolart -n 50

# Verifică permisiuni
sudo chown -R www-data:www-data /var/www/mcmetsolart
```

### Frontend nu se conectează la API

1. Verifică `js/config.js` - URL-ul API
2. Verifică CORS în `app.py`
3. Verifică Nginx config
4. Verifică firewall

### Baza de date locked

```bash
# Oprește serviciul
sudo systemctl stop mcmetsolart

# Verifică procese
lsof mc_metsolart.db

# Repornește
sudo systemctl start mcmetsolart
```

## 📞 Contact

Pentru suport: mc_metsolart@yahoo.com

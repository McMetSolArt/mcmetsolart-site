# 🛠️ Comenzi Utile - MC MetSolArt

## 🚀 Pornire Backend

### Windows
```cmd
cd McMetSolArtBackend
start-backend.bat
```

### Linux/Mac
```bash
cd McMetSolArtBackend
chmod +x start-backend.sh
./start-backend.sh
```

### Manual (toate platformele)
```bash
cd McMetSolArtBackend
python -m venv venv

# Activare venv
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

pip install -r requirements.txt
python app.py
```

## 🧪 Testare

### Test Health Check
```bash
curl http://localhost:5000/api/health
```

### Test Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@test.com\",\"password\":\"test123\",\"first_name\":\"Test\",\"last_name\":\"User\"}"
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@test.com\",\"password\":\"test123\"}"
```

### Test în Browser
```
http://localhost:5500/quick-test.html
http://localhost:5500/test-api-connection.html
```

## 📦 Instalare Dependențe

### Backend (Python)
```bash
cd McMetSolArtBackend
pip install -r requirements.txt
```

### Verificare Instalare
```bash
pip list
# Ar trebui să vezi: Flask, Flask-CORS, gunicorn, etc.
```

## 🗄️ Baza de Date

### Inițializare
```bash
cd McMetSolArtBackend
python app.py
# Baza de date se creează automat la prima pornire
```

### Backup
```bash
# Windows
copy McMetSolArtBackend\mc_metsolart.db McMetSolArtBackend\mc_metsolart_backup.db

# Linux/Mac
cp McMetSolArtBackend/mc_metsolart.db McMetSolArtBackend/mc_metsolart_backup.db
```

### Restore
```bash
# Windows
copy McMetSolArtBackend\mc_metsolart_backup.db McMetSolArtBackend\mc_metsolart.db

# Linux/Mac
cp McMetSolArtBackend/mc_metsolart_backup.db McMetSolArtBackend/mc_metsolart.db
```

### Resetare (șterge toate datele)
```bash
# Oprește backend
# Șterge baza de date
# Windows:
del McMetSolArtBackend\mc_metsolart.db
# Linux/Mac:
rm McMetSolArtBackend/mc_metsolart.db

# Repornește backend - se va crea o bază nouă
python app.py
```

## 🔍 Debugging

### Verifică Port-uri Ocupate

**Windows:**
```cmd
netstat -ano | findstr :5000
```

**Linux/Mac:**
```bash
lsof -i :5000
```

### Oprește Proces pe Port

**Windows:**
```cmd
# Găsește PID
netstat -ano | findstr :5000
# Oprește proces
taskkill /PID <PID> /F
```

**Linux/Mac:**
```bash
# Găsește PID
lsof -i :5000
# Oprește proces
kill -9 <PID>
```

### Verifică Logs Backend

**Development:**
```bash
# Logs apar în terminal unde rulează python app.py
```

**Production (Systemd):**
```bash
sudo journalctl -u mcmetsolart -f
sudo journalctl -u mcmetsolart -n 100
```

### Verifică Erori Python
```bash
cd McMetSolArtBackend
python -c "import flask; print(flask.__version__)"
python -c "import flask_cors; print('CORS OK')"
python -c "import sqlite3; print('SQLite OK')"
```

## 🌐 Deployment

### Render.com

**Build Command:**
```bash
cd McMetSolArtBackend && pip install -r requirements.txt
```

**Start Command:**
```bash
cd McMetSolArtBackend && gunicorn --bind 0.0.0.0:$PORT app:app
```

### Heroku

**Creează Procfile:**
```bash
echo "web: cd McMetSolArtBackend && gunicorn app:app" > Procfile
```

**Deploy:**
```bash
heroku login
heroku create mcmetsolart
git push heroku main
```

**Logs:**
```bash
heroku logs --tail
```

### VPS/Dedicated Server

**Instalare Dependențe:**
```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv nginx -y
```

**Setup Aplicație:**
```bash
cd /var/www/mcmetsolart
python3 -m venv venv
source venv/bin/activate
pip install -r McMetSolArtBackend/requirements.txt
```

**Pornire cu Gunicorn:**
```bash
cd McMetSolArtBackend
gunicorn --bind 0.0.0.0:5000 --workers 4 app:app
```

**Creare Serviciu Systemd:**
```bash
sudo nano /etc/systemd/system/mcmetsolart.service
```

**Control Serviciu:**
```bash
sudo systemctl start mcmetsolart
sudo systemctl stop mcmetsolart
sudo systemctl restart mcmetsolart
sudo systemctl status mcmetsolart
sudo systemctl enable mcmetsolart  # Auto-start la boot
```

**Nginx:**
```bash
sudo nano /etc/nginx/sites-available/mcmetsolart
sudo ln -s /etc/nginx/sites-available/mcmetsolart /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**SSL (Certbot):**
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

## 📧 Email

### Test Email
```python
# În Python console
cd McMetSolArtBackend
python

from email_service import send_contact_email
send_contact_email("Test", "test@test.com", "Test Subject", "Test message")
```

### Verifică Configurare SMTP
```bash
# Verifică .env
cat McMetSolArtBackend/.env | grep SMTP
```

## 🔒 Securitate

### Verifică .gitignore
```bash
cat .gitignore
# Ar trebui să conțină: .env, *.db, venv/, __pycache__/
```

### Verifică ce e în Git
```bash
git status
# .env NU ar trebui să apară
```

### Adaugă în .gitignore
```bash
echo ".env" >> .gitignore
echo "*.db" >> .gitignore
echo "*.db-journal" >> .gitignore
echo "venv/" >> .gitignore
echo "__pycache__/" >> .gitignore
```

## 📊 Monitorizare

### Health Check Automat
```bash
# Cron job pentru verificare la fiecare 5 minute
*/5 * * * * curl -s http://localhost:5000/api/health > /dev/null || echo "Backend down!" | mail -s "Alert" admin@example.com
```

### Backup Automat
```bash
# Cron job pentru backup zilnic la 2 AM
0 2 * * * cp /var/www/mcmetsolart/McMetSolArtBackend/mc_metsolart.db /backups/db_$(date +\%Y\%m\%d).db
```

### Disk Space
```bash
df -h
du -sh /var/www/mcmetsolart
```

### Memory Usage
```bash
free -h
ps aux | grep python
```

## 🧹 Curățare

### Șterge Cache Python
```bash
find . -type d -name "__pycache__" -exec rm -r {} +
find . -type f -name "*.pyc" -delete
```

### Șterge Virtual Environment
```bash
# Windows
rmdir /s /q McMetSolArtBackend\venv

# Linux/Mac
rm -rf McMetSolArtBackend/venv
```

### Șterge Logs Vechi
```bash
# Linux
sudo journalctl --vacuum-time=7d
```

## 🔄 Update

### Update Dependențe Python
```bash
cd McMetSolArtBackend
source venv/bin/activate
pip install --upgrade -r requirements.txt
```

### Update Sistem (Linux)
```bash
sudo apt update
sudo apt upgrade -y
```

## 📝 Git

### Commit Changes
```bash
git add .
git commit -m "Update: descriere modificări"
git push origin main
```

### Verifică Status
```bash
git status
git log --oneline -10
```

### Creează Branch
```bash
git checkout -b feature/new-feature
git push -u origin feature/new-feature
```

## 🆘 Recovery

### Backend Crashed
```bash
# Verifică logs
sudo journalctl -u mcmetsolart -n 50

# Repornește
sudo systemctl restart mcmetsolart
```

### Database Locked
```bash
# Oprește backend
sudo systemctl stop mcmetsolart

# Șterge lock
rm McMetSolArtBackend/mc_metsolart.db-journal

# Repornește
sudo systemctl start mcmetsolart
```

### Nginx Not Working
```bash
# Verifică configurare
sudo nginx -t

# Verifică logs
sudo tail -f /var/log/nginx/error.log

# Repornește
sudo systemctl restart nginx
```

### SSL Expired
```bash
# Reînnoiește certificat
sudo certbot renew

# Verifică expirare
sudo certbot certificates
```

## 📞 Suport

Pentru mai multe detalii, vezi:
- `START-HERE.md` - Ghid rapid
- `DEPLOYMENT-README.md` - Deployment
- `McMetSolArtBackend/deploy-guide.md` - Ghid complet

**Email**: mc_metsolart@yahoo.com

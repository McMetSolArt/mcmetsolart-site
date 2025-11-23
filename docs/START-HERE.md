# 🚀 START HERE - MC MetSolArt

## 👋 Bine ai venit!

Site-ul tău este **100% gata** pentru deployment pe server! Am configurat complet comunicarea între frontend și backend.

## ⚡ Quick Start (5 minute)

### 1. Pornește Backend-ul

**Windows:**
```cmd
cd McMetSolArtBackend
start-backend.bat
```

**Linux/Mac:**
```bash
cd McMetSolArtBackend
./start-backend.sh
```

### 2. Deschide Site-ul

```
http://localhost:5000
```

### 3. Testează

```
http://localhost:5500/quick-test.html
```

Ar trebui să vezi toate statusurile **verzi** ✅

## 📚 Documentație Completă

### Pentru Testare Locală:
- **`quick-test.html`** - Test rapid (2 minute)
- **`test-api-connection.html`** - Test complet (5 minute)

### Pentru Deployment:
- **`DEPLOYMENT-README.md`** - Ghid rapid (citește primul!)
- **`McMetSolArtBackend/deploy-guide.md`** - Ghid complet (toate detaliile)
- **`CHECKLIST-DEPLOYMENT.md`** - Checklist verificare

### Pentru Înțelegere:
- **`CONFIGURARE-BACKEND-FRONTEND-COMPLET.md`** - Explicații complete

## 🎯 Ce Urmează?

### Opțiunea 1: Testare Locală (Recomandat Primul)
1. Pornește backend: `cd McMetSolArtBackend && start-backend.bat`
2. Deschide: `http://localhost:5000`
3. Testează: `http://localhost:5500/quick-test.html`
4. Înregistrează un cont
5. Testează toate funcțiile

### Opțiunea 2: Deploy pe Render.com (Cel Mai Simplu)
1. Citește: `DEPLOYMENT-README.md`
2. Creează cont pe [render.com](https://render.com)
3. Conectează GitHub
4. Deploy în 5 minute!

### Opțiunea 3: Deploy pe Server Propriu (Control Total)
1. Citește: `McMetSolArtBackend/deploy-guide.md`
2. Pregătește server (Ubuntu/Debian)
3. Instalează Python, Nginx
4. Configurează SSL
5. Deploy!

## 🔧 Configurare Email (Important!)

Pentru ca emailurile să funcționeze:

1. **Obține App Password Yahoo:**
   - [Yahoo Account Security](https://login.yahoo.com/account/security)
   - Activează "Two-step verification"
   - Generează "App password"

2. **Creează `.env` în `McMetSolArtBackend/`:**
   ```env
   EMAIL_ENABLED=True
   SMTP_HOST=smtp.mail.yahoo.com
   SMTP_PORT=587
   SMTP_USER=mc_metsolart@yahoo.com
   SMTP_PASSWORD=your_app_password_here
   SMTP_USE_TLS=True
   ```

## ✅ Verificare Rapidă

Rulează aceste comenzi pentru a verifica că totul e OK:

```bash
# 1. Verifică că backend pornește
cd McMetSolArtBackend
python app.py
# Ar trebui să vezi: "✅ Backend pornit pe http://localhost:3000"

# 2. Verifică API (în alt terminal)
curl http://localhost:5000/api/health
# Ar trebui să vezi: {"success": true, "status": "healthy"}

# 3. Deschide browser
# http://localhost:5000
# Ar trebui să vezi site-ul tău
```

## 🆘 Probleme?

### Backend nu pornește?
```bash
cd McMetSolArtBackend
pip install -r requirements.txt
python app.py
```

### Frontend nu se conectează?
1. Verifică că backend rulează
2. Deschide F12 în browser
3. Verifică Console pentru erori
4. Rulează `quick-test.html`

### Emailuri nu funcționează?
1. Verifică `.env` există
2. Verifică App Password Yahoo
3. Verifică `EMAIL_ENABLED=True`

## 📞 Ajutor

- **Email**: mc_metsolart@yahoo.com
- **Documentație**: Vezi fișierele `.md` din proiect
- **Test Pages**: `quick-test.html`, `test-api-connection.html`

## 🎉 Gata!

Site-ul tău este pregătit pentru deployment. Urmează pașii de mai sus și vei avea site-ul live în câteva minute!

**Mult succes! 🚀**

---

**P.S.** Începe cu testarea locală folosind `quick-test.html` pentru a te asigura că totul funcționează perfect înainte de deployment.

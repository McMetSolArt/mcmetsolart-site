# 🔗 Link-uri Site MC MetSolArt

## 🌐 Site-ul Live

### URL Principal:
```
https://mcmetsolart-site-5.onrender.com
```

**Status:** ✅ LIVE și funcțional!

---

## 🧪 API Endpoints

### Health Check (Verificare Backend):
```
https://mcmetsolart-site-5.onrender.com/api/health
```

**Răspuns așteptat:**
```json
{
  "success": true,
  "status": "healthy",
  "message": "Backend funcționează corect",
  "database": "connected"
}
```

### Autentificare:

**Register:**
```
POST https://mcmetsolart-site-5.onrender.com/api/auth/register
```

**Login:**
```
POST https://mcmetsolart-site-5.onrender.com/api/auth/login
```

**Logout:**
```
POST https://mcmetsolart-site-5.onrender.com/api/auth/logout
```

### Utilizator:

**Profil:**
```
GET https://mcmetsolart-site-5.onrender.com/api/user/profile
PUT https://mcmetsolart-site-5.onrender.com/api/user/profile
```

**Avatar:**
```
PUT https://mcmetsolart-site-5.onrender.com/api/user/avatar
```

**Comenzi:**
```
GET https://mcmetsolart-site-5.onrender.com/api/user/orders
GET https://mcmetsolart-site-5.onrender.com/api/orders/{id}
```

**Setări:**
```
GET https://mcmetsolart-site-5.onrender.com/api/user/settings
PUT https://mcmetsolart-site-5.onrender.com/api/user/settings
```

### Suport:

**Mesaj Contact:**
```
POST https://mcmetsolart-site-5.onrender.com/api/support/message
```

### Comenzi:

**Creare Comandă:**
```
POST https://mcmetsolart-site-5.onrender.com/api/orders/create
```

**Notificări:**
```
GET https://mcmetsolart-site-5.onrender.com/api/notifications
PUT https://mcmetsolart-site-5.onrender.com/api/notifications/{id}/read
```

**Adrese Livrare:**
```
GET https://mcmetsolart-site-5.onrender.com/api/shipping-addresses
POST https://mcmetsolart-site-5.onrender.com/api/shipping-addresses
```

---

## 🎨 Pagini Frontend

### Pagina Principală:
```
https://mcmetsolart-site-5.onrender.com/
```

### Secțiuni:
- **Hero:** `https://mcmetsolart-site-5.onrender.com/#hero`
- **Despre:** `https://mcmetsolart-site-5.onrender.com/#about`
- **Servicii:** `https://mcmetsolart-site-5.onrender.com/#services`
- **Portofoliu:** `https://mcmetsolart-site-5.onrender.com/#portfolio`
- **Contact:** `https://mcmetsolart-site-5.onrender.com/#contact`

---

## 🛠️ Management

### Render Dashboard:
```
https://dashboard.render.com
```

**Serviciul tău:**
```
https://dashboard.render.com/web/srv-YOUR-SERVICE-ID
```

### GitHub Repository:
```
https://github.com/McMetSolArt/mcmetsolart-site
```

**Ultimul commit:**
```
https://github.com/McMetSolArt/mcmetsolart-site/commit/e9ebe3f
```

---

## 📧 Email

### Admin Email:
```
mc_metsolart@yahoo.com
```

### Yahoo Account Security (pentru App Password):
```
https://login.yahoo.com/account/security
```

---

## 🧪 Testare

### Test API cu cURL:

**Health Check:**
```bash
curl https://mcmetsolart-site-5.onrender.com/api/health
```

**Register:**
```bash
curl -X POST https://mcmetsolart-site-5.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123","first_name":"Test","last_name":"User"}'
```

**Login:**
```bash
curl -X POST https://mcmetsolart-site-5.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

### Test în Browser:

**Console JavaScript:**
```javascript
// Test Health Check
fetch('https://mcmetsolart-site-5.onrender.com/api/health')
  .then(r => r.json())
  .then(console.log);

// Test Register
fetch('https://mcmetsolart-site-5.onrender.com/api/auth/register', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    email: 'test@test.com',
    password: 'test123',
    first_name: 'Test',
    last_name: 'User'
  })
}).then(r => r.json()).then(console.log);
```

---

## 📊 Monitorizare

### Render Logs:
```
https://dashboard.render.com/web/srv-YOUR-SERVICE-ID/logs
```

### Render Metrics:
```
https://dashboard.render.com/web/srv-YOUR-SERVICE-ID/metrics
```

---

## 🔒 Securitate

### SSL Certificate:
```
✅ Activat automat de Render
✅ HTTPS forțat
✅ Certificate auto-renewal
```

### CORS:
```
✅ Configurat în app.py
✅ Permite toate originile (*)
```

---

## 📱 Social Media

### Instagram:
```
https://www.instagram.com/mc_metsolart/
```

### Facebook:
```
[Adaugă link-ul tău]
```

### LinkedIn:
```
[Adaugă link-ul tău]
```

---

## 🎯 Quick Links

### Pentru Dezvoltare:
- **Local Backend:** `http://localhost:5000`
- **Local Frontend:** `http://localhost:5500`
- **Local API:** `http://localhost:5000/api/health`

### Pentru Production:
- **Site Live:** `https://mcmetsolart-site-5.onrender.com`
- **API Live:** `https://mcmetsolart-site-5.onrender.com/api/health`
- **Dashboard:** `https://dashboard.render.com`

### Pentru Documentație:
- **START-HERE.md** - Ghid rapid
- **DEPLOYMENT-README.md** - Deployment
- **ACTUALIZARE-RENDER.md** - Actualizare server
- **CHECKLIST-DEPLOYMENT.md** - Verificare

---

## 📞 Suport

### Email:
```
mc_metsolart@yahoo.com
```

### GitHub Issues:
```
https://github.com/McMetSolArt/mcmetsolart-site/issues
```

---

## 🎉 Status

**Site:** ✅ LIVE  
**Backend:** ✅ Funcțional  
**API:** ✅ Activ  
**Database:** ✅ Conectat  
**HTTPS:** ✅ Activat  
**Email:** ⚠️ Necesită SMTP_PASSWORD  

---

## 📝 Note

### Pentru a activa emailurile:

1. Obține App Password de la Yahoo
2. Adaugă în Render Dashboard:
   - Environment → Add Variable
   - Key: `SMTP_PASSWORD`
   - Value: [App Password]
3. Redeploy serviciul

### Pentru custom domain:

1. Render Dashboard → Settings → Custom Domains
2. Add Custom Domain
3. Configurează DNS records
4. Așteaptă propagare DNS (24-48h)

---

**Data:** 19 Noiembrie 2025  
**Versiune:** 1.0  
**Status:** ✅ LIVE ON RENDER

---

## 🚀 Next Steps

1. [ ] Adaugă SMTP_PASSWORD în Render
2. [ ] Testează toate funcționalitățile
3. [ ] Configurează custom domain (opțional)
4. [ ] Adaugă Google Analytics (opțional)
5. [ ] Submit la Google Search Console
6. [ ] Promovează site-ul!

**Site-ul tău este LIVE și funcțional! 🎉**

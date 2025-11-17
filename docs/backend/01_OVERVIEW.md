# 🚀 MC METSOLART - BACKEND SPECIFICATIONS
## Documentație Completă pentru Sistem Profesional

**Versiune:** 1.0  
**Data:** 15 Noiembrie 2025  
**Status:** Ready for Implementation

---

## 📋 CUPRINS DOCUMENTAȚIE

1. **01_OVERVIEW.md** - Prezentare generală (acest fișier)
2. **02_DATABASE_SCHEMA.md** - Schema completă bază de date
3. **03_API_ENDPOINTS.md** - Toate endpoint-urile API
4. **04_AUTHENTICATION.md** - Sistem autentificare și securitate
5. **05_EMAIL_SERVICE.md** - Configurare serviciu email
6. **06_ADMIN_PANEL.md** - Panel administrare pentru echipa MC
7. **07_SECURITY.md** - Măsuri de securitate și protecție date
8. **08_DEPLOYMENT.md** - Ghid deployment și configurare server

---

## 🎯 OBIECTIVE SISTEM

### Funcționalități Principale
✅ Autentificare și înregistrare utilizatori
✅ Gestionare profile utilizatori
✅ Salvare și editare date personale
✅ Gestionare comenzi
✅ Trimitere emailuri reale
✅ Resetare parolă securizată
✅ Panel administrare pentru echipa MC
✅ Securitate completă date (GDPR compliant)
✅ Suport multilingv (RO, EN, UK, IT)

---

## 🏗️ ARHITECTURĂ SISTEM

### Stack Tehnologic Recomandat

**Backend:**
- **Limbaj:** PHP 8.1+ sau Node.js 18+
- **Framework:** Laravel 10+ sau Express.js
- **Bază de date:** MySQL 8.0+ sau PostgreSQL 14+
- **Cache:** Redis (opțional, pentru performanță)

**Servicii Externe:**
- **Email:** SendGrid, Mailgun, sau SMTP propriu
- **Storage:** Local sau AWS S3 pentru avatare
- **SSL:** Let's Encrypt (obligatoriu)

**Securitate:**
- **Autentificare:** JWT (JSON Web Tokens)
- **Criptare parole:** bcrypt sau Argon2
- **Rate limiting:** Pentru protecție DDoS
- **CORS:** Configurare corectă pentru frontend

---

## 📊 FLUXURI PRINCIPALE

### 1. Înregistrare Utilizator
```
Frontend → POST /api/auth/register
         → Validare date
         → Hash parolă
         → Salvare în DB
         → Trimitere email confirmare
         → Return JWT token
         → Frontend salvează token
```

### 2. Autentificare
```
Frontend → POST /api/auth/login
         → Verificare credențiale
         → Validare parolă
         → Generare JWT token
         → Return user data + token
         → Frontend salvează token
```

### 3. Editare Profil
```
Frontend → PUT /api/user/profile
         → Verificare JWT token
         → Validare date
         → Update în DB
         → Return updated user
         → Frontend actualizează UI
```

### 4. Resetare Parolă
```
Frontend → POST /api/auth/forgot-password
         → Generare token unic
         → Salvare token în DB (expirare 1h)
         → Trimitere email cu link
         → User click link
         → Frontend → POST /api/auth/reset-password
         → Verificare token
         → Update parolă
         → Invalidare token
```

---

## 🔐 SECURITATE - CERINȚE MINIME

### Obligatoriu
✅ HTTPS (SSL Certificate)
✅ Criptare parole (bcrypt, cost 12+)
✅ JWT tokens cu expirare (24h)
✅ Validare input (sanitizare SQL injection, XSS)
✅ Rate limiting (max 100 requests/min per IP)
✅ CORS configurat corect
✅ Protecție CSRF
✅ Headers securitate (Helmet.js sau echivalent)

### Recomandat
✅ 2FA (Two-Factor Authentication)
✅ Logging activități suspicioase
✅ Backup automat bază de date (zilnic)
✅ Monitorizare server (uptime, erori)

---

## 📧 EMAIL - TIPURI NECESARE

### Emailuri Automate
1. **Confirmare înregistrare** - Welcome email
2. **Resetare parolă** - Link securizat
3. **Confirmare comandă** - Detalii comandă
4. **Update status comandă** - Notificări
5. **Mesaj suport** - Confirmare primire
6. **Newsletter** - Dacă utilizatorul a optat

### Template-uri Email
- Design responsive (mobile-friendly)
- Logo MC MetSolArt
- Footer cu link-uri utile
- Unsubscribe link (pentru newsletter)

---

## 👥 ROLURI UTILIZATORI

### 1. Client (User)
- Înregistrare și autentificare
- Editare profil
- Vizualizare comenzi
- Trimitere mesaje suport
- Gestionare setări cont

### 2. Administrator (Admin)
- Acces panel administrare
- Vizualizare toți utilizatorii
- Gestionare comenzi
- Răspuns mesaje suport
- Statistici și rapoarte
- Export date

### 3. Super Admin (Owner)
- Toate drepturile Admin
- Gestionare administratori
- Configurare sistem
- Backup și restore

---

## 📈 PERFORMANȚĂ - CERINȚE

### Timp Răspuns API
- Autentificare: < 500ms
- Încărcare profil: < 300ms
- Update date: < 500ms
- Listare comenzi: < 1s

### Scalabilitate
- Suport minim 1000 utilizatori concurenți
- Bază de date optimizată (indexuri)
- Cache pentru query-uri frecvente
- CDN pentru assets statice

---

## 🌍 MULTILINGV

### Suport Limbi
- Română (RO) - default
- Engleză (EN)
- Ucraineană (UK)
- Italiană (IT)

### Implementare
- Emailuri în limba utilizatorului
- Mesaje eroare traduse
- Panel admin multilingv
- Date salvate cu locale

---

## 📱 COMPATIBILITATE

### Browsere Suportate
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Dispozitive
- Desktop (1920px+)
- Laptop (1366px+)
- Tablet (768px+)
- Mobile (375px+)

---

## 🔄 INTEGRĂRI VIITOARE

### Opțional (Faza 2)
- Plăți online (Stripe, PayPal)
- Tracking comenzi în timp real
- Chat live cu operatori
- Notificări push
- App mobilă (React Native)

---

## 📞 CONTACT DEZVOLTARE

**Client:** MC MetSolArt  
**Email:** mc_metsolart@yahoo.com  
**Website:** [URL site]

**Dezvoltator Backend:** [De completat]  
**Timeline estimat:** 4-6 săptămâni  
**Buget estimat:** [De discutat]

---

## ✅ CHECKLIST IMPLEMENTARE

### Faza 1 - Setup (Săptămâna 1)
- [ ] Configurare server
- [ ] Instalare stack tehnologic
- [ ] Creare bază de date
- [ ] Setup repository Git
- [ ] Configurare CI/CD

### Faza 2 - Backend Core (Săptămâna 2-3)
- [ ] Implementare API autentificare
- [ ] Implementare API utilizatori
- [ ] Implementare API comenzi
- [ ] Configurare serviciu email
- [ ] Testare endpoint-uri

### Faza 3 - Admin Panel (Săptămâna 4)
- [ ] Creare interfață admin
- [ ] Dashboard statistici
- [ ] Gestionare utilizatori
- [ ] Gestionare comenzi

### Faza 4 - Integrare & Testing (Săptămâna 5)
- [ ] Conectare frontend-backend
- [ ] Testare completă
- [ ] Fix bug-uri
- [ ] Optimizare performanță

### Faza 5 - Deployment (Săptămâna 6)
- [ ] Deploy pe server producție
- [ ] Configurare SSL
- [ ] Configurare backup
- [ ] Monitorizare
- [ ] Training echipa MC

---

**NEXT:** Citește **02_DATABASE_SCHEMA.md** pentru schema completă a bazei de date.

# 🏗️ MC MetSolArt - Site Web Profesional

**Cupole Decorative Metalice Iluminate Solar**

Site web modern și profesional pentru MC MetSolArt, specializat în cupole decorative metalice cu iluminare solară.

---

## 📋 Structură Proiect

### 🌐 Site PUBLIC (Pentru Clienți)
```
├── index.html              # Pagina principală
├── css/                    # Stiluri
├── js/                     # JavaScript
├── images/                 # Imagini
└── McMetSolArtBackend/     # Backend API
```

### 🔐 Admin Panel PRIVAT (Doar pentru Tine)
```
admin-private/
├── admin-clean.html        # Admin panel ⭐ RECOMANDAT
├── css/                    # Stiluri admin
├── js/                     # JavaScript admin
└── images/                 # Logo
```

**⚠️ IMPORTANT:** Folder-ul `admin-private/` este PRIVAT și nu trebuie inclus în deployment public!

---

## ✨ Caracteristici

### Site PUBLIC
- ✅ Design responsive modern
- ✅ Multilingv (RO, EN, UK, IT)
- ✅ Temă Light/Dark
- ✅ Sistem autentificare clienți
- ✅ Panou utilizator cu comenzi
- ✅ Asistent virtual (Maryna)
- ✅ Formular contact

### Admin Panel PRIVAT
- ✅ Gestionare comenzi completă
- ✅ Sistem plăți (0%, 25%, 50%, 100%)
- ✅ Confirmare și actualizare comenzi
- ✅ Gestionare clienți
- ✅ Statistici și rapoarte
- ✅ Auto-refresh la 30 secunde
- ✅ **Sincronizat automat cu site-ul public**

---

## 🔗 Sincronizare Admin ↔️ Client

### Cum Funcționează

```
1. ADMIN PANEL (Privat)
   ↓
   Admin creează comandă pentru client
   ↓
2. BACKEND API
   ↓
   Salvează în baza de date cu user_id
   ↓
3. SITE PUBLIC
   ↓
   Client vede comanda în "Comenzile Mele"
```

**TOTUL ESTE SINCRONIZAT AUTOMAT!** ✅

### Exemplu Practic

**Admin:**
```
1. Deschide admin-private/admin-clean.html
2. Login cu parolă
3. Creează comandă pentru "Ion Popescu"
4. Salvează
```

**Client (Ion):**
```
1. Deschide index.html
2. Se autentifică
3. Vede comanda în "Comenzile Mele"
```

**Sincronizare:** INSTANT și AUTOMATĂ! ⚡

---

## 🚀 Instalare și Utilizare

### 1. Instalare Backend

```bash
cd McMetSolArtBackend
pip install flask flask-cors
python app.py
```

Backend rulează pe `http://localhost:5000`

### 2. Site PUBLIC (Pentru Clienți)

**Opțiunea A - Direct:**
```
Deschide index.html în browser
```

**Opțiunea B - Cu server:**
```bash
python server_static.py
```
Apoi: `http://localhost:8000`

### 3. Admin Panel PRIVAT (Pentru Tine)

```
Deschide: admin-private/admin-clean.html
Parolă: admin123
```

**⚠️ SCHIMBĂ PAROLA IMEDIAT!**

---

## 🔐 Securitate Admin Panel

### 1. Schimbă Parola

**În `admin-private/js/admin-panel.js`:**
```javascript
const ADMIN_CONFIG = {
    ADMIN_PASSWORD: 'parola-ta-sigura-aici'  // SCHIMBĂ!
};
```

### 2. Protejează Folder-ul

**Opțiuni:**
- ✅ NU include `admin-private/` în deployment public
- ✅ Folosește subdomain separat (admin.domeniul-tau.com)
- ✅ Protejează cu `.htaccess` sau autentificare server
- ✅ Restricționează IP-uri (whitelist)

### 3. Recomandări

- 🔒 Păstrează admin panel-ul PRIVAT
- 🔒 Nu partaja link-ul cu nimeni
- 🔒 Folosește HTTPS în producție
- 🔒 Activează autentificare backend

---

## 🌐 Deployment

### Site PUBLIC (index.html)

**Deploy pe Render.com:**
```
1. Creează Web Service
2. Repository: GitHub
3. Build: pip install -r requirements.txt
4. Start: gunicorn app:app
5. Include: index.html, css/, js/, images/
```

### Admin Panel PRIVAT

**Opțiunea 1 - Local (Recomandat):**
```
Păstrează admin-private/ doar pe computerul tău
Accesează local: file:///path/to/admin-private/admin-clean.html
```

**Opțiunea 2 - Subdomain Protejat:**
```
Deploy pe subdomain separat: admin.domeniul-tau.com
Protejează cu autentificare server
Restricționează IP-uri
```

**Opțiunea 3 - VPN:**
```
Deploy admin panel
Accesează doar prin VPN
```

---

## 📁 Structură Completă

```
McMetSolArt.sitoWEB/
│
├── 🌐 SITE PUBLIC (Pentru Clienți)
│   ├── index.html
│   ├── css/
│   ├── js/
│   ├── images/
│   └── McMetSolArtBackend/
│
├── 🔐 ADMIN PRIVAT (Doar pentru Tine)
│   └── admin-private/
│       ├── admin-clean.html ⭐
│       ├── css/
│       ├── js/
│       └── images/
│
├── 📚 ARHIVE
│   ├── DOCS-ARHIVA/
│   └── TESTE-ARHIVA/
│
└── 📄 DOCUMENTAȚIE
    ├── README.md (acest fișier)
    └── server_static.py
```

---

## 🎯 Utilizare Zilnică

### Pentru Clienți (Site PUBLIC)
```
1. Vizitează: https://domeniul-tau.com
2. Creează cont sau autentifică-te
3. Plasează comenzi
4. Urmărește statusul comenzilor
```

### Pentru Tine (Admin PRIVAT)
```
1. Deschide: admin-private/admin-clean.html
2. Login cu parola ta
3. Gestionează comenzi și clienți
4. Toate modificările se sincronizează automat cu site-ul public
```

---

## 💡 Întrebări Frecvente

### Q: Cum văd clienții comenzile create de mine în admin?
**A:** Automat! Când creezi o comandă pentru un client în admin panel, aceasta apare instant în contul clientului pe site-ul public.

### Q: Trebuie să deploy-ez admin panel-ul?
**A:** NU este recomandat. Păstrează-l local sau pe subdomain protejat.

### Q: Cum schimb parola admin?
**A:** Editează `admin-private/js/admin-panel.js` și schimbă `ADMIN_PASSWORD`.

### Q: Este sigur admin panel-ul?
**A:** DA, dacă îl păstrezi privat și schimbi parola. NU îl face public fără protecție suplimentară.

---

## 📞 Contact

- **Email:** mc_metsolart@yahoo.com
- **Instagram:** [@MC.MetSolArt](https://www.instagram.com/mc.metsolart/)
- **WhatsApp:** +40 123 456 789

---

## 📄 Licență

© 2025 MC MetSolArt. Toate drepturile rezervate.

---

**Versiune:** 3.0 Professional  
**Ultima actualizare:** 28 Noiembrie 2025  
**Status:** ✅ Gata pentru Producție (Site PUBLIC) + 🔐 Admin PRIVAT

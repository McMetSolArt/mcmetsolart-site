# 🌐 Configurare Domeniu Propriu - www.mcmetsolart.com

## 🎯 Obiectiv

Să folosești **www.mcmetsolart.com** în loc de **mcmetsolart-site-5.onrender.com**

---

## 📋 Pași Completi

### PASUL 1: Cumpără Domeniul (15 minute)

#### Opțiuni Recomandate:

**1. Namecheap (Recomandat)**
- Site: https://www.namecheap.com
- Preț: ~$9-12/an
- Include: Privacy Protection gratuit
- Suport: Excelent

**2. Cloudflare**
- Site: https://www.cloudflare.com/products/registrar/
- Preț: ~$9/an (la cost)
- Include: Privacy Protection, DNS rapid
- Suport: Bun

**3. Google Domains**
- Site: https://domains.google
- Preț: ~$12/an
- Include: Privacy Protection, Email forwarding
- Suport: Bun

#### Cum să cumperi (Namecheap):

1. **Mergi pe:** https://www.namecheap.com
2. **Caută:** `mcmetsolart.com`
3. **Verifică disponibilitate:**
   - Dacă e disponibil: Click "Add to Cart"
   - Dacă NU e disponibil: Încearcă:
     - `mcmetsolart.ro` (pentru România)
     - `mc-metsolart.com`
     - `metsolart.com`
4. **Checkout:**
   - Alege 1 an (sau mai mult pentru discount)
   - Activează "WhoisGuard" (Privacy Protection) - GRATUIT
   - Completează datele
   - Plătește (Card, PayPal, etc.)
5. **Confirmă email-ul**

**Cost total:** ~$10-15/an

---

### PASUL 2: Configurează în Render (5 minute)

#### A. Deschide Render Dashboard

```
https://dashboard.render.com
```

#### B. Adaugă Custom Domain

1. Click pe serviciul tău: **mcmetsolart-site-5**
2. Click pe **"Settings"** în sidebar (stânga)
3. Scroll jos până la secțiunea **"Custom Domains"**
4. Click **"Add Custom Domain"**

#### C. Adaugă Domeniile

**Domeniu 1:**
```
mcmetsolart.com
```
Click "Save"

**Domeniu 2:**
```
www.mcmetsolart.com
```
Click "Save"

#### D. Copiază DNS Records

Render îți va arăta ce DNS records trebuie să adaugi:

**Pentru mcmetsolart.com:**
```
Type: A
Name: @
Value: 216.24.57.1 (sau alt IP dat de Render)
```

**Pentru www.mcmetsolart.com:**
```
Type: CNAME
Name: www
Value: mcmetsolart-site-5.onrender.com
```

**IMPORTANT:** Copiază aceste valori! Le vei folosi în pasul următor.

---

### PASUL 3: Configurează DNS la Namecheap (10 minute)

#### A. Login pe Namecheap

```
https://www.namecheap.com/myaccount/login/
```

#### B. Găsește Domeniul

1. Click pe **"Domain List"** în sidebar
2. Găsește **mcmetsolart.com**
3. Click pe **"Manage"**

#### C. Configurează DNS

1. Click pe tab **"Advanced DNS"**
2. Șterge toate records existente (dacă sunt)
3. Click **"Add New Record"**

**Record 1 - Root Domain:**
```
Type: A Record
Host: @
Value: [IP-ul dat de Render, ex: 216.24.57.1]
TTL: Automatic
```
Click "Save" (✓)

**Record 2 - WWW:**
```
Type: CNAME Record
Host: www
Value: mcmetsolart-site-5.onrender.com
TTL: Automatic
```
Click "Save" (✓)

**Record 3 - Redirect (Opțional):**
```
Type: URL Redirect Record
Host: @
Value: https://www.mcmetsolart.com
TTL: Automatic
```
Click "Save" (✓)

#### D. Salvează Toate Modificările

Click pe **"Save All Changes"** (buton verde sus)

---

### PASUL 4: Așteaptă Propagarea DNS (1-48 ore)

#### Ce se întâmplă:

DNS-ul tău se propagă pe internet. De obicei durează:
- **Minim:** 5-10 minute
- **Normal:** 1-2 ore
- **Maxim:** 48 ore

#### Verifică Propagarea:

**Tool 1 - DNS Checker:**
```
https://dnschecker.org
```
- Introdu: `mcmetsolart.com`
- Verifică că arată IP-ul Render

**Tool 2 - What's My DNS:**
```
https://www.whatsmydns.net
```
- Introdu: `mcmetsolart.com`
- Verifică propagarea globală

**Tool 3 - Command Line:**
```bash
# Windows
nslookup mcmetsolart.com

# Linux/Mac
dig mcmetsolart.com
```

---

### PASUL 5: Verifică SSL/HTTPS (Automat)

Render activează automat SSL pentru domeniul tău!

#### Verifică:

1. Deschide: `http://mcmetsolart.com`
2. Ar trebui să fie redirect automat la: `https://mcmetsolart.com`
3. Verifică că ai lacăt verde în browser 🔒

#### Dacă SSL nu e activ:

1. Render Dashboard → Serviciul tău
2. Settings → Custom Domains
3. Verifică status: "SSL Certificate: Active"
4. Dacă nu e activ, așteaptă 10-30 minute

---

### PASUL 6: Testează Totul (5 minute)

#### Test 1: Domeniul Principal
```
https://mcmetsolart.com
```
✅ Ar trebui să se încarce site-ul

#### Test 2: WWW
```
https://www.mcmetsolart.com
```
✅ Ar trebui să se încarce site-ul

#### Test 3: HTTP Redirect
```
http://mcmetsolart.com
```
✅ Ar trebui să fie redirect la HTTPS

#### Test 4: API
```
https://mcmetsolart.com/api/health
```
✅ Ar trebui să răspundă cu: `{"success": true}`

#### Test 5: Funcționalități
- ✅ Înregistrare utilizator
- ✅ Login
- ✅ Formular contact
- ✅ Mobile responsive

---

## 🎨 Actualizează Site-ul (Opțional)

### Schimbă Link-urile în Footer/Header

Dacă ai link-uri hard-coded către Render, actualizează-le:

```javascript
// Înainte:
const API_URL = 'https://mcmetsolart-site-5.onrender.com/api';

// După:
const API_URL = 'https://mcmetsolart.com/api';
```

**DAR:** Configurația ta actuală detectează automat domeniul, deci nu trebuie să modifici nimic! ✅

---

## 📊 Configurare Avansată (Opțional)

### 1. Email Forwarding

Primește emailuri la `contact@mcmetsolart.com`:

**Namecheap:**
1. Domain List → Manage
2. Tab "Email Forwarding"
3. Add Forwarder:
   - From: `contact@mcmetsolart.com`
   - To: `mc_metsolart@yahoo.com`

### 2. Subdomenii

Creează subdomenii pentru diferite servicii:

```
blog.mcmetsolart.com → Blog
shop.mcmetsolart.com → Magazin
api.mcmetsolart.com → API
```

**DNS Records:**
```
Type: CNAME
Host: blog
Value: mcmetsolart-site-5.onrender.com
```

### 3. Google Search Console

Adaugă site-ul în Google pentru SEO:

1. https://search.google.com/search-console
2. Add Property: `https://mcmetsolart.com`
3. Verify ownership (DNS TXT record)
4. Submit sitemap

### 4. Google Analytics

Track vizitatori:

1. https://analytics.google.com
2. Create Property: `mcmetsolart.com`
3. Add tracking code în `index.html`

---

## 🔧 Troubleshooting

### Problema 1: "Site can't be reached"

**Cauză:** DNS nu s-a propagat încă

**Soluție:**
- Așteaptă 1-2 ore
- Verifică DNS records în Namecheap
- Verifică cu https://dnschecker.org

### Problema 2: "Not Secure" (No HTTPS)

**Cauză:** SSL nu s-a activat încă

**Soluție:**
- Așteaptă 10-30 minute
- Render Dashboard → Verifică SSL status
- Forțează refresh: Ctrl+F5

### Problema 3: "404 Not Found"

**Cauză:** DNS pointează greșit

**Soluție:**
- Verifică CNAME: `www` → `mcmetsolart-site-5.onrender.com`
- Verifică A Record: `@` → IP-ul Render
- Redeploy în Render

### Problema 4: Site vechi se încarcă

**Cauză:** Cache browser

**Soluție:**
- Clear browser cache: Ctrl+Shift+Delete
- Sau: Deschide în Incognito/Private mode
- Sau: Forțează refresh: Ctrl+F5

---

## 💰 Costuri

### Anual:
- **Domeniu:** $10-15/an
- **Hosting Render:** $0 (Free tier)
- **SSL Certificate:** $0 (Inclus de Render)
- **Email Forwarding:** $0 (Inclus de Namecheap)

**TOTAL:** ~$10-15/an

### Lunar:
- **~$1/lună** pentru domeniu
- **$0** pentru hosting (Free tier Render)

---

## 📋 Checklist Final

- [ ] Cumpărat domeniu mcmetsolart.com
- [ ] Adăugat Custom Domain în Render
- [ ] Configurat DNS Records în Namecheap
- [ ] Așteptat propagare DNS (1-2 ore)
- [ ] Verificat SSL activat (HTTPS)
- [ ] Testat https://mcmetsolart.com
- [ ] Testat https://www.mcmetsolart.com
- [ ] Testat API și funcționalități
- [ ] Configurat Email Forwarding (opțional)
- [ ] Adăugat în Google Search Console (opțional)
- [ ] 🎉 GATA!

---

## 🎉 Rezultat Final

**Înainte:**
```
https://mcmetsolart-site-5.onrender.com
```

**După:**
```
https://mcmetsolart.com
https://www.mcmetsolart.com
```

**Mult mai profesional! ✨**

---

## 📞 Suport

### Namecheap Support:
- Live Chat: https://www.namecheap.com/support/live-chat/
- Email: support@namecheap.com

### Render Support:
- Docs: https://render.com/docs/custom-domains
- Community: https://community.render.com

---

**Data:** 19 Noiembrie 2025  
**Versiune:** 1.0  
**Status:** ✅ READY TO CONFIGURE

---

## 🚀 Quick Start

1. **Cumpără:** https://www.namecheap.com → Caută `mcmetsolart.com`
2. **Configurează:** Render Dashboard → Add Custom Domain
3. **DNS:** Namecheap → Advanced DNS → Add Records
4. **Așteaptă:** 1-2 ore pentru propagare
5. **Testează:** https://mcmetsolart.com
6. **🎉 Enjoy!**

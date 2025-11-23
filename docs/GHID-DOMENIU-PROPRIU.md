# 🌐 Ghid Complet - Domeniu Propriu www.mcmetsolart.com

## 📋 PAȘI PENTRU CONFIGURARE

### Pasul 1: Cumpără Domeniul
Trebuie să cumperi domeniul **mcmetsolart.com** de la un registrar.

#### Registrari Recomandați:
1. **Namecheap** (recomandat)
   - https://www.namecheap.com
   - Preț: ~$10-15/an
   - Interfață simplă
   - WHOIS privacy gratuit

2. **GoDaddy**
   - https://www.godaddy.com
   - Preț: ~$12-20/an
   - Foarte popular

3. **Google Domains** (acum Squarespace)
   - https://domains.google
   - Preț: ~$12/an
   - Simplu și curat

4. **Cloudflare**
   - https://www.cloudflare.com/products/registrar/
   - Preț: cost (fără markup)
   - Cel mai ieftin

#### Verifică Disponibilitatea:
```
https://www.namecheap.com/domains/registration/results/?domain=mcmetsolart.com
```

---

### Pasul 2: Configurează DNS pe Render

După ce ai cumpărat domeniul:

#### A. În Render Dashboard:

1. **Accesează serviciul tău**
   ```
   https://dashboard.render.com
   → Click pe "mcmetsolart-site-5"
   ```

2. **Mergi la Settings**
   ```
   → Tab "Settings"
   → Scroll la "Custom Domain"
   ```

3. **Adaugă domeniul**
   ```
   → Click "Add Custom Domain"
   → Introdu: mcmetsolart.com
   → Click "Save"
   ```

4. **Adaugă și www**
   ```
   → Click "Add Custom Domain" din nou
   → Introdu: www.mcmetsolart.com
   → Click "Save"
   ```

5. **Notează DNS Records**
   Render îți va arăta ceva de genul:
   ```
   Type: CNAME
   Name: www
   Value: mcmetsolart-site-5.onrender.com
   
   Type: A
   Name: @
   Value: 216.24.57.1 (IP-ul Render)
   ```

---

### Pasul 3: Configurează DNS la Registrar

#### Exemplu pentru Namecheap:

1. **Login la Namecheap**
   ```
   https://www.namecheap.com
   → Sign In
   ```

2. **Mergi la Domain List**
   ```
   → Account → Domain List
   → Click "Manage" lângă mcmetsolart.com
   ```

3. **Configurează DNS**
   ```
   → Tab "Advanced DNS"
   → Click "Add New Record"
   ```

4. **Adaugă Records**

   **Record 1 - Pentru www:**
   ```
   Type: CNAME Record
   Host: www
   Value: mcmetsolart-site-5.onrender.com
   TTL: Automatic
   ```

   **Record 2 - Pentru root domain:**
   ```
   Type: A Record
   Host: @
   Value: 216.24.57.1 (IP-ul dat de Render)
   TTL: Automatic
   ```

   **Record 3 - Redirect @ către www (opțional):**
   ```
   Type: URL Redirect Record
   Host: @
   Value: https://www.mcmetsolart.com
   TTL: Automatic
   ```

5. **Salvează**
   ```
   → Click "Save All Changes"
   ```

---

### Pasul 4: Așteaptă Propagarea DNS

#### Timp de așteptare:
- **Minim**: 15-30 minute
- **Maxim**: 24-48 ore
- **Mediu**: 2-4 ore

#### Verifică propagarea:
```
https://www.whatsmydns.net/#CNAME/www.mcmetsolart.com
```

---

### Pasul 5: Activează HTTPS (SSL)

#### În Render Dashboard:

1. **Mergi la Settings**
   ```
   → Tab "Settings"
   → Scroll la "Custom Domain"
   ```

2. **Verifică SSL**
   ```
   Render va genera automat certificat SSL gratuit (Let's Encrypt)
   Status ar trebui să fie: "SSL Certificate: Active"
   ```

3. **Forțează HTTPS**
   ```
   → Scroll la "HTTPS"
   → Enable "Force HTTPS"
   → Click "Save"
   ```

---

## 🔧 CONFIGURARE AVANSATĂ

### Redirect www ↔ non-www

#### Opțiunea 1: www.mcmetsolart.com → mcmetsolart.com
```
În Namecheap:
Type: URL Redirect
Host: www
Value: https://mcmetsolart.com
```

#### Opțiunea 2: mcmetsolart.com → www.mcmetsolart.com (recomandat)
```
În Namecheap:
Type: URL Redirect
Host: @
Value: https://www.mcmetsolart.com
```

---

## 📊 VERIFICARE FINALĂ

### 1. Testează domeniul:
```bash
# Verifică DNS
nslookup www.mcmetsolart.com

# Verifică HTTPS
curl -I https://www.mcmetsolart.com
```

### 2. Testează în browser:
```
https://mcmetsolart.com
https://www.mcmetsolart.com
http://mcmetsolart.com (ar trebui să redirecționeze la HTTPS)
http://www.mcmetsolart.com (ar trebui să redirecționeze la HTTPS)
```

### 3. Verifică SSL:
```
https://www.ssllabs.com/ssltest/analyze.html?d=www.mcmetsolart.com
```

---

## 💰 COSTURI

### Domeniu:
- **Namecheap**: ~$10-15/an
- **GoDaddy**: ~$12-20/an
- **Google Domains**: ~$12/an
- **Cloudflare**: ~$8-10/an (cost)

### Hosting (Render):
- **Free Plan**: $0/lună (cu limitări)
- **Starter Plan**: $7/lună (recomandat pentru producție)

### SSL Certificate:
- **Let's Encrypt**: GRATUIT (automat prin Render)

### Total Anual:
- **Minim**: ~$10/an (doar domeniu, Render free)
- **Recomandat**: ~$94/an ($10 domeniu + $7×12 Render)

---

## 🚀 DUPĂ CONFIGURARE

### Actualizează link-urile:

1. **În cod (opțional)**
   ```javascript
   // js/api-config-production.js
   const API_URLS = {
       production: 'https://www.mcmetsolart.com/api'
   };
   ```

2. **Google Search Console**
   ```
   Adaugă www.mcmetsolart.com
   Verifică proprietatea
   Submit sitemap
   ```

3. **Social Media**
   ```
   Actualizează link-urile pe:
   - Facebook
   - Instagram
   - LinkedIn
   - etc.
   ```

4. **Google My Business**
   ```
   Actualizează website-ul
   ```

---

## 🔍 TROUBLESHOOTING

### Problema 1: "DNS_PROBE_FINISHED_NXDOMAIN"
**Cauză**: DNS nu s-a propagat încă  
**Soluție**: Așteaptă 2-4 ore

### Problema 2: "Your connection is not private"
**Cauză**: SSL nu s-a generat încă  
**Soluție**: Așteaptă 15-30 minute după propagarea DNS

### Problema 3: "Site can't be reached"
**Cauză**: DNS records greșite  
**Soluție**: Verifică că ai introdus corect CNAME și A records

### Problema 4: Domeniul nu se deschide
**Cauză**: Render nu a activat domeniul  
**Soluție**: Verifică în Render Dashboard că domeniul e "Active"

---

## 📞 SUPORT

### Render Support:
- https://render.com/docs/custom-domains
- support@render.com

### Namecheap Support:
- https://www.namecheap.com/support/
- Live chat 24/7

---

## ✅ CHECKLIST

- [ ] Cumpără domeniul mcmetsolart.com
- [ ] Adaugă domeniul în Render Dashboard
- [ ] Configurează DNS records (CNAME + A)
- [ ] Așteaptă propagarea DNS (2-4 ore)
- [ ] Verifică SSL (automat)
- [ ] Activează Force HTTPS
- [ ] Testează www.mcmetsolart.com
- [ ] Testează mcmetsolart.com
- [ ] Configurează redirect (www ↔ non-www)
- [ ] Actualizează link-uri social media
- [ ] Adaugă în Google Search Console

---

## 🎯 REZULTAT FINAL

După configurare, vei avea:
- ✅ **www.mcmetsolart.com** - domeniu profesional
- ✅ **HTTPS** - securitate SSL gratuită
- ✅ **Redirect automat** - http → https
- ✅ **Email profesional** (opțional, cu Google Workspace)

---

## 📧 BONUS: Email Profesional

### Opțiuni pentru email@mcmetsolart.com:

1. **Google Workspace** (recomandat)
   - Preț: $6/user/lună
   - Gmail profesional
   - Google Drive, Calendar, Meet
   - https://workspace.google.com

2. **Zoho Mail**
   - Preț: GRATUIT (până la 5 users)
   - Funcționalități de bază
   - https://www.zoho.com/mail/

3. **ProtonMail**
   - Preț: €3.99/lună
   - Privacy focus
   - https://proton.me/mail

---

✨ **DOMENIUL TĂU PROPRIU TE AȘTEAPTĂ!** ✨

Urmează pașii și în câteva ore vei avea www.mcmetsolart.com live! 🚀

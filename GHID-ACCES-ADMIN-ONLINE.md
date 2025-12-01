# 🔐 Ghid Acces Panou Admin Online

## 📍 URL-uri importante

### Site Principal (Public):
```
https://mcmetsolart-site.onrender.com
```

### Panou Admin (Privat - LOCAL DOAR):
```
file:///C:/Users/Mc_me/Desktop/McMetSolArt.sitoWEB/admin-private/admin-professional.html
```

## ⚠️ IMPORTANT: Panoul Admin este LOCAL

**Panoul de admin NU este disponibil online din motive de securitate!**

Panoul admin funcționează doar LOCAL pe computerul tău și se conectează la API-ul online.

## 🚀 Cum deschizi panoul de admin

### Metoda 1: Direct din Windows Explorer

1. **Deschide Windows Explorer** (Win + E)
2. **Navighează la:**
   ```
   C:\Users\Mc_me\Desktop\McMetSolArt.sitoWEB\admin-private\
   ```
3. **Dublu-click pe:**
   ```
   admin-professional.html
   ```
4. **Se va deschide în browser-ul tău implicit**

### Metoda 2: Din Visual Studio Code

1. **Deschide VS Code**
2. **Deschide folderul proiectului**
3. **Navighează la:** `admin-private/admin-professional.html`
4. **Click dreapta → Open with Live Server** (dacă ai extensia)
   SAU
5. **Click dreapta → Reveal in File Explorer → Dublu-click pe fișier**

### Metoda 3: Din Browser Direct

1. **Deschide Chrome/Firefox/Edge**
2. **Apasă Ctrl + O** (Open File)
3. **Navighează la:**
   ```
   C:\Users\Mc_me\Desktop\McMetSolArt.sitoWEB\admin-private\admin-professional.html
   ```
4. **Click Open**

## 🔑 Autentificare Admin

### Credențiale Admin:

**Email:**
```
admin@mcmetsolart.com
```

**Parolă:**
```
Admin123!@#
```

### Pași de autentificare:

1. **Deschide panoul admin** (vezi metodele de mai sus)
2. **Introdu email-ul:** `admin@mcmetsolart.com`
3. **Introdu parola:** `Admin123!@#`
4. **Click pe "Login"**
5. **Vei fi autentificat și vei vedea dashboard-ul**

## 🌐 Conexiune la Server

Panoul admin LOCAL se conectează automat la serverul online:

```
Backend API: https://mcmetsolart-backend.onrender.com
```

**Ce înseamnă asta?**
- Panoul admin rulează LOCAL pe computerul tău
- Datele (utilizatori, comenzi) sunt pe serverul ONLINE
- Când faci modificări în admin, se salvează pe server
- Clienții văd modificările tale în timp real pe site

## 📊 Ce poți face în panoul admin

### 1. Dashboard
- Vezi statistici generale
- Total utilizatori înregistrați
- Total comenzi
- Venituri totale

### 2. Utilizatori
- Vezi toți clienții înregistrați
- Vezi detalii profil client
- Editează informații client
- Șterge utilizatori

### 3. Comenzi
- **PLASEAZĂ comenzi noi pentru clienți**
- Vezi toate comenzile din sistem
- Actualizează status comenzi:
  - În așteptare
  - Confirmat
  - În procesare
  - Expediat
  - Livrat
  - Anulat
- Adaugă tracking number
- Adaugă note admin

### 4. Produse (dacă este implementat)
- Adaugă produse noi
- Editează prețuri
- Gestionează stoc

## 🔄 Cum plasezi o comandă pentru un client

### Pași:

1. **Deschide panoul admin**
2. **Mergi la secțiunea "Utilizatori"**
3. **Selectează clientul** pentru care vrei să plasezi comanda
4. **Click pe "Plasează Comandă"** sau "New Order"
5. **Completează detaliile:**
   - Selectează produse
   - Adaugă cantități
   - Setează prețuri
   - Adaugă note
6. **Click "Salvează Comanda"**
7. **Clientul va vedea comanda în panoul său**

## 👥 Cum vede clientul comanda

### Din perspectiva clientului:

1. **Clientul se autentifică pe site:**
   ```
   https://mcmetsolart-site.onrender.com
   ```

2. **Click pe iconița de profil** (sus-dreapta)

3. **Se deschide panoul de cont**

4. **Secțiunea "Comenzile Mele":**
   - Vede comanda plasată de tine
   - Vede statusul comenzii
   - Vede produsele și prețurile
   - Vede data comenzii
   - NU poate modifica sau anula

5. **Dashboard-ul clientului:**
   - Total comenzi
   - Total cheltuit
   - Comenzi active

## 🔒 Securitate

### De ce panoul admin este LOCAL?

1. **Securitate maximă** - Nu este expus pe internet
2. **Acces controlat** - Doar tu poți accesa de pe computerul tău
3. **Protecție împotriva atacurilor** - Hackerii nu pot găsi panoul
4. **Conexiune sigură** - API-ul folosește HTTPS și token-uri

### Recomandări:

- ✅ Nu partaja credențialele admin cu nimeni
- ✅ Păstrează fișierul `admin-professional.html` doar pe computerul tău
- ✅ Nu încărca folderul `admin-private/` pe server
- ✅ Schimbă parola admin periodic
- ✅ Folosește o parolă puternică

## 🆘 Probleme comune și soluții

### Problema 1: "Nu se încarcă datele"

**Soluție:**
- Verifică conexiunea la internet
- Verifică că serverul este pornit: https://mcmetsolart-backend.onrender.com
- Deschide Console (F12) și verifică erorile

### Problema 2: "Invalid credentials"

**Soluție:**
- Verifică email-ul: `admin@mcmetsolart.com`
- Verifică parola: `Admin123!@#`
- Asigură-te că nu ai spații înainte/după

### Problema 3: "CORS error"

**Soluție:**
- Deschide fișierul direct (nu prin Live Server)
- Sau configurează Live Server să permită CORS

### Problema 4: "Serverul nu răspunde"

**Soluție:**
- Serverul Render se oprește după 15 minute de inactivitate
- Deschide site-ul public mai întâi: https://mcmetsolart-site.onrender.com
- Așteaptă 30-60 secunde ca serverul să pornească
- Apoi deschide panoul admin

## 📱 Acces de pe alte dispozitive

### Vrei să accesezi admin-ul de pe alt computer?

**Opțiuni:**

1. **Copiază folderul `admin-private/`** pe celălalt computer
2. **Deschide `admin-professional.html`** din noul loc
3. **Autentifică-te cu aceleași credențiale**

### Vrei să accesezi de pe telefon/tabletă?

**Nu este recomandat** din motive de securitate și UX, dar poți:

1. Încarcă `admin-professional.html` într-un cloud (Google Drive, Dropbox)
2. Deschide fișierul de pe telefon
3. Autentifică-te

**ATENȚIE:** Nu este optimizat pentru mobile!

## 🎯 Rezumat rapid

### Pentru a deschide admin-ul:

```
1. Windows Explorer → C:\Users\Mc_me\Desktop\McMetSolArt.sitoWEB\admin-private\
2. Dublu-click pe admin-professional.html
3. Login: admin@mcmetsolart.com / Admin123!@#
4. Gata! Poți gestiona comenzi și clienți
```

### Pentru a plasa o comandă:

```
1. Deschide admin
2. Secțiunea "Utilizatori"
3. Selectează client
4. "Plasează Comandă"
5. Completează detalii
6. Salvează
7. Clientul vede comanda automat
```

## 📞 Suport

Dacă întâmpini probleme:

1. **Verifică console-ul browser** (F12 → Console)
2. **Verifică că serverul este pornit**
3. **Verifică conexiunea la internet**
4. **Reîncearcă după 1-2 minute**

---

**Ultima actualizare:** Decembrie 2024
**Versiune:** 1.0
**Status:** ✅ Funcțional

# 🔍 Debug Login Issue - Eroare 500

## 🚨 Problema

Când încerci să te loghezi pe site, primești eroare de server (500).

## 🔎 Cauze Posibile

### 1. Baza de date nu este inițializată
- Render folosește `/tmp/` pentru SQLite (se șterge la fiecare deploy)
- Tabelele nu există sau sunt goale

### 2. Utilizatorul nu există
- Trebuie să te înregistrezi mai întâi
- Baza de date s-a resetat la ultimul deploy

### 3. Eroare în cod
- Problema cu password hashing
- Problema cu token generation

## ✅ Soluții

### Soluția 1: Înregistrează-te din nou (RAPID)

**Pasul 1:** Deschide site-ul
```
https://mcmetsolart-site-5.onrender.com
```

**Pasul 2:** Click pe "Login" în header

**Pasul 3:** Click pe "Creează cont nou"

**Pasul 4:** Completează formularul:
- Email: [email-ul tău]
- Parolă: [parola ta]
- Prenume: [prenumele tău]
- Nume: [numele tău]

**Pasul 5:** Click "Creează Cont"

**Pasul 6:** Încearcă să te loghezi cu credențialele noi

---

### Soluția 2: Verifică Logs în Render

**Pasul 1:** Deschide Render Dashboard
```
https://dashboard.render.com
```

**Pasul 2:** Click pe serviciul tău: **mcmetsolart-site-5**

**Pasul 3:** Click pe tab **"Logs"**

**Pasul 4:** Caută erori:
- Scroll jos la cele mai recente logs
- Caută linii cu "❌" sau "ERROR"
- Caută "Traceback" (erori Python)

**Pasul 5:** Copiază eroarea și trimite-mi-o

---

### Soluția 3: Verifică Environment Variables

**Pasul 1:** Render Dashboard → Serviciul tău

**Pasul 2:** Click pe **"Environment"** în sidebar

**Pasul 3:** Verifică că ai:
- `DATABASE` = `mc_metsolart.db`
- `FLASK_DEBUG` = `False`
- `HOST` = `0.0.0.0`

**Pasul 4:** Dacă lipsește ceva, adaugă și redeploy

---

### Soluția 4: Redeploy cu Clear Cache

**Pasul 1:** Render Dashboard → Serviciul tău

**Pasul 2:** Click pe **"Manual Deploy"**

**Pasul 3:** Click **"Clear build cache & deploy"**

**Pasul 4:** Așteaptă 10-15 minute

**Pasul 5:** Încearcă din nou

---

## 🧪 Test Rapid

### Test 1: Verifică Backend
```bash
curl https://mcmetsolart-site-5.onrender.com/api/health
```

Ar trebui să vezi:
```json
{"success": true, "status": "healthy"}
```

### Test 2: Încearcă Register
Deschide Console în browser (F12) și rulează:

```javascript
fetch('https://mcmetsolart-site-5.onrender.com/api/auth/register', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    email: 'test' + Date.now() + '@test.com',
    password: 'test123456',
    password_confirmation: 'test123456',
    first_name: 'Test',
    last_name: 'User',
    language: 'ro'
  })
})
.then(r => r.json())
.then(data => {
  console.log('Register result:', data);
  if (data.success) {
    console.log('✅ Register OK! Token:', data.data.token);
  } else {
    console.log('❌ Register failed:', data.message);
  }
})
.catch(err => console.error('❌ Error:', err));
```

### Test 3: Încearcă Login
După register, încearcă login:

```javascript
fetch('https://mcmetsolart-site-5.onrender.com/api/auth/login', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    email: 'test@test.com',
    password: 'test123456'
  })
})
.then(r => r.json())
.then(data => {
  console.log('Login result:', data);
  if (data.success) {
    console.log('✅ Login OK! Token:', data.data.token);
  } else {
    console.log('❌ Login failed:', data.message);
  }
})
.catch(err => console.error('❌ Error:', err));
```

---

## 🔧 Fix Permanent: Folosește PostgreSQL

SQLite pe Render se resetează la fiecare deploy. Pentru producție, recomand PostgreSQL.

### Pasul 1: Creează PostgreSQL Database în Render

1. Render Dashboard → "New" → "PostgreSQL"
2. Name: `mcmetsolart-db`
3. Plan: Free
4. Create Database

### Pasul 2: Actualizează app.py

Schimbă de la SQLite la PostgreSQL (necesită modificări în cod).

**SAU**

### Alternativă: Folosește External Database

- **Supabase** (PostgreSQL gratuit)
- **PlanetScale** (MySQL gratuit)
- **MongoDB Atlas** (MongoDB gratuit)

---

## 📋 Checklist Debug

- [ ] Verificat Render Logs pentru erori
- [ ] Verificat Environment Variables
- [ ] Încercat să te înregistrezi din nou
- [ ] Testat cu Console JavaScript
- [ ] Verificat că backend-ul funcționează (/api/health)
- [ ] Clear cache & redeploy
- [ ] Considerat PostgreSQL pentru producție

---

## 🆘 Dacă problema persistă

### Trimite-mi:

1. **Screenshot** cu eroarea din browser
2. **Logs** din Render (ultimele 50 linii)
3. **Console errors** din browser (F12 → Console)
4. **Network tab** din browser (F12 → Network → click pe request-ul failed)

### Sau:

Încearcă să rulezi local pentru a vedea eroarea exactă:

```bash
cd McMetSolArtBackend
python app.py
```

Apoi testează login local și vezi eroarea în terminal.

---

## 💡 Soluție Rapidă (99% funcționează)

**Înregistrează-te din nou pe site!**

Baza de date SQLite pe Render se resetează la fiecare deploy, deci utilizatorii vechi nu mai există.

1. Deschide: https://mcmetsolart-site-5.onrender.com
2. Click "Login" → "Creează cont nou"
3. Completează formularul
4. Încearcă să te loghezi

**Ar trebui să funcționeze! ✅**

---

**Data:** 19 Noiembrie 2025  
**Status:** 🔍 DEBUGGING

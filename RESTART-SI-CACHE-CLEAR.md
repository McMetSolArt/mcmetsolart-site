# 🔄 Restart Complet și Cache Clear

## 🎯 Când să Folosești

Folosește acest ghid când:
- ✅ Nu vezi modificările CSS/JS noi
- ✅ Site-ul arată vechi
- ✅ Funcționalități noi nu funcționează
- ✅ Vrei un restart complet fresh

---

## 🚀 Metoda 1: Script Automat (Recomandat)

### Windows

**Dublu-click pe:**
```
restart-fresh.bat
```

**Ce face:**
1. ✅ Oprește toate serverele Python
2. ✅ Pornește Backend (port 5000)
3. ✅ Pornește Frontend (port 4000)
4. ✅ Deschide pagina de clear cache
5. ✅ Deschide site-ul cu cache bypass

---

## 🔧 Metoda 2: Manual

### Pasul 1: Oprește Serverele

**Windows:**
```cmd
taskkill /F /IM python.exe
```

**Linux/Mac:**
```bash
pkill -f python
```

### Pasul 2: Pornește Backend

```cmd
cd McMetSolArtBackend
python app.py
```

**Verifică:** http://localhost:5000 (ar trebui să răspundă)

### Pasul 3: Pornește Frontend

**În alt terminal:**
```cmd
python server_static.py
```

**Verifică:** http://localhost:4000 (ar trebui să răspundă)

### Pasul 4: Clear Cache Browser

**Opțiunea A: Pagină Automată**
```
http://localhost:4000/clear-cache-account.html
```
Click "Clear Cache și Reload"

**Opțiunea B: Manual**
- Chrome/Edge: `Ctrl + Shift + Delete`
- Firefox: `Ctrl + Shift + Delete`
- Safari: `Cmd + Option + E`

### Pasul 5: Hard Refresh

**Deschide site-ul cu:**
```
http://localhost:4000/?v=12345
```

Sau apasă:
- Windows: `Ctrl + F5` sau `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

---

## 🧪 Verificare Modificări

### 1. Auto-Hide Header

**Test:**
1. Deschide: http://localhost:4000
2. Scroll în jos → Header se ascunde
3. Scroll în sus → Header apare

**Verifică în Console (F12):**
```
✅ Auto-hide header initialized
```

### 2. Account Panel Texte Ascunse

**Test:**
1. Verifică pagina principală
2. Scroll în jos până la footer
3. NU ar trebui să vezi texte: "Contul Meu", "Panou de control", etc.

**Verifică în DevTools:**
```css
.account-panel-redesign {
    visibility: hidden;
    opacity: 0;
}
```

### 3. Mobile Hamburger Menu

**Test:**
1. Redimensionează browser < 768px
2. Deschide Account Panel
3. Ar trebui să vezi butonul hamburger (3 linii)

### 4. Traduceri Sincronizate

**Test:**
1. Schimbă limba în pagina principală
2. Deschide Account Panel
3. Limba ar trebui să fie sincronizată

### 5. Upload Avatar

**Test:**
1. Login: `demo@mc.com` / `demo123`
2. Account → Profile → "Schimbă Poza"
3. Upload o imagine
4. Ar trebui să apară instant

---

## 🔍 Troubleshooting

### Modificările nu se văd încă

**Soluție 1: Force Reload**
```
Ctrl + Shift + R (Windows)
Cmd + Shift + R (Mac)
```

**Soluție 2: Clear Cache Complet**
```
1. F12 (DevTools)
2. Right-click pe Reload
3. "Empty Cache and Hard Reload"
```

**Soluție 3: Incognito Mode**
```
Ctrl + Shift + N (Chrome/Edge)
Ctrl + Shift + P (Firefox)
```

**Soluție 4: Verifică Versioning**
```
F12 → Network → Caută fișierele CSS/JS
Ar trebui să vezi: ?v=2.5 sau ?v=1.0
```

### Serverele nu pornesc

**Verifică porturile:**
```cmd
netstat -ano | findstr :4000
netstat -ano | findstr :5000
```

**Dacă sunt ocupate:**
```cmd
taskkill /F /PID [PID_NUMBER]
```

### Erori în Console

**Verifică:**
1. F12 → Console
2. Caută erori roșii
3. Verifică că toate fișierele se încarcă (Network tab)

---

## 📊 Checklist Verificare

### Servere
- ✅ Backend pornit (port 5000)
- ✅ Frontend pornit (port 4000)
- ✅ Ambele răspund la request-uri

### Cache
- ✅ Cache browser șters
- ✅ Hard refresh efectuat
- ✅ Fișiere noi încărcate (verifică versioning)

### Funcționalități Noi
- ✅ Auto-hide header funcționează
- ✅ Account Panel texte ascunse
- ✅ Mobile hamburger menu vizibil
- ✅ Traduceri sincronizate
- ✅ Upload avatar funcționează

### Browser
- ✅ Console fără erori
- ✅ Network tab - toate fișierele 200 OK
- ✅ Stiluri aplicate corect

---

## 🎯 Versiuni Fișiere

### CSS
```
css/account-panel-redesign.css?v=2.5
css/auto-hide-header.css?v=1.0
css/styles.css?v=2.0
```

### JavaScript
```
js/auto-hide-header.js (nou)
js/account-panel-redesign.js (actualizat)
js/script.js (actualizat)
```

---

## 🚀 Quick Commands

### Restart Rapid
```cmd
taskkill /F /IM python.exe & cd McMetSolArtBackend & start cmd /k python app.py & cd .. & start cmd /k python server_static.py
```

### Clear Cache și Deschide
```cmd
start http://localhost:4000/clear-cache-account.html
```

### Verificare Servere
```cmd
curl http://localhost:4000
curl http://localhost:5000
```

---

## ✅ Status Final

După restart complet, ar trebui să vezi:

- ✅ Header se ascunde când scrollezi în jos
- ✅ Header apare când scrollezi în sus
- ✅ Zero texte Account Panel în pagina principală
- ✅ Mobile hamburger menu funcțional
- ✅ Traduceri sincronizate perfect
- ✅ Upload avatar funcțional
- ✅ Toate animațiile smooth

**Site-ul MC MetSolArt complet actualizat și funcțional!** 🎉

---

**Data:** 30 Noiembrie 2024  
**Versiune:** 2.6 - Restart Fresh  
**Status:** ✅ SERVERE PORNITE

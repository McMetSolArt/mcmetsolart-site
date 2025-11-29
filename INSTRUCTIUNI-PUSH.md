# 📤 ÎNCARCĂ CODUL PE GITHUB

## ✅ Git este pregătit! Acum trebuie să încarci codul.

---

## 🚀 METODA 1: Automată (Recomandată)

**Dublu-click pe:**
```
PUSH-TO-GITHUB.bat
```

**Dacă îți cere autentificare:**
- Username: `McMetSolArt`
- Password: **Personal Access Token** (NU parola GitHub!)

---

## 🔑 CUM GENEREZI PERSONAL ACCESS TOKEN

**Dacă îți cere parolă și nu merge:**

1. **Deschide:** https://github.com/settings/tokens
2. **Click:** "Generate new token" → "Generate new token (classic)"
3. **Completează:**
   - Note: `mcmetsolart-site-deploy`
   - Expiration: `No expiration` (sau 90 days)
   - **Bifează:** ☑️ `repo` (toate sub-opțiunile)
4. **Click:** "Generate token"
5. **COPIAZĂ TOKEN-UL** (îl vezi o singură dată!)
6. **Folosește-l ca parolă** când Git îți cere

---

## 🚀 METODA 2: Manual (PowerShell)

**Deschide PowerShell în folderul proiectului:**

```powershell
git push -u origin main
```

**Dacă îți cere autentificare:**
- Username: `McMetSolArt`
- Password: `token-ul generat mai sus`

---

## ✅ VERIFICARE

**După încărcare, deschide:**
```
https://github.com/McMetSolArt/mcmetsolart-site
```

**Ar trebui să vezi:**
- ✅ Toate fișierele
- ✅ Foldere: css/, js/, images/, McMetSolArtBackend/
- ✅ README.md
- ✅ Commit recent

**🔒 NU ar trebui să vezi:**
- admin-private/ (exclus automat)
- DOCS-ARHIVA/ (exclus automat)
- TESTE-ARHIVA/ (exclus automat)

---

## 🎯 URMĂTORUL PAS

**După ce codul este pe GitHub:**

1. **Deschide:** https://render.com
2. **Login** (sau creează cont cu GitHub)
3. **Click:** "New +" → "Web Service"
4. **Selectează:** `mcmetsolart-site`
5. **Click:** "Connect"
6. **Render va detecta automat configurarea!**
7. **Click:** "Create Web Service"
8. **Așteaptă 5-10 minute...**
9. **GATA! Site-ul este LIVE!** 🎉

---

## 🐛 PROBLEME?

### Eroare: "remote origin already exists"
```powershell
git remote remove origin
git remote add origin https://github.com/McMetSolArt/mcmetsolart-site.git
git push -u origin main
```

### Eroare: "Authentication failed"
- Folosește Personal Access Token (nu parola GitHub)
- Vezi instrucțiunile de mai sus

### Eroare: "Permission denied"
- Verifică că ești logat cu contul corect
- Verifică că ai acces la repository

---

**SUCCES!** 🚀

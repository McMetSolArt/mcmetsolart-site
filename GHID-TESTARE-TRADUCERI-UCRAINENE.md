# 🧪 GHID TESTARE TRADUCERI UCRAINENE

## Data: 1 Decembrie 2024

## 📋 CHECKLIST TESTARE

### Pregătire
- [ ] Pagina este deschisă: http://localhost:4000
- [ ] Browser-ul este actualizat (Ctrl+Shift+R)
- [ ] Ești logat cu un cont de test

---

## 🔍 TESTARE PAS CU PAS

### PASUL 1: Verificare Selector Limbă
1. **Locație:** Sus-dreapta, lângă butonul de temă
2. **Acțiune:** Click pe butonul cu globul 🌐
3. **Verifică:** Ar trebui să vezi opțiunea "🇺🇦 Українська"

**✅ Rezultat așteptat:**
```
🇷🇴 Română
🇺🇦 Українська  ← Aceasta trebuie să existe
🇮🇹 Italiano
🇬🇧 English
```

---

### PASUL 2: Schimbă Limba în Ucraineană
1. **Acțiune:** Click pe "🇺🇦 Українська"
2. **Verifică:** Pagina se reîncarcă și textele se schimbă

**✅ Rezultat așteptat:**
- Meniul de navigare se traduce
- Butoanele se traduc
- Textele din pagină se traduc

---

### PASUL 3: Deschide Panoul de Client
1. **Acțiune:** Click pe butonul de utilizator (sus-dreapta)
2. **Verifică:** Se deschide dropdown-ul cu opțiuni

**✅ Rezultat așteptat:**
Ar trebui să vezi în ucraineană:
- "Панель" (Dashboard)
- "Мій Профіль" (Profil)
- "Замовлення" (Comenzi)
- "Налаштування" (Setări)

---

### PASUL 4: Testare Dashboard
1. **Acțiune:** Click pe "Панель" (Dashboard)
2. **Verifică:** Panelul se deschide cu conținut în ucraineană

**✅ Traduceri de verificat:**

| Element | Ucraineană | Română |
|---------|-----------|--------|
| Titlu bun venit | "Ласкаво просимо, [Nume]!" | "Bun venit, [Nume]!" |
| Descriere | "Це ваша особиста панель" | "Acesta este dashboard-ul tău" |
| Statistici | "Всього Замовлень" | "Total Comenzi" |
| Statistici | "Всього Витрачено" | "Total Cheltuit" |
| Statistici | "Активні Замовлення" | "Comenzi Active" |
| Informații | "Швидка інформація" | "Informații Rapide" |
| Câmpuri | "Повне ім'я" | "Nume Complet" |
| Câmpuri | "Телефон" | "Telefon" |
| Câmpuri | "Країна" | "Țară" |
| Butoane | "Редагувати Профіль" | "Editează Profilul" |
| Butoane | "Переглянути Замовлення" | "Vezi Comenzile" |

---

### PASUL 5: Testare Profil
1. **Acțiune:** Click pe tab-ul "Мій Профіль"
2. **Verifică:** Secțiunea profil se deschide în ucraineană

**✅ Traduceri de verificat:**

| Element | Ucraineană | Română |
|---------|-----------|--------|
| Titlu | "Мій Профіль" | "Profilul Meu" |
| Subtitlu | "Керуйте своєю особистою інформацією" | "Gestionează informațiile tale" |
| Secțiuni | "Особиста Інформація" | "Informații Personale" |
| Câmpuri | "Ім'я" | "Prenume" |
| Câmpuri | "Прізвище" | "Nume" |
| Câmpuri | "Місто" | "Oraș" |
| Câmpuri | "Повна Адреса" | "Adresă Completă" |
| Butoane | "Редагувати Профіль" | "Editează Profilul" |

---

### PASUL 6: Testare Mod Editare Profil
1. **Acțiune:** Click pe "Редагувати Профіль"
2. **Verifică:** Formularul de editare apare în ucraineană

**✅ Traduceri de verificat:**

| Element | Ucraineană | Română |
|---------|-----------|--------|
| Titlu | "Редагувати Профіль" | "Editează Profilul" |
| Subtitlu | "Оновіть свою особисту інформацію" | "Actualizează informațiile" |
| Label-uri | "обов'язково" | "obligatoriu" |
| Placeholder | "Вибрати" | "Selectează" |
| Butoane | "Зберегти Зміни" | "Salvează Modificările" |
| Butoane | "Скасувати" | "Anulează" |

---

### PASUL 7: Testare Comenzi
1. **Acțiune:** Click pe tab-ul "Замовлення"
2. **Verifică:** Secțiunea comenzi se deschide în ucraineană

**✅ Traduceri de verificat:**

| Element | Ucraineană | Română |
|---------|-----------|--------|
| Titlu | "Мої Замовлення" | "Comenzile Mele" |
| Subtitlu | "Переглядайте та керуйте своїми замовленнями" | "Vizualizează și gestionează" |
| Mesaj gol | "Поки немає замовлень" | "Nu ai comenzi încă" |
| Text gol | "Коли ви зробите замовлення, ви побачите його тут" | "Când vei plasa o comandă..." |
| Loading | "Завантаження..." | "Se încarcă..." |

---

### PASUL 8: Testare Setări
1. **Acțiune:** Click pe tab-ul "Налаштування"
2. **Verifică:** Secțiunea setări se deschide în ucraineană

**✅ Traduceri de verificat:**

| Element | Ucraineană | Română |
|---------|-----------|--------|
| Titlu | "Налаштування Облікового Запису" | "Setări Cont" |
| Secțiune | "Безпека" | "Securitate" |
| Descriere | "Керуйте безпекою свого облікового запису" | "Gestionează securitatea" |
| Buton | "Змінити Пароль" | "Schimbă Parola" |
| Secțiune | "Переваги" | "Preferințe" |
| Limbă | "Українська" | "Română" |
| Buton | "Вийти" | "Deconectare" |

---

### PASUL 9: Testare Mesaje de Confirmare
1. **Acțiune:** Click pe "Вийти" (Deconectare)
2. **Verifică:** Mesajul de confirmare apare în ucraineană

**✅ Rezultat așteptat:**
- Mesaj: "Ви впевнені, що хочете вийти?"
- (Traducere: "Ești sigur că vrei să te deconectezi?")

---

## 📊 REZULTATE TESTARE

### Completează după testare:

**Dashboard:**
- [ ] Toate textele traduse corect
- [ ] Butoanele funcționează
- [ ] Layout-ul arată bine

**Profil:**
- [ ] Toate textele traduse corect
- [ ] Formularul de editare funcționează
- [ ] Validările funcționează

**Comenzi:**
- [ ] Toate textele traduse corect
- [ ] Mesajele de stare sunt corecte
- [ ] Butoanele funcționează

**Setări:**
- [ ] Toate textele traduse corect
- [ ] Selectorul de limbă funcționează
- [ ] Butonul de deconectare funcționează

---

## 🐛 PROBLEME GĂSITE

Notează aici orice probleme:

1. _______________________________________________
2. _______________________________________________
3. _______________________________________________

---

## ✅ CONCLUZIE

**Traducerile ucrainene sunt:**
- [ ] ✅ Complete și funcționale
- [ ] ⚠️ Funcționale cu mici probleme
- [ ] ❌ Nu funcționează

**Note suplimentare:**
_________________________________________________
_________________________________________________
_________________________________________________

---

## 🔄 TESTARE SUPLIMENTARĂ

### Test Sincronizare Limba
1. Cu panoul deschis, schimbă limba din ucraineană în română
2. Verifică că panelul se actualizează automat
3. Schimbă înapoi în ucraineană
4. Verifică că traducerile revin

### Test Persistență
1. Închide panelul
2. Reîncarcă pagina (F5)
3. Deschide din nou panelul
4. Verifică că limba ucraineană este păstrată

---

## 📝 RAPORT FINAL

După ce completezi toate testele, creează un raport cu:
- Ce funcționează perfect ✅
- Ce are probleme minore ⚠️
- Ce nu funcționează deloc ❌
- Sugestii de îmbunătățire 💡

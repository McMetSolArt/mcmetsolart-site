# 📋 STRUCTURA COMPLETA A CODULUI - MC MetSolArt

## 🏗️ ARHITECTURA PROIECTULUI

```
cod nou/
├── 📄 index.html              (27.6 KB) - Pagina principală
├── 🎨 styles.css              (46.5 KB) - Stiluri CSS complete
├── 📜 script.js               (106.8 KB) - Logica aplicației (traduceri, teme, funcții)
├── 🔐 auth-functions.js       (24.9 KB) - Funcții de autentificare
├── 🛣️ router.js              (5.7 KB) - Rutare hash-based
├── 👤 contul meu.html         (53.3 KB) - Dashboard utilizator
├── 👤 contul meu.js           (88.0 KB) - Logica dashboard
├── 🎨 contul meu.css          (122.1 KB) - Stiluri dashboard
├── 🖼️ IMAGINI:
│   ├── Logo.png (210 KB) - Logo
│   ├── pagina de coperta.jpg (167 KB) - Hero image
│   ├── festival.jpg (174 KB) - Produs 1
│   ├── rezidential (3).jpg (198 KB) - Produs 2
│   └── personalizate.jpg - Produs 3 (Proiecte Personalizate)
└── 📝 script-i18n.js, script-main.js (Teste - NU SE FOLOSEŞTE)
```

---

## 🌐 INDEX.HTML - STRUCTURA PAGINA PRINCIPALE

### 1️⃣ HEAD (Meta tags, Stiluri, Resurse)
- **Charset:** UTF-8
- **Viewport:** Responsive mobile-first
- **Titlu:** "Mc MetSolArt - Cupole Decorative Metalice"
- **Resurse externe:**
  - Google Fonts: Inter, Montserrat, Roboto Mono
  - Font Awesome 6.4.0 (icoane)
- **CSS Local:** styles.css
- **Favicon:** Logo PNG

### 2️⃣ BODY - SECTIUNI PRINCIPALE

#### 📦 HEADER (Navigație)
```html
<header class="header-main">
  ├── Navigație stânga (Acasă, Despre, Produse, Contact)
  ├── Logo centru
  └── Acțiuni dreapta:
      ├── Selector temă (Light/Dark/System)
      ├── Selector limbă (RO/UK/IT/EN) 🌍
      ├── Buton Login
      └── Meniu mobil (Hamburger)
```

**Atribute speciale:**
- `data-text="nav.home"` - Pentru traducere
- Responsive: Se ascunde pe mobile, se arată meniu hamburger

---

#### 🎯 HERO SECTION
```html
<section class="hero-section">
  ├── Imagine fundal (pagina de coperta.jpg)
  ├── Overlay (gradient)
  ├── Titlu: "Cupole Decorative Metalice..."
  ├── Subtitlu: "Premium craftsmanship..."
  └── Butoane CTA (Vezi Produse, Contactează-ne)
```

---

#### ℹ️ ABOUT SECTION (Despre)
```html
<section class="about-section">
  ├── Titlu: "Despre MC"
  ├── Subtitlu: "Lideri în Inovație Solară..."
  ├── Descriere: Text lung
  └── 3 FEATURE CARDS:
      ├── ☀️ Inovație Solară
      ├── 🔨 Craftsmanship de Calitate
      └── ✨ Soluții Personalizate
```

---

#### 📦 PRODUCTS SECTION (Galerie)
```html
<section class="products-section">
  └── 3 PRODUCT CARDS (Grid responsive):
      ├── Imagine + Titlu + Descriere (Festival)
      ├── Imagine + Titlu + Descriere (Rezidențial)
      └── Imagine + Titlu + Descriere (Personalizat)
```

---

#### 🔧 HOW IT WORKS SECTION (Proces)
```html
<section class="how-section">
  └── 4 STEP CARDS:
      ├── 💬 Consultare
      ├── ✏️ Design
      ├── ⚙️ Fabricație
      └── ✅ Instalare
```

---

#### 📧 CONTACT SECTION (Formular)
```html
<section class="contact-section">
  ├── Logo + Titlu
  └── FORMULAR:
      ├── Nume (required)
      ├── Email + Telefon (required + optional)
      ├── Companie (optional)
      ├── Mesaj (required)
      └── Buton "Trimite Mesaj"
```

---

#### 🔗 FOOTER (Jos)
```html
<footer>
  ├── Info companie + Logo
  ├── Link-uri rapide (Despre, Produse, Contact)
  ├── Info contact (Email, Tel, Locație)
  ├── Social media (Instagram, Facebook, TikTok)
  └── Copyright 2025
```

---

#### 🔑 LOGIN SIDEBAR (Ascuns, se deschide pe buton)
```html
<div class="login-sidebar" id="loginSidebar">
  ├── HEADER:
  │   ├── Buton "Înapoi"
  │   ├── Buton "Închide"
  │   ├── Logo
  │   └── Progress (Login / Register)
  │
  ├── LOGIN FORM (visible by default):
  │   ├── Email input (data-placeholder)
  │   ├── Password input (data-placeholder)
  │   └── Butoane: "Conectează-te" / "Înregistrează-te"
  │
  └── REGISTER FORM (hidden, se arată pe click):
      ├── Prenume input (data-placeholder)
      ├── Nume Familie input (data-placeholder)
      ├── Email input (data-placeholder)
      ├── Parolă input (data-placeholder)
      ├── Confirmare Parolă input (data-placeholder)
      └── Butoane: "Creează Cont" / "Conectează-te"
```

---

## 🎨 STYLES.CSS - STILURI COMPLETE (2594 linii)

### 1️⃣ CSS VARIABLES (TEME)

#### Light Mode (default)
```css
:root {
  --background: hsl(210, 5%, 98%)      /* Alb/Gri deschis */
  --foreground: hsl(215, 16%, 12%)     /* Negru intens */
  --primary: hsl(197, 88%, 28%)        /* Albastru */
  --card: hsl(210, 5%, 96%)            /* Gri foarte deschis */
  ...
}
```

#### Dark Mode
```css
.dark {
  --background: hsl(215, 18%, 8%)      /* Negru adânc */
  --foreground: hsl(210, 8%, 92%)      /* Alb/Gri deschis */
  --primary: hsl(197, 88%, 28%)        /* Albastru (inchis) */
  ...
}
```

### 2️⃣ COMPONENTE PRINCIPALE

#### Header Responsive
- `header-main` - Container
- `header-nav` - Navigație desktop
- `mobile-menu` - Meniu ascuns pe desktop
- `header-actions` - Selector temă, limbă, login

#### Hero Section
- `hero-section` - Full-screen hero
- `hero-bg` - Fundal cu imagine
- `hero-overlay` - Gradient overlay
- `hero-content` - Text și butoane

#### Form Styling
```css
.form-group {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: var(--foreground);
}

.form-input, .form-textarea {
  border: 1px solid var(--border);
  background: var(--background);
  color: var(--foreground);
  padding: 0.75rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(var(--primary), 0.1);
}
```

#### Responsive Design
```css
/* Mobile First */
@media (min-width: 640px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1280px) { /* Large */ }
```

---

## 📜 SCRIPT.JS - LOGICA APLICAȚIEI (2437 linii)

### 1️⃣ SISTEM DE TRADUCERI

#### Object `translations` cu 4 limbi:
```javascript
const translations = {
  ro: { /* Română - COMPLETĂ */ },
  uk: { /* Ucraineană - COMPLETĂ */ },
  it: { /* Italiană - COMPLETĂ */ },
  en: { /* Engleză - COMPLETĂ */ }
};
```

#### Structura cheilor de traducere:
```javascript
{
  // Navigation
  "nav.home": "Acasă",
  "nav.about": "Despre",
  "nav.products": "Produse",
  "nav.contact": "Contact",
  
  // Hero Section
  "hero.title": "Cupole Decorative...",
  "hero.subtitle": "Craftsmanship...",
  
  // About
  "about.title": "Despre MC",
  "about.feature1.title": "Inovație Solară",
  
  // Products
  "products.title": "Portofoliul Nostru",
  "products.card1.title": "Instalare Comercială",
  
  // Contact
  "contact.title": "Contactați-ne",
  
  // Login/Register
  "login.welcome": "Bine ai venit!",
  "login.email": "Email",
  "login.password": "Parolă",
  "login.email.placeholder": "exemplu@email.com",
  
  "register.firstName": "Prenume",
  "register.firstName.placeholder": "Prenumele tău",
  "register.lastName": "Nume de familie",
  "register.lastName.placeholder": "Numele de familie",
  "register.email": "Email",
  "register.email.placeholder": "exemplu@email.com",
  "register.password": "Parolă",
  "register.password.placeholder": "Minim 6 caractere",
  "register.confirmPassword": "Confirmă parola",
  "register.confirmPassword.placeholder": "Repetă parola",
  
  // Profile
  "profile.title": "Profilul Meu",
  "profile.logout": "Deconectare",
  
  // Virtual Assistant
  "assistant.title": "Asistent MC Premium",
  "assistant.welcome": "Bun venit la MC!",
  ...
}
```

### 2️⃣ FUNCTII DE TRADUCERE

#### `t(key)` - Funcție principală
```javascript
function t(key) {
    return translations[currentLanguage]?.[key] 
           || translations['ro'][key] 
           || key;
}
// Returnează traducerea, sau fallback la română, sau cheia
```

#### `updateTranslations()` - Aplicare traduceri
```javascript
function updateTranslations() {
    // Actualizează toate elementele cu data-text
    document.querySelectorAll('[data-text]').forEach(element => {
        const key = element.getAttribute('data-text');
        element.textContent = t(key);
    });

    // Actualizează placeholder-uri
    document.querySelectorAll('[data-placeholder]').forEach(element => {
        const key = element.getAttribute('data-placeholder');
        element.placeholder = t(key);
    });
}
```

#### `changeLanguage(lang)` - Schimbare limbă
```javascript
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updateTranslations();
    // Actualizează display-ul limbii curente
}
```

### 3️⃣ MANAGEMENTUL TEMEI

#### `initTheme()` - Inițializare temă
```javascript
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
                        ? 'dark' : 'light';
    const theme = savedTheme || systemTheme;
    
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    }
}
```

#### `setTheme(theme)` - Stabilire temă
```javascript
function setTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
}
```

#### `toggleTheme()` - Comutare temă
```javascript
function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    isDark ? 
        document.documentElement.classList.remove('dark') :
        document.documentElement.classList.add('dark');
}
```

### 4️⃣ AUTENTIFICARE & LOGIN/REGISTER

#### `handleLoginSubmit()` - Submit login
```javascript
function handleLoginSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Verificare cu localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    
    if (storedUser && storedUser.email === email && storedUser.password === password) {
        // Login succesat
        localStorage.setItem('isLoggedIn', 'true');
        showAccountPage();
    } else {
        // Eroare
        showLoginError();
    }
}
```

#### `handleRegisterSubmit()` - Submit register
```javascript
function handleRegisterSubmit(e) {
    e.preventDefault();
    const firstName = document.getElementById('registerFirstName').value;
    const lastName = document.getElementById('registerLastName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    
    // Validare
    if (password !== confirmPassword) {
        showError('Parolele nu se potrivesc');
        return;
    }
    
    if (password.length < 6) {
        showError('Parola trebuie să aibă cel puțin 6 caractere');
        return;
    }
    
    // Salvează utilizator
    localStorage.setItem('user', JSON.stringify({
        firstName, lastName, email, password
    }));
    
    // Login automat
    localStorage.setItem('isLoggedIn', 'true');
    showAccountPage();
}
```

### 5️⃣ CONTACT FORM

#### `handleContactSubmit()` - Submit contact
```javascript
function handleContactSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Simulează trimitere
    // În producție, ar trebui să trimită la server
    
    console.log('Contact:', Object.fromEntries(formData));
    showContactSuccess();
}
```

### 6️⃣ VIRTUAL ASSISTANT (Chatbot)

#### `VirtualAssistant` Class
```javascript
class VirtualAssistant {
    constructor() {
        this.isOpen = false;
        this.init();
    }
    
    init() {
        // Inițializează ChatBot UI
    }
    
    handleQuestion(question) {
        // Răspunde la întrebări predefinite
        const responses = {
            'price': translations[currentLanguage]['assistant.response.price'],
            'materials': translations[currentLanguage]['assistant.response.materials'],
            ...
        };
        
        return responses[question] || responses['greeting'];
    }
}
```

### 7️⃣ EVENT LISTENERS ȘI INIȚIALIZARE

```javascript
// La încărcarea paginii
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    updateTranslations();
    
    // Event listeners
    document.getElementById('loginBtn').addEventListener('click', openLoginSidebar);
    document.getElementById('languageBtn').addEventListener('click', toggleLanguageDropdown);
    document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);
    
    // Form handlers
    document.getElementById('loginForm').addEventListener('submit', handleLoginSubmit);
    document.getElementById('registerForm').addEventListener('submit', handleRegisterSubmit);
    document.getElementById('contactForm').addEventListener('submit', handleContactSubmit);
    
    // Language selector
    document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', () => {
            changeLanguage(option.dataset.lang);
        });
    });
});
```

---

## 🔐 AUTH-FUNCTIONS.JS - FUNCȚII AUTENTIFICARE

```javascript
// Funcții helper pentru autentificare
function isUserLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

function getUserData() {
    return JSON.parse(localStorage.getItem('user'));
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
```

---

## 🛣️ ROUTER.JS - RUTARE HASH-BASED

```javascript
// Rutare simplă pe bază de hash
const routes = {
    '#': 'home',
    '#login': 'login',
    '#register': 'register',
    '#products': 'products',
    '#contact': 'contact',
    '#profile': 'profile'
};

window.addEventListener('hashchange', () => {
    const route = routes[window.location.hash];
    loadPage(route);
});
```

---

## 📱 CARACTERISTICI RESPONSIVE

### Breakpoints
```css
/* Mobile */
min-width: 320px;

/* Small devices */
min-width: 640px;

/* Tablets */
min-width: 768px;

/* Desktop */
min-width: 1024px;

/* Large desktop */
min-width: 1280px;
```

### Elemente responsive
- Header: Se adapteaza la mobile cu meniu hamburger
- Hero: Full-width pe mobile, cu text centered
- Products: 1 coloan pe mobile, 2-3 pe desktop
- Forms: Full-width pe mobile, constrained pe desktop
- Footer: Stack pe mobile, grid pe desktop

---

## 🌍 LIMBI SUPORTATE

| Cod | Limbă | Status |
|-----|-------|--------|
| ro | Română | ✅ COMPLETĂ |
| uk | Українська | ✅ COMPLETĂ |
| it | Italiano | ✅ COMPLETĂ |
| en | English | ✅ COMPLETĂ |

---

## 🎯 CUM FUNCȚIONEAZĂ TRADUCERILE

### 1. Elementul HTML este marcat
```html
<a href="#about" class="nav-link" data-text="nav.about">Despre</a>
```

### 2. Script-ul găsește atributul `data-text`
```javascript
document.querySelectorAll('[data-text]').forEach(element => {
    const key = element.getAttribute('data-text');  // "nav.about"
    element.textContent = t(key);  // Obține din translations[currentLanguage]
});
```

### 3. Traducerea se aplică
```javascript
t('nav.about') // Returnează "Despre" (ro), "Про нас" (uk), etc.
```

### 4. Utilizatorul vede traducerea în limba dorită
```
Ro: Despre
Uk: Про нас
It: Chi Siamo
En: About
```

---

## 📊 FLUXUL DATELOR

```
Utilizator selectează limbă (click pe limba)
        ↓
changeLanguage('en') se apelează
        ↓
currentLanguage = 'en'
localStorage.setItem('language', 'en')
        ↓
updateTranslations() se apelează
        ↓
Toate elementele cu [data-text] și [data-placeholder]
se actualizează cu traducerile din translations['en']
        ↓
Pagina se reîmprospătează cu noua limbă
```

---

## ✅ CHECKLIST FUNCȚIONALITĂȚI

- ✅ Traduceri complete în 4 limbi
- ✅ Teme Light/Dark cu CSS Variables
- ✅ Login/Register cu localStorage
- ✅ Contact form (simulat)
- ✅ Virtual Assistant (chatbot)
- ✅ Responsive design mobile-first
- ✅ Smooth scroll și animații
- ✅ Dinamică UI (sidebar, dropdowns)
- ✅ Persistență date (localStorage)
- ✅ Accesibilitate (semantic HTML, ARIA labels)

---

**Ultima actualizare:** 12 Noiembrie 2025
**Status:** ✅ COMPLET ȘI FUNCȚIONAL

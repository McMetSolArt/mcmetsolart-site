# 📧 Configurare Email pentru Formularul de Contact

## Opțiuni Disponibile

Am implementat trimiterea de emailuri prin **Formspree** (serviciu gratuit). Mesajele vor ajunge la **mc_metsolart@yahoo.com**.

## Cum Funcționează

### Pasul 1: Creează Cont Formspree (GRATUIT)

1. Mergi pe **https://formspree.io/**
2. Click pe **"Get Started"** sau **"Sign Up"**
3. Înregistrează-te cu emailul **mc_metsolart@yahoo.com**
4. Verifică emailul (vei primi un link de confirmare)

### Pasul 2: Creează un Form Nou

1. După login, click pe **"+ New Form"**
2. Nume formular: **"MC MetSolArt - Contact"**
3. Email destinatar: **mc_metsolart@yahoo.com**
4. Click **"Create Form"**

### Pasul 3: Copiază Form ID

După ce creezi formularul, vei primi un **Form ID** care arată așa:
```
https://formspree.io/f/XXXXXXXX
```

Copiază partea **XXXXXXXX** (Form ID-ul tău unic)

### Pasul 4: Actualizează Codul

În fișierul `script.js`, găsește linia:
```javascript
const response = await fetch('https://formspree.io/f/xanyqbvg', {
```

Și înlocuiește `xanyqbvg` cu **Form ID-ul tău**:
```javascript
const response = await fetch('https://formspree.io/f/XXXXXXXX', {
```

### Pasul 5: Testează

1. Deschide site-ul
2. Mergi la secțiunea **Contact**
3. Completează formularul
4. Click **"Trimite Mesaj"**
5. Verifică emailul **mc_metsolart@yahoo.com** - ar trebui să primești mesajul!

## Alternativă: EmailJS (Mai Avansat)

Dacă vrei mai mult control, poți folosi **EmailJS**:

### Setup EmailJS

1. Mergi pe **https://www.emailjs.com/**
2. Înregistrează-te gratuit
3. Adaugă serviciul de email (Yahoo Mail)
4. Creează un template de email
5. Obține **Service ID**, **Template ID** și **Public Key**

### Cod pentru EmailJS

Adaugă în `<head>` din `index.html`:
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
  emailjs.init("YOUR_PUBLIC_KEY");
</script>
```

Apoi în `script.js`, înlocuiește funcția cu:
```javascript
try {
    await emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone,
        company: data.company,
        message: data.message,
        to_email: "mc_metsolart@yahoo.com"
    });
    
    showNotification('Mesaj trimis cu succes!', 'success');
    contactForm.reset();
} catch (error) {
    showNotification('Eroare la trimitere. Încearcă din nou.', 'error');
}
```

## Ce Primești în Email

Când cineva completează formularul, vei primi un email cu:
- **Nume**: Numele clientului
- **Email**: Emailul clientului (pentru răspuns)
- **Telefon**: Numărul de telefon
- **Companie**: Numele companiei (dacă a completat)
- **Mesaj**: Mesajul complet

## Limită Gratuită

**Formspree Free Plan:**
- 50 de mesaje/lună gratuit
- Suficient pentru majoritatea site-urilor mici

**EmailJS Free Plan:**
- 200 de mesaje/lună gratuit
- Mai generos pentru trafic mai mare

## Notă Importantă

⚠️ **TREBUIE să configurezi unul dintre servicii** pentru ca emailurile să funcționeze!

Fără configurare, formularul va arăta o eroare când cineva încearcă să trimită un mesaj.

## Recomandare

👉 **Folosește Formspree** - este cel mai simplu și rapid de configurat (5 minute).

# 📸 Imagini pentru Iconițe Sociale - Instrucțiuni

## Fișiere Necesare

Trebuie să adaugi următoarele imagini PNG în folderul principal al proiectului:

```
📁 Proiect/
├── instagram.png
├── facebook.png
├── tiktok.png
└── linkedin.png
```

## Specificații Imagini

### Dimensiuni Recomandate
- **Rezoluție:** 512x512px sau 1024x1024px
- **Format:** PNG cu fundal transparent
- **Culoare:** Alb sau negru (se va aplica filtru CSS)

### Unde să Găsești Iconițe

#### Opțiunea 1: Font Awesome (Recomandat)
1. Mergi pe https://fontawesome.com/icons
2. Caută: "instagram", "facebook", "tiktok", "linkedin"
3. Download ca PNG (necesită cont gratuit)

#### Opțiunea 2: Flaticon
1. Mergi pe https://www.flaticon.com/
2. Caută fiecare platformă
3. Download PNG gratuit (512x512px)

#### Opțiunea 3: Icons8
1. Mergi pe https://icons8.com/
2. Caută fiecare platformă
3. Download PNG gratuit

#### Opțiunea 4: Simple Icons
1. Mergi pe https://simpleicons.org/
2. Caută fiecare platformă
3. Download SVG și convertește la PNG

## Cum să Adaugi Imaginile

### Pasul 1: Download Iconițe
Download fiecare iconiță în format PNG cu fundal transparent.

### Pasul 2: Redenumește Fișierele
Redenumește fișierele exact așa:
- `instagram.png`
- `facebook.png`
- `tiktok.png`
- `linkedin.png`

### Pasul 3: Plasează în Folderul Proiectului
Copiază toate cele 4 fișiere în același folder cu `index.html`.

```
📁 Proiect/
├── index.html
├── instagram.png    ← aici
├── facebook.png     ← aici
├── tiktok.png       ← aici
├── linkedin.png     ← aici
├── footer.css
└── ...
```

## Cum Funcționează

### HTML
```html
<a href="https://www.instagram.com/mc.metal.art" class="social-icon-link">
    <img src="instagram.png" alt="Instagram" class="social-icon-img">
</a>
```

### CSS - Filtru Alb
```css
.social-icon-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: brightness(0) invert(1);  /* Face imaginea albă */
}
```

Filtrul CSS transformă orice culoare în alb pentru a se potrivi cu tema footer-ului.

## Testare

După ce adaugi imaginile:

1. **Deschide site-ul** în browser
2. **Scroll la footer**
3. **Verifică iconițele** - ar trebui să vezi cele 4 imagini
4. **Hover peste ele** - ar trebui să se ridice și să se mărească
5. **Click pe Instagram** - ar trebui să deschidă profilul

## Troubleshooting

### Problema: Imaginile nu se văd
**Soluție:**
- Verifică că fișierele sunt în folderul corect
- Verifică că numele sunt exact: `instagram.png`, `facebook.png`, etc.
- Verifică că sunt PNG cu fundal transparent
- Deschide Console (F12) și verifică erorile

### Problema: Imaginile sunt prea mari/mici
**Soluție:**
Ajustează în `footer.css`:
```css
.social-icon-link {
    width: 40px;    /* Mărește/micșorează aici */
    height: 40px;   /* Mărește/micșorează aici */
}
```

### Problema: Imaginile nu sunt albe
**Soluție:**
Filtrul CSS ar trebui să le facă albe automat. Dacă nu funcționează, verifică că ai salvat `footer.css` corect.

## Alternative - Dacă Nu Ai Imagini

### Opțiunea 1: Folosește Font Awesome (CDN)
Adaugă în `<head>` din `index.html`:
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
```

Apoi în HTML:
```html
<a href="..." class="social-icon-link">
    <i class="fab fa-instagram"></i>
</a>
```

### Opțiunea 2: Păstrează Emoji-urile
Dacă nu vrei să folosești imagini, poți păstra emoji-urile:
```html
<a href="..." class="social-icon-link">
    📷
</a>
```

## Recomandări

### Pentru Aspect Profesional
✅ Folosește iconițe PNG de înaltă calitate (512x512px)  
✅ Asigură-te că toate au același stil (outline sau filled)  
✅ Folosește fundal transparent  
✅ Păstrează proporțiile pătrate (1:1)

### Stil Consistent
Toate iconițele ar trebui să fie:
- Același stil (toate outline SAU toate filled)
- Aceeași grosime de linie
- Același nivel de detaliu

## Resurse Gratuite

### Iconițe Gratuite de Calitate
1. **Flaticon** - https://www.flaticon.com/ (gratuit cu atribuire)
2. **Icons8** - https://icons8.com/ (gratuit până la 100/zi)
3. **Iconscout** - https://iconscout.com/ (multe gratuite)
4. **Iconfinder** - https://www.iconfinder.com/ (filtru gratuit)

### Generatoare de Iconițe
1. **Favicon.io** - https://favicon.io/ (pentru favicon)
2. **RealFaviconGenerator** - https://realfavicongenerator.net/

## Rezultat Final

După ce adaugi imaginile, footer-ul va arăta astfel:

```
Urmărește-ne:
[📷] [📘] [🎵] [💼]
 ↑    ↑    ↑    ↑
 PNG  PNG  PNG  PNG
```

Iconițele vor fi:
- ✅ Albe (prin filtru CSS)
- ✅ 40x40px
- ✅ Cu hover effects
- ✅ Clickable
- ✅ Responsive

---

**Notă:** Dacă nu ai imaginile acum, site-ul va arăta iconițele ca "broken images" (🖼️❌). Adaugă imaginile cât mai curând pentru aspect profesional!

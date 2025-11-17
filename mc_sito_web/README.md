# MC MetSolArt Website - Production Ready

Pachet complet pentru publicare pe Render (gratis).

## 📋 Structură

```
├── index.html              # Frontend main
├── css/                    # Styles
├── js/                     # JavaScript files
├── images/                 # Product images
├── app.py                  # Backend Flask API + static serving
├── migrate_add_api_token.py # Database migration
├── requirements.txt        # Python dependencies
├── .env.example           # Environment template
├── render.yaml            # Render deployment config
├── .gitignore             # Git exclusions
├── start.sh               # Startup script
└── RENDER_SETUP_RO.txt    # Setup instructions (Romanian)
```

## 🚀 Quick Start

1. **Inițializare Git**
   ```
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push pe GitHub**
   ```
   git remote add origin https://github.com/YOUR_USERNAME/mcmetsolart-site.git
   git push -u origin main
   ```

3. **Deploy pe Render**
   - Merge la https://render.com
   - New Web Service → GitHub
   - Selectează repo-ul
   - Build: `pip install -r requirements.txt`
   - Start: `bash start.sh`

4. **Testare**
   - https://your-app.onrender.com → Site
   - https://your-app.onrender.com/api/health → Health check

## 📖 Full Instructions

Vezi `RENDER_SETUP_RO.txt` pentru instrucțiuni complete pas-cu-pas în limba română.

## 🔧 Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Run locally
python app.py
```

Accesează: http://localhost:5000

## ✅ Pre-deployment Checklist

- [x] Frontend static files (HTML, CSS, JS, images)
- [x] Backend API (app.py with permanent token support)
- [x] Database migration script
- [x] Environment variables configured
- [x] Render config (render.yaml)
- [x] Git ignore file
- [x] Startup script (start.sh)

## 📝 Environment Variables

`render.yaml` conține toate variabilele necesare. Poți modifica valorile în Render Dashboard dacă ai nevoie.

---

**Status**: ✅ Production Ready
**Hosting**: Render.com (Free Tier)
**Frontend**: HTML5 + Vanilla JS
**Backend**: Flask 3.0.0 + SQLite

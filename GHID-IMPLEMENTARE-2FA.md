# 🔐 GHID IMPLEMENTARE 2FA (Two-Factor Authentication)

## Ce este 2FA?

2FA adaugă un nivel suplimentar de securitate la contul tău. După ce introduci parola, trebuie să introduci și un cod de 6 cifre generat de o aplicație de autentificare (Google Authenticator, Microsoft Authenticator, etc.).

## Arhitectură Necesară

### 1. Backend (Python/Flask)
Trebuie să adaugi în `McMetSolArtBackend/app.py`:

```python
import pyotp
import qrcode
from io import BytesIO
import base64

# Endpoint pentru generare secret 2FA
@app.route('/api/2fa/setup', methods=['POST'])
def setup_2fa():
    user_id = request.json.get('user_id')
    email = request.json.get('email')
    
    # Generează secret unic pentru utilizator
    secret = pyotp.random_base32()
    
    # Salvează secret în baza de date
    # TODO: Adaugă coloană '2fa_secret' în tabela users
    
    # Generează URI pentru QR code
    totp_uri = pyotp.totp.TOTP(secret).provisioning_uri(
        name=email,
        issuer_name='MC MetSolArt'
    )
    
    # Generează QR code
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(totp_uri)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    buffer = BytesIO()
    img.save(buffer, format='PNG')
    qr_code_base64 = base64.b64encode(buffer.getvalue()).decode()
    
    return jsonify({
        'success': True,
        'secret': secret,
        'qr_code': f'data:image/png;base64,{qr_code_base64}'
    })

# Endpoint pentru verificare cod 2FA
@app.route('/api/2fa/verify', methods=['POST'])
def verify_2fa():
    user_id = request.json.get('user_id')
    code = request.json.get('code')
    
    # Obține secret din baza de date
    # TODO: SELECT 2fa_secret FROM users WHERE id = user_id
    secret = "SECRET_FROM_DB"
    
    # Verifică codul
    totp = pyotp.TOTP(secret)
    is_valid = totp.verify(code, valid_window=1)
    
    if is_valid:
        # Activează 2FA pentru utilizator
        # TODO: UPDATE users SET 2fa_enabled = TRUE WHERE id = user_id
        return jsonify({'success': True, 'message': '2FA activat cu succes!'})
    else:
        return jsonify({'success': False, 'message': 'Cod invalid!'}), 400

# Endpoint pentru login cu 2FA
@app.route('/api/auth/login-2fa', methods=['POST'])
def login_with_2fa():
    email = request.json.get('email')
    password = request.json.get('password')
    code_2fa = request.json.get('code_2fa')
    
    # Verifică email și parolă
    # TODO: Verificare normală
    
    # Dacă utilizatorul are 2FA activat
    if user.has_2fa_enabled:
        totp = pyotp.TOTP(user.secret_2fa)
        if not totp.verify(code_2fa, valid_window=1):
            return jsonify({'success': False, 'message': 'Cod 2FA invalid!'}), 401
    
    # Login reușit
    return jsonify({'success': True, 'token': 'JWT_TOKEN'})
```

### 2. Baza de Date
Adaugă coloane în tabela `users`:

```sql
ALTER TABLE users ADD COLUMN 2fa_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN 2fa_secret VARCHAR(32);
```

### 3. Dependențe Python
Instalează bibliotecile necesare:

```bash
pip install pyotp qrcode[pil]
```

### 4. Frontend (JavaScript)

Funcția `enable2FA()` în `account-panel-redesign.js`:

```javascript
async enable2FA() {
    try {
        // Obține secret și QR code de la server
        const response = await fetch('/api/2fa/setup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: this.userData.id,
                email: this.userData.email
            })
        });
        
        const data = await response.json();
        
        if (!data.success) {
            alert('Eroare la configurarea 2FA');
            return;
        }
        
        // Afișează QR code și instrucțiuni
        const content = document.getElementById('accountContentRedesign');
        content.innerHTML = `
            <div class="page-header-redesign">
                <h1>🔐 Configurare 2FA</h1>
                <p>Scanează codul QR cu aplicația ta de autentificare</p>
            </div>
            
            <div class="section-card-redesign">
                <h3>Pasul 1: Scanează QR Code</h3>
                <div style="text-align: center; padding: 20px;">
                    <img src="${data.qr_code}" alt="QR Code" style="max-width: 300px;">
                </div>
                <p>Folosește Google Authenticator, Microsoft Authenticator sau altă aplicație compatibilă.</p>
            </div>
            
            <div class="section-card-redesign">
                <h3>Pasul 2: Introdu Codul de Verificare</h3>
                <form id="verify2FAForm" onsubmit="window.AccountPanelRedesign.verify2FA(event, '${data.secret}')">
                    <div class="form-field-redesign">
                        <label>Cod de 6 cifre</label>
                        <input type="text" name="code" pattern="[0-9]{6}" maxlength="6" required 
                               placeholder="123456" style="text-align: center; font-size: 24px; letter-spacing: 8px;">
                    </div>
                    <button type="submit" class="btn-primary-redesign">
                        ✅ Verifică și Activează 2FA
                    </button>
                </form>
            </div>
            
            <button class="btn-outline-redesign" onclick="window.AccountPanelRedesign.navigateTo('security')">
                ← Înapoi
            </button>
        `;
    } catch (error) {
        alert('Eroare la configurarea 2FA: ' + error.message);
    }
}

async verify2FA(event, secret) {
    event.preventDefault();
    const form = event.target;
    const code = form.code.value;
    
    try {
        const response = await fetch('/api/2fa/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: this.userData.id,
                code: code
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('✅ 2FA activat cu succes!');
            this.userData.has2FA = true;
            localStorage.setItem('currentUser', JSON.stringify(this.userData));
            this.navigateTo('security');
        } else {
            alert('❌ Cod invalid! Încearcă din nou.');
        }
    } catch (error) {
        alert('Eroare la verificarea codului: ' + error.message);
    }
}
```

## Implementare Simplificată (Fără Backend)

Dacă vrei o versiune simplificată doar pentru demonstrație:

```javascript
enable2FA() {
    alert('🔐 Funcționalitatea 2FA va fi disponibilă în curând!\\n\\nPentru implementare completă, este necesar:\\n- Backend cu pyotp\\n- Bază de date actualizată\\n- Aplicație de autentificare (Google Authenticator)');
}
```

## Aplicații de Autentificare Recomandate

1. **Google Authenticator** (iOS/Android)
2. **Microsoft Authenticator** (iOS/Android)
3. **Authy** (iOS/Android/Desktop)
4. **1Password** (cu suport TOTP)

## Flux Complet 2FA

### Activare:
1. Utilizator click pe "Activează 2FA"
2. Backend generează secret unic
3. Frontend afișează QR code
4. Utilizator scanează cu aplicația
5. Utilizator introduce cod de verificare
6. Backend validează codul
7. 2FA este activat

### Login cu 2FA:
1. Utilizator introduce email și parolă
2. Dacă are 2FA activat, cere cod
3. Utilizator introduce cod din aplicație
4. Backend validează codul
5. Login reușit

## Securitate

- ✅ Secret-ul 2FA trebuie criptat în baza de date
- ✅ Codurile sunt valabile doar 30 secunde
- ✅ Permite o fereastră de toleranță (±30s)
- ✅ Backup codes pentru recovery
- ✅ Posibilitate de dezactivare cu parolă

## Estimare Timp Implementare

- Backend: 4-6 ore
- Frontend: 2-3 ore
- Testare: 2-3 ore
- **Total: 8-12 ore**

## Vrei să implementăm 2FA complet?

Dacă da, trebuie să:
1. Actualizăm baza de date
2. Adăugăm endpoint-uri în backend
3. Implementăm interfața completă în frontend
4. Testăm cu aplicații reale de autentificare

Sau preferi să lăsăm butonul cu un mesaj "Coming soon" pentru moment?

# -*- coding: utf-8 -*-
"""
Configurare Email pentru MC MetSolArt
IMPORTANT: Completează parola înainte de a activa emailurile
"""

# ============================================
# CONFIGURARE EMAIL YAHOO
# ============================================

# Email-ul tău Yahoo
EMAIL_USER = 'mc_metsolart@yahoo.com'

# Parola aplicației Yahoo (NU parola contului!)
# Cum să obții parola aplicației:
# 1. Mergi la: https://login.yahoo.com/account/security
# 2. Click pe "Generate app password"
# 3. Alege "Other App" și scrie "MC MetSolArt Backend"
# 4. Copiază parola generată aici:
EMAIL_PASSWORD = ''  # COMPLETEAZĂ AICI PAROLA APLICAȚIEI

# Activează trimiterea emailurilor (setează True după configurare)
EMAIL_ENABLED = False  # Schimbă în True după ce ai setat parola

# ============================================
# SETĂRI SMTP YAHOO
# ============================================
EMAIL_HOST = 'smtp.mail.yahoo.com'
EMAIL_PORT = 587

# Email-ul către care se trimit mesajele de contact
EMAIL_TO = 'mc_metsolart@yahoo.com'

# ============================================
# INSTRUCȚIUNI CONFIGURARE
# ============================================
"""
PAȘI PENTRU ACTIVARE EMAILURI:

1. OBȚINE PAROLA APLICAȚIEI YAHOO:
   - Mergi la: https://login.yahoo.com/account/security
   - Scroll până la "Generate app password"
   - Click pe "Generate app password"
   - Alege "Other App" și scrie "MC MetSolArt Backend"
   - Copiază parola generată (16 caractere)

2. SETEAZĂ PAROLA ÎN ACEST FIȘIER:
   EMAIL_PASSWORD = 'parola-ta-aici'

3. ACTIVEAZĂ EMAILURILE:
   EMAIL_ENABLED = True

4. REPORNEȘTE BACKEND-UL:
   python app.py

5. TESTEAZĂ:
   - Deschide index.html în browser
   - Mergi la secțiunea Contact
   - Trimite un mesaj de test
   - Verifică inbox-ul la mc_metsolart@yahoo.com

NOTĂ: NU folosi parola contului Yahoo, ci parola aplicației!
"""

# ============================================
# VERIFICARE CONFIGURARE
# ============================================
def check_config():
    """Verifică dacă configurarea este completă"""
    if not EMAIL_PASSWORD:
        print("⚠️  ATENȚIE: Parola email nu este configurată!")
        print("📝 Editează config_email.py și setează EMAIL_PASSWORD")
        print("📚 Vezi instrucțiunile din config_email.py")
        return False
    
    if not EMAIL_ENABLED:
        print("⚠️  ATENȚIE: Emailurile sunt dezactivate!")
        print("📝 Setează EMAIL_ENABLED = True în config_email.py")
        return False
    
    print("✅ Configurare email completă!")
    return True

if __name__ == '__main__':
    check_config()

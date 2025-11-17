# -*- coding: utf-8 -*-
"""
Serviciu Email pentru MC MetSolArt
Trimite emailuri reale prin SMTP (Yahoo Mail)
"""

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

# Importă configurarea
try:
    from config_email import (
        EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD,
        EMAIL_TO, EMAIL_ENABLED
    )
    EMAIL_FROM = EMAIL_USER
except ImportError:
    # Configurare default dacă config_email.py nu există
    EMAIL_HOST = 'smtp.mail.yahoo.com'
    EMAIL_PORT = 587
    EMAIL_USER = 'mc_metsolart@yahoo.com'
    EMAIL_PASSWORD = ''
    EMAIL_FROM = 'mc_metsolart@yahoo.com'
    EMAIL_TO = 'mc_metsolart@yahoo.com'
    EMAIL_ENABLED = False
    print("⚠️  config_email.py nu a fost găsit. Folosesc configurare default.")

def send_contact_email(name, email, subject, message, phone=None):
    """
    Trimite email de contact către mc_metsolart@yahoo.com
    
    Args:
        name: Numele clientului
        email: Email-ul clientului
        subject: Subiectul mesajului
        message: Mesajul clientului
        phone: Telefon (opțional)
    
    Returns:
        tuple: (success: bool, error_message: str)
    """
    
    if not EMAIL_ENABLED:
        print(f"📧 Email dezactivat - Mesaj de la {name} ({email}): {subject}")
        return True, "Email înregistrat (trimitere dezactivată)"
    
    if not EMAIL_PASSWORD:
        print("❌ Eroare: Parola email nu este configurată!")
        return False, "Configurare email incompletă"
    
    try:
        # Creează mesajul
        msg = MIMEMultipart('alternative')
        msg['From'] = EMAIL_FROM
        msg['To'] = EMAIL_TO
        msg['Subject'] = f"[Contact Site] {subject}"
        msg['Reply-To'] = email
        
        # Creează conținutul HTML
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                }}
                .container {{
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f9f9f9;
                }}
                .header {{
                    background: linear-gradient(135deg, #176f87 0%, #0d4a5a 100%);
                    color: white;
                    padding: 20px;
                    text-align: center;
                    border-radius: 5px 5px 0 0;
                }}
                .content {{
                    background: white;
                    padding: 30px;
                    border-radius: 0 0 5px 5px;
                }}
                .info-row {{
                    margin: 15px 0;
                    padding: 10px;
                    background: #f5f5f5;
                    border-left: 4px solid #176f87;
                }}
                .label {{
                    font-weight: bold;
                    color: #176f87;
                }}
                .message-box {{
                    background: #f9f9f9;
                    padding: 20px;
                    border-radius: 5px;
                    margin-top: 20px;
                    border: 1px solid #ddd;
                }}
                .footer {{
                    text-align: center;
                    margin-top: 20px;
                    padding-top: 20px;
                    border-top: 1px solid #ddd;
                    color: #666;
                    font-size: 12px;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>📧 Mesaj Nou de Contact</h2>
                    <p>MC MetSolArt - Formular Contact Site</p>
                </div>
                <div class="content">
                    <div class="info-row">
                        <span class="label">👤 Nume:</span> {name}
                    </div>
                    <div class="info-row">
                        <span class="label">📧 Email:</span> <a href="mailto:{email}">{email}</a>
                    </div>
                    {f'<div class="info-row"><span class="label">📱 Telefon:</span> {phone}</div>' if phone else ''}
                    <div class="info-row">
                        <span class="label">📋 Subiect:</span> {subject}
                    </div>
                    <div class="info-row">
                        <span class="label">📅 Data:</span> {datetime.now().strftime('%d.%m.%Y %H:%M')}
                    </div>
                    
                    <div class="message-box">
                        <p class="label">💬 Mesaj:</p>
                        <p>{message.replace(chr(10), '<br>')}</p>
                    </div>
                    
                    <div style="margin-top: 30px; padding: 15px; background: #e8f5e9; border-radius: 5px;">
                        <p style="margin: 0; color: #2e7d32;">
                            <strong>💡 Răspunde direct:</strong> Poți răspunde acestui email pentru a contacta clientul.
                        </p>
                    </div>
                </div>
                <div class="footer">
                    <p>Acest email a fost trimis automat de pe site-ul MC MetSolArt</p>
                    <p>© {datetime.now().year} MC MetSolArt - Toate drepturile rezervate</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Creează versiunea text plain
        text_content = f"""
        MESAJ NOU DE CONTACT - MC MetSolArt
        =====================================
        
        Nume: {name}
        Email: {email}
        {f'Telefon: {phone}' if phone else ''}
        Subiect: {subject}
        Data: {datetime.now().strftime('%d.%m.%Y %H:%M')}
        
        Mesaj:
        {message}
        
        ---
        Răspunde direct la acest email pentru a contacta clientul.
        """
        
        # Atașează ambele versiuni
        part1 = MIMEText(text_content, 'plain', 'utf-8')
        part2 = MIMEText(html_content, 'html', 'utf-8')
        msg.attach(part1)
        msg.attach(part2)
        
        # Conectează la server SMTP
        print(f"📧 Conectare la {EMAIL_HOST}:{EMAIL_PORT}...")
        server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
        server.starttls()
        
        # Autentificare
        print(f"🔐 Autentificare ca {EMAIL_USER}...")
        server.login(EMAIL_USER, EMAIL_PASSWORD)
        
        # Trimite email
        print(f"📤 Trimitere email către {EMAIL_TO}...")
        server.send_message(msg)
        server.quit()
        
        print(f"✅ Email trimis cu succes către {EMAIL_TO}")
        return True, "Email trimis cu succes"
        
    except smtplib.SMTPAuthenticationError:
        error_msg = "Eroare autentificare email. Verifică parola."
        print(f"❌ {error_msg}")
        return False, error_msg
    except smtplib.SMTPException as e:
        error_msg = f"Eroare SMTP: {str(e)}"
        print(f"❌ {error_msg}")
        return False, error_msg
    except Exception as e:
        error_msg = f"Eroare trimitere email: {str(e)}"
        print(f"❌ {error_msg}")
        return False, error_msg

def send_order_notification_email(user_email, user_name, order_number, total_amount):
    """
    Trimite email de notificare comandă către admin
    
    Args:
        user_email: Email-ul clientului
        user_name: Numele clientului
        order_number: Numărul comenzii
        total_amount: Suma totală
    
    Returns:
        tuple: (success: bool, error_message: str)
    """
    
    if not EMAIL_ENABLED or not EMAIL_PASSWORD:
        print(f"📧 Email dezactivat - Comandă nouă #{order_number} de la {user_name}")
        return True, "Email înregistrat (trimitere dezactivată)"
    
    try:
        msg = MIMEMultipart('alternative')
        msg['From'] = EMAIL_FROM
        msg['To'] = EMAIL_TO
        msg['Subject'] = f"[Comandă Nouă] #{order_number} - {user_name}"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }}
                .header {{ background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }}
                .content {{ background: white; padding: 30px; border-radius: 0 0 5px 5px; }}
                .info-row {{ margin: 15px 0; padding: 10px; background: #f5f5f5; border-left: 4px solid #10b981; }}
                .label {{ font-weight: bold; color: #059669; }}
                .total {{ font-size: 24px; color: #10b981; font-weight: bold; text-align: center; padding: 20px; background: #f0fdf4; border-radius: 5px; margin: 20px 0; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>🛒 Comandă Nouă!</h2>
                    <p>MC MetSolArt - Notificare Comandă</p>
                </div>
                <div class="content">
                    <div class="info-row">
                        <span class="label">📦 Număr Comandă:</span> {order_number}
                    </div>
                    <div class="info-row">
                        <span class="label">👤 Client:</span> {user_name}
                    </div>
                    <div class="info-row">
                        <span class="label">📧 Email Client:</span> <a href="mailto:{user_email}">{user_email}</a>
                    </div>
                    <div class="info-row">
                        <span class="label">📅 Data:</span> {datetime.now().strftime('%d.%m.%Y %H:%M')}
                    </div>
                    
                    <div class="total">
                        💰 Total: {total_amount:.2f} RON
                    </div>
                    
                    <div style="margin-top: 30px; padding: 15px; background: #fff3cd; border-radius: 5px; border-left: 4px solid #ffc107;">
                        <p style="margin: 0; color: #856404;">
                            <strong>⚠️ Acțiune necesară:</strong> Verifică și confirmă comanda în panelul de administrare.
                        </p>
                    </div>
                </div>
            </div>
        </body>
        </html>
        """
        
        text_content = f"""
        COMANDĂ NOUĂ - MC MetSolArt
        ============================
        
        Număr Comandă: {order_number}
        Client: {user_name}
        Email: {user_email}
        Data: {datetime.now().strftime('%d.%m.%Y %H:%M')}
        
        Total: {total_amount:.2f} RON
        
        Verifică și confirmă comanda în panelul de administrare.
        """
        
        part1 = MIMEText(text_content, 'plain', 'utf-8')
        part2 = MIMEText(html_content, 'html', 'utf-8')
        msg.attach(part1)
        msg.attach(part2)
        
        server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASSWORD)
        server.send_message(msg)
        server.quit()
        
        print(f"✅ Email notificare comandă trimis către {EMAIL_TO}")
        return True, "Email trimis cu succes"
        
    except Exception as e:
        error_msg = f"Eroare trimitere email: {str(e)}"
        print(f"❌ {error_msg}")
        return False, error_msg

def test_email_connection():
    """
    Testează conexiunea email
    
    Returns:
        tuple: (success: bool, message: str)
    """
    if not EMAIL_PASSWORD:
        return False, "Parola email nu este configurată"
    
    try:
        server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASSWORD)
        server.quit()
        return True, "Conexiune email reușită"
    except Exception as e:
        return False, f"Eroare conexiune: {str(e)}"

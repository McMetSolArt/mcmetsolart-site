#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Serviciu Email - MC MetSolArt
Trimitere email-uri reale folosind SendGrid sau SMTP
"""

import os
from datetime import datetime
import secrets

# Încarcă configurația email din variabile de mediu
EMAIL_ENABLED = os.getenv('EMAIL_ENABLED', 'False').lower() in ('1', 'true', 'yes')
SENDGRID_API_KEY = os.getenv('SENDGRID_API_KEY', '')
EMAIL_FROM = os.getenv('EMAIL_FROM', 'noreply@mcmetsolart.com')
EMAIL_TO = os.getenv('EMAIL_TO', 'admin@mcmetsolart.com')

# SMTP Configuration (fallback)
SMTP_HOST = os.getenv('SMTP_HOST', 'smtp.gmail.com')
SMTP_PORT = int(os.getenv('SMTP_PORT', '587'))
SMTP_USER = os.getenv('SMTP_USER', '')
SMTP_PASSWORD = os.getenv('SMTP_PASSWORD', '')

def send_email_sendgrid(to_email, subject, html_content):
    """Trimite email folosind SendGrid"""
    try:
        from sendgrid import SendGridAPIClient
        from sendgrid.helpers.mail import Mail
        
        message = Mail(
            from_email=EMAIL_FROM,
            to_emails=to_email,
            subject=subject,
            html_content=html_content
        )
        
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
        
        print(f"✅ Email trimis cu SendGrid: {to_email} - Status: {response.status_code}")
        return True, None
    except Exception as e:
        print(f"❌ Eroare SendGrid: {str(e)}")
        return False, str(e)

def send_email_smtp(to_email, subject, html_content):
    """Trimite email folosind SMTP"""
    try:
        import smtplib
        from email.mime.text import MIMEText
        from email.mime.multipart import MIMEMultipart
        
        message = MIMEMultipart('alternative')
        message['Subject'] = subject
        message['From'] = EMAIL_FROM
        message['To'] = to_email
        
        html_part = MIMEText(html_content, 'html')
        message.attach(html_part)
        
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.send_message(message)
        
        print(f"✅ Email trimis cu SMTP: {to_email}")
        return True, None
    except Exception as e:
        print(f"❌ Eroare SMTP: {str(e)}")
        return False, str(e)

def send_email(to_email, subject, html_content):
    """Trimite email folosind metoda disponibilă"""
    if not EMAIL_ENABLED:
        print(f"ℹ️ Email dezactivat - ar fi trimis către: {to_email}")
        print(f"   Subject: {subject}")
        return True, None
    
    # Încearcă SendGrid mai întâi
    if SENDGRID_API_KEY:
        return send_email_sendgrid(to_email, subject, html_content)
    
    # Fallback la SMTP
    if SMTP_USER and SMTP_PASSWORD:
        return send_email_smtp(to_email, subject, html_content)
    
    print("⚠️ Nicio metodă de email configurată!")
    return False, "Email service not configured"

# ============================================
# TEMPLATE-URI EMAIL
# ============================================

def get_email_template(title, content):
    """Template HTML pentru email-uri"""
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body {{
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }}
            .header {{
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                text-align: center;
                border-radius: 10px 10px 0 0;
            }}
            .content {{
                background: #f9f9f9;
                padding: 30px;
                border-radius: 0 0 10px 10px;
            }}
            .button {{
                display: inline-block;
                padding: 12px 30px;
                background: #667eea;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                margin: 20px 0;
            }}
            .footer {{
                text-align: center;
                margin-top: 30px;
                color: #666;
                font-size: 12px;
            }}
        </style>
    </head>
    <body>
        <div class="header">
            <h1>{title}</h1>
        </div>
        <div class="content">
            {content}
        </div>
        <div class="footer">
            <p>© 2025 MC MetSolArt - Toate drepturile rezervate</p>
            <p>Acest email a fost trimis automat. Te rugăm să nu răspunzi.</p>
        </div>
    </body>
    </html>
    """

# ============================================
# FUNCȚII TRIMITERE EMAIL
# ============================================

def send_contact_email(name, email, phone, message):
    """Trimite email de contact către admin"""
    subject = f"📧 Mesaj nou de contact de la {name}"
    
    content = f"""
        <h2>Mesaj nou de contact</h2>
        <p><strong>Nume:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Telefon:</strong> {phone}</p>
        <p><strong>Mesaj:</strong></p>
        <p style="background: white; padding: 15px; border-left: 4px solid #667eea;">
            {message}
        </p>
        <p><small>Trimis la: {datetime.now().strftime('%d.%m.%Y %H:%M')}</small></p>
    """
    
    html = get_email_template("Mesaj Nou de Contact", content)
    return send_email(EMAIL_TO, subject, html)

def send_password_reset_email(email, reset_code):
    """Trimite cod de resetare parolă"""
    subject = "🔐 Resetare Parolă - MC MetSolArt"
    
    content = f"""
        <h2>Resetare Parolă</h2>
        <p>Ai solicitat resetarea parolei pentru contul tău.</p>
        <p>Codul tău de resetare este:</p>
        <div style="background: white; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #667eea;">
            {reset_code}
        </div>
        <p><strong>Acest cod este valabil 15 minute.</strong></p>
        <p>Dacă nu ai solicitat resetarea parolei, ignoră acest email.</p>
    """
    
    html = get_email_template("Resetare Parolă", content)
    return send_email(email, subject, html)

def send_welcome_email(email, first_name):
    """Trimite email de bun venit"""
    subject = "🎉 Bun venit la MC MetSolArt!"
    
    content = f"""
        <h2>Bun venit, {first_name}!</h2>
        <p>Îți mulțumim că te-ai înregistrat pe MC MetSolArt.</p>
        <p>Contul tău a fost creat cu succes și poți acum:</p>
        <ul>
            <li>✅ Plasa comenzi pentru cupole geodezice</li>
            <li>✅ Urmări statusul comenzilor tale</li>
            <li>✅ Gestiona profilul și setările</li>
            <li>✅ Contacta echipa noastră</li>
        </ul>
        <a href="https://mcmetsolart-site-5.onrender.com" class="button">Vizitează Site-ul</a>
        <p>Dacă ai întrebări, nu ezita să ne contactezi!</p>
    """
    
    html = get_email_template("Bun Venit!", content)
    return send_email(email, subject, html)

def send_order_confirmation_email(email, first_name, order_number, total_amount):
    """Trimite confirmare comandă către client"""
    subject = f"✅ Comandă Confirmată #{order_number}"
    
    content = f"""
        <h2>Comandă Confirmată!</h2>
        <p>Bună, {first_name}!</p>
        <p>Comanda ta a fost înregistrată cu succes.</p>
        <div style="background: white; padding: 20px; margin: 20px 0;">
            <p><strong>Număr comandă:</strong> {order_number}</p>
            <p><strong>Total:</strong> {total_amount} EUR</p>
            <p><strong>Status:</strong> În așteptare</p>
        </div>
        <p>Vei primi un email când comanda va fi confirmată de echipa noastră.</p>
        <a href="https://mcmetsolart-site-5.onrender.com" class="button">Vezi Comanda</a>
    """
    
    html = get_email_template("Comandă Confirmată", content)
    return send_email(email, subject, html)

def send_order_notification_email(order_number, client_name, client_email, total_amount):
    """Trimite notificare comandă nouă către admin"""
    subject = f"🔔 Comandă Nouă #{order_number}"
    
    content = f"""
        <h2>Comandă Nouă Primită!</h2>
        <div style="background: white; padding: 20px; margin: 20px 0;">
            <p><strong>Număr comandă:</strong> {order_number}</p>
            <p><strong>Client:</strong> {client_name}</p>
            <p><strong>Email:</strong> {client_email}</p>
            <p><strong>Total:</strong> {total_amount} EUR</p>
        </div>
        <p>Accesează admin panel-ul pentru a confirma comanda.</p>
        <p><small>Trimis la: {datetime.now().strftime('%d.%m.%Y %H:%M')}</small></p>
    """
    
    html = get_email_template("Comandă Nouă", content)
    return send_email(EMAIL_TO, subject, html)

def send_order_status_email(email, first_name, order_number, new_status):
    """Trimite actualizare status comandă"""
    status_messages = {
        'confirmat': 'Comanda ta a fost confirmată!',
        'in_procesare': 'Comanda ta este în procesare.',
        'expediat': 'Comanda ta a fost expediată!',
        'livrat': 'Comanda ta a fost livrată!'
    }
    
    subject = f"📦 Actualizare Comandă #{order_number}"
    message = status_messages.get(new_status, f'Status actualizat: {new_status}')
    
    content = f"""
        <h2>{message}</h2>
        <p>Bună, {first_name}!</p>
        <p>Comanda ta #{order_number} a fost actualizată.</p>
        <div style="background: white; padding: 20px; margin: 20px 0;">
            <p><strong>Status nou:</strong> {new_status.replace('_', ' ').title()}</p>
        </div>
        <a href="https://mcmetsolart-site-5.onrender.com" class="button">Vezi Detalii</a>
    """
    
    html = get_email_template("Actualizare Comandă", content)
    return send_email(email, subject, html)

# ============================================
# FUNCȚII HELPER
# ============================================

def generate_reset_code():
    """Generează cod de resetare parolă (6 cifre)"""
    return ''.join([str(secrets.randbelow(10)) for _ in range(6)])

# Test
if __name__ == '__main__':
    print("📧 Email Service - MC MetSolArt")
    print(f"Email enabled: {EMAIL_ENABLED}")
    print(f"SendGrid configured: {bool(SENDGRID_API_KEY)}")
    print(f"SMTP configured: {bool(SMTP_USER and SMTP_PASSWORD)}")

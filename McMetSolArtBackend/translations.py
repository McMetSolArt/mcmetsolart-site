# -*- coding: utf-8 -*-
"""
Sistem de traduceri pentru MC MetSolArt Backend
Suportă: Română (ro), Engleză (en), Ucraineană (uk), Italiană (it)
"""

TRANSLATIONS = {
    # Mesaje generale
    'success': {
        'ro': 'Operațiune reușită',
        'en': 'Operation successful',
        'uk': 'Операція успішна',
        'it': 'Operazione riuscita'
    },
    'error': {
        'ro': 'A apărut o eroare',
        'en': 'An error occurred',
        'uk': 'Сталася помилка',
        'it': 'Si è verificato un errore'
    },
    
    # Autentificare
    'auth.register.success': {
        'ro': 'Cont creat cu succes',
        'en': 'Account created successfully',
        'uk': 'Обліковий запис успішно створено',
        'it': 'Account creato con successo'
    },
    'auth.register.emailExists': {
        'ro': 'Email-ul este deja înregistrat',
        'en': 'Email is already registered',
        'uk': 'Електронна пошта вже зареєстрована',
        'it': 'L\'email è già registrata'
    },
    'auth.login.success': {
        'ro': 'Autentificare reușită',
        'en': 'Login successful',
        'uk': 'Вхід успішний',
        'it': 'Accesso riuscito'
    },
    'auth.login.error': {
        'ro': 'Email sau parolă incorectă',
        'en': 'Incorrect email or password',
        'uk': 'Неправильна електронна пошта або пароль',
        'it': 'Email o password errati'
    },
    'auth.logout.success': {
        'ro': 'Deconectare reușită',
        'en': 'Logout successful',
        'uk': 'Вихід успішний',
        'it': 'Disconnessione riuscita'
    },
    'auth.validation.emailRequired': {
        'ro': 'Email-ul este obligatoriu',
        'en': 'Email is required',
        'uk': 'Електронна пошта обов\'язкова',
        'it': 'L\'email è obbligatoria'
    },
    'auth.validation.passwordRequired': {
        'ro': 'Parola este obligatorie',
        'en': 'Password is required',
        'uk': 'Пароль обов\'язковий',
        'it': 'La password è obbligatoria'
    },
    'auth.validation.passwordWeak': {
        'ro': 'Parola trebuie să aibă minim 6 caractere',
        'en': 'Password must be at least 6 characters',
        'uk': 'Пароль повинен містити щонайменше 6 символів',
        'it': 'La password deve contenere almeno 6 caratteri'
    },
    'auth.validation.emailInvalid': {
        'ro': 'Email invalid',
        'en': 'Invalid email',
        'uk': 'Недійсна електронна пошта',
        'it': 'Email non valida'
    },
    'auth.validation.allFieldsRequired': {
        'ro': 'Toate câmpurile sunt obligatorii',
        'en': 'All fields are required',
        'uk': 'Всі поля обов\'язкові',
        'it': 'Tutti i campi sono obbligatori'
    },
    
    # Profil
    'profile.update.success': {
        'ro': 'Profil actualizat cu succes',
        'en': 'Profile updated successfully',
        'uk': 'Профіль успішно оновлено',
        'it': 'Profilo aggiornato con successo'
    },
    'profile.update.error': {
        'ro': 'Eroare la actualizarea profilului',
        'en': 'Error updating profile',
        'uk': 'Помилка оновлення профілю',
        'it': 'Errore nell\'aggiornamento del profilo'
    },
    'profile.notFound': {
        'ro': 'Utilizator negăsit',
        'en': 'User not found',
        'uk': 'Користувача не знайдено',
        'it': 'Utente non trovato'
    },
    
    # Comenzi
    'order.create.success': {
        'ro': 'Comandă plasată cu succes',
        'en': 'Order placed successfully',
        'uk': 'Замовлення успішно розміщено',
        'it': 'Ordine effettuato con successo'
    },
    'order.create.error': {
        'ro': 'Eroare la plasarea comenzii',
        'en': 'Error placing order',
        'uk': 'Помилка розміщення замовлення',
        'it': 'Errore nell\'effettuare l\'ordine'
    },
    'order.create.noItems': {
        'ro': 'Comanda trebuie să conțină cel puțin un produs',
        'en': 'Order must contain at least one product',
        'uk': 'Замовлення повинно містити принаймні один продукт',
        'it': 'L\'ordine deve contenere almeno un prodotto'
    },
    'order.create.noAddress': {
        'ro': 'Adresa de livrare este obligatorie',
        'en': 'Shipping address is required',
        'uk': 'Адреса доставки обов\'язкова',
        'it': 'L\'indirizzo di spedizione è obbligatorio'
    },
    'order.notFound': {
        'ro': 'Comandă negăsită',
        'en': 'Order not found',
        'uk': 'Замовлення не знайдено',
        'it': 'Ordine non trovato'
    },
    'order.confirm.success': {
        'ro': 'Comandă confirmată cu succes',
        'en': 'Order confirmed successfully',
        'uk': 'Замовлення успішно підтверджено',
        'it': 'Ordine confermato con successo'
    },
    'order.status.update.success': {
        'ro': 'Status actualizat cu succes',
        'en': 'Status updated successfully',
        'uk': 'Статус успішно оновлено',
        'it': 'Stato aggiornato con successo'
    },
    'order.status.required': {
        'ro': 'Status-ul este obligatoriu',
        'en': 'Status is required',
        'uk': 'Статус обов\'язковий',
        'it': 'Lo stato è obbligatorio'
    },
    
    # Notificări
    'notification.order.placed.title': {
        'ro': 'Comandă plasată',
        'en': 'Order placed',
        'uk': 'Замовлення розміщено',
        'it': 'Ordine effettuato'
    },
    'notification.order.placed.message': {
        'ro': 'Comanda #{order_number} a fost plasată cu succes',
        'en': 'Order #{order_number} has been placed successfully',
        'uk': 'Замовлення #{order_number} успішно розміщено',
        'it': 'L\'ordine #{order_number} è stato effettuato con successo'
    },
    'notification.order.confirmed.title': {
        'ro': 'Comandă confirmată',
        'en': 'Order confirmed',
        'uk': 'Замовлення підтверджено',
        'it': 'Ordine confermato'
    },
    'notification.order.confirmed.message': {
        'ro': 'Comanda #{order_number} a fost confirmată',
        'en': 'Order #{order_number} has been confirmed',
        'uk': 'Замовлення #{order_number} підтверджено',
        'it': 'L\'ordine #{order_number} è stato confermato'
    },
    'notification.order.status.title': {
        'ro': 'Status comandă actualizat',
        'en': 'Order status updated',
        'uk': 'Статус замовлення оновлено',
        'it': 'Stato ordine aggiornato'
    },
    
    # Status comenzi
    'order.status.pending': {
        'ro': 'În așteptare',
        'en': 'Pending',
        'uk': 'В очікуванні',
        'it': 'In attesa'
    },
    'order.status.confirmed': {
        'ro': 'Confirmată',
        'en': 'Confirmed',
        'uk': 'Підтверджено',
        'it': 'Confermato'
    },
    'order.status.processing': {
        'ro': 'În procesare',
        'en': 'Processing',
        'uk': 'В обробці',
        'it': 'In elaborazione'
    },
    'order.status.shipped': {
        'ro': 'Expediată',
        'en': 'Shipped',
        'uk': 'Відправлено',
        'it': 'Spedito'
    },
    'order.status.delivered': {
        'ro': 'Livrată',
        'en': 'Delivered',
        'uk': 'Доставлено',
        'it': 'Consegnato'
    },
    'order.status.cancelled': {
        'ro': 'Anulată',
        'en': 'Cancelled',
        'uk': 'Скасовано',
        'it': 'Annullato'
    },
    
    # Mesaje status
    'order.status.message.confirmed': {
        'ro': 'Comanda ta a fost confirmată',
        'en': 'Your order has been confirmed',
        'uk': 'Ваше замовлення підтверджено',
        'it': 'Il tuo ordine è stato confermato'
    },
    'order.status.message.processing': {
        'ro': 'Comanda ta este în procesare',
        'en': 'Your order is being processed',
        'uk': 'Ваше замовлення обробляється',
        'it': 'Il tuo ordine è in elaborazione'
    },
    'order.status.message.shipped': {
        'ro': 'Comanda ta a fost expediată',
        'en': 'Your order has been shipped',
        'uk': 'Ваше замовлення відправлено',
        'it': 'Il tuo ordine è stato spedito'
    },
    'order.status.message.delivered': {
        'ro': 'Comanda ta a fost livrată',
        'en': 'Your order has been delivered',
        'uk': 'Ваше замовлення доставлено',
        'it': 'Il tuo ordine è stato consegnato'
    },
    'order.status.message.cancelled': {
        'ro': 'Comanda ta a fost anulată',
        'en': 'Your order has been cancelled',
        'uk': 'Ваше замовлення скасовано',
        'it': 'Il tuo ordine è stato annullato'
    },
    
    # Setări
    'settings.update.success': {
        'ro': 'Setări actualizate cu succes',
        'en': 'Settings updated successfully',
        'uk': 'Налаштування успішно оновлено',
        'it': 'Impostazioni aggiornate con successo'
    },
    'settings.notFound': {
        'ro': 'Setări negăsite',
        'en': 'Settings not found',
        'uk': 'Налаштування не знайдено',
        'it': 'Impostazioni non trovate'
    },
    
    # Suport
    'support.message.success': {
        'ro': 'Mesaj trimis cu succes. Vă vom răspunde în cel mai scurt timp.',
        'en': 'Message sent successfully. We will respond as soon as possible.',
        'uk': 'Повідомлення успішно надіслано. Ми відповімо якнайшвидше.',
        'it': 'Messaggio inviato con successo. Risponderemo il prima possibile.'
    },
    'support.message.error': {
        'ro': 'Eroare la trimiterea mesajului',
        'en': 'Error sending message',
        'uk': 'Помилка надсилання повідомлення',
        'it': 'Errore nell\'invio del messaggio'
    },
    
    # Adrese
    'address.add.success': {
        'ro': 'Adresă adăugată cu succes',
        'en': 'Address added successfully',
        'uk': 'Адресу успішно додано',
        'it': 'Indirizzo aggiunto con successo'
    },
    'address.add.error': {
        'ro': 'Eroare la adăugarea adresei',
        'en': 'Error adding address',
        'uk': 'Помилка додавання адреси',
        'it': 'Errore nell\'aggiunta dell\'indirizzo'
    },
    
    # Notificări
    'notification.read.success': {
        'ro': 'Notificare marcată ca citită',
        'en': 'Notification marked as read',
        'uk': 'Сповіщення позначено як прочитане',
        'it': 'Notifica contrassegnata come letta'
    },
    
    # Admin
    'admin.accessDenied': {
        'ro': 'Acces interzis',
        'en': 'Access denied',
        'uk': 'Доступ заборонено',
        'it': 'Accesso negato'
    },
    'admin.order.getError': {
        'ro': 'Eroare la obținerea comenzilor',
        'en': 'Error getting orders',
        'uk': 'Помилка отримання замовлень',
        'it': 'Errore nel recupero degli ordini'
    },
    'admin.order.confirmError': {
        'ro': 'Eroare la confirmarea comenzii',
        'en': 'Error confirming order',
        'uk': 'Помилка підтвердження замовлення',
        'it': 'Errore nella conferma dell\'ordine'
    },
    'admin.order.statusError': {
        'ro': 'Eroare la actualizarea statusului',
        'en': 'Error updating status',
        'uk': 'Помилка оновлення статусу',
        'it': 'Errore nell\'aggiornamento dello stato'
    }
}

def get_translation(key, lang='ro', **kwargs):
    """
    Obține traducerea pentru o cheie în limba specificată
    
    Args:
        key: Cheia de traducere (ex: 'auth.login.success')
        lang: Codul limbii (ro, en, uk, it)
        **kwargs: Parametri pentru formatare (ex: order_number='123')
    
    Returns:
        str: Textul tradus
    """
    # Validează limba
    if lang not in ['ro', 'en', 'uk', 'it']:
        lang = 'ro'
    
    # Obține traducerea
    translation = TRANSLATIONS.get(key, {}).get(lang)
    
    # Dacă nu există traducere, returnează cheia
    if not translation:
        return key
    
    # Formatează cu parametrii
    try:
        return translation.format(**kwargs)
    except:
        return translation

def t(key, lang='ro', **kwargs):
    """Alias scurt pentru get_translation"""
    return get_translation(key, lang, **kwargs)

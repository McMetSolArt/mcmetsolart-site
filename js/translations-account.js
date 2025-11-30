/**
 * TRADUCERI CONT CLIENT - Multilingv
 * Suport complet RO / EN / IT / UK (Ucraineană)
 */

const ACCOUNT_TRANSLATIONS = {
    ro: {
        // Header
        'account.welcome': 'Bun venit',
        'account.status.active': 'Activ',
        'account.close': 'Închide',
        
        // Stats
        'account.stats.orders': 'Comenzi',
        'account.stats.total': 'Total',
        'account.stats.active': 'Active',
        
        // Tabs
        'account.tab.dashboard': 'Dashboard',
        'account.tab.profile': 'Profil',
        'account.tab.orders': 'Comenzi',
        'account.tab.settings': 'Setări',
        
        // Dashboard
        'account.dashboard.title': 'Dashboard',
        'account.dashboard.welcome': 'Bun venit, {name}!',
        'account.dashboard.description': 'Acesta este dashboard-ul tău personal. Aici poți vedea o prezentare generală a contului tău.',
        'account.dashboard.quick_info': 'Informații Rapide',
        'account.dashboard.full_name': 'Nume Complet',
        'account.dashboard.email': 'Email',
        'account.dashboard.phone': 'Telefon',
        'account.dashboard.country': 'Țară',
        'account.dashboard.not_set': 'Nu este setat',
        'account.dashboard.edit_profile': 'Editează Profilul',
        'account.dashboard.view_orders': 'Vezi Comenzile',
        
        // Profile
        'account.profile.title': 'Profil',
        'account.profile.image': 'Imagine Profil',
        'account.profile.change_image': 'Schimbă imaginea de profil',
        'account.profile.upload_hint': 'Încarcă o imagine JPG, PNG sau GIF (max 5MB)',
        'account.profile.upload_button': 'Încarcă Imagine',
        'account.profile.personal_info': 'Informații Personale',
        'account.profile.first_name': 'Prenume',
        'account.profile.last_name': 'Nume',
        'account.profile.company': 'Companie',
        'account.profile.address_info': 'Adresă',
        'account.profile.city': 'Oraș',
        'account.profile.address': 'Adresă Completă',
        'account.profile.postal_code': 'Cod Poștal',
        'account.profile.edit': 'Editează Profilul',
        'account.profile.save': 'Salvează Modificările',
        'account.profile.cancel': 'Anulează',
        'account.profile.required': 'Obligatoriu',
        'account.profile.email_hint': 'Emailul este folosit pentru autentificare',
        'account.profile.address_hint': 'Strada, număr, bloc, apartament, etc.',
        'account.profile.select_country': 'Selectează țara',
        
        // Orders
        'account.orders.title': 'Comenzile Mele',
        'account.orders.loading': 'Se încarcă comenzile...',
        'account.orders.empty': 'Nu ai comenzi încă',
        'account.orders.empty_text': 'Când vei plasa o comandă, o vei vedea aici.',
        'account.orders.number': 'Comandă',
        'account.orders.date': 'Data',
        'account.orders.total': 'Total',
        'account.orders.status': 'Status',
        'account.orders.view_details': 'Vezi Detalii',
        'account.orders.cancel': 'Anulează Comanda',
        'account.orders.tracking': 'Tracking',
        'account.orders.invoice': 'Factură',
        'account.orders.download_invoice': 'Descarcă Factură',
        
        // Order Status
        'order.status.in_asteptare': 'În Așteptare',
        'order.status.confirmat': 'Confirmat',
        'order.status.in_procesare': 'În Procesare',
        'order.status.expediat': 'Expediat',
        'order.status.livrat': 'Livrat',
        'order.status.anulat': 'Anulat',
        
        // Settings
        'account.settings.title': 'Setări',
        'account.settings.security': 'Securitate',
        'account.settings.security_desc': 'Gestionează setările de securitate ale contului tău.',
        'account.settings.change_password': 'Schimbă Parola',
        'account.settings.preferences': 'Preferințe',
        'account.settings.language': 'Limbă',
        'account.settings.theme': 'Temă',
        'account.settings.theme_auto': 'Automată',
        'account.settings.account': 'Cont',
        'account.settings.logout': 'Deconectare',
        
        // Messages
        'account.msg.not_authenticated': 'Nu ești autentificat',
        'account.msg.login_required': 'Te rugăm să te loghezi pentru a accesa contul tău.',
        'account.msg.profile_updated': 'Profil actualizat cu succes!',
        'account.msg.profile_error': 'Eroare la salvarea profilului',
        'account.msg.image_uploaded': 'Imagine încărcată cu succes!',
        'account.msg.image_error': 'Eroare la încărcarea imaginii',
        'account.msg.orders_error': 'Eroare la încărcarea comenzilor',
        'account.msg.feature_soon': 'Funcționalitatea va fi disponibilă în curând',
        'account.msg.logout_confirm': 'Sigur vrei să te deconectezi?',
        'account.msg.cancel_order_confirm': 'Sigur vrei să anulezi această comandă?',
        
        // Validation
        'validation.email_invalid': 'Format email invalid',
        'validation.phone_invalid': 'Format telefon invalid',
        'validation.required': 'Acest câmp este obligatoriu',
        'validation.min_length': 'Minim {min} caractere',
        'validation.max_size': 'Dimensiune maximă: {max}',
        
        // Countries
        'country.romania': 'România',
        'country.italy': 'Italia',
        'country.spain': 'Spania',
        'country.germany': 'Germania',
        'country.france': 'Franța',
        'country.other': 'Altă țară'
    },
    
    en: {
        // Header
        'account.welcome': 'Welcome',
        'account.status.active': 'Active',
        'account.close': 'Close',
        
        // Stats
        'account.stats.orders': 'Orders',
        'account.stats.total': 'Total',
        'account.stats.active': 'Active',
        
        // Tabs
        'account.tab.dashboard': 'Dashboard',
        'account.tab.profile': 'Profile',
        'account.tab.orders': 'Orders',
        'account.tab.settings': 'Settings',
        
        // Dashboard
        'account.dashboard.title': 'Dashboard',
        'account.dashboard.welcome': 'Welcome, {name}!',
        'account.dashboard.description': 'This is your personal dashboard. Here you can see an overview of your account.',
        'account.dashboard.quick_info': 'Quick Information',
        'account.dashboard.full_name': 'Full Name',
        'account.dashboard.email': 'Email',
        'account.dashboard.phone': 'Phone',
        'account.dashboard.country': 'Country',
        'account.dashboard.not_set': 'Not set',
        'account.dashboard.edit_profile': 'Edit Profile',
        'account.dashboard.view_orders': 'View Orders',
        
        // Profile
        'account.profile.title': 'Profile',
        'account.profile.image': 'Profile Image',
        'account.profile.change_image': 'Change profile image',
        'account.profile.upload_hint': 'Upload a JPG, PNG or GIF image (max 5MB)',
        'account.profile.upload_button': 'Upload Image',
        'account.profile.personal_info': 'Personal Information',
        'account.profile.first_name': 'First Name',
        'account.profile.last_name': 'Last Name',
        'account.profile.company': 'Company',
        'account.profile.address_info': 'Address',
        'account.profile.city': 'City',
        'account.profile.address': 'Full Address',
        'account.profile.postal_code': 'Postal Code',
        'account.profile.edit': 'Edit Profile',
        'account.profile.save': 'Save Changes',
        'account.profile.cancel': 'Cancel',
        'account.profile.required': 'Required',
        'account.profile.email_hint': 'Email is used for authentication',
        'account.profile.address_hint': 'Street, number, building, apartment, etc.',
        'account.profile.select_country': 'Select country',
        
        // Orders
        'account.orders.title': 'My Orders',
        'account.orders.loading': 'Loading orders...',
        'account.orders.empty': 'No orders yet',
        'account.orders.empty_text': 'When you place an order, you will see it here.',
        'account.orders.number': 'Order',
        'account.orders.date': 'Date',
        'account.orders.total': 'Total',
        'account.orders.status': 'Status',
        'account.orders.view_details': 'View Details',
        'account.orders.cancel': 'Cancel Order',
        'account.orders.tracking': 'Tracking',
        'account.orders.invoice': 'Invoice',
        'account.orders.download_invoice': 'Download Invoice',
        
        // Order Status
        'order.status.in_asteptare': 'Pending',
        'order.status.confirmat': 'Confirmed',
        'order.status.in_procesare': 'Processing',
        'order.status.expediat': 'Shipped',
        'order.status.livrat': 'Delivered',
        'order.status.anulat': 'Cancelled',
        
        // Settings
        'account.settings.title': 'Settings',
        'account.settings.security': 'Security',
        'account.settings.security_desc': 'Manage your account security settings.',
        'account.settings.change_password': 'Change Password',
        'account.settings.preferences': 'Preferences',
        'account.settings.language': 'Language',
        'account.settings.theme': 'Theme',
        'account.settings.theme_auto': 'Automatic',
        'account.settings.account': 'Account',
        'account.settings.logout': 'Logout',
        
        // Messages
        'account.msg.not_authenticated': 'Not authenticated',
        'account.msg.login_required': 'Please log in to access your account.',
        'account.msg.profile_updated': 'Profile updated successfully!',
        'account.msg.profile_error': 'Error saving profile',
        'account.msg.image_uploaded': 'Image uploaded successfully!',
        'account.msg.image_error': 'Error uploading image',
        'account.msg.orders_error': 'Error loading orders',
        'account.msg.feature_soon': 'Feature will be available soon',
        'account.msg.logout_confirm': 'Are you sure you want to logout?',
        'account.msg.cancel_order_confirm': 'Are you sure you want to cancel this order?',
        
        // Validation
        'validation.email_invalid': 'Invalid email format',
        'validation.phone_invalid': 'Invalid phone format',
        'validation.required': 'This field is required',
        'validation.min_length': 'Minimum {min} characters',
        'validation.max_size': 'Maximum size: {max}',
        
        // Countries
        'country.romania': 'Romania',
        'country.italy': 'Italy',
        'country.spain': 'Spain',
        'country.germany': 'Germany',
        'country.france': 'France',
        'country.other': 'Other country'
    },
    
    it: {
        // Header
        'account.welcome': 'Benvenuto',
        'account.status.active': 'Attivo',
        'account.close': 'Chiudi',
        
        // Stats
        'account.stats.orders': 'Ordini',
        'account.stats.total': 'Totale',
        'account.stats.active': 'Attivi',
        
        // Tabs
        'account.tab.dashboard': 'Dashboard',
        'account.tab.profile': 'Profilo',
        'account.tab.orders': 'Ordini',
        'account.tab.settings': 'Impostazioni',
        
        // Dashboard
        'account.dashboard.title': 'Dashboard',
        'account.dashboard.welcome': 'Benvenuto, {name}!',
        'account.dashboard.description': 'Questa è la tua dashboard personale. Qui puoi vedere una panoramica del tuo account.',
        'account.dashboard.quick_info': 'Informazioni Rapide',
        'account.dashboard.full_name': 'Nome Completo',
        'account.dashboard.email': 'Email',
        'account.dashboard.phone': 'Telefono',
        'account.dashboard.country': 'Paese',
        'account.dashboard.not_set': 'Non impostato',
        'account.dashboard.edit_profile': 'Modifica Profilo',
        'account.dashboard.view_orders': 'Vedi Ordini',
        
        // Profile
        'account.profile.title': 'Profilo',
        'account.profile.image': 'Immagine Profilo',
        'account.profile.change_image': 'Cambia immagine profilo',
        'account.profile.upload_hint': 'Carica un\'immagine JPG, PNG o GIF (max 5MB)',
        'account.profile.upload_button': 'Carica Immagine',
        'account.profile.personal_info': 'Informazioni Personali',
        'account.profile.first_name': 'Nome',
        'account.profile.last_name': 'Cognome',
        'account.profile.company': 'Azienda',
        'account.profile.address_info': 'Indirizzo',
        'account.profile.city': 'Città',
        'account.profile.address': 'Indirizzo Completo',
        'account.profile.postal_code': 'Codice Postale',
        'account.profile.edit': 'Modifica Profilo',
        'account.profile.save': 'Salva Modifiche',
        'account.profile.cancel': 'Annulla',
        'account.profile.required': 'Obbligatorio',
        'account.profile.email_hint': 'L\'email è usata per l\'autenticazione',
        'account.profile.address_hint': 'Via, numero, edificio, appartamento, ecc.',
        'account.profile.select_country': 'Seleziona paese',
        
        // Orders
        'account.orders.title': 'I Miei Ordini',
        'account.orders.loading': 'Caricamento ordini...',
        'account.orders.empty': 'Nessun ordine ancora',
        'account.orders.empty_text': 'Quando effettuerai un ordine, lo vedrai qui.',
        'account.orders.number': 'Ordine',
        'account.orders.date': 'Data',
        'account.orders.total': 'Totale',
        'account.orders.status': 'Stato',
        'account.orders.view_details': 'Vedi Dettagli',
        'account.orders.cancel': 'Annulla Ordine',
        'account.orders.tracking': 'Tracciamento',
        'account.orders.invoice': 'Fattura',
        'account.orders.download_invoice': 'Scarica Fattura',
        
        // Order Status
        'order.status.in_asteptare': 'In Attesa',
        'order.status.confirmat': 'Confermato',
        'order.status.in_procesare': 'In Elaborazione',
        'order.status.expediat': 'Spedito',
        'order.status.livrat': 'Consegnato',
        'order.status.anulat': 'Annullato',
        
        // Settings
        'account.settings.title': 'Impostazioni',
        'account.settings.security': 'Sicurezza',
        'account.settings.security_desc': 'Gestisci le impostazioni di sicurezza del tuo account.',
        'account.settings.change_password': 'Cambia Password',
        'account.settings.preferences': 'Preferenze',
        'account.settings.language': 'Lingua',
        'account.settings.theme': 'Tema',
        'account.settings.theme_auto': 'Automatico',
        'account.settings.account': 'Account',
        'account.settings.logout': 'Disconnetti',
        
        // Messages
        'account.msg.not_authenticated': 'Non autenticato',
        'account.msg.login_required': 'Effettua il login per accedere al tuo account.',
        'account.msg.profile_updated': 'Profilo aggiornato con successo!',
        'account.msg.profile_error': 'Errore nel salvataggio del profilo',
        'account.msg.image_uploaded': 'Immagine caricata con successo!',
        'account.msg.image_error': 'Errore nel caricamento dell\'immagine',
        'account.msg.orders_error': 'Errore nel caricamento degli ordini',
        'account.msg.feature_soon': 'Funzionalità disponibile presto',
        'account.msg.logout_confirm': 'Sei sicuro di volerti disconnettere?',
        'account.msg.cancel_order_confirm': 'Sei sicuro di voler annullare questo ordine?',
        
        // Validation
        'validation.email_invalid': 'Formato email non valido',
        'validation.phone_invalid': 'Formato telefono non valido',
        'validation.required': 'Questo campo è obbligatorio',
        'validation.min_length': 'Minimo {min} caratteri',
        'validation.max_size': 'Dimensione massima: {max}',
        
        // Countries
        'country.romania': 'Romania',
        'country.italy': 'Italia',
        'country.spain': 'Spagna',
        'country.germany': 'Germania',
        'country.france': 'Francia',
        'country.other': 'Altro paese'
    },
    
    uk: {
        // Header
        'account.welcome': 'Ласкаво просимо',
        'account.status.active': 'Активний',
        'account.close': 'Закрити',
        
        // Stats
        'account.stats.orders': 'Замовлення',
        'account.stats.total': 'Всього',
        'account.stats.active': 'Активні',
        
        // Tabs
        'account.tab.dashboard': 'Панель',
        'account.tab.profile': 'Профіль',
        'account.tab.orders': 'Замовлення',
        'account.tab.settings': 'Налаштування',
        
        // Dashboard
        'account.dashboard.title': 'Панель керування',
        'account.dashboard.welcome': 'Ласкаво просимо, {name}!',
        'account.dashboard.description': 'Це ваша особиста панель. Тут ви можете побачити огляд вашого облікового запису.',
        'account.dashboard.quick_info': 'Швидка інформація',
        'account.dashboard.full_name': 'Повне ім\'я',
        'account.dashboard.email': 'Email',
        'account.dashboard.phone': 'Телефон',
        'account.dashboard.country': 'Країна',
        'account.dashboard.not_set': 'Не встановлено',
        'account.dashboard.edit_profile': 'Редагувати профіль',
        'account.dashboard.view_orders': 'Переглянути замовлення',
        
        // Profile
        'account.profile.title': 'Профіль',
        'account.profile.image': 'Зображення профілю',
        'account.profile.change_image': 'Змінити зображення профілю',
        'account.profile.upload_hint': 'Завантажте зображення JPG, PNG або GIF (макс 5MB)',
        'account.profile.upload_button': 'Завантажити зображення',
        'account.profile.personal_info': 'Особиста інформація',
        'account.profile.first_name': 'Ім\'я',
        'account.profile.last_name': 'Прізвище',
        'account.profile.company': 'Компанія',
        'account.profile.address_info': 'Адреса',
        'account.profile.city': 'Місто',
        'account.profile.address': 'Повна адреса',
        'account.profile.postal_code': 'Поштовий індекс',
        'account.profile.edit': 'Редагувати профіль',
        'account.profile.save': 'Зберегти зміни',
        'account.profile.cancel': 'Скасувати',
        'account.profile.required': 'Обов\'язково',
        'account.profile.email_hint': 'Email використовується для автентифікації',
        'account.profile.address_hint': 'Вулиця, номер, будинок, квартира тощо',
        'account.profile.select_country': 'Виберіть країну',
        
        // Orders
        'account.orders.title': 'Мої замовлення',
        'account.orders.loading': 'Завантаження замовлень...',
        'account.orders.empty': 'Поки немає замовлень',
        'account.orders.empty_text': 'Коли ви зробите замовлення, ви побачите його тут.',
        'account.orders.number': 'Замовлення',
        'account.orders.date': 'Дата',
        'account.orders.total': 'Всього',
        'account.orders.status': 'Статус',
        'account.orders.view_details': 'Переглянути деталі',
        'account.orders.cancel': 'Скасувати замовлення',
        'account.orders.tracking': 'Відстеження',
        'account.orders.invoice': 'Рахунок',
        'account.orders.download_invoice': 'Завантажити рахунок',
        
        // Order Status
        'order.status.in_asteptare': 'Очікується',
        'order.status.confirmat': 'Підтверджено',
        'order.status.in_procesare': 'В обробці',
        'order.status.expediat': 'Відправлено',
        'order.status.livrat': 'Доставлено',
        'order.status.anulat': 'Скасовано',
        
        // Settings
        'account.settings.title': 'Налаштування',
        'account.settings.security': 'Безпека',
        'account.settings.security_desc': 'Керуйте налаштуваннями безпеки вашого облікового запису.',
        'account.settings.change_password': 'Змінити пароль',
        'account.settings.preferences': 'Переваги',
        'account.settings.language': 'Мова',
        'account.settings.theme': 'Тема',
        'account.settings.theme_auto': 'Автоматично',
        'account.settings.account': 'Обліковий запис',
        'account.settings.logout': 'Вийти',
        
        // Messages
        'account.msg.not_authenticated': 'Не автентифіковано',
        'account.msg.login_required': 'Будь ласка, увійдіть, щоб отримати доступ до вашого облікового запису.',
        'account.msg.profile_updated': 'Профіль успішно оновлено!',
        'account.msg.profile_error': 'Помилка збереження профілю',
        'account.msg.image_uploaded': 'Зображення успішно завантажено!',
        'account.msg.image_error': 'Помилка завантаження зображення',
        'account.msg.orders_error': 'Помилка завантаження замовлень',
        'account.msg.feature_soon': 'Функція буде доступна незабаром',
        'account.msg.logout_confirm': 'Ви впевнені, що хочете вийти?',
        'account.msg.cancel_order_confirm': 'Ви впевнені, що хочете скасувати це замовлення?',
        
        // Validation
        'validation.email_invalid': 'Невірний формат email',
        'validation.phone_invalid': 'Невірний формат телефону',
        'validation.required': 'Це поле обов\'язкове',
        'validation.min_length': 'Мінімум {min} символів',
        'validation.max_size': 'Максимальний розмір: {max}',
        
        // Countries
        'country.romania': 'Румунія',
        'country.italy': 'Італія',
        'country.spain': 'Іспанія',
        'country.germany': 'Німеччина',
        'country.france': 'Франція',
        'country.other': 'Інша країна'
    }
};

// Funcție helper pentru traduceri
function tr(key, replacements = {}) {
    const lang = localStorage.getItem('language') || 'ro';
    
    // Caută mai întâi în ACCOUNT_TRANSLATIONS
    let text = ACCOUNT_TRANSLATIONS[lang]?.[key] || ACCOUNT_TRANSLATIONS['ro'][key];
    
    // Dacă nu găsește, caută în window.translations (pentru asistent)
    if (!text || text === key) {
        text = window.translations?.[lang]?.[key] || window.translations?.['ro']?.[key] || key;
    }
    
    // Replace placeholders
    Object.keys(replacements).forEach(placeholder => {
        text = text.replace(`{${placeholder}}`, replacements[placeholder]);
    });
    
    return text;
}

// Export
window.tr = tr;
window.ACCOUNT_TRANSLATIONS = ACCOUNT_TRANSLATIONS;

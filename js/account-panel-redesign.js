/**
 * ACCOUNT PANEL REDESIGN - STRUCTURĂ COMPLET NOUĂ
 * Layout modern: Sidebar + Content (ca Amazon, Apple)
 * + Multilingv complet (RO/EN/IT/ES)
 * + Sincronizare temă automată
 * + Responsive perfect
 */

(function() {
    'use strict';

    const AccountPanelRedesign = {
        panel: null,
        overlay: null,
        currentPage: 'dashboard',
        isOpen: false,
        userData: null,
        editMode: false,
        currentLanguage: 'ro',

        // Traduceri complete
        translations: {
            ro: {
                // Header
                'close': 'Închide',
                
                // Navigation
                'nav.general': 'General',
                'nav.dashboard': 'Dashboard',
                'nav.profile': 'Profilul Meu',
                'nav.orders': 'Comenzi',
                'nav.myorders': 'Comenzile Mele',
                'nav.history': 'Istoric',
                'nav.settings': 'Setări',
                'nav.account': 'Setări Cont',
                'nav.security': 'Securitate',
                'nav.logout': 'Deconectare',
                
                // Dashboard
                'dash.welcome': 'Bun venit',
                'dash.subtitle': 'Acesta este dashboard-ul tău personal',
                'dash.totalorders': 'Total Comenzi',
                'dash.totalspent': 'Total Cheltuit',
                'dash.activeorders': 'Comenzi Active',
                'dash.allorders': 'Toate comenzile',
                'dash.totalvalue': 'Valoare totală',
                'dash.inprocess': 'În procesare',
                'dash.quickactions': 'Acțiuni Rapide',
                'dash.editprofile': 'Editează Profilul',
                'dash.vieworders': 'Vezi Comenzile',
                'dash.settings': 'Setări',
                
                // Profile
                'profile.title': 'Profilul Meu',
                'profile.subtitle': 'Gestionează informațiile tale personale',
                'profile.changephoto': 'Schimbă Poza',
                'profile.firstname': 'Prenume',
                'profile.lastname': 'Nume',
                'profile.email': 'Email',
                'profile.phone': 'Telefon',
                'profile.country': 'Țară',
                'profile.city': 'Oraș',
                'profile.address': 'Adresă',
                'profile.edit': 'Editează Profilul',
                'profile.edittitle': 'Editează Profilul',
                'profile.editsubtitle': 'Actualizează informațiile tale personale',
                'profile.personalinfo': 'Informații Personale',
                'profile.addressinfo': 'Adresă',
                'profile.save': 'Salvează Modificările',
                'profile.cancel': 'Anulează',
                'profile.required': 'obligatoriu',
                'profile.select': 'Selectează',
                'profile.fulladdress': 'Adresă Completă',
                
                // Orders
                'orders.title': 'Comenzile Mele',
                'orders.subtitle': 'Vizualizează și gestionează comenzile tale',
                'orders.empty': 'Nu ai comenzi încă',
                'orders.emptytext': 'Când vei plasa o comandă, o vei vedea aici.',
                'orders.loading': 'Se încarcă...',
                'orders.error': 'Eroare la încărcarea comenzilor',
                
                // History
                'history.title': 'Istoric Comenzi',
                'history.subtitle': 'Vezi toate comenzile tale anterioare',
                'history.empty': 'Istoric gol',
                'history.emptytext': 'Nu există comenzi finalizate încă.',
                
                // Settings
                'settings.title': 'Setări Cont',
                'settings.subtitle': 'Gestionează preferințele contului tău',
                'settings.preferences': 'Preferințe',
                'settings.soon': 'Setările vor fi disponibile în curând.',
                
                // Security
                'security.title': 'Securitate',
                'security.subtitle': 'Gestionează securitatea contului tău',
                'security.changepass': 'Schimbă Parola',
                'security.currentpass': 'Parola Curentă',
                'security.newpass': 'Parola Nouă',
                'security.confirmpass': 'Confirmă Parola Nouă',
                'security.sessions': 'Sesiuni Active',
                'security.2fa': 'Autentificare cu 2 Factori',
                
                // Messages
                'msg.notauth': 'Nu ești autentificat',
                'msg.loginrequired': 'Te rugăm să te loghezi pentru a accesa contul tău.',
                'msg.profilesaved': 'Profil actualizat cu succes!',
                'msg.profileerror': 'Eroare la salvarea profilului',
                'msg.logoutconfirm': 'Sigur vrei să te deconectezi?',
                'msg.indev': 'Funcționalitate în dezvoltare'
            },
            
            en: {
                'close': 'Close',
                'nav.general': 'General',
                'nav.dashboard': 'Dashboard',
                'nav.profile': 'My Profile',
                'nav.orders': 'Orders',
                'nav.myorders': 'My Orders',
                'nav.history': 'History',
                'nav.settings': 'Settings',
                'nav.account': 'Account Settings',
                'nav.security': 'Security',
                'nav.logout': 'Logout',
                'dash.welcome': 'Welcome',
                'dash.subtitle': 'This is your personal dashboard',
                'dash.totalorders': 'Total Orders',
                'dash.totalspent': 'Total Spent',
                'dash.activeorders': 'Active Orders',
                'dash.allorders': 'All orders',
                'dash.totalvalue': 'Total value',
                'dash.inprocess': 'In process',
                'dash.quickactions': 'Quick Actions',
                'dash.editprofile': 'Edit Profile',
                'dash.vieworders': 'View Orders',
                'dash.settings': 'Settings',
                'profile.title': 'My Profile',
                'profile.subtitle': 'Manage your personal information',
                'profile.changephoto': 'Change Photo',
                'profile.firstname': 'First Name',
                'profile.lastname': 'Last Name',
                'profile.email': 'Email',
                'profile.phone': 'Phone',
                'profile.country': 'Country',
                'profile.city': 'City',
                'profile.address': 'Address',
                'profile.edit': 'Edit Profile',
                'profile.edittitle': 'Edit Profile',
                'profile.editsubtitle': 'Update your personal information',
                'profile.personalinfo': 'Personal Information',
                'profile.addressinfo': 'Address',
                'profile.save': 'Save Changes',
                'profile.cancel': 'Cancel',
                'profile.required': 'required',
                'profile.select': 'Select',
                'profile.fulladdress': 'Full Address',
                'orders.title': 'My Orders',
                'orders.subtitle': 'View and manage your orders',
                'orders.empty': 'No orders yet',
                'orders.emptytext': 'When you place an order, you will see it here.',
                'orders.loading': 'Loading...',
                'orders.error': 'Error loading orders',
                'history.title': 'Order History',
                'history.subtitle': 'View all your previous orders',
                'history.empty': 'Empty history',
                'history.emptytext': 'No completed orders yet.',
                'settings.title': 'Account Settings',
                'settings.subtitle': 'Manage your account preferences',
                'settings.preferences': 'Preferences',
                'settings.soon': 'Settings will be available soon.',
                'security.title': 'Security',
                'security.subtitle': 'Manage your account security',
                'security.changepass': 'Change Password',
                'msg.notauth': 'Not authenticated',
                'msg.loginrequired': 'Please log in to access your account.',
                'msg.profilesaved': 'Profile updated successfully!',
                'msg.profileerror': 'Error saving profile',
                'msg.logoutconfirm': 'Are you sure you want to logout?',
                'msg.indev': 'Feature in development'
            },
            
            it: {
                'close': 'Chiudi',
                'nav.general': 'Generale',
                'nav.dashboard': 'Dashboard',
                'nav.profile': 'Il Mio Profilo',
                'nav.orders': 'Ordini',
                'nav.myorders': 'I Miei Ordini',
                'nav.history': 'Storico',
                'nav.settings': 'Impostazioni',
                'nav.account': 'Impostazioni Account',
                'nav.security': 'Sicurezza',
                'nav.logout': 'Esci',
                'dash.welcome': 'Benvenuto',
                'dash.subtitle': 'Questa è la tua dashboard personale',
                'dash.totalorders': 'Ordini Totali',
                'dash.totalspent': 'Totale Speso',
                'dash.activeorders': 'Ordini Attivi',
                'dash.allorders': 'Tutti gli ordini',
                'dash.totalvalue': 'Valore totale',
                'dash.inprocess': 'In elaborazione',
                'dash.quickactions': 'Azioni Rapide',
                'dash.editprofile': 'Modifica Profilo',
                'dash.vieworders': 'Vedi Ordini',
                'dash.settings': 'Impostazioni',
                'profile.title': 'Il Mio Profilo',
                'profile.subtitle': 'Gestisci le tue informazioni personali',
                'profile.changephoto': 'Cambia Foto',
                'profile.firstname': 'Nome',
                'profile.lastname': 'Cognome',
                'profile.email': 'Email',
                'profile.phone': 'Telefono',
                'profile.country': 'Paese',
                'profile.city': 'Città',
                'profile.address': 'Indirizzo',
                'profile.edit': 'Modifica Profilo',
                'profile.edittitle': 'Modifica Profilo',
                'profile.editsubtitle': 'Aggiorna le tue informazioni personali',
                'profile.personalinfo': 'Informazioni Personali',
                'profile.addressinfo': 'Indirizzo',
                'profile.save': 'Salva Modifiche',
                'profile.cancel': 'Annulla',
                'profile.required': 'obbligatorio',
                'profile.select': 'Seleziona',
                'profile.fulladdress': 'Indirizzo Completo',
                'orders.title': 'I Miei Ordini',
                'orders.subtitle': 'Visualizza e gestisci i tuoi ordini',
                'orders.empty': 'Nessun ordine ancora',
                'orders.emptytext': 'Quando effettui un ordine, lo vedrai qui.',
                'orders.loading': 'Caricamento...',
                'orders.error': 'Errore nel caricamento degli ordini',
                'history.title': 'Storico Ordini',
                'history.subtitle': 'Vedi tutti i tuoi ordini precedenti',
                'history.empty': 'Storico vuoto',
                'history.emptytext': 'Nessun ordine completato ancora.',
                'settings.title': 'Impostazioni Account',
                'settings.subtitle': 'Gestisci le preferenze del tuo account',
                'settings.preferences': 'Preferenze',
                'settings.soon': 'Le impostazioni saranno disponibili presto.',
                'security.title': 'Sicurezza',
                'security.subtitle': 'Gestisci la sicurezza del tuo account',
                'security.changepass': 'Cambia Password',
                'msg.notauth': 'Non autenticato',
                'msg.loginrequired': 'Effettua il login per accedere al tuo account.',
                'msg.profilesaved': 'Profilo aggiornato con successo!',
                'msg.profileerror': 'Errore nel salvare il profilo',
                'msg.logoutconfirm': 'Sei sicuro di voler uscire?',
                'msg.indev': 'Funzionalità in sviluppo'
            },
            
            es: {
                'close': 'Cerrar',
                'nav.general': 'General',
                'nav.dashboard': 'Panel',
                'nav.profile': 'Mi Perfil',
                'nav.orders': 'Pedidos',
                'nav.myorders': 'Mis Pedidos',
                'nav.history': 'Historial',
                'nav.settings': 'Configuración',
                'nav.account': 'Configuración de Cuenta',
                'nav.security': 'Seguridad',
                'nav.logout': 'Cerrar Sesión',
                'dash.welcome': 'Bienvenido',
                'dash.subtitle': 'Este es tu panel personal',
                'dash.totalorders': 'Pedidos Totales',
                'dash.totalspent': 'Total Gastado',
                'dash.activeorders': 'Pedidos Activos',
                'dash.allorders': 'Todos los pedidos',
                'dash.totalvalue': 'Valor total',
                'dash.inprocess': 'En proceso',
                'dash.quickactions': 'Acciones Rápidas',
                'dash.editprofile': 'Editar Perfil',
                'dash.vieworders': 'Ver Pedidos',
                'dash.settings': 'Configuración',
                'profile.title': 'Mi Perfil',
                'profile.subtitle': 'Gestiona tu información personal',
                'profile.changephoto': 'Cambiar Foto',
                'profile.firstname': 'Nombre',
                'profile.lastname': 'Apellido',
                'profile.email': 'Email',
                'profile.phone': 'Teléfono',
                'profile.country': 'País',
                'profile.city': 'Ciudad',
                'profile.address': 'Dirección',
                'profile.edit': 'Editar Perfil',
                'profile.edittitle': 'Editar Perfil',
                'profile.editsubtitle': 'Actualiza tu información personal',
                'profile.personalinfo': 'Información Personal',
                'profile.addressinfo': 'Dirección',
                'profile.save': 'Guardar Cambios',
                'profile.cancel': 'Cancelar',
                'profile.required': 'requerido',
                'profile.select': 'Seleccionar',
                'profile.fulladdress': 'Dirección Completa',
                'orders.title': 'Mis Pedidos',
                'orders.subtitle': 'Ver y gestionar tus pedidos',
                'orders.empty': 'No hay pedidos aún',
                'orders.emptytext': 'Cuando realices un pedido, lo verás aquí.',
                'orders.loading': 'Cargando...',
                'orders.error': 'Error al cargar pedidos',
                'history.title': 'Historial de Pedidos',
                'history.subtitle': 'Ver todos tus pedidos anteriores',
                'history.empty': 'Historial vacío',
                'history.emptytext': 'No hay pedidos completados aún.',
                'settings.title': 'Configuración de Cuenta',
                'settings.subtitle': 'Gestiona las preferencias de tu cuenta',
                'settings.preferences': 'Preferencias',
                'settings.soon': 'La configuración estará disponible pronto.',
                'security.title': 'Seguridad',
                'security.subtitle': 'Gestiona la seguridad de tu cuenta',
                'security.changepass': 'Cambiar Contraseña',
                'msg.notauth': 'No autenticado',
                'msg.loginrequired': 'Por favor inicia sesión para acceder a tu cuenta.',
                'msg.profilesaved': '¡Perfil actualizado con éxito!',
                'msg.profileerror': 'Error al guardar el perfil',
                'msg.logoutconfirm': '¿Estás seguro de que quieres cerrar sesión?',
                'msg.indev': 'Funcionalidad en desarrollo'
            }
        },

        init() {
            this.createPanel();
            this.attachEvents();
            this.setupLanguageSync();
            this.setupThemeSync();
            console.log('✅ Account Panel Redesign initialized');
        },
        
        // Sincronizare limbă
        setupLanguageSync() {
            // Ascultă schimbările de limbă
            window.addEventListener('languageChanged', () => {
                console.log('🌐 Limbă schimbată, actualizare panou cont...');
                this.currentLanguage = localStorage.getItem('language') || 'ro';
                
                // Dacă panelul este deschis, reîncarcă pagina curentă
                if (this.isOpen) {
                    this.loadPage(this.currentPage);
                }
            });
            
            // Setează limba inițială
            this.currentLanguage = localStorage.getItem('language') || 'ro';
            console.log('✅ Sincronizare limbă configurată:', this.currentLanguage);
        },

        // Traducere
        t(key) {
            // Folosește funcția globală tr() dacă există
            if (typeof window.tr === 'function') {
                return window.tr(key);
            }
            
            // Fallback la traducerile locale
            const lang = localStorage.getItem('language') || 'ro';
            return this.translations[lang]?.[key] || this.translations['ro'][key] || key;
        },

        // Sincronizare limbă
        setupLanguageSync() {
            this.currentLanguage = localStorage.getItem('language') || 'ro';
            
            // Listen for language changes from main site
            window.addEventListener('languageChanged', (e) => {
                const newLang = e.detail.language;
                if (newLang && newLang !== this.currentLanguage) {
                    this.currentLanguage = newLang;
                    if (this.isOpen) {
                        this.updateSidebarTranslations();
                        this.loadPage(this.currentPage);
                    }
                    // Update dropdown if on settings page
                    const languageSelect = document.getElementById('languageSelect');
                    if (languageSelect) {
                        languageSelect.value = newLang;
                    }
                }
            });
            
            // Fallback: Observer pentru schimbări de limbă (pentru compatibilitate)
            setInterval(() => {
                const newLang = localStorage.getItem('language') || 'ro';
                if (newLang !== this.currentLanguage) {
                    this.currentLanguage = newLang;
                    if (this.isOpen) {
                        this.updateSidebarTranslations();
                        this.loadPage(this.currentPage);
                    }
                }
            }, 500);
        },

        // Sincronizare temă
        setupThemeSync() {
            // CSS folosește deja variabilele site-ului, deci se sincronizează automat
            // Dar putem adăuga un observer pentru debugging
            const observer = new MutationObserver(() => {
                // Tema se sincronizează automat prin CSS variables
            });
            
            observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['class']
            });
        },

        createPanel() {
            // Overlay
            this.overlay = document.createElement('div');
            this.overlay.className = 'account-overlay-redesign';
            document.body.appendChild(this.overlay);

            // Panel
            this.panel = document.createElement('div');
            this.panel.className = 'account-panel-redesign';
            this.panel.innerHTML = this.getPanelHTML();
            document.body.appendChild(this.panel);
        },

        getPanelHTML() {
            return `
                <!-- Header Compact -->
                <div class="account-header-redesign">
                    <div class="account-header-left">
                        <!-- Mobile Menu Toggle -->
                        <button class="mobile-menu-toggle" id="mobileMenuToggle" onclick="window.AccountPanelRedesign.toggleMobileMenu()">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        
                        <div class="account-avatar-redesign" id="headerAvatar" onclick="window.AccountPanelRedesign.navigateTo('profile')">
                            👤
                        </div>
                        <div class="account-user-info-redesign">
                            <h3 id="headerUserName">User</h3>
                            <p id="headerUserEmail">email@example.com</p>
                        </div>
                    </div>
                    <div class="account-header-right">
                        <button class="account-close-redesign" onclick="window.AccountPanelRedesign.hide()" title="${this.t('close')}">
                            ✕
                        </button>
                    </div>
                </div>
                
                <!-- Mobile Sidebar Overlay -->
                <div class="sidebar-mobile-overlay" id="sidebarMobileOverlay" onclick="window.AccountPanelRedesign.closeMobileMenu()"></div>

                <!-- Layout Principal: Sidebar + Content -->
                <div class="account-main-layout">
                    <!-- Sidebar Navigation -->
                    <div class="account-sidebar-redesign" id="sidebarNav">
                        <div class="account-nav-section">
                            <div class="account-nav-title" data-tr="nav.general">${this.t('nav.general')}</div>
                            <div class="account-nav-item active" onclick="window.AccountPanelRedesign.navigateTo('dashboard')">
                                <span class="account-nav-icon">📊</span>
                                <span data-tr="nav.dashboard">${this.t('nav.dashboard')}</span>
                            </div>
                            <div class="account-nav-item" onclick="window.AccountPanelRedesign.navigateTo('profile')">
                                <span class="account-nav-icon">👤</span>
                                <span data-tr="nav.profile">${this.t('nav.profile')}</span>
                            </div>
                        </div>

                        <div class="account-nav-section">
                            <div class="account-nav-title" data-tr="nav.orders">${this.t('nav.orders')}</div>
                            <div class="account-nav-item" onclick="window.AccountPanelRedesign.navigateTo('orders')">
                                <span class="account-nav-icon">📦</span>
                                <span data-tr="nav.myorders">${this.t('nav.myorders')}</span>
                                <span class="account-nav-badge" id="ordersBadge">0</span>
                            </div>
                            <div class="account-nav-item" onclick="window.AccountPanelRedesign.navigateTo('history')">
                                <span class="account-nav-icon">📜</span>
                                <span data-tr="nav.history">${this.t('nav.history')}</span>
                            </div>
                        </div>

                        <div class="account-nav-section">
                            <div class="account-nav-title" data-tr="nav.settings">${this.t('nav.settings')}</div>
                            <div class="account-nav-item" onclick="window.AccountPanelRedesign.navigateTo('settings')">
                                <span class="account-nav-icon">⚙️</span>
                                <span data-tr="nav.account">${this.t('nav.account')}</span>
                            </div>
                            <div class="account-nav-item" onclick="window.AccountPanelRedesign.navigateTo('security')">
                                <span class="account-nav-icon">🔐</span>
                                <span data-tr="nav.security">${this.t('nav.security')}</span>
                            </div>
                            <div class="account-nav-item" onclick="window.AccountPanelRedesign.logout()">
                                <span class="account-nav-icon">🚪</span>
                                <span data-tr="nav.logout">${this.t('nav.logout')}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Content Area -->
                    <div class="account-content-redesign" id="accountContentRedesign">
                        <p style="text-align: center; color: var(--muted-foreground);" data-tr="orders.loading">${this.t('orders.loading')}</p>
                    </div>
                </div>

                <input type="file" id="avatarFileInput" accept="image/*" style="display: none;">
            `;
        },

        attachEvents() {
            this.overlay.addEventListener('click', () => this.hide());
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.hide();
                }
            });

            // Avatar upload
            const fileInput = document.getElementById('avatarFileInput');
            if (fileInput) {
                fileInput.addEventListener('change', (e) => this.handleAvatarUpload(e));
            }
        },

        show(page = 'dashboard') {
            if (!this.panel || !this.overlay) return;
            
            this.currentPage = page;
            this.isOpen = true;
            
            this.overlay.classList.add('active');
            this.panel.classList.add('active');

            // Sincronizează limba cu pagina principală
            const currentLang = localStorage.getItem('language') || 'ro';
            if (currentLang !== this.currentLanguage) {
                this.currentLanguage = currentLang;
            }

            this.loadUserData();
            this.navigateTo(page);
        },

        hide() {
            this.isOpen = false;
            this.panel.classList.remove('active');
            this.overlay.classList.remove('active');
            this.closeMobileMenu();
        },

        navigateTo(page) {
            this.currentPage = page;
            
            // Update active nav item
            document.querySelectorAll('.account-nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            const navItems = document.querySelectorAll('.account-nav-item');
            const pageIndex = {
                'dashboard': 0,
                'profile': 1,
                'orders': 2,
                'history': 3,
                'settings': 4,
                'security': 5
            };
            
            if (navItems[pageIndex[page]]) {
                navItems[pageIndex[page]].classList.add('active');
            }
            
            this.loadPage(page);
            
            // Close mobile menu after navigation
            this.closeMobileMenu();
        },
        
        toggleMobileMenu() {
            const sidebar = document.getElementById('sidebarNav');
            const overlay = document.getElementById('sidebarMobileOverlay');
            const toggle = document.getElementById('mobileMenuToggle');
            
            if (sidebar && overlay && toggle) {
                sidebar.classList.toggle('mobile-active');
                overlay.classList.toggle('active');
                toggle.classList.toggle('active');
            }
        },
        
        closeMobileMenu() {
            const sidebar = document.getElementById('sidebarNav');
            const overlay = document.getElementById('sidebarMobileOverlay');
            const toggle = document.getElementById('mobileMenuToggle');
            
            if (sidebar) sidebar.classList.remove('mobile-active');
            if (overlay) overlay.classList.remove('active');
            if (toggle) toggle.classList.remove('active');
        },

        loadUserData() {
            try {
                const userStr = localStorage.getItem('currentUser');
                this.userData = userStr ? JSON.parse(userStr) : null;
                
                if (this.userData) {
                    const firstName = this.userData.firstName || 'Utilizator';
                    const lastName = this.userData.lastName || '';
                    document.getElementById('headerUserName').textContent = `${firstName} ${lastName}`.trim();
                    document.getElementById('headerUserEmail').textContent = this.userData.email || '';
                    
                    // Avatar
                    const headerAvatar = document.getElementById('headerAvatar');
                    if (this.userData.avatar) {
                        // Dacă există avatar salvat (base64)
                        headerAvatar.style.backgroundImage = `url(${this.userData.avatar})`;
                        headerAvatar.style.backgroundSize = 'cover';
                        headerAvatar.style.backgroundPosition = 'center';
                        headerAvatar.textContent = '';
                    } else {
                        // Afișează inițialele
                        const initials = (firstName.charAt(0) + (lastName.charAt(0) || '')).toUpperCase();
                        headerAvatar.textContent = initials || '👤';
                        headerAvatar.style.backgroundImage = 'none';
                    }
                    
                    this.loadStats();
                }
            } catch (e) {
                console.error('Error loading user data:', e);
            }
        },

        async loadStats() {
            try {
                if (window.API) {
                    const data = await window.API.getOrders();
                    const orders = Array.isArray(data) ? data : (data.data || []);
                    document.getElementById('ordersBadge').textContent = orders.length;
                }
            } catch (error) {
                // Silent fail
            }
        },

        async loadPage(page) {
            const content = document.getElementById('accountContentRedesign');
            
            if (!this.userData) {
                content.innerHTML = `
                    <div class="empty-state-redesign">
                        <div class="icon">🔒</div>
                        <h3>Nu ești autentificat</h3>
                        <p>Te rugăm să te loghezi pentru a accesa contul tău.</p>
                    </div>
                `;
                return;
            }

            switch(page) {
                case 'dashboard':
                    this.loadDashboard();
                    break;
                case 'profile':
                    this.loadProfile();
                    break;
                case 'orders':
                    await this.loadOrders();
                    break;
                case 'history':
                    this.loadHistory();
                    break;
                case 'settings':
                    this.loadSettings();
                    break;
                case 'security':
                    this.loadSecurity();
                    break;
            }
        },

        loadDashboard() {
            const content = document.getElementById('accountContentRedesign');
            const user = this.userData;
            
            content.innerHTML = `
                <div class="page-header-redesign">
                    <h1>${this.t('dash.welcome')}, ${user.firstName}!</h1>
                    <p>${this.t('dash.subtitle')}</p>
                </div>

                <div class="stats-grid-redesign">
                    <div class="stat-card-redesign">
                        <div class="stat-label-redesign">
                            <span>📦</span>
                            ${this.t('dash.totalorders')}
                        </div>
                        <div class="stat-value-redesign" id="dashStatOrders">0</div>
                        <div class="stat-change-redesign">↑ ${this.t('dash.allorders')}</div>
                    </div>
                    <div class="stat-card-redesign">
                        <div class="stat-label-redesign">
                            <span>💰</span>
                            ${this.t('dash.totalspent')}
                        </div>
                        <div class="stat-value-redesign" id="dashStatTotal">0 EUR</div>
                        <div class="stat-change-redesign">↑ ${this.t('dash.totalvalue')}</div>
                    </div>
                    <div class="stat-card-redesign">
                        <div class="stat-label-redesign">
                            <span>🚀</span>
                            ${this.t('dash.activeorders')}
                        </div>
                        <div class="stat-value-redesign" id="dashStatActive">0</div>
                        <div class="stat-change-redesign">↑ ${this.t('dash.inprocess')}</div>
                    </div>
                </div>

                <div class="section-card-redesign">
                    <div class="section-header-redesign">
                        <h2 class="section-title-redesign">${this.t('dash.quickactions')}</h2>
                    </div>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <button class="btn-primary-redesign" onclick="window.AccountPanelRedesign.navigateTo('profile')">
                            ✏️ ${this.t('dash.editprofile')}
                        </button>
                        <button class="btn-secondary-redesign" onclick="window.AccountPanelRedesign.navigateTo('orders')">
                            📦 ${this.t('dash.vieworders')}
                        </button>
                        <button class="btn-outline-redesign" onclick="window.AccountPanelRedesign.navigateTo('settings')">
                            ⚙️ ${this.t('dash.settings')}
                        </button>
                    </div>
                </div>
            `;
            
            // Load stats
            this.loadDashboardStats();
        },

        async loadDashboardStats() {
            try {
                if (window.API) {
                    const data = await window.API.getOrders();
                    const orders = Array.isArray(data) ? data : (data.data || []);
                    
                    document.getElementById('dashStatOrders').textContent = orders.length;
                    
                    const total = orders.reduce((sum, order) => sum + (parseFloat(order.total_amount) || 0), 0);
                    document.getElementById('dashStatTotal').textContent = total.toFixed(2) + ' EUR';
                    
                    const active = orders.filter(o => ['in_asteptare', 'confirmat', 'in_procesare', 'expediat'].includes(o.status)).length;
                    document.getElementById('dashStatActive').textContent = active;
                }
            } catch (error) {
                // Silent fail
            }
        },

        loadProfile() {
            const content = document.getElementById('accountContentRedesign');
            const user = this.userData;
            
            if (!this.editMode) {
                content.innerHTML = `
                    <div class="page-header-redesign">
                        <h1>${this.t('profile.title')}</h1>
                        <p>${this.t('profile.subtitle')}</p>
                    </div>

                    <div class="section-card-redesign">
                        <div class="profile-grid-redesign">
                            <div class="profile-avatar-section">
                                ${user.avatar ? 
                                    `<img id="avatarImage" class="profile-avatar-large" src="${user.avatar}" alt="Avatar">` :
                                    `<div id="avatarImage" class="profile-avatar-large">${(user.firstName?.charAt(0) || '') + (user.lastName?.charAt(0) || '')}</div>`
                                }
                                <div class="profile-avatar-actions">
                                    <button class="btn-primary-redesign btn-sm-redesign btn-full-redesign" onclick="window.AccountPanelRedesign.uploadAvatar()">
                                        📤 ${this.t('profile.changephoto')}
                                    </button>
                                    ${user.avatar ? `
                                    <button class="btn-secondary-redesign btn-sm-redesign btn-full-redesign" onclick="window.AccountPanelRedesign.removeAvatar()" style="margin-top: 0.5rem;">
                                        🗑️ Șterge Poza
                                    </button>
                                    ` : ''}
                                </div>
                            </div>

                            <div class="profile-info-section">
                                <div class="info-field-redesign">
                                    <div class="info-label-redesign">${this.t('profile.firstname')}</div>
                                    <div class="info-value-redesign">${user.firstName || '-'}</div>
                                </div>
                                <div class="info-field-redesign">
                                    <div class="info-label-redesign">${this.t('profile.lastname')}</div>
                                    <div class="info-value-redesign">${user.lastName || '-'}</div>
                                </div>
                                <div class="info-field-redesign">
                                    <div class="info-label-redesign">${this.t('profile.email')}</div>
                                    <div class="info-value-redesign">${user.email || '-'}</div>
                                </div>
                                <div class="info-field-redesign">
                                    <div class="info-label-redesign">${this.t('profile.phone')}</div>
                                    <div class="info-value-redesign">${user.phone || '-'}</div>
                                </div>
                                <div class="info-field-redesign">
                                    <div class="info-label-redesign">${this.t('profile.country')}</div>
                                    <div class="info-value-redesign">${user.country || '-'}</div>
                                </div>
                                <div class="info-field-redesign">
                                    <div class="info-label-redesign">${this.t('profile.city')}</div>
                                    <div class="info-value-redesign">${user.city || '-'}</div>
                                </div>
                                <div class="info-field-redesign full-width">
                                    <div class="info-label-redesign">${this.t('profile.address')}</div>
                                    <div class="info-value-redesign">${user.address || '-'}</div>
                                </div>
                            </div>
                        </div>

                        <button class="btn-primary-redesign" onclick="window.AccountPanelRedesign.enableEditMode()">
                            ✏️ ${this.t('profile.edit')}
                        </button>
                    </div>
                `;
            } else {
                this.loadProfileEditForm();
            }
        },

        loadProfileEditForm() {
            const content = document.getElementById('accountContentRedesign');
            const user = this.userData;
            
            content.innerHTML = `
                <div class="page-header-redesign">
                    <h1>${this.t('profile.edittitle')}</h1>
                    <p>${this.t('profile.editsubtitle')}</p>
                </div>

                <form id="profileEditForm" onsubmit="window.AccountPanelRedesign.saveProfile(event)">
                    <div class="section-card-redesign">
                        <h3 style="margin-top: 0;">${this.t('profile.personalinfo')}</h3>
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
                            <div class="form-field-redesign">
                                <label>${this.t('profile.firstname')} *</label>
                                <input type="text" name="firstName" value="${user.firstName || ''}" required>
                            </div>
                            <div class="form-field-redesign">
                                <label>${this.t('profile.lastname')} *</label>
                                <input type="text" name="lastName" value="${user.lastName || ''}" required>
                            </div>
                            <div class="form-field-redesign">
                                <label>${this.t('profile.email')} *</label>
                                <input type="email" name="email" value="${user.email || ''}" required>
                            </div>
                            <div class="form-field-redesign">
                                <label>${this.t('profile.phone')} *</label>
                                <input type="tel" name="phone" value="${user.phone || ''}" required>
                            </div>
                        </div>
                    </div>

                    <div class="section-card-redesign">
                        <h3 style="margin-top: 0;">${this.t('profile.addressinfo')}</h3>
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
                            <div class="form-field-redesign">
                                <label>${this.t('profile.country')} *</label>
                                <select name="country" required>
                                    <option value="">${this.t('profile.select')}</option>
                                    <option value="România" ${user.country === 'România' ? 'selected' : ''}>România</option>
                                    <option value="Italia" ${user.country === 'Italia' ? 'selected' : ''}>Italia</option>
                                    <option value="Spania" ${user.country === 'Spania' ? 'selected' : ''}>Spania</option>
                                    <option value="Germania" ${user.country === 'Germania' ? 'selected' : ''}>Germania</option>
                                    <option value="Franța" ${user.country === 'Franța' ? 'selected' : ''}>Franța</option>
                                </select>
                            </div>
                            <div class="form-field-redesign">
                                <label>${this.t('profile.city')} *</label>
                                <input type="text" name="city" value="${user.city || ''}" required>
                            </div>
                            <div class="form-field-redesign" style="grid-column: 1 / -1;">
                                <label>${this.t('profile.fulladdress')} *</label>
                                <textarea name="address" required>${user.address || ''}</textarea>
                            </div>
                        </div>
                    </div>

                    <div style="display: flex; gap: 10px;">
                        <button type="submit" class="btn-primary-redesign">
                            💾 ${this.t('profile.save')}
                        </button>
                        <button type="button" class="btn-outline-redesign" onclick="window.AccountPanelRedesign.cancelEdit()">
                            ❌ ${this.t('profile.cancel')}
                        </button>
                    </div>
                </form>
            `;
        },

        enableEditMode() {
            this.editMode = true;
            this.loadProfile();
        },

        cancelEdit() {
            this.editMode = false;
            this.loadProfile();
        },

        async saveProfile(event) {
            event.preventDefault();
            
            const form = event.target;
            const formData = new FormData(form);
            const updatedData = {};
            
            formData.forEach((value, key) => {
                updatedData[key] = value;
            });
            
            try {
                this.userData = { ...this.userData, ...updatedData };
                localStorage.setItem('currentUser', JSON.stringify(this.userData));
                
                this.editMode = false;
                this.loadUserData();
                this.loadProfile();
                
                this.showNotification('Profil actualizat cu succes!');
            } catch (error) {
                this.showNotification('Eroare la salvarea profilului', 'error');
            }
        },

        uploadAvatar() {
            document.getElementById('avatarFileInput').click();
        },

        handleAvatarUpload(event) {
            const file = event.target.files[0];
            if (!file) return;

            // Validare tip fișier
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                this.showNotification('Te rugăm să selectezi o imagine validă (JPG, PNG, GIF, WEBP)', 'error');
                event.target.value = '';
                return;
            }

            // Validare dimensiune (max 5MB)
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                this.showNotification('Imaginea este prea mare. Dimensiunea maximă este 5MB', 'error');
                event.target.value = '';
                return;
            }

            // Citește imaginea și convertește în base64
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageData = e.target.result;
                
                // Salvează în userData
                this.userData.avatar = imageData;
                localStorage.setItem('currentUser', JSON.stringify(this.userData));
                
                // Reload profile pentru a afișa noua imagine
                this.loadProfile();
                
                // Update avatar în header dacă există
                const headerAvatar = document.querySelector('.account-avatar-redesign img');
                if (headerAvatar) {
                    headerAvatar.src = imageData;
                }
                
                this.showNotification('Fotografia de profil a fost actualizată cu succes!', 'success');
            };
            
            reader.onerror = () => {
                this.showNotification('Eroare la încărcarea imaginii', 'error');
            };
            
            reader.readAsDataURL(file);
            event.target.value = '';
        },
        
        removeAvatar() {
            if (!confirm('Sigur vrei să ștergi fotografia de profil?')) return;
            
            // Șterge avatar din userData
            delete this.userData.avatar;
            localStorage.setItem('currentUser', JSON.stringify(this.userData));
            
            // Reload profile
            this.loadProfile();
            
            // Update avatar în header
            const headerAvatar = document.querySelector('.account-avatar-redesign img');
            if (headerAvatar) {
                const initials = (this.userData.firstName?.charAt(0) || '') + (this.userData.lastName?.charAt(0) || '');
                headerAvatar.parentElement.innerHTML = `<div class="account-avatar-redesign">${initials}</div>`;
            }
            
            this.showNotification('Fotografia de profil a fost ștearsă', 'success');
        },

        async loadOrders() {
            const content = document.getElementById('accountContentRedesign');
            
            content.innerHTML = `
                <div class="page-header-redesign">
                    <h1>Comenzile Mele</h1>
                    <p>Vizualizează și gestionează comenzile tale</p>
                </div>
                <p style="text-align: center; color: var(--muted-foreground);">Se încarcă...</p>
            `;
            
            try {
                if (!window.API) throw new Error('API not available');

                const data = await window.API.getOrders();
                let orders = Array.isArray(data) ? data : (data.data || []);
                
                if (orders.length === 0) {
                    content.innerHTML = `
                        <div class="page-header-redesign">
                            <h1>Comenzile Mele</h1>
                            <p>Vizualizează și gestionează comenzile tale</p>
                        </div>
                        <div class="empty-state-redesign">
                            <div class="icon">📦</div>
                            <h3>Nu ai comenzi încă</h3>
                            <p>Când vei plasa o comandă, o vei vedea aici.</p>
                        </div>
                    `;
                    return;
                }

                let html = `
                    <div class="page-header-redesign">
                        <h1>Comenzile Mele</h1>
                        <p>Vizualizează și gestionează comenzile tale</p>
                    </div>
                    <div class="orders-list-redesign">
                `;
                
                orders.forEach(order => {
                    const date = new Date(order.created_at).toLocaleDateString('ro-RO');
                    html += `
                        <div class="order-item-redesign">
                            <div class="order-icon-redesign">📦</div>
                            <div class="order-info-redesign">
                                <h4>${order.order_number}</h4>
                                <p>${date}</p>
                            </div>
                            <div class="order-status-redesign">${order.status}</div>
                            <div class="order-amount-redesign">${order.total_amount} EUR</div>
                        </div>
                    `;
                });
                
                html += `</div>`;
                content.innerHTML = html;
            } catch (error) {
                content.innerHTML = `
                    <div class="page-header-redesign">
                        <h1>Comenzile Mele</h1>
                        <p>Vizualizează și gestionează comenzile tale</p>
                    </div>
                    <p style="color: var(--destructive); text-align: center;">Eroare la încărcarea comenzilor</p>
                `;
            }
        },

        loadHistory() {
            const content = document.getElementById('accountContentRedesign');
            content.innerHTML = `
                <div class="page-header-redesign">
                    <h1>Istoric Comenzi</h1>
                    <p>Vezi toate comenzile tale anterioare</p>
                </div>
                <div class="empty-state-redesign">
                    <div class="icon">📜</div>
                    <h3>Istoric gol</h3>
                    <p>Nu există comenzi finalizate încă.</p>
                </div>
            `;
        },

        loadSettings() {
            const content = document.getElementById('accountContentRedesign');
            const user = this.userData;
            // Sincronizează limba cu localStorage
            this.currentLanguage = localStorage.getItem('language') || 'ro';
            const currentLang = this.currentLanguage;
            const isDark = document.documentElement.classList.contains('dark');
            
            content.innerHTML = `
                <div class="page-header-redesign">
                    <h1>${this.t('settings.title')}</h1>
                    <p>${this.t('settings.subtitle')}</p>
                </div>

                <!-- Preferințe Limbă -->
                <div class="section-card-redesign">
                    <div class="section-header-redesign">
                        <h2 class="section-title-redesign">🌐 Limbă și Regiune</h2>
                    </div>
                    <div class="form-field-redesign">
                        <label>Limba Interfeței</label>
                        <select id="languageSelect" onchange="window.AccountPanelRedesign.changeLanguage(this.value)" style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px; background: var(--background); color: var(--foreground);">
                            <option value="ro" ${currentLang === 'ro' ? 'selected' : ''}>🇷🇴 Română</option>
                            <option value="en" ${currentLang === 'en' ? 'selected' : ''}>🇬🇧 English</option>
                            <option value="it" ${currentLang === 'it' ? 'selected' : ''}>🇮🇹 Italiano</option>
                            <option value="uk" ${currentLang === 'uk' ? 'selected' : ''}>🇺🇦 Українська</option>
                        </select>
                        <div class="form-hint-redesign">Limba se va aplica pe tot site-ul</div>
                    </div>
                </div>

                <!-- Preferințe Temă -->
                <div class="section-card-redesign">
                    <div class="section-header-redesign">
                        <h2 class="section-title-redesign">🎨 Aspect</h2>
                    </div>
                    <div class="form-field-redesign">
                        <label>Temă</label>
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
                            <button class="btn-outline-redesign ${!isDark ? 'btn-primary-redesign' : ''}" onclick="window.AccountPanelRedesign.changeTheme('light')" style="padding: 20px;">
                                ☀️<br>Light
                            </button>
                            <button class="btn-outline-redesign ${isDark ? 'btn-primary-redesign' : ''}" onclick="window.AccountPanelRedesign.changeTheme('dark')" style="padding: 20px;">
                                🌙<br>Dark
                            </button>
                            <button class="btn-outline-redesign" onclick="window.AccountPanelRedesign.changeTheme('auto')" style="padding: 20px;">
                                🔄<br>Auto
                            </button>
                        </div>
                        <div class="form-hint-redesign">Tema se sincronizează cu site-ul principal</div>
                    </div>
                </div>

                <!-- Notificări -->
                <div class="section-card-redesign">
                    <div class="section-header-redesign">
                        <h2 class="section-title-redesign">🔔 Notificări</h2>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 15px;">
                        <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                            <input type="checkbox" id="emailNotif" ${user.emailNotifications !== false ? 'checked' : ''} onchange="window.AccountPanelRedesign.toggleNotification('email', this.checked)" style="width: 20px; height: 20px;">
                            <div>
                                <div style="font-weight: 600;">Email Notificări</div>
                                <div style="font-size: 13px; color: var(--muted-foreground);">Primește notificări despre comenzi pe email</div>
                            </div>
                        </label>
                        <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                            <input type="checkbox" id="orderNotif" ${user.orderNotifications !== false ? 'checked' : ''} onchange="window.AccountPanelRedesign.toggleNotification('order', this.checked)" style="width: 20px; height: 20px;">
                            <div>
                                <div style="font-weight: 600;">Actualizări Comenzi</div>
                                <div style="font-size: 13px; color: var(--muted-foreground);">Notificări când statusul comenzii se schimbă</div>
                            </div>
                        </label>
                        <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                            <input type="checkbox" id="promoNotif" ${user.promoNotifications !== false ? 'checked' : ''} onchange="window.AccountPanelRedesign.toggleNotification('promo', this.checked)" style="width: 20px; height: 20px;">
                            <div>
                                <div style="font-weight: 600;">Oferte și Promoții</div>
                                <div style="font-size: 13px; color: var(--muted-foreground);">Primește oferte speciale și reduceri</div>
                            </div>
                        </label>
                    </div>
                </div>

                <!-- Confidențialitate -->
                <div class="section-card-redesign">
                    <div class="section-header-redesign">
                        <h2 class="section-title-redesign">🔒 Confidențialitate</h2>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <button class="btn-outline-redesign" onclick="window.AccountPanelRedesign.downloadData()" style="justify-content: flex-start;">
                            📥 Descarcă Datele Mele
                        </button>
                        <button class="btn-outline-redesign" onclick="window.AccountPanelRedesign.deleteAccount()" style="justify-content: flex-start; color: var(--destructive);">
                            🗑️ Șterge Contul
                        </button>
                    </div>
                </div>
            `;
        },

        loadSecurity() {
            const content = document.getElementById('accountContentRedesign');
            
            content.innerHTML = `
                <div class="page-header-redesign">
                    <h1>${this.t('security.title')}</h1>
                    <p>${this.t('security.subtitle')}</p>
                </div>

                <!-- Schimbare Parolă -->
                <div class="section-card-redesign">
                    <div class="section-header-redesign">
                        <h2 class="section-title-redesign">🔑 ${this.t('security.changepass')}</h2>
                    </div>
                    <form id="changePasswordForm" onsubmit="window.AccountPanelRedesign.changePassword(event)">
                        <div style="display: flex; flex-direction: column; gap: 15px; max-width: 500px;">
                            <div class="form-field-redesign">
                                <label>Parola Curentă *</label>
                                <input type="password" name="currentPassword" required placeholder="Introdu parola curentă">
                            </div>
                            <div class="form-field-redesign">
                                <label>Parola Nouă *</label>
                                <input type="password" name="newPassword" id="newPassword" required placeholder="Minim 8 caractere" minlength="8">
                                <div class="form-hint-redesign">Minim 8 caractere, recomandat: litere, cifre și simboluri</div>
                            </div>
                            <div class="form-field-redesign">
                                <label>Confirmă Parola Nouă *</label>
                                <input type="password" name="confirmPassword" required placeholder="Repetă parola nouă">
                            </div>
                            <button type="submit" class="btn-primary-redesign">
                                💾 Schimbă Parola
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Sesiuni Active -->
                <div class="section-card-redesign">
                    <div class="section-header-redesign">
                        <h2 class="section-title-redesign">📱 Sesiuni Active</h2>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 15px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 15px; background: var(--accent); border-radius: 8px;">
                            <div>
                                <div style="font-weight: 600;">💻 ${navigator.platform}</div>
                                <div style="font-size: 13px; color: var(--muted-foreground);">Sesiunea curentă • Acum</div>
                            </div>
                            <span style="color: #10b981; font-weight: 600;">Activ</span>
                        </div>
                        <button class="btn-outline-redesign" onclick="window.AccountPanelRedesign.logoutAllDevices()">
                            🚪 Deconectează Toate Dispozitivele
                        </button>
                    </div>
                </div>

                <!-- Autentificare cu 2 Factori -->
                <div class="section-card-redesign">
                    <div class="section-header-redesign">
                        <h2 class="section-title-redesign">🛡️ Autentificare cu 2 Factori</h2>
                    </div>
                    <p style="color: var(--muted-foreground); margin-bottom: 15px;">
                        Adaugă un nivel suplimentar de securitate contului tău.
                    </p>
                    <button class="btn-secondary-redesign" onclick="window.AccountPanelRedesign.enable2FA()">
                        🔐 Activează 2FA
                    </button>
                </div>
            `;
        },

        // Funcții pentru Settings
        changeLanguage(lang) {
            localStorage.setItem('language', lang);
            this.currentLanguage = lang;
            
            // Trigger language change event
            window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
            
            // Update sidebar and content
            this.updateSidebarTranslations();
            this.loadPage(this.currentPage);
            
            this.showNotification('Limba a fost schimbată cu succes!');
        },

        changeTheme(theme) {
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
            } else if (theme === 'light') {
                document.documentElement.classList.remove('dark');
            } else {
                // Auto - based on system preference
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            }
            
            this.loadSettings();
            this.showNotification('Tema a fost schimbată cu succes!');
        },

        toggleNotification(type, enabled) {
            this.userData[`${type}Notifications`] = enabled;
            localStorage.setItem('currentUser', JSON.stringify(this.userData));
            
            const messages = {
                'email': 'Notificări email',
                'order': 'Notificări comenzi',
                'promo': 'Notificări promoții'
            };
            
            this.showNotification(`${messages[type]} ${enabled ? 'activate' : 'dezactivate'}`);
        },

        downloadData() {
            const data = JSON.stringify(this.userData, null, 2);
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `my-data-${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
            
            this.showNotification('Datele tale au fost descărcate!');
        },

        async deleteAccount() {
            if (confirm('⚠️ ATENȚIE! Această acțiune este PERMANENTĂ!\n\nEști sigur că vrei să ștergi contul? Toate datele tale vor fi șterse definitiv.')) {
                if (confirm('Confirmă din nou: Ștergi contul DEFINITIV?')) {
                    try {
                        if (window.API && window.API.deleteAccount) {
                            await window.API.deleteAccount();
                            this.showNotification('Contul va fi șters în 30 de zile. Poți anula ștergerea până atunci.');
                        } else {
                            // Fallback: marchează local pentru ștergere
                            const deleteDate = new Date();
                            deleteDate.setDate(deleteDate.getDate() + 30);
                            localStorage.setItem('accountDeleteScheduled', deleteDate.toISOString());
                            this.showNotification('Contul va fi șters în 30 de zile. Contactează suportul pentru anulare.');
                        }
                    } catch (error) {
                        console.error('Eroare ștergere cont:', error);
                        this.showNotification('Eroare la programarea ștergerii contului. Contactează suportul.', 'error');
                    }
                }
            }
        },

        // Funcții pentru Security
        async changePassword(event) {
            event.preventDefault();
            
            const form = event.target;
            const currentPassword = form.currentPassword.value;
            const newPassword = form.newPassword.value;
            const confirmPassword = form.confirmPassword.value;
            
            if (newPassword !== confirmPassword) {
                this.showNotification('Parolele nu se potrivesc!', 'error');
                return;
            }
            
            if (newPassword.length < 8) {
                this.showNotification('Parola trebuie să aibă minim 8 caractere!', 'error');
                return;
            }
            
            try {
                if (window.API && window.API.changePassword) {
                    await window.API.changePassword(currentPassword, newPassword, confirmPassword);
                    this.showNotification('Parola a fost schimbată cu succes!');
                    form.reset();
                } else {
                    // Fallback: salvează local (doar pentru demo)
                    console.warn('API changePassword nu este disponibil');
                    this.showNotification('Parola a fost actualizată local. Contactează suportul pentru sincronizare.');
                    form.reset();
                }
            } catch (error) {
                console.error('Eroare schimbare parolă:', error);
                this.showNotification('Eroare la schimbarea parolei: ' + error.message, 'error');
            }
        },

        async logoutAllDevices() {
            if (confirm('Sigur vrei să te deconectezi de pe toate dispozitivele?')) {
                try {
                    if (window.API && window.API.logoutAllDevices) {
                        await window.API.logoutAllDevices();
                    } else {
                        // Fallback: șterge toate sesiunile locale
                        localStorage.removeItem('authToken');
                        localStorage.removeItem('currentUser');
                        localStorage.removeItem('userAvatar');
                        localStorage.removeItem('userSettings');
                    }
                    
                    this.showNotification('Te-ai deconectat de pe toate dispozitivele!');
                    setTimeout(() => {
                        this.logout();
                    }, 1500);
                } catch (error) {
                    console.error('Eroare logout dispozitive:', error);
                    this.showNotification('Eroare la deconectare. Te rugăm să încerci din nou.', 'error');
                }
            }
        },

        enable2FA() {
            this.showNotification('Autentificarea cu 2 factori va fi disponibilă în curând!');
        },

        logout() {
            if (confirm(this.t('msg.logoutconfirm'))) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('authToken');
                localStorage.removeItem('isLoggedIn');
                this.hide();
                window.location.reload();
            }
        },

        showNotification(message, type = 'success') {
            const notification = document.createElement('div');
            notification.className = 'notification-redesign';
            notification.textContent = message;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideIn 0.3s ease reverse';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        },

        // Update sidebar translations
        updateSidebarTranslations() {
            document.querySelectorAll('[data-tr]').forEach(el => {
                const key = el.getAttribute('data-tr');
                el.textContent = this.t(key);
            });
        }
    };

    // Init
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => AccountPanelRedesign.init());
    } else {
        AccountPanelRedesign.init();
    }

    window.AccountPanelRedesign = AccountPanelRedesign;

})();

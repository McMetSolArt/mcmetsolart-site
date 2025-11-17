/**
 * ACCOUNT PANEL - MC MetSolArt
 * Versiune simplificată și funcțională
 */

(function () {
    'use strict';

    console.log('👤 ACCOUNT PANEL - Loading...');

    const AccountPanel = {
        panel: null,
        overlay: null,
        content: null,
        closeBtn: null,
        tabs: null,

        init() {
            this.panel = document.getElementById('accountPanel');
            this.overlay = document.getElementById('accountPanelOverlay');
            this.content = document.getElementById('accountPanelContent');
            this.closeBtn = document.getElementById('accountPanelClose');
            this.tabs = document.querySelectorAll('.account-tab');

            if (!this.panel || !this.overlay) {
                console.warn('Account panel elements not found');
                return;
            }

            // Event listeners
            if (this.closeBtn) {
                this.closeBtn.addEventListener('click', () => this.hide());
            }

            if (this.overlay) {
                this.overlay.addEventListener('click', () => this.hide());
            }

            // Tabs
            this.tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const section = tab.dataset.tab;
                    this.switchTab(section);
                });
            });

            // ESC key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.panel.classList.contains('active')) {
                    this.hide();
                }
            });

            // Ascultă schimbările de limbă
            window.addEventListener('languageChanged', () => {
                if (this.panel.classList.contains('active')) {
                    const activeTab = document.querySelector('.account-tab.active');
                    const currentSection = activeTab ? activeTab.dataset.tab : 'dashboard';
                    this.loadContent(currentSection);

                    // Aplică traducerile pentru header și tabs
                    if (window.applyTranslations) {
                        setTimeout(() => window.applyTranslations(), 50);
                    }
                }
            });

            console.log('✅ Account panel initialized');
        },

        switchTab(section) {
            const t = (key) => {
                const lang = localStorage.getItem('language') || 'ro';
                return window.translations?.[lang]?.[key] || key;
            };

            // Update active tab
            this.tabs.forEach(tab => {
                if (tab.dataset.tab === section) {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });

            // Update subtitle cu traduceri
            const subtitle = document.getElementById('accountSubtitle');
            const titles = {
                dashboard: t('account.dashboard.title'),
                profile: t('account.tab.profile'),
                orders: t('account.tab.orders'),
                settings: t('account.tab.settings'),
                contact: t('account.tab.support')
            };
            if (subtitle) {
                subtitle.textContent = titles[section] || section;
            }

            // Load content
            this.loadContent(section);
        },

        show(section = 'dashboard') {
            console.log('📂 Opening account panel:', section);

            // Închide TOATE ferestrele
            if (window.closeAllWindows) {
                window.closeAllWindows();
            }

            // Arată panel-ul
            this.panel.classList.add('active');
            this.overlay.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Aplică traducerile pentru header și tabs
            if (window.applyTranslations) {
                setTimeout(() => window.applyTranslations(), 50);
            }

            // Încarcă conținutul
            this.loadContent(section);
        },

        hide() {
            console.log('📁 Closing account panel');
            this.panel.classList.remove('active');
            this.overlay.classList.remove('active');
            document.body.style.overflow = '';
        },

        loadContent(section) {
            const user = this.getCurrentUser();

            if (!user) {
                this.content.innerHTML = '<p style="padding: 2rem; text-align: center;">Eroare: Utilizator neautentificat</p>';
                return;
            }

            // Arată loading
            this.content.innerHTML = `
                <div class="account-loading">
                    <div class="spinner"></div>
                    <p>Se încarcă...</p>
                </div>
            `;

            // Simulează încărcarea
            setTimeout(() => {
                if (section === 'dashboard') {
                    this.renderDashboard(user);
                } else if (section === 'orders') {
                    this.renderOrders(user).catch(err => console.error('Error rendering orders:', err));
                } else if (section === 'profile') {
                    this.renderProfile(user);
                } else if (section === 'settings') {
                    this.renderSettings(user);
                } else if (section === 'contact') {
                    this.renderContact(user);
                }
            }, 300);
        },

        renderDashboard(user) {
            const t = (key) => {
                const lang = localStorage.getItem('language') || 'ro';
                return window.translations?.[lang]?.[key] || key;
            };

            this.content.innerHTML = `
                <div class="dashboard-content">
                    <div class="dashboard-welcome-card">
                        <div class="welcome-content">
                            <h3>${t('account.panel.welcome')}, ${user.firstName}! 👋</h3>
                            <p>${t('account.dashboard.subtitle')}</p>
                        </div>
                        <div class="welcome-avatar">
                            <img src="${user.avatar}" alt="${user.firstName}">
                            <div class="avatar-status"></div>
                        </div>
                    </div>
                    
                    <div class="dashboard-stats">
                        <div class="stat-card stat-primary">
                            <div class="stat-card-icon">
                                <i class="fas fa-shopping-bag"></i>
                            </div>
                            <div class="stat-content">
                                <h4>${t('account.stats.orders')}</h4>
                                <div class="stat-value">0</div>
                                <div class="stat-change">
                                    <span class="stat-label">${t('account.orders.empty')}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="stat-card stat-warning">
                            <div class="stat-card-icon">
                                <i class="fas fa-hourglass-half"></i>
                            </div>
                            <div class="stat-content">
                                <h4>${t('account.orders.status.processing')}</h4>
                                <div class="stat-value">0</div>
                                <div class="stat-change">
                                    <span class="stat-label">${t('account.orders.empty')}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="stat-card stat-success">
                            <div class="stat-card-icon">
                                <i class="fas fa-check-double"></i>
                            </div>
                            <div class="stat-content">
                                <h4>${t('account.orders.status.delivered')}</h4>
                                <div class="stat-value">0</div>
                                <div class="stat-change">
                                    <span class="stat-label">${t('account.orders.empty')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="info-card">
                        <h4><i class="fas fa-id-card"></i> ${t('account.profile.title')}</h4>
                        <div class="info-grid">
                            <div class="info-item">
                                <div class="info-icon">
                                    <i class="fas fa-user"></i>
                                </div>
                                <div class="info-details">
                                    <span class="info-label">${t('account.profile.name')}</span>
                                    <span class="info-value">${user.firstName} ${user.lastName}</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="info-icon">
                                    <i class="fas fa-envelope"></i>
                                </div>
                                <div class="info-details">
                                    <span class="info-label">${t('account.profile.email')}</span>
                                    <span class="info-value">${user.email}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },

        async renderOrders(user) {
            const t = (key) => {
                const lang = localStorage.getItem('language') || 'ro';
                return window.translations?.[lang]?.[key] || key;
            };

            // Arată loading
            this.content.innerHTML = `
                <div class="dashboard-content">
                    <div class="loading-state">
                        <i class="fas fa-spinner fa-spin"></i>
                        <p>Se încarcă comenzile...</p>
                    </div>
                </div>
            `;

            try {
                // Verifică dacă API Client există
                if (!window.API) {
                    throw new Error('API Client nu este disponibil. Reîncarcă pagina.');
                }

                // Verifică dacă există token de autentificare
                const token = localStorage.getItem('authToken');
                if (!token) {
                    throw new Error('Nu ești autentificat. Te rugăm să te autentifici din nou.');
                }

                // Obține comenzile de la API
                const response = await window.API.getOrders();

                if (!response || !response.success) {
                    throw new Error(response?.message || 'Nu s-au putut încărca comenzile');
                }

                const orders = response.data?.orders || [];

                this.content.innerHTML = `
                <div class="dashboard-content orders-section">
                    <div class="dashboard-welcome elegant-header">
                        <div class="header-content">
                            <div class="header-icon">
                                <i class="fas fa-shopping-bag"></i>
                            </div>
                            <div class="header-text">
                                <h3>${t('account.orders.title')}</h3>
                                <p>${t('account.orders.subtitle')}</p>
                            </div>
                        </div>
                        ${orders.length > 0 ? `
                            <div class="orders-stats">
                                <div class="stat-item">
                                    <span class="stat-number">${orders.length}</span>
                                    <span class="stat-label">Total comenzi</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-number">${orders.filter(o => o.status === 'pending').length}</span>
                                    <span class="stat-label">În așteptare</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-number">${orders.filter(o => o.status === 'delivered').length}</span>
                                    <span class="stat-label">Livrate</span>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                    
                    ${orders.length === 0 ? `
                        <div class="empty-state elegant-empty">
                            <div class="empty-state-icon">
                                <i class="fas fa-shopping-bag"></i>
                            </div>
                            <h4>${t('account.orders.empty')}</h4>
                            <p>${t('account.orders.emptyDesc')}</p>
                            <button class="btn-primary elegant-btn" onclick="window.location.href='#products'">
                                <i class="fas fa-shopping-cart"></i> 
                                <span>${t('account.orders.startShopping')}</span>
                            </button>
                        </div>
                    ` : `
                        <div class="orders-list elegant-orders">
                            ${orders.map(order => {
                    const statusClass = order.status.toLowerCase();
                    const statusLabels = {
                        'pending': 'În așteptare',
                        'confirmed': 'Confirmată',
                        'processing': 'În procesare',
                        'shipped': 'Expediată',
                        'delivered': 'Livrată',
                        'cancelled': 'Anulată'
                    };

                    const statusIcons = {
                        'pending': 'fa-clock',
                        'confirmed': 'fa-check-circle',
                        'processing': 'fa-cog fa-spin',
                        'shipped': 'fa-shipping-fast',
                        'delivered': 'fa-check-double',
                        'cancelled': 'fa-times-circle'
                    };

                    return `
                                <div class="order-card elegant-card" data-order-id="${order.id}">
                                    <div class="order-header elegant-header">
                                        <div class="order-info">
                                            <div class="order-number">
                                                <i class="fas fa-receipt"></i>
                                                <span>${order.orderNumber}</span>
                                            </div>
                                            <span class="order-date">
                                                <i class="fas fa-calendar-alt"></i> 
                                                ${new Date(order.createdAt).toLocaleDateString('ro-RO', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })}
                                            </span>
                                        </div>
                                        <span class="order-status status-${statusClass}">
                                            <i class="fas ${statusIcons[order.status] || 'fa-info-circle'}"></i>
                                            <span>${statusLabels[order.status] || order.status}</span>
                                        </span>
                                    </div>
                                    <div class="order-body">
                                        <div class="order-items">
                                            ${order.items.map(item => `
                                                <div class="order-item">
                                                    <div class="item-details">
                                                        <h5>${item.productName}</h5>
                                                        <p>${t('account.orders.quantity')}: ${item.quantity}</p>
                                                        ${item.productDescription ? `<p class="item-desc">${item.productDescription}</p>` : ''}
                                                    </div>
                                                    <div class="item-price">${item.price.toFixed(2)} ${order.currency}</div>
                                                </div>
                                            `).join('')}
                                        </div>
                                        ${order.trackingNumber ? `
                                            <div class="order-tracking">
                                                <i class="fas fa-truck"></i>
                                                <span>Tracking: <strong>${order.trackingNumber}</strong></span>
                                            </div>
                                        ` : ''}
                                    </div>
                                    <div class="order-footer">
                                        <div class="order-total">
                                            <span>${t('account.orders.total')}:</span>
                                            <strong>${order.totalAmount.toFixed(2)} ${order.currency}</strong>
                                        </div>
                                        <button class="btn-secondary btn-sm" onclick="window.AccountPanel.viewOrderDetails(${order.id})">
                                            <i class="fas fa-eye"></i> ${t('account.orders.details')}
                                        </button>
                                    </div>
                                </div>
                            `}).join('')}
                        </div>
                    `}
                </div>
            `;
            } catch (error) {
                console.error('❌ Eroare încărcare comenzi:', error);

                // Verifică tipul de eroare
                let errorMessage = 'Te rugăm să încerci din nou';
                let errorTitle = 'Eroare la încărcarea comenzilor';

                if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
                    errorTitle = 'Nu se poate conecta la server';
                    errorMessage = 'Backend-ul nu răspunde. Verifică dacă serverul este pornit.';
                } else if (error.message?.includes('401') || error.message?.includes('autentificat')) {
                    errorTitle = 'Sesiune expirată';
                    errorMessage = 'Sesiunea ta a expirat. Te rugăm să te autentifici din nou.';
                } else if (error.message?.includes('API Client')) {
                    errorTitle = 'Eroare de sistem';
                    errorMessage = 'API Client nu este disponibil. Reîncarcă pagina.';
                } else if (error.message) {
                    errorMessage = error.message;
                }

                this.content.innerHTML = `
                    <div class="dashboard-content">
                        <div class="error-state elegant-empty">
                            <div class="empty-state-icon" style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);">
                                <i class="fas fa-exclamation-triangle"></i>
                            </div>
                            <h4>${errorTitle}</h4>
                            <p>${errorMessage}</p>
                            <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem;">
                                <button class="btn-primary elegant-btn" onclick="window.AccountPanel.show('orders')">
                                    <i class="fas fa-redo"></i> Încearcă din nou
                                </button>
                                ${error.message?.includes('401') || error.message?.includes('autentificat') ? `
                                    <button class="btn-secondary elegant-btn" onclick="window.AccountPanel.hide(); setTimeout(() => document.getElementById('loginBtn')?.click(), 300)">
                                        <i class="fas fa-sign-in-alt"></i> Autentifică-te
                                    </button>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                `;
            }
        },

        async viewOrderDetails(orderId) {
            const t = (key) => {
                const lang = localStorage.getItem('language') || 'ro';
                return window.translations?.[lang]?.[key] || key;
            };

            try {
                const response = await window.API.getOrderDetails(orderId);

                if (response.success) {
                    const order = response.data.order;

                    // Arată detalii comandă într-un modal sau secțiune dedicată
                    alert(`Detalii comandă #${order.orderNumber}\n\nStatus: ${order.status}\nTotal: ${order.totalAmount} ${order.currency}\n\nFuncționalitate completă în curând!`);
                }
            } catch (error) {
                console.error('❌ Eroare detalii comandă:', error);
                alert('Eroare la încărcarea detaliilor comenzii');
            }
        },



        renderProfile(user) {
            const t = (key) => {
                const lang = localStorage.getItem('language') || 'ro';
                return window.translations?.[lang]?.[key] || key;
            };

            this.content.innerHTML = `
                <div class="dashboard-content" id="profileView">
                    <div class="dashboard-welcome">
                        <h3>${t('account.tab.profile')}</h3>
                        <p>${t('account.profile.subtitle')}</p>
                    </div>
                    
                    <!-- Avatar și Informații Principale -->
                    <div class="info-card profile-header-card">
                        <div class="profile-avatar-section">
                            <div class="profile-avatar-container" id="avatarContainer">
                                <img src="${user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent((user.firstName || '') + '+' + (user.lastName || ''))}&background=176f87&color=fff&size=128`}" 
                                     alt="${user.firstName} ${user.lastName}" 
                                     class="profile-avatar-large"
                                     id="profileAvatarImg"
                                     onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent((user.firstName || 'U') + '+' + (user.lastName || 'ser'))}&background=176f87&color=fff&size=128'">
                                <div class="profile-avatar-overlay" id="avatarOverlay">
                                    <i class="fas fa-camera"></i>
                                    <span>${t('account.profile.changePhoto')}</span>
                                </div>
                                <input type="file" id="avatarInput" accept="image/*" style="display: none;">
                            </div>
                            <div class="profile-main-info">
                                <h2>${user.firstName} ${user.lastName}</h2>
                                <p class="profile-email"><i class="fas fa-envelope"></i> ${user.email}</p>
                                <p class="profile-member-since"><i class="fas fa-calendar"></i> ${t('account.profile.memberSince')} ${user.createdAt ? new Date(user.createdAt).toLocaleDateString('ro-RO') : t('account.profile.notProvided')}</p>
                            </div>
                        </div>
                        <button class="btn-primary" id="editProfileBtn">
                            <i class="fas fa-edit"></i> ${t('account.profile.editProfile')}
                        </button>
                    </div>
                    
                    <!-- Informații Personale -->
                    <div class="info-card">
                        <h4><i class="fas fa-user"></i> ${t('account.profile.personalInfo')}</h4>
                        <div class="info-grid">
                            <div class="info-item">
                                <div class="info-details">
                                    <span class="info-label">${t('account.profile.firstName')}</span>
                                    <span class="info-value">${user.firstName || '-'}</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="info-details">
                                    <span class="info-label">${t('account.profile.lastName')}</span>
                                    <span class="info-value">${user.lastName || '-'}</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="info-details">
                                    <span class="info-label">${t('account.profile.email')}</span>
                                    <span class="info-value">${user.email || '-'}</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="info-details">
                                    <span class="info-label">${t('account.profile.phone')}</span>
                                    <span class="info-value">${user.phone || t('account.profile.notProvided')}</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="info-details">
                                    <span class="info-label">${t('account.profile.company')}</span>
                                    <span class="info-value">${user.company || t('account.profile.notProvided')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Adresă de Livrare -->
                    <div class="info-card">
                        <h4><i class="fas fa-map-marker-alt"></i> ${t('account.profile.deliveryAddress')}</h4>
                        <div class="info-grid">
                            <div class="info-item full-width">
                                <div class="info-details">
                                    <span class="info-label">${t('account.profile.address')}</span>
                                    <span class="info-value">${user.address || t('account.profile.notProvided')}</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="info-details">
                                    <span class="info-label">${t('account.profile.city')}</span>
                                    <span class="info-value">${user.city || t('account.profile.notProvided')}</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="info-details">
                                    <span class="info-label">${t('account.profile.postalCode')}</span>
                                    <span class="info-value">${user.postalCode || t('account.profile.notProvided')}</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="info-details">
                                    <span class="info-label">${t('account.profile.county')}</span>
                                    <span class="info-value">${user.county || t('account.profile.notProvided')}</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="info-details">
                                    <span class="info-label">${t('account.profile.country')}</span>
                                    <span class="info-value">${user.country || t('account.profile.notProvided')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Informații Contact Suplimentare -->
                    <div class="info-card">
                        <h4><i class="fas fa-phone-alt"></i> ${t('account.profile.contactInfo')}</h4>
                        <div class="info-grid">
                            <div class="info-item">
                                <div class="info-details">
                                    <span class="info-label">${t('account.profile.alternativePhone')}</span>
                                    <span class="info-value">${user.alternativePhone || t('account.profile.notProvided')}</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="info-details">
                                    <span class="info-label">${t('account.profile.whatsapp')}</span>
                                    <span class="info-value">${user.whatsapp || t('account.profile.notProvided')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Adaugă event listener pentru butonul de editare și avatar
            setTimeout(() => {
                const editBtn = document.getElementById('editProfileBtn');
                if (editBtn) {
                    editBtn.addEventListener('click', () => this.renderProfileEdit(user));
                }

                // Event listener pentru schimbarea avatarului
                const avatarContainer = document.getElementById('avatarContainer');
                const avatarOverlay = document.getElementById('avatarOverlay');
                const avatarInput = document.getElementById('avatarInput');

                if (avatarContainer && avatarInput) {
                    // Click pe container sau overlay deschide file picker
                    const openFilePicker = () => {
                        avatarInput.click();
                    };

                    avatarContainer.addEventListener('click', openFilePicker);
                    if (avatarOverlay) {
                        avatarOverlay.addEventListener('click', (e) => {
                            e.stopPropagation();
                            openFilePicker();
                        });
                    }

                    // Când se selectează un fișier
                    avatarInput.addEventListener('change', (e) => {
                        const file = e.target.files[0];
                        if (file) {
                            this.handleAvatarUpload(file, user);
                        }
                    });
                }
            }, 100);
        },

        async handleAvatarUpload(file, user) {
            const t = (key) => {
                const lang = localStorage.getItem('language') || 'ro';
                return window.translations?.[lang]?.[key] || key;
            };

            // Validare fișier
            if (!file.type.startsWith('image/')) {
                this.showErrorMessage(t('account.profile.invalidImageType') || 'Te rugăm să selectezi o imagine validă (JPG, PNG, GIF)');
                return;
            }

            // Verifică dimensiunea (max 5MB)
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                this.showErrorMessage(t('account.profile.imageTooLarge') || 'Imaginea este prea mare. Dimensiunea maximă este 5MB.');
                return;
            }

            try {
                // Arată loading pe avatar
                const avatarImg = document.getElementById('profileAvatarImg');
                const avatarOverlay = document.getElementById('avatarOverlay');
                
                if (avatarOverlay) {
                    avatarOverlay.innerHTML = `
                        <i class="fas fa-spinner fa-spin"></i>
                        <span>${t('account.profile.uploading') || 'Se încarcă...'}</span>
                    `;
                }

                // Convertește imaginea în base64 pentru preview
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const base64Image = e.target.result;

                    // Actualizează preview-ul imediat
                    if (avatarImg) {
                        avatarImg.src = base64Image;
                    }

                    try {
                        // Verifică dacă API există
                        if (!window.API) {
                            throw new Error('API Client nu este disponibil. Reîncarcă pagina.');
                        }

                        // Trimite către API
                        const response = await window.API.updateAvatar(base64Image);

                        if (response && response.success) {
                            const updatedUser = response.data?.user || response.data;
                            
                            // Actualizează localStorage
                            localStorage.setItem('currentUser', JSON.stringify(updatedUser));

                            // Arată mesaj de succes
                            this.showSuccessMessage(t('account.profile.avatarUpdated') || 'Fotografia de profil a fost actualizată cu succes!');

                            // Actualizează avatarul din header dacă există
                            const headerAvatar = document.querySelector('.user-avatar img');
                            if (headerAvatar) {
                                headerAvatar.src = base64Image;
                            }

                            // Restaurează overlay-ul
                            if (avatarOverlay) {
                                avatarOverlay.innerHTML = `
                                    <i class="fas fa-camera"></i>
                                    <span>${t('account.profile.changePhoto')}</span>
                                `;
                            }
                        } else {
                            throw new Error(response?.message || 'Eroare la încărcarea imaginii');
                        }
                    } catch (error) {
                        console.error('❌ Eroare upload avatar:', error);
                        
                        // Restaurează imaginea veche
                        if (avatarImg && user.avatar) {
                            avatarImg.src = user.avatar;
                        }

                        // Restaurează overlay-ul
                        if (avatarOverlay) {
                            avatarOverlay.innerHTML = `
                                <i class="fas fa-camera"></i>
                                <span>${t('account.profile.changePhoto')}</span>
                            `;
                        }

                        let errorMessage = error.message || 'Eroare la încărcarea imaginii';
                        if (error.message?.includes('Failed to fetch')) {
                            errorMessage = 'Nu se poate conecta la server. Verifică dacă backend-ul este pornit.';
                        }
                        
                        this.showErrorMessage(errorMessage);
                    }
                };

                reader.readAsDataURL(file);
            } catch (error) {
                console.error('❌ Eroare procesare imagine:', error);
                this.showErrorMessage(t('account.profile.uploadError') || 'Eroare la procesarea imaginii');
            }
        },

        renderProfileEdit(user) {
            const t = (key) => {
                const lang = localStorage.getItem('language') || 'ro';
                return window.translations?.[lang]?.[key] || key;
            };

            this.content.innerHTML = `
                <div class="dashboard-content" id="profileEdit">
                    <div class="dashboard-welcome">
                        <h3><i class="fas fa-edit"></i> ${t('account.profile.editProfile')}</h3>
                        <p>${t('account.profile.editSubtitle')}</p>
                    </div>
                    
                    <form id="profileEditForm" class="profile-edit-form">
                        <!-- Informații Personale -->
                        <div class="info-card">
                            <h4><i class="fas fa-user"></i> ${t('account.profile.personalInfo')}</h4>
                            <div class="form-grid">
                                <div class="form-group">
                                    <label>${t('account.profile.firstName')} <span class="required">*</span></label>
                                    <input type="text" name="firstName" value="${user.firstName || ''}" required>
                                </div>
                                <div class="form-group">
                                    <label>${t('account.profile.lastName')} <span class="required">*</span></label>
                                    <input type="text" name="lastName" value="${user.lastName || ''}" required>
                                </div>
                                <div class="form-group">
                                    <label>${t('account.profile.email')} <span class="required">*</span></label>
                                    <input type="email" name="email" value="${user.email || ''}" required readonly>
                                    <small>${t('account.profile.emailReadonly')}</small>
                                </div>
                                <div class="form-group">
                                    <label>${t('account.profile.phone')}</label>
                                    <input type="tel" name="phone" value="${user.phone || ''}" placeholder="+40 123 456 789">
                                </div>
                                <div class="form-group full-width">
                                    <label>${t('account.profile.company')}</label>
                                    <input type="text" name="company" value="${user.company || ''}" placeholder="${t('account.profile.companyPlaceholder')}">
                                </div>
                            </div>
                        </div>
                        
                        <!-- Adresă de Livrare -->
                        <div class="info-card">
                            <h4><i class="fas fa-map-marker-alt"></i> ${t('account.profile.deliveryAddress')}</h4>
                            <div class="form-grid">
                                <div class="form-group full-width">
                                    <label>${t('account.profile.address')}</label>
                                    <input type="text" name="address" value="${user.address || ''}" placeholder="${t('account.profile.addressPlaceholder')}">
                                </div>
                                <div class="form-group">
                                    <label>${t('account.profile.city')}</label>
                                    <input type="text" name="city" value="${user.city || ''}" placeholder="${t('account.profile.cityPlaceholder')}">
                                </div>
                                <div class="form-group">
                                    <label>${t('account.profile.postalCode')}</label>
                                    <input type="text" name="postalCode" value="${user.postalCode || ''}" placeholder="010101">
                                </div>
                                <div class="form-group">
                                    <label>${t('account.profile.county')}</label>
                                    <input type="text" name="county" value="${user.county || ''}" placeholder="${t('account.profile.countyPlaceholder')}">
                                </div>
                                <div class="form-group">
                                    <label>${t('account.profile.country')}</label>
                                    <input type="text" name="country" value="${user.country || ''}" placeholder="${t('account.profile.countryPlaceholder')}">
                                </div>
                            </div>
                        </div>
                        
                        <!-- Informații Contact Suplimentare -->
                        <div class="info-card">
                            <h4><i class="fas fa-phone-alt"></i> ${t('account.profile.contactInfo')}</h4>
                            <div class="form-grid">
                                <div class="form-group">
                                    <label>${t('account.profile.alternativePhone')}</label>
                                    <input type="tel" name="alternativePhone" value="${user.alternativePhone || ''}" placeholder="+40 987 654 321">
                                </div>
                                <div class="form-group">
                                    <label>${t('account.profile.whatsapp')}</label>
                                    <input type="tel" name="whatsapp" value="${user.whatsapp || ''}" placeholder="+40 123 456 789">
                                </div>
                            </div>
                        </div>
                        
                        <!-- Butoane Acțiuni -->
                        <div class="profile-actions">
                            <button type="button" class="btn-secondary" id="cancelEditBtn">
                                <i class="fas fa-times"></i> ${t('account.profile.cancel')}
                            </button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save"></i> ${t('account.profile.saveChanges')}
                            </button>
                        </div>
                    </form>
                </div>
            `;

            // Event listeners cu verificare robustă
            setTimeout(() => {
                const form = document.getElementById('profileEditForm');
                const cancelBtn = document.getElementById('cancelEditBtn');

                if (form) {
                    console.log('✅ Formular găsit, adăugare event listener pentru submit');

                    // Previne submit-uri multiple
                    form.addEventListener('submit', (e) => {
                        e.preventDefault();
                        console.log('📝 Formular trimis, apelare handleProfileSave');

                        // Verifică dacă butonul nu este deja disabled
                        const submitBtn = form.querySelector('button[type="submit"]');
                        if (submitBtn && !submitBtn.disabled) {
                            this.handleProfileSave(e, user);
                        } else {
                            console.log('⏳ Salvare în curs, așteptați...');
                        }
                    });

                    console.log('✅ Event listener pentru submit adăugat cu succes');
                } else {
                    console.error('❌ Formularul profileEditForm nu a fost găsit!');
                }

                if (cancelBtn) {
                    console.log('✅ Buton cancel găsit');
                    cancelBtn.addEventListener('click', () => {
                        console.log('🔙 Anulare editare, revenire la profil');
                        this.renderProfile(user);
                    });
                } else {
                    console.error('❌ Butonul cancelEditBtn nu a fost găsit!');
                }
            }, 100);
        },

        async handleProfileSave(e, oldUser) {
            e.preventDefault();
            console.log('🔄 handleProfileSave apelat');

            const t = (key) => {
                const lang = localStorage.getItem('language') || 'ro';
                return window.translations?.[lang]?.[key] || key;
            };

            const form = e.target;
            const formData = new FormData(form);
            const submitBtn = form.querySelector('button[type="submit"]');

            console.log('📋 Date formular colectate');

            // Disable button și arată loading
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Se salvează...';
                console.log('⏳ Buton dezactivat, loading activ');
            }

            try {
                // Creează obiectul cu datele actualizate
                const profileData = {
                    firstName: formData.get('firstName')?.trim() || '',
                    lastName: formData.get('lastName')?.trim() || '',
                    phone: formData.get('phone')?.trim() || '',
                    company: formData.get('company')?.trim() || '',
                    address: formData.get('address')?.trim() || '',
                    city: formData.get('city')?.trim() || '',
                    postalCode: formData.get('postalCode')?.trim() || '',
                    county: formData.get('county')?.trim() || '',
                    country: formData.get('country')?.trim() || '',
                    alternativePhone: formData.get('alternativePhone')?.trim() || '',
                    whatsapp: formData.get('whatsapp')?.trim() || ''
                };

                console.log('📤 Trimitere date către API:', profileData);

                // Verifică dacă API există
                if (!window.API) {
                    throw new Error('API Client nu este disponibil. Reîncarcă pagina.');
                }

                // Verifică token de autentificare
                const token = localStorage.getItem('authToken');
                if (!token) {
                    throw new Error('Nu ești autentificat. Te rugăm să te autentifici din nou.');
                }

                // Trimite către API
                const response = await window.API.updateProfile(profileData);
                console.log('📥 Răspuns de la API:', response);

                if (response && response.success) {
                    const updatedUser = response.data?.user || response.data;
                    console.log('✅ Date utilizator actualizate:', updatedUser);

                    // Actualizează localStorage
                    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
                    console.log('💾 localStorage actualizat');

                    // Arată mesaj de succes
                    this.showSuccessMessage(t('account.profile.saveSuccess') || 'Profil actualizat cu succes!');

                    console.log('✅ Profil actualizat cu succes');

                    // Reîncarcă profilul după 1.5 secunde
                    setTimeout(() => {
                        console.log('🔄 Reîncărcare profil...');
                        this.renderProfile(updatedUser);
                    }, 1500);
                } else {
                    throw new Error(response?.message || 'Răspuns invalid de la server');
                }
            } catch (error) {
                console.error('❌ Eroare actualizare profil:', error);

                // Mesaj de eroare mai detaliat
                let errorMessage = error.message || t('account.profile.saveError') || 'Eroare la salvarea profilului';

                if (error.message?.includes('Failed to fetch')) {
                    errorMessage = 'Nu se poate conecta la server. Verifică dacă backend-ul este pornit.';
                } else if (error.message?.includes('401')) {
                    errorMessage = 'Sesiunea a expirat. Te rugăm să te autentifici din nou.';
                } else if (error.message?.includes('400')) {
                    errorMessage = 'Date invalide. Verifică câmpurile și încearcă din nou.';
                }

                this.showErrorMessage(errorMessage);
            } finally {
                // Restore button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-save"></i> ' + (t('account.profile.saveChanges') || 'Salvează Modificările');
                    console.log('✅ Buton reactivat');
                }
            }
        },

        showSuccessMessage(message) {
            console.log('✅ Afișare mesaj succes:', message);

            // Elimină mesajele existente
            const existingMessages = this.content.querySelectorAll('.profile-success-message, .profile-error-message');
            existingMessages.forEach(msg => msg.remove());

            const successDiv = document.createElement('div');
            successDiv.className = 'profile-success-message';
            successDiv.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            `;

            this.content.insertBefore(successDiv, this.content.firstChild);

            // Scroll la mesaj
            successDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            setTimeout(() => {
                successDiv.classList.add('show');
            }, 100);

            setTimeout(() => {
                successDiv.classList.remove('show');
                setTimeout(() => successDiv.remove(), 300);
            }, 4000);
        },

        showErrorMessage(message) {
            console.error('❌ Afișare mesaj eroare:', message);

            // Elimină mesajele existente
            const existingMessages = this.content.querySelectorAll('.profile-success-message, .profile-error-message');
            existingMessages.forEach(msg => msg.remove());

            const errorDiv = document.createElement('div');
            errorDiv.className = 'profile-error-message';
            
            // Verifică dacă este eroare de sesiune expirată
            const isSessionError = message.includes('Sesiunea') || message.includes('autentific') || message.includes('401');
            
            if (isSessionError) {
                errorDiv.innerHTML = `
                    <i class="fas fa-exclamation-circle"></i>
                    <span>${message}</span>
                    <button class="btn-fix-session" onclick="window.fixSession()">
                        <i class="fas fa-sync-alt"></i> Rezolvă Acum
                    </button>
                `;
            } else {
                errorDiv.innerHTML = `
                    <i class="fas fa-exclamation-circle"></i>
                    <span>${message}</span>
                `;
            }

            this.content.insertBefore(errorDiv, this.content.firstChild);

            // Scroll la mesaj
            errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            setTimeout(() => {
                errorDiv.classList.add('show');
            }, 100);

            setTimeout(() => {
                errorDiv.classList.remove('show');
                setTimeout(() => errorDiv.remove(), 300);
            }, 6000);
        },

        renderSettings(user) {
            const t = (key) => {
                const lang = localStorage.getItem('language') || 'ro';
                return window.translations?.[lang]?.[key] || key;
            };

            // Obține setările din localStorage
            const settings = this.getUserSettings(user);

            this.content.innerHTML = `
                <div class="dashboard-content">
                    <div class="dashboard-welcome">
                        <h3><i class="fas fa-cog"></i> ${t('account.settings.title')}</h3>
                        <p>${t('account.settings.subtitle')}</p>
                    </div>
                    
                    <!-- Notificări -->
                    <div class="info-card">
                        <h4><i class="fas fa-bell"></i> ${t('account.settings.notificationsTitle')}</h4>
                        <div class="settings-list">
                            <div class="setting-item">
                                <div class="setting-info">
                                    <h5>${t('account.settings.notifications')}</h5>
                                    <p>${t('account.settings.notificationsDesc')}</p>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox" id="emailNotifications" ${settings.emailNotifications ? 'checked' : ''}>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                            <div class="setting-item">
                                <div class="setting-info">
                                    <h5>${t('account.settings.newsletter')}</h5>
                                    <p>${t('account.settings.newsletterDesc')}</p>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox" id="newsletter" ${settings.newsletter ? 'checked' : ''}>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Securitate -->
                    <div class="info-card">
                        <h4><i class="fas fa-shield-alt"></i> ${t('account.settings.securityTitle')}</h4>
                        <div class="settings-list">
                            <div class="setting-item">
                                <div class="setting-info">
                                    <h5>${t('account.settings.twoFactor')}</h5>
                                    <p>${t('account.settings.twoFactorDesc')}</p>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox" id="twoFactor" ${settings.twoFactor ? 'checked' : ''}>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                            <div class="setting-item">
                                <div class="setting-info">
                                    <h5>${t('account.settings.changePassword')}</h5>
                                    <p>${t('account.settings.changePasswordDesc')}</p>
                                </div>
                                <button class="btn-secondary btn-sm" id="changePasswordBtn">
                                    <i class="fas fa-key"></i> Schimbă
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Date și Cont -->
                    <div class="info-card">
                        <h4><i class="fas fa-database"></i> ${t('account.settings.dataTitle')}</h4>
                        <div class="settings-list">
                            <div class="setting-item danger">
                                <div class="setting-info">
                                    <h5>${t('account.settings.deleteAccount')}</h5>
                                    <p>${t('account.settings.deleteAccountDesc')}</p>
                                </div>
                                <button class="btn-danger btn-sm" onclick="alert('${t('account.settings.deleteAccountInfo')}')">
                                    <i class="fas fa-trash-alt"></i> ${t('account.settings.deleteAccount')}
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Buton Salvare -->
                    <div class="profile-actions">
                        <button class="btn-primary" id="saveSettingsBtn">
                            <i class="fas fa-save"></i> ${t('account.settings.saveSettings')}
                        </button>
                    </div>
                </div>
            `;

            // Event listeners
            setTimeout(() => {
                this.initSettingsListeners(user, settings);
            }, 100);
        },

        getUserSettings(user) {
            const settingsStr = localStorage.getItem(`settings_${user.email}`);
            if (settingsStr) {
                try {
                    return JSON.parse(settingsStr);
                } catch (e) {
                    return this.getDefaultSettings();
                }
            }
            return this.getDefaultSettings();
        },

        getDefaultSettings() {
            return {
                emailNotifications: true,
                newsletter: false,
                twoFactor: false
            };
        },

        initSettingsListeners(user, settings) {
            const saveBtn = document.getElementById('saveSettingsBtn');
            const changePasswordBtn = document.getElementById('changePasswordBtn');

            if (saveBtn) {
                saveBtn.addEventListener('click', () => {
                    const newSettings = {
                        emailNotifications: document.getElementById('emailNotifications').checked,
                        newsletter: document.getElementById('newsletter').checked,
                        twoFactor: document.getElementById('twoFactor').checked
                    };

                    // Salvează setările
                    localStorage.setItem(`settings_${user.email}`, JSON.stringify(newSettings));

                    const t = (key) => {
                        const lang = localStorage.getItem('language') || 'ro';
                        return window.translations?.[lang]?.[key] || key;
                    };

                    this.showSuccessMessage(t('account.settings.saveSuccess'));

                    setTimeout(() => {
                        this.renderSettings(user);
                    }, 1000);
                });
            }

            if (changePasswordBtn) {
                changePasswordBtn.addEventListener('click', () => {
                    this.showChangePasswordModal(user);
                });
            }
        },

        showChangePasswordModal(user) {
            const t = (key) => {
                const lang = localStorage.getItem('language') || 'ro';
                return window.translations?.[lang]?.[key] || key;
            };

            // Creează modal pentru schimbare parolă
            const modalHTML = `
                <div class="password-modal-overlay" id="passwordModalOverlay">
                    <div class="password-modal">
                        <div class="password-modal-header">
                            <h3><i class="fas fa-key"></i> Schimbă Parola</h3>
                            <button class="modal-close-btn" id="closePasswordModal">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <form id="changePasswordForm" class="password-form">
                            <div class="form-group">
                                <label>Parola Curentă <span class="required">*</span></label>
                                <input type="password" id="currentPassword" required placeholder="Introdu parola curentă">
                            </div>
                            <div class="form-group">
                                <label>Parola Nouă <span class="required">*</span></label>
                                <input type="password" id="newPassword" required placeholder="Minim 6 caractere">
                                <small>Parola trebuie să aibă minim 6 caractere</small>
                            </div>
                            <div class="form-group">
                                <label>Confirmă Parola Nouă <span class="required">*</span></label>
                                <input type="password" id="confirmPassword" required placeholder="Reintroduceți parola nouă">
                            </div>
                            <div class="password-actions">
                                <button type="button" class="btn-secondary" id="cancelPasswordBtn">
                                    <i class="fas fa-times"></i> Anulează
                                </button>
                                <button type="submit" class="btn-primary">
                                    <i class="fas fa-check"></i> Schimbă Parola
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            `;

            // Adaugă modal-ul în pagină
            document.body.insertAdjacentHTML('beforeend', modalHTML);

            // Event listeners pentru modal
            const overlay = document.getElementById('passwordModalOverlay');
            const closeBtn = document.getElementById('closePasswordModal');
            const cancelBtn = document.getElementById('cancelPasswordBtn');
            const form = document.getElementById('changePasswordForm');

            const closeModal = () => {
                overlay.classList.add('closing');
                setTimeout(() => overlay.remove(), 300);
            };

            closeBtn.addEventListener('click', closeModal);
            cancelBtn.addEventListener('click', closeModal);
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) closeModal();
            });

            // Submit form
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleChangePassword(user, closeModal);
            });

            // Animație deschidere
            setTimeout(() => overlay.classList.add('active'), 10);
        },

        async handleChangePassword(user, closeModal) {
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const submitBtn = document.querySelector('#changePasswordForm button[type="submit"]');

            // Validare
            if (newPassword.length < 6) {
                this.showErrorMessage('Parola nouă trebuie să aibă minim 6 caractere');
                return;
            }

            if (newPassword !== confirmPassword) {
                this.showErrorMessage('Parolele nu se potrivesc');
                return;
            }

            // Disable button
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Se schimbă...';
            }

            try {
                // Verifică dacă API există
                if (!window.API) {
                    throw new Error('API Client nu este disponibil. Reîncarcă pagina.');
                }

                // Trimite către API
                const response = await window.API.changePassword(currentPassword, newPassword, confirmPassword);

                if (response && response.success) {
                    this.showSuccessMessage('Parola a fost schimbată cu succes!');
                    closeModal();
                } else {
                    throw new Error(response?.message || 'Eroare la schimbarea parolei');
                }
            } catch (error) {
                console.error('❌ Eroare schimbare parolă:', error);

                let errorMessage = error.message || 'Eroare la schimbarea parolei';

                if (error.message?.includes('Failed to fetch')) {
                    errorMessage = 'Nu se poate conecta la server. Verifică dacă backend-ul este pornit.';
                } else if (error.message?.includes('401')) {
                    errorMessage = 'Parola curentă este incorectă.';
                }

                this.showErrorMessage(errorMessage);
            } finally {
                // Restore button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Schimbă Parola';
                }
            }
        },

        renderContact(user) {
            const t = (key) => {
                const lang = localStorage.getItem('language') || 'ro';
                return window.translations?.[lang]?.[key] || key;
            };

            this.content.innerHTML = `
                <div class="dashboard-content">
                    <div class="dashboard-welcome">
                        <h3><i class="fas fa-headset"></i> ${t('account.support.title')}</h3>
                        <p>${t('account.support.subtitle')}</p>
                    </div>
                    
                    <!-- Contact Direct -->
                    <div class="info-card">
                        <h4><i class="fas fa-phone-alt"></i> ${t('account.support.contactDirect')}</h4>
                        <div class="contact-grid">
                            <a href="mailto:mc_metsolart@yahoo.com" class="contact-card">
                                <div class="contact-icon">
                                    <i class="fas fa-envelope"></i>
                                </div>
                                <div class="contact-info">
                                    <h5>${t('account.support.email')}</h5>
                                    <p>mc_metsolart@yahoo.com</p>
                                </div>
                            </a>
                            <a href="tel:+40123456789" class="contact-card">
                                <div class="contact-icon">
                                    <i class="fas fa-phone"></i>
                                </div>
                                <div class="contact-info">
                                    <h5>${t('account.support.phone')}</h5>
                                    <p>+40 123 456 789</p>
                                </div>
                            </a>
                            <a href="https://wa.me/40123456789" target="_blank" class="contact-card">
                                <div class="contact-icon">
                                    <i class="fab fa-whatsapp"></i>
                                </div>
                                <div class="contact-info">
                                    <h5>WhatsApp</h5>
                                    <p>+40 123 456 789</p>
                                </div>
                            </a>
                            <button class="contact-card" onclick="document.getElementById('chatButton').click()">
                                <div class="contact-icon">
                                    <i class="fas fa-comments"></i>
                                </div>
                                <div class="contact-info">
                                    <h5>${t('account.support.chat')}</h5>
                                    <p>${t('account.support.chatDesc')}</p>
                                </div>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Program Lucru -->
                    <div class="info-card">
                        <h4><i class="fas fa-clock"></i> ${t('account.support.schedule')}</h4>
                        <div class="schedule-list">
                            <div class="schedule-item">
                                <span>${t('account.support.weekdays')}</span>
                                <strong>09:00 - 18:00</strong>
                            </div>
                            <div class="schedule-item">
                                <span>${t('account.support.saturday')}</span>
                                <strong>10:00 - 14:00</strong>
                            </div>
                            <div class="schedule-item">
                                <span>${t('account.support.sunday')}</span>
                                <strong>${t('account.support.closed')}</strong>
                            </div>
                        </div>
                    </div>
                    
                    <!-- FAQ -->
                    <div class="info-card">
                        <h4><i class="fas fa-question-circle"></i> ${t('account.support.faq')}</h4>
                        <div class="faq-list">
                            <div class="faq-item">
                                <button class="faq-question" onclick="this.parentElement.classList.toggle('active')">
                                    <span>${t('account.support.faq1Q')}</span>
                                    <i class="fas fa-chevron-down"></i>
                                </button>
                                <div class="faq-answer">
                                    <p>${t('account.support.faq1A')}</p>
                                </div>
                            </div>
                            <div class="faq-item">
                                <button class="faq-question" onclick="this.parentElement.classList.toggle('active')">
                                    <span>${t('account.support.faq2Q')}</span>
                                    <i class="fas fa-chevron-down"></i>
                                </button>
                                <div class="faq-answer">
                                    <p>${t('account.support.faq2A')}</p>
                                </div>
                            </div>
                            <div class="faq-item">
                                <button class="faq-question" onclick="this.parentElement.classList.toggle('active')">
                                    <span>${t('account.support.faq3Q')}</span>
                                    <i class="fas fa-chevron-down"></i>
                                </button>
                                <div class="faq-answer">
                                    <p>${t('account.support.faq3A')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Formular Contact -->
                    <div class="info-card">
                        <h4><i class="fas fa-paper-plane"></i> ${t('account.support.sendMessage')}</h4>
                        <form id="supportForm" class="support-form">
                            <div class="form-group">
                                <label>${t('account.support.subject')}</label>
                                <input type="text" name="subject" required placeholder="${t('account.support.subjectPlaceholder')}">
                            </div>
                            <div class="form-group">
                                <label>${t('account.support.message')}</label>
                                <textarea name="message" rows="5" required placeholder="${t('account.support.messagePlaceholder')}"></textarea>
                            </div>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-paper-plane"></i> ${t('account.support.send')}
                            </button>
                        </form>
                    </div>
                </div>
            `;

            // Event listener pentru formular
            setTimeout(() => {
                const form = document.getElementById('supportForm');
                if (form) {
                    form.addEventListener('submit', (e) => {
                        e.preventDefault();
                        const t = (key) => {
                            const lang = localStorage.getItem('language') || 'ro';
                            return window.translations?.[lang]?.[key] || key;
                        };
                        this.showSuccessMessage(t('account.support.sendSuccess'));
                        form.reset();
                    });
                }
            }, 100);
        },

        getCurrentUser() {
            const userStr = localStorage.getItem('currentUser');
            if (userStr) {
                try {
                    return JSON.parse(userStr);
                } catch (e) {
                    console.error('Error parsing user:', e);
                    return null;
                }
            }
            return null;
        }
    };

    // Inițializează când DOM-ul e gata
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => AccountPanel.init());
    } else {
        AccountPanel.init();
    }

    // Export global
    window.AccountPanel = AccountPanel;

    console.log('✅ Account Panel ready!');
})();

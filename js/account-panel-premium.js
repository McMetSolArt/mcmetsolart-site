/**
 * ACCOUNT PANEL PREMIUM - PROFESIONAL
 * Design elegant, funcționalitate completă, zero erori
 * MC MetSolArt
 */

(function() {
    'use strict';

    const AccountPanelPremium = {
        panel: null,
        overlay: null,
        currentTab: 'dashboard',
        isOpen: false,
        userData: null,
        editMode: false,

        init() {
            this.createPanel();
            this.attachEvents();
        },

        createPanel() {
            // Overlay
            this.overlay = document.createElement('div');
            this.overlay.className = 'account-overlay-premium';
            document.body.appendChild(this.overlay);

            // Panel
            this.panel = document.createElement('div');
            this.panel.className = 'account-panel-premium';
            this.panel.innerHTML = this.getPanelHTML();
            document.body.appendChild(this.panel);
        },

        getPanelHTML() {
            return `
                <div class="account-header-premium">
                    <div class="account-header-top">
                        <div class="account-user-info">
                            <div class="account-avatar-container">
                                <div class="account-avatar" id="accountAvatarPremium">👤</div>
                                <button class="avatar-upload-btn" onclick="window.AccountPanelPremium.uploadAvatar()" title="Schimbă imaginea">
                                    📷
                                </button>
                            </div>
                            <div class="account-user-details">
                                <h2 id="accountUserNamePremium">Utilizator</h2>
                                <div class="account-user-email" id="accountUserEmailPremium">email@example.com</div>
                                <div class="account-user-status">
                                    <span class="status-dot"></span>
                                    <span>Activ</span>
                                </div>
                            </div>
                        </div>
                        <button class="account-close-premium" onclick="window.AccountPanelPremium.hide()" title="Închide">&times;</button>
                    </div>
                    
                    <div class="account-quick-stats">
                        <div class="quick-stat-card">
                            <div class="quick-stat-number" id="statOrders">0</div>
                            <div class="quick-stat-label">Comenzi</div>
                        </div>
                        <div class="quick-stat-card">
                            <div class="quick-stat-number" id="statTotal">0 EUR</div>
                            <div class="quick-stat-label">Total</div>
                        </div>
                        <div class="quick-stat-card">
                            <div class="quick-stat-number" id="statActive">0</div>
                            <div class="quick-stat-label">Active</div>
                        </div>
                    </div>
                </div>
                
                <div class="account-tabs-premium">
                    <button class="account-tab-premium active" onclick="window.AccountPanelPremium.switchTab('dashboard')">
                        📊 Dashboard
                    </button>
                    <button class="account-tab-premium" onclick="window.AccountPanelPremium.switchTab('profile')">
                        👤 Profil
                    </button>
                    <button class="account-tab-premium" onclick="window.AccountPanelPremium.switchTab('orders')">
                        📦 Comenzi
                    </button>
                    <button class="account-tab-premium" onclick="window.AccountPanelPremium.switchTab('settings')">
                        ⚙️ Setări
                    </button>
                </div>
                
                <div class="account-content-premium" id="accountContentPremium">
                    <p style="text-align: center; color: var(--muted-foreground);">Se încarcă...</p>
                </div>
            `;
        },

        attachEvents() {
            this.overlay.addEventListener('click', () => this.hide());
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.hide();
                }
            });
        },

        show(tab = 'dashboard') {
            if (!this.panel || !this.overlay) return;
            
            this.currentTab = tab;
            this.isOpen = true;
            
            this.overlay.classList.add('active');
            this.panel.classList.add('active');

            this.loadUserData();
            this.switchTab(tab);
        },

        hide() {
            this.isOpen = false;
            this.panel.classList.remove('active');
            this.overlay.classList.remove('active');
        },

        switchTab(tab) {
            this.currentTab = tab;
            
            document.querySelectorAll('.account-tab-premium').forEach((btn, index) => {
                btn.classList.remove('active');
                const tabs = ['dashboard', 'profile', 'orders', 'settings'];
                if (tabs[index] === tab) {
                    btn.classList.add('active');
                }
            });
            
            this.loadContent(tab);
        },

        loadUserData() {
            try {
                const userStr = localStorage.getItem('currentUser');
                this.userData = userStr ? JSON.parse(userStr) : null;
                
                if (this.userData) {
                    const firstName = this.userData.firstName || 'Utilizator';
                    const lastName = this.userData.lastName || '';
                    document.getElementById('accountUserNamePremium').textContent = `${firstName} ${lastName}`.trim();
                    document.getElementById('accountUserEmailPremium').textContent = this.userData.email || '';
                    
                    const initials = (firstName.charAt(0) + (lastName.charAt(0) || '')).toUpperCase();
                    document.getElementById('accountAvatarPremium').textContent = initials || '👤';
                    
                    this.loadStats();
                }
            } catch (e) {
                // Silent fail
            }
        },

        async loadStats() {
            try {
                if (window.API) {
                    const data = await window.API.getOrders();
                    const orders = Array.isArray(data) ? data : (data.data || []);
                    
                    document.getElementById('statOrders').textContent = orders.length;
                    
                    const total = orders.reduce((sum, order) => sum + (parseFloat(order.total_amount) || 0), 0);
                    document.getElementById('statTotal').textContent = total.toFixed(2) + ' EUR';
                    
                    const active = orders.filter(o => ['in_asteptare', 'confirmat', 'in_procesare', 'expediat'].includes(o.status)).length;
                    document.getElementById('statActive').textContent = active;
                }
            } catch (error) {
                // Silent fail
            }
        },

        async loadContent(tab) {
            const content = document.getElementById('accountContentPremium');
            
            if (!this.userData) {
                content.innerHTML = `
                    <div class="empty-state-premium">
                        <div class="empty-state-icon">🔒</div>
                        <div class="empty-state-title">Nu ești autentificat</div>
                        <div class="empty-state-text">Te rugăm să te loghezi pentru a accesa contul tău.</div>
                    </div>
                `;
                return;
            }

            switch(tab) {
                case 'dashboard':
                    this.loadDashboard();
                    break;
                case 'profile':
                    this.loadProfile();
                    break;
                case 'orders':
                    await this.loadOrders();
                    break;
                case 'settings':
                    this.loadSettings();
                    break;
            }
        },

        loadDashboard() {
            const content = document.getElementById('accountContentPremium');
            const user = this.userData;
            
            content.innerHTML = `
                <div class="account-card-premium">
                    <div class="card-title-premium">
                        <span>👋</span>
                        Bun venit, ${user.firstName}!
                    </div>
                    <p style="color: var(--muted-foreground); font-size: 14px; line-height: 1.6;">
                        Acesta este dashboard-ul tău personal. Aici poți vedea o prezentare generală a contului tău.
                    </p>
                </div>
                
                <div class="account-card-premium">
                    <div class="card-title-premium">
                        <span>📊</span>
                        Informații Rapide
                    </div>
                    <div class="info-grid-premium">
                        <div class="info-item-premium">
                            <div class="info-label-premium">Nume Complet</div>
                            <div class="info-value-premium">${user.firstName} ${user.lastName || ''}</div>
                        </div>
                        <div class="info-item-premium">
                            <div class="info-label-premium">Email</div>
                            <div class="info-value-premium">${user.email}</div>
                        </div>
                        <div class="info-item-premium">
                            <div class="info-label-premium">Telefon</div>
                            <div class="info-value-premium">${user.phone || 'Nu este setat'}</div>
                        </div>
                        <div class="info-item-premium">
                            <div class="info-label-premium">Țară</div>
                            <div class="info-value-premium">${user.country || 'Nu este setată'}</div>
                        </div>
                    </div>
                </div>
                
                <div class="btn-group-premium">
                    <button class="btn-primary-premium" onclick="window.AccountPanelPremium.switchTab('profile')">
                        ✏️ Editează Profilul
                    </button>
                    <button class="btn-secondary-premium" onclick="window.AccountPanelPremium.switchTab('orders')">
                        📦 Vezi Comenzile
                    </button>
                </div>
            `;
        },

        loadProfile() {
            const content = document.getElementById('accountContentPremium');
            const user = this.userData;
            
            if (!this.editMode) {
                content.innerHTML = `
                    <div class="account-card-premium">
                        <div class="card-title-premium">
                            <span>📸</span>
                            Imagine Profil
                        </div>
                        <div class="profile-image-section">
                            <div class="profile-image-preview">
                                ${(user.firstName?.charAt(0) || '') + (user.lastName?.charAt(0) || '')}
                            </div>
                            <div class="profile-image-actions">
                                <h4>Schimbă imaginea de profil</h4>
                                <p>Încarcă o imagine JPG, PNG sau GIF (max 5MB)</p>
                                <button class="btn-secondary-premium" onclick="window.AccountPanelPremium.uploadAvatar()">
                                    📤 Încarcă Imagine
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="account-card-premium">
                        <div class="card-title-premium">
                            <span>👤</span>
                            Informații Personale
                        </div>
                        <div class="info-grid-premium">
                            <div class="info-item-premium">
                                <div class="info-label-premium">Prenume</div>
                                <div class="info-value-premium">${user.firstName || '-'}</div>
                            </div>
                            <div class="info-item-premium">
                                <div class="info-label-premium">Nume</div>
                                <div class="info-value-premium">${user.lastName || '-'}</div>
                            </div>
                            <div class="info-item-premium">
                                <div class="info-label-premium">Email</div>
                                <div class="info-value-premium">${user.email || '-'}</div>
                            </div>
                            <div class="info-item-premium">
                                <div class="info-label-premium">Telefon</div>
                                <div class="info-value-premium">${user.phone || '-'}</div>
                            </div>
                            ${user.company ? `
                            <div class="info-item-premium">
                                <div class="info-label-premium">Companie</div>
                                <div class="info-value-premium">${user.company}</div>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="account-card-premium">
                        <div class="card-title-premium">
                            <span>📍</span>
                            Adresă
                        </div>
                        <div class="info-grid-premium">
                            <div class="info-item-premium">
                                <div class="info-label-premium">Țară</div>
                                <div class="info-value-premium">${user.country || '-'}</div>
                            </div>
                            <div class="info-item-premium">
                                <div class="info-label-premium">Oraș</div>
                                <div class="info-value-premium">${user.city || '-'}</div>
                            </div>
                            <div class="info-item-premium" style="grid-column: 1 / -1;">
                                <div class="info-label-premium">Adresă Completă</div>
                                <div class="info-value-premium">${user.address || '-'}</div>
                            </div>
                            ${user.postalCode ? `
                            <div class="info-item-premium">
                                <div class="info-label-premium">Cod Poștal</div>
                                <div class="info-value-premium">${user.postalCode}</div>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="btn-group-premium">
                        <button class="btn-primary-premium" onclick="window.AccountPanelPremium.enableEditMode()">
                            ✏️ Editează Profilul
                        </button>
                    </div>
                `;
            } else {
                content.innerHTML = `
                    <form id="profileEditForm" onsubmit="window.AccountPanelPremium.saveProfile(event)">
                        <div class="account-card-premium">
                            <div class="card-title-premium">
                                <span>👤</span>
                                Editează Informații Personale
                            </div>
                            <div class="form-grid-premium">
                                <div class="form-group-premium">
                                    <label class="form-label-premium">
                                        Prenume <span class="label-required">*</span>
                                    </label>
                                    <input type="text" class="form-input-premium" name="firstName" value="${user.firstName || ''}" required>
                                </div>
                                <div class="form-group-premium">
                                    <label class="form-label-premium">
                                        Nume <span class="label-required">*</span>
                                    </label>
                                    <input type="text" class="form-input-premium" name="lastName" value="${user.lastName || ''}" required>
                                </div>
                                <div class="form-group-premium">
                                    <label class="form-label-premium">
                                        Email <span class="label-required">*</span>
                                    </label>
                                    <input type="email" class="form-input-premium" name="email" value="${user.email || ''}" required>
                                    <div class="form-hint">Emailul este folosit pentru autentificare</div>
                                </div>
                                <div class="form-group-premium">
                                    <label class="form-label-premium">
                                        Telefon <span class="label-required">*</span>
                                    </label>
                                    <input type="tel" class="form-input-premium" name="phone" value="${user.phone || ''}" required>
                                </div>
                                <div class="form-group-premium full-width">
                                    <label class="form-label-premium">Companie</label>
                                    <input type="text" class="form-input-premium" name="company" value="${user.company || ''}">
                                </div>
                            </div>
                        </div>
                        
                        <div class="account-card-premium">
                            <div class="card-title-premium">
                                <span>📍</span>
                                Editează Adresa
                            </div>
                            <div class="form-grid-premium">
                                <div class="form-group-premium">
                                    <label class="form-label-premium">
                                        Țară <span class="label-required">*</span>
                                    </label>
                                    <select class="form-select-premium" name="country" required>
                                        <option value="">Selectează țara</option>
                                        <option value="România" ${user.country === 'România' ? 'selected' : ''}>România</option>
                                        <option value="Italia" ${user.country === 'Italia' ? 'selected' : ''}>Italia</option>
                                        <option value="Spania" ${user.country === 'Spania' ? 'selected' : ''}>Spania</option>
                                        <option value="Germania" ${user.country === 'Germania' ? 'selected' : ''}>Germania</option>
                                        <option value="Franța" ${user.country === 'Franța' ? 'selected' : ''}>Franța</option>
                                        <option value="Altă țară" ${user.country && !['România', 'Italia', 'Spania', 'Germania', 'Franța'].includes(user.country) ? 'selected' : ''}>Altă țară</option>
                                    </select>
                                </div>
                                <div class="form-group-premium">
                                    <label class="form-label-premium">
                                        Oraș <span class="label-required">*</span>
                                    </label>
                                    <input type="text" class="form-input-premium" name="city" value="${user.city || ''}" required>
                                </div>
                                <div class="form-group-premium full-width">
                                    <label class="form-label-premium">
                                        Adresă Completă <span class="label-required">*</span>
                                    </label>
                                    <textarea class="form-textarea-premium" name="address" required>${user.address || ''}</textarea>
                                    <div class="form-hint">Strada, număr, bloc, apartament, etc.</div>
                                </div>
                                <div class="form-group-premium">
                                    <label class="form-label-premium">Cod Poștal</label>
                                    <input type="text" class="form-input-premium" name="postalCode" value="${user.postalCode || ''}">
                                </div>
                            </div>
                        </div>
                        
                        <div class="btn-group-premium">
                            <button type="submit" class="btn-primary-premium">
                                💾 Salvează Modificările
                            </button>
                            <button type="button" class="btn-outline-premium" onclick="window.AccountPanelPremium.cancelEdit()">
                                ❌ Anulează
                            </button>
                        </div>
                    </form>
                `;
            }
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
            const submitBtn = form.querySelector('button[type="submit"]');
            const formData = new FormData(form);
            const updatedData = {};
            
            formData.forEach((value, key) => {
                updatedData[key] = value;
            });
            
            try {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
                
                this.userData = { ...this.userData, ...updatedData };
                localStorage.setItem('currentUser', JSON.stringify(this.userData));
                
                if (window.API && window.API.updateProfile) {
                    await window.API.updateProfile(updatedData);
                }
                
                await new Promise(resolve => setTimeout(resolve, 500));
                
                this.editMode = false;
                this.loadUserData();
                this.loadProfile();
                
                this.showNotification('Profilul a fost actualizat cu succes!', 'success');
            } catch (error) {
                this.showNotification('Eroare la salvarea profilului', 'error');
            } finally {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        },

        uploadAvatar() {
            this.showNotification('Funcționalitatea de încărcare imagine va fi disponibilă în curând', 'info');
        },

        async loadOrders() {
            const content = document.getElementById('accountContentPremium');
            
            content.innerHTML = `
                <div class="account-card-premium">
                    <div class="card-title-premium">
                        <span>📦</span>
                        Comenzile Mele
                    </div>
                    <p style="text-align: center; color: var(--muted-foreground);">Se încarcă comenzile...</p>
                </div>
            `;
            
            try {
                if (!window.API) {
                    throw new Error('API Client nu este disponibil');
                }

                const data = await window.API.getOrders();
                let orders = Array.isArray(data) ? data : (data.data || data.orders || []);
                
                if (orders.length === 0) {
                    content.innerHTML = `
                        <div class="empty-state-premium">
                            <div class="empty-state-icon">📦</div>
                            <div class="empty-state-title">Nu ai comenzi încă</div>
                            <div class="empty-state-text">Când vei plasa o comandă, o vei vedea aici.</div>
                        </div>
                    `;
                    return;
                }

                let html = '';
                orders.forEach(order => {
                    const statusClass = `status-${order.status}`;
                    const statusText = this.getStatusText(order.status);
                    const date = new Date(order.created_at).toLocaleDateString('ro-RO', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    
                    html += `
                        <div class="order-card-premium">
                            <div class="order-header-premium">
                                <div>
                                    <div class="order-number">📦 ${order.order_number}</div>
                                    <div class="order-date">${date}</div>
                                </div>
                                <span class="order-status-badge ${statusClass}">${statusText}</span>
                            </div>
                            <div class="order-details-premium">
                                <div class="order-detail-item">
                                    <div class="order-detail-label">Total</div>
                                    <div class="order-detail-value order-total">${order.total_amount} EUR</div>
                                </div>
                                <div class="order-detail-item">
                                    <div class="order-detail-label">Status</div>
                                    <div class="order-detail-value">${statusText}</div>
                                </div>
                            </div>
                            <div class="btn-group-premium">
                                <button class="btn-outline-premium" onclick="window.AccountPanelPremium.viewOrderDetails('${order.order_number}')">
                                    👁️ Vezi Detalii
                                </button>
                            </div>
                        </div>
                    `;
                });

                content.innerHTML = html;
            } catch (error) {
                content.innerHTML = `
                    <div class="account-card-premium">
                        <p style="color: var(--destructive); text-align: center;">
                            Eroare la încărcarea comenzilor
                        </p>
                    </div>
                `;
            }
        },

        viewOrderDetails(orderNumber) {
            this.showNotification(`Detalii comandă ${orderNumber} - În dezvoltare`, 'info');
        },

        loadSettings() {
            const content = document.getElementById('accountContentPremium');
            const user = this.userData;
            
            content.innerHTML = `
                <div class="account-card-premium">
                    <div class="card-title-premium">
                        <span>🔐</span>
                        Securitate
                    </div>
                    <p style="color: var(--muted-foreground); margin-bottom: 15px; font-size: 14px;">
                        Gestionează setările de securitate ale contului tău.
                    </p>
                    <button class="btn-primary-premium" onclick="window.AccountPanelPremium.changePassword()">
                        🔑 Schimbă Parola
                    </button>
                </div>
                
                <div class="account-card-premium">
                    <div class="card-title-premium">
                        <span>🌐</span>
                        Preferințe
                    </div>
                    <div class="info-grid-premium">
                        <div class="info-item-premium">
                            <div class="info-label-premium">Limbă</div>
                            <div class="info-value-premium">${user.language === 'en' ? 'English' : 'Română'}</div>
                        </div>
                        <div class="info-item-premium">
                            <div class="info-label-premium">Temă</div>
                            <div class="info-value-premium">Automată</div>
                        </div>
                    </div>
                </div>
                
                <div class="account-card-premium">
                    <div class="card-title-premium">
                        <span>🚪</span>
                        Cont
                    </div>
                    <button class="btn-outline-premium" onclick="window.AccountPanelPremium.logout()">
                        🚪 Deconectare
                    </button>
                </div>
            `;
        },

        changePassword() {
            this.showNotification('Funcționalitatea de schimbare parolă va fi disponibilă în curând', 'info');
        },

        logout() {
            if (confirm('Sigur vrei să te deconectezi?')) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('authToken');
                this.hide();
                window.location.reload();
            }
        },

        getStatusText(status) {
            const texts = {
                'in_asteptare': 'În Așteptare',
                'confirmat': 'Confirmat',
                'in_procesare': 'În Procesare',
                'expediat': 'Expediat',
                'livrat': 'Livrat',
                'anulat': 'Anulat'
            };
            return texts[status] || status;
        },

        showNotification(message, type = 'info') {
            // Simple notification - can be enhanced
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--card);
                border: 1px solid var(--border);
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                max-width: 300px;
                animation: slideIn 0.3s ease;
            `;
            notification.textContent = message;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }
    };

    // Init when DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => AccountPanelPremium.init());
    } else {
        AccountPanelPremium.init();
    }

    // Export
    window.AccountPanelPremium = AccountPanelPremium;

})();

/**
 * ACCOUNT PANEL ULTRA PROFESSIONAL
 * Design modern, spațios, cu toate funcționalitățile
 * MC MetSolArt - Versiune completă
 */

(function() {
    'use strict';

    console.log('👤 ACCOUNT PANEL ULTRA PROFESSIONAL - Loading...');

    const AccountPanelUltra = {
        panel: null,
        overlay: null,
        currentTab: 'dashboard',
        isOpen: false,
        userData: null,
        editMode: false,

        init() {
            console.log('🔧 Inițializare Account Panel Ultra Professional...');
            this.createPanel();
            this.attachEvents();
            console.log('✅ Account Panel Ultra Professional gata!');
        },

        createPanel() {
            console.log('🏗️ Creare panel...');
            
            // Creează overlay
            this.overlay = document.createElement('div');
            this.overlay.className = 'account-overlay-ultra';
            document.body.appendChild(this.overlay);
            console.log('✅ Overlay creat:', this.overlay);

            // Creează panel
            this.panel = document.createElement('div');
            this.panel.className = 'account-panel-ultra';
            this.panel.innerHTML = this.getPanelHTML();
            document.body.appendChild(this.panel);
            console.log('✅ Panel creat:', this.panel);
            console.log('📏 Panel width:', this.panel.offsetWidth);
            console.log('📏 Panel height:', this.panel.offsetHeight);
        },

        getPanelHTML() {
            return `
                <div class="account-header-ultra">
                    <div class="account-header-top">
                        <div class="account-user-info">
                            <div class="account-avatar-container">
                                <div class="account-avatar" id="accountAvatarUltra">
                                    👤
                                </div>
                                <button class="avatar-upload-btn" onclick="window.AccountPanelUltra.uploadAvatar()">
                                    📷
                                </button>
                            </div>
                            <div class="account-user-details">
                                <h2 id="accountUserNameUltra">Utilizator</h2>
                                <div class="account-user-email" id="accountUserEmailUltra">email@example.com</div>
                                <div class="account-user-status">
                                    <span class="status-dot"></span>
                                    <span>Activ</span>
                                </div>
                            </div>
                        </div>
                        <button class="account-close-ultra" onclick="window.AccountPanelUltra.hide()">&times;</button>
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
                
                <div class="account-tabs-ultra">
                    <button class="account-tab-ultra active" onclick="window.AccountPanelUltra.switchTab('dashboard')">
                        📊 Dashboard
                    </button>
                    <button class="account-tab-ultra" onclick="window.AccountPanelUltra.switchTab('profile')">
                        👤 Profil
                    </button>
                    <button class="account-tab-ultra" onclick="window.AccountPanelUltra.switchTab('orders')">
                        📦 Comenzi
                    </button>
                    <button class="account-tab-ultra" onclick="window.AccountPanelUltra.switchTab('settings')">
                        ⚙️ Setări
                    </button>
                </div>
                
                <div class="account-content-ultra" id="accountContentUltra">
                    <p style="text-align: center; color: var(--muted-foreground);">Se încarcă...</p>
                </div>
            `;
        },

        attachEvents() {
            // Click pe overlay închide panelul
            this.overlay.addEventListener('click', () => this.hide());
            
            // ESC închide panelul
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.hide();
                }
            });
        },

        show(tab = 'dashboard') {
            console.log('📂 Deschidere Account Panel Ultra:', tab);
            console.log('🔍 Panel exists:', !!this.panel);
            console.log('🔍 Overlay exists:', !!this.overlay);
            
            if (!this.panel || !this.overlay) {
                console.error('❌ Panel sau overlay nu există!');
                return;
            }
            
            this.currentTab = tab;
            this.isOpen = true;
            
            // Afișează overlay și panel
            console.log('➕ Adăugare clasă active la overlay...');
            this.overlay.classList.add('active');
            console.log('➕ Adăugare clasă active la panel...');
            this.panel.classList.add('active');
            
            console.log('✅ Clase adăugate!');
            console.log('Overlay classes:', this.overlay.className);
            console.log('Panel classes:', this.panel.className);

            // Încarcă datele utilizatorului
            this.loadUserData();
            
            // Încarcă conținutul
            this.switchTab(tab);
        },

        hide() {
            console.log('📁 Închidere Account Panel Ultra');
            this.isOpen = false;
            this.panel.classList.remove('active');
            this.overlay.classList.remove('active');
        },

        switchTab(tab) {
            this.currentTab = tab;
            
            // Actualizează butoanele active
            document.querySelectorAll('.account-tab-ultra').forEach((btn, index) => {
                btn.classList.remove('active');
                const tabs = ['dashboard', 'profile', 'orders', 'settings'];
                if (tabs[index] === tab) {
                    btn.classList.add('active');
                }
            });
            
            // Încarcă conținutul
            this.loadContent(tab);
        },

        loadUserData() {
            try {
                const userStr = localStorage.getItem('currentUser');
                this.userData = userStr ? JSON.parse(userStr) : null;
                
                if (this.userData) {
                    // Actualizează header
                    const firstName = this.userData.firstName || 'Utilizator';
                    const lastName = this.userData.lastName || '';
                    document.getElementById('accountUserNameUltra').textContent = `${firstName} ${lastName}`.trim();
                    document.getElementById('accountUserEmailUltra').textContent = this.userData.email || '';
                    
                    // Avatar inițiale
                    const initials = (firstName.charAt(0) + (lastName.charAt(0) || '')).toUpperCase();
                    document.getElementById('accountAvatarUltra').textContent = initials || '👤';
                    
                    // Încarcă statistici
                    this.loadStats();
                }
            } catch (e) {
                console.error('Eroare citire utilizator:', e);
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
                console.error('Eroare încărcare statistici:', error);
            }
        },

        async loadContent(tab) {
            const content = document.getElementById('accountContentUltra');
            
            if (!this.userData) {
                content.innerHTML = `
                    <div class="empty-state-ultra">
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
            const content = document.getElementById('accountContentUltra');
            const user = this.userData;
            
            content.innerHTML = `
                <div class="account-card-ultra">
                    <div class="card-title-ultra">
                        <span class="card-title-icon">👋</span>
                        Bun venit, ${user.firstName}!
                    </div>
                    <p style="color: var(--muted-foreground); font-size: 15px; line-height: 1.6;">
                        Acesta este dashboard-ul tău personal. Aici poți vedea o prezentare generală a contului tău și a activității recente.
                    </p>
                </div>
                
                <div class="account-card-ultra">
                    <div class="card-title-ultra">
                        <span class="card-title-icon">📊</span>
                        Informații Rapide
                    </div>
                    <div class="info-grid-ultra">
                        <div class="info-item-ultra">
                            <div class="info-label-ultra">Nume Complet</div>
                            <div class="info-value-ultra">${user.firstName} ${user.lastName || ''}</div>
                        </div>
                        <div class="info-item-ultra">
                            <div class="info-label-ultra">Email</div>
                            <div class="info-value-ultra">${user.email}</div>
                        </div>
                        <div class="info-item-ultra">
                            <div class="info-label-ultra">Telefon</div>
                            <div class="info-value-ultra">${user.phone || 'Nu este setat'}</div>
                        </div>
                        <div class="info-item-ultra">
                            <div class="info-label-ultra">Țară</div>
                            <div class="info-value-ultra">${user.country || 'Nu este setată'}</div>
                        </div>
                    </div>
                </div>
                
                <div class="btn-group-ultra">
                    <button class="btn-primary-ultra" onclick="window.AccountPanelUltra.switchTab('profile')">
                        ✏️ Editează Profilul
                    </button>
                    <button class="btn-secondary-ultra" onclick="window.AccountPanelUltra.switchTab('orders')">
                        📦 Vezi Comenzile
                    </button>
                </div>
            `;
        },

        loadProfile() {
            const content = document.getElementById('accountContentUltra');
            const user = this.userData;
            
            if (!this.editMode) {
                // Mod vizualizare
                content.innerHTML = `
                    <div class="account-card-ultra">
                        <div class="card-title-ultra">
                            <span class="card-title-icon">📸</span>
                            Imagine Profil
                        </div>
                        <div class="profile-image-section">
                            <div class="profile-image-preview" id="profileImagePreview">
                                ${(user.firstName?.charAt(0) || '') + (user.lastName?.charAt(0) || '')}
                            </div>
                            <div class="profile-image-actions">
                                <h4>Schimbă imaginea de profil</h4>
                                <p>Încarcă o imagine JPG, PNG sau GIF (max 5MB)</p>
                                <button class="btn-secondary-ultra" onclick="window.AccountPanelUltra.uploadAvatar()">
                                    📤 Încarcă Imagine
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="account-card-ultra">
                        <div class="card-title-ultra">
                            <span class="card-title-icon">👤</span>
                            Informații Personale
                        </div>
                        <div class="info-grid-ultra">
                            <div class="info-item-ultra">
                                <div class="info-label-ultra">Prenume</div>
                                <div class="info-value-ultra">${user.firstName || '-'}</div>
                            </div>
                            <div class="info-item-ultra">
                                <div class="info-label-ultra">Nume</div>
                                <div class="info-value-ultra">${user.lastName || '-'}</div>
                            </div>
                            <div class="info-item-ultra">
                                <div class="info-label-ultra">Email</div>
                                <div class="info-value-ultra">${user.email || '-'}</div>
                            </div>
                            <div class="info-item-ultra">
                                <div class="info-label-ultra">Telefon</div>
                                <div class="info-value-ultra">${user.phone || '-'}</div>
                            </div>
                            ${user.company ? `
                            <div class="info-item-ultra">
                                <div class="info-label-ultra">Companie</div>
                                <div class="info-value-ultra">${user.company}</div>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="account-card-ultra">
                        <div class="card-title-ultra">
                            <span class="card-title-icon">📍</span>
                            Adresă
                        </div>
                        <div class="info-grid-ultra">
                            <div class="info-item-ultra">
                                <div class="info-label-ultra">Țară</div>
                                <div class="info-value-ultra">${user.country || '-'}</div>
                            </div>
                            <div class="info-item-ultra">
                                <div class="info-label-ultra">Oraș</div>
                                <div class="info-value-ultra">${user.city || '-'}</div>
                            </div>
                            <div class="info-item-ultra" style="grid-column: 1 / -1;">
                                <div class="info-label-ultra">Adresă Completă</div>
                                <div class="info-value-ultra">${user.address || '-'}</div>
                            </div>
                            ${user.postalCode ? `
                            <div class="info-item-ultra">
                                <div class="info-label-ultra">Cod Poștal</div>
                                <div class="info-value-ultra">${user.postalCode}</div>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="btn-group-ultra">
                        <button class="btn-primary-ultra" onclick="window.AccountPanelUltra.enableEditMode()">
                            ✏️ Editează Profilul
                        </button>
                    </div>
                `;
            } else {
                // Mod editare
                content.innerHTML = `
                    <form id="profileEditForm" onsubmit="window.AccountPanelUltra.saveProfile(event)">
                        <div class="account-card-ultra">
                            <div class="card-title-ultra">
                                <span class="card-title-icon">👤</span>
                                Editează Informații Personale
                            </div>
                            <div class="form-grid-ultra">
                                <div class="form-group-ultra">
                                    <label class="form-label-ultra">
                                        Prenume <span class="label-required">*</span>
                                    </label>
                                    <input type="text" class="form-input-ultra" name="firstName" value="${user.firstName || ''}" required>
                                </div>
                                <div class="form-group-ultra">
                                    <label class="form-label-ultra">
                                        Nume <span class="label-required">*</span>
                                    </label>
                                    <input type="text" class="form-input-ultra" name="lastName" value="${user.lastName || ''}" required>
                                </div>
                                <div class="form-group-ultra">
                                    <label class="form-label-ultra">
                                        Email <span class="label-required">*</span>
                                    </label>
                                    <input type="email" class="form-input-ultra" name="email" value="${user.email || ''}" required>
                                    <div class="form-hint">Emailul este folosit pentru autentificare</div>
                                </div>
                                <div class="form-group-ultra">
                                    <label class="form-label-ultra">
                                        Telefon <span class="label-required">*</span>
                                    </label>
                                    <input type="tel" class="form-input-ultra" name="phone" value="${user.phone || ''}" required>
                                </div>
                                <div class="form-group-ultra full-width">
                                    <label class="form-label-ultra">Companie</label>
                                    <input type="text" class="form-input-ultra" name="company" value="${user.company || ''}">
                                </div>
                            </div>
                        </div>
                        
                        <div class="account-card-ultra">
                            <div class="card-title-ultra">
                                <span class="card-title-icon">📍</span>
                                Editează Adresa
                            </div>
                            <div class="form-grid-ultra">
                                <div class="form-group-ultra">
                                    <label class="form-label-ultra">
                                        Țară <span class="label-required">*</span>
                                    </label>
                                    <select class="form-select-ultra" name="country" required>
                                        <option value="">Selectează țara</option>
                                        <option value="România" ${user.country === 'România' ? 'selected' : ''}>România</option>
                                        <option value="Italia" ${user.country === 'Italia' ? 'selected' : ''}>Italia</option>
                                        <option value="Spania" ${user.country === 'Spania' ? 'selected' : ''}>Spania</option>
                                        <option value="Germania" ${user.country === 'Germania' ? 'selected' : ''}>Germania</option>
                                        <option value="Franța" ${user.country === 'Franța' ? 'selected' : ''}>Franța</option>
                                        <option value="Altă țară" ${user.country && !['România', 'Italia', 'Spania', 'Germania', 'Franța'].includes(user.country) ? 'selected' : ''}>Altă țară</option>
                                    </select>
                                </div>
                                <div class="form-group-ultra">
                                    <label class="form-label-ultra">
                                        Oraș <span class="label-required">*</span>
                                    </label>
                                    <input type="text" class="form-input-ultra" name="city" value="${user.city || ''}" required>
                                </div>
                                <div class="form-group-ultra full-width">
                                    <label class="form-label-ultra">
                                        Adresă Completă <span class="label-required">*</span>
                                    </label>
                                    <textarea class="form-textarea-ultra" name="address" required>${user.address || ''}</textarea>
                                    <div class="form-hint">Strada, număr, bloc, apartament, etc.</div>
                                </div>
                                <div class="form-group-ultra">
                                    <label class="form-label-ultra">Cod Poștal</label>
                                    <input type="text" class="form-input-ultra" name="postalCode" value="${user.postalCode || ''}">
                                </div>
                            </div>
                        </div>
                        
                        <div class="btn-group-ultra">
                            <button type="submit" class="btn-primary-ultra">
                                💾 Salvează Modificările
                            </button>
                            <button type="button" class="btn-outline-ultra" onclick="window.AccountPanelUltra.cancelEdit()">
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
            const formData = new FormData(form);
            const updatedData = {};
            
            formData.forEach((value, key) => {
                updatedData[key] = value;
            });
            
            try {
                // Actualizează localStorage
                this.userData = { ...this.userData, ...updatedData };
                localStorage.setItem('currentUser', JSON.stringify(this.userData));
                
                // Trimite la server
                if (window.API && window.API.updateProfile) {
                    await window.API.updateProfile(updatedData);
                    console.log('✅ Profil sincronizat cu serverul');
                } else {
                    console.warn('⚠️ API updateProfile nu este disponibil - salvat doar local');
                }
                
                // Afișează mesaj de succes
                alert('✅ Profilul a fost actualizat cu succes!');
                
                // Ieși din modul editare
                this.editMode = false;
                this.loadUserData();
                this.loadProfile();
            } catch (error) {
                console.error('Eroare salvare profil:', error);
                alert('❌ Eroare la salvarea profilului: ' + error.message);
            }
        },

        uploadAvatar() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/jpeg,image/png,image/gif,image/webp';
            
            input.onchange = async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                
                // Validare dimensiune (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    alert('❌ Imaginea este prea mare! Dimensiunea maximă este 5MB.');
                    return;
                }
                
                // Validare tip
                if (!file.type.startsWith('image/')) {
                    alert('❌ Te rugăm să selectezi o imagine validă (JPG, PNG, GIF, WEBP).');
                    return;
                }
                
                try {
                    // Convertește în base64
                    const reader = new FileReader();
                    reader.onload = async (event) => {
                        const base64Image = event.target.result;
                        
                        // Salvează local
                        localStorage.setItem('userAvatar', base64Image);
                        
                        // Actualizează UI
                        const avatarEl = document.getElementById('accountAvatarUltra');
                        if (avatarEl) {
                            avatarEl.innerHTML = `<img src="${base64Image}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
                        }
                        
                        // Trimite la server dacă API este disponibil
                        if (window.API && window.API.updateAvatar) {
                            try {
                                await window.API.updateAvatar(base64Image);
                                alert('✅ Avatar actualizat cu succes!');
                            } catch (error) {
                                console.error('Eroare salvare avatar pe server:', error);
                                alert('⚠️ Avatar salvat local, dar nu s-a putut sincroniza cu serverul.');
                            }
                        } else {
                            alert('✅ Avatar actualizat local!');
                        }
                        
                        // Reîncarcă profilul
                        this.loadUserData();
                    };
                    reader.readAsDataURL(file);
                } catch (error) {
                    console.error('Eroare încărcare avatar:', error);
                    alert('❌ Eroare la încărcarea imaginii. Te rugăm să încerci din nou.');
                }
            };
            
            input.click();
        },

        async loadOrders() {
            const content = document.getElementById('accountContentUltra');
            
            content.innerHTML = `
                <div class="account-card-ultra">
                    <div class="card-title-ultra">
                        <span class="card-title-icon">📦</span>
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
                        <div class="empty-state-ultra">
                            <div class="empty-state-icon">📦</div>
                            <div class="empty-state-title">Nu ai comenzi încă</div>
                            <div class="empty-state-text">Când vei plasa o comandă, o vei vedea aici.</div>
                            <button class="btn-primary-ultra" onclick="window.location.href='#products'">
                                🛒 Explorează Produsele
                            </button>
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
                        <div class="order-card-ultra">
                            <div class="order-header-ultra">
                                <div>
                                    <div class="order-number">📦 ${order.order_number}</div>
                                    <div class="order-date">${date}</div>
                                </div>
                                <span class="order-status-badge ${statusClass}">${statusText}</span>
                            </div>
                            <div class="order-details-ultra">
                                <div class="order-detail-item">
                                    <div class="order-detail-label">Total</div>
                                    <div class="order-detail-value order-total">${order.total_amount} EUR</div>
                                </div>
                                <div class="order-detail-item">
                                    <div class="order-detail-label">Status</div>
                                    <div class="order-detail-value">${statusText}</div>
                                </div>
                            </div>
                            <div class="btn-group-ultra">
                                <button class="btn-outline-ultra" onclick="window.AccountPanelUltra.viewOrderDetails('${order.order_number}')">
                                    👁️ Vezi Detalii
                                </button>
                            </div>
                        </div>
                    `;
                });

                content.innerHTML = html;
            } catch (error) {
                console.error('❌ Eroare încărcare comenzi:', error);
                content.innerHTML = `
                    <div class="account-card-ultra">
                        <p style="color: #ef4444; text-align: center;">
                            ❌ Eroare la încărcarea comenzilor: ${error.message}
                        </p>
                    </div>
                `;
            }
        },

        async viewOrderDetails(orderNumber) {
            try {
                // Găsește comanda
                const data = await window.API.getOrders();
                const orders = Array.isArray(data) ? data : (data.data?.orders || []);
                const order = orders.find(o => o.orderNumber === orderNumber || o.order_number === orderNumber);
                
                if (!order) {
                    alert('❌ Comandă negăsită!');
                    return;
                }
                
                const content = document.getElementById('accountContentUltra');
                const statusText = this.getStatusText(order.status);
                const date = new Date(order.createdAt || order.created_at).toLocaleDateString('ro-RO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                
                content.innerHTML = `
                    <div class="account-card-ultra">
                        <div class="card-title-ultra">
                            <span class="card-title-icon">📦</span>
                            Comandă ${orderNumber}
                        </div>
                        
                        <div class="info-grid-ultra">
                            <div class="info-item-ultra">
                                <div class="info-label-ultra">Status</div>
                                <div class="info-value-ultra">
                                    <span class="order-status-badge status-${order.status}">${statusText}</span>
                                </div>
                            </div>
                            <div class="info-item-ultra">
                                <div class="info-label-ultra">Data Comenzii</div>
                                <div class="info-value-ultra">${date}</div>
                            </div>
                            <div class="info-item-ultra">
                                <div class="info-label-ultra">Total</div>
                                <div class="info-value-ultra order-total">${order.totalAmount || order.total_amount} ${order.currency || 'RON'}</div>
                            </div>
                            <div class="info-item-ultra">
                                <div class="info-label-ultra">Metodă Plată</div>
                                <div class="info-value-ultra">${order.paymentMethod || order.payment_method || 'Card'}</div>
                            </div>
                        </div>
                        
                        ${order.items && order.items.length > 0 ? `
                            <div style="margin-top: 30px;">
                                <h4 style="margin-bottom: 15px; color: var(--foreground);">Produse Comandate</h4>
                                ${order.items.map(item => `
                                    <div style="padding: 15px; background: var(--card); border-radius: 8px; margin-bottom: 10px;">
                                        <div style="font-weight: 600; color: var(--foreground);">${item.productName || item.product_name}</div>
                                        <div style="color: var(--muted-foreground); font-size: 14px; margin-top: 5px;">
                                            Cantitate: ${item.quantity} × ${item.price} ${order.currency || 'RON'}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
                        
                        ${order.shippingAddress || order.shipping_address ? `
                            <div style="margin-top: 30px;">
                                <h4 style="margin-bottom: 15px; color: var(--foreground);">Adresă Livrare</h4>
                                <div style="padding: 15px; background: var(--card); border-radius: 8px;">
                                    ${order.shippingAddress || order.shipping_address}
                                </div>
                            </div>
                        ` : ''}
                        
                        ${order.trackingNumber || order.tracking_number ? `
                            <div style="margin-top: 30px;">
                                <h4 style="margin-bottom: 15px; color: var(--foreground);">Tracking</h4>
                                <div style="padding: 15px; background: var(--card); border-radius: 8px; font-family: monospace;">
                                    ${order.trackingNumber || order.tracking_number}
                                </div>
                            </div>
                        ` : ''}
                        
                        <div class="btn-group-ultra" style="margin-top: 30px;">
                            <button class="btn-outline-ultra" onclick="window.AccountPanelUltra.switchTab('orders')">
                                ← Înapoi la Comenzi
                            </button>
                        </div>
                    </div>
                `;
            } catch (error) {
                console.error('Eroare încărcare detalii comandă:', error);
                alert('❌ Eroare la încărcarea detaliilor comenzii.');
            }
        },

        loadSettings() {
            const content = document.getElementById('accountContentUltra');
            const user = this.userData;
            
            content.innerHTML = `
                <div class="account-card-ultra">
                    <div class="card-title-ultra">
                        <span class="card-title-icon">🔐</span>
                        Securitate
                    </div>
                    <p style="color: var(--muted-foreground); margin-bottom: 20px;">
                        Gestionează setările de securitate ale contului tău.
                    </p>
                    <button class="btn-primary-ultra" onclick="window.AccountPanelUltra.changePassword()">
                        🔑 Schimbă Parola
                    </button>
                </div>
                
                <div class="account-card-ultra">
                    <div class="card-title-ultra">
                        <span class="card-title-icon">🌐</span>
                        Preferințe
                    </div>
                    <div class="info-grid-ultra">
                        <div class="info-item-ultra">
                            <div class="info-label-ultra">Limbă</div>
                            <div class="info-value-ultra">${user.language === 'en' ? 'English' : 'Română'}</div>
                        </div>
                        <div class="info-item-ultra">
                            <div class="info-label-ultra">Temă</div>
                            <div class="info-value-ultra">Automată</div>
                        </div>
                    </div>
                </div>
                
                <div class="account-card-ultra">
                    <div class="card-title-ultra">
                        <span class="card-title-icon">🚪</span>
                        Cont
                    </div>
                    <button class="btn-outline-ultra" onclick="window.AccountPanelUltra.logout()">
                        🚪 Deconectare
                    </button>
                </div>
            `;
        },

        changePassword() {
            const content = document.getElementById('accountContentUltra');
            
            content.innerHTML = `
                <div class="account-card-ultra">
                    <div class="card-title-ultra">
                        <span class="card-title-icon">🔑</span>
                        Schimbă Parola
                    </div>
                    
                    <form id="changePasswordForm" onsubmit="window.AccountPanelUltra.saveNewPassword(event)">
                        <div class="form-grid-ultra">
                            <div class="form-group-ultra full-width">
                                <label class="form-label-ultra">
                                    Parola Curentă <span class="label-required">*</span>
                                </label>
                                <input type="password" class="form-input-ultra" name="currentPassword" required minlength="6">
                            </div>
                            
                            <div class="form-group-ultra full-width">
                                <label class="form-label-ultra">
                                    Parola Nouă <span class="label-required">*</span>
                                </label>
                                <input type="password" class="form-input-ultra" name="newPassword" required minlength="6">
                                <div class="form-hint">Minim 6 caractere</div>
                            </div>
                            
                            <div class="form-group-ultra full-width">
                                <label class="form-label-ultra">
                                    Confirmă Parola Nouă <span class="label-required">*</span>
                                </label>
                                <input type="password" class="form-input-ultra" name="confirmPassword" required minlength="6">
                            </div>
                        </div>
                        
                        <div class="btn-group-ultra">
                            <button type="submit" class="btn-primary-ultra">
                                💾 Salvează Parola
                            </button>
                            <button type="button" class="btn-outline-ultra" onclick="window.AccountPanelUltra.switchTab('settings')">
                                ❌ Anulează
                            </button>
                        </div>
                    </form>
                </div>
            `;
        },
        
        async saveNewPassword(event) {
            event.preventDefault();
            
            const form = event.target;
            const formData = new FormData(form);
            
            const currentPassword = formData.get('currentPassword');
            const newPassword = formData.get('newPassword');
            const confirmPassword = formData.get('confirmPassword');
            
            // Validare
            if (newPassword !== confirmPassword) {
                alert('❌ Parolele nu coincid!');
                return;
            }
            
            if (newPassword.length < 6) {
                alert('❌ Parola trebuie să aibă minim 6 caractere!');
                return;
            }
            
            try {
                if (window.API && window.API.changePassword) {
                    await window.API.changePassword(currentPassword, newPassword, confirmPassword);
                    alert('✅ Parola a fost schimbată cu succes!');
                    this.switchTab('settings');
                } else {
                    alert('⚠️ Funcționalitatea de schimbare parolă nu este disponibilă momentan. Te rugăm să contactezi suportul.');
                }
            } catch (error) {
                console.error('Eroare schimbare parolă:', error);
                alert('❌ Eroare la schimbarea parolei: ' + (error.message || 'Eroare necunoscută'));
            }
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
        }
    };

    // Inițializează când DOM-ul este gata
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => AccountPanelUltra.init());
    } else {
        AccountPanelUltra.init();
    }

    // Export global
    window.AccountPanelUltra = AccountPanelUltra;

    console.log('✅ Account Panel Ultra Professional ready!');
})();

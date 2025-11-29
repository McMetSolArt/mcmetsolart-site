/**
 * ACCOUNT PANEL PROFESSIONAL - Versiune completă cu glassmorphism
 * MC MetSolArt - Design profesional
 */

(function() {
    'use strict';

    console.log('👤 ACCOUNT PANEL PROFESSIONAL - Loading...');

    const AccountPanel = {
        panel: null,
        overlay: null,
        currentTab: 'dashboard',
        isOpen: false,

        init() {
            console.log('🔧 Inițializare Account Panel Professional...');
            this.createPanel();
            this.attachEvents();
            console.log('✅ Account Panel Professional gata!');
        },

        createPanel() {
            // Creează overlay cu blur
            this.overlay = document.createElement('div');
            this.overlay.className = 'account-overlay-pro';
            this.overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.6);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                z-index: 9998;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            `;
            document.body.appendChild(this.overlay);

            // Creează panel cu glassmorphism
            this.panel = document.createElement('div');
            this.panel.className = 'account-panel-pro';
            this.panel.style.cssText = `
                position: fixed;
                top: 0;
                right: -100%;
                width: 90%;
                max-width: 600px;
                height: 100%;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border-left: 1px solid rgba(255, 255, 255, 0.3);
                box-shadow: -10px 0 40px rgba(0, 0, 0, 0.2);
                z-index: 9999;
                transition: right 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                overflow-y: auto;
                overflow-x: hidden;
            `;
            
            this.panel.innerHTML = `
                <style>
                    .account-panel-pro::-webkit-scrollbar {
                        width: 8px;
                    }
                    .account-panel-pro::-webkit-scrollbar-track {
                        background: rgba(0, 0, 0, 0.05);
                    }
                    .account-panel-pro::-webkit-scrollbar-thumb {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        border-radius: 4px;
                    }
                    .account-header-pro {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        padding: 30px 25px;
                        color: white;
                        position: sticky;
                        top: 0;
                        z-index: 10;
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    }
                    .account-close-btn {
                        background: rgba(255, 255, 255, 0.2);
                        border: none;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        font-size: 24px;
                        color: white;
                        cursor: pointer;
                        transition: all 0.3s;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .account-close-btn:hover {
                        background: rgba(255, 255, 255, 0.3);
                        transform: rotate(90deg);
                    }
                    .account-tabs-pro {
                        display: flex;
                        gap: 10px;
                        padding: 20px 25px;
                        background: rgba(255, 255, 255, 0.5);
                        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                        overflow-x: auto;
                    }
                    .account-tab-btn {
                        padding: 12px 20px;
                        background: rgba(255, 255, 255, 0.8);
                        border: 2px solid transparent;
                        border-radius: 12px;
                        cursor: pointer;
                        transition: all 0.3s;
                        font-weight: 600;
                        color: #666;
                        white-space: nowrap;
                    }
                    .account-tab-btn:hover {
                        background: rgba(102, 126, 234, 0.1);
                        border-color: #667eea;
                    }
                    .account-tab-btn.active {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        border-color: transparent;
                        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                    }
                    .account-content-pro {
                        padding: 25px;
                    }
                    .account-card-pro {
                        background: rgba(255, 255, 255, 0.9);
                        backdrop-filter: blur(10px);
                        border-radius: 16px;
                        padding: 20px;
                        margin-bottom: 20px;
                        border: 1px solid rgba(0, 0, 0, 0.05);
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
                        transition: all 0.3s;
                    }
                    .account-card-pro:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
                    }
                    .account-card-title {
                        font-size: 18px;
                        font-weight: 700;
                        color: #333;
                        margin-bottom: 15px;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }
                    .account-info-row {
                        display: flex;
                        justify-content: space-between;
                        padding: 12px 0;
                        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                    }
                    .account-info-row:last-child {
                        border-bottom: none;
                    }
                    .account-info-label {
                        color: #666;
                        font-weight: 500;
                    }
                    .account-info-value {
                        color: #333;
                        font-weight: 600;
                    }
                    .account-btn-pro {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 12px;
                        cursor: pointer;
                        font-weight: 600;
                        transition: all 0.3s;
                        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
                    }
                    .account-btn-pro:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
                    }
                    .order-card-pro {
                        background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
                        border-radius: 16px;
                        padding: 20px;
                        margin-bottom: 15px;
                        border: 1px solid rgba(102, 126, 234, 0.2);
                        transition: all 0.3s;
                    }
                    .order-card-pro:hover {
                        transform: translateX(5px);
                        box-shadow: 0 8px 30px rgba(102, 126, 234, 0.2);
                    }
                    .order-status {
                        display: inline-block;
                        padding: 6px 16px;
                        border-radius: 20px;
                        font-size: 12px;
                        font-weight: 600;
                        text-transform: uppercase;
                    }
                    .status-in_asteptare {
                        background: rgba(255, 193, 7, 0.2);
                        color: #f57c00;
                    }
                    .status-confirmat {
                        background: rgba(33, 150, 243, 0.2);
                        color: #1976d2;
                    }
                    .status-in_procesare {
                        background: rgba(156, 39, 176, 0.2);
                        color: #7b1fa2;
                    }
                    .status-expediat {
                        background: rgba(76, 175, 80, 0.2);
                        color: #388e3c;
                    }
                    .status-livrat {
                        background: rgba(76, 175, 80, 0.3);
                        color: #2e7d32;
                    }
                    .empty-state-pro {
                        text-align: center;
                        padding: 60px 20px;
                        color: #999;
                    }
                    .empty-state-pro i {
                        font-size: 64px;
                        margin-bottom: 20px;
                        opacity: 0.3;
                    }
                    @media (max-width: 768px) {
                        .account-panel-pro {
                            max-width: 100%;
                            width: 100%;
                        }
                    }
                </style>
                
                <div class="account-header-pro">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h2 style="margin: 0 0 5px 0; font-size: 24px;">Contul Meu</h2>
                            <p style="margin: 0; opacity: 0.9; font-size: 14px;" id="accountUserName">Bun venit!</p>
                        </div>
                        <button class="account-close-btn" onclick="window.AccountPanel.hide()">&times;</button>
                    </div>
                </div>
                
                <div class="account-tabs-pro">
                    <button class="account-tab-btn active" onclick="window.AccountPanel.switchTab('dashboard')">
                        📊 Dashboard
                    </button>
                    <button class="account-tab-btn" onclick="window.AccountPanel.switchTab('profile')">
                        👤 Profil
                    </button>
                    <button class="account-tab-btn" onclick="window.AccountPanel.switchTab('orders')">
                        📦 Comenzi
                    </button>
                    <button class="account-tab-btn" onclick="window.AccountPanel.switchTab('settings')">
                        ⚙️ Setări
                    </button>
                </div>
                
                <div class="account-content-pro" id="accountContentPro">
                    <p style="text-align: center; color: #999;">Se încarcă...</p>
                </div>
            `;
            
            document.body.appendChild(this.panel);
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
            console.log('📂 Deschidere Account Panel Professional:', tab);
            this.currentTab = tab;
            this.isOpen = true;
            
            // Afișează overlay și panel
            this.overlay.style.opacity = '1';
            this.overlay.style.visibility = 'visible';
            
            setTimeout(() => {
                this.panel.style.right = '0';
            }, 10);

            // Actualizează numele utilizatorului
            const user = this.getCurrentUser();
            if (user) {
                document.getElementById('accountUserName').textContent = 
                    `Bun venit, ${user.firstName || 'Utilizator'}!`;
            }

            // Încarcă conținutul
            this.switchTab(tab);
        },

        hide() {
            console.log('📁 Închidere Account Panel Professional');
            this.isOpen = false;
            this.panel.style.right = '-100%';
            
            setTimeout(() => {
                this.overlay.style.opacity = '0';
                this.overlay.style.visibility = 'hidden';
            }, 400);
        },

        switchTab(tab) {
            this.currentTab = tab;
            
            // Actualizează butoanele active
            document.querySelectorAll('.account-tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event?.target?.classList.add('active');
            
            // Încarcă conținutul
            this.loadContent(tab);
        },

        getCurrentUser() {
            try {
                const userStr = localStorage.getItem('currentUser');
                return userStr ? JSON.parse(userStr) : null;
            } catch (e) {
                console.error('Eroare citire utilizator:', e);
                return null;
            }
        },

        async loadContent(tab) {
            const content = document.getElementById('accountContentPro');
            
            try {
                const user = this.getCurrentUser();
                
                if (!user || !user.email) {
                    content.innerHTML = `
                        <div class="empty-state-pro">
                            <i class="fas fa-user-slash"></i>
                            <h3>Nu ești autentificat</h3>
                            <p>Te rugăm să te loghezi pentru a accesa contul tău.</p>
                        </div>
                    `;
                    return;
                }

                switch(tab) {
                    case 'dashboard':
                        await this.loadDashboard(user);
                        break;
                    case 'profile':
                        this.loadProfile(user);
                        break;
                    case 'orders':
                        await this.loadOrders();
                        break;
                    case 'settings':
                        this.loadSettings(user);
                        break;
                }
            } catch (error) {
                console.error('❌ Eroare încărcare conținut:', error);
                content.innerHTML = `
                    <div class="account-card-pro">
                        <p style="color: red;">❌ Eroare: ${error.message}</p>
                    </div>
                `;
            }
        },

        async loadDashboard(user) {
            const content = document.getElementById('accountContentPro');
            
            content.innerHTML = `
                <div class="account-card-pro">
                    <div class="account-card-title">
                        👋 Bun venit, ${user.firstName}!
                    </div>
                    <p style="color: #666;">Acesta este dashboard-ul tău personal.</p>
                </div>
                
                <div class="account-card-pro">
                    <div class="account-card-title">
                        📊 Statistici Rapide
                    </div>
                    <div class="account-info-row">
                        <span class="account-info-label">📧 Email</span>
                        <span class="account-info-value">${user.email}</span>
                    </div>
                    <div class="account-info-row">
                        <span class="account-info-label">📱 Telefon</span>
                        <span class="account-info-value">${user.phone || 'Nu este setat'}</span>
                    </div>
                    <div class="account-info-row">
                        <span class="account-info-label">📦 Comenzi</span>
                        <span class="account-info-value" id="dashboardOrderCount">Se încarcă...</span>
                    </div>
                </div>
                
                <button class="account-btn-pro" onclick="window.AccountPanel.switchTab('orders')" style="width: 100%;">
                    📦 Vezi Toate Comenzile
                </button>
            `;
            
            // Încarcă numărul de comenzi
            try {
                if (window.API) {
                    const data = await window.API.getOrders();
                    const orders = data.data || [];
                    document.getElementById('dashboardOrderCount').textContent = orders.length;
                }
            } catch (error) {
                document.getElementById('dashboardOrderCount').textContent = '0';
            }
        },

        loadProfile(user) {
            const content = document.getElementById('accountContentPro');
            
            content.innerHTML = `
                <div class="account-card-pro">
                    <div class="account-card-title">
                        👤 Informații Personale
                    </div>
                    <div class="account-info-row">
                        <span class="account-info-label">Nume</span>
                        <span class="account-info-value">${user.firstName} ${user.lastName}</span>
                    </div>
                    <div class="account-info-row">
                        <span class="account-info-label">Email</span>
                        <span class="account-info-value">${user.email}</span>
                    </div>
                    <div class="account-info-row">
                        <span class="account-info-label">Telefon</span>
                        <span class="account-info-value">${user.phone || 'Nu este setat'}</span>
                    </div>
                    ${user.company ? `
                    <div class="account-info-row">
                        <span class="account-info-label">Companie</span>
                        <span class="account-info-value">${user.company}</span>
                    </div>
                    ` : ''}
                </div>
                
                ${user.address ? `
                <div class="account-card-pro">
                    <div class="account-card-title">
                        📍 Adresă
                    </div>
                    <div class="account-info-row">
                        <span class="account-info-label">Adresă</span>
                        <span class="account-info-value">${user.address}</span>
                    </div>
                    ${user.city ? `
                    <div class="account-info-row">
                        <span class="account-info-label">Oraș</span>
                        <span class="account-info-value">${user.city}</span>
                    </div>
                    ` : ''}
                    ${user.county ? `
                    <div class="account-info-row">
                        <span class="account-info-label">Județ</span>
                        <span class="account-info-value">${user.county}</span>
                    </div>
                    ` : ''}
                </div>
                ` : ''}
                
                <button class="account-btn-pro" style="width: 100%;">
                    ✏️ Editează Profilul
                </button>
            `;
        },

        async loadOrders() {
            const content = document.getElementById('accountContentPro');
            
            content.innerHTML = `
                <div class="account-card-pro">
                    <div class="account-card-title">
                        📦 Comenzile Mele
                    </div>
                    <p style="text-align: center; color: #999;">Se încarcă comenzile...</p>
                </div>
            `;
            
            try {
                if (!window.API) {
                    throw new Error('API Client nu este disponibil');
                }

                const data = await window.API.getOrders();
                const orders = data.data || [];

                if (orders.length === 0) {
                    content.innerHTML = `
                        <div class="empty-state-pro">
                            <i class="fas fa-shopping-bag"></i>
                            <h3>Nu ai comenzi încă</h3>
                            <p>Când vei plasa o comandă, o vei vedea aici.</p>
                        </div>
                    `;
                    return;
                }

                let html = '';
                orders.forEach(order => {
                    const statusClass = `status-${order.status}`;
                    const statusText = this.getStatusText(order.status);
                    const date = new Date(order.created_at).toLocaleDateString('ro-RO');
                    
                    html += `
                        <div class="order-card-pro">
                            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                                <div>
                                    <div style="font-weight: 700; font-size: 16px; color: #333; margin-bottom: 5px;">
                                        📦 ${order.order_number}
                                    </div>
                                    <div style="color: #666; font-size: 14px;">
                                        ${date}
                                    </div>
                                </div>
                                <span class="order-status ${statusClass}">${statusText}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div style="font-size: 20px; font-weight: 700; color: #667eea;">
                                    ${order.total_amount} EUR
                                </div>
                                <button class="account-btn-pro" style="padding: 8px 16px; font-size: 14px;">
                                    👁️ Detalii
                                </button>
                            </div>
                        </div>
                    `;
                });

                content.innerHTML = html;
            } catch (error) {
                console.error('❌ Eroare încărcare comenzi:', error);
                content.innerHTML = `
                    <div class="account-card-pro">
                        <p style="color: red; text-align: center;">
                            ❌ Eroare la încărcarea comenzilor: ${error.message}
                        </p>
                    </div>
                `;
            }
        },

        loadSettings(user) {
            const content = document.getElementById('accountContentPro');
            
            content.innerHTML = `
                <div class="account-card-pro">
                    <div class="account-card-title">
                        ⚙️ Setări Cont
                    </div>
                    <p style="color: #666;">Gestionează setările contului tău.</p>
                </div>
                
                <div class="account-card-pro">
                    <div class="account-card-title">
                        🔐 Securitate
                    </div>
                    <button class="account-btn-pro" style="width: 100%; margin-bottom: 10px;">
                        🔑 Schimbă Parola
                    </button>
                </div>
                
                <div class="account-card-pro">
                    <div class="account-card-title">
                        🌐 Preferințe
                    </div>
                    <div class="account-info-row">
                        <span class="account-info-label">Limbă</span>
                        <span class="account-info-value">${user.language === 'en' ? 'English' : 'Română'}</span>
                    </div>
                </div>
            `;
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
        document.addEventListener('DOMContentLoaded', () => AccountPanel.init());
    } else {
        AccountPanel.init();
    }

    // Export global
    window.AccountPanel = AccountPanel;

    console.log('✅ Account Panel Professional ready!');
})();

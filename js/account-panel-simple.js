/**
 * ACCOUNT PANEL SIMPLU - Versiune funcțională minimă
 * MC MetSolArt
 */

(function() {
    'use strict';

    console.log('👤 ACCOUNT PANEL SIMPLE - Loading...');

    const AccountPanel = {
        panel: null,
        overlay: null,
        currentTab: 'dashboard',

        init() {
            console.log('🔧 Inițializare Account Panel...');
            this.createPanel();
            this.attachEvents();
            console.log('✅ Account Panel inițializat!');
        },

        createPanel() {
            // Creează overlay
            this.overlay = document.createElement('div');
            this.overlay.className = 'account-overlay';
            this.overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 9998;
                display: none;
            `;
            document.body.appendChild(this.overlay);

            // Creează panel
            this.panel = document.createElement('div');
            this.panel.className = 'account-panel';
            this.panel.style.cssText = `
                position: fixed;
                top: 0;
                right: -100%;
                width: 90%;
                max-width: 500px;
                height: 100%;
                background: white;
                z-index: 9999;
                transition: right 0.3s ease;
                overflow-y: auto;
                box-shadow: -5px 0 15px rgba(0,0,0,0.3);
            `;
            this.panel.innerHTML = `
                <div style="padding: 20px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h2>Contul Meu</h2>
                        <button onclick="window.AccountPanel.hide()" style="background: none; border: none; font-size: 24px; cursor: pointer;">&times;</button>
                    </div>
                    <div id="accountContent">
                        <p>Se încarcă...</p>
                    </div>
                </div>
            `;
            document.body.appendChild(this.panel);
        },

        attachEvents() {
            // Click pe overlay închide panelul
            this.overlay.addEventListener('click', () => this.hide());
        },

        show(tab = 'dashboard') {
            console.log('📂 Deschidere Account Panel:', tab);
            this.currentTab = tab;
            
            // Afișează overlay și panel
            this.overlay.style.display = 'block';
            setTimeout(() => {
                this.panel.style.right = '0';
            }, 10);

            // Încarcă conținutul
            this.loadContent(tab);
        },

        hide() {
            console.log('📁 Închidere Account Panel');
            this.panel.style.right = '-100%';
            setTimeout(() => {
                this.overlay.style.display = 'none';
            }, 300);
        },

        async loadContent(tab) {
            const content = document.getElementById('accountContent');
            
            try {
                const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
                
                if (!user.email) {
                    content.innerHTML = '<p>Nu ești autentificat. Te rugăm să te loghezi.</p>';
                    return;
                }

                switch(tab) {
                    case 'dashboard':
                        content.innerHTML = `
                            <h3>Dashboard</h3>
                            <p>Bun venit, ${user.firstName || 'Utilizator'}!</p>
                            <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 10px 0;">
                                <p><strong>Email:</strong> ${user.email}</p>
                                <p><strong>Telefon:</strong> ${user.phone || 'Nu este setat'}</p>
                            </div>
                        `;
                        break;
                    
                    case 'profile':
                        content.innerHTML = `
                            <h3>Profilul Meu</h3>
                            <p><strong>Nume:</strong> ${user.firstName} ${user.lastName}</p>
                            <p><strong>Email:</strong> ${user.email}</p>
                            <p><strong>Telefon:</strong> ${user.phone || 'Nu este setat'}</p>
                        `;
                        break;
                    
                    case 'orders':
                        content.innerHTML = `
                            <h3>Comenzile Mele</h3>
                            <p>Se încarcă comenzile...</p>
                        `;
                        await this.loadOrders();
                        break;
                    
                    case 'settings':
                        content.innerHTML = `
                            <h3>Setări</h3>
                            <p>Setările contului tău.</p>
                        `;
                        break;
                    
                    default:
                        content.innerHTML = `<p>Tab necunoscut: ${tab}</p>`;
                }
            } catch (error) {
                console.error('❌ Eroare încărcare conținut:', error);
                content.innerHTML = `<p style="color: red;">Eroare: ${error.message}</p>`;
            }
        },

        async loadOrders() {
            const content = document.getElementById('accountContent');
            
            try {
                if (!window.API) {
                    throw new Error('API Client nu este disponibil');
                }

                const data = await window.API.getOrders();
                const orders = data.data || [];

                if (orders.length === 0) {
                    content.innerHTML = `
                        <h3>Comenzile Mele</h3>
                        <p>Nu ai comenzi încă.</p>
                    `;
                    return;
                }

                let html = '<h3>Comenzile Mele</h3>';
                orders.forEach(order => {
                    html += `
                        <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 10px 0;">
                            <p><strong>Comandă:</strong> ${order.order_number}</p>
                            <p><strong>Status:</strong> ${order.status}</p>
                            <p><strong>Total:</strong> ${order.total_amount} EUR</p>
                            <p><strong>Data:</strong> ${new Date(order.created_at).toLocaleDateString('ro-RO')}</p>
                        </div>
                    `;
                });

                content.innerHTML = html;
            } catch (error) {
                console.error('❌ Eroare încărcare comenzi:', error);
                content.innerHTML = `
                    <h3>Comenzile Mele</h3>
                    <p style="color: red;">Eroare la încărcarea comenzilor: ${error.message}</p>
                `;
            }
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

    console.log('✅ Account Panel Simple ready!');
})();

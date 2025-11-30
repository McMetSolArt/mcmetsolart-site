/**
 * ACCOUNT PANEL ENTERPRISE - PART 3
 * Orders & Settings with Real-time Sync
 */

(function() {
    'use strict';

    if (!window.AccountPanelEnterprise) return;

    const Panel = window.AccountPanelEnterprise;

    // Orders Management with Real-time Sync
    Panel.loadOrders = async function() {
        const content = document.getElementById('accountContentEnterprise');
        
        content.innerHTML = `
            <div class="account-card-final">
                <div class="card-title-final">
                    <span>📦</span>
                    ${this.tr('account.orders.title')}
                </div>
                <p style="text-align: center; color: #666;">${this.tr('account.orders.loading')}</p>
            </div>
        `;
        
        try {
            if (!window.API) {
                throw new Error('API Client not available');
            }

            const data = await window.API.getOrders();
            let orders = Array.isArray(data) ? data : (data.data || data.orders || []);
            
            if (orders.length === 0) {
                content.innerHTML = `
                    <div class="empty-state-final">
                        <div class="empty-state-icon">📦</div>
                        <div class="empty-state-title">${this.tr('account.orders.empty')}</div>
                        <div class="empty-state-text">${this.tr('account.orders.empty_text')}</div>
                    </div>
                `;
                return;
            }

            let html = '';
            orders.forEach(order => {
                const statusText = this.tr(`order.status.${order.status}`);
                const date = new Date(order.created_at).toLocaleDateString(this.currentLanguage, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                
                html += `
                    <div class="order-card-final" data-order-id="${order.id}">
                        <div class="order-header-final">
                            <div>
                                <div class="order-number">📦 ${order.order_number}</div>
                                <div class="order-date">${date}</div>
                            </div>
                            <span class="order-status-badge">${statusText}</span>
                        </div>
                        <div class="order-details-final">
                            <div class="order-detail-item">
                                <div class="order-detail-label">${this.tr('account.orders.total')}</div>
                                <div class="order-detail-value order-total">${order.total_amount} EUR</div>
                            </div>
                            <div class="order-detail-item">
                                <div class="order-detail-label">${this.tr('account.orders.status')}</div>
                                <div class="order-detail-value">${statusText}</div>
                            </div>
                        </div>
                        <div class="btn-group-final">
                            <button class="btn-outline-final" onclick="window.AccountPanelEnterprise.viewOrderDetails('${order.id}')">
                                👁️ ${this.tr('account.orders.view_details')}
                            </button>
                            ${['in_asteptare', 'confirmat'].includes(order.status) ? `
                            <button class="btn-secondary-final" onclick="window.AccountPanelEnterprise.cancelOrder('${order.id}')">
                                ❌ ${this.tr('account.orders.cancel')}
                            </button>
                            ` : ''}
                        </div>
                    </div>
                `;
            });

            content.innerHTML = html;
        } catch (error) {
            console.error('Orders loading error:', error);
            content.innerHTML = `
                <div class="account-card-final">
                    <p style="color: #666; text-align: center;">
                        ${this.tr('account.msg.orders_error')}
                    </p>
                </div>
            `;
        }
    };

    Panel.viewOrderDetails = async function(orderId) {
        try {
            // Obține detaliile comenzii
            if (window.API && window.API.getOrderDetails) {
                const response = await window.API.getOrderDetails(orderId);
                const order = response.data?.order || response;
                
                // Afișează modal cu detalii
                const modal = document.createElement('div');
                modal.className = 'order-details-modal';
                modal.innerHTML = `
                    <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3>${this.tr('account.orders.number')} #${order.orderNumber || orderId}</h3>
                            <button class="modal-close" onclick="this.closest('.order-details-modal').remove()">×</button>
                        </div>
                        <div class="modal-body">
                            <p><strong>Status:</strong> ${order.status}</p>
                            <p><strong>Total:</strong> ${order.totalAmount} ${order.currency || 'RON'}</p>
                            ${order.items ? `<div class="order-items">${order.items.map(item => `
                                <div class="order-item">
                                    <span>${item.productName}</span>
                                    <span>${item.quantity} × ${item.price}</span>
                                </div>
                            `).join('')}</div>` : ''}
                        </div>
                    </div>
                `;
                document.body.appendChild(modal);
            } else {
                this.showNotification(`${this.tr('account.orders.number')} #${orderId}`, 'info');
            }
        } catch (error) {
            console.error('Order details error:', error);
            this.showNotification('Error loading order details', 'error');
        }
    };

    Panel.cancelOrder = async function(orderId) {
        if (!confirm(this.tr('account.msg.cancel_order_confirm'))) {
            return;
        }

        try {
            // Apelează API pentru anulare comandă
            if (window.API && window.API.cancelOrder) {
                await window.API.cancelOrder(orderId);
                this.showNotification('Order cancelled', 'success');
                this.loadOrders();
            } else {
                // Fallback: marchează local ca anulată
                console.warn('API cancelOrder nu este disponibil');
                this.showNotification('Order cancellation requested. Contact support to confirm.', 'info');
            }
        } catch (error) {
            console.error('Cancel order error:', error);
            this.showNotification('Error cancelling order: ' + (error.message || 'Unknown error'), 'error');
        }
    };

    // Real-time Orders Polling
    Panel.startOrdersPolling = function() {
        if (this.ordersPollingInterval) return;
        
        // Poll every 30 seconds
        this.ordersPollingInterval = setInterval(() => {
            if (this.currentTab === 'orders' && this.isOpen) {
                this.updateOrdersStatus();
            }
        }, 30000);
    };

    Panel.stopOrdersPolling = function() {
        if (this.ordersPollingInterval) {
            clearInterval(this.ordersPollingInterval);
            this.ordersPollingInterval = null;
        }
    };

    Panel.updateOrdersStatus = async function() {
        try {
            if (!window.API) return;

            const data = await window.API.getOrders();
            let orders = Array.isArray(data) ? data : (data.data || data.orders || []);
            
            // Update each order card
            orders.forEach(order => {
                const card = document.querySelector(`[data-order-id="${order.id}"]`);
                if (card) {
                    const statusBadge = card.querySelector('.order-status-badge');
                    const statusValue = card.querySelectorAll('.order-detail-value')[1];
                    const statusText = this.tr(`order.status.${order.status}`);
                    
                    if (statusBadge) statusBadge.textContent = statusText;
                    if (statusValue) statusValue.textContent = statusText;
                }
            });
            
            // Update stats
            this.loadStats();
        } catch (error) {
            console.error('Orders status update error:', error);
        }
    };

    // Settings
    Panel.loadSettings = function() {
        const content = document.getElementById('accountContentEnterprise');
        const user = this.userData;
        
        content.innerHTML = `
            <div class="account-card-final">
                <div class="card-title-final">
                    <span>🔐</span>
                    ${this.tr('account.settings.security')}
                </div>
                <p style="color: #666; margin-bottom: 15px; font-size: 14px;">
                    ${this.tr('account.settings.security_desc')}
                </p>
                <button class="btn-primary-final" onclick="window.AccountPanelEnterprise.changePassword()">
                    🔑 ${this.tr('account.settings.change_password')}
                </button>
            </div>
            
            <div class="account-card-final">
                <div class="card-title-final">
                    <span>🌐</span>
                    ${this.tr('account.settings.preferences')}
                </div>
                <div class="info-grid-final">
                    <div class="info-item-final">
                        <div class="info-label-final">${this.tr('account.settings.language')}</div>
                        <div class="info-value-final">${this.getLanguageName(user.language || 'ro')}</div>
                    </div>
                    <div class="info-item-final">
                        <div class="info-label-final">${this.tr('account.settings.theme')}</div>
                        <div class="info-value-final">${this.tr('account.settings.theme_auto')}</div>
                    </div>
                </div>
            </div>
            
            <div class="account-card-final">
                <div class="card-title-final">
                    <span>🚪</span>
                    ${this.tr('account.settings.account')}
                </div>
                <button class="btn-outline-final" onclick="window.AccountPanelEnterprise.logout()">
                    🚪 ${this.tr('account.settings.logout')}
                </button>
            </div>
        `;
    };

    Panel.getLanguageName = function(code) {
        const names = {
            'ro': 'Română',
            'en': 'English',
            'it': 'Italiano'
        };
        return names[code] || code;
    };

    Panel.changePassword = function() {
        this.showNotification(this.tr('account.msg.feature_soon'), 'info');
    };

    Panel.logout = function() {
        if (confirm(this.tr('account.msg.logout_confirm'))) {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('authToken');
            localStorage.removeItem('isLoggedIn');
            this.hide();
            window.location.reload();
        }
    };

})();

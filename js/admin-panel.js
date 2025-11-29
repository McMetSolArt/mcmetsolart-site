// ============================================
// ADMIN PANEL - MC MetSolArt
// JavaScript pentru gestionare comenzi
// ============================================

// Configurare
const ADMIN_CONFIG = {
    API_URL: 'http://localhost:3000',
    ADMIN_PASSWORD: 'admin123', // SCHIMBĂ ASTA!
    AUTO_REFRESH: 30000 // Refresh automat la 30 secunde
};

// State
let currentOrderId = null;
let currentFilter = 'all';
let currentTab = 'orders';
let isAuthenticated = false;
let refreshInterval = null;
let allOrders = [];
let allClients = [];

// ============================================
// AUTENTIFICARE
// ============================================

function initLogin() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

function handleLogin(e) {
    e.preventDefault();
    const password = document.getElementById('password').value;
    
    if (password === ADMIN_CONFIG.ADMIN_PASSWORD) {
        isAuthenticated = true;
        showDashboard();
        loadData();
        startAutoRefresh();
    } else {
        showError('Parolă incorectă!');
    }
}

function showError(message) {
    const errorDiv = document.getElementById('loginError');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.classList.add('show');
        setTimeout(() => {
            errorDiv.classList.remove('show');
        }, 3000);
    }
}

function showDashboard() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('dashboard').classList.add('show');
}

function logout() {
    // Deconectare directă fără confirmare
    isAuthenticated = false;
    stopAutoRefresh();
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('dashboard').classList.remove('show');
    document.getElementById('password').value = '';
}

// ============================================
// AUTO REFRESH
// ============================================

function startAutoRefresh() {
    refreshInterval = setInterval(() => {
        if (isAuthenticated) {
            loadStats();
            loadOrders(currentFilter);
            console.log('🔄 Auto-refresh: Date actualizate');
        }
    }, ADMIN_CONFIG.AUTO_REFRESH);
}

function stopAutoRefresh() {
    if (refreshInterval) {
        clearInterval(refreshInterval);
        refreshInterval = null;
    }
}

// ============================================
// ÎNCĂRCARE DATE
// ============================================

async function loadData() {
    await loadStats();
    await loadOrders('all');
    await loadClients();
}

async function loadStats() {
    try {
        const response = await fetch(`${ADMIN_CONFIG.API_URL}/api/stats`);
        const data = await response.json();
        
        updateStat('totalUsers', data.total_users || 0);
        updateStat('totalOrders', data.total_orders || 0);
        updateStat('totalRevenue', (data.total_revenue || 0).toFixed(2) + ' €');
        
        const pending = data.orders_by_status?.find(s => s.status === 'in_asteptare');
        updateStat('pendingOrders', pending ? pending.count : 0);
    } catch (error) {
        console.error('❌ Eroare la încărcarea statisticilor:', error);
    }
}

function updateStat(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

async function loadOrders(status = 'all') {
    try {
        // Folosește endpoint-ul avansat care include informații despre plăți
        const response = await fetch(`${ADMIN_CONFIG.API_URL}/api/admin/orders/advanced`);
        const data = await response.json();
        
        if (data.success) {
            // Salvează TOATE comenzile
            if (status === 'all' || allOrders.length === 0) {
                allOrders = data.orders || [];
            }
            
            // Filtrează după status
            let filteredOrders = allOrders;
            if (status !== 'all') {
                filteredOrders = allOrders.filter(order => order.status === status);
            }
            
            displayOrders(filteredOrders);
        } else {
            throw new Error(data.message || 'Eroare la încărcarea comenzilor');
        }
    } catch (error) {
        console.error('❌ Eroare la încărcarea comenzilor:', error);
        document.getElementById('ordersTable').innerHTML = 
            '<tr><td colspan="10" class="loading">Eroare la încărcarea comenzilor</td></tr>';
    }
}

function displayOrders(orders) {
    const tbody = document.getElementById('ordersTable');
    
    if (!orders || orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" class="loading">Nu există comenzi</td></tr>';
        return;
    }
    
    tbody.innerHTML = orders.map(order => createOrderRow(order)).join('');
}

async function loadClients() {
    try {
        const response = await fetch(`${ADMIN_CONFIG.API_URL}/api/users`);
        const clients = await response.json();
        
        allClients = clients || [];
        displayClients(allClients);
        updateClientDropdown(allClients);
    } catch (error) {
        console.error('❌ Eroare la încărcarea clienților:', error);
        document.getElementById('clientsTable').innerHTML = 
            '<tr><td colspan="8" class="loading">Eroare la încărcarea clienților</td></tr>';
    }
}

function displayClients(clients) {
    const tbody = document.getElementById('clientsTable');
    
    if (!clients || clients.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="loading">Nu există clienți</td></tr>';
        return;
    }
    
    tbody.innerHTML = clients.map(client => createClientRow(client)).join('');
}

function updateClientDropdown(clients) {
    const select = document.getElementById('newOrderClient');
    if (!select) return;
    
    select.innerHTML = '<option value="">-- Selectează un client --</option>' +
        clients.map(client => `
            <option value="${client.id}">${client.first_name} ${client.last_name} (${client.email})</option>
        `).join('');
}

function createOrderRow(order) {
    const dataExpediere = order.shipping_date ? formatDate(order.shipping_date) : '-';
    const numarCupole = order.quantity || 1;
    const paymentPercentage = order.payment_percentage || 0;
    const isConfirmed = order.confirmed_by_admin || 0;
    
    // Icon pentru confirmare
    const confirmIcon = isConfirmed ? '✅' : '⏳';
    const confirmClass = isConfirmed ? 'confirmed' : 'pending';
    
    // Culoare pentru plată
    let paymentColor = '#F44336'; // Roșu pentru 0%
    if (paymentPercentage === 100) paymentColor = '#4CAF50'; // Verde pentru 100%
    else if (paymentPercentage >= 50) paymentColor = '#FFC107'; // Galben pentru 50%+
    else if (paymentPercentage > 0) paymentColor = '#FF9800'; // Portocaliu pentru 25%
    
    return `
        <tr>
            <td>${order.id}</td>
            <td>
                <strong>${order.order_number}</strong><br>
                <span class="order-confirm-badge ${confirmClass}">${confirmIcon} ${isConfirmed ? 'Confirmată' : 'Neconfirmată'}</span>
            </td>
            <td>${order.first_name} ${order.last_name}</td>
            <td>${order.email}</td>
            <td>${numarCupole}</td>
            <td><span class="status-badge status-${order.status}">${getStatusText(order.status)}</span></td>
            <td>
                <strong>${parseFloat(order.total_amount).toFixed(2)} RON</strong><br>
                <span class="payment-badge" style="background: ${paymentColor}20; color: ${paymentColor};">
                    💰 ${paymentPercentage}% plătit
                </span>
            </td>
            <td>${formatDate(order.created_at)}</td>
            <td>${dataExpediere}</td>
            <td>
                <div class="action-buttons-compact">
                    <button class="btn-action btn-primary" onclick="showOrderDetailsModal(${order.id})" title="Detalii Complete">
                        👁️
                    </button>
                    ${!isConfirmed ? `
                        <button class="btn-action btn-success" onclick="confirmOrder(${order.id})" title="Confirmă Comanda">
                            ✅
                        </button>
                    ` : ''}
                    <button class="btn-action btn-warning" onclick="showPaymentModal(${order.id}, ${order.total_amount}, ${paymentPercentage})" title="Actualizează Plată">
                        💰
                    </button>
                    <button class="btn-action btn-info" onclick="showStatusModal(${order.id}, '${order.status}')" title="Schimbă Status">
                        📊
                    </button>
                </div>
            </td>
        </tr>
    `;
}

function createClientRow(client) {
    return `
        <tr>
            <td>${client.id}</td>
            <td>${client.first_name} ${client.last_name}</td>
            <td>${client.email}</td>
            <td>${client.phone || '-'}</td>
            <td>${client.total_orders || 0}</td>
            <td>${parseFloat(client.total_spent || 0).toFixed(2)} €</td>
            <td>${formatDate(client.created_at)}</td>
            <td>
                <button class="btn-edit btn-small" onclick="createOrderForClient(${client.id})">
                    ➕ Comandă
                </button>
            </td>
        </tr>
    `;
}

// ============================================
// TAB SWITCHING
// ============================================

function switchTab(tab) {
    currentTab = tab;
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tab + 'Tab').classList.add('active');
    
    // Load data if needed
    if (tab === 'clients' && allClients.length === 0) {
        loadClients();
    }
}

// ============================================
// FILTRARE ȘI CĂUTARE
// ============================================

function filterOrders(status) {
    currentFilter = status;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    loadOrders(status);
}

function searchOrders(searchTerm) {
    const filtered = allOrders.filter(order => {
        const searchLower = searchTerm.toLowerCase();
        return (
            order.order_number.toLowerCase().includes(searchLower) ||
            `${order.first_name} ${order.last_name}`.toLowerCase().includes(searchLower) ||
            order.email.toLowerCase().includes(searchLower)
        );
    });
    displayOrders(filtered);
}

function searchClients(searchTerm) {
    const filtered = allClients.filter(client => {
        const searchLower = searchTerm.toLowerCase();
        return (
            `${client.first_name} ${client.last_name}`.toLowerCase().includes(searchLower) ||
            client.email.toLowerCase().includes(searchLower) ||
            (client.phone && client.phone.includes(searchTerm))
        );
    });
    displayClients(filtered);
}

// ============================================
// MODALE
// ============================================

async function openEditOrderModal(orderId) {
    try {
        const response = await fetch(`${ADMIN_CONFIG.API_URL}/api/orders/${orderId}`);
        const data = await response.json();
        const order = data.order;
        
        currentOrderId = orderId;
        document.getElementById('modalOrderNumber').textContent = order.order_number;
        document.getElementById('modalClient').textContent = `${order.first_name} ${order.last_name}`;
        document.getElementById('editNumarCupole').value = order.quantity || 1;
        document.getElementById('editPretTotal').value = order.total_amount;
        document.getElementById('editStatus').value = order.status;
        document.getElementById('editDataExpediere').value = order.shipping_date || '';
        document.getElementById('editNotite').value = order.admin_notes || '';
        
        document.getElementById('editModal').classList.add('show');
    } catch (error) {
        showNotification('❌ Eroare la încărcarea comenzii', 'error');
        console.error(error);
    }
}

function openNewOrderModal() {
    if (allClients.length === 0) {
        showNotification('⚠️ Nu există clienți înregistrați', 'warning');
        return;
    }
    document.getElementById('newOrderModal').classList.add('show');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

function createOrderForClient(clientId) {
    openNewOrderModal();
    setTimeout(() => {
        document.getElementById('newOrderClient').value = clientId;
    }, 100);
}

// ============================================
// CREARE ȘI EDITARE COMENZI
// ============================================

async function createOrder() {
    const clientId = document.getElementById('newOrderClient').value;
    const cupole = document.getElementById('newOrderCupole').value;
    const pret = document.getElementById('newOrderPret').value;
    const status = document.getElementById('newOrderStatus').value;
    const notite = document.getElementById('newOrderNotite').value;
    
    if (!clientId) {
        showNotification('⚠️ Selectează un client', 'warning');
        return;
    }
    
    if (!pret || pret <= 0) {
        showNotification('⚠️ Introdu un preț valid', 'warning');
        return;
    }
    
    // Obține token-ul de autentificare
    const token = localStorage.getItem('authToken');
    if (!token) {
        showNotification('❌ Eroare: Token de autentificare lipsă. Te rugăm să te autentifici.', 'error');
        console.error('Token lipsă - admin trebuie să se autentifice');
        return;
    }
    
    console.log('📦 Creare comandă pentru client:', clientId);
    console.log('🔑 Token admin:', token.substring(0, 30) + '...');
    
    try {
        const response = await fetch(`${ADMIN_CONFIG.API_URL}/api/orders/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                user_id: clientId,
                quantity: cupole,
                total_amount: pret,
                status: status,
                admin_notes: notite
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('✅ Comandă creată cu succes!', 'success');
            closeModal('newOrderModal');
            loadOrders(currentFilter);
            loadStats();
            
            // Reset form
            document.getElementById('newOrderClient').value = '';
            document.getElementById('newOrderCupole').value = 1;
            document.getElementById('newOrderPret').value = '';
            document.getElementById('newOrderNotite').value = '';
        } else {
            showNotification('❌ Eroare: ' + (data.error || 'Eroare necunoscută'), 'error');
        }
    } catch (error) {
        showNotification('❌ Eroare de conexiune', 'error');
        console.error(error);
    }
}

async function updateOrder() {
    const cupole = document.getElementById('editNumarCupole').value;
    const pret = document.getElementById('editPretTotal').value;
    const status = document.getElementById('editStatus').value;
    const dataExpediere = document.getElementById('editDataExpediere').value;
    const notite = document.getElementById('editNotite').value;
    
    try {
        const response = await fetch(`${ADMIN_CONFIG.API_URL}/api/orders/${currentOrderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                quantity: cupole,
                total_amount: pret,
                status: status,
                shipping_date: dataExpediere,
                admin_notes: notite
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('✅ Comandă actualizată cu succes!', 'success');
            closeModal('editModal');
            loadOrders(currentFilter);
            loadStats();
        } else {
            showNotification('❌ Eroare: ' + (data.error || 'Eroare necunoscută'), 'error');
        }
    } catch (error) {
        showNotification('❌ Eroare de conexiune', 'error');
        console.error(error);
    }
}

// ============================================
// NOTIFICĂRI
// ============================================

function showNotification(message, type = 'info') {
    // Creează notificare temporară
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        padding: 1rem 2rem;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 0.75rem;
        color: white;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// UTILITĂȚI
// ============================================

function getStatusText(status) {
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

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ro-RO', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

// ============================================
// INIȚIALIZARE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Admin Panel - MC MetSolArt');
    console.log('📊 Versiune: 2.0 Professional');
    
    initLogin();
    
    // Search functionality
    const orderSearch = document.getElementById('orderSearch');
    if (orderSearch) {
        orderSearch.addEventListener('input', (e) => {
            searchOrders(e.target.value);
        });
    }
    
    const clientSearch = document.getElementById('clientSearch');
    if (clientSearch) {
        clientSearch.addEventListener('input', (e) => {
            searchClients(e.target.value);
        });
    }
    
    // Close modals on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                closeModal(e.target.id);
            }
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // ESC pentru închidere modale
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.show').forEach(modal => {
                closeModal(modal.id);
            });
        }
        
        // Ctrl+R pentru refresh manual
        if (e.ctrlKey && e.key === 'r' && isAuthenticated) {
            e.preventDefault();
            loadData();
            showNotification('🔄 Date actualizate', 'info');
        }
        
        // Ctrl+N pentru comandă nouă
        if (e.ctrlKey && e.key === 'n' && isAuthenticated && currentTab === 'orders') {
            e.preventDefault();
            openNewOrderModal();
        }
    });
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    stopAutoRefresh();
});

// Export functions for global access
window.logout = logout;
window.switchTab = switchTab;
window.filterOrders = filterOrders;
window.openEditOrderModal = openEditOrderModal;
window.openNewOrderModal = openNewOrderModal;
window.createOrderForClient = createOrderForClient;
window.closeModal = closeModal;
window.updateOrder = updateOrder;
window.createOrder = createOrder;

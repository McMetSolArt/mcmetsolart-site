// ADMIN PANEL FINAL - JavaScript Complet Funcțional

const API_URL = 'http://localhost:3000';
const ADMIN_PASSWORD = 'admin123';

let allOrders = [];
let allClients = [];
let currentFilter = 'all';

// ============================================
// LOGIN
// ============================================

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    
    if (password === ADMIN_PASSWORD) {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('dashboard').classList.add('active');
        loadAllData();
    } else {
        document.getElementById('loginError').classList.add('show');
    }
});

function logout() {
    document.getElementById('dashboard').classList.remove('active');
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('password').value = '';
}

// ============================================
// LOAD DATA
// ============================================

async function loadAllData() {
    await loadStats();
    await loadOrders();
    await loadClients();
}

async function loadStats() {
    try {
        const response = await fetch(`${API_URL}/api/stats`);
        const data = await response.json();
        
        document.getElementById('totalUsers').textContent = data.total_users || 0;
        document.getElementById('totalOrders').textContent = data.total_orders || 0;
        document.getElementById('totalRevenue').textContent = (data.total_revenue || 0).toFixed(2);
        
        const pending = data.orders_by_status?.find(s => s.status === 'in_asteptare');
        document.getElementById('pendingOrders').textContent = pending?.count || 0;
    } catch (error) {
        console.error('Eroare stats:', error);
    }
}

async function loadOrders() {
    try {
        const response = await fetch(`${API_URL}/api/admin/orders/advanced`);
        const data = await response.json();
        
        if (data.success) {
            allOrders = data.orders || [];
            displayOrders(allOrders);
        }
    } catch (error) {
        console.error('Eroare comenzi:', error);
        document.getElementById('ordersTable').innerHTML = 
            '<tr><td colspan="8" class="loading">Eroare la încărcare</td></tr>';
    }
}

async function loadClients() {
    try {
        const response = await fetch(`${API_URL}/api/users`);
        const data = await response.json();
        
        allClients = data || [];
        displayClients(allClients);
    } catch (error) {
        console.error('Eroare clienți:', error);
        document.getElementById('clientsTable').innerHTML = 
            '<tr><td colspan="8" class="loading">Eroare la încărcare</td></tr>';
    }
}

// ============================================
// DISPLAY DATA
// ============================================

function displayOrders(orders) {
    const tbody = document.getElementById('ordersTable');
    
    if (!orders || orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="loading">Nu există comenzi</td></tr>';
        return;
    }
    
    tbody.innerHTML = orders.map(order => {
        const paymentClass = `p${order.payment_percentage || 0}`;
        const statusText = getStatusText(order.status);
        const currency = order.currency || 'RON';
        const currencySymbol = getCurrencySymbol(currency);
        
        return `
            <tr>
                <td>${order.id}</td>
                <td>
                    <strong>${order.order_number}</strong><br>
                    ${order.confirmed_by_admin ? '<span class="status confirmata">✓ Confirmată</span>' : '<span class="status in_asteptare">⏳ Neconfirmată</span>'}
                </td>
                <td>
                    <strong>${order.first_name} ${order.last_name}</strong><br>
                    <small style="color: #888">${order.email}</small><br>
                    <small style="color: #666">🌍 ${order.country || 'N/A'} | 📦 ${order.product_type || 'N/A'}</small>
                </td>
                <td><span class="status ${order.status}">${statusText}</span></td>
                <td><strong>${order.total_amount} ${currency}</strong><br><small style="color: #888">${currencySymbol}</small></td>
                <td><span class="payment ${paymentClass}">${order.payment_percentage || 0}%</span></td>
                <td>${formatDate(order.created_at)}</td>
                <td>
                    <div class="actions">
                        ${!order.confirmed_by_admin ? `<button class="btn btn-success" onclick="confirmOrder(${order.id})">✓ Confirmă</button>` : ''}
                        <button class="btn btn-primary" onclick="showOrderDetails(${order.id})">👁️ Detalii</button>
                        <button class="btn btn-warning" onclick="showStatusModal(${order.id}, '${order.status}')">📊 Status</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function displayClients(clients) {
    const tbody = document.getElementById('clientsTable');
    
    if (!clients || clients.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="loading">Nu există clienți</td></tr>';
        return;
    }
    
    tbody.innerHTML = clients.map(client => `
        <tr>
            <td>${client.id}</td>
            <td><strong>${client.first_name} ${client.last_name}</strong></td>
            <td>${client.email}</td>
            <td>${client.phone || '-'}</td>
            <td>${client.total_orders || 0}</td>
            <td>${(client.total_spent || 0).toFixed(2)} RON</td>
            <td>${formatDate(client.created_at)}</td>
            <td>
                <button class="btn btn-primary" onclick="createOrderForClient(${client.id})">➕ Comandă Nouă</button>
            </td>
        </tr>
    `).join('');
}

// ============================================
// FILTERS & SEARCH
// ============================================

function filterOrders(status, buttonElement) {
    currentFilter = status;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Find and activate the clicked button
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        if (btn.textContent.includes(getFilterText(status))) {
            btn.classList.add('active');
        }
    });
    
    // Filter orders
    let filtered = allOrders;
    if (status !== 'all') {
        filtered = allOrders.filter(order => order.status === status);
    }
    
    displayOrders(filtered);
}

function getFilterText(status) {
    const texts = {
        'all': 'Toate',
        'in_asteptare': 'În așteptare',
        'confirmata': 'Confirmate',
        'in_productie': 'În producție',
        'finalizata': 'Finalizate',
        'livrata': 'Livrate'
    };
    return texts[status] || status;
}

function searchOrders(term) {
    const searchTerm = term.toLowerCase();
    const filtered = allOrders.filter(order => {
        return order.order_number.toLowerCase().includes(searchTerm) ||
               `${order.first_name} ${order.last_name}`.toLowerCase().includes(searchTerm) ||
               order.email.toLowerCase().includes(searchTerm);
    });
    
    displayOrders(filtered);
}

function searchClients(term) {
    const searchTerm = term.toLowerCase();
    const filtered = allClients.filter(client => {
        return `${client.first_name} ${client.last_name}`.toLowerCase().includes(searchTerm) ||
               client.email.toLowerCase().includes(searchTerm) ||
               (client.phone && client.phone.includes(searchTerm));
    });
    
    displayClients(filtered);
}

// ============================================
// TABS
// ============================================

function switchTab(tab) {
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tab + 'Tab').classList.add('active');
}

// ============================================
// ACTIONS
// ============================================

async function confirmOrder(orderId) {
    if (!confirm('Sigur vrei să confirmi această comandă?')) return;
    
    try {
        const response = await fetch(`${API_URL}/api/admin/order/${orderId}/confirm`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('✅ Comandă confirmată cu succes!');
            await loadAllData();
        } else {
            alert('❌ Eroare: ' + data.message);
        }
    } catch (error) {
        alert('❌ Eroare la confirmare');
    }
}

async function showOrderDetails(orderId) {
    try {
        const response = await fetch(`${API_URL}/api/admin/order/${orderId}/details`);
        const data = await response.json();
        
        if (data.success) {
            const order = data.order;
            const statusText = getStatusText(order.status);
            
            const modal = `
                <div class="modal active" id="detailsModal" onclick="if(event.target === this) closeModal()">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2>📦 Comandă #${order.order_number}</h2>
                            <button class="modal-close" onclick="closeModal()">×</button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>Client:</label>
                                <p><strong>${order.first_name} ${order.last_name}</strong></p>
                                <p>${order.email} | ${order.phone || 'N/A'}</p>
                                <p><strong>Țară:</strong> ${order.country || 'N/A'}</p>
                                <p><strong>Tip Produs:</strong> ${order.product_type || 'N/A'}</p>
                            </div>
                            
                            <div class="form-group">
                                <label>Status:</label>
                                <span class="status ${order.status}">${statusText}</span>
                                ${order.confirmed_by_admin ? '<span class="status confirmata">✓ Confirmată</span>' : '<span class="status in_asteptare">⏳ Neconfirmată</span>'}
                            </div>
                            
                            <div class="form-group">
                                <label>Plată:</label>
                                <p><strong>Valută:</strong> ${order.currency || 'RON'} (${getCurrencySymbol(order.currency || 'RON')})</p>
                                <p><strong>Total:</strong> ${order.total_amount} ${order.currency || 'RON'}</p>
                                <p><strong>Plătit:</strong> ${order.payment_percentage || 0}% (${(order.payment_amount_paid || 0).toFixed(2)} ${order.currency || 'RON'})</p>
                                <p><strong>Rămas:</strong> ${(order.payment_remaining || order.total_amount).toFixed(2)} ${order.currency || 'RON'}</p>
                            </div>
                            
                            <div class="form-group">
                                <label>Date:</label>
                                <p><strong>Creat:</strong> ${formatDate(order.created_at)}</p>
                                ${order.shipping_date ? `<p><strong>Livrare estimată:</strong> ${formatDate(order.shipping_date)}</p>` : ''}
                            </div>
                            
                            ${order.admin_notes ? `
                                <div class="form-group">
                                    <label>Notițe Admin:</label>
                                    <p>${order.admin_notes}</p>
                                </div>
                            ` : ''}
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-warning" onclick="showPaymentModal(${order.id}, ${order.total_amount}, ${order.payment_percentage || 0}, '${order.currency || 'RON'}')">💰 Actualizează Plată</button>
                            <button class="btn btn-primary" onclick="showStatusModal(${order.id}, '${order.status}')">📊 Schimbă Status</button>
                            <button class="btn" onclick="closeModal()">Închide</button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', modal);
        }
    } catch (error) {
        alert('❌ Eroare la încărcarea detaliilor');
    }
}

function showStatusModal(orderId, currentStatus) {
    const statuses = [
        { value: 'in_asteptare', label: 'În așteptare', icon: '⏳' },
        { value: 'confirmata', label: 'Confirmată', icon: '✅' },
        { value: 'in_procesare', label: 'În procesare', icon: '⚙️' },
        { value: 'in_productie', label: 'În producție', icon: '🏭' },
        { value: 'finalizata', label: 'Finalizată', icon: '✔️' },
        { value: 'expediata', label: 'Expediată', icon: '📦' },
        { value: 'in_tranzit', label: 'În tranzit', icon: '🚚' },
        { value: 'livrata', label: 'Livrată', icon: '🎉' }
    ];
    
    const modal = `
        <div class="modal active" id="statusModal" onclick="if(event.target === this) closeModal()">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>📊 Schimbă Status</h2>
                    <button class="modal-close" onclick="closeModal()">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Selectează Status:</label>
                        <select id="newStatus" class="form-control">
                            ${statuses.map(s => `
                                <option value="${s.value}" ${s.value === currentStatus ? 'selected' : ''}>
                                    ${s.icon} ${s.label}
                                </option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Notițe (opțional):</label>
                        <textarea id="statusNotes" rows="3" placeholder="Adaugă notițe..."></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn" onclick="closeModal()">Anulează</button>
                    <button class="btn btn-primary" onclick="saveStatus(${orderId})">Salvează</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modal);
}

async function saveStatus(orderId) {
    const status = document.getElementById('newStatus').value;
    const notes = document.getElementById('statusNotes').value;
    
    try {
        const response = await fetch(`${API_URL}/api/admin/order/${orderId}/status`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status, notes })
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('✅ Status actualizat cu succes!');
            closeModal();
            await loadAllData();
        } else {
            alert('❌ Eroare: ' + data.message);
        }
    } catch (error) {
        alert('❌ Eroare la actualizare');
    }
}

function showPaymentModal(orderId, totalAmount, currentPercentage, currency = 'RON') {
    const modal = `
        <div class="modal active" id="paymentModal" onclick="if(event.target === this) closeModal()">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>💰 Actualizare Plată</h2>
                    <button class="modal-close" onclick="closeModal()">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Total comandă: ${totalAmount} ${currency}</label>
                        <label>Plată curentă: ${currentPercentage}%</label>
                    </div>
                    <div class="form-group">
                        <label>Selectează Procent:</label>
                        <select id="paymentPercentage">
                            <option value="0" ${currentPercentage === 0 ? 'selected' : ''}>0% - Neplătit</option>
                            <option value="25" ${currentPercentage === 25 ? 'selected' : ''}>25% - Avans (${(totalAmount * 0.25).toFixed(2)} ${currency})</option>
                            <option value="50" ${currentPercentage === 50 ? 'selected' : ''}>50% - Avans (${(totalAmount * 0.50).toFixed(2)} ${currency})</option>
                            <option value="100" ${currentPercentage === 100 ? 'selected' : ''}>100% - Plată Completă (${totalAmount} ${currency})</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn" onclick="closeModal()">Anulează</button>
                    <button class="btn btn-primary" onclick="savePayment(${orderId})">Salvează</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modal);
}

async function savePayment(orderId) {
    const percentage = parseInt(document.getElementById('paymentPercentage').value);
    
    try {
        const response = await fetch(`${API_URL}/api/admin/order/${orderId}/payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ percentage })
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('✅ Plată actualizată cu succes!');
            closeModal();
            await loadAllData();
        } else {
            alert('❌ Eroare: ' + data.message);
        }
    } catch (error) {
        alert('❌ Eroare la actualizare');
    }
}

function createOrderForClient(clientId) {
    // Găsește clientul
    const client = allClients.find(c => c.id === clientId);
    if (!client) {
        alert('❌ Client negăsit!');
        return;
    }
    
    const modal = `
        <div class="modal active" id="createOrderModal" onclick="if(event.target === this) closeModal()">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>➕ Comandă Nouă pentru ${client.first_name} ${client.last_name}</h2>
                    <button class="modal-close" onclick="closeModal()">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Client:</label>
                        <p><strong>${client.first_name} ${client.last_name}</strong></p>
                        <p>${client.email} | ${client.phone || 'N/A'}</p>
                    </div>
                    
                    <div class="form-group">
                        <label>Țară Client: *</label>
                        <select id="orderCountry" required>
                            <option value="Romania">🇷🇴 România</option>
                            <option value="Ucraina">🇺🇦 Ucraina</option>
                            <option value="Italia">🇮🇹 Italia</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Tip Produs: *</label>
                        <select id="orderProductType" onchange="toggleCupolaType()" required>
                            <option value="Cupola">Cupolă</option>
                            <option value="Logo">Logo</option>
                            <option value="Structura Metalica">Structură Metalică</option>
                            <option value="Panou Solar">Panou Solar</option>
                            <option value="Altele">Altele</option>
                        </select>
                    </div>
                    
                    <div class="form-group" id="cupolaTypeGroup" style="display: block;">
                        <label>Model Cupolă: *</label>
                        <select id="cupolaType">
                            <option value="MC01">MC01</option>
                            <option value="MC02">MC02</option>
                            <option value="MC03">MC03</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Descriere Detaliată: *</label>
                        <textarea id="orderDescription" rows="3" placeholder="Ex: Cupola solară 5m, finisaj premium..." required></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Cantitate: *</label>
                        <input type="number" id="orderQuantity" value="1" min="1" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Valută: *</label>
                        <select id="orderCurrency" required>
                            <option value="RON">RON - Lei Românești</option>
                            <option value="EUR">EUR - Euro</option>
                            <option value="USD">USD - Dolari Americani</option>
                            <option value="UAH">UAH - Grivne Ucrainene</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Preț Total: *</label>
                        <input type="number" id="orderTotal" placeholder="Ex: 15000" step="0.01" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Data Estimată Livrare:</label>
                        <input type="date" id="orderShippingDate">
                    </div>
                    
                    <div class="form-group">
                        <label>Notițe Admin:</label>
                        <textarea id="orderNotes" rows="2" placeholder="Notițe interne (nu vizibile clientului)"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn" onclick="closeModal()">Anulează</button>
                    <button class="btn btn-primary" onclick="saveNewOrder(${clientId})">Creează Comandă</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modal);
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('orderShippingDate').min = today;
}

async function saveNewOrder(clientId) {
    // Validare - verifică dacă elementele există
    const countryEl = document.getElementById('orderCountry');
    const productTypeEl = document.getElementById('orderProductType');
    const descriptionEl = document.getElementById('orderDescription');
    const quantityEl = document.getElementById('orderQuantity');
    const currencyEl = document.getElementById('orderCurrency');
    const totalEl = document.getElementById('orderTotal');
    const shippingDateEl = document.getElementById('orderShippingDate');
    const notesEl = document.getElementById('orderNotes');
    
    if (!descriptionEl) {
        alert('❌ Eroare: Câmp descriere negăsit!');
        return;
    }
    
    const country = countryEl ? countryEl.value : 'Romania';
    const productType = productTypeEl ? productTypeEl.value : 'Cupola';
    const cupolaType = document.getElementById('cupolaType') ? document.getElementById('cupolaType').value : 'MC01';
    const description = descriptionEl.value.trim();
    const quantity = quantityEl ? parseInt(quantityEl.value) : 1;
    const currency = currencyEl ? currencyEl.value : 'RON';
    const total = totalEl ? parseFloat(totalEl.value) : 0;
    const shippingDate = shippingDateEl ? shippingDateEl.value : '';
    const notes = notesEl ? notesEl.value.trim() : '';
    
    if (!description) {
        alert('❌ Te rog introdu descrierea comenzii!');
        return;
    }
    
    if (!total || total <= 0) {
        alert('❌ Te rog introdu un preț valid!');
        return;
    }
    
    if (!quantity || quantity <= 0) {
        alert('❌ Te rog introdu o cantitate validă!');
        return;
    }
    
    // Creează comanda
    const orderData = {
        user_id: clientId,
        country: country,
        product_type: productType,
        cupola_type: productType === 'Cupola' ? cupolaType : null,
        products: [
            {
                name: productType === 'Cupola' ? `${cupolaType} - ${description}` : `${productType} - ${description}`,
                quantity: quantity,
                price: total / quantity
            }
        ],
        total_amount: total,
        currency: currency,
        shipping_date: shippingDate || null,
        admin_notes: notes || null
    };
    
    // Obține token-ul de autentificare
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('❌ Eroare: Token de autentificare lipsă. Te rugăm să te autentifici.');
        console.error('Token lipsă - admin trebuie să se autentifice');
        return;
    }
    
    console.log('📦 Creare comandă pentru client:', clientId);
    console.log('🔑 Token admin:', token.substring(0, 30) + '...');
    
    try {
        const response = await fetch(`${API_URL}/api/orders/create`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(orderData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('✅ Comandă creată cu succes!');
            closeModal();
            await loadAllData();
            
            // Switch to orders tab
            document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab')[0].classList.add('active');
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            document.getElementById('ordersTab').classList.add('active');
        } else {
            alert('❌ Eroare: ' + (data.message || 'Nu s-a putut crea comanda'));
        }
    } catch (error) {
        console.error('Eroare creare comandă:', error);
        alert('❌ Eroare la crearea comenzii. Verifică că backend-ul rulează.');
    }
}

function toggleCupolaType() {
    const productType = document.getElementById('orderProductType').value;
    const cupolaGroup = document.getElementById('cupolaTypeGroup');
    
    if (cupolaGroup) {
        cupolaGroup.style.display = productType === 'Cupola' ? 'block' : 'none';
    }
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => modal.remove());
}

// ============================================
// HELPERS
// ============================================

function getStatusText(status) {
    const statuses = {
        'in_asteptare': 'În așteptare',
        'confirmata': 'Confirmată',
        'in_procesare': 'În procesare',
        'in_productie': 'În producție',
        'finalizata': 'Finalizată',
        'expediata': 'Expediată',
        'in_tranzit': 'În tranzit',
        'livrata': 'Livrată',
        'anulata': 'Anulată'
    };
    return statuses[status] || status;
}

function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('ro-RO');
}

function getCurrencySymbol(currency) {
    const symbols = {
        'RON': 'Lei Românești',
        'EUR': 'Euro',
        'USD': 'Dolari Americani',
        'UAH': 'Grivne Ucrainene'
    };
    return symbols[currency] || currency;
}

console.log('✅ Admin Panel Final încărcat');

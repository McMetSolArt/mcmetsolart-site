// ADMIN PANEL FINAL - JavaScript Complet Funcțional

// Configurare automată: localhost sau server online
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:3000' 
    : 'https://mcmetsolart-site-5.onrender.com';
const ADMIN_PASSWORD = 'admin123';

console.log('🔧 Admin Panel inițializat');
console.log('📡 API URL:', API_URL);
console.log('🔐 Parola admin:', ADMIN_PASSWORD);

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
        
        // Afișează venituri pe valută
        const revenueElement = document.getElementById('totalRevenue');
        if (data.revenue_by_currency && Object.keys(data.revenue_by_currency).length > 0) {
            const revenues = Object.entries(data.revenue_by_currency)
                .map(([currency, amount]) => `${amount.toFixed(2)} ${currency}`)
                .join(' + ');
            revenueElement.innerHTML = revenues;
            revenueElement.style.fontSize = '0.9em'; // Font mai mic pentru mai multe valute
        } else {
            revenueElement.textContent = '0.00';
        }
        
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
        console.log('📥 Încărcare clienți de la:', `${API_URL}/api/users`);
        const response = await fetch(`${API_URL}/api/users`);
        console.log('📡 Response status:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Response error:', errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('👥 Clienți primiti:', data);
        console.log('📊 Număr clienți:', Array.isArray(data) ? data.length : 0);
        
        allClients = Array.isArray(data) ? data : [];
        displayClients(allClients);
    } catch (error) {
        console.error('❌ Eroare clienți:', error);
        document.getElementById('clientsTable').innerHTML = 
            '<tr><td colspan="8" class="loading">Eroare la încărcare: ' + error.message + '</td></tr>';
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
                <td>
                    <strong>${order.total_amount} ${currency}</strong><br>
                    <small style="color: #888">${currencySymbol}</small>
                </td>
                <td>
                    <span class="payment ${paymentClass}">${order.payment_percentage || 0}%</span><br>
                    <small style="color: ${(order.payment_percentage || 0) === 100 ? '#28a745' : '#dc3545'}; font-weight: bold;">
                        ${(order.payment_percentage || 0) === 100 ? '✅ Achitat' : `⏳ ${(order.payment_remaining || order.total_amount).toFixed(2)} ${currency}`}
                    </small>
                </td>
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
    console.log('🎨 displayClients apelat cu:', clients);
    const tbody = document.getElementById('clientsTable');
    
    if (!tbody) {
        console.error('❌ Element clientsTable nu a fost găsit!');
        return;
    }
    
    if (!clients || clients.length === 0) {
        console.warn('⚠️ Nu există clienți de afișat');
        tbody.innerHTML = '<tr><td colspan="8" class="loading">Nu există clienți înregistrați</td></tr>';
        return;
    }
    
    console.log('✅ Afișare', clients.length, 'clienți');
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
    console.log('🔍 Filtrare comenzi:', status);
    currentFilter = status;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Activate the clicked button
    if (buttonElement) {
        buttonElement.classList.add('active');
    }
    
    // Filter orders
    let filtered = allOrders;
    if (status !== 'all') {
        filtered = allOrders.filter(order => order.status === status);
        console.log(`📊 Găsite ${filtered.length} comenzi cu status "${status}"`);
    } else {
        console.log(`📊 Afișare toate comenzile: ${filtered.length}`);
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
                            
                            <div class="form-group" style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid ${(order.payment_percentage || 0) === 100 ? '#28a745' : '#ffc107'};">
                                <label style="font-size: 1.1em; margin-bottom: 10px;">💰 Situație Plată:</label>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 10px;">
                                    <div>
                                        <strong style="color: #666;">Total Comandă:</strong>
                                        <div style="font-size: 1.3em; color: #176f87; font-weight: bold;">${order.total_amount} ${order.currency || 'RON'}</div>
                                        <small style="color: #888;">${getCurrencySymbol(order.currency || 'RON')}</small>
                                    </div>
                                    <div>
                                        <strong style="color: #666;">Procent Plătit:</strong>
                                        <div style="font-size: 1.3em; color: ${(order.payment_percentage || 0) === 100 ? '#28a745' : '#ffc107'}; font-weight: bold;">${order.payment_percentage || 0}%</div>
                                    </div>
                                    <div>
                                        <strong style="color: #666;">Suma Plătită:</strong>
                                        <div style="font-size: 1.2em; color: #28a745; font-weight: bold;">${(order.payment_amount_paid || 0).toFixed(2)} ${order.currency || 'RON'}</div>
                                    </div>
                                    <div>
                                        <strong style="color: #666;">Rămas de Plată:</strong>
                                        <div style="font-size: 1.2em; color: ${(order.payment_remaining || order.total_amount) > 0 ? '#dc3545' : '#28a745'}; font-weight: bold;">${(order.payment_remaining || order.total_amount).toFixed(2)} ${order.currency || 'RON'}</div>
                                    </div>
                                </div>
                                ${(order.payment_percentage || 0) === 100 ? '<div style="margin-top: 15px; padding: 10px; background: #d4edda; color: #155724; border-radius: 5px; text-align: center; font-weight: bold;">✅ PLATĂ COMPLETĂ - Comandă achitată integral</div>' : ''}
                                ${(order.payment_percentage || 0) > 0 && (order.payment_percentage || 0) < 100 ? `<div style="margin-top: 15px; padding: 10px; background: #fff3cd; color: #856404; border-radius: 5px; text-align: center; font-weight: bold;">⚠️ PLATĂ PARȚIALĂ - Mai rămân ${(order.payment_remaining || order.total_amount).toFixed(2)} ${order.currency || 'RON'}</div>` : ''}
                                ${(order.payment_percentage || 0) === 0 ? '<div style="margin-top: 15px; padding: 10px; background: #f8d7da; color: #721c24; border-radius: 5px; text-align: center; font-weight: bold;">❌ NEPLĂTIT - Comandă neachitată</div>' : ''}
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
    const currentPaid = (totalAmount * currentPercentage / 100).toFixed(2);
    const currentRemaining = (totalAmount - currentPaid).toFixed(2);
    
    const modal = `
        <div class="modal active" id="paymentModal" onclick="if(event.target === this) closeModal()">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>💰 Actualizare Plată</h2>
                    <button class="modal-close" onclick="closeModal()">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group" style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                        <h3 style="margin: 0 0 10px 0; color: #333; font-size: 1.1em;">📊 Situație Plată Curentă</h3>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px;">
                            <div>
                                <strong style="color: #666;">Total Comandă:</strong>
                                <div style="font-size: 1.3em; color: #176f87; font-weight: bold;">${totalAmount} ${currency}</div>
                            </div>
                            <div>
                                <strong style="color: #666;">Procent Plătit:</strong>
                                <div style="font-size: 1.3em; color: ${currentPercentage === 100 ? '#28a745' : '#ffc107'}; font-weight: bold;">${currentPercentage}%</div>
                            </div>
                            <div>
                                <strong style="color: #666;">Suma Plătită:</strong>
                                <div style="font-size: 1.2em; color: #28a745; font-weight: bold;">${currentPaid} ${currency}</div>
                            </div>
                            <div>
                                <strong style="color: #666;">Rămas de Plată:</strong>
                                <div style="font-size: 1.2em; color: ${currentRemaining > 0 ? '#dc3545' : '#28a745'}; font-weight: bold;">${currentRemaining} ${currency}</div>
                            </div>
                        </div>
                        ${currentPercentage === 100 ? '<div style="margin-top: 15px; padding: 10px; background: #d4edda; color: #155724; border-radius: 5px; text-align: center; font-weight: bold;">✅ PLATĂ COMPLETĂ</div>' : ''}
                    </div>
                    
                    <div class="form-group">
                        <label style="font-weight: bold; font-size: 1.1em; margin-bottom: 10px; display: block;">Actualizează Plata:</label>
                        <select id="paymentPercentage" onchange="updatePaymentPreview(${totalAmount}, '${currency}')" style="width: 100%; padding: 12px; font-size: 1em; border: 2px solid #ddd; border-radius: 8px;">
                            <option value="0" ${currentPercentage === 0 ? 'selected' : ''}>0% - Neplătit (0 ${currency})</option>
                            <option value="25" ${currentPercentage === 25 ? 'selected' : ''}>25% - Avans (${(totalAmount * 0.25).toFixed(2)} ${currency})</option>
                            <option value="50" ${currentPercentage === 50 ? 'selected' : ''}>50% - Avans (${(totalAmount * 0.50).toFixed(2)} ${currency})</option>
                            <option value="75" ${currentPercentage === 75 ? 'selected' : ''}>75% - Avans (${(totalAmount * 0.75).toFixed(2)} ${currency})</option>
                            <option value="100" ${currentPercentage === 100 ? 'selected' : ''}>100% - Plată Completă (${totalAmount} ${currency})</option>
                        </select>
                    </div>
                    
                    <div id="paymentPreview" style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #2196f3;">
                        <h4 style="margin: 0 0 10px 0; color: #1976d2;">📝 Preview Nouă Plată:</h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                            <div>
                                <strong>Suma de Plătit:</strong>
                                <div id="previewPaid" style="font-size: 1.2em; color: #1976d2; font-weight: bold;">${currentPaid} ${currency}</div>
                            </div>
                            <div>
                                <strong>Rămas:</strong>
                                <div id="previewRemaining" style="font-size: 1.2em; color: #1976d2; font-weight: bold;">${currentRemaining} ${currency}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn" onclick="closeModal()">Anulează</button>
                    <button class="btn btn-primary" onclick="savePayment(${orderId})">💾 Salvează Plata</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modal);
    
    // Initialize preview
    updatePaymentPreview(totalAmount, currency);
}

function updatePaymentPreview(totalAmount, currency) {
    const percentage = parseInt(document.getElementById('paymentPercentage').value);
    const paid = (totalAmount * percentage / 100).toFixed(2);
    const remaining = (totalAmount - paid).toFixed(2);
    
    document.getElementById('previewPaid').textContent = `${paid} ${currency}`;
    document.getElementById('previewPaid').style.color = percentage > 0 ? '#28a745' : '#666';
    
    document.getElementById('previewRemaining').textContent = `${remaining} ${currency}`;
    document.getElementById('previewRemaining').style.color = remaining > 0 ? '#dc3545' : '#28a745';
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
            const paid = data.data.amount_paid.toFixed(2);
            const remaining = data.data.remaining.toFixed(2);
            
            let message = `✅ Plată actualizată cu succes!\n\n`;
            message += `📊 Procent: ${percentage}%\n`;
            message += `💰 Suma plătită: ${paid}\n`;
            message += `💳 Rămas de plată: ${remaining}\n`;
            
            if (percentage === 100) {
                message += `\n🎉 PLATĂ COMPLETĂ! Comanda este achitată integral.`;
            } else if (percentage > 0) {
                message += `\n⚠️ Mai rămân de plătit ${remaining}`;
            }
            
            alert(message);
            closeModal();
            await loadAllData();
        } else {
            alert('❌ Eroare: ' + data.message);
        }
    } catch (error) {
        alert('❌ Eroare la actualizare: ' + error.message);
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
    
    console.log('📦 Creare comandă pentru client:', clientId);
    console.log('📋 Date comandă:', orderData);
    
    try {
        const response = await fetch(`${API_URL}/api/orders`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            alert('✅ Comandă creată cu succes!\n\n' + 
                  '📦 Număr comandă: ' + (data.order_number || 'N/A') + '\n' +
                  '💰 Total: ' + total + ' ' + currency);
            closeModal();
            await loadAllData();
            
            // Switch to orders tab
            document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab')[0].classList.add('active');
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            document.getElementById('ordersTab').classList.add('active');
        } else {
            const errorMsg = data.error || data.message || 'Nu s-a putut crea comanda';
            alert('❌ Eroare la creare comandă:\n\n' + errorMsg);
            console.error('Response data:', data);
        }
    } catch (error) {
        console.error('❌ Eroare creare comandă:', error);
        alert('❌ Eroare la crearea comenzii!\n\n' + 
              'Verifică că backend-ul rulează pe ' + API_URL + '\n\n' +
              'Eroare: ' + error.message);
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

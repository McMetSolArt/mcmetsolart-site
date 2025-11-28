// ============================================
// ADMIN PANEL ADVANCED - MC MetSolArt
// Funcționalități avansate: Plăți, Statusuri, Istoric
// ============================================

// Funcții pentru gestionare plăți
async function updatePayment(orderId, percentage) {
    try {
        const response = await fetch(`${ADMIN_CONFIG.API_URL}/api/admin/order/${orderId}/payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ percentage })
        });

        const data = await response.json();

        if (data.success) {
            showNotification('success', data.message);
            await loadData(); // Reîncarcă datele
        } else {
            showNotification('error', data.message);
        }
    } catch (error) {
        console.error('Eroare actualizare plată:', error);
        showNotification('error', 'Eroare la actualizarea plății');
    }
}

// Confirmă comanda
async function confirmOrder(orderId) {
    if (!confirm('Sigur vrei să confirmi această comandă?')) {
        return;
    }

    try {
        const response = await fetch(`${ADMIN_CONFIG.API_URL}/api/admin/order/${orderId}/confirm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (data.success) {
            showNotification('success', data.message);
            await loadData();
        } else {
            showNotification('error', data.message);
        }
    } catch (error) {
        console.error('Eroare confirmare comandă:', error);
        showNotification('error', 'Eroare la confirmarea comenzii');
    }
}

// Actualizează statusul comenzii
async function updateOrderStatus(orderId, newStatus, notes = '') {
    try {
        const response = await fetch(`${ADMIN_CONFIG.API_URL}/api/admin/order/${orderId}/status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus, notes })
        });

        const data = await response.json();

        if (data.success) {
            showNotification('success', data.message);
            await loadData();
        } else {
            showNotification('error', data.message);
        }
    } catch (error) {
        console.error('Eroare actualizare status:', error);
        showNotification('error', 'Eroare la actualizarea statusului');
    }
}

// Actualizează informații transport
async function updateShippingInfo(orderId, shippingData) {
    try {
        const response = await fetch(`${ADMIN_CONFIG.API_URL}/api/admin/order/${orderId}/shipping`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(shippingData)
        });

        const data = await response.json();

        if (data.success) {
            showNotification('success', data.message);
            await loadData();
        } else {
            showNotification('error', data.message);
        }
    } catch (error) {
        console.error('Eroare actualizare transport:', error);
        showNotification('error', 'Eroare la actualizarea informațiilor de transport');
    }
}

// Obține istoricul comenzii
async function getOrderHistory(orderId) {
    try {
        const response = await fetch(`${ADMIN_CONFIG.API_URL}/api/admin/order/${orderId}/history`);
        const data = await response.json();

        if (data.success) {
            return data.history;
        } else {
            showNotification('error', data.message);
            return [];
        }
    } catch (error) {
        console.error('Eroare obținere istoric:', error);
        return [];
    }
}

// Obține detalii complete comandă
async function getOrderDetailsAdvanced(orderId) {
    try {
        const response = await fetch(`${ADMIN_CONFIG.API_URL}/api/admin/order/${orderId}/details`);
        const data = await response.json();

        if (data.success) {
            return data.order;
        } else {
            showNotification('error', data.message);
            return null;
        }
    } catch (error) {
        console.error('Eroare obținere detalii:', error);
        return null;
    }
}

// Afișează modal detalii comandă avansate
async function showOrderDetailsModal(orderId) {
    const order = await getOrderDetailsAdvanced(orderId);
    if (!order) return;

    const statusNames = {
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

    const paymentPercentage = order.payment_percentage || 0;
    const paymentPaid = order.payment_amount_paid || 0;
    const paymentRemaining = order.payment_remaining || order.total_amount;

    let historyHTML = '';
    if (order.history && order.history.length > 0) {
        historyHTML = order.history.map(event => {
            const date = new Date(event.timestamp);
            return `
                <div class="history-item">
                    <div class="history-time">${date.toLocaleString('ro-RO')}</div>
                    <div class="history-action">${event.action}</div>
                    <div class="history-details">${event.details}</div>
                </div>
            `;
        }).join('');
    } else {
        historyHTML = '<p class="no-history">Nu există istoric pentru această comandă</p>';
    }

    const modalHTML = `
        <div class="modal-overlay" id="orderDetailsModal">
            <div class="modal-content modal-large">
                <div class="modal-header">
                    <h2>📦 Detalii Comandă #${order.order_number}</h2>
                    <button class="modal-close" onclick="closeModal('orderDetailsModal')">×</button>
                </div>

                <div class="modal-body">
                    <!-- Informații Client -->
                    <div class="detail-section">
                        <h3>👤 Client</h3>
                        <div class="detail-grid">
                            <div><strong>Nume:</strong> ${order.first_name} ${order.last_name}</div>
                            <div><strong>Email:</strong> ${order.email}</div>
                            <div><strong>Telefon:</strong> ${order.phone || 'N/A'}</div>
                            <div><strong>Adresă:</strong> ${order.address || 'N/A'}, ${order.city || ''}, ${order.county || ''}</div>
                        </div>
                    </div>

                    <!-- Status și Plată -->
                    <div class="detail-section">
                        <h3>📊 Status și Plată</h3>
                        <div class="detail-grid">
                            <div>
                                <strong>Status:</strong> 
                                <span class="status-badge status-${order.status}">${statusNames[order.status] || order.status}</span>
                            </div>
                            <div>
                                <strong>Confirmat:</strong> 
                                ${order.confirmed_by_admin ? '✅ Da' : '❌ Nu'}
                            </div>
                            <div>
                                <strong>Total:</strong> ${order.total_amount} RON
                            </div>
                            <div>
                                <strong>Plată:</strong> ${paymentPercentage}% (${paymentPaid.toFixed(2)} RON)
                            </div>
                            <div>
                                <strong>Rămas:</strong> ${paymentRemaining.toFixed(2)} RON
                            </div>
                        </div>
                    </div>

                    <!-- Acțiuni Rapide -->
                    <div class="detail-section">
                        <h3>⚡ Acțiuni Rapide</h3>
                        <div class="action-buttons">
                            ${!order.confirmed_by_admin ? `
                                <button class="btn btn-success" onclick="confirmOrder(${order.id}); closeModal('orderDetailsModal')">
                                    ✅ Confirmă Comanda
                                </button>
                            ` : ''}
                            
                            <button class="btn btn-primary" onclick="showPaymentModal(${order.id}, ${order.total_amount}, ${paymentPercentage})">
                                💰 Actualizează Plată
                            </button>
                            
                            <button class="btn btn-primary" onclick="showStatusModal(${order.id}, '${order.status}')">
                                📊 Schimbă Status
                            </button>
                            
                            <button class="btn btn-primary" onclick="showShippingModal(${order.id})">
                                🚚 Informații Transport
                            </button>
                        </div>
                    </div>

                    <!-- Istoric -->
                    <div class="detail-section">
                        <h3>📜 Istoric Comandă</h3>
                        <div class="history-list">
                            ${historyHTML}
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="closeModal('orderDetailsModal')">Închide</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Modal actualizare plată
function showPaymentModal(orderId, totalAmount, currentPercentage) {
    const modalHTML = `
        <div class="modal-overlay" id="paymentModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>💰 Actualizare Plată</h2>
                    <button class="modal-close" onclick="closeModal('paymentModal')">×</button>
                </div>

                <div class="modal-body">
                    <div class="payment-info">
                        <p><strong>Total comandă:</strong> ${totalAmount} RON</p>
                        <p><strong>Plată curentă:</strong> ${currentPercentage}%</p>
                    </div>

                    <div class="payment-options">
                        <button class="payment-btn ${currentPercentage === 0 ? 'active' : ''}" 
                                onclick="selectPayment(0, ${totalAmount})">
                            <div class="payment-percentage">0%</div>
                            <div class="payment-amount">0 RON</div>
                            <div class="payment-label">Neplătit</div>
                        </button>

                        <button class="payment-btn ${currentPercentage === 25 ? 'active' : ''}" 
                                onclick="selectPayment(25, ${totalAmount})">
                            <div class="payment-percentage">25%</div>
                            <div class="payment-amount">${(totalAmount * 0.25).toFixed(2)} RON</div>
                            <div class="payment-label">Avans 25%</div>
                        </button>

                        <button class="payment-btn ${currentPercentage === 50 ? 'active' : ''}" 
                                onclick="selectPayment(50, ${totalAmount})">
                            <div class="payment-percentage">50%</div>
                            <div class="payment-amount">${(totalAmount * 0.50).toFixed(2)} RON</div>
                            <div class="payment-label">Avans 50%</div>
                        </button>

                        <button class="payment-btn ${currentPercentage === 100 ? 'active' : ''}" 
                                onclick="selectPayment(100, ${totalAmount})">
                            <div class="payment-percentage">100%</div>
                            <div class="payment-amount">${totalAmount} RON</div>
                            <div class="payment-label">Plată Completă</div>
                        </button>
                    </div>

                    <input type="hidden" id="selectedPaymentPercentage" value="${currentPercentage}">
                </div>

                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="closeModal('paymentModal')">Anulează</button>
                    <button class="btn btn-primary" onclick="savePayment(${orderId})">Salvează</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function selectPayment(percentage, totalAmount) {
    document.getElementById('selectedPaymentPercentage').value = percentage;
    
    // Actualizează butoanele
    document.querySelectorAll('.payment-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.closest('.payment-btn').classList.add('active');
}

async function savePayment(orderId) {
    const percentage = parseInt(document.getElementById('selectedPaymentPercentage').value);
    await updatePayment(orderId, percentage);
    closeModal('paymentModal');
    closeModal('orderDetailsModal');
}

// Modal schimbare status
function showStatusModal(orderId, currentStatus) {
    const statuses = [
        { value: 'in_asteptare', label: 'În așteptare', icon: '⏳' },
        { value: 'confirmata', label: 'Confirmată', icon: '✅' },
        { value: 'in_procesare', label: 'În procesare', icon: '⚙️' },
        { value: 'in_productie', label: 'În producție', icon: '🏭' },
        { value: 'finalizata', label: 'Finalizată', icon: '✔️' },
        { value: 'expediata', label: 'Expediată', icon: '📦' },
        { value: 'in_tranzit', label: 'În tranzit', icon: '🚚' },
        { value: 'livrata', label: 'Livrată', icon: '🎉' },
        { value: 'anulata', label: 'Anulată', icon: '❌' }
    ];

    const statusOptions = statuses.map(status => `
        <button class="status-option ${status.value === currentStatus ? 'active' : ''}" 
                onclick="selectStatus('${status.value}')">
            <span class="status-icon">${status.icon}</span>
            <span class="status-label">${status.label}</span>
        </button>
    `).join('');

    const modalHTML = `
        <div class="modal-overlay" id="statusModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>📊 Schimbă Status</h2>
                    <button class="modal-close" onclick="closeModal('statusModal')">×</button>
                </div>

                <div class="modal-body">
                    <div class="status-grid">
                        ${statusOptions}
                    </div>

                    <div class="form-group" style="margin-top: 20px;">
                        <label>Notițe (opțional):</label>
                        <textarea id="statusNotes" rows="3" placeholder="Adaugă notițe despre schimbarea statusului..."></textarea>
                    </div>

                    <input type="hidden" id="selectedStatus" value="${currentStatus}">
                </div>

                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="closeModal('statusModal')">Anulează</button>
                    <button class="btn btn-primary" onclick="saveStatus(${orderId})">Salvează</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function selectStatus(status) {
    document.getElementById('selectedStatus').value = status;
    
    document.querySelectorAll('.status-option').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.closest('.status-option').classList.add('active');
}

async function saveStatus(orderId) {
    const status = document.getElementById('selectedStatus').value;
    const notes = document.getElementById('statusNotes').value;
    
    await updateOrderStatus(orderId, status, notes);
    closeModal('statusModal');
    closeModal('orderDetailsModal');
}

// Modal informații transport
function showShippingModal(orderId) {
    const modalHTML = `
        <div class="modal-overlay" id="shippingModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>🚚 Informații Transport</h2>
                    <button class="modal-close" onclick="closeModal('shippingModal')">×</button>
                </div>

                <div class="modal-body">
                    <div class="form-group">
                        <label>Companie Transport:</label>
                        <input type="text" id="shippingCompany" placeholder="Ex: Fan Courier, DHL, GLS">
                    </div>

                    <div class="form-group">
                        <label>Număr AWB:</label>
                        <input type="text" id="trackingNumber" placeholder="Ex: 1234567890">
                    </div>

                    <div class="form-group">
                        <label>Data Estimată Livrare:</label>
                        <input type="date" id="estimatedDelivery">
                    </div>
                </div>

                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="closeModal('shippingModal')">Anulează</button>
                    <button class="btn btn-primary" onclick="saveShipping(${orderId})">Salvează</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

async function saveShipping(orderId) {
    const shippingData = {
        shipping_company: document.getElementById('shippingCompany').value,
        tracking_number: document.getElementById('trackingNumber').value,
        estimated_delivery: document.getElementById('estimatedDelivery').value
    };

    await updateShippingInfo(orderId, shippingData);
    closeModal('shippingModal');
    closeModal('orderDetailsModal');
}

// Închide modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.remove();
    }
}

console.log('✅ Admin Panel Advanced încărcat');


// ============================================
// FUNCȚIONALITĂȚI AVANSATE ADMIN PANEL
// Actualizare și Confirmare Naturală
// ============================================

// Funcție pentru confirmare comandă (simplă și rapidă)
async function confirmOrder(orderId) {
    if (!confirm('Sigur vrei să confirmi această comandă?')) {
        return;
    }

    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            showNotification('❌ Eroare: Token de autentificare lipsă', 'error');
            return;
        }

        const response = await fetch(`${window.API_CONFIG?.BASE_URL || 'http://localhost:3000'}/api/admin/order/${orderId}/confirm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (data.success) {
            showNotification('✅ Comandă confirmată cu succes!', 'success');
            // Reîncarcă lista de comenzi
            if (typeof loadOrders === 'function') {
                loadOrders(window.currentFilter || 'all');
            }
            if (typeof loadStats === 'function') {
                loadStats();
            }
        } else {
            showNotification('❌ Eroare: ' + (data.message || 'Nu s-a putut confirma comanda'), 'error');
        }
    } catch (error) {
        console.error('Eroare confirmare comandă:', error);
        showNotification('❌ Eroare de conexiune', 'error');
    }
}

// Funcție pentru actualizare plată (modal simplu)
function showPaymentModal(orderId, totalAmount, currentPercentage, currency = 'RON') {
    const modal = `
        <div class="modal active" id="paymentModal" onclick="if(event.target === this) closeModal('paymentModal')">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>💰 Actualizare Plată</h2>
                    <button class="close-btn" onclick="closeModal('paymentModal')">×</button>
                </div>
                <div class="modal-body">
                    <div class="payment-info-box">
                        <div class="info-row">
                            <span>Total comandă:</span>
                            <strong>${totalAmount} ${currency}</strong>
                        </div>
                        <div class="info-row">
                            <span>Plată curentă:</span>
                            <strong class="payment-current">${currentPercentage}%</strong>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Selectează Procent Plată:</label>
                        <div class="payment-options-grid">
                            <div class="payment-option ${currentPercentage === 0 ? 'active' : ''}" onclick="selectPaymentOption(this, 0)">
                                <div class="option-icon">💳</div>
                                <div class="option-label">0%</div>
                                <div class="option-desc">Neplătit</div>
                                <div class="option-amount">0 ${currency}</div>
                            </div>
                            <div class="payment-option ${currentPercentage === 25 ? 'active' : ''}" onclick="selectPaymentOption(this, 25)">
                                <div class="option-icon">💵</div>
                                <div class="option-label">25%</div>
                                <div class="option-desc">Avans</div>
                                <div class="option-amount">${(totalAmount * 0.25).toFixed(2)} ${currency}</div>
                            </div>
                            <div class="payment-option ${currentPercentage === 50 ? 'active' : ''}" onclick="selectPaymentOption(this, 50)">
                                <div class="option-icon">💶</div>
                                <div class="option-label">50%</div>
                                <div class="option-desc">Jumătate</div>
                                <div class="option-amount">${(totalAmount * 0.50).toFixed(2)} ${currency}</div>
                            </div>
                            <div class="payment-option ${currentPercentage === 100 ? 'active' : ''}" onclick="selectPaymentOption(this, 100)">
                                <div class="option-icon">✅</div>
                                <div class="option-label">100%</div>
                                <div class="option-desc">Complet</div>
                                <div class="option-amount">${totalAmount} ${currency}</div>
                            </div>
                        </div>
                        <input type="hidden" id="selectedPaymentPercentage" value="${currentPercentage}">
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="closeModal('paymentModal')">Anulează</button>
                    <button class="btn-primary" onclick="savePayment(${orderId})">💾 Salvează</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modal);
}

// Selectare opțiune plată
function selectPaymentOption(element, percentage) {
    // Elimină active de la toate opțiunile
    document.querySelectorAll('.payment-option').forEach(opt => {
        opt.classList.remove('active');
    });
    
    // Adaugă active la opțiunea selectată
    element.classList.add('active');
    
    // Actualizează valoarea ascunsă
    document.getElementById('selectedPaymentPercentage').value = percentage;
}

// Salvare plată
async function savePayment(orderId) {
    const percentage = parseInt(document.getElementById('selectedPaymentPercentage').value);
    
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            showNotification('❌ Eroare: Token de autentificare lipsă', 'error');
            return;
        }

        const response = await fetch(`${window.API_CONFIG?.BASE_URL || 'http://localhost:3000'}/api/admin/order/${orderId}/payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ percentage })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('✅ Plată actualizată cu succes!', 'success');
            closeModal('paymentModal');
            // Reîncarcă lista
            if (typeof loadOrders === 'function') {
                loadOrders(window.currentFilter || 'all');
            }
            if (typeof loadStats === 'function') {
                loadStats();
            }
        } else {
            showNotification('❌ Eroare: ' + (data.message || 'Nu s-a putut actualiza plata'), 'error');
        }
    } catch (error) {
        console.error('Eroare actualizare plată:', error);
        showNotification('❌ Eroare de conexiune', 'error');
    }
}

// Funcție pentru schimbare status (modal simplu)
function showStatusModal(orderId, currentStatus) {
    const statuses = [
        { value: 'in_asteptare', label: 'În așteptare', icon: '⏳', color: '#FFC107' },
        { value: 'confirmata', label: 'Confirmată', icon: '✅', color: '#2196F3' },
        { value: 'in_procesare', label: 'În procesare', icon: '⚙️', color: '#9C27B0' },
        { value: 'in_productie', label: 'În producție', icon: '🏭', color: '#673AB7' },
        { value: 'finalizata', label: 'Finalizată', icon: '✔️', color: '#4CAF50' },
        { value: 'expediata', label: 'Expediată', icon: '📦', color: '#00BCD4' },
        { value: 'in_tranzit', label: 'În tranzit', icon: '🚚', color: '#03A9F4' },
        { value: 'livrata', label: 'Livrată', icon: '🎉', color: '#4CAF50' }
    ];
    
    const modal = `
        <div class="modal active" id="statusModal" onclick="if(event.target === this) closeModal('statusModal')">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>📊 Schimbă Status</h2>
                    <button class="close-btn" onclick="closeModal('statusModal')">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Selectează Status Nou:</label>
                        <div class="status-options-grid">
                            ${statuses.map(s => `
                                <div class="status-option ${s.value === currentStatus ? 'active' : ''}" 
                                     onclick="selectStatusOption(this, '${s.value}')"
                                     style="border-color: ${s.color}20;">
                                    <div class="option-icon" style="background: ${s.color}20; color: ${s.color};">${s.icon}</div>
                                    <div class="option-label">${s.label}</div>
                                </div>
                            `).join('')}
                        </div>
                        <input type="hidden" id="selectedStatus" value="${currentStatus}">
                    </div>
                    
                    <div class="form-group">
                        <label>Notițe (opțional):</label>
                        <textarea id="statusNotes" rows="3" placeholder="Adaugă notițe despre schimbarea statusului..."></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="closeModal('statusModal')">Anulează</button>
                    <button class="btn-primary" onclick="saveStatus(${orderId})">💾 Salvează</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modal);
}

// Selectare opțiune status
function selectStatusOption(element, status) {
    // Elimină active de la toate opțiunile
    document.querySelectorAll('.status-option').forEach(opt => {
        opt.classList.remove('active');
    });
    
    // Adaugă active la opțiunea selectată
    element.classList.add('active');
    
    // Actualizează valoarea ascunsă
    document.getElementById('selectedStatus').value = status;
}

// Salvare status
async function saveStatus(orderId) {
    const status = document.getElementById('selectedStatus').value;
    const notes = document.getElementById('statusNotes').value;
    
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            showNotification('❌ Eroare: Token de autentificare lipsă', 'error');
            return;
        }

        const response = await fetch(`${window.API_CONFIG?.BASE_URL || 'http://localhost:3000'}/api/admin/order/${orderId}/status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status, notes })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('✅ Status actualizat cu succes!', 'success');
            closeModal('statusModal');
            // Reîncarcă lista
            if (typeof loadOrders === 'function') {
                loadOrders(window.currentFilter || 'all');
            }
            if (typeof loadStats === 'function') {
                loadStats();
            }
        } else {
            showNotification('❌ Eroare: ' + (data.message || 'Nu s-a putut actualiza statusul'), 'error');
        }
    } catch (error) {
        console.error('Eroare actualizare status:', error);
        showNotification('❌ Eroare de conexiune', 'error');
    }
}

// Funcție pentru detalii comandă complete
async function showOrderDetailsModal(orderId) {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            showNotification('❌ Eroare: Token de autentificare lipsă', 'error');
            return;
        }

        const response = await fetch(`${window.API_CONFIG?.BASE_URL || 'http://localhost:3000'}/api/admin/order/${orderId}/details`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            const order = data.order;
            // Aici poți afișa un modal cu toate detaliile
            console.log('Detalii comandă:', order);
            showNotification('✅ Detalii comandă încărcate', 'success');
        } else {
            showNotification('❌ Eroare: ' + (data.message || 'Nu s-au putut încărca detaliile'), 'error');
        }
    } catch (error) {
        console.error('Eroare detalii comandă:', error);
        showNotification('❌ Eroare de conexiune', 'error');
    }
}

// Funcție pentru închidere modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}

// Funcție pentru notificări
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
        </div>
    `;
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
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    `;
    
    if (type === 'success') {
        notification.style.borderColor = 'rgba(76, 175, 80, 0.5)';
        notification.style.background = 'rgba(76, 175, 80, 0.2)';
    } else if (type === 'error') {
        notification.style.borderColor = 'rgba(244, 67, 54, 0.5)';
        notification.style.background = 'rgba(244, 67, 54, 0.2)';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Export funcții pentru acces global
window.confirmOrder = confirmOrder;
window.showPaymentModal = showPaymentModal;
window.selectPaymentOption = selectPaymentOption;
window.savePayment = savePayment;
window.showStatusModal = showStatusModal;
window.selectStatusOption = selectStatusOption;
window.saveStatus = saveStatus;
window.showOrderDetailsModal = showOrderDetailsModal;
window.closeModal = closeModal;
window.showNotification = showNotification;

console.log('✅ Admin Panel Advanced - Funcționalități încărcate!');

/**
 * API CLIENT - MC MetSolArt
 * Client pentru comunicare cu backend-ul
 * Gata pentru integrare cu API real
 */

class APIClient {
    constructor() {
        // Use centralized configuration from js/config.js if available
        // Fallback to smart defaults if config not loaded
        if (window.CONFIG && window.CONFIG.API_BASE_URL) {
            this.baseURL = window.CONFIG.API_BASE_URL;
        } else {
            // Fallback logic (config.js should be loaded first)
            if (window.__API_BASE_URL__ && window.__API_BASE_URL__.trim()) {
                this.baseURL = window.__API_BASE_URL__.trim();
            } else if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
                this.baseURL = 'http://localhost:3000/api';
            } else {
                this.baseURL = 'https://mcmetsolart-site-5.onrender.com/api';
            }
        }
        // To override in production, set `window.__API_BASE_URL__ = 'https://api.example.com/api'` before loading this script.
        
        this.token = localStorage.getItem('authToken');
        console.log('🔧 API Client inițializat. URL:', this.baseURL, 'Token:', this.token ? this.token.substring(0, 50) + '...' : 'LIPSĂ');
    }
    
    // Metodă pentru a actualiza token-ul
    updateToken() {
        this.token = localStorage.getItem('authToken');
        console.log('🔄 Token actualizat:', this.token ? this.token.substring(0, 50) + '...' : 'LIPSĂ');
    }

    /**
     * Request generic către API
     */
    async request(endpoint, options = {}) {
        // Actualizează token-ul la fiecare request
        this.token = localStorage.getItem('authToken');
        
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Accept-Language': localStorage.getItem('language') || 'ro',
            ...options.headers
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
            console.log('🔑 Request cu token:', this.token.substring(0, 30) + '...');
        } else {
            console.warn('⚠️ Request FĂRĂ token!');
        }

        const url = `${this.baseURL}${endpoint}`;
        console.log(`📤 API Request: ${options.method || 'GET'} ${url}`);

        try {
            const response = await fetch(url, {
                ...options,
                headers
            });

            const data = await response.json();
            console.log(`📥 API Response:`, data);

            if (!response.ok) {
                // Gestionare erori mai detaliată
                let errorMessage = data.message || 'Eroare necunoscută';
                
                if (response.status === 401) {
                    console.warn('⚠️ Eroare 401 - Token invalid sau expirat');
                    // Șterge token-ul invalid automat
                    this.token = null;
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('currentUser');
                    console.log('🗑️ Token invalid șters automat');
                    errorMessage = data.message || 'Sesiunea ta a expirat. Te rugăm să te autentifici din nou.';
                } else if (response.status === 403) {
                    errorMessage = 'Nu ai permisiunea să accesezi această resursă.';
                } else if (response.status === 404) {
                    errorMessage = 'Resursa solicitată nu a fost găsită.';
                } else if (response.status === 500) {
                    errorMessage = 'Eroare server. Te rugăm să încerci din nou.';
                }
                
                throw new Error(errorMessage);
            }

            return data;
        } catch (error) {
            console.error('❌ API Error:', error);
            
            // Îmbunătățește mesajul de eroare
            if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
                throw new Error('Nu se poate conecta la server. Verifică dacă backend-ul este pornit.');
            }
            
            throw error;
        }
    }

    // ============================================
    // AUTENTIFICARE
    // ============================================

    async register(userData) {
        const data = await this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
        
        if (data.data.token) {
            this.token = data.data.token;
            localStorage.setItem('authToken', this.token);
        }
        
        return data;
    }

    async login(email, password) {
        const data = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        
        if (data.data && data.data.token) {
            this.token = data.data.token;
            localStorage.setItem('authToken', this.token);
            console.log('✅ Token actualizat în API Client:', this.token.substring(0, 50) + '...');
        }
        
        if (data.data && data.data.user) {
            localStorage.setItem('currentUser', JSON.stringify(data.data.user));
        }
        
        return data;
    }

    async logout() {
        await this.request('/auth/logout', { method: 'POST' });
        this.token = null;
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
    }

    async forgotPassword(email) {
        return this.request('/auth/forgot-password', {
            method: 'POST',
            body: JSON.stringify({ email })
        });
    }

    async resetPassword(token, email, password, passwordConfirmation) {
        return this.request('/auth/reset-password', {
            method: 'POST',
            body: JSON.stringify({
                token,
                email,
                password,
                password_confirmation: passwordConfirmation
            })
        });
    }

    // ============================================
    // UTILIZATOR
    // ============================================

    async getProfile() {
        const data = await this.request('/user/profile');
        localStorage.setItem('currentUser', JSON.stringify(data.data));
        return data;
    }

    async updateProfile(profileData) {
        const data = await this.request('/user/profile', {
            method: 'PUT',
            body: JSON.stringify(profileData)
        });
        
        if (data.data) {
            localStorage.setItem('currentUser', JSON.stringify(data.data));
        }
        
        return data;
    }

    async updateAvatar(base64Image) {
        const data = await this.request('/user/avatar', {
            method: 'PUT',
            body: JSON.stringify({
                avatar: base64Image
            })
        });
        
        if (data.data) {
            localStorage.setItem('currentUser', JSON.stringify(data.data));
        }
        
        return data;
    }

    async changePassword(currentPassword, newPassword, newPasswordConfirmation) {
        return this.request('/user/password', {
            method: 'PUT',
            body: JSON.stringify({
                current_password: currentPassword,
                new_password: newPassword,
                new_password_confirmation: newPasswordConfirmation
            })
        });
    }

    // ============================================
    // COMENZI
    // ============================================

    async getOrders() {
        return this.request('/user/orders');
    }

    async getOrder(orderId) {
        return this.request(`/user/orders/${orderId}`);
    }

    async getOrderDetails(orderId) {
        return this.request(`/user/orders/${orderId}`);
    }

    async createOrder(orderData) {
        console.log('📦 createOrder apelat cu date:', orderData);
        console.log('🔑 Token curent:', this.token ? this.token.substring(0, 30) + '...' : 'LIPSĂ');
        
        // Forțează actualizarea token-ului
        this.updateToken();
        console.log('🔄 Token după actualizare:', this.token ? this.token.substring(0, 30) + '...' : 'LIPSĂ');
        
        if (!this.token) {
            throw new Error('Token de autentificare lipsă. Te rugăm să te autentifici.');
        }
        
        return this.request('/orders/create', {
            method: 'POST',
            body: JSON.stringify(orderData)
        });
    }

    // ============================================
    // SETĂRI
    // ============================================

    async getSettings() {
        return this.request('/user/settings');
    }

    async updateSettings(settings) {
        return this.request('/user/settings', {
            method: 'PUT',
            body: JSON.stringify(settings)
        });
    }

    // ============================================
    // SUPORT
    // ============================================

    async sendSupportMessage(messageData) {
        return this.request('/support/message', {
            method: 'POST',
            body: JSON.stringify(messageData)
        });
    }

    // ============================================
    // CONTACT FORM
    // ============================================

    async sendContactMessage(contactData) {
        return this.request('/contact/message', {
            method: 'POST',
            body: JSON.stringify(contactData)
        });
    }

    // ============================================
    // NOTIFICĂRI
    // ============================================

    async getNotifications() {
        return this.request('/notifications');
    }

    async markNotificationAsRead(notificationId) {
        return this.request(`/notifications/${notificationId}/read`, {
            method: 'PUT'
        });
    }

    // ============================================
    // ADRESE DE LIVRARE
    // ============================================

    async getShippingAddresses() {
        return this.request('/shipping-addresses');
    }

    async addShippingAddress(addressData) {
        return this.request('/shipping-addresses', {
            method: 'POST',
            body: JSON.stringify(addressData)
        });
    }

    async updateShippingAddress(addressId, addressData) {
        return this.request(`/shipping-addresses/${addressId}`, {
            method: 'PUT',
            body: JSON.stringify(addressData)
        });
    }

    async deleteShippingAddress(addressId) {
        return this.request(`/shipping-addresses/${addressId}`, {
            method: 'DELETE'
        });
    }
}

// Export global
window.API = new APIClient();

console.log('✅ API Client ready!');
console.log('📡 Base URL:', window.API.baseURL);

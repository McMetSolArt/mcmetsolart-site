/**
 * CONFIGURARE API PENTRU PRODUCȚIE
 * MC MetSolArt - Deployment pe Server
 * 
 * Acest fișier configurează automat URL-ul API-ului în funcție de mediu:
 * - Development: http://localhost:5000/api
 * - Production: URL-ul serverului tău
 */

(function() {
    'use strict';

    console.log('%c🌐 CONFIGURARE API PRODUCȚIE', 'color: #10b981; font-size: 16px; font-weight: bold;');

    // Detectează mediul automat
    const isLocalhost = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' ||
                       window.location.hostname === '';

    // Configurare URL-uri
    const API_URLS = {
        // Development local
        development: 'http://localhost:5000/api',
        
        // Production - backend-ul servește și frontend-ul
        // Când backend-ul Flask servește frontend-ul, API-ul este pe același domeniu
        production: `${window.location.protocol}//${window.location.host}/api`
    };

    // Selectează URL-ul corect
    const API_BASE_URL = isLocalhost ? API_URLS.development : API_URLS.production;

    // Configurare globală
    window.API_CONFIG = {
        BASE_URL: API_BASE_URL,
        ENDPOINTS: {
            // Autentificare
            REGISTER: '/auth/register',
            LOGIN: '/auth/login',
            LOGOUT: '/auth/logout',
            FORGOT_PASSWORD: '/auth/forgot-password',
            RESET_PASSWORD: '/auth/reset-password',
            
            // Utilizator
            PROFILE: '/user/profile',
            UPDATE_PROFILE: '/user/profile',
            UPDATE_AVATAR: '/user/avatar',
            CHANGE_PASSWORD: '/user/password',
            
            // Comenzi
            ORDERS: '/user/orders',
            ORDER_DETAILS: '/orders',
            CREATE_ORDER: '/orders/create',
            
            // Setări
            SETTINGS: '/user/settings',
            
            // Suport
            SUPPORT_MESSAGE: '/support/message',
            
            // Notificări
            NOTIFICATIONS: '/notifications',
            MARK_NOTIFICATION_READ: '/notifications',
            
            // Adrese
            SHIPPING_ADDRESSES: '/shipping-addresses',
            
            // Health check
            HEALTH: '/health'
        },
        
        // Timeout pentru request-uri (30 secunde)
        TIMEOUT: 30000,
        
        // Retry logic
        MAX_RETRIES: 3,
        RETRY_DELAY: 1000
    };

    // Helper pentru a construi URL-uri complete
    window.getApiUrl = function(endpoint) {
        if (endpoint.startsWith('http')) {
            return endpoint;
        }
        
        const cleanEndpoint = endpoint.startsWith('/') ? endpoint : '/' + endpoint;
        return API_BASE_URL + cleanEndpoint;
    };

    // Test conexiune la backend
    async function testBackendConnection() {
        try {
            const response = await fetch(getApiUrl('/health'), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log('✅ Backend conectat:', data);
                console.log('📡 API URL:', API_BASE_URL);
                return true;
            } else {
                console.warn('⚠️ Backend răspunde dar cu eroare:', response.status);
                return false;
            }
        } catch (error) {
            console.error('❌ Nu se poate conecta la backend:', error.message);
            console.log('🔍 Verifică dacă backend-ul rulează pe:', API_BASE_URL);
            return false;
        }
    }

    // Testează conexiunea la încărcarea paginii
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(testBackendConnection, 1000);
        });
    } else {
        setTimeout(testBackendConnection, 1000);
    }

    // Actualizează API Client existent dacă există
    if (window.API) {
        window.API.baseURL = API_BASE_URL;
        console.log('🔄 API Client actualizat cu URL:', API_BASE_URL);
    }

    console.log('✅ Configurare API gata!');
    console.log('🌍 Mediu:', isLocalhost ? 'Development' : 'Production');
    console.log('📡 API URL:', API_BASE_URL);

})();

// js/config.js
// Centralized configuration for API backend URL
// Allows easy switching between development and production environments

(function() {
    'use strict';

    // Determine API base URL based on environment
    // Priority: 1. window.__API_BASE_URL__ (explicit override), 2. config, 3. smart defaults
    
    let apiBaseUrl;

    if (window.__API_BASE_URL__ && window.__API_BASE_URL__.trim()) {
        // Explicit override takes priority
        apiBaseUrl = window.__API_BASE_URL__.trim();
    } else if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        // Local development
        apiBaseUrl = 'http://localhost:5000/api';
    } else {
        // Production: use Render URL (or same-origin /api as fallback)
        apiBaseUrl = 'https://mcmetsolart-site-5.onrender.com/api';
    }

    // Expose configuration globally
    window.CONFIG = {
        API_BASE_URL: apiBaseUrl,
        API_HEALTH_ENDPOINT: apiBaseUrl + '/health',
        API_AUTH_ENDPOINT: apiBaseUrl + '/auth'
    };

    // Log for debugging
    console.log('⚙️ CONFIG loaded:', {
        API_BASE_URL: window.CONFIG.API_BASE_URL,
        hostname: location.hostname,
        protocol: location.protocol
    });

    // Optional: Add a helper to construct API endpoints
    window.API_ENDPOINT = function(path) {
        if (path.startsWith('/')) {
            return window.CONFIG.API_BASE_URL + path;
        }
        return window.CONFIG.API_BASE_URL + '/' + path;
    };

    console.log('✅ Configuration system ready');
})();

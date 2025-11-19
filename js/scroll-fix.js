// ============================================
// SCROLL FIX - Simplu ca pe Instagram/Facebook
// ============================================

(function() {
    'use strict';
    
    console.log('📱 Scroll Fix - Loading...');
    
    // Smooth scroll pentru link-uri
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;
        
        const href = link.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
            history.pushState(null, null, href);
        }
    });
    
    console.log('✅ Scroll Fix ready!');
})();

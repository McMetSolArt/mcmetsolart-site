/**
 * AUTO-HIDE HEADER
 * Ascunde header-ul când scrollezi în jos, îl arată când scrollezi în sus
 */

(function() {
    'use strict';
    
    console.log('🔄 Inițializare Auto-Hide Header...');
    
    let lastScrollTop = 0;
    const scrollThreshold = 10; // Pixeli minim pentru a detecta scroll
    let ticking = false;
    
    const header = document.querySelector('.header-main');
    
    if (!header) {
        console.warn('⚠️ Header nu a fost găsit pentru auto-hide');
        return;
    }
    
    // Funcție pentru a gestiona scroll-ul
    function handleScroll() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Ignoră scroll-uri foarte mici
        if (Math.abs(currentScrollTop - lastScrollTop) < scrollThreshold) {
            return;
        }
        
        // Dacă suntem la top (primii 50px), arată header-ul mereu
        if (currentScrollTop <= 50) {
            header.classList.remove('header-hidden');
            header.classList.add('header-visible');
        }
        // Scroll în jos - ascunde header
        else if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
            header.classList.add('header-hidden');
            header.classList.remove('header-visible');
        }
        // Scroll în sus - arată header
        else if (currentScrollTop < lastScrollTop) {
            header.classList.remove('header-hidden');
            header.classList.add('header-visible');
        }
        
        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    }
    
    // Optimizare cu requestAnimationFrame
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Ascultă scroll cu passive pentru performanță
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Inițializare - arată header-ul la început
    header.classList.add('header-visible');
    header.classList.remove('header-hidden');
    
    console.log('✅ Auto-hide header inițializat cu succes!');
})();

/**
 * MOBILE SIDEBAR FIX
 * Asigură că butonul de închidere funcționează pe mobile
 * ȘI că sidebar-ul NU se deschide automat
 */

(function() {
    'use strict';
    
    console.log('📱 Mobile Sidebar Fix - Inițializare');
    
    // FORȚEAZĂ închiderea sidebar-ului la încărcarea paginii
    function forceHideSidebarOnLoad() {
        const loginSidebar = document.getElementById('loginSidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        
        if (loginSidebar) {
            loginSidebar.classList.remove('active', 'expanding', 'full-page');
            loginSidebar.style.display = 'none'; // Forțează ascundere
            setTimeout(() => {
                loginSidebar.style.display = ''; // Resetează după 100ms
            }, 100);
        }
        
        if (sidebarOverlay) {
            sidebarOverlay.classList.remove('active');
        }
        
        document.documentElement.classList.remove('no-scroll');
        document.body.classList.remove('no-scroll');
        
        console.log('✅ Sidebar forțat ascuns la încărcare');
    }
    
    // Rulează IMEDIAT
    forceHideSidebarOnLoad();
    
    function initMobileSidebarFix() {
        const sidebarClose = document.getElementById('sidebarClose');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        const loginSidebar = document.getElementById('loginSidebar');
        
        if (!sidebarClose || !loginSidebar) {
            console.warn('⚠️ Sidebar elements nu au fost găsite');
            return;
        }
        
        // Funcție de închidere forțată
        function forceCloseSidebar(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            console.log('🔴 Închidere forțată sidebar');
            
            // Elimină toate clasele active
            if (loginSidebar) {
                loginSidebar.classList.remove('active', 'expanding', 'full-page');
            }
            
            if (sidebarOverlay) {
                sidebarOverlay.classList.remove('active');
            }
            
            // Permite scroll
            document.documentElement.classList.remove('no-scroll');
            document.body.classList.remove('no-scroll');
            
            // Trigger event pentru alte scripturi
            window.dispatchEvent(new CustomEvent('sidebarClosed'));
        }
        
        // Adaugă event listener pe butonul close (cu priority)
        sidebarClose.addEventListener('click', forceCloseSidebar, true);
        sidebarClose.addEventListener('touchend', forceCloseSidebar, true);
        
        // Adaugă event listener pe overlay
        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', forceCloseSidebar);
            sidebarOverlay.addEventListener('touchend', forceCloseSidebar);
        }
        
        // Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && loginSidebar.classList.contains('active')) {
                forceCloseSidebar(e);
            }
        });
        
        // Swipe down pentru închidere pe mobile
        let touchStartY = 0;
        let touchEndY = 0;
        
        if (loginSidebar) {
            loginSidebar.addEventListener('touchstart', function(e) {
                touchStartY = e.changedTouches[0].screenY;
            }, { passive: true });
            
            loginSidebar.addEventListener('touchend', function(e) {
                touchEndY = e.changedTouches[0].screenY;
                handleSwipe();
            }, { passive: true });
        }
        
        function handleSwipe() {
            // Swipe down (de sus în jos) pentru a închide
            if (touchEndY > touchStartY + 100) {
                console.log('👆 Swipe down detectat - închidere sidebar');
                forceCloseSidebar();
            }
        }
        
        console.log('✅ Mobile Sidebar Fix - Inițializat cu succes');
    }
    
    // Inițializare la încărcarea paginii
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileSidebarFix);
    } else {
        initMobileSidebarFix();
    }
    
    // Re-inițializare după ce alte scripturi se încarcă
    window.addEventListener('load', function() {
        setTimeout(initMobileSidebarFix, 1000);
    });
    
})();

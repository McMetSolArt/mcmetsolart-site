// Fix pentru sidebar pe mobile - se asigura ca butonul X merge si ca nu se deschide singur

(function() {
    'use strict';
    
    console.log('Mobile Sidebar Fix - pornit');
    
    // Ascunde sidebar-ul cand se incarca pagina
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
        
        console.log('Sidebar ascuns la incarcare');
    }
    
    // Ruleaza imediat
    forceHideSidebarOnLoad();
    
    function initMobileSidebarFix() {
        const sidebarClose = document.getElementById('sidebarClose');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        const loginSidebar = document.getElementById('loginSidebar');
        
        if (!sidebarClose || !loginSidebar) {
            console.warn('Nu am gasit elementele sidebar');
            return;
        }
        
        // Inchide sidebar-ul fortat
        function forceCloseSidebar(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            console.log('Inchid sidebar fortat');
            
            // Scoate toate clasele active
            if (loginSidebar) {
                loginSidebar.classList.remove('active', 'expanding', 'full-page');
            }
            
            if (sidebarOverlay) {
                sidebarOverlay.classList.remove('active');
            }
            
            // Permite scroll
            document.documentElement.classList.remove('no-scroll');
            document.body.classList.remove('no-scroll');
            
            // Trimite event ca s-a inchis
            window.dispatchEvent(new CustomEvent('sidebarClosed'));
        }
        
        // Pune listener pe butonul X
        sidebarClose.addEventListener('click', forceCloseSidebar, true);
        sidebarClose.addEventListener('touchend', forceCloseSidebar, true);
        
        // Si pe overlay
        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', forceCloseSidebar);
            sidebarOverlay.addEventListener('touchend', forceCloseSidebar);
        }
        
        // Escape inchide sidebar-ul
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && loginSidebar.classList.contains('active')) {
                forceCloseSidebar(e);
            }
        });
        
        // Swipe in jos inchide sidebar-ul
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
            // Daca dai swipe in jos, inchide
            if (touchEndY > touchStartY + 100) {
                console.log('Swipe in jos - inchid sidebar');
                forceCloseSidebar();
            }
        }
        
        console.log('Mobile Sidebar Fix - gata');
    }
    
    // Porneste cand se incarca pagina
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileSidebarFix);
    } else {
        initMobileSidebarFix();
    }
    
    // Mai ruleaza o data dupa ce s-au incarcat toate scripturile
    window.addEventListener('load', function() {
        setTimeout(initMobileSidebarFix, 1000);
    });
    
})();

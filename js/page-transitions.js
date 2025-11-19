/**
 * PAGE TRANSITIONS - MC MetSolArt
 * Gestionează tranziții smooth între pagini
 */

(function() {
    'use strict';

    console.log('%c🎬 PAGE TRANSITIONS', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');

    // Creează overlay-ul de tranziție
    createTransitionOverlay();

    // Interceptează toate link-urile pentru tranziții smooth
    initPageTransitions();

    // Ascunde overlay-ul când pagina se încarcă
    window.addEventListener('load', function() {
        hideTransitionOverlay();
    });

    // ==========================================
    // CREEAZĂ OVERLAY-UL DE TRANZIȚIE
    // ==========================================
    
    function createTransitionOverlay() {
        // Verifică dacă overlay-ul există deja
        if (document.getElementById('pageTransitionOverlay')) {
            return;
        }

        const overlay = document.createElement('div');
        overlay.id = 'pageTransitionOverlay';
        overlay.className = 'page-transition-overlay';
        
        overlay.innerHTML = `
            <div class="transition-content">
                <img src="Logo.png" alt="MC MetSolArt" class="transition-logo">
                <div class="transition-spinner"></div>
                <p class="transition-text">Se încarcă...</p>
            </div>
        `;
        
        document.body.appendChild(overlay);
    }

    // ==========================================
    // INIȚIALIZEAZĂ TRANZIȚII
    // ==========================================
    
    function initPageTransitions() {
        // Interceptează click-uri pe link-uri interne
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a');
            
            // Verifică dacă e un link valid pentru tranziție
            if (!link) return;
            if (link.target === '_blank') return;
            if (link.href.startsWith('mailto:')) return;
            if (link.href.startsWith('tel:')) return;
            if (link.href.includes('#') && !link.href.includes('.html')) return;
            
            const href = link.getAttribute('href');
            
            // Verifică dacă e link către altă pagină HTML
            if (href && (href.endsWith('.html') || href === 'index.html' || href.includes('contul meu'))) {
                e.preventDefault();
                navigateWithTransition(link.href);
            }
        });

        // Interceptează navigarea înapoi/înainte
        window.addEventListener('popstate', function() {
            showTransitionOverlay();
            setTimeout(() => {
                window.location.reload();
            }, 300);
        });
    }

    // ==========================================
    // NAVIGHEAZĂ CU TRANZIȚIE
    // ==========================================
    
    function navigateWithTransition(url) {
        console.log('🔄 Tranziție premium către:', url);
        
        // Arată overlay-ul
        showTransitionOverlay();
        
        // Așteaptă animația smooth și navighează
        setTimeout(() => {
            window.location.href = url;
        }, 600);
    }

    // ==========================================
    // ARATĂ OVERLAY-UL
    // ==========================================
    
    function showTransitionOverlay() {
        const overlay = document.getElementById('pageTransitionOverlay');
        if (overlay) {
            overlay.classList.add('active');
            document.body.classList.add('page-loading');
        }
    }

    // ==========================================
    // ASCUNDE OVERLAY-UL
    // ==========================================
    
    function hideTransitionOverlay() {
        const overlay = document.getElementById('pageTransitionOverlay');
        if (overlay) {
            setTimeout(() => {
                overlay.classList.remove('active');
                document.body.classList.remove('page-loading');
            }, 200);
        }
    }

    // ==========================================
    // EXPORT PENTRU DEBUGGING
    // ==========================================
    
    window.PageTransitions = {
        show: showTransitionOverlay,
        hide: hideTransitionOverlay,
        navigate: navigateWithTransition
    };

    console.log('✅ Tranziții de pagină activate!');

})();

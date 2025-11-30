/**
 * FIX VIZIBILITATE PANOU CONT
 * Asigură că panoul de cont este ascuns implicit și se deschide doar când este necesar
 */

(function() {
    'use strict';
    
    console.log('🔧 Fix vizibilitate panou cont...');
    
    // Așteaptă ca DOM-ul să fie gata
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFix);
    } else {
        initFix();
    }
    
    function initFix() {
        // Găsește toate variantele de panouri de cont
        const panels = [
            document.getElementById('accountPanel'),
            document.querySelector('.account-panel'),
            document.querySelector('.account-panel-redesign'),
            document.querySelector('.account-panel-ultra')
        ].filter(Boolean);
        
        const overlays = [
            document.getElementById('accountPanelOverlay'),
            document.querySelector('.account-panel-overlay'),
            document.querySelector('.account-overlay-redesign'),
            document.querySelector('.account-overlay-ultra')
        ].filter(Boolean);
        
        // Ascunde toate panelurile și overlay-urile
        panels.forEach(panel => {
            panel.style.visibility = 'hidden';
            panel.style.opacity = '0';
            panel.style.pointerEvents = 'none';
            panel.classList.remove('active');
            console.log('✅ Panou ascuns:', panel.className);
        });
        
        overlays.forEach(overlay => {
            overlay.style.visibility = 'hidden';
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
            overlay.classList.remove('active');
            console.log('✅ Overlay ascuns:', overlay.className);
        });
        
        console.log('✅ Fix vizibilitate panou cont aplicat!');
        console.log(`📊 Panouri ascunse: ${panels.length}`);
        console.log(`📊 Overlay-uri ascunse: ${overlays.length}`);
    }
    
    // Monitorizează dacă panelul devine vizibil accidental
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.classList.contains('account-panel') || 
                    target.classList.contains('account-panel-redesign') ||
                    target.classList.contains('account-panel-ultra')) {
                    
                    // Dacă panelul nu are clasa 'active', asigură-te că este ascuns
                    if (!target.classList.contains('active')) {
                        target.style.visibility = 'hidden';
                        target.style.opacity = '0';
                        target.style.pointerEvents = 'none';
                    }
                }
            }
        });
    });
    
    // Observă modificările pe body
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class'],
        subtree: true
    });
    
})();

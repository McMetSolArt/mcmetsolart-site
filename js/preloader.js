/**
 * PRELOADER PROFESIONAL CU LOGO MC
 * Gestionează încărcarea paginii și animația de tranziție
 */

(function() {
    'use strict';
    
    // Configurare
    const CONFIG = {
        minDisplayTime: 1000,      // Timp minim de afișare (ms)
        transitionDuration: 800,   // Durată animație tranziție (ms)
        fadeOutDuration: 500       // Durată fade out final (ms)
    };
    
    let startTime = Date.now();
    let isPageLoaded = false;
    let isPreloaderHidden = false;
    
    /**
     * Inițializare preloader
     */
    function initPreloader() {
        // Previne scroll în timpul încărcării
        document.body.style.overflow = 'hidden';
        
        // Ascultă evenimentul de încărcare completă
        if (document.readyState === 'complete') {
            onPageLoad();
        } else {
            window.addEventListener('load', onPageLoad);
        }
        
        // Fallback - ascunde preloader-ul după 5 secunde oricum
        setTimeout(() => {
            if (!isPreloaderHidden) {
                console.warn('Preloader timeout - forțare ascundere');
                hidePreloader();
            }
        }, 5000);
    }
    
    /**
     * Callback când pagina e complet încărcată
     */
    function onPageLoad() {
        isPageLoaded = true;
        
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, CONFIG.minDisplayTime - elapsedTime);
        
        // Așteaptă timpul minim de afișare
        setTimeout(() => {
            hidePreloader();
        }, remainingTime);
    }
    
    /**
     * Ascunde preloader-ul cu animație
     */
    function hidePreloader() {
        if (isPreloaderHidden) return;
        isPreloaderHidden = true;
        
        const preloader = document.getElementById('preloader');
        if (!preloader) return;
        
        // Permite scroll
        document.body.style.overflow = '';
        
        // Animație de tranziție către navbar
        preloader.classList.add('transitioning');
        
        // După animația de tranziție, fade out complet
        setTimeout(() => {
            preloader.classList.add('loaded');
            
            // Elimină complet din DOM după fade out
            setTimeout(() => {
                if (preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
            }, CONFIG.fadeOutDuration);
            
        }, CONFIG.transitionDuration);
        
        // Trigger event personalizat pentru alte scripturi
        window.dispatchEvent(new CustomEvent('preloaderHidden'));
    }
    
    /**
     * Actualizează textul de încărcare (opțional)
     */
    function updateLoadingText(text) {
        const textElement = document.querySelector('.preloader-text');
        if (textElement) {
            const dotsSpan = textElement.querySelector('.loading-dots');
            if (dotsSpan) {
                textElement.childNodes[0].textContent = text + ' ';
            } else {
                textElement.textContent = text;
            }
        }
    }
    
    /**
     * Actualizează progresul (opțional)
     */
    function updateProgress(percent) {
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = percent + '%';
            progressBar.style.animation = 'none';
        }
    }
    
    // Inițializare la încărcarea scriptului
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPreloader);
    } else {
        initPreloader();
    }
    
    // Export funcții pentru uz extern (opțional)
    window.PreloaderAPI = {
        updateText: updateLoadingText,
        updateProgress: updateProgress,
        hide: hidePreloader
    };
    
})();

/**
 * INTEGRARE CU BACKEND
 * Monitorizează conexiunea la backend și actualizează statusul
 */
(function() {
    'use strict';
    
    // Verifică dacă backend-ul e disponibil
    async function checkBackendStatus() {
        try {
            const response = await fetch('/api/health', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                },
                timeout: 3000
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log('✅ Backend conectat:', data);
                
                if (window.PreloaderAPI) {
                    window.PreloaderAPI.updateText('Conectat');
                    window.PreloaderAPI.updateProgress(100);
                }
            } else {
                console.warn('⚠️ Backend răspunde cu eroare:', response.status);
            }
        } catch (error) {
            console.warn('⚠️ Backend nu răspunde:', error.message);
            // Nu blocăm încărcarea paginii dacă backend-ul nu răspunde
        }
    }
    
    // Verifică backend-ul după ce DOM-ul e gata
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(checkBackendStatus, 500);
        });
    } else {
        setTimeout(checkBackendStatus, 500);
    }
    
})();

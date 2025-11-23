// Preloader cu logo si animatie
// Se ocupa de ecranul de incarcare

(function() {
    'use strict';
    
    // Setari
    const CONFIG = {
        minDisplayTime: 1000,      // Cat sta minim pe ecran (ms)
        transitionDuration: 800,   // Cat dureaza animatia (ms)
        fadeOutDuration: 500       // Cat dureaza sa dispara (ms)
    };
    
    let startTime = Date.now();
    let isPageLoaded = false;
    let isPreloaderHidden = false;
    
    // Porneste preloader-ul
    function initPreloader() {
        // Blocheaza scroll-ul cat se incarca
        document.body.style.overflow = 'hidden';
        
        // Asteapta sa se incarce tot
        if (document.readyState === 'complete') {
            onPageLoad();
        } else {
            window.addEventListener('load', onPageLoad);
        }
        
        // Daca dureaza prea mult, il ascunde oricum dupa 5 secunde
        setTimeout(() => {
            if (!isPreloaderHidden) {
                console.warn('Preloader timeout - il ascund fortat');
                hidePreloader();
            }
        }, 5000);
    }
    
    // Cand s-a incarcat tot
    function onPageLoad() {
        isPageLoaded = true;
        
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, CONFIG.minDisplayTime - elapsedTime);
        
        // Asteapta timpul minim
        setTimeout(() => {
            hidePreloader();
        }, remainingTime);
    }
    
    // Ascunde preloader-ul
    function hidePreloader() {
        if (isPreloaderHidden) return;
        isPreloaderHidden = true;
        
        const preloader = document.getElementById('preloader');
        if (!preloader) return;
        
        // Permite scroll din nou
        document.body.style.overflow = '';
        
        // Animatie de tranzitie
        preloader.classList.add('transitioning');
        
        // Dupa animatie, il scoate complet
        setTimeout(() => {
            preloader.classList.add('loaded');
            
            // Il sterge din pagina
            setTimeout(() => {
                if (preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
            }, CONFIG.fadeOutDuration);
            
        }, CONFIG.transitionDuration);
        
        // Trimite event ca s-a ascuns
        window.dispatchEvent(new CustomEvent('preloaderHidden'));
    }
    
    // Schimba textul (optional)
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
    
    // Actualizeaza progresul (optional)
    function updateProgress(percent) {
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = percent + '%';
            progressBar.style.animation = 'none';
        }
    }
    
    // Porneste cand se incarca scriptul
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPreloader);
    } else {
        initPreloader();
    }
    
    // API pentru alte scripturi
    window.PreloaderAPI = {
        updateText: updateLoadingText,
        updateProgress: updateProgress,
        hide: hidePreloader
    };
    
})();

// Verifica daca backend-ul merge
(function() {
    'use strict';
    
    // Verifica statusul backend-ului
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
                console.log('Backend conectat:', data);
                
                if (window.PreloaderAPI) {
                    window.PreloaderAPI.updateText('Conectat');
                    window.PreloaderAPI.updateProgress(100);
                }
            } else {
                console.warn('Backend raspunde cu eroare:', response.status);
            }
        } catch (error) {
            console.warn('Backend nu raspunde:', error.message);
            // Nu blocam pagina daca backend-ul nu merge
        }
    }
    
    // Verifica backend-ul dupa ce s-a incarcat pagina
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(checkBackendStatus, 500);
        });
    } else {
        setTimeout(checkBackendStatus, 500);
    }
    
})();

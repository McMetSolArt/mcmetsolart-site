// ============================================
// DEVICE DETECTION & ADAPTIVE BEHAVIOR
// Detectează tipul de dispozitiv și adaptează site-ul
// ============================================

(function() {
    'use strict';
    
    console.log('📱 Device Detection - Loading...');
    
    // Detectare tip dispozitiv
    const deviceDetection = {
        // User Agent
        userAgent: navigator.userAgent.toLowerCase(),
        
        // Dimensiuni ecran
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        
        // Detectare mobile
        isMobile: function() {
            return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(this.userAgent) ||
                   (this.screenWidth <= 767);
        },
        
        // Detectare tablet
        isTablet: function() {
            return (/ipad|android|tablet/i.test(this.userAgent) && !/mobile/i.test(this.userAgent)) ||
                   (this.screenWidth >= 768 && this.screenWidth <= 1024);
        },
        
        // Detectare desktop
        isDesktop: function() {
            return !this.isMobile() && !this.isTablet();
        },
        
        // Detectare iOS
        isIOS: function() {
            return /iphone|ipad|ipod/i.test(this.userAgent);
        },
        
        // Detectare Android
        isAndroid: function() {
            return /android/i.test(this.userAgent);
        },
        
        // Detectare touch
        isTouch: function() {
            return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        },
        
        // Detectare orientare
        isLandscape: function() {
            return window.innerWidth > window.innerHeight;
        },
        
        isPortrait: function() {
            return window.innerHeight > window.innerWidth;
        },
        
        // Obține tipul de dispozitiv
        getDeviceType: function() {
            if (this.isMobile()) return 'mobile';
            if (this.isTablet()) return 'tablet';
            return 'desktop';
        },
        
        // Obține OS
        getOS: function() {
            if (this.isIOS()) return 'ios';
            if (this.isAndroid()) return 'android';
            if (/windows/i.test(this.userAgent)) return 'windows';
            if (/mac/i.test(this.userAgent)) return 'macos';
            if (/linux/i.test(this.userAgent)) return 'linux';
            return 'unknown';
        }
    };
    
    // Aplică clase pe body în funcție de dispozitiv
    function applyDeviceClasses() {
        const body = document.body;
        const deviceType = deviceDetection.getDeviceType();
        const os = deviceDetection.getOS();
        
        // Adaugă clase pentru tip dispozitiv
        body.classList.add(`device-${deviceType}`);
        body.classList.add(`os-${os}`);
        
        // Adaugă clasă pentru touch
        if (deviceDetection.isTouch()) {
            body.classList.add('touch-device');
        } else {
            body.classList.add('no-touch');
        }
        
        // Adaugă clasă pentru orientare
        if (deviceDetection.isLandscape()) {
            body.classList.add('landscape');
            body.classList.remove('portrait');
        } else {
            body.classList.add('portrait');
            body.classList.remove('landscape');
        }
        
        console.log(`📱 Device: ${deviceType} | OS: ${os} | Touch: ${deviceDetection.isTouch()}`);
    }
    
    // Adaptează comportamentul în funcție de dispozitiv
    function adaptBehavior() {
        const deviceType = deviceDetection.getDeviceType();
        
        // Mobile specific
        if (deviceType === 'mobile' || deviceType === 'tablet') {
            // Previne zoom dublu-tap pe iOS (păstrează single tap)
            let lastTouchEnd = 0;
            document.addEventListener('touchend', function(event) {
                const now = Date.now();
                if (now - lastTouchEnd <= 300) {
                    event.preventDefault();
                }
                lastTouchEnd = now;
            }, false);
            
            // Scroll natural și fluid ca pe Instagram
            document.documentElement.style.scrollBehavior = 'smooth';
            document.body.style.webkitOverflowScrolling = 'touch';
            document.body.style.overscrollBehaviorY = 'contain';
            
            // Momentum scrolling pentru iOS
            if (deviceDetection.isIOS()) {
                document.body.style.webkitOverflowScrolling = 'touch';
            }
        }
        
        // Tablet specific
        if (deviceType === 'tablet') {
            // Optimizări pentru tablet
            console.log('📱 Tablet optimizations applied');
        }
        
        // Desktop specific
        if (deviceType === 'desktop') {
            // Activează hover effects doar pe desktop
            document.body.classList.add('hover-enabled');
        }
    }
    
    // Monitorizează schimbarea orientării
    function handleOrientationChange() {
        applyDeviceClasses();
        
        // Reîncarcă anumite componente la schimbarea orientării
        const event = new CustomEvent('orientationChanged', {
            detail: {
                orientation: deviceDetection.isLandscape() ? 'landscape' : 'portrait',
                width: window.innerWidth,
                height: window.innerHeight
            }
        });
        window.dispatchEvent(event);
        
        console.log(`📱 Orientation changed: ${deviceDetection.isLandscape() ? 'landscape' : 'portrait'}`);
    }
    
    // Monitorizează resize
    let resizeTimer;
    function handleResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            deviceDetection.screenWidth = window.innerWidth;
            deviceDetection.screenHeight = window.innerHeight;
            applyDeviceClasses();
            
            const event = new CustomEvent('deviceResized', {
                detail: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    deviceType: deviceDetection.getDeviceType()
                }
            });
            window.dispatchEvent(event);
        }, 250);
    }
    
    // Optimizări pentru performanță pe mobile
    function optimizePerformance() {
        if (deviceDetection.isMobile()) {
            // Reduce animațiile pe mobile pentru performanță
            const style = document.createElement('style');
            style.textContent = `
                @media (max-width: 767px) {
                    * {
                        animation-duration: 0.3s !important;
                        transition-duration: 0.2s !important;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Adaptează viewport pentru iOS
    function adaptViewport() {
        if (deviceDetection.isIOS()) {
            // Fix pentru iOS viewport height
            const setVH = () => {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            };
            
            setVH();
            window.addEventListener('resize', setVH);
            window.addEventListener('orientationchange', setVH);
        }
    }
    
    // Export global pentru acces din alte scripturi
    window.deviceInfo = {
        type: deviceDetection.getDeviceType(),
        os: deviceDetection.getOS(),
        isTouch: deviceDetection.isTouch(),
        isMobile: deviceDetection.isMobile(),
        isTablet: deviceDetection.isTablet(),
        isDesktop: deviceDetection.isDesktop(),
        isLandscape: deviceDetection.isLandscape(),
        isPortrait: deviceDetection.isPortrait()
    };
    
    // Inițializare
    function init() {
        applyDeviceClasses();
        adaptBehavior();
        optimizePerformance();
        adaptViewport();
        
        // Event listeners
        window.addEventListener('orientationchange', handleOrientationChange);
        window.addEventListener('resize', handleResize);
        
        console.log('✅ Device Detection ready!');
        console.log('📊 Device Info:', window.deviceInfo);
    }
    
    // Pornește când DOM-ul este gata
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();

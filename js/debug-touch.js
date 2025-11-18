// js/debug-touch.js
// Lightweight debug helper to diagnose touch / scroll blocking on mobile/tablet.
(function () {
    'use strict';

    function createToolbar() {
        const toolbar = document.createElement('div');
        toolbar.id = 'debugTouchToolbar';
        toolbar.style.position = 'fixed';
        toolbar.style.bottom = '12px';
        toolbar.style.left = '12px';
        toolbar.style.zIndex = 99999;
        toolbar.style.background = 'rgba(0,0,0,0.6)';
        toolbar.style.color = '#fff';
        toolbar.style.padding = '8px 10px';
        toolbar.style.borderRadius = '8px';
        toolbar.style.fontSize = '13px';
        toolbar.style.boxShadow = '0 6px 18px rgba(0,0,0,0.4)';
        toolbar.style.backdropFilter = 'blur(4px)';

        const info = document.createElement('div');
        info.id = 'debugTouchInfo';
        info.textContent = 'Touch debug';
        toolbar.appendChild(info);

        const btn = document.createElement('button');
        btn.textContent = 'Toggle Clear Overlays';
        btn.style.marginLeft = '8px';
        btn.style.padding = '4px 8px';
        btn.style.fontSize = '12px';
        btn.style.border = 'none';
        btn.style.borderRadius = '6px';
        btn.style.background = 'var(--primary, #0ea5e9)';
        btn.style.color = '#fff';
        btn.addEventListener('click', () => {
            clearOverlays();
            updateInfo();
        });
        toolbar.appendChild(btn);

        document.body.appendChild(toolbar);
    }

    function updateInfo() {
        const info = document.getElementById('debugTouchInfo');
        if (!info) return;
        const y = window.scrollY || window.pageYOffset;
        const h = document.documentElement.scrollHeight;
        const vh = window.innerHeight;
        info.textContent = `y:${y} h:${h} vh:${vh}`;
    }

    function clearOverlays() {
        // Remove common overlay/active classes and restore scroll class
        const selectors = [
            '.footer-modal-overlay.active',
            '#sidebarOverlay.active',
            '.user-dropdown-menu.active',
            '#accountPanel.active',
            '.login-sidebar.active',
            '.overlay.active',
            '.modal-overlay.active'
        ];

        selectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                el.classList.remove('active');
                // if overlay has inline styles hide it
                try { el.style.display = 'none'; } catch (e) {}
            });
        });

        // remove any no-scroll flags
        try { document.documentElement.classList.remove('no-scroll'); } catch (e) {}
        try { document.body.classList.remove('no-scroll'); } catch (e) {}

        // remove any full-page sidebar state
        document.querySelectorAll('.login-sidebar, .login-sidebar.full-page, .login-sidebar.expanding').forEach(el => {
            el.classList.remove('active','full-page','expanding');
        });
    }

    function showTouchedElement(e) {
        let touch = e.touches ? e.touches[0] : e;
        if (!touch) return;
        const x = touch.clientX, y = touch.clientY;
        const el = document.elementFromPoint(x,y);
        if (!el) return;

        // outline for brief visual feedback
        const prev = el.style.outline;
        el.style.outline = '3px solid rgba(255,0,0,0.9)';
        setTimeout(() => el.style.outline = prev, 700);

        console.log('DEBUG touch element at', x, y, el);
        // also update toolbar info
        updateInfo();
    }

    function init() {
        if (!('ontouchstart' in window) && !navigator.maxTouchPoints) return;
        // create toolbar and listeners
        createToolbar();
        updateInfo();

        // update info periodically
        setInterval(updateInfo, 800);

        window.addEventListener('touchstart', showTouchedElement, {passive:true});
        window.addEventListener('touchmove', updateInfo, {passive:true});
    }

    // Expose clearOverlays for console use
    window.DEBUG_TOUCH = { clearOverlays };

    // Initialize once DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

/**
 * WINDOW CONTROLLER - Gestionează deschiderea ferestrelor
 * Asigură că doar o fereastră este deschisă la un moment dat
 */

(function () {
    'use strict';

    console.log('🪟 Window Controller - Loading...');

    // Închide TOATE ferestrele deschise
    function closeAllWindows() {
        // 1. Închide hamburger menu (desktop)
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const headerNav = document.getElementById('headerNav');
        if (hamburgerBtn) hamburgerBtn.classList.remove('active');
        if (headerNav) headerNav.classList.remove('active');



        // 3. Închide language dropdown
        const langDropdown = document.querySelector('.language-dropdown');
        if (langDropdown) langDropdown.classList.remove('active');

        // 4. Închide user dropdown
        const userDropdown = document.getElementById('userDropdownMenu');
        if (userDropdown) userDropdown.classList.remove('active');

        // 5. NU închide account panel - se închide singur

        // 6. NU închide login sidebar - se închide singur

        // Restaurează scroll doar dacă nu e deschis un panel major
        const accountPanel = document.getElementById('accountPanel');
        const loginSidebar = document.getElementById('loginSidebar');
        if (!accountPanel?.classList.contains('active') && !loginSidebar?.classList.contains('active')) {
            document.documentElement.classList.remove('no-scroll');
        }
    }

    // Export global
    window.closeAllWindows = closeAllWindows;

    // Așteaptă ca DOM-ul să fie gata
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        console.log('🔧 Setting up window interceptors...');

        // Interceptează click-uri pe butoane
        document.addEventListener('click', handleClicks);

        // ESC key închide tot
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeAllWindows();
            }
        });

        console.log('✅ Window Controller ready!');
    }

    function handleClicks(e) {
        // Hamburger menu button (desktop)
        if (e.target.closest('#hamburgerBtn')) {
            e.stopPropagation();
            const hamburgerBtn = document.getElementById('hamburgerBtn');
            const headerNav = document.getElementById('headerNav');
            const isOpen = headerNav?.classList.contains('active');

            if (!isOpen) {
                closeAllWindows();
                setTimeout(() => {
                    hamburgerBtn?.classList.add('active');
                    headerNav?.classList.add('active');
                }, 10);
            } else {
                closeAllWindows();
            }
            return;
        }



        // Language button
        if (e.target.closest('.language-btn')) {
            e.stopPropagation();
            const langDropdown = document.querySelector('.language-dropdown');
            const isOpen = langDropdown?.classList.contains('active');

            if (!isOpen) {
                closeAllWindows();
                setTimeout(() => {
                    langDropdown?.classList.add('active');
                }, 10);
            } else {
                closeAllWindows();
            }
            return;
        }

        // User avatar button
        if (e.target.closest('.user-avatar-btn')) {
            e.stopPropagation();
            const userDropdown = document.getElementById('userDropdownMenu');
            const isOpen = userDropdown?.classList.contains('active');

            if (!isOpen) {
                closeAllWindows();
                setTimeout(() => {
                    userDropdown?.classList.add('active');
                }, 10);
            } else {
                closeAllWindows();
            }
            return;
        }

        // Click în afara ferestrelor - închide doar dropdown-urile mici
        if (!e.target.closest('.language-dropdown') &&
            !e.target.closest('.user-dropdown-menu') &&
            !e.target.closest('.account-panel') &&
            !e.target.closest('.login-sidebar') &&
            !e.target.closest('.language-btn') &&
            !e.target.closest('.user-avatar-btn')) {
            closeAllWindows();
        }
    }
})();

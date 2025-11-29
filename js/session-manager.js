/**
 * SESSION MANAGER - MC MetSolArt
 * Gestionează sesiunea utilizatorului persistent
 */

(function() {
    'use strict';

    console.log('%c🔐 SESSION MANAGER', 'color: #10b981; font-size: 16px; font-weight: bold;');

    // Verifică sesiunea la încărcarea paginii
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkSession);
    } else {
        checkSession();
    }

    async function checkSession() {
        const currentUser = getCurrentUser();
        const authToken = localStorage.getItem('authToken');
        
        // Verifică dacă suntem pe pagina de cont
        const isAccountPage = window.location.pathname.includes('contul meu');
        
        if (currentUser && authToken) {
            console.log('✅ Utilizator găsit în localStorage:', currentUser.firstName);
            
            // Verifică dacă token-ul este valid pe server (doar dacă API este disponibil)
            if (window.API && window.API.baseURL) {
                try {
                    const response = await fetch(window.API.baseURL + '/user/profile', {
                        headers: {
                            'Authorization': `Bearer ${authToken}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    
                    if (!response.ok && response.status === 401) {
                        console.warn('⚠️ Token invalid (401) - ștergere automată');
                        localStorage.removeItem('authToken');
                        localStorage.removeItem('currentUser');
                        
                        if (isAccountPage) {
                            window.location.href = 'index.html';
                        } else {
                            // Reîncarcă pagina pentru a actualiza UI-ul
                            window.location.reload();
                        }
                        return;
                    }
                    
                    if (response.ok) {
                        console.log('✅ Token valid');
                    }
                } catch (error) {
                    console.warn('⚠️ Nu se poate verifica token-ul (server offline?):', error.message);
                    // Nu ștergem token-ul dacă este o eroare de rețea
                }
            }
            
            if (isAccountPage) {
                // Pe pagina de cont, actualizează UI-ul
                updateAccountPageUI(currentUser);
            } else {
                // Pe pagina principală, actualizează butonul de login
                updateMainPageUI(currentUser);
            }
        } else {
            console.log('❌ Utilizator neautentificat');
            
            if (isAccountPage) {
                // Redirecționează la pagina principală dacă nu e logat
                console.log('🔄 Redirecționare către pagina principală...');
                window.location.href = 'index.html';
            }
        }
        
        // Inițializează logout
        initLogout();
    }

    function getCurrentUser() {
        try {
            const userStr = localStorage.getItem('currentUser');
            return userStr ? JSON.parse(userStr) : null;
        } catch (e) {
            console.error('Eroare la citirea utilizatorului:', e);
            return null;
        }
    }

    function updateMainPageUI(user) {
        const loginBtn = document.getElementById('loginBtn');
        
        if (loginBtn) {
            // Verifică dacă există avatar personalizat în localStorage
            const savedAvatar = localStorage.getItem('userAvatar');
            const avatarUrl = savedAvatar || user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.firstName + '+' + user.lastName)}&background=176f87&color=fff&size=128`;
            
            loginBtn.outerHTML = `
                <div class="user-menu-container">
                    <button class="user-menu-trigger" id="userMenuTrigger" aria-label="Meniu utilizator" aria-expanded="false">
                        <img class="user-avatar-main" 
                             src="${avatarUrl}" 
                             alt="${user.firstName} ${user.lastName}">
                        <span class="user-name-main">
                            ${user.firstName} ${user.lastName}
                        </span>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="user-dropdown-menu" id="userDropdownMenu" role="menu">
                        <button class="user-dropdown-item" onclick="window.AccountPanel.show('dashboard')" role="menuitem">
                            <i class="fas fa-th-large"></i>
                            <span data-text="account.dashboard.title">Dashboard</span>
                        </button>
                        <button class="user-dropdown-item" onclick="window.AccountPanel.show('profile')" role="menuitem">
                            <i class="fas fa-user-circle"></i>
                            <span data-text="account.tab.profile">Profilul meu</span>
                        </button>
                        <button class="user-dropdown-item" onclick="window.AccountPanel.show('orders')" role="menuitem">
                            <i class="fas fa-shopping-bag"></i>
                            <span data-text="account.tab.orders">Comenzile mele</span>
                        </button>
                        <button class="user-dropdown-item" onclick="window.AccountPanel.show('settings')" role="menuitem">
                            <i class="fas fa-cog"></i>
                            <span data-text="account.tab.settings">Setări</span>
                        </button>
                        <div class="user-dropdown-divider"></div>
                        <button class="user-dropdown-item" onclick="window.SessionManager.goToSupport()" role="menuitem">
                            <i class="fas fa-headset"></i>
                            <span data-text="account.tab.support">Suport</span>
                        </button>
                        <button class="user-dropdown-item logout-item" id="logoutBtnMain" role="menuitem">
                            <i class="fas fa-sign-out-alt"></i>
                            <span data-text="account.logout">Deconectare</span>
                        </button>
                    </div>
                </div>
            `;
            
            // Inițializează dropdown-ul
            setTimeout(() => {
                initUserDropdown();
                
                // Aplică traducerile
                if (window.applyTranslations) {
                    window.applyTranslations();
                }
                // After rendering the user menu, notify other scripts (hide badges etc)
                try { document.dispatchEvent(new CustomEvent('userLoggedIn')); } catch (e) {}
            }, 100);
        }
    }
    
    function initUserDropdown() {
        const trigger = document.getElementById('userMenuTrigger');
        const dropdown = document.getElementById('userDropdownMenu');
        const logoutBtn = document.getElementById('logoutBtnMain');
        
        // Ascultă schimbările de limbă
        window.addEventListener('languageChanged', () => {
            if (window.applyTranslations) {
                window.applyTranslations();
            }
        });
        
        if (trigger && dropdown) {
            // Toggle dropdown
            trigger.addEventListener('click', function(e) {
                e.stopPropagation();
                const isActive = dropdown.classList.contains('active');
                
                dropdown.classList.toggle('active');
                trigger.setAttribute('aria-expanded', !isActive);
                
                const icon = trigger.querySelector('.fa-chevron-down');
                if (icon) {
                    icon.style.transform = dropdown.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
                }
            });
            
            // Închide dropdown când se dă click în afară
            document.addEventListener('click', function(e) {
                if (!trigger.contains(e.target) && !dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                    trigger.setAttribute('aria-expanded', 'false');
                    const icon = trigger.querySelector('.fa-chevron-down');
                    if (icon) icon.style.transform = 'rotate(0)';
                }
            });
            
            // Închide dropdown cu ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && dropdown.classList.contains('active')) {
                    dropdown.classList.remove('active');
                    trigger.setAttribute('aria-expanded', 'false');
                    const icon = trigger.querySelector('.fa-chevron-down');
                    if (icon) icon.style.transform = 'rotate(0)';
                    trigger.focus();
                }
            });
            
            // Închide dropdown când se selectează un item
            const dropdownItems = dropdown.querySelectorAll('.user-dropdown-item:not(.logout-item)');
            dropdownItems.forEach(item => {
                item.addEventListener('click', function() {
                    setTimeout(() => {
                        dropdown.classList.remove('active');
                        trigger.setAttribute('aria-expanded', 'false');
                        const icon = trigger.querySelector('.fa-chevron-down');
                        if (icon) icon.style.transform = 'rotate(0)';
                    }, 150);
                });
            });
        }
        
        if (logoutBtn) {
            logoutBtn.addEventListener('click', handleLogout);
        }
    }

    function updateAccountPageUI(user) {
        // Verifică dacă există avatar personalizat în localStorage
        const savedAvatar = localStorage.getItem('userAvatar');
        
        // Actualizează avatar-ul din header
        const headerAvatar = document.getElementById('headerAvatar');
        if (headerAvatar) {
            headerAvatar.src = savedAvatar || user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.firstName + '+' + user.lastName)}&background=176f87&color=fff`;
            headerAvatar.alt = `${user.firstName} ${user.lastName}`;
        }
        
        // Actualizează numele utilizatorului
        const userName = document.querySelector('.user-name');
        if (userName) {
            userName.textContent = `${user.firstName} ${user.lastName}`;
        }
        
        // Actualizează mesajul de bun venit
        const welcomeSection = document.querySelector('.welcome-section h2');
        if (welcomeSection) {
            welcomeSection.textContent = `Bine ai venit înapoi, ${user.firstName}!`;
        }
        
        // Actualizează ultima conectare
        const lastLoginTime = document.getElementById('lastLoginTime');
        if (lastLoginTime) {
            const lastLogin = localStorage.getItem('lastLogin');
            if (lastLogin) {
                const date = new Date(lastLogin);
                const now = new Date();
                const diffMinutes = Math.floor((now - date) / 60000);
                
                let timeText;
                if (diffMinutes < 1) {
                    timeText = 'Acum';
                } else if (diffMinutes < 60) {
                    timeText = `Acum ${diffMinutes} ${diffMinutes === 1 ? 'minut' : 'minute'}`;
                } else if (diffMinutes < 1440) {
                    const hours = Math.floor(diffMinutes / 60);
                    timeText = `Acum ${hours} ${hours === 1 ? 'oră' : 'ore'}`;
                } else {
                    timeText = date.toLocaleDateString('ro-RO', { 
                        day: 'numeric', 
                        month: 'long', 
                        hour: '2-digit', 
                        minute: '2-digit' 
                    });
                }
                
                lastLoginTime.textContent = timeText;
            }
        }
    }

    function initLogout() {
        const logoutBtn = document.querySelector('.logout-btn');
        
        if (logoutBtn) {
            logoutBtn.addEventListener('click', handleLogout);
        }
    }

    function handleLogout(e) {
        e.preventDefault();
        
        console.log('👋 Deconectare utilizator...');
        
        // Confirmă deconectarea
        if (confirm('Ești sigur că vrei să te deconectezi?')) {
            // Șterge toate datele de sesiune
            localStorage.removeItem('currentUser');
            localStorage.removeItem('authToken');
            localStorage.removeItem('lastLogin');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userAvatar');
            localStorage.removeItem('userSettings');
            
            console.log('✅ Sesiune închisă');
            
            // Reîncarcă pagina pentru a reseta UI-ul
            window.location.reload();
        }
    }

    function goToSupport() {
        console.log('📞 Navigare către Suport...');
        
        // Închide dropdown-ul
        const dropdown = document.getElementById('userDropdownMenu');
        if (dropdown) {
            dropdown.classList.remove('active');
        }
        
        // Deschide panelul de cont cu tab-ul Contact
        if (window.AccountPanel) {
            window.AccountPanel.show('contact');
            console.log('✅ Deschis tab Contact în Contul Meu');
        } else {
            // Fallback: scroll la secțiunea de contact din pagina principală
            console.warn('AccountPanel nu este disponibil, folosesc fallback');
            setTimeout(() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                    console.log('✅ Navigare către Contact (fallback) reușită');
                }
            }, 400);
        }
    }
    
    // Export pentru debugging
    window.SessionManager = {
        getCurrentUser,
        logout: handleLogout,
        checkSession,
        goToSupport
    };

})();

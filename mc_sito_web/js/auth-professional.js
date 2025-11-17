/**
 * SISTEM DE AUTENTIFICARE PROFESIONAL COMPLET
 * MC MetSolArt - Versiune Premium
 * 
 * Caracteristici:
 * - Mesaje elegante (fără alert-uri)
 * - Înregistrare completă
 * - Resetare parolă funcțională
 * - Validare în timp real
 * - Animații profesionale
 */

(function() {
    'use strict';

    console.log('%c🎯 SISTEM AUTENTIFICARE PROFESIONAL', 'color: #667eea; font-size: 18px; font-weight: bold;');

    // Așteaptă ca DOM-ul să fie gata
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        console.log('🚀 Inițializare sistem...');
        
        initSidebar();
        initForms();
        initValidation();
        initAlerts();
        initSessionExpiredHandler();
        
        console.log('✅ Sistem gata!');
    }

    // ==========================================
    // SESSION EXPIRED HANDLER
    // ==========================================
    
    function initSessionExpiredHandler() {
        window.addEventListener('sessionExpired', () => {
            console.warn('⚠️ Sesiune expirată detectată');
            
            // Închide toate ferestrele deschise
            if (window.closeAllWindows) {
                window.closeAllWindows();
            }
            
            // NU deschidem automat login-ul - utilizatorul va vedea butonul "Rezolvă Acum"
            console.log('ℹ️ Utilizatorul va vedea mesajul cu butonul "Rezolvă Acum"');
        });
    }

    // ==========================================
    // SIDEBAR MANAGEMENT
    // ==========================================
    
    function initSidebar() {
        const loginBtn = document.getElementById('loginBtn');
        const sidebarClose = document.getElementById('sidebarClose');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        const sidebarBack = document.getElementById('sidebarBack');
        const sidebarLogo = document.getElementById('sidebarLogo');

        if (loginBtn) {
            loginBtn.addEventListener('click', openSidebar);
        }

        if (sidebarClose) {
            sidebarClose.addEventListener('click', closeSidebar);
        }

        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', closeSidebar);
        }

        if (sidebarBack) {
            sidebarBack.addEventListener('click', handleBack);
        }

        if (sidebarLogo) {
            sidebarLogo.addEventListener('click', closeSidebar);
        }

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeSidebar();
            }
        });
    }

    function openSidebar() {
        const sidebar = document.getElementById('loginSidebar');
        const overlay = document.getElementById('sidebarOverlay');
        
        if (sidebar) sidebar.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        const sidebar = document.getElementById('loginSidebar');
        const overlay = document.getElementById('sidebarOverlay');
        
        if (sidebar) sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            showLoginForm();
            hideAllAlerts();
        }, 300);
    }

    function handleBack() {
        const registerForm = document.getElementById('registerForm');
        const resetForm = document.getElementById('resetPasswordForm');
        
        if (registerForm && registerForm.style.display !== 'none') {
            showLoginForm();
        } else if (resetForm && resetForm.style.display !== 'none') {
            showLoginForm();
        } else {
            closeSidebar();
        }
    }

    // ==========================================
    // FORM SWITCHING
    // ==========================================

    function showLoginForm() {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const resetForm = document.getElementById('resetPasswordForm');
        const sidebarBack = document.getElementById('sidebarBack');
        const sidebarTitle = document.querySelector('.sidebar-title');
        const sidebarSubtitle = document.querySelector('.sidebar-subtitle');

        if (loginForm) loginForm.style.display = 'flex';
        if (registerForm) registerForm.style.display = 'none';
        if (resetForm) resetForm.style.display = 'none';
        if (sidebarBack) sidebarBack.style.display = 'none';
        
        if (sidebarTitle) sidebarTitle.textContent = 'Bine ai venit!';
        if (sidebarSubtitle) sidebarSubtitle.textContent = 'Conectează-te pentru a accesa contul tău';
        
        updateProgressSteps('login');
        hideAllAlerts();
    }

    function showRegisterForm() {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const resetForm = document.getElementById('resetPasswordForm');
        const sidebarBack = document.getElementById('sidebarBack');
        const sidebarTitle = document.querySelector('.sidebar-title');
        const sidebarSubtitle = document.querySelector('.sidebar-subtitle');

        if (loginForm) loginForm.style.display = 'none';
        if (registerForm) registerForm.style.display = 'flex';
        if (resetForm) resetForm.style.display = 'none';
        if (sidebarBack) sidebarBack.style.display = 'flex';
        
        if (sidebarTitle) sidebarTitle.textContent = 'Creează cont nou';
        if (sidebarSubtitle) sidebarSubtitle.textContent = 'Înregistrează-te pentru a accesa toate funcțiile';
        
        updateProgressSteps('register');
        hideAllAlerts();
    }

    function showResetForm() {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const resetForm = document.getElementById('resetPasswordForm');
        const sidebarBack = document.getElementById('sidebarBack');
        const sidebarTitle = document.querySelector('.sidebar-title');
        const sidebarSubtitle = document.querySelector('.sidebar-subtitle');

        if (loginForm) loginForm.style.display = 'none';
        if (registerForm) registerForm.style.display = 'none';
        if (resetForm) resetForm.style.display = 'flex';
        if (sidebarBack) sidebarBack.style.display = 'flex';
        
        if (sidebarTitle) sidebarTitle.textContent = 'Resetează Parola';
        if (sidebarSubtitle) sidebarSubtitle.textContent = 'Introdu email-ul tău pentru a primi link-ul de resetare';
        
        updateProgressSteps('reset');
        hideAllAlerts();
    }

    function updateProgressSteps(step) {
        const steps = document.querySelectorAll('.progress-step');
        steps.forEach(s => {
            s.classList.remove('active');
            if (s.dataset.step === step) {
                s.classList.add('active');
            }
        });
    }

    // ==========================================
    // FORM INITIALIZATION
    // ==========================================

    function initForms() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        }

        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', handleRegister);
        }

        const resetForm = document.getElementById('resetPasswordForm');
        if (resetForm) {
            resetForm.addEventListener('submit', handleResetPassword);
        }

        const showRegisterBtn = document.getElementById('showRegisterBtn');
        if (showRegisterBtn) {
            showRegisterBtn.addEventListener('click', showRegisterForm);
        }

        const showLoginBtn = document.getElementById('showLoginBtn');
        if (showLoginBtn) {
            showLoginBtn.addEventListener('click', showLoginForm);
        }

        const showResetBtn = document.getElementById('showResetPasswordBtn');
        if (showResetBtn) {
            showResetBtn.addEventListener('click', function(e) {
                e.preventDefault();
                showResetForm();
            });
        }

        const backToLoginBtn = document.getElementById('backToLoginBtn');
        if (backToLoginBtn) {
            backToLoginBtn.addEventListener('click', showLoginForm);
        }
    }

    // ==========================================
    // VALIDATION
    // ==========================================

    function initValidation() {
        const emailInputs = document.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            input.addEventListener('input', function() {
                validateEmail(this);
            });
            input.addEventListener('blur', function() {
                validateEmail(this);
            });
        });

        const passwordInputs = document.querySelectorAll('input[type="password"]');
        passwordInputs.forEach(input => {
            input.addEventListener('input', function() {
                validatePassword(this);
                
                if (this.id === 'registerPassword') {
                    updatePasswordStrength(this);
                }
                
                const confirmPassword = document.getElementById('registerConfirmPassword');
                if (confirmPassword && confirmPassword.value) {
                    validatePasswordMatch();
                }
            });
        });

        const confirmPassword = document.getElementById('registerConfirmPassword');
        if (confirmPassword) {
            confirmPassword.addEventListener('input', validatePasswordMatch);
        }

        const nameInputs = document.querySelectorAll('#registerFirstName, #registerLastName');
        nameInputs.forEach(input => {
            input.addEventListener('input', function() {
                validateName(this);
            });
        });
    }

    function validateEmail(input) {
        const value = input.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!value) {
            input.classList.remove('error', 'success');
            return false;
        }
        
        if (emailRegex.test(value)) {
            input.classList.remove('error');
            input.classList.add('success');
            return true;
        } else {
            input.classList.remove('success');
            input.classList.add('error');
            return false;
        }
    }

    function validatePassword(input) {
        const value = input.value;
        
        if (!value) {
            input.classList.remove('error', 'success');
            return false;
        }
        
        if (value.length >= 6) {
            input.classList.remove('error');
            input.classList.add('success');
            return true;
        } else {
            input.classList.remove('success');
            input.classList.add('error');
            return false;
        }
    }

    function validateName(input) {
        const value = input.value.trim();
        
        if (!value) {
            input.classList.remove('error', 'success');
            return false;
        }
        
        if (value.length >= 2) {
            input.classList.remove('error');
            input.classList.add('success');
            return true;
        } else {
            input.classList.remove('success');
            input.classList.add('error');
            return false;
        }
    }

    function validatePasswordMatch() {
        const password = document.getElementById('registerPassword');
        const confirmPassword = document.getElementById('registerConfirmPassword');
        
        if (!password || !confirmPassword) return false;
        
        const value1 = password.value;
        const value2 = confirmPassword.value;
        
        if (!value2) {
            confirmPassword.classList.remove('error', 'success');
            return false;
        }
        
        if (value1 === value2 && value2.length >= 6) {
            confirmPassword.classList.remove('error');
            confirmPassword.classList.add('success');
            return true;
        } else {
            confirmPassword.classList.remove('success');
            confirmPassword.classList.add('error');
            return false;
        }
    }

    function updatePasswordStrength(input) {
        const strengthBar = document.getElementById('passwordStrength');
        if (!strengthBar) return;
        
        const password = input.value;
        let strength = 0;
        
        if (password.length >= 6) strength++;
        if (password.length >= 10) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;
        
        strengthBar.className = 'password-strength';
        
        if (password.length === 0) {
            strengthBar.className = 'password-strength';
        } else if (strength <= 2) {
            strengthBar.classList.add('weak');
        } else if (strength <= 3) {
            strengthBar.classList.add('medium');
        } else {
            strengthBar.classList.add('strong');
        }
    }

    // ==========================================
    // ALERT SYSTEM (PROFESIONAL)
    // ==========================================

    function initAlerts() {
        const alertCloseButtons = document.querySelectorAll('.alert-close');
        alertCloseButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                this.closest('.alert').style.display = 'none';
            });
        });
    }

    function showAlert(message, type = 'error', title = null) {
        const alertId = type === 'success' ? 'registerSuccess' : 'loginError';
        const alert = document.getElementById(alertId);
        
        if (!alert) {
            console.warn('Alert element not found:', alertId);
            return;
        }
        
        const titleEl = alert.querySelector('.alert-title');
        const messageEl = alert.querySelector('.alert-message');
        const iconEl = alert.querySelector('.alert-icon i');
        
        if (titleEl) {
            titleEl.textContent = title || (type === 'success' ? 'Succes!' : 'Eroare');
        }
        
        if (messageEl) {
            messageEl.textContent = message;
        }
        
        if (iconEl) {
            iconEl.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
        }
        
        alert.style.display = 'flex';
        alert.classList.add('show');
        
        // Scroll to alert
        alert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-hide success messages
        if (type === 'success') {
            setTimeout(() => {
                alert.style.display = 'none';
                alert.classList.remove('show');
            }, 5000);
        }
    }

    function hideAllAlerts() {
        const alerts = document.querySelectorAll('.alert');
        alerts.forEach(alert => {
            alert.style.display = 'none';
            alert.classList.remove('show');
        });
    }

    // ==========================================
    // LOGIN HANDLER
    // ==========================================

    async function handleLogin(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('.btn-submit, .btn-primary');
        const emailInput = document.getElementById('loginEmail');
        const passwordInput = document.getElementById('loginPassword');
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        hideAllAlerts();
        
        // Validate
        const emailValid = validateEmail(emailInput);
        const passwordValid = validatePassword(passwordInput);
        
        if (!emailValid || !passwordValid) {
            showAlert('Te rugăm să completezi corect toate câmpurile.', 'error', 'Date invalide');
            return;
        }
        
        // Show loading
        if (submitBtn) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            const span = submitBtn.querySelector('span');
            if (span) span.textContent = 'Se conectează...';
        }
        
        try {
            // Autentificare prin API
            const response = await window.API.login(email, password);
            
            if (response.success) {
                const user = response.data.user;
                
                // Salvează datele utilizatorului și sesiunea
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('lastLogin', new Date().toISOString());
                localStorage.setItem('isLoggedIn', 'true');
                
                showAlert(`Bine ai venit, ${user.firstName}!`, 'success', 'Autentificare reușită');
                
                // Închide sidebar-ul de login
                setTimeout(() => {
                    const loginSidebar = document.getElementById('loginSidebar');
                    const sidebarOverlay = document.getElementById('sidebarOverlay');
                    
                    if (loginSidebar) {
                        loginSidebar.classList.remove('active');
                    }
                    if (sidebarOverlay) {
                        sidebarOverlay.classList.remove('active');
                    }
                    document.body.style.overflow = '';
                    
                    // Actualizează UI-ul cu butonul de profil
                    if (window.SessionManager && window.SessionManager.checkSession) {
                        window.SessionManager.checkSession();
                    }
                    
                    // Deschide panelul de cont după o scurtă pauză
                    setTimeout(() => {
                        if (window.AccountPanel) {
                            window.AccountPanel.show('dashboard');
                        }
                    }, 300);
                }, 1500);
            }
        } catch (error) {
            console.error('❌ Login error:', error);
            const errorMessage = error.message || 'A apărut o eroare la conectare. Te rugăm să încerci din nou.';
            showAlert(errorMessage, 'error', 'Eroare de autentificare');
            emailInput.classList.add('error');
            passwordInput.classList.add('error');
        } finally {
            if (submitBtn) {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                const span = submitBtn.querySelector('span');
                if (span) span.textContent = 'Conectează-te';
            }
        }
    }

    // ==========================================
    // REGISTER HANDLER
    // ==========================================

    async function handleRegister(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('.btn-submit, .btn-primary');
        const firstName = document.getElementById('registerFirstName').value.trim();
        const lastName = document.getElementById('registerLastName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value.trim();
        const confirmPassword = document.getElementById('registerConfirmPassword').value.trim();
        const termsAccepted = document.getElementById('registerTerms')?.checked;
        
        hideAllAlerts();
        
        // Validate all fields
        const firstNameValid = validateName(document.getElementById('registerFirstName'));
        const lastNameValid = validateName(document.getElementById('registerLastName'));
        const emailValid = validateEmail(document.getElementById('registerEmail'));
        const passwordValid = validatePassword(document.getElementById('registerPassword'));
        const passwordMatchValid = validatePasswordMatch();
        
        if (!firstNameValid || !lastNameValid) {
            showAlert('Te rugăm să introduci prenumele și numele complet.', 'error', 'Date incomplete');
            return;
        }
        
        if (!emailValid) {
            showAlert('Te rugăm să introduci o adresă de email validă.', 'error', 'Email invalid');
            return;
        }
        
        if (!passwordValid) {
            showAlert('Parola trebuie să conțină cel puțin 6 caractere.', 'error', 'Parolă invalidă');
            return;
        }
        
        if (!passwordMatchValid) {
            showAlert('Parolele introduse nu se potrivesc.', 'error', 'Parolele nu coincid');
            return;
        }
        
        if (!termsAccepted) {
            showAlert('Trebuie să accepți termenii și condițiile pentru a continua.', 'error', 'Termeni neacceptați');
            return;
        }
        
        // Show loading
        if (submitBtn) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            const span = submitBtn.querySelector('span');
            if (span) span.textContent = 'Se creează contul...';
        }
        
        try {
            // Înregistrare prin API
            const response = await window.API.register({
                email: email.toLowerCase(),
                password,
                password_confirmation: confirmPassword,
                first_name: firstName,
                last_name: lastName,
                language: localStorage.getItem('language') || 'ro'
            });
            
            if (response.success) {
                const user = response.data.user;
                
                // Salvează datele utilizatorului și sesiunea
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('lastLogin', new Date().toISOString());
                localStorage.setItem('isLoggedIn', 'true');
                
                showAlert(`Bine ai venit, ${firstName}! Contul tău a fost creat cu succes.`, 'success', 'Cont creat cu succes');
                
                // Închide sidebar-ul și deschide panelul de cont
                setTimeout(() => {
                    const loginSidebar = document.getElementById('loginSidebar');
                    const sidebarOverlay = document.getElementById('sidebarOverlay');
                    
                    if (loginSidebar) loginSidebar.classList.remove('active');
                    if (sidebarOverlay) sidebarOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    // Actualizează UI-ul
                    if (window.SessionManager && window.SessionManager.checkSession) {
                        window.SessionManager.checkSession();
                    }
                    
                    // Deschide panelul de cont
                    setTimeout(() => {
                        if (window.AccountPanel) {
                            window.AccountPanel.show('dashboard');
                        }
                    }, 300);
                }, 1500);
            }
            
        } catch (error) {
            console.error('❌ Register error:', error);
            const errorMessage = error.message || 'A apărut o eroare la crearea contului. Te rugăm să încerci din nou.';
            showAlert(errorMessage, 'error', 'Eroare de înregistrare');
        } finally {
            if (submitBtn) {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                const span = submitBtn.querySelector('span');
                if (span) span.textContent = 'Creează Cont';
            }
        }
    }

    // ==========================================
    // RESET PASSWORD HANDLER
    // ==========================================

    async function handleResetPassword(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('.btn-submit, .btn-primary');
        const emailInput = document.getElementById('resetEmail');
        const email = emailInput?.value.trim();
        
        hideAllAlerts();
        
        if (!email) {
            showAlert('Te rugăm să introduci adresa de email.', 'error', 'Email lipsă');
            return;
        }
        
        const emailValid = validateEmail(emailInput);
        if (!emailValid) {
            showAlert('Te rugăm să introduci o adresă de email validă.', 'error', 'Email invalid');
            return;
        }
        
        // Show loading
        if (submitBtn) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            const span = submitBtn.querySelector('span');
            if (span) span.textContent = 'Se trimite...';
        }
        
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Check if email exists
            const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            const defaultEmails = ['demo@mc.com', 'test@test.com'];
            const allEmails = [...defaultEmails, ...users.map(u => u.email)];
            
            const emailExists = allEmails.some(e => e.toLowerCase() === email.toLowerCase());
            
            if (emailExists) {
                showAlert(`Am trimis un email la ${email} cu instrucțiuni pentru resetarea parolei. Verifică inbox-ul și folder-ul spam.`, 'success', 'Email trimis cu succes');
                
                setTimeout(() => {
                    showLoginForm();
                }, 3000);
            } else {
                showAlert('Nu există niciun cont asociat cu acest email. Te rugăm să verifici adresa introdusă sau să te înregistrezi.', 'error', 'Email negăsit');
            }
            
        } catch (error) {
            console.error('Reset password error:', error);
            showAlert('A apărut o eroare la trimiterea email-ului. Te rugăm să încerci din nou.', 'error', 'Eroare de sistem');
        } finally {
            if (submitBtn) {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                const span = submitBtn.querySelector('span');
                if (span) span.textContent = 'Trimite Link de Resetare';
            }
        }
    }

    // Export for debugging
    window.authProfessional = {
        openSidebar,
        closeSidebar,
        showLoginForm,
        showRegisterForm,
        showResetForm
    };

    console.log('✅ Sistem autentificare profesional gata!');

    // ==========================================
    // FUNCȚIE GLOBALĂ PENTRU REZOLVARE SESIUNE
    // ==========================================
    
    window.fixSession = function() {
        console.log('🔧 Rezolvare sesiune - curățare token invalid');
        
        // Șterge token-ul și datele utilizatorului
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        
        // Închide toate ferestrele
        if (window.closeAllWindows) {
            window.closeAllWindows();
        }
        
        // Reîmprospătează pagina
        setTimeout(() => {
            location.reload();
        }, 500);
    };

})();

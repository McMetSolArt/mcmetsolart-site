// ============================================
// FOOTER MODALS - TERMS, PRIVACY, COOKIES, GDPR
// Cu suport pentru traduceri în 4 limbi
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const footerLinks = document.querySelectorAll('.footer-link[data-modal], #termsLink, #privacyLink, #cookiesLink, #gdprLink');
    
    // Funcție helper pentru traduceri
    const t = (key) => {
        const lang = localStorage.getItem('language') || 'ro';
        return window.translations?.[lang]?.[key] || key;
    };
    
    // Funcție pentru a genera conținutul modal cu traduceri
    function getModalContent(type) {
        const content = {
            terms: {
                title: t('modal.terms.title'),
                content: `
                    <p>${t('modal.terms.intro')}</p>
                    <h3>${t('modal.terms.section1.title')}</h3>
                    <p>${t('modal.terms.section1.content')}</p>
                    <h3>${t('modal.terms.section2.title')}</h3>
                    <p>${t('modal.terms.section2.content')}</p>
                    <h3>${t('modal.terms.section3.title')}</h3>
                    <p>${t('modal.terms.section3.content')}</p>
                    <h3>${t('modal.terms.section4.title')}</h3>
                    <p>${t('modal.terms.section4.content')}</p>
                    <h3>${t('modal.terms.section5.title')}</h3>
                    <p>${t('modal.terms.section5.content')}</p>
                `
            },
            privacy: {
                title: t('modal.privacy.title'),
                content: `
                    <p>${t('modal.privacy.intro')}</p>
                    <h3>${t('modal.privacy.section1.title')}</h3>
                    <p>${t('modal.privacy.section1.content')}</p>
                    <h3>${t('modal.privacy.section2.title')}</h3>
                    <p>${t('modal.privacy.section2.content')}</p>
                    <h3>${t('modal.privacy.section3.title')}</h3>
                    <p>${t('modal.privacy.section3.content')}</p>
                    <h3>${t('modal.privacy.section4.title')}</h3>
                    <p>${t('modal.privacy.section4.content')}</p>
                    <h3>${t('modal.privacy.section5.title')}</h3>
                    <p>${t('modal.privacy.section5.content')}</p>
                `
            },
            cookies: {
                title: t('modal.cookies.title'),
                content: `
                    <p>${t('modal.cookies.intro')}</p>
                    <h3>${t('modal.cookies.section1.title')}</h3>
                    <p>${t('modal.cookies.section1.content')}</p>
                    <h3>${t('modal.cookies.section2.title')}</h3>
                    <p>${t('modal.cookies.section2.content')}</p>
                    <h3>${t('modal.cookies.section3.title')}</h3>
                    <p>${t('modal.cookies.section3.content')}</p>
                    <h3>${t('modal.cookies.section4.title')}</h3>
                    <p>${t('modal.cookies.section4.content')}</p>
                `
            },
            gdpr: {
                title: t('modal.gdpr.title'),
                content: `
                    <p>${t('modal.gdpr.intro')}</p>
                    <h3>${t('modal.gdpr.section1.title')}</h3>
                    <p>${t('modal.gdpr.section1.content')}</p>
                    <h3>${t('modal.gdpr.section2.title')}</h3>
                    <p>${t('modal.gdpr.section2.content')}</p>
                    <h3>${t('modal.gdpr.section3.title')}</h3>
                    <p>${t('modal.gdpr.section3.content')}</p>
                    <h3>${t('modal.gdpr.section4.title')}</h3>
                    <p>${t('modal.gdpr.section4.content')}</p>
                    <h3>${t('modal.gdpr.section5.title')}</h3>
                    <p>${t('modal.gdpr.section5.content')}</p>
                `
            }
        };
        
        return content[type];
    }
    
    // Create modal HTML
    const modalHTML = `
        <div class="footer-modal-overlay" id="footerModalOverlay">
            <div class="footer-modal">
                <div class="footer-modal-header">
                    <h2 class="footer-modal-title" id="footerModalTitle"></h2>
                    <button class="footer-modal-close" id="footerModalClose">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="footer-modal-content" id="footerModalContent"></div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const overlay = document.getElementById('footerModalOverlay');
    const modalTitle = document.getElementById('footerModalTitle');
    const modalContentEl = document.getElementById('footerModalContent');
    const closeBtn = document.getElementById('footerModalClose');
    
    let currentModalType = null;
    
    // Funcție pentru a deschide modal cu conținut tradus
    function openModal(modalType) {
        currentModalType = modalType;
        const data = getModalContent(modalType);
        
        if (data) {
            modalTitle.textContent = data.title;
            modalContentEl.innerHTML = data.content;
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Open modal
    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Determină tipul modal-ului
            let modalType = link.getAttribute('data-modal');
            
            if (!modalType) {
                const linkId = link.id;
                if (linkId === 'termsLink') modalType = 'terms';
                else if (linkId === 'privacyLink') modalType = 'privacy';
                else if (linkId === 'cookiesLink') modalType = 'cookies';
                else if (linkId === 'gdprLink') modalType = 'gdpr';
            }
            
            openModal(modalType);
        });
    });
    
    // Close modal
    function closeModal() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        currentModalType = null;
    }
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Ascultă schimbările de limbă și reîncarcă modalul dacă este deschis
    window.addEventListener('languageChanged', () => {
        if (overlay.classList.contains('active') && currentModalType) {
            openModal(currentModalType);
        }
    });
    
    console.log('✅ Footer modals ready with translations!');
});

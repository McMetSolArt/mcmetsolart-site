// ============================================
// HAMBURGER MENU - DROPDOWN FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const headerNav = document.getElementById('headerNav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle menu
    function toggleMenu(e) {
        e?.stopPropagation();
        hamburgerBtn.classList.toggle('active');
        headerNav.classList.toggle('active');
    }
    
    // Open/close menu on button click
    hamburgerBtn.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('active');
            headerNav.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburgerBtn.contains(e.target) && !headerNav.contains(e.target)) {
            hamburgerBtn.classList.remove('active');
            headerNav.classList.remove('active');
        }
    });
    
    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && headerNav.classList.contains('active')) {
            hamburgerBtn.classList.remove('active');
            headerNav.classList.remove('active');
        }
    });
});

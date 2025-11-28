// Fix pentru link-urile social media
document.addEventListener('DOMContentLoaded', function() {
    // Găsește toate link-urile social media
    const socialLinks = document.querySelectorAll('.social-icon-link');
    
    socialLinks.forEach((link) => {
        const href = link.getAttribute('href');
        
        // Asigură-te că toate link-urile funcționează corect
        if (href && href !== '#') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Deschide link-ul într-o filă nouă
                window.open(href, '_blank', 'noopener,noreferrer');
            });
            
            // Asigură-te că imaginea nu blochează click-ul
            const img = link.querySelector('img');
            if (img) {
                img.style.pointerEvents = 'none';
            }
        }
    });
});

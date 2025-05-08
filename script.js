document.addEventListener('DOMContentLoaded', function() {
    // Handle sidebar navigation toggling
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const submenuItems = document.querySelectorAll('.has-submenu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    // Handle submenu toggling
    submenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Only toggle if click is on the main menu item, not a submenu item
            if (e.target.closest('a') === this.querySelector('a')) {
                e.preventDefault();
                
                // Close all other open submenus
                submenuItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle active class for clicked item
                item.classList.toggle('active');
            }
        });
    });

    // Make sure appropriate menu item is highlighted based on current page
    const currentLocation = window.location.pathname;
    const menuLinks = document.querySelectorAll('.sidebar-nav a');
    
    menuLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation || 
            (currentLocation.includes(link.getAttribute('href')) && link.getAttribute('href') !== 'index.html')) {
            
            // Mark the link as active
            link.parentElement.classList.add('active');
            
            // If it's in a submenu, open the parent menu
            const parentSubmenu = link.closest('.submenu');
            if (parentSubmenu) {
                parentSubmenu.parentElement.classList.add('active');
            }
        }
    });

    // Testimonial carousel functionality
    const testimonialsCarousel = document.querySelector('.testimonials-carousel');
    const prevBtn = document.querySelector('.carousel-nav .prev-btn');
    const nextBtn = document.querySelector('.carousel-nav .next-btn');
    
    if (testimonialsCarousel && prevBtn && nextBtn) {
        const testimonials = document.querySelectorAll('.testimonial');
        let currentIndex = 0;
        
        // Function to scroll to a specific testimonial
        function showTestimonial(index) {
            if (index < 0) {
                index = testimonials.length - 1;
            } else if (index >= testimonials.length) {
                index = 0;
            }
            
            currentIndex = index;
            const scrollPosition = testimonialsCarousel.clientWidth * currentIndex;
            testimonialsCarousel.scrollLeft = scrollPosition;
        }
        
        // Set up button click handlers
        prevBtn.addEventListener('click', () => {
            showTestimonial(currentIndex - 1);
        });
        
        nextBtn.addEventListener('click', () => {
            showTestimonial(currentIndex + 1);
        });
        
        // Auto-scroll the testimonials every 5 seconds
        let interval = setInterval(() => {
            showTestimonial(currentIndex + 1);
        }, 5000);
        
        // Pause auto-scroll when user interacts with the carousel
        testimonialsCarousel.addEventListener('mouseenter', () => {
            clearInterval(interval);
        });
        
        testimonialsCarousel.addEventListener('mouseleave', () => {
            interval = setInterval(() => {
                showTestimonial(currentIndex + 1);
            }, 5000);
        });
    }
});

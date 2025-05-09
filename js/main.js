// Main JavaScript for Mindspace

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initAnimations();
    initAccordions();
    initTabs();
    initRatings();
    initFormValidation();
    initScrollReveal();
});

// Mobile Navigation
function initNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.querySelector('.navbar-nav');
    const submenus = document.querySelectorAll('.has-submenu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navbar.classList.toggle('active');
            this.classList.toggle('active');

            // Change the icon
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // For mobile: handle submenu clicks
    submenus.forEach(submenu => {
        submenu.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                // Only if target is the direct link and not a child link
                if (e.target === this.querySelector('a') || e.target === this.querySelector('a > i')) {
                    e.preventDefault();
                    this.classList.toggle('active');
                }
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navbar && navbar.classList.contains('active') && !e.target.closest('.navbar')) {
            navbar.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon.classList.contains('fa-times')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });
}

// Animations for various UI elements
function initAnimations() {
    // Animate elements that have animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right, .zoom-in');
    
    animatedElements.forEach(el => {
        // Remove class temporarily to avoid flashing on page load
        const classes = Array.from(el.classList).filter(cls => cls.startsWith('fade-') || cls === 'zoom-in');
        classes.forEach(cls => el.classList.remove(cls));
        
        // Re-add after a short delay for smooth entry
        setTimeout(() => {
            classes.forEach(cls => el.classList.add(cls));
        }, 100);
    });

    // Add hover animations
    const hoverElements = document.querySelectorAll('.hover-grow, .hover-shadow, .hover-lift, .hover-glow, .hover-underline');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            // Additional hover effects can be applied here if needed
        });
        
        el.addEventListener('mouseleave', function() {
            // Reset effects if needed
        });
    });
}

// Accordion functionality
function initAccordions() {
    const accordions = document.querySelectorAll('.accordion-trigger');
    
    accordions.forEach(accordion => {
        accordion.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const parent = this.parentElement;
            
            // Toggle active class
            parent.classList.toggle('active');
            
            // Toggle content visibility
            if (content.classList.contains('active')) {
                content.classList.remove('active');
            } else {
                content.classList.add('active');
            }
            
            // Optional: Close others
            const siblings = document.querySelectorAll('.accordion-item');
            siblings.forEach(sibling => {
                if (sibling !== parent && sibling.classList.contains('active')) {
                    sibling.classList.remove('active');
                    sibling.querySelector('.accordion-content').classList.remove('active');
                }
            });
        });
    });
    
    // FAQ accordions specific functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = 0;
            }
        });
    });
}

// Tab navigation functionality
function initTabs() {
    // General tab functionality
    const tabTriggers = document.querySelectorAll('[data-tab]');
    
    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const tabContainer = this.closest('.tabs-container');
            const contentItems = tabContainer ? tabContainer.querySelectorAll('.tab-content, .test-content, .resources-content, .media-content') : document.querySelectorAll('.tab-content, .test-content, .resources-content, .media-content');
            
            // Remove active class from all triggers in this group
            const triggerGroup = this.closest('.tabs-group, .test-tabs, .resources-tabs, .media-tabs');
            if (triggerGroup) {
                triggerGroup.querySelectorAll('[data-tab]').forEach(t => t.classList.remove('active'));
            }
            
            // Add active class to clicked trigger
            this.classList.add('active');
            
            // Hide all content items
            contentItems.forEach(item => {
                item.classList.remove('active');
            });
            
            // Show the selected content item
            const tabContent = document.getElementById(tabId);
            if (tabContent) {
                tabContent.classList.add('active');
            }
        });
    });
    
    // Resource tabs
    const resourceTabs = document.querySelectorAll('.resource-tab');
    resourceTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            resourceTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const target = this.getAttribute('data-target');
            document.querySelectorAll('.resources-content').forEach(content => {
                content.classList.remove('active');
            });
            
            document.getElementById(target).classList.add('active');
        });
    });
}

// Form validation for all forms
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let valid = true;
            
            // Simple validation for required fields
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('invalid');
                    valid = false;
                    
                    // Create or show error message
                    let errorMsg = field.nextElementSibling;
                    if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                        errorMsg = document.createElement('div');
                        errorMsg.classList.add('error-message');
                        errorMsg.textContent = 'Trường này là bắt buộc.';
                        field.parentNode.insertBefore(errorMsg, field.nextSibling);
                    } else {
                        errorMsg.style.display = 'block';
                    }
                } else {
                    field.classList.remove('invalid');
                    
                    // Hide error message if exists
                    const errorMsg = field.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.style.display = 'none';
                    }
                }
            });
            
            // Prevent submission if form is invalid
            if (!valid) {
                e.preventDefault();
            }
        });
        
        // Clear errors on input
        form.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('input', function() {
                this.classList.remove('invalid');
                
                // Hide error message if exists
                const errorMsg = this.nextElementSibling;
                if (errorMsg && errorMsg.classList.contains('error-message')) {
                    errorMsg.style.display = 'none';
                }
            });
        });
    });
    
    // Character count for textareas
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        const maxLength = textarea.getAttribute('maxlength');
        const counterEl = textarea.nextElementSibling;
        
        if (maxLength && counterEl && counterEl.classList.contains('char-count')) {
            textarea.addEventListener('input', function() {
                counterEl.textContent = `${this.value.length}/${maxLength} ký tự`;
            });
            
            // Initialize counter
            const event = new Event('input');
            textarea.dispatchEvent(event);
        }
    });
}

// Scroll reveal animations
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150; // Adjust this value to change when the element becomes visible
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            } else {
                // Uncomment if you want elements to hide again when scrolled away
                // element.classList.remove('active');
            }
        });
    }
    
    // Call once on load
    revealOnScroll();
    
    // Call on scroll
    window.addEventListener('scroll', revealOnScroll);
}

// Handle test functionality on mental-check page
function initMentalTests() {
    const stressForm = document.getElementById('stress-form');
    const anxietyForm = document.getElementById('anxiety-form');
    const stressProgress = document.getElementById('stress-progress');
    const anxietyProgress = document.getElementById('anxiety-progress');
    const resultsSection = document.getElementById('results');
    
    // Progress bar update for stress test
    if (stressForm && stressProgress) {
        const stressOptions = stressForm.querySelectorAll('.option');
        stressOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove selected class from siblings
                const questionContainer = this.closest('.question');
                questionContainer.querySelectorAll('.option').forEach(op => {
                    op.classList.remove('selected');
                });
                
                // Add selected class to clicked option
                this.classList.add('selected');
                
                // Update progress bar
                const totalQuestions = stressForm.querySelectorAll('.question').length;
                const answeredQuestions = stressForm.querySelectorAll('.option.selected').length;
                const progressPercentage = (answeredQuestions / totalQuestions) * 100;
                
                stressProgress.style.width = `${progressPercentage}%`;
                
                // Scroll to next unanswered question
                const nextUnanswered = stressForm.querySelector('.question:not(:has(.option.selected))');
                if (nextUnanswered) {
                    nextUnanswered.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        });
    }
    
    // Progress bar update for anxiety test
    if (anxietyForm && anxietyProgress) {
        const anxietyOptions = anxietyForm.querySelectorAll('.option');
        anxietyOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove selected class from siblings
                const questionContainer = this.closest('.question');
                questionContainer.querySelectorAll('.option').forEach(op => {
                    op.classList.remove('selected');
                });
                
                // Add selected class to clicked option
                this.classList.add('selected');
                
                // Update progress bar
                const totalQuestions = anxietyForm.querySelectorAll('.question').length;
                const answeredQuestions = anxietyForm.querySelectorAll('.option.selected').length;
                const progressPercentage = (answeredQuestions / totalQuestions) * 100;
                
                anxietyProgress.style.width = `${progressPercentage}%`;
                
                // Scroll to next unanswered question
                const nextUnanswered = anxietyForm.querySelector('.question:not(:has(.option.selected))');
                if (nextUnanswered) {
                    nextUnanswered.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        });
    }
    
    // Form submission and results display
    if (stressForm) {
        stressForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Calculate stress score
            let stressScore = 0;
            const selectedOptions = stressForm.querySelectorAll('.option.selected');
            
            selectedOptions.forEach(option => {
                stressScore += parseInt(option.getAttribute('data-value'));
            });
            
            // Show results
            showResults('stress', stressScore);
        });
    }
    
    if (anxietyForm) {
        anxietyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Calculate anxiety score
            let anxietyScore = 0;
            const selectedOptions = anxietyForm.querySelectorAll('.option.selected');
            
            selectedOptions.forEach(option => {
                anxietyScore += parseInt(option.getAttribute('data-value'));
            });
            
            // Show results
            showResults('anxiety', anxietyScore);
        });
    }
    
    function showResults(testType, score) {
        if (!resultsSection) return;
        
        // Display results section
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Update result content based on score and test type
        const resultSummary = resultsSection.querySelector('.result-summary');
        const resultDetails = resultsSection.querySelectorAll('.result-card');
        
        if (resultSummary) {
            let level = '';
            let message = '';
            
            if (testType === 'stress') {
                if (score <= 13) {
                    level = 'Thấp';
                    message = 'Mức độ stress của bạn ở mức thấp.';
                } else if (score <= 26) {
                    level = 'Trung bình';
                    message = 'Mức độ stress của bạn ở mức trung bình.';
                } else {
                    level = 'Cao';
                    message = 'Mức độ stress của bạn ở mức cao.';
                }
                
                resultSummary.innerHTML = `
                    <h2>Kết quả đánh giá Stress</h2>
                    <p>Điểm số của bạn: <strong>${score}</strong> - Mức độ: <strong>${level}</strong></p>
                    <p>${message}</p>
                `;
            } else if (testType === 'anxiety') {
                if (score <= 15) {
                    level = 'Thấp';
                    message = 'Mức độ lo âu của bạn ở mức thấp.';
                } else if (score <= 30) {
                    level = 'Trung bình';
                    message = 'Mức độ lo âu của bạn ở mức trung bình.';
                } else {
                    level = 'Cao';
                    message = 'Mức độ lo âu của bạn ở mức cao.';
                }
                
                resultSummary.innerHTML = `
                    <h2>Kết quả đánh giá Lo âu</h2>
                    <p>Điểm số của bạn: <strong>${score}</strong> - Mức độ: <strong>${level}</strong></p>
                    <p>${message}</p>
                `;
            }
        }
        
        // Show relevant resources based on test results
        // This is a simplified example
        if (resultDetails) {
            resultDetails.forEach(card => {
                card.style.display = 'block';
            });
        }
    }
}

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('mental-check')) {
        initMentalTests();
    }
    
    if (currentPage.includes('confession')) {
        initConfessionPage();
    }
    
    if (currentPage.includes('resources')) {
        initResourcesPage();
    }
});

// Confession page specific functionality
function initConfessionPage() {
    const confessionForm = document.getElementById('confession-form');
    const confessionContent = document.getElementById('confession-content');
    const charCount = document.querySelector('.char-count');
    
    if (confessionForm && confessionContent && charCount) {
        confessionContent.addEventListener('input', function() {
            const currentLength = this.value.length;
            const maxLength = this.getAttribute('maxlength');
            charCount.textContent = `${currentLength}/${maxLength} ký tự`;
        });
        
        confessionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.classList.add('alert', 'alert-success', 'mt-3');
            successMsg.innerHTML = `
                <i class="fas fa-check-circle"></i>
                Cảm ơn bạn đã chia sẻ. Nội dung của bạn đang được xem xét và sẽ được đăng trong thời gian sớm nhất.
            `;
            
            confessionForm.appendChild(successMsg);
            
            // Reset form
            setTimeout(() => {
                confessionForm.reset();
                successMsg.remove();
                charCount.textContent = `0/5000 ký tự`;
            }, 5000);
        });
    }
    
    // Like/bookmark functionality for confessions
    const statButtons = document.querySelectorAll('.stat');
    if (statButtons) {
        statButtons.forEach(button => {
            button.addEventListener('click', function() {
                const counter = this.querySelector('span');
                let count = parseInt(counter.textContent);
                
                if (this.classList.contains('active')) {
                    this.classList.remove('active');
                    counter.textContent = count - 1;
                } else {
                    this.classList.add('active');
                    counter.textContent = count + 1;
                }
            });
        });
    }
}

// Resources page specific functionality
function initResourcesPage() {
    // Initialize audio player functionality
    const audioPlayers = document.querySelectorAll('.podcast-play');
    
    if (audioPlayers) {
        audioPlayers.forEach(player => {
            player.addEventListener('click', function() {
                const isPlaying = this.classList.contains('playing');
                
                // Reset all other players
                audioPlayers.forEach(p => {
                    p.classList.remove('playing');
                    p.innerHTML = '<i class="fas fa-play"></i>';
                });
                
                if (!isPlaying) {
                    this.classList.add('playing');
                    this.innerHTML = '<i class="fas fa-pause"></i>';
                    
                    // Here you would typically play the audio file
                    console.log('Playing audio');
                }
            });
        });
    }
}

// Initialize ratings component
function initRatings() {
    // The actual functionality is in rating.js
    // This function is just to ensure the ratings are initialized
    if (typeof window.RatingSystem !== 'undefined' && window.RatingSystem.init) {
        window.RatingSystem.init();
    }
}

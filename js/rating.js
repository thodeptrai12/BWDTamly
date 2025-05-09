/**
 * Page Rating System for Mindspace
 * Allows users to rate and provide feedback on each page
 */

// Create a namespace for the rating system
window.RatingSystem = (function() {
    // Private variables
    let currentRating = 0;
    let ratingContainers;
    
    // Initialize all rating components
    function init() {
        console.log('Initializing rating system...');
        createRatingComponents();
        
        // Find all rating containers after creation
        ratingContainers = document.querySelectorAll('.rating-container');
        
        if (ratingContainers.length > 0) {
            ratingContainers.forEach(container => {
                initializeRatingContainer(container);
            });
        }
    }
    
    // Create rating components on each page if they don't exist
    function createRatingComponents() {
        // Only add if we're on a content page and there's no rating component yet
        const mainContent = document.querySelector('.main-content');
        if (mainContent && !document.querySelector('.rating-container')) {
            const ratingComponent = document.createElement('div');
            ratingComponent.className = 'rating-container fade-in-up';
            ratingComponent.innerHTML = `
                <h3 class="rating-title">Bạn thấy nội dung này thế nào?</h3>
                <p>Đánh giá của bạn giúp chúng tôi cải thiện nội dung</p>
                <div class="rating-stars">
                    <span class="rating-star" data-rating="1"><i class="fas fa-star"></i></span>
                    <span class="rating-star" data-rating="2"><i class="fas fa-star"></i></span>
                    <span class="rating-star" data-rating="3"><i class="fas fa-star"></i></span>
                    <span class="rating-star" data-rating="4"><i class="fas fa-star"></i></span>
                    <span class="rating-star" data-rating="5"><i class="fas fa-star"></i></span>
                </div>
                <div class="rating-feedback" style="display: none;">
                    <textarea class="form-control" placeholder="Chia sẻ thêm ý kiến của bạn (tùy chọn)"></textarea>
                    <button class="btn btn-primary submit-rating">Gửi đánh giá</button>
                </div>
                <div class="rating-submitted">
                    <i class="fas fa-check-circle"></i> Cảm ơn bạn đã gửi đánh giá!
                </div>
                <div class="rating-error">
                    <i class="fas fa-exclamation-circle"></i> Có lỗi xảy ra. Vui lòng thử lại sau.
                </div>
            `;
            mainContent.appendChild(ratingComponent);
        }
    }
    
    // Setup event listeners for a rating container
    function initializeRatingContainer(container) {
        const stars = container.querySelectorAll('.rating-star');
        const submitBtn = container.querySelector('.submit-rating');
        const feedbackSection = container.querySelector('.rating-feedback');
        const submittedMessage = container.querySelector('.rating-submitted');
        const errorMessage = container.querySelector('.rating-error');
        
        // Star hover effects
        stars.forEach(star => {
            // Mouse enter - highlight current star and all stars before it
            star.addEventListener('mouseenter', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                highlightStars(stars, rating);
            });
            
            // Mouse leave - revert to current rating
            star.addEventListener('mouseleave', function() {
                highlightStars(stars, currentRating);
            });
            
            // Click - set rating
            star.addEventListener('click', function() {
                currentRating = parseInt(this.getAttribute('data-rating'));
                highlightStars(stars, currentRating);
                
                // Show feedback section with animation
                if (feedbackSection) {
                    feedbackSection.style.display = 'block';
                    feedbackSection.classList.add('fade-in');
                }
            });
        });
        
        // Submit button click
        if (submitBtn) {
            submitBtn.addEventListener('click', function() {
                // Get feedback text
                const feedbackText = container.querySelector('textarea').value;
                
                // Submit the rating
                submitRating(currentRating, feedbackText)
                    .then(() => {
                        // Hide feedback section
                        feedbackSection.style.display = 'none';
                        
                        // Show success message
                        submittedMessage.style.display = 'block';
                        submittedMessage.classList.add('fade-in');
                        
                        // Hide success message after 5 seconds
                        setTimeout(() => {
                            submittedMessage.classList.remove('fade-in');
                            submittedMessage.classList.add('fade-out');
                            
                            setTimeout(() => {
                                submittedMessage.style.display = 'none';
                                submittedMessage.classList.remove('fade-out');
                            }, 500);
                        }, 5000);
                    })
                    .catch(error => {
                        console.error('Error submitting rating:', error);
                        
                        // Show error message
                        errorMessage.style.display = 'block';
                        errorMessage.classList.add('fade-in');
                        
                        // Hide error message after 5 seconds
                        setTimeout(() => {
                            errorMessage.classList.remove('fade-in');
                            errorMessage.classList.add('fade-out');
                            
                            setTimeout(() => {
                                errorMessage.style.display = 'none';
                                errorMessage.classList.remove('fade-out');
                            }, 500);
                        }, 5000);
                    });
            });
        }
    }
    
    // Highlight stars up to the specified rating
    function highlightStars(stars, rating) {
        stars.forEach(star => {
            const starRating = parseInt(star.getAttribute('data-rating'));
            if (starRating <= rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }
    
    // Submit rating to server (mock implementation)
    function submitRating(rating, feedback) {
        // In a real implementation, this would be an API call
        return new Promise((resolve, reject) => {
            console.log('Submitting rating:', rating, feedback);
            
            // Get page information
            const pageInfo = {
                url: window.location.pathname,
                title: document.title
            };
            
            // Log the rating data
            console.log('Page rated:', pageInfo.title, 'Rating:', rating, 'Feedback:', feedback);
            
            // Simulate successful submission
            setTimeout(resolve, 1000);
        });
    }
    
    // Public API
    return {
        init: init
    };
})();

// Initialize the rating system when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.RatingSystem.init();
});

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    initFormValidation();
    initAnimations();
    initMobileMenu();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = '#fff';
            navbar.style.backdropFilter = 'none';
        }
    });

    // Active nav link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// Form validation functionality
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            clearErrors();
            
            let isValid = true;

            // Validate name
            if (!validateName(nameInput.value)) {
                showError('nameError', 'Please enter a valid name (at least 2 characters)');
                isValid = false;
            }

            // Validate email
            if (!validateEmail(emailInput.value)) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            }

            // Validate message
            if (!validateMessage(messageInput.value)) {
                showError('messageError', 'Please enter a message (at least 10 characters)');
                isValid = false;
            }

            if (isValid) {
                submitForm(contactForm);
            }
        });

        // Real-time validation
        nameInput.addEventListener('blur', function() {
            if (this.value && !validateName(this.value)) {
                showError('nameError', 'Please enter a valid name (at least 2 characters)');
            } else {
                clearError('nameError');
            }
        });

        emailInput.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                showError('emailError', 'Please enter a valid email address');
            } else {
                clearError('emailError');
            }
        });

        messageInput.addEventListener('blur', function() {
            if (this.value && !validateMessage(this.value)) {
                showError('messageError', 'Please enter a message (at least 10 characters)');
            } else {
                clearError('messageError');
            }
        });
    }
}

// Validation functions
function validateName(name) {
    return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim());
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

function validateMessage(message) {
    return message.trim().length >= 10;
}

// Error handling functions
function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearError(errorId) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

// Form submission
function submitForm(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="loading"></span> Sending...';
    
    // Simulate form submission (replace with actual form submission logic)
    setTimeout(() => {
        // Reset form
        form.reset();
        
        // Show success message
        showSuccessMessage();
        
        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        
        // Clear any remaining errors
        clearErrors();
    }, 2000);
}

function showSuccessMessage() {
    // Create success notification
    const successDiv = document.createElement('div');
    successDiv.className = 'success-notification';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Thank you! Your message has been sent successfully. We'll get back to you soon.</span>
    `;
    
    // Add styles
    successDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;
    
    document.body.appendChild(successDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        successDiv.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 300);
    }, 5000);
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
}

function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

// Animation on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.service-card, .doctor-card, .stat, .about-text, .contact-form');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Button interactions
document.addEventListener('DOMContentLoaded', function() {
    // Book appointment buttons
    const appointmentButtons = document.querySelectorAll('.btn:contains("Book Appointment"), .btn:contains("Emergency Care")');
    
    appointmentButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Scroll to contact form
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const headerOffset = 80;
                const elementPosition = contactSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Enhanced button click handling
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn') || e.target.closest('.btn')) {
        const button = e.target.matches('.btn') ? e.target : e.target.closest('.btn');
        const buttonText = button.textContent.toLowerCase();
        
        if (buttonText.includes('appointment') || buttonText.includes('emergency')) {
            // Scroll to contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const headerOffset = 80;
                const elementPosition = contactSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});

// Window resize handler
window.addEventListener('resize', function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Add CSS animations for success notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: #2c5aa0 !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

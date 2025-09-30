/* ==========================================
   HelpScout Portfolio - Main JavaScript
   Interactive Functionality & Animations
   ========================================== */

// ==========================================
// Global Variables and Constants
// ==========================================
const ANIMATION_DURATION = 300;
const SCROLL_OFFSET = 100;
const TYPING_SPEED = 50;
const COUNTER_SPEED = 2000;

// DOM Elements
let navbar, hamburger, navMenu, preloader, backToTop;
let isScrolling = false;
let currentSection = 'home';

// ==========================================
// Utility Functions
// ==========================================

/**
 * Debounce function to limit function calls
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit function calls
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element, offset = 0) {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    return (
        rect.top <= windowHeight - offset &&
        rect.bottom >= offset &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
        rect.right >= 0
    );
}

/**
 * Smooth scroll to element
 */
function smoothScrollTo(element, offset = 0) {
    if (!element) return;
    
    const targetPosition = element.offsetTop - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let start = null;

    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

/**
 * Add CSS class with animation
 */
function addClassWithDelay(element, className, delay = 0) {
    setTimeout(() => {
        if (element) {
            element.classList.add(className);
        }
    }, delay);
}

/**
 * Format number with commas
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// ==========================================
// Preloader
// ==========================================
function initPreloader() {
    preloader = document.getElementById('preloader');
    
    if (preloader) {
        // Show preloader initially
        document.body.style.overflow = 'hidden';
        
        // Hide preloader after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.style.overflow = '';
                
                // Remove preloader from DOM after animation
                setTimeout(() => {
                    if (preloader.parentNode) {
                        preloader.parentNode.removeChild(preloader);
                    }
                }, 500);
            }, 1000); // Show preloader for at least 1 second
        });
    }
}

// ==========================================
// Navigation
// ==========================================
function initNavigation() {
    navbar = document.querySelector('.navbar');
    hamburger = document.querySelector('.hamburger');
    navMenu = document.querySelector('.nav-menu');
    
    if (!navbar || !hamburger || !navMenu) return;

    // Toggle mobile menu
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                closeMobileMenu();
                smoothScrollTo(targetElement, SCROLL_OFFSET);
                
                // Update active nav link
                updateActiveNavLink(targetId.substring(1));
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Handle scroll events
    const handleScroll = throttle(() => {
        updateNavbarOnScroll();
        updateActiveSection();
    }, 100);
    
    window.addEventListener('scroll', handleScroll);
    
    // Handle resize events
    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    }, 250));
}

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Toggle body scroll
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

function updateNavbarOnScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + SCROLL_OFFSET + 50;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            updateActiveNavLink(sectionId);
        }
    });
}

function updateActiveNavLink(sectionId) {
    if (currentSection === sectionId) return;
    
    currentSection = sectionId;
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

// ==========================================
// Animated Counter
// ==========================================
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    let countersAnimated = false;
    
    function animateCounters() {
        if (countersAnimated) return;
        
        const heroSection = document.getElementById('home');
        if (!isInViewport(heroSection, 200)) return;
        
        countersAnimated = true;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = COUNTER_SPEED;
            const startTime = performance.now();
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentValue = Math.floor(target * easeOutQuart);
                
                counter.textContent = target > 99 ? `${currentValue}` : currentValue;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target > 99 ? `${target}` : target;
                }
            }
            
            requestAnimationFrame(updateCounter);
        });
    }
    
    // Check on scroll
    window.addEventListener('scroll', throttle(animateCounters, 100));
    
    // Check on load
    setTimeout(animateCounters, 2000);
}

// ==========================================
// Typing Effect
// ==========================================
function initTypingEffect() {
    const typingElements = document.querySelectorAll('[data-typing]');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid currentColor';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, TYPING_SPEED);
            } else {
                // Remove cursor after typing
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 500);
            }
        }
        
        // Start typing when element is visible
        function startTyping() {
            if (isInViewport(element, 100)) {
                typeWriter();
                window.removeEventListener('scroll', startTyping);
            }
        }
        
        window.addEventListener('scroll', throttle(startTyping, 100));
        startTyping(); // Check immediately
    });
}

// ==========================================
// Parallax Effects
// ==========================================
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-shapes .shape');
    
    if (parallaxElements.length === 0) return;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.3;
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    }
    
    window.addEventListener('scroll', throttle(updateParallax, 16));
}

// ==========================================
// Scroll Animations
// ==========================================
function initScrollAnimations() {
    // Elements that should animate on scroll
    const animateElements = document.querySelectorAll([
        '.feature-card',
        '.tech-category',
        '.arch-feature',
        '.screenshot-item',
        '.contact-card'
    ].join(', '));
    
    function checkAnimations() {
        animateElements.forEach((element, index) => {
            if (isInViewport(element, 100) && !element.classList.contains('animated')) {
                // Add staggered delay
                setTimeout(() => {
                    element.classList.add('animated', 'fade-in-up');
                }, index * 100);
            }
        });
    }
    
    // Check on scroll and load
    window.addEventListener('scroll', throttle(checkAnimations, 100));
    window.addEventListener('load', checkAnimations);
    
    // Initial check
    setTimeout(checkAnimations, 500);
}

// ==========================================
// Interactive Elements
// ==========================================
function initInteractiveElements() {
    // Add hover effects to cards
    const cards = document.querySelectorAll([
        '.feature-card',
        '.tech-item',
        '.contact-card',
        '.screenshot-mockup'
    ].join(', '));
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ==========================================
// Back to Top Button
// ==========================================
function initBackToTop() {
    // Create back to top button
    backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    
    // Add styles
    Object.assign(backToTop.style, {
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '50px',
        height: '50px',
        backgroundColor: 'var(--primary-color)',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        fontSize: '1.2rem',
        boxShadow: 'var(--shadow-lg)',
        transition: 'all 0.3s ease',
        opacity: '0',
        visibility: 'hidden',
        transform: 'translateY(20px)',
        zIndex: '1000'
    });
    
    document.body.appendChild(backToTop);
    
    // Show/hide based on scroll position
    function toggleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
            backToTop.style.transform = 'translateY(0)';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
            backToTop.style.transform = 'translateY(20px)';
        }
    }
    
    // Smooth scroll to top
    backToTop.addEventListener('click', () => {
        smoothScrollTo(document.body, 0);
    });
    
    // Hover effects
    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = window.scrollY > 500 ? 'translateY(-5px) scale(1.1)' : 'translateY(15px) scale(1.1)';
    });
    
    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = window.scrollY > 500 ? 'translateY(0)' : 'translateY(20px)';
    });
    
    window.addEventListener('scroll', throttle(toggleBackToTop, 100));
}

// ==========================================
// Form Handling
// ==========================================
function initFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        try {
            // Simulate form submission (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            showNotification('Message sent successfully!', 'success');
            
            // Reset form
            this.reset();
            
        } catch (error) {
            // Show error message
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
    
    // Add real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', debounce(validateInput, 300));
    });
}

function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    
    // Remove existing validation classes
    input.classList.remove('valid', 'invalid');
    
    // Validate based on input type
    let isValid = false;
    
    switch (input.type) {
        case 'email':
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            break;
        case 'text':
            isValid = value.length >= 2;
            break;
        default:
            isValid = value.length > 0;
    }
    
    // Add validation class
    input.classList.add(isValid ? 'valid' : 'invalid');
}

// ==========================================
// Notification System
// ==========================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" aria-label="Close notification">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '2rem',
        right: '2rem',
        backgroundColor: type === 'success' ? '#51cf66' : type === 'error' ? '#ff6b6b' : '#667eea',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '0.5rem',
        boxShadow: 'var(--shadow-lg)',
        zIndex: '10000',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease',
        minWidth: '300px',
        maxWidth: '400px'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Manual remove
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// ==========================================
// Performance Optimization
// ==========================================
function initPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
    
    // Preload critical resources
    const criticalResources = [
        'assets/css/main.css',
        'assets/css/responsive.css'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// ==========================================
// AOS (Animate On Scroll) Integration
// ==========================================
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100,
            delay: 0,
            anchorPlacement: 'top-bottom'
        });
    }
}

// ==========================================
// Demo Button Handler
// ==========================================
function initDemoHandlers() {
    const demoButtons = document.querySelectorAll('a[href="#demo"], .demo-btn');
    
    demoButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // If it's an internal demo link
            if (this.getAttribute('href') === '#demo') {
                e.preventDefault();
                const demoSection = document.getElementById('demo');
                if (demoSection) {
                    smoothScrollTo(demoSection, SCROLL_OFFSET);
                }
            }
            // External demo links will work normally
        });
    });
}

// ==========================================
// Theme Toggle (Optional)
// ==========================================
function initThemeToggle() {
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Create theme toggle button (optional)
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    
    // Add styles
    Object.assign(themeToggle.style, {
        position: 'fixed',
        top: '50%',
        right: '2rem',
        transform: 'translateY(-50%)',
        width: '40px',
        height: '40px',
        backgroundColor: 'var(--primary-color)',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        fontSize: '1rem',
        zIndex: '999',
        transition: 'all 0.3s ease',
        display: 'none' // Hidden by default
    });
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
    });
}

// ==========================================
// Error Handling
// ==========================================
function initErrorHandling() {
    // Global error handler
    window.addEventListener('error', (e) => {
        console.error('JavaScript Error:', e.error);
        // You could send this to an error reporting service
    });
    
    // Promise rejection handler
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled Promise Rejection:', e.reason);
        e.preventDefault();
    });
}

// ==========================================
// Main Initialization
// ==========================================
function init() {
    // Initialize all modules
    initErrorHandling();
    initPreloader();
    initNavigation();
    initCounters();
    initTypingEffect();
    initParallaxEffects();
    initScrollAnimations();
    initInteractiveElements();
    initBackToTop();
    initFormHandling();
    initPerformanceOptimizations();
    initAOS();
    initDemoHandlers();
    initThemeToggle();
    
    // Add custom CSS for dynamic elements
    addCustomStyles();
    
    console.log('🚀 HelpScout Portfolio initialized successfully!');
}

// ==========================================
// Custom Styles
// ==========================================
function addCustomStyles() {
    const styles = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-effect 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-effect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .fade-in-up {
            animation: fade-in-up 0.6s ease forwards;
        }
        
        @keyframes fade-in-up {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .notification {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0.25rem;
        }
        
        .form-group input.valid,
        .form-group textarea.valid,
        .form-group select.valid {
            border-color: #51cf66;
        }
        
        .form-group input.invalid,
        .form-group textarea.invalid,
        .form-group select.invalid {
            border-color: #ff6b6b;
        }
        
        /* Smooth scrolling for older browsers */
        @media (prefers-reduced-motion: no-preference) {
            html {
                scroll-behavior: smooth;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}

// ==========================================
// Initialize when DOM is ready
// ==========================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export functions for external use (if needed)
window.HelpScoutPortfolio = {
    init,
    smoothScrollTo,
    showNotification,
    updateActiveNavLink
};
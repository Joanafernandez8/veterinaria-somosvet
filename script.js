/* ============================================
   VETERINARIA SOMOSVET - JAVASCRIPT
   Interactive Features & Functionality
   ============================================ */

// Testimonials Carousel State
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const totalTestimonials = testimonials.length;

// Move carousel
function moveCarousel(direction) {
    const track = document.querySelector('.testimonials-track');
    
    currentTestimonial += direction;
    
    // Loop around
    if (currentTestimonial >= totalTestimonials) {
        currentTestimonial = 0;
    } else if (currentTestimonial < 0) {
        currentTestimonial = totalTestimonials - 1;
    }
    
    // Animate the transition
    testimonials.forEach((card, index) => {
        card.style.display = index === currentTestimonial ? 'block' : 'none';
    });
    
    // Add animation
    testimonials[currentTestimonial].style.animation = 'none';
    setTimeout(() => {
        testimonials[currentTestimonial].style.animation = 'slideIn 0.5s ease-out';
    }, 10);
}

// Initialize testimonials (show only first one)
function initTestimonials() {
    testimonials.forEach((card, index) => {
        card.style.display = index === 0 ? 'block' : 'none';
    });
}

// Smooth scroll to contact section
function scrollToAppointment() {
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Show notification toast
function showNotification(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            max-width: 400px;
        `;
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    const bgColor = type === 'success' ? '#4a9b7f' : type === 'error' ? '#e74c3c' : '#3498db';
    
    toast.style.cssText = `
        background-color: ${bgColor};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        margin-bottom: 10px;
        font-weight: 500;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        animation: slideInRight 0.3s ease-out;
    `;
    
    toast.textContent = message;
    toastContainer.appendChild(toast);
    
    // Remove after 4 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Intersection Observer for scroll animations
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-reveal-active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe service cards and highlight elements
    document.querySelectorAll('.service-card, .highlight').forEach((el) => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
}

// Phone number formatting
function formatPhoneNumber(phone) {
    // Remove non-numeric characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Format as Argentine phone number
    if (cleaned.length === 10) {
        // Format: 11 2345-6789
        return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length === 12) {
        // Format: +54 11 2345-6789
        return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 8)}-${cleaned.slice(8)}`;
    }
    return phone;
}

// Add CSS animation keyframes dynamically
function injectAnimationStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(20px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Sticky header scroll effect
function initStickyHeader() {
    const header = document.querySelector('.sticky-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const header = document.querySelector('.header-container');
    const navMenu = document.querySelector('.nav-menu');
    
    // Check if we need mobile menu (would be set by CSS media query)
    // This is a basic implementation
    const navItems = navMenu?.querySelectorAll('a');
    
    if (navItems) {
        navItems.forEach((item) => {
            item.addEventListener('click', () => {
                // Close menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            });
        });
    }
}

// Lazy loading images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Image loading is handled by browser with loading="lazy"
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach((img) => imageObserver.observe(img));
    }
}

// Track analytics event
function trackEvent(eventName, eventData = {}) {
    // This could be connected to Google Analytics or another service
    console.log(`Event: ${eventName}`, eventData);
}

// Service card click tracking
function initServiceTracking() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card) => {
        card.addEventListener('click', () => {
            const serviceName = card.querySelector('h3')?.textContent;
            trackEvent('service_viewed', { service: serviceName });
        });
    });
}

// WhatsApp button tracking
function initWhatsAppTracking() {
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappButtons.forEach((button) => {
        button.addEventListener('click', () => {
            trackEvent('whatsapp_click', { source: button.textContent });
        });
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Veterinaria Somosvet website initialized');
    
    // Initialize all features
    injectAnimationStyles();
    initTestimonials();
    initStickyHeader();
    initScrollReveal();
    initMobileMenu();
    initLazyLoading();
    initServiceTracking();
    initWhatsAppTracking();
    
    // Auto-rotate testimonials every 8 seconds
    setInterval(() => {
        moveCarousel(1);
    }, 8000);
});

// Handle errors gracefully
window.addEventListener('error', (event) => {
    console.error('Application error:', event.error);
});

// Performance monitoring
if ('PerformanceObserver' in window) {
    try {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log('Performance metric:', entry.name, entry.duration);
            }
        });
        
        observer.observe({ entryTypes: ['navigation', 'paint'] });
    } catch (e) {
        // Performance Observer not supported
    }
}
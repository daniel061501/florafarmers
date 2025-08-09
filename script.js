// DOM Elements
const landingSection = document.getElementById('landing');
const aboutSection = document.getElementById('about');
const projectsSection = document.getElementById('projects');
const productsSection = document.getElementById('products');

// Navigation buttons
const navButtons = document.querySelectorAll('.nav-btn');
const backButtons = document.querySelectorAll('.back-btn');

// Section mapping
const sections = {
    'landing': landingSection,
    'about': aboutSection,
    'projects': projectsSection,
    'products': productsSection
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Ensure only landing section is visible initially
    showSection('landing');
    
    // Add event listeners to navigation buttons
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            navigateToSection(targetSection);
        });
    });
    
    // Add event listeners to back buttons
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            navigateToSection(targetSection);
        });
    });
});

// Navigation function
function navigateToSection(targetSection) {
    // Hide current section with animation
    const currentSection = getCurrentVisibleSection();
    if (currentSection) {
        currentSection.classList.add('slide-out');
        setTimeout(() => {
            hideAllSections();
            showSection(targetSection);
        }, 300);
    } else {
        hideAllSections();
        showSection(targetSection);
    }
}

// Get currently visible section
function getCurrentVisibleSection() {
    for (let key in sections) {
        if (sections[key].style.display !== 'none' && sections[key].classList.contains('fade-in')) {
            return sections[key];
        }
    }
    return null;
}

// Hide all sections
function hideAllSections() {
    for (let key in sections) {
        sections[key].style.display = 'none';
        sections[key].classList.remove('fade-in', 'slide-out');
    }
}

// Show specific section
function showSection(sectionName) {
    const section = sections[sectionName];
    if (section) {
        section.style.display = 'block';
        section.classList.add('fade-in');
        
        // Scroll to top when showing new section
        window.scrollTo(0, 0);
    }
}

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation for better UX
window.addEventListener('load', function() {
    const landingContent = document.querySelector('.landing-content');
    landingContent.style.opacity = '0';
    landingContent.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        landingContent.style.transition = 'all 0.8s ease-out';
        landingContent.style.opacity = '1';
        landingContent.style.transform = 'translateY(0)';
    }, 100);
});

// Add parallax effect to landing section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const landing = document.querySelector('.landing-section');
    const rate = scrolled * -0.5;
    
    if (landing && window.innerWidth > 768) {
        landing.style.transform = `translateY(${rate}px)`;
    }
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.about-card, .project-card, .product-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        navigateToSection('landing');
    }
});

// Add touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        const currentSection = getCurrentVisibleSection();
        if (currentSection && currentSection !== landingSection) {
            navigateToSection('landing');
        }
    }
}

// Add preloader effect
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Error handling for missing elements
window.addEventListener('error', function(e) {
    console.warn('Error loading resource:', e.filename);
});

// Performance optimization - lazy load images if any are added later
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

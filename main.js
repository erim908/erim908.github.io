// ===================================
// Main JavaScript for Personal Website
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all features
    initializeHamburgerMenu();
    initializeSkillBars();
    initializeFormValidation();
    initializeNavbarScroll();
    initializeSmoothScroll();
    
});

// ===================================
// Hamburger Menu
// ===================================
function initializeHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (!hamburger || !navLinks) return;
    
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// ===================================
// Skill Bar Animation
// ===================================
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Intersection Observer to trigger animation when skills section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const progress = skillBar.getAttribute('data-progress');
                skillBar.style.width = progress + '%';
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ===================================
// Form Validation
// ===================================
function initializeFormValidation() {
    const form = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Clear previous feedback
        feedback.textContent = '';
        feedback.className = 'form-feedback';
        
        // Validation
        if (!validateForm(name, email, message)) {
            return;
        }
        
        // If validation passes, show success message
        showSuccessMessage();
        form.reset();
    });
}

function validateForm(name, email, message) {
    const feedback = document.getElementById('formFeedback');
    
    // Name validation
    if (name.length < 2) {
        showError('Please enter a valid name (at least 2 characters)');
        return false;
    }
    
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showError('Please enter a valid email address');
        return false;
    }
    
    // Message validation
    if (message.length < 10) {
        showError('Please enter a message (at least 10 characters)');
        return false;
    }
    
    return true;
}

function showError(message) {
    const feedback = document.getElementById('formFeedback');
    feedback.textContent = message;
    feedback.classList.add('error');
}

function showSuccessMessage() {
    const feedback = document.getElementById('formFeedback');
    feedback.textContent = 'Thank you for your message! I\'ll get back to you soon.';
    feedback.classList.add('success');
}

// ===================================
// Navbar Scroll Effect
// ===================================
function initializeNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Hide navbar when scrolling down, show when scrolling up
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// ===================================
// Smooth Scroll for Navigation Links
// ===================================
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links
            if (href === '#' || href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ===================================
// Add interactive hover effects to cards
// ===================================
document.querySelectorAll('.experience-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ===================================
// Console Easter Egg
// ===================================
console.log('%c Hello, curious developer!', 'color: #d4502e; font-size: 20px; font-weight: bold;');
console.log('%cThanks for checking out the code. Feel free to reach out if you want to collaborate!', 'color: #666; font-size: 14px;');
// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('active');
    
    // Burger Animation
    burger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('active');
    });
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 31, 58, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 217, 255, 0.2)';
    } else {
        navbar.style.background = 'rgba(26, 31, 58, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 217, 255, 0.1)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Dynamic project loading (example function)
// You can modify this to fetch actual projects from GitHub API
function loadProjects() {
    // This is a placeholder - you can extend this to fetch real data from GitHub
    const projectsGrid = document.getElementById('projectsGrid');
    
    // Example: You could fetch from GitHub API here
    // fetch('https://api.github.com/repos/Verflucht0815/esp32-projects/contents/')
    //     .then(response => response.json())
    //     .then(data => {
    //         // Process and display projects
    //     });
}

// Particle effect for hero section (optional)
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 217, 255, 0.5);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${5 + Math.random() * 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        hero.appendChild(particle);
    }
}

// Initialize particles (optional - uncomment to enable)
// createParticles();

// Console message
console.log('%c ESP32 Projects ', 'background: linear-gradient(135deg, #00d9ff, #0066ff); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('Willkommen! Schau dir den Code auf GitHub an: https://github.com/Verflucht0815/esp32-projects');

// Track page views (optional - add your analytics here)
function trackPageView() {
    // Add your analytics code here if needed
    console.log('Page view tracked');
}

trackPageView();

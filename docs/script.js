// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1000);
});

// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('active');
    });
});

// Smooth Scrolling
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
        navbar.style.background = 'rgba(18, 33, 26, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 217, 163, 0.2)';
    } else {
        navbar.style.background = 'var(--card-bg)';
        navbar.style.boxShadow = 'none';
    }
});

// Fade-in on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Animated Counter for Stats
const animateCounter = (element) => {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target.querySelector('.stat-number');
            if (counter && !counter.classList.contains('animated')) {
                counter.classList.add('animated');
                animateCounter(counter);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statObserver.observe(card);
});

// Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'dark';

document.documentElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Project Search
const searchInput = document.getElementById('project-search');
const projectCards = document.querySelectorAll('.project-card');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    projectCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const tags = card.dataset.tags || '';
        
        if (title.includes(searchTerm) || description.includes(searchTerm) || tags.includes(searchTerm)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
});

// Project Filter
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.dataset.filter;
        
        projectCards.forEach(card => {
            if (filter === 'all') {
                card.classList.remove('hidden');
            } else {
                const difficulty = card.dataset.difficulty;
                if (difficulty === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            }
        });
        
        // Reset search
        searchInput.value = '';
    });
});

// Lightbox for Project Images
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const projectImages = [];

// Collect all project images
document.querySelectorAll('.project-image img').forEach((img, index) => {
    if (img.style.display !== 'none') {
        projectImages.push({
            src: img.src,
            alt: img.alt
        });
    }
});

window.openLightbox = (index) => {
    const img = document.querySelectorAll('.project-image img')[index];
    if (img && img.style.display !== 'none') {
        lightbox.classList.add('active');
        lightboxImg.src = img.src;
        document.querySelector('.lightbox-caption').textContent = img.alt;
        document.body.style.overflow = 'hidden';
    }
};

lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all items
        faqItems.forEach(faq => faq.classList.remove('active'));
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// View Counter (simulated)
const viewCounters = document.querySelectorAll('.view-count');
viewCounters.forEach(counter => {
    const currentCount = parseInt(counter.textContent);
    const viewObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counter.classList.contains('counted')) {
                counter.classList.add('counted');
                // Simulate view increment
                counter.textContent = currentCount + 1;
                
                // Store in localStorage (optional)
                const projectTitle = entry.target.closest('.project-card').querySelector('h3').textContent;
                const storageKey = 'views_' + projectTitle.replace(/\s+/g, '_');
                const storedViews = localStorage.getItem(storageKey) || currentCount;
                localStorage.setItem(storageKey, parseInt(storedViews) + 1);
            }
        });
    }, { threshold: 0.5 });
    
    viewObserver.observe(counter.closest('.project-card'));
});

// Project Rating Click (optional interactivity)
document.querySelectorAll('.project-rating').forEach(rating => {
    const stars = rating.querySelector('.stars');
    stars.style.cursor = 'pointer';
    
    stars.addEventListener('click', () => {
        alert('Vielen Dank für deine Bewertung! Diese Funktion wird bald verfügbar sein.');
    });
});

// Console Easter Egg
console.log('%c 🚀 ESP32 Projects by NPC0815 ', 'background: linear-gradient(135deg, #00d9a3, #00a86b); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%c Schau dir den Code auf GitHub an! 💻', 'color: #00d9a3; font-size: 14px;');
console.log('https://github.com/Verflucht0815/esp32-projects');

// Track page engagement
let pageViewTime = 0;
let pageVisible = true;

document.addEventListener('visibilitychange', () => {
    pageVisible = !document.hidden;
});

setInterval(() => {
    if (pageVisible) {
        pageViewTime++;
        
        // Log milestones
        if (pageViewTime === 30) {
            console.log('📊 User engaged for 30 seconds!');
        }
        if (pageViewTime === 60) {
            console.log('📊 User engaged for 1 minute!');
        }
    }
}, 1000);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for search focus
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
    
    // Escape to close lightbox
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // D for dark mode toggle
    if (e.key === 'd' && !searchInput.matches(':focus')) {
        themeToggle.click();
    }
});

// Scroll to top button (optional)
const createScrollToTop = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: var(--dark-bg);
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s;
        z-index: 1000;
        display: none;
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.style.display = 'block';
            setTimeout(() => button.style.opacity = '1', 10);
        } else {
            button.style.opacity = '0';
            setTimeout(() => button.style.display = 'none', 300);
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

createScrollToTop();

// Initialize
console.log('✅ All features loaded successfully!');
console.log('🎨 Current theme:', document.documentElement.getAttribute('data-theme'));
console.log('📱 Mobile view:', window.innerWidth <= 768);
console.log('🔍 Type Ctrl+K to search projects');
console.log('🌓 Press D to toggle dark/light mode');

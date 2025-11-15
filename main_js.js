// ===== GLOBALE FUNKTIONEN =====

// Smooth Scrolling für Anker-Links
document.addEventListener('DOMContentLoaded', function() {
    // Alle internen Links finden
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // "Nach oben" Button funktionalität
    const backToTopButtons = document.querySelectorAll('[href="#top"], .back-to-top');
    backToTopButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
});

// ===== PROJEKT-KARTEN ANIMATION =====
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    // Intersection Observer für Fade-in Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    projectCards.forEach(card => {
        observer.observe(card);
    });
}

// Bei Seitenladung initialisieren
if (document.querySelector('.project-card')) {
    initProjectCards();
}

// ===== COPY TO CLIPBOARD =====
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.textContent;
        button.textContent = '✓ Kopiert!';
        button.style.background = '#10b981';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Fehler beim Kopieren:', err);
    });
}

// Copy-Buttons für Code-Blöcke hinzufügen
document.addEventListener('DOMContentLoaded', function() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        const pre = block.parentElement;
        
        // Wrapper für Position: relative
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);
        
        // Copy Button erstellen
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.textContent = '📋 Kopieren';
        button.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: #6b7280;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.85em;
            transition: all 0.3s;
        `;
        
        button.addEventListener('click', () => {
            copyToClipboard(block.textContent, button);
        });
        
        button.addEventListener('mouseenter', () => {
            button.style.background = '#4ecdc4';
        });
        
        button.addEventListener('mouseleave', () => {
            if (button.textContent === '📋 Kopieren') {
                button.style.background = '#6b7280';
            }
        });
        
        wrapper.appendChild(button);
    });
});

// ===== DARK MODE TOGGLE (optional) =====
// Falls du später einen Light Mode hinzufügen willst
function toggleDarkMode() {
    document.body.classList.toggle('light-mode');
    
    const isDark = !document.body.classList.contains('light-mode');
    localStorage.setItem('darkMode', isDark);
}

// Dark Mode Präferenz laden
document.addEventListener('DOMContentLoaded', function() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'false') {
        document.body.classList.add('light-mode');
    }
});

// ===== SUCHE / FILTER (für Projektübersicht) =====
function filterProjects(searchTerm) {
    const projects = document.querySelectorAll('.project-card:not(.project-placeholder)');
    const lowerSearch = searchTerm.toLowerCase();
    
    projects.forEach(project => {
        const title = project.querySelector('h2').textContent.toLowerCase();
        const description = project.querySelector('p').textContent.toLowerCase();
        const tags = Array.from(project.querySelectorAll('.tag'))
            .map(tag => tag.textContent.toLowerCase())
            .join(' ');
        
        const matches = title.includes(lowerSearch) || 
                       description.includes(lowerSearch) || 
                       tags.includes(lowerSearch);
        
        if (matches) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}

// Such-Funktion für Hauptseite
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('project-search');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            filterProjects(e.target.value);
        });
    }
});

// ===== EXTERNE LINKS IN NEUEM TAB =====
document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    
    externalLinks.forEach(link => {
        // Nur wenn es nicht schon target="_blank" hat
        if (!link.hasAttribute('target')) {
            // Prüfen ob es ein externer Link ist (nicht eigene Domain)
            const currentDomain = window.location.hostname;
            const linkDomain = new URL(link.href).hostname;
            
            if (linkDomain !== currentDomain) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        }
    });
});

// ===== PRINT FUNKTION =====
function printPage() {
    window.print();
}

// ===== SCROLL PROGRESS INDICATOR =====
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scroll-progress');
    if (!scrollProgress) return;
    
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    scrollProgress.style.width = scrollPercent + '%';
}

// Scroll Progress initialisieren
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('scroll-progress')) {
        window.addEventListener('scroll', updateScrollProgress);
    }
});

// ===== LAZY LOADING FÜR BILDER =====
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
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
});

// ===== MOBILE MENU TOGGLE (falls Navigation erweitert wird) =====
function toggleMobileMenu() {
    const nav = document.querySelector('.main-nav');
    nav.classList.toggle('mobile-open');
}

// ===== UTILITY FUNKTIONEN =====

// Formatiere Datum
function formatDate(date) {
    return new Date(date).toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Formatiere Zeit
function formatTime(date) {
    return new Date(date).toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Prüfe ob Element im Viewport ist
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===== CONSOLE INFO =====
console.log('%c🔧 ESP32 Projekte', 'font-size: 20px; font-weight: bold; color: #4ecdc4;');
console.log('%cDokumentation und Code für IoT-Projekte', 'font-size: 12px; color: #9ca3af;');
console.log('%cVersion 1.0', 'font-size: 10px; color: #6b7280;');
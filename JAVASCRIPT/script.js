// Carrousel Hero
class HeroCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.carousel-nav.prev');
        this.nextBtn = document.querySelector('.carousel-nav.next');
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5 secondes
        
        this.init();
    }
    
    init() {
        // Gestion des flèches
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Gestion des indicateurs
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Navigation au clavier
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Support du swipe pour mobile
        this.addTouchSupport();
        
        // Pause auto-play au survol
        const carousel = document.querySelector('.hero-carousel');
        carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Démarrer l'auto-play
        this.startAutoPlay();
        
        // Pause auto-play quand l'onglet n'est pas visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stopAutoPlay();
            } else {
                this.startAutoPlay();
            }
        });
    }
    
    goToSlide(index) {
        // Retirer la classe active de la slide actuelle
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');
        
        // Mettre à jour l'index
        this.currentSlide = index;
        
        // Ajouter la classe active à la nouvelle slide
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
        
        // Redémarrer l'animation de l'image
        const img = this.slides[this.currentSlide].querySelector('.slide-image img');
        img.style.animation = 'none';
        setTimeout(() => {
            img.style.animation = '';
        }, 10);
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    startAutoPlay() {
        this.stopAutoPlay(); // Nettoyer tout intervalle existant
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    addTouchSupport() {
        const carousel = document.querySelector('.hero-carousel');
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, { passive: true });
    }
    
    handleSwipe(startX, endX) {
        const threshold = 50; // Minimum de pixels pour considérer un swipe
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Swipe vers la gauche - slide suivante
                this.nextSlide();
            } else {
                // Swipe vers la droite - slide précédente
                this.prevSlide();
            }
        }
    }
}

// Navigation transparente qui devient opaque au scroll
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.scrollThreshold = 50;
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > this.scrollThreshold) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }
}

// Animation au scroll pour les éléments
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, this.observerOptions);
        
        // Observer les sections
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.8s ease-out';
            observer.observe(section);
        });
    }
}

// Préchargement des images
class ImagePreloader {
    constructor() {
        this.images = [];
        this.init();
    }
    
    init() {
        const slides = document.querySelectorAll('.carousel-slide img');
        slides.forEach(img => {
            const src = img.getAttribute('src');
            if (src) {
                const preloadImg = new Image();
                preloadImg.src = src;
                this.images.push(preloadImg);
            }
        });
    }
}

// Gestion des boutons CTA
class CTAButtons {
    constructor() {
        this.init();
    }
    
    init() {
        const ctaButtons = document.querySelectorAll('.cta-button');
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Effet de ripple
                this.createRipple(e, button);
                
                // Action du bouton (à personnaliser selon vos besoins)
                console.log('CTA clicked:', button.textContent);
                // Vous pouvez ajouter ici la navigation ou action souhaitée
            });
        });
    }
    
    createRipple(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
}

// Style pour l'animation ripple
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser tous les composants
    new HeroCarousel();
    new NavbarScroll();
    new ScrollAnimations();
    new ImagePreloader();
    new CTAButtons();
    
    // Effet de chargement
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('EducXperience site loaded successfully! 🎓');
});

// Optimisation des performances - Debounce pour le resize
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

// Ajuster la hauteur du viewport sur mobile
const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

window.addEventListener('resize', debounce(setVH, 250));
setVH();


// DEUXIÈME SESSION
// Gestion de la navigation des boutons CTA
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.cta-button[data-href]');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const url = this.getAttribute('data-href');
            if (url) {
                window.location.href = url;
            }
        });
    });
});
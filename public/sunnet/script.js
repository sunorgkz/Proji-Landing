document.addEventListener('DOMContentLoaded', () => {
    // 1. Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust scroll position for header height
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Intersection Observer for fade-in animations
    // Add fade-in class to all major sections and cards
    const elementsToAnimate = document.querySelectorAll('.section-header, .card, .core-item, .hero-content');
    elementsToAnimate.forEach(el => el.classList.add('fade-in'));

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered delay based on element's index in parent if needed
                entry.target.classList.add('visible');
                // Optional: stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
});

/* Переключатель темы: выбор общий для всего landing.proji.org (те же ключи, что в lib/projiPrefs.ts) */
(function () {
    var KEYS = ['proji.theme', 'proji-theme', 'proji_theme', 'theme', 'main-landing-theme', 'chrome_extension_theme', 'secondbrain-theme'];
    var btn = document.getElementById('theme-btn');
    if (!btn) return;
    function current() { return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'; }
    function paint() {
        var light = current() === 'light';
        btn.textContent = light ? '☾' : '☀';
        btn.setAttribute('aria-label', light ? 'Тёмная тема' : 'Светлая тема');
    }
    btn.addEventListener('click', function () {
        var next = current() === 'light' ? 'dark' : 'light';
        KEYS.forEach(function (k) { try { localStorage.setItem(k, next); } catch (e) {} });
        document.documentElement.dataset.theme = next;
        document.documentElement.classList.toggle('dark', next === 'dark');
        paint();
    });
    paint();
})();

/* =============================================
   script.js — Proji Landing v2
============================================= */
document.addEventListener('DOMContentLoaded', () => {

    /* ─── 1. Animated Background Canvas ─── */
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.r = Math.random() * 3 + 1;
            this.dx = (Math.random() - 0.5) * 0.4;
            this.dy = (Math.random() - 0.5) * 0.4;
            this.alpha = Math.random() * 0.3 + 0.05;
            const cols = ['108,47,255', '255,60,172', '0,180,216', '6,214,160'];
            this.color = cols[Math.floor(Math.random() * cols.length)];
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
            ctx.fill();
        }
        update() {
            this.x += this.dx;
            this.y += this.dy;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
    }

    function initParticles() {
        particles = [];
        const count = Math.floor((canvas.width * canvas.height) / 15000);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(108,47,255,${0.06 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawLines();
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }

    resizeCanvas();
    initParticles();
    animate();
    window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });


    /* ─── 2. Sticky Header ─── */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('pinned', window.scrollY > 40);
    });


    /* ─── 3. Burger Menu ─── */
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobile-menu');
    burger.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });


    /* ─── 4. Smooth Scroll ─── */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const offset = header.offsetHeight + 20;
            window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
        });
    });


    /* ─── 5. Scroll Reveal ─── */
    const revealEls = document.querySelectorAll(
        '.pain-card, .vs-banner, .flow-demo, .feat, .case, .audit-item, .expert-card, .contact-btn, .hero-inner, .section h2, .section-sub'
    );
    revealEls.forEach((el, i) => {
        el.classList.add('reveal');
        // stagger siblings inside grids
        const parentChildren = Array.from(el.parentElement.children);
        const sibIndex = parentChildren.indexOf(el);
        if (sibIndex > 0 && sibIndex <= 3) {
            el.classList.add(`reveal-delay-${sibIndex}`);
        }
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealEls.forEach(el => revealObserver.observe(el));


    /* ─── 6. Animated counters for floating cards ─── */
    const floatCards = document.querySelectorAll('.float-card');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    floatCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        counterObserver.observe(card);
    });
});

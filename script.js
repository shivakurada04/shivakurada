document.addEventListener('DOMContentLoaded', () => {

    // --- Hamburger Menu Logic ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lenis = null;

    if (!reduceMotion && typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            lerp: 0.085,
            smoothWheel: true,
            wheelMultiplier: 0.9
        });

        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);

        document.querySelectorAll('a[href*="#"]').forEach(link => {
            link.addEventListener('click', (event) => {
                const url = new URL(link.href, window.location.href);
                if (url.pathname !== window.location.pathname || !url.hash || url.hash === '#') return;
                const target = document.querySelector(url.hash);
                if (!target) return;
                event.preventDefault();
                lenis.scrollTo(target, { offset: -88 });
                if (navLinks) navLinks.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
            });
        });
    }

    // --- Fade-in on Scroll Logic ---
    document.querySelectorAll('.experience-card, .skill-card, .education-card:not(.is-extra), .project-card').forEach(card => {
        card.classList.add('reveal');
    });

    const motionElements = document.querySelectorAll('.fade-in, .reveal');

    if (reduceMotion) {
        motionElements.forEach(el => el.classList.add('visible'));
    } else {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { root: null, rootMargin: '0px 0px -40px 0px', threshold: 0 });

        motionElements.forEach(el => observer.observe(el));
    }

    document.querySelectorAll('[data-view-all]').forEach(button => {
        button.addEventListener('click', () => {
            const grid = document.getElementById(button.dataset.viewAll);
            if (!grid) return;
            const open = grid.classList.toggle('is-open');
            button.textContent = open ? 'Show less' : 'View all';
            button.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    });

});
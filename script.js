document.addEventListener('DOMContentLoaded', function() {

    // --- Fade-in Effect on Scroll ---
    const fadeElems = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null, 
        threshold: 0.1, 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElems.forEach(elem => {
        observer.observe(elem);
    });

});
// Sticky Header Background Change on Scroll
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.background = 'rgba(10, 25, 47, 0.95)';
        header.style.padding = '1rem 5%';
    } else {
        header.style.background = 'rgba(10, 25, 47, 0.85)';
        header.style.padding = '1.5rem 5%';
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        if (nav.style.display === 'flex') {
            nav.style.display = 'none';
        } else {
            nav.style.display = 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.width = '100%';
            nav.style.background = 'var(--bg-main)';
            nav.style.padding = '2rem';
        }
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            nav.style.display = 'none';
        }
    });
});

// Scroll Animation with Intersection Observer
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

// Observe elements for reveal animation
document.querySelectorAll('.section-title, .service-card, .feature-item, .fleet-card').forEach(el => {
    observer.observe(el);
});

// Hero animations trigger on load
window.addEventListener('load', () => {
    document.querySelectorAll('.animate-reveal').forEach(el => {
        el.style.opacity = '1';
    });
});

// Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
        document.body.classList.add('loaded');
    }, 1500);

    // Initialize all features
    setTimeout(() => {
        initNavbar();
        initCursor();
        initRevealAnimations();
        initMagneticButtons();
        initParallax();
    }, 100);
});

// Navbar - Dynamic color based on section
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    navbar.classList.add('dark-mode');

    const darkSections = ['#hero', '#resources', '#projects'];

    const checkNavbar = () => {
        let isOverDark = false;

        darkSections.forEach(selector => {
            const section = document.querySelector(selector);
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 80 && rect.bottom > 80) {
                    isOverDark = true;
                }
            }
        });

        if (isOverDark) {
            navbar.classList.add('dark-mode');
            navbar.classList.remove('light-mode');
        } else {
            navbar.classList.remove('dark-mode');
            navbar.classList.add('light-mode');
        }
    };

    window.addEventListener('scroll', checkNavbar);
    checkNavbar();
}

// Custom Cursor
function initCursor() {
    const dot = document.querySelector('.cursor-dot');
    const circle = document.querySelector('.cursor-circle');
    if (!dot || !circle) return;

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let circleX = 0, circleY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Dot follows instantly
        dotX += (mouseX - dotX) * 0.5;
        dotY += (mouseY - dotY) * 0.5;
        dot.style.left = dotX + 'px';
        dot.style.top = dotY + 'px';

        // Circle follows with delay
        circleX += (mouseX - circleX) * 0.15;
        circleY += (mouseY - circleY) * 0.15;
        circle.style.left = circleX + 'px';
        circle.style.top = circleY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .service-item, .stat-box, .project-slide');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            dot.style.transform = 'translate(-50%, -50%) scale(0.5)';
            circle.style.transform = 'translate(-50%, -50%) scale(1.5)';
            circle.style.borderColor = 'rgba(197, 160, 89, 0.6)';
        });
        el.addEventListener('mouseleave', () => {
            dot.style.transform = 'translate(-50%, -50%) scale(1)';
            circle.style.transform = 'translate(-50%, -50%) scale(1)';
            circle.style.borderColor = 'rgba(197, 160, 89, 0.4)';
        });
    });
}

// Reveal Animations on Scroll
function initRevealAnimations() {
    const reveals = document.querySelectorAll('.section-title, .about-text, .stat-box, .service-item, .res-item, .director-card, .project-info');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('reveal', 'visible');
                }, index * 100);
            }
        });
    }, observerOptions);

    reveals.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// Magnetic Buttons
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.hero-btn, .nav-cta, .contact-form button');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// Parallax for project images
function initParallax() {
    const projectSlides = document.querySelectorAll('.project-slide img');

    window.addEventListener('scroll', () => {
        projectSlides.forEach(img => {
            const slide = img.parentElement;
            const rect = slide.getBoundingClientRect();

            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 0.1;
                const offset = rect.top * speed;
                img.style.transform = `translateY(${offset}px) scale(1.1)`;
            }
        });
    });
}

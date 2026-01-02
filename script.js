/**
 * SUPREME INFRATECH - THE HYPER-KINETIC MOTION ENGINE
 * Pure Vanilla JS | Awwwards Standard Interactions
 */

window.initMotionEngine = () => {
    initCursor();
    initScrollEngine();
    initProjectPeek();
    initMagneticElements();
    initPortalMotion();
};

// 1. Dual Cursor Logic
function initCursor() {
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    if (!dot || !outline) return;

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    const animateCursor = () => {
        outlineX += (mouseX - outlineX) * 0.12;
        outlineY += (mouseY - outlineY) * 0.12;
        outline.style.transform = `translate3d(${outlineX - 20}px, ${outlineY - 20}px, 0)`;
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    const interactives = document.querySelectorAll('a, .project-row, .kinetic-pill-btn, .leader-card, .data-block');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            outline.style.transform += ' scale(2.5)';
            outline.style.background = 'rgba(212, 184, 150, 0.15)';
            outline.style.borderColor = 'transparent';
        });
        el.addEventListener('mouseleave', () => {
            outline.style.background = 'transparent';
            outline.style.borderColor = 'var(--color-primary)';
        });
    });
}

// 2. Scroll Logic
function initScrollEngine() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Specific logic for scanners
                const scanner = entry.target.querySelector('.scanning-beam');
                if (scanner) scanner.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, .text-reveal, .split-text-reveal').forEach(el => observer.observe(el));
}

// 3. Project Peek Follow
function initProjectPeek() {
    const peek = document.getElementById('projectPeek');
    const rows = document.querySelectorAll('.project-row');
    if (!peek || !rows.length) return;

    rows.forEach(row => {
        row.addEventListener('mousemove', (e) => {
            peek.style.top = (e.clientY + 20) + 'px';
            peek.style.left = (e.clientX + 20) + 'px';
            const img = row.getAttribute('data-img');
            if (img) peek.querySelector('img').src = img;
        });
        row.addEventListener('mouseenter', () => peek.classList.add('active'));
        row.addEventListener('mouseleave', () => peek.classList.remove('active'));
    });
}

// 4. Portal and Schematic Parallax
function initPortalMotion() {
    const hero = document.querySelector('.hero.hyper-kinetic');
    if (!hero) return;

    hero.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
        const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);

        // Move the schematics faster than the portal
        const schematics = hero.querySelector('.schematic-layer');
        if (schematics) {
            schematics.style.transform = `translate3d(${x * 50}px, ${y * 50}px, 0)`;
        }

        const portal = hero.querySelector('.hero-portal');
        if (portal) {
            portal.style.transform = `translate3d(${x * -30}px, ${y * -30}px, 0) rotateY(${x * 5}deg) rotateX(${y * -5}deg)`;
        }

        // Glitch text subtle shift
        const glitch = hero.querySelector('.glitch-text');
        if (glitch) {
            glitch.style.transform = `translate3d(${x * 10}px, ${y * 10}px, 0)`;
        }
    });

    // Initial Shutter Animation (Artificial delay for effect)
    setTimeout(() => {
        hero.querySelectorAll('.text-reveal, .split-text-reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 200);
        });
    }, 500);
}

// 5. Magnetic Pill Button
function initMagneticElements() {
    const pills = document.querySelectorAll('.kinetic-pill-btn');
    pills.forEach(pill => {
        pill.addEventListener('mousemove', (e) => {
            const rect = pill.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
            pill.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
        pill.addEventListener('mouseleave', () => {
            pill.style.transform = 'translate3d(0, 0, 0)';
        });
    });
}

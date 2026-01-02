/**
 * SUPREME INFRATECH - THE BRUTALIST AVANT-GARDE ENGINE
 * Pure Vanilla JS | Awwwards Standard Interactions
 */

window.initMotionEngine = () => {
    initCursor();
    initScrollEngine();
    initAccordion();
    initMatrixGrid();
    initMagneticElements();
    initContactForm();
};

// 1. Dual Cursor Logic (Updated)
function initCursor() {
    // Only if elements exist
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    if (!dot || !outline) return; // Cursor elements were removed in V2, so this safely exits if missing.

    // If we wanted to re-add custom cursor, logic would go here.
    // Currently staying native as per instruction "Remove Custom Cursor".
}

// 2. Scroll Logic (Intersection Observer)
function initScrollEngine() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, .text-reveal, .hero-titles, .stat-row, .pcl-item').forEach(el => observer.observe(el));
}

// 3. Global Accordion Logic (Critical for buttons/dropdowns)
function initAccordion() {
    window.toggleAcc = function (el) {
        if (!el) return;
        // Toggle active class
        el.classList.toggle('active');

        // Handle body height smoothly
        const body = el.querySelector('.acc-body');
        if (body) {
            if (el.classList.contains('active')) {
                body.style.maxHeight = body.scrollHeight + "px";
            } else {
                body.style.maxHeight = 0;
            }
        }

        // Optional: Close others in same group
        const startGroup = el.parentElement;
        if (startGroup) {
            startGroup.querySelectorAll('.acc-item').forEach(item => {
                if (item !== el && item.classList.contains('active')) {
                    item.classList.remove('active');
                    const itemBody = item.querySelector('.acc-body');
                    if (itemBody) itemBody.style.maxHeight = 0;
                }
            });
        }
    };

    // Attach click listeners if not using inline onclick
    document.querySelectorAll('.acc-item').forEach(item => {
        // Remove old listeners to avoid dupes?
        // Ideally we rely on onclick="toggleAcc(this)" in HTML or add here.
        // We will assume HTML has onclick or we add it here just in case.
        item.onclick = (e) => {
            // Check if click was on header
            if (e.target.closest('.acc-header')) {
                // If the item itself calls toggleAcc via HTML, this might double trigger.
                // Best to rely on one. The HTML usually has onclick="toggleAcc(this)".
                // So leaving this empty to avoid conflicts, relying on window.toggleAcc.
            }
        };
    });
}

// 4. Tech Matrix Interaction
function initMatrixGrid() {
    const cells = document.querySelectorAll('.tech-cell');
    cells.forEach(cell => {
        cell.addEventListener('mouseenter', () => {
            cells.forEach(c => c.classList.remove('active'));
            cell.classList.add('active');
        });
    });
}

// 5. Magnetic Elements (Buttons)
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

// 6. Contact Form Logic
function initContactForm() {
    const form = document.querySelector('.c-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.c-btn');
        const originalText = btn.querySelector('span:last-child').innerText;

        btn.querySelector('span:last-child').innerText = 'TRANSMITTING...';
        btn.style.opacity = '0.7';

        setTimeout(() => {
            btn.querySelector('span:last-child').innerText = 'SIGNAL RECEIVED';
            btn.style.borderColor = '#2ecc71'; // Green
            btn.style.opacity = '1';
            form.reset();

            setTimeout(() => {
                btn.querySelector('span:last-child').innerText = originalText;
                btn.style.borderColor = 'white';
            }, 3000);
        }, 1500);
    });
}

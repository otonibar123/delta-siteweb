// =====================================================
// Delta Secrétariat — Scripts
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    // Navbar scroll effect
    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile menu
    const setMenu = (open) => {
        hamburger.classList.toggle('active', open);
        navLinks.classList.toggle('active', open);
        hamburger.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
    };

    hamburger.addEventListener('click', () => {
        setMenu(!hamburger.classList.contains('active'));
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => setMenu(false));
    });

    // Reveal on scroll
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add('visible'), i * 70);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#' || href.length <= 1) return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id], header[id]');
    const navItems = document.querySelectorAll('.nav-links a:not(.btn)');

    const highlightNav = () => {
        const scrollY = window.scrollY + 120;
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollY >= top && scrollY < top + height) {
                current = section.id;
            }
        });
        navItems.forEach(item => {
            const isActive = item.getAttribute('href') === `#${current}`;
            item.classList.toggle('is-active', isActive);
        });
    };
    window.addEventListener('scroll', highlightNav, { passive: true });
    highlightNav();

    // Contact form
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            btn.textContent = 'Envoi en cours…';
            btn.disabled = true;

            // TODO: brancher l'endpoint réel (Formspree, EmailJS, API custom…)
            setTimeout(() => {
                btn.textContent = 'Demande envoyée — merci';
                btn.classList.add('btn-success');

                setTimeout(() => {
                    form.reset();
                    btn.textContent = originalText;
                    btn.classList.remove('btn-success');
                    btn.disabled = false;
                }, 3500);
            }, 900);
        });
    }
});

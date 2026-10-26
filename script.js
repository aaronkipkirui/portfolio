/**
 * Portfolio Interactive Scripts
 * Aron Kemoi - IT Support | Data Analyst | Virtual Assistant | Full Stack Developer
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backdrop = document.getElementById('menuBackdrop');

    function openMenu() {
        navMenu.classList.add('active');
        if (backdrop) backdrop.classList.add('active');
        document.body.classList.add('menu-open');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        navMenu.classList.remove('active');
        if (backdrop) backdrop.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            openMenu();
        });
    }
    if (menuClose) menuClose.addEventListener('click', closeMenu);
    if (backdrop) backdrop.addEventListener('click', closeMenu);

    // Make options work smoothly on click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            closeMenu();

            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    setTimeout(() => {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 50);
                }
            }
        });
    });

    // Close when tapping outside the drawer
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && menuToggle && !menuToggle.contains(e.target)) {
                closeMenu();
            }
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // --- Sticky Navbar on Scroll ---
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (backToTop) {
            if (scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Scrollspy: Highlight Active Nav Link ---
    const sections = document.querySelectorAll('header[id], section[id]');
    
    function updateActiveNav() {
        const scrollPos = window.scrollY + 200;

        sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // --- About Section Tab Switching ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            btn.classList.add('active');
            const activePane = document.getElementById(targetTab);
            if (activePane) {
                activePane.classList.add('active');
            }
        });
    });

    // --- Contact Form Submission ---
    const scriptURL = 'https://script.google.com/macros/s/AKfycbz79q0XKquOh8andNbgbcABpzFg7-gf4kxXhcEsvfwygdTsnsNLDLRWkXYkuOB_imjp_A/exec';
    const form = document.forms['submit-to-google-sheet'];
    const msg = document.getElementById('msg');
    const submitBtn = document.getElementById('submitBtn');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // UI Feedback: Sending state
            const originalBtnContent = submitBtn ? submitBtn.innerHTML : 'Submit';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            }
            if (msg) {
                msg.className = 'status-msg status-info';
                msg.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending your message...';
            }

            try {
                const response = await fetch(scriptURL, {
                    method: 'POST',
                    body: new FormData(form)
                });

                if (msg) {
                    msg.className = 'status-msg status-success';
                    msg.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message was sent successfully.';
                }
                form.reset();

                setTimeout(() => {
                    if (msg) {
                        msg.innerHTML = '';
                        msg.className = 'status-msg';
                    }
                }, 5000);
            } catch (error) {
                console.error('Error submitting form:', error);
                if (msg) {
                    msg.className = 'status-msg status-error';
                    msg.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Oops! Something went wrong. Please email directly at <a href="mailto:aaronkipkirui015@gmail.com">aaronkipkirui015@gmail.com</a>';
                }
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnContent;
                }
            }
        });
    }
});


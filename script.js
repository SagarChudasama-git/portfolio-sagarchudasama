document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const musicToggle = document.getElementById('music-toggle');
    const bgAudio = document.getElementById('bg-audio');
    // const filterBtns = document.querySelectorAll('.filter-btn');
    // const workCards = document.querySelectorAll('.work-card');
    const contactForm = document.getElementById('contact-form');
    const vscodeCmdEl = document.querySelector('.vscode-cmd');
    if (vscodeCmdEl) {
        const greetings = [
            "('Heyy, Developers')",
            "('Nice to Meet You!')",
            "('Innovate & Inspire')"
        ];
        let greetIndex = 0;

        function typeGreeting() {
            const text = greetings[greetIndex];
            let charIndex = 0;

            // Type in
            function typeChar() {
                if (charIndex <= text.length) {
                    vscodeCmdEl.setAttribute('data-cmd', text.substring(0, charIndex));
                    charIndex++;
                    setTimeout(typeChar, 60);
                } else {
                    // Pause, then erase
                    setTimeout(eraseGreeting, 2000);
                }
            }

            // Erase out
            function eraseGreeting() {
                let eraseIndex = text.length;
                function eraseChar() {
                    if (eraseIndex >= 0) {
                        vscodeCmdEl.setAttribute('data-cmd', text.substring(0, eraseIndex));
                        eraseIndex--;
                        setTimeout(eraseChar, 30);
                    } else {
                        // Next greeting
                        greetIndex = (greetIndex + 1) % greetings.length;
                        setTimeout(typeGreeting, 400);
                    }
                }
                eraseChar();
            }

            typeChar();
        }

        // Start with empty, then begin typing
        vscodeCmdEl.setAttribute('data-cmd', '');
        setTimeout(typeGreeting, 800);
    }

    // ============================================
    // INTERACTIVE HERO GRID — Tech logos on hover
    // ============================================
    function getCellSize() {
        return parseInt(getComputedStyle(document.documentElement).getPropertyValue('--cell-size')) || 80;
    }

    const techIcons = [
        { icon: 'fa-brands fa-html5', color: '#E34F26', bg: 'rgba(227, 79, 38, 0.10)' },
        { icon: 'fa-brands fa-css3-alt', color: '#1572B6', bg: 'rgba(21, 114, 182, 0.10)' },
        { icon: 'fa-brands fa-js', color: '#F7DF1E', bg: 'rgba(247, 223, 30, 0.12)' },
        { icon: 'fa-brands fa-react', color: '#61DAFB', bg: 'rgba(97, 218, 251, 0.10)' },
        { icon: 'fa-brands fa-node-js', color: '#339933', bg: 'rgba(51, 153, 51, 0.10)' },
        { icon: 'fa-brands fa-python', color: '#3776AB', bg: 'rgba(55, 118, 171, 0.10)' },
        { icon: 'fa-brands fa-java', color: '#ED8B00', bg: 'rgba(237, 139, 0, 0.10)' },
        { icon: 'fa-brands fa-angular', color: '#DD0031', bg: 'rgba(221, 0, 49, 0.10)' },
        { icon: 'fa-brands fa-vuejs', color: '#4FC08D', bg: 'rgba(79, 192, 141, 0.10)' },
        { icon: 'fa-brands fa-swift', color: '#FA7343', bg: 'rgba(250, 115, 67, 0.10)' },
        { icon: 'fa-brands fa-php', color: '#777BB4', bg: 'rgba(119, 123, 180, 0.10)' },
        { icon: 'fa-brands fa-docker', color: '#2496ED', bg: 'rgba(36, 150, 237, 0.10)' },
        { icon: 'fa-brands fa-git-alt', color: '#F05032', bg: 'rgba(240, 80, 50, 0.10)' },
        { icon: 'fa-brands fa-figma', color: '#F24E1E', bg: 'rgba(242, 78, 30, 0.10)' },
        { icon: 'fa-brands fa-android', color: '#3DDC84', bg: 'rgba(61, 220, 132, 0.10)' },
        { icon: 'fa-brands fa-apple', color: '#000000', bg: 'rgba(0, 0, 0, 0.06)' },
        { icon: 'fa-brands fa-aws', color: '#FF9900', bg: 'rgba(255, 153, 0, 0.10)' },
        { icon: 'fa-brands fa-sass', color: '#CC6699', bg: 'rgba(204, 102, 153, 0.10)' },
        { icon: 'fa-brands fa-bootstrap', color: '#7952B3', bg: 'rgba(121, 82, 179, 0.10)' },
        { icon: 'fa-brands fa-github', color: '#181717', bg: 'rgba(24, 23, 23, 0.06)' },
        { icon: 'fa-brands fa-linux', color: '#FCC624', bg: 'rgba(252, 198, 36, 0.12)' },
        { icon: 'fa-brands fa-rust', color: '#000000', bg: 'rgba(0, 0, 0, 0.06)' },
        { icon: 'fa-brands fa-golang', color: '#00ADD8', bg: 'rgba(0, 173, 216, 0.10)' },
        { icon: 'fa-solid fa-database', color: '#336791', bg: 'rgba(51, 103, 145, 0.10)' },
        { icon: 'fa-brands fa-flutter', color: '#02569B', bg: 'rgba(2, 86, 155, 0.10)' },
        { icon: 'fa-brands fa-npm', color: '#CB3837', bg: 'rgba(203, 56, 55, 0.10)' },
    ];

    function getRandomTech() {
        return techIcons[Math.floor(Math.random() * techIcons.length)];
    }

    function buildHeroGrid() {
        const heroGrid = document.getElementById('hero-grid');
        if (!heroGrid) return;

        const cellSize = getCellSize();

        // Clear existing cells and listeners
        heroGrid.innerHTML = '';

        const hero = document.getElementById('home');
        const heroW = Math.max(hero.offsetWidth, window.innerWidth);
        const heroH = Math.max(hero.offsetHeight, window.innerHeight);

        const cols = Math.ceil(heroW / cellSize) + 2;
        const rows = Math.ceil(heroH / cellSize) + 2;
        const totalCells = rows * cols;

        // Set the grid column count so CSS fills completely
        heroGrid.style.setProperty('--grid-cols', cols);

        // Assign icons so no two adjacent cells (left or above) share the same tech
        const grid = []; // 2D array: grid[row][col] = tech index

        for (let r = 0; r < rows; r++) {
            grid[r] = [];
            for (let c = 0; c < cols; c++) {
                const excludeSet = new Set();
                if (c > 0) excludeSet.add(grid[r][c - 1]);           // left neighbor
                if (r > 0) excludeSet.add(grid[r - 1][c]);           // top neighbor
                if (r > 0 && c > 0) excludeSet.add(grid[r - 1][c - 1]); // top-left diagonal
                if (r > 0 && c < cols - 1) excludeSet.add(grid[r - 1][c + 1]); // top-right diagonal

                // Pick a random index that isn't used by any neighbor
                let idx;
                do {
                    idx = Math.floor(Math.random() * techIcons.length);
                } while (excludeSet.has(idx) && excludeSet.size < techIcons.length);

                grid[r][c] = idx;
            }
        }

        // Create a document fragment for fast DOM insertion
        const fragment = document.createDocumentFragment();

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const cell = document.createElement('div');
                cell.classList.add('grid-cell');

                // Pre-assign the fixed tech icon for this cell
                const tech = techIcons[grid[r][c]];
                const iconEl = document.createElement('div');
                iconEl.classList.add('grid-cell-icon');
                iconEl.innerHTML = `<i class="${tech.icon}"></i>`;
                iconEl.style.color = tech.color;
                iconEl.style.backgroundColor = tech.bg;
                cell.appendChild(iconEl);

                fragment.appendChild(cell);
            }
        }

        heroGrid.appendChild(fragment);

        // ── Event delegation — hover just toggles visibility of pre-assigned icons ──
        heroGrid.addEventListener('mouseover', (e) => {
            const cell = e.target.closest('.grid-cell');
            if (!cell) return;
            if (cell.contains(e.relatedTarget)) return;

            // Cancel any pending fade-out
            if (cell._fadeTimer) {
                clearTimeout(cell._fadeTimer);
                cell._fadeTimer = null;
            }

            cell.classList.remove('fade-out');
            void cell.offsetWidth;
            cell.classList.add('active');
        });

        heroGrid.addEventListener('mouseout', (e) => {
            const cell = e.target.closest('.grid-cell');
            if (!cell) return;
            if (cell.contains(e.relatedTarget)) return;

            cell.classList.remove('active');
            cell.classList.add('fade-out');

            cell._fadeTimer = setTimeout(() => {
                cell.classList.remove('fade-out');
                cell._fadeTimer = null;
            }, 320);
        });
    }

    // Build grid on DOMContentLoaded and again after full page load
    buildHeroGrid();

    // Rebuild after fonts/images load so hero has final dimensions
    window.addEventListener('load', () => {
        setTimeout(buildHeroGrid, 100);
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(buildHeroGrid, 300);
    });

    // ============================================
    // SCROLL — Navbar + Back to top
    // ============================================
    // Hero gradient reference
    const heroGradientBg = document.querySelector('.hero-gradient-bg');

    function handleScroll() {
        const currentScroll = window.scrollY;

        // Navbar: add separator + stronger glass on scroll
        if (currentScroll > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }




    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ============================================
    // MOBILE MENU — Toggle
    // ============================================
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
        const isOpen = navMenu.classList.contains('open');
        document.body.classList.toggle('nav-open', isOpen);
    });

    // Close on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
            document.body.classList.remove('nav-open');
        });
    });

    // Close on outside click
    document.addEventListener('mousedown', (e) => {
        if (navMenu.classList.contains('open') &&
            !navMenu.contains(e.target) &&
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
            document.body.classList.remove('nav-open');
        }
    });

    // ============================================
    // ACTIVE NAV LINK — Scroll spy
    // ============================================
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.scrollY + 150;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink, { passive: true });

    // ============================================
    // SCROLL REVEAL — Intersection Observer
    // ============================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Don't unobserve — allow repeated animations if desired
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));



    // ============================================
    // PROJECT FILTER — Category toggle
    // ============================================
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            workCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ============================================
    // TESTIMONIAL CAROUSEL
    // ============================================
    const testimonialTrack = document.getElementById('testimonial-track');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    const dotsContainer = document.getElementById('testimonial-dots');
    const testimonialCards = testimonialTrack ? testimonialTrack.querySelectorAll('.testimonial-card') : [];
    let currentTestimonial = 0;
    let autoPlayInterval;

    function initTestimonialDots() {
        if (!dotsContainer) return;
        testimonialCards.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToTestimonial(i));
            dotsContainer.appendChild(dot);
        });
    }

    function goToTestimonial(index) {
        if (index < 0) index = testimonialCards.length - 1;
        if (index >= testimonialCards.length) index = 0;
        currentTestimonial = index;

        testimonialTrack.style.transform = `translateX(-${index * 100}%)`;

        // Update dots
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextTestimonial() {
        goToTestimonial(currentTestimonial + 1);
    }

    function prevTestimonialSlide() {
        goToTestimonial(currentTestimonial - 1);
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextTestimonial, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    if (testimonialTrack && prevBtn && nextBtn) {
        initTestimonialDots();

        prevBtn.addEventListener('click', () => {
            prevTestimonialSlide();
            stopAutoPlay();
            startAutoPlay();
        });

        nextBtn.addEventListener('click', () => {
            nextTestimonial();
            stopAutoPlay();
            startAutoPlay();
        });

        // Touch / swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        testimonialTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoPlay();
        }, { passive: true });

        testimonialTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextTestimonial();
                } else {
                    prevTestimonialSlide();
                }
            }
            startAutoPlay();
        }, { passive: true });

        startAutoPlay();
    }

    // ============================================
    // FLOATING MUSIC PLAYER
    // ============================================
    if (musicToggle && bgAudio) {
        musicToggle.addEventListener('change', () => {
            if (musicToggle.checked) {
                bgAudio.play().catch(() => {
                    // Autoplay blocked by browser
                    musicToggle.checked = false;
                });
            } else {
                bgAudio.pause();
            }
        });
    }

    // ============================================
    // SMOOTH SCROLL — Anchor links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // CONTACT FORM — Validation & Submit
    // ============================================
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let isValid = true;

            // Simple validation
            [name, email, message].forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e74c3c';
                    field.addEventListener('input', () => {
                        field.style.borderColor = '';
                    }, { once: true });
                }
            });

            if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                isValid = false;
                email.style.borderColor = '#e74c3c';
            }

            if (isValid) {
                const btn = contactForm.querySelector('button[type="submit"]');
                const original = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
                btn.style.background = '#4CAF50';
                btn.style.borderColor = '#4CAF50';
                btn.disabled = true;

                setTimeout(() => {
                    btn.innerHTML = original;
                    btn.style.background = '';
                    btn.style.borderColor = '';
                    btn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }
        });
    }

    // ============================================
    // NEWSLETTER FORM
    // ============================================
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            const btn = newsletterForm.querySelector('button');
            if (input.value.trim()) {
                btn.innerHTML = '<i class="fa-solid fa-check"></i>';
                btn.style.background = '#4CAF50';
                setTimeout(() => {
                    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i>';
                    btn.style.background = '';
                    input.value = '';
                }, 2000);
            }
        });
    }

    // ============================================
    // ANNOUNCEMENT BAR — Duplicate for infinite loop
    // ============================================
    const announcementSlider = document.querySelector('.announcement-slider');
    if (announcementSlider) {
        const content = announcementSlider.innerHTML;
        announcementSlider.innerHTML = content + content;
    }

    // ============================================
    // FADE-IN-UP ANIMATION (for filter)
    // ============================================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // PAGE LOAD — Trigger initial animations
    // ============================================
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
        // Trigger hero reveals slightly after load
        setTimeout(() => {
            document.querySelectorAll('.hero .reveal').forEach((el, i) => {
                setTimeout(() => el.classList.add('active'), i * 150);
            });
        }, 200);
    });

    // Set body opacity to 0 initially for load animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

});

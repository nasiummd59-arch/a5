// ==========================================================================
// CLASSICCROWN - INTERACTIVE HAUTE HORLOGERIE ATELIER ENGINE
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobileToggle') || document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks') || document.querySelector('.nav-links');
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });
    }

    // 2. Dark / Light Theme Toggle
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
        const savedTheme = localStorage.getItem('classiccrown_theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('classiccrown_theme', newTheme);
            updateThemeIcon(newTheme);
            showToast(`Manufacture ambience set to ${newTheme === 'dark' ? 'Geneva Midnight' : 'Platinum Alabaster'}`);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggleBtn) return;
        const icon = themeToggleBtn.querySelector('i');
        if (icon) {
            if (theme === 'light') {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        }
    }

    // 3. Interactive Calibre Complication Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const calibreCards = document.querySelectorAll('.calibre-card');
    if (filterBtns.length && calibreCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');

                calibreCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-complication') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => { card.style.display = 'none'; }, 300);
                    }
                });
            });
        });
    }

    // 4. Escapement Frequency & Beat Rate Audio/Visual Simulator
    const freqBtns = document.querySelectorAll('.freq-opt-btn');
    const balanceWheel = document.getElementById('balanceWheelGraphic');
    const beatRateLabel = document.getElementById('beatRateLabel');
    const vphSpeedDisplay = document.getElementById('vphSpeedDisplay');

    if (freqBtns.length && balanceWheel) {
        freqBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                freqBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const vph = btn.getAttribute('data-vph');
                const hz = btn.getAttribute('data-hz');
                const speed = btn.getAttribute('data-speed');

                balanceWheel.style.animationDuration = speed;
                if (beatRateLabel) beatRateLabel.textContent = `${vph} VPH (${hz} Hz) Escapement`;
                if (vphSpeedDisplay) vphSpeedDisplay.textContent = `${vph} Vibrations Per Hour`;

                showToast(`Calibre frequency calibrated to ${vph} VPH (${hz} Hz)`);
            });
        });
    }

    // 5. FAQ Accordion Interaction
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        if (question && answer) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => {
                    i.classList.remove('active');
                    const a = i.querySelector('.faq-answer');
                    if (a) a.style.maxHeight = null;
                });
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        }
    });

    // 6. Salon Booking Form Submission
    const salonForm = document.getElementById('salonBookingForm');
    if (salonForm) {
        salonForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const patronName = document.getElementById('patronName')?.value || 'Valued Collector';
            showToast(`Thank you, ${patronName}. Your Private Horological Salon consultation has been registered.`);
            salonForm.reset();
        });
    }

    // Toast Functionality
    function showToast(msg) {
        let toast = document.getElementById('crownToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'crownToast';
            toast.className = 'toast-notification';
            toast.innerHTML = '<i class="fas fa-crown text-gold"></i> <span id="toastMsg"></span>';
            document.body.appendChild(toast);
        }
        document.getElementById('toastMsg').textContent = msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }
});

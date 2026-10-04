document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // 2. Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // 3. Dark/Light Mode Toggle Logic
    const html = document.documentElement;
    const themeToggleBtn = document.getElementById('theme-toggle');
    const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const mobileThemeIcon = document.getElementById('mobile-theme-icon');

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
        updateIcons(true);
    } else {
        html.classList.remove('dark');
        updateIcons(false);
    }

    function updateIcons(isDark) {
        if (isDark) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            mobileThemeIcon.classList.remove('fa-moon');
            mobileThemeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            mobileThemeIcon.classList.remove('fa-sun');
            mobileThemeIcon.classList.add('fa-moon');
        }
    }

    function toggleTheme() {
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            localStorage.theme = 'light';
            updateIcons(false);
        } else {
            html.classList.add('dark');
            localStorage.theme = 'dark';
            updateIcons(true);
        }
    }

    themeToggleBtn.addEventListener('click', toggleTheme);
    mobileThemeToggleBtn.addEventListener('click', toggleTheme);

    // 4. Mobile Menu Toggle
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const menuIcon = btn.querySelector('i');

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        if(menu.classList.contains('hidden')) {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        } else {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        }
    });

    const menuLinks = menu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        });
    });

    // 5. Typed.js Initialization
    new Typed('#typed-text', {
        strings: [
            "Python Full-Stack Developer",
            "Flask & Django Specialist",
            "SQL & Database Enthusiast",
            "MCA Student & Lifelong Learner"
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1500,
        loop: true
    });

    // 6. Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
            backToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
        } else {
            backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
            backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 7. Contact Form Handling (Validation & Loading State)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnHTML = submitBtn.innerHTML;

        contactForm.addEventListener('submit', (e) => {
            // Basic front-end validation check
            const email = document.getElementById('email').value;
            if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                e.preventDefault();
                alert('Please enter a valid email address.');
                return;
            }

            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
            // Disable button slightly after to allow form to submit
            setTimeout(() => {
                submitBtn.disabled = true;
            }, 50);
        });
    }

    // 8. Project Modals Logic
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalOverview = document.getElementById('modal-overview');
    const modalHighlights = document.getElementById('modal-highlights');
    const modalSourceBtn = document.getElementById('modal-source-btn');
    const modalDemoBtn = document.getElementById('modal-demo-btn');
    const closeModalBtns = document.querySelectorAll('.close-modal');

    const projectData = {
        'fitlife': {
            title: 'FitLife-Gym',
            overview: 'A responsive fitness website featuring modern UI and cross-device compatibility. It allows users to register, log in securely, purchase plans, and view class information.',
            highlights: [
                'HTML, CSS, JavaScript, PHP, MySQL',
                'Admin dashboard to manage classes, user logins, and payment records',
                'Secure user registration and login workflows',
                'Efficient structured data storage and management'
            ],
            source: 'https://github.com/MitPrajapati',
            demo: '#'
        },
        'expense': {
            title: 'Expense Tracker',
            overview: 'An expense tracking web application with a modular backend architecture. It provides an intuitive dashboard for monitoring monthly income, expenses, and overall balance.',
            highlights: [
                'Flask, SQLAlchemy, MySQL',
                'User authentication with transaction management',
                'Dashboard featuring month/year filtering and category summaries',
                'CRUD operations for income and expenses'
            ],
            source: 'https://github.com/MitPrajapati',
            demo: '#'
        },
        'notes': {
            title: 'Notes App',
            overview: 'A robust notes management web application built to master Flask backend development. It features secure, user-specific note management and data relations.',
            highlights: [
                'Flask, Flask-WTF, SQLAlchemy, SQLite/MySQL',
                'Secure user registration and login authentication',
                'Database relationships mapping users to their specific notes',
                'Form validation and CSRF protection using Flask-WTF'
            ],
            source: 'https://github.com/MitPrajapati',
            demo: '#'
        }
    };

    document.querySelectorAll('.open-modal-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project');
            const data = projectData[projectId];
            
            if(data) {
                modalTitle.textContent = data.title;
                modalOverview.textContent = data.overview;
                
                modalHighlights.innerHTML = '';
                data.highlights.forEach(highlight => {
                    const li = document.createElement('li');
                    li.className = 'flex items-start';
                    li.innerHTML = `<span class="text-blue-500 mr-3 mt-1 text-xs"><i class="fas fa-check"></i></span><span>${highlight}</span>`;
                    modalHighlights.appendChild(li);
                });

                modalSourceBtn.href = data.source;
                modalDemoBtn.href = data.demo;

                modal.classList.remove('hidden');
                setTimeout(() => {
                    modal.querySelector('.modal-content').classList.remove('opacity-0', 'scale-95');
                    modal.querySelector('.modal-content').classList.add('opacity-100', 'scale-100');
                }, 10);
                document.body.classList.add('modal-active');
            }
        });
    });

    function closeModal() {
        const modalContent = modal.querySelector('.modal-content');
        modalContent.classList.remove('opacity-100', 'scale-100');
        modalContent.classList.add('opacity-0', 'scale-95');
        
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.classList.remove('modal-active');
        }, 300); // match transition duration
    }

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});

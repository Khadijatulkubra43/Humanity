
        // Navbar scroll effect
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navContainer = document.querySelector('.nav-container');
        
        mobileMenuBtn.addEventListener('click', () => {
            navContainer.classList.toggle('active');
            mobileMenuBtn.innerHTML = navContainer.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
            link.addEventListener('click', () => {
                navContainer.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

        // Animated number counters
        function animateCounter(elementId, target, duration) {
            const element = document.getElementById(elementId);
            let start = 0;
            const increment = target / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    element.textContent = target + (elementId === 'years' ? '+' : '');
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(start) + (elementId === 'years' && start >= 5 ? '+' : '');
                }
            }, 16);
        }

        // Trigger counters when in view
        function checkCounterVisibility() {
            const years = document.getElementById('years');
            const rect = years.getBoundingClientRect();
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                animateCounter('years', 5, 2000);
                animateCounter('countries', 24, 2000);
                animateCounter('stadiums', 47, 2000);
                animateCounter('partners', 128, 2000);
                window.removeEventListener('scroll', checkCounterVisibility);
            }
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile menu if open
                    navContainer.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Animate elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all cards for animation
        document.querySelectorAll('.mission-card, .vision-card, .diff-card, .value-card, .team-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });

        // Initialize on load
        window.addEventListener('load', () => {
            // Trigger hero animation
            const heroContent = document.querySelector('.about-hero-content');
            if (heroContent) {
                heroContent.style.animation = 'fadeUp 1s forwards 0.5s';
            }
            
            // Animate section titles
            document.querySelectorAll('.section-title').forEach(title => {
                title.style.opacity = '0';
                title.style.transform = 'translateY(30px)';
                title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                observer.observe(title);
            });
            
            // Animate story content
            document.querySelectorAll('.story-text, .story-image').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                observer.observe(el);
            });
            
            // Listen for scroll to trigger counters
            window.addEventListener('scroll', checkCounterVisibility);
            
            // Also check on load
            checkCounterVisibility();
        });

        // Current year for copyright
        document.addEventListener('DOMContentLoaded', () => {
            const yearSpan = document.querySelector('footer .footer-bottom p');
            if (yearSpan) {
                const currentYear = new Date().getFullYear();
                yearSpan.innerHTML = yearSpan.innerHTML.replace('2023', currentYear);
            }
        });
    
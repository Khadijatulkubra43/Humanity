
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
                    
                    // Add staggered animation for highlight cards
                    if (entry.target.classList.contains('highlight-card')) {
                        const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                        entry.target.style.transitionDelay = `${index * 0.1}s`;
                    }
                }
            });
        }, observerOptions);

        // Observe all cards for animation
        document.querySelectorAll('.highlight-card, .overview-content > *, .specs-container, .visual-card, .use-case-card, .custom-card, .related-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });

        // Initialize on load
        window.addEventListener('load', () => {
            // Trigger hero animation
            const heroContent = document.querySelector('.product-hero-content');
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
            
            // Animate certification badges
            document.querySelectorAll('.cert-badge').forEach((badge, index) => {
                badge.style.opacity = '0';
                badge.style.transform = 'translateY(20px)';
                badge.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
                observer.observe(badge);
            });
        });

        // Current year for copyright
        document.addEventListener('DOMContentLoaded', () => {
            const yearSpan = document.querySelector('footer .footer-bottom p');
            if (yearSpan) {
                const currentYear = new Date().getFullYear();
                yearSpan.innerHTML = yearSpan.innerHTML.replace('2023', currentYear);
            }
        });

        // Download button animation
        const downloadBtn = document.querySelector('.btn-outline[href="#"]');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
                this.style.background = 'var(--accent-green)';
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-check"></i> Downloaded Successfully!';
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.style.background = 'transparent';
                    }, 2000);
                }, 1500);
            });
        }

        // Product badge animation
        const productBadge = document.querySelector('.product-badge');
        if (productBadge) {
            setInterval(() => {
                productBadge.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    productBadge.style.transform = 'scale(1)';
                }, 300);
            }, 5000);
        }
    
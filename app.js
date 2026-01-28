
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

        // Hero video fallback
        const heroVideo = document.querySelector('.hero-video');
        heroVideo.addEventListener('error', function() {
            const fallbackImage = this.querySelector('img');
            if (fallbackImage) {
                this.style.backgroundImage = `url('${fallbackImage.src}')`;
                this.innerHTML = '';
            }
        });

        // Newsletter form submission
        const subscribeForm = document.getElementById('subscribeForm');
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.newsletter-input');
            const submitBtn = this.querySelector('.newsletter-btn');
            
            if (emailInput.value) {
                // Show success state
                submitBtn.innerHTML = 'Subscribed! <i class="fas fa-check"></i>';
                submitBtn.style.background = 'var(--accent-green)';
                
                // Reset after 3 seconds
                setTimeout(() => {
                    emailInput.value = '';
                    submitBtn.innerHTML = 'Subscribe Now <i class="fas fa-paper-plane"></i>';
                    submitBtn.style.background = 'var(--light-green)';
                    
                    // Show thank you message
                    const thankYou = document.createElement('p');
                    thankYou.textContent = 'Welcome to the Depth Circle! Check your email for confirmation.';
                    thankYou.style.color = 'var(--light-green)';
                    thankYou.style.marginTop = '20px';
                    thankYou.style.fontWeight = '600';
                    
                    if (!document.querySelector('.thank-you-message')) {
                        thankYou.classList.add('thank-you-message');
                        this.parentNode.appendChild(thankYou);
                        
                        setTimeout(() => {
                            thankYou.remove();
                        }, 5000);
                    }
                }, 3000);
            }
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
                }
            });
        }, observerOptions);

        // Observe all cards for animation
        document.querySelectorAll('.product-card, .value-card, .blog-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const rate = scrolled * -0.5;
            
            if (hero) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });

        // Initialize on load
        window.addEventListener('load', () => {
            // Trigger hero animation
            const heroContent = document.querySelector('.hero-content');
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
            
            // Animate footer columns
            document.querySelectorAll('.footer-column').forEach(column => {
                column.style.opacity = '0';
                column.style.transform = 'translateY(20px)';
                column.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(column);
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
    
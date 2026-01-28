
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
                    
                    // Add staggered animation for cards
                    if (entry.target.classList.contains('contact-card') || 
                        entry.target.classList.contains('why-card') || 
                        entry.target.classList.contains('location-item')) {
                        const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                        entry.target.style.transitionDelay = `${index * 0.1}s`;
                    }
                }
            });
        }, observerOptions);

        // Observe all cards for animation
        document.querySelectorAll('.contact-card, .why-card, .location-item').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });

        // Form submission handling
        const inquiryForm = document.getElementById('inquiryForm');
        if (inquiryForm) {
            inquiryForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const submitBtn = this.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;
                
                // Simulate form submission
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Inquiry Sent!';
                    submitBtn.style.background = 'var(--deep-green)';
                    
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.innerHTML = `
                        <div style="background: rgba(18, 192, 106, 0.1); border: 1px solid var(--light-green); border-radius: 10px; padding: 20px; margin-top: 20px; text-align: center;">
                            <h4 style="color: var(--light-green); margin-bottom: 10px;">Thank you for your inquiry!</h4>
                            <p style="color: rgba(255, 255, 255, 0.9);">Our team will contact you within 24-48 hours to discuss your project.</p>
                        </div>
                    `;
                    
                    this.appendChild(successMsg);
                    
                    // Reset form after 3 seconds
                    setTimeout(() => {
                        this.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                        successMsg.remove();
                    }, 5000);
                }, 1500);
            });
        }

        // Newsletter form handling
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const emailInput = this.querySelector('input[type="email"]');
                const submitBtn = this.querySelector('.btn-primary');
                const originalText = submitBtn.innerHTML;
                
                // Simulate subscription
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                    emailInput.value = '';
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                    }, 2000);
                }, 1000);
            });
        }

        // Current year for copyright
        document.addEventListener('DOMContentLoaded', () => {
            const yearSpan = document.querySelector('footer .footer-bottom p');
            if (yearSpan) {
                const currentYear = new Date().getFullYear();
                yearSpan.innerHTML = yearSpan.innerHTML.replace('2023', currentYear);
            }
        });

        // Contact badge animation
        const contactBadge = document.querySelector('.contact-badge');
        if (contactBadge) {
            setInterval(() => {
                contactBadge.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    contactBadge.style.transform = 'scale(1)';
                }, 300);
            }, 5000);
        }

        // Initialize animations on load
        window.addEventListener('load', () => {
            // Trigger hero animation
            const heroContent = document.querySelector('.contact-hero-content');
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
            
            // Animate consultation and newsletter sections
            document.querySelectorAll('.consultation-content, .newsletter-content').forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(30px)';
                section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                observer.observe(section);
            });
        });
   
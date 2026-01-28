
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

        // Category filtering
        const categoryButtons = document.querySelectorAll('.category-btn');
        const articles = document.querySelectorAll('.article-card');
        
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const category = button.getAttribute('data-category');
                
                // Show/hide articles based on category
                articles.forEach(article => {
                    if (category === 'all' || article.getAttribute('data-category') === category) {
                        article.style.display = 'block';
                        setTimeout(() => {
                            article.style.opacity = '1';
                            article.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        article.style.opacity = '0';
                        article.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            article.style.display = 'none';
                        }, 400);
                    }
                });
            });
        });

        // Search functionality
        const searchInput = document.querySelector('.search-input');
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            
            articles.forEach(article => {
                const title = article.querySelector('h3').textContent.toLowerCase();
                const excerpt = article.querySelector('.article-excerpt').textContent.toLowerCase();
                const category = article.querySelector('.article-category').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm) || category.includes(searchTerm)) {
                    article.style.display = 'block';
                    setTimeout(() => {
                        article.style.opacity = '1';
                        article.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    article.style.opacity = '0';
                    article.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        article.style.display = 'none';
                    }, 400);
                }
            });
        });

        // Footer category links
        document.querySelectorAll('.footer-links a[data-category]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const category = link.getAttribute('data-category');
                
                // Find and click the corresponding category button
                categoryButtons.forEach(button => {
                    if (button.getAttribute('data-category') === category) {
                        button.click();
                        window.scrollTo({
                            top: document.querySelector('.categories-section').offsetTop - 100,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        });

        // Newsletter subscription
        const blogSubscribeForm = document.getElementById('blogSubscribeForm');
        blogSubscribeForm.addEventListener('submit', function(e) {
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
                    submitBtn.innerHTML = 'Subscribe <i class="fas fa-paper-plane"></i>';
                    submitBtn.style.background = 'var(--light-green)';
                    
                    // Show thank you message
                    const thankYou = document.createElement('p');
                    thankYou.textContent = 'Thank you for subscribing! Check your email for confirmation.';
                    thankYou.style.color = 'var(--light-green)';
                    thankYou.style.marginTop = '20px';
                    thankYou.style.fontWeight = '600';
                    
                    if (!document.querySelector('.blog-thank-you-message')) {
                        thankYou.classList.add('blog-thank-you-message');
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
        document.querySelectorAll('.article-card, .featured-card, .expert-content, .category-btn').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });

        // Initialize on load
        window.addEventListener('load', () => {
            // Trigger hero animation
            const heroContent = document.querySelector('.blog-hero-content');
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
            
            // Animate articles with staggered delay
            document.querySelectorAll('.article-card').forEach((card, index) => {
                card.style.transitionDelay = `${index * 0.1}s`;
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

        // Featured article hover enhancement
        const featuredCard = document.querySelector('.featured-card');
        if (featuredCard) {
            featuredCard.addEventListener('mouseenter', function() {
                const badge = this.querySelector('.featured-badge');
                badge.style.transform = 'translateY(-5px) scale(1.05)';
            });
            
            featuredCard.addEventListener('mouseleave', function() {
                const badge = this.querySelector('.featured-badge');
                badge.style.transform = 'translateY(0) scale(1)';
            });
        }
   
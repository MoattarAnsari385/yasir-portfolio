// main.js - Complete Fixed Version with Navigation Fixes

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.initMouseFollower();
        this.initThemeToggle();
        this.initMobileMenu();
        this.initSmoothScrolling();
        this.initScrollAnimations();
        this.initActiveNavHighlight();
        this.initCounterAnimations();
        this.init3DEffects();
        this.initRippleEffects();
        this.initBlogInteractions();
        this.initContactInteractions();
        this.initSkillsSection();
        this.initPremiumSkillsSection();
        this.initTestimonialSlider();
        this.initProjectsSection();
        this.initFooterSection();
        this.initPerformanceOptimizations();
        this.consoleWelcome();
    }

    initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                once: true,
                offset: 100
            });
        }
    }

    initMouseFollower() {
        this.mouseCircle = document.querySelector('.mouse-circle');
        this.mouseCircle2 = document.querySelector('.mouse-circle-2');
        this.mouseDot = document.querySelector('.mouse-dot');

        if (!this.mouseCircle || !this.mouseCircle2 || !this.mouseDot) return;

        this.mouseX = 0;
        this.mouseY = 0;
        this.circleX = 0;
        this.circleY = 0;
        this.circle2X = 0;
        this.circle2Y = 0;
        this.dotX = 0;
        this.dotY = 0;

        this.speed = 0.1;
        this.speed2 = 0.15;
        this.dotSpeed = 0.05;

        this.throttledMouseMove = this.throttle((e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        }, 16);

        document.addEventListener('mousemove', this.throttledMouseMove);
        this.animateCircles();
        
        this.initHoverEffects();
    }

    animateCircles = () => {
        this.circleX += (this.mouseX - this.circleX) * this.speed;
        this.circleY += (this.mouseY - this.circleY) * this.speed;
        
        this.circle2X += (this.mouseX - this.circle2X) * this.speed2;
        this.circle2Y += (this.mouseY - this.circle2Y) * this.speed2;
        
        this.dotX += (this.mouseX - this.dotX) * this.dotSpeed;
        this.dotY += (this.mouseY - this.dotY) * this.dotSpeed;
        
        this.mouseCircle.style.transform = `translate(${this.circleX - 20}px, ${this.circleY - 20}px)`;
        this.mouseCircle2.style.transform = `translate(${this.circle2X - 10}px, ${this.circle2Y - 10}px)`;
        this.mouseDot.style.transform = `translate(${this.dotX - 3}px, ${this.dotY - 3}px)`;
        
        requestAnimationFrame(this.animateCircles);
    }

    initHoverEffects() {
        const interactiveElements = document.querySelectorAll('a, button, .nav-link, .btn, .social-icon, .service-card, .blog-card, .category-link, .tag, .contact-info-card, .social-link, .skill-card, .hex-item, .testimonial-card, .project-card, .footer-link, .newsletter-btn');
        
        const handleMouseEnter = () => {
            if (this.mouseCircle) {
                this.mouseCircle.style.transform += ' scale(1.5)';
                this.mouseCircle.style.borderColor = 'var(--accent-color)';
            }
            if (this.mouseCircle2) {
                this.mouseCircle2.style.transform += ' scale(1.8)';
                this.mouseCircle2.style.background = 'var(--accent-color)';
            }
        };

        const handleMouseLeave = () => {
            if (this.mouseCircle) {
                this.mouseCircle.style.transform = this.mouseCircle.style.transform.replace(' scale(1.5)', '');
                this.mouseCircle.style.borderColor = 'var(--primary-color)';
            }
            if (this.mouseCircle2) {
                this.mouseCircle2.style.transform = this.mouseCircle2.style.transform.replace(' scale(1.8)', '');
                this.mouseCircle2.style.background = 'var(--primary-color)';
            }
        };

        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', handleMouseEnter);
            element.addEventListener('mouseleave', handleMouseLeave);
        });
    }

    initThemeToggle() {
        this.darkModeToggle = document.getElementById('dark-mode-toggle');
        this.body = document.body;

        if (!this.darkModeToggle) return;

        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            this.body.classList.add('dark-mode');
            this.darkModeToggle.checked = true;
        }

        this.darkModeToggle.addEventListener('change', this.handleThemeToggle.bind(this));
    }

    handleThemeToggle() {
        if (this.darkModeToggle.checked) {
            this.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            this.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    }

    initMobileMenu() {
        this.mobileToggle = document.querySelector('.mobile-toggle');
        this.navMenu = document.querySelector('.nav-menu');

        if (!this.mobileToggle || !this.navMenu) return;

        // Primary click handler
        this.mobileToggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMobileMenu();
        });

        // Keyboard accessibility
        this.mobileToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleMobileMenu();
            }
        });

        // Fallback delegation if inner icon captures clicks
        this.mobileToggle.addEventListener('pointerdown', (e) => {
            if (e.target !== this.mobileToggle && this.mobileToggle.contains(e.target)) {
                e.preventDefault();
                this.toggleMobileMenu();
            }
        });

        // Close menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', this.closeMobileMenu.bind(this));
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeMobileMenu();
        });

        // Ensure menu/scroll state resets on larger screens
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1280) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        const isActive = this.navMenu.classList.toggle('active');
        document.body.classList.toggle('nav-open', isActive);
        if (this.mobileToggle) this.mobileToggle.classList.toggle('active', isActive);
        const icon = this.mobileToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars', !isActive);
            icon.classList.toggle('fa-times', isActive);
        }
        // ARIA sync
        if (this.mobileToggle) this.mobileToggle.setAttribute('aria-expanded', String(isActive));
    }

    closeMobileMenu() {
        if (this.navMenu) {
            this.navMenu.classList.remove('active');
        }
        document.body.classList.remove('nav-open');
        if (this.mobileToggle) this.mobileToggle.classList.remove('active');
        if (this.mobileToggle) this.mobileToggle.setAttribute('aria-expanded', 'false');
        const icon = this.mobileToggle?.querySelector('i');
        if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    }

    initSmoothScrolling() {
        // Handle all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                this.handleSmoothScroll(e, anchor);
            });
        });

        // Handle get started button
        const getStartedBtn = document.querySelector('.get-started');
        if (getStartedBtn) {
            getStartedBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToSection('#contact');
            });
        }

        // Handle CTA buttons in projects section
        const projectCTA = document.querySelector('.button-test');
        if (projectCTA) {
            projectCTA.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToSection('#testimonials');
            });
        }
    }

    handleSmoothScroll(e, anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        
        // Handle home link separately
        if (targetId === '#home' || targetId === 'index.html') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }

        this.scrollToSection(targetId);
    }

    scrollToSection(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    initScrollAnimations() {
        // Add scroll margin to all sections for better scrolling experience
        document.querySelectorAll('section[id]').forEach(section => {
            section.style.scrollMarginTop = '80px';
        });

        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver(this.handleIntersection.bind(this), this.observerOptions);

        const elementsToObserve = document.querySelectorAll(
            '.stat-item, .about-content, .stats, .hero-content, .hero-image, .service-card, .process-step, .blog-card, .mini-blog-post, .sidebar-widget, .contact-info-card, .contact-form-wrapper, .contact-map-wrapper, .skill-card, .summary-card, .hex-item, .stat-orb, .progress-bar, .testimonial-card, .project-card, .footer-column'
        );
        elementsToObserve.forEach(el => this.observer.observe(el));

        this.throttledScroll = this.throttle(this.handleScroll.bind(this), 16);
        window.addEventListener('scroll', this.throttledScroll);
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                if (entry.target.classList.contains('stats') || entry.target.classList.contains('stat-item')) {
                    this.animateCounters();
                }
                
                if (entry.target.classList.contains('blog-card')) {
                    this.animateBlogCard(entry.target);
                }
                
                if (entry.target.classList.contains('contact-info-card')) {
                    this.animateContactCard(entry.target);
                }
                
                if (entry.target.classList.contains('skill-card')) {
                    this.animateSkillCard(entry.target);
                }

                if (entry.target.classList.contains('hex-item')) {
                    this.animateHexItem(entry.target);
                }

                if (entry.target.classList.contains('testimonial-card')) {
                    this.animateTestimonialCard(entry.target);
                }

                if (entry.target.classList.contains('project-card')) {
                    this.animateProjectCard(entry.target);
                }

                if (entry.target.classList.contains('footer-column')) {
                    this.animateFooterColumn(entry.target);
                }
            }
        });
    }

    handleScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            navbar.style.cssText = 'padding: 10px 0; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);';
        } else {
            navbar.style.cssText = 'padding: 15px 0; box-shadow: var(--shadow);';
        }

        this.updateParallax(scrollY);
        this.updateReadingProgress(scrollY);
    }

    initActiveNavHighlight() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');
                    
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        const href = link.getAttribute('href');
                        if (href === `#${currentId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });

        // Set home as active by default
        if (window.scrollY === 0) {
            const homeLink = document.querySelector('.nav-link[href="#home"]');
            if (homeLink) {
                homeLink.classList.add('active');
            }
        }
    }

    updateParallax(scrollY) {
        const shapes = document.querySelectorAll('.floating-shape, .bg-orb');
        shapes.forEach(shape => {
            const speed = shape.classList.contains('shape-1') ? 0.5 : 
                         shape.classList.contains('shape-2') ? 0.3 : 
                         shape.classList.contains('bg-orb') ? 0.2 : 0.7;
            shape.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }

    initCounterAnimations() {
        this.counters = document.querySelectorAll('.stat-number[data-count]');
        this.counters.forEach(counter => {
            counter.textContent = '0+';
        });
    }

    animateCounters = () => {
        this.counters.forEach(counter => {
            if (counter.classList.contains('animated')) return;
            
            const target = +counter.getAttribute('data-count');
            let count = 0;
            const duration = 2000;
            const step = target / (duration / 16);

            const updateCounter = () => {
                count += step;
                if (count < target) {
                    counter.textContent = Math.ceil(count) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                    counter.classList.add('animated');
                }
            };

            updateCounter();
        });
    }

    init3DEffects() {
        this.imageContainer = document.querySelector('.image-container-3d');
        if (!this.imageContainer) return;

        this.throttled3DMove = this.throttle(this.handle3DMove.bind(this), 16);
        this.imageContainer.addEventListener('mousemove', this.throttled3DMove);
        this.imageContainer.addEventListener('mouseleave', this.handle3DLeave.bind(this));
    }

    handle3DMove(e) {
        const { left, top, width, height } = this.imageContainer.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        
        const rotateY = x * 20;
        const rotateX = y * -20;
        
        this.imageContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    handle3DLeave() {
        this.imageContainer.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    }

    initRippleEffects() {
        this.addRippleStyles();
        
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', this.createRipple.bind(this));
        });
    }

    addRippleStyles() {
        if (document.querySelector('#ripple-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            .btn { position: relative; overflow: hidden; }
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
            }
            @keyframes ripple-animation {
                to { transform: scale(4); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    createRipple(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
        `;
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    initBlogInteractions() {
        this.initBlogCardAnimations();
        this.initCategoryFilters();
        this.initReadingProgress();
        this.initBlogSearch();
        this.initBlogImageLoading();
    }

    initBlogCardAnimations() {
        const blogCards = document.querySelectorAll('.blog-card');
        
        blogCards.forEach(card => {
            card.addEventListener('mousemove', this.throttle((e) => {
                if (window.innerWidth < 768) return;
                
                const cardRect = card.getBoundingClientRect();
                const x = e.clientX - cardRect.left;
                const y = e.clientY - cardRect.top;
                
                const centerX = cardRect.width / 2;
                const centerY = cardRect.height / 2;
                
                const rotateY = (x - centerX) / 25;
                const rotateX = (centerY - y) / 25;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            }, 16));
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 300);
            });
        });
    }

    animateBlogCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    }

    initCategoryFilters() {
        const categoryLinks = document.querySelectorAll('.category-link');
        const blogCards = document.querySelectorAll('.blog-card');
        
        categoryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                categoryLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                const category = link.querySelector('.category-name').textContent.toLowerCase();
                
                blogCards.forEach(card => {
                    const cardCategory = card.querySelector('.blog-category').textContent.toLowerCase();
                    
                    if (category === 'all' || cardCategory.includes(category)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    initReadingProgress() {
        if (document.querySelector('.blog-single')) {
            this.createReadingProgress();
        }
    }

    createReadingProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--primary-color);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', this.throttle(() => {
            const winHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset;
            const progress = (scrollTop / (docHeight - winHeight)) * 100;
            progressBar.style.width = `${progress}%`;
        }, 16));
    }

    updateReadingProgress(scrollY) {
        const progressBar = document.querySelector('.reading-progress');
        if (!progressBar) return;
        
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const progress = (scrollY / (docHeight - winHeight)) * 100;
        progressBar.style.width = `${progress}%`;
    }

    initBlogSearch() {
        const searchInput = document.querySelector('.blog-search-input');
        if (!searchInput) return;
        
        searchInput.addEventListener('input', this.throttle((e) => {
            const searchTerm = e.target.value.toLowerCase();
            const blogCards = document.querySelectorAll('.blog-card');
            
            blogCards.forEach(card => {
                const title = card.querySelector('.blog-title').textContent.toLowerCase();
                const excerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        }, 300));
    }

    initBlogImageLoading() {
        const blogImages = document.querySelectorAll('.blog-image img, .mini-blog-image img');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        blogImages.forEach(img => {
            if (img.dataset.src) {
                imageObserver.observe(img);
            }
        });
    }

    initContactInteractions() {
        this.initContactForm();
        this.initContactAnimations();
        this.initMapInteractions();
        this.initSocialLinks();
    }

    initContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        // Simple form submission without email sending
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (this.validateForm()) {
                this.showFormSuccess();
                contactForm.reset();
            }
        });
        
        this.initRealTimeValidation();
    }

    initRealTimeValidation() {
        const fields = ['name', 'email', 'phone', 'description'];
        
        fields.forEach(field => {
            const input = document.getElementById(field);
            if (input) {
                input.addEventListener('blur', () => this.validateField(field));
                input.addEventListener('input', () => this.clearError(field));
            }
        });
    }

    validateField(fieldName) {
        const field = document.getElementById(fieldName);
        const value = field.value.trim();
        const errorElement = document.getElementById(`${fieldName}Error`);
        
        let isValid = true;
        let errorMessage = '';

        switch(fieldName) {
            case 'name':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters long';
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;

            case 'phone':
                if (value && !/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-\(\)]/g, ''))) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number';
                }
                break;

            case 'description':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Please provide more details (at least 10 characters)';
                }
                break;
        }

        if (!isValid) {
            this.showError(field, errorElement, errorMessage);
        } else {
            this.clearError(fieldName);
        }

        return isValid;
    }

    showError(field, errorElement, message) {
        field.classList.add('form-error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    clearError(fieldName) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(`${fieldName}Error`);
        
        if (field) field.classList.remove('form-error');
        if (errorElement) errorElement.classList.remove('show');
    }

    validateForm() {
        const requiredFields = ['name', 'email', 'description'];
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    showFormSuccess() {
        const formMessage = document.getElementById('formMessage');
        if (formMessage) {
            formMessage.textContent = 'Thank you for your message! I will get back to you within 24 hours.';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }

    enhanceContactForm(form) {
        const inputs = form.querySelectorAll('.form-input, .form-textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }

    initContactAnimations() {
        const contactCards = document.querySelectorAll('.contact-info-card');
        
        contactCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            
            card.addEventListener('mousemove', this.throttle((e) => {
                if (window.innerWidth < 768) return;
                
                const cardRect = card.getBoundingClientRect();
                const x = e.clientX - cardRect.left;
                const y = e.clientY - cardRect.top;
                
                const centerX = cardRect.width / 2;
                const centerY = cardRect.height / 2;
                
                const rotateY = (x - centerX) / 20;
                const rotateX = (centerY - y) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            }, 16));
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    animateContactCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.9)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, 100);
    }

    initMapInteractions() {
        const directionsBtn = document.querySelector('.map-actions .btn');
        if (directionsBtn) {
            directionsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const address = '15 Division Street, New York NY 12032';
                const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
                window.open(mapsUrl, '_blank');
            });
        }

        const mapPlaceholder = document.querySelector('.map-placeholder');
        if (mapPlaceholder) {
            mapPlaceholder.addEventListener('click', () => {
                mapPlaceholder.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    mapPlaceholder.style.transform = 'scale(1)';
                }, 150);
            });
        }
    }

    initSocialLinks() {
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    link.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }

    initSkillsSection() {
        this.skillsSection = new SkillsSection();
        
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBars = entry.target.querySelectorAll('.level-progress');
                    progressBars.forEach(bar => {
                        const level = bar.getAttribute('data-level');
                        setTimeout(() => {
                            bar.style.width = `${level}%`;
                        }, 200);
                    });
                }
            });
        }, { threshold: 0.3 });

        const skillsSection = document.querySelector('.skills-section');
        if (skillsSection) {
            skillsObserver.observe(skillsSection);
        }
    }

    animateSkillCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.9)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, 100);
    }

    initPremiumSkillsSection() {
        this.premiumSkills = new PremiumSkillsSection();
    }

    animateHexItem(hex) {
        hex.style.opacity = '0';
        hex.style.transform = 'scale(0.5) rotate(180deg)';
        
        setTimeout(() => {
            hex.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            hex.style.opacity = '1';
            hex.style.transform = 'scale(1) rotate(0deg)';
        }, 100);
    }

    initTestimonialSlider() {
        this.testimonialSlider = new TestimonialSlider();
    }

    animateTestimonialCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateX(50px) scale(0.9)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateX(0) scale(1)';
        }, 100);
    }

    initProjectsSection() {
        this.projectsSection = new ProjectsSection();
    }

    animateProjectCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.9)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, 100);
    }

    initFooterSection() {
        this.footerSection = new FooterSection();
    }

    animateFooterColumn(column) {
        column.style.opacity = '0';
        column.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            column.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
            column.style.opacity = '1';
            column.style.transform = 'translateY(0)';
        }, 100);
    }

    initPerformanceOptimizations() {
        this.preloadImages();
        this.initAOS();
    }

    preloadImages() {
        const criticalImages = [
            'images/hero-img.png',
            'images/about-image.jpg',
            'images/blog-1.jpg',
            'images/blog-2.jpg',
            'images/blog-3.jpg',
            'images/blog-4.jpg',
            'images/contact-bg.jpg',
            'images/skills-bg.jpg',
            'images/testimonial-1.jpg',
            'images/testimonial-2.jpg',
            'images/testimonial-3.jpg',
            'images/project-1.jpg',
            'images/project-2.jpg',
            'images/project-3.jpg'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    consoleWelcome() {
        console.log('%c🚀 Yasir Rehman Portfolio', 'font-size: 24px; font-weight: bold; color: #007bff;');
        console.log('%c💡 Navigation Fixed • Smooth Scrolling Active', 'font-size: 14px; color: #666;');
        console.log('%c📱 Mobile Menu Working • Active States Enabled', 'font-size: 14px; color: #666;');
        console.log('%c🎯 All Features Integrated • Ready to Use', 'font-size: 14px; color: #666;');
    }
}

class SkillsSection {
    constructor() {
        this.init();
    }

    init() {
        this.initProgressBars();
        this.initSkillCardAnimations();
        this.initSummaryCardInteractions();
    }

    initProgressBars() {
        const progressBars = document.querySelectorAll('.level-progress');
        
        progressBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.setProperty('--level-width', `${level}%`);
        });
    }

    initSkillCardAnimations() {
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach(card => {
            card.addEventListener('mousemove', this.throttle((e) => {
                if (window.innerWidth < 768) return;
                
                const cardRect = card.getBoundingClientRect();
                const x = e.clientX - cardRect.left;
                const y = e.clientY - cardRect.top;
                
                const centerX = cardRect.width / 2;
                const centerY = cardRect.height / 2;
                
                const rotateY = (x - centerX) / 25;
                const rotateX = (centerY - y) / 25;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            }, 16));
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });

            card.addEventListener('click', () => {
                if (window.innerWidth < 768) {
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.transform = 'scale(1)';
                    }, 150);
                }
            });
        });
    }

    initSummaryCardInteractions() {
        const summaryCard = document.querySelector('.summary-card');
        if (!summaryCard) return;

        summaryCard.addEventListener('mousemove', this.throttle((e) => {
            if (window.innerWidth < 768) return;
            
            const cardRect = summaryCard.getBoundingClientRect();
            const x = e.clientX - cardRect.left;
            const y = e.clientY - cardRect.top;
            
            const centerX = cardRect.width / 2;
            const centerY = cardRect.height / 2;
            
            const rotateY = (x - centerX) / 50;
            const rotateX = (centerY - y) / 50;
            
            summaryCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        }, 16));
        
        summaryCard.addEventListener('mouseleave', () => {
            summaryCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    }

    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

class PremiumSkillsSection {
    constructor() {
        this.init();
    }

    init() {
        this.initProgressBars();
        this.initHexagonInteractions();
        this.initOrbAnimations();
        this.initParallaxEffects();
    }

    initProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width');
                    setTimeout(() => {
                        entry.target.style.width = `${width}%`;
                    }, 500);
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => {
            progressObserver.observe(bar);
        });
    }

    initHexagonInteractions() {
        const hexItems = document.querySelectorAll('.hex-item');
        
        hexItems.forEach(hex => {
            hex.addEventListener('mouseenter', () => {
                hex.style.transform = 'translateY(-10px) scale(1.1)';
                hex.style.zIndex = '10';
            });
            
            hex.addEventListener('mouseleave', () => {
                hex.style.transform = 'translateY(0) scale(1)';
                hex.style.zIndex = '1';
            });
            
            hex.addEventListener('click', () => {
                if (window.innerWidth < 768) {
                    hex.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        hex.style.transform = 'scale(1)';
                    }, 150);
                }
            });
        });
    }

    initOrbAnimations() {
        const statOrbs = document.querySelectorAll('.stat-orb');
        
        statOrbs.forEach((orb, index) => {
            orb.style.animationDelay = `${index * 0.5}s`;
        });
    }

    initParallaxEffects() {
        const bgOrbs = document.querySelectorAll('.bg-orb');
        
        window.addEventListener('scroll', this.throttle(() => {
            const scrollY = window.scrollY;
            const speed = 0.5;
            
            bgOrbs.forEach((orb, index) => {
                const parallaxSpeed = (index + 1) * 0.2;
                orb.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
            });
        }, 16));
    }

    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

class TestimonialSlider {
    constructor() {
        this.slider = document.querySelector('.testimonial-slider');
        this.track = document.querySelector('.testimonial-track');
        this.cards = document.querySelectorAll('.testimonial-card');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.dots = document.querySelectorAll('.dot');
        
        this.currentIndex = 0;
        this.cardWidth = 350;
        this.gap = 30;
        
        this.init();
    }
    
    init() {
        if (!this.slider || !this.track) return;
        
        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());
        
        this.dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                this.goToSlide(index);
            });
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
        
        this.startAutoSlide();
        
        this.slider.addEventListener('mouseenter', () => this.stopAutoSlide());
        this.slider.addEventListener('mouseleave', () => this.startAutoSlide());
        
        this.initTouchEvents();
        
        this.updateSlider();
    }
    
    prev() {
        this.currentIndex = Math.max(0, this.currentIndex - 1);
        this.updateSlider();
    }
    
    next() {
        this.currentIndex = Math.min(this.cards.length - 1, this.currentIndex + 1);
        this.updateSlider();
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlider();
    }
    
    updateSlider() {
        const scrollAmount = this.currentIndex * (this.cardWidth + this.gap);
        this.track.style.transform = `translateX(-${scrollAmount}px)`;
        
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
        
        if (this.prevBtn) this.prevBtn.disabled = this.currentIndex === 0;
        if (this.nextBtn) this.nextBtn.disabled = this.currentIndex === this.cards.length - 1;
    }
    
    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            if (this.currentIndex === this.cards.length - 1) {
                this.currentIndex = 0;
            } else {
                this.currentIndex++;
            }
            this.updateSlider();
        }, 5000);
    }
    
    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }
    }
    
    initTouchEvents() {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            this.stopAutoSlide();
        });
        
        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });
        
        this.track.addEventListener('touchend', () => {
            if (!isDragging) return;
            
            const diff = startX - currentX;
            const threshold = 50;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
            
            isDragging = false;
            this.startAutoSlide();
        });
    }
}

class ProjectsSection {
    constructor() {
        this.init();
    }

    init() {
        this.initProjectFilter();
        this.initProjectCardAnimations();
        this.initProjectInteractions();
    }

    initProjectFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    initProjectCardAnimations() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mousemove', this.throttle((e) => {
                if (window.innerWidth < 768) return;
                
                const cardRect = card.getBoundingClientRect();
                const x = e.clientX - cardRect.left;
                const y = e.clientY - cardRect.top;
                
                const centerX = cardRect.width / 2;
                const centerY = cardRect.height / 2;
                
                const rotateY = (x - centerX) / 20;
                const rotateX = (centerY - y) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            }, 16));
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(-8px)';
            });
        });
    }

    initProjectInteractions() {
        const viewProjectBtns = document.querySelectorAll('.view-project');
        const viewCaseStudyBtns = document.querySelectorAll('.view-case-study');
        
        viewProjectBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const projectCard = btn.closest('.project-card');
                const projectTitle = projectCard.querySelector('.project-title').textContent;
                console.log(`Viewing project: ${projectTitle}`);
            });
        });
        
        viewCaseStudyBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const projectCard = btn.closest('.project-card');
                const projectTitle = projectCard.querySelector('.project-title').textContent;
                console.log(`Viewing case study for: ${projectTitle}`);
            });
        });
    }

    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

class FooterSection {
    constructor() {
        this.init();
    }

    init() {
        this.initBackToTop();
        this.initNewsletter();
        this.initSmoothScroll();
        this.initFooterAnimations();
    }

    initBackToTop() {
        const backToTopBtn = document.querySelector('.back-to-top');
        
        if (!backToTopBtn) return;

        window.addEventListener('scroll', this.throttle(() => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, 16));

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    initNewsletter() {
        const newsletterForm = document.querySelector('.newsletter-form');
        
        if (!newsletterForm) return;

        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('.newsletter-input');
            const email = emailInput.value.trim();

            if (this.validateEmail(email)) {
                this.submitNewsletter(email, newsletterForm);
            } else {
                this.showNewsletterError('Please enter a valid email address', newsletterForm);
            }
        });

        const emailInput = newsletterForm.querySelector('.newsletter-input');
        emailInput.addEventListener('input', this.throttle((e) => {
            this.clearNewsletterError(newsletterForm);
        }, 300));
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async submitNewsletter(email, form) {
        const submitBtn = form.querySelector('.newsletter-btn');
        const originalHtml = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            this.showNewsletterSuccess('Thank you for subscribing!', form);
            form.reset();
            
        } catch (error) {
            this.showNewsletterError('Subscription failed. Please try again.', form);
        } finally {
            submitBtn.innerHTML = originalHtml;
            submitBtn.disabled = false;
        }
    }

    showNewsletterSuccess(message, form) {
        this.clearNewsletterError(form);
        
        const successElement = document.createElement('div');
        successElement.className = 'newsletter-message success';
        successElement.style.cssText = `
            color: #10b981;
            font-size: 0.8rem;
            margin-top: 8px;
            font-weight: 600;
        `;
        successElement.textContent = message;
        
        form.appendChild(successElement);
        
        setTimeout(() => {
            successElement.remove();
        }, 5000);
    }

    showNewsletterError(message, form) {
        this.clearNewsletterError(form);
        
        const errorElement = document.createElement('div');
        errorElement.className = 'newsletter-message error';
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.8rem;
            margin-top: 8px;
            font-weight: 600;
        `;
        errorElement.textContent = message;
        
        form.appendChild(errorElement);
        
        const input = form.querySelector('.newsletter-input');
        input.style.borderColor = '#ef4444';
        
        setTimeout(() => {
            input.style.borderColor = '';
        }, 3000);
    }

    clearNewsletterError(form) {
        const existingMessage = form.querySelector('.newsletter-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const input = form.querySelector('.newsletter-input');
        input.style.borderColor = '';
    }

    initSmoothScroll() {
        document.querySelectorAll('.footer-link[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    initFooterAnimations() {
        const footerColumns = document.querySelectorAll('.footer-column');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, { threshold: 0.1 });

        footerColumns.forEach(column => {
            column.style.animationPlayState = 'paused';
            observer.observe(column);
        });
    }

    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Additional fixes for specific issues
window.addEventListener('load', () => {
    // Ensure all internal links work properly
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href !== '#' && !document.querySelector(href)) {
            console.warn(`Target element not found for: ${href}`);
        }
    });

    // Fix for testimonial section ID mismatch
    const testimonialLink = document.querySelector('a[href="#testimonial"]');
    const testimonialSection = document.querySelector('#testimonials');
    if (testimonialLink && testimonialSection) {
        testimonialLink.setAttribute('href', '#testimonials');
    }
});

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    setTimeout(() => {
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('loaded');
            }, index * 100);
        });

        const hexItems = document.querySelectorAll('.hex-item');
        hexItems.forEach((hex, index) => {
            setTimeout(() => {
                hex.classList.add('loaded');
            }, index * 150);
        });

        const testimonialCards = document.querySelectorAll('.testimonial-card');
        testimonialCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('loaded');
            }, index * 100);
        });

        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('loaded');
            }, index * 100);
        });

        const footerColumns = document.querySelectorAll('.footer-column');
        footerColumns.forEach((column, index) => {
            setTimeout(() => {
                column.classList.add('loaded');
            }, index * 100);
        });
    }, 500);
});

window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioApp;
}
// Mobile Navigation Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        
        // Toggle body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
});
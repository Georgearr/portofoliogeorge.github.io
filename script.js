// loding screen ama animasinya banh
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initSmoothScrolling();
    initSkillBars();
    initContactForm();
    initScrollAnimations();
    initMobileMenu();
    initDarkModeToggle();
});

// sekrol efeknya banh
function initNavigation() {
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    });
}

// smuth skroling banh
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    const footerLinks = document.querySelectorAll('footer a[href^="#"]');
    
    [...navLinks, ...footerLinks].forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // nutupin menu mobile kalo ada
            const navMenu = document.getElementById('nav-menu');
            navMenu.classList.remove('active');
        });
    });
}

// animasi skill bar banh
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    const animateSkillBar = (bar) => {
        const width = bar.getAttribute('data-width');
        bar.style.setProperty('--skill-width', width);
        bar.classList.add('animate');
    };
    
    // kalo di dokumentasi, namanya "Intersection Observer" banh, ngeri bgt
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress-bar');
                skillBars.forEach((skillBar, index) => {
                    setTimeout(() => {
                        animateSkillBar(skillBar);
                    }, index * 200);
                });
            }
        });
    }, {
        threshold: 0.3
    });
    
    // ambek galo kategori skill
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        skillObserver.observe(category);
    });
}

// inimah form kontaknya banh
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success message
            showNotification('Message sent successfully! Thank you for your message. I\'ll get back to you soon.', 'success');
            
            // Reset form
            form.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// animasi sekrol banh
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.about-card, .skill-category, .service-card, .timeline-card, .contact-card');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        scrollObserver.observe(element);
    });
}

// buat menu mobile banh
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // buat icon toggle berubah jd burger
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // buat nutup menu mobile kalo klik di luar
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// buat notif cik
function showNotification(message, type = 'info') {
    // elemnet notifnya cik
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // kasi css sikit" banh
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        max-width: 400px;
        animation: slideInFromRight 0.3s ease-out;
    `;
    
    // kasi ke document body
    document.body.appendChild(notification);
    
    // buat notifnya bisa di klik close
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutToRight 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
    
    // ngimlang abis 5 detik banh
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutToRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// css animasi notifnya banh
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInFromRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutToRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        font-size: 1rem;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(notificationStyles);

// guweh pake paralak banh
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    const heroOverlay = document.querySelector('.hero-overlay');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    if (heroOverlay) {
        heroOverlay.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// typing effect di hero title banh
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // bisa ngetik" gt dia banh
    setTimeout(typeWriter, 800);
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initTypingEffect, 500);
});

// loading screen banh
function showLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <h2>George Arrev</h2>
            <p>Loading portfolio...</p>
        </div>
    `;
    
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #3b82f6, #a855f7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        color: white;
        font-family: 'Poppins', sans-serif;
    `;
    
    document.body.appendChild(loadingScreen);
    
    // ngimlangin loading screen banh
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                }
            }, 500);
        }, 1000);
    });
}

// spinner styles banh
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    .loading-content {
        text-align: center;
    }
    
    .loading-spinner {
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255,255,255,0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 2rem;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .loading-content h2 {
        font-size: 2rem;
        margin-bottom: 0.5rem;
    }
    
    .loading-content p {
        opacity: 0.8;
    }
`;
document.head.appendChild(loadingStyles);

// inisiasi loading screen banh
showLoadingScreen();

// buat wiiiii keatas dia banh
function initScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: var(--anime-blue);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // buat ngimlangin tombol wiiiii keatas banh
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // sekrol tu top banh
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // hover"an baaaaanh
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = 'var(--anime-light-blue)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = 'var(--anime-blue)';
    });
}

// insiasi tombol wiiiii keatas banh
document.addEventListener('DOMContentLoaded', function() {
    initScrollToTop();
});

// buat dark mode banh
function initDarkModeToggle() {
    const switchInput = document.getElementById('darkModeSwitch');

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = savedTheme === 'dark';

    if (prefersDark) {
        document.body.classList.add('dark-mode');
        switchInput.checked = true;
    }

    switchInput.addEventListener('change', () => {
        const isDark = switchInput.checked;
        document.body.classList.toggle('dark-mode', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

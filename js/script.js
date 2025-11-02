// ========================================
// Theme Toggle
// ========================================

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    
    // Update icon and save preference
    if (body.classList.contains('light-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    }
});

// ========================================
// Scroll to Top Button
// ========================================

const scrollTopButton = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopButton.classList.add('visible');
    } else {
        scrollTopButton.classList.remove('visible');
    }
});

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// Smooth Scroll for Anchor Links
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for empty hash
        if (href === '#' || href === '') {
            return;
        }
        
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// Copy Link Functionality
// ========================================

const copyLinkButton = document.getElementById('copy-link');

copyLinkButton.addEventListener('click', () => {
    const url = window.location.href;
    
    // Try using the Clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(() => {
            showCopyFeedback(copyLinkButton);
        }).catch(() => {
            // Fallback if Clipboard API fails
            fallbackCopyText(url);
            showCopyFeedback(copyLinkButton);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyText(url);
        showCopyFeedback(copyLinkButton);
    }
});

function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
    
    document.body.removeChild(textArea);
}

function showCopyFeedback(button) {
    const originalContent = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Скопировано!';
    button.style.backgroundColor = '#28a745';
    
    setTimeout(() => {
        button.innerHTML = originalContent;
        button.style.backgroundColor = '';
    }, 2000);
}

// ========================================
// Form Submission Handling
// ========================================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // If using Netlify Forms, it will handle the submission
        // This is just for additional client-side feedback
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalContent = submitButton.innerHTML;
        
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        submitButton.disabled = true;
        
        // Netlify will handle the actual submission
        // After page reload, the form will be cleared
        
        // Note: For non-Netlify deployments, you would handle the submission here
    });
}

// ========================================
// Intersection Observer for Fade-in Animations
// ========================================

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(element => {
    // Set initial state
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out';
    
    observer.observe(element);
});

// ========================================
// Evidence Gallery Modal (Optional Enhancement)
// ========================================

const evidenceItems = document.querySelectorAll('.evidence-item img');

evidenceItems.forEach(item => {
    item.addEventListener('click', () => {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'evidence-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
        `;
        
        const img = document.createElement('img');
        img.src = item.src;
        img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 8px;
            box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
        `;
        
        modal.appendChild(img);
        document.body.appendChild(modal);
        
        // Close modal on click
        modal.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        // Close modal on Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                if (document.body.contains(modal)) {
                    document.body.removeChild(modal);
                }
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    });
});

// ========================================
// Analytics Tracking (Google Analytics)
// ========================================

// Track button clicks
document.querySelectorAll('.btn, .share-btn').forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent.trim();
        
        // If Google Analytics is loaded
        if (typeof gtag !== 'undefined') {
            gtag('event', 'button_click', {
                'event_category': 'engagement',
                'event_label': buttonText
            });
        }
    });
});

// Track external link clicks
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', () => {
        const url = link.href;
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'external_link_click', {
                'event_category': 'outbound',
                'event_label': url
            });
        }
    });
});

// ========================================
// Performance Optimization: Lazy Loading
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// Prevent Form Resubmission on Reload
// ========================================

if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ========================================
// Warning Alert for Telegram Link
// ========================================

const telegramLinks = document.querySelectorAll('a[href*="t.me/Misha_PROC"]');

telegramLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const confirmLeave = confirm(
            '⚠️ ВНИМАНИЕ!\n\n' +
            'Вы собираетесь перейти на страницу МОШЕННИКА.\n\n' +
            'Не вступайте с ним в контакт!\n' +
            'Используйте эту ссылку только для блокировки и жалоб.\n\n' +
            'Продолжить?'
        );
        
        if (!confirmLeave) {
            e.preventDefault();
        }
    });
});

// ========================================
// Easter Egg: Konami Code
// ========================================

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        
        if (konamiIndex === konamiCode.length) {
            // Easter egg activated
            document.body.style.animation = 'rainbow 2s linear infinite';
            
            // Add rainbow animation
            const style = document.createElement('style');
            style.innerHTML = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            // Reset after 10 seconds
            setTimeout(() => {
                document.body.style.animation = '';
            }, 10000);
            
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// ========================================
// Console Warning
// ========================================

console.log(
    '%c⚠️ ПРЕДУПРЕЖДЕНИЕ О МОШЕННИКЕ ⚠️',
    'color: #e63946; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);'
);
console.log(
    '%cЭтот сайт создан для предупреждения о мошеннике @Misha_PROC в Telegram.',
    'color: #f1faee; font-size: 14px;'
);
console.log(
    '%cНе связывайтесь с этим человеком!',
    'color: #e63946; font-size: 16px; font-weight: bold;'
);

// ========================================
// Page Load Complete
// ========================================

window.addEventListener('load', () => {
    console.log('✅ Страница загружена полностью');
    
    // Remove loading states if any
    document.body.classList.add('loaded');
});

// ========================================
// Service Worker Registration (PWA - Optional)
// ========================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable PWA functionality
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}

// ========================================
// Utility Functions
// ========================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// Error Handling
// ========================================

window.addEventListener('error', (e) => {
    console.error('Ошибка на странице:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Необработанное отклонение промиса:', e.reason);
});

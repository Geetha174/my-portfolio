// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.1)';
    }
});

// Animate skill bars when they come into view
const observerOptions = {
    threshold: 0.7,
    rootMargin: '0px 0px -100px 0px'
};

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width;
                }, 500);
            });
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Animate cards on scroll
const cardsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.glass-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.8s ease-out';
    cardsObserver.observe(card);
});

// AI Summary Generation
function generateAISummary() {
    const summaryElement = document.getElementById('ai-summary');
    const generateBtn = document.querySelector('.generate-btn');
    
    // Show loading state
    generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    generateBtn.disabled = true;
    
    // Simulate AI generation with multiple summary options
    const aiSummaries = [
        "Dynamic Software Engineer with a unique blend of electrical engineering expertise and cutting-edge programming skills. Graduated from RvR&JC College of Engineering with specialization in EEE, bringing strong analytical thinking and problem-solving abilities to software development. Proficient in Java, Python, and modern web technologies, with hands-on experience in authentication systems and weather applications. Passionate about bridging the gap between hardware and software, leveraging engineering principles to create robust, efficient solutions.",
        
        "Innovative Software Engineer and recent EEE graduate from RvR&JC College of Engineering, combining strong technical foundations with modern software development expertise. Skilled in Java, Python, and full-stack web development, with practical experience in building authentication systems and weather applications. Demonstrated ability to work with complex power electronics projects like ZVS DC-DC converters while transitioning seamlessly into software engineering. Committed to continuous learning and applying engineering principles to create scalable, user-focused solutions.",
        
        "Results-driven Software Engineer with a strong electrical engineering background from RvR&JC College of Engineering. Expertise in Java, Python, and web technologies, demonstrated through successful projects including login authentication systems and weather applications. Unique perspective combining hardware engineering knowledge with software development skills, evidenced by work on advanced power electronics projects. Passionate about creating efficient, innovative solutions and staying current with emerging technologies in the software development landscape."
    ];
    
    // Randomly select a summary
    const randomSummary = aiSummaries[Math.floor(Math.random() * aiSummaries.length)];
    
    setTimeout(() => {
        summaryElement.innerHTML = randomSummary;
        generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate New Summary';
        generateBtn.disabled = false;
        
        // Add a subtle animation to the new content
        summaryElement.style.opacity = '0';
        summaryElement.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            summaryElement.style.transition = 'all 0.5s ease';
            summaryElement.style.opacity = '1';
            summaryElement.style.transform = 'translateY(0)';
        }, 100);
    }, 2000);
}

// Contact Form Handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('Message sent successfully!', 'success');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Notification function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        ${type === 'success' ? 'background: linear-gradient(45deg, #4ecdc4, #44a08d);' : 'background: linear-gradient(45deg, #ff6b6b, #ff5252);'}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add typing animation to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroName = document.querySelector('.name');
    if (heroName) {
        const originalText = heroName.textContent;
        typeWriter(heroName, originalText, 80);
    }
});

// Add parallax effect to floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.2;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add click effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add progress bar for page scroll
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    z-index: 10000;
    transition: width 0.3s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});

console.log('Portfolio website loaded successfully! 🚀');
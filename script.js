// 3D Preloader with Progress
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const progressFill = document.querySelector('.progress-fill');
    const progressGlow = document.querySelector('.progress-glow');
    const percentage = document.getElementById('progressPercent');
    const loadingStatus = document.getElementById('loadingStatus');
    const body = document.body;
    
    body.classList.add('loading');
    
    const statuses = [
        'Initializing',
        'Loading modules',
        'Compiling assets',
        'Building portfolio',
        'Almost ready'
    ];
    
    let count = 0;
    let statusIndex = 0;
    const duration = 4500;
    const increment = 100 / (duration / 50);
    
    const counter = setInterval(() => {
        count += increment;
        
        if (count >= 100) {
            count = 100;
            clearInterval(counter);
            loadingStatus.textContent = 'Complete!';
            
            setTimeout(() => {
                preloader.classList.add('fade-out');
                body.classList.remove('loading');
                
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 800);
            }, 300);
        }
        
        // Update status text
        const newStatusIndex = Math.floor(count / 20);
        if (newStatusIndex !== statusIndex && newStatusIndex < statuses.length) {
            statusIndex = newStatusIndex;
            loadingStatus.textContent = statuses[statusIndex];
        }
        
        progressFill.style.width = count + '%';
        progressGlow.style.width = count + '%';
        percentage.textContent = Math.floor(count) + '%';
    }, 50);
});

// ROG-Style Parallax Motion Effect
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

function animateParallax() {
    // Smooth interpolation for fluid motion
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    // Apply parallax to background
    const background = document.querySelector('.animated-background');
    if (background) {
        background.style.transform = `translate(${currentX * 10}px, ${currentY * 10}px)`;
    }

    // Apply different parallax speeds to orbs
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 15;
        orb.style.transform = `translate(${currentX * speed}px, ${currentY * speed}px)`;
    });

    // Apply subtle parallax to particles canvas
    const particlesCanvas = document.getElementById('particles');
    if (particlesCanvas) {
        particlesCanvas.style.transform = `translate(${currentX * 5}px, ${currentY * 5}px)`;
    }

    requestAnimationFrame(animateParallax);
}

animateParallax();

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scroll with Offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active Navigation Link
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Observe stat numbers and animate when visible
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statObserver.observe(stat);
});

// Project Filter - Simple & Clean
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Enhanced Particle Background
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 80;
let mouse = {
    x: null,
    y: null,
    radius: 100
};

// Track mouse movement
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.3 + 0.2;
        this.color = this.getRandomColor();
    }

    getRandomColor() {
        const colors = [
            'rgba(99, 102, 241,',
            'rgba(139, 92, 246,',
            'rgba(168, 85, 247,',
            'rgba(168, 85, 247,',
            'rgba(34, 211, 238,'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        // Mouse interaction
        if (mouse.x && mouse.y) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                const force = (mouse.radius - distance) / mouse.radius;
                const directionX = dx / distance;
                const directionY = dy / distance;
                
                this.x -= directionX * force * 3;
                this.y -= directionY * force * 3;
            }
        }

        // Return to base position
        const dx = this.baseX - this.x;
        const dy = this.baseY - this.y;
        this.x += dx * 0.05;
        this.y += dy * 0.05;

        // Normal movement
        this.baseX += this.speedX;
        this.baseY += this.speedY;

        // Bounce off edges
        if (this.baseX > canvas.width || this.baseX < 0) {
            this.speedX = -this.speedX;
        }
        if (this.baseY > canvas.height || this.baseY < 0) {
            this.speedY = -this.speedY;
        }

        // Pulsing effect
        this.opacity = Math.sin(Date.now() * 0.001 + this.x) * 0.3 + 0.5;
    }

    draw() {
        ctx.fillStyle = `${this.color} ${this.opacity})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color + ' 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
            const dx = particlesArray[a].x - particlesArray[b].x;
            const dy = particlesArray[a].y - particlesArray[b].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                const opacity = (1 - distance / 120) * 0.3;
                ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    connectParticles();
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Mouse move parallax effect for hero section
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

// Skill bars animation
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-category').forEach(category => {
    skillObserver.observe(category);
});

// Typing effect for hero title (optional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect
// const heroTitle = document.querySelector('.typing-text');
// if (heroTitle) {
//     const text = heroTitle.textContent;
//     typeWriter(heroTitle, text, 150);
// }

// Add smooth reveal animation to sections
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(section);
});

// Cursor trail effect (optional - can be performance intensive)
let cursorTrails = [];
const maxTrails = 20;

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) { // Only on desktop
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
            position: fixed;
            width: 5px;
            height: 5px;
            background: rgba(99, 102, 241, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            animation: fadeOut 0.5s ease forwards;
        `;
        
        document.body.appendChild(trail);
        cursorTrails.push(trail);
        
        if (cursorTrails.length > maxTrails) {
            const oldTrail = cursorTrails.shift();
            oldTrail.remove();
        }
        
        setTimeout(() => {
            trail.remove();
        }, 500);
    }
});

// Add fadeOut animation for cursor trail
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(style);

console.log('🚀 Portfolio loaded successfully!');
console.log('💜 Built with passion by Bhagya');


// See More Projects Functionality (Mobile/Tablet Only)
const seeMoreBtn = document.getElementById('seeMoreBtn');
const projectsGrid = document.querySelector('.projects-grid');

if (seeMoreBtn) {
    seeMoreBtn.addEventListener('click', () => {
        projectsGrid.classList.toggle('expanded');
        seeMoreBtn.classList.toggle('active');
        
        const btnText = seeMoreBtn.querySelector('span');
        if (projectsGrid.classList.contains('expanded')) {
            btnText.textContent = 'See Less Projects';
        } else {
            btnText.textContent = 'See More Projects';
            // Scroll to projects section when collapsing
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}


// Matrix Rain Effect
const matrixCanvas = document.getElementById('matrixCanvas');
if (matrixCanvas) {
    const ctx = matrixCanvas.getContext('2d');
    
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    
    const matrix = "01";
    const fontSize = 14;
    const columns = matrixCanvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        
        ctx.fillStyle = '#6366f1';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrix[Math.floor(Math.random() * matrix.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 50);
    
    window.addEventListener('resize', () => {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
    });
}


// Enhanced Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active Nav Link on Scroll
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    allNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

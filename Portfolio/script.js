/*
 * Portfolio Scripts
 * Clean, functional JavaScript
 */

// Menu toggle
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
  menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
  });

  // Close on link click
  navbar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuIcon.classList.remove('bx-x');
      navbar.classList.remove('active');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
      menuIcon.classList.remove('bx-x');
      navbar.classList.remove('active');
    }
  });
}

// Typing effect
const roles = [
  "Full-Stack Developer",
  "Problem Solver",
  "Open Source Enthusiast"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.querySelector('.typing');

function type() {
  if (!typingEl) return;
  
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typingEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }
  
  let speed = isDeleting ? 50 : 100;
  
  if (!isDeleting && charIndex === currentRole.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }
  
  setTimeout(type, speed);
}

type();

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 70;
      const position = target.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({
        top: position,
        behavior: 'smooth'
      });
    }
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

function updateNav() {
  const scrollY = window.scrollY + 100;
  
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// Header shadow on scroll
const header = document.querySelector('.header');

function updateHeader() {
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
  } else {
    header.style.boxShadow = 'none';
  }
}

window.addEventListener('scroll', updateHeader, { passive: true });

// Simple scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add animation to cards
document.querySelectorAll('.skill-card, .service-card, .project-card, .edu-card, .about-card').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.4s ease ${i * 0.05}s, transform 0.4s ease ${i * 0.05}s`;
  observer.observe(el);
});

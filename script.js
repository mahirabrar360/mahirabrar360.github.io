/* =============================================
   SHEIKH MAHIR ABRAR — Portfolio Script
   ============================================= */

// ── CUSTOM CURSOR ────────────────────────────
const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top  = mouseY + 'px';
});

// Ring follows with slight lag
function animateRing() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Hover effects on interactive elements
const hoverTargets = document.querySelectorAll('a, button, .skill-card, .hobby-card, .ach-card, .edu-card, .timeline-card');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => {
    dot.classList.add('hovering');
    ring.classList.add('hovering');
  });
  el.addEventListener('mouseleave', () => {
    dot.classList.remove('hovering');
    ring.classList.remove('hovering');
  });
});

// ── NAVBAR SCROLL ────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

// ── ACTIVE NAV LINK ──────────────────────────
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navBtns  = document.querySelectorAll('.nav-btn');
  let currentId = '';
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top <= window.innerHeight * 0.4) currentId = sec.id;
  });
  navBtns.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('href') === '#' + currentId) {
      btn.classList.add('active');
    }
  });
}

// ── HAMBURGER MENU ───────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
});

// Close nav on link click
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// ── SCROLL REVEAL ────────────────────────────
const reveals = document.querySelectorAll('.reveal, .reveal-right');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.style.getPropertyValue('--delay') || '0s';
      entry.target.style.transitionDelay = delay;
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
});

reveals.forEach(el => observer.observe(el));

// ── SMOOTH SCROLL ────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── STAGGER SKILL CARDS ON REVEAL ────────────
const skillCards = document.querySelectorAll('.skill-card');
const skillObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    skillCards.forEach((card, i) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, i * 60);
    });
    skillObserver.disconnect();
  }
}, { threshold: 0.2 });

// Initial state
skillCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.35s ease, box-shadow 0.35s ease';
});

const skillsPanel = document.querySelector('.skills-panel');
if (skillsPanel) skillObserver.observe(skillsPanel);

// ── PARALLAX HERO NOISE ──────────────────────
const heroNoise = document.querySelector('.hero-noise');
if (heroNoise) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroNoise.style.transform = `translateY(${y * 0.3}px)`;
  });
}

// ── PHOTO TILT ON MOUSE MOVE ─────────────────
const photoWrap = document.querySelector('.hero-photo-wrap');
if (photoWrap) {
  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const rx = ((e.clientY - cy) / cy) * -5;
    const ry = ((e.clientX - cx) / cx) *  5;
    photoWrap.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  document.addEventListener('mouseleave', () => {
    photoWrap.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });
}

// ── TYPING EFFECT ON HERO TITLE ──────────────
const titleEl = document.querySelector('.hero-title');
if (titleEl) {
  const titles = [
    'Industrial & Production Engineer',
    'Supply Chain Analyst (CSCA®)',
    'Design & Visual Communicator',
    'Leader & Problem Solver',
  ];
  let titleIndex = 0;
  let charIndex  = 0;
  let deleting   = false;

  function typeTitle() {
    const current = titles[titleIndex];
    if (!deleting) {
      titleEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeTitle, 2000);
        return;
      }
    } else {
      titleEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
      }
    }
    setTimeout(typeTitle, deleting ? 40 : 70);
  }

  // Start typing after initial animation
  setTimeout(typeTitle, 1200);
}

// ── ACHIEVEMENT COUNT-UP NUMBERS ─────────────
function countUp(el, target, duration = 1600) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = Math.round(start);
  }, 16);
}

// ── PAGE LOAD INTRO ──────────────────────────
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});

// ── CURSOR HIDE ON LEAVE ─────────────────────
document.addEventListener('mouseleave', () => {
  dot.style.opacity  = '0';
  ring.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  dot.style.opacity  = '1';
  ring.style.opacity = '0.6';
});

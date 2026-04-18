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
const hoverTargets = document.querySelectorAll('a, button, .skill-card, .hobby-card, .ach-card, .edu-card, .timeline-card, .project-card');
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

// ── PROJECT MODAL DATA ───────────────────────
const projectData = {
  lathe: {
    title: 'CA6120 / CA6240 Centre Lathe',
    subtitle: 'SolidWorks 3D Modelling Project',
    image: 'assets/Solidworks_project.jpg',
    tags: ['SolidWorks', '3D Parametric Modelling', 'Assembly Design', 'Engineering Drawing', 'FEA'],
    content: `
      <h4 class="modal-section-title">Project Overview</h4>
      <p>The CA6120 and CA6240 are heavy-duty centre lathe machines widely used in industrial manufacturing for turning, facing, boring, threading, and knurling operations. These machines are known for their robust cast-iron construction, precision spindle bearing system, and variable speed gearbox, making them a staple in metal-working shops and engineering workshops worldwide.</p>
      <p>This project involved creating a complete, dimensionally accurate 3D parametric model of the CA6120/CA6240 lathe in SolidWorks — capturing every major sub-assembly from the headstock and tailstock to the carriage, cross-slide, and tool post.</p>

      <h4 class="modal-section-title">Machine Specifications (CA6120/CA6240)</h4>
      <ul>
        <li>Swing over bed: 400 mm (CA6120) / 500 mm (CA6240)</li>
        <li>Distance between centres: 750 mm – 3000 mm (configurable)</li>
        <li>Spindle bore: 52 mm standard</li>
        <li>Spindle speeds: 12–16 steps, ranging from ~25 to 1600 RPM</li>
        <li>Main motor power: 5.5 – 11 kW depending on variant</li>
        <li>Bed width: 350 mm hardened and ground</li>
        <li>Cross-slide travel: 260–320 mm</li>
        <li>Longitudinal feed: 0.04–3.16 mm/rev; Thread pitches: metric, inch, module, diametral</li>
        <li>Tailstock sleeve travel: 150 mm with internal morse taper MT4 or MT5</li>
      </ul>

      <h4 class="modal-section-title">SolidWorks Tools & Techniques Used</h4>
      <ul>
        <li><strong>Part Modelling:</strong> Boss-Extrude, Cut-Extrude, Revolve, Loft, Sweep, and Fillet/Chamfer features to model complex curved surfaces on the headstock housing and bed casting.</li>
        <li><strong>Parametric Constraints:</strong> Fully defined sketches using geometric relations (Coincident, Tangent, Concentric) and dimensional parameters linked via Global Variables for easy scaling between CA6120 and CA6240 variants.</li>
        <li><strong>Assembly Design:</strong> Bottom-up assembly using Standard Mates (Coincident, Concentric, Parallel, Distance) and Advanced Mates (Width, Path Mate) to constrain the carriage, saddle, and cross-slide motions accurately.</li>
        <li><strong>Motion Study:</strong> Basic motion simulation to validate carriage travel along the bed and tool post rotation within mechanical limits.</li>
        <li><strong>Sheet Metal Features:</strong> Applied to the machine guard panels and chip tray using Bend, Flange, and Hem tools.</li>
        <li><strong>Engineering Drawings:</strong> Generated fully annotated 2D drawings with GD&T callouts, section views (A-A, B-B through headstock), detail views of the thread dial indicator, and a complete BOM linked to the assembly.</li>
        <li><strong>Appearances & Rendering:</strong> Applied PhotoView 360 materials (cast iron grey, machined steel, rubber) and studio lighting to produce a realistic rendered output.</li>
        <li><strong>Design Library & Toolbox:</strong> Used SolidWorks Toolbox for standard fasteners (ISO bolts, keys, bearing seats) ensuring accurate hardware representation throughout the assembly.</li>
      </ul>

      <h4 class="modal-section-title">Key Takeaways</h4>
      <p>This project strengthened understanding of parametric modelling discipline — ensuring every feature is driven by intent so changes propagate correctly. Working with a real industrial machine sharpened skills in interpreting manufacturing drawings, tolerancing practice, and understanding fit/function relationships between mating components in a precision machine tool context.</p>
    `
  },

  nozzleport: {
    title: 'NozzlePort — Firefighting Hose Management Device',
    subtitle: 'IPE 318 Product Design II Sessional — Group A8 | BUET 2025',
    image: 'assets/NozzlePort_project.jpg',
    tags: ['Product Design', 'SolidWorks', 'ANSYS', 'QFD', 'Cost Analysis', 'Manufacturing', 'Survey Research'],
    content: `
      <h4 class="modal-section-title">Project Overview</h4>
      <p>NozzlePort is a mobile firefighting device designed to address a critical inefficiency in conventional fire suppression operations — the need for multiple firefighters to physically hold and aim high-pressure hoses. The device enables a single operator to mount, direct, and control up to three high-pressure hose nozzles simultaneously from a wheeled, mobile platform.</p>
      <p>This was the selected project proposal out of five concepts in the Product Design II Sessional (IPE 318) at the Department of Industrial and Production Engineering, BUET, supervised by Dr. Kais Bin Zaman, Rashik Ahnaf, and Zahin Ar Rafi.</p>

      <h4 class="modal-section-title">Problem Statement</h4>
      <p>Conventional firefighting requires 2–3 operators per high-pressure nozzle (operating at 100–300 psi) due to the significant reaction force involved. A survey of 54 firefighters across Tejgaon, Mirpur, and Fulbaria fire stations in Dhaka revealed that 70% found nozzle handling extremely strenuous, 51% reported frequent aim drift, and 76% believed a single-operator multi-nozzle system would be very valuable.</p>

      <h4 class="modal-section-title">Design & Engineering</h4>
      <ul>
        <li><strong>Mobile Base:</strong> Heavy-duty castor wheels (with and without brakes) allow the entire assembly to be repositioned by a single operator across varied terrain.</li>
        <li><strong>Swivel Mechanism:</strong> A cast iron top plate with a precision swivel bearing assembly and central kingpin provides 360° rotary adjustment for horizontal aiming.</li>
        <li><strong>Vertical Adjustment:</strong> A jack-screw mechanism driven by a chain-sprocket assembly and crank handle allows controlled elevation of the nozzle platform.</li>
        <li><strong>Nozzle Holding Platform:</strong> An adjustable platform with locking clamps and rubber-padded docking cradles accommodates multiple hose nozzles securely.</li>
        <li><strong>Frame:</strong> Mild steel rectangular tube construction, welded and bolted, provides structural rigidity while keeping the assembly manageable.</li>
      </ul>

      <h4 class="modal-section-title">ANSYS Structural Analysis</h4>
      <p>Critical components (Main Frame, Nozzle Platform, Bottom Part, Swivel) were analysed in ANSYS for static structural performance under operational loads:</p>
      <ul>
        <li>Main Frame: Max deformation 0.038 mm, Von-Mises stress 1.89 MPa, Safety Factor 15, Life Cycle 10⁶ cycles</li>
        <li>Nozzle Platform: Max deformation 0.052 mm, Von-Mises stress 9.14 MPa, Safety Factor 15</li>
        <li>Bottom Part: Max deformation 0.357 mm, Von-Mises stress 1.99 MPa, Safety Factor 15</li>
        <li>Swivel: Max deformation 0.00041 mm, Von-Mises stress 0.97 MPa, Safety Factor 15</li>
      </ul>
      <p>All components showed satisfactory structural performance with a uniform safety factor of 15, confirming the design's structural integrity under maximum practical loading conditions.</p>

      <h4 class="modal-section-title">Material & Process Selection</h4>
      <p>Using the Digital Logic Method (quantitative analysis via Likert scale and performance indices), the following selections were made:</p>
      <ul>
        <li><strong>Frame & Housing:</strong> Mild Steel (Performance Index: 84.36) — highest among mild steel, aluminium alloy, and stainless steel</li>
        <li><strong>Swivel Base:</strong> Cast iron top plate (compressive load resistance), carbon steel kingpin and lower plate</li>
        <li><strong>Chain:</strong> Stainless steel for corrosion resistance in wet firefighting environments</li>
        <li><strong>Manufacturing:</strong> Forging for primary structural components (Performance Index: 91.65 vs 78 for casting)</li>
        <li><strong>Permanent Joints:</strong> TIG Welding (Performance Index: 94) for critical load-bearing connections</li>
        <li><strong>Temporary Joints:</strong> Screws (Performance Index: 84) for protective panels and replaceable components</li>
      </ul>

      <h4 class="modal-section-title">Cost Analysis</h4>
      <ul>
        <li>Prototype cost: BDT 23,000 (raw materials, fabrication, assembly)</li>
        <li>Mass production cost per unit: BDT 18,220 (at 250 units/year)</li>
        <li>Selling price: BDT 26,000 | Profit per unit: BDT 7,780</li>
        <li>Break-even quantity: 450 units/year</li>
        <li>Most sensitive cost factor: Direct labour (8.87% change in break-even per 10% cost change)</li>
      </ul>

      <h4 class="modal-section-title">Quality Function Deployment (QFD)</h4>
      <p>A full House of Quality was developed mapping nine customer requirements (including ease of movement, stability, reliability, and human stress reduction) against twelve engineering parameters. The NozzlePort achieved competitive customer ratings of 470 on key parameters — comparable or superior to benchmarked competitors including Aqua Blaster, Blitzfire Monitor, and Rosenbauer products.</p>

      <h4 class="modal-section-title">Team</h4>
      <p>Md. Arfin Emrose Anik · Sheikh Mahir Abrar · Tanvee Sadat · Md. Nazimus Sakib · Sadia Faruque Department of IPE, BUET</p>
    `
  }
};

// ── PROJECT MODAL LOGIC ──────────────────────
const modalOverlay = document.getElementById('projModalOverlay');
const modalClose   = document.getElementById('projModalClose');
const modalInner   = document.getElementById('projModalInner');

function openModal(projectKey) {
  const data = projectData[projectKey];
  if (!data) return;

  modalInner.innerHTML = `
    <img src="${data.image}" alt="${data.title}" class="modal-img" onerror="this.style.display='none'"/>
    <p class="modal-subtitle">${data.subtitle}</p>
    <h2 class="modal-title">${data.title}</h2>
    <div class="modal-tags">
      ${data.tags.map(t => `<span class="modal-tag">${t}</span>`).join('')}
    </div>
    <div class="modal-body">${data.content}</div>
  `;

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Open on card click
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const key = card.getAttribute('data-project');
    openModal(key);
  });
});

// Close on X button
if (modalClose) modalClose.addEventListener('click', closeModal);

// Close on overlay click (outside modal)
if (modalOverlay) {
  modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) closeModal();
  });
}

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

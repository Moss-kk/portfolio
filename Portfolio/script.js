/* ══════════════════════════════════════════
   MUSSIE KIFLE PORTFOLIO — JAVASCRIPT
══════════════════════════════════════════ */

// ── Typing animation ──────────────────────
const roles = [
  'Product Manager',
  'AI Developer',
  'Web Developer',
  'Digital Photographer',
  'Co-Founder @ Eagle Investments',
  'Graphics Designer'
];
let roleIdx = 0, charIdx = 0, deleting = false;
const typingEl = document.getElementById('typingRole');

function typeRole() {
  const current = roles[roleIdx];
  if (!deleting) {
    typingEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      setTimeout(() => { deleting = true; typeRole(); }, 2200);
      return;
    }
  } else {
    typingEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typeRole, deleting ? 45 : 80);
}
typeRole();

// ── Navbar scroll effect ──────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  highlightNavLink();
});

// ── Active nav link ──────────────────────
function highlightNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  links.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
}

// ── Mobile menu ──────────────────────────
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = menuToggle.querySelectorAll('span');
  const isOpen = navLinks.classList.contains('open');
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 6px)' : '';
  spans[1].style.opacity = isOpen ? '0' : '1';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -6px)' : '';
});
document.querySelectorAll('.nav-link').forEach(l => {
  l.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
  });
});

// ── Intersection Observer: fade-in + skill bars ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // animate skill bars when in view
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.about-card, .skill-category, .project-card, .photo-feat, .timeline-item, .contact-card, .contact-form, .section-header').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Also observe skills section for bars
const skillsSection = document.querySelector('.skills');
if (skillsSection) observer.observe(skillsSection);

// ── Contact form handler ──────────────────
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = document.getElementById('submitContact');
  const name = document.getElementById('senderName').value.trim();
  const email = document.getElementById('senderEmail').value.trim();
  const subject = document.getElementById('msgSubject').value.trim() || 'Portfolio Contact';
  const body = document.getElementById('msgBody').value.trim();

  // Open mailto link
  const mailtoLink = `mailto:kiflemusse@gmail.com?subject=${encodeURIComponent(subject + ' — from ' + name)}&body=${encodeURIComponent(body + '\n\nFrom: ' + name + '\nEmail: ' + email)}`;
  window.location.href = mailtoLink;

  btn.textContent = 'Message Sent! ✅';
  btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
  setTimeout(() => {
    btn.textContent = 'Send Message 🚀';
    btn.style.background = '';
    this.reset();
  }, 3000);
});

// ── Smooth parallax on hero orbs ─────────
document.addEventListener('mousemove', e => {
  const { clientX: x, clientY: y } = e;
  const w = window.innerWidth, h = window.innerHeight;
  const dx = (x / w - 0.5) * 30;
  const dy = (y / h - 0.5) * 30;
  document.querySelectorAll('.orb').forEach((orb, i) => {
    const factor = (i + 1) * 0.4;
    orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
  });
});

// ── Particle effect on hero badge ────────
function createSparkle(x, y) {
  const sparkle = document.createElement('div');
  sparkle.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    left: ${x}px; top: ${y}px;
    width: 6px; height: 6px;
    background: hsl(${40 + Math.random() * 20}, 80%, 60%);
    border-radius: 50%;
    animation: sparkle-anim 0.7s ease-out forwards;
  `;
  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 700);
}
const style = document.createElement('style');
style.textContent = `
  @keyframes sparkle-anim {
    0% { transform: translate(0,0) scale(1); opacity: 1; }
    100% { transform: translate(${Math.random()>0.5?'':'-'}${20+Math.random()*30}px, -${20+Math.random()*40}px) scale(0); opacity: 0; }
  }
`;
document.head.appendChild(style);

document.querySelector('.hero-badge')?.addEventListener('click', e => {
  for (let i = 0; i < 8; i++) {
    setTimeout(() => createSparkle(e.clientX + (Math.random()-0.5)*20, e.clientY + (Math.random()-0.5)*20), i * 50);
  }
});

// ── Counter animation ─────────────────────
function animateCounter(el, target) {
  let start = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target + (el.dataset.suffix || '+'); clearInterval(timer); }
    else el.textContent = Math.floor(start) + (el.dataset.suffix || '+');
  }, 25);
}
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(num => {
        const val = parseInt(num.textContent);
        if (!isNaN(val)) animateCounter(num, val);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// Initialize Lucide SVG icons
lucide.createIcons();

// ── NAVBAR: highlight active section on scroll ──────────────
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active-link');
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

// ── NAVBAR: shrink on scroll ────────────────────────────────
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  navbar.style.boxShadow = window.scrollY > 50
    ? '0 2px 20px rgba(0,0,0,0.4)'
    : '0 2px 12px rgba(0,0,0,0.3)';
});

// ── MOBILE MENU toggle ──────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// Close menu when a link is clicked
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

// ── TABS ────────────────────────────────────────────────────
const tabBtns    = document.querySelectorAll('.tab-btn');
const tabPanels  = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    // Update buttons
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Update panels
    tabPanels.forEach(panel => {
      panel.classList.remove('active');
      if (panel.id === target) panel.classList.add('active');
    });
  });
});

// ── CARD DETAILS: add an internal collapsible block ────────
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  if (card.querySelector('.sdss-block, .card-detail-block')) {
    return;
  }

  const children = Array.from(card.children);
  const header = children.find(child =>
    child.classList?.contains('resource-header') || child.tagName === 'H3'
  );

  if (!header) {
    return;
  }

  const contentChildren = children.filter(child => child !== header);
  const pinnedChildren = contentChildren.filter(child =>
    child.classList?.contains('resource-list') ||
    child.classList?.contains('source-inline') ||
    child.classList?.contains('btn') ||
    child.classList?.contains('tradition-icon')
  );
  const leadContent = contentChildren.find(child => !pinnedChildren.includes(child));

  if (!leadContent) {
    return;
  }

  const detailChildren = contentChildren.filter(child =>
    child !== leadContent && !pinnedChildren.includes(child)
  );

  if (detailChildren.length === 0) {
    return;
  }

  const details = document.createElement('details');
  const summary = document.createElement('summary');
  const content = document.createElement('div');

  details.className = 'card-detail-block';
  summary.className = 'card-detail-summary';
  summary.innerHTML = '<span class="card-detail-label">More details</span>';
  content.className = 'card-detail-content';

  detailChildren.forEach(child => content.appendChild(child));

  details.appendChild(summary);
  details.appendChild(content);

  leadContent.insertAdjacentElement('afterend', details);
});

// ── SCROLL-REVEAL: fade cards in as they enter viewport ─────
const revealItems = document.querySelectorAll('.card, .timeline-card, .value-item, .stat, .source-category');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealItems.forEach(item => {
  item.classList.add('will-reveal');
  revealObserver.observe(item);
});

// Inject the animation CSS dynamically so no extra file is needed
const style = document.createElement('style');
style.textContent = `
  .will-reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .revealed {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
  .nav-links a.active-link {
    background: rgba(245,128,37,0.2);
    color: #ffffff;
  }
`;
document.head.appendChild(style);

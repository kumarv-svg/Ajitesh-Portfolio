/**
 * AJITESH SAI N. - DATA ANALYST PORTFOLIO
 * Main Controller: Staggered Animations, Navigation, Scroll-Spy & Interactive Effects
 */

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('js-loaded');
  initHeroAnimations();
  initNavbarScroll();
  initMobileMenu();
  initScrollSpy();
  initScrollReveal();
  initModalListeners();
});

/* --- Hero Staggered Load Sequence --- */
function initHeroAnimations() {
  const animatedElements = document.querySelectorAll('.hero-anim');
  
  // Trigger staggered reveal
  setTimeout(() => {
    animatedElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('revealed');
      }, index * 95);
    });
  }, 120);
}

/* --- Sticky Navbar Blur on Scroll --- */
function initNavbarScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* --- Mobile Menu Drawer Controller --- */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburger-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburgerBtn || !mobileDrawer) return;

  function toggleMenu(forceClose = false) {
    const isOpen = forceClose ? false : !mobileDrawer.classList.contains('open');
    hamburgerBtn.classList.toggle('active', isOpen);
    mobileDrawer.classList.toggle('open', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', isOpen.toString());
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburgerBtn.addEventListener('click', () => toggleMenu());

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(true);
    });
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
      toggleMenu(true);
    }
  });
}

/* --- Active Navigation State Based on Scroll Position (Scroll-Spy) --- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function updateActiveLink() {
    let currentId = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });

    mobileNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
}

/* --- Scroll Reveal with IntersectionObserver --- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-fade');
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* --- Modal Global Listeners (ESC, Overlay Click) --- */
function initModalListeners() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeProjectModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeProjectModal();
    }
  });
}

// ============================================
// RAAZI MAINTENANCE SERVICES — SCRIPT
// ============================================

(function () {
  'use strict';

  // ---- STATE ----
  let currentLang = localStorage.getItem('raazi-lang') || 'en';

  // ---- LANGUAGE TOGGLE ----
  const htmlRoot = document.getElementById('html-root');
  const langToggle = document.getElementById('lang-toggle');
  const langLabel = document.getElementById('lang-label');

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('raazi-lang', lang);

    if (lang === 'ar') {
      htmlRoot.setAttribute('lang', 'ar');
      htmlRoot.setAttribute('dir', 'rtl');
      langLabel.textContent = 'English';
      document.title = 'خدمات رازي للصيانة | Raazi Maintenance Services';
    } else {
      htmlRoot.setAttribute('lang', 'en');
      htmlRoot.setAttribute('dir', 'ltr');
      langLabel.textContent = 'عربي';
      document.title = 'Raazi Maintenance Services | خدمات رازي للصيانة';
    }

    // Update all translatable elements
    document.querySelectorAll('[data-en][data-ar]').forEach(el => {
      const text = el.getAttribute('data-' + lang);
      if (text) el.textContent = text;
    });

    // Update WhatsApp links with language-specific message
    const waMsg = lang === 'ar'
      ? 'مرحباً بخدمات رازي للصيانة، أحتاج إلى مساعدة في خدمة.'
      : 'Hello Raazi Maintenance Services, I need help with a service.';
    document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
      const base = a.href.split('?')[0];
      a.href = base + '?text=' + encodeURIComponent(waMsg);
    });
  }

  langToggle.addEventListener('click', () => {
    applyLanguage(currentLang === 'en' ? 'ar' : 'en');
  });

  // Apply saved language on load
  applyLanguage(currentLang);


  // ---- NAVBAR SCROLL ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });


  // ---- HAMBURGER MENU ----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  let menuOpen = false;

  hamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    navLinks.classList.toggle('open', menuOpen);
    hamburger.setAttribute('aria-expanded', menuOpen);
  });

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      navLinks.classList.remove('open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (menuOpen && !navbar.contains(e.target)) {
      menuOpen = false;
      navLinks.classList.remove('open');
    }
  });


  // ---- SMOOTH ACTIVE NAV HIGHLIGHT ----
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-links a[href^="#"]');

  function updateActiveNav() {
    const scrollY = window.scrollY + 100;
    let active = '';
    sections.forEach(sec => {
      if (sec.offsetTop <= scrollY) active = sec.getAttribute('id');
    });
    navLinkEls.forEach(a => {
      const href = a.getAttribute('href').replace('#', '');
      a.style.color = href === active ? 'var(--blue-primary)' : '';
      a.style.background = href === active ? 'var(--blue-bg)' : '';
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();


  // ---- INTERSECTION OBSERVER for card animations ----
  const animTargets = document.querySelectorAll('.service-card, .why-card, .pricing-card');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    animTargets.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity .6s ease, transform .6s ease';
      observer.observe(el);
    });
  } else {
    // Fallback: show all cards
    animTargets.forEach(el => { el.style.opacity = '1'; });
  }


  // ---- SECTION HEADER animations ----
  const headerTargets = document.querySelectorAll('.section-header, .contact-box, .contact-left, .contact-right');
  if ('IntersectionObserver' in window) {
    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          headerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    headerTargets.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity .7s ease, transform .7s ease';
      headerObserver.observe(el);
    });
  }

})();

/* ==========================================================================
   TRENZ LITE® — Fresh ideas
   Vanilla JavaScript — no frameworks
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initStickyNav();
    initMobileMenu();
    initActiveLink();
    initHeroSlides();
    initScrollReveal();
    initCounters();
    initProductFilter();
    initContactForm();
    initSmoothScroll();
  });

  /* ----------------------------------------------------------------------
     0. Hero background slideshow — rotate group photos
  ---------------------------------------------------------------------- */
  function initHeroSlides() {
    var slides = document.querySelectorAll('.hero__slide');
    if (slides.length < 2) return;

    var current = 0;
    setInterval(function () {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 5000);
  }

  /* ----------------------------------------------------------------------
     1. Sticky navbar — add .scrolled after 50px
  ---------------------------------------------------------------------- */
  function initStickyNav() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;

    function onScroll() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ----------------------------------------------------------------------
     2. Mobile hamburger menu
  ---------------------------------------------------------------------- */
  function initMobileMenu() {
    var hamburger = document.querySelector('.hamburger');
    var navLinks = document.querySelector('.nav-links');
    if (!hamburger || !navLinks) return;

    // Build an overlay element for click-away closing
    var overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function closeMenu() {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      overlay.classList.remove('show');
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
    }

    function toggleMenu() {
      var isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      overlay.classList.toggle('show', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);

    // Close when a link is tapped
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on resize to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) closeMenu();
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ----------------------------------------------------------------------
     3. Highlight active nav link based on current page
  ---------------------------------------------------------------------- */
  function initActiveLink() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  /* ----------------------------------------------------------------------
     4. Scroll reveal — fade sections in via IntersectionObserver
  ---------------------------------------------------------------------- */
  function initScrollReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function (el) { observer.observe(el); });
  }

  /* ----------------------------------------------------------------------
     5. Animated counters — count up when in view
  ---------------------------------------------------------------------- */
  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    function animate(el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var duration = 1800;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        // easeOutCubic
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = target * eased;
        // Preserve decimals only if target has them
        el.textContent = Number.isInteger(target)
          ? Math.floor(value).toLocaleString('en-IN')
          : value.toFixed(0);
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = Number.isInteger(target)
            ? target.toLocaleString('en-IN')
            : target;
        }
      }
      requestAnimationFrame(step);
    }

    if (!('IntersectionObserver' in window)) {
      counters.forEach(animate);
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animate(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (c) { observer.observe(c); });
  }

  /* ----------------------------------------------------------------------
     6. Product category filter (products.html)
  ---------------------------------------------------------------------- */
  function initProductFilter() {
    var buttons = document.querySelectorAll('.filter-btn');
    var cards = document.querySelectorAll('.product-card[data-category]');
    if (!buttons.length || !cards.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');

        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        cards.forEach(function (card) {
          var cats = card.getAttribute('data-category');
          if (filter === 'all' || cats.indexOf(filter) !== -1) {
            card.classList.remove('hide');
          } else {
            card.classList.add('hide');
          }
        });
      });
    });
  }

  /* ----------------------------------------------------------------------
     7. Contact form validation + success toast (no backend)
  ---------------------------------------------------------------------- */
  function initContactForm() {
    var form = document.getElementById('enquiryForm');
    if (!form) return;

    var toast = document.getElementById('toast');

    function showError(group, show) {
      group.classList.toggle('invalid', show);
    }

    function isEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      // Required fields
      form.querySelectorAll('[data-required]').forEach(function (field) {
        var group = field.closest('.form-group');
        if (!field.value.trim()) {
          showError(group, true);
          valid = false;
        } else {
          showError(group, false);
        }
      });

      // Email format (only if filled)
      var email = form.querySelector('input[name="email"]');
      if (email && email.value.trim() && !isEmail(email.value.trim())) {
        showError(email.closest('.form-group'), true);
        valid = false;
      }

      if (!valid) return;

      // "Submit" — static demo, show toast & reset
      form.reset();
      if (toast) {
        toast.classList.add('show');
        setTimeout(function () { toast.classList.remove('show'); }, 4500);
      }
    });

    // Clear error on input
    form.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        var group = field.closest('.form-group');
        if (group) group.classList.remove('invalid');
      });
    });
  }

  /* ----------------------------------------------------------------------
     8. Smooth scroll for in-page anchor links
  ---------------------------------------------------------------------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var id = link.getAttribute('href');
        if (id === '#' || id.length < 2) return;
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          var top = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  }
})();

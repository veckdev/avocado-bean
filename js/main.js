/* =============================================================
   AVOCADO BEAN — main.js
   Navbar scroll, scroll-snap dots, reveal animations
   ============================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------------
     1. NAV — shrink on scroll
  ------------------------------------------------------- */
  const nav = document.getElementById('main-nav');

  if (nav) {
    // The snap container scrolls, not window
    const snapContainer = document.getElementById('snap-container');

    if (snapContainer) {
      snapContainer.addEventListener('scroll', () => {
        if (snapContainer.scrollTop > 10) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      }, { passive: true });
    }
  }

  /* -------------------------------------------------------
     2. SCROLL DOTS — active state on section change
  ------------------------------------------------------- */
  const snapContainer = document.getElementById('snap-container');
  const dots          = document.querySelectorAll('.scroll-dot');
  const sections      = document.querySelectorAll('.snap-section');

  // Click dot → scroll to section
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.dataset.section);
      const target = document.getElementById(`section-${index}`);
      if (target && snapContainer) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Observe which section is in view → update active dot
  if (sections.length > 0) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id    = entry.target.id;             // e.g. "section-2"
          const index = id.replace('section-', '');

          dots.forEach(d => d.classList.remove('active'));
          const activeDot = document.querySelector(`.scroll-dot[data-section="${index}"]`);
          if (activeDot) activeDot.classList.add('active');
        }
      });
    }, {
      root: snapContainer,
      threshold: 0.5   // section must be 50% visible
    });

    sections.forEach(section => sectionObserver.observe(section));
  }

  /* -------------------------------------------------------
     3. REVEAL ANIMATIONS — fade + slide up on enter
  ------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // unobserve after animating — fire once
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      root: snapContainer,
      threshold: 0.15
    });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* -------------------------------------------------------
     4. DISH CARDS — "+" button feedback
  ------------------------------------------------------- */
  const addBtns = document.querySelectorAll('.dish-add');

  addBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const original = this.textContent;
      this.textContent = '✓';
      this.style.background    = 'var(--forest)';
      this.style.borderColor   = 'var(--forest)';
      this.style.color         = 'var(--ivory)';

      setTimeout(() => {
        this.textContent         = original;
        this.style.background    = '';
        this.style.borderColor   = '';
        this.style.color         = '';
      }, 1200);
    });
  });

  /* -------------------------------------------------------
     5. NAV ACTIVE LINK — highlight current page
  ------------------------------------------------------- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkFile = link.getAttribute('href').split('/').pop();
    if (linkFile === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

});

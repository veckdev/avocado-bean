/* =============================================================
   AVOCADO BEAN — main.js
   All JavaScript for the homepage.
   This file handles:
   1. Nav shrinking on scroll
   2. Scroll dot indicators updating as user navigates sections
   3. Reveal animations when elements enter the viewport
   4. Decorative icon pattern on dark sections
   5. Highlighting the current page in the nav
   ============================================================= */


/* Wait for the HTML to fully load before running any JavaScript.
   This ensures all elements exist before we try to select them. */
document.addEventListener('DOMContentLoaded', () => {


  /* -----------------------------------------------------------
     1. NAV — SHRINK ON SCROLL
     When the user scrolls down, we add the class "is-scrolled"
     to the nav. The CSS then reduces its padding and adds a
     shadow, making it feel more compact.
  ----------------------------------------------------------- */
  const nav = document.getElementById('main-nav');
  const pageScroller = document.getElementById('page-scroller');

  /* Listen for scroll events on the snap container
     (the whole page scrolls inside #page-scroller, not on window) */
  if (nav && pageScroller) {
    pageScroller.addEventListener('scroll', () => {
      if (pageScroller.scrollTop > 10) {
        nav.classList.add('is-scrolled');    /* add class → CSS shrinks nav */
      } else {
        nav.classList.remove('is-scrolled'); /* remove class → nav returns to normal */
      }
    }, { passive: true }); /* passive: true improves scroll performance */
  }


  /* -----------------------------------------------------------
     2. SCROLL DOTS — UPDATE ACTIVE DOT AS USER SCROLLS
     We use IntersectionObserver to watch which section is
     visible. When a section enters the viewport, we find the
     corresponding dot and add "is-active" to it.
  ----------------------------------------------------------- */
  const allDots = document.querySelectorAll('.scroll-indicator-dot');
  const allSections = document.querySelectorAll('.page-section');

  /* Clicking a dot scrolls to the matching section */
  allDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const sectionIndex = dot.dataset.section; /* e.g. "2" */
      const targetSection = document.getElementById(`section-${sectionIndex}`);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* Watch sections and update the active dot when one enters view */
  if (allSections.length > 0) {
    const sectionWatcher = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          /* Get the section number from its id (e.g. "section-2" → "2") */
          const sectionNumber = entry.target.id.replace('section-', '');

          /* Remove "is-active" from all dots, then add it to the right one */
          allDots.forEach(dot => dot.classList.remove('is-active'));
          const matchingDot = document.querySelector(
            `.scroll-indicator-dot[data-section="${sectionNumber}"]`
          );
          if (matchingDot) matchingDot.classList.add('is-active');
        }
      });
    }, {
      root: pageScroller, /* watch within the scroll container, not the window */
      threshold: 0.5      /* section must be at least 50% visible to trigger */
    });

    allSections.forEach(section => sectionWatcher.observe(section));
  }


  /* -----------------------------------------------------------
     3. REVEAL ANIMATIONS — FADE + SLIDE UP ON ENTER
     Elements with the class "reveal" start invisible (opacity 0,
     shifted down 30px). When they enter the viewport, we add
     "is-visible" which triggers a CSS transition to fade them in
     and slide them up.
     Delay classes (reveal-delay-1, etc.) stagger the animation
     so multiple elements animate one after another.
  ----------------------------------------------------------- */
  const elementsToReveal = document.querySelectorAll('.reveal');

  if (elementsToReveal.length > 0) {
    const revealWatcher = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible'); /* triggers CSS transition */
          revealWatcher.unobserve(entry.target);    /* stop watching after animating */
        }
      });
    }, {
      root: pageScroller,
      threshold: 0.15 /* start animating when 15% of the element is visible */
    });

    elementsToReveal.forEach(el => revealWatcher.observe(el));
  }


  /* -----------------------------------------------------------
     4. ICON PATTERN — SCATTER ICONS ON DARK SECTIONS
     We create SVG icons from the Material Icons paths and scatter
     them randomly across the philosophy and blog sections.
     Each icon gets a random position, rotation, size and opacity
     so the pattern looks organic rather than grid-like.
  ----------------------------------------------------------- */

  /* SVG path data for each icon (copied from Google Material Icons) */
  const iconPaths = [
    /* avocado_bean icon */
    `<path d="M380-220q66 0 113-46.5T540-380q0-66-47-113t-113-47q-67 0-113.5 47T220-380q0 67 46.5 113.5T380-220Zm0-80q-33 0-56.5-23.5T300-380q0-33 23.5-56.5T380-460q33 0 56.5 23.5T460-380q0 33-23.5 56.5T380-300Zm260 180q88 0 144-56t56-144q0-17-11.5-28.5T800-360q-17 0-28.5 11.5T760-320q0 48-36.5 84T640-200q-17 0-28.5 11.5T600-160q0 17 11.5 28.5T640-120Zm0 80q-51 0-85.5-34.5T520-160q0-50 34.5-85t85.5-35q14 0 27-13t13-27q0-50 34.5-85t85.5-35q50 0 85 35t35 85q0 121-79.5 200.5T640-40ZM380-80q-161 0-230.5-100T80-400q0-75 22.5-159.5t63-155.5Q206-786 261-833t119-47q56 0 105 36t87.5 93.5Q611-693 637-621.5T673-480h-81q-10-60-32-117.5T508.5-700q-29.5-45-63-72.5T380-800q-38 0-77 37t-71 94.5Q200-611 180-540t-20 140q0 81 25 129t60 72.5q35 24.5 72.5 31.5t62.5 7q12 0 27.5-1t32.5-5q-1 20 2 40t11 39q-17 4-35 5.5T380-80Zm0-300Zm320 120Z"/>`,
    /* chef_hat icon */
    `<path d="M360-400h80v-200h-80v200Zm-160-60q-46-23-73-66.5T100-621q0-75 51.5-127T278-800q12 0 24.5 2t24.5 5q25-41 65-64t88-23q48 0 88 23t65 64q12-3 24-5t25-2q75 0 126.5 52T860-621q0 51-27 94.5T760-460v220H200v-220Zm320 60h80v-200h-80v200Zm-240 80h400v-189l44-22q26-13 41-36.5t15-52.5q0-42-28.5-71T682-720q-11 0-20 2t-19 5l-47 13-31-52q-14-23-36.5-35.5T480-800q-26 0-48.5 12.5T395-752l-31 52-48-13q-10-2-19.5-4.5T277-720q-41 0-69 29t-28 71q0 29 15 52.5t41 36.5l44 22v189Zm-80 80h80v80h400v-80h80v160H200v-160Zm280-80Z"/>`,
    /* egg icon */
    `<path d="M640-80q-67 0-101.5-22.5T480-150q-19-20-36.5-35T399-200q-45 0-100-15.5t-103.5-51Q147-302 114-359T80-499q-2-167 82.5-274T399-880q71 0 120 20.5t84.5 51.5q35.5 31 60 68.5T710-667q12 20 24 36.5t26 30.5q60 60 90 105t30 136q0 120-74.5 199.5T640-80Zm0-80q57 0 108.5-56.5T800-359q0-66-19.5-97T704-544q-21-20-37.5-44.5T633-639q-41-65-87-113t-147-48q-129 0-185 92.5T160-500q1 67 29 110t66.5 67.5Q294-298 334-289t65 9q51 0 82 24.5t51 45.5q22 23 42.5 36.5T640-160ZM480-340q58 0 99-41t41-99q0-58-41-99t-99-41q-58 0-99 41t-41 99q0 58 41 99t99 41Zm-1-140Z"/>`,
    /* cookie icon */
    `<path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-75 29-147t81-128.5q52-56.5 125-91T475-881q21 0 43 2t45 7q-9 45 6 85t45 66.5q30 26.5 71.5 36.5t85.5-5q-26 59 7.5 113t99.5 56q1 11 1.5 20.5t.5 20.5q0 82-31.5 154.5t-85.5 127q-54 54.5-127 86T480-80Zm-60-480q25 0 42.5-17.5T480-620q0-25-17.5-42.5T420-680q-25 0-42.5 17.5T360-620q0 25 17.5 42.5T420-560Zm-80 200q25 0 42.5-17.5T400-420q0-25-17.5-42.5T340-480q-25 0-42.5 17.5T280-420q0 25 17.5 42.5T340-360Zm260 40q17 0 28.5-11.5T640-360q0-17-11.5-28.5T600-400q-17 0-28.5 11.5T560-360q0 17 11.5 28.5T600-320ZM480-160q122 0 216.5-84T800-458q-50-22-78.5-60T683-603q-77-11-132-66t-68-132q-80-2-140.5 29t-101 79.5Q201-644 180.5-587T160-480q0 133 93.5 226.5T480-160Zm0-324Z"/>`,
    /* cruelty_free icon */
    `<path d="M380-80q-75 0-127.5-52.5T200-260q0-35 17-64.5t63-75.5q6-6 11.5-12.5T306-430q-51-78-78.5-163.5T200-760q0-58 21-89t59-31q57 0 102 55t68 101q9 20 16.5 40.5T480-641q6-22 13.5-42.5T511-724q22-46 67-101t102-55q38 0 59 31t21 89q0 81-27.5 166.5T654-430q9 11 14.5 17.5T680-400q46 46 63 75.5t17 64.5q0 75-52.5 127.5T580-80q-45 0-72.5-10L480-100l-27.5 10Q425-80 380-80Zm0-80q23 0 46-5.5t43-16.5q-11-5-20-17t-9-21q0-8 11.5-14t28.5-6q17 0 28.5 6t11.5 14q0 9-9 21t-20 17q20 11 43 16.5t46 5.5q42 0 71-29t29-71q0-18-10-35t-30-34q-14-12-23-21t-29-34q-29-35-48-45.5T480-440q-41 0-60.5 10.5T372-384q-20 25-29 34t-23 21q-20 17-30 34t-10 35q0 42 29 71t71 29Zm40-130q-8 0-14-9t-6-21q0-12 6-21t14-9q8 0 14 9t6 21q0 12-6 21t-14 9Zm120 0q-8 0-14-9t-6-21q0-12 6-21t14-9q8 0 14 9t6 21q0 12-6 21t-14 9ZM363-489q11-8 25-14t31-11q-2-48-14.5-95.5T373-696q-19-40-42-67.5T285-799q-2 6-3.5 15.5T280-760q0 68 21.5 138T363-489Zm234 0q40-63 61.5-133T680-760q0-14-1.5-23.5T675-799q-23 8-46 35.5T587-696q-18 39-30.5 86.5T541-514q15 4 29 10.5t27 14.5Z"/>`
  ];

  /* This function places icons randomly inside a given section */
  function addIconPattern(sectionSelector) {
    const section = document.querySelector(sectionSelector);
    if (!section) return; /* exit if section doesn't exist on this page */

    /* Get the section's dimensions */
    const sectionWidth = section.offsetWidth || window.innerWidth;
    const sectionHeight = section.offsetHeight || window.innerHeight;

    const numberOfIcons = 14; /* how many icons to scatter */
    const iconSize = 42; /* size of each icon in pixels */
    const edgeMargin = iconSize * 1.2; /* keep icons away from edges */

    /* Create a wrapper div to hold all the icons */
    const patternWrapper = document.createElement('div');
    patternWrapper.setAttribute('aria-hidden', 'true'); /* hide from screen readers */
    patternWrapper.style.cssText = `
      position: absolute;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
      z-index: 0;
    `;

    /* Track where icons have been placed to avoid overlapping */
    const placedPositions = [];

    for (let i = 0; i < numberOfIcons; i++) {
      /* Cycle through icon types (avocado, chef hat, egg, cookie, leaf) */
      const iconPath = iconPaths[i % iconPaths.length];

      /* Random values for variety */
      const rotation = Math.round(Math.random() * 340);               /* 0–340 degrees */
      const opacity = (0.07 + Math.random() * 0.08).toFixed(2);      /* 0.07–0.15 */
      const scale = (0.7 + Math.random() * 0.6).toFixed(2);       /* 0.7–1.3 */

      /* Find a position that doesn't overlap with existing icons */
      let x, y, attempts = 0, tooClose;
      do {
        x = edgeMargin + Math.random() * (sectionWidth - edgeMargin * 2);
        y = edgeMargin + Math.random() * (sectionHeight - edgeMargin * 2);

        /* Check distance from all previously placed icons */
        tooClose = placedPositions.some(pos =>
          Math.hypot(pos.x - x, pos.y - y) < iconSize * 2.4
        );
        attempts++;
      } while (tooClose && attempts < 30); /* max 30 tries to find a free spot */

      placedPositions.push({ x, y }); /* remember this position */

      /* Create the SVG element for this icon */
      const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      iconSvg.setAttribute('viewBox', '0 -960 960 960'); /* Google Icons viewBox */
      iconSvg.setAttribute('fill', '#faf8f2');           /* light cream colour */
      iconSvg.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${iconSize}px;
        height: ${iconSize}px;
        opacity: ${opacity};
        transform: translate(-50%, -50%) rotate(${rotation}deg) scale(${scale});
      `;
      iconSvg.innerHTML = iconPath;
      patternWrapper.appendChild(iconSvg);
    }

    /* Insert the pattern behind all other content in the section */
    section.style.position = 'relative';
    section.insertBefore(patternWrapper, section.firstChild);
  }

  /* Apply the pattern to both dark sections */
  addIconPattern('.philosophy-section');
  addIconPattern('.blog-section');


  /* -----------------------------------------------------------
     5. HIGHLIGHT CURRENT PAGE IN NAV
     Compares the current page filename with each nav link's href
     and adds "current-page" to the matching link.
  ----------------------------------------------------------- */
  const currentPageFile = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-menu a').forEach(link => {
    const linkFile = link.getAttribute('href').split('/').pop();
    if (linkFile === currentPageFile) {
      link.classList.add('current-page');
    } else {
      link.classList.remove('current-page');
    }
  });


}); /* end DOMContentLoaded */
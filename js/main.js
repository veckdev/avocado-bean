/* =============================================================
   AVOCADO BEAN — main.js
   Single JavaScript file for the entire site.
   Sections:
   1. Nav shrinking on scroll
   2. Scroll dot indicators (homepage only)
   3. Reveal animations — works on all pages
   4. Icon pattern on dark sections (homepage only)
   5. Highlight current page in nav
   6. Recipe data — ingredients and steps for each dish
   7. Recipe filter — show/hide cards by category
   8. Recipe modal — open, fill with content, and close
   ============================================================= */


document.addEventListener('DOMContentLoaded', () => {


  /* -----------------------------------------------------------
     1. NAV — SHRINK ON SCROLL
     Adds "is-scrolled" class to nav when user scrolls down.
  ----------------------------------------------------------- */
  const nav = document.getElementById('main-nav');

  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
      }
    }, { passive: true });
  }



  /* -----------------------------------------------------------
     2. HAMBURGER MENU — mobile navigation toggle
     Toggles the nav menu open/closed on mobile.
  ----------------------------------------------------------- */
  const hamburger = document.getElementById('nav-hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      hamburger.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    /* Close menu when a link is clicked */
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', false);
      });
    });
  }



  /* -----------------------------------------------------------
     3. REVEAL ANIMATIONS — FADE + SLIDE UP ON ENTER
     Works on all pages. Watches the normal viewport (window).
  ----------------------------------------------------------- */
  const elementsToReveal = document.querySelectorAll('.reveal');

  if (elementsToReveal.length > 0) {

    /* If user prefers reduced motion, skip animation entirely */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elementsToReveal.forEach(el => el.classList.add('is-visible'));
    } else {

      /* Cards get dynamic stagger delay based on column position */
      const cardSelectors = '.recipe-card, .recipe-card, .ingredient-card, .value-card, .supplier-card';
      const cards = document.querySelectorAll(cardSelectors);
      cards.forEach(card => card.dataset.isCard = 'true');

      /* Observer for regular (non-card) elements */
      const revealWatcher = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealWatcher.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        threshold: 0,
        rootMargin: '0px 0px -60px 0px'
      });

      /* Observer for cards — stagger by column index */
      const cardWatcher = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const card = entry.target;
            const allCards = Array.from(document.querySelectorAll(cardSelectors));
            const visibleInRow = allCards.filter(c => {
              const r = c.getBoundingClientRect();
              const cardR = card.getBoundingClientRect();
              return Math.abs(r.top - cardR.top) < 40;
            });
            const colIndex = visibleInRow.indexOf(card);
            card.style.transitionDelay = colIndex * 0.08 + 's';
            card.classList.add('is-visible');
            cardWatcher.unobserve(card);
          }
        });
      }, {
        root: null,
        threshold: 0,
        rootMargin: '0px 0px -40px 0px'
      });

      elementsToReveal.forEach(el => {
        if (el.dataset.isCard === 'true') {
          cardWatcher.observe(el);
        } else {
          revealWatcher.observe(el);
        }
      });
    }
  }


  /* -----------------------------------------------------------
     4. ICON PATTERN — SCATTER ICONS ON DARK SECTIONS
     Only runs on pages that have .philosophy-section or .blog-section.
  ----------------------------------------------------------- */
  const iconPaths = [
    /* avocado_bean */
    `<path d="M380-220q66 0 113-46.5T540-380q0-66-47-113t-113-47q-67 0-113.5 47T220-380q0 67 46.5 113.5T380-220Zm0-80q-33 0-56.5-23.5T300-380q0-33 23.5-56.5T380-460q33 0 56.5 23.5T460-380q0 33-23.5 56.5T380-300Zm260 180q88 0 144-56t56-144q0-17-11.5-28.5T800-360q-17 0-28.5 11.5T760-320q0 48-36.5 84T640-200q-17 0-28.5 11.5T600-160q0 17 11.5 28.5T640-120Zm0 80q-51 0-85.5-34.5T520-160q0-50 34.5-85t85.5-35q14 0 27-13t13-27q0-50 34.5-85t85.5-35q50 0 85 35t35 85q0 121-79.5 200.5T640-40ZM380-80q-161 0-230.5-100T80-400q0-75 22.5-159.5t63-155.5Q206-786 261-833t119-47q56 0 105 36t87.5 93.5Q611-693 637-621.5T673-480h-81q-10-60-32-117.5T508.5-700q-29.5-45-63-72.5T380-800q-38 0-77 37t-71 94.5Q200-611 180-540t-20 140q0 81 25 129t60 72.5q35 24.5 72.5 31.5t62.5 7q12 0 27.5-1t32.5-5q-1 20 2 40t11 39q-17 4-35 5.5T380-80Zm0-300Zm320 120Z"/>`,
    /* chef_hat */
    `<path d="M360-400h80v-200h-80v200Zm-160-60q-46-23-73-66.5T100-621q0-75 51.5-127T278-800q12 0 24.5 2t24.5 5q25-41 65-64t88-23q48 0 88 23t65 64q12-3 24-5t25-2q75 0 126.5 52T860-621q0 51-27 94.5T760-460v220H200v-220Zm320 60h80v-200h-80v200Zm-240 80h400v-189l44-22q26-13 41-36.5t15-52.5q0-42-28.5-71T682-720q-11 0-20 2t-19 5l-47 13-31-52q-14-23-36.5-35.5T480-800q-26 0-48.5 12.5T395-752l-31 52-48-13q-10-2-19.5-4.5T277-720q-41 0-69 29t-28 71q0 29 15 52.5t41 36.5l44 22v189Zm-80 80h80v80h400v-80h80v160H200v-160Zm280-80Z"/>`,
    /* egg */
    `<path d="M640-80q-67 0-101.5-22.5T480-150q-19-20-36.5-35T399-200q-45 0-100-15.5t-103.5-51Q147-302 114-359T80-499q-2-167 82.5-274T399-880q71 0 120 20.5t84.5 51.5q35.5 31 60 68.5T710-667q12 20 24 36.5t26 30.5q60 60 90 105t30 136q0 120-74.5 199.5T640-80Zm0-80q57 0 108.5-56.5T800-359q0-66-19.5-97T704-544q-21-20-37.5-44.5T633-639q-41-65-87-113t-147-48q-129 0-185 92.5T160-500q1 67 29 110t66.5 67.5Q294-298 334-289t65 9q51 0 82 24.5t51 45.5q22 23 42.5 36.5T640-160ZM480-340q58 0 99-41t41-99q0-58-41-99t-99-41q-58 0-99 41t-41 99q0 58 41 99t99 41Zm-1-140Z"/>`,
    /* cookie */
    `<path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-75 29-147t81-128.5q52-56.5 125-91T475-881q21 0 43 2t45 7q-9 45 6 85t45 66.5q30 26.5 71.5 36.5t85.5-5q-26 59 7.5 113t99.5 56q1 11 1.5 20.5t.5 20.5q0 82-31.5 154.5t-85.5 127q-54 54.5-127 86T480-80Zm-60-480q25 0 42.5-17.5T480-620q0-25-17.5-42.5T420-680q-25 0-42.5 17.5T360-620q0 25 17.5 42.5T420-560Zm-80 200q25 0 42.5-17.5T400-420q0-25-17.5-42.5T340-480q-25 0-42.5 17.5T280-420q0 25 17.5 42.5T340-360Zm260 40q17 0 28.5-11.5T640-360q0-17-11.5-28.5T600-400q-17 0-28.5 11.5T560-360q0 17 11.5 28.5T600-320ZM480-160q122 0 216.5-84T800-458q-50-22-78.5-60T683-603q-77-11-132-66t-68-132q-80-2-140.5 29t-101 79.5Q201-644 180.5-587T160-480q0 133 93.5 226.5T480-160Zm0-324Z"/>`,
    /* cruelty_free */
    `<path d="M380-80q-75 0-127.5-52.5T200-260q0-35 17-64.5t63-75.5q6-6 11.5-12.5T306-430q-51-78-78.5-163.5T200-760q0-58 21-89t59-31q57 0 102 55t68 101q9 20 16.5 40.5T480-641q6-22 13.5-42.5T511-724q22-46 67-101t102-55q38 0 59 31t21 89q0 81-27.5 166.5T654-430q9 11 14.5 17.5T680-400q46 46 63 75.5t17 64.5q0 75-52.5 127.5T580-80q-45 0-72.5-10L480-100l-27.5 10Q425-80 380-80Zm0-80q23 0 46-5.5t43-16.5q-11-5-20-17t-9-21q0-8 11.5-14t28.5-6q17 0 28.5 6t11.5 14q0 9-9 21t-20 17q20 11 43 16.5t46 5.5q42 0 71-29t29-71q0-18-10-35t-30-34q-14-12-23-21t-29-34q-29-35-48-45.5T480-440q-41 0-60.5 10.5T372-384q-20 25-29 34t-23 21q-20 17-30 34t-10 35q0 42 29 71t71 29Zm40-130q-8 0-14-9t-6-21q0-12 6-21t14-9q8 0 14 9t6 21q0 12-6 21t-14 9Zm120 0q-8 0-14-9t-6-21q0-12 6-21t14-9q8 0 14 9t6 21q0 12-6 21t-14 9ZM363-489q11-8 25-14t31-11q-2-48-14.5-95.5T373-696q-19-40-42-67.5T285-799q-2 6-3.5 15.5T280-760q0 68 21.5 138T363-489Zm234 0q40-63 61.5-133T680-760q0-14-1.5-23.5T675-799q-23 8-46 35.5T587-696q-18 39-30.5 86.5T541-514q15 4 29 10.5t27 14.5Z"/>`
  ];

  function addIconPattern(sectionSelector) {
    const section = document.querySelector(sectionSelector);
    if (!section) return;

    const sectionWidth = section.offsetWidth || window.innerWidth;
    const sectionHeight = section.offsetHeight || window.innerHeight;
    const numberOfIcons = 14;
    const iconSize = 42;
    const edgeMargin = iconSize * 1.2;

    const patternWrapper = document.createElement('div');
    patternWrapper.setAttribute('aria-hidden', 'true');
    patternWrapper.style.cssText = `
      position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0;
    `;

    const placedPositions = [];

    for (let i = 0; i < numberOfIcons; i++) {
      const iconPath = iconPaths[i % iconPaths.length];
      const rotation = Math.round(Math.random() * 340);
      const opacity = (0.07 + Math.random() * 0.08).toFixed(2);
      const scale = (0.7 + Math.random() * 0.6).toFixed(2);

      const centerX = sectionWidth / 2;
      const centerY = sectionHeight / 2;
      const exclusionW = sectionWidth * 0.45;
      const exclusionH = sectionHeight * 0.55;

      let x, y, attempts = 0, tooClose, inCenter;
      do {
        x = edgeMargin + Math.random() * (sectionWidth - edgeMargin * 2);
        y = edgeMargin + Math.random() * (sectionHeight - edgeMargin * 2);
        tooClose = placedPositions.some(pos =>
          Math.hypot(pos.x - x, pos.y - y) < iconSize * 2.4
        );
        inCenter = Math.abs(x - centerX) < exclusionW / 2 &&
          Math.abs(y - centerY) < exclusionH / 2;
        attempts++;
      } while ((tooClose || inCenter) && attempts < 40);

      placedPositions.push({ x, y });

      const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      iconSvg.setAttribute('viewBox', '0 -960 960 960');
      iconSvg.setAttribute('fill', '#faf8f2');
      iconSvg.style.cssText = `
        position:absolute;left:${x}px;top:${y}px;
        width:${iconSize}px;height:${iconSize}px;
        opacity:${opacity};
        transform:translate(-50%,-50%) rotate(${rotation}deg) scale(${scale});
      `;
      iconSvg.innerHTML = iconPath;
      patternWrapper.appendChild(iconSvg);
    }

    section.style.position = 'relative';
    section.insertBefore(patternWrapper, section.firstChild);
  }

  addIconPattern('.philosophy-section');
  addIconPattern('.ingredients-preview-section');
  addIconPattern('.about-cta-section');
  addIconPattern('.story-section');
  addIconPattern('.suppliers-section');
  addIconPattern('.ingredients-cta-section');


  /* -----------------------------------------------------------
     5. HIGHLIGHT CURRENT PAGE IN NAV
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


  /* -----------------------------------------------------------
     6. RECIPE DATA
     All recipe content in one place. To add a new recipe,
     add a new entry to this object following the same structure.
     Only used on the recipes page — no effect on other pages.
  ----------------------------------------------------------- */
  const recipeData = {

    'chickpea-curry': {
      title: 'Chickpea Curry Bowl',
      category: 'Bowls',
      pillClass: 'green-pill',
      time: '35 min',
      serves: '2',
      difficulty: 'Easy',
      photo: '../images/dishes/img-chickpea-curry.webp',
      photoAlt: 'Chickpea curry bowl with coconut sauce and fresh lime',
      description: 'Golden chickpeas in a rich tomato curry sauce, served with steamed jasmine rice, crispy falafel bites, fresh cucumber, cherry tomatoes, pickled red onion, coriander & lime.',
      preview: ['Chickpeas', 'Coconut milk', 'Jasmine rice', 'Coriander'],
      allergens: ['Gluten-free', 'Soy-free', 'Nut-free'],
      ingredients: [
        '400g tin of chickpeas, drained and rinsed',
        '400ml tin of coconut milk',
        '400g tin of chopped tomatoes',
        '1 medium cauliflower, cut into small florets',
        '200g jasmine rice',
        '1 red onion, thinly sliced',
        '1 lime, cut into wedges',
        'Fresh coriander, a large handful',
        '2 tbsp curry powder',
        '1 tsp turmeric',
        '1 tsp cumin seeds',
        '2 cloves of garlic, minced',
        '1 thumb-sized piece of fresh ginger, grated',
        'Salt and black pepper to taste',
        '2 tbsp olive oil'
      ],
      steps: [
        'Cook the jasmine rice according to packet instructions. Once cooked, set aside and keep warm.',
        'Heat olive oil in a large pan over medium heat. Add cumin seeds and cook for 30 seconds until fragrant.',
        'Add the minced garlic and grated ginger. Cook for 1 minute, stirring constantly so it does not burn.',
        'Add the curry powder and turmeric. Stir well and cook for another minute to toast the spices.',
        'Add the chopped tomatoes and coconut milk. Stir to combine, then bring to a gentle simmer.',
        'Add the drained chickpeas and cauliflower florets. Cook for 20 minutes until the cauliflower is tender and the sauce has thickened.',
        'Season with salt and pepper. Taste and adjust spices as needed.',
        'To serve, place a mound of rice in the centre of the bowl and ladle the curry around it. Top with fresh coriander, sliced red onion and a wedge of lime.'
      ]
    },

    'tofu-katsu': {
      title: 'Tofu Katsu Bowl',
      category: 'Bowls',
      pillClass: 'dark-pill',
      time: '40 min',
      serves: '2',
      difficulty: 'Medium',
      photo: '../images/dishes/img-tofu-katsu.webp',
      photoAlt: 'Tofu katsu bowl with crispy tofu and katsu curry sauce',
      description: 'Crispy panko-breaded tofu cutlet served over jasmine rice with a silky katsu curry sauce, fresh red chilli and coriander.',
      preview: ['Firm tofu', 'Panko breadcrumbs', 'Jasmine rice', 'Katsu sauce'],
      allergens: ['Contains soy', 'Contains gluten'],
      ingredients: [
        '400g firm tofu, pressed and cut into thick slices',
        '100g panko breadcrumbs',
        '3 tbsp plain flour',
        '3 tbsp soy sauce (for marinade)',
        '200g jasmine rice',
        '2 medium carrots, diced',
        '1 medium onion, diced',
        '2 cloves of garlic, minced',
        '1 tbsp mild curry powder',
        '1 tbsp plain flour (for sauce)',
        '400ml vegetable stock',
        '1 tbsp soy sauce (for sauce)',
        '1 tsp maple syrup',
        'Fresh red chilli, sliced',
        'Fresh coriander to serve',
        '3 tbsp vegetable oil for frying'
      ],
      steps: [
        'Press the tofu for at least 15 minutes to remove excess water. Cut into thick rectangular slices about 1cm thick.',
        'Marinate the tofu slices in soy sauce for 10 minutes.',
        'Set up a breading station: flour on one plate, panko breadcrumbs on another. Coat each tofu slice in flour, then press firmly into the panko so it is fully coated.',
        'For the katsu sauce: fry the diced onion and carrot in 1 tbsp oil for 8 minutes until soft. Add the garlic and curry powder and cook for 1 minute. Add the flour and stir well. Gradually pour in the vegetable stock, stirring constantly. Add soy sauce and maple syrup. Simmer for 10 minutes, then blend until smooth.',
        'Cook the jasmine rice according to packet instructions.',
        'Heat 2 tbsp oil in a frying pan over medium-high heat. Fry the breaded tofu for 3–4 minutes each side until deep golden and crispy.',
        'To serve, place rice in the bowl, slice the tofu cutlet and lay it over the rice. Pour the katsu sauce alongside. Top with sliced red chilli and fresh coriander.'
      ]
    },

    'cauliflower-curry': {
      title: 'Cauliflower & Chickpea Curry',
      category: 'Bowls',
      pillClass: 'yellow-pill',
      time: '40 min',
      serves: '2',
      difficulty: 'Easy',
      photo: '../images/dishes/img-cauliflower-curry.webp',
      photoAlt: 'Cauliflower and chickpea coconut curry with jasmine rice and lime',
      description: 'Golden cauliflower florets and chickpeas simmered in a rich coconut curry broth, served with steamed jasmine rice, fresh coriander, red chilli flakes and a wedge of lime.',
      preview: ['Cauliflower', 'Chickpeas', 'Coconut milk', 'Jasmine rice'],
      allergens: ['Gluten-free', 'Soy-free', 'Nut-free'],
      ingredients: [
        '1 medium cauliflower, cut into florets',
        '400g tin of chickpeas, drained and rinsed',
        '400ml tin of coconut milk',
        '400g tin of chopped tomatoes',
        '200g jasmine rice',
        '1 medium onion, finely diced',
        '3 cloves of garlic, minced',
        '1 thumb-sized piece of ginger, grated',
        '2 tbsp red curry paste',
        '1 tsp turmeric',
        '1 tsp ground coriander',
        '1 lime, cut into wedges',
        'Fresh coriander, a large handful',
        'Dried chilli flakes to taste',
        '2 tbsp coconut oil',
        'Salt to taste'
      ],
      steps: [
        'Cook the jasmine rice according to packet instructions. Set aside and keep warm.',
        'Heat coconut oil in a large deep pan over medium heat. Add the diced onion and cook for 7–8 minutes until soft and golden.',
        'Add the garlic and ginger. Cook for 1 minute, stirring constantly.',
        'Add the red curry paste, turmeric and ground coriander. Stir well and cook for 1–2 minutes to release the flavours.',
        'Pour in the chopped tomatoes and coconut milk. Stir to combine and bring to a simmer.',
        'Add the cauliflower florets and chickpeas. Simmer for 20–25 minutes until the cauliflower is tender and the sauce has thickened.',
        'Season with salt and taste. Add chilli flakes for extra heat if desired.',
        'Serve over jasmine rice, topped with fresh coriander, a pinch of chilli flakes and a wedge of lime.'
      ]
    },

    'spiced-lentil-soup': {
      title: 'Spiced Lentil Soup',
      category: 'Soups',
      pillClass: 'blue-pill',
      time: '45 min',
      serves: '4',
      difficulty: 'Easy',
      photo: '../images/dishes/img-lentil-soup.webp',
      photoAlt: 'Spiced lentil soup with chilli, coriander and lime in rustic bowls',
      description: 'Hearty green lentils slow-simmered with carrots, tomatoes and warming spices, finished with fresh red chilli, coriander and a generous squeeze of lime.',
      preview: ['Green lentils', 'Carrots', 'Tomatoes', 'Coriander'],
      allergens: ['Gluten-free', 'Soy-free', 'Nut-free'],
      ingredients: [
        '300g green or brown lentils, rinsed',
        '2 medium carrots, diced',
        '2 celery stalks, diced',
        '1 large onion, diced',
        '3 cloves of garlic, minced',
        '400g tin of chopped tomatoes',
        '1.2 litres vegetable stock',
        '2 fresh red chillies, sliced (plus more to serve)',
        '2 tsp ground cumin',
        '1 tsp smoked paprika',
        '1 tsp ground coriander',
        '½ tsp turmeric',
        '2 limes — juice of 1, 1 cut into wedges',
        'Fresh coriander, a large handful',
        '2 tbsp olive oil',
        'Salt and black pepper to taste'
      ],
      steps: [
        'Heat olive oil in a large pot over medium heat. Add the onion, carrots and celery. Cook for 10 minutes until softened.',
        'Add the garlic and chilli. Cook for 1 minute.',
        'Add the cumin, paprika, ground coriander and turmeric. Stir well and cook for 1 minute to toast the spices.',
        'Add the chopped tomatoes and stir to combine. Cook for 2 minutes.',
        'Add the rinsed lentils and pour in the vegetable stock. Bring to the boil, then reduce to a gentle simmer.',
        'Cook for 25–30 minutes until the lentils are completely soft and the soup has thickened. Stir occasionally.',
        'Squeeze in the juice of one lime. Season with salt and pepper. Taste and adjust spices.',
        'Ladle into bowls and top with fresh coriander, sliced red chilli and a wedge of lime.'
      ]
    },

    'scramble-on-toast': {
      title: 'Scramble on Toast',
      category: 'Toasts',
      pillClass: 'orange-pill',
      time: '15 min',
      serves: '2',
      difficulty: 'Easy',
      photo: '../images/dishes/img-scramble-toast.webp',
      photoAlt: 'Turmeric tofu scramble piled on thick sourdough toast with rocket and tomatoes',
      description: 'Creamy turmeric tofu scramble loaded on thick-cut sourdough toast, topped with sliced red chilli and served alongside fresh rocket, cherry tomatoes and half an avocado.',
      preview: ['Firm tofu', 'Sourdough', 'Avocado', 'Cherry tomatoes'],
      allergens: ['Contains gluten', 'Soy-free', 'Nut-free'],
      ingredients: [
        '400g firm tofu, crumbled by hand',
        '4 thick slices of sourdough bread',
        '1 ripe avocado, halved',
        '100g cherry tomatoes, halved',
        'A handful of fresh rocket',
        '2 tbsp nutritional yeast',
        '1 tsp turmeric powder',
        '½ tsp garlic powder',
        '½ tsp smoked paprika',
        '1 tbsp soy sauce',
        '2 tbsp olive oil',
        '2 fresh red chillies, thinly sliced',
        'Salt and black pepper to taste'
      ],
      steps: [
        'Crumble the tofu into a bowl, leaving some larger chunks for texture.',
        'Mix the nutritional yeast, turmeric, garlic powder, smoked paprika and soy sauce in a small bowl to form a paste.',
        'Heat olive oil in a non-stick pan over medium-high heat. Add the tofu and press it flat into the pan. Cook for 2–3 minutes without stirring to get some golden colour on the bottom.',
        'Stir in the seasoning paste and fold through the tofu. Cook for another 3–4 minutes until golden and fragrant.',
        'While the tofu cooks, toast the sourdough slices until deep golden and crisp.',
        'Season the scramble generously with salt and pepper.',
        'Pile the scramble high on the toast. Top with sliced red chilli. Serve with fresh rocket, cherry tomatoes and the halved avocado on the side.'
      ]
    },

    'scramble-pickles': {
      title: 'Scramble with Pickles',
      category: 'Toasts',
      pillClass: 'orange-pill',
      time: '15 min',
      serves: '2',
      difficulty: 'Easy',
      photo: '../images/dishes/img-scramble-pickles.webp',
      photoAlt: 'Turmeric tofu scramble on sourdough toast with cornichons and fresh coriander',
      description: 'Golden turmeric scramble piled on thick sourdough toast, topped with fresh red chilli, coriander and tangy cornichons for a bold, punchy brunch.',
      preview: ['Firm tofu', 'Sourdough', 'Cornichons', 'Coriander'],
      allergens: ['Contains gluten', 'Soy-free', 'Nut-free'],
      ingredients: [
        '400g firm tofu, crumbled by hand',
        '4 thick slices of sourdough bread',
        '8–10 cornichons (small gherkins)',
        'Fresh coriander, a large handful',
        '2 fresh red chillies, thinly sliced',
        '2 tbsp nutritional yeast',
        '1 tsp turmeric powder',
        '1 tsp smoked paprika',
        '½ tsp garlic powder',
        '1 tbsp soy sauce',
        '2 tbsp olive oil',
        'Salt and black pepper to taste'
      ],
      steps: [
        'Crumble the tofu into a bowl, keeping some chunks for texture.',
        'Mix the nutritional yeast, turmeric, smoked paprika, garlic powder and soy sauce in a small bowl.',
        'Heat olive oil in a non-stick pan over medium-high heat. Add the tofu and let it sit for 2–3 minutes to develop a golden crust on the bottom.',
        'Add the seasoning paste and stir well to coat all the tofu. Cook for another 3–4 minutes, stirring occasionally.',
        'Toast the sourdough until deep golden and very crispy.',
        'Season the scramble with salt and pepper.',
        'Pile the scramble generously on the toast. Top with sliced red chilli, fresh coriander and cornichons. Serve immediately.'
      ]
    },

    'spinach-berry-salad': {
      title: 'Spinach & Berry Salad',
      category: 'Salads',
      pillClass: 'green-pill',
      time: '10 min',
      serves: '2',
      difficulty: 'Easy',
      photo: '../images/dishes/img-spinach-berry-salad.webp',
      photoAlt: 'Spinach salad with raspberries, blueberries, pear slices and pecans',
      description: 'Fresh baby spinach tossed with raspberries, blueberries, sliced pear, toasted pecans and vegan feta, dressed with a light lemon vinaigrette.',
      preview: ['Baby spinach', 'Raspberries', 'Blueberries', 'Pecans'],
      allergens: ['Contains nuts', 'Gluten-free', 'Soy-free'],
      ingredients: [
        '150g fresh baby spinach',
        '100g fresh raspberries',
        '100g fresh blueberries',
        '1 ripe pear, thinly sliced',
        '50g pecans, lightly toasted',
        '60g vegan feta, crumbled',
        '3 tbsp olive oil',
        '2 tbsp lemon juice',
        '1 tsp maple syrup',
        '1 tsp Dijon mustard',
        'Salt and black pepper to taste'
      ],
      steps: [
        'Make the dressing: whisk together the olive oil, lemon juice, maple syrup and Dijon mustard. Season with salt and pepper.',
        'Toast the pecans in a dry pan over medium heat for 3–4 minutes until fragrant. Set aside to cool.',
        'Place the baby spinach in a large bowl.',
        'Add the raspberries, blueberries and pear slices.',
        'Scatter over the toasted pecans and crumbled vegan feta.',
        'Drizzle with the dressing just before serving and toss gently to combine.'
      ]
    },

    'kale-avocado-salad': {
      title: 'Kale & Avocado Salad',
      category: 'Salads',
      pillClass: 'green-pill',
      time: '15 min',
      serves: '2',
      difficulty: 'Easy',
      photo: '../images/dishes/img-kale-avocado-salad.webp',
      photoAlt: 'Kale salad with avocado, melon, cherry tomatoes and sesame seeds',
      description: 'Massaged kale with ripe avocado, sweet melon chunks, cherry tomatoes, toasted pecans, fresh mint and a drizzle of sesame-lime dressing.',
      preview: ['Kale', 'Avocado', 'Melon', 'Sesame'],
      allergens: ['Contains sesame', 'Gluten-free', 'Soy-free'],
      ingredients: [
        '200g curly kale, stems removed and roughly chopped',
        '1 ripe avocado, halved',
        '200g melon (cantaloupe or honeydew), cut into chunks',
        '100g cherry tomatoes, halved',
        '40g pecans, roughly chopped',
        'Fresh mint leaves, a large handful',
        '2 tbsp sesame seeds',
        '3 tbsp olive oil',
        '2 tbsp lime juice',
        '1 tbsp soy sauce',
        '1 tsp maple syrup',
        'Salt and pepper to taste'
      ],
      steps: [
        'Place the kale in a large bowl. Drizzle with 1 tbsp olive oil and a pinch of salt. Massage firmly with your hands for 2–3 minutes until the kale softens and darkens in colour.',
        'Make the dressing: whisk together the remaining olive oil, lime juice, soy sauce and maple syrup.',
        'Toast the sesame seeds in a dry pan for 1–2 minutes until golden. Set aside.',
        'Add the melon, cherry tomatoes and pecans to the kale.',
        'Pour over the dressing and toss well to coat everything.',
        'Top with the halved avocado, fresh mint and toasted sesame seeds. Serve immediately.'
      ]
    },

    'cucumber-radish-toast': {
      title: 'Cucumber & Radish Toast',
      category: 'Toasts',
      pillClass: 'blue-pill',
      time: '10 min',
      serves: '1',
      difficulty: 'Easy',
      photo: '../images/dishes/img-cucumber-radish-toast.webp',
      photoAlt: 'Open sandwich with vegan cream cheese, cucumber and radish slices on rye bread',
      description: 'Crisp rye bread spread generously with vegan cream cheese, topped with overlapping slices of fresh cucumber and radish, finished with black pepper and a drizzle of olive oil.',
      preview: ['Rye bread', 'Vegan cream cheese', 'Cucumber', 'Radish'],
      allergens: ['Contains gluten', 'Soy-free', 'Nut-free'],
      ingredients: [
        '2 thick slices of dark rye bread',
        '4 tbsp vegan cream cheese',
        '1 small cucumber, thinly sliced',
        '6 radishes, thinly sliced',
        '1 tbsp olive oil',
        'Fresh black pepper',
        'Flaky sea salt',
        'Fresh dill to serve (optional)'
      ],
      steps: [
        'Toast the rye bread lightly if desired.',
        'Spread a generous layer of vegan cream cheese over each slice.',
        'Arrange the cucumber slices overlapping across the toast.',
        'Add the radish slices on top.',
        'Finish with a drizzle of olive oil, a pinch of flaky salt and plenty of black pepper.',
        'Garnish with fresh dill if using. Serve immediately.'
      ]
    },

    'peanut-butter-jam-toast': {
      title: 'Peanut Butter & Jam Toast',
      category: 'Toasts',
      pillClass: 'yellow-pill',
      time: '5 min',
      serves: '1',
      difficulty: 'Easy',
      photo: '../images/dishes/img-peanut-butter-jam-toast.webp',
      photoAlt: 'Thick toast with peanut butter and berry jam on a rustic plate',
      description: 'Thick-cut white bread toasted until golden, spread with natural peanut butter and topped with a generous spoonful of homemade berry jam. Simple, satisfying and entirely plant-based.',
      preview: ['White bread', 'Peanut butter', 'Berry jam', 'Sea salt'],
      allergens: ['Contains gluten', 'Contains peanuts', 'Soy-free'],
      ingredients: [
        '2 thick slices of white bread',
        '4 tbsp natural peanut butter (no added sugar)',
        '3 tbsp berry jam (raspberry or blackberry)',
        'A pinch of flaky sea salt'
      ],
      steps: [
        'Toast the bread until deep golden and crispy on both sides.',
        'Spread peanut butter generously over each slice while still warm.',
        'Spoon the berry jam on top and spread lightly, leaving some texture.',
        'Finish with a pinch of flaky sea salt to balance the sweetness.',
        'Serve immediately.'
      ]
    },

    'peanut-butter-rice-cakes': {
      title: 'Peanut Butter Rice Cakes',
      category: 'Snacks',
      pillClass: 'yellow-pill',
      time: '5 min',
      serves: '1',
      difficulty: 'Easy',
      photo: '../images/dishes/img-peanut-butter-rice-cakes.webp',
      photoAlt: 'Rice cakes with peanut butter, blueberries and honey on a pink plate',
      description: 'Light rice cakes topped with smooth peanut butter, fresh blueberries and a drizzle of maple syrup — a quick, protein-rich snack ready in minutes.',
      preview: ['Rice cakes', 'Peanut butter', 'Blueberries', 'Maple syrup'],
      allergens: ['Contains peanuts', 'Gluten-free', 'Soy-free'],
      ingredients: [
        '2 plain rice cakes',
        '3 tbsp natural peanut butter',
        '80g fresh blueberries',
        '1 tbsp maple syrup',
        'A pinch of sea salt (optional)'
      ],
      steps: [
        'Spread peanut butter evenly over each rice cake.',
        'Top generously with fresh blueberries.',
        'Drizzle with maple syrup.',
        'Finish with a pinch of sea salt if using. Serve immediately.'
      ]
    },

    'granola-bars': {
      title: 'Fruit & Oat Granola Bars',
      category: 'Snacks',
      pillClass: 'yellow-pill',
      time: '35 min',
      serves: '8',
      difficulty: 'Easy',
      photo: '../images/dishes/img-granola-bars.webp',
      photoAlt: 'Homemade fruit and oat granola bars on baking paper with a cooling rack',
      description: 'Chewy homemade granola bars packed with rolled oats, dried cranberries, sultanas and a hint of berry jam — naturally sweetened and perfect for on-the-go.',
      preview: ['Rolled oats', 'Cranberries', 'Sultanas', 'Berry jam'],
      allergens: ['Contains gluten', 'Contains oats', 'Nut-free'],
      ingredients: [
        '200g rolled oats',
        '50g puffed rice',
        '80g dried cranberries',
        '60g sultanas',
        '3 tbsp berry jam',
        '4 tbsp maple syrup',
        '3 tbsp coconut oil, melted',
        '1 tsp vanilla extract',
        'A pinch of salt'
      ],
      steps: [
        'Preheat the oven to 180°C. Line a 20x20cm baking tin with baking paper.',
        'Mix the oats, puffed rice, cranberries and sultanas in a large bowl.',
        'In a small saucepan, gently warm the maple syrup, coconut oil, berry jam and vanilla together until combined. Do not boil.',
        'Pour the wet mixture over the dry ingredients and stir well until everything is fully coated.',
        'Press the mixture firmly into the lined tin, using the back of a spoon to pack it as tightly as possible.',
        'Bake for 20–22 minutes until the edges are golden.',
        'Leave to cool completely in the tin before cutting into bars — they firm up as they cool.',
        'Store in an airtight container for up to 5 days.'
      ]
    }

  };


  /* -----------------------------------------------------------
     7. RECIPE FILTER — show/hide cards by category
     Only runs if filter buttons exist on the page.
  ----------------------------------------------------------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const recipeCards = document.querySelectorAll('.recipe-card');

  /* Search bar filtering */
  const searchInput = document.getElementById('recipe-search');

  function applyFilters() {
    const activeFilter = document.querySelector('.filter-btn.is-active')?.dataset.filter || 'all';
    const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';

    recipeCards.forEach(card => {
      const matchesCategory = activeFilter === 'all' || card.dataset.category === activeFilter;
      const cardTitle = card.querySelector('.recipe-card-title')?.textContent.toLowerCase() || '';
      const cardDesc = card.querySelector('.recipe-card-description')?.textContent.toLowerCase() || '';
      const matchesSearch = !searchQuery || cardTitle.includes(searchQuery) || cardDesc.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.classList.remove('is-hidden');
      } else {
        card.classList.add('is-hidden');
      }
    });
  }

  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('is-active'));
        button.classList.add('is-active');
        applyFilters();
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }


  /* -----------------------------------------------------------
     8. RECIPE MODAL — open, fill content, close
     Only runs if the modal element exists on the page.
  ----------------------------------------------------------- */
  const modal = document.getElementById('recipe-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');
  const modalContent = document.getElementById('modal-content');

  if (modal) {

    function buildModalContent(recipeKey) {
      const recipe = recipeData[recipeKey];
      if (!recipe) return;

      const ingredientsHTML = recipe.ingredients
        .map(item => `<li>${item}</li>`)
        .join('');

      const stepsHTML = recipe.steps
        .map((step, index) => `
          <li>
            <span class="step-number">${String(index + 1).padStart(2, '0')}</span>
            <span>${step}</span>
          </li>
        `)
        .join('');

      const allergensHTML = recipe.allergens
        .map(tag => `<span class="allergen-tag">${tag}</span>`)
        .join('');

      modalContent.innerHTML = `
        <img class="modal-photo" src="${recipe.photo}" alt="${recipe.photoAlt}">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-meta">
              <span class="category-pill ${recipe.pillClass}">${recipe.category}</span>
              <span class="modal-stat">${recipe.time}</span>
              <span class="modal-stat">Serves ${recipe.serves}</span>
              <span class="difficulty-${recipe.difficulty.toLowerCase()}">${recipe.difficulty}</span>
            </div>
            <h2 class="modal-title">${recipe.title}</h2>
            <p class="modal-description">${recipe.description}</p>
            <div class="modal-allergens">${allergensHTML}</div>
            <h3 class="modal-section-title">Ingredients</h3>
            <ul class="ingredients-list">${ingredientsHTML}</ul>
            <h3 class="modal-section-title">How to make it</h3>
            <ol class="steps-list">${stepsHTML}</ol>
            <a href="contact.html" class="modal-cta">Order ingredients</a>
          </div>
        </div>
      `;
    }

    function openModal(recipeKey) {
      buildModalContent(recipeKey);
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.add('is-closing');
      setTimeout(() => {
        modal.classList.remove('is-open');
        modal.classList.remove('is-closing');
        document.body.style.overflow = '';
      }, 350);
    }

    document.querySelectorAll('[data-recipe]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(trigger.dataset.recipe);
      });
    });

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

  }


}); /* end DOMContentLoaded */
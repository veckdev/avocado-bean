# Avocado Bean — Techniques & Effects Reference

A reference guide for all CSS, JavaScript and HTML techniques used in this project.
Useful for the project report and for explaining decisions during the video presentation.

---

## CSS Techniques

### Scroll Snap
Locks each section into place when the user scrolls, creating a "card snap" effect.
Only active on desktop — disabled on mobile via media query.
```css
/* Applied to the scroll container */
scroll-snap-type: y mandatory;

/* Applied to each section */
scroll-snap-align: center;
scroll-snap-stop: always;

/* Disabled on mobile */
@media (max-width: 900px) {
  .page-scroller { scroll-snap-type: none; height: auto; }
  .page-section  { scroll-snap-align: none; min-height: auto; }
}
```

---

### CSS Custom Properties (Variables)
Defines colours and values in one place so they can be reused across the entire stylesheet.
```css
:root {
  --green:  #4a6b42;
  --orange: #b85c2a;
}

/* Used like this anywhere in the CSS */
color: var(--green);
```

---

### CSS Grid
Used for two-column layouts (hero, about, recipe modal) and card grids (recipes, blog).
```css
/* Two columns */
display: grid;
grid-template-columns: 52% 48%;

/* Three equal columns */
grid-template-columns: repeat(3, 1fr);

/* Modal — photo left, content right */
grid-template-columns: 1fr 1fr;
```

---

### CSS Flexbox
Used for aligning items in rows — nav bar, buttons, footer, stats row.
```css
display: flex;
justify-content: space-between;
align-items: center;
```

---

### clamp() — Fluid Typography
Scales font size smoothly between a minimum and maximum based on screen width.
No media queries needed for font sizing.
```css
font-size: clamp(56px, 7vw, 92px);
/* min: 56px | preferred: 7% of viewport width | max: 92px */
```

---

### backdrop-filter: blur
Creates a frosted glass effect on the navigation bar, photo badge and modal overlay.
```css
background: rgba(250, 248, 242, 0.95);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px); /* Safari support */
```

---

### CSS Transitions
Smooth animation between two states (e.g. button hover, card lift).
```css
transition: background 0.2s, transform 0.15s;
```

---

### CSS Transform
Moves, scales or rotates elements. Used for card hover lift, logo wobble and modal open/close.
```css
/* Card lifts up on hover */
transform: translateY(-6px);

/* Logo icon rotates on hover */
transform: rotate(-8deg) scale(1.05);

/* Modal scales up when opening */
transform: scale(0.88); /* closed */
transform: scale(1);    /* open */
```

---

### Lightbox Modal — Scale Animation
The recipe modal opens by scaling from 0.88 to 1 and fading in.
Closing plays the same animation in reverse using a dedicated class.
```css
/* Default — hidden and scaled down */
.modal-panel {
  opacity: 0;
  transform: scale(0.88);
  transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Open — full size */
.recipe-modal.is-open .modal-panel {
  opacity: 1;
  transform: scale(1);
}

/* Closing — scales back down (added by JS, removed after animation) */
.recipe-modal.is-closing .modal-panel {
  opacity: 0;
  transform: scale(0.88);
}
```

---

### Sticky Filter Bar
The filter bar on the recipes page sticks just below the fixed nav when scrolling.
```css
.filter-bar {
  position: sticky;
  top: 69px; /* height of the nav */
  z-index: 100;
}
```

---

### CSS Keyframe Animation
Continuous looping animation. Was used for the scrolling ticker banner.
```css
@keyframes scroll-left {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.ticker-track {
  animation: scroll-left 28s linear infinite;
}
```

---

### Animated Underline (Pseudo-element)
Creates a sliding underline effect on nav links using ::after and scaleX.
```css
.nav-menu a::after {
  content: '';
  position: absolute;
  bottom: -3px; left: 0; right: 0;
  height: 1px;
  background: var(--green);
  transform: scaleX(0);           /* hidden by default */
  transition: transform 0.25s ease;
}
.nav-menu a:hover::after {
  transform: scaleX(1);           /* slides in on hover */
}
```

---

### Organic Shape with border-radius
Creates the leaf-shaped logo icon using asymmetric border-radius values.
```css
border-radius: 60% 40% 60% 40% / 50% 60% 40% 50%;
```

---

### Background Image (CSS)
Used for full-bleed photos in hero and about sections (div instead of img tag).
```css
.hero-photo {
  background: url('../images/dishes/chickpea-curry.jpg') center / cover;
}
```

---

### isolation: isolate
Creates a new stacking context so z-index works correctly inside a section.
Needed for the icon pattern to sit behind the text content.
```css
.philosophy-section {
  isolation: isolate;
}
```

---

### object-fit: cover
Makes images fill their container without distorting, cropping if needed.
Used on recipe card photos.
```css
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

---

### CSS Media Queries — Responsive Design
Changes layout on smaller screens (below 900px).
```css
@media (max-width: 900px) {
  .hero-wrapper { grid-template-columns: 1fr; }
  .recipes-grid { grid-template-columns: 1fr; }
  .modal-panel  { grid-template-columns: 1fr; }
}
```

---

### Card Hover Overlay
A dark overlay with text appears over recipe card photos on hover.
Uses opacity transition for a smooth fade-in effect.
```css
.menu-card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(42, 34, 24, 0.45);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.menu-recipe-card:hover .menu-card-overlay {
  opacity: 1;
}
```

---

## JavaScript Techniques

### DOMContentLoaded
Waits for the HTML to fully load before running any JavaScript.
```js
document.addEventListener('DOMContentLoaded', () => {
  // safe to select elements here
});
```

---

### IntersectionObserver API
Watches elements and fires a callback when they enter or leave the viewport.
Used for three things in this project:
1. Updating scroll dots as the user navigates sections (homepage)
2. Triggering reveal animations when elements enter view (all pages)
3. Root is set dynamically — page-scroller on homepage, null (viewport) on other pages
```js
/* root: null means it watches the browser viewport */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target); /* stop watching after first trigger */
    }
  });
}, {
  root: pageScroller || null,
  threshold: 0.15
});
```

---

### Adaptive Root for IntersectionObserver
On the homepage the page scrolls inside #page-scroller, not the window.
On other pages it scrolls normally. We detect which one to use:
```js
const pageScroller = document.getElementById('page-scroller');
const revealRoot   = pageScroller || null;
/* null = watch the browser viewport (used on recipes, about, blog pages) */
```

---

### Scroll Snap — JavaScript Integration
The scroll snap container is `#page-scroller`, not `window`.
JavaScript listens for scroll events on this element, not on window.
```js
const pageScroller = document.getElementById('page-scroller');
pageScroller.addEventListener('scroll', () => {
  // runs when user scrolls
}, { passive: true });
```

---

### classList API
Adds, removes or toggles CSS classes on elements dynamically.
```js
element.classList.add('is-active');
element.classList.remove('is-active');
element.classList.toggle('is-visible');
```

---

### Smooth Modal Close with setTimeout
Adds a closing class to trigger the CSS animation, then removes the modal
after the animation duration (350ms) so the animation plays fully.
```js
function closeModal() {
  modal.classList.add('is-closing');    /* triggers scale-down animation */
  setTimeout(() => {
    modal.classList.remove('is-open');
    modal.classList.remove('is-closing');
    document.body.style.overflow = '';
  }, 350); /* matches the CSS transition duration */
}
```

---

### Recipe Filter — Show/Hide Cards
Filters recipe cards by category using dataset attributes and classList.
```js
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedFilter = button.dataset.filter; /* e.g. "bowls" */

    recipeCards.forEach(card => {
      if (selectedFilter === 'all' || card.dataset.category === selectedFilter) {
        card.classList.remove('is-hidden');
      } else {
        card.classList.add('is-hidden');
      }
    });
  });
});
```

---

### Dynamic HTML Injection (innerHTML)
JavaScript builds the modal content from recipe data and injects it into the DOM.
```js
modalContent.innerHTML = `
  <img class="modal-photo" src="${recipe.photo}" alt="${recipe.photoAlt}">
  <div class="modal-body">
    <h2 class="modal-title">${recipe.title}</h2>
  </div>
`;
```

---

### Data Object as Content Source
All recipe content (ingredients, steps, photos) is stored in a JavaScript object.
This makes it easy to add new recipes without changing HTML.
```js
const recipeData = {
  'chickpea-curry': {
    title: 'Chickpea Curry Bowl',
    ingredients: [ '400g chickpeas', '400ml coconut milk', ... ],
    steps: [ 'Cook the rice...', 'Heat the oil...' ]
  }
};
```

---

### Escape Key to Close Modal
Listens for the Escape key globally and closes the modal if it's open.
```js
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
```

---

### Dynamically Created SVG Elements
JavaScript creates SVG icons and places them on the page as DOM elements.
Used to generate the decorative icon pattern on philosophy and blog sections.
```js
const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('viewBox', '0 -960 960 960');
svg.innerHTML = `<path d="..."/>`;
container.appendChild(svg);
```

---

### Math.random() — Randomisation
Generates random numbers for icon position, rotation, size and opacity.
```js
const rotation = Math.round(Math.random() * 340); // 0 to 340 degrees
const opacity  = (0.07 + Math.random() * 0.08).toFixed(2);
```

---

### Math.hypot() — Distance Calculation
Calculates straight-line distance between two points.
Used to prevent icons from overlapping in the pattern.
```js
const distance = Math.hypot(pointA.x - pointB.x, pointA.y - pointB.y);
```

---

### passive: true Event Listener
Improves scroll performance by telling the browser the listener
will not call preventDefault().
```js
element.addEventListener('scroll', handler, { passive: true });
```

---

## HTML Techniques

### Semantic HTML5 Elements
Using the right HTML element for the right job improves accessibility
and helps search engines understand the page structure.
```html
<nav>      — navigation links
<main>     — main page content
<section>  — a distinct section of content
<article>  — a self-contained piece of content (recipe card, blog card)
<footer>   — footer content
<h1>–<h2> — headings in correct hierarchy
```

---

### SEO Meta Tags
Help search engines display the right information in search results.
```html
<meta name="description" content="...">
<meta name="keywords" content="...">
```

---

### Open Graph Meta Tags
Control how the page looks when shared on social media (Facebook, WhatsApp etc).
```html
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
```

---

### aria-label & aria-hidden
Accessibility attributes that help screen readers understand the page.
- `aria-hidden="true"` hides decorative elements from screen readers
- `aria-label="..."` gives a text description to elements without visible text
- `role="dialog"` tells screen readers the modal is an interactive dialog
```html
<div class="logo-icon" aria-hidden="true"></div>
<nav aria-label="Page section navigation">
<div class="recipe-modal" role="dialog" aria-modal="true">
```

---

### data-* Attributes
Custom HTML attributes used to pass data to JavaScript without using classes.
Used for filter buttons (data-filter) and recipe cards (data-recipe, data-category).
```html
<button data-filter="bowls">Bowls</button>
<article data-category="bowls" data-recipe="chickpea-curry">
```

---

### loading="lazy"
Tells the browser to only load an image when the user scrolls near it.
Improves page load speed and PageSpeed score.
```html
<img src="..." alt="..." loading="lazy">
```

---

### display: contents
Makes a wrapper div invisible to the layout engine so its children
participate directly in the parent grid. Used in the recipe modal.
```html
<div id="modal-content" style="display:contents">
  <!-- photo and content div become direct grid children -->
</div>
```

---

### External Stylesheet Link
Connects the HTML page to the CSS file.
```html
<link rel="stylesheet" href="css/style.css">
```

---

### Google Fonts via @import
Loads custom fonts from Google's servers directly in the CSS file.
```css
@import url('https://fonts.googleapis.com/css2?family=Averia+Serif+Libre&family=Montserrat&display=swap');
```

---

## Design Decisions

### Font Pairing
- **Averia Serif Libre** — display font for headings. Organic, hand-drawn feel that suits a food brand.
- **Montserrat** — body font for all other text. Clean, modern and highly readable at small sizes.

### Colour Palette
Extracted directly from the food photography used on the site.
- `--orange: #b85c2a` — terracotta from the curry dishes
- `--green:  #4a6b42` — forest green from herbs and bowls
- `--yellow: #c8922a` — turmeric yellow from the scramble dishes
- `--blue:   #4a6880` — delft blue from the patterned plates
- `--cream:  #f2ebe0` — off-white from the plate surfaces

### Image Strategy
- Hero and About sections: CSS `background` property for full-bleed coverage
- Recipe cards: HTML `<img>` tags with `loading="lazy"` for performance
- All images: `object-fit: cover` to fill containers without distortion

### Single CSS & JS File
All styles live in `style.css` and all JavaScript in `main.js`.
Each section is clearly labelled with comments. JavaScript uses `if` checks
so page-specific code (recipe filter, modal) only runs when those elements exist.

### Scroll Snap — Desktop Only
Scroll snap is enabled on desktop for a premium feel but disabled on mobile
via a media query, where normal scrolling works better for longer content.

### Icon Pattern — Decorative Only
The scattered SVG icon pattern is applied only to dark-background sections
(Philosophy and Blog) where it adds warmth without affecting readability.
It is marked `aria-hidden="true"` so screen readers ignore it.

### Modal Design Decision
Recipe details open in a centred lightbox card rather than a full page or side panel.
This keeps the user on the recipes page and makes the interaction feel faster.
The two-column layout (photo + content) makes efficient use of horizontal space.

---

### Flex Column Cards — Aligned Footer
Recipe cards use `flex-direction: column` so the "See recipe" button always sits
at the bottom regardless of how much text each card has.
```css
.menu-recipe-card  { display: flex; flex-direction: column; }
.menu-card-body    { display: flex; flex-direction: column; flex: 1; }
.menu-card-description { flex: 1; } /* pushes button to bottom */
```

---

### Search + Filter Combined
The search bar and category filter work together. Both run through a single
`applyFilters()` function so they can be used at the same time.
```js
function applyFilters() {
  const activeFilter = document.querySelector('.filter-btn.is-active')?.dataset.filter || 'all';
  const searchQuery  = searchInput.value.toLowerCase().trim();

  recipeCards.forEach(card => {
    const matchesCategory = activeFilter === 'all' || card.dataset.category === activeFilter;
    const matchesSearch   = !searchQuery || cardTitle.includes(searchQuery);
    card.classList.toggle('is-hidden', !(matchesCategory && matchesSearch));
  });
}
```

---

### Descriptive Image Naming
All images use descriptive filenames instead of generic numbers.
This makes the codebase easier to maintain and the project easier to understand.
```
img-chickpea-curry.webp     ← clear, self-documenting
img-006.jpg                 ← avoid — tells you nothing
```

---

### WebP Image Format
All new images use the `.webp` format instead of `.jpg` or `.png`.
WebP files are typically 25–35% smaller than JPEGs at the same quality,
which directly improves page load speed and Google PageSpeed scores.

---

## Recipe Content Structure
Each recipe in `recipeData` follows this structure — making it easy to add new ones:
```js
'recipe-key': {
  title:       'Recipe Name',
  category:    'Bowls',          // used by filter buttons
  pillClass:   'green-pill',     // colour of the category badge
  time:        '35 min',
  serves:      '2',
  difficulty:  'Easy',           // Easy / Medium / Hard
  photo:       '../images/dishes/img-name.webp',
  photoAlt:    'Description for screen readers',
  description: 'Short description shown in the modal.',
  preview:     ['Ingredient 1', 'Ingredient 2', 'Ingredient 3', 'Ingredient 4'],
  allergens:   ['Gluten-free', 'Soy-free', 'Nut-free'],
  ingredients: [ '400g chickpeas', ... ],
  steps:       [ 'Step 1...', 'Step 2...' ]
}
```

## Current Recipe List
The site currently has 13 recipes across 5 categories:

| Recipe | Category | Time | Difficulty |
|---|---|---|---|
| Chickpea Curry Bowl | Bowls | 35 min | Easy |
| Tofu Katsu Bowl | Bowls | 40 min | Medium |
| Cauliflower & Chickpea Curry | Bowls | 40 min | Easy |
| Spiced Lentil Soup | Soups | 45 min | Easy |
| Scramble on Toast | Toasts | 15 min | Easy |
| Scramble with Pickles | Toasts | 15 min | Easy |
| Cucumber & Radish Toast | Toasts | 10 min | Easy |
| Peanut Butter & Jam Toast | Toasts | 5 min | Easy |
| Spinach & Berry Salad | Salads | 10 min | Easy |
| Kale & Avocado Salad | Salads | 15 min | Easy |
| Peanut Butter Rice Cakes | Snacks | 5 min | Easy |
| Fruit & Oat Granola Bars | Snacks | 35 min | Easy |
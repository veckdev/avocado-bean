# Avocado Bean — Techniques & Effects Reference

A reference guide for all CSS, JavaScript and HTML techniques used in this project.
Useful for the project report and for explaining decisions during the video presentation.

---

## CSS Techniques

### CSS Custom Properties (Variables)
Defines colours and spacing values in one place so they can be reused across all stylesheets.
Changing a value here updates it everywhere on the site automatically.
```css
:root {
  --orange:      #b85c2a;
  --green:       #4a6b42;
  --cream:       #f2ebe0;
  --line-colour: rgba(42, 34, 24, 0.09);
}

/* Used anywhere in the CSS */
color: var(--green);
border: 1px solid var(--line-colour);
```

---

### CSS Grid
Used for two-column page layouts (hero, about, contact) and card grids (recipes, ingredients).
```css
/* Two unequal columns — hero split */
grid-template-columns: 52% 48%;

/* Three equal columns — recipe grid */
grid-template-columns: repeat(3, 1fr);

/* Two equal columns — recipe modal */
grid-template-columns: 1fr 1fr;

/* Order form — content + sidebar */
grid-template-columns: 1fr 360px;
```

---

### CSS Flexbox
Used for aligning items in rows — navbar, footer, buttons, filter bar, stats row.
```css
display: flex;
justify-content: space-between;
align-items: center;
gap: 16px;
```

---

### clamp() — Fluid Typography
Scales font size smoothly between a minimum and maximum based on screen width.
No media queries needed for text sizing.
```css
font-size: clamp(56px, 7vw, 92px);
/* min: 56px | preferred: 7% of viewport | max: 92px */
```

---

### CSS Media Queries — Responsive Design
Switches from multi-column to single-column layouts on mobile (below 900px).
```css
@media (max-width: 900px) {
  .hero-wrapper       { grid-template-columns: 1fr; }
  .recipes-grid       { grid-template-columns: 1fr; }
  .modal-panel        { grid-template-columns: 1fr; }
  .recipe-picker-grid { grid-template-columns: 1fr; }
}
```

---

### backdrop-filter: blur
Creates a frosted glass effect on the navigation bar and modal overlay.
```css
background: rgba(250, 248, 242, 0.95);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px); /* Safari support */
```

---

### CSS Transitions
Smooth animation between two states — button hover, nav shrink on scroll, form focus.
```css
transition: background 0.2s, transform 0.15s;
transition: border-color 0.2s, background 0.2s;
```

---

### CSS Transform
Moves, scales or rotates elements. Used for logo hover wobble and modal open/close animation.
```css
/* Logo icon rotates on hover */
transform: rotate(-8deg) scale(1.05);

/* Modal scales up when opening */
transform: scale(0.88); /* closed */
transform: scale(1);    /* open  */
```

---

### Lightbox Modal — Scale + Fade Animation
The recipe modal opens by scaling from 0.88 to 1 and fading in.
Closing plays the same animation in reverse using a `.is-closing` class added by JS.
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

/* Closing — scales back down (JS adds this class, then removes after delay) */
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
  top: 61px; /* height of the shrunken nav */
  z-index: 100;
}
```

---

### Animated Underline (Pseudo-element)
Creates a sliding underline on nav links using `::after` and `scaleX`.
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
.nav-menu a:hover::after,
.nav-menu a.current-page::after {
  transform: scaleX(1);           /* slides in on hover or active page */
}
```

---

### Organic Shape with border-radius
Creates the leaf-shaped logo icon using asymmetric border-radius values.
```css
.logo-icon {
  border-radius: 60% 40% 60% 40% / 50% 60% 40% 50%;
}
```

---

### Background Image via CSS
Used for full-bleed photos in hero sections (div instead of img tag).
Allows the image to cover the entire area without distortion.
```css
.about-hero-photo {
  background: url('../images/dishes/img-hero-about.jpg') center / cover;
}
```

---

### object-fit: cover
Makes `<img>` tags fill their container without distorting, cropping if needed.
Used on all recipe card photos and the story photo.
```css
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
```

---

### Card Border Pattern
All cards use a consistent subtle border instead of a shadow.
The border uses the same CSS variable as dividers throughout the site.
```css
.recipe-card {
  border: 1px solid var(--line-colour); /* rgba(42, 34, 24, 0.09) */
  border-radius: 12px;
  overflow: hidden;
}
```

---

### isolation: isolate
Creates a new stacking context so z-index works correctly inside a section.
Used on dark sections where the decorative icon pattern sits behind the text.
```css
.philosophy-section {
  position: relative;
  isolation: isolate;
}
```

---

### Scroll Snap (Homepage — Desktop Only)
Locks each section into place when the user scrolls, creating a full-page card effect.
Disabled on mobile via media query where normal scrolling is better.
```css
/* Container */
.page-scroller {
  overflow-y: auto;
  scroll-snap-type: y mandatory;
}

/* Each section */
.page-section {
  scroll-snap-align: start;
}

/* Disabled on mobile */
@media (max-width: 900px) {
  .page-scroller { scroll-snap-type: none; }
}
```

---

### display: contents
Makes a wrapper div invisible to the layout engine so its children participate
directly in the parent grid. Used in the recipe modal so the photo and content
div each occupy one grid column.
```css
#modal-content {
  display: contents;
}
```

---

### Flex Column Cards — Aligned Button
Recipe cards use `flex-direction: column` so the "See recipe" button always sits
at the bottom regardless of how much text each card contains.
```css
.recipe-card      { display: flex; flex-direction: column; }
.recipe-card-body { display: flex; flex-direction: column; flex: 1; }
.recipe-card-description { flex: 1; } /* pushes button to bottom */
```

---

### Bootstrap 5 Overrides
Bootstrap is used only on the ingredients page for its responsive grid.
Since Bootstrap's global CSS conflicts with the site's design system,
targeted overrides are applied in `ingredients.css`.
```css
/* Example — reset Bootstrap's ul margin on nav */
.top-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
```

---

## JavaScript Techniques

### DOMContentLoaded
Waits for the HTML to fully parse before running any JavaScript.
All code is wrapped inside this listener.
```js
document.addEventListener('DOMContentLoaded', () => {
  // safe to query the DOM here
});
```

---

### Navbar Shrink on Scroll
Adds an `is-scrolled` class to the nav when the user scrolls down, shrinking the padding.
Uses `{ passive: true }` to improve scroll performance.
```js
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    nav.classList.add('is-scrolled');
  } else {
    nav.classList.remove('is-scrolled');
  }
}, { passive: true });
```

---

### Hamburger Menu Toggle
Toggles the nav open/closed on mobile. Also updates `aria-expanded` for accessibility.
```js
hamburger.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('is-open');
  hamburger.classList.toggle('is-open');
  hamburger.setAttribute('aria-expanded', isOpen);
});
```

---

### IntersectionObserver API — Reveal Animations
Watches elements and triggers a fade-in animation when they enter the viewport.
Two observers are used: one for regular elements, one for cards (with stagger delay).
```js
const revealWatcher = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealWatcher.unobserve(entry.target); /* stop after first trigger */
    }
  });
}, {
  threshold: 0,
  rootMargin: '0px 0px -60px 0px' /* trigger 60px before element reaches bottom of screen */
});
```

---

### Card Stagger Animation
Cards in a row get a dynamic `transitionDelay` based on their column index,
creating a left-to-right stagger effect when they enter view.
```js
const colIndex = visibleInRow.indexOf(card);
card.style.transitionDelay = colIndex * 0.08 + 's';
card.classList.add('is-visible');
```

---

### Dynamically Created SVG Icon Pattern
JavaScript creates and positions SVG icons on dark sections.
Uses `Math.hypot()` to calculate distances and prevent icons from overlapping.
```js
const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('viewBox', '0 -960 960 960');
svg.innerHTML = iconPath;
patternWrapper.appendChild(svg);

/* Collision avoidance */
const distance = Math.hypot(newX - placed.x, newY - placed.y);
if (distance < minDistance) { /* skip this position */ }
```

---

### Math.random() — Randomisation
Generates random values for icon position, rotation, size and opacity.
```js
const rotation = Math.round(Math.random() * 340);       // 0–340 degrees
const opacity  = (0.07 + Math.random() * 0.08).toFixed(2); // 0.07–0.15
const scale    = (0.7  + Math.random() * 0.6).toFixed(2);  // 0.7–1.3
```

---

### Recipe Filter + Search
Both the category filter buttons and the search input run through a single
`applyFilters()` function so they work together simultaneously.
```js
function applyFilters() {
  const activeFilter = document.querySelector('.filter-btn.is-active')?.dataset.filter || 'all';
  const searchQuery  = searchInput ? searchInput.value.toLowerCase().trim() : '';

  recipeCards.forEach(card => {
    const matchesCategory = activeFilter === 'all' || card.dataset.category === activeFilter;
    const matchesSearch   = !searchQuery ||
      card.querySelector('.recipe-card-title')?.textContent.toLowerCase().includes(searchQuery);

    card.classList.toggle('is-hidden', !(matchesCategory && matchesSearch));
  });
}
```

---

### Data Object as Content Source
All recipe content is stored in a `recipeData` JavaScript object.
When a card is clicked, the modal reads from this object to build its content.
This means adding a new recipe only requires adding one entry to this object — no HTML changes.
```js
const recipeData = {
  'chickpea-curry': {
    title:       'Chickpea Curry Bowl',
    category:    'Bowls',
    time:        '35 min',
    serves:      '2',
    difficulty:  'Easy',
    ingredients: ['400g chickpeas', '400ml coconut milk', ...],
    steps:       ['Cook the rice...', 'Heat the oil...']
  }
};
```

---

### Dynamic Modal Content with Template Literals
The modal content is built using a template literal string injected into the DOM.
```js
modalContent.innerHTML = `
  <img class="modal-photo" src="${recipe.photo}" alt="${recipe.photoAlt}">
  <div class="modal-content">
    <div class="modal-body">
      <h2 class="modal-title">${recipe.title}</h2>
      <ul class="ingredients-list">
        ${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}
      </ul>
    </div>
  </div>
`;
```

---

### Modal Close — Multiple Triggers
The recipe modal can be closed three ways: close button, overlay click, or Escape key.
```js
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
```

---

### Modal Close Animation
The closing animation plays before the modal is hidden, so the scale-down is visible.
```js
function closeModal() {
  modal.classList.add('is-closing');         /* triggers CSS animation */
  setTimeout(() => {
    modal.classList.remove('is-open');
    modal.classList.remove('is-closing');
    document.body.style.overflow = '';       /* restore scrolling */
  }, 350);                                   /* matches CSS transition duration */
}
```

---

### Recipe Picker — Toggle + Max Limit
Users can select up to 3 recipes. Unselected cards are disabled when the max is reached.
Selecting a recipe updates the sidebar in real time.
```js
if (card.classList.contains('is-selected')) {
  deselectRecipe(id);
} else if (selectedRecipes.length < MAX_RECIPES) {
  selectedRecipes.push({ id, name });
  card.classList.add('is-selected');
  updateSidebar();
}
```

---

### Real-Time Order Summary
The sidebar updates every time the recipe selection changes, showing recipe names,
count, and a live price total.
```js
function updateSidebar() {
  const total = (selectedRecipes.length * PRICE_PER_RECIPE).toFixed(2);
  sidebarPrice.textContent = `€${total}`;
  sidebarCount.textContent = `${selectedRecipes.length} of ${MAX_RECIPES} recipes`;
}
```

---

### Form Validation — JS + HTML5
Both forms use `novalidate` on the `<form>` to disable browser defaults, then apply
custom JS validation with clear, descriptive error messages per field.

Fields validated:
- **Name** — required, not empty
- **Email** — required + regex pattern `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- **Phone** — required + regex pattern `/^[\d\s\+\-\(\)]{7,15}$/`
- **Address** — required + minimum 10 characters
- **Date** — required + must not be in the past
- **Recipes** — at least 1 must be selected
- **Message** — required + minimum 10 characters

```js
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailPattern.test(email.value.trim())) {
  showFieldError('order-email', 'error-email', 'Please enter a valid email address.');
}
```

---

### Live Error Reset
Errors are cleared as soon as the user starts typing, giving immediate feedback.
```js
input.addEventListener('input', () => {
  input.classList.remove('has-error');
  const errorEl = document.getElementById(`error-${input.id}`);
  if (errorEl) errorEl.textContent = '';
});
```

---

### Form Success State
After a valid submission, the form is hidden and replaced with a personalised success message.
```js
if (orderInner) orderInner.style.display = 'none';
if (orderSuccess) orderSuccess.classList.add('is-visible');
successText.textContent = `Thanks ${firstName}! We'll confirm to ${email} within 2 hours.`;
```

---

### Keyboard Accessibility on Custom Elements
The recipe picker cards are `div` elements styled as checkboxes.
`tabindex="0"` and a `keydown` listener make them keyboard-accessible.
```js
card.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    card.click();
  }
});
```

---

### Character Counter
A live character counter on the special instructions textarea prevents over-limit input.
```js
notesTextarea.addEventListener('input', () => {
  const len = notesTextarea.value.length;
  if (len > 300) notesTextarea.value = notesTextarea.value.substring(0, 300);
  notesCharCount.textContent = `${Math.min(len, 300)} / 300`;
});
```

---

### Conditional Code Execution
Page-specific JS only runs if the relevant element exists on the page.
This means one `main.js` file works safely across all 5 pages.
```js
if (modal) {
  /* Recipe modal code — only runs on recipes.html */
}

if (recipePickerCards.length > 0) {
  /* Order picker code — only runs on contact.html */
}
```

---

## HTML Techniques

### Semantic HTML5 Elements
Using the correct element for each purpose improves accessibility and SEO.
```html
<nav>      — navigation bar
<main>     — main page content
<section>  — a distinct page section
<article>  — a self-contained item (recipe card)
<footer>   — page footer
<header>   — page or section header
<blockquote> — pull quote (story section)
<h1>–<h3>  — heading hierarchy (one h1 per page)
```

---

### SEO Meta Tags
Help search engines display the right information in search results.
```html
<meta name="description" content="...">
<meta name="keywords" content="...">
<meta name="author" content="Avocado Bean">
```

---

### Open Graph Meta Tags
Control how the page appears when shared on social media (WhatsApp, Facebook, etc).
```html
<meta property="og:title" content="Avocado Bean">
<meta property="og:description" content="...">
<meta property="og:image" content="../images/ui/og-image.jpg">
<meta property="og:type" content="website">
```

---

### aria-label, aria-hidden, aria-expanded
Accessibility attributes that help screen readers understand the page.
```html
<!-- Hides decorative elements -->
<div class="logo-icon" aria-hidden="true"></div>

<!-- Describes elements without visible text -->
<button aria-label="Close recipe">...</button>

<!-- Communicates state of the hamburger menu -->
<button aria-expanded="false" id="nav-hamburger">...</button>

<!-- Marks the modal as an interactive dialog -->
<div role="dialog" aria-modal="true" aria-label="Recipe detail">
```

---

### data-* Attributes
Custom attributes used to pass data to JavaScript without polluting class names.
```html
<!-- Filter buttons -->
<button data-filter="bowls">Bowls</button>

<!-- Recipe cards — two pieces of data in one element -->
<article data-category="bowls" data-recipe="chickpea-curry">

<!-- Order picker cards -->
<div data-recipe-id="chickpea-curry" data-recipe-name="Chickpea Curry Bowl">
```

---

### loading="lazy"
Defers loading of images until the user scrolls near them.
Improves initial page load time and PageSpeed score.
```html
<img src="..." alt="..." loading="lazy">
```

---

### novalidate + Custom Validation
Disables browser's default validation popup so custom styled errors can be shown instead.
```html
<form id="order-form" novalidate>
```

---

### External Stylesheets — Load Order
Bootstrap loads before the site's own stylesheet so custom styles take precedence.
```html
<!-- 1. Bootstrap — base styles -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<!-- 2. Site styles — override Bootstrap where needed -->
<link rel="stylesheet" href="../css/style.css">
<link rel="stylesheet" href="../css/ingredients.css">
```

---

### Google Fonts via @import
Loads both fonts in a single request, with `display=swap` to prevent invisible text during load.
```css
@import url('https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:ital,wght@0,400;0,700;1,400;1,700&family=Rubik:wght@0,300..900&display=swap');
```

---

## Design Decisions

### Font Pairing
- **Averia Serif Libre** — display font for all headings. Organic, slightly imperfect letterforms that suit a food brand with character.
- **Rubik** — body font for all other text. Clean, round and highly legible at small sizes. Replaced the original Montserrat for a warmer feel.

### Colour Palette
Extracted from the food photography used on the site.
- `--orange: #b85c2a` — terracotta from the curry dishes
- `--green:  #4a6b42` — forest green from herbs and bowls
- `--yellow: #c8922a` — turmeric yellow from the scramble dishes
- `--blue:   #4a6880` — delft blue from the patterned plates
- `--cream:  #f2ebe0` — off-white from the plate surfaces

### Image Strategy
- Hero and About sections: CSS `background-image` for full-bleed coverage with no sizing issues
- Recipe cards and story photo: HTML `<img>` tags with `loading="lazy"` for performance
- All images: `object-fit: cover` to fill containers without distortion

### Per-Page CSS Files
Rather than one large stylesheet, each page has its own CSS file that only contains styles relevant to that page. `style.css` holds shared styles — nav, footer, buttons, typography. This makes the codebase easier to maintain and keeps file sizes small.

### Single JS File — Conditional Execution
All JavaScript lives in `main.js`. Each feature checks whether its target element exists before running, so no errors occur on pages that don't need that feature.

### Cards — Border Over Shadow
Cards use a subtle `border: 1px solid var(--line-colour)` rather than a drop shadow. This is more consistent with the editorial design language and avoids the "floating card" look. The `overflow: hidden` required for rounded image corners means the border is set directly on the card element.

### Recipe Picker — Max 3
Limiting orders to 3 recipes mirrors real meal kit services (HelloFresh, Green Chef) and creates a natural constraint that makes the UI decision simpler for users. Unselected cards are visually disabled when the limit is reached.

### Scroll Snap — Desktop Only
Scroll snap creates a premium full-page feel on desktop but is disabled on mobile via media query. On mobile the content is longer and natural scrolling is a better experience.

### Icon Pattern — Decorative Only
The scattered SVG icon pattern is applied only to dark-background sections where it adds warmth and texture without affecting text readability. It is `aria-hidden="true"` so screen readers ignore it entirely.

### Modal Design
Recipe details open in a centred lightbox rather than a separate page or side panel. This keeps the user on the recipes page and makes the interaction feel faster. The two-column layout (sticky photo + scrollable content) makes efficient use of horizontal space on desktop.

---

## Recipe Content Structure

Each entry in `recipeData` follows this structure, making it easy to add new recipes:

```js
'recipe-key': {
  title:       'Recipe Name',
  category:    'Bowls',            // matches data-category on HTML card
  pillClass:   'green-pill',       // colour class for the category badge
  time:        '35 min',
  serves:      '2',
  difficulty:  'Easy',             // Easy | Medium | Hard
  photo:       '../images/dishes/img-name.webp',
  photoAlt:    'Descriptive alt text for screen readers',
  description: 'Short description shown in the modal.',
  preview:     ['Ingredient 1', 'Ingredient 2', 'Ingredient 3', 'Ingredient 4'],
  allergens:   ['Gluten-free', 'Soy-free', 'Nut-free'],
  ingredients: ['400g chickpeas', '400ml coconut milk', ...],
  steps:       ['Step 1...', 'Step 2...']
}
```
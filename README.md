# Avocado Bean

> Plant-based ingredient delivery website built with HTML5, CSS3 and vanilla JavaScript.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?style=flat&logo=bootstrap&logoColor=white)
![jQuery](https://img.shields.io/badge/jQuery-0769AD?style=flat&logo=jquery&logoColor=white)

---

## Overview

Avocado Bean is a fictional plant-based ingredient delivery service based in Dublin. Inspired by HelloFresh, customers browse weekly recipes, select up to 3, and place an order for pre-measured ingredients delivered to their door.

This project is a fully responsive multi-page website featuring a modern editorial design, JavaScript interactivity, and a complete order/contact form with full client-side validation.

---

## Live Demo

🔗 [[avocado-bean.netlify.app](https://profound-fox-2687e4.netlify.app)](#) ← _update after deployment_

---

## Project Structure

```
avocado-bean/
│
├── index.html              # Homepage (root)
│
├── pages/
│   ├── recipes.html        # Recipes with category filter + search
│   ├── about.html          # About us / our story / values + jQuery stat counters
│   ├── ingredients.html    # Ingredient sourcing & Irish suppliers
│   ├── contact.html        # Contact form with JS validation
│   └── order.html          # Order form — recipe picker, delivery details, sidebar
│
├── css/
│   ├── style.css           # Global styles & design system (shared)
│   ├── home.css            # Homepage-specific styles
│   ├── recipes.css         # Recipes page + modal styles
│   ├── about.css           # About page styles
│   ├── ingredients.css     # Ingredients page + Bootstrap overrides
│   ├── contact.css         # Contact page styles
│   └── order.css           # Order page styles
│
├── js/
│   └── main.js             # All JavaScript functionality
│
└── images/
    ├── dishes/             # Food photography (.jpg)
    └── ui/                 # Logo, og-image
```

---

## Features

- **Responsive design** — mobile-first layout using CSS Grid and Flexbox, tested on iOS and Android
- **Recipe filter + search** — filter by category and search by name simultaneously using a single `applyFilters()` function
- **Recipe modal** — lightbox with photo, ingredients, steps and allergens; closes on overlay click or Escape key
- **Order form** — recipe picker (max 3), real-time order summary sidebar with live price total, full JS + HTML5 validation
- **Contact form** — name, email, message with live error feedback and success state
- **Reveal animations** — Intersection Observer API for scroll-triggered fade-in with stagger on cards
- **jQuery animated counters** — stat numbers on the About page count up from 0 using `$.animate()` when the section enters the viewport
- **Sticky navbar** — shrinks on scroll with active page link highlighting
- **Mobile hamburger menu** — animated toggle with full-screen overlay
- **Decorative icon pattern** — SVG icons scattered randomly on dark sections using DOM manipulation and Math.hypot() collision avoidance
- **SEO optimised** — semantic HTML5, meta tags, Open Graph, alt attributes on all images
- **Performance** — lazy loading on all recipe card images, async Google Fonts loading

---

## Technologies

| Technology | Usage |
|---|---|
| HTML5 | Semantic markup, forms, accessibility attributes |
| CSS3 | Custom properties, Grid, Flexbox, clamp(), transitions, pseudo-elements |
| JavaScript (ES6+) | DOM manipulation, Intersection Observer, form validation, dynamic content |
| Bootstrap 5 | Responsive grid on ingredients page; overridden to match design system |
| jQuery 3.7 | Animated stat counters on about page using `.animate()` |
| Google Fonts | Averia Serif Libre (headings), Rubik (body) |

---

## Design System

**Fonts**
- Display: [Averia Serif Libre](https://fonts.google.com/specimen/Averia+Serif+Libre) — titles & headings (italic, bold)
- Body: [Rubik](https://fonts.google.com/specimen/Rubik) — all other text

**Colour Palette**

| Name | Hex | Usage |
|---|---|---|
| Terracotta | `#b85c2a` | CTAs, prices, orange accents |
| Forest | `#4a6b42` | Nav, logo, primary buttons, easy badge |
| Turmeric | `#c8922a` | Badges, highlights, medium difficulty badge |
| Delft Blue | `#4a6880` | About preview label, info elements |
| Cream | `#f2ebe0` | Page background, input fields |
| Ivory | `#faf8f2` | Cards, panels, nav background |
| Ink | `#2a2218` | Body text, dark sections |
| Grey | `#7a6e62` | Secondary text, labels |

**Spacing**
- Section padding desktop: `80px 52px`
- Section padding mobile: `56px 24px`
- Card border radius: `12px`
- Card border: `1px solid rgba(42, 34, 24, 0.09)`

---

## Setup

No build tools or dependencies required:

```bash
git clone https://github.com/veckdev/avocado-bean.git
open index.html
```

For the best experience, serve with a local server:

```bash
# VS Code — Right-click index.html → Open with Live Server

# Python
python -m http.server 8000
# visit http://localhost:8000
```

---

## Pages

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Hero, recipe preview, philosophy, about preview, ingredients CTA |
| Recipes | `pages/recipes.html` | Full recipe grid with filter, search and lightbox modal |
| About | `pages/about.html` | Brand story, how it works, values, jQuery stat counters, CTA |
| Ingredients | `pages/ingredients.html` | Ingredient sourcing, Irish supplier profiles |
| Contact | `pages/contact.html` | Contact form with JS + HTML5 validation |
| Order | `pages/order.html` | Recipe picker, delivery form, real-time sidebar, JS validation |

---

## Testing & Validation

- [W3C HTML Validator](https://validator.w3.org/)
- [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- Tested on Chrome, Firefox, Safari
- Tested on mobile (iOS Safari, Chrome Android)

---

## Recipe List

12 recipes across 5 categories:

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
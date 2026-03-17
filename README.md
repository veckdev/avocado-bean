# Avocado Bean

> Plant-based take away website built with HTML5, CSS3 and vanilla JavaScript.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat&logo=bootstrap&logoColor=white)

---

## Overview

Avocado Bean is a fictional plant-based take away based in Dublin City Centre. This project is a fully responsive multi-page website featuring a modern editorial design, scroll-snap navigation, JavaScript interactivity, and an order enquiry form with full validation.

---

## Live Demo

🔗 [avocado-bean.netlify.app](#) ← _update after deployment_

---

## Project Structure

```
avocado-bean/
│
├── index.html              # Homepage (root)
│
├── pages/
│   ├── menu.html           # Menu with category filter
│   ├── about.html          # About us / our story
│   ├── contact.html        # Order form with JS validation
│   └── blog.html           # Recipes & articles
│
├── css/
│   └── style.css           # Global styles & design system
│
├── js/
│   └── main.js             # All JavaScript functionality
│
└── images/
    ├── dishes/             # Food photography
    └── ui/                 # Logo, icons, og-image
```

---

## Features

- **Responsive design** — mobile-first layout using CSS Grid and Flexbox
- **Scroll-snap sections** — full-viewport card sections with smooth snapping
- **Menu filter** — filter dishes by category using vanilla JavaScript
- **Form validation** — contact/order form with HTML5 + JavaScript validation
- **Reveal animations** — Intersection Observer API for scroll-triggered animations
- **Sticky navbar** — shrinks on scroll with active link highlighting
- **SEO optimised** — semantic HTML, meta tags, Open Graph, alt attributes
- **Performance** — lazy loading images, WebP format, optimised assets

---

## Technologies

| Technology | Usage |
|---|---|
| HTML5 | Semantic markup, forms, accessibility |
| CSS3 | Custom properties, Grid, Flexbox, animations |
| JavaScript (ES6+) | DOM manipulation, Intersection Observer, form validation |
| Bootstrap 5 | Responsive grid, utility classes |
| jQuery | DOM helpers, event handling |
| Google Fonts | Averia Serif Libre, Montserrat |

---

## Design System

**Fonts**
- Display: [Averia Serif Libre](https://fonts.google.com/specimen/Averia+Serif+Libre) — titles & headings
- Body: [Montserrat](https://fonts.google.com/specimen/Montserrat) — all other text

**Colour Palette**

| Name | Hex | Usage |
|---|---|---|
| Terracotta | `#b85c2a` | CTAs, prices, accents |
| Forest | `#4a6b42` | Nav, logo, primary buttons |
| Turmeric | `#c8922a` | Badges, highlights |
| Delft Blue | `#4a6880` | Blog section, info elements |
| Cream | `#f2ebe0` | Background |
| Ivory | `#faf8f2` | Cards, panels |
| Ink | `#2a2218` | Body text |

---

## Setup

No build tools or dependencies required. Just open in a browser:

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/avocado-bean.git

# Open in browser
open index.html
# or simply drag index.html into your browser
```

For the best experience, serve with a local server:

```bash
# Using VS Code — install Live Server extension, then:
# Right-click index.html → Open with Live Server

# Using Python
python -m http.server 8000
# then visit http://localhost:8000
```

---

## Testing & Validation

- [W3C HTML Validator](https://validator.w3.org/)
- [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- Tested on Chrome, Firefox, Safari, Edge
- Tested on mobile (iOS & Android)

---

## Pages

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Hero, featured dishes, philosophy, about preview, blog preview |
| Menu | `pages/menu.html` | Full menu with category filter and order add |
| About | `pages/about.html` | Brand story, values, team |
| Contact | `pages/contact.html` | Order enquiry form with full validation |
| Blog | `pages/blog.html` | Recipes and articles |
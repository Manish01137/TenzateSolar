# TRENZ LITE® — Static Website

**Fresh ideas · Complete Lighting Solutions**
A premium, fully static website for **TRENZ LITE®**, an LED lighting brand by **Ganpati Industry**, Rajpura, Punjab, India.

Built with **pure HTML + CSS + Vanilla JavaScript** — zero frameworks, zero build step, zero backend. Just open `index.html` in a browser.

---

## 🗂️ File Structure

```
trenzlite-website/
├── index.html        # Home — hero, categories, features, stats, featured products, CTA
├── about.html        # Company profile, manufacturing facilities, certifications
├── products.html     # Full product catalog with live category filter
├── contact.html      # Contact details + enquiry form (validated) + map placeholder
├── css/
│   └── styles.css    # Complete design system + responsive styles
├── js/
│   └── main.js       # Sticky nav, mobile menu, counters, filter, form validation
└── README.md
```

---

## 🚀 How to Run

No server or install required.

1. **Open directly** — double-click `index.html`, or
2. **(Optional) Run a local server** for clean relative paths:
   ```bash
   # Python 3
   python3 -m http.server 8000
   # then visit http://localhost:8000
   ```

---

## 🎨 Brand & Design System

| Token | Value | Usage |
|-------|-------|-------|
| Primary Red | `#E63012` | "LITE", CTAs, accents, badges |
| Deep Dark | `#1A1A1A` | Hero, dark sections, footer |
| Off White | `#F5F5F5` | Alternating section backgrounds |
| Accent Gold | `#C9A84C` | Premium highlights, glow effects |
| Text Dark | `#222222` | Body text |
| Text Gray | `#666666` | Secondary text |

- **Headings:** Exo 2 (Google Fonts), uppercase, letter-spaced
- **Body:** Poppins (Google Fonts)
- **Logo:** "TRENZ" black + "LITE" red + ® + "Fresh ideas" tagline

All colors and spacing are CSS custom properties in `:root` — change the brand globally from one place at the top of `css/styles.css`.

---

## ✨ Features

- **Fully responsive** — breakpoints at 1200px, 992px, 768px, 480px
- **Sticky navbar** with scroll shadow + mobile hamburger drawer (overlay, Esc to close)
- **Animated hero** — CSS glowing orbs + sweeping light rays (no images)
- **Scroll-reveal** animations via IntersectionObserver
- **Count-up stat counters** that trigger on scroll into view
- **Product filter** — instant category filtering on `products.html`, no reload
- **Validated enquiry form** — required-field + email checks, inline errors, success toast (front-end only)
- **Semantic HTML5** — `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, ARIA labels
- **Premium inline-SVG icons** — a self-contained Lucide-style sprite (no icon font, no CDN). Defined once per page in a hidden `<svg><defs>` block and referenced via `<svg class="svg-ic"><use href="#i-…"/></svg>`. Recolour globally with `currentColor`.
- **Hero photo slideshow** — 4 group-photo backgrounds cross-fade every 5s (see `.hero__slide` in each page's hero + `initHeroSlides()` in `js/main.js`)
- **Real product images** — every product card loads a photo with a glowing SVG icon as automatic fallback if the image fails (`onerror="this.remove()"`)

---

## 🛠️ Customization Guide

| To change... | Edit... |
|--------------|---------|
| Brand colors / fonts | `:root` variables at top of `css/styles.css` |
| Phone / email / address | Footer block (in each `.html`) + `contact.html` contact details |
| Products & specs | Product cards in `products.html` (each `<article class="product-card" data-category="...">`) |
| Filter categories | `.filter-bar` buttons in `products.html` + matching `data-category` values |
| Company copy | `about.html` company profile section |
| Real map | Replace the `.map-box` div in `contact.html` with a Google Maps `<iframe>` embed |
| Form submission | `initContactForm()` in `js/main.js` — currently a front-end demo; wire to an email service / backend to actually send |
| Hero background photos | The 4 `.hero__slide` `background-image` URLs in `index.html` (currently Unsplash group photos) |
| Product images | `src` on each `.product-card__img` (currently `picsum.photos` placeholders) — swap for real product shots |
| Icons | Each page has an SVG sprite near the top of `<body>`; edit a `<symbol>` or add a new one and reference it with `<use href="#i-name"/>` |

### Filter category keys
`lamps` · `downlights` · `panels` · `flood` · `wall` · `strip` · `track` · `street`
A product can belong to multiple by space-separating values in `data-category`.

---

## 📋 Notes

- The enquiry form is **front-end only** — on submit it validates and shows a success toast but does **not** send anything. Connect it to a service like Formspree, EmailJS, or your own backend to receive enquiries.
- Phone number and exact map location are placeholders (`+91 XXXXX XXXXX`) — update before going live.
- Structure was loosely modelled on a reference site; **all design, content and branding are original to TRENZ LITE®**.

---

© 2025 **TRENZ LITE®** | Ganpati Industry | All Rights Reserved
# TenzateSolar

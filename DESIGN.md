# peplogix — Design Document

## Overview

peplogix is a landing page for a precision peptide company. The site is built as a single-page static site using semantic HTML and vanilla CSS — no JavaScript frameworks, build tools, or external dependencies.

---

## Brand Identity

| Element       | Value                                                       |
| ------------- | ----------------------------------------------------------- |
| **Name**      | peplogix                                                    |
| **Tagline**   | Precision Peptides. Powerful Results.                       |
| **Tone**      | Clinical, trustworthy, premium                              |
| **Logo**      | Inline SVG — nested hexagons with a center dot (teal/dark)  |

---

## Color Palette

| Token        | Hex         | Usage                                     |
| ------------ | ----------- | ----------------------------------------- |
| `--dark`     | `#0d1f2d`   | Primary dark background (navbar, hero)     |
| `--dark-2`   | `#122535`   | Secondary dark shade                       |
| `--accent`   | `#00c9a7`   | Teal CTA buttons, highlights, active states|
| `--accent-d` | `#00b596`   | Accent hover/pressed variant               |
| `--bg`       | `#f0f0f0`   | Light page background                      |
| `--white`    | `#ffffff`   | Card backgrounds, text on dark             |
| `--text`     | `#111111`   | Primary body text                          |
| `--muted`    | `#555555`   | Secondary/supporting text                  |
| `--border`   | `#e0e0e0`   | Dividers, card outlines                    |

---

## Typography

- **Font stack:** `'Segoe UI', system-ui, -apple-system, sans-serif`
- **Line height:** `1.6` (body default)
- **Heading weights:** 700–800
- **Body weights:** 400–500
- **Letter spacing:** Tight on headings (`-0.01em`), wide on labels (`0.04em–0.12em`)
- **Fluid sizing:** Hero headings use `clamp()` for responsive scaling (e.g. `clamp(1.8rem, 3.5vw, 2.8rem)`)

---

## Spacing & Layout

| Token       | Value   | Purpose                |
| ----------- | ------- | ---------------------- |
| `--radius`  | `10px`  | Default border-radius  |
| `--trans`   | `0.25s ease` | Transition timing |

- **Desktop gutter:** `48px` horizontal padding on all sections
- **Tablet/mobile gutter:** `20px` (below 768 px)
- **Grid system:** CSS Grid for product cards (`repeat(4, 1fr)` desktop → `repeat(2, 1fr)` tablet/mobile) and footer columns (`2fr 1fr 1fr 1.2fr`)
- **Flexbox:** Used for navbar, hero layout, category rows, subscribe strip

---

## Page Sections

### 1. Navbar
- Sticky (`position: sticky; top: 0`)
- Dark background with logo, nav links, and icon buttons (account, cart)
- Active link indicated by teal bottom border
- Links hidden on mobile (< 768 px)

### 2. Hero (Primary)
- Dark gradient background (`135deg, #0d1f2d → #162e40`)
- Two-column flex layout: text left, product visual right
- CSS-only vial illustration with cap, body, label, and logo
- "ISO certified labs" badge with glassmorphism (`backdrop-filter: blur`)
- Pagination dots at bottom of content column

### 3. About Strip
- Three-column grid explaining peptide benefits
- Each card has an icon (SVG in teal circle), heading, and description
- Hover: lift + shadow + white background

### 4. Trust Section
- Two-column flex: italic quote text left, placeholder image right
- Image placeholder uses dark gradient with subtle vertical grid lines

### 5. Best Sellers
- Section label + heading
- Four-column product card grid
- Each card: dark vial image area, hover-reveal action buttons (cart, quick view), name + price footer
- Pagination dots + "See all" CTA

### 6. Categories
- Stacked rows for Peptides, Blends, L-Carnitine, Capsules, Bulk
- Featured row (Peptides) uses dark background with thumbnail image
- Each row has an arrow button that rotates 45 deg and turns teal on hover

### 7. Hero (Capsule variant)
- Reuses `.hero` base with `--capsule` modifier
- Two CSS bottle illustrations side-by-side with floating pill element
- Separate CTA for capsule products

### 8. Subscribe
- Three-part flex layout: image placeholder, heading, email form
- Email form: input + teal submit arrow button, combined in a bordered pill
- Stacks vertically on mobile

### 9. Footer
- Four-column grid: brand + tagline, Menu links, Quick Links, Operational hours
- Bottom bar: copyright + payment SVG icons (Visa, Mastercard)
- All links turn teal on hover

---

## Interaction Design

### Hover Effects
All interactive elements have `transition: var(--trans)` (0.25 s ease). Key patterns:

| Element              | Effect                                                  |
| -------------------- | ------------------------------------------------------- |
| `.btn-primary`       | Scale up 1.05, teal glow shadow, brightness boost       |
| `.btn__arrow`        | Translate right 4 px                                    |
| Product cards        | Lift 6 px + deeper shadow; action buttons fade in       |
| Category arrow       | Rotate 45 deg, fill teal                                |
| About cards          | Lift 4 px, shadow, white background                     |
| Nav links            | White text + teal bottom border                         |
| Logo                 | Slight opacity reduction + scale 1.04                   |
| Capsule bottles      | Lift 8 px + deeper shadow                               |
| Hero badge           | Lift 3 px, brighter background, teal border             |
| Hero dots            | Scale 1.4, brighter fill                                |
| Footer pay icons     | Scale 1.1, lift 2 px, slight fade                       |

### Touch / Mobile
Touch devices (`@media (hover: none)`) replace hover with `:active`:
- Buttons scale down to 0.97 with lighter shadow
- Product card actions appear on press
- Category arrows activate on press

### Focus
- `.btn-primary:focus-visible` shows a 2 px teal outline with 3 px offset

---

## Responsive Breakpoints

| Breakpoint  | Behavior                                                      |
| ----------- | ------------------------------------------------------------- |
| > 1024 px   | Full desktop layout (4-col products, 4-col footer)            |
| <= 1024 px  | Product grid → 2 columns; footer → 2 columns                 |
| <= 768 px   | Nav links hidden; hero stacks vertically; sections use 20 px gutter; about grid → 1 column; trust/subscribe stack vertically |
| <= 480 px   | Hero heading shrinks to 1.7 rem; product grid tightens gap; footer → 1 column |

---

## Iconography

- **All icons are inline SVG** — no icon font or external sprite
- Consistent stroke style: `stroke-width="1.8"`, `stroke-linecap="round"`, `stroke-linejoin="round"`
- Displayed at `width: 18–28 px` depending on context
- Logo SVG uses hexagonal geometry (nested polygons + center circle)

---

## CSS Architecture

- **Methodology:** BEM-like naming (`block__element--modifier`)
- **Variables:** All design tokens in `:root` custom properties
- **No preprocessor:** Plain CSS with custom properties for theming
- **Specificity:** Flat selectors, no `!important`, no deep nesting
- **File structure:** Single `styles.css` file, organized by section with comment banners
- **Section order in CSS mirrors DOM order:** Buttons → Navbar → Hero → About → Trust → Best Sellers → Categories → Subscribe → Footer → Responsive

---

## Assets

- **Zero external assets** — no images, fonts, or CDN dependencies
- Product visuals are CSS-only illustrations (gradients, borders, shapes)
- Payment icons are inline SVG
- System font stack eliminates font loading

---

## Performance Notes

- **No JavaScript** — all interactions are CSS-only (`:hover`, `:active`, `:focus-visible`, transitions)
- **No external requests** — fully self-contained HTML + CSS
- **`backdrop-filter: blur()`** used sparingly (hero badge, vial body) for glassmorphism
- **`scroll-behavior: smooth`** on `html` for anchor navigation
- **`will-change` not used** — transitions are lightweight enough without layer promotion

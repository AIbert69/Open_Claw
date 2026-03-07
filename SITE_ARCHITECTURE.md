# Alpha BioMed Labs — Site Architecture & Build Specification

> Reference site: [alphabiomedlabs.com](https://alphabiomedlabs.com)
> Document created: March 7, 2026

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Platform & Technology Stack](#2-platform--technology-stack)
3. [Site Map & URL Structure](#3-site-map--url-structure)
4. [Architecture Diagram](#4-architecture-diagram)
5. [Page-by-Page Breakdown](#5-page-by-page-breakdown)
6. [Theme File Structure](#6-theme-file-structure)
7. [Third-Party Integrations](#7-third-party-integrations)
8. [Access Control & User Roles](#8-access-control--user-roles)
9. [Multi-Portal Architecture](#9-multi-portal-architecture)
10. [Build Plan & Timeline](#10-build-plan--timeline)
11. [Cost Estimate](#11-cost-estimate)
12. [What Can Be Built Programmatically](#12-what-can-be-built-programmatically)

---

## 1. Executive Summary

Alpha BioMed Labs is a **Shopify-based e-commerce store** selling peptides and research supplies to verified healthcare providers. The site uses Shopify's native theme engine (Liquid), provider-gated access, an affiliate portal, and Cloudflare for CDN/security.

**Complexity level: Low–Medium**
There is no custom backend, no headless architecture, and no complex integrations. The entire site can be replicated using Shopify's built-in tools and a handful of apps.

---

## 2. Platform & Technology Stack

| Layer             | Technology                          | Notes                                      |
|-------------------|-------------------------------------|--------------------------------------------|
| **E-Commerce**    | Shopify                             | Handles products, cart, checkout, payments  |
| **Templating**    | Shopify Liquid                      | Server-side rendered templates              |
| **Frontend**      | HTML5 + CSS3 + Vanilla JS           | No React/Vue — standard Shopify theme JS   |
| **Styling**       | CSS Custom Properties               | Modern CSS with theme-level variables       |
| **CDN**           | Shopify CDN + Cloudflare            | `cdn.shopify.com` for assets                |
| **Hosting**       | Shopify Cloud                       | Fully managed, no server config needed      |
| **SSL**           | Shopify-managed TLS                 | Auto-provisioned HTTPS                      |
| **DNS**           | Cloudflare                          | Proxied DNS with bot protection             |
| **Domain**        | Tucows Domains Inc.                 | Domain registrar                            |
| **Payments**      | Shopify Payments / Stripe           | PCI-compliant checkout                      |
| **Analytics**     | Shopify Analytics                   | Built-in store analytics                    |

---

## 3. Site Map & URL Structure

### URL Routing (Shopify Standard)

```
alphabiomedlabs.com/
├── /                                    → Homepage
├── /collections/
│   ├── /all-peptides                    → All Peptides collection
│   ├── /new-products                    → New Products collection
│   ├── /supplies                        → Supplies collection
│   └── /weight-management               → Metabolic / Weight Management
├── /products/
│   └── /{product-slug}?variant={id}     → Product Detail Page (PDP)
├── /pages/
│   ├── /about-us                        → About Us
│   ├── /contact                         → Contact Page
│   └── /register                        → Provider Account Request
├── /cart                                → Shopping Cart
├── /checkout                            → Shopify Checkout (hosted)
└── /account                             → Customer Account
```

### Subdomains

```
alphabiomedlabs.com                → Main storefront
providers.alphabiomedlabs.com      → Provider wholesale portal
partners.alphabiomedlabs.com       → Affiliate partner portal (JS SPA)
```

---

## 4. Architecture Diagram

```
                    ┌──────────────────────────────────┐
                    │          CLOUDFLARE CDN           │
                    │    (Edge Cache / DDoS / WAF)      │
                    └──────────┬───────────────────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
   ┌──────────────────┐ ┌───────────┐ ┌────────────────┐
   │  MAIN STOREFRONT │ │ PROVIDER  │ │   AFFILIATE    │
   │    (Shopify)      │ │  PORTAL   │ │    PORTAL      │
   │                   │ │(subdomain)│ │ (JS SPA)       │
   │  Liquid Templates │ │  Gated    │ │ partners.*     │
   │  + Vanilla JS     │ │  Access   │ │                │
   └────────┬──────────┘ └───────────┘ └────────────────┘
            │
            ├── Homepage
            │   ├── Hero Banner
            │   ├── Featured Collections
            │   ├── Trust Badges / CTAs
            │   └── Newsletter Signup
            │
            ├── Collection Pages
            │   ├── Product Grid
            │   ├── Filter / Sort
            │   └── Pagination
            │
            ├── Product Detail Pages
            │   ├── Image Gallery
            │   ├── Variant Selector
            │   ├── Add to Cart
            │   ├── Product Description
            │   └── Related Products
            │
            ├── Static Pages
            │   ├── About Us
            │   ├── Contact Form
            │   └── Provider Registration
            │
            └── Cart & Checkout
                ├── AJAX Cart Drawer
                └── Shopify Hosted Checkout
                    │
           ┌────────┼────────┐
           ▼        ▼        ▼
      ┌────────┐┌───────┐┌────────┐
      │Shopify ││Stripe ││Shopify │
      │Payments││  API  ││  CDN   │
      └────────┘└───────┘└────────┘
```

---

## 5. Page-by-Page Breakdown

### 5.1 Homepage (`/`)
| Section              | Description                                         |
|----------------------|-----------------------------------------------------|
| Header               | Logo, navigation menu, cart icon, account link       |
| Hero Banner          | Full-width image/video with CTA button               |
| Featured Collections | Grid of product collection cards                     |
| Product Highlights   | Best sellers or new arrivals carousel                |
| Trust Section        | Lab certifications, purity badges, USP messaging     |
| Footer               | Links, contact info, social media, newsletter signup |

### 5.2 Collection Page (`/collections/{slug}`)
| Section              | Description                                  |
|----------------------|----------------------------------------------|
| Collection Header    | Title, description, banner image             |
| Filter Sidebar       | Filter by type, price, availability          |
| Product Grid         | Product cards (image, title, price, CTA)     |
| Sort Dropdown        | Sort by price, name, date, best-selling      |
| Pagination           | Load more / numbered pages                   |

### 5.3 Product Detail Page (`/products/{slug}`)
| Section              | Description                                  |
|----------------------|----------------------------------------------|
| Image Gallery        | Main image + thumbnails, zoom on hover       |
| Product Info         | Title, price, SKU, availability              |
| Variant Selector     | Dropdown or buttons for product variants     |
| Quantity Selector    | +/- quantity input                           |
| Add to Cart          | Button with AJAX cart drawer                 |
| Description Tabs     | Product details, usage, specifications       |
| Related Products     | "You may also like" product row              |

### 5.4 Provider Registration (`/pages/register`)
| Section              | Description                                  |
|----------------------|----------------------------------------------|
| Registration Form    | Name, email, organization, license number    |
| Verification Info    | Requirements for provider account approval   |
| Submit Button        | Form submission for manual review            |

### 5.5 Contact Page (`/pages/contact`)
| Section              | Description                                  |
|----------------------|----------------------------------------------|
| Contact Form         | Name, email, subject, message                |
| Contact Info         | Phone, email, address                        |
| Business Hours       | Operating hours                              |

### 5.6 About Us (`/pages/about-us`)
| Section              | Description                                  |
|----------------------|----------------------------------------------|
| Company Story        | Mission, history, values                     |
| Lab Info             | USA-based labs, 99%+ purity claims           |
| Team / Certifications| Credentials and trust elements               |

---

## 6. Theme File Structure

```
shopify-theme/
│
├── assets/                          # Static assets
│   ├── theme.css                    # Main stylesheet
│   ├── theme.js                     # Main JavaScript
│   ├── cart.js                      # Cart drawer logic
│   └── variant-selector.js          # Variant switching
│
├── config/                          # Theme settings
│   ├── settings_schema.json         # Theme customizer schema
│   └── settings_data.json           # Saved theme settings
│
├── layout/                          # Layout wrappers
│   └── theme.liquid                 # Main layout (head, header, footer, scripts)
│
├── sections/                        # Modular page sections
│   ├── header.liquid                # Site header + navigation
│   ├── footer.liquid                # Site footer
│   ├── hero-banner.liquid           # Homepage hero
│   ├── featured-collection.liquid   # Homepage collection grid
│   ├── product-template.liquid      # Product detail page
│   ├── collection-template.liquid   # Collection/category page
│   ├── contact-form.liquid          # Contact page form
│   ├── registration-form.liquid     # Provider registration
│   ├── about-content.liquid         # About page content
│   ├── cart-drawer.liquid           # Slide-out cart
│   └── newsletter.liquid           # Email signup section
│
├── snippets/                        # Reusable components
│   ├── product-card.liquid          # Single product card
│   ├── variant-selector.liquid      # Variant picker
│   ├── pagination.liquid            # Page navigation
│   ├── breadcrumb.liquid            # Breadcrumb nav
│   ├── social-icons.liquid          # Social media links
│   └── trust-badges.liquid          # Certification badges
│
├── templates/                       # Page templates (JSON)
│   ├── index.json                   # Homepage
│   ├── product.json                 # Product pages
│   ├── collection.json              # Collection pages
│   ├── page.json                    # Generic static pages
│   ├── page.contact.json            # Contact page
│   ├── page.register.json           # Registration page
│   ├── page.about.json              # About page
│   ├── cart.json                     # Cart page
│   └── 404.json                     # Not found
│
└── locales/                         # Translations
    └── en.default.json              # English strings
```

---

## 7. Third-Party Integrations

| Integration          | Purpose                        | Cost           |
|----------------------|--------------------------------|----------------|
| **Shopify Payments** | Payment processing             | 2.9% + 30¢/txn |
| **Locksmith**        | Provider-gated access control  | ~$12/mo        |
| **GoAffPro**         | Affiliate partner program      | Free–$89/mo    |
| **Checkmate**        | Discount / coupon management   | Varies         |
| **Klaviyo / Mailchimp** | Email marketing (likely)    | Free–$50/mo    |
| **Cloudflare**       | CDN + bot protection           | Free–$20/mo    |
| **Facebook Pixel**   | Social media tracking (likely) | Free           |
| **Google Analytics** | Website analytics (likely)     | Free           |

---

## 8. Access Control & User Roles

```
┌─────────────────────────────────────────────┐
│              ACCESS TIERS                    │
├─────────────────────────────────────────────┤
│                                             │
│  PUBLIC (no login)                          │
│  ├── Homepage                               │
│  ├── About Us                               │
│  ├── Contact                                │
│  └── Provider Registration Form             │
│                                             │
│  VERIFIED PROVIDER (login required)         │
│  ├── Product catalog                        │
│  ├── Product detail pages                   │
│  ├── Cart & Checkout                        │
│  └── Order history                          │
│                                             │
│  AFFILIATE PARTNER (separate portal)        │
│  ├── Referral dashboard                     │
│  ├── Commission tracking                    │
│  └── Marketing materials                    │
│                                             │
│  ADMIN (Shopify admin)                      │
│  ├── Product management                     │
│  ├── Order management                       │
│  ├── Customer approval                      │
│  └── Theme customization                    │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 9. Multi-Portal Architecture

| Portal                     | URL                              | Stack                | Purpose                          |
|----------------------------|----------------------------------|----------------------|----------------------------------|
| **Main Storefront**        | alphabiomedlabs.com              | Shopify + Liquid     | Product browsing & purchasing    |
| **Provider Portal**        | providers.alphabiomedlabs.com    | Shopify B2B / App    | Wholesale access for providers   |
| **Affiliate Portal**       | partners.alphabiomedlabs.com     | JavaScript SPA       | Affiliate tracking & management  |

---

## 10. Build Plan & Timeline

### Phase 1: Foundation (Days 1–3)
- [ ] Set up Shopify store
- [ ] Purchase and install theme
- [ ] Configure brand settings (colors, fonts, logo)
- [ ] Set up navigation menus

### Phase 2: Theme Customization (Days 4–7)
- [ ] Customize homepage sections
- [ ] Build product detail page template
- [ ] Build collection page template
- [ ] Create static page templates (About, Contact, Register)
- [ ] Style cart drawer

### Phase 3: Content & Products (Days 8–10)
- [ ] Add product categories / collections
- [ ] Upload products with images, descriptions, variants
- [ ] Write static page content
- [ ] Add trust badges and certifications

### Phase 4: Access Control & Integrations (Days 11–13)
- [ ] Install and configure Locksmith (provider gating)
- [ ] Set up provider registration workflow
- [ ] Install affiliate app (GoAffPro)
- [ ] Configure payment processing
- [ ] Set up email marketing integration

### Phase 5: QA & Launch (Days 14–15)
- [ ] Mobile responsiveness testing
- [ ] Cross-browser testing
- [ ] Checkout flow testing
- [ ] Performance optimization
- [ ] DNS / domain configuration
- [ ] Go live

**Total estimated timeline: 15 business days (3 weeks)**

---

## 11. Cost Estimate

### One-Time Costs

| Item                        | Cost          |
|-----------------------------|---------------|
| Domain registration         | $15           |
| Shopify theme (premium)     | $0–350        |
| Logo / brand design         | $0–500        |
| Product photography         | $0–1,000      |
| **Subtotal**                | **$15–1,865** |

### Monthly Recurring Costs

| Item                        | Cost/mo       |
|-----------------------------|---------------|
| Shopify plan (Basic–Advanced)| $39–399      |
| Locksmith (access gating)   | $12           |
| Affiliate app               | $0–89         |
| Email marketing app          | $0–50         |
| Cloudflare (free tier)       | $0            |
| **Subtotal**                | **$51–550/mo**|

### Transaction Fees

| Method                      | Fee           |
|-----------------------------|---------------|
| Shopify Payments             | 2.9% + 30¢   |
| Third-party gateway          | + 0.5–2%      |

---

## 12. What Can Be Built Programmatically

### Deliverable by Code (Theme Package)

The entire Shopify theme can be generated as a ready-to-upload ZIP file:

| Component                        | Status    |
|----------------------------------|-----------|
| Layout template (`theme.liquid`) | Buildable |
| Homepage sections                | Buildable |
| Product detail page              | Buildable |
| Collection page                  | Buildable |
| Cart drawer (AJAX)               | Buildable |
| Static page templates            | Buildable |
| Provider registration form       | Buildable |
| Contact form                     | Buildable |
| Header + navigation              | Buildable |
| Footer                           | Buildable |
| Responsive CSS                   | Buildable |
| JavaScript (cart, variants, nav) | Buildable |
| Theme settings schema            | Buildable |
| Localization strings             | Buildable |

### Requires Manual Setup (Not Codeable)

| Component                        | Why                              |
|----------------------------------|----------------------------------|
| Shopify account creation         | Requires browser + payment       |
| App installations                | Requires Shopify admin           |
| Product data entry               | Requires admin + product photos  |
| Payment configuration            | Requires credentials             |
| DNS / domain setup               | Requires registrar access        |
| Provider verification workflow   | Requires business process design |

---

## Summary

This is a **standard Shopify store** with minimal custom development. The architecture is clean, uses battle-tested Shopify patterns, and can be fully replicated in **2–3 weeks** using off-the-shelf tools. The theme codebase itself (Liquid + CSS + JS) can be built programmatically and delivered as a ready-to-install package.

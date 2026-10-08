# ☕ KROMA ROASTERS — Luxury Specialty Micro-Roastery

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live_Experience-kroma--roasters--lizz.lovable.app-d97706?style=for-the-badge&logo=google-chrome&logoColor=white)](https://kroma-roasters-lizz.lovable.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub_Repo-lizzz--dev%2Fkroma--roasters--lizz-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/lizzz-dev/kroma-roasters-lizz)
[![React](https://img.shields.io/badge/React-19.x-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL_3D-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br />

**Artisanal Coffee Engineered For Purists.**  
*A modern sensory web platform blending editorial design, real-time 3D WebGL physics, and fluid micro-interactions.*

[**Explore Live Experience →**](https://kroma-roasters-lizz.lovable.app) • [**View GitHub Repository →**](https://github.com/lizzz-dev/kroma-roasters-lizz)

</div>

---

## 📖 Project Folio & Case Study

> **"Vibe Coding Meets Editorial Craftsmanship."**  
> Developed as **Capstone-01** for the **AI & Data Science Bootcamp at DataCrumbs** under the mentorship of **Sir Abis Syed Hussain**.

### 🎯 The Vision
Standard specialty coffee websites are often predictable: static product grids and repetitive templates. **Kroma Roasters** was engineered to break this convention. Built with an authentic **"vibe coding"** methodology, it pairs rapid AI-assisted engineering velocity with high-taste art direction, bespoke typography hierarchy, interactive 3D WebGL elements, and tactile motion design.

| Metadata | Details |
| :--- | :--- |
| **Creator / Author** | **Leeza Nawaz** ([@lizzz-dev](https://github.com/lizzz-dev)) |
| **Project Type** | Capstone-01 Showcase / Creative Web Experience |
| **Mentorship** | **Sir Abis Syed Hussain** (DataCrumbs) |
| **Primary Focus** | Creative Frontend, 3D WebGL, Micro-interactions, Editorial UI |
| **Live Deployment** | [kroma-roasters-lizz.lovable.app](https://kroma-roasters-lizz.lovable.app) |

---

## ✨ Architectural & Feature Highlights

### 1. ☕ Real-Time 3D WebGL Coffee Experience (`HeroCoffee3D.tsx`)
* **Interactive Physics & Lighting**: Bespoke 3D espresso cup model rendered in real-time via Three.js / Canvas, featuring physical ceramic specular highlights, warm studio rim illumination, and authentic crema viscosity.
* **Cursor Parallax Tracking**: Responsive 3D perspective tilts and subtle orbit tracking mapped dynamically to cursor coordinates.
* **Atmospheric Particle System**: Procedural rising steam particles with organic turbulence, alpha fading, and dissipation effects.

### 2. 🎬 Documentary Film Modal (`FilmModal.tsx`)
* **Cinematic Roasting Teaser**: Integrated video modal featuring *"The Craft of Roasting"* short film teaser with seamless backdrop blur.
* **VIP Early Access Capture**: High-conversion newsletter & tasting screening invitation form with instant client-side validation and toast notifications.

### 3. 🔥 Sensory Roast Explorer & Origin Radar (`RoastFinder.tsx` / `Sections.tsx`)
* **Dynamic Roast Matrix**: Instant profile switching across Light, Medium, and Dark roasts with customized flavor profiles and extraction metrics.
* **Sensory Flavor Breakdown**: Multi-attribute sensory evaluation across Acidity, Body, Sweetness, and Aroma.
* **Transparent Ethical Sourcing**: Micro-lot origin storytelling from Huila (Colombia) and Yirgacheffe (Ethiopia).

### 4. 🌿 Curated Blends & Interactive Brew Guides
* **Artisanal Product Cards**: Interactive single-origin showcase with altitude metrics, varietals, and processing methods (Washed, Natural, Honey).
* **Brew Parameter Guides**: Precision recipe cards highlighting grind size (fine to coarse), water-to-coffee ratios (1:15 to 1:17), temperature thresholds, and pour interval timings.

### 5. 📍 Brew Lab Reservation Engine
* **Private Tasting Inquiries**: Sleek booking form for private cupping sessions, lab table bookings, and wholesale consultations.
* **Tactile Feedback**: Responsive toast notifications (`sonner`) and copy-to-clipboard contact integration.

---

## 🎨 Sensory Design System & Design Tokens

Kroma Roasters uses a warm, sensory dark-mode aesthetic inspired by tactile culinary magazines and specialty roastery environments:

```
┌────────────────────────────────────────────────────────┐
│                      PALETTE SYSTEM                    │
├───────────────┬──────────────┬─────────────────────────┤
│ Canvas Black  │ #0c0a09      │ Deep roasted espresso   │
│ Surface Slate │ #1c1917      │ Smoked cacao / glass    │
│ Amber Gold    │ #d97706      │ Honey & crema accent    │
│ Warm Oat      │ #f5f5f4      │ Editorial typography    │
│ Muted Stone   │ #a8a29e      │ Secondary copy          │
└───────────────┴──────────────┴─────────────────────────┘
```

| Token | Value | Applied Context |
| :--- | :--- | :--- |
| **Canvas Background** | `#0c0a09` | Immersive dark espresso background base |
| **Surface Cards** | `#1c1917` / `rgba(28,25,23,0.65)` | Roasted cacao frosted glass cards (`backdrop-blur-md`) |
| **Border Accents** | `rgba(255,255,255,0.08)` | Crisp 1px luxury separation lines |
| **Brand Accent** | `#d97706` / `#f59e0b` | Golden crema highlights, active pills, and primary CTAs |
| **Primary Text** | `#f5f5f4` | High-legibility warm cream text for headings and hero copy |
| **Muted Copy** | `#a8a29e` | Warm stone neutral for annotations and descriptions |

---

## 🛠️ Technology Stack

```
Frontend Architecture
├── TanStack Start & React 19       # Server-ready modern React runtime
├── TypeScript 5.8                  # Strict type safety and robust contracts
├── Three.js & R3F / Drei           # Real-time WebGL 3D rendering & lighting
├── Tailwind CSS v4                 # Modern utility engine with custom variables
├── Framer Motion                   # Smooth spring transitions & scroll reveals
├── Radix UI Primitives             # Accessible modal, dialog, and slider foundations
├── Sonner                          # Toast notification engine
└── Vite 8                          # Next-generation frontend build tooling
```

---

## 📂 Repository Structure

```text
kroma-roasters-lizz/
├── public/
│   ├── favicon.ico
│   └── assets/                  # Media teasers and brand assets
├── src/
│   ├── components/
│   │   ├── kroma/
│   │   │   ├── HeroCoffee3D.tsx # Real-time 3D WebGL coffee cup & canvas scene
│   │   │   ├── FilmModal.tsx    # Documentary player modal & VIP capture
│   │   │   ├── RoastFinder.tsx  # Dynamic roast selector & sensory radar
│   │   │   └── Sections.tsx     # Hero, Blends, Brew Guides, Story, Contact
│   │   └── ui/                  # Radix UI design primitives
│   ├── routes/
│   │   ├── __root.tsx           # Global layout & metadata
│   │   └── index.tsx            # Main application landing page
│   ├── styles.css               # Design tokens & Tailwind theme layers
│   └── router.tsx               # TanStack router configuration
├── package.json
└── vite.config.ts
```

---

## 🚀 Local Development Setup

To run this project locally on your machine:

### 1. Prerequisites
* **Node.js** (v18.0 or higher recommended)
* **npm** or **pnpm**

### 2. Clone the Repository
```bash
git clone https://github.com/lizzz-dev/kroma-roasters-lizz.git
cd kroma-roasters-lizz
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Navigate to `http://localhost:5173` to explore the interactive experience.

### 5. Build for Production
```bash
npm run build
```

---

## 🗺️ Future Roadmap

- [ ] **Interactive Flavor Matcher Quiz**: AI-assisted recommendation engine to pair brew methods with single-origin beans.
- [ ] **Direct E-Commerce Integration**: Seamless Stripe checkout for limited micro-lot drops.
- [ ] **Roaster Subscription Portal**: Recurring delivery cadence manager with customizable tasting notes.
- [ ] **Brew Lab Workshop Booking**: Live calendar reservation integration for in-person cupping sessions.

---

## 🤝 Mentorship & Acknowledgments

* **Instructor & Mentor**: **Sir Abis Syed Hussain** for his visionary mentorship, design critiques, and inspiration throughout the bootcamp.
* **Bootcamp**: **DataCrumbs AI & Data Science Bootcamp** for fostering creative engineering excellence.
* **Platform**: Created with velocity on **Lovable.dev**.

---

## 👩‍💻 Author & Connect

**Leeza Nawaz**  
*Creative Frontend & AI Engineer*

* **GitHub**: [@lizzz-dev](https://github.com/lizzz-dev)
* **Repository**: [lizzz-dev/kroma-roasters-lizz](https://github.com/lizzz-dev/kroma-roasters-lizz)
* **Live App**: [kroma-roasters-lizz.lovable.app](https://kroma-roasters-lizz.lovable.app)

---

<div align="center">
  <sub>Crafted with passion, coffee, and code by Leeza Nawaz. © 2026 Kroma Roasters.</sub>
</div>

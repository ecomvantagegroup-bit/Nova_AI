# Nova AI — Premium AI Startup Landing Page

> ⚠️ **Demo project only.** Nova AI is a fictional company and this site is a portfolio demonstration. It is not a real product or service. The company, testimonials, pricing, team details, statistics and contact information are placeholder content, and no real transactions, sign-ups or messages are processed.

A dark, premium, single-page landing site for **Nova AI**, a fictional AI startup that helps businesses automate workflows with autonomous AI agents. It is a demo built by **Vantage Digital** to show the quality, design, animation and user experience clients get with the **Base Launch Package**, with no paid add-ons.

**🔗 Live demo:** [https://nova-ai-8da.pages.dev/](https://nova-ai-8da.pages.dev/)

---

## Project Information

| Property     | Value                                 |
| ------------ | ------------------------------------- |
| Project Name | Nova AI                               |
| Industry     | AI Startup                            |
| Type         | Single Page Application (SPA)         |
| Package      | Base Launch                           |
| Framework    | Vue 3 + Vite 8 (JSX components)       |
| Styling      | Tailwind CSS 4 + per-component CSS    |
| Animation    | GSAP (ScrollTrigger, Flip)            |
| 3D           | Three.js                              |
| Hosting      | Cloudflare Pages                      |
| Status       | Demo Project                          |

---

## Highlights

- Dark premium interface with glowing cyan / blue / purple gradients
- Interactive Three.js particle orb in the hero that follows the mouse
- GSAP scroll-triggered reveals, character-by-character headings and staggered entrances
- Feature cards that expand into a modal using GSAP Flip
- Pricing with a Monthly / Yearly toggle and animated price changes
- Animated FAQ accordion and an animated contact form with a success state
- Responsive layout with a mobile menu and a navbar that changes on scroll
- Smooth anchor scrolling between sections

---

## Page Sections

The page is assembled in `src/App.jsx` in this order:

| #  | Section      | Anchor          | What it contains                                                                                          |
| -- | ------------ | --------------- | --------------------------------------------------------------------------------------------------------- |
| 1  | Navbar       | (fixed header)  | Blur-on-scroll bar, desktop links, animated mobile dropdown                                               |
| 2  | Hero         | `#hero`         | Headline, description, "Start a Project" / "Learn More" buttons, Three.js particle orb                     |
| 3  | Features     | `#features`     | Six cards: AI Chatbots, Workflow Automation, Knowledge Search, Voice AI, Predictive Analytics, Enterprise Security |
| 4  | About Story  | `#about`        | Scroll-driven story: autonomous intelligence, resilience, multi-agent core, feedback loops, road to AGI  |
| 5  | Workflow     | `#workflow`     | Four-step timeline: Idea & Architecture, Model Training, Edge Deployment, Full Automation                 |
| 6  | Testimonials | `#testimonials` | Review cards with name, role, company, star rating and quote                                              |
| 7  | Pricing      | `#pricing`      | Starter, Professional (most popular) and Enterprise plans with a monthly / yearly switch                  |
| 8  | FAQ          | `#faq`          | Accordion covering agents, deployment, execution limits, billing and SLAs                                 |
| 9  | Contact      | `#contact`      | Company info and a form (name, email, use case, message)                                                  |
| 10 | Footer       | `#footer`       | Logo, link columns, social icons, copyright                                                               |

> The contact form is a front-end demo: submission is simulated with a short delay and a success message, and nothing is sent to a server. Several footer links are placeholders.

---

## Technology Stack

| Area        | Tools                                                    |
| ----------- | -------------------------------------------------------- |
| Framework   | Vue 3 (JSX via `@vitejs/plugin-vue-jsx`), Vite 8         |
| Language    | JavaScript (JSX components) with TypeScript tooling (`vue-tsc`) |
| Styling     | Tailwind CSS 4 (`@tailwindcss/vite`) and component CSS   |
| Animation   | GSAP, ScrollTrigger, Flip                                |
| 3D Graphics | Three.js (custom particle system)                        |
| Icons       | `@lucide/vue`                                            |
| Routing     | `vue-router` (installed, no routes defined yet)          |
| Tooling     | ESLint, Prettier, Vue DevTools plugin                    |

**Requirements:** Node.js `^22.18.0` or `>=24.12.0`.

---

## Design

### Color palette

| Purpose            | Value                                             |
| ------------------ | ------------------------------------------------- |
| Background         | `#020617` (Tailwind slate-950)                    |
| Secondary surface  | `#0F172A` (Tailwind slate-900)                    |
| Text               | `#F8FAFC`                                         |
| Accents            | Cyan, blue, purple and emerald gradients          |

### Typography

Body text uses **Inter** with a system font fallback stack.

### Hero 3D orb

The hero renders a particle orb with `THREE.Points`. The mouse position is smoothed with interpolation and drives the orb's rotation, on top of a slow continuous spin.

---

## Getting Started

All commands run inside the `nova_ai/` folder.

```bash
git clone https://github.com/ecomvantagegroup-bit/Nova_AI.git
cd Nova_AI/nova_ai
npm install
npm run dev
```

### Scripts

| Command              | Description                                  |
| -------------------- | -------------------------------------------- |
| `npm run dev`        | Start the Vite dev server                    |
| `npm run build`      | Type-check, then build for production        |
| `npm run build-only` | Build without type-checking                  |
| `npm run type-check` | Run `vue-tsc`                                |
| `npm run preview`    | Preview the production build locally         |
| `npm run format`     | Format `src/` with Prettier                  |
| `npm run deploy`     | Publish `dist/` with `gh-pages`              |

---

## Project Structure

```text
Nova_AI/
├── .github/workflows/deploy.yml   # Optional GitHub Pages deploy
├── favicon.png
├── package.json
└── nova_ai/                       # The application
    ├── index.html
    ├── vite.config.ts
    ├── tsconfig*.json
    ├── public/
    │   └── favicon.jpg
    └── src/
        ├── main.jsx               # App entry
        ├── App.jsx                # Section layout
        ├── style.css              # Tailwind import and global styles
        ├── router/router.jsx
        └── components/
            ├── navbar/
            ├── hero/              # hero.jsx, hero_canvas.jsx (Three.js)
            ├── features/          # features.jsx, featuresCards.jsx
            ├── about/             # aboutstory.jsx
            ├── workflow/
            ├── testimonials/
            ├── pricing/
            ├── faq/
            ├── contacts/
            └── footer/
```

Each component folder holds a `.jsx` file and, where needed, a matching `.css` file.

---

## Deployment

The live demo is hosted on **Cloudflare Pages**: [https://nova-ai-8da.pages.dev/](https://nova-ai-8da.pages.dev/)

Recommended Cloudflare Pages build settings:

| Setting                | Value           |
| ---------------------- | --------------- |
| Root directory         | `nova_ai`       |
| Build command          | `npm run build` |
| Build output directory | `dist`          |
| Node.js version        | 22 or newer     |

`vite.config.ts` uses `base: '/'`, which is correct for Cloudflare Pages and custom domains.

> The repo also contains `.github/workflows/deploy.yml`, which builds and deploys to GitHub Pages on every push to `main`. It is a secondary option. If you only use Cloudflare, you can delete the workflow. If you keep GitHub Pages, serving from a project path such as `/Nova_AI/` requires changing `base` to `'/Nova_AI/'`.

---

## Browser Support

Latest stable versions of Chrome, Edge, Firefox and Safari.

---

## Future Expansion

The demo intentionally excludes paid add-ons, but the structure supports later additions such as:

- CMS integration and a blog
- Newsletter and analytics
- Real form submission (email service or API)
- Booking system
- Multi-language support
- Additional landing pages and routes

---

## License

This project is a portfolio demonstration created by **Vantage Digital** to showcase premium website design and frontend development capabilities. It is intended **for demonstration and client presentation purposes only** and is not a live commercial product. Nova AI, its pricing, testimonials and all other content are fictional.

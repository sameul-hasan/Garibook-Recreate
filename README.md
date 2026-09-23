# Garibook Homepage — React Recreation

A responsive, component-based recreation of the [garibook.com](https://garibook.com/)
homepage, built with **React + Vite**, styled with **Tailwind CSS v4** and animated
with **GSAP** — in both English and বাংলা, using the live site's own copy, media
and statistics.

Built as a frontend assessment. Only the homepage is in scope.

---

## Quick start

**Requirements:** Node.js 18 or newer (developed on 20.x) and npm.

```bash
npm install      # install dependencies
npm run dev      # start the dev server → http://localhost:5173
```

Other scripts:

```bash
npm run build    # production bundle into dist/
npm run preview  # serve the production build locally
```

No environment variables, API keys or backend are required — every asset is
served from `public/`, so the project runs offline straight after `npm install`.

---

## Tech stack

| | |
| --- | --- |
| **React 18** | function components + hooks, no class components |
| **Vite 5** | dev server and build tool |
| **Tailwind CSS v4** | utility styling, configured entirely in CSS via `@theme` |
| **GSAP 3 + ScrollTrigger** | all scroll and entrance animation |

There is no CSS framework beyond Tailwind, no UI kit, and no state library — the
page's state is local to the components that own it.

---

## Project structure

```
src/
  App.jsx               composes the sections in page order
  main.jsx              entry point, wraps the app in <LanguageProvider>

  components/           reusable UI, no page-specific knowledge
    Navbar.jsx            sticky header + full-screen mobile drawer
    Button.jsx            the site's CTA (renders <a> or <button>)
    Field.jsx             labelled booking field + shared input/select classes
    SectionHeading.jsx    section title, incl. the masked line-reveal markup
    CarouselArrows.jsx    prev/next controls
    ScrollToTop.jsx       back-to-top button
    LiveChat.jsx          floating live-chat widget (UI only, no backend)
    icons.jsx             inline SVG icon set (no icon-font dependency)

  sections/             one file per band of the page, in page order
    Hero.jsx  BookingWidget.jsx  StatsBand.jsx  Services.jsx  Freedom.jsx
    PeopleTogether.jsx  BookingToArrival.jsx  SmartDriver.jsx  Newsroom.jsx
    PassengerStories.jsx  Blogs.jsx  DownloadApp.jsx  Footer.jsx

  hooks/
    useSectionAnimation.js  one GSAP scroll scope per section (see below)
    useCountUp.js           number counts up when scrolled into view
    useTypewriter.js        hero headline typing effect
    useCarousel.js          scroll-snap carousel controller

  i18n/
    en.js  bn.js            every translatable string, one shared key shape
    LanguageContext.jsx     provider + useLanguage() / useT() hooks

  lib/
    gsap.js                 GSAP + ScrollTrigger registration, reduced-motion helper
    classes.js              shared class strings (container, section rhythm, …) + cx()

  data/content.js         media, links, and CMS-shaped data
  styles/global.css       the only stylesheet: Tailwind import, @theme tokens, base layer

public/
  assets/                 images and icons
  fonts/                  Li Ador Noirrit (Bangla), 4 weights
```

**Why it's split this way.** `sections/` are page-specific and used once each;
`components/` are generic and reused across sections. Anything that appears in
more than one section (a class string, an icon, a hook) moves out of the section
and into `lib/`, `components/` or `hooks/` — so no class string or markup
pattern is defined twice.

Each section is self-contained: it owns its own markup, its own animation scope
and its own state. `App.jsx` just lists them in order, which makes the page easy
to reorder or extend.

---

## Animations (GSAP)

`useSectionAnimation` is **one animation scope per section**. A section spreads
its ref, and everything inside is driven by data attributes — so adding a new
animated element never means writing another hook:

| attribute | effect |
| --- | --- |
| `data-reveal` | fade + rise, staggered in DOM order |
| `data-reveal-mask` | line wipes up from behind its own clip edge |
| `data-reveal-clip` | image wipe, revealed top to bottom |
| `data-parallax="8"` | drifts ±N% of its height, scrubbed to scroll |

Everything is wrapped in `gsap.context()` and reverted on unmount, so nothing
leaks between renders or language switches.

On the page that adds up to eight distinct animations:

1. **Hero entrance timeline** — headline, copy and CTA ease in as a staggered
   timeline on first paint.
2. **Hero scroll drift** — a second, scrubbed timeline lifts and fades the hero
   as it scrolls away behind the booking card.
3. **Masked heading reveals** — each section title is split into lines that wipe
   up one after another from behind their own edge (18 lines page-wide).
4. **Scroll reveals** — cards, list items and buttons stagger in per section
   (37 elements).
5. **Stat counters** — the four figures count up from zero on first view.
6. **Image parallax** — 10 images drift against the scroll: the Freedom banner,
   the three "People Together" cards, the five-tile arrival mosaic (alternating
   direction so it doesn't move as one slab) and the Smart Driver phone.
7. **Clip reveal** — the Freedom banner wipes open top to bottom.
8. **Service panel cross-fade** — the tab panel fades and lifts on every switch.

Supporting CSS motion, from keyframes registered in `@theme`: the looping city
skyline behind the stats (`animate-city`), the typewriter caret (`animate-blink`),
the sticky header drop-in (`animate-slide-down`), plus hover transitions.

**Accessibility:** every GSAP hook checks `prefers-reduced-motion` and renders
the final state immediately instead of animating.

---

## Bilingual (English / বাংলা)

The header toggle switches the whole page, matching the reference site.

- `i18n/en.js` and `i18n/bn.js` hold every translatable string in the same key
  shape, so a missing translation is a visible mistake rather than a silent one.
- `LanguageProvider` persists the choice to `localStorage`, restores it before
  first paint, and keeps `<html lang>` in sync for screen readers.
- Bangla renders in **Li Ador Noirrit**, the typeface the reference site uses,
  self-hosted in four weights.
- Where the original deliberately leaves copy in English (the Business / Club /
  VMS panels, "Pickup Date & Time", the partner blocks, the trade licence line)
  this build does the same, and marks those elements `lang="en"`.
- Content keeps its own language: a Bangla newsroom card stays in Bangla type
  even while the page is set to English — as on the original.

---

## Interactions

- **Booking widget** — Car Rental / Airport Rental tabs, each a controlled form.
  *Hourly* swaps the drop-off field for a duration picker, *Round Way* adds a
  return-date field, and on the airport tab *From Airport / From Home* flips
  which leg of the trip the airport belongs to.
- **Services tabs** — Rides shows the four-card grid; Business, Club and VMS
  share a split text/image layout and replay their reveal on switch.
- **Sticky header** — pins with a shadow past 120px of scroll.
- **Mobile drawer** — full-screen blue off-canvas menu, body-scroll lock, Escape
  to close, and `inert` while closed so its links stay out of the tab order.
- **Passenger stories** — YouTube testimonials; the iframe mounts only on click,
  so no third-party script loads on first paint.
- **Carousels** — newsroom and passenger rows scroll-snap, with arrows that
  disable at each end.
- **Back to top** — appears past 400px of scroll, stacked above the chat bubble.
- **Live chat** — the floating support widget: a blue bubble that opens a panel
  with name, dialling-code + mobile, and query fields. Escape closes it, and the
  fields are a controlled form. It is **presentation only** — there is no support
  backend here, so submitting acknowledges in place and nothing leaves the page.
- Hover and `:focus-visible` states throughout.

---

## Responsiveness

Verified with **no horizontal overflow at 360, 390, 600, 768, 900, 1024, 1280,
1440 and 1920px — in both languages**.

Notable adaptations:

- The booking grid goes 4 → 2 → 1 fields per row; its column dividers live on
  the grid container (`md:[&>div:nth-child(odd)]:border-r-2`) so they follow the
  reflow automatically instead of being passed in per field.
- Service and blog grids reflow 4 → 2 → 1; the primary nav moves into the
  drawer below `xl`.
- Headings use `clamp()` on custom `--text-*` tokens, so type scales smoothly
  rather than jumping at breakpoints.
- The closing download card is the one place an element deliberately breaks its
  container: the phone mockup is absolutely positioned against an
  `overflow-visible` card so it bleeds past the top and bottom edges, with the
  copy capped per breakpoint so the two never collide. Below `md` the phone
  drops underneath the text instead.

---

## Design tokens

Colours and the type scale were sampled from the production stylesheet and
declared in Tailwind's `@theme`, so they work as ordinary utilities
(`bg-gb-primary`, `text-display`, `max-w-gb`, `ease-gb`, `animate-city`):

| Token | Value | Use |
| --- | --- | --- |
| `--color-gb-primary` | `#0e52ff` | brand blue: buttons, active states |
| `--color-gb-primary-dark` | `#0038c4` | stats gradient |
| `--color-gb-primary-soft` | `#f5f8ff` | service cards |
| `--color-gb-yellow` | `#fdd300` | hero CTA |
| `--color-gb-yellow-text` | `#efc30c` | stat numbers, Smart Driver panel |
| `--color-gb-ink` | `#121212` | body text |
| `--color-gb-muted` / `-2` | `#6d6d6d` / `#9d9d9d` | supporting copy |

Typography is Montserrat, as on the reference site.

There is exactly one stylesheet. Everything else is Tailwind utilities in the
markup, with a single `@utility` (the select chevron, whose inline SVG contains
characters Tailwind's class scanner cannot parse as an arbitrary value).

---

## Content and assets

The homepage's dynamic sections are served from `api.garibookadmin.com`, which
the client bundle never names — the endpoints were found by observing the live
page's own network requests:

| endpoint | feeds |
| --- | --- |
| `/web/get/newsrooms` | the six press cards |
| `/web/get/passenger-speaks` | the three passenger video stories |
| `/web/get/blogs` | the three latest blog posts |

So the content is real rather than lorem ipsum: genuine press coverage with
outlet logos and working article links, the three real YouTube passenger
testimonials, the latest blog posts, the published statistics (300,000+ trip
requests, 850,000+ customers, 35,000+ drivers, 64 districts), and the three hero
phrases in both languages.

`src/data/content.js` mirrors the API response shape, so swapping these fixtures
for a live `fetch` would only touch that one file.

Every image — CMS photography, outlet logos, YouTube thumbnails, the Bangla font
— is downloaded into `public/`, so the page makes **no third-party requests at
runtime**.

> **Attribution.** This is an unaffiliated educational recreation built for a
> frontend assessment. All branding, imagery, fonts and copy belong to Garibook
> / NRB Solution Ltd. and are reproduced here only to demonstrate front-end
> implementation. Not for production or commercial use.

---

## Scope notes

- Homepage only, as the brief specifies. Nav and footer links point at the real
  routes but those pages are not implemented.
- The booking form is a complete controlled form with working conditional
  fields; there is no backend, so submitting reports the collected payload
  instead of searching. The same applies to the live-chat form.
- The live-chat widget is rebuilt as a local React component rather than loading
  the third-party script the real site uses, so the page still makes no
  third-party requests. It has no backend and sends nothing.
# Garibook-Recreate

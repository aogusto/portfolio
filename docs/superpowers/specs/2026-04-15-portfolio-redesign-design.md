# Portfolio Redesign — Design Spec

**Date:** 2026-04-15
**Goal:** Complete redesign focused on personal branding / online presence
**Style:** Glassmorphism + Bento Grid hero, dark/indigo palette, side navigation with labels

---

## 1. Goals & Constraints

- **Primary goal:** Personal branding — position Augusto as a founder/builder, not just a dev
- **Scope:** Complete redesign — visual identity, structure, and new sections all open to change
- **Stack stays:** Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion (no new dependencies unless necessary)
- **Projects:** Only real products (Varyonn, Pokett) — quality over quantity

---

## 2. Visual Identity

### Palette

| Token            | Value                    | Usage                    |
| ---------------- | ------------------------ | ------------------------ |
| `--background`   | `#050508`                | Page background          |
| `--surface`      | `rgba(255,255,255,0.03)` | Glass card base          |
| `--border`       | `rgba(255,255,255,0.07)` | Card borders             |
| `--primary`      | `#6366f1`                | Accent (indigo)          |
| `--primary-soft` | `rgba(99,102,241,0.12)`  | Card tints               |
| `--primary-text` | `#a5b4fc`                | Accent text, tags        |
| `--violet`       | `#8b5cf6`                | Secondary accent         |
| `--status-green` | `#22c55e`                | Online/status badge only |
| `--foreground`   | `#f5f5f5`                | Main text                |
| `--muted`        | `rgba(255,255,255,0.4)`  | Secondary text           |

### Typography

- **Font:** Keep Montserrat (already loaded)
- **Hero name:** `font-weight: 800`, `letter-spacing: -0.02em`, large size (`text-5xl` → `text-7xl`)
- **Section labels:** `text-xs`, `letter-spacing: 0.2em`, `text-transform: uppercase`, indigo color
- **Body:** `text-sm`, `leading-relaxed`, muted color

### Glass card style

```css
background: rgba(255, 255, 255, 0.03);
border: 1px solid rgba(255, 255, 255, 0.07);
border-radius: 14px;
backdrop-filter: blur(12px);
```

Accent cells get a colored tint: `rgba(99,102,241,0.07)` (indigo) or `rgba(139,92,246,0.07)` (violet).

### Background blobs

Replace the 3 current green aurora blobs in `globals.css` with 2 blobs: indigo (`#6366f1`) top-left and violet (`#8b5cf6`) bottom-right. Same animation keyframes, new colors and opacities.

---

## 3. Layout & Structure

### Side Navigation (new component: `SideNav.tsx`)

- Fixed to the left edge of the viewport, full height
- Width: ~60px on desktop, hidden on mobile (hamburger or removed)
- Content: monogram "AR" at top, then 5 nav dots with labels below them
- Active dot: larger, indigo glow (`box-shadow: 0 0 10px rgba(99,102,241,0.7)`)
- Scroll spy: detects which section is in viewport via `IntersectionObserver`, updates active dot
- Labels: `font-size: 7px`, `letter-spacing: 0.1em`, uppercase, visible always

Sections (in order):

1. HERO
2. SOBRE
3. EXP.
4. PROJ.
5. CONTATO

### Page sections

All sections: `max-width: none` (full width minus side nav), `padding: 28px 40px` (desktop).

---

## 4. Sections

### 4.1 Hero — Bento Grid

Replaces current linear hero (removes typing animation, Lottie avatar, and photo reveal).

**Grid:** `grid-template-columns: 2fr 1fr 1fr`, `grid-template-rows: auto auto`, `gap: 10px` (desktop). On mobile: single column stack.

**5 cells:**

| Cell                    | Grid position   | Content                                              |
| ----------------------- | --------------- | ---------------------------------------------------- |
| Name + bio + stack tags | col 1, rows 1-2 | Name (`font-weight: 800`), tagline, 3 tech pill tags |
| Profile photo           | col 2, row 1    | Circular photo, indigo border/glow                   |
| Status badge            | col 3, row 1    | Green dot, "Building Varyonn"                        |
| Social links            | col 2, row 2    | GitHub ↗, LinkedIn ↗ (text links)                  |
| CI/CD                   | col 3, row 2    | "Vercel · Railway · Cloud Build"                     |

Background: 2 radial gradient blobs (indigo top-left, violet bottom-right), z-index below cells.

Framer Motion: each cell animates in with `initial={{ opacity: 0, y: 16 }}` → `animate={{ opacity: 1, y: 0 }}` with staggered `delay` (0.05s per cell). Hover: subtle `y: -2`, border brightens slightly.

### 4.2 About (new section)

Short personal text — 2–3 sentences. Who Augusto is beyond code: his drive, why he co-founded Varyonn, what he wants to build. No title cards or icons — just strong typography.

Placeholder text (Augusto fills in): _"Sou desenvolvedor frontend e co-fundador da Varyonn. Gosto de construir produtos que fazem sentido — desde a arquitetura até a experiência do usuário. Meu foco é em performance, escalabilidade e design que comunica."_

### 4.3 Experience

Keep existing data (Varyonn, Napp, Maker). Redesign the cards:

- Glass card style (see §2)
- Timeline layout for Napp (current role + previous role) — keep the animated pulse on the vertical line but recolor to indigo
- Remove the green glow on hover; replace with indigo: `box-shadow: 0 0 0 1px rgba(99,102,241,0.25), 0 0 24px rgba(99,102,241,0.07)`
- Date badge: indigo instead of green (`bg-primary/10 border-primary/20` → indigo equivalents)

### 4.4 Projects

Keep Varyonn and Pokett. Redesign cards:

- Glass cards, indigo tint for Varyonn, violet tint for Pokett
- Add a 1-line "what it is" subtitle under the project name
- Keep the external link arrow
- Hover: `y: -3`, indigo border glow

### 4.5 Contact

Simplify to 3 buttons in a row: GitHub, LinkedIn, Currículo. Glass button style. Currículo gets indigo accent. Remove TechnologyCard usage here.

---

## 5. Component Changes

| Component             | Change                                                                                               |
| --------------------- | ---------------------------------------------------------------------------------------------------- |
| `globals.css`         | Replace green aurora blobs with indigo/violet. Update CSS vars.                                      |
| `page.tsx`            | Remove typing animation, Lottie, photo reveal. Add bento hero. Add About section. Add `<SideNav />`. |
| `ExperienceCard.tsx`  | Update colors (green → indigo). Keep timeline logic.                                                 |
| `ProjectCard.tsx`     | Update colors, add subtitle prop.                                                                    |
| `TechnologyCard.tsx`  | Delete — replaced by inline pill tags in the bento hero. No longer used anywhere.                    |
| `CursorBlinker.tsx`   | Delete — no longer needed.                                                                           |
| `WaveLinesCanvas.tsx` | Keep — update spotlight color from green to indigo (`rgba(99,102,241,0.09)`).                        |
| `SideNav.tsx`         | **New component.** Fixed side nav with scroll spy.                                                   |

---

## 6. Responsive Behavior

- **Desktop (lg+):** Side nav visible, bento grid 3-col, full layout.
- **Tablet (md):** Side nav hidden, top header with links instead, bento grid 2-col.
- **Mobile (sm):** No nav (removed entirely — page is short enough to scroll freely), bento cells stack vertically, single column.

---

## 7. Animations (Framer Motion)

- **Hero cells:** Staggered fade-up on mount (0.05s delay per cell)
- **Section entrance:** `whileInView` fade-up for each section heading and cards
- **Card hover:** `y: -2`, border color shift (via CSS transition)
- **Side nav dot:** Scale + glow on active state, smooth transition
- **Remove:** Typing animation, Lottie, photo reveal sequence

---

## 8. Out of Scope

- Blog / notes section
- GitHub activity / open source showcase
- Dark/light mode toggle
- Contact form (email form)
- i18n (PT/EN toggle)

# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the portfolio with a Glassmorphism + Bento Grid hero, dark/indigo palette, side navigation with scroll spy, and a new About section — positioning Augusto as a founder/builder.

**Architecture:** One-page Next.js app with a new fixed `SideNav` component using `IntersectionObserver` for scroll spy. The hero section is replaced with a 5-cell bento grid. All green accents are replaced with indigo (#6366f1) and violet (#8b5cf6). Framer Motion is kept for staggered entry animations and hover effects.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion

**Spec:** `docs/superpowers/specs/2026-04-15-portfolio-redesign-design.md`

---

## File Map

| File                                     | Action  | Responsibility                                      |
| ---------------------------------------- | ------- | --------------------------------------------------- |
| `src/app/globals.css`                    | Modify  | CSS vars, aurora blobs → indigo/violet              |
| `src/app/components/WaveLinesCanvas.tsx` | Modify  | Cursor spotlight green → indigo                     |
| `src/app/components/SideNav.tsx`         | Create  | Fixed side nav, scroll spy via IntersectionObserver |
| `src/app/page.tsx`                       | Rewrite | Bento hero, About section, updated layout, SideNav  |
| `src/app/components/ExperienceCard.tsx`  | Modify  | Green → indigo colors                               |
| `src/app/components/ProjectCard.tsx`     | Modify  | Green → indigo, add `subtitle` prop                 |
| `src/app/components/CursorBlinker.tsx`   | Delete  | No longer used                                      |
| `src/app/components/TechnologyCard.tsx`  | Delete  | Replaced by inline pill tags                        |

---

## Task 1: Update CSS variables and aurora blobs

**Files:**

- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace CSS vars and blob styles**

Replace the entire `:root` block and all `.aurora-blob-*` rules with the new palette and 2 blobs (indigo + violet):

```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #050508;
  --foreground: #f5f5f5;
  --primary: #6366f1;
  --primary-soft: rgba(99, 102, 241, 0.12);
  --primary-text: #a5b4fc;
  --violet: #8b5cf6;
  --secondary: #0d0d14;
  --muted: rgba(255, 255, 255, 0.4);
  --shadow: #1a1a2e;
  --status-green: #22c55e;
}

html {
  scroll-behavior: smooth;
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: Montserrat, sans-serif;
}

svg {
  display: block;
  height: 100%;
  width: 100%;
}

/* ── Aurora blobs ── */
.aurora-blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.aurora-blob-1 {
  width: 700px;
  height: 700px;
  background: radial-gradient(
    circle,
    #6366f1 0%,
    #4f46e5 60%,
    transparent 100%
  );
  filter: blur(120px);
  opacity: 0.12;
  top: -200px;
  left: -150px;
  animation: aurora-drift-1 22s ease-in-out infinite alternate;
}

.aurora-blob-2 {
  width: 550px;
  height: 550px;
  background: radial-gradient(
    circle,
    #8b5cf6 0%,
    #7c3aed 60%,
    transparent 100%
  );
  filter: blur(100px);
  opacity: 0.1;
  bottom: -100px;
  right: -100px;
  animation: aurora-drift-2 28s ease-in-out infinite alternate;
}

@keyframes aurora-drift-1 {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(180px, 120px) scale(1.08);
  }
  66% {
    transform: translate(80px, 260px) scale(0.95);
  }
  100% {
    transform: translate(220px, 60px) scale(1.05);
  }
}

@keyframes aurora-drift-2 {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(-140px, -100px) scale(1.12);
  }
  66% {
    transform: translate(-60px, -200px) scale(0.92);
  }
  100% {
    transform: translate(-180px, -50px) scale(1.06);
  }
}
```

Note: Remove the third blob entirely (`.aurora-blob-3` class and `@keyframes aurora-drift-3` are deleted). In `WaveLinesCanvas.tsx`, the third `<div className="aurora-blob aurora-blob-3" />` will be removed in Task 2.

- [ ] **Step 2: Verify build passes**

```bash
cd /home/augustoribeiro/espaco/portfolio && npm run build
```

Expected: Compiled successfully (or only pre-existing warnings).

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "style: update palette to indigo/violet, replace aurora blobs"
```

---

## Task 2: Update WaveLinesCanvas spotlight color

**Files:**

- Modify: `src/app/components/WaveLinesCanvas.tsx`

- [ ] **Step 1: Replace spotlight color and remove third blob**

```tsx
'use client';
import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface WaveLinesCanvasProps {
  children?: React.ReactNode;
}

const SPOTLIGHT_SIZE = 800;

const WaveLinesCanvas: React.FC<WaveLinesCanvasProps> = ({ children }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 25 });

  const spotlightX = useTransform(springX, (x) => x - SPOTLIGHT_SIZE / 2);
  const spotlightY = useTransform(springY, (y) => y - SPOTLIGHT_SIZE / 2);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden">
      {/* ── Aurora blobs – ambient layer ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
      </div>

      {/* ── Cursor spotlight ── */}
      <motion.div
        className="fixed z-0 pointer-events-none rounded-full"
        style={{
          width: SPOTLIGHT_SIZE,
          height: SPOTLIGHT_SIZE,
          top: 0,
          left: 0,
          x: spotlightX,
          y: spotlightY,
          background:
            'radial-gradient(circle, rgba(99,102,241,0.09) 0%, rgba(99,102,241,0.03) 45%, transparent 70%)',
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default WaveLinesCanvas;
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: Compiled successfully.

- [ ] **Step 3: Commit**

```bash
git add src/app/components/WaveLinesCanvas.tsx
git commit -m "style: update cursor spotlight to indigo, remove third aurora blob"
```

---

## Task 3: Create SideNav component

**Files:**

- Create: `src/app/components/SideNav.tsx`

This component is a fixed left sidebar with 5 nav dots + labels. It uses `IntersectionObserver` to detect which section is in view and highlights the corresponding dot.

- [ ] **Step 1: Create the component**

```tsx
'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SECTIONS = [
  { id: 'hero', label: 'HERO' },
  { id: 'about', label: 'SOBRE' },
  { id: 'experience', label: 'EXP.' },
  { id: 'projects', label: 'PROJ.' },
  { id: 'contact', label: 'CONTATO' },
] as const;

const SideNav = () => {
  const [active, setActive] = useState<string>('hero');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.4 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed left-0 top-0 h-full z-50 hidden lg:flex flex-col items-center w-[60px] py-8 gap-0 bg-white/[0.015] border-r border-white/[0.05]">
      {/* Monogram */}
      <span
        className="text-white/20 text-[8px] tracking-[0.15em] uppercase mb-8"
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
      >
        AR
      </span>

      {/* Dots */}
      <div className="flex flex-col items-center gap-6 flex-1 justify-center">
        {SECTIONS.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="flex flex-col items-center gap-1 group cursor-pointer bg-transparent border-0 p-0"
              aria-label={label}
            >
              <motion.div
                animate={
                  isActive
                    ? {
                        scale: 1.3,
                        backgroundColor: '#6366f1',
                        boxShadow: '0 0 10px rgba(99,102,241,0.7)',
                      }
                    : {
                        scale: 1,
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        boxShadow: 'none',
                      }
                }
                transition={{ duration: 0.2 }}
                className="rounded-full"
                style={{ width: 6, height: 6 }}
              />
              <span
                className="text-[7px] tracking-[0.1em] uppercase transition-colors duration-200"
                style={{
                  color: isActive ? '#a5b4fc' : 'rgba(255,255,255,0.2)',
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default SideNav;
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npm run build
```

Expected: Compiled successfully (SideNav not yet mounted — no warnings expected).

- [ ] **Step 3: Commit**

```bash
git add src/app/components/SideNav.tsx
git commit -m "feat: add SideNav component with IntersectionObserver scroll spy"
```

---

## Task 4: Rewrite page.tsx — hero bento grid

**Files:**

- Modify: `src/app/page.tsx`

This task replaces the entire hero section (typing animation, Lottie, photo reveal) with the bento grid. The rest of the page sections remain temporarily unchanged (updated in later tasks). We also add `<SideNav />` and section `id` attributes.

- [ ] **Step 1: Replace page.tsx hero section and add SideNav**

```tsx
'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import SideNav from '@/app/components/SideNav';
import ExperienceCard from '@/app/components/ExperienceCard';
import ProjectCard from '@/app/components/ProjectCard';

// Stagger helper: each bento cell fades up with a small delay
const cell = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut', delay },
});

export default function Home() {
  return (
    <>
      <SideNav />

      {/* offset main content from the fixed side nav on desktop */}
      <div className="flex flex-col lg:pl-[60px]">
        {/* ── HERO ── */}
        <section
          id="hero"
          className="min-h-screen max-w-5xl mx-auto w-full px-6 lg:px-12 flex items-center py-20 lg:py-0"
        >
          {/* Bento grid: 3 cols × 2 rows on desktop, stacked on mobile */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 grid-rows-auto gap-3">
            {/* Cell 1 (col 1, rows 1-2): name + tagline + stack pills */}
            <motion.div
              {...cell(0)}
              className="sm:col-span-1 sm:row-span-2 bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between gap-6 min-h-[200px]"
              whileHover={{ y: -2, borderColor: 'rgba(99,102,241,0.25)' }}
              transition={{ type: 'tween', duration: 0.15 }}
            >
              <div className="flex flex-col gap-3">
                <p className="text-[#a5b4fc] font-semibold text-[10px] tracking-[0.2em] uppercase">
                  Frontend Developer · Co-Founder
                </p>
                <h1
                  className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight text-white"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  Augusto
                  <br />
                  Ribeiro
                </h1>
                <p className="text-white/40 text-sm leading-relaxed">
                  Construindo produtos digitais que fazem sentido.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'TypeScript', 'Tailwind'].map((tag) => (
                  <span
                    key={tag}
                    className="bg-[rgba(99,102,241,0.12)] border border-[rgba(99,102,241,0.25)] text-[#a5b4fc] text-[10px] font-semibold px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Cell 2 (col 2, row 1): profile photo */}
            <motion.div
              {...cell(0.05)}
              className="bg-[rgba(99,102,241,0.07)] border border-[rgba(99,102,241,0.15)] rounded-2xl p-4 backdrop-blur-md flex items-center justify-center"
              whileHover={{ y: -2, borderColor: 'rgba(99,102,241,0.3)' }}
              transition={{ type: 'tween', duration: 0.15 }}
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[rgba(99,102,241,0.4)] shadow-[0_0_24px_rgba(99,102,241,0.25)]">
                <Image
                  src="/pngs/profile-pic.png"
                  alt="Augusto Ribeiro"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </motion.div>

            {/* Cell 3 (col 3, row 1): status */}
            <motion.div
              {...cell(0.1)}
              className="bg-[rgba(34,197,94,0.06)] border border-[rgba(34,197,94,0.15)] rounded-2xl p-4 backdrop-blur-md flex flex-col gap-2"
              whileHover={{ y: -2 }}
              transition={{ type: 'tween', duration: 0.15 }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_6px_rgba(34,197,94,0.7)] animate-pulse" />
                <span className="text-[#86efac] text-[9px] font-semibold tracking-[0.1em] uppercase">
                  Status
                </span>
              </div>
              <p className="text-white/60 text-xs leading-relaxed">
                Building{' '}
                <span className="text-white font-semibold">Varyonn</span>
              </p>
            </motion.div>

            {/* Cell 4 (col 2, row 2): social links */}
            <motion.div
              {...cell(0.15)}
              className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4 backdrop-blur-md flex flex-col gap-2"
              whileHover={{ y: -2, borderColor: 'rgba(99,102,241,0.2)' }}
              transition={{ type: 'tween', duration: 0.15 }}
            >
              <p className="text-white/25 text-[8px] font-semibold tracking-[0.1em] uppercase mb-1">
                Links
              </p>
              <a
                href="https://github.com/aogusto"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/45 hover:text-[#a5b4fc] text-xs transition-colors duration-150"
              >
                ↗ GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/augusto--ribeiro/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/45 hover:text-[#a5b4fc] text-xs transition-colors duration-150"
              >
                ↗ LinkedIn
              </a>
            </motion.div>

            {/* Cell 5 (col 3, row 2): CI/CD */}
            <motion.div
              {...cell(0.2)}
              className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4 backdrop-blur-md flex flex-col gap-2"
              whileHover={{ y: -2, borderColor: 'rgba(139,92,246,0.2)' }}
              transition={{ type: 'tween', duration: 0.15 }}
            >
              <p className="text-white/25 text-[8px] font-semibold tracking-[0.1em] uppercase mb-1">
                CI / CD
              </p>
              <p className="text-white/40 text-xs leading-relaxed">
                Vercel · Railway
                <br />
                Cloud Build
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section
          id="about"
          className="max-w-5xl mx-auto w-full px-6 lg:px-12 py-24 flex flex-col gap-6"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[#a5b4fc] text-xs font-bold tracking-[0.2em] uppercase"
          >
            Sobre
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-white/60 text-base lg:text-lg leading-relaxed max-w-2xl"
          >
            Sou desenvolvedor frontend e co-fundador da Varyonn. Gosto de
            construir produtos que fazem sentido — desde a arquitetura até a
            experiência do usuário. Meu foco é em performance, escalabilidade e
            design que comunica.
          </motion.p>
        </section>

        {/* ── EXPERIENCE ── */}
        <section
          id="experience"
          className="max-w-5xl mx-auto w-full px-6 lg:px-12 py-24 flex flex-col gap-10"
        >
          <div className="flex flex-col gap-2">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[#a5b4fc] text-xs font-bold tracking-[0.2em] uppercase"
            >
              Experiência
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-3xl lg:text-4xl font-bold"
            >
              Onde trabalhei
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <ExperienceCard
                logo="/pngs/varyonn-logo.png"
                altLogo="Varyonn Logo"
                link="https://varyonn.com.br/"
                role="Head of Frontend & Co-Founder"
                description="Co-founder of Varyonn, leading frontend development of CRMs and
                custom digital solutions. Key project: Pokett, a financial assistant
                bot for Gen Z — developed the admin panel and public frontend using"
                highlight="Next.js, React, TypeScript, and Tailwind CSS."
                date="NOV 2025 – NOW"
              />
            </div>
            <ExperienceCard
              logo="/pngs/napp-logo.png"
              altLogo="Napp Logo"
              link="https://www.nappsolutions.com.br/"
              role="Senior Frontend Developer"
              currentRoleDate="JUN 2023 – NOW"
              description="Developing and maintaining a platform that integrates with pharmacy
                  software to synchronize stock with various apps. Building and enhancing
                  the web admin page using"
              highlight="React, Material UI, TypeScript, Vite, and a Golang backend."
              date="MAR 2022 – NOW"
              previousRole={{
                role: 'Integration Engineer',
                date: 'MAR 2022 – MAY 2023',
                description:
                  'Connecting shopping centers and pharmacies to install tools that integrate with pharmacist databases, ensuring seamless data synchronization using',
                highlight: 'C#, Python, SQL, MySQL, and PostgreSQL.',
              }}
            />
            <ExperienceCard
              logo="/pngs/maker-logo.png"
              altLogo="Maker Logo"
              link="https://makerrobotics.com.br/"
              role="Frontend Intern"
              description="Developed a web application for students to access video lessons,
                implementing core functionalities and database interactions using"
              highlight="JavaScript, Angular, and SaSS."
              date="SEP 2021 – MAR 2022"
            />
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section
          id="projects"
          className="max-w-5xl mx-auto w-full px-6 lg:px-12 py-24 flex flex-col gap-10"
        >
          <div className="flex flex-col gap-2">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[#a5b4fc] text-xs font-bold tracking-[0.2em] uppercase"
            >
              Projetos
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-3xl lg:text-4xl font-bold"
            >
              O que construí
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <ProjectCard
              name="Varyonn"
              subtitle="Agência digital · CRMs e soluções custom"
              logo="/pngs/varyonn-logo.png"
              altLogo="Varyonn Logo"
              link="https://varyonn.com.br/"
              description="Digital agency specializing in CRMs and custom digital solutions.
                Co-founded and leading the frontend from technical definition to delivery,
                focused on performance, scalability, and UX using"
              highlight="Next.js, React, TypeScript, and Tailwind CSS."
            />
            <ProjectCard
              name="Pokett"
              subtitle="Assistente financeiro · Gen Z"
              logo="/svgs/pokett-logo.svg"
              altLogo="Pokett Logo"
              link="https://pokett.com.br/"
              description="Financial assistant bot built for Gen Z. Developed the admin panel
                and the entire public frontend of the product, delivering a modern
                and intuitive experience using"
              highlight="Next.js, React, TypeScript, and Tailwind CSS."
            />
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section
          id="contact"
          className="max-w-5xl mx-auto w-full px-6 lg:px-12 py-24 flex flex-col gap-10"
        >
          <div className="flex flex-col gap-2">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[#a5b4fc] text-xs font-bold tracking-[0.2em] uppercase"
            >
              Contato
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-3xl lg:text-4xl font-bold"
            >
              Me encontre online
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="https://github.com/aogusto"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/[0.03] border border-white/[0.07] hover:border-[rgba(99,102,241,0.3)] rounded-xl px-5 py-3 text-sm text-white/50 hover:text-[#a5b4fc] transition-all duration-150"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/augusto--ribeiro/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/[0.03] border border-white/[0.07] hover:border-[rgba(99,102,241,0.3)] rounded-xl px-5 py-3 text-sm text-white/50 hover:text-[#a5b4fc] transition-all duration-150"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://drive.google.com/file/d/1_loEp-VJ73PqWN0N22fnajRDTPAyC8-N/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.25)] hover:border-[rgba(99,102,241,0.5)] rounded-xl px-5 py-3 text-sm text-[#a5b4fc] hover:text-white transition-all duration-150"
            >
              Currículo ↗
            </a>
          </motion.div>
        </section>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: Compiled successfully. (ProjectCard will warn about unknown `subtitle` prop — that's fixed in Task 6.)

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: replace hero with bento grid, add About section, wire SideNav"
```

---

## Task 5: Update ExperienceCard colors

**Files:**

- Modify: `src/app/components/ExperienceCard.tsx`

Replace all green color values with indigo equivalents:

- `rgba(74, 222, 128, ...)` → `rgba(99, 102, 241, ...)`
- `bg-primary/10 border-primary/20` date badge → indigo CSS vars
- Timeline pulse gradient: green → indigo
- Active dot: `bg-primary/25 border-primary/70 shadow-[..green..]` → indigo
- `animate-ping` dot: `bg-primary/40` → indigo

- [ ] **Step 1: Update ExperienceCard.tsx**

```tsx
'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

type RoleEntry = {
  role: string;
  date: string;
  description: string;
  highlight: string;
};

const ExperienceCard = ({
  description,
  logo,
  highlight,
  link,
  altLogo,
  date,
  role,
  currentRoleDate,
  previousRole,
}: {
  description: string;
  logo: string;
  highlight: string;
  link: string;
  altLogo: string;
  date: string;
  role?: string;
  currentRoleDate?: string;
  previousRole?: RoleEntry;
}) => {
  return (
    <motion.div
      className="w-full bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 flex flex-col gap-4 backdrop-blur-md"
      whileHover={{
        boxShadow:
          '0 0 0 1px rgba(99, 102, 241, 0.25), 0 0 24px rgba(99, 102, 241, 0.07)',
        y: -3,
      }}
      transition={{ type: 'tween', duration: 0.15 }}
    >
      {/* Header: logo + total tenure badge */}
      <div className="flex items-center justify-between gap-3">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0"
        >
          <Image
            src={logo}
            alt={altLogo}
            width={56}
            height={56}
            className="object-contain"
          />
        </a>
        <span className="text-xs font-semibold text-[#a5b4fc] bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.2)] rounded-full px-3 py-1 whitespace-nowrap">
          {date}
        </span>
      </div>

      {previousRole ? (
        /* ── Timeline layout ── */
        <div className="relative flex flex-col">
          {/* Base line */}
          <div className="absolute left-[6px] top-[10px] bottom-[10px] w-[2px] rounded-full bg-white/[0.06]" />
          {/* Animated indigo pulse traveling upward */}
          <div className="absolute left-[6px] top-[10px] bottom-[10px] w-[2px] rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-x-0 rounded-full"
              style={{
                height: '55%',
                background:
                  'linear-gradient(to top, transparent, rgba(99,102,241,0.65) 50%, transparent)',
              }}
              initial={{ top: '110%' }}
              animate={{ top: '-55%' }}
              transition={{
                duration: 2.2,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 1.2,
              }}
            />
          </div>

          {/* Current role */}
          <div className="flex gap-4 pb-6">
            {/* Dot with ping ring */}
            <div className="relative z-10 mt-[3px] shrink-0 w-3.5 h-3.5">
              <span className="absolute inset-0 rounded-full bg-[rgba(99,102,241,0.4)] animate-ping" />
              <span className="relative block rounded-full w-full h-full bg-[rgba(99,102,241,0.25)] border-2 border-[rgba(99,102,241,0.7)] shadow-[0_0_10px_rgba(99,102,241,0.4)]" />
            </div>
            <div className="flex-1 min-w-0 flex flex-col gap-1.5">
              <div className="flex items-start justify-between gap-3">
                {role && (
                  <p className="text-base font-bold text-foreground leading-snug">
                    {role}
                  </p>
                )}
                {currentRoleDate && (
                  <span className="text-xs text-muted/80 whitespace-nowrap mt-0.5 shrink-0">
                    {currentRoleDate}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted leading-relaxed">
                {description}{' '}
                <span className="text-[#a5b4fc]/80">{highlight}</span>
              </p>
            </div>
          </div>

          {/* Previous role */}
          <div className="flex gap-4">
            <div className="relative z-10 mt-[3px] shrink-0 w-3.5 h-3.5 rounded-full bg-white/[0.06] border border-white/[0.15]" />
            <div className="flex-1 min-w-0 flex flex-col gap-1.5">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold text-foreground/40 leading-snug">
                  {previousRole.role}
                </p>
                <span className="text-xs text-muted/50 whitespace-nowrap mt-0.5 shrink-0">
                  {previousRole.date}
                </span>
              </div>
              <p className="text-sm text-muted/55 leading-relaxed">
                {previousRole.description}{' '}
                <span className="text-[#a5b4fc]/30">
                  {previousRole.highlight}
                </span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* ── Regular layout ── */
        <>
          {role && (
            <p className="text-base font-bold text-foreground">{role}</p>
          )}
          <p className="text-base text-muted leading-relaxed">
            {description} <span className="text-[#a5b4fc]/90">{highlight}</span>
          </p>
        </>
      )}
    </motion.div>
  );
};

export default ExperienceCard;
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: Compiled successfully.

- [ ] **Step 3: Commit**

```bash
git add src/app/components/ExperienceCard.tsx
git commit -m "style: update ExperienceCard colors from green to indigo"
```

---

## Task 6: Update ProjectCard — indigo colors and subtitle prop

**Files:**

- Modify: `src/app/components/ProjectCard.tsx`

Add `subtitle` prop, update hover glow from green to indigo.

- [ ] **Step 1: Update ProjectCard.tsx**

```tsx
'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ProjectCard = ({
  name,
  subtitle,
  description,
  highlight,
  link,
  logo,
  altLogo,
}: {
  name: string;
  subtitle: string;
  description: string;
  highlight: string;
  link: string;
  logo: string;
  altLogo: string;
}) => {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 flex flex-col gap-4 cursor-pointer backdrop-blur-md"
      whileHover={{
        boxShadow:
          '0 0 0 1px rgba(99, 102, 241, 0.25), 0 0 24px rgba(99, 102, 241, 0.07)',
        y: -3,
      }}
      transition={{ type: 'tween', duration: 0.15 }}
    >
      <div className="flex items-center justify-between">
        <Image
          src={logo}
          alt={altLogo}
          width={48}
          height={48}
          className="object-contain"
        />
        <span className="text-white/40 text-sm font-medium flex items-center gap-1">
          {link.replace(/^https?:\/\//, '')}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </span>
      </div>
      <div>
        <p className="text-lg font-bold text-white">{name}</p>
        <p className="text-xs text-white/35 mt-0.5">{subtitle}</p>
      </div>
      <p className="text-sm text-white/40 leading-relaxed">
        {description} <span className="text-[#a5b4fc]/90">{highlight}</span>
      </p>
    </motion.a>
  );
};

export default ProjectCard;
```

- [ ] **Step 2: Verify build passes with no type errors**

```bash
npm run build
```

Expected: Compiled successfully with no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/components/ProjectCard.tsx
git commit -m "feat: add subtitle prop to ProjectCard, update to indigo colors"
```

---

## Task 7: Delete unused components

**Files:**

- Delete: `src/app/components/CursorBlinker.tsx`
- Delete: `src/app/components/TechnologyCard.tsx`

- [ ] **Step 1: Delete the files**

```bash
rm src/app/components/CursorBlinker.tsx
rm src/app/components/TechnologyCard.tsx
```

- [ ] **Step 2: Verify build passes with no dead import errors**

```bash
npm run build
```

Expected: Compiled successfully. (Neither file is imported anywhere after page.tsx was rewritten in Task 4.)

- [ ] **Step 3: Run linter**

```bash
npm run lint
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: delete CursorBlinker and TechnologyCard (no longer used)"
```

---

## Task 8: Final visual check and polish

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

Open `http://localhost:3000` in a browser.

- [ ] **Step 2: Check desktop layout**

- Side nav is visible on the left with 5 dots + labels
- Hero bento grid shows 5 cells correctly arranged (3-col layout)
- Cursor spotlight follows the mouse in indigo
- Aurora blobs are indigo (top-left) and violet (bottom-right)
- Scroll through all sections: About, Experiência, Projetos, Contato
- Active dot in side nav updates as you scroll through sections

- [ ] **Step 3: Check mobile layout (resize to 375px width)**

- Side nav is hidden
- Bento cells stack vertically in a single column
- All sections readable and well-spaced

- [ ] **Step 4: Final build**

```bash
npm run build
```

Expected: Compiled successfully.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: final build verification for portfolio redesign"
```

---

## Summary

| Task | What it does                             |
| ---- | ---------------------------------------- |
| 1    | CSS vars + aurora blobs → indigo/violet  |
| 2    | WaveLinesCanvas spotlight → indigo       |
| 3    | New SideNav with scroll spy              |
| 4    | Bento hero + About + SideNav in page.tsx |
| 5    | ExperienceCard → indigo                  |
| 6    | ProjectCard → indigo + subtitle          |
| 7    | Delete CursorBlinker + TechnologyCard    |
| 8    | Visual QA + final build                  |

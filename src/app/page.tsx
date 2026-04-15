'use client';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import CursorBlinker from '@/app/components/CursorBlinker';
import TechnologyCard from '@/app/components/TechnologyCard';
import ExperienceCard from '@/app/components/ExperienceCard';
import ProjectCard from '@/app/components/ProjectCard';
import dynamic from 'next/dynamic';

const DotLottieReact = dynamic(
  () =>
    import('@lottiefiles/dotlottie-react').then((m) => ({
      default: m.DotLottieReact,
    })),
  { ssr: false }
);

export default function Home() {
  const baseNameText = 'Hello, my name is Augusto!' as string;
  const initialNameText = 'Hello, my name is Ausguto!' as string;
  const count = useMotionValue(0);
  const [isCorrecting, setIsCorrecting] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);

  const rounded = useTransform(count, (latest) => Math.round(latest));
  const nameText = useTransform(rounded, (latest) =>
    (isCorrecting ? baseNameText : initialNameText).slice(0, latest)
  );

  useEffect(() => {
    const controlsStep1 = animate(count, initialNameText.length, {
      type: 'tween',
      duration: 2,
      ease: 'easeInOut',
      onComplete: () => {
        setTimeout(() => {
          animate(count, 17, {
            type: 'tween',
            duration: 0.5,
            ease: 'easeInOut',
            onComplete: () => {
              setIsCorrecting(true);
              const controlsStep3 = animate(count, baseNameText.length, {
                type: 'tween',
                duration: 1.5,
                ease: 'easeInOut',
                onComplete: () => {
                  setTimeout(() => setShowPhoto(true), 400);
                },
              });
              return () => controlsStep3.stop();
            },
          });
        }, 1200);
      },
    });

    return () => controlsStep1.stop();
  }, [count, initialNameText.length, baseNameText.length]);

  return (
    <div className="flex flex-col">
      {/* ── HERO ── */}
      <section className="min-h-screen max-w-6xl mx-auto w-full px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 py-20 lg:py-0">
        {/* Left: text */}
        <div className="flex flex-col gap-7 lg:w-[55%] order-2 lg:order-1">
          <div className="flex flex-col gap-4">
            <p className="text-primary font-semibold text-xs tracking-[0.2em] uppercase">
              Frontend Developer &amp; Co-Founder
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight relative">
              {/* Invisible spacer — reserves the height of the full final text */}
              <span className="invisible select-none" aria-hidden="true">
                {baseNameText}
              </span>
              {/* Animated text overlaid absolutely so height never changes */}
              <span className="absolute inset-0">
                <motion.span>{nameText}</motion.span>
                <CursorBlinker />
              </span>
            </h1>
            <p className="text-muted text-base lg:text-lg leading-relaxed max-w-lg">
              Building performant and scalable web experiences. Currently
              leading frontend at{' '}
              <span className="text-foreground font-semibold">Varyonn</span> and
              developing at{' '}
              <span className="text-foreground font-semibold">
                Napp Solutions
              </span>
              .
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold text-muted uppercase tracking-widest">
              Tech Stack
            </p>
            <div className="grid grid-cols-2 gap-3">
              <TechnologyCard
                name="TypeScript"
                alt="TypeScript Logo"
                src="/svgs/typescript.svg"
                url="https://www.typescriptlang.org/"
                wide
              />
              <TechnologyCard
                name="React"
                alt="React Logo"
                src="/svgs/react-2.svg"
                url="https://react.dev/"
                wide
              />
              <TechnologyCard
                name="Next.js"
                alt="Next.js Logo"
                src="/svgs/next-js.svg"
                url="https://nextjs.org/"
                wide
                lightBg
              />
              <TechnologyCard
                name="Vite"
                alt="Vite Logo"
                src="/svgs/vitejs.svg"
                url="https://vite.dev/"
                wide
              />
              <div className="col-span-2">
                <TechnologyCard
                  name="Tailwind CSS"
                  alt="Tailwind Logo"
                  src="/svgs/tailwind.svg"
                  url="https://tailwindcss.com/"
                  wide
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold text-muted uppercase tracking-widest">
              CI / CD
            </p>
            <div className="grid grid-cols-3 gap-3">
              <TechnologyCard
                name="Vercel"
                alt="Vercel Logo"
                src="/svgs/vercel-icon-logo.svg"
                url="https://vercel.com/"
                wide
                lightBg
              />
              <TechnologyCard
                name="Railway"
                alt="Railway Logo"
                src="/svgs/railway.svg"
                url="https://railway.app/"
                wide
                lightBg
              />
              <TechnologyCard
                name="Cloud Build"
                alt="Cloud Build Logo"
                src="/svgs/cloud-build-logo.svg"
                url="https://cloud.google.com/build"
                wide
              />
            </div>
          </div>

        </div>

        {/* Right: avatar → photo */}
        <div className="lg:w-[40%] flex justify-center items-center order-1 lg:order-2">
          <AnimatePresence mode="wait">
            {!showPhoto ? (
              /* ── Lottie avatar (bursts on exit) ── */
              <motion.div
                key="lottie"
                className="max-w-72 w-full"
                exit={{
                  scale: [1, 0.85, 1.9],
                  opacity: [1, 1, 0],
                  transition: {
                    duration: 0.5,
                    times: [0, 0.28, 1],
                    ease: 'easeOut',
                  },
                }}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 3,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatType: 'loop',
                    delay: 0.5,
                  }}
                >
                  <DotLottieReact
                    src="https://lottie.host/f7e7e568-832e-4392-8144-3bdd490de12c/EKS5GQDT4k.lottie"
                    className="w-full h-auto"
                    autoplay={false}
                  />
                </motion.div>
              </motion.div>
            ) : (
              /* ── Profile photo (spring entry) ── */
              <motion.div
                key="photo"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 220, damping: 16 }}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 3,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatType: 'loop',
                    delay: 0.5,
                  }}
                  className="w-72 h-72 rounded-full overflow-hidden border-[3px] border-primary/25 shadow-[0_0_40px_rgba(74,222,128,0.12)]"
                >
                  <Image
                    src="/pngs/profile-pic.png"
                    alt="Augusto Ribeiro"
                    width={288}
                    height={288}
                    className="object-cover w-full h-full"
                    priority
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section
        id="experience"
        className="max-w-6xl mx-auto w-full px-6 lg:px-12 py-24 flex flex-col gap-10"
      >
        <div className="flex flex-col gap-2">
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
            Experience
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold">
            Where I&apos;ve worked
          </h2>
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
        className="max-w-6xl mx-auto w-full px-6 lg:px-12 py-24 flex flex-col gap-10"
      >
        <div className="flex flex-col gap-2">
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
            Projects
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold">
            What I&apos;ve built
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <ProjectCard
            name="Varyonn"
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

      {/* ── CONNECT ── */}
      <section
        id="contact"
        className="max-w-6xl mx-auto w-full px-6 lg:px-12 py-24 flex flex-col gap-10"
      >
        <div className="flex flex-col gap-2">
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
            Connect
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold">Find me online</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 max-w-lg">
          <TechnologyCard
            name="GitHub"
            alt="GitHub Logo"
            src="/svgs/github-mark.svg"
            url="https://github.com/aogusto"
            lightBg
          />
          <TechnologyCard
            name="LinkedIn"
            alt="LinkedIn Logo"
            src="/svgs/linkedin.svg"
            url="https://www.linkedin.com/in/augusto--ribeiro/"
          />
          <TechnologyCard
            name="Resume"
            alt="Download Icon"
            src="/pngs/download-icon.png"
            url="https://drive.google.com/file/d/1_loEp-VJ73PqWN0N22fnajRDTPAyC8-N/view?usp=sharing"
          />
        </div>
      </section>
    </div>
  );
}

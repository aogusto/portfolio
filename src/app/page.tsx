'use client';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import CursorBlinker from '@/app/components/CursorBlinker';
import TechnologyCard from '@/app/components/TechnologyCard';
import ExperienceCard from '@/app/components/ExperienceCard';
import ProjectCard from '@/app/components/ProjectCard';

import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiVite,
  SiRedux,
  SiGo,
  SiNestjs,
  SiLaravel,
  SiExpress,
  SiVercel,
  SiDocker,
  SiNginx,
  SiGit,
  SiGithub,
  SiGoogledrive,
  SiGooglecloud,
  SiRailway,
} from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { LuTreePalm } from 'react-icons/lu';

export default function Home() {
  const baseNameText = 'Hello, my name is Augusto!' as string;
  const initialNameText = 'Hello, my name is Ausguto!' as string;
  const count = useMotionValue(0);
  const [isCorrecting, setIsCorrecting] = useState(false);
  const [showShine, setShowShine] = useState(false);

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
                  setShowShine(true);
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
      <section className="min-h-screen w-full flex items-center justify-center py-28 lg:py-32">
        <div className="max-w-6xl mx-auto w-full px-6 lg:px-12 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12">
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
                <span className="text-foreground font-semibold">Varyonn</span>{' '}
                and developing at{' '}
                <span className="text-foreground font-semibold">
                  Napp Solutions
                </span>
                .
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-muted uppercase tracking-widest">
                Frontend
              </p>
              <div className="grid grid-cols-2 gap-3">
                <TechnologyCard
                  name="TypeScript"
                  icon={<SiTypescript size={40} />}
                  url="https://www.typescriptlang.org/"
                  wide
                />
                <TechnologyCard
                  name="React"
                  icon={<SiReact size={40} />}
                  url="https://react.dev/"
                  wide
                />
                <TechnologyCard
                  name="Next.js"
                  icon={<SiNextdotjs size={40} />}
                  url="https://nextjs.org/"
                  wide
                />
                <TechnologyCard
                  name="Vite"
                  icon={<SiVite size={40} />}
                  url="https://vite.dev/"
                  wide
                />
                <TechnologyCard
                  name="Redux"
                  icon={<SiRedux size={40} />}
                  url="https://redux.js.org/"
                  wide
                />
                <TechnologyCard
                  name="TanStack"
                  icon={<LuTreePalm size={40} />}
                  url="https://tanstack.com"
                  wide
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-muted uppercase tracking-widest">
                Backend
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <TechnologyCard
                  name="Go"
                  icon={<SiGo size={40} />}
                  url="https://golang.org/"
                  wide
                />
                <TechnologyCard
                  name="NestJS"
                  icon={<SiNestjs size={40} />}
                  url="https://nestjs.com/"
                  wide
                />
                <TechnologyCard
                  name="Laravel"
                  icon={<SiLaravel size={40} />}
                  url="https://laravel.com/"
                  wide
                />
                <TechnologyCard
                  name="Express"
                  icon={<SiExpress size={40} />}
                  url="https://expressjs.com/"
                  wide
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-muted uppercase tracking-widest">
                CI / CD
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <TechnologyCard
                  name="Vercel"
                  icon={<SiVercel size={40} />}
                  url="https://vercel.com/"
                  wide
                />
                <TechnologyCard
                  name="Docker"
                  icon={<SiDocker size={40} />}
                  url="https://www.docker.com/"
                  wide
                />
                <TechnologyCard
                  name="Nginx"
                  icon={<SiNginx size={40} />}
                  url="https://nginx.org/"
                  wide
                />
                <TechnologyCard
                  name="Git"
                  icon={<SiGit size={40} />}
                  url="https://git-scm.com/"
                  wide
                />
                <TechnologyCard
                  name="Cloud Build"
                  icon={<SiGooglecloud size={40} />}
                  url="https://cloud.google.com/build"
                  wide
                />
                <TechnologyCard
                  name="Railway"
                  icon={<SiRailway size={40} />}
                  url="https://railway.app/"
                  wide
                />
              </div>
            </div>
          </div>

          {/* Right: photo */}
          <div
            className="lg:w-[40%] flex justify-center items-center order-1 lg:order-2"
            style={{ perspective: 1000 }}
          >
            <motion.div
              animate={showShine ? { rotateY: -360 } : { rotateY: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            >
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  boxShadow: [
                    '0 0 20px rgba(74,222,128,0.1)',
                    '0 0 50px rgba(74,222,128,0.35)',
                    '0 0 20px rgba(74,222,128,0.1)',
                  ],
                }}
                transition={{
                  duration: 3,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'loop',
                  delay: 0.5,
                }}
                className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-[3px] border-primary/40 relative"
              >
                <Image
                  src="/pngs/profile-pic.png"
                  alt="Augusto Ribeiro"
                  width={384}
                  height={384}
                  className="object-cover w-full h-full"
                  priority
                />

                {/* Glass shine effect */}
                {showShine && (
                  <motion.div
                    initial={{ left: '-150%' }}
                    animate={{ left: '150%' }}
                    transition={{
                      duration: 1.2,
                      ease: 'easeInOut',
                      delay: 1.2,
                    }}
                    className="absolute top-0 bottom-0 z-20 w-[150%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg]"
                  />
                )}
              </motion.div>
            </motion.div>
          </div>
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
            currentRoleDate="JUN 2023"
            description="Developing and maintaining a platform that integrates with pharmacy
                software to synchronize stock with various apps. Building and enhancing
                the web admin page using"
            highlight="React, Material UI, TypeScript, Vite, and a Golang backend."
            date="MAR 2022 – NOW"
            previousRole={{
              role: 'Integration Engineer',
              date: 'MAR 2022',
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
            link="https://varyonn.com.br"
            description="Digital agency specializing in CRMs and custom digital solutions.
              Co-founded and leading the frontend from technical definition to delivery,
              focused on performance, scalability, and UX using"
            highlight="Next.js, React, TypeScript, and Tailwind CSS."
          />
          <ProjectCard
            name="Pokett"
            logo="/svgs/pokett-logo.svg"
            altLogo="Pokett Logo"
            link="https://pokett.com.br"
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
            icon={<SiGithub size={40} />}
            url="https://github.com/aogusto"
          />
          <TechnologyCard
            name="LinkedIn"
            icon={<FaLinkedin size={40} />}
            url="https://www.linkedin.com/in/augusto--ribeiro/"
          />
          <TechnologyCard
            name="Resume"
            icon={<SiGoogledrive size={40} />}
            url="https://drive.google.com/file/d/1_loEp-VJ73PqWN0N22fnajRDTPAyC8-N/view?usp=sharing"
          />
        </div>
      </section>
    </div>
  );
}

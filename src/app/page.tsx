'use client';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import CursorBlinker from '@/app/components/CursorBlinker';
import TechnologyCard from '@/app/components/TechnologyCard';
import ChevronDownButton from '@/app/components/ChevronDownButton';
import ExperienceCard from '@/app/components/ExperienceCard';

export default function Home() {
  const baseNameText = 'Hello, my name is Augusto!' as string;
  const initialNameText = 'Hello, my name is Ausguto!' as string;
  const count = useMotionValue(0);
  const [isCorrecting, setIsCorrecting] = useState(false);

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
              animate(count, baseNameText.length, {
                type: 'tween',
                duration: 1.5,
                ease: 'easeInOut',
              });
            },
          });
        }, 1200);
      },
    });

    return () => controlsStep1.stop();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-full min-h-screen h-auto flex flex-col sm:justify-center sm:items-center gap-8 p-8 text-center sm:text-start">
          <h1 className="text-4xl sm:text-5xl font-bold">
            <motion.span>{nameText}</motion.span>
            <CursorBlinker />
          </h1>
          <h2 className="text-3xl sm:text-4xl">
            I am a{' '}
            <span className="text-primary font-semibold">
              Frontend Developer
            </span>
          </h2>
          <h3 className="text-2xl">
            These are some of the{' '}
            <span className="text-primary font-semibold">technologies</span> I
            work with:
          </h3>
          <div
            className="grid grid-cols-2 gap-6
        sm:grid-cols-2
        md:grid-cols-4
        lg:grid-cols-4
        pb-8
        sm:pb-0
      "
          >
            <TechnologyCard
              name="Typescript"
              alt="Typescript Logo"
              src="/svgs/typescript.svg"
              url="https://www.typescriptlang.org/"
            />
            <TechnologyCard
              name="React"
              alt="React Logo"
              src="/svgs/react-2.svg"
              url="https://react.dev/"
            />
            <TechnologyCard
              name="Vite JS"
              alt="Vite Logo"
              src="/svgs/vitejs.svg"
              url="https://vite.dev/"
            />
            <TechnologyCard
              name="Next JS"
              alt="Next Logo"
              src="/svgs/next-js.svg"
              url="https://nextjs.org/"
            />
          </div>
          <div className="flex gap-1 w-full items-center justify-center">
            <div className="w-1/12 bg-primary h-1  rounded-l-lg" />
            <p className="text-2xl">EXPERIENCE</p>
            <div className="w-1/12 bg-primary h-1 rounded-r-lg" />
          </div>
          <div
            className="
            sm:w-full md:w-3/6 lg:w-4/6
            grid sm:grid-cols-1 xl:grid-cols-3
            gap-6
          "
          >
            <ExperienceCard
              logo="/pngs/napp-logo.png"
              altLogo="Napp Logo"
              link="https://www.nappsolutions.com.br/"
              description="Currently developing and maintaining a platform that integrates with
              pharmacy software to manage and synchronize pharmacist stock with
              various apps. Additionally, I am responsible for building and enhancing
              the web admin page for efficient platform management using"
              highlight="React, Material UI, TypeScript, Vite, and integrating APIs from a
              Golang backend."
              date="MAY 2023 - PRESENT"
            />
            <ExperienceCard
              logo="/pngs/napp-logo.png"
              altLogo="Napp Logo"
              link="https://www.nappsolutions.com.br/"
              description="Responsible for connecting with shopping centers and pharmacies to
              install and configure tools that integrate with pharmacist databases,
              ensuring seamless data synchronization with the platform to enable
              advanced processing and functionality using"
              highlight="C#, Python, and integrating
              with databases like SQL, MySQL, PostgreSQL, and others."
              date="MARCH 2022 - MAY 2023"
            />
            <ExperienceCard
              logo="/pngs/maker-logo.png"
              altLogo="Maker Logo"
              link="https://makerrobotics.com.br/"
              description="Developed a web application for students to access and watch video
              lessons, creating a user-friendly interface, implementing core
              functionalities, and managing database interactions to ensure seamless
              video playback and accessibility using"
              highlight="JavaScript, Angular and SaSS."
              date="SEPTEMBER 2021 - MARCH 2022"
            />
          </div>
          <ChevronDownButton />
        </div>
        <div className="w-full h-auto flex flex-col sm:justify-center sm:items-center gap-8 p-8 text-center sm:text-start">
          <h1 className="text-4xl sm:text-5xl font-bold">
            <motion.span>More about me:</motion.span>
            <CursorBlinker />
          </h1>
          <div
            className="grid grid-cols-2 gap-6
        sm:grid-cols-3
        md:grid-cols-3
        lg:grid-cols-3
        pb-8
        sm:pb-0
      "
          >
            <TechnologyCard
              name="GitHub"
              alt="GitHub Logo"
              src="/svgs/github-mark.svg"
              url="https://github.com/aogusto"
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
        </div>
      </div>
    </>
  );
}

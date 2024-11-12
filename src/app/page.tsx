'use client';
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useAnimation,
} from 'framer-motion';
import { useEffect, useState } from 'react';
import CursorBlinker from '@/app/components/CursorBlinker';
import TechnologyCard from '@/app/components/TechnologyCard';
import ChevronDownButton from '@/app/components/ChevronDownButton';

export default function Home() {
  const baseNameText = 'Olá, meu nome é Augusto!' as string;
  const initialNameText = 'Olá, meu nome é Ausguto!' as string;
  const count = useMotionValue(0);
  const [isCorrecting, setIsCorrecting] = useState(false);

  const rounded = useTransform(count, (latest) => Math.round(latest));
  const nameText = useTransform(rounded, (latest) =>
    (isCorrecting ? baseNameText : initialNameText).slice(0, latest)
  );

  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      backgroundPosition: ['0% 50%', '100% 50%'],
      transition: {
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 10,
        ease: 'linear',
      },
    });
  }, [controls]);

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
    <div className="flex flex-col items-center">
      <motion.div
        animate={controls}
        className="w-full min-h-screen h-auto flex flex-col sm:justify-center sm:items-center gap-8 p-8 text-center sm:text-start bg-gradient-to-t from-background via-background to-shadow bg-[length:200%_200%]"
      >
        <h1 className="text-5xl font-bold">
          <motion.span>{nameText}</motion.span>
          <CursorBlinker />
        </h1>
        <h2 className="text-4xl">
          Eu sou um
          <span className="text-primary font-semibold">
            {' '}
            Desenvolvedor Front-end
          </span>
        </h2>
        <h3 className="text-2xl">
          Essas são algumas das{' '}
          <span className="text-primary font-semibold">tecnologias</span> com as
          quais eu trabalho:
        </h3>
        <div
          className="grid grid-cols-2 gap-6
        sm:grid-cols-2
        md:grid-cols-5
        lg:grid-cols-5
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
            name="Tailwind"
            alt="Tailwind Logo"
            src="/svgs/tailwind.svg"
            url="https://tailwindcss.com/"
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
        <ChevronDownButton />
      </motion.div>
      <div className="w-full h-auto flex flex-col sm:justify-center sm:items-center gap-8 p-8 text-center sm:text-start">
        <h1 className="text-5xl font-bold">
          <motion.span>Mais sobre mim:</motion.span>
          <CursorBlinker />
        </h1>
        <div
          className="grid grid-cols-2 gap-6
        sm:grid-cols-2
        md:grid-cols-2
        lg:grid-cols-2
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
        </div>
      </div>
    </div>
  );
}

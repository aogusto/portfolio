'use client';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import CursorBlinker from '@/app/components/CursorBlinker';
import TechnologyCard from '@/app/components/TechnologyCard';
import ChevronDownButton from '@/app/components/ChevronDownButton';

export default function Home() {
  const baseText = 'Olá, meu nome é Augusto!' as string;
  const initialText = 'Olá, meu nome é Ausguto!' as string;
  const count = useMotionValue(0);
  const [isCorrecting, setIsCorrecting] = useState(false);

  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    (isCorrecting ? baseText : initialText).slice(0, latest)
  );

  useEffect(() => {
    const controlsStep1 = animate(count, initialText.length, {
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
              animate(count, baseText.length, {
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
  });

  return (
    <div className="w-full h-svh flex flex-col sm:justify-center sm:items-center gap-8 p-8 text-center sm:text-start">
      <h1 className="text-5xl font-bold">
        <motion.span>{displayText}</motion.span>
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
        md:grid-cols-4
        lg:grid-cols-4
        pb-8
        sm:pb-0
      "
      >
        <TechnologyCard name="React" alt="React Logo" src="/svgs/react-2.svg" />
        <TechnologyCard
          name="Next JS"
          alt="Next Logo"
          src="/svgs/next-js.svg"
        />
        <TechnologyCard
          name="Typescript"
          alt="Typescript Logo"
          src="/svgs/typescript.svg"
        />
        <TechnologyCard name="Vite JS" alt="Vite Logo" src="/svgs/vitejs.svg" />
      </div>
      <ChevronDownButton />
    </div>
  );
}

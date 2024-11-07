'use client';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import CursorBlinker from '@/app/components/CursorBlinker';

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
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center p-8">
      <h1 className="text-5xl font-bold">
        <motion.span>{displayText}</motion.span>
        <CursorBlinker />
      </h1>
    </div>
  );
}

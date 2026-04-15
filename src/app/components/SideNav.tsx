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

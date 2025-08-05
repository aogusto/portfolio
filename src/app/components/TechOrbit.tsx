'use client';
import { motion } from 'framer-motion';
import TechnologyCard from './TechnologyCard';

interface TechItem {
  name: string;
  src: string;
  url: string;
}

const TechOrbit = () => {
  const technologies: TechItem[] = [
    {
      name: 'React',
      src: '/svgs/react-2.svg',
      url: 'https://react.dev/',
    },
    {
      name: 'TypeScript',
      src: '/svgs/typescript.svg',
      url: 'https://www.typescriptlang.org/',
    },
    {
      name: 'Next JS',
      src: '/svgs/next-js.svg',
      url: 'https://nextjs.org/',
    },
    {
      name: 'Vite JS',
      src: '/svgs/vitejs.svg',
      url: 'https://vite.dev/',
    },
  ];

  const radius = 130;
  const centerSize = 320;

  return (
    <div className="relative" style={{ width: centerSize, height: centerSize }}>
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-primary/8 via-cyan-bright/5 to-transparent rounded-full blur-2xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Orbital rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Outer decorative ring */}
        <motion.div
          className="absolute border border-primary/15 rounded-full"
          style={{
            width: radius * 2 + 60,
            height: radius * 2 + 60,
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Main orbital path */}
        <motion.div
          className="absolute border-2 border-primary/40 rounded-full"
          style={{
            width: radius * 2,
            height: radius * 2,
          }}
          animate={{
            boxShadow: [
              '0 0 15px rgba(124, 119, 198, 0.3)',
              '0 0 30px rgba(120, 219, 255, 0.4)',
              '0 0 15px rgba(124, 119, 198, 0.3)',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Inner ring */}
        <motion.div
          className="absolute border border-cyan-bright/25 rounded-full"
          style={{
            width: radius * 2 - 60,
            height: radius * 2 - 60,
          }}
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Central hub */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Outer glow */}
        <div className="absolute inset-0 w-20 h-20 bg-gradient-radial from-primary/50 via-cyan-bright/25 to-transparent rounded-full blur-xl -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2" />

        {/* Main hub */}
        <div className="relative w-14 h-14 bg-gradient-to-br from-primary via-cyan-bright to-purple-glow rounded-full shadow-2xl shadow-primary/60 border-2 border-white/30">
          {/* Inner layers */}
          <div className="absolute inset-1 bg-gradient-to-br from-white/90 to-primary/70 rounded-full" />
          <div className="absolute inset-3 bg-gradient-radial from-primary to-cyan-bright rounded-full animate-pulse" />
        </div>
      </motion.div>

      {/* Technology cards orbiting naturally */}
      <motion.div
        className="absolute inset-0"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {technologies.map((tech, index) => {
          const angle = (index * 2 * Math.PI) / technologies.length;
          const x = centerSize / 2 + Math.cos(angle) * radius;
          const y = centerSize / 2 + Math.sin(angle) * radius;

          return (
            <motion.div
              key={tech.name}
              className="absolute w-18 h-18 -translate-x-1/2 -translate-y-1/2 z-20"
              style={{
                left: x,
                top: y,
              }}
              // Counter-rotate to keep cards upright and readable
              animate={{
                rotate: [0, -360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              whileHover={{
                scale: 1.15,
                zIndex: 40,
                filter: 'brightness(1.15)',
              }}
              initial={{
                opacity: 0,
                scale: 0.5,
                y: -30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.2,
                duration: 0.8,
                type: 'spring',
                stiffness: 150,
                damping: 15,
              }}
            >
              {/* Individual card glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-radial from-primary/25 via-transparent to-transparent rounded-xl blur-lg -z-10"
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2.5 + index * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              <TechnologyCard
                name={tech.name}
                alt={`${tech.name} Logo`}
                src={tech.src}
                url={tech.url}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default TechOrbit;

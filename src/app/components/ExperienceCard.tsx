import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const ExperienceCard = ({
  description,
  logo,
  highlight,
  link,
  altLogo,
  date,
}: {
  description: string;
  logo: string;
  highlight: string;
  link: string;
  altLogo: string;
  date: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [triggerWave, setTriggerWave] = useState(0);

  // Trigger wave animation only once per hover
  useEffect(() => {
    if (isHovered) {
      setTriggerWave((prev) => prev + 1);
    }
  }, [isHovered]);

  return (
    <motion.div
      className="relative group overflow-hidden cursor-pointer h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        scale: 1.03,
        y: -5,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25,
      }}
    >
      {/* Energia pulsante de fundo - mais sutil */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-cyan-bright/15 to-purple-glow/10 rounded-xl blur-xl"
        animate={{
          scale: isHovered ? 1.1 : 1,
          opacity: isHovered ? 0.6 : 0.3,
        }}
        transition={{
          duration: 0.8,
          ease: 'easeInOut',
        }}
      />

      {/* Borda holográfica mais suave */}
      <motion.div
        className="absolute inset-0 rounded-xl p-[1px]"
        style={{
          background: isHovered
            ? 'linear-gradient(45deg, #7c77c6, #78dbff, #ff77c6, #7c77c6)'
            : 'linear-gradient(45deg, #7c77c6, #78dbff)',
        }}
        animate={{
          backgroundSize: isHovered
            ? ['100% 100%', '200% 200%', '100% 100%']
            : '100% 100%',
        }}
        transition={{
          duration: isHovered ? 2 : 0.8,
          ease: isHovered ? 'easeInOut' : 'easeOut',
        }}
      >
        <div className="bg-blue-deep/90 backdrop-blur-md rounded-xl h-full w-full relative overflow-hidden">
          {/* Efeito de linhas sutis */}
          <motion.div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 8px,
                  rgba(124, 119, 198, 0.1) 8px,
                  rgba(124, 119, 198, 0.1) 10px
                )
              `,
            }}
            animate={{
              backgroundPosition: isHovered
                ? ['0px 0px', '20px 20px']
                : '0px 0px',
            }}
            transition={{
              duration: isHovered ? 1.5 : 0.6,
              ease: isHovered ? 'easeInOut' : 'easeOut',
            }}
          />
        </div>
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-10 p-6 rounded-xl flex flex-col gap-5 h-full"
        animate={{
          y: isHovered ? -2 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
      >
        {/* Header com logo e efeitos mais sutis */}
        <div className="flex flex-col items-center gap-4 relative">
          {/* Anéis orbitais mais sutis */}
          <div className="relative w-20 h-20">
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border border-cyan-bright/20 rounded-full"
                style={{
                  scale: 1 + i * 0.15,
                }}
                animate={{
                  rotate: isHovered ? 360 : 0,
                  opacity: isHovered ? 0.6 : 0.2,
                }}
                transition={{
                  rotate: {
                    duration: 15 + i * 10,
                    repeat: isHovered ? Infinity : 0,
                    ease: 'linear',
                  },
                  opacity: {
                    duration: 1,
                    ease: 'easeInOut',
                  },
                }}
              />
            ))}

            {/* Logo container sem rotação excessiva */}
            <motion.div
              className="relative w-full h-full"
              animate={{
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{
                duration: 0.6,
                ease: 'easeInOut',
              }}
            >
              {/* Glow suave atrás do logo */}
              <motion.div
                className="absolute inset-0 bg-gradient-radial from-primary/30 to-transparent rounded-full blur-md"
                animate={{
                  opacity: isHovered ? 0.6 : 0.2,
                }}
                transition={{
                  duration: 0.8,
                  ease: 'easeInOut',
                }}
              />

              {/* Container do logo limpo */}
              <div className="relative w-full h-full bg-gradient-to-br from-foreground/15 via-primary/5 to-cyan-bright/10 rounded-lg p-3 backdrop-blur-sm border border-primary/40">
                <Image
                  src={logo}
                  alt={altLogo}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />

                {/* Reflexo holográfico - passa uma vez só */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-bright/15 to-transparent rounded-lg"
                  key={triggerWave} // Force re-render to restart animation
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{
                    x: isHovered ? '100%' : '-100%',
                    opacity: isHovered ? [0, 0.8, 0] : 0,
                  }}
                  transition={{
                    duration: isHovered ? 1.5 : 0.6,
                    ease: isHovered ? 'easeInOut' : 'easeOut',
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Data com efeito neon mais agradável */}
          <motion.div
            className="relative px-4 py-2 bg-gradient-to-r from-primary/20 to-cyan-bright/20 rounded-full border border-primary/50 backdrop-blur-sm overflow-hidden"
            animate={{
              boxShadow: isHovered
                ? '0 0 25px rgba(124, 119, 198, 0.4)'
                : '0 0 8px rgba(124, 119, 198, 0.2)',
            }}
            transition={{
              duration: 0.8,
              ease: 'easeInOut',
            }}
          >
            {/* Efeito de energia - passa uma vez só */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-bright/30 to-transparent"
              key={`date-wave-${triggerWave}`} // Force re-render to restart animation
              initial={{ x: '-100%' }}
              animate={{
                x: isHovered ? '200%' : '-100%',
              }}
              transition={{
                duration: isHovered ? 2 : 0.8,
                ease: isHovered ? 'easeInOut' : 'easeOut',
              }}
            />

            <span className="text-xs font-semibold text-cyan-bright tracking-wider uppercase relative z-10">
              {date}
            </span>
          </motion.div>
        </div>

        {/* Descrição com efeitos de texto suaves */}
        <motion.div
          className="text-sm leading-relaxed relative"
          animate={{
            opacity: isHovered ? 1 : 0.95,
          }}
        >
          {/* Fundo sutil */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/3 to-cyan-bright/3 rounded-lg -z-10"
            animate={{
              opacity: isHovered ? 0.8 : 0.2,
            }}
            transition={{
              duration: 0.8,
              ease: 'easeInOut',
            }}
          />

          <p className="text-foreground/90 relative z-10">
            {description}{' '}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-bright to-purple-glow font-semibold relative"
              animate={{
                backgroundPosition: isHovered
                  ? ['0% 50%', '100% 50%', '0% 50%']
                  : '0% 50%',
              }}
              transition={{
                duration: 4,
                repeat: isHovered ? Infinity : 0,
                ease: 'linear',
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
            >
              {highlight}
            </motion.span>
          </p>
        </motion.div>

        {/* Uma única linha de escaneamento sutil */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-bright to-transparent"
          key={`scan-${triggerWave}`} // Force re-render to restart animation
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{
            opacity: isHovered ? [0, 0.8, 0] : 0,
            scaleX: isHovered ? [0, 1, 0] : 0,
          }}
          transition={{
            duration: isHovered ? 2.5 : 0.6,
            ease: isHovered ? 'easeInOut' : 'easeOut',
          }}
        />

        {/* Cantos sutis */}
        {[
          { position: 'top-2 right-2', border: 'border-t border-r' },
          { position: 'bottom-2 left-2', border: 'border-b border-l' },
        ].map((corner, index) => (
          <motion.div
            key={index}
            className={`absolute ${corner.position} w-3 h-3 ${corner.border} border-primary/40`}
            animate={{
              opacity: isHovered ? 0.8 : 0.3,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{
              duration: 0.6,
              ease: 'easeInOut',
              delay: index * 0.1,
            }}
          />
        ))}

        {/* Algumas partículas sutis */}
        {isHovered && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-bright/60 rounded-full"
                initial={{
                  x: 50 + Math.random() * 200,
                  y: 50 + Math.random() * 100,
                  opacity: 0,
                }}
                animate={{
                  y: [null, -30],
                  opacity: [0, 0.8, 0],
                  scale: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 1,
                  ease: 'easeOut',
                }}
              />
            ))}
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ExperienceCard;

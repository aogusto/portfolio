'use client';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import CursorBlinker from '@/app/components/CursorBlinker';
import TechnologyCard from '@/app/components/TechnologyCard';
import ExperienceCard from '@/app/components/ExperienceCard';
import ThreeBackground from '@/app/components/ThreeBackground';
import { DotLottieReact, DotLottie } from '@lottiefiles/dotlottie-react';
import TechOrbit from '@/app/components/TechOrbit';

export default function Home() {
  const baseNameText = 'Hello, my name is Augusto!' as string;
  const initialNameText = 'Hello, my name is Ausguto!' as string;
  const count = useMotionValue(0);
  const [isCorrecting, setIsCorrecting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const nameText = useTransform(rounded, (latest) =>
    (isCorrecting ? baseNameText : initialNameText).slice(0, latest)
  );

  const lottieRef = useRef<DotLottie | null>(null);
  const [isLottiePlaying, setIsLottiePlaying] = useState(false);

  // Ensure client-side only rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

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
                  if (lottieRef.current) {
                    lottieRef.current.play();

                    setIsLottiePlaying(true);
                  }
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

  useEffect(() => {
    const lottieInstance = lottieRef.current;
    if (lottieInstance) {
      const handleComplete = () => {
        setIsLottiePlaying(false);
      };

      lottieInstance.addEventListener('complete', handleComplete);

      return () => {
        lottieInstance.removeEventListener('complete', handleComplete);
      };
    }
  }, [lottieRef.current]);

  const handleLottieClick = () => {
    if (isLottiePlaying || !lottieRef.current) {
      console.log('Lottie já está tocando ou não está pronta.');
      return;
    }

    console.log('Iniciando reprodução da Lottie...');

    setIsLottiePlaying(true);
    lottieRef.current.play();
  };

  // Define particle positions as constants
  const particlePositions = [
    { left: '60%', top: '5%' },
    { left: '85%', top: '35%' },
    { left: '60%', top: '65%' },
    { left: '15%', top: '65%' },
    { left: '5%', top: '35%' },
    { left: '15%', top: '5%' },
  ];

  return (
    <>
      <ThreeBackground />

      {/* Futuristic grid overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(124, 119, 198, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(124, 119, 198, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      <div className="flex flex-col items-center relative z-10">
        {/* Hero Section with creative floating layout */}
        <div className="w-full h-screen flex flex-col justify-center items-center gap-6 p-8 text-center relative">
          {/* Floating Avatar with holographic effects */}
          <motion.div
            className="max-w-72 relative cursor-pointer mx-auto order-1"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 3,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'loop',
              delay: 0.5,
            }}
            onClick={handleLottieClick}
          >
            {/* Subtle glow effect behind avatar */}
            <motion.div
              className="absolute inset-0 bg-gradient-radial from-primary/20 via-cyan-bright/10 to-transparent rounded-full blur-3xl scale-150"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1.5, 1.7, 1.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Floating particles around avatar - only render on client */}
            {isMounted &&
              particlePositions.map((position, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-bright/60 rounded-full"
                  style={{
                    left: position.left,
                    top: position.top,
                  }}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3 + i * 0.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.3,
                  }}
                />
              ))}

            <DotLottieReact
              src="https://lottie.host/f7e7e568-832e-4392-8144-3bdd490de12c/EKS5GQDT4k.lottie"
              className="w-full h-auto relative z-10"
              autoplay={false}
              dotLottieRefCallback={(dotLottie) => {
                lottieRef.current = dotLottie;
              }}
            />
          </motion.div>

          {/* Main content in creative grid layout */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full order-2">
            {/* Left side - Text content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Main heading */}
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-left"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-cyan-bright to-primary"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                >
                  {nameText}
                </motion.span>
                <CursorBlinker />
              </motion.h1>

              {/* Subtitle */}
              <motion.h2
                className="text-2xl md:text-3xl lg:text-4xl text-left"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="text-foreground/90">I am a </span>
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-bright font-semibold relative"
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(124, 119, 198, 0.5)',
                      '0 0 20px rgba(120, 219, 255, 0.5)',
                      '0 0 10px rgba(124, 119, 198, 0.5)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  Frontend Developer
                  {/* Glitch effect overlay */}
                  <motion.span
                    className="absolute inset-0 text-purple-glow mix-blend-screen"
                    animate={{
                      opacity: [0, 0.8, 0],
                      x: [0, 2, 0],
                    }}
                    transition={{
                      duration: 0.1,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  >
                    Frontend Developer
                  </motion.span>
                </motion.span>
              </motion.h2>

              {/* Description */}
              <motion.p
                className="text-lg text-foreground/80 text-left leading-relaxed"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Passionate about creating{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-bright font-semibold">
                  interactive experiences
                </span>{' '}
                and modern web applications with cutting-edge technologies.
              </motion.p>
            </div>

            {/* Right side - Interactive Technology Orbit */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <TechOrbit />
              </motion.div>
            </div>
          </div>

          {/* Experience section divider */}
          <motion.div
            className="flex gap-4 w-full items-center justify-center my-12 order-3"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
          >
            <motion.div
              className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-primary to-cyan-bright rounded-full relative"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="px-6 py-2 bg-gradient-to-r from-primary/20 to-cyan-bright/20 rounded-full border border-primary/40 backdrop-blur-sm"
              animate={{
                boxShadow: [
                  '0 0 10px rgba(124, 119, 198, 0.3)',
                  '0 0 20px rgba(120, 219, 255, 0.3)',
                  '0 0 10px rgba(124, 119, 198, 0.3)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-bright tracking-wider">
                EXPERIENCE
              </span>
            </motion.div>
            <motion.div
              className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-cyan-bright to-primary rounded-full"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        </div>

        {/* Experience section with alternating layout */}
        <div className="w-full py-16 flex items-center justify-center p-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, staggerChildren: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Experience cards in masonry-like layout */}
              {[
                {
                  logo: '/pngs/napp-logo.png',
                  altLogo: 'Napp Logo',
                  link: 'https://www.nappsolutions.com.br/',
                  description:
                    'Currently developing and maintaining a platform that integrates with pharmacy software to manage and synchronize pharmacist stock with various apps. Additionally, I am responsible for building and enhancing the web admin page for efficient platform management using',
                  highlight:
                    'React, Material UI, TypeScript, Vite, and integrating APIs from a Golang backend.',
                  date: 'MAY 2023 - PRESENT',
                  className: 'lg:translate-y-0',
                },
                {
                  logo: '/pngs/napp-logo.png',
                  altLogo: 'Napp Logo',
                  link: 'https://www.nappsolutions.com.br/',
                  description:
                    'Responsible for connecting with shopping centers and pharmacies to install and configure tools that integrate with pharmacist databases, ensuring seamless data synchronization with the platform to enable advanced processing and functionality using',
                  highlight:
                    'C#, Python, and integrating with databases like SQL, MySQL, PostgreSQL, and others.',
                  date: 'MARCH 2022 - MAY 2023',
                  className: 'lg:translate-y-8',
                },
                {
                  logo: '/pngs/maker-logo.png',
                  altLogo: 'Maker Logo',
                  link: 'https://makerrobotics.com.br/',
                  description:
                    'Developed a web application for students to access and watch video lessons, creating a user-friendly interface, implementing core functionalities, and managing database interactions to ensure seamless video playback and accessibility using',
                  highlight: 'JavaScript, Angular and SaSS.',
                  date: 'SEPTEMBER 2021 - MARCH 2022',
                  className: 'lg:translate-y-4 xl:translate-y-0',
                },
              ].map((exp, index) => (
                <motion.div
                  key={index}
                  className={`${exp.className}`}
                  initial={{
                    opacity: 0,
                    y: 50,
                    rotate: index % 2 === 0 ? -2 : 2,
                  }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2,
                    type: 'spring',
                    stiffness: 100,
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.3 },
                  }}
                >
                  <ExperienceCard {...exp} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Contact section with reduced spacing */}
        <div className="w-full py-16 flex flex-col justify-center items-center p-8 relative">
          {/* Floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-32 h-32 border border-primary/10 rounded-full"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${10 + i * 20}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>

          <motion.div
            className="text-center mb-12 z-10 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-cyan-bright">
                Let's Connect
              </span>
              <CursorBlinker />
            </motion.h1>
            <motion.p
              className="text-xl text-foreground/70 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to bring your ideas to life? Let's create something amazing
              together.
            </motion.p>
          </motion.div>

          {/* Contact cards in creative hexagonal layout */}
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {[
                {
                  name: 'GitHub',
                  src: '/svgs/github-mark.svg',
                  url: 'https://github.com/aogusto',
                },
                {
                  name: 'LinkedIn',
                  src: '/svgs/linkedin.svg',
                  url: 'https://www.linkedin.com/in/augusto--ribeiro/',
                },
                {
                  name: 'Resume',
                  src: '/pngs/download-icon.png',
                  url: 'https://drive.google.com/file/d/1_loEp-VJ73PqWN0N22fnajRDTPAyC8-N/view?usp=sharing',
                },
              ].map((contact, index) => (
                <motion.div
                  key={contact.name}
                  className="w-32 h-32 md:w-40 md:h-40"
                  initial={{ opacity: 0, y: 30, rotate: index * 15 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.1,
                    rotate: index % 2 === 0 ? 5 : -5,
                    transition: { duration: 0.3 },
                  }}
                >
                  <TechnologyCard
                    name={contact.name}
                    alt={`${contact.name} Logo`}
                    src={contact.src}
                    url={contact.url}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

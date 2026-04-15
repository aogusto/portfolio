'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const TechnologyCard = ({
  name,
  alt,
  src,
  url,
  wide = false,
  lightBg = false,
}: {
  name: string;
  alt: string;
  src: string;
  url?: string;
  wide?: boolean;
  lightBg?: boolean;
}) => {
  return (
    <motion.div
      className={`
        bg-secondary border border-white/[0.07] rounded-2xl
        font-semibold cursor-pointer select-none
        ${wide ? 'flex flex-row items-center gap-4 p-4' : 'flex flex-col items-center justify-center p-5 gap-3'}
      `}
      whileHover={{
        boxShadow:
          '0 0 0 1px rgba(74, 222, 128, 0.25), 0 0 20px rgba(74, 222, 128, 0.08)',
        y: -3,
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'tween', duration: 0.15 }}
      onClick={() => {
        if (url) window.open(url, '_blank');
      }}
    >
      <div
        className={`${wide ? 'w-9 h-9 shrink-0' : 'w-14 h-14'} ${lightBg ? 'bg-white rounded-full p-1' : ''}`}
      >
        <Image
          src={src}
          alt={alt}
          width={56}
          height={56}
          className="object-contain w-full h-full"
        />
      </div>
      <span className={wide ? 'text-base' : 'text-sm'}>{name}</span>
    </motion.div>
  );
};

export default TechnologyCard;

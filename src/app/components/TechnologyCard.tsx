'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ReactNode } from 'react';

type TechnologyCardProps = {
  name: string;
  url?: string;
  wide?: boolean;
  lightBg?: boolean;
} & (
  | {
      src: string;
      alt: string;
      icon?: never;
    }
  | {
      icon: ReactNode;
      src?: never;
      alt?: never;
    }
);

const TechnologyCard = ({
  name,
  alt,
  src,
  icon,
  url,
  wide = false,
  lightBg = false,
}: TechnologyCardProps) => {
  return (
    <motion.div
      className={`
        bg-secondary border border-white/[0.07] rounded-2xl
        font-semibold cursor-pointer select-none overflow-hidden
        ${wide ? 'flex flex-row items-center gap-2.5 p-3 sm:gap-4 sm:p-4' : 'flex flex-col items-center justify-center p-4 sm:p-5 gap-2 sm:gap-3'}
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
        className={`${wide ? 'w-8 h-8 sm:w-9 sm:h-9 shrink-0' : 'w-10 h-10 sm:w-14 sm:h-14 shrink-0'} ${lightBg ? 'bg-white rounded-full p-1' : ''} flex items-center justify-center`}
      >
        {icon ? (
          <div className="w-full h-full flex items-center justify-center text-white">
            {icon}
          </div>
        ) : (
          <Image
            src={src!}
            alt={alt!}
            width={56}
            height={56}
            className="object-contain w-full h-full"
          />
        )}
      </div>
      <span
        className={
          wide
            ? 'text-sm sm:text-base truncate w-full'
            : 'text-xs sm:text-sm text-center truncate w-full'
        }
      >
        {name}
      </span>
    </motion.div>
  );
};

export default TechnologyCard;

'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const TechnologyCard = ({
  name,
  alt,
  src,
  url,
}: {
  name: string;
  alt: string;
  src: string;
  url?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasUrlClass = url ? 'cursor-pointer' : '';

  return (
    <motion.div
      className={`relative bg-secondary p-4 rounded-xl text-center font-semibold flex flex-col items-center justify-center ${hasUrlClass}`}
      animate={{
        boxShadow: isHovered
          ? '12px 10px 0 var(--shadow)'
          : '5px 5px 0 var(--shadow)',
        translateY: isHovered ? -5 : 0,
        translateX: isHovered ? -5 : 0,
      }}
      transition={{
        type: 'tween',
        duration: 0.1,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (url) {
          window.open(url, '_blank');
        }
      }}
    >
      <div className="w-24 h-24 mb-4">
        <Image
          src={src}
          alt={alt}
          width={96}
          height={96}
          className="object-bottom"
        />
      </div>
      {name}
    </motion.div>
  );
};

export default TechnologyCard;

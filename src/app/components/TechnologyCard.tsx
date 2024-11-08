'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const TechnologyCard = ({
  name,
  alt,
  src,
}: {
  name: string;
  alt: string;
  src: string;
}) => {
  return (
    <motion.div
      className="relative bg-secondary p-4 rounded-xl text-center font-semibold flex flex-col items-center justify-center"
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="w-24 h-24 mb-4">
        <Image
          src={src}
          alt={alt}
          width={96}
          height={96}
          className="object-contain"
        />
      </div>
      {name}
    </motion.div>
  );
};

export default TechnologyCard;

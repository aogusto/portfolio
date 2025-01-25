import { motion } from 'framer-motion';
import { useState } from 'react';
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
  return (
    <motion.div
      className={`w-full bg-secondary p-4 rounded-xl flex flex-col gap-1`}
      transition={{
        type: 'tween',
        duration: 0.1,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        boxShadow: !isHovered
          ? '12px 10px 0 var(--shadow)'
          : '5px 5px 0 var(--shadow)',
        translateY: !isHovered ? -5 : 0,
        translateX: !isHovered ? -5 : 0,
      }}
    >
      <p className="flex justify-center w-full">
        <a href={link} target="_blank" className="w-fit">
          <Image src={logo} alt={altLogo} width={100} height={100} />
        </a>
      </p>
      <p className="text-center text-primary font-semibold">({date})</p>
      <p>
        {description} <span className="text-primary">{highlight}</span>
      </p>
    </motion.div>
  );
};

export default ExperienceCard;

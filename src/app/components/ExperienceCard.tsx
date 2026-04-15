'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ExperienceCard = ({
  description,
  logo,
  highlight,
  link,
  altLogo,
  date,
  role,
}: {
  description: string;
  logo: string;
  highlight: string;
  link: string;
  altLogo: string;
  date: string;
  role?: string;
}) => {
  return (
    <motion.div
      className="w-full bg-secondary border border-white/[0.07] rounded-2xl p-6 flex flex-col gap-4"
      whileHover={{
        boxShadow:
          '0 0 0 1px rgba(74, 222, 128, 0.25), 0 0 24px rgba(74, 222, 128, 0.07)',
        y: -3,
      }}
      transition={{ type: 'tween', duration: 0.15 }}
    >
      <div className="flex items-center justify-between gap-3">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0"
        >
          <Image
            src={logo}
            alt={altLogo}
            width={56}
            height={56}
            className="object-contain"
          />
        </a>
        <span className="text-xs font-semibold text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1 whitespace-nowrap">
          {date}
        </span>
      </div>
      {role && <p className="text-base font-bold text-foreground">{role}</p>}
      <p className="text-base text-muted leading-relaxed">
        {description} <span className="text-primary/90">{highlight}</span>
      </p>
    </motion.div>
  );
};

export default ExperienceCard;

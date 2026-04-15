'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ProjectCard = ({
  name,
  description,
  highlight,
  link,
  logo,
  altLogo,
}: {
  name: string;
  description: string;
  highlight: string;
  link: string;
  logo: string;
  altLogo: string;
}) => {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full bg-secondary border border-white/[0.07] rounded-2xl p-5 flex flex-col gap-4 cursor-pointer"
      whileHover={{
        boxShadow:
          '0 0 0 1px rgba(74, 222, 128, 0.25), 0 0 24px rgba(74, 222, 128, 0.07)',
        y: -3,
      }}
      transition={{ type: 'tween', duration: 0.15 }}
    >
      <div className="flex items-center justify-between">
        <Image
          src={logo}
          alt={altLogo}
          width={48}
          height={48}
          className="object-contain"
        />
        <span className="text-muted text-sm font-medium flex items-center gap-1">
          {link.replace(/^https?:\/\//, '')}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </span>
      </div>
      <p className="text-lg font-bold">{name}</p>
      <p className="text-sm text-muted leading-relaxed">
        {description} <span className="text-primary/90">{highlight}</span>
      </p>
    </motion.a>
  );
};

export default ProjectCard;

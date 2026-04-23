'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

type RoleEntry = {
  role: string;
  date: string;
  description: string;
  highlight: string;
};

const ExperienceCard = ({
  description,
  logo,
  highlight,
  link,
  altLogo,
  date,
  role,
  currentRoleDate,
  previousRole,
}: {
  description: string;
  logo: string;
  highlight: string;
  link: string;
  altLogo: string;
  date: string;
  role?: string;
  currentRoleDate?: string;
  previousRole?: RoleEntry;
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
      {/* Header: logo + total tenure badge */}
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
        <span className="text-[11px] font-semibold text-primary/90 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-[0_4px_12px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.15)] rounded-full px-3.5 py-1.5 whitespace-nowrap tracking-wider">
          {date}
        </span>
      </div>

      {previousRole ? (
        /* ── Timeline layout ── */
        <div className="relative flex flex-col">
          {/* Base line */}
          <div className="absolute left-[6px] top-[10px] bottom-[10px] w-[2px] rounded-full bg-white/[0.06]" />
          {/* Animated green pulse traveling upward */}
          <div className="absolute left-[6px] top-[10px] bottom-[10px] w-[2px] rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-x-0 rounded-full"
              style={{
                height: '55%',
                background:
                  'linear-gradient(to top, transparent, rgba(74,222,128,0.65) 50%, transparent)',
              }}
              initial={{ top: '110%' }}
              animate={{ top: '-55%' }}
              transition={{
                duration: 2.2,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 1.2,
              }}
            />
          </div>

          {/* Current role */}
          <div className="flex gap-4 pb-6">
            {/* Dot with ping ring */}
            <div className="relative z-10 mt-[3px] shrink-0 w-3.5 h-3.5">
              <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
              <span className="relative block rounded-full w-full h-full bg-primary/25 border-2 border-primary/70 shadow-[0_0_10px_rgba(74,222,128,0.4)]" />
            </div>
            <div className="flex-1 min-w-0 flex flex-col gap-1.5">
              <div className="flex items-start justify-between gap-3">
                {role && (
                  <p className="text-base font-bold text-foreground leading-snug">
                    {role}
                  </p>
                )}
                {currentRoleDate && (
                  <span className="text-[10px] font-medium text-primary/80 bg-white/[0.02] backdrop-blur-md border border-white/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.1)] rounded-full px-2.5 py-1 whitespace-nowrap shrink-0">
                    {currentRoleDate}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted leading-relaxed">
                {description}{' '}
                <span className="text-primary/80">{highlight}</span>
              </p>
            </div>
          </div>

          {/* Previous role */}
          <div className="flex gap-4">
            <div className="relative z-10 mt-[3px] shrink-0 w-3.5 h-3.5 rounded-full bg-white/[0.06] border border-white/[0.15]" />
            <div className="flex-1 min-w-0 flex flex-col gap-1.5">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold text-foreground/40 leading-snug">
                  {previousRole.role}
                </p>
                <span className="text-[10px] font-medium text-muted/70 bg-white/[0.02] backdrop-blur-md border border-white/[0.04] shadow-[0_2px_8px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.05)] rounded-full px-2.5 py-1 whitespace-nowrap shrink-0">
                  {previousRole.date}
                </span>
              </div>
              <p className="text-sm text-muted/55 leading-relaxed">
                {previousRole.description}{' '}
                <span className="text-primary/30">
                  {previousRole.highlight}
                </span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* ── Regular layout ── */
        <>
          {role && (
            <p className="text-base font-bold text-foreground">{role}</p>
          )}
          <p className="text-base text-muted leading-relaxed">
            {description} <span className="text-primary/90">{highlight}</span>
          </p>
        </>
      )}
    </motion.div>
  );
};

export default ExperienceCard;

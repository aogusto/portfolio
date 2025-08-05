'use client';
import Image from 'next/image';

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
  const hasUrlClass = url ? 'cursor-pointer' : '';

  return (
    <div
      className={`relative group overflow-hidden ${hasUrlClass} w-full h-full`}
      onClick={(e) => {
        e.stopPropagation();
        if (url) {
          window.open(url, '_blank');
        }
      }}
    >
      {/* Card background with glass effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
        {/* Inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-cyan-bright/5 to-purple-glow/10 rounded-2xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 rounded-2xl text-center font-medium flex flex-col items-center justify-center h-full min-h-[72px]">
        {/* Technology Icon */}
        <div className="relative z-20 mb-2 group-hover:scale-110 transition-transform duration-300">
          <Image
            src={src}
            alt={alt}
            width={36}
            height={36}
            className="object-contain filter drop-shadow-lg"
          />
        </div>

        {/* Technology Name */}
        <span className="text-xs font-semibold text-foreground/95 relative z-20 tracking-wide leading-tight group-hover:text-white transition-colors duration-300">
          {name}
        </span>

        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-cyan-bright/20 to-purple-glow/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

        {/* Subtle shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
      </div>
    </div>
  );
};

export default TechnologyCard;

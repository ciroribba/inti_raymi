import React, { useState } from 'react';
import { StageId } from '../../types';

interface DJImageProps {
  src: string;
  alt: string;
  name: string;
  stageId?: StageId;
  className?: string;
  imgClassName?: string;
}

export const DJImage: React.FC<DJImageProps> = ({
  src,
  alt,
  name,
  stageId = 'inti',
  className = '',
  imgClassName = '',
}) => {
  const [hasError, setHasError] = useState(false);

  const getStageAccent = () => {
    switch (stageId) {
      case 'inti':
        return {
          glow: 'rgba(217, 255, 0, 0.25)',
          color: '#d9ff00',
          border: 'border-[#d9ff00]/40',
          tag: 'INTI // SOL',
        };
      case 'pacha':
        return {
          glow: 'rgba(0, 245, 212, 0.25)',
          color: '#00f5d4',
          border: 'border-[#00f5d4]/40',
          tag: 'PACHA // EARTH',
        };
      case 'kolla':
        return {
          glow: 'rgba(255, 74, 17, 0.25)',
          color: '#ff4a11',
          border: 'border-[#ff4a11]/40',
          tag: 'KOLLA // WINDS',
        };
    }
  };

  const accent = getStageAccent();
  const initials = name
    .replace(/\[.*?\]/g, '')
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

  if (hasError) {
    return (
      <div
        className={`relative w-full h-full flex flex-col items-center justify-center p-6 overflow-hidden select-none bg-gradient-to-b from-[#141424] via-[#0d0d16] to-[#05050a] ${className}`}
      >
        {/* Sacred Geometry Background Lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50%" cy="50%" r="42%" fill="none" stroke={accent.color} strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="50%" cy="50%" r="28%" fill="none" stroke={accent.color} strokeWidth="0.75" />
          <circle cx="50%" cy="50%" r="14%" fill="none" stroke={accent.color} strokeWidth="0.5" />
          <line x1="0" y1="0" x2="100%" y2="100%" stroke={accent.color} strokeWidth="0.5" opacity="0.3" />
          <line x1="100%" y1="0" x2="0" y2="100%" stroke={accent.color} strokeWidth="0.5" opacity="0.3" />
        </svg>

        {/* Ambient Glow */}
        <div
          className="absolute w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-40"
          style={{ backgroundColor: accent.glow }}
        />

        {/* Huge Stylized Monogram in Background */}
        <span
          className="absolute font-display font-black text-8xl md:text-9xl tracking-tighter opacity-10 select-none pointer-events-none"
          style={{ color: accent.color }}
        >
          {initials}
        </span>

        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-2.5 px-2">
          {/* Tag */}
          <span
            className={`inline-block px-2 py-0.5 text-[9px] font-mono font-bold tracking-widest uppercase border bg-black/60 ${accent.border}`}
            style={{ color: accent.color }}
          >
            {accent.tag} ARCHIVE
          </span>

          {/* Artist Name */}
          <h4 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-white leading-tight drop-shadow-md">
            {name}
          </h4>

          {/* Equalizer animation */}
          <div className="flex items-center gap-1 pt-1">
            <span className="w-1 h-3 bg-zinc-600 animate-wave-1" style={{ backgroundColor: accent.color }} />
            <span className="w-1 h-5 bg-zinc-600 animate-wave-2" style={{ backgroundColor: accent.color }} />
            <span className="w-1 h-2 bg-zinc-600 animate-wave-3" style={{ backgroundColor: accent.color }} />
            <span className="w-1 h-4 bg-zinc-600 animate-wave-4" style={{ backgroundColor: accent.color }} />
          </div>

          <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">
            3,820 M // LIVE SET
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setHasError(true)}
      className={imgClassName}
    />
  );
};


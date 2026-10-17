import React, { useId } from 'react';

interface LogoMarkProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'auto';
  className?: string;
}

export const LogoMark: React.FC<LogoMarkProps> = ({
  size = 'md',
  variant = 'light',
  className = '',
}) => {
  const rawId = useId();
  // Safe unique string for SVG mask and gradient IDs
  const id = 'logo-' + rawId.replace(/[^a-zA-Z0-9_-]/g, '');

  const isDark = variant === 'dark';

  // Responsive scale presets
  const sizeClasses = {
    sm: 'h-12 sm:h-14 w-auto',
    md: 'h-16 sm:h-20 w-auto',
    lg: 'h-24 sm:h-28 w-auto',
    xl: 'h-32 sm:h-40 w-auto',
  }[size];

  return (
    <div className={`inline-flex items-center select-none transition-transform duration-200 hover:scale-[1.02] ${className}`}>
      <svg
        viewBox="0 0 280 126"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeClasses} overflow-visible`}
        aria-label="FOSS for The Common Need Logo"
        role="img"
      >
        <defs>
          {/* Chartreuse & Sage Green Gradients for FOSS lettering */}
          <linearGradient id={`${id}-f-grad`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isDark ? '#DAEE01' : '#806517'} />
            <stop offset="100%" stopColor={isDark ? '#8FB31D' : '#806517'} />
          </linearGradient>

          <linearGradient id={`${id}-o-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDark ? '#8FB31D' : '#806517'} />
            <stop offset="50%" stopColor={isDark ? '#DAEE01' : '#8FB31D'} />
            <stop offset="100%" stopColor={isDark ? '#8FB31D' : '#806517'} />
          </linearGradient>

          <linearGradient id={`${id}-s1-grad`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isDark ? '#DAEE01' : '#806517'} />
            <stop offset="100%" stopColor={isDark ? '#FAF0E6' : '#8FB31D'} />
          </linearGradient>

          <linearGradient id={`${id}-s2-grad`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isDark ? '#8FB31D' : '#806517'} />
            <stop offset="100%" stopColor={isDark ? '#DAEE01' : '#806517'} />
          </linearGradient>

          {/* Open Source Initiative Keyhole Cutout Mask */}
          <mask id={`${id}-keyhole-mask`}>
            <rect x="0" y="0" width="280" height="130" fill="white" />
            {/* Center keyhole circular head */}
            <circle cx="121" cy="34" r="8" fill="black" />
            {/* Keyhole wedge cut spreading outwards to the bottom */}
            <polygon points="121,30 110,55 132,55" fill="black" />
          </mask>
        </defs>

        {/* 1. Round Edge Rectangle Container */}
        <rect
          x="32"
          y="4"
          width="216"
          height="60"
          rx="14"
          ry="14"
          fill={isDark ? '#0D031B' : '#FAF0E6'}
          stroke={isDark ? '#DAEE01' : '#0D031B'}
          strokeWidth="2.5"
          className="transition-colors duration-200"
        />

        {/* 2. Large, Evenly Spaced Bold Green FOSS Wordmark */}
        {/* Letter F */}
        <path
          d="M 64 15 H 94 V 24 H 74 V 31 H 88 V 39.5 H 74 V 53 H 64 Z"
          fill={`url(#${id}-f-grad)`}
        />

        {/* Letter O (Open Source Keyhole Ring) */}
        <circle
          cx="121"
          cy="34"
          r="19"
          fill={`url(#${id}-o-grad)`}
          mask={`url(#${id}-keyhole-mask)`}
        />

        {/* First Letter S (Starts at 148px, gap 8px) */}
        <text
          x="148"
          y="53"
          fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="900"
          fontSize="48"
          fill={`url(#${id}-s1-grad)`}
        >
          S
        </text>

        {/* Second Letter S (Starts at 186px, gap 8px) */}
        <text
          x="186"
          y="53"
          fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="900"
          fontSize="48"
          fill={`url(#${id}-s2-grad)`}
        >
          S
        </text>

        {/* 3. Middle Section: "for" in smaller letters */}
        <line
          x1="90"
          y1="78.5"
          x2="116"
          y2="78.5"
          stroke={isDark ? '#DAEE01' : '#806517'}
          strokeWidth="1.5"
        />
        <text
          x="140"
          y="83"
          textAnchor="middle"
          fontFamily="'Fraunces', Georgia, serif"
          fontStyle="italic"
          fontSize="15"
          fill={isDark ? '#DAEE01' : '#806517'}
          className="transition-colors duration-200 font-bold"
        >
          for
        </text>
        <line
          x1="164"
          y1="78.5"
          x2="190"
          y2="78.5"
          stroke={isDark ? '#DAEE01' : '#806517'}
          strokeWidth="1.5"
        />

        {/* 4. Bottom Section: "The Common Need" */}
        <text
          x="140"
          y="114"
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="800"
          fontSize="22"
          letterSpacing="-0.025em"
          fill={isDark ? '#FAF0E6' : '#0D031B'}
          className="transition-colors duration-200"
        >
          The Common Need
        </text>
      </svg>
    </div>
  );
};

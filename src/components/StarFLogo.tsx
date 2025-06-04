
import React from 'react';

interface StarFLogoProps {
  size?: number;
  className?: string;
}

const StarFLogo: React.FC<StarFLogoProps> = ({ size = 32, className = "" }) => {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="platinumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E5E7EB" />
            <stop offset="25%" stopColor="#F9FAFB" />
            <stop offset="50%" stopColor="#D1D5DB" />
            <stop offset="75%" stopColor="#F3F4F6" />
            <stop offset="100%" stopColor="#9CA3AF" />
          </linearGradient>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#6B7280" floodOpacity="0.3"/>
          </filter>
        </defs>
        
        {/* Star shape */}
        <path
          d="M50 5 L61.8 38.2 L95 38.2 L69.1 57.8 L80.9 91 L50 71.4 L19.1 91 L30.9 57.8 L5 38.2 L38.2 38.2 Z"
          fill="url(#platinumGradient)"
          stroke="#9CA3AF"
          strokeWidth="1"
          filter="url(#shadow)"
        />
        
        {/* Letter F */}
        <text
          x="50"
          y="60"
          textAnchor="middle"
          fontSize="32"
          fontFamily="serif"
          fontWeight="bold"
          fill="#374151"
        >
          F
        </text>
      </svg>
    </div>
  );
};

export default StarFLogo;

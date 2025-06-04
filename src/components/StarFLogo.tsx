
import React from 'react';

interface StarFLogoProps {
  size?: number;
  className?: string;
}

const StarFLogo: React.FC<StarFLogoProps> = ({ size = 32, className = "" }) => {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <div
        className="bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center shadow-sm border border-emerald-200"
        style={{ 
          width: size, 
          height: size,
          fontSize: size * 0.6
        }}
      >
        <span 
          className="font-bold text-emerald-700"
          style={{ 
            fontFamily: 'Georgia, serif',
            lineHeight: 1
          }}
        >
          F
        </span>
      </div>
    </div>
  );
};

export default StarFLogo;

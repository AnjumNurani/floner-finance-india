
import React from 'react';

interface StarFLogoProps {
  size?: number;
  className?: string;
}

const StarFLogo: React.FC<StarFLogoProps> = ({ size = 32, className = "" }) => {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <div
        className="bg-nude-100 rounded-lg flex items-center justify-center shadow-sm border border-nude-200"
        style={{ 
          width: size, 
          height: size,
          fontSize: size * 0.6
        }}
      >
        <span 
          className="font-bold text-jade-600"
          style={{ 
            fontFamily: 'Georgia, serif',
            lineHeight: 1
          }}
        >
          Z
        </span>
      </div>
    </div>
  );
};

export default StarFLogo;

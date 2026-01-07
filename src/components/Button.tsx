import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  withIcon?: boolean;
  pulse?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = true, 
  withIcon = true,
  pulse = false,
  className = '',
  ...props 
}) => {
  // Professional base styles with proper touch targets (min 56px height mobile)
  const baseStyles = "relative overflow-hidden font-bold rounded-xl sm:rounded-2xl transition-all duration-300 transform active:scale-[0.97] flex items-center justify-center tracking-wide group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FFD700]/40 min-h-[56px]";
  
  // Premium variants with improved contrast and accessibility
  const variants = {
    // Professional gradient with optimal contrast and clear states
    primary: "bg-gradient-to-br from-[#D4AF37] via-[#FFD700] to-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/40 hover:shadow-xl hover:shadow-[#D4AF37]/50 hover:brightness-110 border-t-2 border-white/30 ring-1 ring-white/10 ring-inset hover:scale-[1.02] active:scale-[0.98]",
    secondary: "bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/15 hover:border-white/40 shadow-md hover:shadow-lg"
  };

  // Pulse animation for urgency
  const pulseClass = pulse ? "animate-glow-pulse" : "";
  const widthClass = fullWidth ? "w-full" : "w-auto";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${pulseClass} ${className}`}
      {...props}
    >
      {/* Internal Glass/Gloss Effect */}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent opacity-60 pointer-events-none"></div>
      )}

      {/* Shimmer Effect Animation on hover */}
      {variant === 'primary' && (
        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-0 group-hover:opacity-30 transition-opacity group-hover:animate-shimmer" />
      )}
      
      {/* Content wrapper with generous touch-friendly padding */}
      <span className="relative z-10 flex flex-row items-center justify-center gap-2.5 leading-tight text-center py-4 sm:py-5 px-6 sm:px-8 md:px-10 text-base sm:text-lg md:text-xl">
        {children}
        {withIcon && <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 group-hover:translate-x-1 transition-transform" />}
      </span>
    </button>
  );
};
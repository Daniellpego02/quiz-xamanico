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
  // Redesigned base: Softer rounding, cleaner typography, better transitions
  const baseStyles = "relative overflow-hidden font-bold rounded-xl transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center tracking-wide group";
  
  // New Premium Variants
  const variants = {
    // Elegant gradient with inner ring and diffuse shadow (no thick border)
    primary: "bg-gradient-to-br from-[#D4AF37] via-[#FFD700] to-[#D4AF37] text-white shadow-lg shadow-[#D4AF37]/30 hover:shadow-[#D4AF37]/50 hover:brightness-110 border-t border-white/20 ring-1 ring-white/10 ring-inset",
    secondary: "bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20"
  };

  // Uses new glow-pulse animation
  const pulseClass = pulse ? "animate-glow-pulse" : "";
  const widthClass = fullWidth ? "w-full" : "w-auto";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${pulseClass} ${className}`}
      {...props}
    >
      {/* Internal Glass/Gloss Effect */}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50 pointer-events-none"></div>
      )}

      {/* Shimmer Effect Animation */}
      {variant === 'primary' && (
        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shimmer" />
      )}
      
      {/* Content wrapper with standardized padding */}
      <span className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-2 leading-tight text-center py-4 px-6 md:px-8 text-lg md:text-xl">
        {children}
        {withIcon && <ArrowRight className="w-5 h-5 md:w-6 md:h-6 hidden md:block group-hover:translate-x-1 transition-transform" />}
      </span>
    </button>
  );
};
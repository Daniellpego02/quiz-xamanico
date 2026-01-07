import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/**
 * RITUAL BUTTON - Artifact-style CTA button
 * Styled as an ancient seal or artifact, not a modern button
 */

interface RitualButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'seal' | 'artifact' | 'invocation';
  size?: 'sm' | 'md' | 'lg';
  withIcon?: boolean;
  pulse?: boolean;
  children: React.ReactNode;
}

export const RitualButton: React.FC<RitualButtonProps> = ({
  variant = 'artifact',
  size = 'md',
  withIcon = true,
  pulse = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'py-3 px-5 text-sm',
    md: 'py-4 px-8 text-base sm:text-lg',
    lg: 'py-5 px-10 text-lg sm:text-xl'
  };

  if (variant === 'seal') {
    return (
      <motion.button
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        className={`
          relative overflow-hidden
          ${sizeClasses[size]}
          bg-gradient-to-br from-[#1a0a2e] via-[#0d0518] to-[#1a0a2e]
          border-2 border-[#C9A227]/60
          rounded-full
          text-[#C9A227] font-ritual font-bold
          tracking-wider uppercase
          shadow-[0_0_30px_rgba(201,162,39,0.3),inset_0_0_20px_rgba(201,162,39,0.1)]
          transition-all duration-400
          hover:border-[#C9A227] hover:shadow-[0_0_50px_rgba(201,162,39,0.5),inset_0_0_30px_rgba(201,162,39,0.2)]
          disabled:opacity-50 disabled:cursor-not-allowed
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]/50
          ${pulse ? 'animate-ritual-glow' : ''}
          ${className}
        `}
        disabled={disabled}
        {...props}
      >
        {/* Expanding aura */}
        <motion.span
          className="absolute inset-0 rounded-full border border-[#C9A227]/30"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
        
        {/* Inner glow */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-b from-[#C9A227]/10 to-transparent pointer-events-none" />
        
        <span className="relative z-10 flex items-center justify-center gap-3">
          {children}
        </span>
      </motion.button>
    );
  }

  if (variant === 'invocation') {
    return (
      <motion.button
        whileHover={!disabled ? { scale: 1.02, y: -2 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        className={`
          relative overflow-hidden
          ${sizeClasses[size]}
          bg-gradient-to-br from-[#2a1a3e] via-[#1a0a2e] to-[#2a1a3e]
          border border-[#C9A227]/40
          rounded-xl
          text-white font-medium
          shadow-[0_4px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(201,162,39,0.15)]
          transition-all duration-400
          hover:border-[#C9A227]/70 hover:shadow-[0_8px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(201,162,39,0.25)]
          disabled:opacity-50 disabled:cursor-not-allowed
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]/50
          ${className}
        `}
        disabled={disabled}
        {...props}
      >
        {/* Subtle shimmer */}
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A227]/10 to-transparent"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
        />
        
        <span className="relative z-10 flex items-center justify-center gap-3">
          {children}
          {withIcon && (
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          )}
        </span>
      </motion.button>
    );
  }

  // Default: artifact variant
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02, y: -3 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      className={`
        relative overflow-hidden
        ${sizeClasses[size]}
        ritual-button
        min-h-[56px]
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C9A227]/40
        ${pulse ? 'animate-ritual-glow' : ''}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {/* Shimmer effect */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
      />
      
      <span className="relative z-10 flex items-center justify-center gap-3">
        {children}
        {withIcon && (
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.span>
        )}
      </span>
    </motion.button>
  );
};

/**
 * RITUAL OPTION - Answer card styled as destiny choice
 */
interface RitualOptionProps {
  label: string;
  sublabel?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export const RitualOption: React.FC<RitualOptionProps> = ({
  label,
  sublabel,
  selected = false,
  disabled = false,
  onClick,
  className = ''
}) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled && !selected ? { scale: 1.01, y: -4 } : {}}
      whileTap={!disabled ? { scale: 0.99 } : {}}
      className={`
        w-full text-left relative overflow-hidden
        p-5 sm:p-6
        rounded-xl
        transition-all duration-400
        ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
        ${selected
          ? 'bg-gradient-to-br from-[#2a1a3e]/95 to-[#1a0a2e]/95 border-[3px] border-[#C9A227] shadow-[0_0_40px_rgba(201,162,39,0.4),inset_0_0_30px_rgba(201,162,39,0.1)]'
          : 'ritual-option'
        }
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]/50
        ${className}
      `}
    >
      {/* Background energy on hover */}
      {!selected && (
        <motion.span
          className="absolute inset-0 bg-radial-gradient opacity-0 transition-opacity duration-400 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(201, 162, 39, 0.1) 0%, transparent 70%)'
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      )}
      
      {/* Selected glow */}
      {selected && (
        <motion.span
          className="absolute inset-0 bg-gradient-to-br from-[#C9A227]/10 to-transparent rounded-xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
      
      <div className="relative z-10 space-y-2">
        <p className="text-white font-bold text-base sm:text-lg leading-snug">
          {label}
        </p>
        {sublabel && (
          <p className="text-white/70 text-sm sm:text-base leading-relaxed">
            {sublabel}
          </p>
        )}
      </div>
      
      {/* Selection indicator */}
      {selected && (
        <motion.div
          className="absolute right-4 top-1/2 -translate-y-1/2"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div className="w-8 h-8 rounded-full bg-[#C9A227] flex items-center justify-center shadow-[0_0_20px_rgba(201,162,39,0.6)]">
            <svg className="w-5 h-5 text-[#0a0510]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </motion.div>
      )}
    </motion.button>
  );
};

export default RitualButton;

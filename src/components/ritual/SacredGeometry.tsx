import React from 'react';
import { motion } from 'framer-motion';

/**
 * SACRED GEOMETRY - Background decorative elements
 * Creates mystical mandala and sigil patterns
 */

interface SacredGeometryProps {
  variant?: 'mandala' | 'sigil' | 'portal' | 'energy-field';
  size?: number;
  className?: string;
  opacity?: number;
}

export const SacredGeometry: React.FC<SacredGeometryProps> = ({
  variant = 'mandala',
  size = 400,
  className = '',
  opacity = 0.1
}) => {
  if (variant === 'mandala') {
    return (
      <motion.div
        className={`absolute pointer-events-none ${className}`}
        style={{ width: size, height: size, opacity }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Outer circles */}
          <circle cx="100" cy="100" r="95" fill="none" stroke="#C9A227" strokeWidth="0.5" opacity="0.3" />
          <circle cx="100" cy="100" r="85" fill="none" stroke="#C9A227" strokeWidth="0.3" opacity="0.2" />
          <circle cx="100" cy="100" r="75" fill="none" stroke="#C9A227" strokeWidth="0.5" opacity="0.3" />
          <circle cx="100" cy="100" r="65" fill="none" stroke="#C9A227" strokeWidth="0.3" opacity="0.2" />
          <circle cx="100" cy="100" r="55" fill="none" stroke="#C9A227" strokeWidth="0.5" opacity="0.3" />
          
          {/* Cross lines */}
          <line x1="100" y1="5" x2="100" y2="195" stroke="#C9A227" strokeWidth="0.3" opacity="0.2" />
          <line x1="5" y1="100" x2="195" y2="100" stroke="#C9A227" strokeWidth="0.3" opacity="0.2" />
          <line x1="29" y1="29" x2="171" y2="171" stroke="#C9A227" strokeWidth="0.3" opacity="0.2" />
          <line x1="171" y1="29" x2="29" y2="171" stroke="#C9A227" strokeWidth="0.3" opacity="0.2" />
          
          {/* Inner star pattern */}
          <polygon 
            points="100,20 115,80 175,80 125,115 145,175 100,140 55,175 75,115 25,80 85,80" 
            fill="none" 
            stroke="#C9A227" 
            strokeWidth="0.5" 
            opacity="0.3" 
          />
        </svg>
      </motion.div>
    );
  }

  if (variant === 'sigil') {
    return (
      <motion.div
        className={`absolute pointer-events-none ${className}`}
        style={{ width: size, height: size, opacity }}
        animate={{ 
          scale: [1, 1.02, 1],
          opacity: [opacity, opacity * 1.3, opacity]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Sigil pattern - abstract mystical symbol */}
          <circle cx="50" cy="50" r="45" fill="none" stroke="#C9A227" strokeWidth="1" opacity="0.4" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="#C9A227" strokeWidth="0.5" opacity="0.3" />
          <path 
            d="M50 5 L50 95 M5 50 L95 50" 
            stroke="#C9A227" 
            strokeWidth="0.5" 
            opacity="0.3" 
          />
          <path 
            d="M50 20 L65 40 L85 40 L70 55 L75 75 L50 62 L25 75 L30 55 L15 40 L35 40 Z" 
            fill="none" 
            stroke="#C9A227" 
            strokeWidth="0.8" 
            opacity="0.4" 
          />
        </svg>
      </motion.div>
    );
  }

  if (variant === 'portal') {
    return (
      <div className={`absolute pointer-events-none ${className}`} style={{ width: size, height: size }}>
        {/* Multiple expanding rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border border-[#C9A227]"
            style={{ opacity: opacity * (1 - i * 0.3) }}
            animate={{
              scale: [1 + i * 0.1, 1.5 + i * 0.1, 1 + i * 0.1],
              opacity: [opacity * (1 - i * 0.3), 0, opacity * (1 - i * 0.3)]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: 'easeOut',
              delay: i * 0.5
            }}
          />
        ))}
        
        {/* Center glow */}
        <motion.div
          className="absolute inset-[20%] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(201, 162, 39, 0.2) 0%, transparent 70%)'
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    );
  }

  if (variant === 'energy-field') {
    return (
      <motion.div
        className={`absolute pointer-events-none rounded-full ${className}`}
        style={{
          width: size,
          height: size,
          background: 'radial-gradient(circle, rgba(201, 162, 39, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)'
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [opacity, opacity * 1.5, opacity]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    );
  }

  return null;
};

/**
 * RITUAL PROGRESS RING - Circular progress indicator
 * Replaces linear progress bars with sacred geometry
 */
interface ProgressRingProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 120,
  strokeWidth = 4,
  className = ''
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(201, 162, 39, 0.1) 0%, transparent 60%)'
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <svg className="progress-ring w-full h-full" viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(201, 162, 39, 0.1)"
          strokeWidth={strokeWidth}
        />
        
        {/* Outer decorative ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius + 8}
          fill="none"
          stroke="rgba(201, 162, 39, 0.2)"
          strokeWidth={1}
          strokeDasharray="4 4"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#goldGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="progress-ring-circle"
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B7355" />
            <stop offset="50%" stopColor="#C9A227" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-lg font-bold text-[#C9A227] font-ritual ritual-text-glow"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          {Math.round(progress)}%
        </motion.span>
      </div>
    </div>
  );
};

export default SacredGeometry;

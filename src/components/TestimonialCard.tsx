import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Instagram, Facebook, Sparkles } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  format: 'whatsapp' | 'instagram' | 'facebook';
  text: string;
  image: string;
  delay?: number;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, format, text, image, delay = 0 }) => {
  const formatStyles = {
    whatsapp: {
      container: 'bg-gradient-to-br from-[#0d1a0f]/90 via-[#0a1508]/80 to-[#0d1a0f]/90 border-[#C9A227]/30 hover:border-[#C9A227]/60',
      header: 'bg-gradient-to-r from-[#0d1a0f]/60 to-[#0a1508]/60',
      icon: <MessageCircle className="w-4 h-4 text-green-400" />,
      accent: 'text-[#C9A227]',
      glow: 'group-hover:shadow-[0_0_30px_rgba(201,162,39,0.2)]',
      accentBorder: 'border-l-green-500'
    },
    instagram: {
      container: 'bg-gradient-to-br from-[#1a0d1a]/90 via-[#150a15]/80 to-[#1a0d1a]/90 border-[#C9A227]/30 hover:border-[#C9A227]/60',
      header: 'bg-gradient-to-r from-[#1a0d1a]/60 to-[#150a15]/60',
      icon: <Instagram className="w-4 h-4 text-pink-400" />,
      accent: 'text-[#C9A227]',
      glow: 'group-hover:shadow-[0_0_30px_rgba(201,162,39,0.2)]',
      accentBorder: 'border-l-pink-500'
    },
    facebook: {
      container: 'bg-gradient-to-br from-[#0d0d1a]/90 via-[#0a0a15]/80 to-[#0d0d1a]/90 border-[#C9A227]/30 hover:border-[#C9A227]/60',
      header: 'bg-gradient-to-r from-[#0d0d1a]/60 to-[#0a0a15]/60',
      icon: <Facebook className="w-4 h-4 text-blue-400" />,
      accent: 'text-[#C9A227]',
      glow: 'group-hover:shadow-[0_0_30px_rgba(201,162,39,0.2)]',
      accentBorder: 'border-l-blue-500'
    }
  };

  const style = formatStyles[format];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -4, scale: 1.01 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className={`${style.container} ${style.glow} border rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-400 group relative`}
    >
      {/* Ritual corner decorations */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#C9A227]/40 rounded-tl-xl" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#C9A227]/40 rounded-tr-xl" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#C9A227]/40 rounded-bl-xl" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#C9A227]/40 rounded-br-xl" />
      
      {/* Hover glow overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#C9A227]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
      />
      
      {/* Header */}
      <div className={`${style.header} p-3 flex items-center gap-3 border-b border-[#C9A227]/20 relative`}>
        {/* Avatar with ritual ring */}
        <div className="relative">
          <motion.div
            className="absolute -inset-1 rounded-full border border-[#C9A227]/30 opacity-0 group-hover:opacity-100"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <img 
            src={image} 
            alt={name}
            className="w-10 h-10 rounded-full border-2 border-[#C9A227]/50 object-cover relative z-10"
            onError={(e) => {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
            }}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-white font-semibold text-sm">{name}</p>
            {style.icon}
          </div>
          <div className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#C9A227]" />
            <p className={`text-xs ${style.accent} opacity-80`}>Transformação verificada</p>
          </div>
        </div>
      </div>

      {/* Content with accent border */}
      <div className={`p-4 border-l-2 ${style.accentBorder} ml-3`}>
        <p className="text-gray-200 text-sm leading-relaxed">
          {text}
        </p>
      </div>
    </motion.div>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Instagram, Facebook } from 'lucide-react';

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
      container: 'bg-gradient-to-br from-green-950/40 to-green-900/20 border-green-500/20 hover:border-green-500/40',
      header: 'bg-green-900/30',
      icon: <MessageCircle className="w-4 h-4 text-green-400" />,
      accent: 'text-green-400',
      glow: 'group-hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]'
    },
    instagram: {
      container: 'bg-gradient-to-br from-purple-950/40 to-pink-900/20 border-pink-500/20 hover:border-pink-500/40',
      header: 'bg-gradient-to-r from-purple-900/30 to-pink-900/30',
      icon: <Instagram className="w-4 h-4 text-pink-400" />,
      accent: 'text-pink-400',
      glow: 'group-hover:shadow-[0_0_20px_rgba(244,114,182,0.15)]'
    },
    facebook: {
      container: 'bg-gradient-to-br from-blue-950/40 to-blue-900/20 border-blue-500/20 hover:border-blue-500/40',
      header: 'bg-blue-900/30',
      icon: <Facebook className="w-4 h-4 text-blue-400" />,
      accent: 'text-blue-400',
      glow: 'group-hover:shadow-[0_0_20px_rgba(96,165,250,0.15)]'
    }
  };

  const style = formatStyles[format];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={`${style.container} ${style.glow} border rounded-xl overflow-hidden shadow-lg backdrop-blur-sm transition-all duration-300 group`}
    >
      {/* Header */}
      <div className={`${style.header} p-3 flex items-center gap-3 border-b border-white/5`}>
        <img 
          src={image} 
          alt={name}
          className="w-10 h-10 rounded-full border-2 border-white/20 object-cover"
          onError={(e) => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
          }}
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-white font-semibold text-sm">{name}</p>
            {style.icon}
          </div>
          <p className={`text-xs ${style.accent} opacity-80`}>Cliente verificado</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-gray-200 text-sm leading-relaxed">
          {text}
        </p>
      </div>
    </motion.div>
  );
};

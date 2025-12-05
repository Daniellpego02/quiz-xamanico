import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { Trophy, Lock, ArrowDown, Clock } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  const handleStartClick = () => {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', { content_name: 'Quiz Iniciado' });
    }
    onStart();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen px-6 py-8 max-w-lg mx-auto text-center items-center justify-center space-y-8 md:space-y-10 relative"
    >
      {/* Ambient Glow behind Hero */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Badge */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 bg-emerald-950/40 backdrop-blur-md text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)] relative z-10"
      >
        <Trophy className="w-3 h-3" />
        <span>Mais de 20.000 vidas transformadas</span>
      </motion.div>

      {/* Headline */}
      <motion.h1 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
        className="relative z-10 text-3xl md:text-5xl font-serif font-black text-white leading-[1.1] drop-shadow-2xl"
      >
        O Que Está <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FF9500] to-orange-600 underline decoration-orange-500/0">BLOQUEANDO</span> Sua Prosperidade?
        {/* Glow effect for the keyword */}
        <span className="absolute inset-0 blur-2xl bg-orange-500/10 -z-10"></span>
      </motion.h1>

      {/* Subheadline */}
      <motion.p 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 0.35 }}
         className="relative z-10 text-slate-200 text-lg md:text-xl font-medium drop-shadow-lg"
      >
        Teste gratuito de 1 minuto revela exatamente o que te impede de prosperar.
      </motion.p>

      {/* Glass Card for Pain Points */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 w-full space-y-4 text-slate-300 text-base md:text-lg leading-relaxed text-left bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
      >
        <div className="flex gap-4 items-start">
          <div className="bg-red-500/10 p-2.5 rounded-full shrink-0 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
             <Lock className="w-5 h-5 text-red-400" />
          </div>
          <p className="text-sm md:text-base">
            <span className="font-bold text-white tracking-wide">Atenção:</span> Você pode ter <span className="text-red-300 font-bold border-b border-red-500/30 pb-0.5">bloqueios energéticos invisíveis</span> que travam seu dinheiro e relacionamentos — sem você perceber.
          </p>
        </div>
      </motion.div>

      {/* Urgency + CTA */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-full pt-4 pb-8 relative z-10"
      >
        <div className="flex items-center justify-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-wider mb-4 animate-pulse">
           <Clock className="w-3 h-3" /> Disponível por tempo limitado
        </div>
        
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
          <Button onClick={handleStartClick} pulse className="relative text-xl shadow-2xl">
            FAZER O TESTE AGORA
          </Button>
        </div>
        
        <div className="mt-6 flex flex-col items-center animate-bounce text-slate-500">
            <span className="text-[10px] uppercase tracking-widest mb-1">Começar</span>
            <ArrowDown className="w-4 h-4" />
        </div>
      </motion.div>
    </motion.div>
  );
};
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { Lock, Clock, Eye, Trophy } from 'lucide-react';

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
      className="flex flex-col min-h-[100dvh] max-w-lg mx-auto relative overflow-hidden"
    >
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full bg-gradient-to-r from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e] border-b border-[#FF9500]/30 py-3 px-4 shadow-lg relative z-20"
      >
        <div className="flex items-center justify-center gap-3">
          <Eye className="w-5 h-5 text-[#FF9500] animate-pulse" />
          <p className="text-xs font-serif text-[#FF9500] tracking-wider uppercase">
            Revelação Ancestral Liberada
          </p>
        </div>
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center px-5 py-4 space-y-6 text-center relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[80px] pointer-events-none -z-10"></div>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-1.5 bg-emerald-950/40 backdrop-blur-md text-emerald-400 px-3 py-1 rounded-full text-[10px] font-bold border border-emerald-500/30"
        >
          <Trophy className="w-3 h-3" />
          <span>+20.000 vidas transformadas</span>
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl md:text-4xl font-serif font-black text-white leading-[1.1] drop-shadow-2xl mb-2">
            O Que Está <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FF9500] to-orange-600 underline decoration-orange-500/0">TRAVANDO</span> Sua Vida Financeira?
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xs mx-auto">
            Faça o teste de 1 minuto e descubra o <strong>Bloqueio Oculto</strong> que impede sua prosperidade.
          </p>
        </motion.div>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full relative group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl blur opacity-40 group-hover:opacity-70 transition duration-1000 animate-pulse"></div>
          <Button onClick={handleStartClick} pulse className="relative text-lg py-4 w-full shadow-[0_0_30px_rgba(255,149,0,0.3)] border-t border-white/20">
            FAZER O TESTE AGORA
          </Button>
          <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-widest flex items-center justify-center gap-1">
            <Clock className="w-3 h-3" /> Gratuito por tempo limitado
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/5 text-left flex gap-3 items-center mt-2"
        >
          <div className="bg-red-500/10 p-2 rounded-full shrink-0 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
             <Lock className="w-4 h-4 text-red-400" />
          </div>
          <p className="text-xs text-slate-300 leading-snug">
            <strong>Atenção:</strong> Você pode ter <span className="text-red-300 font-bold border-b border-red-500/30 pb-0.5">bloqueios energéticos invisíveis</span> que travam seu dinheiro e relacionamentos — sem você perceber.
          </p>
        </motion.div>

      </div>
    </motion.div>
  );
};
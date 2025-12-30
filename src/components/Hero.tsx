import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { Lock } from 'lucide-react';
import { tracking } from '../utils/tracking';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  const handleStartClick = () => {
    tracking.meta.lead({ content_name: 'Quiz Iniciado' });
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
        className="w-full bg-gradient-to-r from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e] border-b border-[#D4AF37]/30 py-3 px-4 shadow-lg relative z-20"
      >
        <div className="flex items-center justify-center gap-3">
          <Lock className="w-4 h-4 text-[#D4AF37] animate-pulse" />
          <p className="text-[10px] font-medium text-[#D4AF37] tracking-[0.15em] uppercase">
            DIAGNÓSTICO DE FREQUÊNCIA FINANCEIRA
          </p>
        </div>
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center px-5 py-4 space-y-5 text-center relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#D4AF37]/10 rounded-full blur-[80px] pointer-events-none -z-10"></div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <h1 className="text-2xl md:text-3xl font-serif font-black text-white leading-[1.15] drop-shadow-2xl">
            Existe uma <span className="text-[#D4AF37]">"Trava Ancestral"</span> impedindo o dinheiro de parar na sua mão?
          </h1>
          <h2 className="text-base md:text-lg text-slate-200 leading-relaxed max-w-md mx-auto font-normal">
            O Protocolo Xamânico revela onde está o vazamento.
          </h2>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-md mx-auto">
            Responda a <strong className="text-white">4 perguntas simples</strong> para mapear sua assinatura energética e descobrir como desbloquear seu fluxo de prosperidade em <strong className="text-white">7 dias</strong>.
          </p>
        </motion.div>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full relative group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-xl blur opacity-40 group-hover:opacity-70 transition duration-1000 animate-pulse"></div>
          <Button onClick={handleStartClick} pulse className="relative text-base md:text-lg py-4 w-full shadow-[0_0_30px_rgba(212,175,55,0.3)] border-t border-white/20">
            QUERO INICIAR MEU MAPEAMENTO AGORA
          </Button>
          <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" /> 🔒 Análise confidencial e baseada em princípios milenares. Mais de 4.300 mapas gerados.
          </p>
        </motion.div>

      </div>
    </motion.div>
  );
};
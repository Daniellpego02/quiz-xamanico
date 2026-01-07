import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { ShieldCheck, Star, Sparkles } from 'lucide-react';
import { QuizPath } from '../types';
import { SocialProofCarousel } from './SocialProofCarousel';

interface SocialProofProps {
  onNext: () => void;
  quizPath?: QuizPath;
}

// Social proof images - New screenshots from public folder
const socialProofImages = [
  '/prova1.png',
  '/prova2.png',
  '/prova3.png',
  '/prova4.png',
  '/prova5.png',
  '/prova6.png',
  '/prova7.png',
];

export const SocialProof: React.FC<SocialProofProps> = ({ onNext, quizPath = 'finance' }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen max-w-4xl mx-auto px-4 py-8 sm:py-12 flex flex-col relative z-10"
    >
      {/* Header Section */}
      <div className="text-center mb-6 sm:mb-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="inline-block mb-4"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-gradient-to-br from-[#4ade80]/30 to-[#22c55e]/10 border-2 border-[#4ade80]/40 flex items-center justify-center shadow-[0_0_30px_rgba(74,222,128,0.3)]">
            <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-[#4ade80]" />
          </div>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight mb-3 sm:mb-4 drop-shadow-lg"
        >
          ✨ Provas Sociais <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#22c55e]">Reais</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Veja os prints reais de resultados de quem já destravou a prosperidade com o Mapa Xamânico
        </motion.p>
      </div>

      {/* Carousel Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8 sm:mb-12 px-2 sm:px-4"
      >
        <SocialProofCarousel 
          images={socialProofImages}
          autoPlayInterval={5000}
        />
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center mb-8 sm:mb-10"
      >
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#4ade80]/10 via-[#22c55e]/10 to-[#4ade80]/10 border-2 border-[#4ade80]/30 rounded-full px-5 sm:px-8 py-3 sm:py-4 shadow-[0_0_20px_rgba(74,222,128,0.2)]">
          <div className="flex -space-x-2">
            {['👩🏻', '👨🏽', '👩🏼', '👨🏻', '👩🏾'].map((avatar, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 + (i * 0.1), type: "spring" }}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#4ade80] to-[#22c55e] border-2 border-black flex items-center justify-center text-base sm:text-lg shadow-lg"
              >
                {avatar}
              </motion.div>
            ))}
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="text-[#4ade80] text-sm sm:text-base md:text-lg font-black leading-tight">
              +21.400 pessoas
            </p>
            <p className="text-slate-400 text-xs sm:text-sm font-medium leading-tight">
              já transformaram suas vidas
            </p>
          </div>
        </div>
      </motion.div>

      {/* Trust Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto mb-8 sm:mb-10 px-4"
      >
        <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-br from-[#4ade80]/5 to-transparent border border-[#4ade80]/20 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
          <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#4ade80] shrink-0" />
          <span className="text-slate-200 text-xs sm:text-sm font-semibold leading-tight">100% Seguro</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-br from-[#4ade80]/5 to-transparent border border-[#4ade80]/20 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
          <Star className="w-5 h-5 sm:w-6 sm:h-6 text-[#4ade80] shrink-0 fill-[#4ade80]" />
          <span className="text-slate-200 text-xs sm:text-sm font-semibold leading-tight">Resultados Reais</span>
        </div>
      </motion.div>

      {/* CTA Section - Sticky on mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="text-center space-y-4 pt-4 pb-6 sm:pb-8 mt-auto sticky bottom-0 bg-gradient-to-t from-black via-black/95 to-black/80 backdrop-blur-lg p-4 sm:p-6 border-t border-[#4ade80]/20 rounded-t-2xl sm:rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.8)]"
      >
        <Button 
          onClick={onNext} 
          pulse 
          className="shadow-[#4ade80]/30 w-full max-w-md mx-auto relative overflow-hidden bg-gradient-to-r from-[#4ade80] to-[#22c55e] hover:from-[#22c55e] hover:to-[#4ade80] text-black font-black text-base sm:text-lg py-4 sm:py-5 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-all border-2 border-[#4ade80]/80"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" />
            QUERO VER MEU RESULTADO
            <Sparkles className="w-5 h-5" />
          </span>
        </Button>
        
        <div className="flex items-center justify-center gap-2 text-emerald-400 text-xs sm:text-sm font-bold bg-emerald-950/30 p-2.5 sm:p-3 rounded-full border border-emerald-500/20 max-w-md mx-auto">
          <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
          <span>Satisfação Garantida ou Seu Dinheiro de Volta</span>
        </div>
      </motion.div>
    </motion.div>
  );
};
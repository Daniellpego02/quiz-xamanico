import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Brain, Heart, Wallet, CheckCircle2, Star } from 'lucide-react';

interface AnalysisLoadingProps {
  onComplete: () => void;
}

export const AnalysisLoading: React.FC<AnalysisLoadingProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);

  const stages = [
    { pct: 20, text: "Identificando bloqueio financeiro...", icon: <Wallet className="w-6 h-6 text-gold-400" /> },
    { pct: 45, text: "Analisando bloqueio emocional...", icon: <Heart className="w-6 h-6 text-red-400" /> },
    { pct: 70, text: "Verificando bloqueio de propósito...", icon: <Brain className="w-6 h-6 text-purple-400" /> },
    { pct: 95, text: "Gerando seu mapa personalizado...", icon: <Search className="w-6 h-6 text-blue-400" /> },
    { pct: 100, text: "Quase lá! Preparando seu resultado.", icon: <CheckCircle2 className="w-6 h-6 text-green-400" /> }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800); // Small delay at 100% before switch
          return 100;
        }
        // Nonlinear progress speed
        const increment = Math.random() * 3 + 0.5;
        return Math.min(prev + increment, 100);
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Update text stage based on progress
  useEffect(() => {
    if (progress < 20) setStage(0);
    else if (progress < 45) setStage(1);
    else if (progress < 70) setStage(2);
    else if (progress < 95) setStage(3);
    else setStage(4);
  }, [progress]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 max-w-lg mx-auto text-center space-y-10 relative z-10">
      
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
         <div className="w-[300px] h-[300px] bg-gold-500/10 rounded-full blur-[80px] animate-pulse"></div>
      </div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="w-24 h-24 rounded-full border-4 border-white/5 border-t-gold-500 shadow-[0_0_50px_rgba(245,158,11,0.4)] relative"
      >
        <div className="absolute inset-0 bg-gold-500/10 rounded-full blur-xl"></div>
      </motion.div>

      <div className="space-y-6 w-full">
        <h2 className="text-xl font-serif text-white animate-pulse tracking-wide">
          Analisando suas respostas...
        </h2>
        
        <div className="w-full bg-white/5 rounded-full h-4 overflow-hidden border border-white/10 shadow-inner">
          <motion.div 
            className="bg-gradient-to-r from-gold-600 via-gold-400 to-white h-full rounded-full shadow-[0_0_20px_rgba(251,191,36,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="h-16 flex items-center justify-center gap-3 transition-all duration-300 bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10">
          <div className="p-2 bg-white/5 rounded-full">{stages[stage].icon}</div>
          <span className="text-slate-200 font-medium text-sm text-left">
            {stages[stage].text} <br/>
            <span className="text-gold-500 font-bold text-xs tracking-widest uppercase">Progresso: {Math.round(progress)}%</span>
          </span>
        </div>
      </div>

      {/* Social Proof during loading - Retention tactic */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10 mt-8 shadow-lg max-w-sm"
      >
        <p className="text-[10px] text-gold-500 font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
          <Star className="w-3 h-3 fill-gold-500" /> Depoimento recente
        </p>
        <p className="text-slate-200 text-sm italic leading-relaxed">“Adorei meu Mapa! Completo e fácil de entender.”</p>
        <p className="text-slate-400 text-xs mt-2 text-right">– @RafaelaNascimento7</p>
      </motion.div>
    </div>
  );
};
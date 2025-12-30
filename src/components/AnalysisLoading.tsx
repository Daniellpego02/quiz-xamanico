import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Brain, Heart, Wallet, CheckCircle2, Star } from 'lucide-react';
import { QuizPath } from '../types';

interface AnalysisLoadingProps {
  onComplete: () => void;
  quizPath?: QuizPath;
}

export const AnalysisLoading: React.FC<AnalysisLoadingProps> = ({ onComplete, quizPath = 'finance' }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);

  // Stages adapted by quiz path
  const financeStages = [
    { pct: 15, text: "Conectando à egrégora...", icon: <Search className="w-6 h-6 text-[#D4AF37]" /> },
    { pct: 35, text: "Analisando respostas de frequência...", icon: <Brain className="w-6 h-6 text-[#D4AF37]" /> },
    { pct: 60, text: "Bloqueio Ancestral Detectado: Nível Alto...", icon: <Heart className="w-6 h-6 text-red-400" /> },
    { pct: 85, text: "Gerando Protocolo de Solução...", icon: <Wallet className="w-6 h-6 text-[#D4AF37]" /> },
    { pct: 100, text: "CONCLUÍDO.", icon: <CheckCircle2 className="w-6 h-6 text-green-400" /> }
  ];

  const relationshipStages = [
    { pct: 20, text: "Identificando padrões emocionais...", icon: <Heart className="w-6 h-6 text-pink-400" /> },
    { pct: 45, text: "Analisando bloqueios relacionais...", icon: <Brain className="w-6 h-6 text-purple-400" /> },
    { pct: 70, text: "Detectando ciclos familiares...", icon: <Search className="w-6 h-6 text-blue-400" /> },
    { pct: 95, text: "Gerando seu mapa afetivo...", icon: <Heart className="w-6 h-6 text-red-400" /> },
    { pct: 100, text: "Pronto! Revelando seu perfil amoroso.", icon: <CheckCircle2 className="w-6 h-6 text-green-400" /> }
  ];

  const stages = quizPath === 'relationship' ? relationshipStages : financeStages;

  const testimonial = quizPath === 'relationship' 
    ? { text: "\"Descobri porque sempre escolho errado. Libertador!\"", author: "@FernandaCoelho" }
    : { text: "\"Adorei meu Mapa! Completo e fácil de entender.\"", author: "@RafaelaNascimento7" };

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
    if (progress < 15) setStage(0);
    else if (progress < 35) setStage(1);
    else if (progress < 60) setStage(2);
    else if (progress < 85) setStage(3);
    else setStage(4);
  }, [progress]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 max-w-lg mx-auto text-center space-y-10 relative z-10">
      
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
         <div className={`w-[300px] h-[300px] ${quizPath === 'relationship' ? 'bg-purple-500/10' : 'bg-[#D4AF37]/10'} rounded-full blur-[80px] animate-pulse`}></div>
      </div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className={`w-24 h-24 rounded-full border-4 border-white/5 ${quizPath === 'relationship' ? 'border-t-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.4)]' : 'border-t-[#D4AF37] shadow-[0_0_50px_rgba(212,175,55,0.4)]'} relative`}
      >
        <div className={`absolute inset-0 ${quizPath === 'relationship' ? 'bg-purple-500/10' : 'bg-[#D4AF37]/10'} rounded-full blur-xl`}></div>
      </motion.div>

      <div className="space-y-6 w-full">
        <h2 className="text-xl font-serif text-white animate-pulse tracking-wide">
          Analisando suas respostas...
        </h2>
        
        <div className="w-full bg-white/5 rounded-full h-4 overflow-hidden border border-white/10 shadow-inner">
          <motion.div 
            className={`${quizPath === 'relationship' ? 'bg-gradient-to-r from-purple-600 via-pink-400 to-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.5)]' : 'bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.5)]'} h-full rounded-full`}
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="h-16 flex items-center justify-center gap-3 transition-all duration-300 bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10">
          <div className="p-2 bg-white/5 rounded-full">{stages[stage].icon}</div>
          <span className="text-slate-200 font-medium text-sm text-left">
            {stages[stage].text} <br/>
            <span className={`${quizPath === 'relationship' ? 'text-purple-500' : 'text-[#D4AF37]'} font-bold text-xs tracking-widest uppercase`}>Progresso: {Math.round(progress)}%</span>
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
        <p className={`text-[10px] ${quizPath === 'relationship' ? 'text-purple-500' : 'text-[#D4AF37]'} font-bold uppercase tracking-wider mb-2 flex items-center gap-1`}>
          <Star className={`w-3 h-3 ${quizPath === 'relationship' ? 'fill-purple-500' : 'fill-[#D4AF37]'}`} /> Depoimento recente
        </p>
        <p className="text-slate-200 text-sm italic leading-relaxed">{testimonial.text}</p>
        <p className="text-slate-400 text-xs mt-2 text-right">– {testimonial.author}</p>
      </motion.div>
    </div>
  );
};

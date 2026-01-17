import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Brain, Heart, Wallet, CheckCircle2, Star, Sparkles, Lock, Shield, AlertTriangle } from 'lucide-react';
import { QuizPath } from '../types';

interface AnalysisLoadingProps {
  onComplete: () => void;
  quizPath?: QuizPath;
  userName?: string;
}

export const AnalysisLoading: React.FC<AnalysisLoadingProps> = ({ onComplete, quizPath = 'finance', userName = '' }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  // Personalize with first name
  const firstName = userName ? userName.split(' ')[0] : 'Você';

  // Stages adapted by quiz path
  const financeStages = [
    { pct: 15, text: "🔮 Conectando sua frequência ancestral...", icon: <Search className="w-6 h-6 text-[#D4AF37]" /> },
    { pct: 35, text: "Lendo registros vibracionais herdados...", icon: <Brain className="w-6 h-6 text-[#D4AF37]" /> },
    { pct: 60, text: "Padrão de Escassez Hereditária Detectado: Nível Alto...", icon: <AlertTriangle className="w-6 h-6 text-red-400" /> },
    { pct: 85, text: "Gerando Protocolo de Solução personalizado...", icon: <Wallet className="w-6 h-6 text-[#D4AF37]" /> },
    { pct: 100, text: "✨ DIAGNÓSTICO CONCLUÍDO", icon: <CheckCircle2 className="w-6 h-6 text-green-400" /> }
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
    ? { text: "\"Descobri porque sempre escolho errado. Libertador!\"", author: "Fernanda C.", age: 28 }
    : { text: "\"Cara, eu achava que era papo furado. Fiz o ritual de limpeza na segunda-feira. Na quarta, recebi um PIX de uma dívida que eu dava como perdida há 2 anos. Chega arrepiei.\"", author: "Marcos V.", age: 35 };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setAnalysisComplete(true);
          // Reduced from 800ms to 400ms for faster button reveal
          setTimeout(() => setShowContinueButton(true), 400);
          return 100;
        }
        // Increased increment for faster progress (was 0.5-3.5, now 1-5)
        const increment = Math.random() * 4 + 1;
        return Math.min(prev + increment, 100);
      });
    }, 80); // Reduced from 100ms to 80ms for faster progress

    return () => clearInterval(timer);
  }, []);

  // Update text stage based on progress
  useEffect(() => {
    if (progress < 15) setStage(0);
    else if (progress < 35) setStage(1);
    else if (progress < 60) setStage(2);
    else if (progress < 85) setStage(3);
    else setStage(4);
  }, [progress]);

  const handleContinue = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 max-w-lg mx-auto text-center space-y-8 relative z-10">
      
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
         <div className={`w-[300px] h-[300px] ${quizPath === 'relationship' ? 'bg-purple-500/10' : 'bg-[#D4AF37]/10'} rounded-full blur-[80px] animate-pulse`}></div>
      </div>

      {/* Personalized Header */}
      {userName && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-[#D4AF37] text-sm font-semibold mb-1">
            {firstName}, aguarde um momento...
          </p>
        </motion.div>
      )}

      {/* Spinning Loader - Optimized for faster animation */}
      <motion.div
        animate={analysisComplete ? {} : { rotate: 360 }}
        transition={{ duration: 2, repeat: analysisComplete ? 0 : Infinity, ease: "linear" }}
        className={`w-24 h-24 rounded-full border-4 border-white/5 ${quizPath === 'relationship' ? 'border-t-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.4)]' : 'border-t-[#D4AF37] shadow-[0_0_50px_rgba(212,175,55,0.4)]'} relative`}
      >
        <div className={`absolute inset-0 ${quizPath === 'relationship' ? 'bg-purple-500/10' : 'bg-[#D4AF37]/10'} rounded-full blur-xl`}></div>
        {analysisComplete && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <CheckCircle2 className="w-12 h-12 text-green-400" />
          </motion.div>
        )}
      </motion.div>

      <div className="space-y-6 w-full">
        <h2 className="text-xl font-serif text-white tracking-wide">
          {analysisComplete ? (
            <span className="text-[#FFD700]">✨ Seu Bloqueio foi Identificado</span>
          ) : (
            "🔮 Processando sua Frequência Ancestral..."
          )}
        </h2>
        
        {/* Progress bar */}
        <div className="w-full bg-white/5 rounded-full h-4 overflow-hidden border border-white/10 shadow-inner">
          <motion.div 
            className={`${quizPath === 'relationship' ? 'bg-gradient-to-r from-purple-600 via-pink-400 to-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.5)]' : 'bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.5)]'} h-full rounded-full`}
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Stage indicator */}
        <div className="h-16 flex items-center justify-center gap-3 transition-all duration-300 bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10">
          <div className="p-2 bg-white/5 rounded-full">{stages[stage].icon}</div>
          <span className="text-slate-200 font-medium text-sm text-left">
            {stages[stage].text} <br/>
            <span className={`${quizPath === 'relationship' ? 'text-purple-500' : 'text-[#D4AF37]'} font-bold text-xs tracking-widest uppercase`}>Progresso: {Math.round(progress)}%</span>
          </span>
        </div>

        {/* Analysis complete content */}
        <AnimatePresence>
          {analysisComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              {/* Result summary */}
              <div className="bg-gradient-to-br from-red-900/30 to-orange-900/20 border border-red-500/30 rounded-xl p-4">
                <p className="text-white text-base leading-relaxed">
                  Sinais claros de <span className="text-red-400 font-bold">Lealdade Invisível</span> e{' '}
                  <span className="text-[#FFD700] font-bold">escassez herdada</span> foram detectados no seu campo energético.
                </p>
                <p className="text-slate-300 text-sm mt-2">
                  Seu Mapa Xamânico já está pronto para desbloqueio.
                </p>
              </div>

              {/* Continue button */}
              {showContinueButton && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-green-400 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
                    <button
                      onClick={handleContinue}
                      className="relative w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold py-4 px-8 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:shadow-[0_0_40px_rgba(16,185,129,0.7)] active:scale-95 transition-all flex items-center justify-center gap-2 border-t border-white/20 text-lg"
                    >
                      <Sparkles className="w-5 h-5" />
                      💰 VER MEU DIAGNÓSTICO E DESBLOQUEAR →
                    </button>
                  </div>
                  
                  {/* Urgency text */}
                  <p className="text-slate-400 text-xs mt-3 flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3" />
                    Ativação disponível pelas próximas 3 horas
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Social Proof during loading - Retention tactic */}
      {!analysisComplete && (
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
          <p className="text-slate-400 text-xs mt-2 text-right">– {testimonial.author}, {testimonial.age} anos</p>
        </motion.div>
      )}

      {/* Trust badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400"
      >
        <div className="flex items-center gap-1">
          <Shield className="w-3 h-3 text-emerald-400" />
          <span>Diagnóstico confidencial</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 text-[#D4AF37]" />
          <span>+4.300 mapas gerados</span>
        </div>
      </motion.div>
    </div>
  );
};

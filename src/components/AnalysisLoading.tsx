import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Brain, Heart, Wallet, CheckCircle2, Star, Sparkles, Lock, Shield } from 'lucide-react';
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

  // Stages adapted by quiz path - updated with credible loading steps
  const financeStages = [
    { pct: 15, text: "✅ Perfil predominante", icon: <Search className="w-6 h-6 text-[#D4AF37]" /> },
    { pct: 35, text: "✅ 2 padrões secundários", icon: <Brain className="w-6 h-6 text-[#D4AF37]" /> },
    { pct: 60, text: "✅ Plano do Dia 1 (com base nas suas respostas)", icon: <Wallet className="w-6 h-6 text-[#D4AF37]" /> },
    { pct: 85, text: "✅ Acesso no app liberado após confirmação", icon: <Lock className="w-6 h-6 text-[#D4AF37]" /> },
    { pct: 100, text: "✨ RELATÓRIO GERADO", icon: <CheckCircle2 className="w-6 h-6 text-green-400" /> }
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
    : { text: "\"Descobri meu perfil e em 5 dias já estava cobrando o que eu merecia nos meus serviços. Valeu cada minuto.\"", author: "Marcos V.", age: 35 };

  // Progress animation for loading bar (approx 8-12 seconds total)
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setAnalysisComplete(true);
          setTimeout(() => setShowContinueButton(true), 400);
          return 100;
        }
        // Increment of 2-8 every 100ms completes in ~8-12 seconds
        const increment = Math.random() * 6 + 2;
        return Math.min(prev + increment, 100);
      });
    }, 100);

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
            <span className="text-[#FFD700]">✨ Seu Perfil foi Identificado</span>
          ) : (
            "📊 Gerando seu relatório..."
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
              {/* Result summary - Updated with evidence + 7-day plan */}
              <div className="bg-gradient-to-br from-[#1a1a2e]/80 to-[#16213e]/60 border border-[#D4AF37]/40 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-[#D4AF37] font-bold text-sm uppercase tracking-wider">SEU PERFIL PREDOMINANTE</span>
                </div>
                
                {/* Profile name - example based on answers */}
                <p className="text-white text-lg font-bold mb-3">
                  O Guardião que se Drena
                </p>
                
                {/* Evidence - why this result */}
                <div className="bg-white/5 rounded-lg p-3 mb-4">
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Por que deu isso:</p>
                  <p className="text-slate-300 text-sm">
                    Você marcou <span className="text-[#D4AF37] font-semibold">responsabilidade</span> + <span className="text-[#D4AF37] font-semibold">dificuldade ao receber</span>.
                  </p>
                </div>
                
                {/* How this affects money - 3 bullets */}
                <div className="mb-4">
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Como isso te afeta no dinheiro:</p>
                  <ul className="text-slate-300 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">•</span>
                      <span>Você vira "seguro emocional" de todo mundo e sobra zero pra você</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">•</span>
                      <span>Você evita cobrar/negociar e aceita menos do que merece</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">•</span>
                      <span>Você entra em ciclos de "alívio" e volta pra escassez</span>
                    </li>
                  </ul>
                </div>
                
                {/* 7-day plan preview */}
                <div className="mt-4 pt-3 border-t border-white/10">
                  <p className="text-[#D4AF37] text-sm font-medium mb-2">
                    📱 Plano de 7 dias no app:
                  </p>
                  <p className="text-slate-300 text-sm">
                    10 min/dia pra quebrar o padrão (Dia 1 libera agora).
                  </p>
                </div>
              </div>

              {/* Continue button - Updated CTA */}
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
                      className="relative w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold py-4 px-6 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:shadow-[0_0_40px_rgba(16,185,129,0.7)] active:scale-95 transition-all flex items-center justify-center gap-2 border-t border-white/20 text-base md:text-lg"
                    >
                      <Sparkles className="w-5 h-5" />
                      ✅ Quero desbloquear meu Dia 1
                    </button>
                  </div>
                  
                  {/* Urgency text - credible/operational */}
                  <p className="text-slate-400 text-xs mt-3 flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3" />
                    Seu diagnóstico ficou reservado por 3 horas por segurança do acesso (dados sensíveis).
                  </p>
                  
                  {/* Social proof footer */}
                  <div className="flex items-center justify-center gap-4 mt-3 text-xs text-slate-400">
                    <span>✅ +4.300 mapas gerados</span>
                    <span>🔒 Diagnóstico confidencial</span>
                  </div>
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

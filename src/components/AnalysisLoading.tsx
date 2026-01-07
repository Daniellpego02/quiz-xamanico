import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Brain, Heart, Wallet, CheckCircle2, AlertTriangle } from 'lucide-react';
import { QuizPath } from '../types';
import { SacredGeometry, ProgressRing } from './ritual';

interface AnalysisLoadingProps {
  onComplete: () => void;
  quizPath?: QuizPath;
}

export const AnalysisLoading: React.FC<AnalysisLoadingProps> = ({ onComplete, quizPath = 'finance' }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Stages adapted by quiz path - THE CONFRONTATION (ACT III)
  const financeStages = [
    { pct: 15, text: "🔍 Analisando suas respostas...", icon: <Search className="w-6 h-6 text-[#C9A227]" />, intensity: 'low' },
    { pct: 30, text: "Cruzando suas respostas com 847 padrões ancestrais catalogados...", icon: <Brain className="w-6 h-6 text-[#C9A227]" />, intensity: 'low' },
    { pct: 57, text: "⚠️ ALERTA: Bloqueio Ancestral Detectado", icon: <AlertTriangle className="w-6 h-6 text-red-500" />, intensity: 'high' },
    { pct: 70, text: "Nível: CRÍTICO", icon: <AlertTriangle className="w-6 h-6 text-red-500" />, intensity: 'critical' },
    { pct: 90, text: "Gerando Protocolo Personalizado...", icon: <Wallet className="w-6 h-6 text-[#C9A227]" />, intensity: 'medium' },
    { pct: 100, text: "CONCLUÍDO.", icon: <CheckCircle2 className="w-6 h-6 text-green-400" />, intensity: 'complete' }
  ];

  const relationshipStages = [
    { pct: 20, text: "Identificando padrões emocionais...", icon: <Heart className="w-6 h-6 text-pink-400" />, intensity: 'low' },
    { pct: 45, text: "Analisando bloqueios relacionais...", icon: <Brain className="w-6 h-6 text-purple-400" />, intensity: 'low' },
    { pct: 70, text: "Detectando ciclos familiares...", icon: <Search className="w-6 h-6 text-blue-400" />, intensity: 'medium' },
    { pct: 95, text: "Gerando seu mapa afetivo...", icon: <Heart className="w-6 h-6 text-red-400" />, intensity: 'high' },
    { pct: 100, text: "Pronto! Revelando seu perfil amoroso.", icon: <CheckCircle2 className="w-6 h-6 text-green-400" />, intensity: 'complete' }
  ];

  const stages = quizPath === 'relationship' ? relationshipStages : financeStages;
  const currentStage = stages[stage] || stages[0];

  // Rotating testimonials for finance path
  const testimonials = [
    { text: "\"Segui o protocolo por 3 dias. No 4º dia recebi R$1.850 que NÃO esperava (cliente antigo pagou dívida de 2 anos). O mapa mostrou EXATAMENTE onde estava meu bloqueio. Funcionou.\"", author: "@RafaelaNascimento7, São Paulo/SP", time: "há 2 dias" },
    { text: "\"Em 7 dias consegui um emprego novo que pagava o DOBRO!\"", author: "@FernandaOliveira", time: "há 5 dias" },
    { text: "\"Fechei um contrato de R$ 85 mil que estava travado há meses.\"", author: "@RicardoMendes", time: "há 1 semana" },
    { text: "\"Finalmente entendi porque o dinheiro sempre sumia.\"", author: "@JulianaCostaRJ", time: "há 3 dias" },
  ];

  const relationshipTestimonial = { text: "\"Descobri porque sempre escolho errado. Libertador!\"", author: "@FernandaCoelho" };

  const currentTestimonial = quizPath === 'relationship' 
    ? relationshipTestimonial 
    : testimonials[testimonialIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 1200);
          return 100;
        }
        const increment = Math.random() * 2 + 0.3;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Update text stage based on progress
  useEffect(() => {
    if (progress < 15) setStage(0);
    else if (progress < 30) setStage(1);
    else if (progress < 50) setStage(2);
    else if (progress < 70) setStage(3);
    else if (progress < 90) setStage(4);
    else setStage(5);
  }, [progress]);

  // Rotate testimonials every 3 seconds (only for finance path)
  useEffect(() => {
    if (quizPath === 'finance') {
      const interval = setInterval(() => {
        setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [quizPath]);

  // Dynamic intensity colors
  const getIntensityStyle = () => {
    switch (currentStage.intensity) {
      case 'critical':
        return {
          bgGlow: 'rgba(139, 37, 0, 0.3)',
          textColor: 'text-red-500',
          pulseColor: 'rgba(255, 69, 0, 0.4)'
        };
      case 'high':
        return {
          bgGlow: 'rgba(139, 37, 0, 0.2)',
          textColor: 'text-orange-400',
          pulseColor: 'rgba(255, 140, 0, 0.3)'
        };
      case 'complete':
        return {
          bgGlow: 'rgba(74, 222, 128, 0.2)',
          textColor: 'text-green-400',
          pulseColor: 'rgba(74, 222, 128, 0.3)'
        };
      default:
        return {
          bgGlow: 'rgba(201, 162, 39, 0.15)',
          textColor: 'text-[#C9A227]',
          pulseColor: 'rgba(201, 162, 39, 0.2)'
        };
    }
  };

  const intensityStyle = getIntensityStyle();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 max-w-lg mx-auto text-center space-y-6 relative z-10">
      
      {/* ═══ SACRED GEOMETRY BACKGROUND - Intensifies with stage ═══ */}
      <SacredGeometry 
        variant="mandala" 
        size={500} 
        opacity={currentStage.intensity === 'critical' ? 0.08 : 0.04}
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      
      {/* Dynamic background glow based on intensity */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div 
          className="w-[350px] h-[350px] rounded-full blur-[100px]"
          style={{ background: `radial-gradient(circle, ${intensityStyle.bgGlow} 0%, transparent 70%)` }}
        />
      </motion.div>

      {/* ═══ RITUAL SIGIL - Animated sacred symbol ═══ */}
      <motion.div
        className="relative"
        animate={{ 
          rotate: currentStage.intensity === 'critical' ? [0, 5, -5, 5, 0] : [0, 360],
          scale: currentStage.intensity === 'critical' ? [1, 1.1, 1, 1.1, 1] : [1, 1.02, 1]
        }}
        transition={{ 
          duration: currentStage.intensity === 'critical' ? 0.5 : 20, 
          repeat: Infinity, 
          ease: currentStage.intensity === 'critical' ? "easeInOut" : "linear"
        }}
      >
        <SacredGeometry 
          variant="sigil" 
          size={120} 
          opacity={0.6}
          className="relative"
        />
        
        {/* Center icon */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {currentStage.icon}
        </motion.div>
      </motion.div>

      {/* ═══ STAGE TEXT - Ceremonial revelation ═══ */}
      <div className="space-y-4 w-full">
        <AnimatePresence mode="wait">
          <motion.h2 
            key={stage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`text-lg sm:text-xl md:text-2xl font-bold ${intensityStyle.textColor} ritual-text-glow`}
          >
            {currentStage.text}
          </motion.h2>
        </AnimatePresence>
        
        {/* Progress percentage */}
        <motion.p 
          className="text-white/60 text-sm font-ritual"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {Math.round(progress)}% concluído
        </motion.p>
      </div>

      {/* ═══ CIRCULAR PROGRESS - Sacred ring ═══ */}
      <ProgressRing progress={progress} size={100} strokeWidth={4} />

      {/* ═══ TESTIMONIAL - Social proof during loading ═══ */}
      {quizPath === 'finance' && progress > 30 && progress < 90 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="ritual-card p-4 mt-4 max-w-sm"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonialIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-left"
            >
              <p className="text-white/80 text-xs sm:text-sm italic leading-relaxed">
                {currentTestimonial.text}
              </p>
              <p className="text-[#C9A227] text-xs mt-2 font-medium">
                — {currentTestimonial.author}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

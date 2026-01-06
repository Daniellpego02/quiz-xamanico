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
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Stages adapted by quiz path
  const financeStages = [
    { pct: 15, text: "🔍 Analisando suas respostas...", icon: <Search className="w-6 h-6 text-[#D4AF37]" /> },
    { pct: 30, text: "Cruzando suas respostas com 847 padrões ancestrais catalogados...", icon: <Brain className="w-6 h-6 text-[#D4AF37]" /> },
    { pct: 57, text: "⚠️ ALERTA: Bloqueio Ancestral Detectado", icon: <Heart className="w-6 h-6 text-red-400" /> },
    { pct: 70, text: "Nível: CRÍTICO", icon: <Heart className="w-6 h-6 text-red-400" /> },
    { pct: 90, text: "Gerando Protocolo Personalizado...", icon: <Wallet className="w-6 h-6 text-[#D4AF37]" /> },
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 max-w-lg mx-auto text-center space-y-8 relative z-10">
      
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
         <div className="w-[300px] h-[300px] bg-[#FFD700]/10 rounded-full blur-[80px] animate-pulse"></div>
      </div>

      {/* ÍCONE ANIMADO - ⚡ girando ou pulsando */}
      <motion.div
        animate={{ 
          rotate: [0, 10, -10, 10, 0],
          scale: [1, 1.1, 1, 1.1, 1]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="text-6xl sm:text-7xl md:text-8xl"
      >
        ⚡
      </motion.div>

      {/* ESPAÇAMENTO: 32px */}
      <div className="h-8"></div>

      {/* TEXTO PRINCIPAL */}
      <div className="space-y-4 w-full">
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Preparando Seu Quiz <span className="text-[#FFD700]">EXCLUSIVO</span>...
        </h2>
        
        {/* ESPAÇAMENTO: 24px */}
        <div className="h-6"></div>

        {/* SUBTEXTO */}
        <p className="text-base sm:text-lg text-[#4ade80] font-medium">
          Pronto para começar!
        </p>

        {/* ESPAÇAMENTO: 32px */}
        <div className="h-8"></div>

        {/* BARRA DE PROGRESSO ANIMADA */}
        <div className="w-full max-w-[300px] sm:max-w-[400px] mx-auto">
          <div className="w-full bg-[#1a0d2e] rounded-full h-2 overflow-hidden border border-[#3d2a5f]">
            <motion.div 
              className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] h-full rounded-full"
              animate={{
                width: ["0%", "100%"]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizQuestion } from '../types';
import { ChevronRight } from 'lucide-react';

const questions: QuizQuestion[] = [
  {
    id: 0,
    title: "PERSONALIZAÇÃO",
    text: "Para começar, selecione seu gênero para personalizar seu mapa:",
    options: [
      { label: "Mulher", value: "female", icon: "👩" },
      { label: "Homem", value: "male", icon: "👨" },
      { label: "Prefiro não dizer", value: "other", icon: "👤" },
    ]
  },
  {
    id: 1,
    title: "ÁREA TRAVADA",
    text: "Em qual área da sua vida você mais sente que está TRAVADO(A) hoje?",
    options: [
      { label: "Financeiro", value: "finance", icon: "💰" },
      { label: "Relacionamentos", value: "relationships", icon: "💔" },
      { label: "Saúde e Energia", value: "health", icon: "😓" },
      { label: "Propósito", value: "purpose", icon: "🎯" },
      { label: "Todas as áreas", value: "all", icon: "🌈" },
    ]
  },
  {
    id: 2,
    title: "CONSCIÊNCIA DO BLOQUEIO",
    text: "Você já percebeu que pode ter bloqueios energéticos te impedindo de prosperar?",
    options: [
      { label: "Sim! Eu sinto isso claramente", value: "yes_clear", icon: "🔥" },
      { label: "Sim, e estou PRONTO(A)", value: "yes_ready", icon: "✨" },
      { label: "Talvez, não sei identificar", value: "maybe", icon: "🤷" },
      { label: "Nunca pensei nisso", value: "no", icon: "🆕", isNew: true },
    ]
  },
  {
    id: 3,
    title: "TENTATIVAS ANTERIORES",
    text: "Você já tentou alguma ferramenta de autoconhecimento antes?",
    options: [
      { label: "Sim, mas não funcionou", value: "failed", icon: "😣" },
      { label: "Sim, mas era muito caro", value: "expensive", icon: "💸" },
      { label: "Só estudei, nunca pratiquei", value: "study_only", icon: "📚" },
      { label: "Não, essa é minha primeira vez", value: "first_time", icon: "🆕", isNew: true },
      { label: "Sim, e quero evoluir mais", value: "evolve", icon: "🙌" },
    ]
  },
  {
    id: 4,
    title: "ASPIRAÇÃO PRINCIPAL",
    text: "Se você pudesse transformar UMA coisa na sua vida hoje, o que seria?",
    options: [
      { label: "Destravar prosperidade", value: "wealth", icon: "💰" },
      { label: "Curar relacionamentos", value: "love", icon: "❤️" },
      { label: "Descobrir propósito", value: "mission", icon: "🎯" },
      { label: "Paz interior e equilíbrio", value: "peace", icon: "😌" },
      { label: "TUDO! Transformação completa", value: "all", icon: "🔥" },
    ]
  },
  {
    id: 5,
    title: "OBJEÇÃO / CUSTO",
    text: "Sabe o que é frustrante? Terapeutas e consultas custam R$150-300 por sessão. Isso se encaixa na sua realidade hoje?",
    options: [
      { label: "Não, preciso de algo acessível", value: "accessible", icon: "💸" },
      { label: "Já gastei muito sem resultado", value: "spent_lot", icon: "😓" },
      { label: "Sim, mas não sabia que havia alternativa", value: "alternative", icon: "💡" },
      { label: "Não sabia que existia ferramenta assim", value: "unknown", icon: "🆓", isNew: true },
    ]
  },
  {
    id: 6,
    title: "PRONTIDÃO",
    text: "Se eu te entregasse um Mapa Completo revelando seus bloqueios e o caminho para destravá-los... Você estaria pronto(a) HOJE?",
    options: [
      { label: "SIM! Estou pronto", value: "ready_yes", icon: "🔥" },
      { label: "Quase... tenho dúvidas", value: "doubts", icon: "⏰" },
      { label: "Não sei se é para mim", value: "unsure", icon: "🤷" },
      { label: "Preciso pensar mais", value: "think", icon: "💭" },
    ]
  }
];

interface QuizProps {
  onComplete: () => void;
}

export const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false); // Prevents double clicks

  const handleOptionClick = () => {
    if (isNavigating) return;
    setIsNavigating(true);

    // Tracking logic based on step
    if (typeof window.fbq === 'function') {
      if (currentIndex === 0) {
        window.fbq('trackCustom', 'QuizStarted', { question_number: 1 });
      } else if (currentIndex === 3) {
        window.fbq('trackCustom', 'QuizHalfway', { quiz_progress: '50%' });
      }
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setIsNavigating(false);
      } else {
        // Track completion
        if (typeof window.fbq === 'function') {
          window.fbq('track', 'CompleteRegistration', {
            content_name: 'Quiz Completo'
          });
        }
        onComplete();
      }
    }, 200); // Small delay for visual feedback before state change
  };

  const progress = ((currentIndex + 1) / questions.length) * 100;
  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen flex flex-col max-w-lg mx-auto px-4 py-6 relative z-10">
      
      {/* Glowing Progress Bar */}
      <div className="w-full bg-white/5 backdrop-blur-sm rounded-full h-3 mb-8 relative overflow-hidden border border-white/10 shadow-inner">
        <motion.div 
          className="bg-gradient-to-r from-orange-600 to-yellow-400 h-full rounded-full shadow-[0_0_15px_rgba(251,191,36,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <AnimatePresence mode='wait'>
        <motion.div
          key={currentIndex}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col"
        >
          {/* Question Header */}
          <div className="mb-6">
            <h3 className="text-orange-400 font-bold text-xs tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
              <span className="bg-orange-500/10 w-6 h-6 rounded-full flex items-center justify-center text-[10px] border border-orange-500/30 text-orange-400">
                {currentIndex + 1}
              </span>
              {currentQuestion.title}
            </h3>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-white leading-snug drop-shadow-lg">
              {currentQuestion.text}
            </h2>
          </div>

          {/* Glass Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={handleOptionClick}
                disabled={isNavigating}
                className={`w-full text-left p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#FF9500]/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,149,0,0.15)] transition-all active:scale-[0.98] group relative overflow-hidden ${isNavigating ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}`}
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full"></div>
                
                <div className="flex items-center gap-4 relative z-10">
                  <span className="text-3xl filter drop-shadow-md">{option.icon}</span>
                  <div className="flex-1">
                    <span className="text-slate-200 font-medium group-hover:text-white transition-colors text-lg">
                      {option.label}
                    </span>
                    {option.isNew && (
                      <span className="ml-2 inline-block bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                        NEW
                      </span>
                    )}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#FF9500] group-hover:text-white transition-colors">
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
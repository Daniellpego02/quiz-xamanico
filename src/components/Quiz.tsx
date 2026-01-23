import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizQuestion, QuizPath, QuestionOption } from '../types';
import { ChevronRight, Search, Star } from 'lucide-react';
import { tracking } from '../utils/tracking';

interface QuizProps {
  onComplete: (path: QuizPath, userName: string) => void;
}

// Total steps for progress calculation (3 questions only - no name input)
const TOTAL_STEPS = 3;

export const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Start directly at first question
  const [isNavigating, setIsNavigating] = useState(false);
  const [showInitialLoading, setShowInitialLoading] = useState(true);
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [loadingStage, setLoadingStage] = useState(0);

  // Quiz path is now hardcoded to finance only (single flow strategy)
  const QUIZ_PATH: QuizPath = 'finance';

  // Loading stages for initial loading screen
  const loadingStages = [
    "→ Conectando ao sistema de diagnóstico",
    "→ Preparando mapeamento energético",
    "→ Carregando protocolo de análise"
  ];

  // Finance questions - Restructured to 3 questions with new copy
  const financeQuestions: QuizQuestion[] = [
    {
      id: 1,
      title: "PASSO 1 DE 3",
      text: "Qual dessas frases mais descreve SUA relação com dinheiro?",
      options: [
        { label: "\"Trabalho muito, mas o dinheiro evapora antes do dia 20\"", sublabel: "→ O padrão do vazamento constante", value: "leak", icon: "🔥" },
        { label: "\"Vejo os outros prosperando enquanto eu fico estagnado\"", sublabel: "→ O bloqueio do teto invisível", value: "stagnant", icon: "⏰" },
        { label: "\"Consigo ganhar, mas PERCO de formas inesperadas\"", sublabel: "→ O sabotador interno ativo", value: "sabotage", icon: "💔" },
      ]
    },
    {
      id: 2,
      title: "PASSO 2 DE 3",
      text: "Se nada mudar nos próximos 6 meses, o que te assusta MAIS?",
      options: [
        { label: "\"Ver minha vida passar sem construir NADA de concreto\"", sublabel: "→ O medo da irrelevância", value: "irrelevance", icon: "😰" },
        { label: "\"Repetir os mesmos erros financeiros que meus pais cometeram\"", sublabel: "→ A maldição que se repete", value: "curse", icon: "🔄" },
        { label: "\"Perder o pouco que tenho e ficar em situação pior ainda\"", sublabel: "→ O medo do colapso total", value: "collapse", icon: "🚨" },
      ]
    },
    {
      id: 3,
      title: "PASSO 3 DE 3",
      text: "Quando pensa nessa área travada, qual SENSAÇÃO é mais forte?",
      singleButton: false,
      options: [
        { label: "\"Teto invisível — chego perto e algo me puxa de volta\"", sublabel: "→ Padrão de autossabotagem", value: "ceiling", icon: "🔒" },
        { label: "\"Peso energético — carrego algo que não é meu\"", sublabel: "→ Herança de escassez ativa", value: "burden", icon: "👻" },
        { label: "\"Loop vicioso — mesma história se repete sem parar\"", sublabel: "→ Ciclo energético travado", value: "loop", icon: "🌀" },
      ]
    }
  ];

  useEffect(() => {
    setActiveQuestions(financeQuestions);
    // Track quiz started
    tracking.quiz.started('anonymous');
  }, []);

  // Handle initial loading animation
  useEffect(() => {
    if (showInitialLoading) {
      // Cycle through loading stages
      const interval = setInterval(() => {
        setLoadingStage(prev => (prev + 1) % loadingStages.length);
      }, 800);
      
      // Complete loading after all stages shown
      const timer = setTimeout(() => {
        setShowInitialLoading(false);
      }, 3000);
      
      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [showInitialLoading]);

  const handleOptionClick = (option: QuestionOption) => {
    if (isNavigating) return;
    setIsNavigating(true);

    const currentQuestion = activeQuestions[currentIndex];
    
    tracking.quiz.answer({
      questionTitle: currentQuestion?.title || '',
      questionStep: currentIndex + 1,
      answerValue: option.value,
      answerLabel: option.label,
      quizPath: QUIZ_PATH
    });
    
    tracking.quiz.progress(
      Math.round(((currentIndex + 1) / activeQuestions.length) * 100),
      currentIndex + 1
    );

    // Halfway tracking: fires after answering question 2 (index 1) of 3 questions
    if (currentIndex === 1) {
      tracking.quiz.halfway();
    }

    // Transition to next question or complete quiz
    setTimeout(() => {
      const length = activeQuestions.length;
      if (currentIndex < length - 1) {
        setCurrentIndex(prev => prev + 1);
        setIsNavigating(false);
      } else {
        tracking.meta.completeRegistration({ content_name: 'Quiz Completo', path: QUIZ_PATH });
        onComplete(QUIZ_PATH, '');
      }
    }, 150);
  };

  // Calculate progress for step indicator
  // Progress reflects how many steps are COMPLETE (not the current step being viewed)
  // Steps: q1(0) -> q2(1) -> q3(2)
  const getCompletedSteps = () => {
    return currentIndex;
  };

  const progressPercent = Math.min(((getCompletedSteps()) / TOTAL_STEPS) * 100, 100);

  // ==================== INITIAL LOADING SCREEN ====================
  if (showInitialLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 relative z-20 text-center max-w-lg mx-auto">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#D4AF37]/10 rounded-full blur-[80px] pointer-events-none -z-10"></div>
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative mb-6"
        >
          <div className="absolute inset-0 bg-[#D4AF37] rounded-full blur-[60px] opacity-30 animate-pulse"></div>
          <Search className="w-20 h-20 text-[#D4AF37] relative z-10 animate-pulse" />
        </motion.div>
        
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl font-serif text-white mb-6"
        >
          Processando sua frequência energética...
        </motion.h2>
        
        {/* Animated loading stages */}
        <div className="space-y-3 mb-6 w-full max-w-xs">
          {loadingStages.map((stage, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ 
                opacity: idx <= loadingStage ? 1 : 0.3,
                x: 0
              }}
              transition={{ delay: idx * 0.3, duration: 0.3 }}
              className={`flex items-center gap-2 text-sm ${idx <= loadingStage ? 'text-[#D4AF37]' : 'text-slate-500'}`}
            >
              {idx < loadingStage ? (
                <span className="text-emerald-400">✓</span>
              ) : idx === loadingStage ? (
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ○
                </motion.span>
              ) : (
                <span>○</span>
              )}
              <span>{stage}</span>
            </motion.div>
          ))}
        </div>
        
        {/* Progress bar */}
        <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.8, ease: "easeOut" }}
          />
        </div>
      </div>
    );
  }

  const currentQuestion = activeQuestions[currentIndex];
  if (!currentQuestion) return null;

  // ==================== QUIZ QUESTIONS SCREEN ====================
  return (
    <div className="min-h-screen flex flex-col max-w-lg mx-auto px-4 py-6 relative z-10">
      {/* Progress Bar with Step Indicator */}
      <div className="mb-6">
        {/* Step indicator text */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            {currentQuestion.title}
          </span>
          <span className="text-slate-400 text-xs">
            {Math.round(progressPercent)}% completo
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-white/5 backdrop-blur-sm rounded-full h-2 relative overflow-hidden border border-white/10 shadow-inner">
          <motion.div 
            className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] h-full rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <AnimatePresence mode='wait'>
        <motion.div
          key={currentIndex}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col"
        >
          <div className="mb-6">
            {/* Question text */}
            <h2 
              className="text-xl md:text-2xl font-serif font-bold text-white leading-snug drop-shadow-lg"
              dangerouslySetInnerHTML={{ __html: currentQuestion.text }}
            />
          </div>

          <div className="space-y-3 flex-1 flex flex-col">
            <div className="space-y-3">
              {currentQuestion.options?.map((option, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => handleOptionClick(option)}
                  disabled={isNavigating}
                  className={`w-full text-left p-4 md:p-5 rounded-2xl transition-all active:scale-[0.98] group relative overflow-hidden ${isNavigating ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'} bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/5 to-[#D4AF37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full"></div>
                  <div className="flex items-center gap-3 md:gap-4 relative z-10">
                    <span className="text-2xl md:text-3xl filter drop-shadow-md" aria-hidden="true">{option.icon}</span>
                    <div className="flex-1">
                      <span className="font-medium transition-colors text-base md:text-lg block leading-tight text-slate-200 group-hover:text-white">
                        {option.label}
                      </span>
                      {option.sublabel && (
                        <span className="text-xs md:text-sm mt-1 block transition-colors text-slate-400 group-hover:text-slate-300">
                          {option.sublabel}
                        </span>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 ml-auto shrink-0 text-slate-500 group-hover:text-white" aria-hidden="true" />
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Social proof on last question */}
            {currentIndex === activeQuestions.length - 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-auto pt-6"
              >
                {/* Testimonial */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💬</span>
                    <div>
                      <p className="text-slate-300 text-sm italic leading-relaxed">
                        "Depois que ouvi os áudios, parei de me sentir sugado pela minha família. Dormi em paz pela 1ª vez em meses."
                      </p>
                      <p className="text-[#D4AF37] text-xs mt-2 font-semibold">— Camila, 34 anos</p>
                    </div>
                  </div>
                </div>

                {/* Counter and authority */}
                <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
                  <div className="flex items-center gap-1 text-emerald-400">
                    <Star className="w-3 h-3 fill-emerald-400" />
                    <span>🔓 +1.327 desbloqueios na última semana</span>
                  </div>
                </div>
                <p className="text-slate-500 text-xs text-center mt-2">
                  Método validado em mais de 4.000 diagnósticos energéticos
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

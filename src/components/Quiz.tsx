import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizQuestion, QuizPath, QuestionOption } from '../types';
import { ChevronRight, Sparkles, Compass } from 'lucide-react';
import { tracking } from '../utils/tracking';

interface QuizProps {
  onComplete: (path: QuizPath, userName: string) => void;
}

export const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userName, setUserName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);
  const [showTuningScreen, setShowTuningScreen] = useState(false);
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [loadingStage, setLoadingStage] = useState(0);

  // Quiz path is now hardcoded to finance only (single flow strategy)
  const QUIZ_PATH: QuizPath = 'finance';

  // Perguntas Iniciais (Comuns)
  const initialQuestions: QuizQuestion[] = [
    {
      id: 0,
      title: "PERGUNTA 1 DE 6",
      text: "SEU NOME CARREGA A FREQUÊNCIA DA SUA LINHAGEM",
      type: "input",
      placeholder: "Ex: João"
    }
  ];

  // Caminho FINANCEIRO - Nova estrutura de agitação de dor conforme briefing
  const financeQuestions: QuizQuestion[] = [
    {
      id: 1,
      title: "⚡ PERGUNTA 2 DE 6 ⚡",
      text: "{NAME}, QUAL DESSAS VERDADES MAIS DÓI?",
      emotionalContext: "Qual desses cenários é VOCÊ agora?",
      options: [
        { label: "O dinheiro entra, mas some em imprevistos", sublabel: "Parece que tenho um RALO que suga tudo", value: "leak", icon: "💰" },
        { label: "Trabalho demais, ganho pouco, sou cansado", sublabel: "O esforço NÃO vira resultado", value: "tired", icon: "😤" },
        { label: "Tenho pavor de faltar", sublabel: "Vivo apertando cada centavo, com medo", value: "fear", icon: "😰" },
        { label: "Nenhum desses, tenho outro problema", sublabel: "Minha situação é diferente", value: "other", icon: "🚫" },
      ]
    },
    {
      id: 2,
      title: "🔮 PERGUNTA 3 DE 6 🔮",
      text: "O Xamanismo Financeiro ensina que padrões se repetem. Olhando para seus pais ou avós, o que você vê?",
      emotionalContext: "→ Essa resposta define o TIPO de bloqueio que vamos identificar.",
      validationText: "Isso não é culpa sua. É uma herança vibracional que você recebeu sem escolher.",
      options: [
        { label: "Histórico de dívidas, falências ou lutas financeiras pesadas.", sublabel: "Ciclos que se repetem há gerações", value: "heavy", icon: "💔" },
        { label: "Pessoas honestas, mas que nunca enriqueceram.", sublabel: "O trabalho duro sem recompensa", value: "honest", icon: "🙏" },
        { label: "Havia dinheiro, mas muitas brigas e desarmonia familiar.", sublabel: "Riqueza com conflito emocional", value: "conflict", icon: "⚡" },
      ]
    },
    {
      id: 3,
      title: "⚠️ PERGUNTA 4 DE 6 ⚠️",
      text: "Se nada mudar nos próximos 6 meses, qual é o seu maior medo, {NAME}?",
      emotionalContext: "→ Seja honesto. Essa resposta molda seu protocolo de desbloqueio.",
      warningText: "⚠️ Atenção: O que você responder aqui define o tipo de bloqueio que será revelado no seu diagnóstico.",
      options: [
        { label: "Continuar dependendo dos outros ou contando moedas.", sublabel: "Viver com medo de faltar", value: "dependency", icon: "😔" },
        { label: "Envelhecer sem construir nenhum patrimônio real.", sublabel: "Ver o tempo passar sem mudança", value: "aging", icon: "⏰" },
        { label: "Ver minha família passar necessidade por minha causa.", sublabel: "Sentir que falhei com quem amo", value: "family", icon: "💔" },
      ]
    },
    {
      id: 4,
      title: "🔥 PERGUNTA 5 DE 6 🔥",
      text: "O sistema identificou um bloqueio severo na sua frequência. Se existir um Protocolo de 7 dias para limpar isso COMPLETAMENTE, você está disposto(a) a seguir?",
      singleButton: true,
      validationText: "(A maioria das pessoas vive a vida inteira com esse bloqueio sem saber. Você não precisa ser uma delas.)",
      options: [
        { label: "🔥 SIM, eu aceito receber meu Mapa e me desbloquear", value: "ready", icon: "" },
      ]
    }
  ];

  useEffect(() => {
    setActiveQuestions(initialQuestions);
  }, []);

  const getLoadingStages = () => [
    `Conectando à egrégora de ${userName}...`,
    "Calibrando frequência vibracional...",
    "Preparando perguntas personalizadas...",
    "Pronto para começar!"
  ];

  useEffect(() => {
    if (showTuningScreen) {
      const loadingStages = getLoadingStages();
      
      const interval = setInterval(() => {
        setLoadingStage(prev => (prev + 1) % loadingStages.length);
      }, 650);
      return () => clearInterval(interval);
    } else {
      // Reset loading stage when screen is hidden
      setLoadingStage(0);
    }
  }, [showTuningScreen, userName]);

  const personalizeText = (text: string) => {
    return text.replace("{NAME}", userName ? userName.split(' ')[0] : "você");
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    setUserName(inputValue.trim());
    setShowTuningScreen(true);
    
    tracking.quiz.started(inputValue.trim());

    setTimeout(() => {
        setShowTuningScreen(false);
        // Add finance questions after name input (question 0)
        const mergedQuestions = [...activeQuestions, ...financeQuestions];
        setActiveQuestions(mergedQuestions);
        setCurrentIndex(prev => prev + 1);
    }, 4000);
  };

  const handleOptionClick = (option: QuestionOption) => {
    if (isNavigating) return;
    setIsNavigating(true);

    // Pixel Inteligente - Rastreamento de Resposta e Progresso
    const currentQuestion = activeQuestions[currentIndex];
    
    // Track the specific answer
    tracking.quiz.answer({
      questionTitle: currentQuestion?.title || '',
      questionStep: currentIndex + 1,
      answerValue: option.value,
      answerLabel: option.label,
      quizPath: QUIZ_PATH
    });
    
    // Track progress
    tracking.quiz.progress(
      Math.round(((currentIndex + 1) / activeQuestions.length) * 100),
      currentIndex + 1
    );

    // Track halfway point
    if (currentIndex === 2) {
      tracking.quiz.halfway();
    }

    setTimeout(() => {
      const length = activeQuestions.length;
      if (currentIndex < length - 1) {
        setCurrentIndex(prev => prev + 1);
        setIsNavigating(false);
      } else {
        tracking.meta.completeRegistration({ content_name: 'Quiz Completo', path: QUIZ_PATH });
        onComplete(QUIZ_PATH, userName);
      }
    }, 250);
  };

  if (showTuningScreen) {
    const loadingStages = getLoadingStages();
    
    return (
      <div className="min-h-screen min-h-[100dvh] flex flex-col items-center justify-center px-5 sm:px-6 py-4 relative z-20 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
            <div className="absolute inset-0 bg-[#D4AF37] rounded-full blur-[60px] sm:blur-[80px] opacity-40 animate-pulse"></div>
            <Compass className="w-20 sm:w-24 h-20 sm:h-24 text-[#D4AF37] mx-auto mb-4 sm:mb-6 relative z-10 animate-pulse" />
        </motion.div>
        
        <h2 className="text-xl sm:text-2xl font-serif text-white mb-2 px-4 leading-tight">Preparando seu Quiz Personalizado...</h2>
        <AnimatePresence mode='wait'>
          <motion.p
            key={loadingStage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-slate-300 text-base sm:text-lg min-h-[3rem] flex items-center justify-center px-4"
          >
            <strong className="text-[#D4AF37]">{loadingStages[loadingStage]}</strong>
          </motion.p>
        </AnimatePresence>
        <div className="w-56 sm:w-64 h-1 bg-white/10 rounded-full mt-6 sm:mt-8 overflow-hidden mx-auto">
            <motion.div className="h-full bg-[#D4AF37]" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 3, ease: "easeInOut" }} />
        </div>
      </div>
    );
  }

  const currentQuestion = activeQuestions[currentIndex];
  if (!currentQuestion) return null;

  // Progress bar constants
  const PROGRESS_START_PERCENT = 10;
  const PROGRESS_RANGE_PERCENT = 90;
  const progress = PROGRESS_START_PERCENT + (currentIndex / activeQuestions.length) * PROGRESS_RANGE_PERCENT;

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col max-w-lg mx-auto px-4 sm:px-5 py-4 sm:py-6 relative z-10 safe-area-inset">
      {/* Progress Bar - Otimizado para mobile */}
      <div className="w-full bg-white/5 backdrop-blur-sm rounded-full h-2 sm:h-3 mb-6 sm:mb-8 relative overflow-hidden border border-white/10 shadow-inner">
        <motion.div 
          className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] h-full rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
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
          <div className="mb-4 sm:mb-6">
            {/* Show name badge for exclusivity if user has provided name and it's not the first question */}
            {userName && currentIndex > 0 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-2 bg-[#D4AF37]/10 backdrop-blur-md text-[#D4AF37] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold border border-[#D4AF37]/20 shadow-lg mb-3 sm:mb-4"
              >
                <Sparkles className="w-3 h-3 flex-shrink-0" />
                <span className="whitespace-nowrap">Pergunta exclusiva para {userName.split(' ')[0]}</span>
              </motion.div>
            )}
            {currentQuestion.id === 0 && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-2"
              >
                <p className="text-[#D4AF37] text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                  🔮 {currentQuestion.title} 🔮
                </p>
              </motion.div>
            )}
            <h2 className="text-xl sm:text-2xl md:text-[28px] font-serif font-bold text-white leading-tight sm:leading-snug drop-shadow-lg px-1" dangerouslySetInnerHTML={{ __html: personalizeText(currentQuestion.text) }}>
            </h2>
          </div>

          {currentQuestion.type === 'input' ? (
            <form onSubmit={handleInputSubmit} className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  className="w-full bg-white/10 border border-white/20 rounded-xl p-4 sm:p-5 text-base sm:text-lg text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all text-center touch-manipulation"
                  autoFocus
                  autoComplete="off"
                  inputMode="text"
                />
                <Sparkles className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-[#D4AF37] animate-pulse pointer-events-none" />
              </div>
              <p className="text-[10px] sm:text-xs text-slate-300 text-center mt-2 mb-2 sm:mb-3 px-2 leading-relaxed">
                ⚠️ Aviso: Seu nome ativa a VIBRAÇÃO exata da sua linhagem ancestral. Isso muda tudo no mapeamento.
              </p>
              <div className="text-[10px] sm:text-xs bg-white/5 backdrop-blur-md border border-white/10 rounded-lg px-3 py-2 mb-2 sm:mb-3 text-slate-300 text-center leading-relaxed">
                ℹ️ Você receberá seu diagnóstico gratuito na próxima tela. Sem compromisso.
              </div>
              <button 
                type="submit"
                disabled={!inputValue.trim()}
                className="w-full sm:w-[90%] mx-auto bg-gradient-to-br from-[#D4AF37] via-[#FFD700] to-[#D4AF37] text-white font-bold py-4 sm:py-5 min-h-[56px] sm:min-h-[60px] rounded-xl shadow-lg shadow-[#D4AF37]/30 hover:shadow-[#D4AF37]/50 hover:brightness-110 active:scale-[0.97] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border-t border-white/20 text-base sm:text-lg touch-manipulation"
              >
                🔥 CONECTAR E INICIAR ANÁLISE →
              </button>
              <p className="text-[10px] sm:text-xs text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
                🔒 Ambiente Seguro e Sigiloso
              </p>
            </form>
          ) : (
            <div className="space-y-2.5 sm:space-y-3">
              {/* Emotional context text before options */}
              {currentQuestion.emotionalContext && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xs sm:text-sm text-[#FFD700] text-center font-semibold mt-2 mb-3 sm:mb-4 px-2 leading-relaxed"
                >
                  {currentQuestion.emotionalContext}
                </motion.p>
              )}
              
              {currentQuestion.options?.map((option, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => handleOptionClick(option)}
                  disabled={isNavigating}
                  className={`w-full text-left p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl transition-all duration-300 active:scale-[0.97] group relative overflow-hidden touch-manipulation min-h-[72px] sm:min-h-[80px] ${isNavigating ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'} ${
                    currentQuestion.singleButton 
                      ? 'bg-gradient-to-br from-[#D4AF37] via-[#FFD700] to-[#D4AF37] text-white font-bold shadow-lg shadow-[#D4AF37]/30 hover:shadow-[#D4AF37]/50 hover:brightness-110 border-t border-white/20' 
                      : 'bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/5 to-[#D4AF37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full pointer-events-none"></div>
                  <div className="flex items-center gap-3 sm:gap-4 relative z-10">
                    {option.icon && <span className="text-[28px] sm:text-[32px] filter drop-shadow-md flex-shrink-0" aria-hidden="true">{option.icon}</span>}
                    <div className="flex-1 min-w-0">
                      <span className={`font-semibold transition-colors text-sm sm:text-base md:text-lg block leading-tight ${currentQuestion.singleButton ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                        {option.label}
                      </span>
                      {option.sublabel && (
                        <span className={`text-xs sm:text-sm mt-1 sm:mt-1.5 block transition-colors leading-relaxed ${currentQuestion.singleButton ? 'text-white/90' : 'text-lavender-500 group-hover:text-slate-300'}`}>
                          {option.sublabel}
                        </span>
                      )}
                    </div>
                    <ChevronRight className={`w-4 sm:w-5 h-4 sm:h-5 ml-auto flex-shrink-0 ${currentQuestion.singleButton ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} aria-hidden="true" />
                  </div>
                </motion.button>
              ))}
              
              {/* Validation text - italic, centered */}
              {currentQuestion.validationText && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xs sm:text-sm text-slate-300 text-center italic mt-3 sm:mt-4 px-2 leading-relaxed"
                >
                  {currentQuestion.validationText}
                </motion.p>
              )}
              
              {/* Warning text - red, bold, centered */}
              {currentQuestion.warningText && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xs sm:text-sm text-red-400 text-center font-bold mt-3 sm:mt-4 px-3 sm:px-2 bg-red-950/30 border border-red-900/50 rounded-lg py-2.5 sm:py-3 leading-relaxed"
                >
                  {currentQuestion.warningText}
                </motion.p>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
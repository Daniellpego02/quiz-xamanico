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
      title: "CALIBRAGEM ENERGÉTICA",
      text: "Para calibrar a precisão do seu mapa, precisamos conectar o seu nome à sua energia.",
      type: "input",
      placeholder: "Digite seu primeiro nome..."
    },
    {
      id: 1,
      title: "CALIBRAGEM DE INTENSIDADE",
      text: "{NAME}, para o Oráculo rastrear a origem do bloqueio, precisamos saber: <strong>há quanto tempo você sente que sua vida financeira está 'estagnada'?</strong>",
      options: [
        { label: "Há alguns meses", sublabel: "Começou recentemente, mas me preocupa", value: "months", icon: "📅" },
        { label: "Entre 1 e 3 anos", sublabel: "Sinto que estou andando em círculos", value: "years_1_3", icon: "🔄" },
        { label: "Mais de 5 anos", sublabel: "Já tentei de tudo e nada muda", value: "years_5_plus", icon: "⏳" },
        { label: "Desde sempre / Padrão de Família", sublabel: "Parece que herdei essa dificuldade", value: "hereditary", icon: "🧬" },
      ]
    }
  ];

  // Caminho FINANCEIRO - Nova estrutura de agitação de dor conforme briefing
  const financeQuestions: QuizQuestion[] = [
    {
      id: 2,
      title: "P2 — O Sintoma Visceral",
      text: "Qual dessas sensações descreve melhor a sua relação com o dinheiro hoje?",
      options: [
        { label: "Mão Furada", sublabel: "O dinheiro entra e parece que 'evapora' com imprevistos", value: "leak", icon: "💸" },
        { label: "Teto de Vidro", sublabel: "Trabalho muito, mas nunca consigo passar de um certo valor", value: "ceiling", icon: "🚧" },
        { label: "Montanha Russa", sublabel: "Tenho meses ótimos seguidos de quedas bruscas", value: "rollercoaster", icon: "🎢" },
        { label: "Peso Morto", sublabel: "Sinto que carrego a responsabilidade financeira de todos nas costas", value: "burden", icon: "🎒" },
      ]
    },
    {
      id: 3,
      title: "P3 — A Raiz Ancestral",
      text: "O Mapa Xamânico busca raízes profundas. Olhando para seus pais ou avós, você vê esse mesmo padrão?",
      options: [
        { label: "Sim, herdei exatamente as mesmas dificuldades deles", value: "inherited", icon: "🔄" },
        { label: "Eles tinham dinheiro, mas perderam tudo", sublabel: "Trauma de Escassez", value: "trauma", icon: "💔" },
        { label: "Não, sou o único da família que parece 'travado'", value: "unique", icon: "🐑" },
        { label: "Nunca parei para pensar nisso", sublabel: "Bloqueio Inconsciente", value: "unaware", icon: "💡" },
      ]
    },
    {
      id: 4,
      title: "P4 — O Gatilho da Injustiça",
      text: "Você tem a sensação de que pessoas menos capacitadas que você estão ganhando muito mais?",
      options: [
        { label: "Sim, e isso me gera revolta e frustração", value: "anger", icon: "😤" },
        { label: "Sinto que para mim tudo é 10x mais difícil", value: "harder", icon: "⛰️" },
        { label: "Parece que eles têm uma 'sorte' que eu não tenho", value: "unlucky", icon: "🍀" },
        { label: "Sinto que meu esforço é inútil", value: "futile", icon: "😔" },
      ]
    },
    {
      id: 5,
      title: "P5 — A Prontidão",
      text: "{NAME}, o Oráculo identificou um bloqueio severo. A revelação pode ser dolorosa. Você está pronto para ver seu mapa?",
      singleButton: true,
      options: [
        { label: "Sim, quero a verdade e o fim desse ciclo", value: "ready", icon: "🔥" },
      ]
    }
  ];

  useEffect(() => {
    setActiveQuestions(initialQuestions);
  }, []);

  const getLoadingStages = () => [
    "Acessando Registros Ancestrais de " + userName,
    "Identificando Padrão de Escassez Hereditária",
    "Calculando Potencial de Riqueza Reprimido",
    "MAPA GERADO COM SUCESSO! ✅"
  ];

  useEffect(() => {
    if (showTuningScreen) {
      const loadingStages = getLoadingStages();
      
      const interval = setInterval(() => {
        setLoadingStage(prev => (prev + 1) % loadingStages.length);
      }, 800);
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
        setCurrentIndex(prev => prev + 1);
    }, 3500);
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

    // LÓGICA DE FLUXO ÚNICO FINANCEIRO (Pergunta 1)
    // Após a pergunta 1 (temporal pain), automaticamente adiciona as perguntas financeiras
    // Note: O path é fixo em 'finance' como estratégia de fluxo único para aumentar conversão
    let mergedQuestions = activeQuestions;
    if (currentIndex === 1) {
      // Sempre usa o caminho financeiro
      mergedQuestions = [...activeQuestions, ...financeQuestions];
      setActiveQuestions(mergedQuestions);
    }

    // Track halfway point
    if (currentIndex === 4) {
      tracking.quiz.halfway();
    }

    setTimeout(() => {
      const length = mergedQuestions.length;
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
      <div className="min-h-screen flex flex-col items-center justify-center px-6 relative z-20 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
            <div className="absolute inset-0 bg-orange-500 rounded-full blur-[80px] opacity-40 animate-pulse"></div>
            <Compass className="w-24 h-24 text-[#FF9500] mx-auto mb-6 relative z-10 animate-pulse" />
        </motion.div>
        
        <h2 className="text-2xl font-serif text-white mb-2">Acessando Frequência Vibracional...</h2>
        <AnimatePresence mode='wait'>
          <motion.p
            key={loadingStage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-slate-300 text-lg min-h-[3rem] flex items-center justify-center"
          >
            <strong className="text-[#FF9500]">{loadingStages[loadingStage]}</strong>
          </motion.p>
        </AnimatePresence>
        <div className="w-64 h-1 bg-white/10 rounded-full mt-8 overflow-hidden mx-auto">
            <motion.div className="h-full bg-[#FF9500]" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 3, ease: "easeInOut" }} />
        </div>
      </div>
    );
  }

  const currentQuestion = activeQuestions[currentIndex];
  if (!currentQuestion) return null;

  const progress = ((currentIndex + 1) / activeQuestions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col max-w-lg mx-auto px-4 py-6 relative z-10">
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
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col"
        >
          <div className="mb-6">
            {/* Show name badge for exclusivity if user has provided name and it's not the first question */}
            {userName && currentIndex > 0 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-2 bg-[#FF9500]/10 backdrop-blur-md text-[#FF9500] px-4 py-2 rounded-full text-xs font-bold border border-[#FF9500]/20 shadow-lg mb-4"
              >
                <Sparkles className="w-3 h-3" />
                <span>
                  {currentIndex === 1 
                    ? `Calibrando Fluxo da Prosperidade de ${userName.split(' ')[0]}`
                    : `Pergunta exclusiva para ${userName.split(' ')[0]}`
                  }
                </span>
              </motion.div>
            )}
            {currentQuestion.id === 0 && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-2"
              >
                <p className="text-[#FF9500] text-xs md:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                  ⚡ CALIBRAGEM VIBRACIONAL
                </p>
              </motion.div>
            )}
            <h2 className="text-xl md:text-2xl font-serif font-bold text-white leading-snug drop-shadow-lg" dangerouslySetInnerHTML={{ __html: personalizeText(currentQuestion.text) }}>
            </h2>
          </div>

          {currentQuestion.type === 'input' ? (
            <form onSubmit={handleInputSubmit} className="space-y-4 mt-4">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  className="w-full bg-white/10 border border-white/20 rounded-xl p-5 text-lg text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-center"
                  autoFocus
                />
                <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400 animate-pulse" />
              </div>
              <button 
                type="submit"
                disabled={!inputValue.trim()}
                className="w-full bg-gradient-to-br from-[#FF9500] via-[#F58400] to-[#EA580C] text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border-t border-white/20"
              >
                CONECTAR E INICIAR ANÁLISE
                <ChevronRight className="w-5 h-5" />
              </button>
              <p className="text-xs text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
                🔒 Ambiente Seguro e Sigiloso
              </p>
            </form>
          ) : (
            <div className="space-y-3">
              {currentQuestion.options?.map((option, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => handleOptionClick(option)}
                  disabled={isNavigating}
                  className={`w-full text-left p-5 rounded-2xl transition-all active:scale-[0.98] group relative overflow-hidden ${isNavigating ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'} ${
                    currentQuestion.singleButton 
                      ? 'bg-gradient-to-br from-[#FF9500] via-[#F58400] to-[#EA580C] text-white font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:brightness-110 border-t border-white/20' 
                      : 'bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#FF9500]/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,149,0,0.15)]'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full"></div>
                  <div className="flex items-center gap-4 relative z-10">
                    <span className="text-3xl filter drop-shadow-md" aria-hidden="true">{option.icon}</span>
                    <div className="flex-1">
                      <span className={`font-medium transition-colors text-lg block ${currentQuestion.singleButton ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                        {option.label}
                      </span>
                      {option.sublabel && (
                        <span className={`text-sm mt-1 block transition-colors ${currentQuestion.singleButton ? 'text-white/90' : 'text-slate-400 group-hover:text-slate-300'}`}>
                          {option.sublabel}
                        </span>
                      )}
                    </div>
                    <ChevronRight className={`w-4 h-4 ml-auto shrink-0 ${currentQuestion.singleButton ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} aria-hidden="true" />
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
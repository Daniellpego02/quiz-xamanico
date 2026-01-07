import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizQuestion, QuizPath, QuestionOption } from '../types';
import { ChevronRight, Sparkles, Compass, AlertTriangle, Smartphone, Shield, CheckCircle2 } from 'lucide-react';
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
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [loadingScreenStartTime, setLoadingScreenStartTime] = useState<number>(0);

  // Constants
  const CATALOGED_LINEAGES = 847;
  const OTHER_OPTION: QuestionOption = { 
    label: "Nenhum desses, meu problema é outro", 
    value: "other", 
    icon: "" 
  };

  // Quiz path is now hardcoded to finance only (single flow strategy)
  const QUIZ_PATH: QuizPath = 'finance';

  // Perguntas Iniciais (Comuns)
  const initialQuestions: QuizQuestion[] = [
    {
      id: 0,
      title: "PERGUNTA 1 DE 6",
      text: "SEU NOME ATIVA A FREQUÊNCIA EXATA DA SUA LINHAGEM ANCESTRAL",
      type: "input",
      placeholder: "Ex: João",
      emotionalContext: `⚡ Seu nome carrega energia poderosa.\n\nO sistema identifica padrões em ${CATALOGED_LINEAGES} linhagens brasileiras catalogadas.\n\n✨ Isso muda TUDO no seu diagnóstico.`
    }
  ];

  // Caminho FINANCEIRO - Nova estrutura de agitação de dor conforme briefing
  const financeQuestions: QuizQuestion[] = [
    {
      id: 1,
      title: "PERGUNTA 2 DE 6",
      text: "⚠️ SISTEMA DETECTOU BLOQUEIO SEVERO NA SUA ENERGIA FINANCEIRA",
      subtext: "Existe um Protocolo Xamânico de 7 dias que LIMPA esse bloqueio COMPLETAMENTE.",
      emotionalContext: "A pergunta é:\n\n💎 Você está disposto(a) a seguir o protocolo... mesmo que isso signifique ROMPER padrões que sua família carrega há gerações?",
      singleButton: true,
      validationText: "A maioria vive checando o saldo antes de comprar QUALQUER coisa, pedindo emprestado todo mês... sem saber que um bloqueio ancestral causa isso. 🔓 Você não precisa ser uma delas.",
      options: [
        { label: "✓ SIM, quero destruir esse bloqueio agora", value: "ready", icon: "" },
      ]
    },
    {
      id: 2,
      title: "PERGUNTA 3 DE 6",
      text: "SE NADA MUDAR NOS PRÓXIMOS 6 MESES... QUAL É O SEU MAIOR MEDO?",
      emotionalContext: "🎯 Seja BRUTALMENTE honesto. Essa resposta define qual bloqueio ancestral o protocolo vai atacar primeiro.",
      warningText: "⚡ ATENÇÃO: Essa é A RESPOSTA MAIS IMPORTANTE do diagnóstico.\n\n🔮 O que você escolher aqui define:\n• Qual tipo de bloqueio ancestral será revelado\n• Qual protocolo de limpeza você vai receber\n• Quantos dias até começar a sentir o desbloqueio\n\n💭 A maioria escolhe opção 1 ou 3. Mas seja honesto com VOCÊ, não com o que \"deveria\" sentir.",
      options: [
        { 
          label: "Continuar dependendo dos outros ou contando moedas", 
          sublabel: "💸 Sem liberdade financeira. Sempre devendo. Sempre limitado.", 
          value: "dependency", 
          icon: "" 
        },
        { 
          label: "Envelhecer sem construir patrimônio real", 
          sublabel: "🏠 Chegar aos 55 anos sem casa própria. Morrer sem deixar nada.", 
          value: "aging", 
          icon: "" 
        },
        { 
          label: "Ver minha família sofrer por causa da minha situação financeira", 
          sublabel: "💔 Não poder ajudar quando precisam. Sentir que FALHOU.", 
          value: "family", 
          icon: "" 
        },
      ]
    },
    {
      id: 3,
      title: "PERGUNTA 4 DE 6",
      text: "{NAME}, QUAL DESSAS VERDADES MAIS DÓI QUANDO VOCÊ PENSA NELA?",
      emotionalContext: "Qual desses cenários descreve SUA VIDA agora?",
      hasOtherOption: true,
      options: [
        { label: "O dinheiro entra, mas EVAPORA em imprevistos", sublabel: "💸 Tudo que entra, sai. Emergências sem parar. Parece um ralo.", value: "leak", icon: "" },
        { label: "Trabalho 12 horas por dia, ganho pouco, acordo exausto", sublabel: "⚡ Faz tudo certo mas o salário NÃO sobe. Teto invisível bloqueando.", value: "tired", icon: "" },
        { label: "Tenho PAVOR que falte dinheiro", sublabel: "😰 Checa o saldo 3x ao dia. Vive com medo de faltar.", value: "fear", icon: "" },
      ]
    },
    {
      id: 4,
      title: "PERGUNTA 5 DE 6",
      text: "O XAMANISMO FINANCEIRO DESCOBRIU QUE 87% DOS PADRÕES FINANCEIROS SE REPETEM POR 3 GERAÇÕES.",
      subtext: "Olhando para seus PAIS ou AVÓS, o que você vê?",
      emotionalContext: "→ Essa resposta revela a RAIZ do seu bloqueio ancestral.",
      validationText: "Isso não é culpa sua. É um padrão que sua família carrega há gerações. Você só recebeu. Agora pode ser quem rompe esse ciclo.",
      options: [
        { label: "Histórico de dívidas, falências ou lutas financeiras brutais.", sublabel: "⚠️ Avô, pai, você... mesmo ciclo há 3 gerações. Sempre endividado.", value: "heavy", icon: "" },
        { label: "Pessoas honestas, trabalhadoras... mas que NUNCA enriqueceram.", sublabel: "💼 40 anos trabalhando, 1 salário mínimo na aposentadoria. Honestidade não trouxe abundância.", value: "honest", icon: "" },
        { label: "Tinha dinheiro, mas MUITA briga, traição e desarmonia familiar.", sublabel: "💰 Grana sim, mas guerra emocional. Ter dinheiro = sofrer.", value: "conflict", icon: "" },
      ]
    },
    {
      id: 5,
      title: "PERGUNTA 6 DE 6",
      text: "O sistema identificou um bloqueio severo na sua frequência. Se existir um Protocolo de 7 dias para limpar isso COMPLETAMENTE, você está disposto(a) a seguir?",
      singleButton: true,
      bridgeText: "Se você disser SIM aqui, o sistema gera seu mapa PERSONALIZADO e libera o protocolo completo de 7 dias dentro do APP.",
      validationText: "A maioria das pessoas vive a vida inteira com esse bloqueio sem saber. Você não precisa ser uma delas.",
      options: [
        { label: "SIM, quero meu mapa agora", value: "ready", icon: "" },
      ]
    }
  ];

  useEffect(() => {
    setActiveQuestions(initialQuestions);
  }, []);

  const getLoadingStages = () => [
    `Identificando seu bloqueio ancestral específico...`,
    `Gerando seu protocolo personalizado de 7 dias...`,
    "Pronto para começar!"
  ];

  useEffect(() => {
    if (showTuningScreen) {
      // Track loading screen view
      tracking.engagement.loadingScreen('view');
      const startTime = Date.now();
      setLoadingScreenStartTime(startTime);
      
      const loadingStages = getLoadingStages();
      
      const interval = setInterval(() => {
        setLoadingStage(prev => (prev + 1) % loadingStages.length);
      }, 2500); // Increased from 800ms to 2500ms for more realistic timing per stage
      
      return () => clearInterval(interval);
    } else {
      // Track loading screen completion if it was shown
      if (loadingScreenStartTime > 0) {
        const duration = (Date.now() - loadingScreenStartTime) / 1000; // Convert to seconds
        tracking.engagement.loadingScreen('complete', duration);
        setLoadingScreenStartTime(0);
      }
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
    }, 8000); // Increased from 4500ms to 8000ms for better suspense and perceived value
  };

  const handleOptionClick = (option: QuestionOption) => {
    if (isNavigating) return;
    
    // Set selected option for visual feedback
    setSelectedOption(option.value);
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

    // Increased delay to 900ms for better "digest" time and satisfaction
    setTimeout(() => {
      const length = activeQuestions.length;
      if (currentIndex < length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedOption(null); // Reset selection for next question
        setIsNavigating(false);
      } else {
        // Track quiz completion with enhanced tracking
        tracking.quiz.complete(QUIZ_PATH, userName, activeQuestions.length);
        tracking.meta.completeRegistration({ content_name: 'Quiz Completo', path: QUIZ_PATH });
        onComplete(QUIZ_PATH, userName);
      }
    }, 900); // Increased from 500ms to 900ms for better user satisfaction
  };

  if (showTuningScreen) {
    const loadingStages = getLoadingStages();
    
    return (
      <div className="min-h-screen min-h-[100dvh] flex flex-col items-center justify-center px-5 sm:px-6 py-4 relative z-20 text-center">
        {/* Enhanced icon with larger size and better animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative mb-8 sm:mb-10"
        >
          {/* Outer glow ring */}
          <motion.div 
            className="absolute inset-0 bg-[#D4AF37] rounded-full blur-[100px] opacity-40"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Icon with enhanced size and animations - Mobile optimized */}
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Compass 
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 text-[#D4AF37] relative z-10 drop-shadow-[0_0_30px_rgba(212,175,55,0.8)]" 
              strokeWidth={1.5}
            />
          </motion.div>
          
          {/* Inner pulse ring */}
          <motion.div
            className="absolute inset-0 border-4 border-[#D4AF37]/30 rounded-full"
            animate={{
              scale: [1, 1.5],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        </motion.div>
        
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-5 px-4 leading-tight tracking-tight">
          Preparando seu Quiz <span className="text-[#D4AF37]">Personalizado</span>
        </h2>
        
        <AnimatePresence mode='wait'>
          <motion.p
            key={loadingStage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-slate-300 text-base sm:text-lg md:text-xl min-h-[4.5rem] flex items-center justify-center px-4 font-medium leading-[1.5]"
          >
            <strong className="text-[#FFD700]">{loadingStages[loadingStage]}</strong>
          </motion.p>
        </AnimatePresence>
        
        {/* Enhanced progress bar - Mobile optimized */}
        <div className="w-64 sm:w-80 md:w-96 h-2 sm:h-2.5 bg-white/10 rounded-full mt-8 sm:mt-10 overflow-hidden mx-auto border border-[#D4AF37]/20">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] relative overflow-hidden" 
            initial={{ width: "0%" }} 
            animate={{ width: "100%" }} 
            transition={{ duration: 3.5, ease: "easeInOut" }}
            style={{
              boxShadow: '0 0 15px rgba(212, 175, 55, 0.6)',
            }}
          >
            {/* Animated shine */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
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
    <div className="min-h-screen min-h-[100dvh] flex flex-col max-w-lg mx-auto px-5 sm:px-6 md:px-8 py-5 sm:py-6 md:py-8 relative z-10">
      {/* Progress Bar - Enhanced with better visibility, badge outside for better legibility */}
      <div className="mb-6 sm:mb-8">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 sm:gap-4"
        >
          {/* Progress bar container */}
          <div className="flex-1 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-full h-4 sm:h-5 relative overflow-hidden border-2 border-[#D4AF37]/30 shadow-lg">
            <motion.div 
              className="bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] h-full rounded-full relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                boxShadow: '0 0 25px rgba(212, 175, 55, 0.7), 0 0 50px rgba(212, 175, 55, 0.4)',
              }}
            >
              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              {/* Pulsing glow at the end */}
              <motion.div
                className="absolute right-0 top-0 bottom-0 w-1 bg-white"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  boxShadow: [
                    '0 0 5px rgba(255,255,255,0.5)',
                    '0 0 15px rgba(255,255,255,1)',
                    '0 0 5px rgba(255,255,255,0.5)'
                  ]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </motion.div>
          </div>
          
          {/* Progress percentage text - Outside bar for always-visible clarity */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1a0d2e]/95 backdrop-blur-md px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg border-2 border-[#D4AF37]/40 shadow-lg min-w-[50px] sm:min-w-[55px] flex items-center justify-center"
          >
            <span className="text-sm sm:text-base font-black text-[#FFD700] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] tracking-tight">
              {Math.round(progress)}%
            </span>
          </motion.div>
        </motion.div>
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
          <div className="mb-6 sm:mb-8 space-y-4 sm:space-y-5">
            {/* TAG PEQUENA - Enhanced with better styling */}
            {userName && currentIndex > 0 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37]/40 to-[#D4AF37]/30 backdrop-blur-md text-[#FFD700] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-black border-2 border-[#D4AF37]/50 relative overflow-hidden"
                style={{
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 20px rgba(212, 175, 55, 0.3)',
                }}
              >
                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 drop-shadow-[0_0_4px_rgba(255,215,0,0.8)]" />
                </motion.div>
                <span className="whitespace-nowrap relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                  Pergunta exclusiva para {userName.split(' ')[0]}
                </span>
              </motion.div>
            )}
            
            {/* Título da pergunta (TAG) */}
            {currentQuestion.title && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-3"
              >
                <p className="text-[#FFE66D] text-[13px] sm:text-sm font-bold uppercase tracking-wider text-center drop-shadow-[0_2px_8px_rgba(255,230,109,0.4)]">
                  ✨ {currentQuestion.title}
                </p>
              </motion.div>
            )}

            {/* HEADLINE DA PERGUNTA - Improved readability with larger base sizes */}
            <h2 className="text-[17px] sm:text-[21px] md:text-[26px] lg:text-[30px] font-bold text-white leading-[1.3] text-center px-2 text-glow-gold">
              <span dangerouslySetInnerHTML={{ __html: personalizeText(currentQuestion.text).replace('BLOQUEIO SEVERO', '<span class="text-[#FF4500]">BLOQUEIO SEVERO</span>').replace('6 MESES', '<span class="text-[#FF4500]">6 MESES</span>').replace('MAIOR MEDO', '<span class="text-[#FF4500]">MAIOR MEDO</span>').replace('ENERGIA', '<span class="text-[#FFD700]">ENERGIA</span>') }}></span>
            </h2>

            {/* Subtexto (para pergunta 2) - Better line-height */}
            {currentQuestion.subtext && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-sm sm:text-base md:text-lg text-white/90 text-center mt-4 px-2 leading-[1.6]"
              >
                {currentQuestion.subtext}
              </motion.p>
            )}
          </div>

          {currentQuestion.type === 'input' ? (
            // TELA 4: PERGUNTA 1 (NOME)
            <form onSubmit={handleInputSubmit} className="space-y-6 sm:space-y-8">
              {/* LABEL DO INPUT */}
              <div className="text-left">
                <label className="text-base sm:text-lg text-white/90 block mb-4 font-medium">
                  Digite seu primeiro nome:
                </label>
                
                {/* INPUT FIELD - Enhanced with premium styling and proper icon centering */}
                <div className="relative group">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={currentQuestion.placeholder}
                    className="w-full bg-gradient-to-br from-[#1a0d2e]/90 to-[#0f0520]/90 backdrop-blur-sm border-2 border-[#D4AF37]/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 pr-14 sm:pr-16 text-[16px] sm:text-lg md:text-xl text-white placeholder-white/40 focus:outline-none focus:border-[#FFD700] focus:ring-4 focus:ring-[#FFD700]/20 transition-all duration-300 shadow-lg hover:border-[#D4AF37]/50 min-h-[56px] sm:min-h-[64px]"
                    autoFocus
                    autoComplete="name"
                    inputMode="text"
                    style={{
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), inset 0 2px 4px 0 rgba(212, 175, 55, 0.05)',
                    }}
                  />
                  {/* Animated icon - Fixed vertical centering */}
                  <motion.div 
                    className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                  </motion.div>
                  
                  {/* Focus glow effect */}
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      boxShadow: '0 0 0 4px rgba(212, 175, 55, 0.1), 0 0 20px rgba(212, 175, 55, 0.2)',
                    }}
                  />
                </div>
              </div>

              {/* CARD DE EXPLICAÇÃO - Standardized with border-left style for consistency */}
              {currentQuestion.emotionalContext && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="border-l-4 border-[#FFD700] bg-gradient-to-r from-[#1a0d2e]/90 to-[#0f0520]/90 rounded-r-xl sm:rounded-r-2xl pl-4 sm:pl-5 pr-3 sm:pr-4 py-3 sm:py-4 relative overflow-hidden"
                  style={{
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), inset 2px 0 10px rgba(212, 175, 55, 0.1)',
                  }}
                >
                  {/* Subtle glow on left edge */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FFD700] via-[#D4AF37] to-[#FFD700] opacity-80" />
                  
                  <div className="flex items-start gap-3 relative z-10">
                    <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm md:text-base text-white/90 leading-relaxed whitespace-pre-line">
                      {currentQuestion.emotionalContext.split('\n\n').map((paragraph, i) => (
                        <span key={i}>
                          {paragraph.replace('847 linhagens', '').includes('847') ? (
                            <>
                              {paragraph.split('847')[0]}
                              <strong className="text-[#FFD700] font-bold">847</strong>
                              {paragraph.split('847')[1]}
                            </>
                          ) : (
                            paragraph
                          )}
                          {i < currentQuestion.emotionalContext!.split('\n\n').length - 1 && <><br/><br/></>}
                        </span>
                      ))}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* TEXTO REASSURANCE - Improved readability */}
              <div className="flex items-center justify-center gap-2 text-[#4ade80] text-center">
                <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <p className="text-sm sm:text-base leading-relaxed">
                  Usamos apenas seu primeiro nome. Você continua 100% anônimo.
                </p>
              </div>

              {/* CTA BOTÃO - Enhanced premium design with better touch target */}
              <motion.button 
                type="submit"
                disabled={!inputValue.trim() || inputValue.trim().length < 2}
                className="relative w-full bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] text-black font-black py-5 sm:py-6 px-6 sm:px-8 rounded-xl sm:rounded-2xl text-base sm:text-lg md:text-xl overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-transform duration-150 min-h-[60px]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  boxShadow: '0 10px 40px rgba(255, 215, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
                
                {/* Button content */}
                <span className="relative z-10 flex items-center justify-center gap-2.5 sm:gap-3">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>CONECTAR E INICIAR ANÁLISE</span>
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </span>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl"
                  style={{
                    boxShadow: '0 0 30px rgba(255, 215, 0, 0.5), 0 0 60px rgba(255, 215, 0, 0.2)',
                  }}
                />
              </motion.button>

              {/* RODAPÉ - Better readability */}
              <div className="flex items-center justify-center gap-2 text-white/70 text-center">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                <p className="text-sm">100% Confidencial - Ninguém vai ver seu resultado</p>
              </div>
            </form>
          ) : (
            // TELA 5: PERGUNTAS COM OPÇÕES
            <div className="space-y-6 sm:space-y-8">
              {/* INSTRUÇÃO / Emotional Context */}
              {currentQuestion.emotionalContext && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm sm:text-base md:text-lg text-[#FFD700] font-medium border-l-4 border-[#FFD700] pl-4 sm:pl-5 py-3 leading-[1.65] whitespace-pre-line bg-gradient-to-r from-[#FFD700]/10 to-transparent rounded-r-lg"
                >
                  {currentQuestion.emotionalContext.split('BRUTALMENTE').map((part, i) => (
                    <span key={i}>
                      {i > 0 && <strong className="text-[#FFD700] font-bold">BRUTALMENTE</strong>}
                      {part}
                    </span>
                  ))}
                </motion.div>
              )}

              {/* ESPAÇAMENTO: 32px */}
              <div className="h-8"></div>

              {/* Bridge text for question 6 */}
              {currentQuestion.bridgeText && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="text-sm sm:text-base text-white/90 text-center leading-relaxed"
                >
                  {currentQuestion.bridgeText}
                </motion.p>
              )}

              {/* ESPAÇAMENTO: 24px (if bridge text exists) */}
              {currentQuestion.bridgeText && <div className="h-6"></div>}

              {/* OPÇÕES - Cards clicáveis com design premium, espaçamento consistente e interações polidas */}
              <div className="space-y-4 sm:space-y-5">
                {currentQuestion.options?.map((option, idx) => {
                  const isSelected = selectedOption === option.value;
                  return (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: isNavigating && !isSelected ? 0.3 : 1, 
                      y: 0,
                      scale: isSelected ? 1.02 : 1
                    }}
                    transition={{ delay: idx * 0.08 + 0.3 }}
                    onClick={() => handleOptionClick(option)}
                    disabled={isNavigating}
                    whileHover={!isNavigating && !isSelected ? { 
                      scale: 1.02, 
                      y: -3,
                      transition: { duration: 0.2 }
                    } : {}}
                    whileTap={!isNavigating ? { 
                      scale: 0.97,
                      transition: { duration: 0.1 }
                    } : {}}
                    className={`w-full text-left rounded-xl sm:rounded-2xl transition-all duration-200 group relative overflow-hidden ${
                      isNavigating ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                    } ${
                      isSelected
                        ? 'border-[3px] border-[#FFD700] bg-gradient-to-br from-[#2a1d4e]/95 to-[#1a0d2e]/95 p-5 sm:p-6 md:p-7'
                        : currentQuestion.singleButton 
                          ? 'bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] text-black font-bold p-5 sm:p-6 md:p-7 border-none hover:brightness-110'
                          : 'bg-gradient-to-br from-[#1a0d2e]/90 to-[#0f0520]/90 border-2 border-[#3d2a5f] hover:border-[#FFD700]/70 hover:bg-gradient-to-br hover:from-[#2a1d4e]/90 hover:to-[#1a0d2e]/90 p-5 sm:p-6 md:p-7'
                    }`}
                    style={isSelected ? {
                      boxShadow: '0 0 40px rgba(255, 215, 0, 0.7), 0 0 80px rgba(255, 215, 0, 0.35), 0 0 0 4px rgba(255, 215, 0, 0.9), inset 0 2px 0 rgba(255, 215, 0, 0.3)',
                    } : currentQuestion.singleButton ? {
                      boxShadow: '0 10px 40px rgba(255, 215, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                    } : {
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(212, 175, 55, 0.08)',
                    }}
                  >
                    {/* Shimmer effect for single button */}
                    {currentQuestion.singleButton && !isSelected && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:animate-shimmer" />
                    )}
                    
                    {/* Selected state glow */}
                    {isSelected && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/10 rounded-xl sm:rounded-2xl pointer-events-none"
                      />
                    )}
                    
                    {/* Hover glow for regular cards */}
                    {!currentQuestion.singleButton && !isSelected && (
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl sm:rounded-2xl pointer-events-none"
                        style={{
                          boxShadow: '0 0 30px rgba(212, 175, 55, 0.3), inset 0 0 25px rgba(212, 175, 55, 0.1)',
                        }}
                      />
                    )}
                    
                    {/* Active/pressed state */}
                    <div className="absolute inset-0 opacity-0 group-active:opacity-100 transition-opacity duration-100 rounded-xl sm:rounded-2xl pointer-events-none bg-black/10" />
                    
                    {/* Estrutura interna do card com melhor hierarquia visual */}
                    <div className="relative z-10 space-y-3">
                      {/* Headline */}
                      <div className="flex items-start gap-4 sm:gap-5">
                        <div className="flex-1 space-y-2.5">
                          <p className={`text-base sm:text-lg md:text-xl font-bold leading-snug ${currentQuestion.singleButton ? 'text-black' : 'text-white'}`}>
                            {option.label}
                          </p>
                          
                          {/* Descrição expandida (sublabel) - Melhor espaçamento e legibilidade */}
                          {option.sublabel && (
                            <p className={`text-sm sm:text-base md:text-lg leading-relaxed ${currentQuestion.singleButton ? 'text-black/75' : 'text-white/85'}`}>
                              {option.sublabel.split('FALHOU').map((part, i) => (
                                <span key={i}>
                                  {i > 0 && <strong className={`font-bold ${currentQuestion.singleButton ? 'text-black' : 'text-[#FFD700]'}`}>FALHOU</strong>}
                                  {part}
                                </span>
                              ))}
                            </p>
                          )}
                        </div>
                        
                        {/* Checkmark or Arrow - Enhanced animation for better satisfaction */}
                        {isSelected ? (
                          <motion.div
                            initial={{ scale: 0, rotate: -180, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                            className="flex-shrink-0"
                          >
                            <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9 text-[#FFD700] drop-shadow-[0_0_12px_rgba(255,215,0,1)]" />
                          </motion.div>
                        ) : !currentQuestion.singleButton ? (
                          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-[#FFD700] flex-shrink-0 group-hover:translate-x-2 transition-transform duration-200" />
                        ) : (
                          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-black flex-shrink-0 group-hover:translate-x-2 transition-transform duration-200" />
                        )}
                      </div>
                    </div>
                  </motion.button>
                );
                })}
              </div>

              {/* "Nenhum desses" link for question 4 - Better touch target and spacing */}
              {currentQuestion.hasOtherOption && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center pt-3 sm:pt-4"
                >
                  <button
                    onClick={() => handleOptionClick(OTHER_OPTION)}
                    disabled={isNavigating}
                    className="text-sm sm:text-base text-white/70 hover:text-[#FFD700] underline transition-colors min-h-[48px] px-6 py-3 rounded-lg hover:bg-white/5"
                  >
                    Nenhum desses? Meu problema é outro.
                  </button>
                </motion.div>
              )}

              {/* CARD DE ATENÇÃO ou TEXTO MOTIVACIONAL - Enhanced styling with better spacing */}
              {currentQuestion.warningText && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-br from-[#2a0606]/90 to-[#1a0606]/90 border-2 border-[#FF4500]/60 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 space-y-3 relative overflow-hidden mt-4 sm:mt-5"
                  style={{
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 30px rgba(255, 69, 0, 0.2)',
                  }}
                >
                  {/* Subtle glow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF4500]/10 to-transparent opacity-50 pointer-events-none" />
                  
                  <div className="flex items-start gap-3 relative z-10">
                    <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF4500] flex-shrink-0 mt-1" />
                    <p className="text-sm sm:text-base md:text-lg font-bold text-white leading-relaxed whitespace-pre-line">
                      {currentQuestion.warningText}
                    </p>
                  </div>
                </motion.div>
              )}

              {currentQuestion.validationText && !currentQuestion.warningText && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-br from-[#0f0520]/90 to-[#0a0520]/90 border-l-4 border-[#FFD700] rounded-xl sm:rounded-2xl p-3 sm:p-4 relative overflow-hidden"
                  style={{
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), inset 2px 0 10px rgba(212, 175, 55, 0.1)',
                  }}
                >
                  {/* Subtle shine effect */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FFD700] via-[#D4AF37] to-[#FFD700] opacity-80" />
                  
                  <p className="text-xs sm:text-sm md:text-base text-white/85 italic leading-relaxed relative z-10">
                    {currentQuestion.validationText}
                  </p>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
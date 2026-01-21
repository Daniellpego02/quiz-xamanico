import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizQuestion, QuizPath, QuestionOption } from '../types';
import { ChevronRight, Sparkles, Compass, Lock, Search, Shield, Star, Users } from 'lucide-react';
import { tracking } from '../utils/tracking';

interface QuizProps {
  onComplete: (path: QuizPath, userName: string) => void;
}

// Total steps for progress calculation (welcome + name input + 4 questions)
const TOTAL_STEPS = 5;

export const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(-1); // -1 = welcome screen
  const [userName, setUserName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);
  const [showTuningScreen, setShowTuningScreen] = useState(false);
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [loadingStage, setLoadingStage] = useState(0);
  const [showEmotionalTransition, setShowEmotionalTransition] = useState(false);
  const [emotionalTransitionText, setEmotionalTransitionText] = useState("");

  // Quiz path is now hardcoded to finance only (single flow strategy)
  const QUIZ_PATH: QuizPath = 'finance';

  // Emotional transition messages shown between specific questions
  const emotionalTransitions: Record<number, string> = {
    2: "Você está acessando memórias que não são racionais, e sim ancestrais. A culpa não é sua. Continue — sua frequência já está se movendo.",
    3: "Estamos chegando ao centro do padrão. Respire fundo. Agora que sabemos, podemos consertar."
  };

  // Name input question
  const initialQuestions: QuizQuestion[] = [
    {
      id: 0,
      title: "CONEXÃO ENERGÉTICA",
      text: "Vou precisar acessar os registros da sua linhagem energética. Digite seu nome de batismo (como aparece na certidão) para conectar com a frequência correta:",
      type: "input",
      placeholder: "Digite seu nome de batismo..."
    }
  ];

  // Finance questions - Rewritten with Yes-Set micro-selling and psychological triggers
  const financeQuestions: QuizQuestion[] = [
    {
      id: 1,
      title: "PASSO 1 DE 4",
      text: "{NAME}, quantas vezes por MÊS você se pega pensando: 'Se eu não ajudar, quem vai?' — mesmo quando você NÃO TEM condições?",
      options: [
        { label: "Todo mês, independente da situação.", sublabel: "O peso que não escolhi mas sinto que é meu dever", value: "leak", icon: "🎢" },
        { label: "Só quando a situação é crítica.", sublabel: "Sinto que devo, mesmo sem poder", value: "tired", icon: "😔" },
        { label: "Raramente, mas sinto culpa quando não ajudo.", sublabel: "O bloqueio do merecimento", value: "fear", icon: "🔒" },
      ]
    },
    {
      id: 2,
      title: "PASSO 2 DE 4",
      text: "{NAME}, quando você era criança, OUVIA alguma dessas frases com frequência? 'Dinheiro não nasce em árvore', 'rico é ganancioso', 'quem tem dinheiro roubou'?",
      options: [
        { label: "Sim, era o que mais ouvia.", sublabel: "Programação de escassez herdada", value: "heavy", icon: "💔" },
        { label: "Não diretamente, mas sentia que dinheiro causava briga.", sublabel: "Trauma financeiro transmitido", value: "honest", icon: "😢" },
        { label: "Não, mas meus pais trabalhavam até morrer.", sublabel: "O padrão de sacrifício sem recompensa", value: "conflict", icon: "😰" },
      ]
    },
    {
      id: 3,
      title: "PASSO 3 DE 4",
      text: "{NAME}, imagine-se daqui a 6 meses. Se NADA mudar — se você continuar exatamente onde está — qual será a SENSAÇÃO que vai dominar seus dias?",
      options: [
        { label: "Angústia de contar cada centavo.", sublabel: "A escassez constante que corrói por dentro", value: "dependency", icon: "😔" },
        { label: "Vergonha de não ter construído nada.", sublabel: "O tempo passando sem mudanças reais", value: "aging", icon: "⏰" },
        { label: "Peso de ver minha família sofrer.", sublabel: "A culpa que não é sua, mas você carrega", value: "family", icon: "💔" },
      ]
    },
    {
      id: 4,
      title: "PASSO 4 DE 4",
      text: "{NAME}, descobrimos que <strong class=\"text-[#FFD700]\">87% das pessoas com seu perfil</strong> rompem esse ciclo quando atacam a causa RAIZ — não os sintomas. Se eu te mostrar COMO fazer isso em 7 dias, você se compromete a seguir?",
      singleButton: true,
      options: [
        { label: "SIM, estou disposto(a) a seguir um protocolo comprovado.", value: "ready", icon: "🔥" },
      ]
    }
  ];

  useEffect(() => {
    setActiveQuestions(initialQuestions);
  }, []);

  const getLoadingStages = () => [
    `Conectando com a frequência de ${userName}...`,
    "Acessando registros da sua linhagem energética...",
    "Padrão de Escassez Hereditária Detectado: Nível Alto...",
    "Mapeando Lealdade Invisível...",
    "DIAGNÓSTICO CONCLUÍDO — Protocolo de Solução Gerado."
  ];

  useEffect(() => {
    if (showTuningScreen) {
      const loadingStages = getLoadingStages();
      
      // Reduced from 800ms to 400ms for faster loading experience
      const interval = setInterval(() => {
        setLoadingStage(prev => (prev + 1) % loadingStages.length);
      }, 400);
      return () => clearInterval(interval);
    } else {
      setLoadingStage(0);
    }
  }, [showTuningScreen, userName]);

  // Handle emotional transitions between questions
  useEffect(() => {
    const transitionMessage = emotionalTransitions[currentIndex];
    if (transitionMessage && currentIndex > 0) {
      setEmotionalTransitionText(transitionMessage);
      setShowEmotionalTransition(true);
      // Reduced from 2500ms to 1800ms for faster transitions
      const timer = setTimeout(() => {
        setShowEmotionalTransition(false);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  const personalizeText = (text: string) => {
    return text.replace("{NAME}", userName ? userName.split(' ')[0] : "você");
  };

  // Handle starting the quiz from welcome screen
  const handleStartQuiz = () => {
    setCurrentIndex(0);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    setUserName(inputValue.trim());
    setShowTuningScreen(true);
    
    tracking.quiz.started(inputValue.trim());

    // Reduced from 3500ms to 2000ms for faster flow
    setTimeout(() => {
        setShowTuningScreen(false);
        const mergedQuestions = [...activeQuestions, ...financeQuestions];
        setActiveQuestions(mergedQuestions);
        setCurrentIndex(prev => prev + 1);
    }, 2000);
  };

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

    if (currentIndex === 2) {
      tracking.quiz.halfway();
    }

    // Reduced from 250ms to 150ms for faster question transitions
    setTimeout(() => {
      const length = activeQuestions.length;
      if (currentIndex < length - 1) {
        setCurrentIndex(prev => prev + 1);
        setIsNavigating(false);
      } else {
        tracking.meta.completeRegistration({ content_name: 'Quiz Completo', path: QUIZ_PATH });
        onComplete(QUIZ_PATH, userName);
      }
    }, 150);
  };

  // Calculate progress for step indicator
  // Progress reflects how many steps are COMPLETE (not the current step being viewed)
  // Steps: welcome(0) -> name input(1) -> q1(2) -> q2(3) -> q3(4) -> q4(5)
  const getCompletedSteps = () => {
    if (currentIndex < 0) return 0; // At welcome screen, nothing completed
    if (currentIndex === 0) return 1; // At name input, welcome completed (20%)
    // At question N (currentIndex 1-4), previous steps completed (name + questions 1 to N-1)
    return currentIndex;
  };

  const progressPercent = Math.min(((getCompletedSteps()) / TOTAL_STEPS) * 100, 100);

  // ==================== WELCOME SCREEN ====================
  if (currentIndex === -1) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex flex-col items-center justify-center px-5 py-8 relative z-10 max-w-lg mx-auto text-center"
      >
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#D4AF37]/10 rounded-full blur-[80px] pointer-events-none -z-10"></div>

        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-[#D4AF37] rounded-full blur-[40px] opacity-30 animate-pulse"></div>
            <Search className="w-16 h-16 text-[#D4AF37] relative z-10" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-serif font-black text-white mb-4 leading-tight"
        >
          🔍 Antes de revelar o que encontrei nos seus registros...
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-slate-300 text-base md:text-lg leading-relaxed mb-6 max-w-md"
        >
          Preciso confirmar alguns sinais. Responda com sinceridade — <span className="text-[#FFD700] font-semibold">não há respostas certas ou erradas.</span>
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-slate-400 text-sm mb-8"
        >
          ⏱️ Leva 2 minutos e revela a causa raiz do seu bloqueio financeiro.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full max-w-sm"
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-xl blur opacity-40 group-hover:opacity-70 transition duration-1000 animate-pulse"></div>
            <button
              onClick={handleStartQuiz}
              className="relative w-full bg-gradient-to-br from-[#D4AF37] via-[#FFD700] to-[#D4AF37] text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-[#D4AF37]/30 hover:shadow-[#D4AF37]/50 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 border-t border-white/20 text-lg"
            >
              Confirmar meus sinais agora
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
        >
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <Lock className="w-3 h-3" />
            <span>100% confidencial</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <Shield className="w-3 h-3" />
            <span>4 perguntas simples</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <Users className="w-3 h-3" />
            <span>+4.327 diagnósticos</span>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // ==================== TUNING/LOADING SCREEN ====================
  if (showTuningScreen) {
    const loadingStages = getLoadingStages();
    
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 relative z-20 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
            <div className="absolute inset-0 bg-[#D4AF37] rounded-full blur-[80px] opacity-40 animate-pulse"></div>
            <Compass className="w-24 h-24 text-[#D4AF37] mx-auto mb-6 relative z-10 animate-pulse" />
        </motion.div>
        
        <h2 className="text-2xl font-serif text-white mb-2">
          {userName.split(' ')[0]}, iniciando sua conexão...
        </h2>
        <AnimatePresence mode='wait'>
          <motion.p
            key={loadingStage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="text-slate-300 text-lg min-h-[3rem] flex items-center justify-center"
          >
            <strong className="text-[#D4AF37]">{loadingStages[loadingStage]}</strong>
          </motion.p>
        </AnimatePresence>
        <div className="w-64 h-1 bg-white/10 rounded-full mt-8 overflow-hidden mx-auto">
            <motion.div className="h-full bg-[#D4AF37]" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.8, ease: "easeOut" }} />
        </div>
      </div>
    );
  }

  // ==================== EMOTIONAL TRANSITION SCREEN ====================
  if (showEmotionalTransition) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex flex-col items-center justify-center px-6 relative z-20 text-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-purple-500 rounded-full blur-[60px] opacity-20 animate-pulse"></div>
          <Sparkles className="w-16 h-16 text-[#D4AF37] mx-auto mb-6 relative z-10" />
        </motion.div>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl font-serif text-white leading-relaxed max-w-md italic"
        >
          "{emotionalTransitionText}"
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-[#D4AF37] rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
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
            {/* Show personalized badge if user has provided name and it's not the first question */}
            {userName && currentIndex > 0 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-2 bg-[#D4AF37]/10 backdrop-blur-md text-[#D4AF37] px-4 py-2 rounded-full text-xs font-bold border border-[#D4AF37]/20 shadow-lg mb-4"
              >
                <Sparkles className="w-3 h-3" />
                <span>Diagnóstico exclusivo para {userName.split(' ')[0]}</span>
              </motion.div>
            )}
            
            {/* Question text */}
            <h2 
              className="text-xl md:text-2xl font-serif font-bold text-white leading-snug drop-shadow-lg"
              dangerouslySetInnerHTML={{ __html: personalizeText(currentQuestion.text) }}
            />
          </div>

          {currentQuestion.type === 'input' ? (
            <form onSubmit={handleInputSubmit} className="space-y-4 mt-4 flex-1 flex flex-col">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  className="w-full bg-white/10 border border-white/20 rounded-xl p-5 text-lg placeholder-slate-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all text-center"
                  style={{ color: '#ffffff', caretColor: '#FFD700' }}
                  autoFocus
                />
                <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37] animate-pulse" />
              </div>
              
              {/* Spacer to push button to bottom on mobile */}
              <div className="flex-1 min-h-[20px]"></div>
              
              {/* Fixed bottom button area */}
              <div className="sticky bottom-4 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent pt-4 -mx-4 px-4">
                <button 
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-full bg-gradient-to-br from-[#D4AF37] via-[#FFD700] to-[#D4AF37] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#D4AF37]/30 hover:shadow-[#D4AF37]/50 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border-t border-white/20"
                >
                  CONECTAR COM MINHA FREQUÊNCIA
                  <ChevronRight className="w-5 h-5" />
                </button>
                <p className="text-xs text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
                  🔒 Seus dados são 100% confidenciais
                </p>
              </div>
            </form>
          ) : (
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
                    className={`w-full text-left p-4 md:p-5 rounded-2xl transition-all active:scale-[0.98] group relative overflow-hidden ${isNavigating ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'} ${
                      currentQuestion.singleButton 
                        ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:shadow-[0_0_40px_rgba(16,185,129,0.7)] hover:from-green-400 hover:to-emerald-400 border-t border-white/20' 
                        : 'bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                    }`}
                  >
                    <div className={`absolute inset-0 ${currentQuestion.singleButton ? 'bg-gradient-to-r from-emerald-500/0 via-white/10 to-emerald-500/0' : 'bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/5 to-[#D4AF37]/0'} opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full`}></div>
                    <div className="flex items-center gap-3 md:gap-4 relative z-10">
                      <span className="text-2xl md:text-3xl filter drop-shadow-md" aria-hidden="true">{option.icon}</span>
                      <div className="flex-1">
                        <span className={`font-medium transition-colors text-base md:text-lg block leading-tight ${currentQuestion.singleButton ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                          {option.label}
                        </span>
                        {option.sublabel && (
                          <span className={`text-xs md:text-sm mt-1 block transition-colors ${currentQuestion.singleButton ? 'text-white/90' : 'text-slate-400 group-hover:text-slate-300'}`}>
                            {option.sublabel}
                          </span>
                        )}
                      </div>
                      <ChevronRight className={`w-4 h-4 ml-auto shrink-0 ${currentQuestion.singleButton ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} aria-hidden="true" />
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Social proof on last question */}
              {currentQuestion.singleButton && (
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
                          "Achava que era papo furado. Fiz o protocolo na segunda. Na quarta, recebi um PIX de uma dívida que eu dava como perdida há 2 anos. Chega arrepiei."
                        </p>
                        <p className="text-[#D4AF37] text-xs mt-2 font-semibold">— Marcos V., 35 anos</p>
                      </div>
                    </div>
                  </div>

                  {/* Counter and authority */}
                  <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
                    <div className="flex items-center gap-1 text-emerald-400">
                      <Star className="w-3 h-3 fill-emerald-400" />
                      <span>🔓 87% relatam mudanças nos primeiros 7 dias</span>
                    </div>
                  </div>
                  <p className="text-slate-500 text-xs text-center mt-2">
                    Protocolo aplicado em 4.327 pessoas em 127 cidades brasileiras
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

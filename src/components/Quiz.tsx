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
      title: "👤 PERGUNTA 1 DE 6",
      text: "SEU NOME CARREGA A ENERGIA DA SUA LINHAGEM ANCESTRAL",
      type: "input",
      placeholder: "Ex: João",
      emotionalContext: "⚠️ Sério: Seu nome ativa a FREQUÊNCIA EXATA da sua linhagem ancestral.\n\nQuando você digita seu nome, o sistema cruza com 847 linhagens brasileiras já catalogadas.\n\nIsso muda TUDO no seu diagnóstico."
    }
  ];

  // Caminho FINANCEIRO - Nova estrutura de agitação de dor conforme briefing
  const financeQuestions: QuizQuestion[] = [
    {
      id: 1,
      title: "💥 PERGUNTA 2 DE 6",
      text: "O SISTEMA DETECTOU UM BLOQUEIO SEVERO NA SUA ENERGIA FINANCEIRA.",
      subtext: "Existe um Protocolo Xamânico de 7 dias que limpa esse bloqueio COMPLETAMENTE.",
      emotionalContext: "A pergunta é:\n\nVocê está disposto(a) a seguir o protocolo... mesmo que isso signifique ROMPER padrões que sua família carrega há gerações?",
      singleButton: true,
      validationText: "A maioria das pessoas passa a vida inteira checando o saldo bancário antes de comprar QUALQUER coisa, vivendo no aperto, pedindo emprestado… sem saber que um bloqueio ancestral está causando isso. Você não precisa ser uma delas.",
      options: [
        { label: "🔥 SIM, estou pronto(a) para destruir esse bloqueio →", value: "ready", icon: "" },
      ]
    },
    {
      id: 2,
      title: "💥 PERGUNTA 3 DE 6",
      text: "SE NADA MUDAR NOS PRÓXIMOS 6 MESES, QUAL É O SEU MAIOR MEDO?",
      emotionalContext: "→ Seja BRUTALMENTE honesto. Essa resposta define qual tipo de bloqueio ancestral o protocolo vai atacar primeiro.",
      warningText: "🚨 ATENÇÃO: Essa resposta é A MAIS IMPORTANTE do diagnóstico.\n\nO que você escolher aqui define:\n• Qual tipo de bloqueio ancestral será revelado\n• Qual protocolo de limpeza você vai receber\n• Quantos dias até começar a sentir o desbloqueio\n\nA maioria escolhe a opção 1 ou 3. Mas seja honesto com VOCÊ, não com o que \"deveria\" sentir.",
      options: [
        { 
          label: "Continuar dependendo dos outros ou contando moedas", 
          sublabel: "Olhar o preço de TUDO antes de pegar algo no mercado. Pedir dinheiro emprestado no fim do mês. Inventar desculpas pros amigos porque tá sem grana.", 
          value: "dependency", 
          icon: "😔" 
        },
        { 
          label: "Envelhecer sem construir patrimônio real", 
          sublabel: "Chegar aos 55 anos no mesmo apartamento ALUGADO. Ver seus filhos crescerem sem poder dar a educação que queria. Morrer sem deixar nada pra quem você ama.", 
          value: "aging", 
          icon: "🏠" 
        },
        { 
          label: "Ver minha família sofrer por causa da minha situação financeira", 
          sublabel: "Olhar nos olhos do seu filho e dizer 'a gente não tem dinheiro pra isso agora'. Ver seus pais precisando de remédio e você sem condições de ajudar. Sentir que FALHOU como provedor(a).", 
          value: "family", 
          icon: "💔" 
        },
      ]
    },
    {
      id: 3,
      title: "⚡ PERGUNTA 4 DE 6",
      text: "{NAME}, QUAL DESSAS VERDADES MAIS DÓI QUANDO VOCÊ PENSA NELA?",
      emotionalContext: "Qual desses cenários descreve SUA VIDA agora?",
      hasOtherOption: true,
      options: [
        { label: "O dinheiro entra, mas EVAPORA em imprevistos", sublabel: "Entrou R$2.000 na conta. No dia seguinte já foi: carro quebrou, conta atrasada, 'emergência' do nada. Parece que tem um ralo sugando tudo SEMPRE.", value: "leak", icon: "💸" },
        { label: "Trabalho 12 horas por dia, ganho pouco, acordo exausto", sublabel: "Você faz TUDO certo: trabalha duro, não gasta com besteira. Mas o salário NÃO sobe. Parece que tem um TETO invisível te impedindo de crescer.", value: "tired", icon: "😤" },
        { label: "Tenho PAVOR que falte dinheiro", sublabel: "Você checa o saldo bancário 3x por dia antes de gastar qualquer coisa. Vive fazendo conta mental, com medo de faltar pra conta, pras crianças, pra tudo.", value: "fear", icon: "😰" },
      ]
    },
    {
      id: 4,
      title: "🔮 PERGUNTA 5 DE 6",
      text: "O XAMANISMO FINANCEIRO DESCOBRIU QUE 87% DOS PADRÕES FINANCEIROS SE REPETEM POR 3 GERAÇÕES.",
      subtext: "Olhando para seus PAIS ou AVÓS, o que você vê?",
      emotionalContext: "→ Essa resposta revela a RAIZ do seu bloqueio ancestral.",
      validationText: "Isso não é culpa sua. É um padrão que sua família carrega há gerações. Você só recebeu. Agora pode ser quem rompe esse ciclo.",
      options: [
        { label: "Histórico de dívidas, falências ou lutas financeiras brutais.", sublabel: "👉 Seu avô passou aperto. Seu pai passou aperto. Agora VOCÊ passa aperto. O mesmo ciclo há 3 gerações. Dívida, conta atrasada, falta de dinheiro... sempre.", value: "heavy", icon: "💔" },
        { label: "Pessoas honestas, trabalhadoras... mas que NUNCA enriqueceram.", sublabel: "👉 Trabalharam 40 anos em empresa, se aposentaram com 1 salário mínimo. Viveram apertando a vida inteira. Morreram sem ter casa própria. Honestidade não trouxe abundância.", value: "honest", icon: "🙏" },
        { label: "Tinha dinheiro, mas MUITA briga, traição e desarmonia familiar.", sublabel: "👉 A casa tinha grana, mas era um campo de guerra. Gritos, traições, brigas por dinheiro. Você cresceu associando \"ter dinheiro\" = \"sofrer emocionalmente\". Riqueza com conflito.", value: "conflict", icon: "⚡" },
      ]
    },
    {
      id: 5,
      title: "🔥 PERGUNTA 6 DE 6",
      text: "O sistema identificou um bloqueio severo na sua frequência. Se existir um Protocolo de 7 dias para limpar isso COMPLETAMENTE, você está disposto(a) a seguir?",
      singleButton: true,
      bridgeText: "Se você disser SIM aqui, o sistema gera seu mapa e libera o protocolo completo de 7 dias.",
      validationText: "A maioria das pessoas vive a vida inteira com esse bloqueio sem saber. Você não precisa ser uma delas.",
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
    "Cruzando seu nome com 847 linhagens brasileiras catalogadas...",
    "Calculando tipo de bloqueio ancestral...",
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
        // Track quiz completion with enhanced tracking
        tracking.quiz.complete(QUIZ_PATH, userName, activeQuestions.length);
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
    <div className="min-h-screen min-h-[100dvh] flex flex-col max-w-lg mx-auto px-4 sm:px-5 py-4 sm:py-6 relative z-10">
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
          <div className="mb-6 sm:mb-8 space-y-4">
            {/* TAG PEQUENA */}
            {userName && currentIndex > 0 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-2 bg-[#D4AF37]/30 backdrop-blur-md text-[#FFD700] px-4 py-2 rounded-full text-xs sm:text-sm font-bold border border-[#D4AF37]/40"
              >
                <Sparkles className="w-3 h-3 flex-shrink-0" />
                <span className="whitespace-nowrap">💥 Pergunta exclusiva para {userName.split(' ')[0]}</span>
              </motion.div>
            )}
            
            {/* Título da pergunta (TAG) */}
            {currentQuestion.title && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-4"
              >
                <p className="text-[#FFD700] text-xs sm:text-sm font-bold uppercase tracking-wider text-center">
                  {currentQuestion.title}
                </p>
              </motion.div>
            )}

            {/* ESPAÇAMENTO: 32px */}
            <div className="h-8"></div>

            {/* HEADLINE DA PERGUNTA */}
            <h2 className="text-[22px] sm:text-[28px] md:text-[36px] font-bold text-white leading-tight text-center px-2">
              <span dangerouslySetInnerHTML={{ __html: personalizeText(currentQuestion.text).replace('BLOQUEIO SEVERO', '<span class="text-[#FF4500]">BLOQUEIO SEVERO</span>').replace('6 MESES', '<span class="text-[#FF4500]">6 MESES</span>').replace('MAIOR MEDO', '<span class="text-[#FF4500]">MAIOR MEDO</span>').replace('ENERGIA', '<span class="text-[#FFD700]">ENERGIA</span>') }}></span>
            </h2>

            {/* Subtexto (para pergunta 2) */}
            {currentQuestion.subtext && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-base sm:text-lg text-white/90 text-center mt-4 px-2"
              >
                {currentQuestion.subtext}
              </motion.p>
            )}
          </div>

          {/* ESPAÇAMENTO: 20-24px */}
          <div className="h-6"></div>

          {currentQuestion.type === 'input' ? (
            // TELA 4: PERGUNTA 1 (NOME)
            <form onSubmit={handleInputSubmit} className="space-y-6">
              {/* LABEL DO INPUT */}
              <div className="text-left">
                <label className="text-sm sm:text-base text-white/80 block mb-3">
                  Digite seu primeiro nome:
                </label>
                
                {/* INPUT FIELD */}
                <div className="relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={currentQuestion.placeholder}
                    className="w-full bg-[#1a0d2e]/60 backdrop-blur-sm border-2 border-[#3d2a5f] rounded-xl p-4 pr-12 text-lg text-white placeholder-white/50 focus:outline-none focus:border-[#FFD700] transition-all"
                    autoFocus
                    autoComplete="name"
                    inputMode="text"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl pointer-events-none">
                    🔮
                  </span>
                </div>
              </div>

              {/* ESPAÇAMENTO: 24px */}
              <div className="h-6"></div>

              {/* CARD DE EXPLICAÇÃO - Background roxo escuro */}
              {currentQuestion.emotionalContext && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-[#1a0d2e] border border-[#FFD700]/30 rounded-lg p-4 space-y-3"
                >
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed whitespace-pre-line">
                    {currentQuestion.emotionalContext.split('\n\n').map((paragraph, i) => (
                      <span key={i}>
                        {paragraph.replace('847 linhagens', '').includes('847') ? (
                          <>
                            {paragraph.split('847')[0]}
                            <strong className="text-[#FFD700]">847</strong>
                            {paragraph.split('847')[1]}
                          </>
                        ) : (
                          paragraph
                        )}
                        {i < currentQuestion.emotionalContext!.split('\n\n').length - 1 && <><br/><br/></>}
                      </span>
                    ))}
                  </p>
                </motion.div>
              )}

              {/* ESPAÇAMENTO: 24px */}
              <div className="h-6"></div>

              {/* TEXTO REASSURANCE */}
              <p className="text-xs sm:text-sm text-[#4ade80] text-center leading-relaxed">
                📱 Você vai receber seu diagnóstico gratuito na próxima tela. Sem compromisso. Sem pegar email.
              </p>

              {/* ESPAÇAMENTO: 32px */}
              <div className="h-8"></div>

              {/* CTA BOTÃO */}
              <button 
                type="submit"
                disabled={!inputValue.trim() || inputValue.trim().length < 2}
                className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-black py-5 px-8 rounded-full text-base sm:text-lg shadow-[0_8px_24px_rgba(255,215,0,0.3)] hover:scale-105 hover:shadow-[0_12px_32px_rgba(255,215,0,0.4)] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                🔥 CONECTAR E INICIAR ANÁLISE →
              </button>

              {/* ESPAÇAMENTO: 24px */}
              <div className="h-6"></div>

              {/* RODAPÉ */}
              <p className="text-xs text-white/60 text-center flex items-center justify-center gap-2">
                🔒 100% Confidencial - Ninguém vai ver seu resultado
              </p>
            </form>
          ) : (
            // TELA 5: PERGUNTAS COM OPÇÕES
            <div className="space-y-6">
              {/* INSTRUÇÃO / Emotional Context */}
              {currentQuestion.emotionalContext && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm sm:text-base text-[#FFD700] font-medium border-l-4 border-[#FFD700] pl-3 py-2 leading-relaxed whitespace-pre-line"
                >
                  {currentQuestion.emotionalContext.split('BRUTALMENTE').map((part, i) => (
                    <span key={i}>
                      {i > 0 && <strong className="text-[#FFD700] font-bold">BRUTALMENTE</strong>}
                      {part}
                    </span>
                  ))}
                </motion.div>
              )}

              {/* ESPAÇAMENTO: 40px */}
              <div className="h-10"></div>

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

              {/* OPÇÕES - Cards clicáveis */}
              <div className="space-y-5">
                {currentQuestion.options?.map((option, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 + 0.3 }}
                    onClick={() => handleOptionClick(option)}
                    disabled={isNavigating}
                    className={`w-full text-left rounded-2xl transition-all duration-200 group relative overflow-hidden ${
                      isNavigating ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]'
                    } ${
                      currentQuestion.singleButton 
                        ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold p-5 shadow-lg hover:shadow-xl'
                        : 'bg-[#1a0d2e] border-2 border-[#3d2a5f] hover:border-[#FFD700] p-6'
                    }`}
                  >
                    {/* Estrutura interna do card */}
                    <div className="relative z-10 space-y-3">
                      {/* Emoji + Headline */}
                      <div className="flex items-start gap-3">
                        {option.icon && (
                          <span className="text-3xl sm:text-4xl flex-shrink-0">{option.icon}</span>
                        )}
                        <div className="flex-1 space-y-2">
                          <p className={`text-base sm:text-lg font-bold leading-snug ${currentQuestion.singleButton ? 'text-black' : 'text-white'}`}>
                            {option.label}
                          </p>
                          
                          {/* Descrição expandida (sublabel) */}
                          {option.sublabel && (
                            <p className={`text-sm sm:text-base leading-relaxed ${currentQuestion.singleButton ? 'text-black/80' : 'text-white/85'}`}>
                              {option.sublabel.split('FALHOU').map((part, i) => (
                                <span key={i}>
                                  {i > 0 && <strong className={currentQuestion.singleButton ? 'text-black' : 'text-white'}>FALHOU</strong>}
                                  {part}
                                </span>
                              ))}
                            </p>
                          )}
                        </div>
                        
                        {/* Seta no canto */}
                        {!currentQuestion.singleButton && (
                          <ChevronRight className="w-5 h-5 text-[#FFD700] flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* "Nenhum desses" link for question 4 */}
              {currentQuestion.hasOtherOption && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center pt-2"
                >
                  <button
                    onClick={() => handleOptionClick({ label: "Nenhum desses, meu problema é outro", value: "other", icon: "" })}
                    disabled={isNavigating}
                    className="text-sm text-white/60 hover:text-[#FFD700] underline transition-colors"
                  >
                    Nenhum desses? Meu problema é outro.
                  </button>
                </motion.div>
              )}

              {/* ESPAÇAMENTO: 32px */}
              <div className="h-8"></div>

              {/* CARD DE ATENÇÃO ou TEXTO MOTIVACIONAL - Condicional */}
              {currentQuestion.warningText && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-[#1a0606] border-2 border-[#FF0000] rounded-xl p-5 space-y-3"
                >
                  <p className="text-base sm:text-lg font-bold text-white leading-relaxed whitespace-pre-line">
                    {currentQuestion.warningText}
                  </p>
                </motion.div>
              )}

              {currentQuestion.validationText && !currentQuestion.warningText && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-[#0a0520] border-l-4 border-[#FFD700] rounded-lg p-5"
                >
                  <p className="text-sm sm:text-base text-white/80 italic leading-relaxed">
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
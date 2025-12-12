import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizQuestion, QuizPath } from '../types';
import { ChevronRight, Sparkles, Fingerprint } from 'lucide-react';

interface QuizProps {
  onComplete: (path: QuizPath, userName: string) => void;
}

export const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userName, setUserName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);
  const [showTuningScreen, setShowTuningScreen] = useState(false);
  const [selectedPath, setSelectedPath] = useState<QuizPath>('finance');
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);

  // Perguntas Iniciais (Comuns)
  const initialQuestions: QuizQuestion[] = [
    {
      id: 0,
      title: "IDENTIFICAÇÃO",
      text: "Antes de iniciarmos a leitura do seu campo energético, como você gostaria de ser chamado(a)?",
      type: "input",
      placeholder: "Digite seu primeiro nome..."
    },
    {
      id: 1,
      title: "O FOCO",
      text: "{NAME}, para calibrar a energia do seu mapa, qual área você quer entender profundamente hoje?",
      options: [
        { label: "Vida Financeira e Prosperidade", value: "finance", icon: "💰", path: 'finance' },
        { label: "Relacionamentos e Amor", value: "relationship", icon: "❤️", path: 'relationship' },
      ]
    }
  ];

  // Caminho FINANCEIRO (Texto atualizado conforme briefing)
  const financeQuestions: QuizQuestion[] = [
    {
      id: 2,
      title: "P2 — O Sintoma Financeiro Profundo",
      text: "{NAME}, quando você pensa na sua vida financeira, o que descreve melhor seu momento atual?",
      options: [
        { label: "O dinheiro entra… mas desaparece.", value: "disappears", icon: "💸" },
        { label: "Eu trabalho muito e recebo pouco em troca.", value: "work_hard", icon: "😓" },
        { label: "Sei que poderia estar melhor, mas algo me trava.", value: "stuck", icon: "🚧" },
        { label: "Sinto vergonha da minha situação financeira.", value: "shame", icon: "🫣" },
      ]
    },
    {
      id: 3,
      title: "P3 — O Peso Invisível do Dinheiro",
      text: "Você sente que vive com uma pressão financeira que só você entende?",
      options: [
        { label: "Sim, é um peso que me acompanha todos os dias.", value: "daily", icon: "🎒" },
        { label: "Às vezes, especialmente quando surgem imprevistos.", value: "sometimes", icon: "📉" },
        { label: "Sinto que carrego responsabilidades demais sozinho(a).", value: "alone", icon: "🏋️" },
        { label: "Não, mas meu dinheiro nunca flui como deveria.", value: "stagnant", icon: "🛑" },
      ]
    },
    {
      id: 4,
      title: "P4 — O Padrão Financeiro que se Repete",
      text: "Olhe para a sua história: você percebe padrões financeiros que se repetem?",
      options: [
        { label: "Sim, parece que repito a vida dos meus pais.", value: "parents", icon: "🔄" },
        { label: "Vivo ciclos de ‘avanço e queda’.", value: "cycles", icon: "🎢" },
        { label: "Nunca me senti no controle do meu dinheiro.", value: "control", icon: "🎮" },
        { label: "Não tinha pensado nisso, mas faz sentido.", value: "insight", icon: "💡" },
      ]
    },
    {
      id: 5,
      title: "P5 — A Frustração do Esforço",
      text: "{NAME}, você sente que seu esforço nunca reflete no seu bolso?",
      options: [
        { label: "Sim, é desesperador.", value: "desperate", icon: "😫" },
        { label: "Parece que sempre que tento crescer, algo me puxa para trás.", value: "pull_back", icon: "⚓" },
        { label: "Consigo avançar um pouco… depois tudo trava.", value: "stuck_again", icon: "🧱" },
        { label: "Eu até recebo pelo que faço, mas queria mais.", value: "want_more", icon: "📈" },
      ]
    },
    {
      id: 6,
      title: "P6 — O Desejo Financeiro Real",
      text: "Se você pudesse destravar UMA coisa hoje para mudar sua vida financeira, qual seria?",
      options: [
        { label: "Ver dinheiro sobrando todo mês.", value: "surplus", icon: "💵" },
        { label: "Parar de viver no modo sobrevivência.", value: "survival", icon: "🛡️" },
        { label: "Ter liberdade para escolhas sem medo.", value: "freedom", icon: "🕊️" },
        { label: "Construir algo meu, que realmente funcione.", value: "build", icon: "🏗️" },
      ]
    },
    {
      id: 7,
      title: "P7 — A Permissão para Mudar",
      text: "Se eu te mostrasse o que realmente está travando sua vida financeira… você estaria pronto(a) para essa verdade?",
      options: [
        { label: "Sim! Chega, eu quero virar essa página.", value: "ready", icon: "🔥" },
        { label: "Acho que é o meu momento.", value: "time", icon: "✨" },
        { label: "Tenho receio, mas preciso mudar.", value: "scared", icon: "🤜" },
      ]
    }
  ];

  // Caminho RELACIONAMENTO (Texto atualizado conforme briefing)
  const relationshipQuestions: QuizQuestion[] = [
    {
      id: 2,
      title: "P2 — O Sintoma do Coração",
      text: "{NAME}, ao pensar na sua vida amorosa, o que mais dói hoje?",
      options: [
        { label: "Sempre escolho errado.", value: "wrong", icon: "💔" },
        { label: "Dou demais e recebo pouco.", value: "give", icon: "🤲" },
        { label: "Tenho medo de me entregar e me machucar.", value: "fear", icon: "🛡️" },
        { label: "Me sinto sozinho(a) mesmo estando com alguém.", value: "lonely", icon: "😔" },
      ]
    },
    {
      id: 3,
      title: "P3 — O Ciclo Emocional",
      text: "Você sente que vive padrões de relacionamento que se repetem?",
      options: [
        { label: "Sim, parece que sempre encontro a mesma dor.", value: "pattern", icon: "🔄" },
        { label: "Escolho pessoas que não me escolhem.", value: "rejection", icon: "🚫" },
        { label: "Carrego traumas que estragam minhas relações.", value: "trauma", icon: "🎒" },
        { label: "Às vezes, flui… mas logo desmorona.", value: "collapse", icon: "🏚️" },
      ]
    },
    {
      id: 4,
      title: "P4 — A Herança Emocional Familiar",
      text: "Na sua família, você observou padrões parecidos no amor?",
      options: [
        { label: "Sim, relacionamentos complicados ou instáveis.", value: "complicated", icon: "⚡" },
        { label: "Muita cobrança, brigas ou falta de afeto.", value: "cold", icon: "❄️" },
        { label: "Histórias de abandono ou traição.", value: "betrayal", icon: "🥀" },
        { label: "Nunca pensei nisso, mas faz sentido.", value: "insight", icon: "💡" },
      ]
    },
    {
      id: 5,
      title: "P5 — O Medo Silencioso",
      text: "O que mais te assusta nos relacionamentos?",
      options: [
        { label: "Ser rejeitado(a) novamente.", value: "rejected", icon: "🙅" },
        { label: "Amar alguém que não me valoriza.", value: "unvalued", icon: "💎" },
        { label: "Não conseguir construir algo sólido.", value: "solid", icon: "🧱" },
        { label: "Repetir o passado e nunca viver algo leve.", value: "heavy", icon: "☁️" },
      ]
    },
    {
      id: 6,
      title: "P6 — O Desejo Amoroso Real",
      text: "Se você pudesse destravar UMA coisa no amor hoje, o que seria?",
      options: [
        { label: "Atrair alguém que realmente me escolha.", value: "chosen", icon: "👩‍❤️‍👨" },
        { label: "Curar minhas feridas e parar de sofrer.", value: "heal", icon: "🩹" },
        { label: "Sentir segurança emocional.", value: "safety", icon: "🛡️" },
        { label: "Construir um relacionamento leve e recíproco.", value: "lightness", icon: "✨" },
      ]
    },
    {
      id: 7,
      title: "P7 — A Permissão para o Amor",
      text: "Se eu te mostrasse o que está bloqueando seus relacionamentos… você estaria pronto(a) para essa verdade?",
      options: [
        { label: "Sim! Estou cansado(a) de sofrer.", value: "ready", icon: "🔥" },
        { label: "Acho que esse é o meu momento.", value: "time", icon: "✨" },
        { label: "Tenho medo, mas quero mudar.", value: "scared", icon: "🦋" },
      ]
    }
  ];

  useEffect(() => {
    setActiveQuestions(initialQuestions);
  }, []);

  const personalizeText = (text: string) => {
    return text.replace("{NAME}", userName ? userName.split(' ')[0] : "você");
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    setUserName(inputValue.trim());
    setShowTuningScreen(true);
    
    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', 'QuizStarted', { name_provided: true });
    }

    setTimeout(() => {
        setShowTuningScreen(false);
        setCurrentIndex(prev => prev + 1);
    }, 3500);
  };

  const handleOptionClick = (option: any) => {
    if (isNavigating) return;
    setIsNavigating(true);

    // LÓGICA DE RAMIFICAÇÃO (Pergunta 1)
    // Criamos uma cópia mesclada de perguntas (`mergedQuestions`) e usamos ela
    // para decidir se devemos avançar ou finalizar — evitando dependência
    // do estado assíncrono `activeQuestions` dentro do closure.
    let mergedQuestions = activeQuestions;
    if (currentIndex === 1 && option.path) {
      const newPath = option.path as QuizPath;
      setSelectedPath(newPath);
      const nextQuestions = newPath === 'finance' ? financeQuestions : relationshipQuestions;
      mergedQuestions = [...activeQuestions, ...nextQuestions];
      setActiveQuestions(mergedQuestions);
    }

    // Pixel
    if (typeof window.fbq === 'function') {
      if (currentIndex === 4) window.fbq('trackCustom', 'QuizHalfway');
    }

    setTimeout(() => {
      const length = mergedQuestions.length;
      if (currentIndex < length - 1) {
        setCurrentIndex(prev => prev + 1);
        setIsNavigating(false);
      } else {
        if (typeof window.fbq === 'function') {
          window.fbq('track', 'CompleteRegistration', { content_name: 'Quiz Completo', path: selectedPath });
        }
        onComplete(selectedPath, userName);
      }
    }, 250);
  };

  if (showTuningScreen) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 relative z-20 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
            <div className="absolute inset-0 bg-orange-500 rounded-full blur-[80px] opacity-40 animate-pulse"></div>
            <Fingerprint className="w-24 h-24 text-[#FF9500] mx-auto mb-6 relative z-10 animate-pulse" />
        </motion.div>
        
        <h2 className="text-2xl font-serif text-white mb-2">Sintonizando Frequência...</h2>
        <p className="text-slate-300 text-lg">Conectando à energia de <strong className="text-[#FF9500]">{userName}</strong></p>
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
                <span>Pergunta exclusiva para {userName.split(' ')[0]}</span>
              </motion.div>
            )}
            <h2 className="text-xl md:text-2xl font-serif font-bold text-white leading-snug drop-shadow-lg">
              {personalizeText(currentQuestion.text)}
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
                className="w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                CONTINUAR
              </button>
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
                  className={`w-full text-left p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#FF9500]/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,149,0,0.15)] transition-all active:scale-[0.98] group relative overflow-hidden ${isNavigating ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full"></div>
                  <div className="flex items-center gap-4 relative z-10">
                    <span className="text-3xl filter drop-shadow-md">{option.icon}</span>
                    <div className="flex-1">
                      <span className="text-slate-200 font-medium group-hover:text-white transition-colors text-lg">
                        {option.label}
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#FF9500] group-hover:text-white transition-colors">
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
                    </div>
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
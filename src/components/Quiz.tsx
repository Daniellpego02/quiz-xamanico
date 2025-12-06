import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizQuestion } from '../types';
import { ChevronRight, Sparkles, Fingerprint } from 'lucide-react';

interface QuizProps {
  onComplete: () => void;
}

export const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userName, setUserName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);
  const [showTuningScreen, setShowTuningScreen] = useState(false);

  const personalizeText = (text: string) => {
    // Substitui {NAME} pelo nome da pessoa ou "você"
    return text.replace("{NAME}", userName ? userName.split(' ')[0] : "você");
  };

  const questions: QuizQuestion[] = [
    {
      id: 0,
      title: "IDENTIFICAÇÃO",
      text: "Antes de iniciarmos a leitura do seu campo energético, como você gostaria de ser chamado(a)?",
      type: "input",
      placeholder: "Digite seu primeiro nome..."
    },
    {
      id: 1,
      title: "SINTONIA",
      text: "{NAME}, para calibrar a energia do seu mapa, selecione seu gênero:",
      options: [
        { label: "Mulher", value: "female", icon: "👩" },
        { label: "Homem", value: "male", icon: "👨" },
        { label: "Prefiro não dizer", value: "other", icon: "👤" },
      ]
    },
    {
      id: 2,
      title: "O SINTOMA",
      text: "{NAME}, em qual área da sua vida você sente que existe um 'muro invisível' te impedindo de avançar?",
      options: [
        { label: "Financeiro (Dinheiro entra e some)", value: "finance", icon: "💸" },
        { label: "Relacionamentos (Padrões repetitivos)", value: "relationships", icon: "💔" },
        { label: "Saúde e Energia (Cansaço sem fim)", value: "health", icon: "😓" },
        { label: "Propósito (Sinto-me perdido)", value: "purpose", icon: "🎯" },
        { label: "Todas as áreas parecem travadas", value: "all", icon: "🌪️" },
      ]
    },
    {
      id: 3,
      title: "O PADRÃO OCULTO",
      text: "Você costuma sentir que carrega um peso nas costas que não parece ser seu, {NAME}?",
      options: [
        { label: "Sim! Sinto um peso constante", value: "heavy", icon: "🎒" },
        { label: "Às vezes, principalmente com a família", value: "family", icon: "👨‍👩‍👧" },
        { label: "Sinto que vivo pelos outros", value: "others", icon: "🎭" },
        { label: "Não, me sinto leve", value: "no", icon: "🍃" },
      ]
    },
    {
      id: 4,
      title: "HERANÇA INVISÍVEL",
      text: "Olhando para sua história familiar, você percebe que está repetindo as mesmas dificuldades dos seus pais?",
      options: [
        { label: "Sim, parece uma maldição que se repete", value: "curse", icon: "🔄" },
        { label: "Sim, principalmente no financeiro", value: "money_pattern", icon: "📉" },
        { label: "Sim, tenho 'dedo podre' igual a eles", value: "love_pattern", icon: "💔" },
        { label: "Nunca parei para pensar nisso", value: "unknown", icon: "🤔" },
      ]
    },
    {
      id: 5,
      title: "A FRUSTRAÇÃO",
      text: "{NAME}, seja sincero(a): você sente que seu esforço nunca gera o resultado que você merece?",
      options: [
        { label: "Exatamente! Corro e não saio do lugar", value: "stuck", icon: "🏃" },
        { label: "Sinto que algo me puxa pra trás", value: "pull_back", icon: "⚓" },
        { label: "Às vezes flui, mas logo trava", value: "flow_stop", icon: "🚧" },
        { label: "Não, recebo o justo", value: "fair", icon: "⚖️" },
      ]
    },
    {
      id: 6,
      title: "O SONHO",
      text: "Se pudéssemos destravar UMA coisa hoje para mudar sua vida em 7 dias, o que seria?",
      options: [
        { label: "Ver dinheiro sobrando na conta", value: "money", icon: "💰" },
        { label: "Atrair um amor leve e verdadeiro", value: "love", icon: "❤️" },
        { label: "Ter clareza da minha missão", value: "mission", icon: "🌟" },
        { label: "Paz de espírito absoluta", value: "peace", icon: "✨" },
      ]
    },
    {
      id: 7,
      title: "A DECISÃO",
      text: "Se eu te entregasse um Mapa revelando a origem desses bloqueios... Você estaria pronto(a) para essa verdade, {NAME}?",
      options: [
        { label: "SIM! Eu preciso dessa resposta AGORA", value: "ready_now", icon: "🔥" },
        { label: "Sinto que é o meu momento", value: "my_time", icon: "✨" },
        { label: "Tenho medo, mas quero mudar", value: "scared_but_ready", icon: "🫣" },
      ]
    }
  ];

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsNavigating(false);
    } else {
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'CompleteRegistration', { content_name: 'Quiz Completo' });
      }
      onComplete();
    }
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
        handleNext();
    }, 3500);
  };

  const handleOptionClick = () => {
    if (isNavigating) return;
    setIsNavigating(true);

    if (typeof window.fbq === 'function') {
      if (currentIndex === 3) window.fbq('trackCustom', 'QuizHalfway');
    }

    setTimeout(() => {
      handleNext();
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
        
        <h2 className="text-2xl font-serif text-white mb-2">
            Sintonizando Frequência...
        </h2>
        <p className="text-slate-300 text-lg">
            Conectando à energia de <strong className="text-[#FF9500]">{userName}</strong>
        </p>
        
        <div className="w-64 h-1 bg-white/10 rounded-full mt-8 overflow-hidden mx-auto">
            <motion.div 
                className="h-full bg-[#FF9500]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "easeInOut" }}
            />
        </div>
      </div>
    );
  }

  const progress = ((currentIndex + 1) / questions.length) * 100;
  const currentQuestion = questions[currentIndex];

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
            <h3 className="text-orange-400 font-bold text-xs tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
              <span className="bg-orange-500/10 w-6 h-6 rounded-full flex items-center justify-center text-[10px] border border-orange-500/30 text-orange-400">
                {currentIndex + 1}
              </span>
              {currentQuestion.title}
            </h3>
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
                  onClick={handleOptionClick}
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
                      {option.isNew && (
                        <span className="ml-2 inline-block bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                          NOVO
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
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
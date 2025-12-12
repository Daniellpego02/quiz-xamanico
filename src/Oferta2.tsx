import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, X, Check, Shield, Star, AlertTriangle } from 'lucide-react';

interface Oferta2Props {
  userName?: string;
}

export default function Oferta2({ userName = 'você' }: Oferta2Props) {
  const [showPulse, setShowPulse] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutos

  const firstName = userName ? userName.split(' ')[0] : 'você';
  const firstNameUpper = firstName.toUpperCase();

  // Track user activity
  useEffect(() => {
    const handleActivity = () => {
      setLastActivity(Date.now());
      setShowPulse(false);
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('keypress', handleActivity);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keypress', handleActivity);
    };
  }, []);

  // Check for inactivity
  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastActivity > 30000) {
        setShowPulse(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastActivity]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Exit intent popup
  useEffect(() => {
    let exitTimeout: ReturnType<typeof setTimeout>;
    
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !showExitPopup) {
        exitTimeout = setTimeout(() => {
          setShowExitPopup(true);
        }, 100);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (exitTimeout) clearTimeout(exitTimeout);
    };
  }, [showExitPopup]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAccept = () => {
    window.location.href = 'https://checkout.mapaxamanicooficial.online/oferta-quatro';
  };

  const handleDecline = () => {
    window.location.href = 'https://mapaxamanicooficial.online/obrigado';
  };

  const handleExitAccept = () => {
    window.location.href = 'https://checkout.mapaxamanicooficial.online/se-ssenta';
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505] text-white relative overflow-hidden">
        
        {/* Urgency Bar */}
        <motion.div 
          initial={{ y: -50 }} 
          animate={{ y: 0 }}
          className="bg-gradient-to-r from-purple-700 via-pink-600 to-purple-700 text-white text-xs md:text-sm font-bold text-center py-3 px-4 sticky top-0 z-50 shadow-2xl"
        >
          <div className="flex items-center justify-center gap-2 uppercase tracking-wider">
            <Clock className="w-4 h-4 animate-pulse" />
            <span className="hidden md:inline">🛡️ ÚLTIMA PROTEÇÃO DISPONÍVEL:</span>
            <span className="md:hidden">🛡️ PROTEÇÃO:</span>
            <span className="font-mono text-base md:text-lg text-pink-300 animate-pulse">{formatTime(timeLeft)}</span>
          </div>
        </motion.div>

        <div className="max-w-3xl mx-auto px-4 py-8 pb-32 relative z-10">
          
          {/* Badge de Confirmação */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="flex items-center justify-center gap-3 mb-6 bg-emerald-950/40 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-4 shadow-lg shadow-emerald-500/10"
          >
            <div className="bg-emerald-500 rounded-full p-2">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-emerald-400 font-bold text-sm uppercase tracking-wide">✅ Seu desbloqueio está ativo!</p>
              <p className="text-emerald-300/80 text-xs">Falta apenas BLINDAR para nunca mais perder...</p>
            </div>
          </motion.div>

          {/* RESULTADO - Primeira parte do RBMC */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center space-y-4 mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-serif font-black text-white leading-tight drop-shadow-2xl">
              <span className="text-purple-400">{firstNameUpper}</span>, ANTES DE IR...
            </h1>
            <p className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400">
              Você precisa saber sobre o RISCO REAL de perder tudo o que conquistou...
            </p>
          </motion.div>

          {/* BLOQUEIO - Segunda parte do RBMC */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-purple-950/40 to-pink-950/40 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-6 md:p-8 mb-8 shadow-2xl"
          >
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-red-400 mb-2">⚠️ O QUE 91% DAS PESSOAS NÃO SABEM</h3>
                <p className="text-slate-200 text-sm md:text-base leading-relaxed">
                  Você já deu o primeiro passo. Mas <strong className="text-red-300">SEM BLINDAGEM ENERGÉTICA, você vai voltar ao ponto zero</strong> em questão de semanas.
                </p>
              </div>
            </div>
            
            <div className="space-y-3 mt-6">
              <div className="flex items-start gap-3 bg-black/30 p-3 rounded-lg border-l-4 border-red-500">
                <span className="text-red-400 text-xl">❌</span>
                <p className="text-slate-300 text-sm"><strong>Sem blindagem:</strong> Energias externas vão ANULAR seu progresso (família, trabalho, relações tóxicas).</p>
              </div>
              <div className="flex items-start gap-3 bg-black/30 p-3 rounded-lg border-l-4 border-red-500">
                <span className="text-red-400 text-xl">❌</span>
                <p className="text-slate-300 text-sm"><strong>Sem proteção:</strong> Você vai ABSORVER bloqueios dos outros como se fossem seus.</p>
              </div>
              <div className="flex items-start gap-3 bg-black/30 p-3 rounded-lg border-l-4 border-red-500">
                <span className="text-red-400 text-xl">❌</span>
                <p className="text-slate-300 text-sm"><strong>Sem esse módulo:</strong> Em 30 dias, 78% das pessoas voltam ao estado anterior (ou pior).</p>
              </div>
            </div>

            <div className="mt-6 bg-red-950/50 border-2 border-red-500 rounded-xl p-4">
              <p className="text-center text-red-300 font-bold text-sm">
                💔 DADO REAL: 78% das pessoas que desbloqueiam sem blindagem perdem tudo em menos de 60 dias.
              </p>
            </div>
          </motion.div>

          {/* MECANISMO - Terceira parte do RBMC */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="bg-gradient-to-br from-[#1a0b2e] to-[#2d1b4e] rounded-3xl p-6 md:p-8 mb-8 border border-purple-500/30 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Shield className="w-8 h-8 text-purple-400" />
                <h2 className="text-2xl md:text-3xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  Blindagem Energética Permanente
                </h2>
              </div>

              <p className="text-center text-slate-200 text-base md:text-lg mb-6 leading-relaxed">
                O sistema DEFINITIVO para <strong className="text-purple-400">BLINDAR sua energia</strong> e manter seus resultados para sempre — sem recaídas, sem perdas.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg p-2 flex-shrink-0">
                    <Check className="w-5 h-5 text-white font-bold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">🛡️ Escudo de Proteção Diário</h4>
                    <p className="text-slate-300 text-sm">Ritual de 3 minutos que bloqueia 100% das energias negativas externas</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg p-2 flex-shrink-0">
                    <Check className="w-5 h-5 text-white font-bold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">🔒 Protocolo Anti-Sabotagem</h4>
                    <p className="text-slate-300 text-sm">Técnica para NEUTRALIZAR pessoas que drenam sua energia (família, colegas, ex)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg p-2 flex-shrink-0">
                    <Check className="w-5 h-5 text-white font-bold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">⚡ Limpeza Energética Profunda</h4>
                    <p className="text-slate-300 text-sm">Áudios guiados para eliminar cargas energéticas absorvidas (valor: R$197)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg p-2 flex-shrink-0">
                    <Check className="w-5 h-5 text-white font-bold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">🧘 Meditação de Ancoragem</h4>
                    <p className="text-slate-300 text-sm">Mantenha seu campo vibracional ALTO, mesmo em ambientes pesados</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg p-2 flex-shrink-0">
                    <Check className="w-5 h-5 text-white font-bold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">🌟 Selos de Proteção Permanente</h4>
                    <p className="text-slate-300 text-sm">Ativações que te protegem 24h por dia, 7 dias por semana — automático</p>
                  </div>
                </div>
              </div>

              {/* Preço e Oferta */}
              <div className="bg-black/40 rounded-2xl p-6 border-2 border-purple-500/50 shadow-xl">
                <div className="text-center mb-4">
                  <p className="text-slate-400 text-sm mb-2">VALOR NORMAL:</p>
                  <p className="text-slate-500 text-2xl line-through mb-1">R$ 247,00</p>
                  <p className="text-purple-400 font-bold text-sm uppercase tracking-wider mb-3">🛡️ PROTEÇÃO EXCLUSIVA AGORA:</p>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-slate-300 text-xl">apenas</span>
                    <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">R$67</span>
                  </div>
                  <p className="text-emerald-400 text-sm font-bold">💎 Proteção vitalícia + Atualizações gratuitas</p>
                </div>

                <button
                  onClick={handleAccept}
                  className={`w-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-500 hover:via-pink-500 hover:to-purple-500 text-white font-black text-lg md:text-xl py-5 px-8 rounded-2xl shadow-2xl shadow-purple-500/50 transition-all transform hover:scale-105 active:scale-95 border-2 border-purple-300 uppercase tracking-wide ${showPulse ? 'animate-pulse' : ''}`}
                >
                  <span className="drop-shadow-lg">🛡️ SIM! QUERO BLINDAGEM PERMANENTE</span>
                </button>

                <div className="flex items-center justify-center gap-2 mt-4 text-emerald-400 text-xs">
                  <Shield className="w-4 h-4" />
                  <span>Pagamento 100% seguro • Garantia de 7 dias</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Prova Social Rápida */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="bg-gradient-to-br from-emerald-950/30 to-teal-950/30 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6 mb-8"
          >
            <h3 className="text-center font-bold text-white text-lg mb-4 flex items-center justify-center gap-2">
              <Star className="w-5 h-5 text-emerald-400" />
              O Que Dizem Quem Se Blindou
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="bg-black/30 rounded-xl p-4">
                <p className="text-3xl font-black text-emerald-400">94%</p>
                <p className="text-slate-300 text-xs">Mantiveram os resultados após 1 ano</p>
              </div>
              <div className="bg-black/30 rounded-xl p-4">
                <p className="text-3xl font-black text-purple-400">0%</p>
                <p className="text-slate-300 text-xs">Recaídas ou perdas de energia</p>
              </div>
              <div className="bg-black/30 rounded-xl p-4">
                <p className="text-3xl font-black text-pink-400">100%</p>
                <p className="text-slate-300 text-xs">Se sentem protegidos diariamente</p>
              </div>
            </div>
          </motion.div>

          {/* Garantia Reforçada */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="bg-gradient-to-br from-yellow-950/30 to-amber-950/30 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-6 mb-8 text-center"
          >
            <Shield className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">🛡️ Garantia Total de 7 Dias</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Se em 7 dias você não sentir a diferença da blindagem, devolvemos 100% do seu investimento. <strong className="text-yellow-400">Sem perguntas. Sem burocracia.</strong>
            </p>
          </motion.div>

          {/* Link de Recusa */}
          <div className="text-center">
            <button
              onClick={handleDecline}
              className="text-slate-500 hover:text-slate-400 text-sm underline transition-colors"
            >
              Não preciso de proteção. Vou arriscar perder tudo.
            </button>
          </div>

        </div>

        {/* Mobile CTA Bar */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-700 via-pink-600 to-purple-700 p-4 shadow-2xl border-t-2 border-purple-400"
        >
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
            <div className="flex-1">
              <p className="text-white font-bold text-sm md:text-base">Blindagem Permanente</p>
              <p className="text-purple-200 text-xs md:text-sm">
                <span className="line-through opacity-60">R$ 247</span> → <span className="font-black text-lg">R$ 67</span>
              </p>
            </div>
            <button
              onClick={handleAccept}
              className={`bg-white hover:bg-gray-100 text-purple-700 font-black py-3 px-6 rounded-xl transition-all transform hover:scale-105 active:scale-95 text-sm md:text-base whitespace-nowrap shadow-xl ${showPulse ? 'animate-pulse' : ''}`}
            >
              BLINDAR AGORA
            </button>
          </div>
        </motion.div>
      </div>

      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showExitPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={() => setShowExitPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-[#1a0b2e] to-[#2d1b4e] rounded-3xl p-6 md:p-8 max-w-lg w-full border-2 border-purple-500 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowExitPopup(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="bg-purple-500 rounded-full p-4">
                    <Shield className="w-12 h-12 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-black text-white">
                  🚨 {firstNameUpper}, NÃO FAÇA ISSO!
                </h3>

                <p className="text-lg text-slate-200 font-bold">
                  Sem blindagem, você vai PERDER tudo em semanas...
                </p>

                <div className="bg-pink-500/10 border-2 border-pink-500 rounded-xl p-4">
                  <p className="text-pink-400 font-bold text-xl mb-2">
                    🎁 CUPOM SECRETO LIBERADO!
                  </p>
                  <p className="text-white font-black text-3xl mb-2">
                    R$ 50 <span className="text-sm text-slate-400">(economize R$17!)</span>
                  </p>
                  <p className="text-slate-300 text-sm">
                    Esta é a ÚLTIMA CHANCE de ter proteção com desconto
                  </p>
                </div>

                <button
                  onClick={handleExitAccept}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-lg py-4 px-6 rounded-xl shadow-lg transition-all transform hover:scale-105 uppercase"
                >
                  🛡️ BLINDAR COM DESCONTO AGORA
                </button>

                <button
                  onClick={() => setShowExitPopup(false)}
                  className="text-slate-500 hover:text-slate-400 text-sm underline"
                >
                  Não, vou arriscar ficar desprotegido
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

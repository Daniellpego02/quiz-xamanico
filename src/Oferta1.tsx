import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, X, Check, Zap, Shield, Star, AlertCircle } from 'lucide-react';

interface Oferta1Props {
  userName?: string;
}

export default function Oferta1({ userName = 'você' }: Oferta1Props) {
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
    window.location.href = 'https://checkout.mapaxamanicooficial.online/oferta-dois';
  };

  const handleDecline = () => {
    window.location.href = 'https://mapaxamanicooficial.online/oferta2';
  };

  const handleExitAccept = () => {
    window.location.href = 'https://checkout.mapaxamanicooficial.online/oferta-tres';
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505] text-white relative overflow-hidden">
        
        {/* Urgency Bar */}
        <motion.div 
          initial={{ y: -50 }} 
          animate={{ y: 0 }}
          className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white text-xs md:text-sm font-bold text-center py-3 px-4 sticky top-0 z-50 shadow-2xl"
        >
          <div className="flex items-center justify-center gap-2 uppercase tracking-wider">
            <Clock className="w-4 h-4 animate-pulse" />
            <span className="hidden md:inline">⚠️ OFERTA ÚNICA EXPIRA EM:</span>
            <span className="md:hidden">⏰ EXPIRA EM:</span>
            <span className="font-mono text-base md:text-lg text-yellow-300 animate-pulse">{formatTime(timeLeft)}</span>
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
              <p className="text-emerald-400 font-bold text-sm uppercase tracking-wide">✅ Seu acesso foi confirmado!</p>
              <p className="text-emerald-300/80 text-xs">Você está a um passo de DESBLOQUEAR tudo.</p>
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
              <span className="text-red-500">{firstNameUpper}</span>, ESPERA!
            </h1>
            <p className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
              Você está prestes a perder a chance de ATIVAR seu desbloqueio 10X MAIS RÁPIDO...
            </p>
          </motion.div>

          {/* BLOQUEIO - Segunda parte do RBMC */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-red-950/40 to-orange-950/40 backdrop-blur-sm border border-red-500/30 rounded-3xl p-6 md:p-8 mb-8 shadow-2xl"
          >
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-red-400 mb-2">⚠️ ATENÇÃO: O QUE PODE ACONTECER</h3>
                <p className="text-slate-200 text-sm md:text-base leading-relaxed">
                  Você acabou de garantir o Mapa Xamânico, mas <strong className="text-red-300">apenas isso NÃO É SUFICIENTE</strong> para a maioria das pessoas.
                </p>
              </div>
            </div>
            
            <div className="space-y-3 mt-6">
              <div className="flex items-start gap-3 bg-black/30 p-3 rounded-lg border-l-4 border-red-500">
                <span className="text-red-400 text-xl">❌</span>
                <p className="text-slate-300 text-sm"><strong>Sem a Ativação Profunda:</strong> Você vai SENTIR os bloqueios, mas não conseguirá DISSOLVÊ-LOS por completo.</p>
              </div>
              <div className="flex items-start gap-3 bg-black/30 p-3 rounded-lg border-l-4 border-red-500">
                <span className="text-red-400 text-xl">❌</span>
                <p className="text-slate-300 text-sm"><strong>Sem as técnicas avançadas:</strong> O processo pode levar MESES em vez de DIAS.</p>
              </div>
              <div className="flex items-start gap-3 bg-black/30 p-3 rounded-lg border-l-4 border-red-500">
                <span className="text-red-400 text-xl">❌</span>
                <p className="text-slate-300 text-sm"><strong>Sem esse módulo:</strong> Você corre o risco de DESISTIR no meio do caminho (como 78% das pessoas).</p>
              </div>
            </div>
          </motion.div>

          {/* MECANISMO - Terceira parte do RBMC */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="bg-gradient-to-br from-[#120a2e] to-[#1a0b3e] rounded-3xl p-6 md:p-8 mb-8 border border-orange-500/30 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Zap className="w-8 h-8 text-yellow-400" />
                <h2 className="text-2xl md:text-3xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  Imersão de Ativação Profunda
                </h2>
              </div>

              <p className="text-center text-slate-200 text-base md:text-lg mb-6 leading-relaxed">
                O sistema COMPLETO para <strong className="text-yellow-400">ACELERAR seu desbloqueio em até 10X</strong> e garantir que você chegue ao resultado REAL em dias, não meses.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg p-2 flex-shrink-0">
                    <Check className="w-5 h-5 text-black font-bold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">🔥 Protocolo de Ativação Imediata</h4>
                    <p className="text-slate-300 text-sm">Técnicas específicas para ATIVAR a energia do seu mapa em menos de 24h</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg p-2 flex-shrink-0">
                    <Check className="w-5 h-5 text-black font-bold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">⚡ Rituais de Ancoragem Energética</h4>
                    <p className="text-slate-300 text-sm">Mantenha a frequência alta e evite recaídas (o segredo dos 3% que conseguem)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg p-2 flex-shrink-0">
                    <Check className="w-5 h-5 text-black font-bold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">🎯 Meditações Guiadas Personalizadas</h4>
                    <p className="text-slate-300 text-sm">Áudios exclusivos para cada fase do seu desbloqueio (valor: R$297)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg p-2 flex-shrink-0">
                    <Check className="w-5 h-5 text-black font-bold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">🧘 Práticas de Alinhamento Diário</h4>
                    <p className="text-slate-300 text-sm">5 minutos por dia que multiplicam seus resultados em 10X</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg p-2 flex-shrink-0">
                    <Check className="w-5 h-5 text-black font-bold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">📈 Mapa de Progressão Semanal</h4>
                    <p className="text-slate-300 text-sm">Acompanhe sua evolução e celebre cada vitória no caminho</p>
                  </div>
                </div>
              </div>

              {/* Preço e Oferta */}
              <div className="bg-black/40 rounded-2xl p-6 border-2 border-yellow-500/50 shadow-xl">
                <div className="text-center mb-4">
                  <p className="text-slate-400 text-sm mb-2">VALOR NORMAL:</p>
                  <p className="text-slate-500 text-2xl line-through mb-1">R$ 297,00</p>
                  <p className="text-yellow-400 font-bold text-sm uppercase tracking-wider mb-3">🔥 OFERTA EXCLUSIVA AGORA:</p>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-slate-300 text-xl">apenas</span>
                    <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">R$97</span>
                  </div>
                  <p className="text-emerald-400 text-sm font-bold">💎 Acesso vitalício + Atualizações gratuitas</p>
                </div>

                <button
                  onClick={handleAccept}
                  className={`w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-400 hover:via-orange-400 hover:to-red-400 text-black font-black text-lg md:text-xl py-5 px-8 rounded-2xl shadow-2xl shadow-orange-500/50 transition-all transform hover:scale-105 active:scale-95 border-2 border-yellow-300 uppercase tracking-wide ${showPulse ? 'animate-pulse' : ''}`}
                >
                  <span className="drop-shadow-lg">✨ SIM! QUERO ATIVAR 10X MAIS RÁPIDO</span>
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
            className="bg-gradient-to-br from-purple-950/30 to-pink-950/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 mb-8"
          >
            <h3 className="text-center font-bold text-white text-lg mb-4 flex items-center justify-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              Resultados de Quem Ativou
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="bg-black/30 rounded-xl p-4">
                <p className="text-3xl font-black text-yellow-400">87%</p>
                <p className="text-slate-300 text-xs">Resultados em menos de 7 dias</p>
              </div>
              <div className="bg-black/30 rounded-xl p-4">
                <p className="text-3xl font-black text-emerald-400">10X</p>
                <p className="text-slate-300 text-xs">Mais rápido que o método básico</p>
              </div>
              <div className="bg-black/30 rounded-xl p-4">
                <p className="text-3xl font-black text-orange-400">94%</p>
                <p className="text-slate-300 text-xs">Não desistiram no meio</p>
              </div>
            </div>
          </motion.div>

          {/* Link de Recusa */}
          <div className="text-center">
            <button
              onClick={handleDecline}
              className="text-slate-500 hover:text-slate-400 text-sm underline transition-colors"
            >
              Não, obrigado. Vou tentar sozinho (mais devagar)
            </button>
          </div>

        </div>

        {/* Mobile CTA Bar */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 p-4 shadow-2xl border-t-2 border-yellow-400"
        >
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
            <div className="flex-1">
              <p className="text-white font-bold text-sm md:text-base">Imersão Completa</p>
              <p className="text-yellow-200 text-xs md:text-sm">
                <span className="line-through opacity-60">R$ 297</span> → <span className="font-black text-lg">R$ 97</span>
              </p>
            </div>
            <button
              onClick={handleAccept}
              className={`bg-black hover:bg-gray-900 text-yellow-400 font-black py-3 px-6 rounded-xl transition-all transform hover:scale-105 active:scale-95 text-sm md:text-base whitespace-nowrap shadow-xl ${showPulse ? 'animate-pulse' : ''}`}
            >
              ATIVAR AGORA
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
              className="bg-gradient-to-br from-[#1a0b2e] to-[#2d1b4e] rounded-3xl p-6 md:p-8 max-w-lg w-full border-2 border-red-500 shadow-2xl relative"
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
                  <div className="bg-red-500 rounded-full p-4">
                    <AlertCircle className="w-12 h-12 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-black text-white">
                  🚨 ESPERA, {firstNameUpper}!
                </h3>

                <p className="text-lg text-slate-200 font-bold">
                  Vejo que você está saindo... 
                </p>

                <div className="bg-yellow-500/10 border-2 border-yellow-500 rounded-xl p-4">
                  <p className="text-yellow-400 font-bold text-xl mb-2">
                    🎁 CUPOM EXCLUSIVO DESBLOQUEADO!
                  </p>
                  <p className="text-white font-black text-3xl mb-2">
                    R$ 77 <span className="text-sm text-slate-400">(economize R$20!)</span>
                  </p>
                  <p className="text-slate-300 text-sm">
                    Esta é sua ÚLTIMA CHANCE de ter o upgrade com desconto
                  </p>
                </div>

                <button
                  onClick={handleExitAccept}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-black text-lg py-4 px-6 rounded-xl shadow-lg transition-all transform hover:scale-105 uppercase"
                >
                  ✨ ATIVAR COM DESCONTO AGORA
                </button>

                <button
                  onClick={() => setShowExitPopup(false)}
                  className="text-slate-500 hover:text-slate-400 text-sm underline"
                >
                  Não, vou perder esta chance
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

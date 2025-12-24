import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Shield, Heart, Sparkles } from 'lucide-react';

interface Oferta1Props {
  userName?: string;
}

export default function Oferta1({ userName = 'você' }: Oferta1Props) {
  const [showExitPopup, setShowExitPopup] = useState(false);

  const firstName = userName ? userName.split(' ')[0] : 'você';

  // Exit intent popup (gentle, no pressure)
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

  const handleAccept = () => {
    window.location.href = 'https://go.perfectpay.com.br/PPU38CQ4OE0?guia7dias=true';
  };

  const handleDecline = () => {
    window.location.href = '/oferta2';
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#0f0a1a] via-[#1a0f2e] to-[#0f0a1a] text-white relative overflow-hidden">
        
        {/* Progress Bar - Post-Purchase Continuation */}
        <div className="sticky top-0 z-50 bg-gradient-to-r from-indigo-950/95 via-purple-950/95 to-indigo-950/95 backdrop-blur-md border-b border-purple-500/30">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="bg-emerald-500 rounded-full p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-emerald-400 text-xs md:text-sm font-medium">Compra confirmada</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-purple-500 rounded-full p-1 animate-pulse">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-purple-300 text-xs md:text-sm font-medium">Passo opcional</span>
              </div>
              <div className="flex items-center gap-2 opacity-40">
                <div className="bg-gray-600 rounded-full p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-400 text-xs md:text-sm font-medium hidden md:inline">Início do Mapa</span>
              </div>
            </div>
            <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "66%" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-emerald-500 via-purple-500 to-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 pb-32 relative z-10">
          
          {/* HEADLINE - Calm and Congruent */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center space-y-4 mb-8 md:mb-10"
          >
            <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight max-w-2xl mx-auto">
              Antes de iniciar o Mapa Xamânico sozinho, veja isso
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Um acompanhamento leve e diário para você saber se está fazendo certo e não travar no meio do processo
            </p>
          </motion.div>

          {/* MAIN COPY - Supportive and Clear */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-indigo-950/40 to-purple-950/40 backdrop-blur-sm border border-indigo-500/20 rounded-3xl p-6 md:p-10 mb-8 shadow-2xl"
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-base md:text-lg text-gray-200 leading-relaxed mb-4">
                O <strong className="text-indigo-300">Guia de Acompanhamento do Mapa Xamânico – 7 Dias</strong> foi criado para quem não quer passar pelo processo com dúvida, insegurança ou sensação de estar fazendo algo errado.
              </p>
              
              <p className="text-base md:text-lg text-gray-200 leading-relaxed mb-4">
                Durante os 7 dias, você recebe orientações simples e diretas para entender os sinais do processo, saber o que é normal sentir e evitar os erros mais comuns que fazem muitas pessoas desistirem no meio do caminho.
              </p>

              <div className="bg-indigo-900/30 border-l-4 border-indigo-400 p-5 rounded-r-xl my-6">
                <p className="text-base md:text-lg text-indigo-200 leading-relaxed">
                  <strong>Não é um novo método.</strong><br />
                  <strong>Não substitui o Mapa Xamânico.</strong><br />
                  É apenas um apoio tranquilo para você seguir com mais clareza e confiança desde o primeiro dia.
                </p>
              </div>
            </div>
          </motion.div>

          {/* WHAT YOU RECEIVE - Clean Bullets */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mb-8 md:mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-6">
              👉 Incluído neste acompanhamento:
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-indigo-950/30 p-5 rounded-xl border border-indigo-500/20 hover:border-indigo-400/40 transition-all">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg p-2.5 flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                    <strong className="text-white">Orientações diárias simples</strong> durante os 7 dias do Mapa
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-indigo-950/30 p-5 rounded-xl border border-indigo-500/20 hover:border-indigo-400/40 transition-all">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg p-2.5 flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                    <strong className="text-white">Explicação clara dos sinais emocionais</strong> mais comuns
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-indigo-950/30 p-5 rounded-xl border border-indigo-500/20 hover:border-indigo-400/40 transition-all">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg p-2.5 flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                    <strong className="text-white">Ajustes práticos</strong> para não travar nem desistir
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-indigo-950/30 p-5 rounded-xl border border-indigo-500/20 hover:border-indigo-400/40 transition-all">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg p-2.5 flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                    <strong className="text-white">Áudios curtos de apoio</strong> (5 minutos)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-indigo-950/30 p-5 rounded-xl border border-indigo-500/20 hover:border-indigo-400/40 transition-all">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg p-2.5 flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                    <strong className="text-white">Pensado para quem tem pouco tempo e pouca energia</strong>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SOCIAL PROOF - No risky numbers */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="bg-gradient-to-br from-purple-950/30 to-indigo-950/30 border border-purple-500/20 rounded-2xl p-6 mb-8 text-center"
          >
            <Heart className="w-10 h-10 text-purple-400 mx-auto mb-3" />
            <p className="text-base md:text-lg text-gray-200 leading-relaxed italic">
              "Muitas pessoas relatam que o mais difícil não é começar, mas seguir com segurança. Esse guia nasceu exatamente disso."
            </p>
          </motion.div>

          {/* PRICING AND CTA */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="bg-gradient-to-br from-indigo-950/60 to-purple-950/60 rounded-3xl p-6 md:p-8 mb-8 border-2 border-purple-400/40 shadow-2xl"
          >
            <div className="text-center mb-6">
              <p className="text-gray-400 text-sm mb-3 uppercase tracking-wider">Valor sugerido:</p>
              <p className="text-gray-500 text-2xl md:text-3xl line-through mb-2">R$ 79</p>
              <p className="text-purple-300 font-bold text-base md:text-lg uppercase tracking-wider mb-4">
                Oferta exclusiva agora:
              </p>
              <div className="flex items-baseline justify-center gap-1 mb-4">
                <span className="text-3xl text-white font-bold">R$</span>
                <span className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-300 to-purple-300">
                  29
                </span>
                <span className="text-3xl text-white font-bold">,00</span>
              </div>
              <p className="text-emerald-400 text-sm md:text-base font-medium mb-6">
                💳 Pagamento: 1 clique via PIX
              </p>

              <button
                onClick={handleAccept}
                className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:via-indigo-500 hover:to-purple-500 text-white font-bold text-lg md:text-xl py-5 md:py-6 px-6 rounded-2xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] border border-purple-400/30 mb-3"
              >
                SIM, QUERO SEGUIR COM MAIS CLAREZA
              </button>

              <p className="text-gray-400 text-xs md:text-sm mb-4">
                Oferta disponível apenas agora, junto com sua compra do Mapa Xamânico.
              </p>

              <div className="flex items-center justify-center gap-2 text-emerald-400 text-xs">
                <Shield className="w-4 h-4" />
                <span>🔒 Pagamento 100% Seguro • Garantia de 7 Dias</span>
              </div>
            </div>
          </motion.div>

          {/* Decline Link - No guilt */}
          <div className="text-center">
            <button
              onClick={handleDecline}
              className="text-gray-500 hover:text-gray-400 text-sm underline transition-colors"
            >
              Não, vou seguir sozinho
            </button>
          </div>

        </div>

        {/* Mobile Sticky CTA - Clean and supportive */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-950 via-purple-950 to-indigo-950 backdrop-blur-md border-t border-purple-500/30 p-4 shadow-2xl md:hidden">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">Guia 7 Dias</p>
              <p className="text-purple-300 text-xs">
                <span className="line-through opacity-60">R$ 79</span> → <span className="font-bold text-base">R$ 29</span>
              </p>
            </div>
            <button
              onClick={handleAccept}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-xl transition-all transform active:scale-95 text-sm whitespace-nowrap shadow-xl"
            >
              QUERO CLAREZA
            </button>
          </div>
        </div>
      </div>

      {/* Exit Intent Popup - Gentle approach */}
      <AnimatePresence>
        {showExitPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={() => setShowExitPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-gradient-to-br from-indigo-950 via-purple-950 to-indigo-950 rounded-3xl p-6 md:p-8 max-w-lg w-full border-2 border-purple-500/40 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowExitPopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center space-y-5">
                <div className="flex justify-center">
                  <div className="bg-purple-500/20 rounded-full p-4 border-2 border-purple-400/40">
                    <Heart className="w-10 h-10 text-purple-300" />
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                  Antes de ir...
                </h3>

                <p className="text-base text-gray-300 leading-relaxed">
                  Lembre-se: esta oferta só está disponível agora, junto com sua compra do Mapa Xamânico.
                </p>

                <div className="bg-purple-900/30 border border-purple-400/30 rounded-xl p-5">
                  <p className="text-purple-200 font-semibold text-lg mb-2">
                    R$ 29 para ter apoio nos primeiros 7 dias
                  </p>
                  <p className="text-gray-300 text-sm">
                    Orientações diárias para você não se sentir perdido
                  </p>
                </div>

                <button
                  onClick={handleAccept}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-lg py-4 px-6 rounded-xl shadow-lg transition-all transform hover:scale-105"
                >
                  QUERO O GUIA DE 7 DIAS
                </button>

                <button
                  onClick={() => setShowExitPopup(false)}
                  className="text-gray-500 hover:text-gray-400 text-sm underline"
                >
                  Não, obrigado
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

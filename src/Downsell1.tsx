import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { X, Check, Shield, Heart, Sparkles } from 'lucide-react';

// BuckPay Configuration for Downsell
const BUCKPAY_DOWNSELL_CONFIG = {
  offerId: 'YOUR_DOWNSELL_OFFER_ID', // Replace with actual downsell offer ID
  upsellUrl: 'https://www.mapaxamanicooficial.online/obrigado',
  downsellUrl: null,
  scriptUrl: 'https://www.seguropagamentos.com.br/upsell-downsell-script.js'
} as const;

interface Downsell1Props {
  userName?: string;
}

export default function Downsell1({ userName = 'você' }: Downsell1Props) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [buckpayError, setBuckpayError] = useState(false);

  const benefitsRef = useRef(null);
  const benefitsInView = useInView(benefitsRef, { once: true, margin: "-100px" });

  const firstName = userName ? userName.split(' ')[0] : 'você';

  // Subtle animation variants (lighter than upsell)
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const slideUp = {
    hidden: { opacity: 0, y: 12 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 6 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  // Load BuckPay script
  useEffect(() => {
    (window as any).buckpayOfferId = BUCKPAY_DOWNSELL_CONFIG.offerId;
    (window as any).buckpayUpsellUrl = BUCKPAY_DOWNSELL_CONFIG.upsellUrl;
    (window as any).buckpayDownsellUrl = BUCKPAY_DOWNSELL_CONFIG.downsellUrl;

    const script = document.createElement('script');
    script.src = BUCKPAY_DOWNSELL_CONFIG.scriptUrl;
    script.async = true;
    script.onerror = () => {
      console.error('Failed to load BuckPay script');
      setBuckpayError(true);
    };
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handleAccept = () => {
    setIsProcessing(true);
    
    const buckpayButton = document.getElementById('buckpay-upsell-button');
    
    if (buckpayButton) {
      buckpayButton.click();
    } else {
      console.error('BuckPay button not found');
      setTimeout(() => {
        setIsProcessing(false);
        setBuckpayError(true);
        alert('Erro ao processar pagamento. Por favor, tente novamente ou entre em contato com o suporte.');
      }, 1000);
    }
  };

  const handleDecline = () => {
    window.location.href = '/obrigado';
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#0a0515] via-[#130a20] to-[#0a0515] text-white relative overflow-hidden">
        
        {/* Very subtle background (lighter than upsell) */}
        <div className="fixed inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-12 md:py-16 relative z-10">
          
          {/* HEADLINE - Reassuring, not pushy */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-center space-y-4 mb-8"
          >
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight max-w-xl mx-auto">
              Tudo bem se você quiser algo mais simples
            </h1>
          </motion.div>

          {/* MAIN COPY - Shorter, lighter */}
          <motion.div
            variants={slideUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-indigo-950/30 to-purple-950/30 backdrop-blur-sm border border-indigo-500/15 rounded-2xl p-6 md:p-8 mb-8 shadow-lg"
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-base md:text-lg text-gray-200 leading-relaxed mb-4">
                Algumas pessoas preferem não ter um acompanhamento completo.
              </p>
              
              <p className="text-base md:text-lg text-gray-200 leading-relaxed mb-4">
                Pensando nisso, criamos uma <strong className="text-indigo-300">versão essencial</strong>, apenas para te dar um mínimo de orientação durante os 7 dias do Mapa, sem aprofundamento, sem rotina, sem compromisso.
              </p>

              <div className="bg-indigo-900/20 border-l-4 border-indigo-400 p-4 rounded-r-xl my-5">
                <p className="text-base text-indigo-200 leading-relaxed">
                  É indicada para quem quer seguir no próprio ritmo, mas não quer se sentir totalmente sozinho.
                </p>
              </div>
            </div>
          </motion.div>

          {/* WHAT YOU RECEIVE - Shorter list */}
          <div ref={benefitsRef} className="mb-8">
            <motion.h2 
              variants={slideUp}
              initial="hidden"
              animate={benefitsInView ? "visible" : "hidden"}
              className="text-xl md:text-2xl font-bold text-center text-white mb-5"
            >
              O que você recebe:
            </motion.h2>
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate={benefitsInView ? "visible" : "hidden"}
              className="space-y-3"
            >
              <motion.div variants={staggerItem} className="flex items-start gap-3 bg-indigo-950/20 p-4 rounded-xl border border-indigo-500/15">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg p-2 flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                    <strong className="text-white">Orientações gerais</strong> para os 7 dias
                  </p>
                </div>
              </motion.div>

              <motion.div variants={staggerItem} className="flex items-start gap-3 bg-indigo-950/20 p-4 rounded-xl border border-indigo-500/15">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg p-2 flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                    <strong className="text-white">Explicação simples</strong> dos sinais mais comuns
                  </p>
                </div>
              </motion.div>

              <motion.div variants={staggerItem} className="flex items-start gap-3 bg-indigo-950/20 p-4 rounded-xl border border-indigo-500/15">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg p-2 flex-shrink-0">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                    <strong className="text-white">2 áudios curtos</strong> de apoio emocional
                  </p>
                </div>
              </motion.div>

              <motion.div variants={staggerItem} className="flex items-start gap-3 bg-indigo-950/20 p-4 rounded-xl border border-indigo-500/15 opacity-60">
                <div className="bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg p-2 flex-shrink-0">
                  <X className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    <strong>Sem acompanhamento diário</strong> (versão simplificada)
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* PRICING - Simple, no comparison */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.8 }}
            className="bg-gradient-to-br from-indigo-950/40 to-purple-950/40 rounded-2xl p-6 md:p-7 mb-8 border border-purple-400/30 shadow-lg"
          >
            <div className="text-center mb-6">
              <p className="text-purple-300 font-semibold text-sm md:text-base uppercase tracking-wider mb-3">
                Versão Essencial
              </p>
              <div className="flex items-baseline justify-center gap-1 mb-4">
                <span className="text-2xl text-white font-bold">R$</span>
                <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-300 to-purple-300">
                  19
                </span>
                <span className="text-2xl text-white font-bold">,90</span>
              </div>
              <p className="text-emerald-400 text-sm font-medium mb-5">
                💳 Pagamento via PIX • Acesso imediato
              </p>

              <button
                onClick={handleAccept}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:via-indigo-500 hover:to-purple-500 disabled:from-purple-700 disabled:via-indigo-700 disabled:to-purple-700 text-white font-bold text-base md:text-lg py-4 md:py-5 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] disabled:scale-100 border border-purple-400/20 mb-3 relative overflow-hidden group"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Processando...
                  </span>
                ) : (
                  <>
                    <span className="relative z-10">SIM, QUERO A VERSÃO ESSENCIAL</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-white/5 to-purple-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-3 text-gray-400 text-xs">
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  <span>Pagamento seguro</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Sem compromisso</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Decline Link - No guilt, clean */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1 }}
          >
            <button
              onClick={handleDecline}
              className="text-gray-500 hover:text-gray-400 text-sm underline transition-colors"
            >
              Não, seguir sem acompanhamento
            </button>
          </motion.div>

        </div>
      </div>

      {/* Hidden BuckPay Container */}
      <div style={{ display: 'none' }} id="buckpay-upsell-downsell-container">
        <button id="buckpay-upsell-button">
          Sim, eu quero essa oferta!
        </button>
      </div>
    </>
  );
}

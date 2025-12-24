import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { X, Check, Shield, Heart, Sparkles, Lock, Zap } from 'lucide-react';

interface Oferta1Props {
  userName?: string;
}

// BuckPay Configuration
const BUCKPAY_CONFIG = {
  offerId: '7c265285-38dc-44e9-8f56-eaa6356e26b1',
  upsellUrl: 'https://www.mapaxamanicooficial.online/obrigado',
  downsellUrl: null,
  scriptUrl: 'https://www.seguropagamentos.com.br/upsell-downsell-script.js'
} as const;

export default function Oferta1({ userName = 'você' }: Oferta1Props) {
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [buckpayError, setBuckpayError] = useState(false);
  
  const benefitsRef = useRef(null);
  const socialProofRef = useRef(null);
  const benefitsInView = useInView(benefitsRef, { once: true, margin: "-100px" });
  const socialProofInView = useInView(socialProofRef, { once: true, margin: "-100px" });

  const firstName = userName ? userName.split(' ')[0] : 'você';

  // Subtle animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 8 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 8 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" }
    }
  };

  // Load BuckPay one-click upsell script
  useEffect(() => {
    // Set BuckPay configuration
    (window as any).buckpayOfferId = BUCKPAY_CONFIG.offerId;
    (window as any).buckpayUpsellUrl = BUCKPAY_CONFIG.upsellUrl;
    (window as any).buckpayDownsellUrl = BUCKPAY_CONFIG.downsellUrl;

    // Load BuckPay script
    const script = document.createElement('script');
    script.src = BUCKPAY_CONFIG.scriptUrl;
    script.async = true;
    script.onerror = () => {
      console.error('Failed to load BuckPay script');
      setBuckpayError(true);
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

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
    setIsProcessing(true);
    
    // Trigger BuckPay one-click upsell
    const buckpayButton = document.getElementById('buckpay-upsell-button');
    
    if (buckpayButton) {
      buckpayButton.click();
    } else {
      // Fallback: show error and reset
      console.error('BuckPay button not found');
      setTimeout(() => {
        setIsProcessing(false);
        setBuckpayError(true);
        // Could show error message to user here
        alert('Erro ao processar pagamento. Por favor, tente novamente ou entre em contato com o suporte.');
      }, 1000);
    }
  };

  const handleDecline = () => {
    window.location.href = '/down1';
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#0f0a1a] via-[#1a0f2e] to-[#0f0a1a] text-white relative overflow-hidden">
        
        {/* Subtle background glow - not animated */}
        <div className="fixed inset-0 pointer-events-none opacity-30">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Progress Bar - Post-Purchase Continuation with smooth animation */}
        <div className="sticky top-0 z-50 bg-gradient-to-r from-indigo-950/95 via-purple-950/95 to-indigo-950/95 backdrop-blur-md border-b border-purple-500/30">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <motion.div 
              className="flex items-center justify-between mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="flex items-center gap-2">
                <motion.div 
                  className="bg-emerald-500 rounded-full p-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
                <span className="text-emerald-400 text-xs md:text-sm font-medium">Compra confirmada</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.div 
                  className="bg-purple-500 rounded-full p-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4, type: "spring", stiffness: 200 }}
                >
                  <Sparkles className="w-4 h-4 text-white" />
                </motion.div>
                <span className="text-purple-300 text-xs md:text-sm font-medium">Passo opcional</span>
              </div>
              <div className="flex items-center gap-2 opacity-40">
                <div className="bg-gray-600 rounded-full p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-400 text-xs md:text-sm font-medium hidden md:inline">Início do Mapa</span>
              </div>
            </motion.div>
            <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "66%" }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-emerald-500 via-purple-500 to-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 pb-32 relative z-10">
          
          {/* HEADLINE - Calm fade in */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
            className="text-center space-y-4 mb-8 md:mb-10"
          >
            <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight max-w-2xl mx-auto">
              Antes de iniciar o Mapa Xamânico sozinho, veja isso
            </h1>
          </motion.div>

          {/* SUBHEADLINE - Staggered */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.65 }}
            className="text-center mb-8 md:mb-10"
          >
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Um acompanhamento leve e diário para você saber se está fazendo certo e não travar no meio do processo
            </p>
          </motion.div>

          {/* MAIN COPY - Supportive and Clear */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-indigo-950/40 to-purple-950/40 backdrop-blur-sm border border-indigo-500/20 rounded-3xl p-6 md:p-10 mb-8 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
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

          {/* WHAT YOU RECEIVE - Clean Bullets with scroll-triggered stagger */}
          <div ref={benefitsRef} className="mb-8 md:mb-10">
            <motion.h2 
              variants={fadeInUp}
              initial="hidden"
              animate={benefitsInView ? "visible" : "hidden"}
              className="text-2xl md:text-3xl font-bold text-center text-white mb-6"
            >
              👉 Incluído neste acompanhamento:
            </motion.h2>
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate={benefitsInView ? "visible" : "hidden"}
              className="space-y-4"
            >
              <motion.div variants={staggerItem} className="flex items-start gap-4 bg-indigo-950/30 p-5 rounded-xl border border-indigo-500/20 hover:border-indigo-400/40 hover:shadow-[0_4px_16px_rgba(99,102,241,0.1)] transition-all duration-300">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg p-2.5 flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                    <strong className="text-white">Orientações diárias simples</strong> durante os 7 dias do Mapa
                  </p>
                </div>
              </motion.div>

              <motion.div variants={staggerItem} className="flex items-start gap-4 bg-indigo-950/30 p-5 rounded-xl border border-indigo-500/20 hover:border-indigo-400/40 hover:shadow-[0_4px_16px_rgba(99,102,241,0.1)] transition-all duration-300">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg p-2.5 flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                    <strong className="text-white">Explicação clara dos sinais emocionais</strong> mais comuns
                  </p>
                </div>
              </motion.div>

              <motion.div variants={staggerItem} className="flex items-start gap-4 bg-indigo-950/30 p-5 rounded-xl border border-indigo-500/20 hover:border-indigo-400/40 hover:shadow-[0_4px_16px_rgba(99,102,241,0.1)] transition-all duration-300">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg p-2.5 flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                    <strong className="text-white">Ajustes práticos</strong> para não travar nem desistir
                  </p>
                </div>
              </motion.div>

              <motion.div variants={staggerItem} className="flex items-start gap-4 bg-indigo-950/30 p-5 rounded-xl border border-indigo-500/20 hover:border-indigo-400/40 hover:shadow-[0_4px_16px_rgba(99,102,241,0.1)] transition-all duration-300">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg p-2.5 flex-shrink-0">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                    <strong className="text-white">Áudios curtos de apoio</strong> (5 minutos)
                  </p>
                </div>
              </motion.div>

              <motion.div variants={staggerItem} className="flex items-start gap-4 bg-indigo-950/30 p-5 rounded-xl border border-indigo-500/20 hover:border-indigo-400/40 hover:shadow-[0_4px_16px_rgba(99,102,241,0.1)] transition-all duration-300">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg p-2.5 flex-shrink-0">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                    <strong className="text-white">Pensado para quem tem pouco tempo e pouca energia</strong>
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* SOCIAL PROOF - Fade in on scroll */}
          <motion.div
            ref={socialProofRef}
            initial={{ opacity: 0, y: 8 }}
            animate={socialProofInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-gradient-to-br from-purple-950/30 to-indigo-950/30 border border-purple-500/20 rounded-2xl p-6 mb-8 text-center shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
          >
            <Heart className="w-10 h-10 text-purple-400 mx-auto mb-3" />
            <p className="text-base md:text-lg text-gray-200 leading-relaxed italic">
              "Muitas pessoas relatam que o mais difícil não é começar, mas seguir com segurança. Esse guia nasceu exatamente disso."
            </p>
          </motion.div>

          {/* PRICING AND CTA - Enhanced with microinteractions */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.1, ease: "easeOut" }}
            className="bg-gradient-to-br from-indigo-950/60 to-purple-950/60 rounded-3xl p-6 md:p-8 mb-8 border-2 border-purple-400/40 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
          >
            <div className="text-center mb-6">
              <p className="text-gray-400 text-sm mb-3 uppercase tracking-wider">Valor sugerido:</p>
              <p className="text-gray-500 text-2xl md:text-3xl line-through mb-2">R$ 79</p>
              <p className="text-purple-300 font-bold text-base md:text-lg uppercase tracking-wider mb-4">
                Oferta exclusiva agora:
              </p>
              
              {/* Price with hover tooltip */}
              <div 
                className="relative inline-block mb-4"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <div className="flex items-baseline justify-center gap-1 cursor-help">
                  <span className="text-3xl text-white font-bold">R$</span>
                  <span className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-300 to-purple-300">
                    29
                  </span>
                  <span className="text-3xl text-white font-bold">,00</span>
                </div>
                
                {/* Hover tooltip */}
                <AnimatePresence>
                  {showTooltip && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-indigo-900 text-white text-xs py-2 px-3 rounded-lg whitespace-nowrap shadow-lg"
                    >
                      Oferta exclusiva liberada junto com sua compra
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-indigo-900 rotate-45"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <p className="text-emerald-400 text-sm md:text-base font-medium mb-6">
                💳 Pagamento: 1 clique via PIX
              </p>

              {/* CTA with processing state */}
              <button
                onClick={handleAccept}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:via-indigo-500 hover:to-purple-500 disabled:from-purple-700 disabled:via-indigo-700 disabled:to-purple-700 text-white font-bold text-lg md:text-xl py-5 md:py-6 px-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 border border-purple-400/30 mb-3 relative overflow-hidden group"
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
                    <span className="relative z-10">SIM, QUERO SEGUIR COM MAIS CLAREZA</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-white/10 to-purple-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </>
                )}
              </button>

              {/* Microcopy - silent urgency */}
              <p className="text-gray-400 text-xs md:text-sm mb-4">
                Oferta disponível apenas agora, junto com sua compra do Mapa Xamânico.
              </p>

              {/* Trust seals - discrete */}
              <div className="flex items-center justify-center gap-4 text-gray-400 text-xs">
                <div className="flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>Pagamento via PIX</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  <span>Acesso imediato</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  <span>7 dias de garantia</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Decline Link - No guilt */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.3 }}
          >
            <button
              onClick={handleDecline}
              className="text-gray-500 hover:text-gray-400 text-sm underline transition-colors"
            >
              Não, vou seguir sozinho
            </button>
          </motion.div>

        </div>

        {/* Mobile Sticky CTA - Clean and supportive */}
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-950 via-purple-950 to-indigo-950 backdrop-blur-md border-t border-purple-500/30 p-4 shadow-2xl md:hidden"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">Guia 7 Dias</p>
              <p className="text-purple-300 text-xs">
                <span className="line-through opacity-60">R$ 79</span> → <span className="font-bold text-base">R$ 29</span>
              </p>
            </div>
            <button
              onClick={handleAccept}
              disabled={isProcessing}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 disabled:from-purple-700 disabled:to-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all transform active:scale-95 text-sm whitespace-nowrap shadow-xl"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>Aguarde...</span>
                </span>
              ) : (
                'QUERO CLAREZA'
              )}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Exit Intent Popup - Gentle approach */}
      <AnimatePresence>
        {showExitPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={() => setShowExitPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
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
                <motion.div 
                  className="flex justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1, type: "spring", stiffness: 200 }}
                >
                  <div className="bg-purple-500/20 rounded-full p-4 border-2 border-purple-400/40">
                    <Heart className="w-10 h-10 text-purple-300" />
                  </div>
                </motion.div>

                <motion.h3 
                  className="text-xl md:text-2xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  Antes de ir...
                </motion.h3>

                <motion.p 
                  className="text-base text-gray-300 leading-relaxed"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  Lembre-se: esta oferta só está disponível agora, junto com sua compra do Mapa Xamânico.
                </motion.p>

                <motion.div 
                  className="bg-purple-900/30 border border-purple-400/30 rounded-xl p-5"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <p className="text-purple-200 font-semibold text-lg mb-2">
                    R$ 29 para ter apoio nos primeiros 7 dias
                  </p>
                  <p className="text-gray-300 text-sm">
                    Orientações diárias para você não se sentir perdido
                  </p>
                </motion.div>

                <motion.button
                  onClick={handleAccept}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-lg py-4 px-6 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] duration-300"
                >
                  QUERO O GUIA DE 7 DIAS
                </motion.button>

                <motion.button
                  onClick={() => setShowExitPopup(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  className="text-gray-500 hover:text-gray-400 text-sm underline"
                >
                  Não, obrigado
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden BuckPay One-Click Upsell Container */}
      <div style={{ display: 'none' }} id="buckpay-upsell-downsell-container">
        <button id="buckpay-upsell-button">
          Sim, eu quero essa oferta!
        </button>
      </div>
    </>
  );
}

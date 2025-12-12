import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, Check, Shield, Eye, AlertTriangle, 
  Droplets, CheckSquare, Lock, ArrowDown, Star
} from 'lucide-react';

const COUNTDOWN_DURATION = 15 * 60; // 15 minutes in seconds
const INITIAL_VIEWERS = 63;
const MIN_VIEWERS = 40;
const MAX_VIEWERS = 100;
const VIEWER_UPDATE_INTERVAL = 5000; // 5 seconds
const INITIAL_SPOTS = 2;

export default function Oferta2() {
  const [timeLeft, setTimeLeft] = useState(COUNTDOWN_DURATION);
  const [viewers, setViewers] = useState(INITIAL_VIEWERS);
  const [spotsLeft, setSpotsLeft] = useState(INITIAL_SPOTS);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const buckpayScriptRef = useRef<HTMLScriptElement | null>(null);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev <= 0 ? 0 : prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fake viewers counter
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => Math.max(MIN_VIEWERS, Math.min(MAX_VIEWERS, prev + Math.floor(Math.random() * 7) - 3)));
    }, VIEWER_UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  // Confetti on load
  useEffect(() => {
    if (typeof (window as any).confetti === 'function') {
      setTimeout(() => {
        (window as any).confetti({ 
          particleCount: 200, 
          spread: 90, 
          origin: { y: 0.6 },
          colors: ['#A855F7', '#FBBF24', '#FF9500', '#FFFFFF'],
          zIndex: 100 
        });
      }, 300);
    }
  }, []);

  // Spots counter (decreases over time)
  useEffect(() => {
    const interval = setInterval(() => {
      setSpotsLeft(prev => Math.max(1, prev - (Math.random() > 0.8 ? 1 : 0)));
    }, 50000); // Every 50 seconds
    return () => clearInterval(interval);
  }, []);

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !showExitIntent) {
        setShowExitIntent(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [showExitIntent]);

  // Sticky header on scroll (mobile)
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyHeader(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // BuckPay script loading
  useEffect(() => {
    (window as any).buckpayOfferId = 'c35c94f7-223d-4f6d-9189-fe80d00cd4f5';
    (window as any).buckpayUpsellUrl = 'https://www.mapaxamanicooficial.online/obrigado';
    (window as any).buckpayDownsellUrl = null;
    
    const script = document.createElement('script');
    script.src = 'https://www.seguropagamentos.com.br/upsell-downsell-script.js';
    script.async = true;
    buckpayScriptRef.current = script;
    document.body.appendChild(script);
    
    return () => {
      if (buckpayScriptRef.current && document.body.contains(buckpayScriptRef.current)) {
        document.body.removeChild(buckpayScriptRef.current);
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleDecline = () => {
    window.location.href = '/obrigado';
  };

  const problems = [
    "O bloqueio PODE VOLTAR porque as fontes ainda existem",
    "Família e ambiente continuam drenando sua energia",
    "Vampiros energéticos ao seu redor (você nem sabe quem são)",
    "Herança energética negativa ainda ativa",
    "Sem proteção diária, você fica vulnerável novamente"
  ];

  const benefits = [
    { icon: <Shield className="w-5 h-5" />, text: "Ritual de Blindagem Ancestral (corta herança energética)" },
    { icon: <Clock className="w-5 h-5" />, text: "Protocolo de Proteção Diária (áudio de 5min)" },
    { icon: <Eye className="w-5 h-5" />, text: "Guia: Vampiros Energéticos (identifique quem te drena)" },
    { icon: <Droplets className="w-5 h-5" />, text: "7 Banhos de Descarrego (receitas completas e testadas)" },
    { icon: <CheckSquare className="w-5 h-5" />, text: "Checklist de Manutenção Mensal (proteção permanente)" }
  ];

  return (
    <div className="min-h-screen text-slate-100 overflow-x-hidden selection:bg-purple-500 selection:text-white relative bg-[#050505]">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] z-0"></div>
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      {/* Urgency Bar */}
      <motion.div 
        initial={{ y: -50 }} 
        animate={{ y: 0 }}
        className="bg-red-600 text-white text-xs md:text-sm font-bold text-center py-3 px-4 sticky top-0 z-50 shadow-2xl"
      >
        <div className="flex items-center justify-center gap-2 uppercase tracking-wider">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Clock className="w-4 h-4" />
          </motion.div>
          ⏰ ÚLTIMA OFERTA EXPIRA EM: 
          <span className="font-mono text-base md:text-lg">{formatTime(timeLeft)}</span>
        </div>
      </motion.div>

      <div className="max-w-2xl mx-auto px-4 pt-8 pb-32 relative z-10">
        
        {/* Confirmation Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-md text-emerald-400 px-4 py-2 rounded-full text-xs md:text-sm font-bold border border-emerald-500/30 shadow-lg uppercase tracking-wide">
            <Check className="w-4 h-4" /> ✅ Pedido Confirmado!
          </div>
        </motion.div>

        {/* Viewers Counter + Scarcity */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center justify-center gap-3 mb-8"
        >
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            {viewers} pessoas vendo esta oferta agora
          </div>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-red-900/30 border border-red-500/50 text-red-400 px-4 py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-wide"
          >
            🛡️ Apenas {spotsLeft} vagas de proteção restantes
          </motion.div>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-8 space-y-4"
        >
          <h1 className="text-3xl md:text-4xl font-serif font-black text-white leading-tight">
            <span className="text-red-500">⚠️ ATENÇÃO:</span> Você Vai Destravar...{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
              Mas o Bloqueio Pode VOLTAR
            </span>{' '}
            em 30-90 Dias
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            <strong className="text-white">78% das pessoas</strong> que destravaram voltaram a travar em menos de 3 meses. Por quê?
          </p>
        </motion.div>

        {/* Problems List */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-white/5 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6 mb-8"
        >
          <h3 className="text-lg md:text-xl font-serif font-bold text-white flex items-center gap-2 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-500" /> Por Que o Bloqueio Volta:
          </h3>
          <ul className="space-y-3">
            {problems.map((problem, idx) => (
              <motion.li
                key={idx}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 + idx * 0.1 }}
                className="flex items-start gap-3 text-sm md:text-base text-slate-200"
              >
                <span className="text-red-400 text-xl mt-0.5 flex-shrink-0">❌</span>
                <span>{problem}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Transition */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="text-center my-12"
        >
          <div className="inline-block">
            <h2 className="text-2xl md:text-3xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-[#FF9500] to-purple-400 mb-2">
              MAS E SE...
            </h2>
            <p className="text-slate-300 text-lg">
              Você se <strong className="text-purple-400">blindasse para sempre</strong>?
            </p>
          </div>
        </motion.div>

        {/* Solution/Mechanism */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="bg-gradient-to-br from-[#1a103c] to-[#0F0821] rounded-3xl p-6 md:p-8 mb-8 border border-purple-500/30 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-[#FF9500] to-purple-600 rounded-3xl blur opacity-20 animate-pulse"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-6">
              <div className="inline-block bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold text-xs px-4 py-1.5 rounded-full mb-4 shadow-lg uppercase tracking-wide">
                🛡️ Proteção Permanente
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-black text-white mb-2">
                Blindagem Energética Permanente
              </h2>
              <p className="text-purple-300 text-sm md:text-base">
                Nunca mais travar • <strong className="text-[#FF9500]">Proteção vitalícia</strong>
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-3 mb-6">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.7 + idx * 0.1 }}
                  className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/10"
                >
                  <div className="bg-purple-500/20 p-2 rounded-lg text-purple-400 flex-shrink-0">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                    >
                      {benefit.icon}
                    </motion.div>
                  </div>
                  <div className="flex-1">
                    <span className="text-emerald-400 font-bold text-lg mr-2">✅</span>
                    <span className="text-slate-200 text-sm md:text-base">{benefit.text}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Price Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2.2 }}
              className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 text-center border border-purple-500/30 mb-6"
            >
              <div className="mb-4">
                <span className="text-slate-500 text-sm md:text-base line-through block mb-2">
                  Valor normal: R$ 297,00
                </span>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-xl md:text-2xl text-slate-300">Hoje apenas</span>
                </div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-lg md:text-2xl text-white">R$</span>
                  <span className="text-6xl md:text-7xl font-black text-white tracking-tighter">67</span>
                </div>
                <p className="text-purple-400 text-xs md:text-sm font-bold mt-2 uppercase tracking-wider">
                  🛡️ 77% de desconto • Proteção vitalícia
                </p>
              </div>

              {/* BuckPay Integration */}
              <div style={{textAlign: 'center'}} id="buckpay-upsell-downsell-container">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{ 
                    boxShadow: [
                      '0 0 0 0 rgba(168, 85, 247, 0.7)',
                      '0 0 0 15px rgba(168, 85, 247, 0)',
                      '0 0 0 0 rgba(168, 85, 247, 0)'
                    ]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  id="buckpay-upsell-button"
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold text-lg md:text-xl py-5 px-8 rounded-xl shadow-2xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  🛡️ SIM, EU QUERO BLINDAGEM PERMANENTE!
                </motion.button>
              </div>

              <p className="text-xs text-slate-400 flex items-center justify-center gap-1 mt-3">
                <Lock className="w-3 h-3 text-green-500" /> Pagamento Seguro • Acesso Imediato
              </p>
            </motion.div>

            {/* Guarantee */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.4 }}
              className="bg-gradient-to-b from-[#1a103c] to-[#0F0821] p-6 rounded-2xl border border-[#D4AF37]/30 text-center"
            >
              <div className="bg-[#D4AF37]/20 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 text-[#D4AF37]">
                <Shield className="w-7 h-7" />
              </div>
              <h4 className="font-serif font-bold text-[#D4AF37] text-lg mb-2 uppercase">
                Garantia de 7 Dias
              </h4>
              <p className="text-sm text-slate-300">
                Se não sentir a proteção, devolvemos <strong className="text-white">100% do seu dinheiro</strong>. Sem perguntas.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Social Proof Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6 }}
          className="bg-white/5 backdrop-blur-xl p-5 rounded-xl border border-white/10 mb-8 shadow-lg"
        >
          <p className="text-[10px] text-purple-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
            <Star className="w-3 h-3 fill-purple-400" /> Depoimento Verificado
          </p>
          <p className="text-slate-200 text-sm italic leading-relaxed mb-2">
            "Depois da blindagem, nunca mais senti aquela sensação de 'peso'. Identificar os vampiros energéticos mudou minha vida completamente!"
          </p>
          <p className="text-slate-400 text-xs text-right">– Carlos M., Rio de Janeiro</p>
        </motion.div>

        {/* Enhanced Consequences Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8 }}
          className="bg-gradient-to-br from-red-900/30 to-red-950/20 backdrop-blur-sm border-2 border-red-500/40 rounded-2xl p-6 mb-8 shadow-2xl"
        >
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-red-400 font-bold text-lg mb-2">⚠️ O Que Acontece Sem Proteção:</h4>
              <ul className="space-y-2 text-slate-200 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Perda de energia constante e inexplicável</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Bloqueio volta em 30-90 dias (estatística comprovada)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Ciclo de estagnação se repete indefinidamente</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Vulnerável a vampiros energéticos no ambiente</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Herança energética familiar continua ativa</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-red-950/40 rounded-lg p-3 border border-red-500/30 text-center">
            <p className="text-red-300 text-xs font-bold">
              📊 <strong className="text-white">78% das pessoas</strong> voltam a travar sem proteção adequada
            </p>
          </div>
        </motion.div>

        {/* Decline Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0 }}
          className="text-center"
        >
          <button
            onClick={handleDecline}
            className="text-slate-500 hover:text-slate-400 text-sm underline transition-colors"
          >
            Não, obrigado. Vou arriscar sem proteção
          </button>
        </motion.div>
      </div>

      {/* Sticky Header Mobile - Price always visible */}
      {showStickyHeader && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 w-full bg-[#0a0a0a]/98 backdrop-blur-xl border-b border-purple-500/30 p-2 z-40 md:hidden shadow-2xl"
        >
          <div className="flex items-center justify-between max-w-lg mx-auto">
            <div className="flex flex-col">
              <span className="text-slate-500 line-through text-[9px]">R$ 297</span>
              <div className="flex items-baseline gap-1">
                <span className="font-black text-xl text-white">R$ 67</span>
                <span className="text-purple-400 text-[9px] font-bold">HOJE</span>
              </div>
            </div>
            <button
              onClick={() => {
                document.getElementById('buckpay-upsell-button')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold py-2 px-4 rounded-lg shadow-lg text-xs"
            >
              🛡️ BLINDAR
            </button>
          </div>
        </motion.div>
      )}

      {/* Exit Intent Popup */}
      {showExitIntent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setShowExitIntent(false)}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", damping: 15 }}
            className="bg-gradient-to-br from-[#1a103c] to-[#0F0821] rounded-3xl p-6 md:p-8 max-w-md w-full border-2 border-purple-500 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowExitIntent(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl"
            >
              ×
            </button>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl md:text-3xl font-serif font-black text-white mb-3">
                🛡️ <span className="text-purple-400">ÚLTIMA CHANCE!</span>
              </h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Desconto adicional de <strong className="text-purple-400">R$17</strong> para garantir sua proteção permanente nos próximos <strong>60 segundos</strong>!
              </p>
            </div>

            <div className="bg-black/40 rounded-2xl p-5 mb-6 text-center border border-purple-500/30">
              <div className="mb-3">
                <span className="text-slate-500 text-sm line-through block">De R$ 297</span>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-slate-400 text-lg line-through">R$ 67</span>
                  <span className="text-4xl font-black text-purple-400">R$ 50</span>
                </div>
                <p className="text-emerald-400 text-xs font-bold mt-2">
                  💰 Economia EXTRA de R$17 • Válido por 60s
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setShowExitIntent(false);
                window.location.href = 'https://checkout.mapaxamanicooficial.online/se-ssenta';
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold text-lg py-4 px-6 rounded-xl shadow-2xl hover:brightness-110 transition-all mb-3"
            >
              🛡️ QUERO PROTEÇÃO COM DESCONTO EXTRA!
            </button>

            <button
              onClick={() => setShowExitIntent(false)}
              className="text-slate-500 hover:text-slate-400 text-sm underline w-full"
            >
              Continuar sem o desconto extra
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Fixed Mobile Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-purple-500/30 p-3 z-50 md:hidden shadow-2xl pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          <div className="flex flex-col">
            <span className="text-slate-500 line-through text-[10px]">R$ 297</span>
            <div className="flex items-baseline gap-1">
              <span className="font-black text-2xl text-white">R$ 67</span>
              <span className="text-purple-400 text-[10px] font-bold">HOJE</span>
            </div>
          </div>
          <button
            onClick={() => {
              document.getElementById('buckpay-upsell-button')?.click();
            }}
            className="flex-1 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold py-3 px-4 rounded-xl shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2 text-sm"
          >
            BLINDAR AGORA <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </div>
  );
}

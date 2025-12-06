import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { Check, Shield, Lock, Clock, ChevronDown, BookOpen, Infinity, Headphones, HelpCircle, MessageCircle, Star, ArrowDown, Play } from 'lucide-react';

const ObjectionCard = ({ icon, title, text, color }: { icon: React.ReactNode, title: string, text: string, color: string }) => (
  <div className={`bg-white/5 backdrop-blur-xl p-5 rounded-2xl border-l-4 ${color} border-y border-r border-white/5 shadow-lg mb-4`}>
    <h3 className="font-bold text-white text-sm flex items-center gap-2 mb-2 font-serif">{icon} {title}</h3>
    <p className="text-xs text-slate-300 leading-relaxed font-light">{text}</p>
  </div>
);

const BonusCard = ({ icon, title, value, desc }: { icon: React.ReactNode, title: string, value: string, desc: string }) => (
  <div className="flex gap-4 bg-[#0F0821]/80 backdrop-blur-md p-5 rounded-2xl border border-white/10 items-start relative overflow-hidden group hover:border-[#FF9500]/30 transition-all duration-300">
    <div className="absolute top-0 right-0 bg-gradient-to-bl from-[#FF9500] to-orange-700 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-lg z-10">GRÁTIS</div>
    <div className="bg-gradient-to-br from-white/10 to-transparent p-3 rounded-xl border border-white/5 shadow-inner backdrop-blur-sm shrink-0">
      {icon}
    </div>
    <div className="flex-1 relative z-10">
      <h4 className="font-bold text-white text-sm mb-1 group-hover:text-[#FF9500] transition-colors">{title}</h4>
      <p className="text-xs text-slate-400 mb-2 flex items-center gap-2">
         <span className="line-through decoration-red-500/70 decoration-1 opacity-70">R$ {value}</span>
         <span className="text-green-400 font-bold bg-green-900/30 px-1.5 rounded text-[10px]">100% OFF</span>
      </p>
      <p className="text-xs text-slate-300 leading-snug font-light opacity-90">{desc}</p>
    </div>
  </div>
);

const VturbPlayer = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = `
      <vturb-smartplayer 
        id="vid-692d0662eb5ec5285cee0f8c" 
        style="display:block; width:100%; height:100%; object-fit: cover;"
      ></vturb-smartplayer>
    `;
    return () => { if (containerRef.current) containerRef.current.innerHTML = ''; };
  }, []);

  return (
    <div className="relative w-full max-w-[360px] mx-auto group my-6">
      <div className="absolute -inset-1 bg-gradient-to-r from-[#FF9500] via-purple-600 to-[#FF9500] rounded-[2.5rem] blur opacity-30 group-hover:opacity-50 transition duration-1000 animate-pulse"></div>
      <div className="relative w-full aspect-[9/16] bg-black rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 z-10">
        <div ref={containerRef} className="w-full h-full" />
      </div>
      <div className="absolute bottom-6 right-6 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:flex items-center gap-2 text-[10px] font-bold text-white bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
         <Play className="w-3 h-3 fill-white" /> LIGUE O SOM
      </div>
    </div>
  );
}, () => true);

export const Offer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [viewers, setViewers] = useState(342);

  useEffect(() => {
    if (!document.getElementById('vturb-script')) {
      const script = document.createElement('script');
      script.src = "https://scripts.converteai.net/c263b2f0-9566-42be-97d8-7f5920037741/players/692d0662eb5ec5285cee0f8c/v4/player.js";
      script.id = 'vturb-script';
      script.async = true;
      document.head.appendChild(script);
    }
    if (typeof (window as any).confetti === 'function') {
      setTimeout(() => {
        (window as any).confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ['#FF9500', '#FBBF24', '#FFFFFF'], zIndex: 100 });
      }, 500);
    }
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'ViewContent', { content_name: 'Oferta', value: 27, currency: 'BRL' });
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev <= 0 ? 0 : prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleCheckout = () => {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'AddToCart', { content_name: 'Mapa Xamânico', value: 27, currency: 'BRL' });
    }
    window.location.href = "https://seguropagamentos.com.br/oferta-principal";
  };

  const faqs = [
    { q: "Como funciona o Mapa Xamânico?", a: "O Mapa Xamânico é um PDF personalizado de 15-20 páginas criado especialmente para você usando Numerologia Cabalística." },
    { q: "Quando vou receber meu mapa?", a: "ACESSO IMEDIATO! Após a confirmação do pagamento, você recebe o link no email." },
    { q: "Preciso ter conhecimento espiritual?", a: "NÃO! O Mapa foi criado tanto para iniciantes quanto para praticantes avançados." },
    { q: "E se eu não gostar?", a: "GARANTIA INCONDICIONAL DE 7 DIAS. Devolvemos 100% do seu dinheiro." },
  ];

  return (
    <div className="min-h-screen pb-40 relative z-10 overflow-hidden">
      
      <motion.div initial={{ y: -50 }} animate={{ y: 0 }} className="bg-[#d20a0a] text-white text-xs font-bold text-center py-3 px-4 sticky top-0 z-50 shadow-xl flex items-center justify-center gap-2 uppercase tracking-widest">
        <Clock className="w-3 h-3 animate-pulse" /> OFERTA EXPIRA EM: <span className="font-mono text-base">{formatTime(timeLeft)}</span>
      </motion.div>

      <div className="max-w-xl mx-auto px-4 pt-8 space-y-12">

        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-green-500/10 backdrop-blur-md text-green-400 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold border border-green-500/20 shadow-lg uppercase tracking-wide">
            <Check className="w-3 h-3" /> Análise Concluída com Sucesso
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-black text-white leading-none drop-shadow-2xl">
            ATENÇÃO: Bloqueio <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Financeiro</span> Identificado
          </h1>
          <p className="text-slate-300 text-sm max-w-sm mx-auto">
            Assista ao vídeo abaixo para entender como destravar sua prosperidade em 7 dias.
          </p>
        </div>

        <div>
           <VturbPlayer />
           <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium mt-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              {viewers} pessoas assistindo agora
           </div>
        </div>

        <div className="bg-[#120a2e] rounded-[32px] p-6 text-center border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 via-[#FF9500] to-purple-800 rounded-[35px] blur opacity-20 animate-pulse group-hover:opacity-40 transition duration-1000"></div>
            
            <div className="relative z-10">
                <div className="inline-block bg-gradient-to-r from-[#FF9500] to-red-600 text-white font-bold text-[10px] px-3 py-1 rounded-full mb-4 shadow-lg uppercase">
                  Oferta Única
                </div>
                <h2 className="text-2xl font-serif font-black text-white mb-1">Mapa Xamânico</h2>
                <div className="my-6">
                  <span className="text-slate-500 text-sm line-through block mb-1">De R$ 197,00</span>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-xl text-slate-300">Por</span>
                    <span className="text-6xl font-black text-white tracking-tighter text-shadow-glow">R$27</span>
                  </div>
                </div>
                <Button onClick={handleCheckout} pulse className="w-full text-lg shadow-xl mb-3">
                  🔥 QUERO DESTRAVAR AGORA
                </Button>
                <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1 opacity-80">
                  <Lock className="w-3 h-3 text-green-500" /> Compra Segura • Acesso Imediato
                </p>
            </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-serif font-bold text-white text-xl text-center mb-4">
             <span className="text-[#FF9500]">🎁</span> Leve 3 Bônus Grátis
          </h3>
          <BonusCard icon={<BookOpen className="w-6 h-6 text-[#FF9500]" />} title="Guia de Desbloqueio" value="97" desc="30 exercícios práticos para destravar." />
          <BonusCard icon={<Headphones className="w-6 h-6 text-purple-400" />} title="Meditação de Limpeza" value="147" desc="Áudio de 20min para limpeza profunda." />
          <BonusCard icon={<Infinity className="w-6 h-6 text-blue-400" />} title="Acesso Vitalício" value="53" desc="Atualizações do Mapa sem custo." />
        </div>

        <div className="space-y-4 pt-6 border-t border-white/5">
           <ObjectionCard icon={<MessageCircle className="w-5 h-5 text-emerald-400" />} title="JÁ TENTEI TERAPIA" color="border-emerald-500" text="O Mapa foca na ENERGIA, não só na mente. É mais rápido e barato que sessões tradicionais." />
           <ObjectionCard icon={<HelpCircle className="w-5 h-5 text-purple-400" />} title="MEDO DE NÃO ENTENDER" color="border-purple-500" text="Linguagem simples para iniciantes. Zero 'tiques' religiosos." />
           <ObjectionCard icon={<Star className="w-5 h-5 text-blue-400" />} title="SOU CÉTICO" color="border-blue-500" text="O Mapa é matemática pura (Numerologia). Não exige crença para funcionar." />
        </div>

        <div className="bg-gradient-to-b from-[#1a103c] to-[#0F0821] p-6 rounded-3xl border border-[#D4AF37]/30 text-center relative overflow-hidden">
          <div className="bg-[#D4AF37]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
             <Shield className="w-8 h-8" />
          </div>
          <h4 className="font-serif font-bold text-[#D4AF37] text-lg mb-2 uppercase">Garantia de 7 Dias</h4>
          <p className="text-sm text-slate-300">
            Se não gostar, devolvemos <strong className="text-white">100% do seu dinheiro</strong>. Sem perguntas.
          </p>
        </div>

        <div className="space-y-3">
            <h3 className="text-center font-serif font-bold text-white mb-4">Dúvidas Frequentes</h3>
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-white/5 rounded-xl bg-white/5 p-4">
                <button onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)} className="w-full flex justify-between items-center text-left text-sm font-medium text-slate-200">
                  {faq.q} <ChevronDown className={`w-4 h-4 transition-transform ${activeAccordion === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeAccordion === idx && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
        </div>

        <div className="text-center pb-8">
           <Button onClick={handleCheckout} pulse className="w-full shadow-lg py-4">
              🔥 DESTRAVAR MINHA VIDA
           </Button>
        </div>

      </div>

      <div className="fixed bottom-0 left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-[#FF9500]/30 p-3 z-50 md:hidden shadow-2xl pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          <div className="flex flex-col">
             <span className="text-slate-500 line-through text-[10px]">R$ 197</span>
             <div className="flex items-baseline gap-1">
                <span className="font-black text-2xl text-white">R$ 27</span>
                <span className="text-[#FF9500] text-[10px] font-bold">HOJE</span>
             </div>
          </div>
          <button onClick={handleCheckout} className="flex-1 bg-gradient-to-r from-[#FF9500] to-orange-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2 text-sm">
            QUERO AGORA <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>

    </div>
  );
};
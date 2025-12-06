
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { Check, Shield, Lock, Clock, ChevronDown, BookOpen, Infinity, Headphones, HelpCircle, MessageCircle, Star, ArrowDown, Play, Award, ShieldCheck, MapPin, Heart, MoreHorizontal, Bookmark, Send } from 'lucide-react';

// --- COMPONENTES AUXILIARES INTEGRADOS ---

const InstagramPost = () => (
  <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden mb-6 text-white text-sm font-sans shadow-xl max-w-sm mx-auto w-full">
    <div className="flex items-center justify-between p-3 border-b border-white/5">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 p-[2px]">
          <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=150" className="w-full h-full rounded-full border-2 border-black object-cover" alt="xama" />
        </div>
        <span className="font-bold text-xs">xama_interior</span>
      </div>
      <MoreHorizontal className="w-4 h-4 text-gray-400" />
    </div>
    <div className="bg-white/5 p-3 text-gray-300 text-xs border-b border-white/5">
       <span className="font-bold text-white">xama_interior</span> ✨ Depoimentos de quem já destravou sua prosperidade...
    </div>
    <div className="px-3 py-3 space-y-3">
      <div className="flex gap-3">
        <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150" className="w-8 h-8 rounded-full object-cover" alt="user" />
        <div className="flex-1">
           <div className="flex items-baseline gap-2">
              <span className="font-bold text-xs text-white">neuro_titania</span>
              <span className="text-gray-400 text-[10px]">2h</span>
           </div>
           <p className="text-xs text-slate-200">Ahhh incrível!! amei o meu mapa. Mudou minha visão de mundo.</p>
        </div>
        <Heart className="w-3 h-3 text-gray-500" />
      </div>
      <div className="flex gap-3">
        <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150" className="w-8 h-8 rounded-full object-cover" alt="user" />
        <div className="flex-1">
           <div className="flex items-baseline gap-2">
              <span className="font-bold text-xs text-white">rafaelmoraes</span>
              <span className="text-gray-400 text-[10px]">5h</span>
           </div>
           <p className="text-xs text-slate-200">Já tive um encontro com meu animal guia, só quero ter certeza mesma. Mapa xamânico ❤️🙌🏻🙏</p>
        </div>
        <Heart className="w-3 h-3 text-gray-500" />
      </div>
    </div>
  </div>
);

const ObjectionCard = ({ icon, title, text, color, delay }: { icon: React.ReactNode, title: string, text: string, color: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className={`bg-white/5 backdrop-blur-xl p-6 rounded-2xl border-l-4 ${color} border-y border-r border-white/5 shadow-xl mb-4 relative overflow-hidden group`}
  >
    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 transition-opacity group-hover:opacity-50 opacity-20"></div>
    <h3 className="font-bold text-white text-lg flex items-center gap-3 mb-3 font-serif relative z-10">
      {icon} {title}
    </h3>
    <p className="text-sm text-slate-300 leading-relaxed font-light relative z-10">
      {text}
    </p>
  </motion.div>
);

const BonusCard = ({ icon, title, value, desc, delay }: { icon: React.ReactNode, title: string, value: string, desc: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="flex gap-4 bg-[#0F0821]/80 backdrop-blur-md p-5 rounded-2xl border border-white/10 items-start relative overflow-hidden group hover:border-[#FF9500]/30 transition-all duration-300"
  >
    <div className="absolute top-0 right-0 bg-gradient-to-bl from-[#FF9500] to-orange-700 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-lg z-10">GRÁTIS</div>
    
    {/* Icon Box */}
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
  </motion.div>
);

// --- COMPONENTE DO PLAYER (Cinema Mode - VERTICAL FIXED) ---
const VturbPlayer = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Injeção direta do elemento com estilo FORÇADO para vertical e celular
    containerRef.current.innerHTML = `
      <vturb-smartplayer 
        id="vid-692d0662eb5ec5285cee0f8c" 
        style="display:block; width:100%; height:100%; object-fit: cover;"
      ></vturb-smartplayer>
    `;

    return () => {
        if (containerRef.current) {
            containerRef.current.innerHTML = '';
        }
    };
  }, []);

  return (
    // FIXADO: max-w-[360px] (largura de celular)
    <div className="relative w-full max-w-[360px] mx-auto group">
      
      {/* Glow Behind */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#FF9500] via-purple-600 to-[#FF9500] rounded-[2.5rem] blur opacity-30 group-hover:opacity-50 transition duration-1000 animate-pulse"></div>
      
      {/* Player Container - FIXADO: aspect-[9/16] (vertical) */}
      <div className="relative w-full aspect-[9/16] bg-black rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 z-10">
        <div ref={containerRef} className="w-full h-full" />
      </div>

      {/* "Sound On" Hint */}
      <div className="absolute bottom-6 right-6 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:flex items-center gap-2 text-[10px] font-bold text-white bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
         <Play className="w-3 h-3 fill-white" /> LIGUE O SOM
      </div>
    </div>
  );
}, () => true);

// --- COMPONENTE PRINCIPAL DA OFERTA ---
export const Offer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [viewers, setViewers] = useState(342);
  const objectionsRef = useRef<HTMLDivElement>(null);
  const [hasViewedObjections, setHasViewedObjections] = useState(false);

  // Script Injection & Init
  useEffect(() => {
    // Carrega o script apenas se não existir
    if (!document.getElementById('vturb-script')) {
      const script = document.createElement('script');
      script.src = "https://scripts.converteai.net/c263b2f0-9566-42be-97d8-7f5920037741/players/692d0662eb5ec5285cee0f8c/v4/player.js";
      script.id = 'vturb-script';
      script.async = true;
      document.head.appendChild(script);
    }

    // Safely access confetti from window
    if (typeof (window as any).confetti === 'function') {
      setTimeout(() => {
        (window as any).confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FF9500', '#FBBF24', '#FFFFFF'],
          zIndex: 100
        });
      }, 500);
    }

    if (typeof window.fbq === 'function') {
      window.fbq('track', 'ViewContent', { 
        content_name: 'Oferta',
        value: 27,
        currency: 'BRL'
      });
    }
  }, []);

  // Timer Logic
  useEffect(() => {
    const storedTime = localStorage.getItem('offerTimer');
    const now = Date.now();
    let secondsRemaining = 15 * 60;

    if (storedTime) {
      const { targetTime } = JSON.parse(storedTime);
      const diff = Math.floor((targetTime - now) / 1000);
      if (diff <= 0) {
          const newTarget = now + (15 * 60 * 1000);
          localStorage.setItem('offerTimer', JSON.stringify({ targetTime: newTarget }));
          secondsRemaining = 15 * 60;
      } else {
          secondsRemaining = diff;
      }
    } else {
      const targetTime = now + (15 * 60 * 1000);
      localStorage.setItem('offerTimer', JSON.stringify({ targetTime }));
    }

    setTimeLeft(secondsRemaining);
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fake Viewers Logic
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
      window.fbq('track', 'AddToCart', { 
        content_name: 'Mapa Xamânico', 
        value: 27, 
        currency: 'BRL' 
      });
    }
    // LINK DO CHECKOUT INTEGRADO
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
      
      {/* Sticky Timer Bar */}
      <motion.div 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="bg-[#d20a0a] text-white text-xs font-bold text-center py-3 px-4 sticky top-0 z-50 shadow-[0_4px_20px_rgba(220,38,38,0.5)] flex items-center justify-center gap-2 uppercase tracking-widest"
      >
        <Clock className="w-3 h-3 animate-pulse" /> OFERTA EXPIRA EM: <span className="font-mono text-base">{formatTime(timeLeft)}</span>
      </motion.div>

      <div className="max-w-xl mx-auto px-4 space-y-16">

        {/* --- VSL SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4 pt-8 text-center"
        >
           <div className="inline-flex items-center gap-2 bg-green-500/10 backdrop-blur-md text-green-400 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold border border-green-500/20 shadow-lg uppercase tracking-wide mb-4">
            <Check className="w-3 h-3" /> Análise Concluída com Sucesso
           </div>
           <h1 className="text-3xl md:text-4xl font-serif font-black text-white leading-none drop-shadow-2xl">
            Seu Mapa Está Pronto! <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9500] via-yellow-400 to-[#FF9500]">
              Acesse Agora:
            </span>
           </h1>

           <VturbPlayer />
           
           <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              {viewers} pessoas assistindo agora
           </div>
        </motion.div>

        {/* --- PRICE ARTIFACT CARD --- */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 via-[#FF9500] to-purple-800 rounded-[35px] blur opacity-75 animate-pulse group-hover:opacity-100 transition duration-1000"></div>
          
          <div className="relative bg-[#0a0a0a] rounded-[34px] p-1 h-full">
             <div className="bg-[#120a2e] rounded-[32px] p-6 md:p-8 text-center h-full border border-white/10 shadow-2xl overflow-hidden relative">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                
                <div className="relative z-10">
                    <div className="inline-block bg-gradient-to-r from-[#FF9500] to-red-600 text-white font-bold text-[10px] md:text-xs px-4 py-1.5 rounded-full mb-6 shadow-lg tracking-widest uppercase border border-white/20">
                      Desconto Exclusivo de 86%
                    </div>

                    <h2 className="text-2xl md:text-3xl font-serif font-black text-white mb-2 drop-shadow-md">
                      ✨ Mapa Xamânico Completo
                    </h2>
                    
                    <div className="my-8 flex flex-col items-center justify-center">
                      <span className="text-slate-500 text-sm line-through decoration-slate-600/50 mb-1">De R$ 197,00</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl text-slate-300 font-light">Por</span>
                        <span className="text-7xl font-black text-white tracking-tighter drop-shadow-[0_0_25px_rgba(255,149,0,0.4)]">
                           <span className="text-3xl align-top mr-1">R$</span>27
                        </span>
                      </div>
                      <span className="text-[#FF9500] text-xs font-bold uppercase tracking-wider mt-2 bg-[#FF9500]/10 px-3 py-1 rounded border border-[#FF9500]/20">
                        Acesso Vitalício + 3 Bônus
                      </span>
                    </div>

                    <Button onClick={handleCheckout} pulse className="w-full text-lg md:text-xl shadow-[0_10px_40px_rgba(255,149,0,0.4)] hover:shadow-[0_15px_50px_rgba(255,149,0,0.6)]">
                      🔥 QUERO MEU MAPA AGORA
                    </Button>
                    <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1.5 mt-3 opacity-80">
                      <Lock className="w-3 h-3 text-green-500" /> Pagamento 100% Seguro • Acesso em 5min
                    </p>
                </div>
             </div>
          </div>
        </motion.div>

        {/* --- PROVA SOCIAL (INTEGRADA) --- */}
        <div className="space-y-6">
            <h3 className="text-center font-serif font-bold text-white text-lg">
                Quem já fez, <span className="text-[#FF9500]">recomenda</span>:
            </h3>
            <InstagramPost />
        </div>

        {/* --- BÔNUS STACK --- */}
        <div className="space-y-6">
          <div className="text-center mb-6">
             <h3 className="font-serif font-bold text-white text-xl flex items-center justify-center gap-2">
                <span className="text-[#FF9500] text-2xl">🎁</span> Você ganha 3 Bônus
             </h3>
             <p className="text-slate-400 text-xs">Apenas para quem garantir o mapa hoje.</p>
          </div>
          
          <BonusCard icon={<BookOpen className="w-6 h-6 text-[#FF9500]" />} title="Guia Prático de Desbloqueio" value="97" desc="30 exercícios práticos para aplicar hoje mesmo." delay={0.1} />
          <BonusCard icon={<Headphones className="w-6 h-6 text-purple-400" />} title="Meditação de Limpeza" value="147" desc="Áudio de 20min com a voz da Anahí." delay={0.2} />
          <BonusCard icon={<Infinity className="w-6 h-6 text-blue-400" />} title="Acesso Vitalício" value="53" desc="Novas versões e atualizações do Mapa sem custo." delay={0.3} />
        </div>

        {/* --- AUTORIDADE (INTEGRADA) --- */}
        <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 text-center relative overflow-hidden my-8">
            <div className="w-24 h-24 mx-auto rounded-full border-2 border-[#FF9500] p-1 mb-4 relative z-10">
                <img src="/expert.jpg" className="w-full h-full rounded-full object-cover" onError={(e) => e.currentTarget.src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=388&auto=format&fit=crop"} alt="Expert" />
            </div>
            <h3 className="font-serif font-bold text-white text-lg mb-2">Anahí Solara</h3>
            <p className="text-xs text-[#FF9500] font-bold uppercase tracking-widest mb-4">Xamã & Terapeuta Holística</p>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
                "Há 12 anos ajudo pessoas a destravarem sua prosperidade. O Mapa não é só leitura, é um caminho prático de cura."
            </p>
            <div className="flex justify-center gap-2 text-[10px] text-slate-400">
                <span className="flex items-center gap-1"><Award className="w-3 h-3" /> 12 Anos Exp.</span>
                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> 20k Alunos</span>
            </div>
        </div>

        {/* --- OBJECTIONS --- */}
        <div className="space-y-6 pt-10 border-t border-white/5" ref={objectionsRef}>
           <h3 className="text-2xl font-serif font-bold text-white text-center mb-8">
             Por que o Mapa Xamânico funciona?
           </h3>
           <ObjectionCard icon={<MessageCircle className="w-6 h-6 text-emerald-400" />} title="JÁ TENTEI TERAPIA" color="border-emerald-500" delay={0.1} text="Terapias tradicionais focam na mente. O Mapa foca na ENERGIA." />
           <ObjectionCard icon={<HelpCircle className="w-6 h-6 text-purple-400" />} title="TENHO MEDO DE NÃO ENTENDER" color="border-purple-500" delay={0.2} text="Fique tranquilo(a). O PDF foi desenhado para iniciantes." />
        </div>

        {/* --- GARANTIA --- */}
        <motion.div 
          whileInView={{ y: [20, 0], opacity: [0, 1] }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-b from-[#1a103c] to-[#0F0821] p-8 rounded-3xl border border-[#D4AF37]/30 shadow-[0_0_40px_rgba(212,175,55,0.05)] text-center overflow-hidden group"
        >
          <div className="bg-gradient-to-br from-[#D4AF37] to-yellow-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl text-white ring-4 ring-[#D4AF37]/20">
             <Shield className="w-10 h-10" />
          </div>
          <h4 className="font-serif font-bold text-[#D4AF37] text-xl mb-4 tracking-wide uppercase">Garantia Incondicional</h4>
          <p className="text-sm text-slate-300 leading-relaxed mb-6 font-light px-2">
            Teste por <strong className="text-white">7 dias</strong>. Se você não sentir clareza, devolvemos <strong className="text-white underline decoration-[#D4AF37]">100% do seu dinheiro</strong>.
          </p>
        </motion.div>

        {/* --- FAQ --- */}
        <div className="space-y-4 pt-10 pb-8">
          <h3 className="text-2xl font-serif font-bold text-white mb-8 text-center flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#FF9500]" /> Dúvidas Frequentes
          </h3>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-white/5 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/10">
                <button 
                  onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-5 text-left font-medium text-slate-200"
                >
                  <span className="pr-4 text-sm md:text-base leading-snug">{faq.q}</span>
                  <div className={`w-6 h-6 rounded-full border border-white/20 flex items-center justify-center shrink-0 transition-all duration-300 ${activeAccordion === idx ? 'bg-[#FF9500] border-[#FF9500] text-white rotate-180' : 'text-slate-400'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                <AnimatePresence>
                  {activeAccordion === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed border-t border-white/5 font-light pt-2">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* CTA FINAL */}
        <div className="text-center pb-8">
           <Button onClick={handleCheckout} pulse className="w-full shadow-[0_0_50px_rgba(255,149,0,0.3)] text-xl py-5">
              🔥 DESTRAVAR MINHA VIDA AGORA
           </Button>
           <p className="text-[10px] text-slate-500 mt-4 uppercase tracking-widest opacity-60">
             Site Seguro • Privacidade Protegida
           </p>
        </div>

      </div>

      {/* --- STICKY MOBILE BAR (Clean & High Conversion) --- */}
      <div className="fixed bottom-0 left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-[#FF9500]/30 p-3 z-50 md:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.8)] pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          <div className="flex flex-col">
             <span className="text-slate-500 line-through text-[10px]">R$ 197</span>
             <div className="flex items-baseline gap-1">
                <span className="font-black text-2xl text-white">R$ 27</span>
                <span className="text-[#FF9500] text-[10px] font-bold">HOJE</span>
             </div>
          </div>
          <button 
            onClick={handleCheckout}
            className="flex-1 bg-gradient-to-r from-[#FF9500] to-orange-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            QUERO AGORA <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>

    </div>
  );
};

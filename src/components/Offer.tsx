import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { Check, Shield, Lock, Clock, ChevronDown, BookOpen, Infinity, Headphones, HelpCircle, MessageCircle, Star, ArrowDown, Play } from 'lucide-react';

// --- COMPONENTES AUXILIARES ---

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

// --- COMPONENTE DO PLAYER (Cinema Mode) ---
const VturbPlayer = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Using innerHTML string injection to create the custom element.
    // This is the most robust way to prevent React from attaching internal properties 
    // or attempting to serialize circular references on the Web Component.
    if (!containerRef.current) return;
    
    containerRef.current.innerHTML = `
      <vturb-smartplayer 
        id="vid-692d0662eb5ec5285cee0f8c" 
        style="display:block; width:100%; height:100%;"
      ></vturb-smartplayer>
    `;

    return () => {
        // Cleanup on unmount
        if (containerRef.current) {
            containerRef.current.innerHTML = '';
        }
    };
  }, []);

  return (
    <div className="relative w-full max-w-3xl mx-auto group">
      {/* Glow Behind */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#FF9500] via-purple-600 to-[#FF9500] rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 animate-pulse"></div>
      
      {/* Player Container */}
      <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10 z-10">
        <div ref={containerRef} className="w-full h-full" />
      </div>

      {/* "Sound On" Hint */}
      <div className="absolute bottom-4 right-4 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:flex items-center gap-2 text-[10px] font-bold text-white bg-black/60 px-2 py-1 rounded-full backdrop-blur-sm">
         <Play className="w-3 h-3 fill-white" /> LIGUE O SOM
      </div>
    </div>
  );
}, () => true);

// --- COMPONENTE PRINCIPAL ---
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

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasViewedObjections) {
            if (typeof window.fbq === 'function') {
              window.fbq('trackCustom', 'ViewedObjections');
            }
            setHasViewedObjections(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (objectionsRef.current) {
      observer.observe(objectionsRef.current);
    }

    return () => {
      if (objectionsRef.current) observer.unobserve(objectionsRef.current);
    };
  }, [hasViewedObjections]);

  // Timer Logic
  useEffect(() => {
    const storedTime = localStorage.getItem('offerTimer');
    const now = Date.now();
    let secondsRemaining = 15 * 60;

    if (storedTime) {
      const { targetTime } = JSON.parse(storedTime);
      const diff = Math.floor((targetTime - now) / 1000);
      // If time expired or invalid, reset.
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
    // 👇 LINK DO CHECKOUT AQUI 👇
    // window.location.href = "https://pay.hotmart.com/SEU_LINK_AQUI"; 
    alert("Redirecionando para checkout seguro... (Configure o link no código)");
  };

  const faqs = [
    { q: "Como funciona o Mapa Xamânico?", a: "O Mapa Xamânico é um PDF personalizado de 15-20 páginas criado especialmente para você usando Numerologia Cabalística. Inserimos seu nome completo e data de nascimento em cálculos ancestrais que revelam seus bloqueios energéticos, dons naturais e caminho de prosperidade." },
    { q: "Quando vou receber meu mapa?", a: "ACESSO IMEDIATO! Após a confirmação do pagamento (que leva até 5 minutos), você recebe o link para download do seu PDF personalizado direto no email." },
    { q: "Preciso ter conhecimento espiritual?", a: "NÃO! O Mapa foi criado tanto para iniciantes quanto para praticantes avançados. A linguagem é clara, intuitiva e acompanha explicações práticas para você aplicar no dia a dia." },
    { q: "Como é feita a personalização?", a: "Usamos seu nome completo e data de nascimento para fazer cálculos numerológicos baseados na Kaballah. Cada nome e data gera um mapa único - literalmente impossível ter 2 mapas iguais." },
    { q: "Posso pagar parcelado?", a: "SIM! Aceitamos cartão de crédito em até 12x de R$3,08 (total R$27). Também aceitamos PIX para pagamento à vista." },
    { q: "E se eu não gostar?", a: "GARANTIA INCONDICIONAL DE 7 DIAS. Se por qualquer motivo você não ficar satisfeito, basta enviar um email e devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia." },
    { q: "É seguro comprar online?", a: "TOTALMENTE SEGURO! Usamos a Hotmart, maior plataforma da América Latina, com criptografia SSL. Seus dados estão 100% protegidos." },
    { q: "Tem suporte se eu tiver dúvidas?", a: "SIM! Nossa equipe responde em até 2 horas por email. Você nunca fica sozinho(a) nessa jornada." }
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

      {/* Hero / Headline Section */}
      <div className="relative pt-12 pb-6 px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-green-500/10 backdrop-blur-md text-green-400 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold mb-6 border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.15)] uppercase tracking-wide"
        >
          <Check className="w-3 h-3" /> Análise Concluída com Sucesso
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-5xl font-serif font-black text-white mb-4 leading-none drop-shadow-2xl max-w-2xl mx-auto"
        >
          Seu Mapa Está Pronto! <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9500] via-yellow-400 to-[#FF9500] filter drop-shadow-lg">
            Acesse Agora:
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-slate-300 text-sm md:text-base max-w-md mx-auto leading-relaxed"
        >
          Descubra seus bloqueios e o plano prático para <span className="text-white font-bold decoration-[#FF9500] underline underline-offset-4 decoration-2">destravar sua vida</span> em 7 dias.
        </motion.p>
      </div>

      <div className="max-w-xl mx-auto px-4 space-y-16">

        {/* --- VSL SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
           <VturbPlayer />
           
           {/* Viewers Count */}
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
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative group"
        >
          {/* Background Shimmer */}
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 via-[#FF9500] to-purple-800 rounded-[35px] blur opacity-75 animate-pulse group-hover:opacity-100 transition duration-1000"></div>
          
          <div className="relative bg-[#0a0a0a] rounded-[34px] p-1 h-full">
             <div className="bg-[#120a2e] rounded-[32px] p-6 md:p-8 text-center h-full border border-white/10 shadow-2xl overflow-hidden relative">
                
                {/* Mystic Texture BG */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#FF9500]/10 rounded-full blur-[60px]"></div>

                {/* Badge */}
                <div className="relative z-10 inline-block bg-gradient-to-r from-[#FF9500] to-red-600 text-white font-bold text-[10px] md:text-xs px-4 py-1.5 rounded-full mb-6 shadow-lg tracking-widest uppercase border border-white/20">
                  Desconto Exclusivo de 86%
                </div>

                <h2 className="relative z-10 text-2xl md:text-3xl font-serif font-black text-white mb-2 drop-shadow-md">
                  ✨ Mapa Xamânico Completo
                </h2>
                
                <div className="relative z-10 my-8 flex flex-col items-center justify-center">
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

                {/* MAIN CTA */}
                <div className="relative z-10">
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

        {/* --- BONUSES STACK --- */}
        <div className="space-y-6">
          <div className="text-center mb-6">
             <h3 className="font-serif font-bold text-white text-xl flex items-center justify-center gap-2">
                <span className="text-[#FF9500] text-2xl">🎁</span> Você ganha 3 Bônus
             </h3>
             <p className="text-slate-400 text-xs">Apenas para quem garantir o mapa hoje.</p>
          </div>
          
          <BonusCard 
            icon={<BookOpen className="w-6 h-6 text-[#FF9500]" />}
            title="Guia Prático de Desbloqueio"
            value="97"
            desc="30 exercícios práticos para aplicar hoje mesmo e destravar seus bloqueios."
            delay={0.1}
          />
          <BonusCard 
            icon={<Headphones className="w-6 h-6 text-purple-400" />}
            title="Meditação de Limpeza Xamânica"
            value="147"
            desc="Áudio de 20min com a voz da Anahí para limpeza energética profunda."
            delay={0.2}
          />
          <BonusCard 
            icon={<Infinity className="w-6 h-6 text-blue-400" />}
            title="Acesso Vitalício + Atualizações"
            value="53"
            desc="Novas versões e atualizações do Mapa sem custo adicional."
            delay={0.3}
          />

          <motion.div 
            whileInView={{ scale: [0.95, 1.05, 1] }}
            className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-500/20 text-center mt-6 backdrop-blur-sm"
          >
            <p className="text-sm font-bold text-white">VALOR TOTAL DOS BÔNUS: <span className="text-emerald-400 line-through decoration-white/50">R$ 297</span></p>
            <p className="text-xs text-emerald-200/80 mt-1">Você leva tudo isso <strong className="text-emerald-300 uppercase">de graça</strong> agora.</p>
          </motion.div>
        </div>

        {/* --- OBJECTIONS --- */}
        <div className="space-y-6 pt-10 border-t border-white/5" ref={objectionsRef}>
           <h3 className="text-2xl font-serif font-bold text-white text-center mb-8">
             Por que o Mapa Xamânico funciona?
           </h3>
           
           <ObjectionCard 
             icon={<MessageCircle className="w-6 h-6 text-emerald-400" />} 
             title="JÁ TENTEI TERAPIA E NÃO FUNCIONOU"
             color="border-emerald-500"
             delay={0.1}
             text="Terapias tradicionais focam na mente. O Mapa Xamânico foca na ENERGIA. Enquanto sessões custam R$300, o Mapa entrega diagnóstico completo em minutos usando sabedoria ancestral."
           />

           <ObjectionCard 
             icon={<HelpCircle className="w-6 h-6 text-purple-400" />} 
             title="TENHO MEDO DE NÃO ENTENDER"
             color="border-purple-500"
             delay={0.2}
             text="Fique tranquilo(a). O PDF foi desenhado para iniciantes, com linguagem simples e zero 'tiques' religiosos. Testado com +20 mil pessoas comuns que buscavam autoconhecimento."
           />

           <ObjectionCard 
             icon={<Star className="w-6 h-6 text-blue-400" />} 
             title="SOU INICIANTE / CÉTICO"
             color="border-blue-500"
             delay={0.3}
             text="O Mapa é baseado em cálculos matemáticos (Numerologia Cabalística), não em crença cega. É uma ferramenta lógica e prática para identificar padrões. Funciona mesmo se você nunca meditou."
           />
        </div>

        {/* CTA Intermediário */}
        <div className="py-8 text-center">
           <Button onClick={handleCheckout} className="w-full shadow-lg">
              🔥 QUERO MEU MAPA AGORA
           </Button>
           <div className="flex justify-center mt-6 gap-4 grayscale opacity-50">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-5" alt="PayPal" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" className="h-5" alt="Mastercard" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-5" alt="Visa" />
           </div>
        </div>

        {/* --- GUARANTEE --- */}
        <motion.div 
          whileInView={{ y: [20, 0], opacity: [0, 1] }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-b from-[#1a103c] to-[#0F0821] p-8 rounded-3xl border border-[#D4AF37]/30 shadow-[0_0_40px_rgba(212,175,55,0.05)] text-center overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="bg-gradient-to-br from-[#D4AF37] to-yellow-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl text-white ring-4 ring-[#D4AF37]/20">
             <Shield className="w-10 h-10" />
          </div>
          
          <h4 className="font-serif font-bold text-[#D4AF37] text-xl mb-4 tracking-wide uppercase">Garantia Incondicional</h4>
          
          <p className="text-sm text-slate-300 leading-relaxed mb-6 font-light px-2">
            Teste por <strong className="text-white">7 dias</strong>. Se você não sentir clareza, não gostar do design ou simplesmente mudar de ideia, devolvemos <strong className="text-white underline decoration-[#D4AF37]">100% do seu dinheiro</strong>.
          </p>

          <p className="text-xs text-slate-400 italic font-medium bg-white/5 inline-block px-4 py-2 rounded-lg">
            Risco Zero. Ou você ama, ou é de graça.
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
                  onClick={() => {
                    setActiveAccordion(activeAccordion === idx ? null : idx);
                    if (activeAccordion !== idx && typeof window.fbq === 'function') {
                      window.fbq('trackCustom', 'OpenedFAQ');
                    }
                  }}
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
      {/* Updated to use safe-area-inset-bottom for proper spacing on iPhone X+ */}
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
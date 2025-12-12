import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { Check, Shield, Lock, Clock, HelpCircle, Star, ArrowDown, Play } from 'lucide-react';
import { QuizPath } from '../types';

// Dicionário de Conteúdo Dinâmico
const offerContent = {
  finance: {
    headline: "Bloqueio Financeiro Identificado: Aqui Está o Motivo Real da Sua Estagnação",
    subheadline: "Assista ao vídeo abaixo para entender como desbloquear sua vida em 7 dias — no dinheiro, no amor e em todas as áreas que importam.",
    painMechanism: "Reprogramação Financeira Emocional",
    painPoints: [
      "Dinheiro entra e some",
      "Ciclos de avanço e queda",
      "Medo de crescimento",
      "Peso financeiro familiar"
    ],
    modules: [
      "DIA 1 — O Diagnóstico da Raiz Financeira",
      "DIA 2 — A Virada Mental",
      "DIA 3 — Método do Dinheiro que Sobra",
      "DIA 4 — Proteção Contra Autossabotagem",
      "DIA 5 — Construindo Renda Real",
      "DIA 6 — Plano do Crescimento Contínuo",
      "DIA 7 — O Renascimento Financeiro"
    ],
    bonuses: [
      { title: "Guia de Mentalidade de Riqueza", value: "97", desc: "Quebra instantânea de crenças limitantes." },
      { title: "Meditação de Alinhamento", value: "147", desc: "Ativa foco, força e clareza financeira." },
      { title: "Acesso Vitalício", value: "53", desc: "Aprenda no seu tempo." }
    ],
    objections: [
      { title: "JÁ TENTEI DE TUDO", text: "Você tentou técnica. Aqui trabalhamos emoção + técnica, o que funciona." },
      { title: "NÃO SEI SE VOU ENTENDER", text: "Linguagem simples, direta, zero complicação." },
      { title: "TENHO MEDO DE INVESTIR", text: "Por isso existe garantia de 7 dias. Risco zero." }
    ],
    cta: "DESTRAVAR MINHAS FINANÇAS AGORA"
  },
  relationship: {
    headline: "Bloqueio Relacional Identificado: Aqui Está o Motivo Real dos Seus Ciclos Emocionais",
    subheadline: "Assista ao vídeo abaixo para entender como desbloquear sua vida em 7 dias — no dinheiro, no amor e em todas as áreas que importam.",
    painMechanism: "Reprogramação Afetiva",
    painPoints: [
      "Medo de abandono",
      "Atração por relações desequilibradas",
      "Crenças de não merecimento",
      "Ciclos familiares repetidos"
    ],
    modules: [
      "DIA 1 — O Diagnóstico do Padrão Amoroso",
      "DIA 2 — A Cura do Seu Valor",
      "DIA 3 — Atração Consciente",
      "DIA 4 — Reprogramando seu Afeto",
      "DIA 5 — Relacionamentos Leves",
      "DIA 6 — Blindagem Emocional",
      "DIA 7 — A Nova Versão de Você no Amor"
    ],
    bonuses: [
      { title: "Guia do Amor Recíproco", value: "97", desc: "O que procurar (e evitar) em qualquer relação." },
      { title: "Meditação de Cura Emocional", value: "147", desc: "Transforma dores antigas em força emocional." },
      { title: "Acesso Vitalício", value: "53", desc: "Para sempre seu." }
    ],
    objections: [
      { title: "MEDO DE ME MACHUCAR", text: "Por isso o método começa pela cura interna e blindagem." },
      { title: "E SE EU NÃO MUDAR?", text: "Você vai, porque agora entende a raiz do problema." },
      { title: "JÁ TENTEI OUTRAS COISAS", text: "Aqui não é teoria — é transformação emocional prática." }
    ],
    cta: "CURAR MEU CORAÇÃO AGORA"
  }
};

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

interface OfferProps {
  quizPath?: QuizPath;
}

export const Offer: React.FC<OfferProps> = ({ quizPath = 'finance' }) => {
  const content = offerContent[quizPath] || offerContent.finance;
  const [timeLeft, setTimeLeft] = useState(15 * 60);
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
      window.fbq('track', 'ViewContent', { content_name: `Oferta ${quizPath}`, value: 37, currency: 'BRL' });
    }
  }, [quizPath]);

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
      window.fbq('track', 'AddToCart', { content_name: `Mapa Xamânico (${quizPath})`, value: 37, currency: 'BRL' });
    }
    window.location.href = "https://seguropagamentos.com.br/oferta-principal";
  };

  return (
    <div className="min-h-screen pb-40 relative z-10 overflow-hidden">
      
      <motion.div initial={{ y: -50 }} animate={{ y: 0 }} className="bg-[#d20a0a] text-white text-xs font-bold text-center py-3 px-4 sticky top-0 z-50 shadow-xl flex items-center justify-center gap-2 uppercase tracking-widest">
        <Clock className="w-3 h-3 animate-pulse" /> OFERTA EXPIRA EM: <span className="font-mono text-base">{formatTime(timeLeft)}</span>
      </motion.div>

      <div className="max-w-xl mx-auto px-4 pt-8 space-y-12">

        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-green-500/10 backdrop-blur-md text-green-400 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold border border-green-500/20 shadow-lg uppercase tracking-wide">
            <Check className="w-3 h-3" /> Análise Concluída
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-black text-white leading-tight drop-shadow-2xl">
            {content.headline}
          </h1>
          <p className="text-slate-300 text-sm max-w-sm mx-auto leading-relaxed">
            {content.subheadline}
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

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-left space-y-4">
            <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-500" /> Padrão Oculto Identificado
            </h3>
            <p className="text-sm text-slate-300">
                Identificamos sinais claros de <strong>{content.painMechanism}</strong> pendente:
            </p>
            <ul className="space-y-2">
                {content.painPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-200">
                        <span className="text-red-400 mt-1">✖</span> {point}
                    </li>
                ))}
            </ul>
        </div>

        <div className="bg-[#120a2e] rounded-[32px] p-6 text-center border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 via-[#FF9500] to-purple-800 rounded-[35px] blur opacity-20 animate-pulse group-hover:opacity-40 transition duration-1000"></div>
            
            <div className="relative z-10">
                <div className="inline-block bg-gradient-to-r from-[#FF9500] to-red-600 text-white font-bold text-[10px] px-3 py-1 rounded-full mb-4 shadow-lg uppercase">
                  Oferta Exclusiva
                </div>
                <h2 className="text-2xl font-serif font-black text-white mb-1">Destravamento em 7 Dias</h2>
                <div className="my-6">
                  <span className="text-slate-500 text-sm line-through block mb-1">De R$ 197,00</span>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-xl text-slate-300">Por</span>
                    <span className="text-6xl font-black text-white tracking-tighter text-shadow-glow">R$37</span>
                  </div>
                </div>
                <Button onClick={handleCheckout} pulse className="w-full text-lg shadow-xl mb-3">
                  🔥 {content.cta}
                </Button>
                <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1 opacity-80">
                  <Lock className="w-3 h-3 text-green-500" /> Compra Segura • Acesso Imediato
                </p>
            </div>
        </div>

        <div className="space-y-4">
            <h3 className="text-center font-serif font-bold text-white text-lg">O Programa Inclui:</h3>
            <div className="grid gap-3">
                {content.modules.map((mod, idx) => (
                    <div key={idx} className="bg-white/5 p-3 rounded-xl border border-white/5 flex items-center gap-3 text-sm text-slate-200">
                        <span className="bg-[#FF9500]/20 text-[#FF9500] text-xs font-bold px-2 py-1 rounded">Dia {idx + 1}</span>
                        {mod.replace(/DIA \d+ — /, '')}
                    </div>
                ))}
            </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-serif font-bold text-white text-xl text-center mb-4">
             <span className="text-[#FF9500]">🎁</span> Bônus Exclusivos
          </h3>
          {content.bonuses.map((bonus, idx) => (
             <div key={idx} className="flex gap-4 bg-[#0F0821]/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 items-start">
                <div className="bg-gradient-to-br from-white/10 to-transparent p-3 rounded-xl border border-white/5 shadow-inner shrink-0">
                    <Star className="w-5 h-5 text-[#FF9500]" />
                </div>
                <div>
                    <h4 className="font-bold text-white text-sm mb-1">{bonus.title}</h4>
                    <p className="text-xs text-slate-300">{bonus.desc}</p>
                    <span className="text-[10px] text-green-400 font-bold bg-green-900/30 px-1.5 rounded mt-1 inline-block">GRÁTIS (Era R${bonus.value})</span>
                </div>
             </div>
          ))}
        </div>

        <div className="space-y-4 pt-6 border-t border-white/5">
           {content.objections.map((obj, idx) => (
               <div key={idx} className={`bg-white/5 backdrop-blur-xl p-5 rounded-2xl border-l-4 border-purple-500 border-y border-r border-white/5 shadow-lg mb-4`}>
                <h3 className="font-bold text-white text-sm flex items-center gap-2 mb-2 font-serif"><HelpCircle className="w-4 h-4" /> {obj.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-light">{obj.text}</p>
              </div>
           ))}
        </div>

        <div className="bg-gradient-to-b from-[#1a103c] to-[#0F0821] p-6 rounded-3xl border border-[#D4AF37]/30 text-center relative overflow-hidden">
          <div className="bg-[#D4AF37]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
             <Shield className="w-8 h-8" />
          </div>
          <h4 className="font-serif font-bold text-[#D4AF37] text-lg mb-2 uppercase">Garantia de 7 Dias</h4>
          <p className="text-sm text-slate-300">
            Se não sentir a mudança, devolvemos <strong className="text-white">100% do seu dinheiro</strong>. Sem perguntas.
          </p>
        </div>

        <div className="text-center pb-8">
           <Button onClick={handleCheckout} pulse className="w-full shadow-lg py-4">
              🔥 {content.cta}
           </Button>
        </div>

      </div>

      <div className="fixed bottom-0 left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-[#FF9500]/30 p-3 z-50 md:hidden shadow-2xl pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          <div className="flex flex-col">
             <span className="text-slate-500 line-through text-[10px]">R$ 197</span>
             <div className="flex items-baseline gap-1">
                <span className="font-black text-2xl text-white">R$ 37</span>
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
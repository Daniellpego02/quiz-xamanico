import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { Check, Shield, Lock, Clock, Star, ArrowDown, Play, Calendar, Headphones, Jar, ShieldCheck, Magnet, TrendingUp, Butterfly } from 'lucide-react';
import { QuizPath } from '../types';
import Veredito from './Veredito';
import SocialProof from './SocialProof';

// Dicionário de Conteúdo Dinâmico - NOVA ESTRUTURA VERSÃO FILEMON
const offerContent = {
  finance: {
    // Bloco Hero/Veredito já é componente separado
    vslId: "vid-693f17c2b7fea67f333de06f",
    
    // Bloco 2: Entrega - Protocolo de 7 Dias
    deliveryTitle: "ISTO NÃO É UM CURSO. É UM PROTOCOLO DE ATIVAÇÃO DE 7 DIAS.",
    deliverables: [
      { icon: Calendar, day: 1, title: "O Raio-X da Sua Alma", desc: "Localizando a raiz exata do trauma que seus pais deixaram em você" },
      { icon: Headphones, day: 2, title: "A Técnica de Limpeza do Subconsciente", desc: "Áudio Binaural para remover o medo de faltar dinheiro" },
      { icon: Jar, day: 3, title: "O Ritual do Pote de Ouro", desc: "A técnica prática para fazer o dinheiro parar na sua mão" },
      { icon: ShieldCheck, day: 4, title: "Blindagem Energética", desc: "Como nunca mais perder o que você conquistou" },
      { icon: Magnet, day: 5, title: "Ativação do Imã de Prosperidade", desc: "Reprogramação para atrair oportunidades" },
      { icon: TrendingUp, day: 6, title: "Plano do Crescimento Contínuo", desc: "Mantendo o fluxo aberto" },
      { icon: Butterfly, day: 7, title: "A Sua Nova Identidade Financeira", desc: "O Renascimento" }
    ],
    
    // Bloco 3: Prova Social
    socialProofTitle: "NÃO ACREDITE EM MIM. VEJA O SALDO BANCÁRIO DE QUEM ATIVOU O MAPA:",
    
    // Bloco 4: Bônus
    bonusTitle: "LIBERANDO SEU ACESSO HOJE, VOCÊ GANHA 2 PRESENTES DE OURO:",
    bonuses: [
      { 
        icon: "🎁", 
        title: "Áudio de Socorro Financeiro", 
        desc: "O que ouvir 5 minutos antes de pagar uma conta ou negociar uma dívida para não vibrar na escassez.", 
        value: "97" 
      },
      { 
        icon: "🎁", 
        title: "O Código da Cama do Dinheiro", 
        desc: "Feng Shui Xamânico: Como preparar seu quarto para atrair riqueza enquanto você dorme.", 
        value: "47" 
      }
    ],
    
    // Bloco 5: Oferta/Checkout
    offerTitle: "O ACESSO AO SEU MAPA ESTÁ LIBERADO POR TEMPO LIMITADO",
    priceOld: "197,00",
    priceNew: "37,00",
    cta: "🔓 DESTRAVAR MEU MAPA AGORA ➔",
    ctaSubtext: "Acesso Imediato ao PDF + App",
    
    // Bloco 6: Garantia
    guaranteeTitle: "GARANTIA BLINDADA DE 7 DIAS",
    guaranteeText: "Eu assumo o risco. Entre, gere seu mapa e faça o protocolo de 7 dias. Se você não sentir um peso saindo das costas e não ver sinais claros de dinheiro aparecendo na sua vida em uma semana, eu devolvo 100% do seu dinheiro. Você não paga pelo que não funciona.",
    
    // Bloco 7: FAQ
    faqs: [
      { 
        question: "É um curso? Eu não tenho tempo.", 
        answer: "Não. É uma ferramenta de diagnóstico e um protocolo guiado. Você precisa de apenas 10 minutos por dia." 
      },
      { 
        question: "Funciona para quem está muito endividado?", 
        answer: "Sim. O Mapa foi desenhado exatamente para quem está no 'Modo Sobrevivência'." 
      },
      { 
        question: "Como eu recebo o acesso?", 
        answer: "Imediatamente no seu e-mail após a confirmação do pagamento." 
      }
    ]
  },
  relationship: {
    headline: "VOCÊ ESTÁ PRESA EM CICLOS QUE SE REPETEM NO AMOR?",
    subheadline: "Assista ao vídeo abaixo e veja como desbloquear sua vida afetiva em 7 dias. Com técnicas ancestrais + reprogramação emocional, você vai curar o que te impede de viver o amor leve e recíproco que merece.",
    painMechanism: "Reprogramação Afetiva",
    painPoints: [
      "😔 Medo de ser rejeitada",
      "💔 Atração por relações desequilibradas",
      "⛓️ Repetição de traumas familiares",
      "❄️ Crenças inconscientes de que 'não merece amor verdadeiro'"
    ],
    modules: [
      "DIA 1 — O Diagnóstico do Seu Padrão Amoroso",
      "DIA 2 — A Cura do Seu Valor",
      "DIA 3 — Atração Consciente",
      "DIA 4 — Reprogramando Seu Afeto",
      "DIA 5 — Relacionamentos Leves",
      "DIA 6 — Blindagem Emocional",
      "DIA 7 — Sua Nova Versão no Amor"
    ],
    bonuses: [
      { title: "Guia do Amor Recíproco", value: "97", desc: "O que procurar (e evitar) em qualquer relação." },
      { title: "Meditação de Cura Emocional", value: "147", desc: "Transforma dores antigas em força emocional." },
      { title: "Acesso Vitalício ao Programa", value: "53", desc: "Para sempre seu." }
    ],
    objections: [
      { title: "E se eu me machucar de novo?", text: "Justamente por isso o método começa pela cura e blindagem emocional." },
      { title: "Já tentei de tudo…", text: "Aqui não é teoria. É transformação prática com base em sabedoria ancestral e ciência emocional." },
      { title: "E se eu não mudar?", text: "Você vai. Porque vai entender, pela primeira vez, a raiz emocional do seu padrão." }
    ],
    cta: "SIM, QUERO CURAR MEU CORAÇÃO AGORA",
    alertBanner: "Oferta exclusiva para destravar sua vida amorosa termina em breve.",
    vslId: "vid-693b6771c33297495ef77ddc",
    offerHeadline: "🔓 O DESBLOQUEIO COMEÇA HOJE: VIVA O AMOR QUE VOCÊ SONHA!",
    guaranteeText: "Você sente a transformação ou devolvemos 100% do seu dinheiro. Sem perguntas. Sem julgamentos. Você merece essa chance.",
    finalCta: "🔥 Últimas vagas por R$37 — clique abaixo e comece agora sua nova história no amor.",
    finalCtaButton: "CURAR MEU CORAÇÃO AGORA",
    videoFloatingText: undefined
  }
};

const VturbPlayer = React.memo(({ quizPath = 'finance' }: { quizPath?: QuizPath }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Select VSL ID based on path
  const vslId = quizPath === 'relationship' ? 'vid-693b6771c33297495ef77ddc' : 'vid-693f17c2b7fea67f333de06f';
  
  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = `
      <vturb-smartplayer 
        id="${vslId}" 
        style="display:block; width:100%; height:100%; object-fit: cover;"
      ></vturb-smartplayer>
    `;
    return () => { if (containerRef.current) containerRef.current.innerHTML = ''; };
  }, [vslId]);

  return (
    <div className="relative w-full max-w-[360px] mx-auto group my-6">
      <div className={`absolute -inset-1 bg-gradient-to-r ${quizPath === 'relationship' ? 'from-purple-500 via-pink-500 to-purple-500' : 'from-[#FF9500] via-yellow-500 to-[#FF9500]'} rounded-[2.5rem] blur opacity-30 group-hover:opacity-50 transition duration-1000 animate-pulse`}></div>
      <div className="relative w-full aspect-[9/16] bg-black rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 z-10">
        <div ref={containerRef} className="w-full h-full" />
      </div>
      <div className="absolute bottom-6 right-6 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:flex items-center gap-2 text-[10px] font-bold text-white bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
         <Play className="w-3 h-3 fill-white" /> LIGUE O SOM
      </div>
    </div>
  );
}, (prevProps, nextProps) => prevProps.quizPath === nextProps.quizPath);

interface OfferProps {
  quizPath?: QuizPath;
  userName?: string;
}

export const Offer: React.FC<OfferProps> = ({ quizPath = 'finance', userName }) => {
  const content = offerContent[quizPath] || offerContent.finance;
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  useEffect(() => {
    // Load the appropriate VSL script based on path
    const scriptId = quizPath === 'relationship' ? 'vturb-script-relationship' : 'vturb-script-finance';
    const scriptSrc = quizPath === 'relationship' 
      ? "https://scripts.converteai.net/c263b2f0-9566-42be-97d8-7f5920037741/players/693b6771c33297495ef77ddc/v4/player.js"
      : "https://scripts.converteai.net/c263b2f0-9566-42be-97d8-7f5920037741/players/693f17c2b7fea67f333de06f/v4/player.js";
    
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.src = scriptSrc;
      script.id = scriptId;
      script.async = true;
      document.head.appendChild(script);
    }
    
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'ViewContent', { content_name: `Oferta ${quizPath}`, value: 37, currency: 'BRL' });
    }
  }, [quizPath]);

  const handleCheckout = () => {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'AddToCart', { content_name: `Mapa Xamânico (${quizPath})`, value: 37, currency: 'BRL' });
    }
    window.location.href = "https://checkout.mapaxamanicooficial.online/oferta-principal";
  };

  return (
    <div className="min-h-screen pb-24 md:pb-40 relative z-10 overflow-hidden bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]">
      
      <div className="max-w-4xl mx-auto px-4 pt-8 space-y-12 pb-safe">

        {/* BLOCO 1: HERO/VEREDITO */}
        <Veredito userName={userName} />

        {/* VSL Player */}
        <div>
           <VturbPlayer quizPath={quizPath} />
        </div>

        {/* CTA after video */}
        <div className="text-center">
          <Button onClick={handleCheckout} pulse className="w-full max-w-lg mx-auto text-lg shadow-xl">
            👉 QUERO DESTRAVAR MEU MAPA AGORA ➔
          </Button>
        </div>

        {/* BLOCO 2: ENTREGA - Protocolo de 7 Dias */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-[#FF9500]/20 rounded-2xl p-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-2">
            {content.deliveryTitle}
          </h2>
          <div className="space-y-4 mt-8">
            {content.deliverables?.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-4 bg-white/5 p-5 rounded-xl border border-[#FF9500]/10 hover:border-[#FF9500]/30 transition-colors"
                >
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF9500] to-orange-600 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[#FF9500] font-bold text-sm">DIA {item.day}</span>
                      <span className="text-white font-bold text-base">{item.title}</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* BLOCO 3: PROVA SOCIAL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] border border-emerald-500/20 rounded-2xl p-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">
            {content.socialProofTitle}
          </h2>
          <SocialProof />
        </motion.div>

        {/* BLOCO 4: BÔNUS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-yellow-500/20 rounded-2xl p-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">
            {content.bonusTitle}
          </h2>
          <div className="space-y-6">
            {content.bonuses?.map((bonus, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="flex gap-4 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 p-6 rounded-xl border border-yellow-500/30"
              >
                <div className="text-4xl">{bonus.icon}</div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg mb-2">{bonus.title}</h3>
                  <p className="text-gray-300 text-sm mb-3">{bonus.desc}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 line-through text-sm">R$ {bonus.value}</span>
                    <span className="text-green-400 font-bold text-lg">→ GRÁTIS</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* BLOCO 5: OFERTA/CHECKOUT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-b from-[#FF9500]/10 to-[#FF9500]/5 border-2 border-[#FF9500] rounded-3xl p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF9500]/10 via-transparent to-orange-900/10" aria-hidden="true" />
          <div className="relative z-10 text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {content.offerTitle}
            </h2>
            
            {/* Price */}
            <div className="space-y-2">
              <p className="text-gray-400 text-lg">
                De <span className="line-through">R$ {content.priceOld}</span> por apenas:
              </p>
              <div className="text-7xl md:text-8xl font-black text-white">
                R${content.priceNew?.split(',')[0]}
                <span className="text-4xl align-super">,{content.priceNew?.split(',')[1]}</span>
              </div>
              <p className="text-sm text-gray-400">(à vista ou parcelado)</p>
            </div>

            {/* CTA Button */}
            <Button onClick={handleCheckout} pulse className="w-full max-w-md mx-auto text-xl py-6 shadow-2xl">
              {content.cta}
            </Button>
            
            <p className="text-xs text-gray-400 flex items-center justify-center gap-2">
              <Lock className="w-4 h-4 text-green-500" aria-hidden="true" />
              🔒 Compra Segura • ⚡ Chega no E-mail • 🛡️ Dados Protegidos
            </p>
            
            <p className="text-sm text-gray-300 mt-4">{content.ctaSubtext}</p>
          </div>
        </motion.div>

        {/* BLOCO 6: GARANTIA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border-2 border-yellow-600 rounded-2xl p-8 text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
            <Shield className="w-10 h-10 text-white" aria-hidden="true" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-4">
            {content.guaranteeTitle}
          </h2>
          <p className="text-gray-300 text-base leading-relaxed max-w-2xl mx-auto">
            {content.guaranteeText}
          </p>
        </motion.div>

        {/* BLOCO 7: FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">
            Perguntas Frequentes
          </h2>
          {content.faqs?.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                className="w-full text-left p-5 flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <span className="text-white font-semibold pr-4">{faq.question}</span>
                <span className="text-[#FF9500] text-2xl shrink-0">
                  {faqOpen === idx ? '−' : '+'}
                </span>
              </button>
              {faqOpen === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-5 pb-5"
                >
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Final CTA */}
        <div className="text-center pb-8 space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
            🔥 Destrave sua prosperidade agora
          </h3>
          <Button onClick={handleCheckout} pulse className="w-full max-w-lg mx-auto text-xl py-6 shadow-2xl">
            {content.cta}
          </Button>
        </div>

      </div>

      {/* Sticky Bottom CTA (Mobile) */}
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
            DESTRAVAR MAPA <ArrowDown className="w-4 h-4 animate-bounce" aria-hidden="true" />
          </button>
        </div>
      </div>

    </div>
  );
};
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { Shield, Lock, Play, ShieldCheck, Magnet, TrendingUp, Sparkles, ArrowDown, Eye, Flame, Zap } from 'lucide-react';
import { QuizPath } from '../types';
import Veredito from './Veredito';
import { TestimonialCard } from './TestimonialCard';
import { FrequencyRoom } from './FrequencyRoom';
import { CountdownTimer } from './CountdownTimer';

// Dicionário de Conteúdo Dinâmico - NOVA ESTRUTURA VERSÃO FILEMON
const offerContent = {
  finance: {
    // Bloco Hero/Veredito já é componente separado
    vslId: "vid-693f17c2b7fea67f333de06f",
    
    // Bloco 2: Entrega - Protocolo de 7 Dias
    deliveryTitle: "ISTO NÃO É UM CURSO. É UM PROTOCOLO DE ATIVAÇÃO DE 7 DIAS.",
    deliverables: [
      { icon: Eye, day: 1, title: "O Raio-X da Sua Alma", desc: "Diagnóstico da Raiz" },
      { icon: Flame, day: 2, title: "O Exorcismo da Escassez", desc: "Áudio Binaural de Limpeza" },
      { icon: Zap, day: 3, title: "O Ritual do Pote de Ouro", desc: "Técnica de Magnetismo" },
      { icon: ShieldCheck, day: 4, title: "Blindagem Energética", desc: "Proteção contra Inveja" },
      { icon: Magnet, day: 5, title: "Ativação do Ímã de Prosperidade", desc: "Reprogramação para atrair oportunidades" },
      { icon: TrendingUp, day: 6, title: "Blindagem Anti-Inveja e Fluxo Infinito", desc: "Mantendo a prosperidade contínua" },
      { icon: Sparkles, day: 7, title: "O Renascimento Financeiro", desc: "Sua Nova Identidade Financeira" }
    ],
    
    // Bloco 3: Prova Social
    socialProofTitle: "VEJA O QUE QUEM ATIVOU O PROTOCOLO TEM A DIZER:",
    testimonials: [
      {
        name: "Carlos Eduardo M.",
        format: "whatsapp" as const,
        text: "Anahí, vou ser sincero. Comprei achando que era golpe pq o preço era baixo. Mas cara... o áudio do Dia 2 me desmontou. Chorei igual criança lembrando do meu pai. A sensação de peso saiu na hora. Valeu cada centavo.",
        image: "https://i.pravatar.cc/150?img=12"
      },
      {
        name: "Juliana P.",
        format: "instagram" as const,
        text: "Juuuuura que funciona mesmo! Fiz a técnica do Pote de Ouro ontem de manhã. Hoje a Receita Federal liberou uma restituição que tava travada há 2 anos! R$ 2.400 na conta! Tô em choque! 😱✨",
        image: "https://i.pravatar.cc/150?img=43"
      },
      {
        name: "Renata Siqueira",
        format: "facebook" as const,
        text: "Alguém mais sentiu o pescoço estalar ouvindo o áudio? Eu tinha uma dor crônica no trapézio que remédio nenhum tirava. Sumiu. Simplesmente sumiu. Parece mágica, mas é energia.",
        image: "https://i.pravatar.cc/150?img=36"
      },
      {
        name: "Marcos V.",
        format: "whatsapp" as const,
        text: "Eu tava com vergonha de contar, mas tava devendo agiota. O Mapa me deu clareza pra negociar. Não sei explicar, mas depois que fiz a limpeza, o cara aceitou minha proposta de pagamento parcelado que ele negava antes. A energia mudou.",
        image: "https://i.pravatar.cc/150?img=14"
      },
      {
        name: "Beatriz L.",
        format: "instagram" as const,
        text: "O que eu mais amei é que é rápido. Sou mãe solo, não tenho tempo pra curso longo. Os áudios de 12 minutos eu ouço no ônibus indo pro trabalho. Já sinto a diferença no olhar das pessoas pra mim.",
        image: "https://i.pravatar.cc/150?img=29"
      },
      {
        name: "Fernanda G.",
        format: "facebook" as const,
        text: "Minha mão era furada real. Ganhava e gastava. Depois do Dia 7 (Nova Identidade), pela primeira vez sobrou dinheiro no fim do mês e eu não senti vontade de gastar com bobagem. Tô me sentindo 'rica' de verdade.",
        image: "https://i.pravatar.cc/150?img=32"
      }
    ],
    
    // Bloco 4: Bônus
    bonusTitle: "LIBERANDO SEU ACESSO HOJE, VOCÊ GANHA 2 PRESENTES DE OURO:",
    bonuses: [
      { 
        icon: "🎁", 
        title: "Áudio de Socorro Financeiro", 
        desc: "O que ouvir 5 minutos antes de pagar uma conta ou negociar uma dívida para não vibrar na escassez.", 
        value: "197" 
      },
      { 
        icon: "🎁", 
        title: "O Código da Cama do Dinheiro", 
        desc: "Feng Shui Xamânico: Como preparar seu quarto para atrair riqueza enquanto você dorme.", 
        value: "147" 
      }
    ],
    
    // Bloco 5: Oferta/Checkout
    offerTitle: "O ACESSO AO SEU MAPA ESTÁ LIBERADO POR TEMPO LIMITADO",
    priceOld: "197,00",
    priceNew: "37,00",
    cta: "QUERO DESTRAVAR MINHA PROSPERIDADE AGORA ➔",
    ctaSubtext: "Acesso Imediato ao PDF + App",
    
    // Bloco 6: Garantia
    guaranteeTitle: "GARANTIA BLINDADA DE 7 DIAS",
    guaranteeText: "Eu assumo o risco. Entre, gere seu mapa e faça o protocolo de 7 dias. Se você não sentir um peso saindo das costas e não ver sinais claros de dinheiro aparecendo na sua vida em uma semana, eu devolvo 100% do seu dinheiro. Você não paga pelo que não funciona.",
    
    // Bloco 7: FAQ
    faqs: [
      { 
        question: "Eu não tenho tempo para assistir aulas longas. Isso é para mim?", 
        answer: "Sim, foi feito exatamente para quem tem a rotina corrida. O Mapa Xamânico não é um curso cheio de teoria que te cansa. É um Protocolo de Ativação. Você só precisa de 12 minutos por dia. Basta colocar os fones de ouvido (enquanto vai ao trabalho, lava louça ou antes de dormir) e deixar os áudios de Ressonância Inversa agirem no seu subconsciente. É simples e passivo." 
      },
      { 
        question: "Estou endividado e no 'vermelho'. Funciona mesmo na minha situação?", 
        answer: "Funciona principalmente para a sua situação. Se você já tivesse dinheiro sobrando, não precisaria desligar a Escassez Hereditária. O Protocolo foi desenhado para quem está no 'Modo Sobrevivência' e precisa de um alívio imediato — tanto financeiro quanto emocional. O objetivo é estancar o 'sangramento energético' para o dinheiro voltar a parar na sua mão." 
      },
      { 
        question: "Preciso ter alguma religião ou conhecimento prévio?", 
        answer: "Absolutamente não. O Mapa baseia-se na Ciência Ancestral e em princípios de Ressonância Vibracional. Não tem vínculo com nenhuma religião, dogma ou seita. É sobre desbloquear a sua própria energia pessoal, independente do que você acredita. É seguro e universal." 
      },
      { 
        question: "E se eu fizer e não sentir nada?", 
        answer: "Eu assumo esse risco por você. Se em 7 dias você ouvir os áudios e não sentir — fisicamente — o peso saindo das suas costas e a clareza mental voltando, eu devolvo 100% do seu dinheiro. Sem letras miúdas, sem perguntas." 
      },
      { 
        question: "E se eu seguir tudo certinho e mesmo assim não funcionar PRA MIM?", 
        answer: "Impossível. Mas se acontecer, eu não só devolvo seu dinheiro — eu pago DOBRADO pela sua frustração. R$ 74 na sua conta. É meu jeito de assumir 100% do risco. Você literalmente não tem nada a perder e tudo a ganhar." 
      }
    ]
  },
  relationship: {
    vslId: "vid-693b6771c33297495ef77ddc",
    
    // Bloco 2: Entrega - Protocolo de 7 Dias
    deliveryTitle: "ISTO NÃO É UM CURSO. É UM PROTOCOLO DE CURA EMOCIONAL DE 7 DIAS.",
    deliverables: [
      { icon: Eye, day: 1, title: "O Diagnóstico do Seu Padrão Amoroso", desc: "Identificando a raiz dos seus bloqueios afetivos" },
      { icon: Flame, day: 2, title: "A Cura do Seu Valor", desc: "Áudio Binaural para reconstruir sua autoestima" },
      { icon: Zap, day: 3, title: "Atração Consciente", desc: "Como magnetizar relacionamentos saudáveis" },
      { icon: ShieldCheck, day: 4, title: "Reprogramando Seu Afeto", desc: "Transformando padrões inconscientes" },
      { icon: Magnet, day: 5, title: "Relacionamentos Leves", desc: "Vivendo conexões verdadeiras" },
      { icon: TrendingUp, day: 6, title: "Blindagem Emocional", desc: "Protegendo seu coração sem fechar-se" },
      { icon: Sparkles, day: 7, title: "Sua Nova Versão no Amor", desc: "O Renascimento Afetivo" }
    ],
    
    // Bloco 3: Prova Social
    socialProofTitle: "VEJA O QUE QUEM CUROU SEU CORAÇÃO TEM A DIZER:",
    testimonials: [
      {
        name: "Carolina M.",
        format: "whatsapp" as const,
        text: "Fiquei cética no início, mas o áudio do Dia 2 me fez chorar como nunca. Percebi que eu estava repetindo o padrão de abandono da minha mãe. Agora entendo e estou me curando.",
        image: "https://i.pravatar.cc/150?img=35"
      },
      {
        name: "Paula R.",
        format: "instagram" as const,
        text: "Depois do protocolo, conheci alguém completamente diferente dos meus ex-tóxicos. E o melhor: reconheci os sinais de saúde emocional que antes eu ignorava. Tô vivendo um amor leve! 💕✨",
        image: "https://i.pravatar.cc/150?img=48"
      },
      {
        name: "Renata Siqueira",
        format: "facebook" as const,
        text: "Eu carregava uma angústia no peito que ninguém explicava. Depois da blindagem emocional do Dia 6, senti um alívio físico. Meu coração ficou mais leve, literalmente.",
        image: "https://i.pravatar.cc/150?img=36"
      },
      {
        name: "Marcos V.",
        format: "whatsapp" as const,
        text: "Sempre fui o 'cara legal' mas nunca valorizado. O Mapa me mostrou que eu atraía pessoas que me usavam. Hoje consigo colocar limites e me relacionar de igual pra igual.",
        image: "https://i.pravatar.cc/150?img=14"
      },
      {
        name: "Beatriz L.",
        format: "instagram" as const,
        text: "Mãe solo aqui! Não tinha tempo pra terapia longa. Os áudios de 12 min no ônibus me ajudaram a entender meus padrões e a não repetir os erros com meu filho. Gratidão! 🙏",
        image: "https://i.pravatar.cc/150?img=29"
      },
      {
        name: "Fernanda G.",
        format: "facebook" as const,
        text: "Eu pulava de relação em relação, sempre escolhendo errado. Depois do Dia 7, pela primeira vez, fiquei bem estando sozinha. E aí apareceu alguém incrível, quando parei de buscar.",
        image: "https://i.pravatar.cc/150?img=32"
      }
    ],
    
    // Bloco 4: Bônus
    bonusTitle: "LIBERANDO SEU ACESSO HOJE, VOCÊ GANHA 2 PRESENTES DE OURO:",
    bonuses: [
      { 
        icon: "🎁", 
        title: "Guia do Amor Recíproco", 
        desc: "O que procurar (e evitar) em qualquer relação.", 
        value: "97" 
      },
      { 
        icon: "🎁", 
        title: "Meditação de Cura Emocional", 
        desc: "Transforma dores antigas em força emocional.", 
        value: "147" 
      }
    ],
    
    // Bloco 5: Oferta/Checkout
    offerTitle: "O ACESSO AO SEU MAPA ESTÁ LIBERADO POR TEMPO LIMITADO",
    priceOld: "197,00",
    priceNew: "37,00",
    cta: "QUERO DESTRAVAR MINHA PROSPERIDADE AGORA ➔",
    ctaSubtext: "Acesso Imediato ao PDF + App",
    
    // Bloco 6: Garantia
    guaranteeTitle: "GARANTIA BLINDADA DE 7 DIAS",
    guaranteeText: "Você sente a transformação ou devolvemos 100% do seu dinheiro. Sem perguntas. Sem julgamentos. Você merece essa chance.",
    
    // Bloco 7: FAQ
    faqs: [
      { 
        question: "É um curso? Eu não tenho tempo.", 
        answer: "Não. É uma ferramenta de diagnóstico e um protocolo guiado. Você precisa de apenas 10 minutos por dia." 
      },
      { 
        question: "E se eu me machucar de novo?", 
        answer: "Justamente por isso o método começa pela cura e blindagem emocional." 
      },
      { 
        question: "Como eu recebo o acesso?", 
        answer: "Imediatamente no seu e-mail após a confirmação do pagamento." 
      }
    ]
  }
};

const VturbPlayer = React.memo(({ quizPath = 'finance' }: { quizPath?: QuizPath }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showCustomThumbnail, setShowCustomThumbnail] = useState(true);
  
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
    
    // Listen for video play events to hide custom thumbnail
    const handlePlayEvent = () => setShowCustomThumbnail(false);
    const smartplayer = containerRef.current.querySelector('vturb-smartplayer');
    if (smartplayer) {
      smartplayer.addEventListener('play', handlePlayEvent);
    }
    
    return () => { 
      if (smartplayer) {
        smartplayer.removeEventListener('play', handlePlayEvent);
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [vslId]);

  const handleThumbnailClick = () => {
    setShowCustomThumbnail(false);
    // Try to trigger video play
    const smartplayer = containerRef.current?.querySelector('vturb-smartplayer') as HTMLElement & { play?: () => void };
    if (smartplayer && typeof smartplayer.play === 'function') {
      smartplayer.play();
    }
  };

  return (
    <div className="relative w-full max-w-[360px] mx-auto group my-6">
      {/* Enhanced golden glow effect */}
      <div className={`absolute -inset-2 bg-gradient-to-r ${quizPath === 'relationship' ? 'from-purple-500 via-pink-500 to-purple-500' : 'from-[#FF9500] via-[#FFD700] to-[#FF9500]'} rounded-[2.5rem] blur-xl opacity-40 group-hover:opacity-60 transition duration-1000 animate-pulse`}></div>
      <div className="relative w-full aspect-[9/16] bg-black rounded-[2rem] overflow-hidden shadow-2xl border border-[#FFD700]/20 z-10">
        {/* Custom Thumbnail Overlay - shows before video starts */}
        {showCustomThumbnail && (
          <div 
            onClick={handleThumbnailClick}
            className="absolute inset-0 z-30 cursor-pointer bg-gradient-to-b from-[#2A0F3D] via-[#1a0b2e] to-[#0a0a0a] flex flex-col items-center justify-center group/thumb"
          >
            {/* Dramatic background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#2A0F3D] via-[#1a0b2e] to-[#0a0a0a] opacity-90"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.15)_0%,transparent_70%)]"></div>
            
            {/* Overlay content */}
            <div className="relative z-10 text-center px-6">
              {/* Large play button */}
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="mb-4"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#FF9500] to-[#FFD700] flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.6)] group-hover/thumb:shadow-[0_0_50px_rgba(255,215,0,0.8)] transition-shadow">
                  <Play className="w-10 h-10 text-white fill-white ml-1" />
                </div>
              </motion.div>
              
              {/* Emotional hook text */}
              <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
                💰 A Verdade Sobre o Seu Bloqueio Financeiro
              </h3>
              <p className="text-sm text-[#FFD700] font-semibold">
                Toque para assistir e descobrir a raiz do problema
              </p>
            </div>
            
            {/* Pulse ring effect */}
            <div className="absolute inset-0 rounded-[2rem] border-2 border-[#FFD700] opacity-0 group-hover/thumb:opacity-100 animate-pulse"></div>
          </div>
        )}
        
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
    window.location.href = "https://go.perfectpay.com.br/PPU38CQ4NQP";
  };

  return (
    <div className="min-h-screen pb-32 md:pb-40 relative z-10 overflow-hidden bg-gradient-to-b from-[#120520] via-[#2A0F3D] to-[#120520]">
      
      <div className="max-w-4xl mx-auto px-4 pt-8 space-y-12 pb-safe">

        {/* BLOCO 1: HERO/VEREDITO */}
        <Veredito userName={userName} />

        {/* VSL Player */}
        <div>
           <VturbPlayer quizPath={quizPath} />
        </div>

        {/* CTA after video */}
        <div className="text-center space-y-4">
          <div className="flex flex-col items-center gap-3">
            <CountdownTimer initialMinutes={10} />
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-orange-300 text-sm md:text-base font-semibold"
            >
              ⚠️ Esta oferta especial expira quando você sair desta página
            </motion.p>
          </div>
          <Button onClick={handleCheckout} pulse className="w-full max-w-lg mx-auto text-lg shadow-xl animate-pulse">
            QUERO DESTRAVAR MINHA PROSPERIDADE AGORA ➔
          </Button>
        </div>

        {/* BLOCO 2: ENTREGA - Protocolo de 7 Dias */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-[#C69320] rounded-2xl p-8 shadow-[0_0_15px_rgba(198,147,32,0.2)]"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-2">
            {content.deliveryTitle}
          </h2>
          <div className="relative space-y-3 mt-8">
            {/* Linha conectora dourada */}
            <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-gradient-to-b from-[#C69320] via-[#FFD700] to-[#C69320] opacity-30" aria-hidden="true" />
            
            {content.deliverables?.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative flex gap-3 bg-white/5 p-3 rounded-xl border border-[#C69320]/20 hover:border-[#C69320]/50 transition-all"
                >
                  <div className="shrink-0 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C69320] to-[#FFD700] flex items-center justify-center shadow-[0_0_12px_rgba(198,147,32,0.4)]">
                      <IconComponent className="w-5 h-5 text-white" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[#FFD700] font-bold text-xs">DIA {item.day}</span>
                      <span className="text-white font-bold text-sm">{item.title}</span>
                    </div>
                    <p className="text-gray-300 text-xs leading-relaxed">{item.desc}</p>
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
          className="space-y-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">
            {content.socialProofTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {content.testimonials?.map((testimonial, idx) => (
              <TestimonialCard
                key={idx}
                name={testimonial.name}
                format={testimonial.format}
                text={testimonial.text}
                image={testimonial.image}
                delay={idx * 0.1}
              />
            ))}
          </div>
        </motion.div>

        {/* BLOCO 4: BÔNUS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Golden glow effect around bonus section */}
          <div className="absolute -inset-2 bg-gradient-to-r from-[#C69320] via-[#FFD700] to-[#C69320] rounded-3xl blur-xl opacity-15" aria-hidden="true" />
          
          <div className="relative bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-[#C69320] rounded-2xl p-8 shadow-[0_0_25px_rgba(198,147,32,0.3)]">
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
                  className="relative group"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/0 via-yellow-500/20 to-orange-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-md" aria-hidden="true" />
                  
                  <div className="relative flex gap-4 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 p-6 rounded-xl border border-yellow-500/30 group-hover:border-yellow-500/50 transition-colors">
                    <div className="text-4xl">{bonus.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg mb-2">{bonus.title}</h3>
                      <p className="text-gray-200 text-sm mb-3">{bonus.desc}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 line-through text-sm">R$ {bonus.value}</span>
                        <span className="text-green-400 font-bold text-lg drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]">→ GRÁTIS</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* NOVO BLOCO: SALA DE FREQUÊNCIA (Teste Sensorial) */}
        <FrequencyRoom />

        {/* BLOCO 5: OFERTA/CHECKOUT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Efeito Radioativo - Brilho Dourado Intenso */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#C69320] via-[#FFD700] to-[#C69320] rounded-3xl blur-2xl opacity-30" aria-hidden="true" />
          
          <div className="relative bg-gradient-to-b from-[#C69320]/20 to-[#C69320]/10 border-2 border-[#FFD700] rounded-3xl p-8 overflow-hidden shadow-[0_0_60px_rgba(198,147,32,0.8),0_0_100px_rgba(255,215,0,0.5)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/10 via-transparent to-[#C69320]/10" aria-hidden="true" />
            <div className="relative z-10 text-center space-y-6">
              <div className="flex flex-col items-center gap-3">
                <CountdownTimer initialMinutes={10} />
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {content.offerTitle}
                </h2>
              </div>
              
              {/* Price - RESPONSIVE FLEXBOX LAYOUT */}
              <div className="space-y-3">
                <p className="text-white text-base md:text-lg font-semibold">
                  De <span className="line-through text-gray-300">R$ {content.priceOld}</span> por apenas:
                </p>
                <div className="flex items-center justify-center gap-1">
                  {/* Currency symbol */}
                  <span className="text-3xl md:text-4xl font-black text-[#FFD700] drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]" style={{ textShadow: '0 0 30px rgba(255,215,0,0.6)' }}>
                    R$
                  </span>
                  {/* Main price */}
                  <span className="text-6xl md:text-8xl font-black text-[#FFD700] drop-shadow-[0_0_30px_rgba(255,215,0,0.8)]" style={{ textShadow: '0 0 40px rgba(255,215,0,0.6), 0 0 80px rgba(255,215,0,0.4)' }}>
                    {content.priceNew?.split(',')[0]}
                  </span>
                  {/* Cents */}
                  <span className="text-2xl md:text-4xl font-black text-[#FFD700] self-start mt-2 drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]" style={{ textShadow: '0 0 30px rgba(255,215,0,0.6)' }}>
                    ,{content.priceNew?.split(',')[1]}
                  </span>
                </div>
                <p className="text-sm text-gray-200 font-medium">(à vista ou parcelado)</p>
              </div>

              {/* CTA Button */}
              <Button onClick={handleCheckout} pulse className="w-full max-w-md mx-auto text-xl py-6 shadow-2xl animate-pulse">
                {content.cta}
              </Button>
              
              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-4 text-sm text-gray-200 flex-wrap">
                <div className="flex items-center gap-1">
                  <Lock className="w-4 h-4 text-green-500" aria-hidden="true" />
                  <span>🔒 Compra Segura</span>
                </div>
              <div className="flex items-center gap-1">
                <span>💳 Pix e Cartão</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-yellow-500" aria-hidden="true" />
                <span>🛡️ Garantia de 7 Dias</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-200 mt-4">{content.ctaSubtext}</p>
          </div>
        </div>
        </motion.div>

        {/* BLOCO 6: GARANTIA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#C69320] rounded-2xl p-8 text-center shadow-[0_0_15px_rgba(198,147,32,0.2)]"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
            <Shield className="w-10 h-10 text-white" aria-hidden="true" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-4">
            {content.guaranteeTitle}
          </h2>
          <p className="text-gray-200 text-base leading-relaxed max-w-2xl mx-auto">
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
              className="bg-white/5 border border-[#C69320]/30 rounded-xl overflow-hidden shadow-[0_0_10px_rgba(198,147,32,0.15)]"
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
                  <p className="text-gray-200 leading-relaxed">{faq.answer}</p>
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
          <Button onClick={handleCheckout} pulse className="w-full max-w-lg mx-auto text-xl py-6 shadow-2xl animate-pulse">
            {content.cta}
          </Button>
        </div>

        {/* FASE 5: Footer Legal Links */}
        <footer className="mt-16 pt-8 border-t border-white/10 text-center space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <span className="text-gray-700">|</span>
            <a href="#" className="hover:text-white transition-colors">Políticas de Privacidade</a>
            <span className="text-gray-700">|</span>
            <a href="#" className="hover:text-white transition-colors">Disclaimer</a>
            <span className="text-gray-700">|</span>
            <a href="mailto:suporte@mapaxamanico.com" className="hover:text-white transition-colors">Contato</a>
          </div>
          <p className="text-xs text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook. Depois que você sair do Facebook, a responsabilidade não é deles e sim do nosso site. Fazemos todos os esforços para indicar claramente e mostrar todas as provas do produto e usamos resultados reais. Nós não vendemos o seu e-mail ou qualquer informação para terceiros. Jamais fazemos nenhum tipo de spam. Se você tiver alguma dúvida, sinta-se à vontade para usar o link de contato e falar conosco em horário comercial de Segunda a Sextas das 09h00 ás 18h00. Lemos e respondemos todas as mensagens por ordem de chegada.
          </p>
        </footer>

      </div>

      {/* Sticky Bottom CTA (Mobile) - Enhanced Contrast & Shimmer */}
      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-black via-[#0a0a0a] to-[#0a0a0a]/95 backdrop-blur-xl border-t-2 border-[#FFD700]/50 p-3 z-50 md:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.8)] pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          <div className="flex flex-col">
             <span className="text-gray-400 line-through text-[11px] font-medium">De R$ 197</span>
             <div className="flex items-baseline gap-1.5">
                <span className="text-[10px] text-gray-300 font-semibold">Por</span>
                <span className="font-black text-3xl text-[#FFD700] drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]">R$ 37</span>
             </div>
          </div>
          <button 
            onClick={handleCheckout} 
            className="relative flex-1 bg-gradient-to-r from-[#FF9500] via-[#FFD700] to-[#FF9500] text-black font-bold py-3.5 px-4 rounded-xl shadow-[0_0_20px_rgba(255,215,0,0.6)] active:scale-95 transition-transform flex items-center justify-center gap-2 text-sm overflow-hidden group"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            <span className="relative z-10">DESTRAVAR MAPA</span>
            <ArrowDown className="w-4 h-4 animate-bounce relative z-10" aria-hidden="true" />
          </button>
        </div>
      </div>

    </div>
  );
};
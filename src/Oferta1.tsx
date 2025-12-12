import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Lock, Check, Shield } from 'lucide-react';

interface Oferta1Props {
  userName?: string;
}

export default function Oferta1({ userName = 'você' }: Oferta1Props) {
  const [showPulse, setShowPulse] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  const firstName = userName ? userName.split(' ')[0].toUpperCase() : 'VOCÊ';

  // Track user activity
  useEffect(() => {
    const handleActivity = () => {
      setLastActivity(Date.now());
      setShowPulse(false);
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('keypress', handleActivity);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keypress', handleActivity);
    };
  }, []);

  // Check for inactivity
  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastActivity > 30000) {
        setShowPulse(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastActivity]);

  // Load VTurb script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://scripts.converteai.net/c263b2f0-9566-42be-97d8-7f5920037741/players/693b6777b6a79d0e139369c7/v4/player.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const checkoutUrl = 'https://checkout.mapaxamanicooficial.online/oferta-principal?affiliate=8ZjMrNv1_f';

  const diagnoses = [
    "O dinheiro entra… e desaparece",
    "Esforço demais, retorno de menos",
    "Ciclos de avanço e queda que se repetem",
    "Sensação de carregar tudo nas costas",
    "Vergonha ou frustração com sua situação financeira",
    "Medo inconsciente de crescer ou prosperar"
  ];

  const program = [
    { day: 1, title: "O Diagnóstico da Raiz Financeira" },
    { day: 2, title: "A Virada Mental" },
    { day: 3, title: "Método do Dinheiro que Sobra" },
    { day: 4, title: "Proteção Contra Autossabotagem" },
    { day: 5, title: "Construindo Renda Real" },
    { day: 6, title: "Plano do Crescimento Contínuo" },
    { day: 7, title: "O Renascimento Financeiro" }
  ];

  const bonuses = [
    { name: "Guia de Mentalidade de Riqueza", was: "R$97", now: "Grátis" },
    { name: "Meditação de Alinhamento Financeiro", was: "R$147", now: "Grátis" },
    { name: "Acesso Vitalício", was: "R$53", now: "Grátis" }
  ];

  const objections = [
    {
      emoji: "😰",
      question: "E se eu não conseguir mudar?",
      answer: "Você vai. Porque agora você entende a causa real da sua estagnação financeira."
    },
    {
      emoji: "💭",
      question: "Já tentei outras coisas e nada funcionou.",
      answer: "Aqui não é só técnica. É desbloqueio energético + transformação prática."
    },
    {
      emoji: "⏳",
      question: "E se eu deixar pra depois?",
      answer: "Esse bloqueio vai continuar travando seus resultados. Ou você muda hoje, ou carrega isso por mais anos."
    }
  ];

  const testimonials = [
    {
      name: "Camila R.",
      age: 32,
      location: "SP",
      text: "Eu sempre me matava de trabalhar e o dinheiro sumia do nada. Sério, eu achava que era culpa minha. Quando fiz o Mapa, entendi que tinha coisa lá de trás me travando. Hoje eu consigo ver dinheiro sobrando no fim do mês. É surreal."
    },
    {
      name: "Rodrigo M.",
      age: 41,
      location: "MG",
      text: "Nunca pensei que bloqueio energético era real… até fazer esse programa. Foi tipo um soco de realidade. Parece que destravou tudo, não só no dinheiro, mas na minha cabeça também."
    },
    {
      name: "Letícia D.",
      age: 29,
      location: "RJ",
      text: "Eu chorava toda vez que olhava pra minha conta. Tava cansada de viver no limite. No 2º dia do processo, parece que virou uma chave em mim. Tô vivendo outra vibe agora. E é só o começo!"
    }
  ];

  return (
    <div className="min-h-screen text-slate-100 overflow-x-hidden selection:bg-orange-500 selection:text-white relative bg-[#050505]">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] z-0"></div>
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      {/* Alert Banner */}
      <motion.div 
        initial={{ y: -50 }} 
        animate={{ y: 0 }}
        className="bg-red-600 text-white text-xs md:text-sm font-bold text-center py-3 px-4 sticky top-0 z-50 shadow-2xl"
      >
        <div className="flex items-center justify-center gap-2 uppercase tracking-wider">
          <Clock className="w-4 h-4" />
          ⏳ Atenção: Esta oferta pode sair do ar a qualquer momento.
        </div>
      </motion.div>

      <div className="max-w-2xl mx-auto px-4 pt-8 pb-32 relative z-10">
        
        {/* Headline */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6 space-y-4"
        >
          <h1 className="text-3xl md:text-5xl font-serif font-black text-white leading-tight uppercase">
            {firstName}, VOCÊ SENTE QUE ESTÁ <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9500] to-orange-600">ESTAGNADO FINANCEIRAMENTE</span>, MESMO SE ESFORÇANDO AO MÁXIMO?
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-8"
        >
          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Assista ao vídeo abaixo e descubra como a <strong className="text-white">Terapia Holística Ancestral</strong>, combinada com um método prático, pode curar bloqueios e traumas herdados que te mantêm estagnado e longe da prosperidade que você merece.
          </p>
        </motion.div>

        {/* VSL Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8 relative"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#FF9500]/30">
            <vturb-smartplayer 
              id="vid-693b6777b6a79d0e139369c7" 
              style={{ display: 'block', margin: '0 auto', width: '100%', maxWidth: '400px' }}
            />
            
            {/* Floating text */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg z-10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              🔴 344 pessoas assistindo agora
            </div>
          </div>
        </motion.div>

        {/* Diagnosis Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-white/5 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-6 mb-8"
        >
          <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-4 text-center">
            Identificamos sinais claros de <span className="text-[#FF9500]">Reprogramação Financeira Emocional</span> pendente:
          </h3>
          <ul className="space-y-3">
            {diagnoses.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1 + idx * 0.1 }}
                className="flex items-start gap-3 text-sm md:text-base text-slate-200"
              >
                <span className="text-red-400 text-xl mt-0.5 flex-shrink-0">❌</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Offer Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="bg-gradient-to-br from-[#1a103c] to-[#0F0821] rounded-3xl p-6 md:p-8 mb-8 border border-[#FF9500]/30 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#FF9500] via-orange-600 to-[#FF9500] rounded-3xl blur opacity-20 animate-pulse"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-serif font-black text-white mb-2 uppercase">
                DESBLOQUEIO FINANCEIRO EM 7 DIAS
              </h2>
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-slate-400 text-lg md:text-xl line-through">R$197</span>
                <span className="text-4xl md:text-5xl font-black text-[#FF9500]">R$37</span>
              </div>
              <p className="text-orange-300 text-sm md:text-base font-bold uppercase">
                ⚡ Apenas enquanto esta página estiver aberta
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-2 mb-6">
              {[
                "Acesso Imediato",
                "Método 100% online",
                "Resultados logo nos primeiros dias",
                "Garantia incondicional de 7 dias"
              ].map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.4 + idx * 0.1 }}
                  className="flex items-center gap-3 text-emerald-400 text-sm md:text-base"
                >
                  <span className="text-xl">🟩</span>
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.a
              href={checkoutUrl}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              animate={showPulse ? { 
                scale: [1, 1.05, 1],
                boxShadow: [
                  '0 0 0 0 rgba(255, 149, 0, 0.7)',
                  '0 0 0 20px rgba(255, 149, 0, 0)',
                  '0 0 0 0 rgba(255, 149, 0, 0)'
                ]
              } : {}}
              transition={showPulse ? { duration: 2, repeat: Infinity } : {}}
              className="block w-full bg-gradient-to-r from-[#FF9500] to-orange-600 text-white font-bold text-lg md:text-xl py-5 px-8 rounded-xl shadow-2xl hover:brightness-110 transition-all text-center mb-3"
            >
              QUERO DESBLOQUEAR MINHAS FINANÇAS
            </motion.a>

            <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3 text-green-500" /> Pagamento 100% Seguro • Acesso Imediato
            </p>
          </div>
        </motion.div>

        {/* 7-Day Program */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/10"
        >
          <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-4 text-center">
            O Que Você Vai Receber:
          </h3>
          <div className="space-y-3">
            {program.map((day) => (
              <div key={day.day} className="flex items-start gap-3 bg-white/5 p-3 rounded-xl">
                <div className="bg-[#FF9500] text-white font-bold text-sm w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  {day.day}
                </div>
                <div className="flex-1">
                  <span className="text-slate-200 text-sm md:text-base">
                    <strong>Dia {day.day}:</strong> {day.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bonuses */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="bg-gradient-to-br from-[#1a103c] to-[#0F0821] rounded-2xl p-6 mb-8 border border-purple-500/30"
        >
          <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-4 text-center">
            🎁 Bônus Exclusivos
          </h3>
          <div className="space-y-3">
            {bonuses.map((bonus, idx) => (
              <div key={idx} className="flex items-center justify-between bg-white/5 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span className="text-slate-200 text-sm md:text-base">{bonus.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-slate-500 text-xs line-through">{bonus.was}</div>
                  <div className="text-emerald-400 font-bold text-sm">{bonus.now}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Objections */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2 }}
          className="space-y-6 mb-8"
        >
          {objections.map((obj, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-2xl">{obj.emoji}</span>
                "{obj.question}"
              </h4>
              <p className="text-slate-300 text-sm md:text-base pl-8">
                → {obj.answer}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Guarantee */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="bg-gradient-to-b from-[#1a103c] to-[#0F0821] p-6 rounded-2xl border border-[#D4AF37]/30 text-center mb-8"
        >
          <div className="bg-[#D4AF37]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-[#D4AF37]">
            <Shield className="w-8 h-8" />
          </div>
          <h4 className="font-serif font-bold text-[#D4AF37] text-xl mb-2 uppercase">
            🛡️ 7 Dias de Garantia Total
          </h4>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Não sentiu a mudança? Devolvemos <strong className="text-white">100% do seu dinheiro</strong>.<br />
            Sem perguntas. Sem risco. Só transformação.
          </p>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.4 }}
          className="space-y-6 mb-8"
        >
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-white text-center mb-6">
            Veja o que os alunos estão dizendo:
          </h3>
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF9500] to-orange-600 flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name[0]}
                </div>
                <div>
                  <div className="font-bold text-white text-sm">
                    {testimonial.name} – {testimonial.age} anos | {testimonial.location}
                  </div>
                  <div className="text-yellow-400 text-xs">★★★★★</div>
                </div>
              </div>
              <p className="text-slate-200 text-sm md:text-base leading-relaxed italic">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.6 }}
          className="text-center space-y-6"
        >
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight">
            🔥 O que te trava pode ser curado.<br />
            Mas essa oportunidade pode sair do ar a qualquer momento.
          </h3>
          
          <motion.a
            href={checkoutUrl}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            animate={showPulse ? { 
              scale: [1, 1.05, 1],
              boxShadow: [
                '0 0 0 0 rgba(255, 149, 0, 0.7)',
                '0 0 0 20px rgba(255, 149, 0, 0)',
                '0 0 0 0 rgba(255, 149, 0, 0)'
              ]
            } : {}}
            transition={showPulse ? { duration: 2, repeat: Infinity } : {}}
            className="block w-full bg-gradient-to-r from-[#FF9500] to-orange-600 text-white font-bold text-xl md:text-2xl py-6 px-8 rounded-xl shadow-2xl hover:brightness-110 transition-all"
          >
            QUERO DESBLOQUEAR MINHAS FINANÇAS AGORA
          </motion.a>
        </motion.div>
      </div>

      {/* Fixed Mobile Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-[#FF9500]/30 p-3 z-50 md:hidden shadow-2xl">
        <a
          href={checkoutUrl}
          className="block w-full bg-gradient-to-r from-[#FF9500] to-orange-600 text-white font-bold py-4 px-4 rounded-xl shadow-lg active:scale-95 transition-transform text-center"
        >
          DESBLOQUEAR AGORA POR R$37
        </a>
      </div>
    </div>
  );
}

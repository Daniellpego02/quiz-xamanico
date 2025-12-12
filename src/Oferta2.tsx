import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Lock, Check, Shield, Heart } from 'lucide-react';

interface Oferta2Props {
  userName?: string;
}

export default function Oferta2({ userName = 'você' }: Oferta2Props) {
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
    script.src = 'https://scripts.converteai.net/c263b2f0-9566-42be-97d8-7f5920037741/players/693b6771c33297495ef77ddc/v4/player.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const checkoutUrl = 'https://seguropagamentos.com.br/oferta-principal?affiliate=8ZjMrNv1_f';

  const diagnoses = [
    "Medo de ser rejeitada",
    "Atração por relações desequilibradas",
    "Repetição de traumas familiares",
    "Crenças inconscientes de que 'não merece amor verdadeiro'"
  ];

  const program = [
    { day: 1, title: "O Diagnóstico do Seu Padrão Amoroso" },
    { day: 2, title: "A Cura do Seu Valor" },
    { day: 3, title: "Atração Consciente" },
    { day: 4, title: "Reprogramando Seu Afeto" },
    { day: 5, title: "Relacionamentos Leves" },
    { day: 6, title: "Blindagem Emocional" },
    { day: 7, title: "Sua Nova Versão no Amor" }
  ];

  const bonuses = [
    { name: "Guia do Amor Recíproco", was: "R$97", now: "Grátis" },
    { name: "Meditação de Cura Emocional", was: "R$147", now: "Grátis" },
    { name: "Acesso Vitalício ao Programa", was: "R$53", now: "Grátis" }
  ];

  const objections = [
    {
      emoji: "😰",
      question: "E se eu me machucar de novo?",
      answer: "Justamente por isso o método começa pela cura e blindagem emocional."
    },
    {
      emoji: "💭",
      question: "Já tentei de tudo…",
      answer: "Aqui não é teoria. É transformação prática com base em sabedoria ancestral e ciência emocional."
    },
    {
      emoji: "⏳",
      question: "E se eu não mudar?",
      answer: "Você vai. Porque vai entender, pela primeira vez, a raiz emocional do seu padrão."
    }
  ];

  const testimonials = [
    {
      name: "Juliana S.",
      age: 34,
      location: "RJ",
      text: "Pensei que eu era azarada no amor. Sempre me envolvia com quem não tava pronto. O Mapa me fez ver que o problema não era o outro — era uma ferida minha que atraía tudo isso. Foi libertador, de verdade."
    },
    {
      name: "Fernanda L.",
      age: 27,
      location: "PE",
      text: "Eu tinha medo de me entregar. Vinha de um relacionamento tóxico e achava que nunca mais ia conseguir confiar. Esse processo me mostrou que dá pra se curar sem depender de ninguém. Foi o começo do meu recomeço."
    },
    {
      name: "Carlos T.",
      age: 38,
      location: "SP",
      text: "Nunca pensei que um homem pudesse carregar tanto bloqueio emocional. Achei que era só coisa de 'mimimi'. Mas eu atraía sempre relações vazias. Hoje, me sinto pronto pra viver algo leve, verdadeiro e recíproco."
    }
  ];

  return (
    <div className="min-h-screen text-slate-100 overflow-x-hidden selection:bg-purple-500 selection:text-white relative bg-[#050505]">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] z-0"></div>
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      {/* Alert Banner */}
      <motion.div 
        initial={{ y: -50 }} 
        animate={{ y: 0 }}
        className="bg-purple-700 text-white text-xs md:text-sm font-bold text-center py-3 px-4 sticky top-0 z-50 shadow-2xl"
      >
        <div className="flex items-center justify-center gap-2 uppercase tracking-wider">
          <Heart className="w-4 h-4" />
          Oferta exclusiva para destravar sua vida amorosa termina em breve.
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
            {firstName}, VOCÊ ESTÁ <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">PRESA EM CICLOS</span> QUE SE REPETEM NO AMOR?
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
            Assista ao vídeo abaixo e veja como desbloquear sua vida afetiva em 7 dias.<br />
            Com <strong className="text-white">técnicas ancestrais + reprogramação emocional</strong>, você vai curar o que te impede de viver o amor leve e recíproco que merece.
          </p>
        </motion.div>

        {/* VSL Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8 relative"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-purple-500/30">
            <vturb-smartplayer 
              id="vid-693b6771c33297495ef77ddc" 
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
          className="bg-white/5 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 mb-8"
        >
          <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-4 text-center">
            🔍 PADRÃO EMOCIONAL BLOQUEADOR IDENTIFICADO
          </h3>
          <p className="text-slate-300 text-center mb-4">
            Você apresenta sinais de <span className="text-purple-400 font-bold">Reprogramação Afetiva</span> pendente:
          </p>
          <ul className="space-y-3">
            {diagnoses.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1 + idx * 0.1 }}
                className="flex items-start gap-3 text-sm md:text-base text-slate-200"
              >
                <span className="text-2xl mt-0.5 flex-shrink-0">😔</span>
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
          className="bg-gradient-to-br from-[#2d1b4e] to-[#1a103c] rounded-3xl p-6 md:p-8 mb-8 border border-purple-500/30 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-3xl blur opacity-20 animate-pulse"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-serif font-black text-white mb-2 uppercase">
                🔓 O DESBLOQUEIO COMEÇA HOJE:<br />VIVA O AMOR QUE VOCÊ SONHA!
              </h2>
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-slate-400 text-lg md:text-xl line-through">R$197</span>
                <span className="text-4xl md:text-5xl font-black text-purple-400">R$37</span>
              </div>
              <p className="text-pink-300 text-sm md:text-base font-bold">
                🔥 Oferta disponível apenas enquanto esta página estiver aberta.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-2 mb-6">
              {[
                "Acesso imediato + Garantia de 7 dias",
                "Método 100% online + resultados já no primeiro exercício"
              ].map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.4 + idx * 0.1 }}
                  className="flex items-center gap-3 text-emerald-400 text-sm md:text-base"
                >
                  <Check className="w-5 h-5" />
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
                  '0 0 0 0 rgba(168, 85, 247, 0.7)',
                  '0 0 0 20px rgba(168, 85, 247, 0)',
                  '0 0 0 0 rgba(168, 85, 247, 0)'
                ]
              } : {}}
              transition={showPulse ? { duration: 2, repeat: Infinity } : {}}
              className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg md:text-xl py-5 px-8 rounded-xl shadow-2xl hover:brightness-110 transition-all text-center mb-3"
            >
              SIM, QUERO CURAR MEU CORAÇÃO AGORA
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
                <div className="bg-purple-600 text-white font-bold text-sm w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
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
          className="bg-gradient-to-br from-[#2d1b4e] to-[#1a103c] rounded-2xl p-6 mb-8 border border-purple-500/30"
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
          className="bg-gradient-to-b from-[#2d1b4e] to-[#1a103c] p-6 rounded-2xl border border-purple-500/30 text-center mb-8"
        >
          <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-purple-400">
            <Shield className="w-8 h-8" />
          </div>
          <h4 className="font-serif font-bold text-purple-400 text-xl mb-2 uppercase">
            💜 GARANTIA DE 7 DIAS
          </h4>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Você sente a transformação ou devolvemos <strong className="text-white">100% do seu dinheiro</strong>.<br />
            Sem perguntas. Sem julgamentos. Você merece essa chance.
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
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
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
            🔥 Últimas vagas por R$37 — clique abaixo e comece agora sua nova história no amor.
          </h3>
          
          <motion.a
            href={checkoutUrl}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            animate={showPulse ? { 
              scale: [1, 1.05, 1],
              boxShadow: [
                '0 0 0 0 rgba(168, 85, 247, 0.7)',
                '0 0 0 20px rgba(168, 85, 247, 0)',
                '0 0 0 0 rgba(168, 85, 247, 0)'
              ]
            } : {}}
            transition={showPulse ? { duration: 2, repeat: Infinity } : {}}
            className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl md:text-2xl py-6 px-8 rounded-xl shadow-2xl hover:brightness-110 transition-all"
          >
            CURAR MEU CORAÇÃO AGORA
          </motion.a>
        </motion.div>
      </div>

      {/* Fixed Mobile Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-purple-500/30 p-3 z-50 md:hidden shadow-2xl">
        <a
          href={checkoutUrl}
          className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-4 rounded-xl shadow-lg active:scale-95 transition-transform text-center"
        >
          CURAR MEU CORAÇÃO POR R$37
        </a>
      </div>
    </div>
  );
}

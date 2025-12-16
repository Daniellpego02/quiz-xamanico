import { motion } from 'framer-motion';
import { Check, CheckCheck } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Mariana S.',
    avatar: '👩🏻',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces',
    time: '10:34',
    message: 'Anahí, você não vai acreditar! Fiz o desbloqueio do Dia 2 ontem à noite. Hoje de manhã recebi um PIX de uma dívida antiga que eu nem lembrava mais que existia. Tô arrepiada! 😱',
    platform: 'whatsapp',
  },
  {
    id: 2,
    name: 'Carlos Eduardo',
    avatar: '👨🏽',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
    time: '15:22',
    message: 'Estava travado no profissional há 8 meses. Comecei o Mapa na segunda, hoje me chamaram pra entrevista e JÁ PASSEI! A sensação é que tirei uma âncora do pé. 🚀',
    platform: 'whatsapp',
  },
  {
    id: 3,
    name: 'Fernanda L.',
    avatar: '👩🏼',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces',
    time: '08:47',
    message: 'Só queria agradecer. Eu sentia um peso nas costas que não saía com nada. Depois do áudio da Sala de Frequência, parece que tiraram uma tonelada de mim. Gratidão eterna 🙏✨',
    platform: 'whatsapp',
  },
  {
    id: 4,
    name: 'Roberto G.',
    avatar: '👨🏻',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces',
    time: '19:15',
    message: 'Confesso que comprei desconfiado pelo valor ser baixo... mas o conteúdo vale 10x mais. Minha loja bateu recorde de vendas essa semana. O ritual da carteira é real! 💰🔥',
    platform: 'whatsapp',
  },
];

export const SocialProofTestimonials = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="my-16 py-12 bg-gradient-to-b from-white/5 to-transparent"
    >
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] mb-4"
          >
            ✨ VEJA O QUE ACONTECE QUANDO VOCÊ GIRA A CHAVE
          </motion.h2>
          <p className="text-slate-300 text-base md:text-lg">
            Mensagens reais de pessoas que destravaram sua prosperidade
          </p>
        </div>

        {/* Testimonials Grid - WhatsApp Style */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* WhatsApp-style chat container */}
              <div className="relative bg-[#0B141A] rounded-2xl p-4 shadow-2xl border border-[#2A3942]">
                {/* Header - WhatsApp style */}
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#2A3942]">
                  <img 
                    src={testimonial.photo} 
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover shadow-lg border-2 border-[#D4AF37]"
                  />
                  <div className="flex-1">
                    <p className="text-white text-sm font-bold">{testimonial.name}</p>
                    <p className="text-[#8696A0] text-xs">online</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  </div>
                </div>

                {/* Message bubble - WhatsApp received message style */}
                <div className="flex gap-2">
                  <div className="flex-1">
                    <div className="bg-[#1F2C34] rounded-lg rounded-tl-none p-3 shadow-lg">
                      <p className="text-white text-sm md:text-base leading-relaxed font-normal mb-2">
                        {testimonial.message}
                      </p>
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-[#8696A0] text-xs">{testimonial.time}</span>
                        <CheckCheck className="w-4 h-4 text-[#53BDEB]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verified badge */}
                <div className="flex items-center justify-end gap-1 mt-2">
                  <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-full px-3 py-1 flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 text-xs font-semibold">Cliente Verificado</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social proof stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-emerald-500/20 border-2 border-emerald-500/40 rounded-full px-6 py-3">
            <div className="flex -space-x-2">
              {['👩🏻', '👨🏽', '👩🏼', '👨🏻', '👩🏾'].map((avatar, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFD700] border-2 border-[#0B141A] flex items-center justify-center text-lg"
                >
                  {avatar}
                </div>
              ))}
            </div>
            <p className="text-emerald-200 text-sm md:text-base font-bold">
              +21.400 pessoas já transformaram suas vidas
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

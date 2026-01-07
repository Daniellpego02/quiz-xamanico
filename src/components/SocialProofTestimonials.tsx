import { motion } from 'framer-motion';
import { Check, CheckCheck, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Mariana S.',
    location: 'São Paulo, SP',
    timeAgo: 'há 2h',
    avatar: '👩🏻',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces',
    time: '10:34',
    message: 'Anahí, você não vai acreditar! Fiz o desbloqueio do Dia 2 ontem à noite. Hoje de manhã recebi um PIX de uma dívida antiga que eu nem lembrava mais que existia. Tô arrepiada! 😱',
    platform: 'whatsapp',
    stars: 5,
  },
  {
    id: 2,
    name: 'Carlos Eduardo',
    location: 'Rio de Janeiro, RJ',
    timeAgo: 'há 5h',
    avatar: '👨🏽',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
    time: '15:22',
    message: 'Estava travado no profissional há 8 meses. Comecei o Mapa na segunda, hoje me chamaram pra entrevista e JÁ PASSEI! A sensação é que tirei uma âncora do pé. 🚀',
    platform: 'whatsapp',
    stars: 5,
  },
  {
    id: 3,
    name: 'Fernanda L.',
    location: 'Belo Horizonte, MG',
    timeAgo: 'há 8h',
    avatar: '👩🏼',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces',
    time: '08:47',
    message: 'Só queria agradecer. Eu sentia um peso nas costas que não saía com nada. Depois do áudio da Sala de Frequência, parece que tiraram uma tonelada de mim. Gratidão eterna 🙏✨',
    platform: 'whatsapp',
    stars: 5,
  },
  {
    id: 4,
    name: 'Roberto G.',
    location: 'Porto Alegre, RS',
    timeAgo: 'há 12h',
    avatar: '👨🏻',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces',
    time: '19:15',
    message: 'Confesso que comprei desconfiado pelo valor ser baixo... mas o conteúdo vale 10x mais. Minha loja bateu recorde de vendas essa semana. O ritual da carteira é real! 💰🔥',
    platform: 'whatsapp',
    stars: 5,
  },
];

export const SocialProofTestimonials = ({ onCtaClick }: { onCtaClick?: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="my-10 sm:my-16 py-8 sm:py-12 relative overflow-hidden"
    >
      {/* Ritual background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#C9A227]/5 via-transparent to-[#C9A227]/5 pointer-events-none" />
      
      {/* Sacred geometry decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-[#C9A227]/20 rounded-tl-[40px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r border-t border-[#C9A227]/20 rounded-tr-[40px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l border-b border-[#C9A227]/20 rounded-bl-[40px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-[#C9A227]/20 rounded-br-[40px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-[#C9A227]/20 to-transparent border border-[#C9A227]/40 flex items-center justify-center">
              <Star className="w-6 h-6 text-[#C9A227]" />
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8B7355] via-[#C9A227] to-[#8B7355] mb-3 sm:mb-4"
          >
            ✨ VEJA O QUE ACONTECE QUANDO VOCÊ GIRA A CHAVE
          </motion.h2>
          <p className="text-slate-400 text-sm sm:text-base md:text-lg">
            Mensagens reais de pessoas que destravaram sua prosperidade
          </p>
        </div>

        {/* Testimonials Grid - WhatsApp Style with Ritual enhancements */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              {/* Ritual glow on hover */}
              <motion.div 
                className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#C9A227]/0 via-[#C9A227]/20 to-[#C9A227]/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
              />
              
              {/* WhatsApp-style chat container with ritual styling */}
              <div className="relative bg-gradient-to-br from-[#0B141A] via-[#0a1015] to-[#0B141A] rounded-2xl p-3 sm:p-4 shadow-2xl border border-[#C9A227]/20 group-hover:border-[#C9A227]/40 transition-colors duration-400">
                {/* Corner decorations */}
                <div className="absolute top-1 left-1 w-4 h-4 border-t border-l border-[#C9A227]/30 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-1 right-1 w-4 h-4 border-t border-r border-[#C9A227]/30 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-1 left-1 w-4 h-4 border-b border-l border-[#C9A227]/30 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-1 right-1 w-4 h-4 border-b border-r border-[#C9A227]/30 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Header - WhatsApp style with ritual accents */}
                <div className="flex items-center gap-3 mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-[#C9A227]/20">
                  <div className="relative">
                    <img 
                      src={testimonial.photo} 
                      alt={testimonial.name}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover shadow-lg border-2 border-[#C9A227]/60"
                    />
                    <motion.div 
                      className="absolute -inset-1 rounded-full border border-[#C9A227]/30 opacity-0 group-hover:opacity-100"
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 truncate">
                      {testimonial.name}
                      <span className="text-[#C9A227] text-xs">✓</span>
                    </p>
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                      <p className="text-[#8696A0] text-[10px] sm:text-xs">{testimonial.location}</p>
                      <span className="text-[#8696A0] text-[10px] sm:text-xs hidden sm:inline">•</span>
                      <p className="text-[#C9A227] text-[10px] sm:text-xs font-semibold">{testimonial.timeAgo}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#C9A227] animate-pulse shadow-[0_0_8px_rgba(201,162,39,0.5)]"></div>
                  </div>
                </div>

                {/* Star rating with glow */}
                <div className="flex gap-0.5 mb-2 sm:mb-3">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-[#C9A227] text-[#C9A227] drop-shadow-[0_0_3px_rgba(201,162,39,0.5)]" />
                  ))}
                </div>

                {/* Message bubble - WhatsApp received message style */}
                <div className="flex gap-2">
                  <div className="flex-1">
                    <div className="bg-gradient-to-br from-[#1F2C34] to-[#1a252c] rounded-lg rounded-tl-none p-2.5 sm:p-3 shadow-lg border-l-2 border-[#C9A227]/30">
                      <p className="text-white text-xs sm:text-sm md:text-base leading-relaxed font-normal mb-2">
                        {testimonial.message}
                      </p>
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-[#8696A0] text-[10px] sm:text-xs">{testimonial.time}</span>
                        <CheckCheck className="w-3 h-3 sm:w-4 sm:h-4 text-[#53BDEB]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verified badge with ritual styling */}
                <div className="flex items-center justify-end gap-1 mt-2">
                  <div className="bg-[#C9A227]/10 border border-[#C9A227]/30 rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1 flex items-center gap-1">
                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#C9A227]" />
                    <span className="text-[#C9A227] text-[10px] sm:text-xs font-semibold">Transformação Verificada</span>
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
          className="mt-8 sm:mt-10 text-center"
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-[#C9A227]/10 border-2 border-[#C9A227]/30 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 mb-6 sm:mb-8">
            <div className="flex -space-x-2">
              {['👩🏻', '👨🏽', '👩🏼', '👨🏻', '👩🏾'].map((avatar, i) => (
                <div
                  key={i}
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#8B7355] to-[#C9A227] border-2 border-[#0B141A] flex items-center justify-center text-sm sm:text-lg"
                >
                  {avatar}
                </div>
              ))}
            </div>
            <p className="text-[#C9A227] text-xs sm:text-sm md:text-base font-bold">
              +21.400 pessoas já transformaram suas vidas
            </p>
          </div>

          {/* CTA Button after testimonials - Ritual styled */}
          {onCtaClick && (
            <div className="mt-6 sm:mt-8">
              <motion.button
                onClick={onCtaClick}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto mx-auto block relative overflow-hidden bg-gradient-to-r from-[#8B7355] via-[#C9A227] to-[#8B7355] hover:brightness-110 text-[#0a0510] font-black text-sm sm:text-base md:text-lg py-4 sm:py-5 px-8 sm:px-12 rounded-xl sm:rounded-2xl shadow-[0_8px_30px_rgba(201,162,39,0.4)] transition-all border-2 border-[#C9A227]/80 uppercase tracking-wide"
              >
                {/* Shimmer effect */}
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                />
                <span className="relative z-10">QUERO MEU RESULTADO TAMBÉM</span>
              </motion.button>
              <p className="text-slate-500 text-xs sm:text-sm mt-2 sm:mt-3">
                Junte-se a mais de 4.300 pessoas que já desbloquearam
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

import { motion } from 'framer-motion';
import { MessageCircle, TrendingUp, Briefcase, Heart, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Mariana S.',
    icon: TrendingUp,
    message: 'Anahí, você não vai acreditar! Fiz o desbloqueio do Dia 2 ontem à noite. Hoje de manhã recebi um PIX de uma dívida antiga que eu nem lembrava mais que existia. Tô arrepiada!',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 2,
    name: 'Carlos Eduardo',
    icon: Briefcase,
    message: 'Estava travado no profissional há 8 meses. Comecei o Mapa na segunda, hoje me chamaram pra entrevista e JÁ PASSEI! A sensação é que tirei uma âncora do pé.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 3,
    name: 'Fernanda L.',
    icon: Heart,
    message: 'Só queria agradecer. Eu sentia um peso nas costas que não saía com nada. Depois do áudio da Sala de Frequência, parece que tiraram uma tonelada de mim. Gratidão eterna.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 4,
    name: 'Roberto G.',
    icon: Star,
    message: 'Confesso que comprei desconfiado pelo valor ser baixo... mas o conteúdo vale 10x mais. Minha loja bateu recorde de vendas essa semana. O ritual da carteira é real!',
    color: 'from-yellow-500 to-amber-500',
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
            Milhares de pessoas já destravaram sua prosperidade
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              {/* Glow effect on hover */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${testimonial.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
              
              {/* Message bubble */}
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} mb-4 shadow-lg`}>
                  <testimonial.icon className="w-6 h-6 text-white" />
                </div>

                {/* Message */}
                <p className="text-gray-800 text-sm md:text-base leading-relaxed mb-4 font-medium">
                  "{testimonial.message}"
                </p>

                {/* Name and verified badge */}
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 text-sm font-bold">
                    — {testimonial.name}
                  </p>
                  <div className="flex items-center gap-1 text-emerald-600">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs font-semibold">Verificado</span>
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
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border-2 border-emerald-500/40 rounded-full px-6 py-3">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFD700] border-2 border-white flex items-center justify-center"
                >
                  <Star className="w-4 h-4 text-white fill-white" />
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

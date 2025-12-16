import { motion } from 'framer-motion';
import { Award, Globe, Users, Sparkles } from 'lucide-react';

export const MentorAuthority = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="my-16 py-12"
    >
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] mb-12"
        >
          QUEM CRIOU O MAPA XAMÂNICO?
        </motion.h2>

        {/* Content Container */}
        <div className="relative bg-gradient-to-br from-[#1a0b2e]/80 to-[#2d1b4e]/60 backdrop-blur-sm rounded-3xl border-2 border-[#D4AF37]/40 shadow-[0_0_40px_rgba(212,175,55,0.3)] overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-[#FFD700]/5 pointer-events-none" />

          <div className="relative grid md:grid-cols-[300px,1fr] gap-8 p-8 md:p-10">
            {/* Left: Photo and Badges */}
            <div className="flex flex-col items-center space-y-6">
              {/* Photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -inset-2 bg-gradient-to-br from-[#D4AF37] to-[#FFD700] rounded-full blur-xl opacity-40 animate-pulse" />
                <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
                    alt="Anahí Solara"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Authority Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="space-y-3 w-full"
              >
                <div className="flex items-center gap-3 bg-[#D4AF37]/20 backdrop-blur-sm rounded-lg px-4 py-3 border border-[#D4AF37]/30">
                  <Award className="w-5 h-5 text-[#FFD700]" />
                  <span className="text-white text-sm font-bold">12 Anos de Experiência</span>
                </div>
                <div className="flex items-center gap-3 bg-[#D4AF37]/20 backdrop-blur-sm rounded-lg px-4 py-3 border border-[#D4AF37]/30">
                  <Globe className="w-5 h-5 text-[#FFD700]" />
                  <span className="text-white text-sm font-bold">15 Países Visitados</span>
                </div>
                <div className="flex items-center gap-3 bg-[#D4AF37]/20 backdrop-blur-sm rounded-lg px-4 py-3 border border-[#D4AF37]/30">
                  <Users className="w-5 h-5 text-[#FFD700]" />
                  <span className="text-white text-sm font-bold">+20.000 Alunos</span>
                </div>
                <div className="flex items-center gap-3 bg-[#D4AF37]/20 backdrop-blur-sm rounded-lg px-4 py-3 border border-[#D4AF37]/30">
                  <Sparkles className="w-5 h-5 text-[#FFD700]" />
                  <span className="text-white text-sm font-bold">Imersão nos Andes</span>
                </div>
              </motion.div>
            </div>

            {/* Right: Story/Copy */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col justify-center space-y-5"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-[#FFD700] mb-2">
                Olá, sou Anahí Solara.
              </h3>

              <div className="space-y-4 text-slate-200 text-base md:text-lg leading-relaxed">
                <p>
                  Por <strong className="text-white">12 anos</strong>, eu fui exatamente como você: trabalhava 14h por dia, mas o dinheiro sempre fugia. Eu achava que era azar.
                </p>

                <p>
                  Até que, em uma <strong className="text-[#FFD700]">imersão profunda com Xamãs nos Andes</strong>, descobri a verdade brutal: a pobreza não é falta de esforço. É uma <strong className="text-white">Herança Vibracional</strong>.
                </p>

                <p>
                  Foi para quebrar esse ciclo de escassez que eu criei o <strong className="text-[#FFD700]">MAPA XAMÂNICO</strong>.
                </p>

                <p>
                  Ele não é um livro de autoajuda. O Mapa é a sistematização de tudo que aprendi para identificar e desativar os <strong className="text-white">Arquétipos de Bloqueio</strong> que impedem sua prosperidade.
                </p>

                <p>
                  Hoje, com mais de <strong className="text-[#FFD700]">20.000 alunos destravados em 15 países</strong>, minha missão é te entregar esse mesmo "Código de Desbloqueio" que salvou a minha vida financeira.
                </p>

                <div className="bg-[#FFD700]/10 border-l-4 border-[#FFD700] rounded-r-lg p-4 mt-6">
                  <p className="text-[#FFD700] font-bold text-lg italic">
                    O que você está prestes a acessar é a chave que eu gostaria de ter recebido há 10 anos.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

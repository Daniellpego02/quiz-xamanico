import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    id: 1,
    question: 'Tenho pouco tempo, consigo fazer?',
    answer: 'Sim. O protocolo foi desenhado para ser feito em 12 min/dia. É sobre frequência, não volume de trabalho. Você pode ouvir enquanto se arruma pela manhã ou antes de dormir.',
  },
  {
    id: 2,
    question: 'Isso tem a ver com alguma religião?',
    answer: 'Não. É ciência ancestral e frequência vibracional (528Hz). Funciona independente da sua crença. O Mapa Xamânico é baseado em arquétipos universais e princípios energéticos que transcendem qualquer religião.',
  },
  {
    id: 3,
    question: 'Como recebo o acesso ao Mapa?',
    answer: 'O acesso é imediato e 100% online. Assim que o pagamento for aprovado, você recebe um e-mail com seu login e senha para nossa Área de Membros exclusiva.',
  },
  {
    id: 4,
    question: 'E se não funcionar para mim?',
    answer: 'Você tem 7 dias de garantia incondicional. Se não sentir mudança, devolvemos seu dinheiro. Sem perguntas, sem burocracia. O risco é todo nosso, porque sabemos que o método funciona.',
  },
  {
    id: 5,
    question: 'Por quanto tempo terei acesso?',
    answer: 'Adquirindo hoje nessa oferta especial, seu acesso é VITALÍCIO. Você pode refazer o ciclo de 7 dias quantas vezes quiser e terá direito a todas as atualizações futuras gratuitamente.',
  },
];

export const FAQ = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="my-16 py-12"
    >
      <div className="max-w-3xl mx-auto px-4">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] mb-12"
        >
          PERGUNTAS FREQUENTES
        </motion.h2>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Glow effect when open */}
              {openId === faq.id && (
                <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-xl blur-lg opacity-20 animate-pulse" />
              )}

              <div className="relative bg-gradient-to-br from-[#1a0b2e]/80 to-[#2d1b4e]/60 backdrop-blur-sm border-2 border-[#D4AF37]/30 rounded-xl overflow-hidden hover:border-[#FFD700]/50 transition-all">
                {/* Question Button */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left group"
                >
                  <span className="text-white text-base md:text-lg font-bold pr-4 group-hover:text-[#FFD700] transition-colors">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openId === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-[#FFD700]" />
                  </motion.div>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-5 md:pb-6 border-t border-[#D4AF37]/20">
                        <p className="text-slate-300 text-sm md:text-base leading-relaxed pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center"
        >
          <p className="text-slate-400 text-sm mb-4">
            Ainda tem dúvidas?
          </p>
          <a
            href="mailto:suporte@mapaxamanico.com"
            className="inline-flex items-center gap-2 text-[#FFD700] hover:text-[#FFA500] font-semibold transition-colors"
          >
            Entre em contato: suporte@mapaxamanico.com
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

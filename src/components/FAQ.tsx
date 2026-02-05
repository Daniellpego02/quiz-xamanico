import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { ReactNode } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: ReactNode;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: '🧭 Qual plano é o ideal pra mim?',
    answer: (
      <>
        Se você está começando agora no caminho da cura ancestral, o plano <span className="text-[#FFD700] font-semibold">"O Chamado" (R$19)</span> é perfeito para dar os primeiros passos. Se quer uma transformação mais profunda, <span className="text-[#FFD700] font-semibold">"O Desbloqueio Completo" (R$29)</span> é o mais escolhido. Já <span className="text-[#FFD700] font-semibold">"A Ascensão" (R$49)</span> é para quem deseja uma transformação completa e acesso ao grupo secreto de orientações.
      </>
    ),
  },
  {
    id: 2,
    question: '🧘 Preciso ter experiência com espiritualidade para funcionar?',
    answer: (
      <>
        Não! O protocolo é baseado em <span className="text-[#FFD700] font-semibold">psicogenealogia</span>, <span className="text-[#FFD700] font-semibold">física quântica</span> e <span className="text-[#FFD700] font-semibold">técnicas ancestrais</span> que funcionam independente da sua crença, religião ou experiência prévia. É sobre libertar padrões energéticos, não sobre fé. Qualquer pessoa pode fazer o ritual.
      </>
    ),
  },
  {
    id: 3,
    question: '⏳ Posso comprar agora e fazer depois?',
    answer: (
      <>
        Sim! Após a compra, você tem <span className="text-[#FFD700] font-semibold">acesso vitalício</span> ao conteúdo. Pode começar quando sentir que é o momento certo. Sinta quando for o momento certo. O Mapa estará lá esperando por você. 🌕
      </>
    ),
  },
  {
    id: 4,
    question: '💌 Recebo tudo no e-mail?',
    answer: (
      <>
        Sim! <span className="text-[#FFD700] font-semibold">Imediatamente após a confirmação</span> do pagamento, você recebe um e-mail com o link de acesso ao portal. Lá estão todos os PDFs, áudios e instruções organizados de forma clara.
      </>
    ),
  },
  {
    id: 5,
    question: '📱 Funciona no meu celular?',
    answer: (
      <>
        Sim. O acesso é enviado por e-mail e você pode abrir os áudios e o mapa em <span className="text-[#FFD700] font-semibold">qualquer celular</span> (Android ou iPhone). Também funciona no computador.
      </>
    ),
  },
  {
    id: 6,
    question: '⚡ Quanto tempo demora para ver resultados?',
    answer: (
      <>
        Muitas pessoas relatam sensações de leveza e desbloqueio já nos <span className="text-[#FFD700] font-semibold">primeiros 3 dias</span>. Resultados mais tangíveis (sincronicidades financeiras, propostas inesperadas) costumam aparecer <span className="text-[#FFD700] font-semibold">entre 7 e 21 dias</span>, dependendo da abertura energética de cada pessoa. Confie no processo — a transformação já começou. ✨
      </>
    ),
  },
  {
    id: 7,
    question: '🛡 E se eu não sentir nada?',
    answer: (
      <>
        Você tem a <span className="text-[#FFD700] font-semibold">garantia ritual de 7 dias</span>. Se não sentir nenhum tipo de desbloqueio, clareza ou transformação sutil, devolvemos seu investimento sem perguntas. O risco é todo nosso. Você está protegido(a). 🌿
      </>
    ),
  },
  {
    id: 8,
    question: '⬆️ Posso fazer upgrade depois?',
    answer: (
      <>
        Sim, você pode fazer <span className="text-[#FFD700] font-semibold">upgrade a qualquer momento</span>. Basta entrar em contato com nosso suporte e pagaremos apenas a diferença entre os planos.
      </>
    ),
  },
  {
    id: 9,
    question: '🔒 É seguro pagar? Como recebo o mapa?',
    answer: (
      <>
        <span className="text-[#FFD700] font-semibold">Totalmente seguro!</span> O pagamento é processado via PIX com <span className="text-[#FFD700] font-semibold">criptografia de ponta</span>. Após a confirmação (geralmente instantânea), você recebe automaticamente um e-mail com o link de acesso ao seu Mapa Xamânico e todos os materiais do ritual. Não precisa se preocupar com nada.
      </>
    ),
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
                  <span className={`text-base md:text-lg font-bold pr-4 transition-all ${
                    openId === faq.id 
                      ? 'text-[#FFD700] drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]' 
                      : 'text-white group-hover:text-[#FFD700]'
                  }`}>
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

import { motion } from 'framer-motion';
import { Check, Sparkles, Star, Crown, Shield, Lock, Zap } from 'lucide-react';

interface Plan {
  name: string;
  subtitle: string;
  price: string;
  features: string[];
  buttonText: string;
  badge: string;
  checkoutLink: string;
  icon: React.ReactNode;
  borderColor: string;
  glowColor: string;
  isPopular?: boolean;
}

const plans: Plan[] = [
  {
    name: 'O Chamado',
    subtitle: 'Para quem sente que algo precisa mudar…',
    price: '19',
    features: [
      'Diagnóstico de Lealdade Invisível (PDF)',
      'Mapa Xamânico Básico com instruções iniciais',
      'Ritual de ativação de 3 dias (1 áudio)'
    ],
    buttonText: 'Começar minha limpeza ancestral',
    badge: 'Iniciante',
    checkoutLink: 'https://pay.lowify.com.br/checkout.php?product_id=manflx',
    icon: <Sparkles className="w-6 h-6" />,
    borderColor: 'border-gray-500/40',
    glowColor: 'from-gray-500/10 to-gray-600/5',
    isPopular: false
  },
  {
    name: 'O Desbloqueio Completo',
    subtitle: 'Para quem está pronto para o desbloqueio completo',
    price: '29',
    features: [
      'Mapa Xamânico Personalizado + Diagnóstico completo',
      'Protocolo energético de 7 dias + 3 áudios rituais',
      'PDF bônus: Os 4 Bloqueios da Linhagem Ancestral'
    ],
    buttonText: 'Desbloquear meu fluxo financeiro',
    badge: '🔥 Mais Escolhido',
    checkoutLink: 'https://pay.lowify.com.br/go.php?offer=zsa1x42',
    icon: <Star className="w-6 h-6" />,
    borderColor: 'border-[#D4AF37]',
    glowColor: 'from-[#D4AF37]/20 to-[#FFD700]/10',
    isPopular: true
  },
  {
    name: 'A Ascensão',
    subtitle: 'Para quem quer reescrever o destino da linhagem',
    price: '49',
    features: [
      'Tudo do plano completo',
      'Ritual extra: "Elemento Oculto" (áudio + PDF)',
      'Acesso a grupo secreto por 30 dias (orientações energéticas)',
      'PDF: Oração de Despedida à Lealdade Ancestral'
    ],
    buttonText: 'Liberar o karma financeiro da família',
    badge: 'Avançado',
    checkoutLink: 'https://pay.lowify.com.br/go.php?offer=1hy3fg2',
    icon: <Crown className="w-6 h-6" />,
    borderColor: 'border-purple-500/60',
    glowColor: 'from-purple-500/20 to-[#D4AF37]/10',
    isPopular: false
  }
];

export const PricingPlans = () => {
  const handleCheckout = (link: string) => {
    window.location.href = link;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-12"
    >
      {/* Section Title */}
      <div className="text-center mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] mb-4"
        >
          Qual caminho te escolhe?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto px-4"
        >
          Cada plano representa um <span className="text-[#FFD700] font-semibold">nível de comprometimento com a sua cura ancestral.</span><br />
          Escolha não apenas com o bolso — mas com a alma.
        </motion.p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.15, duration: 0.5 }}
            className={`relative ${plan.isPopular ? 'md:-mt-4 md:mb-4' : ''}`}
          >
            {/* Glow effect for popular plan */}
            {plan.isPopular && (
              <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] rounded-3xl blur-lg opacity-30 animate-pulse" />
            )}

            <div
              className={`relative h-full bg-gradient-to-br ${plan.glowColor} backdrop-blur-sm border-2 ${plan.borderColor} rounded-2xl p-6 flex flex-col transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.2)] ${plan.isPopular ? 'shadow-[0_0_30px_rgba(212,175,55,0.3)]' : ''}`}
            >
              {/* Badge */}
              <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${plan.isPopular ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black' : 'bg-white/10 text-white'} px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap shadow-lg`}>
                {plan.badge}
              </div>

              {/* Plan Icon */}
              <div className={`mx-auto mt-4 mb-4 w-14 h-14 rounded-full flex items-center justify-center ${plan.isPopular ? 'bg-gradient-to-br from-[#D4AF37] to-[#FFD700] text-black' : 'bg-white/10 text-[#FFD700]'}`}>
                {plan.icon}
              </div>

              {/* Plan Name */}
              <h3 className={`text-xl font-black text-center mb-2 ${plan.isPopular ? 'text-[#FFD700]' : 'text-white'}`}>
                {plan.name}
              </h3>

              {/* Subtitle */}
              <p className="text-slate-400 text-sm text-center mb-6 italic">
                {plan.subtitle}
              </p>

              {/* Price */}
              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-slate-400 text-lg">R$</span>
                  <span className={`text-5xl font-black ${plan.isPopular ? 'text-[#FFD700] drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]' : 'text-white'}`}>
                    {plan.price}
                  </span>
                </div>
                <p className="text-slate-500 text-xs mt-1">pagamento único</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.isPopular ? 'bg-[#D4AF37]/20 text-[#FFD700]' : 'bg-white/10 text-emerald-400'}`}>
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-slate-300 text-sm leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => handleCheckout(plan.checkoutLink)}
                className={`w-full font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-95 ${
                  plan.isPopular
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] hover:from-[#FFD700] hover:to-[#D4AF37] text-black shadow-[0_0_30px_rgba(212,175,55,0.5)]'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="flex flex-wrap items-center justify-center gap-4 mt-10 px-4"
      >
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs text-slate-300">
          <Lock className="w-4 h-4 text-emerald-400" />
          <span>Pagamento 100% Seguro</span>
        </div>
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs text-slate-300">
          <Zap className="w-4 h-4 text-[#FFD700]" />
          <span>Acesso Imediato</span>
        </div>
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs text-slate-300">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>Garantia de 7 Dias</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PricingPlans;

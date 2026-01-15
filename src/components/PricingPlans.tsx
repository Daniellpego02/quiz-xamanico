import { motion } from 'framer-motion';
import { Check, Sparkles, Star, Crown, Shield, Lock, Zap } from 'lucide-react';

interface Plan {
  name: string;
  subtitle: string;
  targetAudience: string;
  price: string;
  features: string[];
  buttonText: string;
  badge: string;
  checkoutLink: string;
  icon: React.ReactNode;
  borderColor: string;
  glowColor: string;
  isPopular?: boolean;
  mockupImage?: string;
}

const plans: Plan[] = [
  {
    name: 'O Chamado',
    subtitle: 'Para quem sente que algo precisa mudar…',
    targetAudience: 'Pra quem quer começar e testar o ritual.',
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
    isPopular: false,
    mockupImage: '/mockup.png'
  },
  {
    name: 'O Desbloqueio Completo',
    subtitle: 'Para quem está pronto para o desbloqueio completo',
    targetAudience: 'Pra quem quer o protocolo completo de 7 dias.',
    price: '29',
    features: [
      'Mapa Xamânico Personalizado + Diagnóstico completo',
      'Protocolo energético de 7 dias + 3 áudios rituais',
      'PDF bônus: Os 4 Bloqueios da Linhagem Ancestral'
    ],
    buttonText: '🔓 DESBLOQUEAR AGORA (mais escolhido)',
    badge: '🔥 Mais Escolhido',
    checkoutLink: 'https://pay.lowify.com.br/go.php?offer=zsa1x42',
    icon: <Star className="w-6 h-6" />,
    borderColor: 'border-[#D4AF37]',
    glowColor: 'from-[#D4AF37]/20 to-[#FFD700]/10',
    isPopular: true,
    mockupImage: '/mockup.png'
  },
  {
    name: 'A Ascensão',
    subtitle: 'Para quem quer reescrever o destino da linhagem',
    targetAudience: 'Pra quem quer encerrar o ciclo na família.',
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
    isPopular: false,
    mockupImage: '/mockup.png'
  }
];

// Comparison table data
const comparisonFeatures = [
  { name: 'Mapa Xamânico', plan1: true, plan2: true, plan3: true },
  { name: 'Protocolo 7 dias', plan1: false, plan2: true, plan3: true },
  { name: 'Áudios Rituais', plan1: '1', plan2: '3', plan3: '3+' },
  { name: 'Ritual Elemento Oculto', plan1: false, plan2: false, plan3: true },
  { name: 'Grupo Secreto (30 dias)', plan1: false, plan2: false, plan3: true },
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
          className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto px-4 mb-2"
        >
          Escolha o nível de profundidade que faz sentido pra você hoje.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-slate-400 text-sm max-w-xl mx-auto px-4"
        >
          Cada plano representa um <span className="text-[#FFD700] font-semibold">nível de comprometimento com a sua cura ancestral.</span>
        </motion.p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 items-stretch">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: plan.isPopular ? 1.05 : 1 }}
            transition={{ delay: 0.4 + index * 0.15, duration: 0.5 }}
            className={`relative ${plan.isPopular ? 'md:-mt-6 md:mb-6 z-10' : 'z-0'}`}
          >
            {/* Glow effect for popular plan */}
            {plan.isPopular && (
              <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] rounded-3xl blur-lg opacity-40 animate-pulse" />
            )}

            <div
              className={`relative h-full bg-gradient-to-br ${plan.glowColor} backdrop-blur-sm border-2 ${plan.borderColor} rounded-2xl p-6 flex flex-col transition-all duration-300 hover:shadow-[0_0_50px_rgba(212,175,55,0.3)] hover:-translate-y-1 hover:border-[#FFD700]/60 group ${plan.isPopular ? 'shadow-[0_0_40px_rgba(212,175,55,0.4)] border-[#FFD700]' : ''}`}
            >
              {/* Badge */}
              <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${plan.isPopular ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black shadow-[0_0_20px_rgba(212,175,55,0.6)]' : 'bg-white/10 text-white'} px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap`}>
                {plan.badge}
              </div>

              {/* Mockup Image */}
              {plan.mockupImage && (
                <div className="relative mx-auto mt-4 mb-4 transition-transform duration-300 group-hover:-translate-y-1">
                  <img 
                    src={plan.mockupImage} 
                    alt={`Mockup ${plan.name}`}
                    className={`w-24 h-auto object-contain rounded-lg shadow-lg ${plan.isPopular ? 'w-32 shadow-[0_10px_40px_rgba(212,175,55,0.3)]' : ''}`}
                  />
                  {plan.isPopular && (
                    <div className="absolute -inset-2 bg-[#FFD700]/10 blur-xl -z-10"></div>
                  )}
                </div>
              )}

              {/* Plan Icon */}
              <div className={`mx-auto mb-3 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${plan.isPopular ? 'bg-gradient-to-br from-[#D4AF37] to-[#FFD700] text-black w-14 h-14' : 'bg-white/10 text-[#FFD700]'}`}>
                {plan.icon}
              </div>

              {/* Plan Name */}
              <h3 className={`text-xl font-black text-center mb-1 ${plan.isPopular ? 'text-[#FFD700] text-2xl' : 'text-white'}`}>
                {plan.name}
              </h3>

              {/* Target Audience - "Para quem é" */}
              <p className={`text-center text-xs mb-4 px-2 py-1 rounded-full mx-auto ${plan.isPopular ? 'bg-[#FFD700]/20 text-[#FFD700] font-semibold' : 'bg-white/5 text-slate-400'}`}>
                {plan.targetAudience}
              </p>

              {/* Price */}
              <div className="text-center mb-4">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-slate-400 text-lg">R$</span>
                  <span className={`font-black ${plan.isPopular ? 'text-6xl text-[#FFD700] drop-shadow-[0_0_30px_rgba(255,215,0,0.6)]' : 'text-5xl text-white'}`}>
                    {plan.price}
                  </span>
                </div>
                <p className="text-slate-500 text-xs mt-1">pagamento único</p>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-6 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${plan.isPopular ? 'bg-[#D4AF37]/30 text-[#FFD700]' : 'bg-white/10 text-emerald-400'}`}>
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-slate-300 text-sm leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => handleCheckout(plan.checkoutLink)}
                className={`w-full font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.03] active:scale-95 group-hover:shadow-lg ${
                  plan.isPopular
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] hover:from-[#FFD700] hover:to-[#D4AF37] text-black shadow-[0_0_30px_rgba(212,175,55,0.5)] text-lg py-5'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-[#FFD700]/40'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-12 max-w-3xl mx-auto px-4"
      >
        <h4 className="text-center text-lg font-bold text-[#FFD700] mb-4">📊 Comparativo Rápido</h4>
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Recurso</th>
                <th className="text-center py-3 px-2 text-slate-300 font-bold">R$19</th>
                <th className="text-center py-3 px-2 text-[#FFD700] font-bold bg-[#FFD700]/10">R$29</th>
                <th className="text-center py-3 px-2 text-slate-300 font-bold">R$49</th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((feature, idx) => (
                <tr key={idx} className="border-b border-white/5">
                  <td className="py-3 px-4 text-slate-300">{feature.name}</td>
                  <td className="text-center py-3 px-2">
                    {typeof feature.plan1 === 'boolean' 
                      ? (feature.plan1 ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <span className="text-slate-600">—</span>)
                      : <span className="text-slate-300">{feature.plan1}</span>
                    }
                  </td>
                  <td className="text-center py-3 px-2 bg-[#FFD700]/5">
                    {typeof feature.plan2 === 'boolean' 
                      ? (feature.plan2 ? <Check className="w-4 h-4 text-[#FFD700] mx-auto" /> : <span className="text-slate-600">—</span>)
                      : <span className="text-[#FFD700] font-semibold">{feature.plan2}</span>
                    }
                  </td>
                  <td className="text-center py-3 px-2">
                    {typeof feature.plan3 === 'boolean' 
                      ? (feature.plan3 ? <Check className="w-4 h-4 text-purple-400 mx-auto" /> : <span className="text-slate-600">—</span>)
                      : <span className="text-purple-300">{feature.plan3}</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

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

// Mini version for strategic repetition
export const MiniPricingBar = () => {
  const scrollToPricing = () => {
    document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-[#1a0b2e]/90 to-[#2d1b4e]/90 border border-[#D4AF37]/30 rounded-2xl p-4 sm:p-6"
    >
      <p className="text-center text-slate-300 text-sm mb-4">Escolha seu caminho de transformação:</p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => window.location.href = 'https://pay.lowify.com.br/checkout.php?product_id=manflx'}
          className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all border border-white/10"
        >
          R$19 - Iniciante
        </button>
        <button
          onClick={() => window.location.href = 'https://pay.lowify.com.br/go.php?offer=zsa1x42'}
          className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-105"
        >
          R$29 - Completo 🔥
        </button>
        <button
          onClick={() => window.location.href = 'https://pay.lowify.com.br/go.php?offer=1hy3fg2'}
          className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all border border-purple-500/30"
        >
          R$49 - Ascensão
        </button>
      </div>
      <p className="text-center text-slate-500 text-xs mt-3">
        <Lock className="w-3 h-3 inline mr-1" />
        Pix + acesso imediato • Garantia 7 dias
      </p>
    </motion.div>
  );
};

export default PricingPlans;

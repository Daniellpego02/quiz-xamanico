import { motion } from 'framer-motion';
import { Check, Sparkles, Star, Crown, Shield, Lock, Zap, ArrowRight, Gift } from 'lucide-react';

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
    buttonText: 'Começar minha limpeza',
    badge: '✨ Iniciante',
    checkoutLink: 'https://pay.lowify.com.br/checkout.php?product_id=manflx',
    icon: <Sparkles className="w-6 h-6" />,
    borderColor: 'border-slate-600/40',
    glowColor: 'from-slate-700/20 to-slate-800/10',
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
    buttonText: '🔓 DESBLOQUEAR AGORA',
    badge: '🔥 MAIS ESCOLHIDO',
    checkoutLink: 'https://pay.lowify.com.br/go.php?offer=zsa1x42',
    icon: <Star className="w-6 h-6" />,
    borderColor: 'border-[#D4AF37]',
    glowColor: 'from-[#D4AF37]/30 to-[#FFD700]/20',
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
      'Acesso a grupo secreto por 30 dias',
      'PDF: Oração de Despedida Ancestral'
    ],
    buttonText: 'Liberar o karma',
    badge: '👑 Avançado',
    checkoutLink: 'https://pay.lowify.com.br/go.php?offer=1hy3fg2',
    icon: <Crown className="w-6 h-6" />,
    borderColor: 'border-purple-500/50',
    glowColor: 'from-purple-600/20 to-[#D4AF37]/15',
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
      className="py-8"
    >
      {/* Section Header - Enhanced */}
      <div className="text-center mb-8 px-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37]/20 to-[#FFD700]/10 border border-[#D4AF37]/40 px-4 py-2 rounded-full mb-4"
        >
          <Gift className="w-4 h-4 text-[#FFD700]" />
          <span className="text-[#FFD700] text-sm font-bold uppercase tracking-wider">Escolha Seu Destino</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4"
        >
          Qual <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37]">caminho</span> te escolhe?
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-slate-400 text-base max-w-md mx-auto"
        >
          Escolha o nível de profundidade que faz sentido pra você <span className="text-white font-semibold">hoje</span>.
        </motion.p>
      </div>

      {/* Pricing Cards - Mobile First Stack */}
      <div className="space-y-6 max-w-lg mx-auto px-4 md:max-w-6xl md:grid md:grid-cols-3 md:gap-6 md:space-y-0 md:items-stretch">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.15, duration: 0.5 }}
            className={`relative ${plan.isPopular ? 'md:-mt-4 md:mb-4 z-10' : 'z-0'}`}
          >
            {/* Glow effect for popular plan */}
            {plan.isPopular && (
              <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] rounded-3xl blur-lg opacity-50 animate-pulse" />
            )}

            <div
              className={`relative h-full bg-gradient-to-br ${plan.glowColor} backdrop-blur-sm border-2 ${plan.borderColor} rounded-3xl p-5 sm:p-6 flex flex-col transition-all duration-300 active:scale-[0.98] ${plan.isPopular ? 'shadow-[0_0_50px_rgba(212,175,55,0.4)] border-[#FFD700]' : 'hover:border-[#FFD700]/40'}`}
            >
              {/* Badge - Enhanced */}
              <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 ${plan.isPopular ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black shadow-[0_4px_20px_rgba(212,175,55,0.6)]' : 'bg-slate-800 text-slate-300 border border-slate-700'} px-5 py-2 rounded-full text-sm font-black whitespace-nowrap`}>
                {plan.badge}
              </div>

              {/* Plan Header */}
              <div className="text-center mt-4 mb-4">
                {/* Icon */}
                <div className={`mx-auto mb-3 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${plan.isPopular ? 'bg-gradient-to-br from-[#D4AF37] to-[#FFD700] text-black shadow-[0_4px_20px_rgba(212,175,55,0.4)]' : 'bg-white/10 text-[#FFD700]'}`}>
                  {plan.icon}
                </div>
                
                {/* Plan Name */}
                <h3 className={`text-xl sm:text-2xl font-black mb-2 ${plan.isPopular ? 'text-[#FFD700]' : 'text-white'}`}>
                  {plan.name}
                </h3>
                
                {/* Target Audience */}
                <p className={`text-xs px-3 py-1.5 rounded-full inline-block ${plan.isPopular ? 'bg-[#FFD700]/20 text-[#FFD700] font-semibold' : 'bg-white/5 text-slate-400'}`}>
                  {plan.targetAudience}
                </p>
              </div>

              {/* Price - Big and Bold */}
              <div className="text-center mb-5 py-4 bg-black/20 rounded-2xl border border-white/5">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-slate-400 text-xl">R$</span>
                  <span className={`font-black leading-none ${plan.isPopular ? 'text-7xl text-[#FFD700] drop-shadow-[0_0_40px_rgba(255,215,0,0.6)]' : 'text-6xl text-white'}`}>
                    {plan.price}
                  </span>
                </div>
                <p className="text-slate-500 text-sm mt-2">pagamento único • acesso vitalício</p>
              </div>

              {/* Features - Enhanced */}
              <ul className="space-y-3 mb-6 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center ${plan.isPopular ? 'bg-[#D4AF37]/30 text-[#FFD700]' : 'bg-emerald-500/20 text-emerald-400'}`}>
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-slate-300 text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button - Enhanced */}
              <button
                onClick={() => handleCheckout(plan.checkoutLink)}
                className={`w-full font-black py-4 px-6 rounded-2xl transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 ${
                  plan.isPopular
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] hover:from-[#FFD700] hover:to-[#D4AF37] text-black text-lg shadow-[0_4px_30px_rgba(212,175,55,0.5)] hover:shadow-[0_4px_40px_rgba(212,175,55,0.7)]'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-[#FFD700]/50'
                }`}
              >
                {plan.buttonText}
                <ArrowRight className={`w-5 h-5 ${plan.isPopular ? '' : 'opacity-70'}`} />
              </button>
              
              {/* Guarantee Badge */}
              {plan.isPopular && (
                <div className="mt-4 flex items-center justify-center gap-2 text-emerald-400 text-xs">
                  <Shield className="w-4 h-4" />
                  <span>Garantia de 7 dias</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comparison Table - Enhanced Mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-12 max-w-lg mx-auto px-4"
      >
        <h4 className="text-center text-lg font-bold text-[#FFD700] mb-4 flex items-center justify-center gap-2">
          <span className="text-2xl">📊</span> Comparativo Rápido
        </h4>
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-[#D4AF37]/20 rounded-2xl overflow-hidden shadow-xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#D4AF37]/20 bg-[#D4AF37]/5">
                <th className="text-left py-4 px-4 text-slate-400 font-medium">Recurso</th>
                <th className="text-center py-4 px-2 text-slate-300 font-bold text-xs">R$19</th>
                <th className="text-center py-4 px-2 text-[#FFD700] font-black text-xs bg-[#FFD700]/10">R$29</th>
                <th className="text-center py-4 px-2 text-slate-300 font-bold text-xs">R$49</th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((feature, idx) => (
                <tr key={idx} className="border-b border-white/5 last:border-b-0">
                  <td className="py-3 px-4 text-slate-300 text-xs">{feature.name}</td>
                  <td className="text-center py-3 px-2">
                    {typeof feature.plan1 === 'boolean' 
                      ? (feature.plan1 ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <span className="text-slate-600">—</span>)
                      : <span className="text-slate-300 font-semibold">{feature.plan1}</span>
                    }
                  </td>
                  <td className="text-center py-3 px-2 bg-[#FFD700]/5">
                    {typeof feature.plan2 === 'boolean' 
                      ? (feature.plan2 ? <Check className="w-5 h-5 text-[#FFD700] mx-auto" /> : <span className="text-slate-600">—</span>)
                      : <span className="text-[#FFD700] font-black">{feature.plan2}</span>
                    }
                  </td>
                  <td className="text-center py-3 px-2">
                    {typeof feature.plan3 === 'boolean' 
                      ? (feature.plan3 ? <Check className="w-4 h-4 text-purple-400 mx-auto" /> : <span className="text-slate-600">—</span>)
                      : <span className="text-purple-300 font-semibold">{feature.plan3}</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Trust Badges - Enhanced */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="flex flex-wrap items-center justify-center gap-3 mt-8 px-4"
      >
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2.5 rounded-full">
          <Lock className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-400 text-xs font-semibold">100% Seguro</span>
        </div>
        <div className="flex items-center gap-2 bg-[#FFD700]/10 border border-[#FFD700]/30 px-4 py-2.5 rounded-full">
          <Zap className="w-4 h-4 text-[#FFD700]" />
          <span className="text-[#FFD700] text-xs font-semibold">Acesso Imediato</span>
        </div>
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2.5 rounded-full">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-400 text-xs font-semibold">Garantia 7 Dias</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Mini version for strategic repetition - Enhanced
export const MiniPricingBar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#1a0b2e]/95 to-[#2d1b4e]/95 border-2 border-[#D4AF37]/40 rounded-3xl p-5 shadow-[0_0_40px_rgba(212,175,55,0.15)]"
    >
      <div className="text-center mb-4">
        <p className="text-[#FFD700] font-bold text-sm mb-1">🎁 Escolha seu caminho agora</p>
        <p className="text-slate-400 text-xs">Acesso imediato após pagamento</p>
      </div>
      
      <div className="space-y-3">
        <button
          onClick={() => window.location.href = 'https://pay.lowify.com.br/checkout.php?product_id=manflx'}
          className="w-full bg-white/10 hover:bg-white/15 text-white py-3 px-4 rounded-xl text-sm font-semibold transition-all border border-white/10 flex items-center justify-between active:scale-[0.98]"
        >
          <span>✨ Iniciante</span>
          <span className="text-[#FFD700] font-black">R$19</span>
        </button>
        
        <button
          onClick={() => window.location.href = 'https://pay.lowify.com.br/go.php?offer=zsa1x42'}
          className="w-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black py-4 px-4 rounded-xl text-sm font-black transition-all shadow-[0_4px_20px_rgba(212,175,55,0.4)] flex items-center justify-between active:scale-[0.98] hover:shadow-[0_4px_30px_rgba(212,175,55,0.6)]"
        >
          <span>🔥 Completo (mais escolhido)</span>
          <span>R$29</span>
        </button>
        
        <button
          onClick={() => window.location.href = 'https://pay.lowify.com.br/go.php?offer=1hy3fg2'}
          className="w-full bg-white/10 hover:bg-white/15 text-white py-3 px-4 rounded-xl text-sm font-semibold transition-all border border-purple-500/30 flex items-center justify-between active:scale-[0.98]"
        >
          <span>👑 Ascensão</span>
          <span className="text-purple-400 font-black">R$49</span>
        </button>
      </div>
      
      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-400">
        <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-emerald-400" /> Pix seguro</span>
        <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-emerald-400" /> 7 dias garantia</span>
      </div>
    </motion.div>
  );
};

export default PricingPlans;

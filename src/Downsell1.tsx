import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, X, Shield, Star, Heart, Sparkles, TrendingUp, Zap, Gift, ChevronRight, DollarSign } from 'lucide-react';
import { PRICING, CHECKOUT_URLS, TIMER_DURATIONS } from './constants/pricing';

interface Downsell1Props {
  userName?: string;
}

export default function Downsell1({ userName = 'você' }: Downsell1Props) {
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(TIMER_DURATIONS.downsell1);

  const firstName = userName ? userName.split(' ')[0] : 'você';
  const firstNameUpper = firstName.toUpperCase();

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Exit intent popup (desktop and mobile)
  useEffect(() => {
    let exitTimeout: ReturnType<typeof setTimeout>;
    let touchStartY = 0;
    
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !showExitPopup) {
        exitTimeout = setTimeout(() => {
          setShowExitPopup(true);
        }, 100);
      }
    };

    // Mobile: detect upward swipe from top
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const swipeDistance = touchY - touchStartY;
      
      // If swiping up near the top of the page
      if (touchStartY < 50 && swipeDistance > 50 && !showExitPopup) {
        exitTimeout = setTimeout(() => {
          setShowExitPopup(true);
        }, 300);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      if (exitTimeout) clearTimeout(exitTimeout);
    };
  }, [showExitPopup]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAccept = () => {
    window.location.href = CHECKOUT_URLS.downsell1;
  };

  const handleDecline = () => {
    window.location.href = '/obrigado';
  };

  const handleExitAccept = () => {
    setShowExitPopup(false);
    handleAccept();
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f1419] text-white relative overflow-hidden">
        
        {/* Gentler Top Bar */}
        <div className="sticky top-0 z-50 bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-purple-900/90 backdrop-blur-sm border-b border-purple-500/30 shadow-xl">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-center gap-3">
              <Clock className="w-5 h-5 text-purple-300 animate-pulse" />
              <span className="text-purple-200 text-sm md:text-base font-bold">
                ⏰ Oferta Especial Expira em: <span className="text-yellow-300 font-mono text-lg">{formatTime(timeLeft)}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 pb-32 relative z-10">
          
          {/* HEADLINE - EMPÁTICA */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-4 mb-8 md:mb-12"
          >
            <div className="inline-block bg-purple-600/20 border-2 border-purple-400 rounded-2xl px-6 py-3 mb-4">
              <p className="text-purple-300 font-bold text-sm md:text-base uppercase tracking-wider">
                💜 Está Tudo Bem
              </p>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
              EU ENTENDO, <span className="text-purple-400">{firstNameUpper}</span>...
            </h1>
            <p className="text-xl md:text-3xl font-bold text-gray-300 leading-tight max-w-3xl mx-auto">
              Talvez não seja o momento de fazer a Quebra Profunda agora. <span className="text-purple-400">E está tudo bem.</span>
            </p>
          </motion.div>

          {/* EMPATIA */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-purple-950/40 to-indigo-950/40 backdrop-blur-sm border-2 border-purple-500/30 rounded-3xl p-6 md:p-10 mb-8 md:mb-12 shadow-2xl"
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-lg md:text-xl text-white leading-relaxed mb-4">
                Eu sei que você já investiu no Mapa e talvez esteja receoso de dar mais um passo grande. <strong className="text-purple-400">Eu respeito isso</strong>.
              </p>
              
              <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto my-6 rounded-full"></div>
              
              <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-6">
                Mas a minha missão é garantir que você tenha <strong className="text-white">resultado</strong>, mesmo que não possa investir na Cerimônia completa agora.
              </p>

              <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-2 border-purple-500/50 rounded-2xl p-6 text-center">
                <Heart className="w-12 h-12 text-pink-400 mx-auto mb-3" />
                <p className="text-lg md:text-xl font-bold text-purple-200 leading-relaxed">
                  Eu não quero que você saia de mãos vazias caso uma <strong className="text-white">emergência financeira</strong> aconteça amanhã.
                </p>
              </div>
            </div>
          </motion.div>

          {/* MECANISMO - Códigos Grabovoi */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8 md:mb-12"
          >
            <div className="bg-gradient-to-br from-[#1a1a2e] via-[#2d1b4e] to-[#1a1a2e] rounded-3xl p-6 md:p-10 border-2 border-[#FFD700]/50 shadow-[0_0_60px_rgba(255,215,0,0.2)] relative overflow-hidden">
              {/* Glow effects */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="inline-block bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-[#FFD700] rounded-2xl px-6 py-4 mb-6">
                    <p className="text-sm text-yellow-300 mb-2 uppercase tracking-wider">Por isso, quero te dar acesso ao meu:</p>
                    <div className="flex items-center justify-center gap-3 flex-wrap">
                      <Sparkles className="w-8 h-8 text-[#FFD700]" />
                      <h2 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700]">
                        GUIA DE CÓDIGOS DE ATIVAÇÃO IMEDIATA
                      </h2>
                      <Sparkles className="w-8 h-8 text-[#FFD700]" />
                    </div>
                    <p className="text-sm text-gray-400 mt-2">(Códigos Numéricos Grabovoi)</p>
                  </div>

                  <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-4">
                    Sabe quando você precisa de <strong className="text-red-400">dinheiro para pagar uma conta em 24h</strong>?
                  </p>
                  
                  <div className="bg-purple-950/50 border-l-4 border-purple-400 p-6 rounded-r-xl my-6 text-left">
                    <p className="text-base md:text-lg text-white leading-relaxed">
                      Existem <strong className="text-yellow-400">sequências numéricas</strong> que funcionam como <strong className="text-purple-400">"senhas" do universo</strong>. 
                    </p>
                    <p className="text-base md:text-lg text-gray-300 leading-relaxed mt-3">
                      Você olha, repete e <strong className="text-white">a realidade destrava</strong>.
                    </p>
                  </div>

                  <div className="bg-black/40 border-2 border-[#FFD700]/30 rounded-2xl p-6 inline-block">
                    <p className="text-xl md:text-2xl font-black text-[#FFD700] mb-2">
                      É simples, rápido e não exige rituais complexos. 💨
                    </p>
                    <p className="text-base text-gray-300">
                      É o seu <strong className="text-red-400">Botão de Pânico</strong>.
                    </p>
                  </div>
                </div>

                {/* O QUE ESTÁ INCLUÍDO */}
                <div className="mb-8">
                  <h3 className="text-2xl md:text-3xl font-black text-center text-white mb-6">
                    📋 O Que Você Vai Receber:
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 bg-white/5 p-5 rounded-xl border-2 border-purple-500/40 hover:border-[#FFD700] hover:bg-white/10 transition-all group">
                      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-3 flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg mb-2">⚡ Código de Urgência Financeira</h4>
                        <p className="text-gray-300 text-sm md:text-base">Sequência específica para atrair dinheiro em 24-48h. Ideal quando você tem uma conta vencendo.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 bg-white/5 p-5 rounded-xl border-2 border-purple-500/40 hover:border-[#FFD700] hover:bg-white/10 transition-all group">
                      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-3 flex-shrink-0 group-hover:scale-110 transition-transform">
                        <DollarSign className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg mb-2">💰 Código para Receber Pagamentos Atrasados</h4>
                        <p className="text-gray-300 text-sm md:text-base">Para quando alguém te deve e você precisa que pague logo. Funciona até com processos judiciais.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 bg-white/5 p-5 rounded-xl border-2 border-purple-500/40 hover:border-[#FFD700] hover:bg-white/10 transition-all group">
                      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-3 flex-shrink-0 group-hover:scale-110 transition-transform">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg mb-2">📈 Código de Oportunidades Inesperadas</h4>
                        <p className="text-gray-300 text-sm md:text-base">Abre portas para propostas, freelances, vendas e bicos que aparecem "do nada".</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 bg-white/5 p-5 rounded-xl border-2 border-purple-500/40 hover:border-[#FFD700] hover:bg-white/10 transition-all group">
                      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-3 flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Gift className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg mb-2">🎁 Código de Abundância Geral</h4>
                        <p className="text-gray-300 text-sm md:text-base">Para manter um fluxo constante de prosperidade. Use diariamente como manutenção.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 bg-white/5 p-5 rounded-xl border-2 border-purple-500/40 hover:border-[#FFD700] hover:bg-white/10 transition-all group">
                      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-3 flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg mb-2">🛡️ Código Anti-Despesa Inesperada</h4>
                        <p className="text-gray-300 text-sm md:text-base">Proteção contra gastos surpresa (carro quebrado, doença, multa). Previne emergências.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 bg-gradient-to-br from-yellow-900/30 to-orange-900/30 p-5 rounded-xl border-2 border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                      <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl p-3 flex-shrink-0">
                        <Star className="w-6 h-6 text-black fill-black" />
                      </div>
                      <div>
                        <h4 className="font-bold text-yellow-300 text-lg mb-2">⭐ BÔNUS: Guia de Como Usar</h4>
                        <p className="text-yellow-100 text-sm md:text-base">PDF explicando exatamente como ativar os códigos, quantas vezes repetir e quando usar cada um.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PROVA SOCIAL */}
                <div className="bg-gradient-to-br from-emerald-950/40 to-teal-950/40 border-2 border-emerald-500/30 rounded-2xl p-6 mb-8">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    <h3 className="text-xl font-bold text-white">Quem Usa os Códigos:</h3>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div className="bg-black/40 rounded-xl p-4">
                      <p className="text-4xl font-black text-emerald-400 mb-1">92%</p>
                      <p className="text-gray-300 text-xs">Receberam dinheiro em até 72h</p>
                    </div>
                    <div className="bg-black/40 rounded-xl p-4">
                      <p className="text-4xl font-black text-yellow-400 mb-1">R$ 850</p>
                      <p className="text-gray-300 text-xs">Média recebida na primeira semana</p>
                    </div>
                    <div className="bg-black/40 rounded-xl p-4">
                      <p className="text-4xl font-black text-purple-400 mb-1">5 min</p>
                      <p className="text-gray-300 text-xs">Tempo médio de uso diário</p>
                    </div>
                  </div>
                </div>

                {/* OFERTA */}
                <div className="bg-gradient-to-br from-black via-gray-900 to-black rounded-3xl p-6 md:p-8 border-4 border-[#FFD700] shadow-[0_0_60px_rgba(255,215,0,0.4)] relative overflow-hidden">
                  {/* Subtle pulse effect */}
                  <div className="absolute inset-0 border-4 border-[#FFD700] rounded-3xl animate-pulse opacity-20"></div>
                  
                  <div className="relative z-10">
                    <div className="text-center mb-6">
                      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                        Eu vendo esse Guia por <span className="text-white font-bold line-through">R$ {PRICING.downsell1.original}</span>.
                      </p>
                      <p className="text-purple-400 font-bold text-base md:text-lg mb-4 uppercase tracking-wide">
                        Mas, para você não ficar <strong className="text-red-400">desprotegido</strong>...
                      </p>

                      <div className="my-6">
                        <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">DE: R$ {PRICING.downsell1.original}</p>
                        <div className="flex items-center justify-center gap-3 mb-2">
                          <span className="text-gray-400 text-xl">LEVE POR APENAS:</span>
                          <div className="flex items-baseline">
                            <span className="text-2xl text-emerald-400 font-bold">R$</span>
                            <span className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700]" 
                                  style={{ textShadow: '0 0 30px rgba(255,215,0,0.5)' }}>
                              19
                            </span>
                            <span className="text-3xl text-emerald-400 font-bold">,90</span>
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">
                          É <strong className="text-white">menos que um Uber</strong>. É a ferramenta perfeita para ter na manga.
                        </p>
                        <p className="text-emerald-400 text-sm font-bold">
                          💎 Acesso vitalício • Use sempre que precisar
                        </p>
                      </div>

                      <button
                        onClick={handleAccept}
                        className="w-full bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] hover:from-[#FFA500] hover:via-[#FFD700] hover:to-[#FFA500] text-black font-black text-xl md:text-2xl py-6 md:py-8 px-6 rounded-2xl shadow-[0_8px_40px_rgba(255,215,0,0.6)] transition-all transform hover:scale-105 active:scale-95 border-4 border-yellow-300 uppercase tracking-wide mb-3"
                      >
                        <span className="drop-shadow-lg">✅ ADICIONAR CÓDIGOS DE EMERGÊNCIA POR R$ {PRICING.downsell1.offer}</span>
                      </button>
                      <p className="text-gray-400 text-xs md:text-sm italic">
                        (Adiciona ao seu pedido. Pagamento único, acesso para sempre)
                      </p>

                      <div className="flex items-center justify-center gap-2 mt-4 text-emerald-400 text-xs">
                        <Shield className="w-5 h-5" />
                        <span>🔒 Pagamento 100% Seguro • Garantia de 7 Dias</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* TESTIMONIALS */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mb-8 md:mb-12"
          >
            <h3 className="text-2xl md:text-3xl font-black text-center text-white mb-6">
              💬 Relatos Reais de Quem Usou os Códigos:
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-purple-600/50 rounded-2xl p-6">
                <div className="flex items-start gap-3 mb-3">
                  <img src="https://i.pravatar.cc/60?img=47" alt="Testimonial" className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-bold text-white">Luciana M.</p>
                    <p className="text-xs text-gray-400">Via WhatsApp</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed italic">
                  "Usei o código de urgência na segunda-feira de manhã. Na terça à tarde, minha irmã me ligou oferecendo pagar os R$ 600 que me devia há 8 meses. Sem eu cobrar. Simples assim."
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-purple-600/50 rounded-2xl p-6">
                <div className="flex items-start gap-3 mb-3">
                  <img src="https://i.pravatar.cc/60?img=68" alt="Testimonial" className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-bold text-white">André V.</p>
                    <p className="text-xs text-gray-400">Via Instagram</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed italic">
                  "Achei que era besteira, mas tava desesperado (conta de luz vencida). Repeti o código 77 vezes como manda o guia. No dia seguinte, apareceu um bico de R$ 400. Não dá pra negar."
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-purple-600/50 rounded-2xl p-6">
                <div className="flex items-start gap-3 mb-3">
                  <img src="https://i.pravatar.cc/60?img=20" alt="Testimonial" className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-bold text-white">Paula S.</p>
                    <p className="text-xs text-gray-400">Via Facebook</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed italic">
                  "O melhor é que é RÁPIDO. Eu repito os códigos enquanto tomo café. Não precisa de vela, defumação, nada. Só olhar os números e repetir. Em 1 semana já recebi R$ 1.200 de fontes diferentes."
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-purple-600/50 rounded-2xl p-6">
                <div className="flex items-start gap-3 mb-3">
                  <img src="https://i.pravatar.cc/60?img=59" alt="Testimonial" className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-bold text-white">Felipe R.</p>
                    <p className="text-xs text-gray-400">Via WhatsApp</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed italic">
                  "Tava devendo o aluguel. Usei o código de urgência todos os dias por 3 dias. No quarto dia, um cliente antigo me ligou pedindo um trabalho urgente de R$ 800. Paguei o aluguel na hora."
                </p>
              </div>
            </div>
          </motion.div>

          {/* POR QUE FUNCIONA */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="bg-gradient-to-br from-indigo-950/50 to-purple-950/50 border-2 border-indigo-500/30 rounded-3xl p-6 md:p-8 mb-8"
          >
            <h3 className="text-2xl md:text-3xl font-black text-center text-white mb-6">
              🧠 Como os Códigos Funcionam:
            </h3>
            <div className="prose prose-invert max-w-none text-center">
              <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-4">
                Os números de Grabovoi são baseados em <strong className="text-purple-400">geometria sagrada e frequências vibracionais</strong>.
              </p>
              <p className="text-base md:text-lg text-white leading-relaxed mb-4">
                Cada sequência numérica <strong className="text-yellow-400">ressoa com uma realidade específica</strong> que você quer manifestar.
              </p>
              <div className="bg-black/40 border-2 border-purple-500/50 rounded-xl p-5 inline-block text-left">
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  ✅ Funciona até para <strong className="text-white">céticos</strong> (é matemática, não crença)<br/>
                  ✅ Não precisa de <strong className="text-white">rituais complexos</strong><br/>
                  ✅ Pode usar <strong className="text-white">escrito, falado ou mentalizado</strong><br/>
                  ✅ Resultados geralmente em <strong className="text-yellow-400">24-72h</strong>
                </p>
              </div>
            </div>
          </motion.div>

          {/* GARANTIA */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="bg-gradient-to-br from-emerald-950/50 to-teal-950/50 border-3 border-emerald-500/50 rounded-3xl p-6 md:p-8 mb-8 text-center shadow-2xl"
          >
            <Shield className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
              🛡️ Garantia Total de 7 Dias
            </h3>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Use os Códigos por 7 dias. Se você não receber <strong className="text-emerald-400">nenhum dinheiro inesperado</strong> ou não sentir que a energia financeira mudou, eu devolvo <strong className="text-white">100% do valor</strong>. Zero risco para você.
            </p>
          </motion.div>

          {/* FAQ RÁPIDO */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mb-12"
          >
            <h3 className="text-2xl md:text-3xl font-black text-center text-white mb-6">
              ❓ Perguntas Frequentes:
            </h3>
            
            <div className="space-y-4">
              <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-5">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <ChevronRight className="w-5 h-5 text-purple-400" />
                  Quantas vezes preciso repetir os códigos?
                </h4>
                <p className="text-gray-300 text-sm pl-7">
                  Depende da urgência. Para emergências: 77 vezes seguidas. Para manutenção diária: 7 vezes pela manhã. O guia explica tudo.
                </p>
              </div>

              <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-5">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <ChevronRight className="w-5 h-5 text-purple-400" />
                  Funciona para qualquer tipo de emergência?
                </h4>
                <p className="text-gray-300 text-sm pl-7">
                  Sim! Tem códigos para receber dinheiro rápido, pagamentos atrasados, oportunidades inesperadas, proteção contra gastos surpresa e muito mais.
                </p>
              </div>

              <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-5">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <ChevronRight className="w-5 h-5 text-purple-400" />
                  Posso usar junto com o Mapa Xamânico?
                </h4>
                <p className="text-gray-300 text-sm pl-7">
                  Com certeza! Na verdade, os Códigos são o complemento PERFEITO. Enquanto o Mapa trabalha a raiz profunda, os Códigos resolvem as emergências do dia a dia.
                </p>
              </div>

              <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-5">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <ChevronRight className="w-5 h-5 text-purple-400" />
                  E se eu não souber usar?
                </h4>
                <p className="text-gray-300 text-sm pl-7">
                  O guia é SUPER didático. Tem prints, exemplos e passo a passo de cada código. Se uma criança de 10 anos consegue usar, você também consegue.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA FINAL */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="text-center mb-8"
          >
            <button
              onClick={handleAccept}
              className="w-full bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] hover:from-[#FFA500] hover:via-[#FFD700] hover:to-[#FFA500] text-black font-black text-xl md:text-2xl py-6 md:py-8 px-6 rounded-2xl shadow-[0_8px_40px_rgba(255,215,0,0.6)] transition-all transform hover:scale-105 active:scale-95 border-4 border-yellow-300 uppercase tracking-wide"
            >
              ✅ QUERO OS CÓDIGOS DE EMERGÊNCIA • R$ {PRICING.downsell1.offer}
            </button>
          </motion.div>

          {/* Link de Recusa */}
          <div className="text-center">
            <button
              onClick={handleDecline}
              className="text-gray-500 hover:text-gray-400 text-sm underline transition-colors"
            >
              Não, obrigado. Vou seguir apenas com o Mapa.
            </button>
          </div>

        </div>

        {/* Mobile Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 border-t-4 border-[#FFD700] p-4 shadow-2xl md:hidden">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <p className="text-white font-bold text-sm">Códigos Grabovoi</p>
              <p className="text-yellow-300 text-xs">
                <span className="line-through opacity-60">R$ {PRICING.downsell1.original.replace(',00', '')}</span> → <span className="font-black text-lg">R$ {PRICING.downsell1.offer}</span>
              </p>
            </div>
            <button
              onClick={handleAccept}
              className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-black py-3 px-6 rounded-xl transition-all transform active:scale-95 text-sm whitespace-nowrap shadow-xl border-2 border-yellow-300"
            >
              GARANTIR AGORA
            </button>
          </div>
        </div>
      </div>

      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showExitPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={() => setShowExitPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="bg-gradient-to-br from-[#1a1a2e] via-[#2d1b4e] to-[#1a1a2e] rounded-3xl p-6 md:p-10 max-w-xl w-full border-4 border-purple-600 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowExitPopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-7 h-7" />
              </button>

              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="bg-purple-600 rounded-full p-5">
                    <Heart className="w-14 h-14 text-white" />
                  </div>
                </div>

                <h3 className="text-3xl md:text-4xl font-black text-white leading-tight">
                  💜 {firstNameUpper}, ÚLTIMA CHANCE!
                </h3>

                <p className="text-xl text-purple-300 font-bold leading-tight">
                  Você realmente vai sair <strong className="text-white">sem proteção</strong> para emergências?
                </p>

                <div className="bg-yellow-500/10 border-3 border-yellow-500 rounded-2xl p-6">
                  <p className="text-yellow-400 font-bold text-lg mb-3">
                    🎁 CUPOM EXCLUSIVO DESBLOQUEADO!
                  </p>
                  <p className="text-white text-sm mb-4">
                    Ok, eu entendo. Deixa eu tornar isso <strong>IRRECUSÁVEL</strong>:
                  </p>
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-gray-400 line-through text-xl">R$ {PRICING.downsell1.offer}</span>
                    <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                      R$ {PRICING.downsell1.exitPopupDiscount}
                    </span>
                  </div>
                  <p className="text-emerald-400 text-sm font-bold">
                    Economize R$ {PRICING.downsell1.savings} • Menos que um lanche
                  </p>
                </div>

                <button
                  onClick={handleExitAccept}
                  className="w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 hover:from-yellow-400 hover:via-orange-400 hover:to-yellow-400 text-black font-black text-xl py-5 px-6 rounded-2xl shadow-xl transition-all transform hover:scale-105 uppercase"
                >
                  🔥 GARANTIR COM DESCONTO AGORA
                </button>

                <button
                  onClick={() => setShowExitPopup(false)}
                  className="text-gray-500 hover:text-gray-400 text-sm underline"
                >
                  Não, vou arriscar ficar sem proteção
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

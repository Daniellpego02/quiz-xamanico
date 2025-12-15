import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, X, Shield, Star, AlertCircle, Heart, Flame, Lock, Award, ChevronRight } from 'lucide-react';

interface Upsell1Props {
  userName?: string;
}

export default function Upsell1({ userName = 'você' }: Upsell1Props) {
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutos

  const firstName = userName ? userName.split(' ')[0] : 'você';
  const firstNameUpper = firstName.toUpperCase();

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Exit intent popup
  useEffect(() => {
    let exitTimeout: ReturnType<typeof setTimeout>;
    
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !showExitPopup) {
        exitTimeout = setTimeout(() => {
          setShowExitPopup(true);
        }, 100);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (exitTimeout) clearTimeout(exitTimeout);
    };
  }, [showExitPopup]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAccept = () => {
    window.location.href = 'https://checkout.mapaxamanicooficial.online/cerimonia-quebra';
  };

  const handleDecline = () => {
    window.location.href = '/down1';
  };

  const handleExitAccept = () => {
    setShowExitPopup(false);
    handleAccept();
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#1a0000] via-[#0a0000] to-[#1a0000] text-white relative overflow-hidden">
        
        {/* Progress Bar - Fixed at 50% */}
        <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b-2 border-red-600/50">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <p className="text-center text-xs md:text-sm text-red-400 font-bold mb-2 uppercase tracking-wider animate-pulse">
              ⚠️ SEU PEDIDO AINDA NÃO ESTÁ COMPLETO...
            </p>
            <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "50%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-yellow-500 via-red-500 to-red-600 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.8)]"
              />
            </div>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Clock className="w-4 h-4 text-yellow-400 animate-pulse" />
              <span className="text-yellow-400 font-mono font-bold text-sm md:text-base">
                EXPIRA EM: {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 pb-32 relative z-10">
          
          {/* HEADLINE - STOP PATTERN */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center space-y-4 mb-8 md:mb-12"
          >
            <div className="inline-block bg-red-600/20 border-2 border-red-500 rounded-2xl px-6 py-3 mb-4">
              <p className="text-red-400 font-black text-sm md:text-base uppercase tracking-wider animate-pulse">
                🚨 ESPERE! NÃO FECHE ESSA PÁGINA.
              </p>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
              <span className="text-red-500">{firstNameUpper}</span>, Você Garantiu o Diagnóstico...
            </h1>
            <p className="text-xl md:text-3xl font-bold text-yellow-400 leading-tight max-w-3xl mx-auto">
              Mas Você Ainda Está <span className="text-red-500 underline decoration-wavy">ACORRENTADO</span> pelos "Votos de Pobreza" que Fez no Passado.
            </p>
          </motion.div>

          {/* AGITAÇÃO DA DOR */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border-2 border-gray-700 rounded-3xl p-6 md:p-10 mb-8 md:mb-12 shadow-2xl"
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-lg md:text-xl text-white leading-relaxed mb-4">
                Parabéns, <strong className="text-yellow-400">{firstName}</strong>. Você deu o primeiro passo. O Mapa Xamânico vai te mostrar <strong>onde está o nó</strong>.
              </p>
              
              <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-yellow-500 mx-auto my-6 rounded-full"></div>
              
              <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-4">
                Mas preciso ser <strong className="text-red-400">brutalmente honesta</strong> com você:
              </p>
              
              <div className="bg-red-950/50 border-l-4 border-red-500 p-6 rounded-r-xl my-6">
                <p className="text-xl md:text-2xl font-bold text-red-300 mb-2">
                  Ver o nó não desata o nó.
                </p>
              </div>

              <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-4">
                A maioria das pessoas que descobre que tem <strong className="text-yellow-400">Escassez Hereditária</strong> tenta limpar isso sozinha e <strong className="text-red-400">falha</strong>. Por quê?
              </p>

              <p className="text-base md:text-lg text-white leading-relaxed mb-4">
                Porque em alguma vida passada, ou através dos seus ancestrais, você assinou inconscientemente um <strong className="text-red-500 text-xl">CONTRATO DE ALMA</strong>.
              </p>

              <div className="grid md:grid-cols-2 gap-4 my-6">
                <div className="bg-black/50 border border-red-500/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-red-300 mb-1">Voto de Pobreza</h4>
                      <p className="text-sm text-gray-400">Achando que dinheiro era pecado</p>
                    </div>
                  </div>
                </div>
                <div className="bg-black/50 border border-red-500/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-red-300 mb-1">Voto de Sacrifício</h4>
                      <p className="text-sm text-gray-400">Para "salvar" a família</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-950/80 to-orange-950/80 border-2 border-yellow-500/50 rounded-2xl p-6 my-6">
                <p className="text-lg md:text-xl font-bold text-yellow-300 text-center leading-relaxed">
                  Enquanto esse Contrato Espiritual estiver ativo no seu <strong>Registro Akáshico</strong>, você pode fazer mil mapas... o dinheiro vai continuar fugindo.
                </p>
                <p className="text-base text-gray-300 text-center mt-3">
                  É como tentar correr com uma <strong className="text-red-400">bola de ferro amarrada no tornozelo</strong>.
                </p>
              </div>
            </div>
          </motion.div>

          {/* MECANISMO / SOLUÇÃO */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mb-8 md:mb-12"
          >
            <div className="bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e] rounded-3xl p-6 md:p-10 border-2 border-[#C69320] shadow-[0_0_60px_rgba(198,147,32,0.3)] relative overflow-hidden"
            >
              {/* Glow effects */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <p className="text-gray-400 text-sm md:text-base mb-4 leading-relaxed">
                    Eu não queria deixar você ir embora com o Mapa na mão, mas com os <strong className="text-red-400">pés amarrados</strong>.
                  </p>
                  
                  <div className="inline-block bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-[#FFD700] rounded-2xl px-6 py-4 mb-6">
                    <p className="text-sm text-yellow-300 mb-2 uppercase tracking-wider">Por isso, separei algo que não está disponível para o público geral:</p>
                    <div className="flex items-center justify-center gap-3">
                      <Flame className="w-8 h-8 text-[#FFD700] animate-pulse" />
                      <h2 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700]">
                        A CERIMÔNIA DE QUEBRA DE CONTRATOS DE ALMA
                      </h2>
                      <Flame className="w-8 h-8 text-[#FFD700] animate-pulse" />
                    </div>
                  </div>

                  <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-6">
                    Isso <strong className="text-white">não é uma aula</strong>. É uma <strong className="text-[#FFD700]">sessão guiada de áudio de alta frequência</strong> onde nós vamos entrar no seu subconsciente e <strong className="text-red-400">REVOGAR juridicamente</strong> (no plano espiritual) esses votos antigos.
                  </p>

                  <div className="bg-black/40 border-2 border-[#FFD700]/30 rounded-2xl p-6 inline-block">
                    <p className="text-xl md:text-2xl font-black text-[#FFD700] mb-2">
                      É o alicate que corta a corrente. ⛓️‍💥
                    </p>
                  </div>
                </div>

                {/* O QUE ESTÁ INCLUÍDO */}
                <div className="mb-8">
                  <h3 className="text-2xl md:text-3xl font-black text-center text-white mb-6">
                    O Que Você Vai Receber:
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 bg-white/5 p-5 rounded-xl border-2 border-[#C69320]/40 hover:border-[#FFD700] hover:bg-white/10 transition-all group">
                      <div className="bg-gradient-to-br from-[#C69320] to-[#FFD700] rounded-xl p-3 flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Flame className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg mb-2">🔥 Cerimônia de Revogação Completa</h4>
                        <p className="text-gray-300 text-sm md:text-base">Áudio guiado de 32 minutos que te leva em transe profundo para quebrar contratos kármicos. Funciona até dormindo.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 bg-white/5 p-5 rounded-xl border-2 border-[#C69320]/40 hover:border-[#FFD700] hover:bg-white/10 transition-all group">
                      <div className="bg-gradient-to-br from-[#C69320] to-[#FFD700] rounded-xl p-3 flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Lock className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg mb-2">🔓 Protocolo de Liberação de Votos</h4>
                        <p className="text-gray-300 text-sm md:text-base">Passo a passo para identificar QUAL voto específico você fez (pobreza, castidade, sacrifício) e desativá-lo para sempre.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 bg-white/5 p-5 rounded-xl border-2 border-[#C69320]/40 hover:border-[#FFD700] hover:bg-white/10 transition-all group">
                      <div className="bg-gradient-to-br from-[#C69320] to-[#FFD700] rounded-xl p-3 flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Heart className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg mb-2">💖 Ritual de Perdão Ancestral</h4>
                        <p className="text-gray-300 text-sm md:text-base">Técnica para se desconectar dos votos que seus avós e bisavós fizeram por você (Valor: R$ 297)</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 bg-white/5 p-5 rounded-xl border-2 border-[#C69320]/40 hover:border-[#FFD700] hover:bg-white/10 transition-all group">
                      <div className="bg-gradient-to-br from-[#C69320] to-[#FFD700] rounded-xl p-3 flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Award className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg mb-2">✨ Selo de Liberdade Financeira</h4>
                        <p className="text-gray-300 text-sm md:text-base">Ativação final que sela a quebra dos contratos e impede que novos votos sejam criados inconscientemente.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PROVA SOCIAL INLINE */}
                <div className="bg-gradient-to-br from-emerald-950/40 to-teal-950/40 border-2 border-emerald-500/30 rounded-2xl p-6 mb-8">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    <h3 className="text-xl font-bold text-white">Quem Quebrou os Contratos:</h3>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div className="bg-black/40 rounded-xl p-4">
                      <p className="text-4xl font-black text-emerald-400 mb-1">89%</p>
                      <p className="text-gray-300 text-xs">Sentiram "peso saindo" durante o áudio</p>
                    </div>
                    <div className="bg-black/40 rounded-xl p-4">
                      <p className="text-4xl font-black text-yellow-400 mb-1">3-7 dias</p>
                      <p className="text-gray-300 text-xs">Para receber dinheiro inesperado</p>
                    </div>
                    <div className="bg-black/40 rounded-xl p-4">
                      <p className="text-4xl font-black text-orange-400 mb-1">R$ 4.730</p>
                      <p className="text-gray-300 text-xs">Média de dinheiro desbloqueado em 30 dias</p>
                    </div>
                  </div>
                </div>

                {/* OFERTA */}
                <div className="bg-gradient-to-br from-black via-gray-900 to-black rounded-3xl p-6 md:p-8 border-4 border-[#FFD700] shadow-[0_0_60px_rgba(255,215,0,0.5)] relative overflow-hidden">
                  {/* Pulse effect */}
                  <div className="absolute inset-0 border-4 border-[#FFD700] rounded-3xl animate-ping opacity-20"></div>
                  
                  <div className="relative z-10">
                    <div className="text-center mb-6">
                      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                        Uma sessão individual dessa comigo custa <span className="text-white font-bold line-through">R$ 497,00</span>.
                      </p>
                      <p className="text-yellow-400 font-bold text-base md:text-lg mb-4 uppercase tracking-wide">
                        Mas como você já é aluno novo e está aqui <strong>AGORA</strong>...
                      </p>
                      
                      <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border-2 border-red-500 rounded-xl p-4 mb-4 inline-block">
                        <p className="text-red-300 text-sm font-bold mb-1">⚠️ ATENÇÃO:</p>
                        <p className="text-white text-xs md:text-sm">
                          Essa oferta <strong>só existe nesta tela</strong>. Se você fechar, o sistema entende que você aceita continuar com os Contratos de Pobreza ativos.
                        </p>
                      </div>

                      <div className="my-6">
                        <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">DE: R$ 497,00</p>
                        <div className="flex items-center justify-center gap-3 mb-2">
                          <span className="text-gray-400 text-xl">POR APENAS:</span>
                          <div className="flex items-baseline">
                            <span className="text-2xl text-emerald-400 font-bold">R$</span>
                            <span className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700]" 
                                  style={{ textShadow: '0 0 40px rgba(255,215,0,0.6)' }}>
                              49
                            </span>
                            <span className="text-3xl text-emerald-400 font-bold">,90</span>
                          </div>
                        </div>
                        <p className="text-emerald-400 text-sm font-bold">
                          💎 Acesso vitalício • Pode ouvir quantas vezes precisar
                        </p>
                      </div>

                      <button
                        onClick={handleAccept}
                        className="w-full bg-gradient-to-r from-[#FF9500] via-[#F58400] to-[#EA580C] hover:from-[#FFA500] hover:via-[#FF9500] hover:to-[#F58400] text-white font-black text-xl md:text-2xl py-6 md:py-8 px-6 rounded-2xl shadow-[0_8px_40px_rgba(255,149,0,0.8)] transition-all transform hover:scale-105 active:scale-95 border-4 border-[#FFD700] uppercase tracking-wide mb-3 animate-pulse"
                      >
                        <span className="drop-shadow-lg">✅ SIM! QUERO QUEBRAR MEUS CONTRATOS DE POBREZA POR R$ 49,90</span>
                      </button>
                      <p className="text-gray-400 text-xs md:text-sm italic">
                        (Adiciona automaticamente ao seu pedido. Não precisa digitar o cartão novamente)
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
            transition={{ delay: 0.9 }}
            className="mb-8 md:mb-12"
          >
            <h3 className="text-2xl md:text-3xl font-black text-center text-white mb-6">
              💬 Veja o Que Aconteceu Após a Cerimônia:
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-gray-700 rounded-2xl p-6">
                <div className="flex items-start gap-3 mb-3">
                  <img src="https://i.pravatar.cc/60?img=31" alt="Testimonial" className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-bold text-white">Marina L.</p>
                    <p className="text-xs text-gray-400">Via WhatsApp</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed italic">
                  "Anahí, eu SENTI na hora que o voto se quebrou. Foi tipo um clique na cabeça. No dia seguinte, meu ex (que me devia 8 mil há 2 anos) me ligou oferecendo pagar. Sem eu pedir. Tô em choque."
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-gray-700 rounded-2xl p-6">
                <div className="flex items-start gap-3 mb-3">
                  <img src="https://i.pravatar.cc/60?img=52" alt="Testimonial" className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-bold text-white">Ricardo P.</p>
                    <p className="text-xs text-gray-400">Via Instagram</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed italic">
                  "Descobri no áudio que eu tinha um voto de pobreza de quando fui monge na Idade Média (juro!). Depois da cerimônia, em 5 dias apareceu uma proposta de trampo freelance de 12k. NUNCA tinha ganhado isso."
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-gray-700 rounded-2xl p-6">
                <div className="flex items-start gap-3 mb-3">
                  <img src="https://i.pravatar.cc/60?img=44" alt="Testimonial" className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-bold text-white">Camila R.</p>
                    <p className="text-xs text-gray-400">Via Facebook</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed italic">
                  "Chorei MUITO durante a cerimônia. Lembrei da minha avó falando 'dinheiro é sujo'. Entendi que eu tava repetindo isso. 3 dias depois, consegui vender um apartamento que tava parado há 1 ano. Conexão direta."
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-gray-700 rounded-2xl p-6">
                <div className="flex items-start gap-3 mb-3">
                  <img src="https://i.pravatar.cc/60?img=13" alt="Testimonial" className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-bold text-white">Thiago S.</p>
                    <p className="text-xs text-gray-400">Via WhatsApp</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed italic">
                  "Sou cético pra caramba, mas preciso admitir: funcionou. Fiz a cerimônia num domingo. Na terça, recebi uma restituição de imposto que nem sabia que existia. R$ 3.200. Coincidência? Acho que não."
                </p>
              </div>
            </div>
          </motion.div>

          {/* GARANTIA */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="bg-gradient-to-br from-emerald-950/50 to-teal-950/50 border-3 border-emerald-500/50 rounded-3xl p-6 md:p-8 mb-8 text-center shadow-2xl"
          >
            <Shield className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
              🛡️ Garantia Blindada de 7 Dias
            </h3>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Ouça a Cerimônia de Quebra. Se você não sentir uma <strong className="text-emerald-400">diferença energética clara</strong> ou não perceber sinais de desbloqueio financeiro em 7 dias, eu devolvo <strong className="text-white">100% do seu dinheiro</strong>. Sem perguntas. Sem burocracia.
            </p>
          </motion.div>

          {/* FAQ RÁPIDO */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="mb-12"
          >
            <h3 className="text-2xl md:text-3xl font-black text-center text-white mb-6">
              ❓ Perguntas Frequentes:
            </h3>
            
            <div className="space-y-4">
              <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-5">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <ChevronRight className="w-5 h-5 text-yellow-400" />
                  Quanto tempo dura a Cerimônia?
                </h4>
                <p className="text-gray-300 text-sm pl-7">
                  32 minutos. Você pode ouvir deitado, antes de dormir. Muita gente adormece durante e acorda com a sensação de "libertação".
                </p>
              </div>

              <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-5">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <ChevronRight className="w-5 h-5 text-yellow-400" />
                  Preciso acreditar para funcionar?
                </h4>
                <p className="text-gray-300 text-sm pl-7">
                  Não. A frequência sonora trabalha no subconsciente, independente da sua crença consciente. Vários céticos relataram resultados.
                </p>
              </div>

              <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-5">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <ChevronRight className="w-5 h-5 text-yellow-400" />
                  Posso fazer mais de uma vez?
                </h4>
                <p className="text-gray-300 text-sm pl-7">
                  Sim! Recomendo ouvir 1x por semana durante o primeiro mês para garantir que todos os votos foram dissolvidos completamente.
                </p>
              </div>

              <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-5">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <ChevronRight className="w-5 h-5 text-yellow-400" />
                  E se eu não tiver nenhum contrato?
                </h4>
                <p className="text-gray-300 text-sm pl-7">
                  Se você está com bloqueio financeiro, você TEM. Mas se por algum motivo você não sentir efeito, basta pedir reembolso em 7 dias. Simples assim.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA FINAL */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-center mb-8"
          >
            <button
              onClick={handleAccept}
              className="w-full bg-gradient-to-r from-[#FF9500] via-[#F58400] to-[#EA580C] hover:from-[#FFA500] hover:via-[#FF9500] hover:to-[#F58400] text-white font-black text-xl md:text-2xl py-6 md:py-8 px-6 rounded-2xl shadow-[0_8px_40px_rgba(255,149,0,0.8)] transition-all transform hover:scale-105 active:scale-95 border-4 border-[#FFD700] uppercase tracking-wide animate-pulse"
            >
              ✅ QUERO QUEBRAR MEUS CONTRATOS AGORA • R$ 49,90
            </button>
          </motion.div>

          {/* Link de Recusa */}
          <div className="text-center">
            <button
              onClick={handleDecline}
              className="text-gray-500 hover:text-gray-400 text-sm underline transition-colors"
            >
              Não, obrigado. Eu prefiro identificar o bloqueio com o Mapa, mas aceito o risco de continuar preso aos votos antigos. Pular oferta.
            </button>
          </div>

        </div>

        {/* Mobile Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-black via-gray-900 to-black border-t-4 border-[#FFD700] p-4 shadow-2xl md:hidden">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <p className="text-white font-bold text-sm">Cerimônia de Quebra</p>
              <p className="text-yellow-400 text-xs">
                <span className="line-through opacity-60">R$ 497</span> → <span className="font-black text-lg">R$ 49,90</span>
              </p>
            </div>
            <button
              onClick={handleAccept}
              className="bg-gradient-to-r from-[#FF9500] to-[#EA580C] text-white font-black py-3 px-6 rounded-xl transition-all transform active:scale-95 text-sm whitespace-nowrap shadow-xl border-2 border-[#FFD700] animate-pulse"
            >
              QUEBRAR AGORA
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
              className="bg-gradient-to-br from-[#1a0000] via-[#2d0000] to-[#1a0000] rounded-3xl p-6 md:p-10 max-w-xl w-full border-4 border-red-600 shadow-2xl relative"
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
                  <div className="bg-red-600 rounded-full p-5 animate-pulse">
                    <AlertCircle className="w-14 h-14 text-white" />
                  </div>
                </div>

                <h3 className="text-3xl md:text-4xl font-black text-white leading-tight">
                  ⚠️ ESPERE, {firstNameUpper}!
                </h3>

                <p className="text-xl text-red-300 font-bold leading-tight">
                  Você vai perder essa oportunidade <strong className="text-white">PARA SEMPRE</strong>.
                </p>

                <div className="bg-yellow-500/10 border-3 border-yellow-500 rounded-2xl p-6">
                  <p className="text-yellow-400 font-bold text-lg mb-3">
                    🎁 CUPOM SECRETO DESBLOQUEADO!
                  </p>
                  <p className="text-white text-sm mb-4">
                    Como você está saindo, liberei um desconto especial que <strong>NUNCA foi oferecido antes</strong>:
                  </p>
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-gray-400 line-through text-xl">R$ 49,90</span>
                    <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                      R$ 37
                    </span>
                  </div>
                  <p className="text-emerald-400 text-sm font-bold">
                    Economize R$ 12,90 • Só válido AGORA
                  </p>
                </div>

                <button
                  onClick={handleExitAccept}
                  className="w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-400 hover:via-orange-400 hover:to-red-400 text-black font-black text-xl py-5 px-6 rounded-2xl shadow-xl transition-all transform hover:scale-105 uppercase"
                >
                  🔥 PEGAR DESCONTO E QUEBRAR CONTRATOS
                </button>

                <button
                  onClick={() => setShowExitPopup(false)}
                  className="text-gray-500 hover:text-gray-400 text-sm underline"
                >
                  Não, vou perder esta chance única
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

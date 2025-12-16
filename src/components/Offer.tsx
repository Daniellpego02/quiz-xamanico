import { motion } from 'framer-motion';
import { Check, Eye, Flame, Zap, Shield, Clock, Star, Sparkles } from 'lucide-react';
import Veredito from './Veredito';
import { FrequencyRoom } from './FrequencyRoom';

interface OfferProps {
    userName: string;
}

/**
 * Main Offer Component
 * Displays the product offer page after quiz completion with mystical purple/golden theme
 * Price: Updated from R$97,00 to R$27,90
 */
const Offer = ({ userName }: OfferProps) => {
    const priceOld = "97,00";
    const priceNew = "27,90";

    const handleCheckout = () => {
        window.location.href = 'https://pay.kiwify.com.br/vW2ZZRM';
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#120520] via-[#2A0F3D] to-[#120520] text-white">
            {/* Hero Section with Verdict */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto px-4 py-12"
            >
                {/* Verdict Component */}
                <Veredito userName={userName} />

                {/* Main Headline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-12 mb-8"
                >
                    <h1 className="text-3xl md:text-5xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] mb-4 leading-tight">
                        Seu Mapa Xamânico Personalizado Está Pronto
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
                        O protocolo definitivo para desbloquear sua abundância e dissolver padrões energéticos limitantes
                    </p>
                </motion.div>

                {/* Video Section - If applicable */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.3)] mb-12"
                >
                    <div className="aspect-video bg-black/50 flex items-center justify-center">
                        <div id="vid_67612a40c5e7c00009fd8a7a" style={{ position: 'relative', width: '100%', padding: '56.25% 0 0' }}>
                            <img
                                id="thumb_67612a40c5e7c00009fd8a7a"
                                src="https://images.converteai.net/0b043701-5ba5-4b7d-882a-0f8c59afe52c/players/67612a40c5e7c00009fd8a7a/thumbnail.jpg"
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                alt="Video thumbnail"
                            />
                            <div id="backdrop_67612a40c5e7c00009fd8a7a" style={{ position: 'absolute', top: 0, width: '100%', height: '100%', WebkitBackdropFilter: 'blur(5px)', backdropFilter: 'blur(5px)' }}></div>
                        </div>
                    </div>
                </motion.div>

                {/* Protocol Section - Gamified Journey */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="mb-12"
                >
                    <h2 className="text-2xl md:text-3xl font-serif font-black text-center text-[#D4AF37] mb-8">
                        ⚡ O Protocolo de 7 Dias
                    </h2>
                    
                    <div className="space-y-4 relative">
                        {/* Connecting line */}
                        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#D4AF37] via-[#FFD700] to-[#D4AF37] opacity-30" aria-hidden="true"></div>
                        
                        {/* Protocol Steps */}
                        {[
                            { icon: Eye, title: 'Dia 1: Reconhecimento do Bloqueio', desc: 'Identifique e nomeie seus padrões de escassez' },
                            { icon: Flame, title: 'Dia 2: Exorcismo da Escassez', desc: 'Dissolva crenças limitantes ancestrais' },
                            { icon: Zap, title: 'Dia 3: Despertar da Frequência', desc: 'Ative sua vibração de abundância' },
                            { icon: Sparkles, title: 'Dia 4: Ancoragem da Prosperidade', desc: 'Fixe novos padrões energéticos' },
                            { icon: Star, title: 'Dia 5: Portal do Magnetismo', desc: 'Atraia oportunidades e sincronicidades' },
                            { icon: Check, title: 'Dia 6: Renascimento Financeiro', desc: 'Reconstrua sua relação com o dinheiro' },
                            { icon: Shield, title: 'Dia 7: Nova Identidade', desc: 'Consolide sua transformação permanente' },
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1 + index * 0.1 }}
                                className="relative flex items-start gap-4 bg-gradient-to-r from-[#1a0b2e]/50 to-transparent backdrop-blur-sm border-2 border-[#D4AF37]/30 rounded-xl p-4 hover:border-[#FFD700]/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all"
                            >
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFD700] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                                    <step.icon className="w-6 h-6 text-black" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-white mb-1">{step.title}</h3>
                                    <p className="text-sm text-slate-300">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Frequency Room Component */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8 }}
                    className="mb-12"
                >
                    <FrequencyRoom />
                </motion.div>

                {/* Offer Box with Price */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2 }}
                    className="relative bg-gradient-to-br from-[#1a0b2e] to-[#2d1b4e] rounded-3xl p-8 border-2 border-[#D4AF37] shadow-[0_0_60px_rgba(212,175,55,0.5)]"
                >
                    {/* Pulsing glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] rounded-3xl blur-xl opacity-30 animate-pulse" aria-hidden="true"></div>
                    
                    <div className="relative">
                        <div className="text-center mb-6">
                            <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">
                                <Clock className="inline w-4 h-4 mr-1" />
                                Oferta por Tempo Limitado
                            </p>
                            <h3 className="text-2xl md:text-3xl font-serif font-black text-[#FFD700] mb-4">
                                Acesso Completo ao Mapa Xamânico
                            </h3>
                        </div>

                        {/* Price Display */}
                        <div className="text-center mb-8">
                            <p className="text-slate-400 text-sm mb-2">De:</p>
                            <p className="text-2xl text-slate-500 line-through mb-4">R$ {priceOld}</p>
                            <p className="text-[#FFD700] text-lg font-bold mb-2">Por apenas:</p>
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <span className="text-6xl md:text-7xl font-black text-white drop-shadow-[0_0_30px_rgba(255,215,0,0.6)]">
                                    R${priceNew}
                                </span>
                            </div>
                            <p className="text-emerald-400 text-sm font-semibold">
                                ✨ Acesso vitalício + Atualizações gratuitas
                            </p>
                        </div>

                        {/* CTA Button */}
                        <button
                            onClick={handleCheckout}
                            className="w-full bg-gradient-to-r from-[#FF9500] via-[#F58400] to-[#EA580C] hover:from-[#FF9500] hover:via-[#FF9500] hover:to-[#F58400] text-white font-black text-xl py-6 px-8 rounded-2xl shadow-[0_4px_30px_rgba(255,149,0,0.6)] transition-all transform hover:scale-105 active:scale-95 border-2 border-[#FFD700] uppercase tracking-wide"
                        >
                            <span className="drop-shadow-lg">✨ Quero Desbloquear Minha Abundância</span>
                        </button>

                        {/* Trust Badges */}
                        <div className="flex items-center justify-center gap-2 mt-6 text-emerald-400 text-sm">
                            <Shield className="w-5 h-5" />
                            <span>Pagamento 100% seguro • Garantia de 7 dias</span>
                        </div>
                    </div>
                </motion.div>

                {/* Bonus Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2 }}
                    className="mt-12 text-center"
                >
                    <h3 className="text-xl font-bold text-[#FFD700] mb-4">🎁 Bônus Exclusivos Inclusos:</h3>
                    <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                        <div className="bg-white/5 backdrop-blur-sm border border-[#D4AF37]/30 rounded-xl p-4">
                            <p className="font-semibold text-white mb-2">Meditações Guiadas</p>
                            <p className="text-sm text-slate-300">Áudios de ativação profunda</p>
                            <p className="text-[#FFD700] text-sm mt-2">Valor: R$ 97,00</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm border border-[#D4AF37]/30 rounded-xl p-4">
                            <p className="font-semibold text-white mb-2">Suporte Energético</p>
                            <p className="text-sm text-slate-300">Comunidade exclusiva</p>
                            <p className="text-[#FFD700] text-sm mt-2">Valor: R$ 47,00</p>
                        </div>
                    </div>
                </motion.div>

                {/* Guarantee Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.4 }}
                    className="mt-12 text-center max-w-2xl mx-auto"
                >
                    <div className="bg-emerald-950/30 border-2 border-emerald-500/30 rounded-2xl p-6">
                        <Shield className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-emerald-400 mb-3">Garantia Incondicional de 7 Dias</h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            Se você não sentir uma mudança significativa em sua energia e percepção sobre abundância, 
                            devolvemos 100% do seu investimento. Sem perguntas, sem complicações.
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Offer;
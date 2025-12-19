import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Check, Eye, Flame, Zap, Shield, Clock, Star, Sparkles, Headphones, Users } from 'lucide-react';
import Veredito from './Veredito';
import { FrequencyRoom } from './FrequencyRoom';
import { SocialProofTestimonials } from './SocialProofTestimonials';
import { MentorAuthority } from './MentorAuthority';
import { FAQ } from './FAQ';

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

    // Load video player script only when Offer component is mounted
    useEffect(() => {
        // Add Vturb optimization script (performance timing)
        const optimizationScript = document.createElement('script');
        optimizationScript.innerHTML = '!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);';
        document.head.appendChild(optimizationScript);

        // Add preload links for better performance
        const preloadLinks = [
            { href: 'https://scripts.converteai.net/c263b2f0-9566-42be-97d8-7f5920037741/players/69435dab1452433694dabfb7/v4/player.js', as: 'script' },
            { href: 'https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js', as: 'script' },
            { href: 'https://cdn.converteai.net/c263b2f0-9566-42be-97d8-7f5920037741/69435da4738d3928ecc67c16/main.m3u8', as: 'fetch' }
        ];

        const preloadElements: HTMLLinkElement[] = [];
        preloadLinks.forEach(link => {
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';
            preloadLink.href = link.href;
            preloadLink.as = link.as;
            if (link.as === 'fetch') {
                preloadLink.setAttribute('crossorigin', 'anonymous');
            }
            document.head.appendChild(preloadLink);
            preloadElements.push(preloadLink);
        });

        // Add DNS prefetch for faster domain resolution
        const dnsPrefetchDomains = [
            'https://cdn.converteai.net',
            'https://scripts.converteai.net',
            'https://images.converteai.net',
            'https://api.vturb.com.br'
        ];

        const dnsPrefetchElements: HTMLLinkElement[] = [];
        dnsPrefetchDomains.forEach(domain => {
            const dnsPrefetch = document.createElement('link');
            dnsPrefetch.rel = 'dns-prefetch';
            dnsPrefetch.href = domain;
            document.head.appendChild(dnsPrefetch);
            dnsPrefetchElements.push(dnsPrefetch);
        });

        // Add video player script with error handling
        const playerScript = document.createElement('script');
        playerScript.src = 'https://scripts.converteai.net/c263b2f0-9566-42be-97d8-7f5920037741/players/69435dab1452433694dabfb7/v4/player.js';
        playerScript.async = true;
        
        // Handle script loading errors gracefully
        playerScript.onerror = () => {
            console.error('Failed to load video player script');
        };
        
        document.head.appendChild(playerScript);

        // Cleanup function to remove scripts when component unmounts
        return () => {
            optimizationScript.remove();
            playerScript.remove();
            preloadElements.forEach(el => el.remove());
            dnsPrefetchElements.forEach(el => el.remove());
        };
    }, []);

    const handleCheckout = () => {
        window.location.href = 'https://go.perfectpay.com.br/PPU38CQ4NQP';
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

                {/* Main Headline - Magnetic & Emotional */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-12 mb-8"
                >
                    <div className="inline-block bg-red-900/40 border-2 border-red-500/60 rounded-xl px-6 py-3 mb-6">
                        <h1 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-red-400 uppercase tracking-wide leading-tight">
                            SEU ARQUÉTIPO É: "HERDEIRO DA ESCASSEZ"
                        </h1>
                        <p className="text-red-300 text-sm md:text-base font-bold mt-2">(NÍVEL CRÍTICO)</p>
                    </div>
                    <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        Assista ao vídeo curto abaixo para entender <span className="text-[#FFD700] font-bold">como desativar essa frequência em 7 dias</span> e instalar o código da prosperidade.
                    </p>
                </motion.div>

                {/* Video Section - VSL 9:16 Format with Vturb Player - Fixed for Desktop and Mobile */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.3)] mb-12 mx-auto max-w-md"
                >
                    <div className="bg-black/50 flex items-center justify-center py-4 px-4 relative">
                        <div className="w-full" style={{ aspectRatio: '9/16', maxWidth: '400px', margin: '0 auto' }}>
                            <vturb-smartplayer 
                                id="vid-69435dab1452433694dabfb7" 
                                style={{ display: 'block', margin: '0 auto', width: '100%', maxWidth: '400px' }}
                            ></vturb-smartplayer>
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
                        
                        {/* Protocol Steps - Benefit-Focused */}
                        {[
                            { icon: Eye, title: 'Dia 1: O Fim da Cegueira Financeira', desc: 'Identifique onde seu dinheiro está vazando' },
                            { icon: Flame, title: 'Dia 2: Limpeza de DNA', desc: 'Elimine a lealdade invisível à pobreza dos seus pais' },
                            { icon: Zap, title: 'Dia 3: Despertar da Frequência', desc: 'Ative sua vibração de abundância' },
                            { icon: Sparkles, title: 'Dia 4: Ancoragem da Prosperidade', desc: 'Fixe novos padrões energéticos' },
                            { icon: Star, title: 'Dia 5: A Ativação do Imã', desc: 'Como fazer o dinheiro vir até você sem esforço' },
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

                {/* Social Proof Testimonials Section */}
                <SocialProofTestimonials />

                {/* Mentor Authority Section */}
                <MentorAuthority />

                {/* Offer Box with Price - Cleaned Up Design */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2 }}
                    className="relative bg-gradient-to-br from-[#1a0b2e] to-[#2d1b4e] rounded-3xl p-8 border-2 border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.4)]"
                >
                    {/* Subtle pulsing glow effect - reduced */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] rounded-3xl blur-md opacity-20 animate-pulse" aria-hidden="true"></div>
                    
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

                        {/* Product Mockup - Mapa Xamânico */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2.2 }}
                            className="mb-8 flex justify-center"
                        >
                            <div className="relative w-full max-w-xs sm:max-w-sm mx-auto px-4">
                                {/* Mockup Image */}
                                <img 
                                    src="/mockup.png" 
                                    alt="Mapa Xamânico - Protocolo de 7 Dias"
                                    className="w-full h-auto rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
                                />
                                {/* Glow effect around mockup */}
                                <div className="absolute -inset-4 bg-gradient-to-br from-[#D4AF37]/30 to-[#FFD700]/30 blur-2xl -z-10 animate-pulse"></div>
                            </div>
                        </motion.div>

                        {/* Price Display - Enhanced with WHITE price for better contrast */}
                        <div className="text-center mb-8">
                            <p className="text-slate-400 text-sm mb-2">De:</p>
                            <p className="text-2xl text-slate-500 line-through mb-4">R$ {priceOld}</p>
                            <p className="text-[#FFD700] text-lg font-bold mb-2">Por apenas:</p>
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <span className="text-7xl md:text-8xl font-black text-white">
                                    R${priceNew}
                                </span>
                            </div>
                            <p className="text-emerald-400 text-sm font-semibold flex items-center justify-center gap-2">
                                <Shield className="w-4 h-4" />
                                ✨ Acesso vitalício + Atualizações gratuitas
                            </p>
                        </div>

                        {/* CTA Button - First Person */}
                        <button
                            onClick={handleCheckout}
                            className="w-full bg-gradient-to-r from-[#10B981] via-[#059669] to-[#047857] hover:from-[#34D399] hover:via-[#10B981] hover:to-[#059669] text-white font-black text-xl py-6 px-8 rounded-2xl shadow-[0_8px_40px_rgba(16,185,129,0.6)] transition-all transform hover:scale-105 active:scale-95 border-2 border-emerald-300 uppercase tracking-wide"
                        >
                            <span className="drop-shadow-lg">✨ SIM, QUERO DESTRAVAR MINHA PROSPERIDADE</span>
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
                            <div className="flex items-center justify-center mb-3">
                                <Headphones className="w-8 h-8 text-[#FFD700]" />
                            </div>
                            <p className="font-semibold text-white mb-2">Meditações Guiadas</p>
                            <p className="text-sm text-slate-300">Áudios de ativação profunda</p>
                            <p className="text-[#FFD700] text-sm mt-2">Valor: R$ 97,00</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm border border-[#D4AF37]/30 rounded-xl p-4">
                            <div className="flex items-center justify-center mb-3">
                                <Users className="w-8 h-8 text-[#FFD700]" />
                            </div>
                            <p className="font-semibold text-white mb-2">Suporte Energético</p>
                            <p className="text-sm text-slate-300">Comunidade exclusiva</p>
                            <p className="text-[#FFD700] text-sm mt-2">Valor: R$ 47,00</p>
                        </div>
                    </div>
                </motion.div>

                {/* Guarantee Section - Improved Copy */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.4 }}
                    className="mt-12 text-center max-w-2xl mx-auto"
                >
                    <div className="relative bg-emerald-950/40 border-2 border-emerald-500/40 rounded-2xl p-8 overflow-hidden">
                        {/* Glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-green-500/20 blur-xl opacity-40" />
                        
                        <div className="relative">
                            {/* Seal Badge */}
                            <motion.div
                                animate={{ 
                                    rotate: [0, 5, -5, 0],
                                    scale: [1, 1.05, 1]
                                }}
                                transition={{ 
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatType: 'reverse'
                                }}
                                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 border-4 border-emerald-300 shadow-[0_0_30px_rgba(16,185,129,0.6)] mx-auto mb-4"
                            >
                                <div className="text-center">
                                    <p className="text-white text-xs font-black">RISCO</p>
                                    <p className="text-white text-xl font-black leading-none">ZERO</p>
                                    <p className="text-white text-xs font-black">7 DIAS</p>
                                </div>
                            </motion.div>

                            <h3 className="text-2xl font-bold text-emerald-300 mb-4">Garantia Incondicional de 7 Dias</h3>
                            <div className="text-slate-200 text-base md:text-lg leading-relaxed space-y-3">
                                <p className="font-semibold text-white">
                                    Você nem precisa decidir agora.
                                </p>
                                <p>
                                    Entre, use o Mapa, faça a limpeza. Se em 7 dias sua conta bancária não der sinais de melhora, eu devolvo cada centavo.
                                </p>
                                <p className="text-emerald-300 font-bold">
                                    O risco é todo meu.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* FAQ Section */}
                <FAQ />
            </motion.div>
        </div>
    );
};

export default Offer;
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
    const totalMapas = "4.300";

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
        window.location.href = 'https://www.seguropagamentos.com.br/mapa-xamanico';
    };

    return (
        <div className="min-h-screen relative overflow-hidden text-white">
            {/* Enhanced Mystical Background with Multiple Layers */}
            <div className="fixed inset-0 -z-10">
                {/* Base gradient layer */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0118] via-[#1a0b2e] via-[#2A0F3D] to-[#0a0118]"></div>
                
                {/* Radial glow effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px]"></div>
                <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#FFD700]/5 rounded-full blur-[100px]"></div>
                
                {/* Mystical stars/particles overlay */}
                <div className="absolute inset-0 opacity-40 animate-mystical-stars" style={{
                    backgroundImage: `radial-gradient(2px 2px at 20% 30%, white, transparent),
                                      radial-gradient(2px 2px at 60% 70%, white, transparent),
                                      radial-gradient(1px 1px at 50% 50%, white, transparent),
                                      radial-gradient(1px 1px at 80% 10%, white, transparent),
                                      radial-gradient(2px 2px at 90% 60%, white, transparent),
                                      radial-gradient(1px 1px at 33% 80%, white, transparent),
                                      radial-gradient(1px 1px at 15% 60%, white, transparent)`,
                    backgroundSize: '200% 200%'
                }}></div>
                
                {/* Subtle noise texture for depth */}
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}></div>
            </div>

            {/* Progress Bar - Step 2 of 3 */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-0 z-50 bg-gradient-to-r from-[#1a0b2e]/95 via-[#2A0F3D]/95 to-[#1a0b2e]/95 border-b border-[#D4AF37]/30 backdrop-blur-md"
            >
                <div className="max-w-4xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm md:text-base text-[#FFD700] font-semibold">
                            Passo 2 de 3: Análise Concluída - Ative seu Mapa
                        </span>
                        <span className="text-xs md:text-sm text-slate-400">67% completo</span>
                    </div>
                    <div className="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '67%' }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.6)]"
                        />
                    </div>
                </div>
            </motion.div>

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
                    {/* Validation Headline */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="text-red-400 text-base md:text-lg font-bold mb-4 max-w-2xl mx-auto"
                    >
                        Este bloqueio é o motivo de 92% do seu esforço ser jogado no lixo. Veja como desligá-lo agora.
                    </motion.p>
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

                {/* IMMEDIATE CTA AFTER VSL - CRITICAL FOR CONVERSION */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="mt-8 mb-12"
                >
                    {/* Headline */}
                    <h2 className="text-2xl md:text-3xl font-black text-center text-white mb-3 leading-tight">
                        EXISTE UMA "TRAVA ANCESTRAL" IMPEDINDO<br />
                        O DINHEIRO DE PARAR NA SUA MÃO?
                    </h2>
                    <p className="text-lg text-slate-300 text-center mb-6">
                        O Protocolo Xamânico revela onde está o vazamento.
                    </p>

                    {/* Giant CTA Button */}
                    <button
                        onClick={handleCheckout}
                        className="w-full md:w-[70%] mx-auto block bg-gradient-to-r from-[#FF8C00] via-[#FFA500] to-[#FFB700] hover:from-[#FFA500] hover:via-[#FFB700] hover:to-[#FFD700] text-white font-black text-xl md:text-2xl py-6 px-8 rounded-2xl shadow-[0_8px_40px_rgba(255,140,0,0.6)] transition-all transform hover:scale-105 active:scale-95 border-2 border-[#FFD700] uppercase tracking-wide mb-4"
                    >
                        🔥 QUERO INICIAR MEU MAPEAMENTO AGORA
                    </button>

                    {/* Micro-benefits below button */}
                    <div className="text-center space-y-1 text-sm">
                        <p className="text-emerald-400 font-semibold">✅ Pagamento Único de R${priceNew} (PIX)</p>
                        <p className="text-emerald-400 font-semibold">✅ Acesso Vitalício | Garantia de 7 Dias</p>
                        <p className="text-emerald-400 font-semibold">✅ Mais de {totalMapas} mapas já gerados</p>
                    </div>

                    {/* Security badge */}
                    <p className="text-center text-slate-400 text-xs mt-4">
                        💳 Pagamento 100% seguro via PIX Banco Central
                    </p>
                </motion.div>

                {/* Protocol Section - Rewritten with Emotional Benefits */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="mb-12"
                >
                    <h2 className="text-2xl md:text-3xl font-serif font-black text-center text-[#D4AF37] mb-8">
                        O QUE VOCÊ VAI RECEBER IMEDIATAMENTE
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {/* Card 1 - Mapa da Frequência */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.0 }}
                            className="bg-gradient-to-br from-[#1a0b2e]/80 to-[#2d1b4e]/60 backdrop-blur-sm border-2 border-[#D4AF37]/30 rounded-xl p-6 hover:border-[#FFD700]/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all"
                        >
                            <div className="flex items-start gap-4 mb-3">
                                <div className="text-4xl">📜</div>
                                <div>
                                    <h3 className="text-[#FFD700] font-bold text-lg mb-2">✅ O MAPA DA FREQUÊNCIA</h3>
                                    <p className="text-slate-300 text-sm leading-relaxed">
                                        Descubra exatamente onde está o vazamento de dinheiro na sua vida. Não é adivinhação, é um diagnóstico energético baseado na sua linhagem.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 2 - Protocolo de 7 Dias */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.1 }}
                            className="bg-gradient-to-br from-[#1a0b2e]/80 to-[#2d1b4e]/60 backdrop-blur-sm border-2 border-[#D4AF37]/30 rounded-xl p-6 hover:border-[#FFD700]/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all"
                        >
                            <div className="flex items-start gap-4 mb-3">
                                <div className="text-4xl">🎧</div>
                                <div>
                                    <h3 className="text-[#FFD700] font-bold text-lg mb-2">✅ PROTOCOLO DE 7 DIAS</h3>
                                    <p className="text-slate-300 text-sm leading-relaxed">
                                        O passo a passo simples para limpar a energia estagnada. Você não precisa de nada caro ou complicado - só seguir o protocolo.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 3 - Áudios de Reprogramação */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 }}
                            className="bg-gradient-to-br from-[#1a0b2e]/80 to-[#2d1b4e]/60 backdrop-blur-sm border-2 border-[#D4AF37]/30 rounded-xl p-6 hover:border-[#FFD700]/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all"
                        >
                            <div className="flex items-start gap-4 mb-3">
                                <div className="text-4xl">🔊</div>
                                <div>
                                    <h3 className="text-[#FFD700] font-bold text-lg mb-2">✅ ÁUDIOS DE REPROGRAMAÇÃO</h3>
                                    <p className="text-slate-300 text-sm leading-relaxed">
                                        Desbloqueie sua mente enquanto você dorme. Esses áudios foram criados para desprogramar crenças de escassez que você nem sabe que tem.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 4 - Ritual de Blindagem */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.3 }}
                            className="bg-gradient-to-br from-[#1a0b2e]/80 to-[#2d1b4e]/60 backdrop-blur-sm border-2 border-[#D4AF37]/30 rounded-xl p-6 hover:border-[#FFD700]/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all"
                        >
                            <div className="flex items-start gap-4 mb-3">
                                <div className="text-4xl">🏠</div>
                                <div>
                                    <h3 className="text-[#FFD700] font-bold text-lg mb-2">✅ BÔNUS: RITUAL DE BLINDAGEM DA CASA</h3>
                                    <p className="text-slate-300 text-sm leading-relaxed">
                                        Proteja seu espaço das energias de escassez. 80% das pessoas não fazem isso e por isso o dinheiro "evapora" de casa.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* CTA After Cards */}
                    <button
                        onClick={handleCheckout}
                        className="w-full md:w-[60%] mx-auto block bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] hover:brightness-110 text-black font-black text-lg py-5 px-8 rounded-2xl shadow-[0_8px_30px_rgba(212,175,55,0.5)] transition-all transform hover:scale-105 active:scale-95 border-2 border-[#FFD700] uppercase tracking-wide"
                    >
                        QUERO ACESSAR TUDO ISSO AGORA
                    </button>
                    <p className="text-center text-slate-400 text-sm mt-3">
                        Acesso imediato após pagamento | R${priceNew} no PIX
                    </p>
                </motion.div>

                {/* Old Protocol Section - REPLACED ABOVE */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                    className="mb-12 hidden"
                >
                    <h2 className="text-2xl md:text-3xl font-serif font-black text-center text-[#D4AF37] mb-2">
                        ⚡ O Protocolo de 7 Dias
                    </h2>
                    <p className="text-center text-[#FFD700] text-lg font-semibold mb-8">
                        Apenas 12 minutos por dia
                    </p>
                    
                    <div className="space-y-4 relative">
                        {/* Connecting line */}
                        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#D4AF37] via-[#FFD700] to-[#D4AF37] opacity-30" aria-hidden="true"></div>
                        
                        {/* Protocol Steps - Benefit-Focused */}
                        {[
                            { icon: Eye, title: 'Dia 1: O Fim da Cegueira Financeira Ancestral', desc: 'Identifique onde seu dinheiro está vazando' },
                            { icon: Flame, title: 'Dia 2: Limpeza de DNA - Vazamento Invisível', desc: 'Elimine a lealdade invisível à pobreza que drena sua energia' },
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

                {/* Frequency Room Component - Lazy Loaded */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "100px" }}
                    transition={{ delay: 0.2 }}
                    className="mb-12"
                >
                    <FrequencyRoom />
                </motion.div>

                {/* Social Proof Testimonials Section - Lazy Loaded */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "100px" }}
                    transition={{ delay: 0.2 }}
                >
                    <SocialProofTestimonials onCtaClick={handleCheckout} />
                </motion.div>

                {/* Mentor Authority Section */}
                <MentorAuthority />

                {/* CHECKOUT FINAL - COMPLETELY REWRITTEN */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2 }}
                    className="relative bg-gradient-to-br from-[#1a0b2e] to-[#2d1b4e] rounded-3xl p-8 md:p-10 border-2 border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.4)]"
                >
                    {/* Subtle pulsing glow effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] rounded-3xl blur-md opacity-20 animate-pulse" aria-hidden="true"></div>
                    
                    <div className="relative">
                        {/* Exclusive Offer Badge */}
                        <div className="text-center mb-6">
                            <div className="inline-block bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black font-black text-sm px-6 py-2 rounded-full mb-4 shadow-lg">
                                🔒 OFERTA EXCLUSIVA PARA {userName.toUpperCase()}
                            </div>
                            <h3 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight">
                                🔥 ÚLTIMA ETAPA: ATIVE SEU<br />PROTOCOLO AGORA
                            </h3>
                            <p className="text-[#FFD700] text-lg font-semibold mb-2">
                                Mapa Xamânico Personalizado + Protocolo de 7 Dias<br />
                                Desbloqueio Financeiro Ancestral
                            </p>
                            <p className="text-slate-300 text-sm mt-3">
                                ✅ Mais de {totalMapas} mapas já gerados
                            </p>
                        </div>

                        <hr className="border-[#D4AF37]/30 my-6" />

                        {/* Price Display - Enhanced */}
                        <div className="text-center mb-6">
                            <p className="text-slate-400 text-sm mb-2 line-through">Valor da Sessão Individual: R$ 497,00</p>
                            <p className="text-emerald-400 text-2xl md:text-3xl font-black mb-4">
                                💰 INVESTIMENTO ÚNICO:<br />
                                <span className="text-white text-5xl md:text-6xl">R$ {priceNew}</span> <span className="text-emerald-400 text-2xl">(PIX)</span>
                            </p>
                            <div className="space-y-1 text-emerald-400 text-sm font-semibold">
                                <p>✅ Acesso Vitalício</p>
                                <p>✅ Garantia de 7 Dias</p>
                            </div>
                        </div>

                        <hr className="border-[#D4AF37]/30 my-6" />

                        {/* Emotional Urgency Box - YELLOW (not red) */}
                        <div className="bg-[#FFD700]/10 border-2 border-[#FFD700]/40 rounded-xl p-6 mb-6">
                            <p className="text-[#FFD700] font-bold text-lg mb-3 flex items-center justify-center gap-2">
                                <span>⚡</span> ATENÇÃO:
                            </p>
                            <div className="text-white text-base leading-relaxed space-y-2">
                                <p>
                                    Cada dia que você adia é um dia a mais vivendo com esse bloqueio financeiro.
                                </p>
                                <p className="font-bold text-lg">
                                    Quanto tempo você vai esperar?
                                </p>
                                <p>
                                    Mais 1 mês? Mais 1 ano? Mais 10 anos?
                                </p>
                                <p className="text-[#FFD700] font-black text-xl">
                                    O momento de agir é AGORA.
                                </p>
                            </div>
                        </div>

                        <hr className="border-[#D4AF37]/30 my-6" />

                        {/* Social Proof - Recent Purchases */}
                        <div className="text-center mb-6">
                            <p className="text-slate-300 text-sm mb-3 flex items-center justify-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                👥 23 pessoas compraram nas últimas 24h
                            </p>
                            <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
                                <span className="bg-white/5 px-3 py-1 rounded-full">"Maria acabou de comprar há 2min"</span>
                                <span className="bg-white/5 px-3 py-1 rounded-full">"João acabou de comprar há 8min"</span>
                            </div>
                        </div>

                        <hr className="border-[#D4AF37]/30 my-6" />

                        {/* FINAL EMOTIONAL CTA */}
                        <div className="text-center mb-6">
                            <p className="text-white text-lg font-bold mb-4">
                                Você está a UM CLIQUE de:
                            </p>
                            <div className="text-slate-300 text-sm space-y-2 mb-6">
                                <p className="flex items-start gap-2">
                                    <span className="text-[#FFD700]">✨</span>
                                    <span>Descobrir qual bloqueio ancestral trava seu dinheiro</span>
                                </p>
                                <p className="flex items-start gap-2">
                                    <span className="text-[#FFD700]">✨</span>
                                    <span>Receber o ritual exato de 7 dias para limpar isso</span>
                                </p>
                                <p className="flex items-start gap-2">
                                    <span className="text-[#FFD700]">✨</span>
                                    <span>Entender por que algumas pessoas atraem abundância e você não</span>
                                </p>
                            </div>
                            <p className="text-white text-xl font-bold mb-2">
                                A pergunta é:
                            </p>
                            <p className="text-slate-300 text-base mb-4">
                                Você vai continuar vivendo com esse bloqueio...<br />
                                <span className="text-white font-bold">...ou vai fazer algo HOJE?</span>
                            </p>
                        </div>

                        {/* GIANT CTA BUTTON */}
                        <button
                            onClick={handleCheckout}
                            className="w-full md:w-[80%] mx-auto block bg-gradient-to-r from-[#FF8C00] via-[#FFA500] to-[#FFB700] hover:from-[#FFA500] hover:via-[#FFB700] hover:to-[#FFD700] text-white font-black text-xl md:text-2xl py-6 px-8 rounded-2xl shadow-[0_8px_40px_rgba(255,140,0,0.6)] transition-all transform hover:scale-105 active:scale-95 border-2 border-[#FFD700] uppercase tracking-wide mb-4"
                        >
                            🔥 GERAR MEU ACESSO AGORA (PIX)
                        </button>

                        {/* Security Badges Below Button */}
                        <div className="text-center space-y-2">
                            <p className="text-emerald-400 text-sm font-semibold">
                                ✅ Acesso Liberado em Até 2 Minutos
                            </p>
                            <p className="text-emerald-400 text-sm font-semibold">
                                🔒 Pagamento 100% Seguro via PIX Banco Central
                            </p>
                        </div>

                        <hr className="border-[#D4AF37]/30 my-6" />

                        {/* Payment Processor Badge */}
                        <div className="text-center text-slate-400 text-xs space-y-1">
                            <p>💳 Pagamento processado pela Buck Pay</p>
                            <p>🔐 Site Seguro SSL | PIX Oficial Banco Central</p>
                            <p className="text-[10px] text-slate-500">A plataforma de pagamentos mais segura do Brasil</p>
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
                        {/* Bonus 1: Meditations - 3D Mockup Visual */}
                        <div className="bg-white/5 backdrop-blur-sm border border-[#D4AF37]/30 rounded-xl p-4 hover:border-[#FFD700]/50 transition-all">
                            <div className="flex items-center justify-center mb-3">
                                <div className="relative">
                                    <Headphones className="w-12 h-12 text-[#FFD700]" />
                                    <div className="absolute -inset-1 bg-[#FFD700]/20 blur-lg rounded-full"></div>
                                </div>
                            </div>
                            <p className="font-semibold text-white mb-2">🎧 Meditações Guiadas 3D</p>
                            <p className="text-sm text-slate-300">Áudios de ativação profunda com frequência 528Hz</p>
                            <p className="text-[#FFD700] text-sm mt-2 font-bold">Valor: R$ 97,00</p>
                        </div>
                        {/* Bonus 2: Support - With Scarcity */}
                        <div className="bg-white/5 backdrop-blur-sm border border-[#D4AF37]/30 rounded-xl p-4 hover:border-[#FFD700]/50 transition-all relative overflow-hidden">
                            {/* Scarcity Badge */}
                            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                                VAGAS LIMITADAS
                            </div>
                            <div className="flex items-center justify-center mb-3 mt-4">
                                <div className="relative">
                                    <Users className="w-12 h-12 text-[#FFD700]" />
                                    <div className="absolute -inset-1 bg-[#FFD700]/20 blur-lg rounded-full"></div>
                                </div>
                            </div>
                            <p className="font-semibold text-white mb-2">👥 Suporte Energético Exclusivo</p>
                            <p className="text-sm text-slate-300">Comunidade privada com acesso limitado</p>
                            <p className="text-[#FFD700] text-sm mt-2 font-bold">Valor: R$ 47,00</p>
                            <p className="text-xs text-red-300 mt-2 font-semibold">⚠️ Apenas 50 vagas disponíveis</p>
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
                                    <p className="text-white text-xs font-black">GARANTIA</p>
                                    <p className="text-white text-xl font-black leading-none">7 DIAS</p>
                                </div>
                            </motion.div>

                            <h3 className="text-2xl font-bold text-emerald-300 mb-4">Garantia Blindada de Resultado</h3>
                            <div className="text-slate-200 text-base md:text-lg leading-relaxed space-y-3">
                                <p className="font-semibold text-white">
                                    Você não tem risco nenhum.
                                </p>
                                <p>
                                    Entre, faça o Mapa, use os áudios por 7 dias.
                                </p>
                                <p>
                                    Se você <strong className="text-white">NÃO</strong> sentir o peso saindo das suas costas, 
                                    se você <strong className="text-white">NÃO</strong> perceber mudança na sua energia, 
                                    se você <strong className="text-white">NÃO</strong> ver sinais de desbloqueio...
                                </p>
                                <p className="text-white font-bold">
                                    ...eu devolvo 100% do seu dinheiro.
                                </p>
                                <p>
                                    Sem perguntas. Sem burocracia. Basta um e-mail.
                                </p>
                                <p className="text-emerald-300 font-bold text-xl mt-4">
                                    Ou seja: o risco é TODO MEU.
                                </p>
                            </div>

                            {/* NEW: "Why I Offer This" Box */}
                            <div className="mt-8 bg-white/5 backdrop-blur-md border border-emerald-500/30 rounded-xl p-6">
                                <h4 className="text-[#FFD700] font-bold text-lg mb-3 flex items-center justify-center gap-2">
                                    <span>💡</span> POR QUE OFEREÇO ISSO?
                                </h4>
                                <p className="text-slate-200 text-sm md:text-base leading-relaxed mb-3">
                                    Porque EU SEI que funciona. Mais de {totalMapas} pessoas já fizeram e 92% relatam mudança em até 14 dias.
                                </p>
                                <p className="text-emerald-300 font-semibold">
                                    Se não funcionar com você (raro), eu não mereço seu dinheiro.
                                </p>
                            </div>

                            {/* CTA Button */}
                            <button
                                onClick={handleCheckout}
                                className="mt-6 w-full md:w-auto mx-auto block bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] hover:brightness-110 text-black font-black text-lg py-5 px-12 rounded-2xl shadow-[0_8px_30px_rgba(212,175,55,0.5)] transition-all transform hover:scale-105 active:scale-95 border-2 border-[#FFD700] uppercase tracking-wide"
                            >
                                QUERO COMEÇAR SEM RISCO AGORA
                            </button>
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
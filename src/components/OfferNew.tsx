import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Shield, Clock, AlertTriangle, Sparkles, Lock, CheckCircle } from 'lucide-react';
import { FAQ } from './FAQ';
import { tracking } from '../utils/tracking';
import { SacredGeometry, RitualButton } from './ritual';

interface OfferProps {
    userName: string;
}

/**
 * OFFER PAGE - ACT IV: THE REVELATION & ACT V: THE INITIATION
 * Ceremonial sacred reveal experience - NOT a SaaS conversion page
 * Architecture: Deep mystical darkness + Aged gold accents + Ritual energy
 */
const OfferNew = ({ userName }: OfferProps) => {
    const [showOfferContent, setShowOfferContent] = useState(false);
    const [showFloatingButton, setShowFloatingButton] = useState(false);
    const [scrollDepthTracked, setScrollDepthTracked] = useState<Record<number, boolean>>({});
    const [vslWatchedPercent, setVslWatchedPercent] = useState(0);
    
    // Price configuration - PIX ONLY (À VISTA)
    // Updated price anchoring: From R$ 497,00 (session value) to R$ 27,90
    const priceOld = "497,00";

    // Track result page view on component mount
    useEffect(() => {
        tracking.result.view('Mapa Xamânico', 100);
    }, []);

    // NOVO: Scroll depth tracking with throttling for performance
    useEffect(() => {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const windowHeight = window.innerHeight;
                    const documentHeight = document.documentElement.scrollHeight;
                    const scrollTop = window.scrollY;
                    const scrollPercent = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);

                    // Track depth milestones: 25%, 50%, 75%, 100%
                    const milestones = [25, 50, 75, 100];
                    milestones.forEach(milestone => {
                        if (scrollPercent >= milestone && !scrollDepthTracked[milestone]) {
                            tracking.engagement.scrollDepth(milestone);
                            setScrollDepthTracked(prev => ({ ...prev, [milestone]: true }));
                        }
                    });

                    // Show floating button after 500px of scroll
                    if (scrollTop > 500) {
                        setShowFloatingButton(true);
                    } else {
                        setShowFloatingButton(false);
                    }
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollDepthTracked]);

    // NOVO: VSL tracking (to be connected with SmartPlayer)
    useEffect(() => {
        // This will be enhanced when SmartPlayer API is available
        // For now, set up placeholder for video tracking
        const vslTitle = 'Mapa Xamânico Reveal';
        
        // TODO: Connect with SmartPlayer events
        // player.on('play', () => tracking.vsl.playStart(vslTitle));
        // player.on('timeupdate', (time, duration) => {
        //   const percent = Math.round((time / duration) * 100);
        //   if (percent >= 25 && !tracked25) tracking.vsl.progress(vslTitle, 25, time);
        //   // ... more milestones
        // });
        
    }, []);

    // Load video player script
    useEffect(() => {
        const optimizationScript = document.createElement('script');
        optimizationScript.innerHTML = '!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);';
        document.head.appendChild(optimizationScript);

        const preloadLinks = [
            { href: 'https://scripts.converteai.net/c263b2f0-9566-42be-97d8-7f5920037741/players/6953144d84040898eb13007a/v4/player.js', as: 'script' },
            { href: 'https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js', as: 'script' },
            { href: 'https://cdn.converteai.net/c263b2f0-9566-42be-97d8-7f5920037741/6953140fba8707e946bf11ea/main.m3u8', as: 'fetch' }
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

        const playerScript = document.createElement('script');
        playerScript.src = 'https://scripts.converteai.net/c263b2f0-9566-42be-97d8-7f5920037741/players/6953144d84040898eb13007a/v4/player.js';
        playerScript.async = true;
        document.head.appendChild(playerScript);

        // Simulate video timing - Show offer content after 4:15 (255 seconds)
        // In production, this should be triggered by actual video events
        const timer = setTimeout(() => {
            setShowOfferContent(true);
        }, 5000); // 5 seconds for demo, should be 255000 in production

        return () => {
            clearTimeout(timer);
            optimizationScript.remove();
            playerScript.remove();
            preloadElements.forEach(el => el.remove());
        };
    }, []);

    // NOVO: Scroll tracking para botão flutuante
    useEffect(() => {
        // Scroll tracking is now handled in the scroll depth tracking useEffect above
        // This comment remains for backward compatibility
    }, []);

    const handleCheckout = () => {
        // Get current scroll depth for tracking
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const currentScrollDepth = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);

        // Track add to cart with enhanced context
        tracking.purchase.addToCart({
            productName: 'Mapa Xamânico - Curso Completo',
            productPrice: 27.90,
            productId: 'mapa-xamanico-001',
            email: 'unknown@email.com'
        });
        
        // Track CTA click with position and context
        tracking.funnel.clickCTA(
            'QUERO INICIAR MEU DESBLOQUEIO AGORA',
            'main_offer',
            currentScrollDepth
        );
        
        window.location.href = 'https://www.seguropagamentos.com.br/mapa-xamanico';
    };

    // NOVO: Scroll suave até checkout com tracking
    const scrollToCheckout = () => {
        // Get current scroll depth for accurate tracking
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const currentScrollDepth = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);
        
        const checkoutElement = document.getElementById('checkout-section');
        if (checkoutElement) {
            checkoutElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Track floating button click with actual scroll depth
            tracking.funnel.clickCTA(
                'DESBLOQUEAR AGORA - R$27,90',
                'floating_mobile',
                currentScrollDepth
            );
        } else {
            // Fallback: redirecionar para checkout
            handleCheckout();
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden text-white bg-[#050208]">
            {/* ═══ SACRED RITUAL BACKGROUND - Deep ceremonial darkness ═══ */}
            <div className="fixed inset-0 -z-10">
                {/* Void gradient base */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0510] via-[#050208] to-[#0a0510]"></div>
                
                {/* Sacred energy field */}
                <motion.div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(201, 162, 39, 0.08) 0%, transparent 60%)'
                    }}
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Ancient grain texture */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}></div>
            </div>
            
            {/* Rotating sacred geometry in background */}
            <SacredGeometry 
                variant="mandala" 
                size={600} 
                opacity={0.03}
                className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-5"
            />

            <div className="max-w-[800px] mx-auto px-3 sm:px-4 py-3 sm:py-5 relative z-10">
                {/* ═══ BLOCK 01: HERO SECTION - THE REVELATION (ACT IV) ═══ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center mb-3 sm:mb-4"
                >
                    <motion.h1 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-base sm:text-lg md:text-xl font-black uppercase text-[#C9A227] mb-2 tracking-wide leading-tight px-1 ritual-text-glow"
                    >
                        <span className="break-words flex items-center justify-center gap-1.5 sm:gap-2">
                            <motion.div
                                animate={{ 
                                    rotate: [0, 360],
                                    scale: [1, 1.2, 1]
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                            </motion.div>
                            <span className="text-[14px] sm:text-base">{userName && userName.trim() ? `⚡ DIAGNÓSTICO DE ${userName.toUpperCase()} CONCLUÍDO` : '⚡ SEU DIAGNÓSTICO CONCLUÍDO'}</span>
                        </span>
                        <motion.span 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-white block mt-1.5 text-[13px] sm:text-base md:text-lg"
                        >
                            🔓 SEU BLOQUEIO ANCESTRAL FOI IDENTIFICADO
                        </motion.span>
                    </motion.h1>
                    
                    {/* ═══ Type of Blockage Badge - Ritual seal style ═══ */}
                    <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                            scale: [0, 1.15, 1],
                            opacity: 1
                        }}
                        transition={{ 
                            delay: 0.7,
                            duration: 0.6,
                            type: "spring",
                            stiffness: 250,
                            damping: 12
                        }}
                        className="inline-block bg-gradient-to-r from-[#8B7355] via-[#C9A227] to-[#8B7355] text-[#0a0510] font-extrabold text-[11px] sm:text-sm px-3 sm:px-5 py-2 rounded-lg sm:rounded-xl mt-2 relative overflow-hidden border-2 border-[#C9A227]/60"
                        style={{
                            boxShadow: '0 0 40px rgba(201, 162, 39, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2), inset 0 -2px 4px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        {/* Animated shine effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{
                                x: ['-100%', '200%'],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                                delay: 1
                            }}
                        />
                        <span className="relative z-10 tracking-tight font-ritual">
                            🔥 Tipo: Herança Vibracional de Escassez (Linhagem Materna)
                        </span>
                    </motion.div>
                </motion.div>

                {/* ═══ Pain Dimensionalization Section - Ritual warning ═══ */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="ritual-card p-3 sm:p-4 md:p-5 mb-4 sm:mb-5"
                    style={{
                        borderColor: 'rgba(139, 37, 0, 0.6)',
                        boxShadow: '0 0 40px rgba(139, 37, 0, 0.2), inset 0 1px 0 rgba(139, 37, 0, 0.2)'
                    }}
                >
                    <div className="flex items-start gap-2 mb-3">
                        <motion.div
                            animate={{ 
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        >
                            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF4500] flex-shrink-0 mt-0.5" />
                        </motion.div>
                        <p className="text-white font-extrabold text-sm sm:text-base md:text-lg leading-snug">
                            ⚠️ {userName && userName.trim() ? userName.split(' ')[0] : 'Você'}, este bloqueio está AGORA:
                        </p>
                    </div>
                    <div className="space-y-2 sm:space-y-2.5 text-slate-200 text-[12px] sm:text-sm ml-6 sm:ml-8">
                        <motion.p 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-start gap-2 leading-relaxed"
                        >
                            <span className="text-[#FF4500] font-extrabold text-lg">✗</span>
                            <span className="font-semibold">Drenando <span className="text-[#C9A227] font-bold">R$5-50 mil por mês</span> da sua conta</span>
                        </motion.p>
                        <motion.p 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-start gap-2 leading-relaxed"
                        >
                            <span className="text-[#FF4500] font-extrabold text-lg">✗</span>
                            <span className="font-semibold">Criando <span className="text-red-400">autosabotagem financeira</span> inconsciente</span>
                        </motion.p>
                        <motion.p 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-start gap-2 leading-relaxed"
                        >
                            <span className="text-[#FF4500] font-extrabold text-lg">✗</span>
                            <span className="font-semibold">Fazendo você trabalhar <span className="text-orange-400">MAIS</span> mas ganhar <span className="text-red-400">MENOS</span></span>
                        </motion.p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#FF4500]/40">
                        <p className="text-white text-[13px] sm:text-sm md:text-base font-bold flex items-center gap-2 leading-relaxed">
                            <span className="text-xl flex-shrink-0">👇</span>
                            <span>No vídeo abaixo, você vai descobrir <span className="text-[#4ade80]">EXATAMENTE</span> como destruir esta trava em 7 dias:</span>
                        </p>
                    </div>
                </motion.div>

                {/* Urgency Microcopy Above Video - IMPROVED - More Compact with stronger urgency */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-r from-[#8B0000]/95 to-[#CC0000]/95 border-2 border-red-500/60 rounded-xl px-4 sm:px-5 py-3 mb-3 sm:mb-4 text-center shadow-[0_0_30px_rgba(255,0,0,0.3)]"
                >
                    <div className="flex items-center gap-2 justify-center mb-1">
                        <motion.div
                            animate={{ 
                                scale: [1, 1.2, 1],
                                rotate: [0, 10, -10, 0]
                            }}
                            transition={{ 
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        >
                            <Shield className="w-5 h-5 text-white flex-shrink-0" />
                        </motion.div>
                        <p className="text-xs sm:text-sm md:text-base text-white font-black uppercase tracking-wide">
                            ⏰ ATENÇÃO CRÍTICA
                        </p>
                    </div>
                    <p className="text-[11px] sm:text-xs md:text-sm text-red-100 font-bold">
                        Vídeo personalizado expira em <span className="text-[#C9A227] font-black">24 HORAS</span>. Assista AGORA!
                    </p>
                </motion.div>

                {/* Benefits List BEFORE Video - Improved readability */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-[#C9A227]/10 to-[#C9A227]/5 border-2 border-[#C9A227]/30 rounded-lg sm:rounded-xl p-4 sm:p-5 mb-5 sm:mb-6"
                >
                    <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#C9A227]" />
                        <h3 className="text-center text-[#C9A227] font-bold text-sm sm:text-base uppercase tracking-wider">
                            NESTE VÍDEO VOCÊ ESTÁ DESCOBRINDO:
                        </h3>
                    </div>
                    <div className="space-y-2 sm:space-y-2.5 text-left max-w-lg mx-auto">
                        <p className="text-slate-200 text-sm sm:text-base flex items-start gap-2 leading-relaxed">
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span>Por que o dinheiro entra e sai (e como quebrar esse ciclo em 7 dias)</span>
                        </p>
                        <p className="text-slate-200 text-sm sm:text-base flex items-start gap-2 leading-relaxed">
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span>Qual trava está bloqueando AGORA de R$5k a R$50k por mês</span>
                        </p>
                        <p className="text-slate-200 text-sm sm:text-base flex items-start gap-2 leading-relaxed">
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span>O protocolo de 7 dias — 89% relatam dinheiro nos primeiros 3 dias</span>
                        </p>
                        <p className="text-slate-200 text-sm sm:text-base flex items-start gap-2 leading-relaxed">
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span>Como o dinheiro chega sem você precisar trabalhar mais</span>
                        </p>
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <p className="text-center text-slate-400 text-xs sm:text-sm">
                            Em apenas 2 minutos você descobre EXATAMENTE qual trava está bloqueando de R$5k a R$50k todo mês
                        </p>
                    </div>
                </motion.div>

                {/* BLOCK 02: VSL VIDEO PLAYER - Properly Sized for Vertical Video (9:16) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="relative rounded-lg sm:rounded-2xl overflow-hidden border-2 border-[#C9A227] shadow-[0_0_60px_rgba(212,175,55,0.4)] mb-6 sm:mb-8 mx-auto w-full"
                    style={{ maxWidth: 'min(450px, 100%)' }}
                >
                    <div className="bg-black flex items-center justify-center relative">
                        {/* Vertical video container: 9:16 aspect ratio (portrait), responsive height */}
                        {/* For 9:16 ratio, we need height = (16/9) * width, so paddingBottom = (16/9) * 100% = 177.78% */}
                        <div className="w-full relative" style={{ paddingBottom: '177.78%' }}>
                            <vturb-smartplayer 
                                id="vid-6953144d84040898eb13007a" 
                                style={{ 
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    display: 'block'
                                }}
                            ></vturb-smartplayer>
                        </div>
                    </div>
                    {/* Glow effect */}
                    <div className="absolute -inset-2 bg-[#C9A227]/20 blur-xl -z-10"></div>
                </motion.div>

                {/* CTA #1 - IMMEDIATELY AFTER VSL (ALWAYS VISIBLE) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="my-4 sm:my-6 md:my-8"
                >
                    <div className="text-center mb-3 sm:mb-5">
                        <h2 className="text-[15px] sm:text-lg md:text-xl font-black text-white mb-2 leading-tight px-1">
                            EXISTE UMA "TRAVA ANCESTRAL" IMPEDINDO<br className="hidden sm:block" />
                            O DINHEIRO DE PARAR NA SUA MÃO?
                        </h2>
                        <p className="text-[13px] sm:text-sm md:text-base text-slate-300 mb-3 sm:mb-5 px-1">
                            O Protocolo Xamânico revela onde está o vazamento.
                        </p>
                    </div>

                    {/* ═══ GIANT CTA BUTTON - Ritual artifact style ═══ */}
                    <div className="relative w-full md:w-[75%] mx-auto mb-3 sm:mb-4">
                        {/* Sacred glow behind button */}
                        <motion.div 
                            className="absolute -inset-2 rounded-2xl"
                            style={{
                                background: 'radial-gradient(ellipse at center, rgba(201, 162, 39, 0.3) 0%, transparent 70%)'
                            }}
                            animate={{
                                scale: [1, 1.05, 1],
                                opacity: [0.4, 0.7, 0.4]
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        
                        <RitualButton 
                            onClick={handleCheckout}
                            size="lg"
                            pulse
                            className="w-full"
                        >
                            🔥 QUERO INICIAR MEU DESBLOQUEIO AGORA
                        </RitualButton>
                    </div>

                    {/* Micro-benefits below button */}
                    <div className="text-center space-y-1 text-[11px] sm:text-xs px-1">
                        <p className="text-emerald-400 font-semibold">✅ Pagamento Único de R$27,90 (PIX)</p>
                        <p className="text-emerald-400 font-semibold">✅ Acesso Vitalício | Garantia de 7 Dias</p>
                        <p className="text-emerald-400 font-semibold">✅ Mais de 4.300 mapas já gerados</p>
                    </div>

                    {/* Security badge */}
                    <p className="text-center text-slate-400 text-[10px] sm:text-xs mt-2 sm:mt-3">
                        💳 Pagamento 100% seguro via PIX Banco Central
                    </p>
                </motion.div>

                {/* ═══ BLOCK 03: THE OFFER - ACT V: THE INITIATION ═══ */}
                <AnimatePresence>
                    {showOfferContent && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* PRICE ANCHORING STACK - PIX APENAS */}
                            <motion.div
                                id="checkout-section"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border-2 border-[#C9A227] rounded-3xl p-4 sm:p-6 md:p-8 mb-8 relative overflow-hidden"
                            >
                                {/* Pulsing glow */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-[#C9A227] to-[#C9A227] rounded-3xl blur-lg opacity-20 animate-pulse"></div>
                                
                                <div className="relative">
                                    <div className="text-center mb-6 sm:mb-8">
                                        <p className="text-slate-400 text-xs sm:text-sm uppercase tracking-wider mb-4 sm:mb-6">
                                            <Clock className="inline w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                            Oferta Exclusiva e Limitada para {userName}
                                        </p>
                                        
                                        {/* Price Stack - NOVO FORMATO SÓ PIX - MOBILE OPTIMIZED */}
                                        <div className="space-y-2 sm:space-y-3">
                                            {/* Linha 1: Ancoragem (Valor Antigo) - MELHORADO: menor e mais apagado */}
                                            <div>
                                                <p className="text-slate-500 text-[10px] sm:text-xs line-through opacity-60">
                                                    Valor da Sessão Individual: R$ {priceOld}
                                                </p>
                                            </div>

                                            {/* Linha 2: Justificativa do PIX */}
                                            <div className="my-3 sm:my-4">
                                                <p className="text-white text-base sm:text-lg md:text-xl font-semibold px-2">
                                                    Isento de Taxas Bancárias (Somente PIX):
                                                </p>
                                            </div>

                                            {/* Linha 3: PREÇO GIGANTE VERDE NEON - Mobile Optimized - MUITO MAIOR */}
                                            <motion.div 
                                                initial={{ scale: 0.7, opacity: 0 }}
                                                animate={{ 
                                                    scale: 1,
                                                    opacity: 1
                                                }}
                                                transition={{ 
                                                    delay: 0.6,
                                                    duration: 0.6,
                                                    type: "spring",
                                                    stiffness: 150,
                                                    damping: 12
                                                }}
                                                className="my-6 sm:my-8"
                                            >
                                                <div className="flex items-center justify-center gap-1">
                                                    <motion.span 
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.8 }}
                                                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#00ff88] drop-shadow-[0_0_40px_rgba(0,255,136,1)] animate-pulse" 
                                                        style={{ fontWeight: 900 }}
                                                    >
                                                        R$
                                                    </motion.span>
                                                    <motion.span 
                                                        initial={{ scale: 0.5, opacity: 0 }}
                                                        animate={{ 
                                                            scale: [0.5, 1.1, 1],
                                                            opacity: 1
                                                        }}
                                                        transition={{ 
                                                            delay: 0.9,
                                                            duration: 0.5,
                                                            type: "spring"
                                                        }}
                                                        className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black text-[#00ff88] drop-shadow-[0_0_40px_rgba(0,255,136,1)] animate-pulse" 
                                                        style={{ 
                                                            fontWeight: 900,
                                                            textShadow: '0 0 60px rgba(0,255,136,0.8), 0 0 100px rgba(0,255,136,0.4)'
                                                        }}
                                                    >
                                                        27
                                                    </motion.span>
                                                    <motion.span 
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 1.0 }}
                                                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#00ff88] drop-shadow-[0_0_40px_rgba(0,255,136,1)] self-start mt-2 animate-pulse" 
                                                        style={{ fontWeight: 900 }}
                                                    >
                                                        ,90
                                                    </motion.span>
                                                </div>
                                            </motion.div>

                                            {/* Linha 4: Microcopy */}
                                            <div className="mb-4 sm:mb-6">
                                                <p className="text-white text-lg sm:text-xl md:text-2xl font-bold px-2">
                                                    Pagamento Único. Acesso Vitalício.
                                                </p>
                                            </div>

                                            {/* Justificativa do "Só PIX" */}
                                            <div className="bg-[#C9A227]/10 border border-[#C9A227]/30 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                                                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                                                    Para manter o valor acessível em R$ 27,90, nós removemos as taxas de cartão de crédito e boletos bancários. 
                                                    O pagamento é <span className="text-[#C9A227] font-bold">exclusivo via PIX</span> para ativação imediata no sistema.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                     {/* Emotional Urgency Box - Enhanced with better styling */}
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 1.2 }}
                                        className="bg-gradient-to-br from-[#C9A227]/15 to-[#FFA500]/10 border-2 border-[#C9A227]/50 rounded-xl p-4 sm:p-5 mb-4 sm:mb-5 shadow-[0_0_25px_rgba(255,215,0,0.2)]"
                                    >
                                        <p className="text-[#C9A227] font-black text-lg sm:text-xl mb-3 flex items-center justify-center gap-2">
                                            <motion.span
                                                animate={{ 
                                                    scale: [1, 1.2, 1],
                                                    rotate: [0, 10, -10, 0]
                                                }}
                                                transition={{ 
                                                    duration: 1.5,
                                                    repeat: Infinity,
                                                    repeatType: "reverse"
                                                }}
                                            >
                                                ⚡
                                            </motion.span>
                                            <span>DECISÃO CRÍTICA:</span>
                                        </p>
                                        <div className="text-white text-sm sm:text-base leading-relaxed space-y-2.5">
                                            <p className="font-semibold">
                                                Cada dia adiado é um dia a mais <span className="text-red-400 font-bold">com o bloqueio ativo</span>.
                                            </p>
                                            <p className="font-semibold">
                                                Mais 1 mês? Mais 1 ano? <span className="text-orange-400 font-bold">Mais uma geração?</span>
                                            </p>
                                            <p className="text-[#C9A227] font-black text-lg sm:text-xl text-center mt-3">
                                                🎯 O momento é AGORA.
                                            </p>
                                        </div>
                                    </motion.div>

                                    {/* Social Proof - Recent Purchases - Enhanced with better animation */}
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.3 }}
                                        className="text-center mb-4 sm:mb-5"
                                    >
                                        <p className="text-slate-300 text-sm sm:text-base mb-2 flex items-center justify-center gap-2 font-semibold">
                                            <span className="relative flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00ff88] shadow-[0_0_12px_rgba(0,255,136,0.9)]"></span>
                                            </span>
                                            <span>👥 <span className="text-[#4ade80] font-bold">23 pessoas</span> compraram nas últimas 24h</span>
                                        </p>
                                        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 text-xs">
                                            <motion.span 
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 1.4 }}
                                                className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20"
                                            >
                                                💚 "Maria acabou de comprar há 2min"
                                            </motion.span>
                                            <motion.span 
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 1.5 }}
                                                className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20"
                                            >
                                                💚 "João acabou de comprar há 8min"
                                            </motion.span>
                                        </div>
                                    </motion.div>

                                    {/* EMOTIONAL CTA BEFORE BUTTON - Enhanced */}
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.4 }}
                                        className="text-center mb-5 px-2"
                                    >
                                        <p className="text-white text-lg sm:text-xl font-black mb-3">
                                            ✨ Você está a <span className="text-[#4ade80]">UM CLIQUE</span> de:
                                        </p>
                                        <div className="text-slate-300 text-sm sm:text-base space-y-2.5 mb-5 text-left max-w-md mx-auto">
                                            <motion.p 
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 1.5 }}
                                                className="flex items-start gap-2"
                                            >
                                                <span className="text-[#C9A227] flex-shrink-0 text-lg">✓</span>
                                                <span className="font-medium">Descobrir qual bloqueio ancestral trava <span className="text-[#C9A227] font-bold">R$5-50k</span> todo mês</span>
                                            </motion.p>
                                            <motion.p 
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 1.6 }}
                                                className="flex items-start gap-2"
                                            >
                                                <span className="text-[#C9A227] flex-shrink-0 text-lg">✓</span>
                                                <span className="font-medium">Receber o protocolo de 7 dias usado por <span className="text-[#4ade80] font-bold">4.387 pessoas</span></span>
                                            </motion.p>
                                            <motion.p 
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 1.7 }}
                                                className="flex items-start gap-2"
                                            >
                                                <span className="text-[#C9A227] flex-shrink-0 text-lg">✓</span>
                                                <span className="font-medium">Entender <span className="text-white font-bold">POR QUÊ</span> o dinheiro nunca parou na sua mão</span>
                                            </motion.p>
                                        </div>
                                        <p className="text-white text-lg sm:text-xl font-black mb-2">
                                            💭 A pergunta é:
                                        </p>
                                        <p className="text-slate-300 text-base sm:text-lg mb-3 font-semibold">
                                            Você vai continuar vivendo com esse bloqueio...<br />
                                            <span className="text-white font-black text-lg">...ou vai fazer algo HOJE?</span>
                                        </p>
                                    </motion.div>

                                    {/* CTA BUTTON COM ÍCONE PIX - Mobile Optimized with enhanced animation */}
                                    <motion.button
                                        onClick={handleCheckout}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full bg-gradient-to-r from-[#00FF41] to-[#00CC33] hover:from-[#00CC33] hover:to-[#00FF41] text-black font-black text-base sm:text-lg md:text-xl py-5 md:py-6 px-4 md:px-8 rounded-2xl shadow-[0_0_40px_rgba(0,255,65,0.6)] transition-all uppercase tracking-wide mb-3 flex items-center justify-center gap-2 md:gap-3 relative overflow-hidden border-2 border-[#00FF41]"
                                    >
                                        {/* Shine effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                            animate={{
                                                x: ['-100%', '200%'],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "linear",
                                                repeatDelay: 0.5
                                            }}
                                        />
                                        <span className="text-2xl md:text-3xl flex-shrink-0 relative z-10">🔷</span>
                                        <span className="leading-tight relative z-10">GERAR MEU ACESSO AGORA (PIX)</span>
                                    </motion.button>

                                    {/* Subtexto do Botão */}
                                    <p className="text-center text-[#00FF41] text-sm font-semibold flex items-center justify-center gap-2">
                                        <Lock className="w-4 h-4" />
                                        ⚡ Acesso Liberado em Até 2 Minutos
                                    </p>

                                    {/* Trust Badge - SÓ PIX - Mobile Optimized */}
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mt-6">
                                        <div className="flex items-center gap-2 bg-white/10 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm">
                                            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0" />
                                            <span className="text-slate-300 font-semibold whitespace-nowrap">Site Seguro SSL</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-[#32BCAD]/20 px-3 sm:px-4 py-2 rounded-lg border border-[#32BCAD]/50 text-xs sm:text-sm">
                                            <span className="text-xl sm:text-2xl flex-shrink-0">🔷</span>
                                            <span className="text-white font-bold whitespace-nowrap">PIX Oficial</span>
                                        </div>
                                    </div>

                                    {/* Payment Processor Badge */}
                                    <div className="text-center text-slate-400 text-xs space-y-1 mt-4">
                                        <p>💳 Pagamento processado pela Buck Pay</p>
                                        <p className="text-[10px] text-slate-500">A plataforma de pagamentos mais segura do Brasil</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* BLOCK 04: TANGIBILIZAÇÃO - O QUE ELE RECEBE */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="mb-12"
                            >
                                <h2 className="text-lg sm:text-xl md:text-2xl font-black text-center text-[#C9A227] mb-4 sm:mb-6 md:mb-8 px-2">
                                    O Que Você Vai Receber Imediatamente
                                </h2>

                                {/* Mockup Visual - Otimizado para Mobile */}
                                <div className="flex justify-center mb-6 sm:mb-8 px-4 sm:px-6">
                                    <div className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg">
                                        <img 
                                            src="/mockup.png" 
                                            alt="Mapa Xamânico Completo"
                                            className="w-full h-auto max-h-[400px] sm:max-h-[500px] md:max-h-none rounded-lg sm:rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] object-contain mx-auto"
                                            loading="lazy"
                                        />
                                        <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-br from-[#C9A227]/20 to-[#C9A227]/20 blur-2xl sm:blur-3xl -z-10"></div>
                                    </div>
                                </div>

                                {/* Benefits Bullets */}
                                <div className="space-y-4 max-w-2xl mx-auto">
                                    {[
                                        {
                                            icon: '📜',
                                            title: 'O Mapa da Frequência',
                                            desc: 'Descubra exatamente onde está vazando o dinheiro da sua vida AGORA. Não é adivinhação, é um diagnóstico energético baseado na sua linhagem ancestral. ',
                                            descBold: 'Você vai entender POR QUE o dinheiro não para.'
                                        },
                                        {
                                            icon: '📅',
                                            title: 'Protocolo de 7 Dias',
                                            desc: 'O passo a passo simples para limpar a energia estagnada. Você não precisa de nada caro ou complicado - só seguir o protocolo dia após dia. ',
                                            descBold: '10-15 minutos por dia, 89% das pessoas sentem os primeiros sinais em até 3 dias.'
                                        },
                                        {
                                            icon: '🎧',
                                            title: 'Áudios de Reprogramação',
                                            desc: 'Desbloqueie sua mente enquanto você dorme. Esses áudios foram criados para desprogramar crenças de escassez que você nem sabe que tem. ',
                                            descBold: 'Olha só: é como resetar sua frequência enquanto você descansa.'
                                        },
                                        {
                                            icon: '🏠',
                                            title: 'Bônus: Ritual de Blindagem da Casa',
                                            desc: 'Proteja seu espaço das energias de escassez. 80% das pessoas não fazem isso e por isso o dinheiro "evapora" de casa. ',
                                            descBold: 'Esse ritual cria uma barreira energética contra vazamentos financeiros.'
                                        }
                                    ].map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.8 + idx * 0.1 }}
                                            className="flex items-start gap-4 bg-gradient-to-br from-white/5 to-white/[0.02] border border-[#C9A227]/30 rounded-xl p-3 sm:p-4 hover:border-[#C9A227]/50 transition-all"
                                        >
                                            <div className="flex-shrink-0 text-2xl sm:text-3xl md:text-4xl">
                                                {item.icon}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white font-bold text-sm sm:text-base md:text-lg mb-1.5 sm:mb-2">✅ {item.title}</p>
                                                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-none">
                                                    {item.desc}
                                                    <span className="font-bold text-white">{item.descBold}</span>
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* CTA #2 - AFTER "WHAT YOU RECEIVE" */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.0 }}
                                className="mb-12 text-center"
                            >
                                <button
                                    onClick={handleCheckout}
                                    className="w-full md:w-[60%] mx-auto block bg-gradient-to-r from-[#C9A227] via-[#C9A227] to-[#C9A227] hover:brightness-110 text-black font-black text-lg sm:text-xl py-5 px-6 sm:px-8 rounded-2xl shadow-[0_8px_30px_rgba(212,175,55,0.5)] transition-all transform hover:scale-105 active:scale-95 border-2 border-[#C9A227] uppercase tracking-wide mb-3"
                                >
                                    QUERO ACESSAR TUDO ISSO AGORA →
                                </button>
                                <p className="text-slate-400 text-sm">
                                    Acesso imediato após pagamento | R$27,90 no PIX
                                </p>
                            </motion.div>

                            {/* BLOCK 05: TESTIMONIALS (Moved before Authority for better flow) */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 }}
                                className="mb-12 bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-[#C9A227]/30 rounded-2xl p-8"
                            >
                                <h3 className="text-xl md:text-2xl font-bold text-[#C9A227] text-center mb-6">
                                    Quem guiará sua jornada?
                                </h3>
                                
                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    {/* Expert Photo */}
                                    <div className="relative flex-shrink-0">
                                        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#C9A227]">
                                            <img 
                                                src="/expert.jpg" 
                                                alt="Anahí Solara"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=388&auto=format&fit=crop";
                                                }}
                                            />
                                        </div>
                                        <div className="absolute -inset-2 bg-[#C9A227]/20 blur-xl -z-10"></div>
                                    </div>

                                    {/* Expert Bio - Enhanced with Bold for Scannability */}
                                    <div className="flex-1 text-center md:text-left">
                                        <p className="text-slate-200 leading-relaxed text-sm md:text-base">
                                            <span className="font-bold">"Por 12 anos, eu fui exatamente como você..."</span> Eu sou <span className="text-[#C9A227] font-bold">Anahí Solara</span>. Não sou guru financeira. 
                                            Sou Terapeuta Holística e dediquei os últimos <span className="text-white font-bold">10 anos</span> a decodificar 
                                            os padrões ocultos da escassez. <span className="font-bold">...descobri a verdade brutal: é um padrão energético ancestral.</span> Este mapa não é teoria. É o exato método que salvou minha 
                                            própria família da falência e já ajudou mais de <span className="text-[#C9A227] font-bold">4.000 alunos</span> a 
                                            destravarem a prosperidade."
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* BLOCK 06: SOCIAL PROOF - 7 REVIEWS COM FOTOS REAIS */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.4 }}
                                className="mb-12"
                            >
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#C9A227] text-center mb-4 sm:mb-6 px-2">
                                    💬 O que os alunos estão dizendo
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto">
                                    {[
                                        {
                                            name: 'Fernanda Oliveira',
                                            age: '34 anos',
                                            city: 'São Paulo, SP',
                                            text: 'Eu estava devendo R$18 mil em 4 cartões. Fiz o protocolo por 7 dias. No 11º dia, consegui um emprego que paga R$8.500/mês. O gerente me ligou DO NADA. Isso é real, gente! 😭🙏',
                                            time: 'há 2h',
                                            photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
                                            verified: true
                                        },
                                        {
                                            name: 'Ricardo Mendes',
                                            age: '41 anos',
                                            city: 'Rio de Janeiro, RJ',
                                            text: 'Sou empresário e estava em crise há 2 anos. No 5º dia do mapa, fechei um contrato de R$ 85 mil que estava travado há meses. Coincidência? Não acredito mais nisso! 💰',
                                            time: 'há 5h',
                                            photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
                                            verified: true
                                        },
                                        {
                                            name: 'Juliana Santos',
                                            age: '28 anos',
                                            city: 'Curitiba, PR',
                                            text: 'Meu marido estava desempregado há 8 meses. Fizemos o ritual juntos e em 11 dias ele recebeu 3 propostas de emprego! Escolhemos a melhor. Gratidão infinita! ✨',
                                            time: 'há 1 dia',
                                            photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
                                            verified: true
                                        },
                                        {
                                            name: 'Patrícia Lima',
                                            age: '39 anos',
                                            city: 'Salvador, BA',
                                            text: 'Os áudios noturnos são INCRÍVEIS! Acordo com outra energia. Clientes começaram a aparecer do nada. Meu Instagram explodiu de vendas. Estou realizando sonhos que eu achava impossíveis! 💫',
                                            time: 'há 3h',
                                            photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200&auto=format&fit=crop',
                                            verified: true,
                                            hiddenOnMobile: false
                                        },
                                        {
                                            name: 'Marcos Vinícius',
                                            age: '37 anos',
                                            city: 'Belo Horizonte, MG',
                                            text: 'Trabalho com vendas e estava em crise. Depois do Mapa, meu faturamento subiu 340% em 2 meses. Nunca tinha visto dinheiro entrar assim na minha vida. Recomendo demais! 🚀',
                                            time: 'há 1 dia',
                                            photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
                                            verified: true,
                                            hiddenOnMobile: true
                                        },
                                        {
                                            name: 'Camila Rodrigues',
                                            age: '31 anos',
                                            city: 'Porto Alegre, RS',
                                            text: 'Eu era cética, mas resolvi tentar. No 3º dia, recebi uma herança de uma tia distante que eu nem sabia que existia. R$ 47 mil! Fiquei em choque. Isso funciona MESMO! 😱💎',
                                            time: 'há 8h',
                                            photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
                                            verified: true,
                                            hiddenOnMobile: true
                                        },
                                        {
                                            name: 'André Luiz',
                                            age: '45 anos',
                                            city: 'Brasília, DF',
                                            text: 'Eu tinha bloqueios ancestrais pesados (meu pai faliu 2 vezes). O Mapa me libertou disso. Hoje tenho minha empresa sólida e zero dívidas. Mudou minha vida e da minha família! 🙌',
                                            time: 'há 2 dias',
                                            photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
                                            verified: true,
                                            hiddenOnMobile: true
                                        },
                                        {
                                            name: 'Seu Nome Aqui',
                                            age: 'Sua Cidade',
                                            city: '',
                                            text: 'Este pode ser o SEU resultado em 7 dias.\n\n"Em uma semana, recebi [SEU VALOR AQUI] de forma inesperada..."',
                                            time: '',
                                            photo: '',
                                            verified: false,
                                            isPlaceholder: true,
                                            hiddenOnMobile: true
                                        }
                                    ].map((testimonial, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 1.6 + idx * 0.1 }}
                                            className={`bg-gradient-to-br ${
                                                testimonial.isPlaceholder 
                                                    ? 'from-[#3a2f0e] to-[#1a1a0a] border-2 border-dashed border-[#C9A227]/60 opacity-90' 
                                                    : 'from-[#1a1a1a] to-[#0d0d0d] border border-[#C9A227]/30'
                                            } rounded-2xl p-4 sm:p-5 hover:border-[#C9A227]/60 transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] ${
                                                testimonial.hiddenOnMobile ? 'hidden md:block' : ''
                                            }`}
                                        >
                                            <div className="flex items-start gap-3 sm:gap-4">
                                                {/* Foto Real do Cliente ou Placeholder */}
                                                <div className="flex-shrink-0">
                                                    {testimonial.isPlaceholder ? (
                                                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-dashed border-[#C9A227] bg-[#C9A227]/10 flex items-center justify-center text-2xl">
                                                            ?
                                                        </div>
                                                    ) : (
                                                        <img 
                                                            src={testimonial.photo}
                                                            alt={testimonial.name}
                                                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-[#C9A227]"
                                                            onError={(e) => {
                                                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=D4AF37&color=000&size=200`;
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="mb-2">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <p className={`font-bold text-sm sm:text-base truncate ${
                                                                testimonial.isPlaceholder ? 'text-[#C9A227]' : 'text-white'
                                                            }`}>
                                                                {testimonial.name}
                                                            </p>
                                                            {/* NOVO: Badge Verificado */}
                                                            {testimonial.verified && (
                                                                <span className="inline-flex items-center gap-1 bg-green-600 text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full flex-shrink-0">
                                                                    ✓ VERIFICADO
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-slate-400 text-[10px] sm:text-xs">
                                                            {testimonial.age}{testimonial.city && ` • ${testimonial.city}`}
                                                        </p>
                                                    </div>
                                                    <p className={`text-xs sm:text-sm leading-relaxed mb-3 whitespace-pre-line ${
                                                        testimonial.isPlaceholder ? 'text-[#C9A227]/80 italic' : 'text-slate-200'
                                                    }`}>
                                                        {testimonial.text}
                                                    </p>
                                                    {testimonial.isPlaceholder ? (
                                                        <button
                                                            onClick={handleCheckout}
                                                            className="w-full bg-gradient-to-r from-[#C9A227] to-[#FFA500] hover:brightness-110 text-black font-bold text-xs sm:text-sm py-2 px-4 rounded-lg transition-all transform hover:scale-105 active:scale-95"
                                                        >
                                                            QUERO MEU RESULTADO →
                                                        </button>
                                                    ) : (
                                                        <div className="flex items-center justify-between gap-2">
                                                            <div className="flex gap-1">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <span key={i} className="text-[#C9A227] text-xs sm:text-sm">⭐</span>
                                                                ))}
                                                            </div>
                                                            <p className="text-slate-500 text-[10px] sm:text-xs whitespace-nowrap">{testimonial.time}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* CTA #3 - AFTER TESTIMONIALS */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.6 }}
                                className="mb-12 text-center"
                            >
                                <button
                                    onClick={handleCheckout}
                                    className="w-full md:w-[60%] mx-auto block bg-gradient-to-r from-[#C9A227] via-[#C9A227] to-[#C9A227] hover:brightness-110 text-black font-black text-lg sm:text-xl py-5 px-6 sm:px-8 rounded-2xl shadow-[0_8px_30px_rgba(212,175,55,0.5)] transition-all transform hover:scale-105 active:scale-95 border-2 border-[#C9A227] uppercase tracking-wide mb-3"
                                >
                                    QUERO MEU RESULTADO TAMBÉM →
                                </button>
                                <p className="text-slate-400 text-sm">
                                    Junte-se a mais de 4.300 pessoas que já desbloquearam
                                </p>
                            </motion.div>

                            {/* BLOCK 07: GUARANTEE */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.8 }}
                                className="mb-12 bg-gradient-to-br from-emerald-950/40 to-green-900/20 border-2 border-emerald-500/40 rounded-2xl p-6 sm:p-8 text-center"
                            >
                                <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 border-4 border-emerald-300 shadow-[0_0_30px_rgba(16,185,129,0.6)] mx-auto mb-4 sm:mb-6">
                                    <div className="text-center">
                                        <p className="text-white text-[10px] sm:text-xs font-black">GARANTIA</p>
                                        <p className="text-white text-xl sm:text-2xl font-black leading-none">7</p>
                                        <p className="text-white text-[10px] sm:text-xs font-black">DIAS</p>
                                    </div>
                                </div>

                                <h3 className="text-xl sm:text-2xl font-bold text-emerald-300 mb-4">
                                    GARANTIA BLINDADA DE RESULTADO
                                </h3>
                                <div className="text-slate-200 text-sm sm:text-base leading-relaxed space-y-3 max-w-2xl mx-auto px-2">
                                    <p className="font-semibold text-white">
                                        Você não tem risco nenhum.
                                    </p>
                                    <p>
                                        Entre, faça o Mapa, use os áudios por 7 dias.
                                    </p>
                                    <p>
                                        Se você <strong className="text-white">NÃO</strong> sentir pelo menos 3 destes sinais em 7 dias:
                                    </p>
                                    <ul className="list-none space-y-2 mt-3 text-left max-w-xl mx-auto">
                                        <li>• Mais leveza ao pensar em dinheiro (dias 1-3)</li>
                                        <li>• Alguma quantia inesperada chegando (R$50-500)</li>
                                        <li>• Menos aperto ao checar o saldo</li>
                                        <li>• Menos brigas sobre dinheiro em casa</li>
                                    </ul>
                                    <p className="text-white font-bold">
                                        ...eu devolvo 100% do seu dinheiro.
                                    </p>
                                    <p>
                                        Sem perguntas. Sem burocracia. Basta um e-mail.
                                    </p>
                                    <p className="text-emerald-300 font-bold text-lg sm:text-xl mt-4">
                                        Ou seja: o risco é TODO MEU.
                                    </p>
                                </div>

                                {/* "Why I Offer This" Box */}
                                <div className="mt-8 bg-[#C9A227]/10 backdrop-blur-md border-2 border-[#C9A227]/30 rounded-xl p-4 sm:p-6 max-w-2xl mx-auto">
                                    <h4 className="text-[#C9A227] font-bold text-base sm:text-lg mb-3 flex items-center justify-center gap-2">
                                        <span>💡</span> POR QUE OFEREÇO ISSO?
                                    </h4>
                                    <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-3">
                                        Porque EU SEI que funciona. Mais de 4.300 pessoas já fizeram e 92% relatam mudança em até 14 dias.
                                    </p>
                                    <p className="text-emerald-300 font-semibold">
                                        Se não funcionar com você (raro), eu não mereço seu dinheiro.
                                    </p>
                                    <p className="text-white font-bold mt-2">
                                        Ou seja: o risco é TODO MEU.
                                    </p>
                                </div>

                                {/* CTA Button after Guarantee */}
                                <button
                                    onClick={handleCheckout}
                                    className="mt-6 w-full md:w-auto mx-auto block bg-gradient-to-r from-[#C9A227] via-[#C9A227] to-[#C9A227] hover:brightness-110 text-black font-black text-base sm:text-lg py-4 sm:py-5 px-8 sm:px-12 rounded-2xl shadow-[0_8px_30px_rgba(212,175,55,0.5)] transition-all transform hover:scale-105 active:scale-95 border-2 border-[#C9A227] uppercase tracking-wide"
                                >
                                    QUERO COMEÇAR SEM RISCO AGORA
                                </button>
                                <p className="text-slate-400 text-xs sm:text-sm mt-3">
                                    7 dias para testar | Devolução total se não funcionar
                                </p>
                            </motion.div>

                            {/* BLOCK 08: BIO ANAHÍ - Moved AFTER Guarantee */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2.0 }}
                                className="mb-12 bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-[#C9A227]/30 rounded-2xl p-6 sm:p-8"
                            >
                                <h3 className="text-xl sm:text-2xl md:text-2xl font-bold text-[#C9A227] text-center mb-6">
                                    QUEM GUIARÁ SUA JORNADA?
                                </h3>
                                
                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    {/* Expert Photo */}
                                    <div className="relative flex-shrink-0">
                                        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#C9A227]">
                                            <img 
                                                src="/expert.jpg" 
                                                alt="Anahí Solara"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=388&auto=format&fit=crop";
                                                }}
                                            />
                                        </div>
                                        <div className="absolute -inset-2 bg-[#C9A227]/20 blur-xl -z-10"></div>
                                    </div>

                                    {/* Expert Bio - MELHORADO: Com resultados pessoais dela */}
                                    <div className="flex-1 text-center md:text-left">
                                        <p className="text-[#C9A227] font-bold text-lg sm:text-xl mb-3">
                                            Anahí Solara
                                        </p>
                                        <p className="text-slate-200 leading-relaxed text-sm sm:text-base mb-4">
                                            <span className="font-bold">"Por 12 anos, eu fui exatamente como você..."</span>
                                        </p>
                                        <p className="text-slate-200 leading-relaxed text-sm sm:text-base mb-4">
                                            Trabalhava, trabalhava... mas o dinheiro sumia.
                                        </p>
                                        <p className="text-slate-200 leading-relaxed text-sm sm:text-base mb-4">
                                            Até que em 2012, descobri a verdade: <span className="font-bold text-[#C9A227]">minha Herança Vibracional de Escassez</span> (linhagem paterna).
                                        </p>
                                        
                                        {/* NOVO: Resultados pessoais dela */}
                                        <div className="bg-[#C9A227]/10 border-l-4 border-[#C9A227] rounded-r-lg p-4 my-6">
                                            <p className="text-white font-bold text-sm sm:text-base mb-3">
                                                Em 90 dias após fazer o protocolo, minha vida virou:
                                            </p>
                                            <div className="space-y-2 text-slate-200 text-xs sm:text-sm">
                                                <p className="flex items-start gap-2">
                                                    <span className="text-[#C9A227] flex-shrink-0">→</span>
                                                    <span>Uma dívida de R$43 mil foi perdoada (inexplicavelmente!)</span>
                                                </p>
                                                <p className="flex items-start gap-2">
                                                    <span className="text-[#C9A227] flex-shrink-0">→</span>
                                                    <span>Recebi contrato de R$120 mil que estava travado há 2 anos</span>
                                                </p>
                                                <p className="flex items-start gap-2">
                                                    <span className="text-[#C9A227] flex-shrink-0">→</span>
                                                    <span>Comprei minha primeira casa (à vista!) com dinheiro que "apareceu" de formas inesperadas</span>
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <p className="text-slate-200 leading-relaxed text-sm sm:text-base mb-4">
                                            Não sou guru financeira. Sou Terapeuta Holística que <span className="font-bold text-white">VIVEU essa transformação na pele</span>...
                                        </p>
                                        <p className="text-slate-200 leading-relaxed text-sm sm:text-base">
                                            ...e agora ensino o mesmo protocolo que salvou minha família da falência e já ajudou <span className="text-[#C9A227] font-bold">4.000+ alunos</span> a destravar prosperidade.
                                        </p>
                                        <p className="text-[#C9A227] font-bold text-sm sm:text-base mt-4 italic">
                                            Este mapa não é teoria. É o método exato que funcionou <span className="underline">COMIGO PRIMEIRO</span>.
                                        </p>
                                    </div>
                                </div>

                                {/* Credentials Badges */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
                                    <div className="flex items-center gap-2 text-sm bg-[#C9A227]/10 rounded-lg p-3 justify-center">
                                        <span className="text-xl">💼</span>
                                        <span className="text-slate-300">Terapeuta Holística há 10+ anos</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm bg-[#C9A227]/10 rounded-lg p-3 justify-center">
                                        <span className="text-xl">📚</span>
                                        <span className="text-slate-300">Especialista em Xamanismo Financeiro</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm bg-[#C9A227]/10 rounded-lg p-3 justify-center">
                                        <span className="text-xl">👥</span>
                                        <span className="text-slate-300">Mais de 4.000 alunos transformados</span>
                                    </div>
                                </div>

                                {/* CTA after Bio - MELHORADO: novo copy */}
                                <button
                                    onClick={handleCheckout}
                                    className="mt-6 w-full md:w-auto mx-auto block bg-gradient-to-r from-[#C9A227] via-[#C9A227] to-[#C9A227] hover:brightness-110 text-black font-black text-base sm:text-lg py-4 sm:py-5 px-8 sm:px-12 rounded-2xl shadow-[0_8px_30px_rgba(212,175,55,0.5)] transition-all transform hover:scale-105 active:scale-95 border-2 border-[#C9A227] uppercase tracking-wide"
                                >
                                    🚀 QUERO ENTRAR PARA OS 4.300+ QUE JÁ DESBLOQUEARAM →
                                </button>
                                <p className="text-slate-400 text-xs sm:text-sm mt-3 text-center">
                                    Acesso em 2 minutos • Garantia 7 dias • 100% seguro
                                </p>
                            </motion.div>

                            {/* FAQ Section */}
                            <FAQ />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* MELHORIA #10: BOTÃO FLUTUANTE MOBILE - CRÍTICO */}
            <AnimatePresence>
                {showFloatingButton && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-area-bottom"
                        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
                    >
                        <div className="bg-gradient-to-r from-[#FFB700] via-[#FFA500] to-[#FFB700] shadow-[0_-4px_20px_rgba(0,0,0,0.3)] px-3 py-2.5">
                            <button
                                onClick={scrollToCheckout}
                                className="w-full bg-black/20 hover:bg-black/30 backdrop-blur-sm text-white font-black text-sm sm:text-base py-3.5 px-4 rounded-xl transition-all transform active:scale-95 flex items-center justify-center gap-2 min-h-[48px]"
                            >
                                🔥 DESBLOQUEAR AGORA - R$27,90 →
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default OfferNew;

import { motion } from 'framer-motion';
import { useEffect, useState, useCallback, useRef } from 'react';
import { Shield, Lock, Sparkles, AlertTriangle, Check, Star, Clock, CreditCard, Smartphone, FileText } from 'lucide-react';
import { tracking } from '../utils/tracking';

interface VSLPageProps {
    userName: string;
    onCheckout: () => void;
}

/**
 * VSL PAGE - Video Sales Letter
 * Shows after quiz result, before checkout
 * Video duration: ~2 minutes (1min59s)
 * CTA appears after 1min50s (110 seconds) or fallback at 30s on page
 */

// VSL Video Configuration - New video player
const VSL_VIDEO_PLAYER_ID = '6953144d84040898eb13007a';
const VSL_VIDEO_SCRIPT_URL = `https://scripts.converteai.net/c263b2f0-9566-42be-97d8-7f5920037741/players/${VSL_VIDEO_PLAYER_ID}/v4/player.js`;

// Time configurations
const CTA_REVEAL_TIME_SECONDS = 110; // 1min50s - show CTA
const FALLBACK_TIME_SECONDS = 30; // Fallback if user skips video
const VIDEO_DURATION_SECONDS = 119; // 1min59s total

// Checkout URL - Single option R$27,90 (O Desbloqueio Completo)
const CHECKOUT_URL = 'https://pay.lowify.com.br/go.php?offer=zsa1x42';

const VSLPage = ({ userName, onCheckout }: VSLPageProps) => {
    const [showCTA, setShowCTA] = useState(false);
    const [videoStarted, setVideoStarted] = useState(false);
    const [timeOnPage, setTimeOnPage] = useState(0);
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [trackedMilestones, setTrackedMilestones] = useState<Set<number>>(new Set());
    const pageLoadTime = useRef(Date.now());

    // Get first name for personalization
    const firstName = userName ? userName.split(' ')[0] : '';

    // Track VSL page view on mount
    useEffect(() => {
        // Track page view
        tracking.meta.trackEvent('vsl_page_view', {
            content_name: 'VSL Protocol Page',
            user_name: userName
        });
    }, [userName]);

    // Load video player script with optimized preloading
    useEffect(() => {
        // Optimization script for performance timing
        const optimizationScript = document.createElement('script');
        optimizationScript.innerHTML = '!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);';
        document.head.appendChild(optimizationScript);

        // Preload links for faster video loading
        const preloadLinks = [
            { href: VSL_VIDEO_SCRIPT_URL, as: 'script' },
            { href: 'https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js', as: 'script' },
            { href: 'https://cdn.converteai.net/c263b2f0-9566-42be-97d8-7f5920037741/6953140fba8707e946bf11ea/main.m3u8', as: 'fetch' },
        ];

        // DNS prefetch links
        const dnsPrefetchDomains = [
            'https://cdn.converteai.net',
            'https://scripts.converteai.net',
            'https://images.converteai.net',
            'https://api.vturb.com.br',
        ];

        const preloadElements: HTMLLinkElement[] = [];
        
        // Add preload links
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

        // Add DNS prefetch links
        dnsPrefetchDomains.forEach(domain => {
            const dnsPrefetch = document.createElement('link');
            dnsPrefetch.rel = 'dns-prefetch';
            dnsPrefetch.href = domain;
            document.head.appendChild(dnsPrefetch);
            preloadElements.push(dnsPrefetch);
        });

        // Player script
        const playerScript = document.createElement('script');
        playerScript.src = VSL_VIDEO_SCRIPT_URL;
        playerScript.async = true;
        playerScript.onload = () => setScriptLoaded(true);
        document.head.appendChild(playerScript);

        return () => {
            optimizationScript.remove();
            playerScript.remove();
            preloadElements.forEach(el => el.remove());
        };
    }, []);

    // Timer for page time and CTA reveal
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeOnPage(prev => {
                const newTime = prev + 1;
                
                // Track video progress milestones (25%, 50%, 75%, 100%)
                const milestones = [
                    { percent: 25, time: Math.floor(VIDEO_DURATION_SECONDS * 0.25) },
                    { percent: 50, time: Math.floor(VIDEO_DURATION_SECONDS * 0.50) },
                    { percent: 75, time: Math.floor(VIDEO_DURATION_SECONDS * 0.75) },
                    { percent: 100, time: VIDEO_DURATION_SECONDS },
                ];
                
                milestones.forEach(milestone => {
                    if (newTime >= milestone.time && !trackedMilestones.has(milestone.percent)) {
                        tracking.meta.trackEvent(`vsl_${milestone.percent}_percent`, {
                            content_name: 'VSL Protocol',
                            time_watched: newTime
                        });
                        setTrackedMilestones(prev => new Set([...prev, milestone.percent]));
                    }
                });
                
                // Show CTA after video time OR fallback time
                if (newTime >= CTA_REVEAL_TIME_SECONDS && !showCTA) {
                    setShowCTA(true);
                    tracking.meta.trackEvent('vsl_cta_revealed', {
                        content_name: 'VSL Protocol',
                        reveal_time: newTime
                    });
                }
                
                return newTime;
            });
        }, 1000);

        // Auto-start video tracking
        const startTimer = setTimeout(() => {
            setVideoStarted(true);
        }, 2000);

        return () => {
            clearInterval(timer);
            clearTimeout(startTimer);
        };
    }, [showCTA, trackedMilestones]);

    // Fallback: Show CTA after 30 seconds on page (if user skips video)
    useEffect(() => {
        const fallbackTimer = setTimeout(() => {
            if (!showCTA) {
                setShowCTA(true);
                tracking.meta.trackEvent('vsl_cta_fallback', {
                    content_name: 'VSL Protocol',
                    fallback_time: FALLBACK_TIME_SECONDS
                });
            }
        }, FALLBACK_TIME_SECONDS * 1000);

        return () => clearTimeout(fallbackTimer);
    }, [showCTA]);

    const handleCheckoutClick = useCallback(() => {
        // Track conversion event
        tracking.meta.initiateCheckout({
            content_name: 'Mapa Xamânico - Desbloqueio Completo',
            value: 27.90,
            currency: 'BRL'
        });
        
        // Redirect to checkout
        window.location.href = CHECKOUT_URL;
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden text-white bg-gradient-to-b from-[#0a0118] via-[#1a0b2e] to-[#0a0118]">
            
            {/* Mystical Background Effects */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0118] via-[#1a0b2e] to-[#0a0118]"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[150px] animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[150px]"></div>
            </div>

            <div className="max-w-lg mx-auto px-4 py-6 sm:py-8">
                
                {/* Header Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-6"
                >
                    {/* Personalized Badge */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-900/50 to-green-900/50 border border-emerald-500/40 px-4 py-2 rounded-full mb-4"
                    >
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-300 text-sm font-bold">SEU PROTOCOLO PERSONALIZADO FOI GERADO</span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-3 leading-tight px-2"
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        {firstName ? `${firstName}, ` : ''}Bloqueio identificado:{' '}
                        <span className="text-red-400">Lealdade Invisível</span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-slate-300 text-sm sm:text-base max-w-md mx-auto"
                    >
                        Assista ao vídeo abaixo para entender{' '}
                        <span className="text-[#FFD700] font-semibold">como romper esse padrão</span>{' '}
                        em 7 dias.
                    </motion.p>
                </motion.section>

                {/* Video Section */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-6"
                >
                    <div className="relative max-w-md mx-auto">
                        {/* Outer Glow Effect */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-[#D4AF37]/30 via-purple-500/20 to-[#D4AF37]/30 blur-2xl rounded-3xl animate-pulse"></div>
                        
                        {/* Video Container with Premium Frame */}
                        <div className="relative rounded-2xl overflow-hidden border-4 border-[#D4AF37] shadow-[0_0_80px_rgba(212,175,55,0.4)]">
                            {/* Top Bar */}
                            <div className="bg-gradient-to-r from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e] px-4 py-2 flex items-center justify-between border-b border-[#D4AF37]/30">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                                    <span className="text-[#FFD700] text-xs font-bold uppercase tracking-wider">AO VIVO • Exclusivo</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-400 text-xs">
                                    <Lock className="w-3 h-3" />
                                    <span>Diagnóstico confidencial</span>
                                </div>
                            </div>
                            
                            {/* Video Player */}
                            <div className="bg-black flex items-center justify-center relative">
                                <div className="w-full" style={{ aspectRatio: '9/16', maxWidth: '400px' }}>
                                    <vturb-smartplayer 
                                        id={`vid-${VSL_VIDEO_PLAYER_ID}`}
                                        style={{ display: 'block', width: '100%', maxWidth: '400px', margin: '0 auto' }}
                                    ></vturb-smartplayer>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Watch reminder */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-center mt-4"
                    >
                        <div className="inline-flex items-center gap-2 bg-amber-900/30 border border-amber-500/30 px-4 py-2 rounded-full">
                            <Clock className="w-4 h-4 text-amber-400" />
                            <span className="text-amber-300 text-xs font-medium">
                                ⏱ 2 minutos • Assista até o final
                            </span>
                        </div>
                    </motion.div>
                </motion.section>

                {/* CTA Section - Appears after video time or fallback */}
                {showCTA && (
                    <motion.section
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        {/* Urgency Banner */}
                        <div className="bg-red-900/40 border border-red-500/50 rounded-xl p-4 mb-4 text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <AlertTriangle className="w-5 h-5 text-red-400" />
                                <span className="text-red-300 font-bold text-sm">⚠️ PROTOCOLO VÁLIDO POR 15 MINUTOS</span>
                            </div>
                            <p className="text-slate-300 text-sm">
                                Seu protocolo está disponível agora por apenas:
                            </p>
                        </div>

                        {/* Price Display */}
                        <div className="bg-gradient-to-br from-[#1a0b2e]/80 to-[#2d1b4e]/60 border-2 border-[#D4AF37]/60 rounded-2xl p-6 mb-4">
                            <div className="text-center mb-4">
                                <p className="text-slate-400 text-sm line-through mb-1">De R$ 97,00</p>
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-4xl sm:text-5xl font-black text-[#FFD700]">R$ 27</span>
                                    <span className="text-2xl sm:text-3xl font-bold text-[#FFD700]">,90</span>
                                </div>
                                <p className="text-slate-400 text-sm mt-1">ou 3x R$ 9,30 no cartão</p>
                                <p className="text-emerald-400 text-sm font-semibold mt-2">
                                    ✓ Acesso Imediato • ✓ Garantia de 7 dias
                                </p>
                            </div>

                            {/* What's included */}
                            <div className="space-y-2 mb-4">
                                {[
                                    'Mapa Xamânico Personalizado em PDF',
                                    'Protocolo de Desbloqueio de 7 dias',
                                    'Áudios Rituais Guiados (3 áudios)',
                                    'Suporte via WhatsApp'
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-slate-200 text-sm">
                                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
                                <button
                                    onClick={handleCheckoutClick}
                                    className="relative w-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] hover:from-[#FFD700] hover:to-[#D4AF37] text-black font-black text-base sm:text-lg py-4 px-6 rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <Sparkles className="w-5 h-5" />
                                    ATIVAR MEU PROTOCOLO AGORA
                                </button>
                            </div>

                            {/* Payment Methods */}
                            <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-slate-400">
                                <div className="flex items-center gap-1">
                                    <Smartphone className="w-4 h-4 text-emerald-400" />
                                    <span>Pix</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <CreditCard className="w-4 h-4 text-emerald-400" />
                                    <span>Cartão</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <FileText className="w-4 h-4 text-emerald-400" />
                                    <span>Boleto</span>
                                </div>
                            </div>

                            {/* Security badges */}
                            <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-xs text-slate-400">
                                <div className="flex items-center gap-1">
                                    <Lock className="w-3 h-3 text-emerald-400" />
                                    <span>Pagamento 100% Seguro</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Shield className="w-3 h-3 text-emerald-400" />
                                    <span>Garantia de 7 dias</span>
                                </div>
                            </div>
                        </div>

                        {/* Urgency - Access time */}
                        <div className="text-center mb-4">
                            <div className="inline-flex items-center gap-2 bg-amber-900/30 border border-amber-500/30 px-4 py-2 rounded-full">
                                <Clock className="w-4 h-4 text-amber-400" />
                                <span className="text-amber-300 text-xs font-medium">
                                    ⏰ Acesso liberado em até 3 horas
                                </span>
                            </div>
                        </div>

                        {/* Trust indicator */}
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                                <Star className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
                                <span className="text-slate-300 text-xs">
                                    +4.300 pessoas já desbloquearam sua prosperidade
                                </span>
                            </div>
                        </div>
                    </motion.section>
                )}

                {/* Pre-CTA loading state */}
                {!showCTA && videoStarted && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-8"
                    >
                        <div className="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-500/30 px-4 py-2 rounded-full">
                            <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse"></div>
                            <span className="text-purple-300 text-sm">
                                Preparando seu protocolo...
                            </span>
                        </div>
                    </motion.div>
                )}

            </div>
        </div>
    );
};

export default VSLPage;

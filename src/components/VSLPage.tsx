import { motion } from 'framer-motion';
import { useEffect, useState, useCallback, useRef } from 'react';
import { Shield, Lock, Sparkles, AlertTriangle, Check, Star, Clock, CreditCard, Smartphone, FileText, Flame, Users } from 'lucide-react';
import { tracking } from '../utils/tracking';

interface VSLPageProps {
    userName: string;
    onCheckout: () => void;
}

/**
 * VSL PAGE - Video Sales Letter
 * Shows after quiz result, before checkout
 * Video duration: ~2 minutes (1min54s)
 * 
 * CRITICAL FIX: CTA timer starts on VIDEO PLAY, not page load
 * This ensures maximum conversion by showing CTA at peak persuasion moment
 */

// VSL Video Configuration - New video player
const VSL_VIDEO_PLAYER_ID = '6953144d84040898eb13007a';
const VSL_VIDEO_SCRIPT_URL = `https://scripts.converteai.net/c263b2f0-9566-42be-97d8-7f5920037741/players/${VSL_VIDEO_PLAYER_ID}/v4/player.js`;

// Time configurations - CRITICAL: Timer based on VIDEO playback, not page load
const CTA_REVEAL_TIME_SECONDS = 114; // 1min54s - show CTA after video sells
const PAUSE_FALLBACK_SECONDS = 30; // Show CTA if paused for 30s
const VIDEO_DURATION_SECONDS = 119; // 1min59s total

// Protocol expiration timer (15 minutes)
const PROTOCOL_EXPIRATION_MINUTES = 15;
const PROTOCOL_EXPIRATION_MS = PROTOCOL_EXPIRATION_MINUTES * 60 * 1000;

// Checkout URL - Single option R$27,90 (O Desbloqueio Completo)
const CHECKOUT_URL = 'https://pay.lowify.com.br/checkout.php?product_id=manflx';

// Value Stack items with individual prices for anchoring
const VALUE_STACK_ITEMS = [
    {
        title: 'Seu Mapa Xamânico Personalizado (PDF + App)',
        description: 'Análise completa da sua frequência ancestral • Identifica bloqueios herdados • Acesso vitalício',
        value: 197
    },
    {
        title: 'Protocolo de Desbloqueio de 7 Dias',
        description: 'Instruções diárias personalizadas • Remove a Lealdade Invisível • Passo a passo guiado',
        value: 147
    },
    {
        title: '3 Áudios Rituais Guiados (12min cada)',
        description: 'Frequências sonoras de desativação • Escute antes de dormir • Download direto',
        value: 97
    },
    {
        title: 'Suporte Exclusivo via WhatsApp (7 dias)',
        description: 'Tire dúvidas sobre o protocolo • Acompanhamento completo • Resposta em até 3h',
        value: 56
    }
];

const TOTAL_VALUE = VALUE_STACK_ITEMS.reduce((sum, item) => sum + item.value, 0); // R$497
const OFFER_PRICE = 27.90;
const DISCOUNT_PERCENT = Math.round((1 - OFFER_PRICE / TOTAL_VALUE) * 100); // 94%

const VSLPage = ({ userName, onCheckout }: VSLPageProps) => {
    const [showCTA, setShowCTA] = useState(false);
    const [videoPlaying, setVideoPlaying] = useState(false);
    const [videoPlayTime, setVideoPlayTime] = useState(0); // Time since video PLAY
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [trackedMilestones, setTrackedMilestones] = useState<Set<number>>(new Set());
    const [buttonShown, setButtonShown] = useState(false);
    
    // Countdown timer state (15 minutes)
    const [countdownMs, setCountdownMs] = useState<number | null>(null);
    
    // Dynamic social proof state
    const [viewingCount, setViewingCount] = useState(0);
    const [activatedCount, setActivatedCount] = useState(0);
    
    // Refs for video timing
    const videoTimerRef = useRef<NodeJS.Timeout | null>(null);
    const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);
    const ctaShownRef = useRef(false);

    // Get first name for personalization
    const firstName = userName ? userName.split(' ')[0] : '';

    // ============================================================================
    // CRITICAL FIX #1: Show CTA based on VIDEO play time, not page load
    // ============================================================================
    const showCTAButton = useCallback(() => {
        if (!ctaShownRef.current) {
            ctaShownRef.current = true;
            setButtonShown(true);
            setShowCTA(true);
            
            // Track button appeared event
            tracking.meta.trackEvent('button_appeared', {
                content_name: 'VSL CTA Button',
                video_play_time: videoPlayTime
            });
        }
    }, [videoPlayTime]);

    // Handle video PLAY event - CRITICAL: Timer starts HERE
    const handleVideoPlay = useCallback(() => {
        setVideoPlaying(true);
        
        // Track video play event
        tracking.meta.trackEvent('vsl_play', {
            content_name: 'VSL Protocol Video'
        });
        
        // Clear any pause fallback timer
        if (pauseTimerRef.current) {
            clearTimeout(pauseTimerRef.current);
            pauseTimerRef.current = null;
        }
        
        // Start video play timer if not already running
        if (!videoTimerRef.current && !ctaShownRef.current) {
            videoTimerRef.current = setInterval(() => {
                setVideoPlayTime(prev => {
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
                    
                    // CRITICAL: Show CTA after 1min54s (114s) of VIDEO playback
                    if (newTime >= CTA_REVEAL_TIME_SECONDS && !ctaShownRef.current) {
                        showCTAButton();
                    }
                    
                    return newTime;
                });
            }, 1000);
        }
    }, [showCTAButton, trackedMilestones]);

    // Handle video PAUSE event
    const handleVideoPause = useCallback(() => {
        setVideoPlaying(false);
        
        // Track video pause event
        tracking.meta.trackEvent('vsl_pause', {
            content_name: 'VSL Protocol Video',
            pause_time: videoPlayTime
        });
        
        // Stop video timer
        if (videoTimerRef.current) {
            clearInterval(videoTimerRef.current);
            videoTimerRef.current = null;
        }
        
        // Start pause fallback timer - show CTA after 30s paused
        if (!ctaShownRef.current) {
            pauseTimerRef.current = setTimeout(() => {
                showCTAButton();
                tracking.meta.trackEvent('vsl_cta_pause_fallback', {
                    content_name: 'VSL Protocol',
                    pause_fallback: true
                });
            }, PAUSE_FALLBACK_SECONDS * 1000);
        }
    }, [videoPlayTime, showCTAButton]);

    // Handle video timeupdate - for seeked/skipped scenarios
    const handleVideoTimeUpdate = useCallback((currentTime: number) => {
        // If user seeks past the CTA reveal time, show CTA immediately
        if (currentTime >= CTA_REVEAL_TIME_SECONDS && !ctaShownRef.current) {
            showCTAButton();
            tracking.meta.trackEvent('vsl_cta_seeked', {
                content_name: 'VSL Protocol',
                seek_time: currentTime
            });
        }
    }, [showCTAButton]);

    // Track VSL page view on mount
    useEffect(() => {
        // Track page view
        tracking.meta.trackEvent('vsl_page_view', {
            content_name: 'VSL Protocol Page',
            user_name: userName
        });
    }, [userName]);

    // Initialize countdown timer with localStorage persistence
    useEffect(() => {
        const storageKey = 'protocol_expiration';
        let expirationTime = localStorage.getItem(storageKey);
        
        if (!expirationTime) {
            expirationTime = String(Date.now() + PROTOCOL_EXPIRATION_MS);
            localStorage.setItem(storageKey, expirationTime);
        }
        
        const expiration = parseInt(expirationTime, 10);
        
        const updateCountdown = () => {
            const remaining = expiration - Date.now();
            if (remaining <= 0) {
                localStorage.removeItem(storageKey);
                // Redirect to start if expired
                window.location.href = '/?expired=true';
            } else {
                setCountdownMs(remaining);
            }
        };
        
        updateCountdown();
        const countdownInterval = setInterval(updateCountdown, 100);
        
        return () => clearInterval(countdownInterval);
    }, []);

    // Initialize dynamic social proof
    useEffect(() => {
        // Initialize with random values
        setViewingCount(Math.floor(Math.random() * 25) + 25); // 25-50
        setActivatedCount(Math.floor(Math.random() * 7) + 8); // 8-15
        
        // Update periodically (always increase)
        const socialProofInterval = setInterval(() => {
            if (Math.random() > 0.5) {
                setViewingCount(prev => prev + 1);
            }
            if (Math.random() > 0.7) {
                setActivatedCount(prev => prev + 1);
            }
        }, 20000); // Every 20s
        
        return () => clearInterval(socialProofInterval);
    }, []);

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

    // ============================================================================
    // CRITICAL: Listen for VTurb player events (play, pause, timeupdate)
    // ============================================================================
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            // Verify message is from VTurb/ConverteAI domains
            const allowedOrigins = [
                'https://scripts.converteai.net',
                'https://cdn.converteai.net',
                'https://player.converteai.net',
            ];
            
            const isAllowed = allowedOrigins.some(origin => 
                event.origin === origin || event.origin.startsWith(origin)
            );
            
            if (!isAllowed) return;
            
            let data: { type?: string; event?: string; currentTime?: number; duration?: number; percent?: number };
            
            try {
                if (typeof event.data === 'string') {
                    data = JSON.parse(event.data);
                } else {
                    data = event.data;
                }
            } catch {
                return;
            }
            
            const eventType = data.type || data.event;
            
            switch (eventType) {
                case 'play':
                case 'vturb_play':
                    handleVideoPlay();
                    break;
                    
                case 'pause':
                case 'vturb_pause':
                    handleVideoPause();
                    break;
                    
                case 'timeupdate':
                case 'vturb_timeupdate':
                    if (data.currentTime !== undefined) {
                        handleVideoTimeUpdate(data.currentTime);
                    }
                    break;
                    
                case 'ended':
                case 'complete':
                case 'vturb_ended':
                    // Video completed - show CTA if not already shown
                    if (!ctaShownRef.current) {
                        showCTAButton();
                    }
                    tracking.meta.trackEvent('vsl_completed', {
                        content_name: 'VSL Protocol Video'
                    });
                    break;
            }
        };
        
        window.addEventListener('message', handleMessage);
        
        return () => {
            window.removeEventListener('message', handleMessage);
            if (videoTimerRef.current) {
                clearInterval(videoTimerRef.current);
            }
            if (pauseTimerRef.current) {
                clearTimeout(pauseTimerRef.current);
            }
        };
    }, [handleVideoPlay, handleVideoPause, handleVideoTimeUpdate, showCTAButton]);

    const handleCheckoutClick = useCallback(() => {
        // Track conversion event
        tracking.meta.trackEvent('button_clicked', {
            content_name: 'VSL CTA Button'
        });
        
        tracking.meta.initiateCheckout({
            content_name: 'Mapa Xamânico - Desbloqueio Completo',
            value: OFFER_PRICE,
            currency: 'BRL'
        });
        
        // Redirect to checkout
        window.location.href = CHECKOUT_URL;
    }, []);

    // Format countdown timer
    const formatCountdown = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const milliseconds = Math.floor((ms % 1000) / 10);
        return { minutes, seconds, milliseconds };
    };

    const countdown = countdownMs ? formatCountdown(countdownMs) : { minutes: 15, seconds: 0, milliseconds: 0 };
    const isUrgent = countdownMs && countdownMs < 5 * 60 * 1000; // Less than 5 minutes
    const isWarning = countdownMs && countdownMs >= 5 * 60 * 1000 && countdownMs < 10 * 60 * 1000; // 5-10 minutes

    return (
        <div className="min-h-screen relative overflow-hidden text-white bg-gradient-to-b from-[#0a0118] via-[#1a0b2e] to-[#0a0118]">
            
            {/* Mystical Background Effects */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0118] via-[#1a0b2e] to-[#0a0118]"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[150px] animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[150px]"></div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
                
                {/* ============== IMPROVED HEADER SECTION (#5 Dynamic Headline) ============== */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-6"
                >
                    {/* Personalized Badge - Enhanced */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-900/50 to-green-900/50 border border-emerald-500/40 px-4 py-2 rounded-full mb-4"
                    >
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-300 text-sm font-bold">✨ {firstName ? firstName.toUpperCase() + ', ' : ''}SEU PROTOCOLO PERSONALIZADO FOI GERADO</span>
                    </motion.div>

                    {/* Main Headline - Improved with urgency */}
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

                    {/* Subheadline with warning - Enhanced */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="bg-red-900/30 border border-red-500/40 rounded-xl p-3 mb-3 max-w-md mx-auto"
                    >
                        <p className="text-red-300 text-sm font-semibold">
                            ⚠️ Bloqueio crítico identificado: <span className="text-white">Lealdade Invisível</span> e padrão de autosabotagem energética
                        </p>
                    </motion.div>

                    {/* Instruction to watch video */}
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

                {/* ============== VALUE STACK WITH MOCKUP (#2) ============== */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="mb-6"
                >
                    <div className="bg-gradient-to-br from-[#1a0b2e]/80 to-[#2d1b4e]/60 border border-[#D4AF37]/40 rounded-2xl p-4 sm:p-6">
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            {/* Mockup Image - Left side on desktop */}
                            <div className="w-full md:w-2/5 flex justify-center">
                                <div className="relative">
                                    <div className="absolute -inset-4 bg-gradient-to-br from-[#D4AF37]/30 via-purple-500/20 to-[#FFD700]/20 blur-2xl rounded-full animate-pulse"></div>
                                    <img 
                                        src="/mockup.webp" 
                                        alt="Mapa Xamânico - Mapa + App" 
                                        className="relative w-40 sm:w-48 md:w-56 rounded-2xl shadow-[0_0_40px_rgba(212,175,55,0.4)] border-2 border-[#D4AF37]/60"
                                    />
                                </div>
                            </div>

                            {/* Value Stack - Right side on desktop */}
                            <div className="w-full md:w-3/5">
                                <h3 className="text-[#FFD700] text-sm font-bold uppercase tracking-wider mb-4 text-center md:text-left">
                                    O QUE VOCÊ VAI RECEBER HOJE:
                                </h3>

                                <div className="space-y-3">
                                    {VALUE_STACK_ITEMS.map((item, idx) => (
                                        <div key={idx} className="flex gap-3">
                                            <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                                            <div className="flex-1">
                                                <p className="text-white text-sm font-semibold">{item.title}</p>
                                                <p className="text-slate-400 text-xs">→ {item.description}</p>
                                                <p className="text-[#FFD700]/70 text-xs font-medium">Valor: R$ {item.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Price Summary */}
                                <div className="mt-4 pt-4 border-t border-[#D4AF37]/30">
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400 text-sm">VALOR TOTAL:</span>
                                        <span className="text-slate-400 text-sm line-through">R$ {TOTAL_VALUE}</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-1">
                                        <span className="text-[#FFD700] font-bold">INVESTIMENTO HOJE:</span>
                                        <div className="text-right">
                                            <span className="text-[#FFD700] text-2xl font-black">R$ {OFFER_PRICE.toFixed(2).replace('.', ',')}</span>
                                            <p className="text-emerald-400 text-xs font-semibold">({DISCOUNT_PERCENT}% de desconto - Oferta única)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* ============== VIDEO SECTION ============== */}
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

                    {/* Micro-copy below video */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-center mt-4"
                    >
                        <div className="inline-flex items-center gap-2 bg-amber-900/30 border border-amber-500/30 px-4 py-2 rounded-full">
                            <Lock className="w-3 h-3 text-amber-400" />
                            <span className="text-amber-300 text-xs font-medium">
                                🔒 Diagnóstico confidencial • ⏱ Apenas 2 minutos
                            </span>
                        </div>
                    </motion.div>
                </motion.section>

                {/* ============== CTA SECTION - Appears after video time (#1, #4, #8) ============== */}
                {showCTA && (
                    <motion.section
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        {/* ============== COUNTDOWN TIMER (#8) ============== */}
                        <div className={`rounded-xl p-4 mb-4 text-center border ${
                            isUrgent 
                                ? 'bg-red-900/50 border-red-500/60' 
                                : isWarning 
                                    ? 'bg-orange-900/40 border-orange-500/50' 
                                    : 'bg-amber-900/30 border-amber-500/40'
                        }`}>
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <AlertTriangle className={`w-5 h-5 ${isUrgent ? 'text-red-400' : isWarning ? 'text-orange-400' : 'text-amber-400'}`} />
                                <span className={`font-bold text-sm ${isUrgent ? 'text-red-300' : isWarning ? 'text-orange-300' : 'text-amber-300'}`}>
                                    ⚠️ SEU PROTOCOLO EXPIRA EM:
                                </span>
                            </div>
                            
                            {/* Timer Display */}
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <div className={`px-3 py-2 rounded-lg ${isUrgent ? 'bg-red-800/60' : isWarning ? 'bg-orange-800/50' : 'bg-amber-800/40'}`}>
                                    <span className={`text-2xl sm:text-3xl font-mono font-black ${isUrgent ? 'text-red-300' : isWarning ? 'text-orange-300' : 'text-amber-300'}`}>
                                        {String(countdown.minutes).padStart(2, '0')}
                                    </span>
                                    <span className={`text-xs block ${isUrgent ? 'text-red-400' : isWarning ? 'text-orange-400' : 'text-amber-400'}`}>MIN</span>
                                </div>
                                <span className={`text-2xl font-bold ${isUrgent ? 'text-red-400' : isWarning ? 'text-orange-400' : 'text-amber-400'}`}>:</span>
                                <div className={`px-3 py-2 rounded-lg ${isUrgent ? 'bg-red-800/60' : isWarning ? 'bg-orange-800/50' : 'bg-amber-800/40'}`}>
                                    <span className={`text-2xl sm:text-3xl font-mono font-black ${isUrgent ? 'text-red-300' : isWarning ? 'text-orange-300' : 'text-amber-300'}`}>
                                        {String(countdown.seconds).padStart(2, '0')}
                                    </span>
                                    <span className={`text-xs block ${isUrgent ? 'text-red-400' : isWarning ? 'text-orange-400' : 'text-amber-400'}`}>SEG</span>
                                </div>
                                <span className={`text-2xl font-bold ${isUrgent ? 'text-red-400' : isWarning ? 'text-orange-400' : 'text-amber-400'}`}>:</span>
                                <div className={`px-3 py-2 rounded-lg ${isUrgent ? 'bg-red-800/60' : isWarning ? 'bg-orange-800/50' : 'bg-amber-800/40'}`}>
                                    <span className={`text-2xl sm:text-3xl font-mono font-black ${isUrgent ? 'text-red-300' : isWarning ? 'text-orange-300' : 'text-amber-300'}`}>
                                        {String(countdown.milliseconds).padStart(2, '0')}
                                    </span>
                                    <span className={`text-xs block ${isUrgent ? 'text-red-400' : isWarning ? 'text-orange-400' : 'text-amber-400'}`}>MS</span>
                                </div>
                            </div>
                            
                            <p className="text-slate-400 text-xs">
                                Após expirar, você precisará fazer um novo diagnóstico completo.
                            </p>
                        </div>

                        {/* Price Display */}
                        <div className="bg-gradient-to-br from-[#1a0b2e]/80 to-[#2d1b4e]/60 border-2 border-[#D4AF37]/60 rounded-2xl p-6 mb-4">
                            <div className="text-center mb-4">
                                <p className="text-slate-400 text-sm line-through mb-1">De R$ {TOTAL_VALUE},00</p>
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-4xl sm:text-5xl font-black text-[#FFD700]">R$ 27</span>
                                    <span className="text-2xl sm:text-3xl font-bold text-[#FFD700]">,90</span>
                                </div>
                                <p className="text-slate-400 text-sm mt-1">💳 Menos que uma pizza • Parcelado em 3x sem juros</p>
                                <p className="text-emerald-400 text-sm font-semibold mt-2">
                                    ✓ Acesso Imediato • ✓ Garantia de 7 dias
                                </p>
                            </div>

                            {/* What's included - Compact */}
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

                            {/* ============== IRRESISTIBLE CTA BUTTON (#4) ============== */}
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
                                <motion.button
                                    onClick={handleCheckoutClick}
                                    animate={{ 
                                        scale: [1, 1.02, 1],
                                    }}
                                    transition={{ 
                                        duration: 1.5, 
                                        repeat: Infinity, 
                                        ease: "easeInOut" 
                                    }}
                                    className="relative w-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] hover:from-[#FFD700] hover:to-[#D4AF37] text-black font-black text-base sm:text-lg py-5 px-6 rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all active:scale-95 min-h-[60px]"
                                >
                                    <div className="flex flex-col items-center justify-center gap-1">
                                        <div className="flex items-center gap-2">
                                            <Flame className="w-5 h-5" />
                                            <span>SIM! QUERO ROMPER MINHA LEALDADE INVISÍVEL AGORA</span>
                                        </div>
                                        <span className="text-xs font-semibold opacity-80">
                                            Acesso imediato • R$ 27,90 ou 3x R$ 9,30
                                        </span>
                                    </div>
                                </motion.button>
                            </div>

                            {/* Security bullets below CTA */}
                            <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-xs text-slate-400">
                                <div className="flex items-center gap-1">
                                    <Lock className="w-3 h-3 text-emerald-400" />
                                    <span>Pagamento 100% seguro e criptografado</span>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center justify-center gap-3 mt-2 text-xs text-slate-400">
                                <span>⚡ Acesso liberado em até 3 horas</span>
                                <span>•</span>
                                <span>✓ Garantia incondicional de 7 dias</span>
                            </div>
                            <div className="text-center mt-2">
                                <span className="text-amber-400 text-xs font-semibold">⏰ Oferta válida por apenas 15 minutos</span>
                            </div>

                            {/* Payment Methods */}
                            <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-slate-400">
                                <div className="flex items-center gap-1">
                                    <Smartphone className="w-4 h-4 text-emerald-400" />
                                    <span>Pix (aprovação instantânea)</span>
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
                        </div>

                        {/* ============== DYNAMIC SOCIAL PROOF (#9) ============== */}
                        <div className="space-y-3">
                            {/* Testimonial */}
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                                        C
                                    </div>
                                    <div>
                                        <p className="text-slate-300 text-sm italic">
                                            "Depois que ouvi os áudios, parei de me sentir sugado pela minha família. Durmo em paz pela 1ª vez em anos."
                                        </p>
                                        <p className="text-slate-500 text-xs mt-1">— Camila, 34 anos</p>
                                    </div>
                                </div>
                            </div>

                            {/* Live Activity */}
                            <div className="flex flex-wrap justify-center gap-3">
                                <div className="flex items-center gap-2 bg-emerald-900/30 border border-emerald-500/30 px-3 py-2 rounded-full">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                                    <Users className="w-4 h-4 text-emerald-400" />
                                    <span className="text-emerald-300 text-xs font-semibold">
                                        {viewingCount} pessoas assistindo agora
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 bg-purple-900/30 border border-purple-500/30 px-3 py-2 rounded-full">
                                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                                    <Sparkles className="w-4 h-4 text-purple-400" />
                                    <span className="text-purple-300 text-xs font-semibold">
                                        {activatedCount} protocolos ativados na última hora
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
                        </div>
                    </motion.section>
                )}

                {/* Pre-CTA loading state */}
                {!showCTA && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-8"
                    >
                        <div className="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-500/30 px-4 py-2 rounded-full">
                            <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse"></div>
                            <span className="text-purple-300 text-sm">
                                ✨ Aguarde... Dê play no vídeo para liberar seu protocolo
                            </span>
                        </div>
                    </motion.div>
                )}

                {/* Footer Micro-copy */}
                <div className="text-center mt-8 pb-8">
                    <p className="text-slate-500 text-xs">
                        🔐 Seus dados estão protegidos. Não compartilhamos com terceiros.
                    </p>
                </div>

            </div>

            {/* ============== MOBILE STICKY CTA (appears when CTA is shown) ============== */}
            {showCTA && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
                >
                    <div className="bg-gradient-to-t from-[#0a0118] via-[#0a0118]/95 to-transparent pt-4 pb-4 px-4">
                        <motion.button
                            onClick={handleCheckoutClick}
                            animate={{ 
                                scale: [1, 1.02, 1],
                            }}
                            transition={{ 
                                duration: 1.5, 
                                repeat: Infinity, 
                                ease: "easeInOut" 
                            }}
                            className="w-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black font-black text-base py-4 px-6 rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all active:scale-95 min-h-[60px] flex items-center justify-center gap-2"
                        >
                            <Flame className="w-5 h-5" />
                            <span>QUERO ROMPER AGORA • R$27,90</span>
                        </motion.button>
                        <div className="flex items-center justify-center gap-4 mt-2 text-xs text-slate-400">
                            <span className="flex items-center gap-1">
                                <Lock className="w-3 h-3 text-emerald-400" />
                                Seguro
                            </span>
                            <span className="flex items-center gap-1">
                                <Shield className="w-3 h-3 text-emerald-400" />
                                7 dias garantia
                            </span>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default VSLPage;

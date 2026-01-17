import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useCallback, useRef } from 'react';
import { Shield, Lock, Sparkles, AlertTriangle, Check, Star, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { tracking } from '../utils/tracking';

interface VSLPageProps {
    userName: string;
    onCheckout: () => void;
}

/**
 * VSL PAGE - Video Sales Letter (PIX-ONLY)
 * Estrutura otimizada mobile-first, funil PIX-only
 * 
 * REGRAS QUE NÃO PODEM SER QUEBRADAS:
 * - Nunca mostrar: "3x", "parcelado", "cartão", "boleto"
 * - Primeira dobra = VSL em foco, sem preço/CTA/stack em cima
 * - Timer e urgência só entram DEPOIS da VSL
 * - Prova social vem ANTES do FAQ e do rodapé
 * 
 * ORDEM DOS BLOCOS:
 * 1. Barra verde (protocolo gerado)
 * 2. Headline (bloqueio identificado)
 * 3. Caixa vermelha (alerta crítico)
 * 4. Subheadline (assista ao vídeo)
 * 5. VSL em destaque (9:16)
 * 6. [APÓS VÍDEO] Stack + desconto PIX
 * 7. CTA principal PIX
 * 8. "Por que tão barato?" + comparações
 * 9. Prova social
 * 10. FAQ PIX
 * 11. Escassez/urgência
 * 12. Badges + garantia
 * 13. Rodapé
 * 14. Sticky CTA mobile
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

// Social proof configuration
const SOCIAL_PROOF_CONFIG = {
    viewingCountMin: 25,
    viewingCountMax: 50,
    activatedCountMin: 8,
    activatedCountMax: 15,
    updateIntervalMs: 20000, // 20 seconds
    viewingIncreaseProbability: 0.5,
    activatedIncreaseProbability: 0.7,
};

// Scarcity/slots configuration (PIX urgency)
const SCARCITY_CONFIG = {
    totalSlots: 80,
    initialOccupiedMin: 70,
    initialOccupiedMax: 75,
    updateIntervalMs: 25000, // 25 seconds
    increaseProbability: 0.7,
};

// FAQ items for PIX objections
const PIX_FAQ_ITEMS = [
    {
        question: 'Por que só aceita PIX?',
        answer: 'Para manter o preço baixo (R$ 27,90). Taxas de cartão aumentariam para R$ 97. Repassamos a economia para você!'
    },
    {
        question: 'Quando recebo acesso ao meu Mapa?',
        answer: 'Assim que o PIX for confirmado (até 3h). Você recebe email + WhatsApp com todos os acessos.'
    },
    {
        question: 'E se eu não tiver PIX?',
        answer: 'Todo banco tem PIX gratuito. Ative no app do seu banco em 2 minutos. É rápido e fácil!'
    },
    {
        question: 'Posso pedir reembolso se não gostar?',
        answer: 'Sim! 7 dias de garantia incondicional. Devolução via PIX em até 48h, sem perguntas.'
    },
    {
        question: 'É seguro pagar por aqui?',
        answer: '100% seguro. PIX é o sistema oficial do Banco Central. Seus dados são criptografados e protegidos.'
    }
];

// Price comparison items (to show value)
const PRICE_COMPARISONS = [
    { emoji: '🍕', item: '1 pizza delivery', price: 'R$ 45-60' },
    { emoji: '🎬', item: '1 cinema + pipoca', price: 'R$ 50' },
    { emoji: '🚗', item: '1 tanque de gasolina', price: 'R$ 150+' },
    { emoji: '☕', item: '8 cafés na padaria', price: 'R$ 32' },
];

// VTurb/ConverteAI allowed origins for message validation
const VTURB_ALLOWED_ORIGINS = [
    'https://scripts.converteai.net',
    'https://cdn.converteai.net',
    'https://player.converteai.net',
];

// Video testimonials configuration (VTurb) - ORDEM ESPECIFICADA
const VIDEO_TESTIMONIALS = [
    {
        id: '6966f78072fa6d1f6fe3580b',
        scriptUrl: 'https://scripts.converteai.net/c263b2f0-9566-42be-97d8-7f5920037741/players/6966f78072fa6d1f6fe3580b/v4/player.js',
        quote: '"Depois de 3 dias fazendo o protocolo, recebi uma proposta inesperada de R$ 8 mil"',
        author: 'Mariana, 41 anos',
        location: 'São Paulo, SP'
    },
    {
        id: '6966f8a76af1a10bf01e6dc4',
        scriptUrl: 'https://scripts.converteai.net/c263b2f0-9566-42be-97d8-7f5920037741/players/6966f8a76af1a10bf01e6dc4/v4/player.js',
        quote: '"Minha mãe parou de me cobrar dinheiro do nada. Coincidência? Acho que não."',
        author: 'Rafael, 28 anos',
        location: 'Curitiba, PR'
    },
    {
        id: '6966f6bc1fad4f3937c2eac9',
        scriptUrl: 'https://scripts.converteai.net/c263b2f0-9566-42be-97d8-7f5920037741/players/6966f6bc1fad4f3937c2eac9/v4/player.js',
        quote: '"Consegui sair das dívidas em 10 dias. Inacreditável."',
        author: 'Paula, 38 anos',
        location: 'Rio de Janeiro, RJ'
    },
    {
        id: '6966f6b835a1be1be44c9daf',
        scriptUrl: 'https://scripts.converteai.net/c263b2f0-9566-42be-97d8-7f5920037741/players/6966f6b835a1be1be44c9daf/v4/player.js',
        quote: '"Minha vida financeira mudou em menos de uma semana"',
        author: 'Juliana, 33 anos',
        location: 'Belo Horizonte, MG'
    }
];

// Image testimonials configuration
const IMAGE_TESTIMONIALS = [
    { src: '/prova1.webp', author: 'Camila, 34 anos', day: '4º dia do protocolo' },
    { src: '/prova2.webp', author: 'Lucas, 29 anos', day: '6º dia' },
    { src: '/prova3.webp', author: 'Fernanda, 37 anos', day: '5º dia' },
    { src: '/prova4.webp', author: 'João, 44 anos', day: '8º dia' },
    { src: '/prova5.webp', author: 'Ana, 31 anos', day: '7º dia' },
    { src: '/prova6.webp', author: 'Carlos, 42 anos', day: '9º dia' },
    { src: '/prova7.webp', author: 'Beatriz, 36 anos', day: '5º dia' }
];

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
    
    // Social proof section state
    const [showExtraTestimonials, setShowExtraTestimonials] = useState(false);
    const [loadedTestimonialScripts, setLoadedTestimonialScripts] = useState<Set<string>>(new Set());
    
    // Scarcity state (PIX slots)
    const [slotsOccupied, setSlotsOccupied] = useState(0);
    
    // FAQ state
    const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
    
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
                // Timer expired - just set to 0 and keep user on VSL page
                // Do NOT redirect back to home, as this causes an infinite loop
                setCountdownMs(0);
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
        // Initialize with random values using config constants
        const viewingRange = SOCIAL_PROOF_CONFIG.viewingCountMax - SOCIAL_PROOF_CONFIG.viewingCountMin;
        const activatedRange = SOCIAL_PROOF_CONFIG.activatedCountMax - SOCIAL_PROOF_CONFIG.activatedCountMin;
        
        setViewingCount(Math.floor(Math.random() * viewingRange) + SOCIAL_PROOF_CONFIG.viewingCountMin);
        setActivatedCount(Math.floor(Math.random() * activatedRange) + SOCIAL_PROOF_CONFIG.activatedCountMin);
        
        // Update periodically (always increase)
        const socialProofInterval = setInterval(() => {
            if (Math.random() > (1 - SOCIAL_PROOF_CONFIG.viewingIncreaseProbability)) {
                setViewingCount(prev => prev + 1);
            }
            if (Math.random() > (1 - SOCIAL_PROOF_CONFIG.activatedIncreaseProbability)) {
                setActivatedCount(prev => prev + 1);
            }
        }, SOCIAL_PROOF_CONFIG.updateIntervalMs);
        
        return () => clearInterval(socialProofInterval);
    }, []);

    // Initialize scarcity slots counter
    useEffect(() => {
        // Initialize with random value
        const range = SCARCITY_CONFIG.initialOccupiedMax - SCARCITY_CONFIG.initialOccupiedMin;
        setSlotsOccupied(Math.floor(Math.random() * range) + SCARCITY_CONFIG.initialOccupiedMin);
        
        // Update periodically (always increase, never decrease)
        const scarcityInterval = setInterval(() => {
            setSlotsOccupied(prev => {
                if (prev < SCARCITY_CONFIG.totalSlots - 1 && Math.random() < SCARCITY_CONFIG.increaseProbability) {
                    return prev + 1;
                }
                return prev;
            });
        }, SCARCITY_CONFIG.updateIntervalMs);
        
        return () => clearInterval(scarcityInterval);
    }, []);

    // Load testimonial video scripts dynamically
    const loadTestimonialScript = useCallback((videoId: string, scriptUrl: string) => {
        if (loadedTestimonialScripts.has(videoId)) return;
        
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.async = true;
        script.onload = () => {
            setLoadedTestimonialScripts(prev => new Set([...prev, videoId]));
        };
        document.head.appendChild(script);
    }, [loadedTestimonialScripts]);

    // Load initial testimonial scripts when CTA is shown
    useEffect(() => {
        if (showCTA) {
            // Load first 2 video testimonials initially (visible ones)
            VIDEO_TESTIMONIALS.slice(0, 2).forEach(video => {
                loadTestimonialScript(video.id, video.scriptUrl);
            });
        }
    }, [showCTA, loadTestimonialScript]);

    // Load extra testimonial scripts when expanded
    useEffect(() => {
        if (showExtraTestimonials) {
            // Load remaining video testimonials
            VIDEO_TESTIMONIALS.slice(2).forEach(video => {
                loadTestimonialScript(video.id, video.scriptUrl);
            });
        }
    }, [showExtraTestimonials, loadTestimonialScript]);

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
        playerScript.onload = () => {
            setScriptLoaded(true);
            
            // Try to autoplay after script loads with a small delay for player initialization
            setTimeout(() => {
                try {
                    const player = document.getElementById(`vid-${VSL_VIDEO_PLAYER_ID}`) as HTMLElement & { play?: () => void };
                    if (player && typeof player.play === 'function') {
                        player.play();
                    }
                } catch (e) {
                    // Autoplay may be blocked by browser policy - user will need to click play
                    console.log('Autoplay blocked by browser policy');
                }
            }, 1000);
        };
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
            // Verify message is from VTurb/ConverteAI domains using constant
            const isAllowed = VTURB_ALLOWED_ORIGINS.some(origin => 
                event.origin === origin
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

    const countdown = countdownMs !== null ? formatCountdown(countdownMs) : { minutes: 15, seconds: 0, milliseconds: 0 };
    const isExpired = countdownMs !== null && countdownMs <= 0;
    const isUrgent = countdownMs !== null && countdownMs > 0 && countdownMs < 5 * 60 * 1000; // Less than 5 minutes
    const isWarning = countdownMs !== null && countdownMs >= 5 * 60 * 1000 && countdownMs < 10 * 60 * 1000; // 5-10 minutes

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

                {/* ============== VIDEO SECTION (VSL EM DESTAQUE) ============== */}
                {/* REGRA: Nada de preço, stack, CTA ou timer ANTES do player */}
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
                                        autoplay="true"
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

                {/* ============== CTA SECTION - Appears after video time ============== */}
                {/* NOVA ORDEM: Stack → Desconto PIX → CTA → "Por que barato?" + Comparações → CTA → Prova Social → CTA → FAQ → CTA → Escassez → Badges → CTA */}
                {showCTA && (
                    <motion.section
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        {/* ============== 1. STACK + MOCKUP (O QUE VOCÊ VAI RECEBER HOJE) ============== */}
                        <div className="bg-gradient-to-br from-[#1a0b2e]/80 to-[#2d1b4e]/60 border border-[#D4AF37]/40 rounded-2xl p-4 sm:p-6 mb-6">
                            <h3 className="text-[#FFD700] text-lg font-bold uppercase tracking-wider mb-4 text-center">
                                O QUE VOCÊ VAI RECEBER HOJE:
                            </h3>

                            {/* Mockup Image */}
                            <div className="flex justify-center mb-4">
                                <div className="relative">
                                    <div className="absolute -inset-4 bg-gradient-to-br from-[#D4AF37]/30 via-purple-500/20 to-[#FFD700]/20 blur-2xl rounded-full animate-pulse"></div>
                                    <img 
                                        src="/mockup.webp" 
                                        alt="Mapa Xamânico - Mapa + App" 
                                        className="relative w-36 sm:w-44 rounded-2xl shadow-[0_0_40px_rgba(212,175,55,0.4)] border-2 border-[#D4AF37]/60"
                                    />
                                </div>
                            </div>

                            {/* Value Stack Items */}
                            <div className="space-y-3">
                                {VALUE_STACK_ITEMS.map((item, idx) => (
                                    <div key={idx} className="flex gap-3">
                                        <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                                        <div className="flex-1">
                                            <p className="text-white text-sm font-semibold">{item.title} – <span className="text-[#FFD700]">Valor: R$ {item.value}</span></p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* De: (riscado) */}
                            <div className="mt-4 pt-4 border-t border-[#D4AF37]/30 text-center">
                                <p className="text-slate-400 text-sm">
                                    De: <span className="line-through text-slate-500">R$ {TOTAL_VALUE},00</span>
                                </p>
                            </div>
                        </div>

                        {/* ============== 2. CAIXA DESCONTO EXCLUSIVO PIX ============== */}
                        <div className="bg-gradient-to-br from-purple-900/30 to-emerald-900/20 border-2 border-[#FFD700]/50 rounded-2xl p-6 mb-4">
                            <h3 className="text-[#FFD700] text-xl font-bold text-center mb-4">
                                💸 DESCONTO EXCLUSIVO PIX
                            </h3>
                            
                            <div className="text-center space-y-2 mb-4">
                                <p className="text-slate-500 text-sm">
                                    De: <span className="line-through">R$ {TOTAL_VALUE},00</span>
                                </p>
                                <p className="text-slate-400 text-sm">
                                    Por: <span className="line-through">R$ 97,00</span>
                                </p>
                                <div className="pt-2">
                                    <p className="text-emerald-400 text-lg font-bold">
                                        🔥 HOJE COM PIX:
                                    </p>
                                    <div className="flex items-center justify-center gap-1">
                                        <span className="text-5xl sm:text-6xl font-black text-[#FFD700]">R$ 27</span>
                                        <span className="text-3xl font-bold text-[#FFD700]">,90</span>
                                    </div>
                                    <p className="text-emerald-400 text-sm mt-1">
                                        ({DISCOUNT_PERCENT}% de desconto via PIX)
                                    </p>
                                </div>
                            </div>
                            
                            <p className="text-amber-400 text-sm text-center font-semibold">
                                ⏰ Desconto válido apenas pelos próximos 15 minutos
                            </p>
                        </div>

                        {/* ============== 3. CTA PRINCIPAL PIX (GREEN) ============== */}
                        <div className="relative group mb-4">
                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-400 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
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
                                className="relative w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-green-400 hover:to-emerald-400 text-white font-black text-base sm:text-lg py-5 px-6 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all active:scale-95 min-h-[60px]"
                            >
                                <div className="flex flex-col items-center justify-center gap-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">💰</span>
                                        <span>SIM! QUERO PAGAR R$ 27,90 NO PIX</span>
                                    </div>
                                    <span className="text-xs font-semibold opacity-90">
                                        Aprovação instantânea • Acesso enviado em até 3h
                                    </span>
                                </div>
                            </motion.button>
                        </div>

                        {/* Badges abaixo do CTA */}
                        <div className="space-y-2 mb-6">
                            <div className="flex items-center gap-2 justify-center text-sm">
                                <span className="text-lg">💰</span>
                                <span className="text-slate-300">Pagamento único via PIX (sem mensalidade)</span>
                            </div>
                            <div className="flex items-center gap-2 justify-center text-sm">
                                <span className="text-lg">⚡</span>
                                <span className="text-slate-300">Acesso imediato ao protocolo</span>
                            </div>
                            <div className="flex items-center gap-2 justify-center text-sm">
                                <span className="text-lg">🔒</span>
                                <span className="text-slate-300">Ambiente 100% seguro</span>
                            </div>
                            <div className="flex items-center gap-2 justify-center text-sm">
                                <span className="text-lg">✓</span>
                                <span className="text-slate-300">Garantia incondicional de 7 dias</span>
                            </div>
                        </div>

                        {/* ============== 4. "POR QUE TÃO BARATO?" + COMPARAÇÕES ============== */}
                        <div className="bg-[#FFD700]/10 border-l-4 border-[#FFD700] rounded-r-xl p-4 mb-4">
                            <p className="text-[#FFD700] font-bold mb-2">💡 Por que tão barato?</p>
                            <p className="text-slate-300 text-sm leading-relaxed mb-2">
                                Pagamento via PIX = sem taxas de cartão para nós.<br/>
                                <span className="text-white font-semibold">Repassamos a economia para você!</span>
                            </p>
                            <p className="text-slate-500 text-xs italic">
                                (No cartão seria R$ 97 parcelado)
                            </p>
                        </div>

                        {/* Comparações de preço */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
                            <h4 className="text-[#FFD700] font-bold text-center mb-3">
                                R$ 27,90 é MENOS QUE:
                            </h4>
                            <div className="space-y-2">
                                {PRICE_COMPARISONS.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-sm border-b border-white/5 pb-2 last:border-0">
                                        <span className="text-slate-300">
                                            {item.emoji} {item.item}
                                        </span>
                                        <span className="text-slate-500 text-xs">{item.price}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-[#FFD700] text-sm text-center mt-3 font-semibold">
                                E pode mudar sua vida financeira <span className="text-white">para sempre.</span>
                            </p>
                        </div>

                        {/* CTA repetido após comparações */}
                        <div className="relative group mb-8">
                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-400 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
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
                                className="relative w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-green-400 hover:to-emerald-400 text-white font-black text-base sm:text-lg py-5 px-6 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all active:scale-95 min-h-[60px]"
                            >
                                <div className="flex flex-col items-center justify-center gap-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">💰</span>
                                        <span>SIM! QUERO PAGAR R$ 27,90 NO PIX</span>
                                    </div>
                                    <span className="text-xs font-semibold opacity-90">
                                        Aprovação instantânea • Acesso enviado em até 3h
                                    </span>
                                </div>
                            </motion.button>
                        </div>

                        {/* ============== 5. PROVA SOCIAL (ANTES DO FAQ) ============== */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-8"
                        >
                            {/* Section Header */}
                            <div className="text-center mb-6">
                                <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
                                    O QUE OUTRAS PESSOAS ESTÃO DIZENDO:
                                </h2>
                                <div className="inline-flex items-center gap-2 bg-[#FFD700]/10 border border-[#FFD700]/30 px-4 py-2 rounded-full">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
                                        ))}
                                    </div>
                                    <span className="text-[#FFD700] text-sm font-bold">+4.300 protocolos ativados em todo o Brasil</span>
                                </div>
                            </div>

                            {/* Live Activity Badges */}
                            <div className="flex flex-wrap justify-center gap-3 mb-6">
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

                            {/* Separator */}
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent mb-6"></div>

                            {/* Testimonials Grid */}
                            <div className="space-y-6">
                                {/* PROVA #1 - Video Testimonial 1 */}
                                <div className="bg-gradient-to-br from-[#1a0b2e]/60 to-[#2d1b4e]/40 border border-[#D4AF37]/30 rounded-2xl p-4 overflow-hidden">
                                    <div className="relative rounded-xl overflow-hidden bg-black mb-3" style={{ aspectRatio: '16/9', maxHeight: '300px' }}>
                                        <vturb-smartplayer 
                                            id={`vid-${VIDEO_TESTIMONIALS[0].id}`}
                                            style={{ display: 'block', width: '100%', height: '100%' }}
                                        ></vturb-smartplayer>
                                    </div>
                                    <blockquote className="text-slate-300 text-sm italic mb-2">
                                        {VIDEO_TESTIMONIALS[0].quote}
                                    </blockquote>
                                    <p className="text-[#FFD700] text-xs font-semibold">
                                        — {VIDEO_TESTIMONIALS[0].author} • {VIDEO_TESTIMONIALS[0].location}
                                    </p>
                                </div>

                                {/* PROVA #2 - Image Testimonial 1 */}
                                <div className="bg-gradient-to-br from-[#1a0b2e]/60 to-[#2d1b4e]/40 border border-emerald-500/30 rounded-2xl p-4">
                                    <div className="rounded-xl overflow-hidden mb-3 bg-[#0b141a]">
                                        <img 
                                            src={IMAGE_TESTIMONIALS[0].src} 
                                            alt="Depoimento WhatsApp" 
                                            className="w-full h-auto object-contain"
                                            loading="lazy"
                                        />
                                    </div>
                                    <p className="text-emerald-400 text-xs font-semibold">
                                        — {IMAGE_TESTIMONIALS[0].author} • {IMAGE_TESTIMONIALS[0].day}
                                    </p>
                                </div>

                                {/* PROVA #3 - Video Testimonial 2 */}
                                <div className="bg-gradient-to-br from-[#1a0b2e]/60 to-[#2d1b4e]/40 border border-[#D4AF37]/30 rounded-2xl p-4 overflow-hidden">
                                    <div className="relative rounded-xl overflow-hidden bg-black mb-3" style={{ aspectRatio: '16/9', maxHeight: '300px' }}>
                                        <vturb-smartplayer 
                                            id={`vid-${VIDEO_TESTIMONIALS[1].id}`}
                                            style={{ display: 'block', width: '100%', height: '100%' }}
                                        ></vturb-smartplayer>
                                    </div>
                                    <blockquote className="text-slate-300 text-sm italic mb-2">
                                        {VIDEO_TESTIMONIALS[1].quote}
                                    </blockquote>
                                    <p className="text-[#FFD700] text-xs font-semibold">
                                        — {VIDEO_TESTIMONIALS[1].author} • {VIDEO_TESTIMONIALS[1].location}
                                    </p>
                                </div>

                                {/* PROVA #4 - Image Testimonial 2 */}
                                <div className="bg-gradient-to-br from-[#1a0b2e]/60 to-[#2d1b4e]/40 border border-emerald-500/30 rounded-2xl p-4">
                                    <div className="rounded-xl overflow-hidden mb-3 bg-[#0b141a]">
                                        <img 
                                            src={IMAGE_TESTIMONIALS[1].src} 
                                            alt="Depoimento WhatsApp" 
                                            className="w-full h-auto object-contain"
                                            loading="lazy"
                                        />
                                    </div>
                                    <p className="text-emerald-400 text-xs font-semibold">
                                        — {IMAGE_TESTIMONIALS[1].author} • {IMAGE_TESTIMONIALS[1].day}
                                    </p>
                                </div>

                                {/* PROVA #5 - Image Testimonial 3 */}
                                <div className="bg-gradient-to-br from-[#1a0b2e]/60 to-[#2d1b4e]/40 border border-emerald-500/30 rounded-2xl p-4">
                                    <div className="rounded-xl overflow-hidden mb-3 bg-[#0b141a]">
                                        <img 
                                            src={IMAGE_TESTIMONIALS[2].src} 
                                            alt="Depoimento WhatsApp" 
                                            className="w-full h-auto object-contain"
                                            loading="lazy"
                                        />
                                    </div>
                                    <p className="text-emerald-400 text-xs font-semibold">
                                        — {IMAGE_TESTIMONIALS[2].author} • {IMAGE_TESTIMONIALS[2].day}
                                    </p>
                                </div>

                                {/* EXPAND BUTTON */}
                                {!showExtraTestimonials && (
                                    <motion.button
                                        onClick={() => setShowExtraTestimonials(true)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-gradient-to-r from-purple-900/50 to-[#1a0b2e]/70 border border-purple-500/40 text-purple-300 font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 hover:border-purple-400/60 transition-all"
                                    >
                                        <span>VER MAIS DEPOIMENTOS (6 NOVOS)</span>
                                        <ChevronDown className="w-5 h-5" />
                                    </motion.button>
                                )}

                                {/* EXTRA TESTIMONIALS - Hidden by default */}
                                <AnimatePresence>
                                    {showExtraTestimonials && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-6"
                                        >
                                            {/* PROVA #6 - Video Testimonial 3 */}
                                            <div className="bg-gradient-to-br from-[#1a0b2e]/60 to-[#2d1b4e]/40 border border-[#D4AF37]/30 rounded-2xl p-4 overflow-hidden">
                                                <div className="relative rounded-xl overflow-hidden bg-black mb-3" style={{ aspectRatio: '16/9', maxHeight: '300px' }}>
                                                    <vturb-smartplayer 
                                                        id={`vid-${VIDEO_TESTIMONIALS[2].id}`}
                                                        style={{ display: 'block', width: '100%', height: '100%' }}
                                                    ></vturb-smartplayer>
                                                </div>
                                                <blockquote className="text-slate-300 text-sm italic mb-2">
                                                    {VIDEO_TESTIMONIALS[2].quote}
                                                </blockquote>
                                                <p className="text-[#FFD700] text-xs font-semibold">
                                                    — {VIDEO_TESTIMONIALS[2].author} • {VIDEO_TESTIMONIALS[2].location}
                                                </p>
                                            </div>

                                            {/* PROVA #7 - Image Testimonial 4 */}
                                            <div className="bg-gradient-to-br from-[#1a0b2e]/60 to-[#2d1b4e]/40 border border-emerald-500/30 rounded-2xl p-4">
                                                <div className="rounded-xl overflow-hidden mb-3 bg-[#0b141a]">
                                                    <img 
                                                        src={IMAGE_TESTIMONIALS[3].src} 
                                                        alt="Depoimento WhatsApp" 
                                                        className="w-full h-auto object-contain"
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <p className="text-emerald-400 text-xs font-semibold">
                                                    — {IMAGE_TESTIMONIALS[3].author} • {IMAGE_TESTIMONIALS[3].day}
                                                </p>
                                            </div>

                                            {/* PROVA #8 - Video Testimonial 4 */}
                                            <div className="bg-gradient-to-br from-[#1a0b2e]/60 to-[#2d1b4e]/40 border border-[#D4AF37]/30 rounded-2xl p-4 overflow-hidden">
                                                <div className="relative rounded-xl overflow-hidden bg-black mb-3" style={{ aspectRatio: '16/9', maxHeight: '300px' }}>
                                                    <vturb-smartplayer 
                                                        id={`vid-${VIDEO_TESTIMONIALS[3].id}`}
                                                        style={{ display: 'block', width: '100%', height: '100%' }}
                                                    ></vturb-smartplayer>
                                                </div>
                                                <blockquote className="text-slate-300 text-sm italic mb-2">
                                                    {VIDEO_TESTIMONIALS[3].quote}
                                                </blockquote>
                                                <p className="text-[#FFD700] text-xs font-semibold">
                                                    — {VIDEO_TESTIMONIALS[3].author} • {VIDEO_TESTIMONIALS[3].location}
                                                </p>
                                            </div>

                                            {/* PROVA #9 - Image Testimonial 5 */}
                                            <div className="bg-gradient-to-br from-[#1a0b2e]/60 to-[#2d1b4e]/40 border border-emerald-500/30 rounded-2xl p-4">
                                                <div className="rounded-xl overflow-hidden mb-3 bg-[#0b141a]">
                                                    <img 
                                                        src={IMAGE_TESTIMONIALS[4].src} 
                                                        alt="Depoimento WhatsApp" 
                                                        className="w-full h-auto object-contain"
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <p className="text-emerald-400 text-xs font-semibold">
                                                    — {IMAGE_TESTIMONIALS[4].author} • {IMAGE_TESTIMONIALS[4].day}
                                                </p>
                                            </div>

                                            {/* PROVA #10 - Image Testimonial 6 */}
                                            <div className="bg-gradient-to-br from-[#1a0b2e]/60 to-[#2d1b4e]/40 border border-emerald-500/30 rounded-2xl p-4">
                                                <div className="rounded-xl overflow-hidden mb-3 bg-[#0b141a]">
                                                    <img 
                                                        src={IMAGE_TESTIMONIALS[5].src} 
                                                        alt="Depoimento WhatsApp" 
                                                        className="w-full h-auto object-contain"
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <p className="text-emerald-400 text-xs font-semibold">
                                                    — {IMAGE_TESTIMONIALS[5].author} • {IMAGE_TESTIMONIALS[5].day}
                                                </p>
                                            </div>

                                            {/* PROVA #11 - Image Testimonial 7 */}
                                            <div className="bg-gradient-to-br from-[#1a0b2e]/60 to-[#2d1b4e]/40 border border-emerald-500/30 rounded-2xl p-4">
                                                <div className="rounded-xl overflow-hidden mb-3 bg-[#0b141a]">
                                                    <img 
                                                        src={IMAGE_TESTIMONIALS[6].src} 
                                                        alt="Depoimento WhatsApp" 
                                                        className="w-full h-auto object-contain"
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <p className="text-emerald-400 text-xs font-semibold">
                                                    — {IMAGE_TESTIMONIALS[6].author} • {IMAGE_TESTIMONIALS[6].day}
                                                </p>
                                            </div>

                                            {/* Collapse Button */}
                                            <motion.button
                                                onClick={() => setShowExtraTestimonials(false)}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full bg-gradient-to-r from-purple-900/30 to-[#1a0b2e]/50 border border-purple-500/30 text-purple-300 font-medium py-3 px-6 rounded-xl flex items-center justify-center gap-2 hover:border-purple-400/50 transition-all"
                                            >
                                                <span>Mostrar menos</span>
                                                <ChevronUp className="w-5 h-5" />
                                            </motion.button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* REPEATED CTA BUTTON (PIX GREEN) */}
                            <div className="mt-8">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-400 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
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
                                        className="relative w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-green-400 hover:to-emerald-400 text-white font-black text-base sm:text-lg py-5 px-6 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all active:scale-95 min-h-[60px]"
                                    >
                                        <div className="flex flex-col items-center justify-center gap-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl">💰</span>
                                                <span>SIM! QUERO PAGAR R$ 27,90 NO PIX</span>
                                            </div>
                                            <span className="text-xs font-semibold opacity-90">
                                                Aprovação instantânea • Acesso enviado em até 3h
                                            </span>
                                        </div>
                                    </motion.button>
                                </div>
                            </div>

                            {/* Disclaimer */}
                            <p className="text-slate-500 text-xs text-center mt-4 px-4">
                                *Resultados individuais podem variar. Os depoimentos são de clientes reais que utilizaram o protocolo.
                            </p>
                        </motion.div>

                        {/* ============== 7. PIX FAQ SECTION (APÓS PROVA SOCIAL) ============== */}
                        <div className="mt-8 mb-6">
                            <h3 className="text-white font-bold text-lg text-center mb-4">
                                ❓ PERGUNTAS FREQUENTES
                            </h3>
                            <div className="space-y-2">
                                {PIX_FAQ_ITEMS.map((faq, idx) => (
                                    <div key={idx} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                                        <button
                                            onClick={() => setExpandedFaqIndex(expandedFaqIndex === idx ? null : idx)}
                                            className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                                        >
                                            <span className="text-slate-200 text-sm font-medium">{faq.question}</span>
                                            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedFaqIndex === idx ? 'rotate-180' : ''}`} />
                                        </button>
                                        <AnimatePresence>
                                            {expandedFaqIndex === idx && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="px-4 pb-4 text-slate-400 text-sm">
                                                        → {faq.answer}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA após FAQ */}
                        <div className="relative group mb-8">
                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-400 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
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
                                className="relative w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-green-400 hover:to-emerald-400 text-white font-black text-base sm:text-lg py-5 px-6 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all active:scale-95 min-h-[60px]"
                            >
                                <div className="flex flex-col items-center justify-center gap-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">💰</span>
                                        <span>SIM! QUERO PAGAR R$ 27,90 NO PIX</span>
                                    </div>
                                    <span className="text-xs font-semibold opacity-90">
                                        Aprovação instantânea • Acesso enviado em até 3h
                                    </span>
                                </div>
                            </motion.button>
                        </div>

                        {/* ============== 8. ESCASSEZ / URGÊNCIA ============== */}
                        <div className="bg-gradient-to-r from-red-900/40 to-orange-900/30 border-2 border-red-500/50 rounded-xl p-4 mb-4">
                            <p className="text-white font-bold text-center mb-3">
                                🔥 Atenção: poucas ativações com desconto hoje
                            </p>
                            <div className="w-full h-4 bg-black/30 rounded-full overflow-hidden mb-2">
                                <motion.div 
                                    className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-[#FFD700]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(slotsOccupied / SCARCITY_CONFIG.totalSlots) * 100}%` }}
                                    transition={{ duration: 1 }}
                                />
                            </div>
                            <p className="text-slate-300 text-sm text-center">
                                {slotsOccupied}/{SCARCITY_CONFIG.totalSlots} protocolos ativados hoje
                            </p>
                            <p className="text-slate-400 text-xs text-center mt-2">
                                Após atingir o limite diário, o valor volta para R$ 97.
                            </p>
                            
                            {/* Timer 15min */}
                            <div className={`rounded-xl p-4 mt-4 text-center border ${
                                isExpired
                                    ? 'bg-slate-900/50 border-slate-500/60'
                                    : isUrgent 
                                        ? 'bg-red-900/50 border-red-500/60' 
                                        : isWarning 
                                            ? 'bg-orange-900/40 border-orange-500/50' 
                                            : 'bg-amber-900/30 border-amber-500/40'
                            }`}>
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <AlertTriangle className={`w-5 h-5 ${isExpired ? 'text-slate-400' : isUrgent ? 'text-red-400' : isWarning ? 'text-orange-400' : 'text-amber-400'}`} />
                                    <span className={`font-bold text-sm ${isExpired ? 'text-slate-300' : isUrgent ? 'text-red-300' : isWarning ? 'text-orange-300' : 'text-amber-300'}`}>
                                        {isExpired ? '⏰ DESCONTO EXPIROU' : '⏰ DESCONTO EXPIRA EM:'}
                                    </span>
                                </div>
                                
                                {/* Timer Display */}
                                <div className="flex items-center justify-center gap-2">
                                    <div className={`px-3 py-2 rounded-lg ${isExpired ? 'bg-slate-800/60' : isUrgent ? 'bg-red-800/60' : isWarning ? 'bg-orange-800/50' : 'bg-amber-800/40'}`}>
                                        <span className={`text-2xl sm:text-3xl font-mono font-black ${isExpired ? 'text-slate-300' : isUrgent ? 'text-red-300' : isWarning ? 'text-orange-300' : 'text-amber-300'}`}>
                                            {String(countdown.minutes).padStart(2, '0')}
                                        </span>
                                        <span className={`text-xs block ${isExpired ? 'text-slate-400' : isUrgent ? 'text-red-400' : isWarning ? 'text-orange-400' : 'text-amber-400'}`}>MIN</span>
                                    </div>
                                    <span className={`text-2xl font-bold ${isExpired ? 'text-slate-400' : isUrgent ? 'text-red-400' : isWarning ? 'text-orange-400' : 'text-amber-400'}`}>:</span>
                                    <div className={`px-3 py-2 rounded-lg ${isExpired ? 'bg-slate-800/60' : isUrgent ? 'bg-red-800/60' : isWarning ? 'bg-orange-800/50' : 'bg-amber-800/40'}`}>
                                        <span className={`text-2xl sm:text-3xl font-mono font-black ${isExpired ? 'text-slate-300' : isUrgent ? 'text-red-300' : isWarning ? 'text-orange-300' : 'text-amber-300'}`}>
                                            {String(countdown.seconds).padStart(2, '0')}
                                        </span>
                                        <span className={`text-xs block ${isExpired ? 'text-slate-400' : isUrgent ? 'text-red-400' : isWarning ? 'text-orange-400' : 'text-amber-400'}`}>SEG</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA após Escassez */}
                        <div className="relative group mb-6">
                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-400 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
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
                                className="relative w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-green-400 hover:to-emerald-400 text-white font-black text-base sm:text-lg py-5 px-6 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all active:scale-95 min-h-[60px]"
                            >
                                <div className="flex flex-col items-center justify-center gap-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">💰</span>
                                        <span>SIM! QUERO PAGAR R$ 27,90 NO PIX</span>
                                    </div>
                                    <span className="text-xs font-semibold opacity-90">
                                        Aprovação instantânea • Acesso enviado em até 3h
                                    </span>
                                </div>
                            </motion.button>
                        </div>

                        {/* ============== 9. BADGES + GARANTIA (GRID 2x2) ============== */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="bg-white/5 border border-emerald-500/30 rounded-lg p-3 text-center">
                                <span className="text-xl">💰</span>
                                <p className="text-white text-xs font-bold mt-1">APENAS R$ 27,90</p>
                            </div>
                            <div className="bg-white/5 border border-emerald-500/30 rounded-lg p-3 text-center">
                                <span className="text-xl">⚡</span>
                                <p className="text-white text-xs font-bold mt-1">INSTANTÂNEO</p>
                            </div>
                            <div className="bg-white/5 border border-emerald-500/30 rounded-lg p-3 text-center">
                                <span className="text-xl">✓</span>
                                <p className="text-white text-xs font-bold mt-1">GARANTIA 7 DIAS</p>
                            </div>
                            <div className="bg-white/5 border border-emerald-500/30 rounded-lg p-3 text-center">
                                <span className="text-xl">🔒</span>
                                <p className="text-white text-xs font-bold mt-1">100% SEGURO</p>
                            </div>
                        </div>

                        {/* CTA Final */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-400 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
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
                                className="relative w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-green-400 hover:to-emerald-400 text-white font-black text-base sm:text-lg py-5 px-6 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all active:scale-95 min-h-[60px]"
                            >
                                <div className="flex flex-col items-center justify-center gap-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">💰</span>
                                        <span>SIM! QUERO PAGAR R$ 27,90 NO PIX</span>
                                    </div>
                                    <span className="text-xs font-semibold opacity-90">
                                        Aprovação instantânea • Acesso enviado em até 3h
                                    </span>
                                </div>
                            </motion.button>
                        </div>
                    </motion.section>
                )}

                {/* ============== RODAPÉ COMPLETO ============== */}
                <footer className="mt-12 pt-8 border-t border-white/10">
                    {/* Links */}
                    <div className="flex flex-wrap justify-center gap-4 mb-4">
                        <a href="#" className="text-slate-500 text-xs hover:text-slate-400 transition-colors">
                            Política de Privacidade
                        </a>
                        <span className="text-slate-700">•</span>
                        <a href="#" className="text-slate-500 text-xs hover:text-slate-400 transition-colors">
                            Termos de Uso
                        </a>
                        <span className="text-slate-700">•</span>
                        <a href="#" className="text-slate-500 text-xs hover:text-slate-400 transition-colors">
                            Contato
                        </a>
                    </div>
                    
                    {/* LGPD Notice */}
                    <div className="text-center mb-4">
                        <p className="text-slate-500 text-xs">
                            🔐 Seus dados estão protegidos conforme LGPD. Não compartilhamos com terceiros.
                        </p>
                    </div>
                    
                    {/* Copyright */}
                    <div className="text-center pb-24 md:pb-8">
                        <p className="text-slate-600 text-[10px]">
                            © 2024 Mapa Xamânico. Todos os direitos reservados.
                        </p>
                    </div>
                </footer>

            </div>

            {/* ============== MOBILE STICKY CTA (PIX GREEN) ============== */}
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
                            className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white font-black text-base py-4 px-6 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all active:scale-95 min-h-[60px] flex items-center justify-center gap-2"
                        >
                            <span className="text-xl">💰</span>
                            <span>PAGAR R$27,90 VIA PIX</span>
                        </motion.button>
                        <div className="flex items-center justify-center gap-4 mt-2 text-xs text-slate-400">
                            <span className="flex items-center gap-1">
                                <span>⚡</span>
                                Instantâneo
                            </span>
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

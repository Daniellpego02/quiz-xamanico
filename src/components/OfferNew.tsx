import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Check, Shield, Clock, AlertTriangle, Headphones, FileText, Sparkles, Lock, ChevronLeft, ChevronRight, Briefcase, Layers, Users } from 'lucide-react';
import { FAQ } from './FAQ';

interface OfferProps {
    userName: string;
}

/**
 * OFFER PAGE - PROFESSIONAL CONVERSION OPTIMIZATION
 * Following the complete technical specification for high-converting sales page
 * Architecture: Dark Mode + Gold Accents + Psychological Conversion Triggers
 */
// Configuration constants
const COUNTDOWN_DURATION_SECONDS = 24 * 60 * 60; // 24 hours

const OfferNew = ({ userName }: OfferProps) => {
    const [showOfferContent, setShowOfferContent] = useState(false);
    const [currentProofIndex, setCurrentProofIndex] = useState(0);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(COUNTDOWN_DURATION_SECONDS);
    const [availableSlots, setAvailableSlots] = useState(12);
    const totalSlots = 50;
    
    // Price configuration - PIX ONLY (À VISTA)
    // Updated price anchoring: From R$ 497,00 (session value) to R$ 27,90
    const priceOld = "497,00";
    
    // Social proof images with descriptions
    const socialProofImages = [
        { src: '/prova1.png', alt: 'Depoimento WhatsApp de cliente satisfeito 1' },
        { src: '/prova2.png', alt: 'Depoimento WhatsApp de cliente satisfeito 2' },
        { src: '/prova3.png', alt: 'Depoimento WhatsApp de cliente satisfeito 3' },
        { src: '/prova4.png', alt: 'Depoimento WhatsApp de cliente satisfeito 4' },
        { src: '/prova5.png', alt: 'Depoimento WhatsApp de cliente satisfeito 5' },
        { src: '/prova6.png', alt: 'Depoimento WhatsApp de cliente satisfeito 6' },
        { src: '/prova7.png', alt: 'Depoimento WhatsApp de cliente satisfeito 7' }
    ];
    
    // Video testimonials - Updated with new VTURB smartplayer IDs
    const videoTestimonials = [
        { 
            id: '6966f78072fa6d1f6fe3580b',
            playerId: 'vid-6966f78072fa6d1f6fe3580b',
            scriptUrl: 'https://scripts.converteai.net/c263b2f0-9566-42be-97d8-7f5920037741/players/6966f78072fa6d1f6fe3580b/v4/player.js',
            name: 'Depoimento em Vídeo 1'
        },
        { 
            id: '6966f6bc1fad4f3937c2eac9',
            playerId: 'vid-6966f6bc1fad4f3937c2eac9',
            scriptUrl: 'https://scripts.converteai.net/c263b2f0-9566-42be-97d8-7f5920037741/players/6966f6bc1fad4f3937c2eac9/v4/player.js',
            name: 'Depoimento em Vídeo 2'
        },
        { 
            id: '6966f6b835a1be1be44c9daf',
            playerId: 'vid-6966f6b835a1be1be44c9daf',
            scriptUrl: 'https://scripts.converteai.net/c263b2f0-9566-42be-97d8-7f5920037741/players/6966f6b835a1be1be44c9daf/v4/player.js',
            name: 'Depoimento em Vídeo 3'
        },
        { 
            id: '6966f8a76af1a10bf01e6dc4',
            playerId: 'vid-6966f8a76af1a10bf01e6dc4',
            scriptUrl: 'https://scripts.converteai.net/c263b2f0-9566-42be-97d8-7f5920037741/players/6966f8a76af1a10bf01e6dc4/v4/player.js',
            name: 'Depoimento em Vídeo 4'
        }
    ];
    
    const nextProof = () => {
        setCurrentProofIndex((prev) => (prev + 1) % socialProofImages.length);
    };
    
    const prevProof = () => {
        setCurrentProofIndex((prev) => (prev - 1 + socialProofImages.length) % socialProofImages.length);
    };
    
    const nextVideo = () => {
        setCurrentVideoIndex((prev) => (prev + 1) % videoTestimonials.length);
    };
    
    const prevVideo = () => {
        setCurrentVideoIndex((prev) => (prev - 1 + videoTestimonials.length) % videoTestimonials.length);
    };
    
    // Format time for display
    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    
    // Countdown timer effect
    useEffect(() => {
        if (timeLeft <= 0) return;
        
        const countdown = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(countdown);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        
        return () => clearInterval(countdown);
    }, [timeLeft]);

    // Load video player script
    useEffect(() => {
        const optimizationScript = document.createElement('script');
        optimizationScript.innerHTML = '!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);';
        document.head.appendChild(optimizationScript);

        // Generate preload links for video testimonials from the array
        const testimonialPreloads = videoTestimonials.map(video => ({
            href: video.scriptUrl,
            as: 'script'
        }));

        const preloadLinks = [
            { href: 'https://scripts.converteai.net/c263b2f0-9566-42be-97d8-7f5920037741/players/6953144d84040898eb13007a/v4/player.js', as: 'script' },
            { href: 'https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js', as: 'script' },
            { href: 'https://cdn.converteai.net/c263b2f0-9566-42be-97d8-7f5920037741/6953140fba8707e946bf11ea/main.m3u8', as: 'fetch' },
            // Preload video testimonial player scripts (generated from videoTestimonials array)
            ...testimonialPreloads
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

        // Load video testimonial scripts
        const testimonialScripts: HTMLScriptElement[] = [];
        videoTestimonials.forEach(video => {
            const script = document.createElement('script');
            script.src = video.scriptUrl;
            script.async = true;
            document.head.appendChild(script);
            testimonialScripts.push(script);
        });

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
            testimonialScripts.forEach(el => el.remove());
        };
    }, []);

    const handleCheckout = () => {
        window.location.href = 'https://www.seguropagamentos.com.br/mapa-xamanico';
    };

    return (
        <div className="min-h-screen relative overflow-hidden text-white bg-[#000000]">
            {/* Urgency Bar with Timer at the top - Red/Orange */}
            <div className="sticky top-0 z-50 bg-gradient-to-r from-red-900 via-orange-800 to-red-900 border-b border-red-500/50">
                <div className="max-w-4xl mx-auto px-4 py-2 flex items-center justify-center gap-2 text-center">
                    <span className="text-white text-sm font-bold animate-pulse">⏰</span>
                    <span className="text-white text-sm sm:text-base font-semibold">
                        OFERTA EXPIRA EM: <span className="text-yellow-300 font-black">{formatTime(timeLeft)}</span>
                    </span>
                </div>
            </div>
            
            {/* Dark Forest Background with Mystical Effects */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-[#021a0a] via-[#000000] to-[#021a0a]"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#D4AF37]/3 rounded-full blur-[150px] animate-pulse"></div>
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}></div>
            </div>

            <div className="max-w-[800px] mx-auto px-4 py-8">
                {/* BLOCK 01: HERO SECTION - New Headline Structure */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-6"
                >
                    {/* Pre-Headline - Yellow */}
                    <div className="inline-flex items-center gap-2 bg-red-900/40 border border-red-500/50 px-4 py-2 rounded-full mb-4">
                        <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
                        <span className="text-red-400 text-sm font-bold uppercase tracking-wider">🔥 ATENÇÃO</span>
                    </div>
                    
                    {/* Main Headline - White */}
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-4 tracking-wide leading-tight px-2">
                        Seu Dinheiro Está Desaparecendo por Culpa dos Seus Ancestrais<br/>
                        <span className="text-[#FFD700]">(E Ninguém Te Contou Como Parar Isso em 7 Dias)</span>
                    </h1>
                    
                    {/* Sub-headline - Light Gray */}
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto px-2 mb-4">
                        Descubra o Padrão Invisível que Seus Pais, Avós e Bisavós Deixaram Para Você Herdar a Pobreza... E Como Desbloqueá-lo HOJE MESMO
                    </p>
                    
                    {/* Urgency + Social Proof Banner */}
                    <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-xl p-4 max-w-2xl mx-auto mb-4">
                        <p className="text-white font-bold text-base sm:text-lg mb-2">
                            ⏰ AVISO: Esta Oferta Expira em 24 Horas
                        </p>
                        <p className="text-slate-300 text-sm">
                            <span className="text-[#FFD700] font-bold">12.847 Pessoas</span> Já Desbloquearam Seu Fluxo de Abundância<br/>
                            (E Estão Vendo Mudanças REAIS em Suas Contas Bancárias)
                        </p>
                        <p className="text-white font-semibold text-base mt-3">
                            Agora é a Sua Vez...
                        </p>
                    </div>
                </motion.div>

                {/* Urgency Microcopy Above Video */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-r from-[#8B0000] to-[#CC0000] border border-red-500/50 rounded-lg px-4 py-2 mb-4 text-center"
                >
                    <p className="text-sm md:text-base text-white font-semibold">
                        🔒 Este vídeo contém a leitura da sua frequência energética e será deletado do servidor em breve.
                    </p>
                </motion.div>

                {/* BLOCK 02: VSL VIDEO PLAYER */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-[0_0_60px_rgba(212,175,55,0.4)] mb-8 mx-auto max-w-md"
                >
                    <div className="bg-black flex items-center justify-center relative">
                        <div className="w-full" style={{ aspectRatio: '9/16', maxWidth: '400px' }}>
                            <vturb-smartplayer 
                                id="vid-6953144d84040898eb13007a" 
                                style={{ display: 'block', width: '100%', maxWidth: '400px', margin: '0 auto' }}
                            ></vturb-smartplayer>
                        </div>
                    </div>
                    {/* Glow effect */}
                    <div className="absolute -inset-2 bg-[#D4AF37]/20 blur-xl -z-10"></div>
                </motion.div>

                {/* CTA Button Below Video - Green Neon */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mb-8"
                >
                    <button
                        onClick={handleCheckout}
                        className="w-full max-w-md mx-auto bg-gradient-to-r from-[#00FF41] to-[#00CC33] hover:from-[#00CC33] hover:to-[#00FF41] text-black font-black text-base sm:text-lg md:text-xl py-5 md:py-6 px-4 md:px-8 rounded-2xl shadow-[0_0_40px_rgba(0,255,65,0.6)] transition-all transform hover:scale-[1.02] active:scale-95 uppercase tracking-wide relative overflow-hidden group"
                    >
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        <span className="relative z-10">🔓 QUERO DESBLOQUEAR AGORA</span>
                    </button>
                    <p className="text-center text-slate-400 text-sm mt-3 flex items-center justify-center gap-2">
                        <Lock className="w-4 h-4" />
                        🔒 Acesso imediato e seguro • R$ 27,90
                    </p>
                </motion.div>

                {/* BLOCK 03: THE OFFER - Hidden until video timing */}
                <AnimatePresence>
                    {showOfferContent && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* PRICE ANCHORING STACK - PIX APENAS */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border-2 border-[#D4AF37] rounded-3xl p-4 sm:p-6 md:p-8 mb-8 relative overflow-hidden"
                            >
                                {/* Pulsing glow */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-3xl blur-lg opacity-20 animate-pulse"></div>
                                
                                <div className="relative">
                                    <div className="text-center mb-6 sm:mb-8">
                                        <p className="text-slate-400 text-xs sm:text-sm uppercase tracking-wider mb-4 sm:mb-6">
                                            <Clock className="inline w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                            Oferta Exclusiva para {userName}
                                        </p>
                                        
                                        {/* Price Stack - NOVO FORMATO */}
                                        <div className="space-y-2 sm:space-y-3">
                                            {/* Linha 1: Ancoragem (Valor Antigo) - Riscado */}
                                            <div>
                                                <p className="text-slate-500 text-lg sm:text-xl line-through">
                                                    De R$ {priceOld}
                                                </p>
                                                <p className="text-slate-400 text-xs">(Valor real da mentoria)</p>
                                            </div>

                                            {/* Linha 2: Preço Destaque */}
                                            <div className="my-3 sm:my-4">
                                                <p className="text-[#FFD700] text-base sm:text-lg font-semibold px-2">
                                                    Por apenas:
                                                </p>
                                            </div>

                                            {/* Linha 3: PREÇO GIGANTE VERDE NEON - Mobile Optimized */}
                                            <div className="my-6 sm:my-8">
                                                <div className="flex items-center justify-center gap-1">
                                                    <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#00FF41] drop-shadow-[0_0_30px_rgba(0,255,65,0.8)]">R$</span>
                                                    <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-[#00FF41] drop-shadow-[0_0_30px_rgba(0,255,65,0.8)]">27</span>
                                                    <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#00FF41] drop-shadow-[0_0_30px_rgba(0,255,65,0.8)] self-start mt-2">,90</span>
                                                </div>
                                            </div>

                                            {/* Linha 4: Justificativa do Preço */}
                                            <div className="mb-4 sm:mb-6">
                                                <p className="text-slate-300 text-sm sm:text-base px-2">
                                                    Taxa única de contribuição energética. Sem mensalidades.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* PIX VACCINE BOX - Reposicionado próximo ao botão */}
                                    <div className="bg-gradient-to-r from-[#8B0000]/20 to-[#CC0000]/20 border-2 border-dashed border-yellow-500 rounded-xl p-3 sm:p-4 mb-4">
                                        <div className="flex items-start gap-2 sm:gap-3">
                                            <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-yellow-500 font-bold text-sm sm:text-base mb-1 sm:mb-2">⚠️ AVISO: Vaga Expira em 15 Min</p>
                                                <p className="text-white text-xs sm:text-sm leading-relaxed">
                                                    O QR Code PIX tem validade de <span className="font-black text-yellow-500">15 minutos</span>. Se não compensado, sua vaga é <span className="font-bold text-red-400">cancelada automaticamente</span>.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA BUTTON - GERAR MEU ACESSO AGORA */}
                                    <button
                                        onClick={handleCheckout}
                                        className="w-full bg-gradient-to-r from-[#00FF41] to-[#00CC33] hover:from-[#00CC33] hover:to-[#00FF41] text-black font-black text-base sm:text-lg md:text-xl py-5 md:py-6 px-4 md:px-8 rounded-2xl shadow-[0_0_40px_rgba(0,255,65,0.6)] transition-all transform hover:scale-[1.02] active:scale-95 uppercase tracking-wide mb-3 flex flex-col items-center justify-center gap-1 relative overflow-hidden group"
                                    >
                                        {/* Shine effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                        
                                        <span className="leading-tight relative z-10">🔓 SIM! QUERO DESBLOQUEAR AGORA</span>
                                        <small className="font-normal text-xs relative z-10">Liberar meu acesso imediato por R$ 27,90</small>
                                    </button>

                                    {/* Subtexto do Botão */}
                                    <p className="text-center text-slate-300 text-sm font-semibold flex items-center justify-center gap-2">
                                        <Lock className="w-4 h-4" />
                                        🔒 Acesso imediato e seguro
                                    </p>

                                    {/* Trust Badge - Compra Segura, Dados Protegidos */}
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mt-6">
                                        <div className="flex items-center gap-2 bg-white/10 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm">
                                            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0" />
                                            <span className="text-slate-300 font-semibold whitespace-nowrap">Compra Segura</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-emerald-500/20 px-3 sm:px-4 py-2 rounded-lg border border-emerald-500/50 text-xs sm:text-sm">
                                            <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0" />
                                            <span className="text-white font-bold whitespace-nowrap">Dados Protegidos</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* SCARCITY SECTION - Limited Slots Indicator */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mb-8 bg-gradient-to-br from-red-950/40 to-orange-900/20 border-2 border-red-500/40 rounded-2xl p-4 sm:p-6"
                            >
                                <div className="flex items-start gap-3 mb-4">
                                    <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 flex-shrink-0 animate-pulse" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-red-400 font-bold text-base sm:text-lg mb-2">
                                            ⚠️ APENAS {availableSlots} VAGAS DISPONÍVEIS
                                        </p>
                                        <p className="text-slate-300 text-sm">
                                            {totalSlots - availableSlots} pessoas já acessaram hoje
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Progress Bar */}
                                <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden border border-red-500/30">
                                    <div 
                                        className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-1000"
                                        style={{ width: `${((totalSlots - availableSlots) / totalSlots) * 100}%` }}
                                    ></div>
                                </div>
                            </motion.div>

                            {/* SOCIAL PROOF STATS */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="mb-12"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#FFD700]/5 border-2 border-[#D4AF37]/30 rounded-xl p-4 text-center">
                                        <p className="text-3xl sm:text-4xl font-black text-[#FFD700] mb-2">12.847+</p>
                                        <p className="text-slate-300 text-sm">Pessoas já desbloquearam</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#FFD700]/5 border-2 border-[#D4AF37]/30 rounded-xl p-4 text-center">
                                        <p className="text-3xl sm:text-4xl font-black text-[#FFD700] mb-2">4.9⭐</p>
                                        <p className="text-slate-300 text-sm">Avaliação média (2.140 reviews)</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#FFD700]/5 border-2 border-[#D4AF37]/30 rounded-xl p-4 text-center">
                                        <p className="text-3xl sm:text-4xl font-black text-[#FFD700] mb-2">100%</p>
                                        <p className="text-slate-300 text-sm">Satisfação garantida</p>
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
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-center text-[#FFD700] mb-6 sm:mb-8 px-2">
                                    🎁 O Que Você Vai Receber HOJE (Acesso Imediato)
                                </h2>

                                {/* Mockup Image */}
                                <div className="mb-8 flex justify-center">
                                    <img 
                                        src="/mockup.png" 
                                        alt="Mockup do Mapa Xamânico" 
                                        className="w-full max-w-md rounded-2xl shadow-[0_0_40px_rgba(212,175,55,0.3)] border-2 border-[#D4AF37]/50"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Benefits Cards with Values */}
                                <div className="space-y-6 max-w-3xl mx-auto">
                                    {/* Benefit 1 */}
                                    <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border-l-4 border-purple-500 rounded-xl p-4 sm:p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-white font-bold text-lg sm:text-xl">📖 Mapa Xamânico Diagnóstico (Digital)</h3>
                                            <span className="bg-yellow-900/30 text-[#FFD700] px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                                                R$ 197 GRÁTIS
                                            </span>
                                        </div>
                                        <div className="space-y-3 text-slate-300 text-sm sm:text-base">
                                            <p>
                                                Leitura energética completa de <span className="text-white font-semibold">32 páginas</span> que identifica seus padrões hereditários e bloqueios invisíveis herdados dos seus ancestrais.
                                            </p>
                                            <p>
                                                <span className="text-[#FFD700] font-semibold">O que você vai descobrir:</span>
                                            </p>
                                            <ul className="space-y-2 ml-4">
                                                <li>• Qual o tipo de bloqueio ancestral você carrega</li>
                                                <li>• De qual geração veio esse padrão</li>
                                                <li>• Por que você SEMPRE trabalha mas o dinheiro nunca rende</li>
                                                <li>• Como esse bloqueio está afetando sua vida agora</li>
                                            </ul>
                                            <div className="bg-yellow-900/20 border-l-[3px] border-[#FFD700] p-3 mt-4">
                                                <p className="text-white font-semibold">
                                                    💡 Impacto: Você finalmente entende POR QUÊ dinheiro nunca sobra... não importa quanto você ganhe.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Benefit 2 */}
                                    <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border-l-4 border-purple-500 rounded-xl p-4 sm:p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-white font-bold text-lg sm:text-xl">🎧 Áudio de Reprogramação Binaural (17 min)</h3>
                                            <span className="bg-yellow-900/30 text-[#FFD700] px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                                                R$ 147 GRÁTIS
                                            </span>
                                        </div>
                                        <div className="space-y-3 text-slate-300 text-sm sm:text-base">
                                            <p>
                                                Tecnologia de <span className="text-white font-semibold">ondas binaurais</span> que trabalha diretamente no seu subconsciente enquanto você dorme ou relaxa.
                                            </p>
                                            <p>
                                                <span className="text-[#FFD700] font-semibold">Como funciona:</span>
                                            </p>
                                            <ul className="space-y-2 ml-4">
                                                <li>• Coloque o áudio para tocar antes de dormir</li>
                                                <li>• As frequências específicas (432Hz + 528Hz) dissolvem bloqueios energéticos</li>
                                                <li>• Seu cérebro entra em modo receptivo theta (sono REM)</li>
                                                <li>• Reprogramação acontece durante a noite</li>
                                            </ul>
                                            <div className="bg-green-900/20 border-l-[3px] border-green-500 p-3 mt-4">
                                                <p className="text-green-400 font-semibold">
                                                    ✅ Resultado: Pessoas relatam sensação de "peso saindo das costas" já nos primeiros 3-7 dias. Movimento financeiro inesperado em 14-21 dias.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Benefit 3 */}
                                    <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border-l-4 border-purple-500 rounded-xl p-4 sm:p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-white font-bold text-lg sm:text-xl">📋 Protocolo de 7 Dias (Passo a Passo)</h3>
                                            <span className="bg-yellow-900/30 text-[#FFD700] px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                                                R$ 247 GRÁTIS
                                            </span>
                                        </div>
                                        <div className="space-y-3 text-slate-300 text-sm sm:text-base">
                                            <p>
                                                Roteiro prático que desativa o "contrato de pobreza" ancestral em <span className="text-white font-semibold">apenas 7 dias</span>.
                                            </p>
                                            <p>
                                                <span className="text-[#FFD700] font-semibold">Cronograma diário:</span>
                                            </p>
                                            <div className="space-y-2">
                                                <div className="bg-white/5 p-3 rounded">
                                                    <h4 className="text-white font-semibold text-sm mb-1">Dia 1-2: Identificação</h4>
                                                    <p className="text-slate-400 text-xs">Leia seu mapa + identifique o padrão ancestral exato</p>
                                                </div>
                                                <div className="bg-white/5 p-3 rounded">
                                                    <h4 className="text-white font-semibold text-sm mb-1">Dia 3-4: Limpeza</h4>
                                                    <p className="text-slate-400 text-xs">Áudio binaural 2x/dia + ritual da carteira (5 min)</p>
                                                </div>
                                                <div className="bg-white/5 p-3 rounded">
                                                    <h4 className="text-white font-semibold text-sm mb-1">Dia 5-7: Ancoragem</h4>
                                                    <p className="text-slate-400 text-xs">Protocolo de abundância + visualização guiada (10 min)</p>
                                                </div>
                                            </div>
                                            <div className="bg-green-900/20 border-l-[3px] border-green-500 p-3 mt-4">
                                                <p className="text-green-400 font-semibold">
                                                    ✅ Resultado: Sentimento de leveza emocional + sincronicidades financeiras (PIX inesperado, proposta nova, promoção).
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Benefit 4 */}
                                    <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border-l-4 border-purple-500 rounded-xl p-4 sm:p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-white font-bold text-lg sm:text-xl">📱 Acesso ao Portal Mobile</h3>
                                            <span className="bg-yellow-900/30 text-[#FFD700] px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                                                INCLUSO
                                            </span>
                                        </div>
                                        <div className="space-y-3 text-slate-300 text-sm sm:text-base">
                                            <p>
                                                Plataforma online estilo app que funciona em <span className="text-white font-semibold">qualquer celular</span> (iPhone ou Android) sem precisar baixar nada.
                                            </p>
                                            <ul className="space-y-2 ml-4">
                                                <li>• Acesso vitalício 24/7</li>
                                                <li>• Funciona offline (baixe os áudios)</li>
                                                <li>• Interface intuitiva e fácil</li>
                                                <li>• Suporte técnico incluso</li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Total Value Box */}
                                    <div className="bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border-2 border-[#FFD700]/30 rounded-xl p-6 text-center">
                                        <p className="text-slate-300 text-sm mb-2">Valor Total do Pacote:</p>
                                        <p className="text-slate-400 line-through text-xl mb-2">R$ 591,00</p>
                                        <p className="text-white text-base mb-3">HOJE você paga apenas:</p>
                                        <p className="text-[#FFD700] text-4xl sm:text-5xl font-black mb-3">R$ 27,90</p>
                                        <p className="text-green-400 text-lg font-semibold">
                                            💰 Você economiza R$ 563,10 (95% OFF)
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* NEW SECTION: O QUE ACONTECE AGORA */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.0 }}
                                className="mb-12 bg-gradient-to-br from-blue-900/20 to-blue-800/10 border-2 border-blue-500/30 rounded-2xl p-6 sm:p-8"
                            >
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-center text-blue-400 mb-6">
                                    ⏱️ O QUE ACONTECE DEPOIS QUE VOCÊ CLICAR NO BOTÃO?
                                </h2>
                                
                                <div className="space-y-4 max-w-2xl mx-auto">
                                    {/* Step 1 */}
                                    <div className="flex gap-4 items-start">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                                            1
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-white font-bold text-base sm:text-lg mb-1">
                                                Você vai para a página de pagamento seguro
                                            </h3>
                                            <p className="text-slate-300 text-sm">
                                                Aceita PIX (aprovação em 5 seg) ou Cartão (até 12x). Ambiente 100% criptografado.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="flex gap-4 items-start">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                                            2
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-white font-bold text-base sm:text-lg mb-1">
                                                Pagamento confirmado = Acesso liberado na hora
                                            </h3>
                                            <p className="text-slate-300 text-sm">
                                                Você recebe um e-mail com o link de acesso. Clica, entra na plataforma, e TUDO já está lá.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="flex gap-4 items-start">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                                            3
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-white font-bold text-base sm:text-lg mb-1">
                                                Primeira noite: Você ouve o áudio antes de dormir
                                            </h3>
                                            <p className="text-slate-300 text-sm">
                                                17 minutos. Coloca fone ou deixa tocando baixinho. Seu cérebro começa a reprogramação.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Step 4 */}
                                    <div className="flex gap-4 items-start">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                                            4
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-white font-bold text-base sm:text-lg mb-1">
                                                Dias 1-7: Você segue o protocolo simples
                                            </h3>
                                            <p className="text-slate-300 text-sm">
                                                Leitura do mapa (20 min) + áudios diários (17 min) + ritual rápido (5 min).
                                            </p>
                                        </div>
                                    </div>

                                    {/* Step 5 */}
                                    <div className="flex gap-4 items-start">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                                            ✓
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-green-400 font-bold text-base sm:text-lg mb-1">
                                                Resultado: Você sente a mudança
                                            </h3>
                                            <p className="text-slate-300 text-sm">
                                                Peso emocional sai. Dinheiro que estava "preso" se move. Oportunidades aparecem. <span className="text-white font-semibold">Você finalmente respira.</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Time estimate */}
                                <div className="mt-6 text-center">
                                    <p className="text-slate-400 text-sm">
                                        ⏰ Do clique até o primeiro áudio: <span className="text-white font-bold">menos de 5 minutos</span>
                                    </p>
                                </div>
                            </motion.div>

                            {/* BLOCK 05: EXPERT AUTHORITY - Redesigned Story-Style */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 }}
                                className="mb-12 bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border-2 border-[#D4AF37] rounded-2xl p-6 sm:p-8"
                            >
                                {/* Title - Yellow, Centered */}
                                <h3 className="text-xl md:text-2xl font-bold text-[#FFD700] text-center mb-6 uppercase tracking-wide">
                                    QUEM GUIARÁ SUA JORNADA?
                                </h3>
                                
                                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                                    {/* Expert Photo - Round, Left on desktop, Top on mobile */}
                                    <div className="relative flex-shrink-0">
                                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                                            <img 
                                                src="/expert.jpg" 
                                                alt="Anahí Solara"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=388&auto=format&fit=crop";
                                                }}
                                            />
                                        </div>
                                        <div className="absolute -inset-2 bg-[#D4AF37]/20 blur-xl -z-10"></div>
                                    </div>

                                    {/* Expert Bio - Story Style */}
                                    <div className="flex-1 text-center md:text-left space-y-4">
                                        {/* Expert Name */}
                                        <p className="text-[#FFD700] font-bold text-xl md:text-2xl">
                                            Anahí Solara
                                        </p>
                                        
                                        {/* Impact Subtitle - White, Quotes, Bold */}
                                        <p className="text-white font-bold text-base md:text-lg italic">
                                            "Por 12 anos, eu fui exatamente como você."
                                        </p>
                                        
                                        {/* Story Paragraphs */}
                                        <div className="space-y-3 text-slate-300 text-sm md:text-base leading-relaxed">
                                            <p>
                                                "Trabalhava, trabalhava... mas o dinheiro sumia."
                                            </p>
                                            <p>
                                                "Não sou guru financeira. Sou Terapeuta Holística e dediquei os últimos 10 anos a decodificar os padrões ocultos da escassez."
                                            </p>
                                            <p>
                                                "...descobri a <span className="text-white font-bold">verdade brutal: é uma Herança Vibracional.</span>"
                                            </p>
                                            <p>
                                                "Este mapa não é teoria. É o exato método que salvou minha própria família da falência e já ajudou mais de <span className="text-[#FFD700] font-bold">4.000 alunos</span> a destravarem a prosperidade."
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Authority Badges - 3 Icons Side by Side */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                                    <div className="flex items-center gap-3 bg-white/5 border border-[#D4AF37]/30 rounded-xl p-4 justify-center sm:justify-start">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFD700] flex items-center justify-center">
                                            <Briefcase className="w-5 h-5 text-black" />
                                        </div>
                                        <span className="text-slate-200 text-sm font-medium">Terapeuta Holística há 10+ anos</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/5 border border-[#D4AF37]/30 rounded-xl p-4 justify-center sm:justify-start">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFD700] flex items-center justify-center">
                                            <Layers className="w-5 h-5 text-black" />
                                        </div>
                                        <span className="text-slate-200 text-sm font-medium">Especialista em Xamanismo Financeiro</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/5 border border-[#D4AF37]/30 rounded-xl p-4 justify-center sm:justify-start">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFD700] flex items-center justify-center">
                                            <Users className="w-5 h-5 text-black" />
                                        </div>
                                        <span className="text-slate-200 text-sm font-medium">Mais de 4.000 alunos transformados</span>
                                    </div>
                                </div>

                                {/* CTA Button - Gold */}
                                <div className="mt-8 text-center">
                                    <button
                                        onClick={handleCheckout}
                                        aria-label="Quero desbloquear agora"
                                        className="w-full sm:w-auto bg-gradient-to-r from-[#D4AF37] to-[#FFD700] hover:from-[#FFD700] hover:to-[#D4AF37] text-black font-black text-base sm:text-lg py-4 px-8 rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all transform hover:scale-[1.02] active:scale-95 uppercase tracking-wide"
                                    >
                                        🔓 QUERO DESBLOQUEAR AGORA
                                    </button>
                                </div>
                            </motion.div>

                            {/* BLOCK 06: SOCIAL PROOF - WhatsApp Prints */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.4 }}
                                className="mb-12"
                            >
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#FFD700] text-center mb-6 sm:mb-8 px-2">
                                    💬 Veja o que acontece quando a Trava Ancestral é quebrada:
                                </h3>

                                {/* WhatsApp Prints Carousel - Mobile Optimized */}
                                <div className="relative max-w-2xl mx-auto px-4">
                                    {/* Main Image Display */}
                                    <div 
                                        className="relative overflow-hidden rounded-2xl border-2 border-[#D4AF37]/50 shadow-[0_0_40px_rgba(212,175,55,0.3)] bg-black/50"
                                    >
                                        <AnimatePresence mode="wait">
                                            <motion.img
                                                key={currentProofIndex}
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                src={socialProofImages[currentProofIndex].src}
                                                alt={socialProofImages[currentProofIndex].alt}
                                                className="w-full h-auto object-contain"
                                                loading="lazy"
                                            />
                                        </AnimatePresence>
                                        
                                        {/* Navigation Buttons - Desktop */}
                                        <button 
                                            onClick={prevProof}
                                            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all items-center justify-center backdrop-blur-sm z-10"
                                            aria-label="Anterior"
                                        >
                                            <ChevronLeft className="w-6 h-6" />
                                        </button>
                                        <button 
                                            onClick={nextProof}
                                            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all items-center justify-center backdrop-blur-sm z-10"
                                            aria-label="Próximo"
                                        >
                                            <ChevronRight className="w-6 h-6" />
                                        </button>
                                    </div>

                                    {/* Dots Indicator - All Devices */}
                                    <div className="flex justify-center gap-2 mt-6">
                                        {socialProofImages.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentProofIndex(idx)}
                                                className={`transition-all rounded-full ${
                                                    idx === currentProofIndex 
                                                        ? 'bg-[#FFD700] w-8 h-3' 
                                                        : 'bg-white/30 hover:bg-white/50 w-3 h-3'
                                                }`}
                                                aria-label={`Ir para depoimento ${idx + 1}`}
                                            />
                                        ))}
                                    </div>

                                    {/* Mobile Navigation Buttons */}
                                    <div className="flex sm:hidden justify-center gap-4 mt-6">
                                        <button 
                                            onClick={prevProof}
                                            className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] hover:from-[#FFD700] hover:to-[#D4AF37] text-black p-4 rounded-full transition-all shadow-lg"
                                            aria-label="Anterior"
                                        >
                                            <ChevronLeft className="w-6 h-6" />
                                        </button>
                                        <button 
                                            onClick={nextProof}
                                            className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] hover:from-[#FFD700] hover:to-[#D4AF37] text-black p-4 rounded-full transition-all shadow-lg"
                                            aria-label="Próximo"
                                        >
                                            <ChevronRight className="w-6 h-6" />
                                        </button>
                                    </div>

                                    {/* Thumbnail Grid - Desktop Only */}
                                    <div className="hidden md:grid grid-cols-7 gap-2 mt-6">
                                        {socialProofImages.map((img, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentProofIndex(idx)}
                                                className={`rounded-lg overflow-hidden border-2 transition-all ${
                                                    idx === currentProofIndex 
                                                        ? 'border-[#FFD700] shadow-[0_0_10px_rgba(212,175,55,0.5)]' 
                                                        : 'border-transparent opacity-60 hover:opacity-100'
                                                }`}
                                            >
                                                <img 
                                                    src={img.src} 
                                                    alt={`Miniatura: ${img.alt}`}
                                                    className="w-full h-auto object-cover"
                                                    loading="lazy"
                                                />
                                            </button>
                                        ))}
                                    </div>

                                    {/* Image Counter - Mobile */}
                                    <div className="text-center mt-4">
                                        <p className="text-slate-400 text-sm">
                                            Depoimento {currentProofIndex + 1} de {socialProofImages.length}
                                        </p>
                                    </div>
                                </div>

                                {/* Video Testimonials Carousel - Mobile Optimized */}
                                <div className="mt-12 max-w-4xl mx-auto px-4">
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#FFD700] text-center mb-6 sm:mb-8 px-2">
                                        🎥 Veja Depoimentos Reais em Vídeo
                                    </h3>
                                    
                                    <div className="relative">
                                        {/* Video Container - Mobile First */}
                                        <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-[0_0_40px_rgba(212,175,55,0.3)] bg-black">
                                            {/* Render all videos and show/hide based on currentVideoIndex */}
                                            {videoTestimonials.map((video, idx) => (
                                                <div
                                                    key={video.id}
                                                    className={idx === currentVideoIndex ? 'block' : 'hidden'}
                                                >
                                                    <vturb-smartplayer 
                                                        id={video.playerId}
                                                        className="block mx-auto w-full max-w-[400px]"
                                                    ></vturb-smartplayer>
                                                </div>
                                            ))}
                                            
                                            {/* Navigation Buttons - Desktop */}
                                            <button 
                                                onClick={prevVideo}
                                                className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all items-center justify-center backdrop-blur-sm z-10"
                                                aria-label="Vídeo anterior"
                                            >
                                                <ChevronLeft className="w-6 h-6" />
                                            </button>
                                            <button 
                                                onClick={nextVideo}
                                                className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all items-center justify-center backdrop-blur-sm z-10"
                                                aria-label="Próximo vídeo"
                                            >
                                                <ChevronRight className="w-6 h-6" />
                                            </button>
                                        </div>

                                        {/* Dots Indicator - All Devices */}
                                        <div className="flex justify-center gap-2 mt-6">
                                            {videoTestimonials.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setCurrentVideoIndex(idx)}
                                                    className={`transition-all rounded-full ${
                                                        idx === currentVideoIndex 
                                                            ? 'bg-[#FFD700] w-8 h-3' 
                                                            : 'bg-white/30 hover:bg-white/50 w-3 h-3'
                                                    }`}
                                                    aria-label={`Ver depoimento em vídeo ${idx + 1}`}
                                                />
                                            ))}
                                        </div>

                                        {/* Mobile Navigation Buttons */}
                                        <div className="flex sm:hidden justify-center gap-4 mt-6">
                                            <button 
                                                onClick={prevVideo}
                                                className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] hover:from-[#FFD700] hover:to-[#D4AF37] text-black p-4 rounded-full transition-all shadow-lg"
                                                aria-label="Vídeo anterior"
                                            >
                                                <ChevronLeft className="w-6 h-6" />
                                            </button>
                                            <button 
                                                onClick={nextVideo}
                                                className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] hover:from-[#FFD700] hover:to-[#D4AF37] text-black p-4 rounded-full transition-all shadow-lg"
                                                aria-label="Próximo vídeo"
                                            >
                                                <ChevronRight className="w-6 h-6" />
                                            </button>
                                        </div>

                                        {/* Video Counter */}
                                        <div className="text-center mt-4">
                                            <p className="text-slate-400 text-sm">
                                                Vídeo {currentVideoIndex + 1} de {videoTestimonials.length}
                                            </p>
                                        </div>
                                    </div>
                                </div>
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
                                    Garantia Blindada de Resultado ou Reembolso
                                </h3>
                                <div className="text-slate-200 text-sm sm:text-base leading-relaxed space-y-3 max-w-2xl mx-auto px-2">
                                    <p className="font-semibold text-white">
                                        Eu confio tanto no poder deste Protocolo que assumo o risco. Acesse, ouça os áudios e faça o teste por 7 dias. Se você não sentir um peso saindo das suas costas ou não ver movimentação financeira acontecer, eu devolvo 100% do seu dinheiro. Sem perguntas, sem burocracia. É preto no branco.
                                    </p>
                                </div>
                            </motion.div>

                            {/* FAQ Section */}
                            <FAQ />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default OfferNew;

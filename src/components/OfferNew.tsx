import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Check, Shield, AlertTriangle, Sparkles, Lock, ChevronLeft, ChevronRight, Briefcase, Layers, Users, Heart, Star, Feather } from 'lucide-react';
import { FAQ } from './FAQ';
import { PricingPlans, MiniPricingBar } from './PricingPlans';

interface OfferProps {
    userName: string;
}

/**
 * OFFER PAGE - RITUAL TRANSFORMATION DESIGN
 * Complete restructure following the new Mapa Xamânico narrative
 * Architecture: Dark Mode + Purple/Gold + Ritual Decision Experience
 */

// Configuration constants
const VIDEO_PLAYER_ID = '69684ba200d5e38957970446';
const VIDEO_PLAYER_SCRIPT_URL = `https://scripts.converteai.net/c263b2f0-9566-42be-97d8-7f5920037741/players/${VIDEO_PLAYER_ID}/v4/player.js`;
// Demo delay before showing offer content (in production, this should be triggered by video events)
const OFFER_CONTENT_DELAY_MS = 5000;

const OfferNew = ({ userName }: OfferProps) => {
    const [showOfferContent, setShowOfferContent] = useState(false);
    const [currentProofIndex, setCurrentProofIndex] = useState(0);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    
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

    // Load video player script
    useEffect(() => {
        const optimizationScript = document.createElement('script');
        optimizationScript.innerHTML = '!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);';
        document.head.appendChild(optimizationScript);

        const preloadLinks = [
            { href: `https://scripts.converteai.net/c263b2f0-9566-42be-97d8-7f5920037741/players/${VIDEO_PLAYER_ID}/v4/player.js`, as: 'script' },
            { href: 'https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js', as: 'script' },
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
        playerScript.src = VIDEO_PLAYER_SCRIPT_URL;
        playerScript.async = true;
        document.head.appendChild(playerScript);

        // Show offer content after delay (in production, trigger by video events)
        const timer = setTimeout(() => {
            setShowOfferContent(true);
        }, OFFER_CONTENT_DELAY_MS);

        return () => {
            clearTimeout(timer);
            optimizationScript.remove();
            playerScript.remove();
            preloadElements.forEach(el => el.remove());
        };
    }, []);

    // Load video testimonial scripts only when offer content is shown
    useEffect(() => {
        if (!showOfferContent) return;

        const testimonialScripts: HTMLScriptElement[] = [];
        videoTestimonials.forEach(video => {
            const script = document.createElement('script');
            script.src = video.scriptUrl;
            script.async = true;
            document.head.appendChild(script);
            testimonialScripts.push(script);
        });

        return () => {
            testimonialScripts.forEach(el => el.remove());
        };
    }, [showOfferContent]);

    const scrollToPricing = () => {
        document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen relative overflow-hidden text-white bg-gradient-to-b from-[#0a0118] via-[#1a0b2e] to-[#0a0118]">
            
            {/* Mystical Background Effects */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0118] via-[#1a0b2e] to-[#0a0118]"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[150px] animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[150px]"></div>
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}></div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">

                {/* ========== SEÇÃO 1: HERO / TOPO ========== */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    {/* Pre-headline Badge */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 bg-purple-900/40 border border-purple-500/50 px-4 py-2 rounded-full mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-300 text-sm font-semibold">Ritual de Transformação Ancestral</span>
                    </motion.div>

                    {/* Main Headline */}
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight px-2">
                        "Existe uma energia invisível que sabota sua prosperidade.
                        <span className="block text-[#FFD700] mt-2">Ela não nasceu com você. Ela veio da sua linhagem."</span>
                    </h1>

                    {/* Subheadline */}
                    <div className="max-w-3xl mx-auto space-y-4 mb-8">
                        <p className="text-base sm:text-lg text-slate-300 leading-relaxed px-2">
                            Por trás das suas dificuldades com dinheiro, pode haver <span className="text-[#FFD700] font-semibold">uma lealdade inconsciente aos traumas financeiros dos seus ancestrais.</span>
                        </p>
                        <p className="text-slate-400 text-sm sm:text-base px-2">
                            Este não é mais um curso.<br />
                            É um <span className="text-white font-bold">protocolo espiritual de 7 dias para limpar os bloqueios da sua linhagem</span> e reconectar você com a abundância natural.
                        </p>
                    </div>

                    {/* Primary CTA */}
                    <motion.button
                        onClick={scrollToPricing}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-gradient-to-r from-purple-600 via-purple-500 to-[#D4AF37] hover:from-purple-500 hover:via-purple-400 hover:to-[#FFD700] text-white font-bold text-base sm:text-lg py-4 px-8 rounded-2xl shadow-[0_0_40px_rgba(147,51,234,0.4)] transition-all border border-purple-400/30"
                    >
                        Sim, quero rastrear a origem invisível da minha escassez
                    </motion.button>

                    {/* Microcopy below CTA */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap justify-center gap-4 mt-4 text-xs sm:text-sm text-slate-400"
                    >
                        <span>⚡ Leitura rápida + escolha do caminho (30s)</span>
                        <span>🔒 Pix + acesso imediato</span>
                        <span>🛡️ Garantia 7 dias</span>
                    </motion.div>
                </motion.section>

                {/* ========== VIDEO SECTION ========== */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-16"
                >
                    <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-[0_0_60px_rgba(212,175,55,0.3)] mx-auto max-w-md">
                        <div className="bg-black flex items-center justify-center relative">
                            <div className="w-full" style={{ aspectRatio: '9/16', maxWidth: '400px' }}>
                                <vturb-smartplayer 
                                    id={`vid-${VIDEO_PLAYER_ID}`}
                                    style={{ display: 'block', width: '100%', maxWidth: '400px', margin: '0 auto' }}
                                ></vturb-smartplayer>
                            </div>
                        </div>
                        <div className="absolute -inset-2 bg-[#D4AF37]/20 blur-xl -z-10"></div>
                    </div>
                </motion.section>

                {/* Content shown after video timing */}
                <AnimatePresence>
                    {showOfferContent && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >

                            {/* ========== SEÇÃO 2: AUTORIDADE / GUIA DA JORNADA ========== */}
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="mb-16 bg-gradient-to-br from-[#1a0b2e]/80 to-[#2d1b4e]/60 border-2 border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8"
                            >
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#FFD700] text-center mb-8">
                                    Quem guia esse ritual?
                                </h2>

                                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                                    {/* Expert Photo */}
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

                                    {/* Expert Bio */}
                                    <div className="flex-1 text-center md:text-left space-y-4">
                                        <p className="text-[#FFD700] font-bold text-xl md:text-2xl">
                                            Anahí Solara
                                        </p>
                                        <p className="text-slate-300 leading-relaxed">
                                            Anahí Solara é terapeuta ancestral, xamã de linhagem peruana e condutora de mais de <span className="text-[#FFD700] font-semibold">12 mil pessoas</span> em rituais de limpeza espiritual.
                                        </p>
                                        <p className="text-slate-400 leading-relaxed">
                                            Seu dom é traduzir bloqueios invisíveis em curas reais. Seu trabalho não é sobre prometer milagres — é sobre <span className="text-white font-semibold">ativar a verdade que dorme em você há gerações.</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Authority Badges */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                                    <div className="flex items-center gap-3 bg-white/5 border border-[#D4AF37]/30 rounded-xl p-4 justify-center sm:justify-start">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFD700] flex items-center justify-center">
                                            <Briefcase className="w-5 h-5 text-black" />
                                        </div>
                                        <span className="text-slate-200 text-sm font-medium">Terapeuta Holística há 10+ anos</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/5 border border-[#D4AF37]/30 rounded-xl p-4 justify-center sm:justify-start">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFD700] flex items-center justify-center">
                                            <Feather className="w-5 h-5 text-black" />
                                        </div>
                                        <span className="text-slate-200 text-sm font-medium">Xamã de Linhagem Peruana</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/5 border border-[#D4AF37]/30 rounded-xl p-4 justify-center sm:justify-start">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFD700] flex items-center justify-center">
                                            <Users className="w-5 h-5 text-black" />
                                        </div>
                                        <span className="text-slate-200 text-sm font-medium">+12.000 pessoas transformadas</span>
                                    </div>
                                </div>
                            </motion.section>

                            {/* ========== SEÇÃO 3: QUEBRA DE CRENÇA ========== */}
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="mb-16"
                            >
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-center mb-8">
                                    <span className="text-white">O problema</span> <span className="text-[#FFD700]">não é só dinheiro.</span><br />
                                    <span className="text-slate-300 text-lg sm:text-xl font-normal">É um padrão energético herdado.</span>
                                </h2>

                                <div className="space-y-6 max-w-3xl mx-auto">
                                    <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-500/30 rounded-2xl p-6">
                                        <p className="text-slate-300 leading-relaxed mb-4">
                                            Você já percebeu que vive situações repetitivas com escassez?<br />
                                            Já se perguntou por que, mesmo estudando, tentando, orando… parece que <span className="text-purple-300 font-semibold italic">algo te puxa pra baixo?</span>
                                        </p>
                                        <p className="text-slate-400 leading-relaxed">
                                            Segundo a psicogenealogia e o xamanismo, você pode estar <span className="text-white font-semibold">repetindo inconscientemente dores, crenças e traumas não resolvidos dos seus antepassados.</span>
                                        </p>
                                    </div>

                                    {/* Impact Quote */}
                                    <div className="relative bg-gradient-to-r from-red-900/30 to-orange-900/20 border-l-4 border-[#FFD700] rounded-r-2xl p-6">
                                        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#FFD700] rounded-full flex items-center justify-center">
                                            <Heart className="w-3 h-3 text-black" />
                                        </div>
                                        <p className="text-xl sm:text-2xl font-serif italic text-[#FFD700] leading-relaxed text-center">
                                            "Lealdade à dor da sua família não é amor.<br />
                                            <span className="text-white">É aprisionamento."</span>
                                        </p>
                                    </div>
                                </div>
                            </motion.section>

                            {/* ========== SEÇÃO 4: APRESENTAÇÃO DO PRODUTO ========== */}
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mb-16"
                            >
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#FFD700] text-center mb-8">
                                    O que é o Mapa Xamânico?
                                </h2>

                                {/* Mockup Image */}
                                <div className="mb-8 flex justify-center">
                                    <div className="relative p-4 bg-gradient-to-br from-purple-900/50 to-[#1a0b2e]/80 rounded-3xl">
                                        <img 
                                            src="/mockup.png" 
                                            alt="Mockup do Mapa Xamânico" 
                                            className="w-full max-w-sm rounded-2xl shadow-[0_0_40px_rgba(212,175,55,0.3)] border-2 border-[#D4AF37]/50 mix-blend-lighten"
                                            loading="lazy"
                                        />
                                        <div className="absolute -inset-4 bg-gradient-to-br from-purple-500/20 to-[#D4AF37]/10 blur-2xl -z-10"></div>
                                    </div>
                                </div>

                                <div className="max-w-3xl mx-auto">
                                    <p className="text-slate-300 text-center leading-relaxed mb-8 text-lg">
                                        É um <span className="text-white font-semibold">ritual digital de 7 dias</span> que combina:
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {[
                                            { icon: Star, text: 'Diagnóstico simbólico da sua linhagem' },
                                            { icon: Sparkles, text: 'Mapa de ativação energética personalizado' },
                                            { icon: Heart, text: 'Áudios rituais guiados' },
                                            { icon: Check, text: 'Roteiro de práticas para realinhar sua frequência com a prosperidade' }
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
                                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-[#D4AF37] flex items-center justify-center">
                                                    <item.icon className="w-5 h-5 text-white" />
                                                </div>
                                                <p className="text-slate-300 text-sm sm:text-base leading-relaxed pt-2">{item.text}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Support Quote */}
                                    <div className="mt-8 text-center">
                                        <p className="text-slate-400 italic text-base sm:text-lg">
                                            "Não é sobre manifestar riqueza.<br />
                                            É sobre <span className="text-[#FFD700] font-semibold">remover o que bloqueia o fluxo que já é seu por direito ancestral.</span>"
                                        </p>
                                    </div>
                                </div>
                            </motion.section>

                            {/* ========== SEÇÃO 5: TRÊS PLANOS (ESCOLHA SIMBÓLICA) ========== */}
                            <section id="pricing-section" className="mb-16">
                                <PricingPlans />
                            </section>

                            {/* ========== SEÇÃO 6: PROVA SOCIAL (DEPOIMENTOS WHATSAPP) ========== */}
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="mb-16"
                            >
                                {/* Section Header with Glow Effect */}
                                <div className="text-center mb-8">
                                    <motion.div 
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-900/50 to-green-900/50 border border-emerald-500/40 px-4 py-2 rounded-full mb-4"
                                    >
                                        <span className="text-2xl">💬</span>
                                        <span className="text-emerald-400 text-sm font-bold uppercase tracking-wider">Relatos Reais do WhatsApp</span>
                                    </motion.div>
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 px-2">
                                        Veja o que estão <span className="text-[#FFD700]">dizendo</span>
                                    </h3>
                                    <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto">
                                        Prints reais de pessoas que fizeram o ritual e tiveram resultados
                                    </p>
                                </div>

                                {/* WhatsApp Prints Carousel - Enhanced Mobile Design */}
                                <div className="relative max-w-md mx-auto px-4">
                                    {/* Decorative elements */}
                                    <div className="absolute -top-4 -left-4 w-20 h-20 bg-emerald-500/20 rounded-full blur-2xl"></div>
                                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#FFD700]/20 rounded-full blur-2xl"></div>
                                    
                                    {/* Main Carousel Container */}
                                    <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-3xl p-3 sm:p-4 border-2 border-emerald-500/30 shadow-[0_0_60px_rgba(16,185,129,0.2)]">
                                        {/* WhatsApp Header Mockup */}
                                        <div className="flex items-center gap-3 bg-[#075e54] rounded-t-xl px-4 py-3 mb-2">
                                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center">
                                                <span className="text-white text-lg">✨</span>
                                            </div>
                                            <div>
                                                <p className="text-white font-bold text-sm">Depoimentos Verificados</p>
                                                <p className="text-emerald-200/70 text-xs">{socialProofImages.length} relatos reais</p>
                                            </div>
                                        </div>
                                        
                                        {/* Image Container */}
                                        <div className="relative overflow-hidden rounded-2xl bg-[#0b141a]">
                                            <AnimatePresence mode="wait">
                                                <motion.img
                                                    key={currentProofIndex}
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    transition={{ duration: 0.3 }}
                                                    src={socialProofImages[currentProofIndex].src}
                                                    alt={socialProofImages[currentProofIndex].alt}
                                                    className="w-full h-auto object-contain max-h-[500px]"
                                                    loading="lazy"
                                                />
                                            </AnimatePresence>
                                            
                                            {/* Swipe indicator for mobile */}
                                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 sm:hidden">
                                                <ChevronLeft className="w-4 h-4 text-white/50" />
                                                <span className="text-white/70 text-xs">Deslize para ver mais</span>
                                                <ChevronRight className="w-4 h-4 text-white/50" />
                                            </div>
                                        </div>
                                        
                                        {/* Navigation Controls */}
                                        <div className="flex items-center justify-between mt-4 px-2">
                                            <button 
                                                onClick={prevProof}
                                                className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white p-3 rounded-full transition-all shadow-lg active:scale-95"
                                                aria-label="Anterior"
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                            
                                            {/* Progress Dots */}
                                            <div className="flex items-center gap-1.5">
                                                {socialProofImages.map((_, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setCurrentProofIndex(idx)}
                                                        className={`transition-all rounded-full ${
                                                            idx === currentProofIndex 
                                                                ? 'bg-gradient-to-r from-emerald-400 to-[#FFD700] w-6 h-2.5 shadow-[0_0_10px_rgba(16,185,129,0.5)]' 
                                                                : 'bg-white/20 hover:bg-white/40 w-2.5 h-2.5'
                                                        }`}
                                                        aria-label={`Depoimento ${idx + 1}`}
                                                    />
                                                ))}
                                            </div>
                                            
                                            <button 
                                                onClick={nextProof}
                                                className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white p-3 rounded-full transition-all shadow-lg active:scale-95"
                                                aria-label="Próximo"
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                        
                                        {/* Counter Badge */}
                                        <div className="text-center mt-3">
                                            <span className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-4 py-1.5">
                                                <span className="text-emerald-400 text-sm font-bold">{currentProofIndex + 1}</span>
                                                <span className="text-slate-500 text-sm">de</span>
                                                <span className="text-emerald-400 text-sm font-bold">{socialProofImages.length}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Trust Badges */}
                                <div className="flex flex-wrap justify-center gap-3 mt-8 px-4">
                                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                                        <Check className="w-4 h-4 text-emerald-400" />
                                        <span className="text-slate-300 text-xs">Verificados</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                                        <span className="text-lg">📱</span>
                                        <span className="text-slate-300 text-xs">WhatsApp Real</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                                        <span className="text-lg">🇧🇷</span>
                                        <span className="text-slate-300 text-xs">Brasil</span>
                                    </div>
                                </div>

                                {/* Mini Pricing Bar - Strategic Repetition after Social Proof */}
                                <div className="mt-10 max-w-lg mx-auto px-4">
                                    <MiniPricingBar />
                                </div>
                            </motion.section>

                            {/* ========== SEÇÃO 6.5: VIDEO TESTIMONIALS ========== */}
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="mb-16"
                            >
                                {/* Section Header */}
                                <div className="text-center mb-8">
                                    <motion.div 
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-900/50 to-[#D4AF37]/30 border border-[#D4AF37]/40 px-4 py-2 rounded-full mb-4"
                                    >
                                        <span className="text-2xl">✨</span>
                                        <span className="text-[#FFD700] text-sm font-bold uppercase tracking-wider">Histórias de Transformação</span>
                                    </motion.div>
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 px-2">
                                        Clientes que <span className="text-[#FFD700]">desbloquearam</span> sua prosperidade
                                    </h3>
                                    <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto">
                                        Veja quem já fez o ritual e está vivendo uma nova realidade financeira
                                    </p>
                                </div>
                                
                                {/* Video Carousel Container */}
                                <div className="relative max-w-md mx-auto px-4">
                                    {/* Decorative Glow */}
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#FFD700]/20 rounded-full blur-3xl"></div>
                                    
                                    <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-3xl p-3 sm:p-4 border-2 border-[#D4AF37]/40 shadow-[0_0_60px_rgba(212,175,55,0.2)]">
                                        {/* Video Player Header */}
                                        <div className="flex items-center justify-between bg-gradient-to-r from-[#D4AF37]/20 to-[#FFD700]/10 rounded-t-xl px-4 py-3 mb-2 border-b border-[#D4AF37]/20">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#FFD700] rounded-full flex items-center justify-center">
                                                    <span className="text-black text-xs">🎬</span>
                                                </div>
                                                <span className="text-[#FFD700] font-bold text-sm">Depoimento #{currentVideoIndex + 1}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-emerald-400 text-xs font-semibold">✓ Cliente verificado</span>
                                            </div>
                                        </div>
                                        
                                        {/* Video Player */}
                                        <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/30 bg-black">
                                            <div className="relative w-full aspect-[9/16] max-h-[500px]">
                                                {videoTestimonials.map((video, idx) => (
                                                    <div
                                                        key={video.id}
                                                        className={`absolute inset-0 transition-opacity duration-300 ${idx === currentVideoIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                                    >
                                                        <vturb-smartplayer 
                                                            id={video.playerId}
                                                            className="block w-full h-full"
                                                        ></vturb-smartplayer>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        {/* Video Selection Thumbnails */}
                                        <div className="mt-4 grid grid-cols-4 gap-2">
                                            {videoTestimonials.map((video, idx) => (
                                                <button
                                                    key={video.id}
                                                    onClick={() => setCurrentVideoIndex(idx)}
                                                    className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-300 ${
                                                        idx === currentVideoIndex 
                                                            ? 'ring-2 ring-[#FFD700] ring-offset-2 ring-offset-black scale-105 shadow-[0_0_20px_rgba(212,175,55,0.5)]' 
                                                            : 'opacity-60 hover:opacity-100 hover:scale-102'
                                                    }`}
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/30 to-[#FFD700]/10 flex items-center justify-center">
                                                        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                                            <span className="text-white text-sm font-bold">{idx + 1}</span>
                                                        </div>
                                                    </div>
                                                    {idx === currentVideoIndex && (
                                                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                                                            <span className="text-[8px] bg-[#FFD700] text-black px-1.5 py-0.5 rounded-full font-bold">ATIVO</span>
                                                        </div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                        
                                        {/* Navigation Controls */}
                                        <div className="flex items-center justify-between mt-4 px-2">
                                            <button 
                                                onClick={prevVideo}
                                                className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black p-3 rounded-full transition-all shadow-lg active:scale-95 hover:shadow-[0_0_20px_rgba(212,175,55,0.5)]"
                                                aria-label="Vídeo anterior"
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                            
                                            {/* Trust indicator */}
                                            <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-3 py-1.5">
                                                <Check className="w-4 h-4 text-emerald-400" />
                                                <span className="text-emerald-400 text-xs font-semibold">Verificado</span>
                                            </div>
                                            
                                            <button 
                                                onClick={nextVideo}
                                                className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black p-3 rounded-full transition-all shadow-lg active:scale-95 hover:shadow-[0_0_20px_rgba(212,175,55,0.5)]"
                                                aria-label="Próximo vídeo"
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.section>

                            {/* ========== SEÇÃO 7: GARANTIA ========== */}
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="mb-16 bg-gradient-to-br from-emerald-950/40 to-green-900/20 border-2 border-emerald-500/40 rounded-2xl p-6 sm:p-8 text-center"
                            >
                                <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 border-4 border-emerald-300 shadow-[0_0_30px_rgba(16,185,129,0.6)] mx-auto mb-4 sm:mb-6">
                                    <div className="text-center">
                                        <p className="text-white text-[10px] sm:text-xs font-black">GARANTIA</p>
                                        <p className="text-white text-xl sm:text-2xl font-black leading-none">7</p>
                                        <p className="text-white text-[10px] sm:text-xs font-black">DIAS</p>
                                    </div>
                                </div>

                                <h3 className="text-xl sm:text-2xl font-bold text-emerald-300 mb-4">
                                    Garantia ritual de 7 dias
                                </h3>
                                <div className="text-slate-200 text-sm sm:text-base leading-relaxed space-y-3 max-w-2xl mx-auto px-2">
                                    <p>
                                        Se em até 7 dias você não sentir nenhum tipo de desbloqueio, clareza ou transformação sutil…
                                    </p>
                                    <p className="font-semibold text-white">
                                        devolvemos seu investimento <span className="text-emerald-300">sem perguntas.</span>
                                    </p>
                                    <p className="text-slate-400 italic">
                                        Sua confiança vem primeiro. A energia do ritual só funciona com verdade.
                                    </p>
                                </div>
                            </motion.section>

                            {/* ========== SEÇÃO 8: FAQ ========== */}
                            <FAQ />

                            {/* ========== SEÇÃO 9: ENCERRAMENTO + CTA FINAL ========== */}
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                                className="mb-16 text-center"
                            >
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-6 leading-tight px-2">
                                    Você está pronto para viver com o que é seu…<br />
                                    <span className="text-[#FFD700]">ou vai continuar preso ao que foi deles?</span>
                                </h2>

                                <motion.button
                                    onClick={scrollToPricing}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] hover:from-[#FFD700] hover:to-[#D4AF37] text-black font-black text-base sm:text-lg py-5 px-10 rounded-2xl shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all border-2 border-[#FFD700]"
                                >
                                    Sim. Eu escolho romper o ciclo da escassez.
                                </motion.button>

                                <p className="text-slate-400 text-sm mt-4">
                                    <Lock className="w-4 h-4 inline mr-1" />
                                    Pagamento 100% seguro • Acesso imediato • Garantia de 7 dias
                                </p>
                            </motion.section>

                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default OfferNew;

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { 
    Check, Shield, Lock, ChevronLeft, ChevronRight, 
    Headphones, FileText, Calendar, Compass, ChevronDown,
    Dna, Key, Eye, Sparkles, Award, Globe, Users
} from 'lucide-react';

interface OfferProps {
    userName: string;
}

/**
 * OFFER PAGE - MYSTIC TECH PROTOCOL
 * Premium "Temple" experience with high-conversion design
 * Architecture: Deep Dark Mode (#0a0a0a) + Gold (#FFD700) + Glassmorphism
 * Fonts: Cinzel (titles) + Montserrat (body)
 */

// Social proof notifications for toast
const socialProofToasts = [
    { name: 'Daniel de Souza', value: 'R$ 1.900' },
    { name: 'Maria Clara S.', value: 'R$ 2.400' },
    { name: 'João Pedro M.', value: 'R$ 890' },
    { name: 'Ana Beatriz L.', value: 'R$ 3.200' },
    { name: 'Carlos Eduardo', value: 'R$ 1.450' },
];

// Social proof images
const socialProofImages = [
    { src: '/prova1.png', alt: 'Depoimento WhatsApp 1', featured: true },
    { src: '/prova2.png', alt: 'Depoimento WhatsApp 2', featured: true },
    { src: '/prova3.png', alt: 'Depoimento WhatsApp 3', featured: false },
    { src: '/prova4.png', alt: 'Depoimento WhatsApp 4', featured: false },
    { src: '/prova5.png', alt: 'Depoimento WhatsApp 5', featured: false },
    { src: '/prova6.png', alt: 'Depoimento WhatsApp 6', featured: false },
    { src: '/prova7.png', alt: 'Depoimento WhatsApp 7', featured: false },
];

// FAQ data
const faqItems = [
    {
        question: 'Funciona no meu celular?',
        answer: 'Sim, é um Portal Mobile compatível com Android e iPhone. Você acessa pelo navegador do seu celular, sem precisar baixar nenhum aplicativo.',
    },
    {
        question: 'Quanto tempo demora para ver resultados?',
        answer: 'Muitas pessoas relatam sensações de leveza e desbloqueio já nos primeiros 3 dias. Resultados mais tangíveis costumam aparecer entre 7 e 21 dias.',
    },
    {
        question: 'Posso fazer se não tiver tempo?',
        answer: 'São apenas 12 minutos por dia. Os áudios binaurais podem ser ouvidos enquanto você dorme ou descansa.',
    },
    {
        question: 'E se não funcionar?',
        answer: 'Você tem 7 dias de garantia incondicional. Se não sentir diferença, devolvemos cada centavo sem perguntas.',
    },
];

// Orbital Icons for product reveal
const orbitalFeatures = [
    { icon: Headphones, label: 'Áudios Binaurais', desc: 'Reprogramação passiva enquanto você dorme.' },
    { icon: FileText, label: 'O Mapa PDF', desc: 'Diagnóstico da sua linhagem.' },
    { icon: Shield, label: 'Ritual de Blindagem', desc: 'Proteção contra inveja e perdas.' },
    { icon: Calendar, label: 'Protocolo 7 Dias', desc: 'O passo a passo da liberação.' },
];

const OfferNew = ({ userName }: OfferProps) => {
    const [showToast, setShowToast] = useState(false);
    const [currentToast, setCurrentToast] = useState(0);
    const [activeOrbital, setActiveOrbital] = useState<number | null>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [showStickyBar, setShowStickyBar] = useState(false);
    const [timeLeft, setTimeLeft] = useState(14 * 60); // 14 minutes
    
    const journeyRef = useRef<HTMLDivElement>(null);
    const journeyInView = useInView(journeyRef, { once: true, margin: "-100px" });
    const pricingRef = useRef<HTMLDivElement>(null);
    
    // Toast notification rotation
    useEffect(() => {
        const toastInterval = setInterval(() => {
            setShowToast(true);
            setCurrentToast(prev => (prev + 1) % socialProofToasts.length);
            setTimeout(() => setShowToast(false), 4000);
        }, 8000);
        
        // Show first toast after 2 seconds
        const initialTimer = setTimeout(() => {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 4000);
        }, 2000);
        
        return () => {
            clearInterval(toastInterval);
            clearTimeout(initialTimer);
        };
    }, []);
    
    // Sticky bar visibility
    useEffect(() => {
        const handleScroll = () => {
            const journeySection = journeyRef.current;
            if (journeySection) {
                const rect = journeySection.getBoundingClientRect();
                setShowStickyBar(rect.bottom < 0);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    
    const scrollToPricing = () => {
        pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    
    const handleCheckout = (plan: string) => {
        const links: Record<string, string> = {
            basic: 'https://pay.lowify.com.br/checkout.php?product_id=manflx',
            complete: 'https://pay.lowify.com.br/go.php?offer=zsa1x42',
            vip: 'https://pay.lowify.com.br/go.php?offer=1hy3fg2',
        };
        window.location.href = links[plan] || links.complete;
    };

    return (
        <div className="min-h-screen relative overflow-hidden text-white bg-[#0a0a0a]">
            
            {/* ========== BACKGROUND: Golden Particles Video Effect ========== */}
            <div className="fixed inset-0 -z-10">
                {/* Deep dark base */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#120918] to-[#0a0a0a]" />
                
                {/* Golden particle glow effects */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FFD700]/5 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#FFD700]/3 rounded-full blur-[120px]" />
                
                {/* Floating particles simulation */}
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `radial-gradient(2px 2px at 20% 30%, #FFD700, transparent),
                                      radial-gradient(2px 2px at 60% 70%, #FFD700, transparent),
                                      radial-gradient(1px 1px at 80% 20%, #FFD700, transparent),
                                      radial-gradient(1px 1px at 40% 80%, #FFD700, transparent)`,
                    backgroundSize: '200% 200%',
                    animation: 'mysticalStars 20s ease-in-out infinite'
                }} />
                
                {/* Subtle noise texture */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }} />
            </div>
            
            {/* ========== TOAST: Social Proof Notification ========== */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 100, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="fixed top-4 right-4 z-50 glass-gold rounded-xl px-4 py-3 shadow-xl max-w-[280px]"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD700] to-[#D4AF37] flex items-center justify-center">
                                <Eye className="w-5 h-5 text-black" />
                            </div>
                            <div>
                                <p className="text-white text-sm font-semibold">
                                    {socialProofToasts[currentToast].name}
                                </p>
                                <p className="text-[#FFD700] text-xs">
                                    acabou de desbloquear <span className="font-bold">{socialProofToasts[currentToast].value}</span>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-5xl mx-auto px-4 py-8 pb-32">
                
                {/* ========== BLOCO 1: HERO SECTION ========== */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mb-16 pt-8"
                >
                    {/* Central Mystic Symbol */}
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative w-32 h-32 mx-auto mb-8"
                    >
                        {/* Glow ring */}
                        <div className="absolute inset-0 rounded-full bg-[#FFD700]/20 animate-ping" style={{ animationDuration: '3s' }} />
                        <div className="absolute inset-2 rounded-full bg-[#FFD700]/10 animate-pulse" />
                        
                        {/* Compass symbol */}
                        <div className="relative w-full h-full rounded-full glass-gold flex items-center justify-center animate-spin-slow" style={{ animationDuration: '30s' }}>
                            <Compass className="w-16 h-16 text-[#FFD700] drop-shadow-[0_0_20px_rgba(255,215,0,0.6)]" />
                        </div>
                    </motion.div>
                    
                    {/* Pre-headline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-[#FFD700] text-sm md:text-base font-semibold uppercase tracking-[0.3em] mb-4"
                    >
                        O Ritual Digital de 7 Dias
                    </motion.p>
                    
                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight px-2"
                    >
                        Quebre o Contrato de Pobreza<br />
                        <span className="text-[#FFD700] text-glow-gold">da Sua Família</span>
                        <span className="block text-2xl sm:text-3xl md:text-4xl mt-2 font-normal text-white/90">sem sair de casa.</span>
                    </motion.h1>
                    
                    {/* Sub-headline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed px-4"
                    >
                        Você não precisa trabalhar mais. Você precisa desligar a frequência de escassez 
                        que herdou dos seus pais.
                    </motion.p>
                    
                    {/* CTA Button */}
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        onClick={scrollToPricing}
                        className="relative bg-gradient-to-r from-[#FFD700] via-[#FFC000] to-[#FFD700] text-black font-bold text-lg md:text-xl py-4 px-8 md:px-12 rounded-2xl shadow-[0_0_40px_rgba(255,215,0,0.4)] hover:shadow-[0_0_60px_rgba(255,215,0,0.6)] transition-all transform hover:scale-105 active:scale-95 btn-pulse"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            QUERO ATIVAR O PROTOCOLO AGORA
                            <span className="text-2xl">➝</span>
                        </span>
                    </motion.button>
                </motion.section>
                
                {/* ========== BLOCO 2: A JORNADA (Timeline) ========== */}
                <motion.section
                    ref={journeyRef}
                    initial={{ opacity: 0, y: 40 }}
                    animate={journeyInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-20 relative"
                >
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-center text-white mb-12">
                        A Jornada do <span className="text-[#FFD700]">Desbloqueio</span>
                    </h2>
                    
                    <div className="relative max-w-2xl mx-auto">
                        {/* Golden Timeline Line */}
                        <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5">
                            <motion.div 
                                initial={{ height: 0 }}
                                animate={journeyInView ? { height: '100%' } : {}}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="timeline-line w-full"
                            />
                        </div>
                        
                        {/* Timeline Items */}
                        <div className="space-y-8">
                            {/* Item 1: O Problema */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={journeyInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.3 }}
                                className="flex gap-6 items-start"
                            >
                                <div className="relative z-10 w-16 h-16 md:w-24 md:h-24 rounded-full glass-gold flex items-center justify-center flex-shrink-0 glow-gold">
                                    <Lock className="w-8 h-8 md:w-10 md:h-10 text-[#FFD700]" />
                                </div>
                                <div className="pt-2 md:pt-4">
                                    <h3 className="font-display text-lg md:text-xl font-bold text-[#FFD700] mb-2">
                                        O Problema Oculto
                                    </h3>
                                    <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                                        Você sente que existe um teto de vidro. O dinheiro entra e some. 
                                        Dívidas antigas voltam.
                                    </p>
                                </div>
                            </motion.div>
                            
                            {/* Item 2: A Causa */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={journeyInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.6 }}
                                className="flex gap-6 items-start"
                            >
                                <div className="relative z-10 w-16 h-16 md:w-24 md:h-24 rounded-full glass-gold flex items-center justify-center flex-shrink-0 glow-gold">
                                    <Dna className="w-8 h-8 md:w-10 md:h-10 text-[#FFD700]" />
                                </div>
                                <div className="pt-2 md:pt-4">
                                    <h3 className="font-display text-lg md:text-xl font-bold text-[#FFD700] mb-2">
                                        A Causa Real
                                    </h3>
                                    <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                                        Não é sua culpa. É uma <span className="text-white font-semibold">Lealdade Invisível</span>. 
                                        Você está repetindo inconscientemente a dor financeira dos seus antepassados por "amor cego".
                                    </p>
                                </div>
                            </motion.div>
                            
                            {/* Item 3: A Solução */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={journeyInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.9 }}
                                className="flex gap-6 items-start"
                            >
                                <div className="relative z-10 w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#FFD700] to-[#D4AF37] flex items-center justify-center flex-shrink-0 shadow-[0_0_30px_rgba(255,215,0,0.5)]">
                                    <Key className="w-8 h-8 md:w-10 md:h-10 text-black" />
                                </div>
                                <div className="pt-2 md:pt-4">
                                    <h3 className="font-display text-lg md:text-xl font-bold text-[#FFD700] mb-2">
                                        A Solução
                                    </h3>
                                    <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                                        O <span className="text-white font-semibold">Mapa Xamânico</span>. Uma tecnologia sonora capaz de 
                                        reescrever essa frequência em 7 dias.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>
                
                {/* ========== BLOCO 3: A REVELAÇÃO (Product Showcase) ========== */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-20 relative"
                >
                    {/* Spotlight effect */}
                    <div className="absolute inset-0 spotlight pointer-events-none" />
                    
                    <div className="relative text-center">
                        <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                            O <span className="text-[#FFD700]">Portal</span> de Cura
                        </h2>
                        <p className="text-slate-400 mb-12 max-w-md mx-auto">
                            Tecnologia ancestral adaptada para a era digital
                        </p>
                        
                        {/* Floating Phone Mockup with Orbital Icons */}
                        <div className="relative w-64 md:w-80 mx-auto">
                            {/* Phone Mockup */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="relative z-10"
                            >
                                <div className="relative bg-gradient-to-b from-slate-800 to-slate-900 rounded-[40px] p-2 shadow-[0_0_60px_rgba(255,215,0,0.3)]">
                                    <div className="bg-black rounded-[36px] overflow-hidden">
                                        <img 
                                            src="/mockup.png" 
                                            alt="Mapa Xamânico App"
                                            className="w-full h-auto"
                                        />
                                    </div>
                                </div>
                                {/* Glow effect */}
                                <div className="absolute -inset-4 bg-[#FFD700]/20 blur-3xl -z-10 rounded-full" />
                            </motion.div>
                            
                            {/* Orbital Feature Icons */}
                            {orbitalFeatures.map((feature, index) => {
                                const positions = [
                                    { top: '-10%', left: '-30%' },
                                    { top: '-10%', right: '-30%' },
                                    { bottom: '10%', left: '-35%' },
                                    { bottom: '10%', right: '-35%' },
                                ];
                                const pos = positions[index];
                                
                                return (
                                    <motion.button
                                        key={index}
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5 + index * 0.15 }}
                                        onClick={() => setActiveOrbital(activeOrbital === index ? null : index)}
                                        className={`absolute w-14 h-14 md:w-16 md:h-16 rounded-full glass-gold flex items-center justify-center transition-all hover:scale-110 cursor-pointer ${activeOrbital === index ? 'ring-2 ring-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.5)]' : ''}`}
                                        style={pos}
                                    >
                                        <feature.icon className="w-6 h-6 md:w-7 md:h-7 text-[#FFD700]" />
                                    </motion.button>
                                );
                            })}
                        </div>
                        
                        {/* Feature Description Box */}
                        <AnimatePresence>
                            {activeOrbital !== null && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    className="mt-8 max-w-sm mx-auto glass-gold rounded-2xl p-5"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        {(() => {
                                            const Feature = orbitalFeatures[activeOrbital];
                                            return <Feature.icon className="w-6 h-6 text-[#FFD700]" />;
                                        })()}
                                        <h4 className="font-display text-lg font-bold text-[#FFD700]">
                                            {orbitalFeatures[activeOrbital].label}
                                        </h4>
                                    </div>
                                    <p className="text-slate-300 text-sm">
                                        {orbitalFeatures[activeOrbital].desc}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.section>
                
                {/* ========== BLOCO 4: A ESCOLHA (3 Tarot Cards) ========== */}
                <section ref={pricingRef} id="pricing" className="mb-20 scroll-mt-8">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
                            Escolha o Seu <span className="text-[#FFD700]">Caminho</span>
                        </h2>
                        <p className="text-slate-400 text-sm md:text-base">
                            Três níveis de profundidade para a sua jornada
                        </p>
                    </div>
                    
                    {/* Cards Container - Horizontal scroll on mobile */}
                    <div className="flex flex-col md:flex-row gap-6 md:gap-4 items-stretch justify-center overflow-x-auto pb-4 px-2">
                        
                        {/* CARD 1: O Curioso */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="flex-shrink-0 w-full md:w-72 bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-6 opacity-80"
                        >
                            <div className="text-center mb-4">
                                <span className="inline-block bg-slate-800 text-slate-400 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                                    ✨ Iniciante
                                </span>
                                <h3 className="font-display text-xl font-bold text-slate-300">O Curioso</h3>
                                <p className="text-slate-500 text-sm mt-1">Para quem quer apenas espiar.</p>
                            </div>
                            
                            <div className="text-center my-6">
                                <span className="text-4xl font-bold text-slate-300">R$ 19</span>
                            </div>
                            
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start gap-2 text-sm text-slate-400">
                                    <Check className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                                    Apenas o Mapa PDF
                                </li>
                            </ul>
                            
                            <button
                                onClick={() => handleCheckout('basic')}
                                className="w-full py-3 px-4 rounded-xl border border-slate-600 text-slate-400 font-semibold hover:bg-slate-800/50 transition-all"
                            >
                                Escolher Básico
                            </button>
                        </motion.div>
                        
                        {/* CARD 2: O Desperto (DESTACADO) */}
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex-shrink-0 w-full md:w-80 relative md:-mt-4 md:mb-4 z-10"
                        >
                            {/* Glow effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700] via-[#FFC000] to-[#FFD700] rounded-3xl blur-lg opacity-40 animate-pulse" />
                            
                            <div className="relative bg-gradient-to-br from-[#1a1508] via-[#0f0a02] to-[#1a1508] border-2 border-[#FFD700] rounded-3xl p-6 shadow-[0_0_60px_rgba(255,215,0,0.3)]">
                                {/* Tag */}
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="inline-block bg-gradient-to-r from-[#FFD700] to-[#FFC000] text-black text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                                        🔥 ESCOLHA DO ORÁCULO (MAIS VENDIDO)
                                    </span>
                                </div>
                                
                                <div className="text-center mb-4 mt-4">
                                    <h3 className="font-display text-2xl font-bold text-[#FFD700]">O Desperto</h3>
                                    <p className="text-[#FFD700]/80 text-sm mt-1">O Protocolo Completo de 7 Dias.</p>
                                </div>
                                
                                <div className="text-center my-6">
                                    <p className="text-slate-500 text-lg line-through mb-1">R$ 97</p>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-2xl text-white">por</span>
                                        <span className="text-5xl md:text-6xl font-black text-[#FFD700] text-glow-gold">R$ 29</span>
                                        <span className="text-2xl text-white">,00</span>
                                    </div>
                                </div>
                                
                                <ul className="space-y-3 mb-6">
                                    {[
                                        'Mapa Xamânico Completo',
                                        'Áudios Binaurais (3)',
                                        'Ritual de Blindagem',
                                        'Protocolo de 7 Dias',
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-white">
                                            <div className="w-5 h-5 rounded-full bg-[#39FF14]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Check className="w-3 h-3 text-[#39FF14]" />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                
                                <button
                                    onClick={() => handleCheckout('complete')}
                                    className="w-full py-4 px-6 rounded-xl bg-[#39FF14] hover:bg-[#4AFF25] text-black font-bold text-lg transition-all transform hover:scale-105 active:scale-95 btn-pulse glow-neon-green"
                                >
                                    DESTRAVAR PROSPERIDADE AGORA
                                </button>
                                
                                <p className="text-center text-[#FFD700]/60 text-xs mt-3">
                                    Pagamento único • Acesso vitalício
                                </p>
                            </div>
                        </motion.div>
                        
                        {/* CARD 3: O Mestre */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="flex-shrink-0 w-full md:w-72 bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#FFD700]/30 rounded-3xl p-6"
                        >
                            <div className="text-center mb-4">
                                <span className="inline-block bg-gradient-to-r from-[#FFD700]/20 to-[#D4AF37]/20 text-[#FFD700] text-xs font-semibold px-3 py-1 rounded-full mb-3 border border-[#FFD700]/30">
                                    ✨ VIP / ACESSO VITALÍCIO
                                </span>
                                <h3 className="font-display text-xl font-bold text-white">O Mestre</h3>
                                <p className="text-slate-400 text-sm mt-1">Para quem quer reescrever o destino.</p>
                            </div>
                            
                            <div className="text-center my-6">
                                <span className="text-4xl font-bold text-[#FFD700]">R$ 49</span>
                            </div>
                            
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start gap-2 text-sm text-slate-300">
                                    <Check className="w-4 h-4 text-[#FFD700] mt-0.5 flex-shrink-0" />
                                    Tudo do Completo +
                                </li>
                                <li className="flex items-start gap-2 text-sm text-slate-300">
                                    <Check className="w-4 h-4 text-[#FFD700] mt-0.5 flex-shrink-0" />
                                    Grupo Secreto por 30 dias
                                </li>
                                <li className="flex items-start gap-2 text-sm text-slate-300">
                                    <Check className="w-4 h-4 text-[#FFD700] mt-0.5 flex-shrink-0" />
                                    Ritual Extra Exclusivo
                                </li>
                            </ul>
                            
                            <button
                                onClick={() => handleCheckout('vip')}
                                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#D4AF37] text-black font-semibold hover:from-[#FFC000] hover:to-[#FFD700] transition-all"
                            >
                                Quero Experiência VIP
                            </button>
                        </motion.div>
                    </div>
                </section>
                
                {/* ========== BLOCO 5: O MURAL DA VERDADE (Social Proof) ========== */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-center text-white mb-3">
                        Veja o que acontece na <span className="text-[#FFD700]">conta bancária</span>
                    </h2>
                    <p className="text-center text-slate-400 mb-10 text-sm md:text-base">
                        de quem quebra o contrato:
                    </p>
                    
                    {/* Masonry Grid */}
                    <div className="masonry-grid px-2">
                        {socialProofImages.map((img, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`masonry-item ${img.featured ? 'md:col-span-1' : ''}`}
                            >
                                <div className={`glass rounded-2xl overflow-hidden border ${img.featured ? 'border-[#FFD700]/40 shadow-[0_0_20px_rgba(255,215,0,0.2)]' : 'border-white/10'}`}>
                                    <img 
                                        src={img.src} 
                                        alt={img.alt}
                                        className="w-full h-auto"
                                        loading="lazy"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    
                    {/* Stats Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-10 flex flex-wrap justify-center gap-4"
                    >
                        <div className="glass-gold rounded-full px-6 py-3 flex items-center gap-2">
                            <Users className="w-5 h-5 text-[#FFD700]" />
                            <span className="text-white font-semibold">+4.000 alunos transformados</span>
                        </div>
                    </motion.div>
                </motion.section>
                
                {/* ========== BLOCO 6: AUTORIDADE (Storytelling) ========== */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <div className="glass rounded-3xl border border-[#FFD700]/30 p-6 md:p-10 max-w-3xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                            {/* Photo */}
                            <div className="relative flex-shrink-0">
                                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-[#FFD700] shadow-[0_0_30px_rgba(255,215,0,0.4)]">
                                    <img 
                                        src="/expert.jpg" 
                                        alt="Anahí Solara"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -inset-2 bg-[#FFD700]/20 blur-2xl -z-10 rounded-full" />
                            </div>
                            
                            {/* Content */}
                            <div className="text-center md:text-left">
                                <h3 className="font-display text-xl md:text-2xl font-bold text-[#FFD700] mb-2">
                                    Anahí Solara
                                </h3>
                                <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-4">
                                    Por <strong className="text-white">12 anos</strong>, eu fui exatamente como você: 
                                    trabalhava 14h por dia, mas o dinheiro sempre fugia. Eu achava que era azar.
                                    Até que, em uma <strong className="text-[#FFD700]">imersão com Xamãs nos Andes</strong>, 
                                    descobri a verdade: a pobreza não é falta de esforço. É uma Herança Vibracional.
                                </p>
                                
                                {/* Authority Badges */}
                                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                    <span className="inline-flex items-center gap-1 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-full px-3 py-1 text-xs text-[#FFD700]">
                                        <Award className="w-3 h-3" /> 12 Anos
                                    </span>
                                    <span className="inline-flex items-center gap-1 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-full px-3 py-1 text-xs text-[#FFD700]">
                                        <Globe className="w-3 h-3" /> 15 Países
                                    </span>
                                    <span className="inline-flex items-center gap-1 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-full px-3 py-1 text-xs text-[#FFD700]">
                                        <Users className="w-3 h-3" /> +4.000 Alunos
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>
                
                {/* ========== BLOCO 7: GARANTIA & FAQ ========== */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    {/* Guarantee */}
                    <div className="text-center mb-12">
                        <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="inline-flex items-center justify-center w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#FFD700] to-[#D4AF37] border-4 border-[#FFD700] shadow-[0_0_40px_rgba(255,215,0,0.5)] mx-auto mb-4"
                        >
                            <div className="text-center">
                                <p className="text-black text-xs font-bold">GARANTIA</p>
                                <p className="text-black text-2xl font-black">7</p>
                                <p className="text-black text-xs font-bold">DIAS</p>
                            </div>
                        </motion.div>
                        
                        <h3 className="font-display text-xl md:text-2xl font-bold text-[#FFD700] mb-3">
                            Risco Zero
                        </h3>
                        <p className="text-slate-300 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
                            Teste por 7 dias. Se não sentir o peso saindo das costas, 
                            eu devolvo cada centavo. <span className="text-white font-semibold">Sem letras miúdas.</span>
                        </p>
                    </div>
                    
                    {/* FAQ Accordion */}
                    <div className="max-w-2xl mx-auto">
                        <h3 className="font-display text-xl md:text-2xl font-bold text-center text-white mb-6">
                            Perguntas <span className="text-[#FFD700]">Frequentes</span>
                        </h3>
                        
                        <div className="space-y-3">
                            {faqItems.map((faq, index) => (
                                <div 
                                    key={index}
                                    className="glass rounded-xl border border-[#FFD700]/20 overflow-hidden"
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        className="w-full flex items-center justify-between p-4 text-left"
                                    >
                                        <span className="font-semibold text-white text-sm md:text-base pr-4">
                                            {faq.question}
                                        </span>
                                        <ChevronDown 
                                            className={`w-5 h-5 text-[#FFD700] transition-transform ${openFaq === index ? 'rotate-180' : ''}`} 
                                        />
                                    </button>
                                    
                                    <AnimatePresence>
                                        {openFaq === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <div className="px-4 pb-4 border-t border-[#FFD700]/10 pt-3">
                                                    <p className="text-slate-300 text-sm leading-relaxed">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>
                
                {/* Final CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <button
                        onClick={() => handleCheckout('complete')}
                        className="bg-gradient-to-r from-[#39FF14] to-[#32CD32] text-black font-bold text-lg md:text-xl py-4 px-10 rounded-2xl shadow-[0_0_40px_rgba(57,255,20,0.4)] hover:shadow-[0_0_60px_rgba(57,255,20,0.6)] transition-all transform hover:scale-105 active:scale-95 btn-pulse"
                    >
                        QUERO DESTRAVAR MINHA PROSPERIDADE
                    </button>
                    
                    <p className="text-slate-500 text-sm mt-4 flex items-center justify-center gap-4">
                        <span className="flex items-center gap-1">
                            <Lock className="w-4 h-4" /> Pix Seguro
                        </span>
                        <span className="flex items-center gap-1">
                            <Sparkles className="w-4 h-4" /> Acesso Imediato
                        </span>
                        <span className="flex items-center gap-1">
                            <Shield className="w-4 h-4" /> 7 Dias Garantia
                        </span>
                    </p>
                </motion.div>
            </div>
            
            {/* ========== STICKY FOOTER (Mobile) ========== */}
            <AnimatePresence>
                {showStickyBar && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-t border-[#FFD700]/30 p-4 md:hidden"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-white text-sm font-semibold">Oferta expira em</p>
                                <p className="text-[#FFD700] text-lg font-bold font-mono">{formatTime(timeLeft)}</p>
                            </div>
                            <button
                                onClick={() => handleCheckout('complete')}
                                className="bg-[#39FF14] text-black font-bold py-3 px-6 rounded-xl text-sm whitespace-nowrap glow-neon-green"
                            >
                                LIBERAR ACESSO
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default OfferNew;

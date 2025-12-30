import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Check, Shield, Clock, AlertTriangle, Headphones, FileText, Sparkles, Lock } from 'lucide-react';
import { FAQ } from './FAQ';

interface OfferProps {
    userName: string;
}

/**
 * OFFER PAGE - PROFESSIONAL CONVERSION OPTIMIZATION
 * Following the complete technical specification for high-converting sales page
 * Architecture: Dark Mode + Gold Accents + Psychological Conversion Triggers
 */
const OfferNew = ({ userName }: OfferProps) => {
    const [showOfferContent, setShowOfferContent] = useState(false);
    
    // Price configuration
    const priceOld = "497,00";
    const priceNew = "27,90";
    const priceInstallment = "2,89";

    // Load video player script
    useEffect(() => {
        const optimizationScript = document.createElement('script');
        optimizationScript.innerHTML = '!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);';
        document.head.appendChild(optimizationScript);

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

        const playerScript = document.createElement('script');
        playerScript.src = 'https://scripts.converteai.net/c263b2f0-9566-42be-97d8-7f5920037741/players/69435dab1452433694dabfb7/v4/player.js';
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

    const handleCheckout = () => {
        window.location.href = 'https://www.seguropagamentos.com.br/mapa-xamanico';
    };

    return (
        <div className="min-h-screen relative overflow-hidden text-white bg-[#000000]">
            {/* Dark Forest Background with Mystical Effects */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-[#021a0a] via-[#000000] to-[#021a0a]"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#D4AF37]/3 rounded-full blur-[150px] animate-pulse"></div>
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}></div>
            </div>

            <div className="max-w-[800px] mx-auto px-4 py-8">
                {/* BLOCK 01: HERO SECTION - Dynamic Headline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-6"
                >
                    <h1 className="text-2xl md:text-3xl font-black uppercase text-[#FFD700] mb-4 tracking-wide">
                        DIAGNÓSTICO DE {userName.toUpperCase()} CONCLUÍDO:<br/>
                        <span className="text-white">SEU BLOQUEIO ANCESTRAL FOI IDENTIFICADO</span>
                    </h1>
                </motion.div>

                {/* Urgency Microcopy Above Video */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-r from-[#8B0000] to-[#CC0000] border border-red-500/50 rounded-lg px-4 py-2 mb-4 text-center"
                >
                    <p className="text-sm md:text-base text-white font-semibold">
                        🔒 Este vídeo contém a leitura da sua frequência e será deletado do servidor em breve.
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
                                id="vid-69435dab1452433694dabfb7" 
                                style={{ display: 'block', width: '100%', maxWidth: '400px', margin: '0 auto' }}
                            ></vturb-smartplayer>
                        </div>
                    </div>
                    {/* Glow effect */}
                    <div className="absolute -inset-2 bg-[#D4AF37]/20 blur-xl -z-10"></div>
                </motion.div>

                {/* BLOCK 03: THE OFFER - Hidden until video timing */}
                <AnimatePresence>
                    {showOfferContent && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* PIX VACCINE BOX - CRITICAL */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="bg-gradient-to-r from-[#8B0000]/20 to-[#CC0000]/20 border-2 border-dashed border-yellow-500 rounded-xl p-6 mb-8"
                            >
                                <div className="flex items-start gap-4">
                                    <AlertTriangle className="w-8 h-8 text-yellow-500 flex-shrink-0 animate-pulse" />
                                    <div>
                                        <p className="text-yellow-500 font-bold text-lg mb-2">⚠️ AVISO DE SEGURANÇA</p>
                                        <p className="text-white text-sm md:text-base leading-relaxed">
                                            Devido à natureza energética do Mapa, o link de ativação expira automaticamente se o pagamento não for confirmado em <span className="font-bold text-yellow-500">15 minutos</span>. 
                                            Evite o bloqueio do seu CPF no sistema: <span className="font-bold">finalize sua inscrição agora</span>.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* PRICE ANCHORING STACK */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border-2 border-[#D4AF37] rounded-3xl p-8 mb-8 relative overflow-hidden"
                            >
                                {/* Pulsing glow */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-3xl blur-lg opacity-20 animate-pulse"></div>
                                
                                <div className="relative">
                                    <div className="text-center mb-8">
                                        <p className="text-slate-400 text-sm uppercase tracking-wider mb-4">
                                            <Clock className="inline w-4 h-4 mr-2" />
                                            Oferta Exclusiva para {userName}
                                        </p>
                                        
                                        {/* Price Stack */}
                                        <div className="space-y-4">
                                            {/* Old Price */}
                                            <div>
                                                <p className="text-slate-500 text-sm">Valor da Sessão Individual:</p>
                                                <p className="text-2xl text-slate-500 line-through">R$ {priceOld}</p>
                                            </div>

                                            {/* New Price Label */}
                                            <div>
                                                <p className="text-white text-lg font-medium">Taxa Única de Ativação:</p>
                                            </div>

                                            {/* GIANT PRICE - GREEN */}
                                            <div className="my-6">
                                                <p className="text-[#00FF41] text-sm md:text-base font-semibold mb-2">
                                                    12x de
                                                </p>
                                                <p className="text-7xl md:text-8xl font-black text-[#00FF41] leading-none">
                                                    R${priceInstallment}
                                                </p>
                                                <p className="text-white text-xl mt-4">
                                                    ou R$ {priceNew} à vista
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA BUTTON */}
                                    <button
                                        onClick={handleCheckout}
                                        className="w-full bg-gradient-to-r from-[#00FF41] to-[#00CC33] hover:from-[#00CC33] hover:to-[#00FF41] text-black font-black text-lg md:text-xl py-6 px-8 rounded-2xl shadow-[0_0_40px_rgba(0,255,65,0.6)] transition-all transform hover:scale-[1.02] active:scale-95 uppercase tracking-wide mb-3"
                                    >
                                        SIM, QUERO DESTRAVAR MEU FLUXO AGORA
                                    </button>

                                    {/* Subtexto do Botão */}
                                    <p className="text-center text-[#00FF41] text-sm font-semibold flex items-center justify-center gap-2">
                                        <Lock className="w-4 h-4" />
                                        📩 Acesso Imediato ao Protocolo via E-mail
                                    </p>

                                    {/* Trust Badge */}
                                    <div className="flex items-center justify-center gap-2 mt-4 text-slate-400 text-sm">
                                        <Shield className="w-5 h-5 text-emerald-400" />
                                        <span>Pagamento 100% Seguro</span>
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
                                <h2 className="text-2xl md:text-3xl font-black text-center text-[#FFD700] mb-8">
                                    O Que Você Vai Receber Imediatamente
                                </h2>

                                {/* Mockup Visual */}
                                <div className="flex justify-center mb-8">
                                    <div className="relative max-w-md w-full px-4">
                                        <img 
                                            src="/mockup.png" 
                                            alt="Mapa Xamânico Completo"
                                            className="w-full h-auto rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
                                        />
                                        <div className="absolute -inset-4 bg-gradient-to-br from-[#D4AF37]/20 to-[#FFD700]/20 blur-3xl -z-10"></div>
                                    </div>
                                </div>

                                {/* Benefits Bullets */}
                                <div className="space-y-4 max-w-2xl mx-auto">
                                    {[
                                        {
                                            icon: FileText,
                                            title: 'O Mapa da Frequência',
                                            desc: 'Descubra exatamente onde está o vazamento de dinheiro na sua vida.'
                                        },
                                        {
                                            icon: Sparkles,
                                            title: 'Protocolo de 7 Dias',
                                            desc: 'O passo a passo simples para limpar a energia estagnada.'
                                        },
                                        {
                                            icon: Headphones,
                                            title: 'Áudios de Reprogramação',
                                            desc: 'Desbloqueie sua mente enquanto você dorme.'
                                        },
                                        {
                                            icon: Shield,
                                            title: 'Bônus: Ritual de Blindagem da Casa',
                                            desc: 'Proteja seu espaço das energias de escassez.'
                                        }
                                    ].map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.8 + idx * 0.1 }}
                                            className="flex items-start gap-4 bg-white/5 border border-[#D4AF37]/30 rounded-xl p-4"
                                        >
                                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#00FF41] to-[#00CC33] flex items-center justify-center">
                                                <Check className="w-6 h-6 text-black" />
                                            </div>
                                            <div>
                                                <p className="text-white font-bold text-lg mb-1">✅ {item.title}</p>
                                                <p className="text-slate-300 text-sm">{item.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* BLOCK 05: EXPERT AUTHORITY */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 }}
                                className="mb-12 bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-[#D4AF37]/30 rounded-2xl p-8"
                            >
                                <h3 className="text-xl md:text-2xl font-bold text-[#FFD700] text-center mb-6">
                                    Quem guiará sua jornada?
                                </h3>
                                
                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    {/* Expert Photo */}
                                    <div className="relative flex-shrink-0">
                                        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#D4AF37]">
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
                                    <div className="flex-1 text-center md:text-left">
                                        <p className="text-slate-200 leading-relaxed text-sm md:text-base">
                                            "Eu sou <span className="text-[#FFD700] font-bold">Anahí Solara</span>. Não sou guru financeira. 
                                            Sou Terapeuta Holística e dediquei os últimos <span className="text-white font-semibold">10 anos</span> a decodificar 
                                            os padrões ocultos da escassez. Este mapa não é teoria. É o exato método que salvou minha 
                                            própria família da falência e já ajudou mais de <span className="text-[#FFD700] font-bold">4.000 alunos</span> a 
                                            destravarem a prosperidade."
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* BLOCK 06: SOCIAL PROOF - WhatsApp Screenshots */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.4 }}
                                className="mb-12"
                            >
                                <h3 className="text-xl md:text-2xl font-bold text-[#FFD700] text-center mb-8">
                                    💬 O que os alunos estão dizendo
                                </h3>

                                <div className="space-y-4 max-w-2xl mx-auto">
                                    {[
                                        {
                                            name: 'Maria Silva',
                                            text: 'Meu Deus, fiz o ritual ontem e hoje já recebi um dinheiro que não esperava! 😱',
                                            time: '2 dias atrás'
                                        },
                                        {
                                            name: 'João Santos',
                                            text: 'Achei que seria difícil, mas é muito simples e os áudios são maravilhosos. 🙏',
                                            time: '5 dias atrás'
                                        },
                                        {
                                            name: 'Ana Costa',
                                            text: 'Acabei de receber no e-mail, tudo certinho. Obrigada! ✨',
                                            time: '1 hora atrás'
                                        }
                                    ].map((testimonial, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 1.6 + idx * 0.1 }}
                                            className="bg-[#1a1a1a] border border-[#D4AF37]/20 rounded-xl p-4"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFD700] flex items-center justify-center text-black font-bold">
                                                    {testimonial.name[0]}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-white font-semibold text-sm mb-1">{testimonial.name}</p>
                                                    <p className="text-slate-300 text-sm mb-2">{testimonial.text}</p>
                                                    <p className="text-slate-500 text-xs">{testimonial.time}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* BLOCK 07: GUARANTEE */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.8 }}
                                className="mb-12 bg-gradient-to-br from-emerald-950/40 to-green-900/20 border-2 border-emerald-500/40 rounded-2xl p-8 text-center"
                            >
                                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 border-4 border-emerald-300 shadow-[0_0_30px_rgba(16,185,129,0.6)] mx-auto mb-6">
                                    <div className="text-center">
                                        <p className="text-white text-xs font-black">GARANTIA</p>
                                        <p className="text-white text-2xl font-black leading-none">7</p>
                                        <p className="text-white text-xs font-black">DIAS</p>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-emerald-300 mb-4">
                                    GARANTIA BLINDADA DE RESULTADO
                                </h3>
                                <div className="text-slate-200 leading-relaxed space-y-3 max-w-2xl mx-auto">
                                    <p className="font-semibold text-white">
                                        "Você não tem risco nenhum. Entre, faça o Mapa, use os áudios por 7 dias. 
                                        Se você não sentir o peso saindo das suas costas, eu devolvo 100% do seu dinheiro. 
                                        Sem perguntas. Basta um e-mail."
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

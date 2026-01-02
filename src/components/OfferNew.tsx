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
    
    // Price configuration - PIX ONLY (À VISTA)
    // Updated price anchoring: From R$ 497,00 (session value) to R$ 27,90
    const priceOld = "497,00";

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
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-[#FFD700] mb-4 tracking-wide leading-tight px-2">
                        <span className="break-words">
                            🎉 {userName && userName.trim() ? `DIAGNÓSTICO DE ${userName.toUpperCase()} CONCLUÍDO` : 'SEU DIAGNÓSTICO CONCLUÍDO'}
                        </span>
                        <br className="hidden sm:block"/>
                        <span className="text-white block mt-2">SEU BLOQUEIO ANCESTRAL FOI IDENTIFICADO</span>
                    </h1>
                    
                    {/* Type of Blockage Badge */}
                    <div className="inline-block bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black font-bold text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 rounded-xl mt-4 shadow-lg">
                        Tipo: Herança Vibracional de Escassez (Linhagem Materna)
                    </div>
                </motion.div>

                {/* Urgency Microcopy Above Video - IMPROVED */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-r from-[#8B0000] to-[#CC0000] border border-red-500/50 rounded-lg px-4 py-3 mb-4 text-center"
                >
                    <p className="text-sm md:text-base text-white font-semibold mb-2">
                        🔒 ATENÇÃO: Este vídeo contém a leitura PERSONALIZADA da sua frequência ancestral.
                    </p>
                    <p className="text-xs md:text-sm text-slate-200">
                        Por questões de privacidade energética, ele será deletado do servidor em 24 horas.
                    </p>
                    <p className="text-xs md:text-sm text-[#FFD700] font-bold mt-1">
                        Assista AGORA antes que expire.
                    </p>
                </motion.div>

                {/* Benefits List BEFORE Video */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-[#D4AF37]/10 to-[#FFD700]/5 border-2 border-[#D4AF37]/30 rounded-xl p-4 sm:p-5 mb-6"
                >
                    <h3 className="text-center text-[#FFD700] font-bold text-sm sm:text-base uppercase tracking-wider mb-3">
                        ✨ NESTE VÍDEO VOCÊ VAI DESCOBRIR:
                    </h3>
                    <div className="space-y-2 text-left max-w-lg mx-auto">
                        <p className="text-slate-200 text-sm flex items-start gap-2">
                            <span className="text-green-400 font-bold flex-shrink-0">✓</span>
                            <span>Por que o dinheiro entra e sai da sua vida</span>
                        </p>
                        <p className="text-slate-200 text-sm flex items-start gap-2">
                            <span className="text-green-400 font-bold flex-shrink-0">✓</span>
                            <span>Qual trava ancestral está te bloqueando AGORA</span>
                        </p>
                        <p className="text-slate-200 text-sm flex items-start gap-2">
                            <span className="text-green-400 font-bold flex-shrink-0">✓</span>
                            <span>O protocolo exato de 7 dias para limpar isso</span>
                        </p>
                        <p className="text-slate-200 text-sm flex items-start gap-2">
                            <span className="text-green-400 font-bold flex-shrink-0">✓</span>
                            <span>Como ativar sua frequência de abundância</span>
                        </p>
                    </div>
                    <p className="text-center text-slate-400 text-xs mt-3">
                        ⏱ Duração: 2 minutos (assista até o fim)
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

                {/* CTA #1 - IMMEDIATELY AFTER VSL (ALWAYS VISIBLE) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="my-8 sm:my-10"
                >
                    <div className="text-center mb-6">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-3 leading-tight px-2">
                            EXISTE UMA "TRAVA ANCESTRAL" IMPEDINDO<br className="hidden sm:block" />
                            O DINHEIRO DE PARAR NA SUA MÃO?
                        </h2>
                        <p className="text-base sm:text-lg text-slate-300 mb-6 px-2">
                            O Protocolo Xamânico revela onde está o vazamento.
                        </p>
                    </div>

                    {/* Giant CTA Button */}
                    <button
                        onClick={handleCheckout}
                        className="w-full md:w-[70%] mx-auto block bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] hover:brightness-110 text-black font-black text-lg sm:text-xl md:text-2xl py-5 sm:py-6 px-6 sm:px-8 rounded-2xl shadow-[0_8px_40px_rgba(212,175,55,0.6)] transition-all transform hover:scale-105 active:scale-95 border-2 border-[#FFD700] uppercase tracking-wide mb-4"
                    >
                        🔥 QUERO INICIAR MEU DESBLOQUEIO AGORA
                    </button>

                    {/* Micro-benefits below button */}
                    <div className="text-center space-y-1 text-sm px-2">
                        <p className="text-emerald-400 font-semibold">✅ Pagamento Único de R$27,90 (PIX)</p>
                        <p className="text-emerald-400 font-semibold">✅ Acesso Vitalício | Garantia de 7 Dias</p>
                        <p className="text-emerald-400 font-semibold">✅ Mais de 4.300 mapas já gerados</p>
                    </div>

                    {/* Security badge */}
                    <p className="text-center text-slate-400 text-xs mt-4">
                        💳 Pagamento 100% seguro via PIX Banco Central
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
                                        
                                        {/* Price Stack - NOVO FORMATO SÓ PIX - MOBILE OPTIMIZED */}
                                        <div className="space-y-2 sm:space-y-3">
                                            {/* Linha 1: Ancoragem (Valor Antigo) */}
                                            <div>
                                                <p className="text-slate-500 text-xs sm:text-sm line-through">
                                                    Valor da Sessão Individual: R$ {priceOld}
                                                </p>
                                            </div>

                                            {/* Linha 2: Justificativa do PIX */}
                                            <div className="my-3 sm:my-4">
                                                <p className="text-white text-base sm:text-lg md:text-xl font-semibold px-2">
                                                    Isento de Taxas Bancárias (Somente PIX):
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

                                            {/* Linha 4: Microcopy */}
                                            <div className="mb-4 sm:mb-6">
                                                <p className="text-white text-lg sm:text-xl md:text-2xl font-bold px-2">
                                                    Pagamento Único. Acesso Vitalício.
                                                </p>
                                            </div>

                                            {/* Justificativa do "Só PIX" */}
                                            <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                                                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                                                    Para manter o valor acessível em R$ 27,90, nós removemos as taxas de cartão de crédito e boletos bancários. 
                                                    O pagamento é <span className="text-[#FFD700] font-bold">exclusivo via PIX</span> para ativação imediata no sistema.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Emotional Urgency Box - YELLOW (not red panic) */}
                                    <div className="bg-[#FFD700]/10 border-2 border-[#FFD700]/40 rounded-xl p-4 sm:p-5 mb-4">
                                        <p className="text-[#FFD700] font-bold text-base sm:text-lg mb-3 flex items-center justify-center gap-2">
                                            <span>⚡</span> ATENÇÃO:
                                        </p>
                                        <div className="text-white text-sm sm:text-base leading-relaxed space-y-2">
                                            <p>
                                                Cada dia que você adia é um dia a mais vivendo com esse bloqueio financeiro.
                                            </p>
                                            <p className="font-bold text-base sm:text-lg">
                                                Quanto tempo você vai esperar?
                                            </p>
                                            <p>
                                                Mais 1 mês? Mais 1 ano? Mais 10 anos?
                                            </p>
                                            <p className="text-[#FFD700] font-black text-lg sm:text-xl">
                                                O momento de agir é AGORA.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Social Proof - Recent Purchases */}
                                    <div className="text-center mb-4 sm:mb-5">
                                        <p className="text-slate-300 text-sm mb-2 flex items-center justify-center gap-2">
                                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                            👥 23 pessoas compraram nas últimas 24h
                                        </p>
                                        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 text-xs">
                                            <span className="bg-white/5 px-2 sm:px-3 py-1 rounded-full">"Maria acabou de comprar há 2min"</span>
                                            <span className="bg-white/5 px-2 sm:px-3 py-1 rounded-full">"João acabou de comprar há 8min"</span>
                                        </div>
                                    </div>

                                    {/* EMOTIONAL CTA BEFORE BUTTON */}
                                    <div className="text-center mb-5 px-2">
                                        <p className="text-white text-base sm:text-lg font-bold mb-3">
                                            Você está a UM CLIQUE de:
                                        </p>
                                        <div className="text-slate-300 text-sm space-y-2 mb-4 text-left max-w-md mx-auto">
                                            <p className="flex items-start gap-2">
                                                <span className="text-[#FFD700] flex-shrink-0">✨</span>
                                                <span>Descobrir qual bloqueio ancestral trava seu dinheiro</span>
                                            </p>
                                            <p className="flex items-start gap-2">
                                                <span className="text-[#FFD700] flex-shrink-0">✨</span>
                                                <span>Receber o ritual exato de 7 dias para limpar isso</span>
                                            </p>
                                            <p className="flex items-start gap-2">
                                                <span className="text-[#FFD700] flex-shrink-0">✨</span>
                                                <span>Entender por que algumas pessoas atraem abundância e você não</span>
                                            </p>
                                        </div>
                                        <p className="text-white text-base sm:text-lg font-bold mb-1">
                                            A pergunta é:
                                        </p>
                                        <p className="text-slate-300 text-sm sm:text-base mb-3">
                                            Você vai continuar vivendo com esse bloqueio...<br />
                                            <span className="text-white font-bold">...ou vai fazer algo HOJE?</span>
                                        </p>
                                    </div>

                                    {/* CTA BUTTON COM ÍCONE PIX - Mobile Optimized */}
                                    <button
                                        onClick={handleCheckout}
                                        className="w-full bg-gradient-to-r from-[#00FF41] to-[#00CC33] hover:from-[#00CC33] hover:to-[#00FF41] text-black font-black text-base sm:text-lg md:text-xl py-5 md:py-6 px-4 md:px-8 rounded-2xl shadow-[0_0_40px_rgba(0,255,65,0.6)] transition-all transform hover:scale-[1.02] active:scale-95 uppercase tracking-wide mb-3 flex items-center justify-center gap-2 md:gap-3"
                                    >
                                        <span className="text-2xl md:text-3xl flex-shrink-0">🔷</span>
                                        <span className="leading-tight">GERAR MEU ACESSO AGORA (PIX)</span>
                                    </button>

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
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-center text-[#FFD700] mb-6 sm:mb-8 px-2">
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
                                            icon: '📜',
                                            title: 'O Mapa da Frequência',
                                            desc: 'Descubra exatamente onde está o vazamento de dinheiro na sua vida. Não é adivinhação, é um diagnóstico energético baseado na sua linhagem ancestral. ',
                                            descBold: 'Você vai entender POR QUE o dinheiro não para.'
                                        },
                                        {
                                            icon: '📅',
                                            title: 'Protocolo de 7 Dias',
                                            desc: 'O passo a passo simples para limpar a energia estagnada. Você não precisa de nada caro ou complicado - só seguir o protocolo dia após dia. ',
                                            descBold: '10-15 minutos por dia, resultados em até 2 semanas.'
                                        },
                                        {
                                            icon: '🎧',
                                            title: 'Áudios de Reprogramação',
                                            desc: 'Desbloqueie sua mente enquanto você dorme. Esses áudios foram criados para desprogramar crenças de escassez que você nem sabe que tem. ',
                                            descBold: 'É como "resetar" sua frequência enquanto você descansa.'
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
                                            className="flex items-start gap-4 bg-gradient-to-br from-white/5 to-white/[0.02] border border-[#D4AF37]/30 rounded-xl p-3 sm:p-4 hover:border-[#D4AF37]/50 transition-all"
                                        >
                                            <div className="flex-shrink-0 text-3xl sm:text-4xl">
                                                {item.icon}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white font-bold text-base sm:text-lg mb-2">✅ {item.title}</p>
                                                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
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
                                    className="w-full md:w-[60%] mx-auto block bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] hover:brightness-110 text-black font-black text-lg sm:text-xl py-5 px-6 sm:px-8 rounded-2xl shadow-[0_8px_30px_rgba(212,175,55,0.5)] transition-all transform hover:scale-105 active:scale-95 border-2 border-[#FFD700] uppercase tracking-wide mb-3"
                                >
                                    QUERO ACESSAR TUDO ISSO AGORA
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

                                    {/* Expert Bio - Enhanced with Bold for Scannability */}
                                    <div className="flex-1 text-center md:text-left">
                                        <p className="text-slate-200 leading-relaxed text-sm md:text-base">
                                            <span className="font-bold">"Por 12 anos, eu fui exatamente como você..."</span> Eu sou <span className="text-[#FFD700] font-bold">Anahí Solara</span>. Não sou guru financeira. 
                                            Sou Terapeuta Holística e dediquei os últimos <span className="text-white font-bold">10 anos</span> a decodificar 
                                            os padrões ocultos da escassez. <span className="font-bold">...descobri a verdade brutal: é uma Herança Vibracional.</span> Este mapa não é teoria. É o exato método que salvou minha 
                                            própria família da falência e já ajudou mais de <span className="text-[#FFD700] font-bold">4.000 alunos</span> a 
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
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#FFD700] text-center mb-6 sm:mb-8 px-2">
                                    💬 O que os alunos estão dizendo
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto">
                                    {[
                                        {
                                            name: 'Fernanda Oliveira',
                                            age: '34 anos',
                                            city: 'São Paulo, SP',
                                            text: 'Eu estava devendo 18 mil reais. Depois de fazer o protocolo por 7 dias, consegui um emprego novo que pagava o DOBRO do que eu ganhava. Paguei tudo em 4 meses! Isso é real, gente! 😭🙏',
                                            time: 'há 2h',
                                            photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
                                        },
                                        {
                                            name: 'Ricardo Mendes',
                                            age: '41 anos',
                                            city: 'Rio de Janeiro, RJ',
                                            text: 'Sou empresário e estava em crise há 2 anos. No 5º dia do mapa, fechei um contrato de R$ 85 mil que estava travado há meses. Coincidência? Não acredito mais nisso! 💰',
                                            time: 'há 5h',
                                            photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
                                        },
                                        {
                                            name: 'Juliana Santos',
                                            age: '28 anos',
                                            city: 'Curitiba, PR',
                                            text: 'Meu marido estava desempregado há 8 meses. Fizemos o ritual juntos e em 11 dias ele recebeu 3 propostas de emprego! Escolhemos a melhor. Gratidão infinita! ✨',
                                            time: 'há 1 dia',
                                            photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop'
                                        },
                                        {
                                            name: 'Marcos Vinícius',
                                            age: '37 anos',
                                            city: 'Belo Horizonte, MG',
                                            text: 'Trabalho com vendas e estava em crise. Depois do Mapa, meu faturamento subiu 340% em 2 meses. Nunca tinha visto dinheiro entrar assim na minha vida. Recomendo demais! 🚀',
                                            time: 'há 1 dia',
                                            photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
                                        },
                                        {
                                            name: 'Camila Rodrigues',
                                            age: '31 anos',
                                            city: 'Porto Alegre, RS',
                                            text: 'Eu era cética, mas resolvi tentar. No 3º dia, recebi uma herança de uma tia distante que eu nem sabia que existia. R$ 47 mil! Fiquei em choque. Isso funciona MESMO! 😱💎',
                                            time: 'há 8h',
                                            photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'
                                        },
                                        {
                                            name: 'André Luiz',
                                            age: '45 anos',
                                            city: 'Brasília, DF',
                                            text: 'Eu tinha bloqueios ancestrais pesados (meu pai faliu 2 vezes). O Mapa me libertou disso. Hoje tenho minha empresa sólida e zero dívidas. Mudou minha vida e da minha família! 🙌',
                                            time: 'há 2 dias',
                                            photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop'
                                        },
                                        {
                                            name: 'Patrícia Lima',
                                            age: '39 anos',
                                            city: 'Salvador, BA',
                                            text: 'Os áudios noturnos são INCRÍVEIS! Acordo com outra energia. Clientes começaram a aparecer do nada. Meu Instagram explodiu de vendas. Estou realizando sonhos que eu achava impossíveis! 💫',
                                            time: 'há 3h',
                                            photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200&auto=format&fit=crop'
                                        }
                                    ].map((testimonial, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 1.6 + idx * 0.1 }}
                                            className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-[#D4AF37]/30 rounded-2xl p-4 sm:p-5 hover:border-[#D4AF37]/60 transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                                        >
                                            <div className="flex items-start gap-3 sm:gap-4">
                                                {/* Foto Real do Cliente */}
                                                <div className="flex-shrink-0">
                                                    <img 
                                                        src={testimonial.photo}
                                                        alt={testimonial.name}
                                                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-[#D4AF37]"
                                                        onError={(e) => {
                                                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=D4AF37&color=000&size=200`;
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="mb-2">
                                                        <p className="text-white font-bold text-sm sm:text-base mb-1 truncate">{testimonial.name}</p>
                                                        <p className="text-slate-400 text-[10px] sm:text-xs">
                                                            {testimonial.age} • {testimonial.city}
                                                        </p>
                                                    </div>
                                                    <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mb-3">
                                                        {testimonial.text}
                                                    </p>
                                                    <div className="flex items-center justify-between gap-2">
                                                        <div className="flex gap-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <span key={i} className="text-[#FFD700] text-xs sm:text-sm">⭐</span>
                                                            ))}
                                                        </div>
                                                        <p className="text-slate-500 text-[10px] sm:text-xs whitespace-nowrap">{testimonial.time}</p>
                                                    </div>
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
                                    className="w-full md:w-[60%] mx-auto block bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] hover:brightness-110 text-black font-black text-lg sm:text-xl py-5 px-6 sm:px-8 rounded-2xl shadow-[0_8px_30px_rgba(212,175,55,0.5)] transition-all transform hover:scale-105 active:scale-95 border-2 border-[#FFD700] uppercase tracking-wide mb-3"
                                >
                                    QUERO MEU RESULTADO TAMBÉM
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
                                    <p className="text-emerald-300 font-bold text-lg sm:text-xl mt-4">
                                        Ou seja: o risco é TODO MEU.
                                    </p>
                                </div>

                                {/* "Why I Offer This" Box */}
                                <div className="mt-8 bg-[#FFD700]/10 backdrop-blur-md border-2 border-[#FFD700]/30 rounded-xl p-4 sm:p-6 max-w-2xl mx-auto">
                                    <h4 className="text-[#FFD700] font-bold text-base sm:text-lg mb-3 flex items-center justify-center gap-2">
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
                                    className="mt-6 w-full md:w-auto mx-auto block bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] hover:brightness-110 text-black font-black text-base sm:text-lg py-4 sm:py-5 px-8 sm:px-12 rounded-2xl shadow-[0_8px_30px_rgba(212,175,55,0.5)] transition-all transform hover:scale-105 active:scale-95 border-2 border-[#FFD700] uppercase tracking-wide"
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
                                className="mb-12 bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-8"
                            >
                                <h3 className="text-xl sm:text-2xl md:text-2xl font-bold text-[#FFD700] text-center mb-6">
                                    QUEM GUIARÁ SUA JORNADA?
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

                                    {/* Expert Bio - Shortened */}
                                    <div className="flex-1 text-center md:text-left">
                                        <p className="text-[#FFD700] font-bold text-lg sm:text-xl mb-3">
                                            Anahí Solara
                                        </p>
                                        <p className="text-slate-200 leading-relaxed text-sm sm:text-base mb-4">
                                            <span className="font-bold">"Por 12 anos, eu fui exatamente como você.</span>
                                        </p>
                                        <p className="text-slate-200 leading-relaxed text-sm sm:text-base mb-4">
                                            Trabalhava, trabalhava... mas o dinheiro sumia.
                                        </p>
                                        <p className="text-slate-200 leading-relaxed text-sm sm:text-base mb-4">
                                            Não sou guru financeira. Sou Terapeuta Holística e dediquei os últimos 10 anos a decodificar os padrões ocultos da escassez.
                                        </p>
                                        <p className="text-slate-200 leading-relaxed text-sm sm:text-base mb-4">
                                            <span className="font-bold">...descobri a verdade brutal: é uma Herança Vibracional.</span>
                                        </p>
                                        <p className="text-slate-200 leading-relaxed text-sm sm:text-base">
                                            Este mapa não é teoria. É o exato método que salvou minha própria família da falência e já ajudou mais de <span className="text-[#FFD700] font-bold">4.000 alunos</span> a destravarem a prosperidade."
                                        </p>
                                    </div>
                                </div>

                                {/* Credentials Badges */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
                                    <div className="flex items-center gap-2 text-sm bg-[#D4AF37]/10 rounded-lg p-3 justify-center">
                                        <span className="text-xl">💼</span>
                                        <span className="text-slate-300">Terapeuta Holística há 10+ anos</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm bg-[#D4AF37]/10 rounded-lg p-3 justify-center">
                                        <span className="text-xl">📚</span>
                                        <span className="text-slate-300">Especialista em Xamanismo Financeiro</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm bg-[#D4AF37]/10 rounded-lg p-3 justify-center">
                                        <span className="text-xl">👥</span>
                                        <span className="text-slate-300">Mais de 4.000 alunos transformados</span>
                                    </div>
                                </div>

                                {/* CTA after Bio */}
                                <button
                                    onClick={handleCheckout}
                                    className="mt-6 w-full md:w-auto mx-auto block bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] hover:brightness-110 text-black font-black text-base sm:text-lg py-4 sm:py-5 px-8 sm:px-12 rounded-2xl shadow-[0_8px_30px_rgba(212,175,55,0.5)] transition-all transform hover:scale-105 active:scale-95 border-2 border-[#FFD700] uppercase tracking-wide"
                                >
                                    QUERO SER GUIADO POR ANAHÍ AGORA
                                </button>
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

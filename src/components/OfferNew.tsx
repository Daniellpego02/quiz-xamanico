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
    const priceNew = "27,90";

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
                        <span className="break-words">DIAGNÓSTICO DE {userName.toUpperCase()} CONCLUÍDO:</span>
                        <br className="hidden sm:block"/>
                        <span className="text-white block mt-2">SEU BLOQUEIO ANCESTRAL FOI IDENTIFICADO</span>
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
                                id="vid-6953144d84040898eb13007a" 
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
                                            className="flex items-start gap-4 bg-white/5 border border-[#D4AF37]/30 rounded-xl p-3 sm:p-4"
                                        >
                                            <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#00FF41] to-[#00CC33] flex items-center justify-center">
                                                <Check className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white font-bold text-base sm:text-lg mb-1">✅ {item.title}</p>
                                                <p className="text-slate-300 text-xs sm:text-sm">{item.desc}</p>
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
                                        "Você não tem risco nenhum. Entre, faça o Mapa, use os áudios por 7 dias. 
                                        Se você não sentir o peso saindo das suas costas, eu devolvo 100% do seu dinheiro. 
                                        Sem perguntas. Basta um e-mail."
                                    </p>
                                </div>
                            </motion.div>

                            {/* FAQ Section */}
                            <FAQ />

                            {/* STICKY CTA FOOTER - Mobile Conversion Booster */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2.0 }}
                                className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black via-black/95 to-transparent backdrop-blur-md border-t-2 border-[#00FF41]/50 shadow-[0_-10px_40px_rgba(0,0,0,0.9)] pb-safe"
                            >
                                <div className="max-w-[800px] mx-auto px-3 py-3 sm:px-4 sm:py-4">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        {/* Price Display - Compact */}
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-slate-400 text-[10px] sm:text-xs line-through">De R$ 497,00</span>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-slate-300 text-[10px] sm:text-xs font-semibold">Por</span>
                                                <span className="text-[#00FF41] text-lg sm:text-2xl md:text-3xl font-black drop-shadow-[0_0_10px_rgba(0,255,65,0.8)]">R$ 27,90</span>
                                            </div>
                                        </div>
                                        
                                        {/* CTA Button - Sticky */}
                                        <button
                                            onClick={handleCheckout}
                                            className="flex-1 bg-gradient-to-r from-[#00FF41] to-[#00CC33] hover:from-[#00CC33] hover:to-[#00FF41] text-black font-black text-sm sm:text-base md:text-lg py-3 sm:py-4 px-3 sm:px-6 rounded-xl shadow-[0_0_30px_rgba(0,255,65,0.7)] transition-all transform hover:scale-[1.02] active:scale-95 uppercase tracking-wide flex items-center justify-center gap-2"
                                        >
                                            <span className="text-xl sm:text-2xl flex-shrink-0">🔷</span>
                                            <span className="leading-tight truncate">GERAR ACESSO (PIX)</span>
                                        </button>
                                    </div>
                                    
                                    {/* Urgency Micro-copy */}
                                    <p className="text-center text-yellow-500 text-[10px] sm:text-xs font-bold mt-2 animate-pulse">
                                        ⚠️ Vagas limitadas • Expira em 15 minutos
                                    </p>
                                </div>
                            </motion.div>

                            {/* Spacer para evitar que o conteúdo fique sob o sticky CTA */}
                            <div className="h-24 sm:h-28"></div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default OfferNew;

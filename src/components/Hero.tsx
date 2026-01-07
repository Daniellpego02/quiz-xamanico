import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle, Clock, Mail, Smartphone, Sparkles, AlertTriangle, Compass } from 'lucide-react';
import { tracking } from '../utils/tracking';
import { SacredGeometry, RitualButton } from './ritual';

interface HeroProps {
  onStart: () => void;
}

// Mapa de estados brasileiros
const ESTADOS_BR: Record<string, string> = {
  'AC': 'Acre', 'AL': 'Alagoas', 'AP': 'Amapá', 'AM': 'Amazonas',
  'BA': 'Bahia', 'CE': 'Ceará', 'DF': 'Distrito Federal', 'ES': 'Espírito Santo',
  'GO': 'Goiás', 'MA': 'Maranhão', 'MT': 'Mato Grosso', 'MS': 'Mato Grosso do Sul',
  'MG': 'Minas Gerais', 'PA': 'Pará', 'PB': 'Paraíba', 'PR': 'Paraná',
  'PE': 'Pernambuco', 'PI': 'Piauí', 'RJ': 'Rio de Janeiro', 'RN': 'Rio Grande do Norte',
  'RS': 'Rio Grande do Sul', 'RO': 'Rondônia', 'RR': 'Roraima', 'SC': 'Santa Catarina',
  'SP': 'São Paulo', 'SE': 'Sergipe', 'TO': 'Tocantins'
};

// Style for headline underline - extracted for maintainability
const headlineUnderlineStyle: React.CSSProperties = {
  textDecoration: 'underline',
  textDecorationColor: 'rgba(201, 162, 39, 0.5)',
  textDecorationThickness: '2px',
  textUnderlineOffset: '4px',
  textDecorationSkipInk: 'none'
};

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  const [userState, setUserState] = useState<string>('Brasil');
  const [isLoadingState, setIsLoadingState] = useState(true);

  useEffect(() => {
    // Detectar estado do usuário via geolocalização IP
    const detectUserState = async () => {
      try {
        // Try ipinfo.io first (more reliable and has better rate limits)
        const ipinfoResponse = await fetch('https://ipinfo.io/json');
        if (ipinfoResponse.ok) {
          const ipinfoData = await ipinfoResponse.json();
          if (ipinfoData.region) {
            // ipinfo.io returns full state names for Brazil
            setUserState(ipinfoData.region);
            setIsLoadingState(false);
            return;
          }
        }
      } catch (error) {
        console.log('ipinfo.io geolocation failed, trying ipapi.co');
      }

      try {
        // Fallback to ipapi.co
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data.region_code && ESTADOS_BR[data.region_code]) {
          setUserState(ESTADOS_BR[data.region_code]);
        } else if (data.region) {
          setUserState(data.region);
        }
      } catch (error) {
        // If all APIs fail, use generic 'Brasil'
        console.log('Geolocation detection failed, using default');
      } finally {
        setIsLoadingState(false);
      }
    };

    detectUserState();
  }, []);

  const handleStartClick = () => {
    // Track quiz start with new comprehensive tracking
    tracking.quiz.started();
    tracking.meta.lead({ content_name: 'Quiz Iniciado' });
    onStart();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-[100dvh] max-w-lg mx-auto relative overflow-hidden portal-entrance"
    >
      {/* ═══ SACRED GEOMETRY BACKGROUND ═══ */}
      <SacredGeometry 
        variant="mandala" 
        size={600} 
        opacity={0.04}
        className="top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <SacredGeometry 
        variant="energy-field" 
        size={400} 
        opacity={0.15}
        className="top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      
      {/* ═══ AMBIENT PARTICLES ═══ */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#C9A227]/40 pointer-events-none"
          style={{
            left: `${15 + (i * 10)}%`,
            top: `${20 + (i % 3) * 25}%`
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, (i % 2 === 0 ? 10 : -10), 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3
          }}
        />
      ))}
      
      {/* ═══ TOPO - Ceremonial Header ═══ */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full bg-gradient-to-r from-[#0a0510] via-[#1a0a2e] to-[#0a0510] border-b border-[#C9A227]/30 py-2 sm:py-4 px-4 relative z-20"
        style={{
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5), 0 0 40px rgba(201, 162, 39, 0.1)',
        }}
      >
        {/* Decorative top line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A227]/50 to-transparent" />
        
        <div className="flex items-center justify-center gap-3">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Lock className="w-5 h-5 text-[#C9A227] drop-shadow-[0_0_12px_rgba(201,162,39,0.8)]" />
          </motion.div>
          <p className="text-[11px] sm:text-xs font-ritual font-bold text-[#C9A227] tracking-[0.2em] uppercase ritual-text-glow">
            DIAGNÓSTICO DE FREQUÊNCIA FINANCEIRA
          </p>
        </div>
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center px-3 sm:px-4 py-2 sm:py-4 md:py-6 space-y-2 sm:space-y-3 md:space-y-4 text-center relative z-10 hero-section">
        {/* ═══ Ambient energy field ═══ */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full pointer-events-none -z-10"
          style={{
            background: 'radial-gradient(circle, rgba(201, 162, 39, 0.08) 0%, transparent 60%)'
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ═══ HEADLINE PRINCIPAL - Ceremonial Typography ═══ */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
          className="space-y-2"
        >
          <h1 className="text-[20px] sm:text-[26px] md:text-[36px] lg:text-[42px] font-black text-white leading-[1.25] break-words ritual-text-glow">
            Existe Uma <span className="text-[#C9A227] inline-block" style={headlineUnderlineStyle}>"TRAVA ANCESTRAL"</span>{' '}
            <span className="text-[#FF4500] animate-pulse">SUFOCANDO</span>{' '}
            <span className="text-[#C9A227] font-extrabold">R$5-50 MIL</span>{' '}
            da Sua Conta Bancária?
          </h1>
          {/* SUBHEADLINE - Updated per optimization requirements */}
          <p className="text-[13px] sm:text-sm md:text-base text-slate-300 leading-relaxed font-medium px-1">
            Descubra como <strong className="text-white font-extrabold">DESTRUÍ-LA</strong> em 7 dias e destravar sua abundância <span className="text-[#4ade80] font-bold">AGORA</span>.
          </p>
        </motion.div>

        {/* ═══ RITUAL CARD - Sacred container ═══ */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          className="w-full ritual-card p-3 sm:p-4 md:p-5 space-y-2 sm:space-y-2.5 md:space-y-3"
          style={{
            borderColor: 'rgba(201, 162, 39, 0.4)',
            boxShadow: '0 0 40px rgba(201, 162, 39, 0.15), inset 0 1px 0 rgba(201, 162, 39, 0.1)'
          }}
        >
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#4ade80] animate-energy-pulse flex-shrink-0" />
            <p className="text-[14px] sm:text-base md:text-lg font-extrabold text-white">
              Responda 6 perguntas rápidas <span className="text-[#4ade80]">(2 minutos)</span>
            </p>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-200 font-semibold">Você vai descobrir:</p>
          <div className="text-left space-y-1.5 sm:space-y-2 text-[12px] sm:text-sm md:text-base text-slate-200">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex items-start gap-2"
            >
              <CheckCircle className="w-4 h-4 text-[#4ade80] flex-shrink-0 mt-0.5" />
              <p>Qual bloqueio ancestral está drenando seu dinheiro</p>
            </motion.div>
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="flex items-start gap-2"
            >
              <CheckCircle className="w-4 h-4 text-[#4ade80] flex-shrink-0 mt-0.5" />
              <p>O protocolo de 7 dias que <strong className="text-[#C9A227]">89%</strong> relatam resultados nos primeiros 3 dias</p>
            </motion.div>
          </div>
        </motion.div>

        {/* ═══ PARÁGRAFO EXPLICATIVO ═══ */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="max-w-[600px] mx-auto"
        >
          <p className="text-xs sm:text-sm md:text-base text-white/90 leading-relaxed">
            Usado por <strong className="text-[#C9A227] font-bold">4.387 brasileiros {!isLoadingState && `no ${userState}`}</strong>.
            <br />
            Identifica <strong className="text-[#C9A227] font-bold">EXATAMENTE</strong> o bloqueio que trava seu dinheiro.
          </p>
        </motion.div>

        {/* ═══ LISTA DE CONFIANÇA - Ritual trust badges ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="grid grid-cols-2 gap-1.5 sm:gap-2 md:gap-3 w-full text-white/80 text-[11px] sm:text-xs"
        >
          <div className="flex items-center justify-center gap-1 sm:gap-1.5 bg-[#1a0a2e]/60 backdrop-blur-sm rounded-lg p-1.5 sm:p-2 border border-[#C9A227]/20">
            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C9A227] flex-shrink-0" />
            <p className="truncate">Menos de 2 min</p>
          </div>
          <div className="flex items-center justify-center gap-1 sm:gap-1.5 bg-[#1a0a2e]/60 backdrop-blur-sm rounded-lg p-1.5 sm:p-2 border border-[#C9A227]/20">
            <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C9A227] flex-shrink-0" />
            <p className="truncate">Sem e-mail</p>
          </div>
          <div className="flex items-center justify-center gap-1 sm:gap-1.5 bg-[#1a0a2e]/60 backdrop-blur-sm rounded-lg p-1.5 sm:p-2 border border-[#C9A227]/20">
            <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C9A227] flex-shrink-0" />
            <p className="truncate">100% privado</p>
          </div>
          <div className="flex items-center justify-center gap-1 sm:gap-1.5 bg-[#1a0a2e]/60 backdrop-blur-sm rounded-lg p-1.5 sm:p-2 border border-[#C9A227]/20">
            <Smartphone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C9A227] flex-shrink-0" />
            <p className="truncate">Resultado na tela</p>
          </div>
        </motion.div>

        {/* ═══ IMAGEM BEFORE/AFTER - Hidden on mobile per optimization requirements ═══ */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="w-full space-y-1.5 sm:space-y-2 md:space-y-3 hero-image hidden sm:block"
        >
          <p className="text-sm sm:text-base md:text-lg font-black text-white">
            Onde você está hoje?
          </p>
          
          <div className="relative border-2 border-[#FFD700]/60 rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.2)] w-full">
            <div className="relative w-full" style={{ paddingBottom: '50%' }}>
              <img 
                src="/banner principal.png" 
                alt="Transformação - Antes e Depois" 
                className="absolute top-0 left-0 w-full h-full object-contain"
                style={{ objectFit: 'contain', maxHeight: '100%' }}
              />
            </div>
          </div>
          <div className="space-y-0.5 sm:space-y-1">
            <p className="text-[11px] sm:text-xs font-bold text-[#FF4500]">
              Você está no lado ESQUERDO?
            </p>
            <div className="flex items-center justify-center gap-1.5 sm:gap-2">
              <p className="text-[12px] sm:text-sm font-bold text-[#4ade80]">
                Vamos levar você para o lado DIREITO em 7 dias!
              </p>
              <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4ade80] flex-shrink-0" />
            </div>
          </div>
        </motion.div>

        {/* CARD DE URGÊNCIA - Hidden on mobile, visible on tablet+ */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="w-full bg-gradient-to-br from-[#2a0606]/95 to-[#0a0202]/95 backdrop-blur-sm border-2 border-[#FF0000]/70 rounded-lg p-3 md:p-4 space-y-2 shadow-[0_0_40px_rgba(255,0,0,0.3)] hidden sm:block"
        >
          <div className="flex items-center justify-center gap-2">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <AlertTriangle className="w-5 h-5 text-[#FF0000] flex-shrink-0" />
            </motion.div>
            <p className="text-sm md:text-base font-black text-[#FF0000] uppercase tracking-wide">
              ⚠️ ATENÇÃO: VAGAS LIMITADAS
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-white font-bold">
              SOMENTE <span className="text-[#C9A227] text-base font-black">12 VAGAS</span> DISPONÍVEIS HOJE
            </p>
            <p className="text-[10px] text-red-300 font-semibold mt-1">
              🔒 Próxima liberação apenas amanhã às 9h
            </p>
          </div>
        </motion.div>

        {/* ═══ CTA PRINCIPAL - RITUAL ARTIFACT BUTTON ═══ */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5, ease: "easeOut" }}
          className="w-full relative"
        >
          {/* Sacred glow behind button */}
          <motion.div 
            className="absolute -inset-2 rounded-2xl opacity-60"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(201, 162, 39, 0.4) 0%, transparent 70%)'
            }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <RitualButton 
            onClick={handleStartClick} 
            pulse 
            size="lg"
            className="w-full cta-button-sticky"
          >
            <motion.span
              animate={{ 
                rotate: [0, 15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.span>
            <span className="tracking-tight">DESCOBRIR MINHA TRAVA ANCESTRAL AGORA</span>
          </RitualButton>
          
          {/* Micro-copy below button - New addition per requirements */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="text-center text-[11px] sm:text-xs text-slate-300 mt-2 px-2"
          >
            ✨ Junto com 4.387 brasileiros que já destravaram seus mapas
          </motion.p>
        </motion.div>

        {/* ═══ CARD PROVA SOCIAL - Ritual testimonial container ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="w-full ritual-card p-3 sm:p-4 md:p-5 space-y-1.5 sm:space-y-2 md:space-y-3"
          style={{
            borderColor: 'rgba(74, 222, 128, 0.4)',
            boxShadow: '0 0 30px rgba(74, 222, 128, 0.15), inset 0 1px 0 rgba(74, 222, 128, 0.1)'
          }}
        >
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#4ade80] flex-shrink-0" />
            <p className="text-[13px] sm:text-base md:text-lg font-black text-[#4ade80]">
              JÁ DESTRAVARAM <span className="text-[#C9A227]">4.387+</span> PESSOAS
            </p>
          </div>
          <p className="text-[12px] sm:text-sm md:text-base font-bold text-[#C9A227]">
            Resultados comuns no 1º mês:
          </p>
          <div className="text-left space-y-1.5 sm:space-y-2 text-[11px] sm:text-sm md:text-base text-slate-300">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.4 }}
              className="flex items-start gap-2"
            >
              <CheckCircle className="w-4 h-4 text-[#4ade80] flex-shrink-0 mt-0.5" />
              <p>✓ <span className="text-[#C9A227] font-bold">R$5k-50k</span> via Pix inesperados</p>
            </motion.div>
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.4 }}
              className="flex items-start gap-2"
            >
              <CheckCircle className="w-4 h-4 text-[#4ade80] flex-shrink-0 mt-0.5" />
              <p>✓ Clientes antigos pagando dívidas</p>
            </motion.div>
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.4 }}
              className="flex items-start gap-2"
            >
              <CheckCircle className="w-4 h-4 text-[#4ade80] flex-shrink-0 mt-0.5" />
              <p>✓ Propostas chegando sem você buscar</p>
            </motion.div>
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.4 }}
              className="flex items-start gap-2"
            >
              <CheckCircle className="w-4 h-4 text-[#4ade80] flex-shrink-0 mt-0.5" />
              <p>✓ Dinheiro parando na conta</p>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

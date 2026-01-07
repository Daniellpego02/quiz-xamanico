import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { Lock, CheckCircle, Clock, Mail, Shield, Smartphone, Sparkles, Compass, AlertTriangle, ChevronRight } from 'lucide-react';
import { tracking } from '../utils/tracking';

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

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  const [userState, setUserState] = useState<string>('SP, RJ, MG, PR');
  const [isLoadingState, setIsLoadingState] = useState(true);

  useEffect(() => {
    // Detectar estado do usuário via geolocalização IP
    const detectUserState = async () => {
      try {
        // Tenta usar API de geolocalização gratuita
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data.region_code && ESTADOS_BR[data.region_code]) {
          setUserState(ESTADOS_BR[data.region_code]);
        } else if (data.region) {
          setUserState(data.region);
        }
      } catch (error) {
        // Fallback: mantém os estados padrão
        console.log('Geolocation detection skipped');
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
      className="flex flex-col min-h-[100dvh] max-w-lg mx-auto relative overflow-hidden"
    >
      {/* TOPO - Enhanced with better styling */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full bg-gradient-to-r from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e] border-b-2 border-[#D4AF37]/40 py-4 px-4 relative z-20"
        style={{
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 4px 20px rgba(212, 175, 55, 0.15)',
        }}
      >
        <div className="flex items-center justify-center gap-3">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Lock className="w-5 h-5 text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
          </motion.div>
          <p className="text-[11px] sm:text-xs font-bold text-[#D4AF37] tracking-[0.15em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            🔒 DIAGNÓSTICO DE FREQUÊNCIA FINANCEIRA
          </p>
        </div>
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-3 md:py-6 space-y-3 md:space-y-4 text-center relative z-10">
        {/* Ambient glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#D4AF37]/10 rounded-full blur-[80px] pointer-events-none -z-10"></div>

        {/* HEADLINE PRINCIPAL */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
          className="space-y-2"
        >
          <h1 className="text-[20px] sm:text-[28px] md:text-[40px] lg:text-[48px] font-black text-white leading-[1.15] drop-shadow-2xl break-words">
            Existe Uma <span className="text-[#FFD700]">"TRAVA ANCESTRAL"</span>{' '}
            <span className="text-[#FF4500]">SUFOCANDO</span>{' '}
            <span className="text-[#FFD700]">R$5-50 MIL</span>{' '}
            da Sua Conta Bancária?
          </h1>
          {/* SUBHEADLINE */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300/70 leading-relaxed">
            Descubra como <strong className="text-white">DESTRUÍ-LA</strong> em 7 dias e destravar o fluxo de abundância AGORA
          </p>
        </motion.div>

        {/* CAIXA DESTACADA - Card com glass effect */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          className="w-full bg-gradient-to-br from-[#1a0d2e]/80 to-[#0a0520]/80 backdrop-blur-sm border-2 border-[#FFD700]/50 rounded-xl p-4 md:p-5 space-y-2.5 md:space-y-3 shadow-[0_0_30px_rgba(255,215,0,0.2)]"
        >
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5 text-[#FFD700]" />
            <p className="text-base sm:text-lg md:text-xl font-bold text-white">
              Responda 6 perguntas rápidas (2 minutos)
            </p>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 font-semibold">Você vai descobrir:</p>
          <div className="text-left space-y-2 text-xs sm:text-sm md:text-base text-slate-200">
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
              <p>Onde ele começou na sua linhagem (e o ritual pra <strong className="text-white">PARAR</strong> hoje)</p>
            </motion.div>
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex items-start gap-2"
            >
              <CheckCircle className="w-4 h-4 text-[#4ade80] flex-shrink-0 mt-0.5" />
              <p>O protocolo de 7 dias que <strong className="text-[#FFD700]">89%</strong> relatam dinheiro inesperado (Pix, propostas, clientes antigos pagando) nos primeiros 3 dias</p>
            </motion.div>
          </div>
        </motion.div>

        {/* PARÁGRAFO EXPLICATIVO */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="max-w-[600px] mx-auto"
        >
          <p className="text-xs sm:text-sm md:text-base text-white/90 leading-relaxed">
            O Protocolo Xamânico usado por <strong className="text-[#FFD700] font-bold">4.387 brasileiros {!isLoadingState && `no ${userState}`}</strong>{' '}
            identifica <strong className="text-[#FFD700] font-bold">EXATAMENTE</strong> qual bloqueio financeiro ancestral{' '}
            está impedindo o dinheiro de chegar até você.
          </p>
        </motion.div>

        {/* BENEFÍCIO CURTO */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="bg-gradient-to-r from-[#4ade80]/10 to-[#10b981]/10 border border-[#4ade80]/30 rounded-lg p-3 backdrop-blur-sm"
        >
          <p className="text-xs sm:text-sm md:text-base font-medium text-[#4ade80] leading-relaxed">
            Em 7 dias após desbloquear a trava ancestral: dinheiro chega sem você correr atrás (Pix inesperados, propostas que você nem buscou)
          </p>
        </motion.div>

        {/* HIGHLIGHT COM ÍCONE */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="w-full bg-gradient-to-r from-[#8B0000]/20 to-[#FF4500]/20 border border-[#FF4500]/40 rounded-lg p-3 backdrop-blur-sm"
        >
          <div className="flex items-start gap-2">
            <Sparkles className="w-5 h-5 text-[#FF6347] flex-shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm md:text-base font-bold text-[#FF6347] leading-relaxed">
              Você vai descobrir uma <strong className="text-white">VERDADE BRUTAL</strong> sobre por que o dinheiro nunca ficou na mão... até agora.
            </p>
          </div>
        </motion.div>

        {/* LISTA DE CONFIANÇA - Grid 2x2 em mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="grid grid-cols-2 gap-2 md:gap-3 w-full text-white/80 text-xs sm:text-sm"
        >
          <div className="flex items-center justify-center gap-1.5 bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-white/10">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37]" />
            <p>Menos de 2 min</p>
          </div>
          <div className="flex items-center justify-center gap-1.5 bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-white/10">
            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37]" />
            <p>Sem e-mail</p>
          </div>
          <div className="flex items-center justify-center gap-1.5 bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-white/10">
            <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37]" />
            <p>100% privado</p>
          </div>
          <div className="flex items-center justify-center gap-1.5 bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-white/10">
            <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37]" />
            <p>Resultado na tela</p>
          </div>
        </motion.div>

        {/* IMAGEM BEFORE/AFTER - Optimized for mobile */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="w-full space-y-2 md:space-y-3"
        >
          <p className="text-base sm:text-lg md:text-xl font-black text-white">
            Onde você está hoje?
          </p>
          
          <div className="relative border-2 border-[#FFD700]/60 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.2)] max-h-[160px] sm:max-h-[200px] md:max-h-none">
            <img 
              src="/banner principal.png" 
              alt="Transformação - Antes e Depois" 
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-bold text-[#FF4500]">
              Você está no lado ESQUERDO?
            </p>
            <div className="flex items-center justify-center gap-2">
              <p className="text-sm sm:text-base font-bold text-[#4ade80]">
                Vamos levar você para o lado DIREITO em 7 dias!
              </p>
              <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-[#4ade80]" />
            </div>
          </div>
        </motion.div>

        {/* CARD DE URGÊNCIA - Compact for mobile */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="w-full bg-gradient-to-br from-[#1a0606]/90 to-[#0a0202]/90 backdrop-blur-sm border-2 border-[#FF0000]/60 rounded-lg p-3 md:p-4 space-y-2 shadow-[0_0_30px_rgba(255,0,0,0.2)]"
        >
          <div className="flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF0000]" />
            <p className="text-sm sm:text-base md:text-lg font-black text-[#FF0000]">
              ATENÇÃO: VAGAS LIMITADAS
            </p>
          </div>
          {/* Compact text for mobile - 2 lines max */}
          <div className="text-center">
            <p className="text-xs sm:text-sm text-white font-bold">
              VAGAS: <span className="text-[#FFD700]">12/50</span>
            </p>
            <p className="text-[10px] sm:text-xs text-slate-300">
              Próxima vaga só amanhã
            </p>
          </div>
        </motion.div>

        {/* CTA PRINCIPAL - Botão gigante */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5, ease: "easeOut" }}
          className="w-full relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full blur-md opacity-50 group-hover:opacity-80 transition duration-500 animate-pulse"></div>
          <Button 
            onClick={handleStartClick} 
            pulse 
            className="relative text-sm sm:text-base md:text-lg font-black py-4 sm:py-5 md:py-6 px-6 sm:px-8 md:px-12 w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black rounded-full shadow-[0_8px_24px_rgba(255,215,0,0.3)] hover:scale-105 transition-transform duration-300"
          >
            <span className="flex items-center justify-center gap-2">
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.span>
              <span>DESCOBRIR MINHA TRAVA ANCESTRAL AGORA</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.span>
            </span>
          </Button>
        </motion.div>

        {/* CARD PROVA SOCIAL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="w-full bg-gradient-to-br from-[#1a0d2e]/90 to-[#0a0520]/90 backdrop-blur-sm border-2 border-[#4ade80]/60 rounded-xl p-4 md:p-5 space-y-2 md:space-y-3 shadow-[0_0_30px_rgba(74,222,128,0.2)]"
        >
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#4ade80]" />
            <p className="text-base sm:text-lg md:text-xl font-black text-[#4ade80]">
              JÁ DESTRAVARAM <span className="text-[#FFD700]">4.387+</span> PESSOAS
            </p>
          </div>
          <p className="text-sm sm:text-base md:text-lg font-bold text-[#FFD700]">
            Resultados comuns no 1º mês:
          </p>
          <div className="text-left space-y-2 text-xs sm:text-sm md:text-base text-slate-300">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.4 }}
              className="flex items-start gap-2"
            >
              <CheckCircle className="w-4 h-4 text-[#4ade80] flex-shrink-0 mt-0.5" />
              <p><span className="text-[#FFD700] font-bold">R$5k-50k</span> chegando via Pix, clientes antigos pagando dívidas, propostas que você nem buscou</p>
            </motion.div>
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.4 }}
              className="flex items-start gap-2"
            >
              <CheckCircle className="w-4 h-4 text-[#4ade80] flex-shrink-0 mt-0.5" />
              <p>Fluxo de dinheiro que <strong className="text-white">NÃO PARA</strong></p>
            </motion.div>
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.4 }}
              className="flex items-start gap-2"
            >
              <CheckCircle className="w-4 h-4 text-[#4ade80] flex-shrink-0 mt-0.5" />
              <p>Raiva/culpa sobre dinheiro: <strong className="text-white">DESAPARECEU</strong></p>
            </motion.div>
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.4 }}
              className="flex items-start gap-2"
            >
              <CheckCircle className="w-4 h-4 text-[#4ade80] flex-shrink-0 mt-0.5" />
              <p>Abundância chegando sem esforço</p>
            </motion.div>
          </div>
          <p className="text-xs text-slate-400 pt-1">
            Nada de coincidência. Tudo é resultado de desbloquear a trava ancestral.
          </p>
        </motion.div>

      </div>
    </motion.div>
  );
};
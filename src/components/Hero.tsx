import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { Lock, CheckCircle, Clock, Mail, Shield, Smartphone } from 'lucide-react';
import { tracking } from '../utils/tracking';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
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
      {/* TOPO */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full bg-gradient-to-r from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e] border-b border-[#D4AF37]/30 py-3 px-4 shadow-lg relative z-20"
      >
        <div className="flex items-center justify-center gap-3">
          <Lock className="w-4 h-4 text-[#D4AF37] animate-pulse" />
          <p className="text-[10px] font-medium text-[#D4AF37] tracking-[0.15em] uppercase">
            🔒 DIAGNÓSTICO DE FREQUÊNCIA FINANCEIRA
          </p>
        </div>
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-10 space-y-5 sm:space-y-7 text-center relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#D4AF37]/10 rounded-full blur-[80px] pointer-events-none -z-10"></div>

        {/* HEADLINE PRINCIPAL */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="space-y-4 sm:space-y-5"
        >
          <h1 className="text-[28px] leading-[1.2] sm:text-[36px] sm:leading-[1.15] md:text-[48px] lg:text-[56px] font-black text-white drop-shadow-2xl break-words px-2">
            Existe Uma <span className="text-[#FFD700]">"TRAVA ANCESTRAL"</span>{' '}
            <span className="text-[#FF4500]">SUFOCANDO</span>{' '}
            <span className="text-[#FFD700]">R$5-50 MIL</span>{' '}
            da Sua Vida?
          </h1>
          {/* SUBHEADLINE */}
          <p className="text-[15px] sm:text-lg md:text-xl text-slate-300/80 leading-relaxed px-2">
            (Descubra como <strong className="text-white font-bold">DESTRUÍ-LA</strong> em 7 dias - e destravar o fluxo)
          </p>
        </motion.div>

        {/* ESPAÇAMENTO: 28px */}
        <div className="h-7"></div>

        {/* PARÁGRAFO EXPLICATIVO */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-[600px] mx-auto px-2"
        >
          <p className="text-[14px] leading-[1.6] sm:text-base sm:leading-relaxed md:text-lg lg:text-xl text-white/95">
            O Protocolo Xamânico usado por <strong className="text-[#FFD700] font-bold">4.387 brasileiros</strong>{' '}
            identifica <strong className="text-[#FFD700] font-bold">EXATAMENTE</strong> qual bloqueio financeiro ancestral está impedindo o dinheiro de chegar até você.
          </p>
        </motion.div>

        {/* ESPAÇAMENTO: 20px */}
        <div className="h-5"></div>

        {/* BENEFÍCIO CURTO */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="px-2"
        >
          <p className="text-[14px] leading-[1.6] sm:text-base sm:leading-relaxed md:text-lg font-semibold text-[#4ade80]">
            Em apenas 7 dias seguindo o protocolo: o dinheiro começa a fluir sem você precisar trabalhar mais.
          </p>
        </motion.div>

        {/* ESPAÇAMENTO: 24px */}
        <div className="h-6"></div>

        {/* CAIXA ROXA/DESTACADA - Card com borda */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full bg-gradient-to-br from-[#1a0d2e] to-[#0a0520] border-2 border-[#FFD700] rounded-xl p-5 sm:p-6 space-y-4 shadow-lg"
        >
          <p className="text-[17px] sm:text-xl font-bold text-white leading-tight">
            📋 Responda 6 perguntas rápidas (2 minutos)
          </p>
          <p className="text-[13px] sm:text-base text-slate-200 font-semibold">Você vai descobrir:</p>
          <div className="text-left space-y-3 sm:space-y-3.5 text-[13px] sm:text-base text-slate-200 leading-[1.5]">
            <div className="flex items-start gap-2.5 sm:gap-3">
              <span className="text-[#4ade80] text-base sm:text-lg flex-shrink-0 mt-0.5">✓</span>
              <p><strong className="text-white font-bold">EXATAMENTE</strong> qual bloqueio ancestral está drenando seu dinheiro</p>
            </div>
            <div className="flex items-start gap-2.5 sm:gap-3">
              <span className="text-[#4ade80] text-base sm:text-lg flex-shrink-0 mt-0.5">✓</span>
              <p>Por que começou na sua linhagem (e o ritual para <strong className="text-white font-bold">PARAR</strong> hoje)</p>
            </div>
            <div className="flex items-start gap-2.5 sm:gap-3">
              <span className="text-[#4ade80] text-base sm:text-lg flex-shrink-0 mt-0.5">✓</span>
              <p>O protocolo de 7 dias que <strong className="text-[#FFD700] font-bold">89%</strong> das pessoas sente funcionando nos primeiros 3 dias</p>
            </div>
          </div>
        </motion.div>

        {/* ESPAÇAMENTO: 20px */}
        <div className="h-5"></div>

        {/* HIGHLIGHT COM ÍCONE */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="w-full bg-[#8B0000]/20 border border-[#FF4500]/30 rounded-lg p-4 sm:p-5"
        >
          <p className="text-[13px] leading-[1.5] sm:text-base sm:leading-relaxed md:text-lg font-bold text-[#FF6347]">
            🔥 A maioria descobre uma <strong className="text-white font-extrabold">VERDADE BRUTAL</strong> sobre por que o dinheiro nunca ficou na mão... até agora.
          </p>
        </motion.div>

        {/* ESPAÇAMENTO: 24px */}
        <div className="h-6"></div>

        {/* LISTA DE CONFIANÇA - 4 itens em coluna */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-2.5 sm:space-y-3 text-white/85 text-[13px] sm:text-sm"
        >
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <p>⏰ Leva menos de 2 minutos</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <p>✉️ Sem e-mail solicitado</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <p>🔒 Nenhum comentário público</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <p>📱 Resultado chega direto na tela</p>
          </div>
        </motion.div>

        {/* ESPAÇAMENTO: 24px */}
        <div className="h-6"></div>

        {/* IMAGEM BEFORE/AFTER */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full space-y-4"
        >
          <div className="relative border-2 border-[#FFD700] rounded-2xl overflow-hidden shadow-lg">
            <img 
              src="/banner principal.png" 
              alt="Transformação - Antes e Depois" 
              className="w-full h-auto"
            />
          </div>
          <div className="space-y-2">
            <p className="text-base sm:text-lg font-bold text-[#FF4500]">
              Você está no lado ESQUERDO?
            </p>
            <p className="text-lg sm:text-xl font-bold text-[#4ade80]">
              Vamos levar você para o lado DIREITO em 7 dias! ➜
            </p>
          </div>
        </motion.div>

        {/* ESPAÇAMENTO: 24px */}
        <div className="h-6"></div>

        {/* CARD DE URGÊNCIA - Background vermelho escuro */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full bg-[#1a0606] border-2 border-[#FF0000] rounded-lg p-5 space-y-3 shadow-lg"
        >
          <p className="text-xl sm:text-2xl font-black text-[#FF0000] flex items-center justify-center gap-2">
            🚨 ATENÇÃO: VAGAS LIMITADAS
          </p>
          <p className="text-sm sm:text-base text-white font-medium">
            Apenas 50 análises podem ser processadas por dia.
          </p>
          <p className="text-lg sm:text-xl font-bold text-[#4ade80]">
            Você está no lugar: <span className="text-[#FFD700]">12/50</span>
          </p>
          <p className="text-xs sm:text-sm text-slate-400">
            Vagas esgotadas = próxima disponibilidade é amanhã de manhã
          </p>
        </motion.div>

        {/* ESPAÇAMENTO: 40px */}
        <div className="h-10"></div>

        {/* CTA PRINCIPAL - Botão gigante */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="w-full relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full blur-md opacity-50 group-hover:opacity-80 transition duration-500 animate-pulse"></div>
          <Button 
            onClick={handleStartClick} 
            pulse 
            className="relative text-base sm:text-lg md:text-xl font-black py-5 sm:py-6 px-8 sm:px-12 w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black rounded-full shadow-[0_8px_24px_rgba(255,215,0,0.3)] hover:scale-105 transition-transform duration-300"
          >
            <span className="flex items-center justify-center gap-2">
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
              >
                →
              </motion.span>
              <span>DESCOBRIR MINHA TRAVA ANCESTRAL AGORA</span>
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
              >
                ←
              </motion.span>
            </span>
          </Button>
        </motion.div>

        {/* ESPAÇAMENTO: 32px */}
        <div className="h-8"></div>

        {/* CARD PROVA SOCIAL - Background roxo escuro */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="w-full bg-[#1a0d2e] border-2 border-[#4ade80] rounded-xl p-6 space-y-4"
        >
          <p className="text-xl sm:text-2xl font-black text-[#4ade80] flex items-center justify-center gap-2">
            ✅ JÁ DESTRAVARAM <span className="text-[#FFD700]">4.387+</span> PESSOAS
          </p>
          <p className="text-base sm:text-lg font-bold text-[#FFD700]">
            Resultados comuns no 1º mês:
          </p>
          <div className="text-left space-y-3 text-sm sm:text-base text-slate-300">
            <div className="flex items-start gap-3">
              <span className="text-[#4ade80] flex-shrink-0 text-lg">●</span>
              <p><span className="text-[#FFD700] font-bold">R$5k-50k</span> aparecendo de forma inesperada</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#4ade80] flex-shrink-0 text-lg">●</span>
              <p>Fluxo de dinheiro que <strong className="text-white">NÃO PARA</strong></p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#4ade80] flex-shrink-0 text-lg">●</span>
              <p>Raiva/culpa sobre dinheiro: <strong className="text-white">DESAPARECEU</strong></p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#4ade80] flex-shrink-0 text-lg">●</span>
              <p>Abundância chegando sem esforço</p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 pt-2">
            Nada de coincidência. Tudo é resultado de desbloquear a trava ancestral.
          </p>
        </motion.div>

        {/* ESPAÇAMENTO: 24px */}
        <div className="h-6"></div>

        {/* RODAPÉ DE CONFIANÇA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="w-full"
        >
          <p className="text-xs sm:text-sm text-white/60 flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            🔒 Análise confidencial e segura. 100% baseada em princípios ancestrais milenares.
          </p>
        </motion.div>

      </div>
    </motion.div>
  );
};
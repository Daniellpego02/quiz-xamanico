import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { Lock, CheckCircle } from 'lucide-react';
import { tracking } from '../utils/tracking';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  const handleStartClick = () => {
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
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full bg-gradient-to-r from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e] border-b border-[#D4AF37]/30 py-3 px-4 shadow-lg relative z-20"
      >
        <div className="flex items-center justify-center gap-3">
          <Lock className="w-4 h-4 text-[#D4AF37] animate-pulse" />
          <p className="text-[10px] font-medium text-[#D4AF37] tracking-[0.15em] uppercase">
            DIAGNÓSTICO DE FREQUÊNCIA FINANCEIRA
          </p>
        </div>
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center px-5 py-6 space-y-6 text-center relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#D4AF37]/10 rounded-full blur-[80px] pointer-events-none -z-10"></div>

        {/* MUDANÇA 1 & 2: Título Principal + Sub-linha */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          <h1 className="text-3xl md:text-4xl font-serif font-black text-white leading-[1.15] drop-shadow-2xl">
            Existe uma <span className="text-[#FFD700]">"TRAVA ANCESTRAL"</span> roubando <span className="text-[#FFD700]">R$5-50 MIL</span> da sua vida?
          </h1>
          <p className="text-sm md:text-base text-slate-300 italic">
            (Descubra como destravá-la em 7 dias - e liberar R$5-50k)
          </p>
        </motion.div>

        {/* MUDANÇA 2: Texto Explicativo com Bullet Points */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 max-w-md mx-auto"
        >
          <p className="text-base md:text-lg text-slate-200 leading-relaxed font-medium">
            O Protocolo Xamânico identifica <strong className="text-white">EXATAMENTE</strong> qual é seu bloqueio financeiro ancestral.
          </p>
          <p className="text-base md:text-lg text-[#4ade80] font-bold leading-relaxed">
            Em apenas 7 dias seguindo o protocolo: R$5-50 mil destravados na sua conta.
          </p>
          
          <div className="text-left space-y-2 bg-[#2d1b4e]/30 backdrop-blur-sm border border-[#D4AF37]/20 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-[#4ade80] flex-shrink-0 mt-0.5" />
              <p className="text-sm md:text-base text-slate-200">EXATAMENTE qual bloqueio ancestral te rouba dinheiro</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-[#4ade80] flex-shrink-0 mt-0.5" />
              <p className="text-sm md:text-base text-slate-200">Por que começou (e quando você pode PARAR)</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-[#4ade80] flex-shrink-0 mt-0.5" />
              <p className="text-sm md:text-base text-slate-200">O ritual que desbloqueia R$5-50k em 7 dias</p>
            </div>
          </div>

          <p className="text-sm md:text-base text-slate-300 flex items-center justify-center gap-2">
            <span className="text-[#FFD700] text-xl">⚡</span>
            <span>A maioria das pessoas descobre uma <strong className="text-white">VERDADE</strong> que explica tudo sobre seu dinheiro.</span>
          </p>
        </motion.div>

        {/* MUDANÇA 3: Box Roxa (Purple Box) */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full bg-gradient-to-br from-[#4c1d95]/40 to-[#2d1b4e]/40 backdrop-blur-sm border border-[#D4AF37]/30 rounded-xl p-5 space-y-3"
        >
          <p className="text-lg md:text-xl font-bold text-white">
            Responda 6 perguntas rápidas (2 minutos)
          </p>
          <p className="text-sm md:text-base text-slate-300 font-medium">Você descobre:</p>
          <div className="text-left space-y-1.5 text-sm md:text-base text-slate-200">
            <p>• Seu bloqueio financeiro ancestral</p>
            <p>• A origem exata do vazamento</p>
            <p>• O ritual de 7 dias para destravar</p>
          </div>
          <p className="text-sm md:text-base text-[#FFD700] font-bold flex items-center justify-center gap-2 pt-2">
            <span className="text-xl">⚡</span>
            <span>A maioria das pessoas descobre uma VERDADE que explica tudo sobre seu dinheiro.</span>
          </p>
        </motion.div>

        {/* MUDANÇA 4: Time Indicator Melhorado */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-2"
        >
          <p className="text-lg md:text-xl font-bold text-[#FFD700] flex items-center justify-center gap-2">
            ⏱ Leva menos de 2 minutos
          </p>
          <div className="text-xs md:text-sm text-slate-400 space-y-1">
            <p>Sem e-mail solicitado</p>
            <p>Nenhum comentário público</p>
            <p>Resultado chega direto na tela</p>
          </div>
        </motion.div>

        {/* MUDANÇA 5: Imagem Antes/Depois */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full space-y-3"
        >
          <div className="relative border-4 border-[#FFD700] rounded-xl overflow-hidden shadow-lg shadow-[#FFD700]/30">
            <img 
              src="/banner principal.png" 
              alt="Transformação - Antes e Depois" 
              className="w-full h-auto"
            />
          </div>
          <div className="space-y-1">
            <p className="text-base md:text-lg font-bold text-red-500">
              Você está no lado ESQUERDO?
            </p>
            <p className="text-lg md:text-xl font-bold text-[#4ade80]">
              Vamos levar você para o lado DIREITO em 7 dias! ➜
            </p>
          </div>
        </motion.div>

        {/* MUDANÇA 6: Box de Urgência (NOVO) */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full bg-[#FFD700]/10 backdrop-blur-sm border-2 border-[#FFD700]/40 rounded-xl p-4 space-y-2"
        >
          <p className="text-xl md:text-2xl font-black text-red-500 flex items-center justify-center gap-2">
            ⏰ ATENÇÃO: VAGAS LIMITADAS
          </p>
          <p className="text-sm md:text-base text-white">
            Apenas 50 análises podem ser processadas por dia.
          </p>
          <p className="text-lg md:text-xl font-bold text-[#FFD700]">
            Você está no lugar: 12/50
          </p>
          <p className="text-xs md:text-sm text-slate-400">
            Vagas esgotadas = próxima disponibilidade é amanhã de manhã
          </p>
        </motion.div>

        {/* MUDANÇA 7: Botão CTA Melhorado */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="w-full relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-xl blur-md opacity-50 group-hover:opacity-80 transition duration-1000 animate-pulse"></div>
          <Button 
            onClick={handleStartClick} 
            pulse 
            className="relative text-xl md:text-2xl py-6 px-8 w-full shadow-[0_0_40px_rgba(255,215,0,0.4)] border-t-2 border-white/30 hover:scale-105 transition-transform duration-300"
          >
            → DESCOBRIR MINHA TRAVA ANCESTRAL AGORA ←
          </Button>
        </motion.div>

        {/* MUDANÇA 8: Social Proof Reescrito */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="w-full bg-gradient-to-br from-[#4c1d95]/30 to-[#1e40af]/30 backdrop-blur-sm border border-[#D4AF37]/20 rounded-xl p-5 space-y-3"
        >
          <p className="text-xl md:text-2xl font-black text-[#4ade80] flex items-center justify-center gap-2">
            ✅ JÁ MAPEARAM 4.300+ PESSOAS
          </p>
          <p className="text-base md:text-lg font-bold text-[#FFD700]">
            Resultados comuns no 1º ano:
          </p>
          <div className="text-left space-y-2 text-sm md:text-base text-slate-300">
            <div className="flex items-start gap-2">
              <span className="text-[#4ade80] flex-shrink-0">●</span>
              <p>R$5k-50k aparecendo de forma inesperada</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#4ade80] flex-shrink-0">●</span>
              <p>Fluxo de dinheiro que NÃO PARA</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#4ade80] flex-shrink-0">●</span>
              <p>Raiva/culpa sobre dinheiro: DESAPARECEU</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#4ade80] flex-shrink-0">●</span>
              <p>Abundância chegando sem esforço</p>
            </div>
          </div>
          <p className="text-xs md:text-sm text-slate-400 pt-2">
            Nada de coincidência. Tudo é resultado de desbloquear a trava ancestral.
          </p>
          <p className="text-xs md:text-sm text-slate-400 flex items-center justify-center gap-2 pt-1">
            <Lock className="w-3 h-3" />
            🔒 Análise confidencial e segura. 100% baseada em princípios ancestrais milenares.
          </p>
        </motion.div>

      </div>
    </motion.div>
  );
};
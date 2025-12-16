import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Headphones, Play, Pause } from 'lucide-react';

export const FrequencyRoom: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Simulated waveform bars with stable heights
  const waveformBars = 40;
  const waveformHeights = useRef(
    Array.from({ length: waveformBars }, (_, i) => 20 + Math.sin(i * 0.5) * 15)
  ).current;

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);
    }

    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
      }
    };
  }, []);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const percent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(percent);
      
      // Show feedback after 8 seconds
      if (audioRef.current.currentTime >= 8 && !showFeedback) {
        setShowFeedback(true);
      }
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative bg-gradient-to-b from-[#2A0F3D]/80 via-[#1a0b2e]/60 to-[#120520]/80 border-2 border-[#C69320]/40 rounded-2xl p-8 md:p-10 shadow-[0_0_30px_rgba(198,147,32,0.3)] overflow-hidden"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#C69320]/10 via-transparent to-[#FFD700]/5 animate-pulse pointer-events-none" aria-hidden="true" />
      
      <div className="relative z-10 space-y-6">
        {/* Warning Icon and Title */}
        <div className="text-center space-y-3">
          <motion.div
            animate={{ 
              scale: [1, 1.15, 1],
              rotate: [0, 8, -8, 0]
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="inline-block"
          >
            <Headphones className="w-20 h-20 mx-auto text-[#FFD700] drop-shadow-[0_0_25px_rgba(255,215,0,0.7)]" />
          </motion.div>
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#C69320]/30 backdrop-blur-md text-[#FFD700] px-5 py-2.5 rounded-full text-sm font-black border-2 border-[#FFD700]/40 shadow-[0_0_20px_rgba(255,215,0,0.3)]">
              ⚠️ EXPERIÊNCIA SENSORIAL OBRIGATÓRIA
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-white leading-tight drop-shadow-lg">
              A SALA DE FREQUÊNCIA
            </h3>
            <p className="text-[#FFD700] text-sm md:text-base font-bold">
              Prepare-se para sentir algo que você NUNCA sentiu antes
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-[#C69320]/20">
          <p className="text-gray-200 text-base md:text-lg leading-relaxed text-center">
            <strong className="text-white">Atenção:</strong> Antes de revelar seu mapa, você precisa sentir o poder da{' '}
            <span className="text-[#FFD700] font-bold">Frequência de 528Hz</span>{' '}
            (conhecida como "A Frequência do Milagre").
          </p>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed text-center mt-3">
            <strong className="text-white">Coloque seus fones AGORA, feche os olhos</strong> e ouça por <strong className="text-[#FFD700]">apenas 10 segundos</strong>. 
            Se você sentir um formigamento, calor ou arrepio, é sinal de que seu campo energético está PRONTO para receber a transformação.
          </p>
          <p className="text-orange-400 text-xs md:text-sm leading-relaxed text-center mt-3 font-bold">
            ⚠️ Mais de 87% das pessoas que sentiram essa frequência compraram o protocolo completo imediatamente!
          </p>
        </div>

        {/* Audio Player */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-2xl p-6 border border-[#FFD700]/30 shadow-[0_0_20px_rgba(255,215,0,0.2)]">
          {/* Waveform Visualization */}
          <div className="flex items-center justify-center gap-1 h-24 mb-6">
            {[...Array(waveformBars)].map((_, i) => {
              const baseHeight = waveformHeights[i];
              const animatedHeight = isPlaying ? baseHeight + 20 : baseHeight;
              
              return (
                <motion.div
                  key={i}
                  animate={{
                    height: isPlaying ? [baseHeight, animatedHeight, baseHeight] : baseHeight,
                    opacity: progress > (i / waveformBars) * 100 ? 1 : 0.3
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: isPlaying ? Infinity : 0,
                    delay: i * 0.02
                  }}
                  className="w-1 bg-gradient-to-t from-[#C69320] to-[#FFD700] rounded-full"
                  style={{ height: `${baseHeight}px` }}
                />
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-6">
            <motion.div
              className="h-full bg-gradient-to-r from-[#C69320] via-[#FFD700] to-[#FFA500]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="w-full bg-gradient-to-r from-[#C69320] via-[#FFD700] to-[#C69320] hover:from-[#FFD700] hover:via-[#FFA500] hover:to-[#FFD700] text-white font-black py-5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(198,147,32,0.6)] hover:shadow-[0_0_40px_rgba(255,215,0,0.9)] active:scale-95 text-lg border-2 border-white/20"
          >
            {isPlaying ? (
              <>
                <Pause className="w-7 h-7" />
                <span>PAUSAR EXPERIÊNCIA</span>
              </>
            ) : (
              <>
                <Play className="w-7 h-7 fill-white" />
                <span>🎧 SENTIR A FREQUÊNCIA DE 528Hz AGORA</span>
              </>
            )}
          </button>
          
          {/* Urgency message below button */}
          {!isPlaying && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-orange-300 text-xs md:text-sm font-bold mt-2"
            >
              ⏱️ Só leva 10 segundos - Clique AGORA e sinta a diferença!
            </motion.p>
          )}

          {/* Hidden Audio Element - 528Hz Frequency Audio */}
          {/* Using a real 528Hz healing frequency audio for authentic experience */}
          <audio
            ref={audioRef}
            src="https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3"
            preload="auto"
            crossOrigin="anonymous"
          />
        </div>

        {/* Feedback Message */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="relative overflow-hidden"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-green-500/30 to-emerald-500/20 blur-xl animate-pulse" aria-hidden="true" />
              
              <div className="relative bg-gradient-to-r from-emerald-900/40 to-green-800/30 border-2 border-emerald-400/50 rounded-xl p-6 text-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <div className="text-4xl mb-3 animate-bounce">✨</div>
                <p className="text-emerald-200 text-base md:text-lg leading-relaxed font-bold mb-2">
                  INCRÍVEL! Você sentiu isso?
                </p>
                <p className="text-emerald-300 text-sm md:text-base leading-relaxed mb-3">
                  Esse formigamento ou calor que você acabou de sentir é a PROVA de que seu bloqueio está pronto para ser removido. 
                  Seu campo energético está <strong className="text-white">RECEPTIVO</strong> à transformação!
                </p>
                <p className="text-yellow-300 text-xs md:text-sm font-bold bg-yellow-900/30 rounded-lg p-3 border border-yellow-500/30">
                  🔥 Pessoas que sentem essa frequência tem 3x mais chances de destravar a prosperidade nos primeiros 7 dias!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Social Proof Comments - Placebo Effect */}
        <div className="space-y-3 mt-6">
          <p className="text-center text-[#FFD700] text-sm font-bold mb-4">
            💬 Veja o que as pessoas estão sentindo:
          </p>
          
          {/* Comment 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4"
          >
            <p className="text-gray-200 text-sm italic mb-2">
              "Nossa, minha mão formigou na hora! 🤚✨"
            </p>
            <p className="text-gray-400 text-xs">— Juliana M.</p>
          </motion.div>

          {/* Comment 2 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4"
          >
            <p className="text-gray-200 text-sm italic mb-2">
              "Senti um calor no peito, que loucura! 🔥"
            </p>
            <p className="text-gray-400 text-xs">— Carlos E.</p>
          </motion.div>

          {/* Comment 3 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4"
          >
            <p className="text-gray-200 text-sm italic mb-2">
              "Meu corpo todo arrepiou... é muito forte essa frequência! ⚡"
            </p>
            <p className="text-gray-400 text-xs">— Fernanda L.</p>
          </motion.div>
        </div>

        {/* Social proof and Disclaimer */}
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-4 text-center">
            <p className="text-purple-300 text-sm md:text-base font-semibold">
              ✨ <strong className="text-white">+21.400 pessoas</strong> já sentiram essa frequência e mudaram sua relação com o dinheiro
            </p>
          </div>
          
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            * Esta é uma amostra demonstrativa da frequência de 528Hz. O protocolo completo contém áudios binaurais específicos de 12 minutos para cada fase do seu desbloqueio financeiro.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Headphones, Play, Pause } from 'lucide-react';

export const FrequencyRoom: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Simulated waveform bars
  const waveformBars = 40;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('ended', handleEnded);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('ended', handleEnded);
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
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="inline-block"
          >
            <Headphones className="w-16 h-16 mx-auto text-[#FFD700] drop-shadow-[0_0_20px_rgba(255,215,0,0.6)]" />
          </motion.div>
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#C69320]/20 backdrop-blur-md text-[#FFD700] px-4 py-2 rounded-full text-xs font-bold border border-[#FFD700]/30">
              ⚠️ TESTE DE COMPATIBILIDADE VIBRACIONAL
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              A SALA DE FREQUÊNCIA
            </h3>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-[#C69320]/20">
          <p className="text-gray-200 text-base md:text-lg leading-relaxed text-center">
            Antes de liberar seu acesso, precisamos saber se o seu campo energético aceita a{' '}
            <span className="text-[#FFD700] font-bold">Frequência de 528Hz</span>{' '}
            (A Frequência do Milagre).
          </p>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed text-center mt-3">
            <strong className="text-white">Coloque seus fones, feche os olhos</strong> e aperte o play por <strong className="text-[#FFD700]">10 segundos</strong>.
          </p>
        </div>

        {/* Audio Player */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-2xl p-6 border border-[#FFD700]/30 shadow-[0_0_20px_rgba(255,215,0,0.2)]">
          {/* Waveform Visualization */}
          <div className="flex items-center justify-center gap-1 h-24 mb-6">
            {[...Array(waveformBars)].map((_, i) => {
              const height = isPlaying 
                ? Math.random() * 60 + 20 
                : 20 + Math.sin(i * 0.5) * 15;
              
              return (
                <motion.div
                  key={i}
                  animate={{
                    height: isPlaying ? [height, height + 20, height] : height,
                    opacity: progress > (i / waveformBars) * 100 ? 1 : 0.3
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: isPlaying ? Infinity : 0,
                    delay: i * 0.02
                  }}
                  className="w-1 bg-gradient-to-t from-[#C69320] to-[#FFD700] rounded-full"
                  style={{ height: `${height}px` }}
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
            className="w-full bg-gradient-to-r from-[#C69320] to-[#FFD700] hover:from-[#FFD700] hover:to-[#C69320] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(198,147,32,0.5)] hover:shadow-[0_0_30px_rgba(255,215,0,0.7)] active:scale-95"
          >
            {isPlaying ? (
              <>
                <Pause className="w-6 h-6" />
                <span className="text-lg">PAUSAR TESTE</span>
              </>
            ) : (
              <>
                <Play className="w-6 h-6" />
                <span className="text-lg">▶️ INICIAR TESTE DE 528Hz</span>
              </>
            )}
          </button>

          {/* Hidden Audio Element */}
          <audio
            ref={audioRef}
            src="https://cdn.pixabay.com/audio/2022/03/15/audio_d1718372d8.mp3"
            preload="metadata"
          />
        </div>

        {/* Feedback Message */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-gradient-to-r from-emerald-900/30 to-emerald-800/20 border border-emerald-500/30 rounded-xl p-5 text-center"
            >
              <p className="text-emerald-300 text-sm md:text-base leading-relaxed">
                ✨ <strong className="text-emerald-200">Sentiu um leve formigamento ou calor?</strong>{' '}
                Isso é sinal de que seu bloqueio está pronto para ser removido.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Disclaimer */}
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          * Este é apenas um teste sensorial demonstrativo. O protocolo completo contém áudios binaurais específicos para cada fase do seu desbloqueio.
        </p>
      </div>
    </motion.div>
  );
};

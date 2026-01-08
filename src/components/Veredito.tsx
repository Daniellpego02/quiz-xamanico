import { motion } from 'framer-motion';
import { AlertTriangle, Zap } from 'lucide-react';

interface VeredictoProps {
  userName?: string;
}

export default function Veredito({ userName = 'você' }: VeredictoProps) {
  // Format userName with capitalized first letter
  const formattedName = userName && userName !== 'você' 
    ? userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase()
    : 'você';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-md mx-auto mt-6"
    >
      {/* Outer glow effect - Softer */}
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600/60 to-orange-600/60 rounded-2xl blur-lg opacity-30 animate-pulse" />
      
      {/* Main container with Glassmorphism */}
      <div className="relative bg-[#0f0f0f]/90 backdrop-blur-md border border-red-900/40 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Header with dramatic styling */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 px-6 py-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="w-6 h-6 text-white animate-pulse" aria-hidden="true" />
            <h2 className="text-xl md:text-2xl font-black text-white text-center tracking-wide">
              ANÁLISE VIBRACIONAL CONFIRMADA
            </h2>
            <Zap className="w-6 h-6 text-white animate-pulse" aria-hidden="true" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-300" aria-hidden="true" />
            <p className="text-sm md:text-base font-bold text-yellow-100 text-center uppercase tracking-wider">
              Bloqueio Financeiro Identificado
            </p>
          </div>
        </div>

        {/* Content area */}
        <div className="p-6 space-y-6">
          
          {/* Personalized greeting */}
          <div className="text-center">
            <p className="text-gray-300 text-sm mb-3">
              Olá, <span className="text-orange-400 font-semibold">{formattedName}</span>
            </p>
          </div>

          {/* Critical Level Progress Bar - Enhanced */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs md:text-sm text-gray-400 font-semibold uppercase tracking-wide">Nível Crítico:</span>
              <span className="text-lg md:text-xl font-black text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">87%</span>
            </div>
            
            {/* Enhanced progress bar with glow */}
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-600 rounded-full blur-sm opacity-40" aria-hidden="true" />
              <div className="relative w-full h-8 bg-gray-900 rounded-full overflow-hidden border-2 border-red-900/50 shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '87%' }}
                  transition={{ duration: 2, ease: 'easeOut', delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-red-600 via-red-500 to-orange-500 relative shadow-[0_0_15px_rgba(239,68,68,0.6)]"
                >
                  {/* Animated shine effect */}
                  <motion.div
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                    className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    aria-hidden="true"
                  />
                  
                  {/* Pulsing dots */}
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5 + i * 0.2 }}
                        className="w-2 h-2 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Archetype highlight - Enhanced with Glassmorphism */}
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-lg blur-md" aria-hidden="true" />
            <div className="relative bg-gradient-to-b from-red-950/40 to-orange-950/40 backdrop-blur-xl border-2 border-red-800/60 rounded-xl p-4 shadow-lg">
              <div className="text-center space-y-2">
                <p className="text-sm text-orange-300 font-semibold">
                  Seu arquétipo identificado:
                </p>
                <div className="relative inline-block">
                  <motion.div
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(239, 68, 68, 0.6)',
                        '0 0 30px rgba(251, 146, 60, 0.8)',
                        '0 0 20px rgba(239, 68, 68, 0.6)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                    className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-red-400 uppercase tracking-wider"
                  >
                    🔥 HERDEIRO DA ESCASSEZ 🔥
                  </motion.div>
                </div>
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed mt-3 px-2">
                  Este arquétipo é o responsável por você ganhar dinheiro e perder tudo logo em seguida.
                </p>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center space-y-2 pt-2">
            <p className="text-base md:text-lg text-gray-200 font-medium leading-relaxed">
              Assista ao vídeo abaixo para entender <span className="text-orange-400 font-bold">como desligar isso</span> e destravar sua prosperidade.
            </p>
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="text-2xl"
              aria-hidden="true"
            >
              ⬇️
            </motion.div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}

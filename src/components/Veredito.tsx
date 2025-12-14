import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface VeredictoProps {
  userName?: string;
}

export default function Veredito({ userName = 'você' }: VeredictoProps) {
  const firstName = userName ? userName.split(' ')[0].toUpperCase() : 'VOCÊ';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-red-900/30 rounded-lg p-8 mb-8"
    >
      {/* Header */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <AlertTriangle className="w-8 h-8 text-red-500" aria-hidden="true" />
        <h2 className="text-2xl md:text-3xl font-bold text-center text-red-400">
          ⚠️ DIAGNÓSTICO CONCLUÍDO: BLOQUEIO FINANCEIRO IDENTIFICADO
        </h2>
      </div>

      {/* Status Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Nível de Bloqueio:</span>
          <span className="text-xl font-bold text-red-500">CRÍTICO (87%)</span>
        </div>
        <div className="w-full h-6 bg-gray-800 rounded-full overflow-hidden border border-red-900/50">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '87%' }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-red-600 via-red-500 to-orange-500 flex items-center justify-end pr-2"
          >
            <div className="flex gap-0.5">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.2 }}
                  className="w-2 h-2 bg-white rounded-full"
                  aria-hidden="true"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subheadline */}
      <div className="text-center space-y-4">
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          <span className="text-orange-400 font-semibold">O Oráculo detectou</span> que você opera sob o arquétipo do{' '}
          <span className="text-red-400 font-bold">'HERDEIRO DA ESCASSEZ'</span>.
        </p>
        <p className="text-base md:text-lg text-gray-400">
          Assista ao vídeo para entender como desligar isso.
        </p>
      </div>

      {/* Pulse Effect */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 0 0 rgba(239, 68, 68, 0.7)',
            '0 0 0 20px rgba(239, 68, 68, 0)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'loop',
        }}
        className="absolute inset-0 rounded-lg pointer-events-none"
        aria-hidden="true"
      />
    </motion.div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  initialMinutes?: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialMinutes = 10 }) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60); // em segundos

  useEffect(() => {
    // Tentar recuperar tempo do localStorage
    const savedTime = localStorage.getItem('offerCountdown');
    const savedTimestamp = localStorage.getItem('offerCountdownStart');
    
    if (savedTime && savedTimestamp) {
      const elapsed = Math.floor((Date.now() - parseInt(savedTimestamp)) / 1000);
      const remaining = parseInt(savedTime) - elapsed;
      
      if (remaining > 0) {
        setTimeLeft(remaining);
      } else {
        // Resetar se expirou
        const newTime = initialMinutes * 60;
        setTimeLeft(newTime);
        localStorage.setItem('offerCountdown', newTime.toString());
        localStorage.setItem('offerCountdownStart', Date.now().toString());
      }
    } else {
      // Primeira visita
      const newTime = initialMinutes * 60;
      localStorage.setItem('offerCountdown', newTime.toString());
      localStorage.setItem('offerCountdownStart', Date.now().toString());
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Resetar quando chegar a 0
          const newTime = initialMinutes * 60;
          localStorage.setItem('offerCountdown', newTime.toString());
          localStorage.setItem('offerCountdownStart', Date.now().toString());
          return newTime;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [initialMinutes]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const isUrgent = timeLeft < 180; // últimos 3 minutos

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-2 ${
        isUrgent ? 'bg-red-900/30 border-red-500/50' : 'bg-orange-900/30 border-orange-500/50'
      } backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold border transition-all duration-300`}
    >
      <Clock className={`w-4 h-4 ${isUrgent ? 'text-red-400 animate-pulse' : 'text-orange-400'}`} />
      <span className={isUrgent ? 'text-red-300' : 'text-orange-300'}>
        ⏰ OFERTA EXPIRA EM:
      </span>
      <span className={`${isUrgent ? 'text-red-200 animate-pulse' : 'text-white'} font-black text-base`}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </motion.div>
  );
};

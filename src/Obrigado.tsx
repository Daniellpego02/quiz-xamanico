import { motion } from 'framer-motion';
import { CheckCircle, Sparkles, Heart } from 'lucide-react';

function Obrigado() {
  return (
    <div className="min-h-[100dvh] text-slate-100 overflow-x-hidden selection:bg-orange-500 selection:text-white relative bg-[#050505]">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] z-0"></div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col min-h-[100dvh] max-w-lg mx-auto relative z-10"
      >
        <div className="flex-1 flex flex-col items-center justify-center px-5 py-8 space-y-6 text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[80px] pointer-events-none -z-10"></div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="mb-4"
          >
            <CheckCircle className="w-20 h-20 text-emerald-400 mx-auto" strokeWidth={1.5} />
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-[#FF9500] via-amber-300 to-[#FF9500] bg-clip-text text-transparent"
          >
            Obrigado!
          </motion.h1>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center gap-2 text-emerald-400">
              <Sparkles className="w-5 h-5" />
              <p className="text-lg font-medium">
                Sua jornada xamânica foi registrada
              </p>
            </div>

            <p className="text-slate-300 text-base max-w-md mx-auto leading-relaxed">
              Seu resultado foi enviado com sucesso. Em breve você receberá mais informações sobre sua conexão ancestral.
            </p>

            <div className="pt-4 flex items-center justify-center gap-2 text-purple-300">
              <Heart className="w-4 h-4 fill-current" />
              <p className="text-sm italic">
                Gratidão por sua presença
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-8"
          >
            <a 
              href="/"
              className="inline-block bg-gradient-to-r from-[#FF9500] to-amber-500 text-white font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform duration-200 shadow-lg"
            >
              Voltar ao Início
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Obrigado;

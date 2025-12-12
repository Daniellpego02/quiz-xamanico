import { motion } from 'framer-motion';
import { CheckCircle, Mail, Check } from 'lucide-react';

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
            Confirmado! ✨
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-200 text-lg max-w-md mx-auto leading-relaxed"
          >
            Seu Mapa Xamânico completo está sendo enviado para o e-mail da sua compra agora mesmo!
          </motion.p>

          {/* Email Box */}
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative mt-8 p-6 rounded-2xl bg-gradient-to-br from-purple-900/30 to-emerald-900/20 border border-purple-500/30 backdrop-blur-sm shadow-xl"
            style={{
              boxShadow: '0 0 30px rgba(168, 85, 247, 0.15), 0 0 60px rgba(16, 185, 129, 0.1)'
            }}
          >
            {/* Animated glow effect */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 to-emerald-500/20 blur-xl -z-10"
            />

            {/* Mail Icon with pulse */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mb-4"
            >
              <Mail className="w-12 h-12 text-emerald-400 mx-auto" strokeWidth={1.5} />
            </motion.div>

            <h2 className="text-xl font-bold text-emerald-400 mb-4">Próximos Passos:</h2>

            {/* Checklist with staggered animation */}
            <div className="space-y-3 text-left">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-start gap-3"
              >
                <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <p className="text-slate-200 text-sm">
                  <strong>Verifique sua caixa de entrada</strong> (ou spam/promoções)
                </p>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex items-start gap-3"
              >
                <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <p className="text-slate-200 text-sm">
                  <strong>Todo o conteúdo completo</strong> do seu mapa está no e-mail
                </p>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-start gap-3"
              >
                <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <p className="text-slate-200 text-sm">
                  <strong>Descubra sua conexão ancestral</strong> e próximas ações
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Gratitude line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-purple-300 text-sm italic mt-6"
          >
            🙏 Gratidão por sua presença nesta jornada sagrada
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="pt-8 space-y-4"
          >
            <a 
              href="https://mail.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-[#FF9500] to-amber-500 text-white font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform duration-200 shadow-lg"
            >
              📧 Abrir meu e-mail agora
            </a>

            <div>
              <a 
                href="/"
                className="inline-block text-slate-400 font-medium px-6 py-2 rounded-full hover:text-slate-200 hover:bg-slate-800/50 transition-all duration-200"
              >
                Voltar ao Início
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Obrigado;

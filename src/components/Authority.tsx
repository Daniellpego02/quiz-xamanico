import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { Award, MapPin, ShieldCheck, Star } from 'lucide-react';
import { QuizPath } from '../types';

interface AuthorityProps {
  onNext: () => void;
  quizPath?: QuizPath;
}

export const Authority: React.FC<AuthorityProps> = ({ onNext, quizPath = 'finance' }) => {
  // Content niched by path
  const content = {
    finance: {
      intro: "Xamã e Terapeuta Holística há 12 anos, tive a honra de testemunhar transformações profundas através do Mapa Xamânico. Criei esta ferramenta após anos de estudo em sabedoria ancestral, Kaballah e ferramentas espirituais.",
      middle: "O Mapa Xamânico não é apenas um diagnóstico — é um <strong className=\"text-[#FF9500] font-bold border-b border-[#FF9500]/30 pb-0.5\">caminho prático</strong> para você se reconectar com sua essência, curar feridas emocionais e destravar bloqueios invisíveis que impedem sua prosperidade.",
      final: "Se você sente que há áreas da sua vida que ainda não floresceram, este é o momento de trazer luz a esses pontos. Mais de <strong className=\"text-white\">20.000 pessoas</strong> já transformaram suas vidas com meu método."
    },
    relationship: {
      intro: "Xamã e Terapeuta Holística especializada em cura relacional há 12 anos. Dediquei minha vida a compreender os padrões emocionais ancestrais que sabotam nossos relacionamentos. Minha jornada começou quando percebi que os maiores bloqueios no amor não estão fora — mas dentro de nós.",
      middle: "Através do Mapa Xamânico de Relacionamentos, você vai descobrir as <strong className=\"text-purple-400 font-bold border-b border-purple-400/30 pb-0.5\">raízes emocionais</strong> que te fazem repetir padrões dolorosos. Não é terapia convencional — é um despertar profundo da sua capacidade de amar e ser amado de forma saudável.",
      final: "Trabalho com mulheres e homens que carregam feridas de relacionamentos passados, medo de rejeição e padrões herdados da família. Mais de <strong className=\"text-white\">20.000 pessoas</strong> já curaram seus corações e construíram relações verdadeiras através do meu método."
    }
  };

  const selectedContent = content[quizPath];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen max-w-lg mx-auto px-6 py-8 flex flex-col items-center relative z-10"
    >
      <div className="text-center mb-8">
        <h2 className="text-lg font-serif font-bold text-[#FF9500] mb-4 uppercase tracking-widest flex items-center justify-center gap-2 drop-shadow-md">
          <Star className="w-4 h-4 fill-[#FF9500] animate-pulse" /> Prazer, sou Anahí Solara
        </h2>
        
        {/* FOTO DA EXPERT */}
        <div className="relative mb-8 group">
          {/* Aura brilhante atrás da foto */}
          <div className="absolute inset-0 bg-[#FF9500] rounded-full blur-[30px] opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
          
          <div className="w-44 h-44 mx-auto rounded-full border-2 border-[#FF9500]/50 p-1 shadow-2xl relative z-10 bg-black/20 backdrop-blur-sm">
             <div className="w-full h-full rounded-full overflow-hidden border border-white/10">
               {/* 👇 AQUI ESTÁ A MUDANÇA: Usando a foto local expert.jpg */}
               <img 
                 src="/expert.jpg" 
                 alt="Anahí Solara" 
                 className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                 onError={(e) => {
                   // Fallback caso a pessoa esqueça de colocar a foto
                   e.currentTarget.src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=388&auto=format&fit=crop";
                 }}
               />
             </div>
          </div>
        </div>
        
        {/* Badges de Autoridade */}
        <div className="flex flex-wrap justify-center gap-3 text-[11px] text-slate-200 font-medium mb-4">
          <span className="bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1 shadow-lg">
            <Award className="w-3 h-3 text-[#FF9500]" /> 12 Anos de Exp.
          </span>
          <span className="bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1 shadow-lg">
            <ShieldCheck className="w-3 h-3 text-[#FF9500]" /> Fundadora Xamã Interior
          </span>
          <span className="bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1 shadow-lg">
            <MapPin className="w-3 h-3 text-[#FF9500]" /> 15+ Países
          </span>
        </div>
      </div>

      {/* Box de Texto (Vidro) */}
      <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 space-y-5 text-slate-200 leading-relaxed shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] relative overflow-hidden text-sm md:text-base">
        {/* Elementos decorativos de fundo */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-4 right-6 text-6xl text-white/5 font-serif font-black">"</div>

        <p className="relative z-10">
          <strong className="text-white text-lg font-serif">
            {quizPath === 'relationship' ? 'Especialista em Cura Relacional' : 'Xamã e Terapeuta Holística há 12 anos'}
          </strong>, {selectedContent.intro}
        </p>

        <p className="relative z-10" dangerouslySetInnerHTML={{ __html: selectedContent.middle }} />

        <p className="relative z-10" dangerouslySetInnerHTML={{ __html: selectedContent.final }} />

        <div className="pt-6 mt-2 relative z-10">
            <p className="flex items-center gap-3 text-emerald-300 font-medium text-sm bg-emerald-950/40 p-4 rounded-xl border border-emerald-500/20 shadow-inner">
            <ShieldCheck className="w-6 h-6 shrink-0 text-emerald-400" />
            Agora é a sua vez de viver essa transformação.
            </p>
        </div>
      </div>

      {/* Botão CTA */}
      <div className="w-full mt-10 relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-purple-600 rounded-xl blur opacity-25"></div>
        <Button onClick={onNext} className="relative shadow-2xl">
          Continuar Minha Jornada
        </Button>
      </div>
    </motion.div>
  );
};
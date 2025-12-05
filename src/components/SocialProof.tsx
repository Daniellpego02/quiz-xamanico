import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, ShieldCheck } from 'lucide-react';

interface SocialProofProps {
  onNext: () => void;
}

// Map of realistic profile images to replace generic avatars
// Simulating high-quality AI generated portraits
const avatarImages: Record<string, string> = {
  "xama_interior": "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=150&h=150", 
  "neuropsicopedagogafa_titania": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150",
  "rafaelmoraes": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
  "cristinabertyfit": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
  "drysoriano": "https://images.unsplash.com/photo-1554151228-14d9def656ec?auto=format&fit=crop&q=80&w=150&h=150",
  "julimma_2": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
  "aninhajalandiqueimasemcodimas": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=150&h=150",
  "rafaelgasta_": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
  "jasmine_awache": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
  "prof.rohaan": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
  "iavella": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
};

// Grouped comments into "Threads" to simulate posts
const instagramThreads = [
  {
    id: 1,
    postedTime: "2 dias",
    likes: "4.291 curtidas",
    comments: [
      {
        username: "neuropsicopedagogafa_titania",
        text: "Ahhh incrível!! @igrejalarissa394, pois amei o meu mapa. @rgnlarinho3394 fala com o Juan Xamã",
        time: "2h",
        likes: 12,
        hasAvatar: true
      },
      {
        username: "rafaelmoraes",
        text: "Já tive um encontro com meu animal guia, só quero ter certeza mesma. Atranez mapa xamânico ❤️🙌🏻🙏",
        time: "5h",
        likes: 48,
        hasAvatar: true
      },
      {
        username: "cristinabertyfit",
        text: "Sinceramente! É o melhor que já pude ver e ler! Traz clareza, e verdades sobre você! 😍🙏🏼",
        time: "1d",
        likes: 156,
        hasAvatar: true
      }
    ]
  },
  {
    id: 2,
    postedTime: "5 dias",
    likes: "8.102 curtidas",
    comments: [
      {
        username: "drysoriano",
        text: "Eu fiz o meu e amei. 🔥👏😍 super recomendo. Gratidão",
        time: "3h",
        likes: 24,
        hasAvatar: true
      },
      {
        username: "julimma_2",
        text: "Maravilhoso!! Fiz e recomendo ❤️🥰🥰",
        time: "8h",
        likes: 89,
        hasAvatar: true
      },
      {
        username: "aninhajalandiqueimasemcodimas",
        text: "Fiz o meu amei, muitas coisas que de certa forma eu não tinha conhecimento foram se encaixando. Amei de vdd vale muito a pena",
        time: "1d",
        likes: 230,
        hasAvatar: true
      }
    ]
  },
  {
    id: 3,
    postedTime: "1 semana",
    likes: "12.5k curtidas",
    comments: [
      {
        username: "rafaelgasta_",
        text: "Sensacional!!",
        time: "2d",
        likes: 15,
        hasAvatar: true
      },
      {
        username: "jasmine_awache",
        text: "Fiz o ano passado e só verdades acontecendo, é muito verdadeiro! 🙏🥰",
        time: "3d",
        likes: 342,
        hasAvatar: true
      },
      {
        username: "prof.rohaan",
        text: "Recebi meu mapa ontem a noite e achei profundamente esclarecedor. Gratidão por essa ferramenta 🙏🏽",
        time: "4d",
        likes: 521,
        hasAvatar: true
      },
      {
        username: "iavella",
        text: "Façam pessoal vale muito a pena, eu amei o meu. E abriu a minha mente para muitas coisas ❤️🙌🙏",
        time: "1sem",
        likes: 890,
        hasAvatar: true
      }
    ]
  }
];

const InstagramMockup: React.FC<{ thread: typeof instagramThreads[0] }> = ({ thread }) => (
  <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden mb-8 text-white text-sm font-sans shadow-2xl max-w-sm mx-auto w-full relative group">
    {/* Subtle glow behind card */}
    <div className="absolute -inset-1 bg-gradient-to-b from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-lg -z-10"></div>

    {/* Header */}
    <div className="flex items-center justify-between p-3 border-b border-white/5">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 p-[2px]">
          <div className="w-full h-full rounded-full bg-black border-2 border-black overflow-hidden">
             <img src={avatarImages["xama_interior"]} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
        <span className="font-bold text-xs">xama_interior</span>
      </div>
      <MoreHorizontal className="w-4 h-4 text-gray-400" />
    </div>

    {/* Content Area (Fake Image/Post context) */}
    <div className="bg-white/5 p-3 text-gray-300 text-xs border-b border-white/5">
       <span className="font-bold text-white">xama_interior</span> ✨ Depoimentos de quem já destravou sua prosperidade com o Mapa Xamânico... <span className="text-gray-500">mais</span>
    </div>

    {/* Actions */}
    <div className="p-3">
       <div className="flex items-center gap-4 mb-2">
         <Heart className="w-5 h-5 text-red-500 fill-red-500" />
         <MessageCircle className="w-5 h-5 text-white" />
         <Send className="w-5 h-5 text-white" />
         <div className="flex-1"></div>
         <Bookmark className="w-5 h-5 text-white" />
       </div>
       <div className="font-bold text-xs mb-1">{thread.likes}</div>
       <div className="text-[10px] text-gray-500 uppercase mb-3">HÁ {thread.postedTime.toUpperCase()}</div>
    </div>

    {/* Comments Section */}
    <div className="px-3 pb-3 space-y-4">
      <div className="text-gray-500 text-xs mb-2">Comentários mais relevantes ▼</div>
      {thread.comments.map((comment, idx) => (
        <div key={idx} className="flex gap-3">
          <div className="w-8 h-8 shrink-0 rounded-full bg-gray-800 border border-white/10 overflow-hidden">
             <img 
               src={avatarImages[comment.username] || `https://ui-avatars.com/api/?name=${comment.username}&background=random&color=fff`} 
               alt={comment.username} 
               className="w-full h-full object-cover"
             />
          </div>
          <div className="flex-1">
             <div className="flex items-baseline gap-2">
                <span className="font-bold text-xs text-white">{comment.username}</span>
                <span className="text-gray-400 text-[10px]">{comment.time}</span>
             </div>
             <p className="text-xs text-slate-200 leading-snug mt-0.5 font-light">
               {comment.text}
             </p>
             <div className="flex items-center gap-3 mt-1.5 text-[10px] text-gray-500 font-bold">
               <span>Responder</span>
               <span>Traduzir</span>
             </div>
          </div>
          <div className="shrink-0 flex flex-col items-center gap-1 pt-1">
             <Heart className="w-3 h-3 text-gray-500" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const SocialProof: React.FC<SocialProofProps> = ({ onNext }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen max-w-lg mx-auto px-4 py-8 flex flex-col relative z-10"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif font-bold text-white leading-tight mb-2 drop-shadow-lg">
          O que estão falando no <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">Instagram</span>
        </h2>
        <p className="text-slate-400 text-sm">
          Veja os comentários reais de quem já fez o Mapa:
        </p>
      </div>

      <div className="space-y-6 mb-12">
        {instagramThreads.map((thread, i) => (
          <motion.div
            key={thread.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.2 }}
          >
            <InstagramMockup thread={thread} />
          </motion.div>
        ))}
      </div>

      <div className="text-center space-y-4 pt-4 pb-8 mt-auto sticky bottom-0 bg-black/80 backdrop-blur-lg p-5 border-t border-white/10 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <Button onClick={onNext} pulse className="shadow-orange-500/20 w-full relative overflow-hidden">
          QUERO VER MEU RESULTADO
        </Button>
        <div className="flex items-center justify-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-950/30 p-2 rounded-full border border-emerald-500/20">
          <ShieldCheck className="w-4 h-4" />
          Satisfação Garantida ou Seu Dinheiro de Volta
        </div>
      </div>
    </motion.div>
  );
};
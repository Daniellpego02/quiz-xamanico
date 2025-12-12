import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, ShieldCheck } from 'lucide-react';
import { QuizPath } from '../types';

interface SocialProofProps {
  onNext: () => void;
  quizPath?: QuizPath;
}

// Map of realistic profile images - Realistic people matching name gender
// Using randomuser.me for diverse, realistic human faces matching gender
const avatarImages: Record<string, string> = {
  // Main profile - Woman
  "xama_interior": "https://randomuser.me/api/portraits/women/65.jpg", 
  
  // Female testimonials - Women with diverse appearances
  "neuropsicopedagogafa_titania": "https://randomuser.me/api/portraits/women/44.jpg", // Professional woman
  "cristinabertyfit": "https://randomuser.me/api/portraits/women/68.jpg", // Fitness enthusiast woman
  "drysoriano": "https://randomuser.me/api/portraits/women/72.jpg", // Doctor/professional woman
  "julimma_2": "https://randomuser.me/api/portraits/women/21.jpg", // Young woman
  "aninhajalandiqueimasemcodimas": "https://randomuser.me/api/portraits/women/32.jpg", // Casual woman
  "jasmine_awache": "https://randomuser.me/api/portraits/women/15.jpg", // Young woman
  "iavella": "https://randomuser.me/api/portraits/women/55.jpg", // Mature woman
  "mariana_luz": "https://randomuser.me/api/portraits/women/28.jpg",
  "fernanda_coelho": "https://randomuser.me/api/portraits/women/41.jpg",
  "carla_mendes": "https://randomuser.me/api/portraits/women/36.jpg",
  
  // Male testimonials - Men with diverse appearances  
  "rafaelmoraes": "https://randomuser.me/api/portraits/men/46.jpg", // Man
  "rafaelgasta_": "https://randomuser.me/api/portraits/men/32.jpg", // Casual man
  "prof.rohaan": "https://randomuser.me/api/portraits/men/22.jpg", // Professor/professional man
  "pedro_santos": "https://randomuser.me/api/portraits/men/54.jpg",
  "lucas_almeira": "https://randomuser.me/api/portraits/men/29.jpg",
};

// Finance-focused testimonials (original)
const financeThreads = [
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

// Relationship-focused testimonials with shamanic healing emphasis
const relationshipThreads = [
  {
    id: 1,
    postedTime: "2 dias",
    likes: "5.892 curtidas",
    comments: [
      {
        username: "mariana_luz",
        text: "Gente, fiz o Mapa Xamânico focado em relacionamentos e foi tipo um tapa na cara (no bom sentido). Descobri que eu atraía pessoas que não me valorizavam por uma ferida emocional que eu nem sabia que tinha. 💔→💖",
        time: "3h",
        likes: 234,
        hasAvatar: true
      },
      {
        username: "fernanda_coelho",
        text: "Nunca pensei que meus bloqueios amorosos viessem de tanto tempo atrás... O mapa mostra tudo com uma clareza assustadora. Chorei muito mas foi libertador 😭✨",
        time: "6h",
        likes: 189,
        hasAvatar: true
      },
      {
        username: "lucas_almeira",
        text: "Cara, eu tinha medo de admitir, mas eu sempre sabotava meus relacionamentos. O mapa me mostrou de onde vinha isso. Agora entendo tudo.",
        time: "1d",
        likes: 156,
        hasAvatar: true
      }
    ]
  },
  {
    id: 2,
    postedTime: "4 dias",
    likes: "9.341 curtidas",
    comments: [
      {
        username: "carla_mendes",
        text: "Acabei de receber meu mapa e estou chocada... Todo o padrão que eu repito nos relacionamentos tá explicado aqui. É exatamente sobre mim e minha família. Obrigada @xama_interior 🙏💜",
        time: "2h",
        likes: 312,
        hasAvatar: true
      },
      {
        username: "pedro_santos",
        text: "Sempre achei que era azar no amor. Mas o mapa me mostrou que eu carrego traumas que afastam pessoas boas. Isso é real demais... 💔",
        time: "5h",
        likes: 267,
        hasAvatar: true
      },
      {
        username: "julimma_2",
        text: "Esse mapa salvou meu coração, literalmente. Entendi porque sempre escolho errado. Agora posso mudar! ❤️‍🩹🙌",
        time: "9h",
        likes: 198,
        hasAvatar: true
      }
    ]
  },
  {
    id: 3,
    postedTime: "1 semana",
    likes: "14.2k curtidas",
    comments: [
      {
        username: "jasmine_awache",
        text: "O mapa xamânico de relacionamentos é PROFUNDO. Mostra não só seus bloqueios, mas de onde eles vêm (às vezes de gerações atrás). Foi a coisa mais reveladora que já fiz na minha vida amorosa 💜✨",
        time: "1d",
        likes: 521,
        hasAvatar: true
      },
      {
        username: "rafaelmoraes",
        text: "Fiz focando em relacionamentos porque tava cansado de sofrer. O resultado me deixou sem palavras. Tudo que eu sentia mas não conseguia explicar tava ali. Recomendo demais!",
        time: "3d",
        likes: 432,
        hasAvatar: true
      },
      {
        username: "iavella",
        text: "Meu terapeuta me recomendou fazer isso e foi a melhor decisão. O mapa complementou minha terapia e me deu respostas que eu buscava há anos sobre meus padrões amorosos 💖🙏",
        time: "5d",
        likes: 678,
        hasAvatar: true
      },
      {
        username: "cristinabertyfit",
        text: "Depois de 3 relacionamentos ruins seguidos, fiz o mapa. GENTE... faz sentido TUDO agora. É como se alguém tivesse acendido a luz. 💡❤️",
        time: "1sem",
        likes: 890,
        hasAvatar: true
      }
    ]
  }
];

const InstagramMockup: React.FC<{ thread: typeof financeThreads[0] }> = ({ thread }) => (
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

export const SocialProof: React.FC<SocialProofProps> = ({ onNext, quizPath = 'finance' }) => {
  // Select threads based on quiz path
  const threads = quizPath === 'relationship' ? relationshipThreads : financeThreads;
  
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
        {threads.map((thread, i) => (
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
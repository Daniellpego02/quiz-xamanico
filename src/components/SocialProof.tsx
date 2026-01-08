import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, ShieldCheck } from 'lucide-react';
import { QuizPath } from '../types';

interface SocialProofProps {
  onNext: () => void;
  quizPath?: QuizPath;
}

// Map of realistic profile images - Real-looking Brazilian people matching names
// Using a mix of services for diverse, realistic Brazilian faces
const avatarImages: Record<string, string> = {
  // Main profile - Woman (Anahí Solara)
  "xama_interior": "https://i.pravatar.cc/150?img=47", 
  
  // FASE 3 New testimonials - Female
  "carol.design_": "https://i.pravatar.cc/150?img=35", // Designer woman - Carol
  "marta_vaz": "https://i.pravatar.cc/150?img=36", // Mature woman - Marta
  "juliana_p": "https://i.pravatar.cc/150?img=43", // Young woman - Juliana
  "fernanda.g": "https://i.pravatar.cc/150?img=32", // Woman - Fernanda
  "beatriz.l": "https://i.pravatar.cc/150?img=29", // Woman - Beatriz
  
  // FASE 3 New testimonials - Male
  "roberto.santos88": "https://i.pravatar.cc/150?img=17", // Man - Roberto
  
  // Original Female testimonials
  "neuropsicopedagogafa_titania": "https://i.pravatar.cc/150?img=45", // Professional woman - Titania
  "cristinabertyfit": "https://i.pravatar.cc/150?img=49", // Fitness woman - Cristina
  "drysoriano": "https://i.pravatar.cc/150?img=44", // Doctor woman - Soriano
  "julimma_2": "https://i.pravatar.cc/150?img=43", // Young woman - Juliana
  "aninhajalandiqueimasemcodimas": "https://i.pravatar.cc/150?img=38", // Casual young woman - Ana
  "jasmine_awache": "https://i.pravatar.cc/150?img=31", // Young woman - Jasmine
  "iavella": "https://i.pravatar.cc/150?img=41", // Mature woman - Isabella
  "mariana_luz": "https://i.pravatar.cc/150?img=48", // Young woman - Mariana
  "fernanda_coelho": "https://i.pravatar.cc/150?img=32", // Woman - Fernanda
  "carla_mendes": "https://i.pravatar.cc/150?img=42", // Woman - Carla
  
  // Original Male testimonials
  "rafaelmoraes": "https://i.pravatar.cc/150?img=12", // Man - Rafael
  "rafaelgasta_": "https://i.pravatar.cc/150?img=13", // Casual man - Rafael
  "prof.rohaan": "https://i.pravatar.cc/150?img=15", // Professional man - Professor
  "pedro_santos": "https://i.pravatar.cc/150?img=14", // Man - Pedro
  "lucas_almeira": "https://i.pravatar.cc/150?img=11", // Young man - Lucas
};

// Finance-focused testimonials - NEW from FASE 3
const financeThreads = [
  {
    id: 1,
    postedTime: "1 dia",
    likes: "6.823 curtidas",
    comments: [
      {
        username: "carol.design_",
        text: "Gente, eu tô tremendo. Fiz o desbloqueio do Dia 3 ontem de manhã. Hoje à tarde um cliente antigo me pagou uma dívida de 2021 que eu dava como perdida. R$ 1.400,00 na conta do nada. O mapa é real!",
        time: "4h",
        likes: 412,
        hasAvatar: true
      },
      {
        username: "marta_vaz",
        text: "Descobri que meu bloqueio vinha do meu avô que faliu. Chorei horrores ouvindo o áudio, mas foi um choro de alívio. A sensação de culpa foi embora. Obrigada Anahí! ✨",
        time: "6h",
        likes: 287,
        hasAvatar: true
      }
    ]
  },
  {
    id: 2,
    postedTime: "3 dias",
    likes: "9.541 curtidas",
    comments: [
      {
        username: "roberto.santos88",
        text: "Eu achava que minha dor no trapézio era estresse. Fiz a técnica de Ressonância Inversa e juro... o peso sumiu na hora. Parece que tiraram um saco de cimento das minhas costas.",
        time: "2h",
        likes: 534,
        hasAvatar: true
      },
      {
        username: "juliana_p",
        text: "Juuuuura que funciona mesmo! Fiz a técnica do Pote de Ouro e a Receita Federal liberou uma restituição travada há 2 anos! R$ 2.400 na conta! Tô em choque! 😱",
        time: "7h",
        likes: 892,
        hasAvatar: true
      },
      {
        username: "fernanda.g",
        text: "Minha mão era furada real. Depois do Dia 7, pela primeira vez sobrou dinheiro no fim do mês. Tô me sentindo 'rica' de verdade.",
        time: "1d",
        likes: 456,
        hasAvatar: true
      }
    ]
  },
  {
    id: 3,
    postedTime: "5 dias",
    likes: "11.2k curtidas",
    comments: [
      {
        username: "beatriz.l",
        text: "Sou mãe solo e não tenho tempo. Os áudios de 10 minutos eu ouço no ônibus. Já sinto a diferença no olhar das pessoas e o dinheiro começou a render mais.",
        time: "3h",
        likes: 678,
        hasAvatar: true
      },
      {
        username: "neuropsicopedagogafa_titania",
        text: "Pessoal, funciona mesmo! O mapa mostra exatamente onde sua energia está bloqueada. Depois que fiz a limpeza do Dia 2, apareceram 3 oportunidades de trabalho do nada! 🙏✨",
        time: "8h",
        likes: 523,
        hasAvatar: true
      },
      {
        username: "rafaelmoraes",
        text: "Cara, eu era cético. Mas depois de fazer o protocolo completo, minha vida mudou. Consegui negociar uma dívida que tava me sufocando e ainda sobrou dinheiro. Gratidão 🙌",
        time: "1d",
        likes: 712,
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
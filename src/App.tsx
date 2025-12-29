import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppStep, QuizPath } from './types';
import { Hero } from './components/Hero';
import { Quiz } from './components/Quiz';
import { Authority } from './components/Authority';
import { SocialProof } from './components/SocialProof';
import { AnalysisLoading } from './components/AnalysisLoading';
import Offer from './components/Offer';
import Obrigado from './Obrigado';
import Oferta1 from './Oferta1';
import Oferta2 from './Oferta2';
import Upsell1 from './Upsell1';
import Downsell1 from './Downsell1';
import { AntiPlagiarismProtection } from './components/AntiPlagiarismProtection';

function App() {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.HERO);
  const [quizPath, setQuizPath] = useState<QuizPath>('finance'); // Padrão
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    // Inicialização do Pixel se necessário
  }, []);

  const goToStep = (step: AppStep) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(step);
  };

  const handleStartQuiz = () => {
    goToStep(AppStep.QUIZ);
  };

  // Agora recebe o caminho escolhido e o nome do usuário
  const handleQuizComplete = (path: QuizPath, name: string) => {
    setQuizPath(path);
    setUserName(name);
    goToStep(AppStep.LOADING); // Go directly to loading screen
  };

  const handleAuthorityNext = () => {
    goToStep(AppStep.SOCIAL_PROOF);
  };

  const handleSocialProofNext = () => {
    goToStep(AppStep.LOADING);
  };

  const handleLoadingComplete = () => {
    goToStep(AppStep.OFFER);
  };

  const renderStep = () => {
    switch (currentStep) {
      case AppStep.HERO:
        return <Hero onStart={handleStartQuiz} />;
      case AppStep.QUIZ:
        return <Quiz onComplete={handleQuizComplete} />;
      case AppStep.AUTHORITY:
        return <Authority onNext={handleAuthorityNext} quizPath={quizPath} />;
      case AppStep.SOCIAL_PROOF:
        return <SocialProof onNext={handleSocialProofNext} quizPath={quizPath} />;
      case AppStep.LOADING:
        return <AnalysisLoading onComplete={handleLoadingComplete} quizPath={quizPath} />;
      case AppStep.OFFER:
        return <Offer userName={userName} />;
      default:
        return <Hero onStart={handleStartQuiz} />;
    }
  };

  const MainQuizFlow = () => (
    <main className="min-h-[100dvh] text-slate-100 overflow-x-hidden selection:bg-orange-500 selection:text-white relative">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] z-0"></div>
      
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>
    </main>
  );

  return (
    <>
      {/* Anti-Plagiarism Protection - Active on all pages */}
      <AntiPlagiarismProtection />
      
      <Routes>
        <Route path="/" element={<MainQuizFlow />} />
        <Route path="/obrigado" element={<Obrigado />} />
        <Route path="/oferta1" element={<Oferta1 userName={userName} />} />
        <Route path="/oferta2" element={<Oferta2 userName={userName} />} />
        <Route path="/up1" element={<Upsell1 userName={userName} />} />
        <Route path="/down1" element={<Downsell1 userName={userName} />} />
      </Routes>
    </>
  );
}

export default App;
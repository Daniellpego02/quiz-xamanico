import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AppStep, QuizPath } from './types';
import { Hero } from './components/Hero';
import { Quiz } from './components/Quiz';
import { Authority } from './components/Authority';
import { SocialProof } from './components/SocialProof';
import { AnalysisLoading } from './components/AnalysisLoading';
import { Offer } from './components/Offer';

function App() {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.HERO);
  const [quizPath, setQuizPath] = useState<QuizPath>('finance'); // Padrão

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

  // Agora recebe o caminho escolhido
  const handleQuizComplete = (path: QuizPath) => {
    setQuizPath(path);
    goToStep(AppStep.AUTHORITY); // Mantendo o ritual de conexão
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
        return <Authority onNext={handleAuthorityNext} />;
      case AppStep.SOCIAL_PROOF:
        return <SocialProof onNext={handleSocialProofNext} />;
      case AppStep.LOADING:
        return <AnalysisLoading onComplete={handleLoadingComplete} />;
      case AppStep.OFFER:
        return <Offer quizPath={quizPath} />; // Passa o caminho para a oferta
      default:
        return <Hero onStart={handleStartQuiz} />;
    }
  };

  return (
    <main className="min-h-[100dvh] text-slate-100 overflow-x-hidden selection:bg-orange-500 selection:text-white relative">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] z-0"></div>
      
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default App;
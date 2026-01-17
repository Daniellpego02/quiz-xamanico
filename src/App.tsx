import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppStep, QuizPath } from './types';
import { Hero } from './components/Hero';
import { Quiz } from './components/Quiz';
import { Authority } from './components/Authority';
import { SocialProof } from './components/SocialProof';
import { AnalysisLoading } from './components/AnalysisLoading';
import { AntiPlagiarismProtection } from './components/AntiPlagiarismProtection';

// Lazy load heavy components for better initial load performance
const VSLPage = lazy(() => import('./components/VSLPage'));
const OfferNew = lazy(() => import('./components/OfferNew'));
const Obrigado = lazy(() => import('./Obrigado'));
const Oferta1 = lazy(() => import('./Oferta1'));
const Oferta2 = lazy(() => import('./Oferta2'));
const Upsell1 = lazy(() => import('./Upsell1'));
const Downsell1 = lazy(() => import('./Downsell1'));

// Simple loading spinner for lazy components
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#050505]">
    <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

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
    goToStep(AppStep.VSL);
  };

  const handleVSLCheckout = () => {
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
        return <AnalysisLoading onComplete={handleLoadingComplete} quizPath={quizPath} userName={userName} />;
      case AppStep.VSL:
        return (
          <Suspense fallback={<LoadingFallback />}>
            <VSLPage userName={userName} onCheckout={handleVSLCheckout} />
          </Suspense>
        );
      case AppStep.OFFER:
        return (
          <Suspense fallback={<LoadingFallback />}>
            <OfferNew userName={userName} />
          </Suspense>
        );
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
        <Route path="/obrigado" element={<Suspense fallback={<LoadingFallback />}><Obrigado /></Suspense>} />
        <Route path="/oferta1" element={<Suspense fallback={<LoadingFallback />}><Oferta1 userName={userName} /></Suspense>} />
        <Route path="/oferta2" element={<Suspense fallback={<LoadingFallback />}><Oferta2 userName={userName} /></Suspense>} />
        <Route path="/up1" element={<Suspense fallback={<LoadingFallback />}><Upsell1 userName={userName} /></Suspense>} />
        <Route path="/down1" element={<Suspense fallback={<LoadingFallback />}><Downsell1 userName={userName} /></Suspense>} />
      </Routes>
    </>
  );
}

export default App;
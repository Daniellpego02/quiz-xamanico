export enum AppStep {
  HERO = 'HERO',
  QUIZ = 'QUIZ',
  AUTHORITY = 'AUTHORITY',
  SOCIAL_PROOF = 'SOCIAL_PROOF',
  LOADING = 'LOADING',
  OFFER = 'OFFER',
}

export interface QuestionOption {
  label: string;
  value: string;
  icon?: string;
  isNew?: boolean;
}

export interface QuizQuestion {
  id: number;
  title: string;
  text: string;
  type?: 'select' | 'input'; // ESSENCIAL: Permite perguntas de digitar
  placeholder?: string;      // ESSENCIAL: Texto de ajuda no campo
  options?: QuestionOption[];
}

declare global {
  interface Window {
    fbq: any;
  }
  namespace JSX {
    interface IntrinsicElements {
      'vturb-smartplayer': any;
    }
  }
}
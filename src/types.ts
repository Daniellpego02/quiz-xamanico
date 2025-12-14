export enum AppStep {
  HERO = 'HERO',
  QUIZ = 'QUIZ',
  AUTHORITY = 'AUTHORITY',
  SOCIAL_PROOF = 'SOCIAL_PROOF',
  LOADING = 'LOADING',
  OFFER = 'OFFER',
}

export type QuizPath = 'finance' | 'relationship';

export interface QuestionOption {
  label: string;
  sublabel?: string; // Micro-copy below the main label for emotional impact
  value: string;
  icon?: string;
  isNew?: boolean;
  path?: QuizPath; // Define qual caminho essa opção ativa
}

export interface QuizQuestion {
  id: number;
  title: string;
  text: string;
  type?: 'select' | 'input';
  placeholder?: string;
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
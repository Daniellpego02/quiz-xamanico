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
  options: QuestionOption[];
}

// Extend window for Facebook Pixel and custom elements
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
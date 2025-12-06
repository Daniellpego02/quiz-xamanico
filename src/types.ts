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
  type?: 'select' | 'input'; // Adicionado suporte para input de texto
  placeholder?: string;      // Texto de exemplo para o input
  options?: QuestionOption[]; // Opcional agora, pois input não tem opções
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
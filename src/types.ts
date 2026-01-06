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
  subtext?: string; // Additional explanatory text below the main text
  type?: 'select' | 'input';
  placeholder?: string;
  options?: QuestionOption[];
  singleButton?: boolean; // For questions with only one option (e.g., readiness confirmation)
  validationText?: string; // Italic text below options for emotional validation
  warningText?: string; // Red warning text below options for importance
  emotionalContext?: string; // Emotional context text before options
  hasOtherOption?: boolean; // For question 4 - shows "other" as a link below cards
  bridgeText?: string; // Bridge text shown before button (for question 6)
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'vturb-smartplayer': any;
    }
  }
}
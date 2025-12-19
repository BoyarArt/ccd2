export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface AnalysisResult {
  score: number;
  errors: string[];
  warnings: string[];
  passes: string[];
  summary: string;
}

export enum SectionId {
  HOME = 'home',
  STANDARDS = 'standards',
  IMPORTANCE = 'importance',
  PRINCIPLES = 'principles',
  TIMELINE = 'timeline',
  ANALYZER = 'analyzer',
  CONTACT = 'contact'
}
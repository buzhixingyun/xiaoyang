export enum AppStage {
  INTRO = 'INTRO',
  MEMORIES = 'MEMORIES',
  TRANSITION = 'TRANSITION',
  GAME = 'GAME',
  CARD = 'CARD',
  MAIN = 'MAIN'
}

export interface MemoryItem {
  title: string;
  content: string;
  icon: string;
}

export interface HeartMessage {
  text: string;
  bg: string;
  color: string;
  border?: string;
}
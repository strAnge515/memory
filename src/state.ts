import type { GameState, Settings } from './types';

export const FLIP_BACK_DELAY_MS: number = 1000;
export const GAME_OVER_DELAY_MS: number = 2500;
export const CARDS_PER_PAIR: number = 2;
export const SETTINGS_COUNT: number = 3;
export const DEFAULT_THEME: string = 'code-vibes';

export const settings: Settings = {
  theme: '',
  player: '',
  size: '',
};

export const gameState: GameState = {
  currentPlayer: 'orange',
  playerScores: {
    orange: 0,
    blue: 0,
  },
};

export const flippedCards: HTMLElement[] = [];

export type PlayColor = 'orange' | 'blue';

export type Winner = PlayColor | 'draw';

export interface Settings {
  theme: string;
  player: string;
  size: string;
}

export interface GameState {
  currentPlayer: PlayColor;
  playerScores: {
    orange: number;
    blue: number;
  };
}

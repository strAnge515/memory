import { renderGameOver } from './render';
import { CARDS_PER_PAIR, FLIP_BACK_DELAY_MS, flippedCards, gameState, settings } from './state';
import { getCardTemplate } from './templates';
import type { PlayColor, Winner } from './types';

/** Builds and shuffles the cards for the chosen size and renders the board. */
export function startGame(): void {
  const cards = shuffleCards(buildCardPairs(getPairCount(settings.size)));
  resetGameState();
  setGameTheme();
  updateScoreBoard();
  renderBoard(cards);
}

/** Registers the click listener of the game board. */
export function initBoard(): void {
  const board = document.getElementById('game-board');
  board?.addEventListener('click', handleCardClick);
}

/** Removes the theme from the body when the game is left. */
export function removeGameTheme(): void {
  delete document.body.dataset.theme;
}

/**
 * Compares the scores of both players.
 * @returns The player with the most points or 'draw' if both are equal.
 */
export function getWinner(): Winner {
  const { orange, blue } = gameState.playerScores;
  if (orange === blue) {
    return 'draw';
  }
  return orange > blue ? 'orange' : 'blue';
}

/**
 * Calculates the number of card pairs from the board size.
 * @param size - The board size, e.g. "4x6".
 * @returns The number of card pairs.
 */
function getPairCount(size: string): number {
  const fieldSize = size.split('x').map(Number);
  return (fieldSize[0] * fieldSize[1]) / CARDS_PER_PAIR;
}

/**
 * Creates an array in which every card number appears twice.
 * @param pairCount - The number of card pairs.
 * @returns The card numbers, each one twice.
 */
function buildCardPairs(pairCount: number): number[] {
  const cards: number[] = [];

  for (let i = 1; i <= pairCount; i++) {
    cards.push(i);
    cards.push(i);
  }

  return cards;
}

/**
 * Shuffles the cards randomly using the Fisher-Yates algorithm.
 * @param cards - The card numbers to shuffle.
 * @returns The shuffled card numbers.
 */
function shuffleCards(cards: number[]): number[] {
  for (let currentIndex = cards.length - 1; currentIndex > 0; currentIndex--) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    [cards[currentIndex], cards[randomIndex]] = [cards[randomIndex], cards[currentIndex]];
  }

  return cards;
}

/** Saves the chosen theme on the body so all styles can react to it. */
function setGameTheme(): void {
  document.body.dataset.theme = settings.theme;
}

/**
 * Renders all cards into the game board.
 * @param cards - The shuffled card numbers.
 */
function renderBoard(cards: number[]): void {
  const board = document.getElementById('game-board') as HTMLElement;
  board.innerHTML = '';
  board.dataset.size = settings.size;

  cards.forEach((cardId) => {
    board.innerHTML += getCardTemplate(settings.theme, cardId);
  });
}

/**
 * Flips the clicked card and checks for a match once two cards are open.
 * @param event - The click event of the game board.
 */
function handleCardClick(event: Event): void {
  const card = (event.target as HTMLElement).closest('.card') as HTMLElement | null;
  if (!card || card.classList.contains('is-flipped') || flippedCards.length === CARDS_PER_PAIR) {
    return;
  }
  card.classList.add('is-flipped');
  flippedCards.push(card);
  if (flippedCards.length === CARDS_PER_PAIR) {
    checkForMatch();
  }
}

/** Checks if the two open cards are the same and flips them back if not. */
function checkForMatch(): void {
  const firstCard = flippedCards[0];
  const secondCard = flippedCards[1];
  const isSame = firstCard.dataset.cardId === secondCard.dataset.cardId;
  if (isSame) {
    flippedCards.length = 0;
    addPoint();
    checkGameEnd();
  } else {
    setTimeout(flipCardsBack, FLIP_BACK_DELAY_MS);
    switchPlayer();
  }
}

/** Flips the open cards back and empties the array. */
function flipCardsBack(): void {
  flippedCards.forEach((card) => {
    card.classList.remove('is-flipped');
  });
  flippedCards.length = 0;
}

/** Sets the chosen player as starting player and resets both scores. */
function resetGameState(): void {
  gameState.currentPlayer = settings.player as PlayColor;
  gameState.playerScores.orange = 0;
  gameState.playerScores.blue = 0;
  flippedCards.length = 0;
}

/** Shows both scores and the current player above the board. */
function updateScoreBoard(): void {
  const scoreOrange = document.getElementById('score-orange') as HTMLElement;
  const scoreBlue = document.getElementById('score-blue') as HTMLElement;
  const currentPlayer = document.getElementById('current-player') as HTMLElement;

  scoreOrange.textContent = String(gameState.playerScores.orange);
  scoreBlue.textContent = String(gameState.playerScores.blue);
  currentPlayer.dataset.player = gameState.currentPlayer;
  currentPlayer.setAttribute('aria-label', gameState.currentPlayer);
}

/** Adds a point to the current player. */
function addPoint(): void {
  gameState.playerScores[gameState.currentPlayer]++;
  updateScoreBoard();
}

/** Switches to the other player and updates the score board. */
function switchPlayer(): void {
  gameState.currentPlayer = gameState.currentPlayer === 'orange' ? 'blue' : 'orange';
  updateScoreBoard();
}

/**
 * Checks if all cards on the board are flipped.
 * @returns True if no hidden card is left.
 */
function isGameOver(): boolean {
  const allCards = document.querySelectorAll('.card');
  const flippedCardsOnBoard = document.querySelectorAll('.card.is-flipped');

  return allCards.length === flippedCardsOnBoard.length;
}

/** Shows the game over screen once the last pair is found. */
function checkGameEnd(): void {
  if (isGameOver()) {
    setTimeout(renderGameOver, FLIP_BACK_DELAY_MS);
  }
}

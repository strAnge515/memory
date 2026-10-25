import './styles/main.scss';
import { getCardTemplate } from './templates';

interface Settings {
  theme: string;
  player: string;
  size: string;
}

const settings: Settings = {
  theme: '',
  player: '',
  size: '',
};

const FLIP_BACK_DELAY_MS: number = 1000;
const CARDS_PER_PAIR: number = 2;
const SETTINGS_COUNT: number = 3;

const flippedCards: HTMLElement[] = [];

init();

/** Initializes the app and registers all event listeners. */
function init(): void {
  initPlaybutton();
  initSettingsForm();
  initBoard();
}

/** Opens the settings view when the play button is clicked. */
function initPlaybutton(): void {
  const playButton = document.getElementById('play-button');
  if (playButton) {
    playButton.addEventListener('click', () => showView('settings'));
  }
}

/** Shows the section with the given id and hides all other sections. */
function showView(id: string): void {
  const views = document.querySelectorAll<HTMLElement>('main > section');
  views.forEach((view) => {
    view.classList.toggle('is-hidden', view.id !== id);
  });
}

/** Registers the change and submit listeners of the settings form. */
function initSettingsForm(): void {
  const settingsForm = document.getElementById('settings-form');
  settingsForm?.addEventListener('change', handleSettingChange);
  settingsForm?.addEventListener('submit', handleSettingsSubmit);
}

/** Saves the changed setting and updates the settings view. */
function handleSettingChange(event: Event): void {
  const field = event.target as HTMLInputElement;
  settings[field.name as keyof Settings] = field.value;
  updateGameBar(field.name, field.value);
  enableGameButton();
  if (field.name === 'theme') {
    changeThemePicture(field.value);
  }
}

/** Switches to the game view and starts a new game. */
function handleSettingsSubmit(event: Event): void {
  event.preventDefault();
  showView('game');
  startGame();
}

/** Shows the chosen value in the game bar and marks it as selected. */
function updateGameBar(name: string, value: string): void {
  const chosenSpan = document.querySelector(`[data-group="${name}"]`);

  if (chosenSpan) {
    chosenSpan.textContent = value;
    chosenSpan.classList.add('is-selected');
  }
}

/** Enables the game start button once all three settings are chosen. */
function enableGameButton(): void {
  const gameButton = document.getElementById('game-start-button');
  const chosen = document.querySelectorAll('.is-selected');
  if (chosen.length === SETTINGS_COUNT) {
    gameButton?.removeAttribute('disabled');
  }
}

/** Shows the preview picture of the chosen theme. */
function changeThemePicture(theme: string): void {
  const themePicture = document.getElementById('theme-picture') as HTMLImageElement;
  themePicture.src = `${import.meta.env.BASE_URL}img/themes/${theme}/preview.svg`;
}

/** Calculates the number of card pairs from the board size (e.g. "4x6"). */
function getPairCount(size: string): number {
  const fieldSize = size.split('x').map(Number);
  return (fieldSize[0] * fieldSize[1]) / CARDS_PER_PAIR;
}

/** Creates an array in which every card number appears twice. */
function buildCardPairs(pairCount: number): number[] {
  const cards: number[] = [];

  for (let i = 1; i <= pairCount; i++) {
    cards.push(i);
    cards.push(i);
  }

  return cards;
}

/** Shuffles the cards randomly using the Fisher-Yates algorithm. */
function shuffleCards(cards: number[]): number[] {
  for (let currentIndex = cards.length - 1; currentIndex > 0; currentIndex--) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    [cards[currentIndex], cards[randomIndex]] = [cards[randomIndex], cards[currentIndex]];
  }

  return cards;
}

/** Builds and shuffles the cards for the chosen size and renders the board. */
function startGame(): void {
  const cards = shuffleCards(buildCardPairs(getPairCount(settings.size)));
  renderBoard(cards);
}

/** Renders all cards into the game board. */
function renderBoard(cards: number[]): void {
  const board = document.getElementById('game-board') as HTMLElement;
  board.innerHTML = '';
  board.dataset.size = settings.size;

  cards.forEach((cardId) => {
    board.innerHTML += getCardTemplate(settings.theme, cardId);
  });
}

/** Registers the click listener of the game board. */
function initBoard(): void {
  const board = document.getElementById('game-board');
  board?.addEventListener('click', handleCardClick);
}

/** Flips the clicked card and checks for a match once two cards are open. */
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
  } else {
    setTimeout(flipCardsBack, FLIP_BACK_DELAY_MS);
  }
}

/** Flips the open cards back and empties the array. */
function flipCardsBack(): void {
  flippedCards.forEach((card) => {
    card.classList.remove('is-flipped');
  });
  flippedCards.length = 0;
}

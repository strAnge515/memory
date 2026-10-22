import './styles/main.scss';

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

init();

/** Initializes the app and registers all event listeners. */
function init(): void {
  initPlaybutton();
  initSettingsForm();
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

/** Saves the chosen settings on change and starts the game on submit. */
function initSettingsForm(): void {
  const settingsForm = document.getElementById('settings-form');
  settingsForm?.addEventListener('change', (event) => {
    const field = event.target as HTMLInputElement;
    settings[field.name as keyof Settings] = field.value;
    updateGameBar(field.name, field.value);
    enableGameButton();
    if (field.name === 'theme') {
      changeThemePicture(field.value);
    }
  });
  settingsForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    showView('game');
  });
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
  if (chosen.length === 3) {
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
  return (fieldSize[0] * fieldSize[1]) / 2;
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
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
}




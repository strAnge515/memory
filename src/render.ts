import { initExitButton } from './dialog';
import { getWinner, initBoard, removeGameTheme, startGame } from './game';
import { initSettingsForm, resetSettings } from './settings';
import { GAME_OVER_DELAY_MS, gameState, settings } from './state';
import {
  getDrawTemplate,
  getEndScreenTemplate,
  getGameOverTemplate,
  getGameTemplate,
  getHomeTemplate,
  getSettingsTemplate,
  getWinnerTemplate,
} from './templates';

/**
 * Returns the container in which all screens are rendered.
 * @returns The main element with the id "app".
 */
function getApp(): HTMLElement {
  return document.getElementById('app') as HTMLElement;
}

/** Renders the start screen and registers the play button. */
export function renderHome(): void {
  getApp().innerHTML = getHomeTemplate();
  document.getElementById('play-button')?.addEventListener('click', renderSettings);
}

/** Resets the settings, renders the settings screen and registers the form. */
export function renderSettings(): void {
  resetSettings();
  getApp().innerHTML = getSettingsTemplate();
  initSettingsForm();
}

/** Renders the game screen, registers its listeners and starts a new game. */
export function renderGame(): void {
  getApp().innerHTML = getGameTemplate();
  initBoard();
  initExitButton();
  startGame();
}

/** Renders the game over screen and shows the end screen after a short delay. */
export function renderGameOver(): void {
  const { blue, orange } = gameState.playerScores;
  getApp().innerHTML = getGameOverTemplate(blue, orange);
  setTimeout(renderEndScreen, GAME_OVER_DELAY_MS);
}

/** Renders the end screen with the winner or the draw. */
function renderEndScreen(): void {
  const winner = getWinner();
  const resultHtml = winner === 'draw' ? getDrawTemplate() : getWinnerTemplate(winner);

  getApp().innerHTML = getEndScreenTemplate(resultHtml, getBackToStartText());
  document.getElementById('back-to-start')?.addEventListener('click', handleBackToStart);
}

/**
 * Returns the text of the back to start button for the chosen theme.
 * @returns "Back to start" for code-vibes, "Home" for all other themes.
 */
function getBackToStartText(): string {
  return settings.theme === 'code-vibes' ? 'Back to start' : 'Home';
}

/** Leaves the end screen and opens the settings for a new round. */
function handleBackToStart(): void {
  removeGameTheme();
  renderSettings();
}

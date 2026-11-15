import { renderGame } from './render';
import { DEFAULT_THEME, SETTINGS_COUNT, settings } from './state';
import type { Settings } from './types';

/** Clears all chosen settings, e.g. before a new round. */
export function resetSettings(): void {
  settings.theme = '';
  settings.player = '';
  settings.size = '';
}

/** Registers the change, submit and hover listeners of the settings form. */
export function initSettingsForm(): void {
  const settingsForm = document.getElementById('settings-form');
  settingsForm?.addEventListener('change', handleSettingChange);
  settingsForm?.addEventListener('submit', handleSettingsSubmit);
  settingsForm?.addEventListener('mouseover', handleThemeHover);
  settingsForm?.addEventListener('mouseleave', showChosenThemePicture);
}

/**
 * Saves the changed setting and updates the settings view.
 * @param event - The change event of the settings form.
 */
function handleSettingChange(event: Event): void {
  const field = event.target as HTMLInputElement;
  settings[field.name as keyof Settings] = field.value;
  updateGameBar(field);
  enableGameButton();
  if (field.name === 'theme') {
    changeThemePicture(field.value);
  }
}

/**
 * Prevents the page reload and starts the game.
 * @param event - The submit event of the settings form.
 */
function handleSettingsSubmit(event: Event): void {
  event.preventDefault();
  renderGame();
}

/**
 * Shows the preview of the hovered theme, or of the chosen theme if no theme is hovered.
 * @param event - The mouseover event of the settings form.
 */
function handleThemeHover(event: Event): void {
  const label = (event.target as HTMLElement).closest('label');
  const themeInput = label?.querySelector<HTMLInputElement>('input[name="theme"]');

  if (themeInput) {
    changeThemePicture(themeInput.value);
  } else {
    showChosenThemePicture();
  }
}

/** Shows the preview of the chosen theme, or of the default theme if none is chosen yet. */
function showChosenThemePicture(): void {
  changeThemePicture(settings.theme || DEFAULT_THEME);
}

/**
 * Shows the chosen option in the game bar and marks it as selected.
 * @param field - The radio input that was chosen.
 */
function updateGameBar(field: HTMLInputElement): void {
  const chosenSpan = document.querySelector(`[data-group="${field.name}"]`);
  const optionText = field.closest('label')?.textContent?.trim();

  if (chosenSpan && optionText) {
    chosenSpan.textContent = optionText;
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

/**
 * Shows the preview picture of the given theme.
 * @param theme - The theme whose preview is shown.
 */
function changeThemePicture(theme: string): void {
  const themePicture = document.getElementById('theme-picture') as HTMLImageElement;
  themePicture.src = `${import.meta.env.BASE_URL}img/themes/${theme}/preview.svg`;
}

import { removeGameTheme } from './game';
import { renderSettings } from './render';
import { settings } from './state';

/** Registers the click listeners of both buttons inside the exit dialog. */
export function initDialogButtons(): void {
  const backToGameButton = document.getElementById('back-to-game');
  const dialogExitButton = document.getElementById('exit-game');

  backToGameButton?.addEventListener('click', closeExitDialog);
  dialogExitButton?.addEventListener('click', handleExitGame);
}

/** Registers the click listener of the exit button in the game header. */
export function initExitButton(): void {
  const headerExitButton = document.getElementById('exit-button');
  headerExitButton?.addEventListener('click', openExitDialog);
}

/** Updates the button text and opens the exit dialog. */
function openExitDialog(): void {
  const exitDialog = document.getElementById('exit-dialog') as HTMLDialogElement;
  updateBackToGameText();
  exitDialog.showModal();
}

/** Sets the button text: "No, back to game" for the food theme, "Back to game" for all other themes. */
function updateBackToGameText(): void {
  const backToGameButton = document.getElementById('back-to-game') as HTMLElement;
  backToGameButton.textContent = settings.theme === 'food' ? 'No, back to game' : 'Back to game';
}

/** Closes the exit dialog. */
function closeExitDialog(): void {
  const exitDialog = document.getElementById('exit-dialog') as HTMLDialogElement;
  exitDialog.close();
}

/** Closes the exit dialog and returns to the settings view. */
function handleExitGame(): void {
  closeExitDialog();
  removeGameTheme();
  renderSettings();
}

import './styles/main.scss';
import { initDialogButtons } from './dialog';
import { renderHome } from './render';

document.addEventListener('DOMContentLoaded', init);

/** Starts the app once the HTML is loaded: renders the start screen and registers the dialog. */
function init(): void {
  renderHome();
  initDialogButtons();
}

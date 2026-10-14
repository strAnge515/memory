import './styles/main.scss';

init();

function init(): void {
  const playButton = document.getElementById('play-button');
  if (playButton) {
    playButton.addEventListener('click', () => showView('settings'));
  }
}

function showView(id: string): void {
  const views = document.querySelectorAll<HTMLElement>('main > section');
  views.forEach((view) => {
    view.classList.toggle('is-hidden', view.id !== id);
  });
}

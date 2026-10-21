import './styles/main.scss';

interface Settings {
  theme: string; 
  player: string; 
  size: string;
}

const settings:Settings = {
  theme: "", 
  player: "", 
  size:""
}


init();

function init(): void {
  initPlaybutton();
  initSettingsForm();
  
}

function initPlaybutton(): void {
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

function initSettingsForm(): void {
  const settingsForm = document.getElementById('settings-form');
  settingsForm?.addEventListener('change', (event) => {
    const field = event.target as HTMLInputElement ;
    settings[field.name as keyof Settings] = field.value;
    updateGameBar(field.name, field.value);
    enableGameButton();
  });
  
}

function updateGameBar(name: string, value: string): void {
  const chosenSpan = document.querySelector(`[data-group="${name}"]`);

  if (chosenSpan) {
    chosenSpan.textContent = value;
    chosenSpan.classList.add('is-selected');
    
  }
}

function enableGameButton(): void {
  const gameButton = document.getElementById('game-start-button');
  const chosen = document.querySelectorAll('.is-selected');
  if (chosen.length === 3) {
    gameButton?.removeAttribute('disabled');
  }

}

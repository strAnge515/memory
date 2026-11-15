const BASE: string = import.meta.env.BASE_URL;

/**
 * Returns the HTML of the start screen.
 * @returns The home section as HTML string.
 */
export function getHomeTemplate(): string {
  return `
    <section class="home">
      <hgroup class="home__heading">
        <p class="home__subtitle">It's play time</p>
        <h1 class="home__title">Ready to play?</h1>
      </hgroup>
      <button id="play-button" class="btn btn--play" type="button">
        <img class="btn__icon" src="${BASE}img/icons/controller.svg" alt="" />
        <span>Play</span>
        <img class="btn__arrow" src="${BASE}img/icons/arrow.svg" alt="" />
      </button>
      <span class="home__controller" aria-hidden="true"></span>
    </section>
  `;
}

/**
 * Returns the HTML of the settings screen.
 * @returns The settings section as HTML string.
 */
export function getSettingsTemplate(): string {
  return `
    <section class="settings">
      <h1 class="settings__title">Settings</h1>
      <form id="settings-form" class="settings__form">
        <div class="settings__options">
          <fieldset class="settings__group">
            <legend>
              <img src="${BASE}img/icons/palette.svg" alt="" />
              <span>Game themes</span>
            </legend>
            <div class="settings__choices">
              <label><input type="radio" name="theme" value="code-vibes" /> Code vibes theme</label>
              <label><input type="radio" name="theme" value="da-projects" /> DA Projects theme</label>
              <label><input type="radio" name="theme" value="food" /> Foods theme</label>
            </div>
          </fieldset>

          <fieldset class="settings__group">
            <legend>
              <img src="${BASE}img/icons/chess_pawn.svg" alt="" />
              <span>Choose player</span>
            </legend>
            <div class="settings__choices">
              <label><input type="radio" name="player" value="blue" /> Blue</label>
              <label><input type="radio" name="player" value="orange" /> Orange</label>
            </div>
          </fieldset>

          <fieldset class="settings__group">
            <legend>
              <img src="${BASE}img/icons/style.svg" alt="" />
              <span>Board size</span>
            </legend>
            <div class="settings__choices">
              <label><input type="radio" name="size" value="4x4" /> 16 cards</label>
              <label><input type="radio" name="size" value="4x6" /> 24 cards</label>
              <label><input type="radio" name="size" value="6x6" /> 36 cards</label>
            </div>
          </fieldset>
        </div>

        <div class="settings__preview">
          <div class="settings__preview-img">
            <img id="theme-picture" src="${BASE}img/themes/code-vibes/preview.svg" alt="Preview of the chosen theme" />
          </div>
          <div class="settings__summary">
            <span class="settings__chosen" data-group="theme">Game theme</span>
            <span class="settings__chosen" data-group="player">Player</span>
            <span class="settings__chosen" data-group="size">Board size</span>
            <button id="game-start-button" class="btn btn--start" type="submit" disabled>
              <img src="${BASE}img/icons/start.svg" alt="" />
              <span>Start</span>
            </button>
          </div>
        </div>
      </form>
    </section>
  `;
}

/**
 * Returns the HTML of the game screen with header and empty board.
 * @returns The game section as HTML string.
 */
export function getGameTemplate(): string {
  return `
    <section class="game">
      <div class="game__content">
        <header class="game__header">
          <div class="game__scores">
            <span class="game__score game__score--blue">
              <span class="game__score-name">Blue</span>
              <span id="score-blue">0</span>
            </span>
            <span class="game__score game__score--orange">
              <span class="game__score-name">Orange</span>
              <span id="score-orange">0</span>
            </span>
          </div>
          <p class="game__current">Current player: <span id="current-player" class="game__player-badge" role="img"></span></p>
          <button id="exit-button" class="btn btn--exit" type="button">
            <img src="${BASE}img/icons/exit.svg" alt="" />
            <span>Exit game</span>
          </button>
        </header>
        <div id="game-board" class="game__board"></div>
      </div>
    </section>
  `;
}

/**
 * Returns the HTML of one memory card with back and front side.
 * @param theme - The chosen theme, used as image folder.
 * @param cardId - The number of the card motif.
 * @returns The card as HTML string.
 */
export function getCardTemplate(theme: string, cardId: number): string {
  return `
    <button class="card" type="button" data-card-id="${cardId}" aria-label="Memory card">
      <span class="card__inner">
        <img class="card__face card__face--back" src="${BASE}img/themes/${theme}/back.svg" alt="" />
        <img class="card__face card__face--front" src="${BASE}img/themes/${theme}/${cardId}.svg" alt="Card motif ${cardId}" />
      </span>
    </button>
  `;
}

/**
 * Returns the HTML of the game over screen with the final score.
 * @param blueScore - The final points of the blue player.
 * @param orangeScore - The final points of the orange player.
 * @returns The game over section as HTML string.
 */
export function getGameOverTemplate(blueScore: number, orangeScore: number): string {
  return `
    <section class="result result--game-over">
      <h1 class="result__title result__title--game-over">Game over</h1>
      <p class="result__label result__label--small">Final score</p>
      <div class="result__scores">
        <p class="result__score result__score--blue">
          <span class="result__score-name">Blue</span>
          <span>${blueScore}</span>
        </p>
        <p class="result__score result__score--orange">
          <span class="result__score-name">Orange</span>
          <span>${orangeScore}</span>
        </p>
      </div>
    </section>
  `;
}

/**
 * Returns the HTML of the end screen with confetti, result and button.
 * @param resultHtml - The HTML of the winner or the draw.
 * @param buttonText - The text of the back to start button.
 * @returns The end screen section as HTML string.
 */
export function getEndScreenTemplate(resultHtml: string, buttonText: string): string {
  return `
    <section class="result result--winner">
      <picture class="result__confetti">
        <source media="(min-width: 1440px)" srcset="${BASE}img/icons/Confetti_long.svg" />
        <img src="${BASE}img/icons/Confetti.svg" alt="" />
      </picture>
      <div class="result__winner">${resultHtml}</div>
      <button id="back-to-start" class="btn result__button" type="button">${buttonText}</button>
    </section>
  `;
}

/**
 * Returns the HTML of the winner with pawn and player name.
 * @param winner - The color of the winning player.
 * @returns The winner content as HTML string.
 */
export function getWinnerTemplate(winner: string): string {
  return `
    <p class="result__label result__label--winner">The winner is</p>
    <h1 class="result__title result__title--${winner}">${winner} player</h1>
    <span class="result__pawn" data-player="${winner}" role="img" aria-label="${winner} pawn"></span>
  `;
}

/**
 * Returns the HTML of a draw with the scale icon.
 * @returns The draw content as HTML string.
 */
export function getDrawTemplate(): string {
  return `
    <p class="result__label">It's a</p>
    <h1 class="result__title result__title--draw">Draw</h1>
    <span class="result__scale" role="img" aria-label="Scale"></span>
  `;
}

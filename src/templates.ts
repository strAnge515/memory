/** Returns the HTML of one memory card with back and front side. */
export function getCardTemplate(theme: string, cardId: number): string {
  const path = `${import.meta.env.BASE_URL}img/themes/${theme}`;

  return `
    <button class="card" type="button" data-card-id="${cardId}" aria-label="Memory card">
      <span class="card__inner">
        <img class="card__face card__face--back" src="${path}/back.svg" alt="" />
        <img class="card__face card__face--front" src="${path}/${cardId}.svg" alt="Card motif ${cardId}" />
      </span>
    </button>
  `;
}

/** Returns the HTML of the winner with pawn and player name. */
export function getWinnerTemplate(winner: string): string {
  return `
    <p class="result__label">The winner is</p>
    <span class="result__pawn" data-player="${winner}" role="img" aria-label="${winner} pawn"></span>
    <h1 class="result__title result__title--${winner}">${winner} player</h1>
  `;
}

/** Returns the HTML of a draw with the scale icon. */
export function getDrawTemplate(): string {
  return `
    <p class="result__label">It's a</p>
    <h1 class="result__title result__title--draw">Draw</h1>
    <span class="result__scale" role="img" aria-label="Scale"></span>
  `;
}

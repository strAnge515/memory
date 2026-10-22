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

import { FetchInfo } from './fetch-requests';

const errorEl = document.querySelector('.error-el');
const recipesTable = document.querySelector('.js-card-items');

export async function doRecipesCards() {
  const recipes = new FetchInfo();
  try {
    const page = await recipes.fetchAllRecipesPerPage(9);
    cardsMarkUp(page.data.results);
  } catch (error) {
    errorEl.classList.remove('is-hidden');
    console.log(error.message);
  }
}

doRecipesCards();

export function cardsMarkUp(cardInfo) {
  const cardsO = cardInfo
    .map(({ _id, preview, title, description, rating }) => {
      return `<li class="recipe-card">
      <div class="rad-img card-thumb">
        <img class="card-image" src="${preview}" alt="" />
      </div>
      <div class="card-info">
        <h3 class="card-title" id="${_id}">${title}</h3>
        <p class="card-description">
          ${description}
        </p>
        <div class="card-rating-button">
          <div>
            <p class="card-rating">${rating}</p>
            <span class="card-stars">★★★★★</span>
          </div>
          <button class="base-btn btn-card" type="button">See recipe</button>
        </div>
      </div>
      <span class="add-favorite">♡</span>`;
    })
    .join('');
  recipesTable.innerHTML = cardsO;
}

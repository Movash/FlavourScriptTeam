import { FetchInfo } from './fetch-requests';
import { showRating } from './rating-pop-up.js';
import { openRecipeModal } from './recipe-pop-up';
import {
  addToLocalFavoritesCards,
  takeFavoritesCardsFromLS,
} from './local-storage';

const recipesTable = document.querySelector('.js-card-items');

const recipes = new FetchInfo();

let favorites = takeFavoritesCardsFromLS();
if (!favorites) favorites = [];

function seeViewport() {
  let number = '6';
  const smallMedia = window.matchMedia('(max-width: 768px)');
  const largeMedia = window.matchMedia('(max-width: 1200px)');
  smallMedia.addEventListener('change', isPhone);
  largeMedia.addEventListener('change', isTablet);
  isPhone(smallMedia);

  function isPhone(event) {
    if (event.matches) {
      number = 6;
    } else {
      isTablet(largeMedia);
    }
  }

  function isTablet(event) {
    if (event.matches) {
      number = 8;
      // doRecipesCards(8);
    } else {
      number = 9;
    }
  }
  return number;
}

function cardsMarkUp(cardInfo) {
  recipesTable.innerHTML = makeCardsMarkUp(cardInfo);
  showRating();
  isAlreadyOnFavorite(favorites);
  addToFavoriteListener();
  addListenerForButton();
}

function makeCardsMarkUp(cardInfo) {
  return cardInfo
    .map(({ _id, preview, title, description, rating }) => {
      return `
      <li class="recipe-card rad-img">
  <div class="card-thumb">
    <img class="card-image" src="${preview}" alt="Image of ${preview}" />
  </div>
  <div class="card-info">
    <h3 class="card-title">${title}</h3>
    <p class="card-description">${description}</p>
    <div class="card-rating-and-button">
      <div class="rating">
        <div class="rating-value" id="rating-stars">${rating}</div>
        <div class="rating-body">
          <div class="rating-active"></div>
          <div class="rating-items" id="rating-stars-radio-btn" aria-hidden="true">
            <input
              type="radio"
              class="rating-item"
              name="recipe-rating"
              value="1"
              aria-hidden="true"
            />
            <input
              type="radio"
              class="rating-item"
              name="recipe-rating"
              value="2"
              aria-hidden="true"
            />
            <input
              type="radio"
              class="rating-item"
              name="recipe-rating"
              value="3"
              aria-hidden="true"
            />
            <input
              type="radio"
              class="rating-item"
              name="recipe-rating"
              value="4"
              aria-hidden="true"
            />
            <input
              type="radio"
              class="rating-item"
              name="recipe-rating"
              value="5"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
      <button class="base-btn btn-card" type="button" id="${_id}">See recipe</button>
    </div>
  </div>
  <span class="add-favorite " id="${_id}">&#9825;</span>
</li>`;
    })
    .join('');
}

function addToFavoriteListener() {
  const btnAddToFavoriteEl = document.querySelectorAll('.add-favorite');
  btnAddToFavoriteEl.forEach(el => {
    el.addEventListener('click', addOrRemoveFromFavorite);
    if (el.classList.contains('on-favorites')) {
      el.textContent = '♥️';
      return;
    }
    el.textContent = '♡';
  });
}

function isAlreadyOnFavorite(favorites) {
  const btnAddToFavoriteEl = document.querySelectorAll('.add-favorite');

  btnAddToFavoriteEl.forEach(el => {
    const findMatch = favorites.find(function (obj) {
      return obj._id === el.id;
    });
    if (!findMatch) {
      return;
    }
    el.classList.add('on-favorites');
  });
}

function addListenerForButton() {
  const btnCardEl = document.querySelectorAll('.btn-card');

  btnCardEl.forEach(el => {
    el.addEventListener('click', () => {
      openRecipeModal(el.id);
    });
  });
}

function addOrRemoveFromFavorite(event) {
  const recipeId = event.currentTarget.id;
  const recipeHeart = event.currentTarget;

  if (recipeHeart.classList.contains('on-favorites')) {
    removeFromFavoriteItem(recipeId, recipeHeart);
    return;
  }
  addToFavoriteItem(recipeId, recipeHeart);
}

function addToFavoriteItem(recipeId, recipeHeart) {
  recipes.fetchRecipeById(recipeId).then(resp => {
    recipeHeart.classList.add('on-favorites');
    recipeHeart.textContent = '♥️';
    console.log('add');
    addToLocalFavoritesCards(resp.data);
  });
}

function removeFromFavoriteItem(recipeId, recipeHeart) {
  recipes.fetchRecipeById(recipeId).then(resp => {
    recipeHeart.classList.remove('on-favorites');
    recipeHeart.textContent = '♡';
    console.log('remove');
    addToLocalFavoritesCards(resp.data);
  });
}

export { seeViewport, cardsMarkUp, makeCardsMarkUp, addToFavoriteListener };

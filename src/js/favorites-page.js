//console.log('10.Favorites page');
import { makeCardsMarkUp, addToFavoriteListener } from './recipes-cards';
import { showRating } from './rating-pop-up.js';
import './header.js';

const heroImgMob = document.querySelector('.fav-hero-img-mob');
const categoriesContainer = document.querySelector('.fav-categories');
const cardsContainer = document.querySelector('.fav-recipes');
const notifWithHat = document.querySelector('.fav-notification');
let categories = [];
let recipies;

function getRecipies() {
  recipies = JSON.parse(localStorage.getItem('keyOfFavoritesCards'));
}
getRecipies();

function showNotifyWithHat() {
  if (!recipies.length) {
    heroImgMob.classList.add('is-hidden');
    categoriesContainer.classList.add('is-hidden');
    cardsContainer.classList.add('is-hidden');
    notifWithHat.classList.remove('is-hidden');
    return;
  }
}
showNotifyWithHat();

if (categoriesContainer) {
  categoriesContainer?.addEventListener('click', onClick);
}

function onClick(evt) {
  if (!evt.target.name) {
    return;
  }

  showCards(evt.target.name);
}

function showCards(categoryName) {
  const recipiesArray = recipies.filter(({ category }) => {
    return categoryName === category;
  });

  cardsContainer.innerHTML = makeCardsMarkUp(recipiesArray);

  if (categoryName === 'all') {
    cardsMarkup(recipies);
  }

  showRating();
  addToFavoriteListener();
}

function getCategories(recipies) {
  recipies.forEach(({ category }) => {
    if (categories.includes(category)) {
      return;
    }
    categories.push(category);
  });
  renderCategories(categories);
}
getCategories(recipies);

function renderCategories(categories) {
  const markup = categories
    .map(item => {
      return `<button type="button" name="${item}" class="fav-category-btn">${item}</button>`;
    })
    .join('');

  categoriesContainer.insertAdjacentHTML('beforeend', markup);
}

function cardsMarkup(recipies) {
  cardsContainer.innerHTML = makeCardsMarkUp(recipies);
  showRating();
  addToFavoriteListener();
}
cardsMarkup(recipies);

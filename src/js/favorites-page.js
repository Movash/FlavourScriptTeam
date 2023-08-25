//console.log('10.Favorites page');

import recipies from './test-mock';
// import { cardsMarkUp } from './recipes-cards';

const heroImgMob = document.querySelector('.fav-hero-img-mob');
const cardsContainer = document.querySelector('.fav-recipes');
const notifWithHat = document.querySelector('.fav-notification');
const categories = [];

const categoriesContainer = document.querySelector('.fav-categories');

function showNotifyWithHat() {
  if (!recipies.length) {
    heroImgMob.classList.add('is-hidden');
    categoriesContainer.classList.add('is-hidden');
    cardsContainer.classList.add('is-hidden');
    notifWithHat.classList.remove('is-hidden');
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

  const recipiesArray = recipies.filter(({ category }) => {
    return evt.target.name === category;
  });

  cardsContainer.innerHTML = createCardsMarkup(recipiesArray);

  if (evt.target.name === 'all') {
    cardsMarkUp(recipies);
  }
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

function renderCategories(categories) {
  const markup = categories
    .map(item => {
      return `<button type="button" name="${item}" class="fav-category-btn">${item}</button>`;
    })
    .join('');

  //categoriesContainer.insertAdjacentHTML('beforeend', markup);
}

function createCardsMarkup(recipiesArray) {
  return recipiesArray
    .map(({ _id, category, preview, title, description, rating }) => {
      return `<li class="fav-recipe-card recipe-card">
                <object class="obj-recipe-card" name="${category}">
                  <div class="rad-img card-thumb fav-card-thumb">
                    <img class="fav-card-image card-image" src="${preview}" alt="" />
                  </div>
                  <div class="card-info">
                    <h3 class="card-title" id="${_id}">${title}</h3>
                    <p class="card-description">${description}</p>
                    <div class="card-rating-button">
                      <div>
                        <p class="card-rating">${rating}</p>
                        <span class="card-stars">★★★★★</span>
                      </div>
                      <button class="base-btn btn-card" type="button">See recipe</button>
                    </div>
                  </div>
                  <span class="add-favorite">♡</span>
                </object>
              </li>`;
    })
    .join('');
}

//const recipies = JSON.parse(localStorage.getItem(''));

getCategories(recipies); //() <- тут мають передатись дані з localStorage

function cardsMarkUp(recipies) {
  cardsContainer.innerHTML = createCardsMarkup(recipies);
}
//cardsMarkUp(recipies);

//console.log('10.Favorites page');

import recipies from './test-mock';

const heroImgMob = document.querySelector('.fav-hero-img-mob');
const categoriesContainer = document.querySelector('.fav-categories');
const cardsContainer = document.querySelector('.fav-recipes');
const categoriesSection = document.querySelector('.fav-categories');
const categoryBtn = document.querySelector('.fav-category-btn');
const objRecipeCard = document.querySelector('.obj-recipe-card');
const notifWithHat = document.querySelector('.fav-notification');
const categories = [];

function showNotifyWithHat() {
  if (!recipies.length) {
    heroImgMob.style.display = 'none';
    categoriesSection.style.display = 'none';
    cardsContainer.style.display = 'none';
  } else {
    notifWithHat.style.display = 'none';
  }
}
showNotifyWithHat();

categoriesSection.addEventListener('click', onClick);

function onClick(evt) {
  if (!evt.target.name) {
    return;
  }
  console.log('click', evt.target.name);

  const recipiesArray = recipies.filter(
    ({ _id, category, preview, title, description, rating }) => {
      return evt.target.name === category;
    }
  );

  console.log('recipiesArray', recipiesArray);
  cardsContainer.innerHTML = createCardsMarkup(recipiesArray);

  if (evt.target.name === 'all') {
    cardsMarkup(recipies);
  }
}

function getCategories(recipies) {
  console.log('recipies', recipies);
  recipies.forEach(({ category }) => {
    if (categories.includes(category)) {
      return;
    }
    categories.push(category);
    console.log('categories', categories);
  });
  renderCategories(categories);
}

function renderCategories(categories) {
  const markup = categories
    .map(item => {
      return `<button type="button" name="${item}" class="fav-category-btn">${item}</button>`;
    })
    .join('');

  categoriesContainer.insertAdjacentHTML('beforeend', markup);
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

function cardsMarkup(recipies) {
  cardsContainer.innerHTML = createCardsMarkup(recipies);
}

cardsMarkup(recipies);

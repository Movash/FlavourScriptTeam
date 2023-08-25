import { FetchInfo } from './fetch-requests';
import { openRecipeModal } from './recipe-pop-up';

const popularRecipes = new FetchInfo();
const popularListEl = document.querySelector('.popular-list-js');

const smallMedia = window.matchMedia('(max-width: 768px)');
const largeMedia = window.matchMedia('(max-width: 1200px)');

async function getPopular() {
  try {
    const resp = await popularRecipes.fetchPopularRecipes();
    if (resp.data.length > 4) {
      popularListEl.classList.add('popular-scroll');
    }
    popularListEl.insertAdjacentHTML(
      'afterbegin',
      createPopularMarkUp(resp.data)
    );

    const recipies = popularListEl.querySelectorAll('.popular-recipe');
    recipies.forEach((recipe) => {
      recipe.addEventListener('click', () => {
        openRecipeModal(recipe.id);
      })
    })

  } catch (err) {
    console.log(err);
    popularListEl.innerHTML = `
      <p class="popular-err">
        We are sorry, something went wrong. Please, reload the page!
      </p>
    `;
  }
}

getPopular();

function createPopularMarkUp(arr) {
  const recipiesPerPageMobil = 2;
  if (seeViewportForNumberOfRecipies() === recipiesPerPageMobil) {
    arr.splice(2, arr.length);
  }
  return arr
    .map(({ title, description, preview, _id }) => {
      const descriptionString = `
        <li class="popular-recipe" id="${_id}">
          <img class="popular-img" src="${preview}" alt="${title}">
          <div class="popular-desc-container">
            <h3 class="popular-recipe-title">${title}</h3>
            <p class="popular-recipe-descr">${description}</p>
          </div>
        </li>
      `;
      return descriptionString;
    })
    .join('');
}

function seeViewportForNumberOfRecipies() {
  let number = '2';
  smallMedia?.addEventListener('change', isPhone);
  largeMedia?.addEventListener('change', isTablet);
  isPhone(smallMedia);

  function isPhone(event) {
    if (event.matches) {
      number = 2;
    } else {
      isTablet(largeMedia);
    }
  }

  function isTablet(event) {
    if (event.matches) {
      number = 4;
    } else {
      number = 4;
    }
  }
  return number;
}
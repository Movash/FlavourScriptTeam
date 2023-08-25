import { FetchInfo } from './fetch-requests';
import { cardsMarkUp } from './recipes-cards';
import { seeViewport } from './recipes-cards';
import { goToLocal, handleCategoryClick, removeCategoriesFromLS} from './local-storage';

const request = new FetchInfo();
const categoriesBtnEl = document.querySelector('.categories-btn-js');
const categoriesListEl = document.querySelector('.categories-list-js');
const errorEl = document.querySelector('.error-el');
const recipesTable = document.querySelector('.js-card-items');

let categoryBtns = [];
let totalPages;

async function getCategories() {
  try {
    const resp = await request.fetchAllCategories();
    categoriesListEl.insertAdjacentHTML(
      'afterbegin',
      createCategoriesMarkUp(resp.data)
    );
    const btns = document.querySelectorAll('.category-btn');
    categoryBtns = [...btns];
    goToLocal();
  } catch (err) {
    console.log(err);
    categoriesListEl.innerHTML = `
      <p class="categories-err">
      We are sorry, something went wrong. Please, reload the page!
      </p>
      `;
  }
}

getCategories();
getAllRecipes();

function createCategoriesMarkUp(arr) {
  return arr
    .map(
      ({ name }) => `
          <li class="category">
            <button class="category-btn" type="button">${name}</button>
          </li>
          `
    )
    .join('');
}

categoriesBtnEl?.addEventListener('click', handlerAllCategoriesBtn);

function handlerAllCategoriesBtn() {
  makeBtnNotActive();
  removeCategoriesFromLS()
  getAllRecipes();
}

async function getAllRecipes() {
  try {
    if (!errorEl.classList.contains('is-hidden')) {
      errorEl.classList.add('is-hidden');
    }
    const resp = await request.fetchAllRecipesPerPage(seeViewport());
    cardsMarkUp(resp.data.results);
  } catch (err) {
    console.log(err);
    recipesTable.innerHTML = '';
    errorEl.classList.remove('is-hidden');
  }
}

categoriesListEl?.addEventListener('click', handlerCategoryBtn);

function handlerCategoryBtn(ev) {
  if (ev.target.nodeName !== 'BUTTON') {
    return;
  }
  if (ev.target.classList.contains('category-btn-active')) {
    return;
  }
  makeBtnNotActive();
  ev.target.classList.add('category-btn-active');
  const nameOfCategory = ev.target.textContent;
  handleCategoryClick(nameOfCategory);
  getRecipesByCategory(nameOfCategory);
}

export async function getRecipesByCategory(category) {
  try {
    if (!errorEl.classList.contains('is-hidden')) {
      errorEl.classList.add('is-hidden');
    }
    const resp = await request.fetchByCategory(category, 1, seeViewport());
    if (resp.data.results.length === 0) {
      recipesTable.innerHTML =
        'We are sorry. There are no recipes in this category.';
    }
    totalPages = resp.data.totalPages;
    cardsMarkUp(resp.data.results);
  } catch (err) {
    console.log(err);
    recipesTable.innerHTML = '';
    errorEl.classList.remove('is-hidden');
  }
}

function makeBtnNotActive() {
  categoryBtns.map(btn => {
    if (btn.classList.contains('category-btn-active')) {
      btn.classList.remove('category-btn-active');
    }
  });
}

export function getNameOfActiveCategory() {
  categoryBtns.map(btn => {
    if (btn.classList.contains('category-btn-active')) {
      console.log(btn.textContent);
      return btn.textContent;
    }
  });
}

export function getTotalPages() {
  return totalPages;
}
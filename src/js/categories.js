import { FetchInfo } from './fetch-requests';
import { cardsMarkUp } from './recipes-cards';
import { seeViewport } from './recipes-cards';
import {
  goToLocal,
  handleCategoryClick,
  removeCategoriesFromLS,
  resetLocalStorageFilters,
} from './local-storage';
import { paginationSetUp } from './pagination';
import {
  createErrorContainerForRecipes,
  errorElementCategoryAndFilters,
  errorRemove,
} from './error-msg';
import { resetAllFilters } from './filter';

const request = new FetchInfo();
const categoriesBtnEl = document.querySelector('.categories-btn-js');
const categoriesListEl = document.querySelector('.categories-list-js');
const errorEl = document.querySelector('.error-el');
const recipesTable = document.querySelector('.js-card-items');
const paginationContainer = document.querySelector('#pagination');

let categoryBtns = [];
let totalPages;
let currentPage;

async function getCategories() {
  try {
    const resp = await request.fetchAllCategories();
    if (categoriesListEl)
      categoriesListEl.insertAdjacentHTML(
        'afterbegin',
        createCategoriesMarkUp(resp.data)
      );
    const btns = document.querySelectorAll('.category-btn');
    categoryBtns = [...btns];
    goToLocal();
  } catch (err) {
    console.log(err);
    if (categoriesListEl) {
      categoriesListEl.innerHTML = `
      <p class="categories-err">
      We are sorry, something went wrong. Please, reload the page!
      </p>
      `;
    }
  }
}

getCategories();
createErrorContainerForRecipes();

if (!localStorage.getItem('selected-category')) {
  getAllRecipes();
  // resetLocalStorageFilters();
  if (categoriesBtnEl) categoriesBtnEl.classList.add('categories-btn-active');
}

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
  categoriesBtnEl.classList.add('categories-btn-active');
  removeCategoriesFromLS();
  errorRemove();
  getAllRecipes();
  resetAllFilters();
  resetLocalStorageFilters();
}

export async function getAllRecipes(selectedPage) {
  try {
    if (!errorEl.classList.contains('is-hidden')) {
      errorEl.classList.add('is-hidden');
    }
    const pageToShow = selectedPage || 1;
    const resp = await request.fetchAllRecipesPerPage(
      seeViewport(),
      pageToShow
    );
    totalPages = resp.data.totalPages;
    currentPage = resp.data.page;
    cardsMarkUp(resp.data.results);
    if (paginationContainer.classList.contains('is-hidden')) {
      paginationContainer.classList.remove('is-hidden');
    }
    if (pageToShow === 1) {
      paginationSetUp(currentPage, totalPages);
    }
  } catch (err) {
    if (recipesTable) {
      console.log(err);
      recipesTable.innerHTML = '';
      errorEl.classList.remove('is-hidden');
    }
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
  categoriesBtnEl.classList.remove('categories-btn-active');
  makeBtnNotActive();
  errorRemove();
  ev.target.classList.add('category-btn-active');
  const nameOfCategory = ev.target.textContent;
  handleCategoryClick(nameOfCategory);
  getRecipesByCategory(nameOfCategory);
}

export async function getRecipesByCategory(category, selectedPage) {
  try {
    if (!errorEl.classList.contains('is-hidden')) {
      errorEl.classList.add('is-hidden');
    }
    const pageToShow = selectedPage || 1;
    const resp = await request.fetchByCategory(
      category,
      pageToShow,
      seeViewport()
    );
    if (resp.data.results.length === 0) {
      errorElementCategoryAndFilters(
        'We are sorry. There are no recipes in this category.'
      );
      paginationContainer.classList.add('is-hidden');
    }
    totalPages = resp.data.totalPages;
    currentPage = resp.data.page;
    cardsMarkUp(resp.data.results);
    if (paginationContainer.classList.contains('is-hidden')) {
      paginationContainer.classList.remove('is-hidden');
    }
    if (pageToShow === 1) {
      paginationSetUp(currentPage, totalPages);
    }
  } catch (err) {
    if (recipesTable) {
      console.log(err);
      recipesTable.innerHTML = '';
      errorEl.classList.remove('is-hidden');
    }
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
  let nameOfActiveBtn = '';
  categoryBtns.forEach(btn => {
    if (btn.classList.contains('category-btn-active')) {
      nameOfActiveBtn = btn.textContent;
    }
  });
  return nameOfActiveBtn;
}

export function getTotalPages() {
  return totalPages;
}

export async function getRecipeByInfo(filtersObj, selectedPage) {
  errorRemove();
  if (paginationContainer.classList.contains('is-hidden')) {
    paginationContainer.classList.remove('is-hidden');
  }
  if (filtersObj.title) {
    getRecipeByTitleInfo(filtersObj, selectedPage);
  } else {
    getRecipeByFilterInfo(filtersObj, selectedPage);
  }
}

export async function getRecipeByTitleInfo(filtersObj, selectedPage) {
  const selectedCategory = getNameOfActiveCategory();
  if (!selectedCategory) {
    getRecipeByTitle(filtersObj, selectedPage);
  } else {
    getRecipeByTitleAndCategory(filtersObj, selectedPage);
  }
}

export async function getRecipeByFilterInfo(filtersObj, selectedPage) {
  const selectedCategory = getNameOfActiveCategory();
  if (!selectedCategory) {
    getRecipeByFilter(filtersObj, selectedPage);
  } else {
    getRecipeByFilterAndCategory(filtersObj, selectedPage);
  }
}

export async function getRecipeByTitle(filtersObj, selectedPage) {
  try {
    if (!errorEl.classList.contains('is-hidden')) {
      errorEl.classList.add('is-hidden');
    }
    const pageToShow = selectedPage || 1;
    const resp = await request.fetchRecipeByTitle(
      filtersObj.title,
      pageToShow,
      seeViewport()
    );
    if (resp.data.results.length === 0) {
      errorElementCategoryAndFilters(
        'We are sorry. There are no recipes matching your request.'
      );
      paginationContainer.classList.add('is-hidden');
    }
    totalPages = resp.data.totalPages;
    currentPage = resp.data.page;
    cardsMarkUp(resp.data.results);
    if (pageToShow === 1) {
      paginationSetUp(currentPage, totalPages, filtersObj);
    }
  } catch (err) {
    if (recipesTable) {
      console.log(err);
      recipesTable.innerHTML = '';
      errorEl.classList.remove('is-hidden');
    }
  }
}

export async function getRecipeByTitleAndCategory(filtersObj, selectedPage) {
  try {
    if (!errorEl.classList.contains('is-hidden')) {
      errorEl.classList.add('is-hidden');
    }
    const pageToShow = selectedPage || 1;
    const resp = await request.fetchRecipeByTitleAndCategory(
      getNameOfActiveCategory(),
      filtersObj.title,
      pageToShow,
      seeViewport()
    );
    if (resp.data.results.length === 0) {
      errorElementCategoryAndFilters(
        'We are sorry. There are no recipes matching your request.'
      );
      paginationContainer.classList.add('is-hidden');
    }
    totalPages = resp.data.totalPages;
    currentPage = resp.data.page;
    cardsMarkUp(resp.data.results);
    if (pageToShow === 1) {
      paginationSetUp(currentPage, totalPages, filtersObj);
    }
  } catch (err) {
    if (recipesTable) {
      console.log(err);
      recipesTable.innerHTML = '';
      errorEl.classList.remove('is-hidden');
    }
  }
}

export async function getRecipeByFilter(filtersObj, selectedPage) {
  try {
    if (!errorEl.classList.contains('is-hidden')) {
      errorEl.classList.add('is-hidden');
    }
    const pageToShow = selectedPage || 1;
    const resp = await request.fetchRecipesByFilter(
      pageToShow,
      seeViewport(),
      filtersObj.time,
      filtersObj.area,
      filtersObj.ingredients
    );
    if (resp.data.results.length === 0) {
      errorElementCategoryAndFilters(
        'We are sorry. There are no recipes matching your request.'
      );
      paginationContainer.classList.add('is-hidden');
    }
    totalPages = resp.data.totalPages;
    currentPage = resp.data.page;
    cardsMarkUp(resp.data.results);
    if (pageToShow === 1) {
      paginationSetUp(currentPage, totalPages, filtersObj);
    }
  } catch (err) {
    if (recipesTable) {
      console.log(err);
      recipesTable.innerHTML = '';
      errorEl.classList.remove('is-hidden');
    }
  }
}

export async function getRecipeByFilterAndCategory(filtersObj, selectedPage) {
  try {
    if (!errorEl.classList.contains('is-hidden')) {
      errorEl.classList.add('is-hidden');
    }
    const pageToShow = selectedPage || 1;
    const resp = await request.fetchRecipesByFilterWithCategory(
      getNameOfActiveCategory(),
      pageToShow,
      seeViewport(),
      filtersObj.time,
      filtersObj.area,
      filtersObj.ingredients
    );
    console.log(filtersObj);
    if (resp.data.results.length === 0) {
      errorElementCategoryAndFilters(
        'We are sorry. There are no recipes matching your request.'
      );
      paginationContainer.classList.add('is-hidden');
    }
    totalPages = resp.data.totalPages;
    currentPage = resp.data.page;
    cardsMarkUp(resp.data.results);
    if (pageToShow === 1) {
      paginationSetUp(currentPage, totalPages, filtersObj);
    }
  } catch (err) {
    if (recipesTable) {
      console.log(err);
      recipesTable.innerHTML = '';
      errorEl.classList.remove('is-hidden');
    }
  }
}

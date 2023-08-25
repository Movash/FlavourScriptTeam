import { FetchInfo } from './fetch-requests';
import { cardsMarkUp } from './recipes-cards';

const categoriesBtnEl = document.querySelector('.categories-btn-js');
const categoriesListEl = document.querySelector('.categories-list-js');

let categoryBtns = [];

async function getCategories() {
  const categories = new FetchInfo();
  try {
    const resp = await categories.fetchAllCategories();
    categoriesListEl.insertAdjacentHTML(
      'afterbegin',
      createCategoriesMarkUp(resp.data)
    );
    const btns = document.querySelectorAll('.category-btn');
    categoryBtns = [...btns];
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

categoriesBtnEl.addEventListener('click', handlerAllCategoriesBtn);

function handlerAllCategoriesBtn() {
  makeBtnNotActive();
  getAllRecipes();
}

async function getAllRecipes() {
  const allRecipes = new FetchInfo();
  try {
    const resp = await allRecipes.fetchAllRecipesPerPage((limit = 9));
    cardsMarkUp(resp.data.results);
  } catch (err) {
    console.log(err);
    //   функ що малює помилку при рендері всіх рецептів на місці рецептів і приймає рядок повідомлення ('We are sorry. Something went wrong. Please, try reload the page.')
  }
  //   функ що малює помилку при рендері всіх рецептів на місці рецептів і приймає рядок повідомлення ('We are sorry. Something went wrong. Please, try reload the page.')
}

categoriesListEl.addEventListener('click', handlerCategoryBtn);

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
  getRecipesByCategory(nameOfCategory);
}

async function getRecipesByCategory(category) {
  const recipesByCategory = new FetchInfo();
  try {
    const resp = await recipesByCategory.fetchByCategory(
      category,
      (page = 1),
      (limit = 9)
    );
    if (resp.data.results.length === 0) {
      // функ що малює помилку при рендері рецептів рецептів по категорії на місці рецептів і приймає рядок повідомлення ('We are sorry. There are no recipes in this category.');
    }
    cardsMarkUp(resp.data.results);
  } catch (err) {
    console.log(err);
    //   функ що малює помилку при рендері рецептів по категорії на місці рецептів і приймає рядок повідомлення ('We are sorry. Something went wrong. Please, try reload the page.')
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
        return btn.textContent
      }
    });
  } 
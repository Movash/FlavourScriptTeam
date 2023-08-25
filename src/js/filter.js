import { debounce } from 'lodash';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import '../css/filter.css';

import { FetchInfo } from './fetch-requests.js';
import { getRecipeByInfo, getAllRecipes } from './categories.js';
import {
  saveInLocalStorageFilters,
  getFiltersFromLS,
} from './local-storage.js';

const filters = new FetchInfo();

const inputSubmit = document.querySelector('.search-input');
const selectTime = document.querySelector('.time-select');
const selectArea = document.querySelector('.area-select');
const selectIngredients = document.querySelector('.ingredients-select');
const resetFilter = document.querySelector('.filter-reset');
const resetInput = document.querySelector('.filter-input-reset-icon');

inputSubmit?.addEventListener('input', debounce(handlerInput, 300));
selectTime?.addEventListener('change', selectedTime);
selectArea?.addEventListener('change', selectedArea);
selectIngredients?.addEventListener('change', selectedIngredient);
resetFilter?.addEventListener('click', () => {
  resetAllFilters(), getAllRecipes();
});
resetInput?.addEventListener('click', resetInputValue);
inputSubmit?.addEventListener('keydown', removeEnter);

let searchText;
let searchTime;
let searchArea;
let searchIngredient;

let slimSelectTime;
let slimSelectArea;
let slimSelectIngredients;

let timeoutId;

function timesMarkup() {
  const defaultTimeOption = `<option data-placeholder="true" value="">0 min</option>`;
  const fullTimeOption = `<option value="">0 min</option>`;
  let secondsStep = [];
  for (let minutes = 5; minutes <= 120; minutes += 5) {
    secondsStep.push(`${minutes}`);
  }
  let timeMarkup = secondsStep
    .map(minute => {
      return `<option value="${minute}">${minute} min</option>`;
    })
    .join('');
  const selectTimeMarkup = defaultTimeOption + fullTimeOption + timeMarkup;
  if (selectTime) selectTime.insertAdjacentHTML('beforeend', selectTimeMarkup);

  slimSelectTime = new SlimSelect({
    select: '.time-select',
  });
}

timesMarkup();

filters
  .fetchAllAreas()
  .then(resp => {
    const defaultAreaOption =
      '<option data-placeholder="true" value="">Region</option>';
    const fullAreaOption = '<option value="" selected>Region</option>';
    const areasMarkup = resp.data
      .map(area => {
        return `<option value="${area.name}">${area.name}</option>`;
      })
      .join('');
    const selectAreaMarkup = defaultAreaOption + fullAreaOption + areasMarkup;
    selectArea.insertAdjacentHTML('beforeend', selectAreaMarkup);

    slimSelectArea = new SlimSelect({
      select: '.area-select',
    });
  })
  .catch(() => {
    // Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
  });

filters
  .fetchAllIngredients()
  .then(resp => {
    const defaultIngredientsOption =
      '<option data-placeholder="true" value="">Product</option>';
    const fullIngredientsOption = '<option value="" selected>Product</option>';
    const ingredientsMarkup = resp.data
      .map(ingredient => {
        return `<option value="${ingredient._id}">${ingredient.name}</option>`;
      })
      .join('');
    const selectIngredientsMarkup =
      defaultIngredientsOption + fullIngredientsOption + ingredientsMarkup;
    selectIngredients.insertAdjacentHTML('beforeend', selectIngredientsMarkup);

    slimSelectIngredients = new SlimSelect({
      select: '.ingredients-select',
    });
  })
  .catch(() => {
    // Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
  });

let fullFilter = {
  title: searchText,
  time: searchTime,
  area: searchArea,
  ingredients: searchIngredient,
};

function handlerInput(evt) {
  searchText = evt.target.value.trim().toLowerCase();
  if (searchText.length >= 1) {
    resetInput.classList.remove('is-hidden');
    selectTime.setAttribute('disabled', 'disabled');
    selectArea.setAttribute('disabled', 'disabled');
    selectIngredients.setAttribute('disabled', 'disabled');
    updateFullFilter();
    getRecipeByInfo(fullFilter);
  }
  if (searchText.length === 0) {
    resetInput.classList.add('is-hidden');
    selectTime.removeAttribute('disabled');
    selectArea.removeAttribute('disabled');
    selectIngredients.removeAttribute('disabled');
    getAllRecipes();
    updateFullFilter();
  }
  // console.log(fullFilter);
}

function selectedTime(evt) {
  searchTime = evt.currentTarget.value;
  updateFullFilter();
}

function selectedArea(evt) {
  searchArea = evt.currentTarget.value;
  updateFullFilter();
}

function selectedIngredient(evt) {
  searchIngredient = evt.currentTarget.value;
  updateFullFilter();
}

function scheduleUpdate() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    updateFullFilter();
  }, 100);
}

function resetInputValue() {
  inputSubmit.value = '';
  searchText = '';
  resetInput.classList.add('is-hidden');
  selectTime.removeAttribute('disabled');
  selectArea.removeAttribute('disabled');
  selectIngredients.removeAttribute('disabled');
  getAllRecipes();
  updateFullFilter();
}

function removeEnter(evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();
  }
}

// setTimeout(() => {takeFromLocal()}, 2000);

function updateFullFilter() {
  fullFilter.title = searchText;
  fullFilter.time = searchTime;
  fullFilter.area = searchArea;
  fullFilter.ingredients = searchIngredient;

  // saveInLocalStorageFilters(fullFilter);

  if (searchTime || searchArea || searchIngredient) {
    inputSubmit.classList.add('disabled');
    inputSubmit.setAttribute('disabled', 'disabled');
  }
  if (!searchTime && !searchArea && !searchIngredient) {
    inputSubmit.classList.remove('disabled');
    inputSubmit.removeAttribute('disabled');
  }
  // console.log(fullFilter);
  if (searchTime && searchArea && searchIngredient) {
    getRecipeByInfo(fullFilter);
    return;
  } else if (!searchTime && !searchArea && !searchIngredient) {
    return;
  } else {
    Notify.info(`Please fill all fields`);
  }
}

export function resetAllFilters() {
  inputSubmit.value = '';

  setSelectedDelay(placeholderTimeout);

  searchText = '';
  searchTime = '';
  searchArea = '';
  searchIngredient = '';

  resetInput.classList.add('is-hidden');
  inputSubmit.removeAttribute('disabled');
  selectTime.removeAttribute('disabled');
  selectArea.removeAttribute('disabled');
  selectIngredients.removeAttribute('disabled');

  updateFullFilter();
}

function takeFromLocal() {
  fullFilterFromLocal = getFiltersFromLS() || {};
  // console.log(fullFilterFromLocal);
  searchText = fullFilterFromLocal.title || '';
  searchTime = fullFilterFromLocal.time || '';
  searchArea = fullFilterFromLocal.area || '';
  searchIngredient = fullFilterFromLocal.ingredients || '';

  inputSubmit.value = searchText;

  setSelectedDelay(localStorageTimeout);

  if (searchText.length >= 1) {
    resetInput.classList.remove('is-hidden');
    selectTime.setAttribute('disabled', 'disabled');
    selectArea.setAttribute('disabled', 'disabled');
    selectIngredients.setAttribute('disabled', 'disabled');
  }
  if (searchText.length === 0) {
    resetInput.classList.add('is-hidden');
    selectTime.removeAttribute('disabled');
    selectArea.removeAttribute('disabled');
    selectIngredients.removeAttribute('disabled');
  }
  getRecipeByInfo(fullFilterFromLocal);
}

function setSelectedDelay(foo) {
  someTime = window.setTimeout(foo, 0);
}

function placeholderTimeout() {
  slimSelectTime.setSelected(selectTime.options[0].value);
  slimSelectArea.setSelected(selectArea.options[0].value);
  slimSelectIngredients.setSelected(selectIngredients.options[0].value);
}

function localStorageTimeout() {
  slimSelectTime.setSelected(searchTime);
  slimSelectArea.setSelected(searchArea);
  slimSelectIngredients.setSelected(searchIngredient);
}

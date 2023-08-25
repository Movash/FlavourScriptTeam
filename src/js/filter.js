import { debounce } from 'lodash';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import '../css/filter.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { FetchInfo } from './fetch-requests.js';

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
resetFilter?.addEventListener('click', resetAllFilters)
resetInput?.addEventListener('click', resetInputValue);

let searchArea = '';
let searchIngredient = ''; 
let searchTime = ''; 
let searchText = '';

let slimSelectTime;
let slimSelectArea;
let slimSelectIngredients;

export const fullFilter = {
  search: searchText,
  time: searchTime,
  area: searchArea,
  ingredients: searchIngredient,
};

const defaultTimeOption =
  '<option data-placeholder="true" value="">0 min</option>';
  const fullTimeOption = '<option value="">0 min</option>';

function timesMarkup() {
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
  selectTime.insertAdjacentHTML('beforeend', selectTimeMarkup);

  slimSelectTime = new SlimSelect({
    select: '.time-select',
  });
}

timesMarkup();

const defaultAreaOption =
  '<option data-placeholder="true" value="">Region</option>';
  const fullAreaOption = 
  '<option value="" selected>Region</option>';

filters
  .fetchAllAreas()
  .then(resp => {
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
    Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
  });

  const defaultIngredientsOption =
    '<option data-placeholder="true" value="">Product</option>';
  const fullIngredientsOption =
    '<option value="" selected>Product</option>';

filters
  .fetchAllIngredients()
  .then(resp => {
    const ingredientsMarkup = resp.data
      .map(ingredient => {
        return `<option value="${ingredient.name}">${ingredient.name}</option>`;
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
    Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
  });

function handlerInput(evt) {
  evt.preventDefault();
  searchText = evt.target.value.trim().toLowerCase();
  if (searchText.length >= 1) {
    resetInput.classList.remove('is-hidden');
  }
  if (searchText.length === 0) {
    resetInput.classList.add('is-hidden');
  }
  updateFullFilter();
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

function resetInputValue() {
  inputSubmit.value = '';
  searchText = '';
  resetInput.classList.add('is-hidden');
  updateFullFilter();
}

function updateFullFilter() {
  fullFilter.search = searchText;
  fullFilter.time = searchTime;
  fullFilter.area = searchArea;
  fullFilter.ingredients = searchIngredient;
  console.log(fullFilter);
}

function resetAllFilters() {
  resetInput.classList.add('is-hidden');
  
  inputSubmit.value = '';
  
  slimSelectTime.setSelected(selectTime.options[0].value);
  slimSelectArea.setSelected(selectArea.options[0].value);
  slimSelectIngredients.setSelected(selectIngredients.options[0].value);

  searchText = '';
  searchTime = '';
  searchArea = '';
  searchIngredient = '';
  
  updateFullFilter();
}
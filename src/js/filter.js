import { debounce } from 'lodash';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import '../css/filter.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { FetchInfo } from './fetch-requests.js';

const selectArea = document.querySelector('.area-select');
const selectIngredients = document.querySelector('.ingredients-select');
const selectTime = document.querySelector('.time-select');

selectArea.addEventListener('change', selectedArea)
selectIngredients.addEventListener('change', selectedIngredient);

function selectedArea(evt) {
  searchArea = evt.currentTarget.value
  console.log(searchArea);
}

function selectedIngredient(evt) {
  searchIngredient = evt.currentTarget.value;
  console.log(searchIngredient);
}

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
  selectTime.insertAdjacentHTML('beforeend', timeMarkup);

  new SlimSelect({
    select: selectTime,
  });
}
timesMarkup();

const filters = new FetchInfo();

filters
  .fetchAllAreas()
  .then(resp => {
    const areasMarkup = resp.data
      .map(area => {
        return `<option value="${area._id}">${area.name}</option>`;
      })
      .join('');
    selectArea.insertAdjacentHTML('beforeend', areasMarkup);

    new SlimSelect({
      select: selectArea,
    });
  })
  .catch(() => {
    Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
  });

filters
  .fetchAllIngredients()
  .then(resp => {
    const ingredientsMarkup = resp.data
      .map(ingredient => {
        return `<option value="${ingredient._id}">${ingredient.name}</option>`;
      })
      .join('');
    selectIngredients.insertAdjacentHTML('beforeend', ingredientsMarkup);

    new SlimSelect({
      select: selectIngredients,
    });
  })
  .catch(() => {
    Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
  });

const inputSubmit = document.querySelector('.search-input');

inputSubmit.addEventListener('input', debounce(handlerInput, 300));

function handlerInput(evt) {
  searchText = evt.target.value.trim().toLowerCase();
  console.log(searchText);
  
  // if (searchText === '') {
  //   виклик функціх з All categories
  //   return
  // }
}

// function foo (searchText, )
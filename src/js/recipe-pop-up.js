import { FetchInfo } from './fetch-requests';
import { showRating, openRatingModal } from './rating-pop-up.js';
import { createModal } from './open-any-modal.js';
import { takeFavoritesCardsFromLS, addToLocalFavoritesCards, removeFromLocalStorage, getPaginationFromLS} from './local-storage';
import { makeCardsMarkUp, seeViewport, cardsMarkup } from './recipes-cards.js';
import {getAllRecipes} from './categories.js';

const recipes = new FetchInfo();

export function openRecipeModal(id){
    createModal(recipeModalContentMurkup());
    addBorder();
    recipes.fetchRecipeById(id).then(recipeObj => {
        recipeModalMarkup(recipeObj.data);
        showRating();
        addOrRemoveBtn(recipeObj.data.title);
        window?.addEventListener('resize', moveTags);
        moveTags();
        const btnAddFav = document.querySelector('.btn-favorite');
        const btnRemoveFav = document.querySelector('.btn-remove-fav');
        btnAddFav?.addEventListener('click', () => addToFav(recipeObj.data));
        btnRemoveFav?.addEventListener('click',() => removeFromFav(recipeObj.data));
        const btnRating = document.querySelector('.btn-give-rating');
        btnRating.addEventListener('click', () => {openRatingModal(recipeObj.data._id, recipeObj.data.title, recipeObj.data.rating)});
      });
}


function recipeModalContentMurkup() {
    return `<div class="modal-recipe">
        <button type="button" class="btn-recipe-close close-button">x</button>
        <div class="modal-recipe-content">  
        </div>
        <div class="recipe-modal-btn-wrap">
            <button type="button" class="base-btn btn-favorite">Add to favorite</button>
            <button type="button" class="base-btn btn-remove-fav is-hidden">Remove from favorite</button>
            <button type="button" class="base-btn btn-give-rating">Give a rating</button>
         </div>
          </div>
`
}

function recipeModalMarkup(recipeData){
    const recipeContainer = document.querySelector('.modal-recipe-content');
    const videoOrImage = () => {
            if (recipeData.youtube) {
              const videoId = recipeData.youtube.split('v=')[1];
              const embedLink = `https://www.youtube.com/embed/${videoId}`;
              const video = `<iframe class="recipe-modal-video" src="${embedLink}" width="295" height="295" alt="${recipeData.title}"></iframe>`;
              return video;
            }
            return `<img class="recipe-modal-img" src="${recipeData.preview}" width="295" height="295" alt="${recipeData.title}"></img>`;
          };

    const ingredientsList = recipeData.ingredients.map(
      ingredient =>
        `<li class="recipe-modal-ingredients-item"><span class="ingredients-name-span">${ingredient.name}</span><span class="ingredients-measure-span">${ingredient.measure}</span></li>`
    )
    .join('');

  const ifTags = () => {
    if (recipeData.tags[0] === '') {
      return '';
    }
    const tagslist = recipeData.tags.map(
        tag =>
          `<li class="recipe-modal-tag-item">
                <span class="recipe-modal-teg-span">#${tag}</span>
            </li>`
      )
      .join('');
    return tagslist;
  };
  const paragrapsOfRecipe = recipeData.instructions.split(/\r\n\r\n|\r\n/);

  const paragrapsMarkup = paragrapsOfRecipe
    .map(
      paragraph =>
        `<p class="recipe-modal-instructions-paragraph">${paragraph}</p>`
    )
    .join('');
    const recipeMarkup =  `<div class="video-or-image-wrap">${videoOrImage()}</div>
             <h2 class="recipe-modal-title">${recipeData.title}</h2>
             <div class="rating-time-tags-wrap"></div>
            <div class="rating-time-wrap">
                <div class="rating-recipe-modal rating">
                    <div class="rating-value-modal rating-value">${recipeData.rating}</div>
                        <div class="rating-body">
                            <div class="rating-active"></div>
                                <div class="rating-items">
                      <input type="radio" class="rating-item" name="recipe-rating" value="1"/>
                      <input type="radio" class="rating-item" name="recipe-rating" value="2"/>
                      <input type="radio" class="rating-item" name="recipe-rating" value="3"/>
                      <input type="radio" class="rating-item" name="recipe-rating" value="4"/>
                      <input type="radio" class="rating-item" name="recipe-rating" value="5"/>
                                </div>
                        </div>
                  </div>
            <p class="recipe-modal-time">${recipeData.time}min</p>
            </div>
                    <div class="scroll-div">
                <ul class="modal-ingredients-list">
                ${ingredientsList}
                </ul>
            <div class="recipe-modal-tags">
                <ul class="modal-tags-list">
                ${ifTags()}
                </ul>
            </div>
            <div class="recipe-modal-instructions-wrap">
                ${paragrapsMarkup}
            </div>
                    </div>
            `;
      recipeContainer.innerHTML = recipeMarkup;
}

function moveTags(){
  const divWrap = document.querySelector('.rating-time-tags-wrap');
  const tagsDiv = document.querySelector('.recipe-modal-tags');
  const tagsUl = document.querySelector('.modal-tags-list');
  const divTimeRating = document.querySelector('.rating-time-wrap');
  
  if (window.innerWidth > 768){
    divWrap.appendChild(tagsUl);
    divWrap.appendChild(divTimeRating);
  } else {
    tagsDiv.appendChild(tagsUl);
  }
}


function addBorder(){
  const modalRecipe = document.querySelector('.modal-recipe');

  let activeTheme = localStorage.getItem('theme');
  if (activeTheme === 'dark'){
    modalRecipe.style.border = '4px solid var( --light-theme-almost-transparent-color)';
    modalRecipe.style.borderRadius = '10px';
  }
}


function addOrRemoveBtn(recipeTitle) {
 const btnAddFav = document.querySelector('.btn-favorite');
 const btnRemoveFav = document.querySelector('.btn-remove-fav');
  const recipesInLS = takeFavoritesCardsFromLS();
    if (recipesInLS[0] === null){
      return;
    } 

    const isRecipeTitleInObj = Object.values(recipesInLS)
    .some(obj => obj.title === recipeTitle);

    if(isRecipeTitleInObj){
      btnAddFav.classList.add('is-hidden');
      btnRemoveFav.classList.remove('is-hidden');
    }
}

function addToFav(recipe){
  const btnAddFav = document.querySelector('.btn-favorite');
  const btnRemoveFav = document.querySelector('.btn-remove-fav');
  addToLocalFavoritesCards(recipe);
  // getAllRecipes();
  // const recipesFromLS = takeFavoritesCardsFromLS();
  // const recipesTable = document.querySelector('.js-card-items');
  // recipes.fetchAllRecipesPerPage(seeViewport(), 1).then((allRecipes) => { 
  // console.log(allRecipes);
  // recipesTable.innerHTML = makeCardsMarkUp(allRecipes.data.results)});
  btnAddFav.classList.add('is-hidden');
  btnRemoveFav.classList.remove('is-hidden');
}

function removeFromFav(recipe){
  const btnAddFav = document.querySelector('.btn-favorite');
  const btnRemoveFav = document.querySelector('.btn-remove-fav');
  removeFromLocalStorage(recipe._id);
  const recipesFromLS = takeFavoritesCardsFromLS();
  makeCardsMarkUp(recipesFromLS);
  btnRemoveFav.classList.add('is-hidden');
  btnAddFav.classList.remove('is-hidden');
}
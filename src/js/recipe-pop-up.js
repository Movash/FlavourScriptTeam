import { all } from "axios";
import { FetchInfo } from "./fetch-requests";

const recipes = new FetchInfo();


const recipeContainer = document.querySelector('.modal-recipe-content');

recipes.fetchRecipeById()
.then(recipeObj => {
    console.log(recipeObj.data);
    recipeMarkup(recipeObj.data);
});



function recipeMarkup(resipeData){
    const {youtube, preview, title, rating, time, ingredients, tags, instructions} = resipeData; 
    // console.log(resipeData);
    // const videoOrImg = youtube ? `<iframe src="${youtube}" width="295" height="295"></iframe>` : `<img src="${preview}"></img>`; 
    // const videoOrImg = fVideoOrImg();
    // console.log(videoOrImg);
    // function fVideoOrImg(){
    //     const canDisplayVideo = canDisplayInIframe(youtube);
    //     if (!canDisplayVideo){
    //         return `<img src="${preview}" width="295" height="295"></img>`;
    //     }
    //     return `<iframe class="recipe-modal-video" src="${youtube}" width="295" height="295"></iframe>`; 
    // }


    const ingredientsListName = ingredients.map(ingredient => 
            `<li class="recipe-modal-name-item">${ingredient.name}</li>`
            ).join('');
    

    const ingredientsListMeasure = ingredients.map( ingredient => 
        `<li class="recipe-modal-measure-item">${ingredient.measure}</li>`).join('');


    const tagslist = tags.map( tag => 
        `<li class="recipe-modal-tag-item">
            <span class="recipe-modal-teg-span">#${tag}</span>
        </li>`).join('');

    const paragrapsOfRecipe = instructions.split('\r\n\r\n');
    const paragrapsMarkup = paragrapsOfRecipe.map(paragraph => 
        `<p class="recipe-modal-instructions-paragraph">${paragraph}</p>`).join('');

    const recipeMarkup = `<img class="recipe-modal-img" src="${preview}" width="295" height="295"></img>
    <h2 class="recipe-modal-title">${title}</h2>
    <div class="rating-time-wrap">
    <p class="recipe-modal-rating">${rating}</p>
    <span class="recipe-modal-stars">*****</span>
    <p class="recipe-modal-time">${time}min</p>
    </div>
    <div class="modal-ingredients-list-wrap">
        <ul class="modal-ingredients-name-list">
        ${ingredientsListName}
        </ul>
        <ul class="modal-ingredients-measure-list">
        ${ingredientsListMeasure}
        </ul>
    </div>
    <div class="recipe-modal-tags">
        <ul class="modal-tags-list">
        ${tagslist}
        </ul>
    </div>
    <div class="recipe-modal-instructions-wrap">
        ${paragrapsMarkup}
    </div>
    `;
    recipeContainer.insertAdjacentHTML('afterbegin', recipeMarkup);
}

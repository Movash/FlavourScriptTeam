export function createErrorContainerForRecipes() {
  const recipesTable = document.querySelector('.js-card-items');
  if (recipesTable) {
    recipesTable.insertAdjacentHTML(
      'afterend',
      `<div class="err-container-recipes-js" style="text-align: center"></div>`
    );
  }
}

export function errorElementCategoryAndFilters(string) {
  const errContainerRecipies = document.querySelector(
    '.err-container-recipes-js'
  );
  errContainerRecipies.innerHTML = `<p class="categories-err cards-err-js" ">${string}</p>`;
}

export function errorRemove() {
  const errContainerRecipies = document.querySelector(
    '.err-container-recipes-js'
  );
  errContainerRecipies.innerHTML = '';
}

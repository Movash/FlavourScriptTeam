const recipesTable = document.querySelector('.js-card-items');

export function errorElementCategoryAndFilters(string) {
    recipesTable.insertAdjacentHTML(
            'afterend',
            `<div><p class="categories-err" style="text-align: center">${string}</p></div>`
          );
    }
import Pagination from 'tui-pagination';
import { getAllRecipes, getRecipesByCategory } from './categories.js';
import { getCategoryFromLS } from './local-storage.js';

function paginationSetUp(currentPage, totalPages, objFromFilter) {
  const container = document.getElementById('pagination');

  const options = {
    totalItems: `${totalPages}` + 0,
    itemsPerPage: 10,
    visiblePages: window.innerWidth < 768 ? 2 : 3,
    page: currentPage,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn current-page">{{page}}</a>',
      currentPage: '<span class="tui-page-btn tui-is-selected">{{page}}</span>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };

  const pagination = new Pagination(container, options);

  container.addEventListener('click', function (event) {
    if (event.target.classList.contains('tui-page-btn')) {
      someFn(event.target);
    }
  });

  function someFn(clickedButton) {
    const currentPage = pagination.getCurrentPage();
    const currentCategory = getCategoryFromLS();
    if (objFromFilter) {
      doFilterCards(objFromFilter);
      return;
    } else if (currentCategory) {
      getRecipesByCategory(currentCategory, currentPage);
      return;
    } else {
      getAllRecipes(currentPage);
    }
  }

  function doFilterCards() {
    if (title) {
      // fn for title search
      return;
    }
    // fn for other filters
  }
}

export { paginationSetUp };

// const pageButtons = container.querySelectorAll('.tui-page-btn');
// pageButtons.forEach((button, index) => {
//   button.addEventListener('click', (event) => {
//     event.preventDefault();
//       const clickedPage = index + 1;
//       console.log(`Користувач клікнув на сторінку ${clickedPage}`);
//       });
// });

// function someFn(pageNumber) {
//   console.log(`Обраний номер сторінки: ${pageNumber}`);
// }

// showPagination(1, 20);
// function showPagination(currentPage, totalPages) {
//   const container = document.getElementById('pagination');
//   const options = {
//     totalItems: totalPages, // Припустимо, що у вас є 100 елементів, які потрібно розподілити на сторінки
//     itemsPerPage: 9,
//     visiblePages: window.innerWidth < 768 ? 2 : 3,
//     page: currentPage,
//     centerAlign: true,
//     firstItemClassName: 'tui-first-child',
//     lastItemClassName: 'tui-last-child',
//     template: {
//       page: '<a href="#" class="tui-page-btn current-page">{{page}}</a>',
//       currentPage: '<span class="tui-page-btn tui-is-selected">{{page}}</span>',
//       moveButton:
//         '<a href="#" class="tui-page-btn tui-{{type}}">' +
//         '<span class="tui-ico-{{type}}">{{type}}</span>' +
//         '</a>',
//       disabledMoveButton:
//         '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
//         '<span class="tui-ico-{{type}}">{{type}}</span>' +
//         '</span>',
//       moreButton:
//         '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
//         '<span class="tui-ico-ellip">...</span>' +
//         '</a>',
//     },
//   };
//   const pagination = new Pagination(container, options);

//     const pageButtons = container.querySelectorAll('.tui-page-btn');
//   pageButtons.forEach((button, index) => {
//     // console.log('button', button);
//     // console.log('index', index);
//     button.addEventListener('click', selectNewPage);
//   });
//   function selectNewPage(event) {
//     event.preventDefault();
//     const number = Number(event.currentTarget.textContent);
//     // console.log(number);
//     if (number) return nextPage(number);
//     console.log('not a number', number);
//   }
// }
// function nextPage(nextPage) {
//   return console.log(nextPage);
// }

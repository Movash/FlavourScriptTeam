import Pagination from 'tui-pagination';

const container = document.getElementById('pagination');

const options = {
  totalItems: 100, // Припустимо, що у вас є 100 елементів, які потрібно розподілити на сторінки
  itemsPerPage: 9,
  visiblePages: window.innerWidth < 768 ? 2 : 3,
  page: 1,
  centerAlign: true,
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

const pageButtons = container.querySelectorAll('.tui-page-btn');
pageButtons.forEach((button, index) => {
  button.addEventListener('click', (event) => {
    event.preventDefault(); 
      const clickedPage = index + 1;
      console.log(`Користувач клікнув на сторінку ${clickedPage}`);
      });
});

function someFn(pageNumber) {
  console.log(`Обраний номер сторінки: ${pageNumber}`);
}

export { pagination };
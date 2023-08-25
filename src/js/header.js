// console.log('3. Header');
import { openOrderModal } from './order-pop-up';
import { resetLocalStorageFilters } from './local-storage';

// ----------------------------------------------Мобільне меню
(() => {
  const refs = {
    openMenuBtn: document.querySelector('[data-menu-open]'),
    closeMenuBtn: document.querySelector('[data-menu-close]'),
    menu: document.querySelector('[data-menu]'),
  };

  refs.openMenuBtn.addEventListener('click', toggleMenu);
  refs.closeMenuBtn.addEventListener('click', toggleMenu);

  function toggleMenu() {
    refs.menu.classList.toggle('is-hidden');
    document.body.classList.toggle('no-scroll');
  }
})();

// ---------------------------------------Зміна теми сайта користувачем

let theme = null;
const switcherEl = document.querySelectorAll('.js-switch'); //Вибираємо всі світчери на сторінці.
const bodyEl = document.querySelector('body');

switcherEl.forEach(input => {
  // Перевіряємо положення світчера і присвоюємо змінній theme відповідне значення
  input.addEventListener('change', function () {
    if (input.checked === false) {
      theme = 'light';
      bodyEl.classList.remove('dark');
      localStorage.setItem('theme', theme);
    } else {
      theme = 'dark';
      changeTheme(theme);
      localStorage.setItem('theme', theme);
    }
  });
});
// Функція зміни теми
function changeTheme(themeName) {
  bodyEl.classList.add('dark');
}

// Перевіряємо, чи є в локалсторідж значення теми і записуємо в змінну theme
let activeTheme = localStorage.getItem('theme');
if (activeTheme === null || activeTheme === 'light') {
  switcherEl.forEach(input => {
    //приводимо положення світчера у відповідність до вибраної теми
    input.checked = false;
  });
} else if (activeTheme === 'dark') {
  changeTheme('dark');
  switcherEl.forEach(input => {
    //приводимо положення світчера у відповідність до вибраної теми
    input.checked = true;
  });
}

// ----------------------------------------------------Іконка корзина

const basketEl = document.querySelector('.header-basket');
basketEl.addEventListener('click', openOrderModal);

//-------------------------------------------- Зміна кольору посилань

const homeEl = document.querySelector('.header-link-home');
const favEl = document.querySelector('.header-link-fav');
const menuLinkHome = document.querySelector('.menu-link-home');
const seeFavorites = document.querySelector('.fav-section');
const menuLinkFav = document.querySelector('.menu-link-home');

if (!seeFavorites) {
  homeEl.classList.add('js-link');
  if (bodyEl.classList.contains('dark')) {
    menuLinkHome.classList.add('js-link');
  }
} else {
  favEl.classList.add('js-link');
  if (bodyEl.classList.contains('dark')) {
    menuLinkFav.classList.add('js-link');
  }
}

// --------------------------------Зброс локалсторідж по фільтрам
homeEl.addEventListener('click', resetLocalStorageFilters);

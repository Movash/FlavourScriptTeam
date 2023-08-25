// LOCAL STORAGE ДЛЯ СВІТЧЕРА
import { getRecipesByCategory } from './categories'
const themeCheckbox = document.querySelector('.switch>input');
const body = document.querySelector('body');
// const categoryBtn = document.querySelector('.category-btn');
themeCheckbox?.addEventListener('change', switchThemeColor);
reloadThemeAndFormData();

function switchThemeColor() {
    if (themeCheckbox.checked) {
        body.classList.add('dark')
        localStorage.setItem('theme', 'dark-theme');
    } else {
        document.documentElement.removeAttribute('theme');
        localStorage.removeItem('theme');
    }
}

function reloadTheme() {
    // Встановлення стану теми
    if (localStorage.getItem('theme') === 'dark-theme') {
        themeCheckbox.checked = true;
        body.classList.add('dark')
    } else {
        themeCheckbox.checked = false;
        document.documentElement.removeAttribute('theme');
    }
};

// LOCAL STORAGE ДЛЯ МОДАЛКИ ЗАМОВЛЕННЯ

const form = document.querySelector('.form-oder');
form?.addEventListener('input', saveInLocalStorage);
form?.addEventListener('submit', resetLocalStorage);


function saveInLocalStorage() {
    let dataForm = JSON.stringify({
        name: form.name.value,
        number: form.number.value,
        email: form.email.value
    });
    localStorage.setItem("key_form", dataForm);
};

function resetLocalStorage() {
    localStorage.removeItem("key_form")
};

function reloadForm() {
    let savedInfo = JSON.parse(localStorage.getItem("key_form"));
    if(savedInfo) {
        form.name.value = savedInfo.name;
        form.number.value = savedInfo.number;
        form.email.value = savedInfo.email;
    }
};
function reloadThemeAndFormData() {
    reloadTheme(); // Відновлення стану теми
    reloadForm(); // Відновлення даних форми
    reloadCategory(); // Відновлення обраної категорії
}

// LOCAL STORAGE ДЛЯ КАТЕГОРІЙ
// const localStorageKey = 'selected-category';
const categoriesList = document.querySelector('.categories-list-js');
// categoriesList.addEventListener('click', handleCategoryClick);

export function handleCategoryClick(categoryOption) {
    localStorage.setItem('selected-category', categoryOption);
}

function reloadCategory(selectedCategory) {
        const categoryOptions = document.querySelectorAll('.category-btn');
        categoryOptions.forEach(option => {
            if (option.textContent === selectedCategory) {
                option.classList.add('category-btn-active'); // Додати стиль для відображення вибраної категорії
                console.log(`Reloaded selected category: ${selectedCategory}`);
                getRecipesByCategory(selectedCategory);
            } else {
                option.classList.remove('category-btn-active'); // Видалити стиль для інших категорій
            }
        });
    }
// goToLocal();
export function removeCategoriesFromLS() {
    localStorage.removeItem('selected-category');
};

export function goToLocal() {
    const selectedCategory = localStorage.getItem('selected-category');
    console.log(selectedCategory);
    if(selectedCategory) {
        reloadCategory(selectedCategory)
    }
    return;
}

// LOCAL STORAGE ДЛЯ FAVORITES

const keyLocalStorageFavorites = 'keyOfFavoritesCards';

function loadFromLocalStorage() {
    const dataString = localStorage.getItem(keyLocalStorageFavorites);
    if (dataString) {
        return JSON.parse(dataString);
    } else {
        return [];
    }
};

let myArray = loadFromLocalStorage();

export function addToLocalFavoritesCards(newObject) {
    const existingIndex = myArray.findIndex(obj => obj._id === newObject._id);

    if (existingIndex !== -1) {
        myArray.splice(existingIndex, 1);
    } else {
        myArray.push(newObject);
    }

    localStorage.setItem(keyLocalStorageFavorites, JSON.stringify(myArray));
};

export function takeFavoritesCardsFromLS() {
    if(keyLocalStorageFavorites) {
        return JSON.parse(localStorage.getItem(keyLocalStorageFavorites));
    }
};

// LOCAL STORAGE ДЛЯ ФІЛЬТРІВ

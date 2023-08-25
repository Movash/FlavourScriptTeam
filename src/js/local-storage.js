import { openOrderModal } from "./order-pop-up"

// LOCAL STORAGE ДЛЯ СВІТЧЕРА
import { getRecipesByCategory } from './categories'
const themeCheckbox = document.querySelector('.switch>input');
const body = document.querySelector('body');
themeCheckbox?.addEventListener('change', switchThemeColor);

function switchThemeColor() {
    try {
        if (themeCheckbox.checked) {
            body.classList.add('dark')
            localStorage.setItem('theme', 'dark-theme');
        } else {
            document.documentElement.removeAttribute('theme');
            localStorage.removeItem('theme');
        }
    } catch(error) {
        console.log(error);
    };
};

function reloadTheme() {
    try {
        if (localStorage.getItem('theme') === 'dark-theme') {
            themeCheckbox.checked = true;
            body.classList.add('dark')
        } else {
            themeCheckbox.checked = false;
            document.documentElement.removeAttribute('theme');
        }
    } catch(error) {
        console.log(error);
    };
};


// LOCAL STORAGE ДЛЯ МОДАЛКИ ЗАМОВЛЕННЯ

export function saveInLocalStorageModal(form) {
    try {
        let dataForm = JSON.stringify({
            name: form.name.value,
            phone: form.phone,
            email: form.email
        });
        localStorage.setItem("key_form", dataForm);
    } catch (error) {
        console.log(error);
    };
};

export function returnObjectOfModal() {
    try {
        return JSON.parse(localStorage.getItem("key_form"));
    } catch(error) {
        console.log(error);
    };
};

export function resetLocalStorageModal() {
    try {
        localStorage.removeItem("key_form");
    } catch(error) {
        console.log(error);
    };
};

const form = document.querySelector(".form-oder");


function reloadForm() {
    try {
        let savedInfo = JSON.parse(localStorage.getItem("key_form"));
    if(savedInfo) {
        const {name, phone, email} = form.elements;
        openOrderModal();
        console.log(savedInfo);
        console.log(form.name);
        name.value = savedInfo.name;
        phone.value = savedInfo.phone;
        email.value = savedInfo.email;
    } 
        }
    catch(error) {
        console.log(error);
    };
};


// LOCAL STORAGE ДЛЯ КАТЕГОРІЙ
// const categoriesList = document.querySelector('.categories-list-js');

export function handleCategoryClick(categoryOption) {
    try {
        localStorage.setItem('selected-category', categoryOption);
    } catch(error) {
        console.log(error)
    }
}

function reloadCategory(selectedCategory) {
    try {
    const categoryOptions = document.querySelectorAll('.category-btn');
    categoryOptions.forEach(option => {
        if (option.textContent === selectedCategory) {
                option.classList.add('category-btn-active'); // Додати стиль для відображення вибраної категорії
                getRecipesByCategory(selectedCategory);
        } else {
                option.classList.remove('category-btn-active'); // Видалити стиль для інших категорій
        }
        });
    } catch(error) {
        console.log(error);
    };
    };

export function getCategoryFromLS() {
    try {
    return localStorage.getItem('selected-category');
    } catch(error) {
        console.log(error);
    };
};

export function removeCategoriesFromLS() {
    try {
    localStorage.removeItem('selected-category');
    } catch(error) {
        console.log(error);
    };
};

export function goToLocal() {
    try {
        const selectedCategory = localStorage.getItem('selected-category');
    if(selectedCategory) {
        reloadCategory(selectedCategory)
    }
    return;
    } catch(error) {
        console.log(error);
    };
};

// LOCAL STORAGE ДЛЯ FAVORITES

const keyLocalStorageFavorites = 'keyOfFavoritesCards';

function loadFromLocalStorageFavorites() {
    try {
        const dataString = localStorage.getItem(keyLocalStorageFavorites);
    if (dataString) {
        return JSON.parse(dataString);
    } else {
        return [];
    }
    } catch(error) {
        console.log(error);
    };
};

let myArray = loadFromLocalStorageFavorites();

export function addToLocalFavoritesCards(newObject) {
    try {
        const existingIndex = myArray.findIndex(obj => obj._id === newObject._id);

    if (existingIndex !== -1) {
        myArray.splice(existingIndex, 1);
    } else {
        myArray.push(newObject);
    }

    localStorage.setItem(keyLocalStorageFavorites, JSON.stringify(myArray));
    } catch(error) {
        console.log(error);
    };
};

export function takeFavoritesCardsFromLS() {
    try {
        if(keyLocalStorageFavorites) {
            return JSON.parse(localStorage.getItem(keyLocalStorageFavorites));
        }
    } catch(error) {
        console.log(error);
    };
};

export function removeFromLocalStorage(id) {
    try {
        let arr = JSON.parse(localStorage.getItem(keyLocalStorageFavorites));
    const updatedArr = arr.filter(item => item._id !== id);
    localStorage.setItem(keyLocalStorageFavorites, JSON.stringify(updatedArr));
    } catch(error) {
        console.log(error);
    };  
};


// LOCAL STORAGE ДЛЯ РЕЙТИНГУ

const keyLocalStorageRatings = 'keyOfRatings';

function takeRatingsFromLS() {
    try {
        const ratingsString = localStorage.getItem(keyLocalStorageRatings);
    if (ratingsString) {
        return JSON.parse(ratingsString);
    }
    return [];
    } catch(error) {
        console.log(error);
    };
};
let myRatingArray = takeRatingsFromLS();

export function addToLocalRating(newRatingObject) {
    try {
        const existingIndex = myRatingArray.findIndex(obj => obj._id === newRatingObject._id);

        if (existingIndex !== -1) {
            myRatingArray.splice(existingIndex, 1);
        } else {
            myRatingArray.push(newRatingObject);
        }
    
        localStorage.setItem(keyLocalStorageRatings, JSON.stringify(myRatingArray));
    } catch(error) {
        console.log(error);
    };
};

export function takeRatingFromLS() {
    try {
        if(keyLocalStorageRatings) {
            return JSON.parse(localStorage.getItem(keyLocalStorageRatings));
        }
    } catch(error) {
        console.log(error);
    };
};


// LOCAL STORAGE ДЛЯ ФІЛЬТРІВ

export function saveInLocalStorageFilters(filtersObj) {
    try {
        let dataFilters = JSON.stringify(filtersObj);
    localStorage.setItem("key_filters", dataFilters);
    } catch(error) {
        console.log(error);
    };
};

export function resetLocalStorageFilters() {
    try {
        localStorage.removeItem("key_filters")
    } catch(error) {
        console.log(error);
    };
};

export function getFiltersFromLS() {
    try {
        let savedInfo = JSON.parse(localStorage.getItem("key_filters"));
    if(savedInfo) {
        return savedInfo;
    }
    } catch(error) {
        console.log(error);
    };
};




// //////////////////////////////////////////
reloadThemeAndFormData();
function reloadThemeAndFormData() {
    reloadTheme(); // Відновлення стану теми
    reloadForm(); // Відновлення даних форми
    reloadCategory(); // Відновлення обраної категорії
    // reloadPageFilters(); // Відновлення обраних фільтрів
}

/////////////////////

export function isTrueIdFavorites(id) {
    try {
        const arr = JSON.parse(localStorage.getItem(keyLocalStorageFavorites));
    return arr.some(el => el._id === id);
    } catch(error) {
        console.log(error);
    };
};
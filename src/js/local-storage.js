  export default {
    switchThemeColor,
    saveInLocalStorage,
    resetLocalStorage,
    reloadPage
  };
  reloadPage();

//   LOCAL STORAGE ДЛЯ СВІТЧЕРА. НАЗВИ ЗМІННИХ ДЛЯ ПРИКЛАДУ
// створюємо елемент на кнопку світчера
// const btnSwitcher = document.querySelector(".switcher");
// ставимо прослуховувач подій і цю функцію
// btnSwitcher.addEventListener('click', switchThemeColor);
// створюємо стилі для темної теми під селектором ".dark-theme"

// const btnSwitcher = document.querySelector('.base-btn');
// btnSwitcher.addEventListener('click', switchThemeColor);

function switchThemeColor() {
    if (document.documentElement.hasAttribute('theme')){
        document.documentElement.removeAttribute('theme');
        localStorage.removeItem('theme');
        // console.log("remove local")
    }else {
        document.documentElement.setAttribute('theme', 'dakr-theme');
        localStorage.setItem('theme', 'dark-theme'); // зберігаємо
        // console.log("add local")
    }
}
// // коли користувач зайде на сторінку - зі сховища візьметься остання тема
// window.onload = function() {
//     if(localStorage.getItem('theme') === 'color-theme'){
//         document.documentElement.setAttribute('theme', 'color-theme');
//         // console.log("reload");
//     }
// }

// LOCAL STORAGE ДЛЯ МОДАЛКИ

// створюємо елемент на форму
// const formEl = document.querySelector(".form");
// ставимо прослуховувач подій і функцію saveInLocalStorage
// btnSwitcher.addEventListener('input', onFormInput);
// btnSwitcher.addEventListener('submit', onFormSubmit);
// у фунції сабміту форми додаємо виклик фунції resetLocalStorage()
// викликаємо фунцію reloadPage()

function saveInLocalStorage() {
    let dataForm = JSON.stringify({name: name.value, number: number.value, email: email.value});
    localStorage.setItem("key_form", dataForm);
};
function resetLocalStorage() {
    localStorage.removeItem("key_form")
}
function reloadPage() {
    let savedInfo = JSON.parse(localStorage.getItem("key_form"));
    if(savedInfo) {
        name.value = savedInfo.name;
        number.value = savedInfo.number;
        email.value = savedInfo.value;
    }
    if(localStorage.getItem('theme') === 'color-theme'){
        document.documentElement.setAttribute('theme', 'color-theme');
        // console.log("reload");
    }
};
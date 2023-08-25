import { Notify } from "notiflix";
import { throttle } from "lodash";

const localStorageKey = 'order-form-state';
const form = document.querySelector('.form-oder');

form.addEventListener('input', throttle(onInputData, 500));
form.addEventListener('submit', submitForm);

let dataForm = JSON.parse(localStorage.getItem(localStorageKey)) || {};
const {name, phone, email, comment} = form.elements;
reloadPage();

function onInputData() {
    dataForm = {
        name: name.value, 
        phone: phone.value, 
        email: email.value, 
        comment: comment.value 
    };
    localStorage.setItem(localStorageKey, JSON.stringify(dataForm));
  }
  
  function reloadPage() {
    if (dataForm) {
        name.value = dataForm.name || '';
        phone.value = dataForm.phone || '';
        email.value = dataForm.email || '';
        comment.value = dataForm.comment || '';
    }
  }
  
  function submitForm(e) {
    e.preventDefault();
    
    if(name.value === '' || phone.value === '' || email.value === '')
    return Notify.info('Please, fill name, phone and email!');

    // відсилання на бек

    localStorage.removeItem(localStorageKey);
    e.currentTarget.reset();
    dataForm = {};
  }

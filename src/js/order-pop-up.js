import { Notify } from "notiflix";

const form = document.querySelector('.form-oder');

const openBtn = document.querySelector('.btn-open-order');
const closeBtn = document.querySelector('.order-btn-close');

const backdrop = document.querySelector('.backdrop')

form?.addEventListener('submit', submitForm);
form?.addEventListener('input', () => {dataForm = {
  name: name.value, 
  phone: phone.value, 
  email: email.value, 
  comment: comment.value 
};});

openBtn?.addEventListener('click', () => {backdrop.classList.remove('is-hidden')});
closeBtn?.addEventListener('click', () => {backdrop.classList.add('is-hidden')});

const {name, phone, email, comment} = form.elements;

  
  function submitForm(e) {
    e.preventDefault();
    
    if(name.value === '' || phone.value === '' || email.value === '')
    return Notify.info('Please, fill name, phone and email!');

    // відсилання на бек
    getBack();

    e.currentTarget.reset();
    // dataForm = {};
  }

function getBack() {
    console.log(dataForm);
}
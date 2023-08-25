import { Notify } from "notiflix";
import {saveInLocalStorageModal, resetLocalStorageModal, returnObjectOfModal} from './local-storage';
import { createModal } from './open-any-modal';
import { FetchInfo } from "./fetch-requests";

const fetch = new FetchInfo();

export function openOrderModal(){
  createModal(orderModalMarkup());

  addBorder();

  const form = document.querySelector('.form-oder');
  const SendBtnOrder = document.querySelector('.order-submit');
  const {name, phone, email, comment} = form.elements;

  form?.addEventListener('input', () => {
    const objForLocal = {
      name: name.value,
      phone: phone.value,
      email: email.value,
      comment: comment.value,
    }
    saveInLocalStorageModal(objForLocal)});
    form?.addEventListener('submit', submitForm);

  function submitForm(e) {
    e.preventDefault();
  
    if(name.value === '' || phone.value === '' || email.value === '' || comment.value === '')
    return Notify.info('Please, fill all fields!');
  
    const dataForm = returnObjectOfModal();

    fetch.postOrderApi(dataForm.name, dataForm.phone, dataForm.email, dataForm.comment)
    .then(() => {
      SendBtnOrder.classList.add('close');
      Notify.success('Thanks for your order!');
      e.currentTarget.reset();
      resetLocalStorageModal();
    })
    .catch((error) => {return Notify.warning(`${error.response.data.message}`)});

  }
}


function orderModalMarkup(){
  return `<div class="modal-order">
  <button class="order-btn-close close-button" type="button">x</button>
  <p class="order-title">Order now</p>
  <form class="form-oder">
    <label class="order-form-label">
      <span class="order-form-span">Name</span>
      <input
        class="order-form-input"
        type="text"
        name="name"
        pattern="[A-z]{1,15}"
        placeholder="Your name"
      />
    </label>
    <label class="order-form-label">
      <span class="order-form-span">Phone number</span>
      <input
        class="order-form-input"
        type="text"
        name="phone"
        placeholder="Your phone: +380681112233"
      />
    </label>
    <label class="order-form-label">
      <span class="order-form-span">Email</span>
      <input class="order-form-input" type="email" name="email" placeholder="Your email: dog@gmail.com"/>
    </label>
    <label class="order-form-label">
      <span class="order-form-span">Comment</span>
      <textarea class="order-form-textarea" name="comment" placeholder="Your comment"></textarea>
    </label>
    <button class="order-submit base-btn" type="submit">Send</button>
  </form>
</div>`
}

function addBorder(){
  const modalOrder = document.querySelector('.modal-order');

  let activeTheme = localStorage.getItem('theme');
  if (activeTheme === 'dark'){
    modalOrder.style.border = '4px solid var( --light-theme-almost-transparent-color)';
    modalOrder.style.borderRadius = '10px';
  }
}




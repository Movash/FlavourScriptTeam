import { Notify } from "notiflix";
import {saveInLocalStorageModal, resetLocalStorageModal, returnObjectOfModal} from './local-storage';
import { createModal } from './open-any-modal';

const openBtn = document.querySelector('.btn-open-order');
openBtn?.addEventListener('click', openOrderModal);

const form = document.querySelector('.form-oder');

export function openOrderModal(){
  createModal(orderModalMarkup());

  const form = document.querySelector('.form-oder');
  const {name, phone, email} = form.elements;

  form?.addEventListener('input', () => {
    const objForLocal = {
      name: name.value,
      phone: phone.value,
      email: email.value,
      comment: comment.value,
    }
    saveInLocalStorageModal(objForLocal)});
  form?.addEventListener('submit', submitForm);

  console.log(form);

  function submitForm(e) {
    e.preventDefault();

    if(name.value === '' || phone.value === '' || email.value === '')
    return Notify.info('Please, fill name, phone and email!');
  
    postBack();
  
    e.currentTarget.reset();
    resetLocalStorageModal();
  }
  
  // postBack();
 
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
        pattern="[0-9]{10}"
        placeholder="Your phone: 0681112233"
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



function postBack() {
  const dataForm = returnObjectOfModal();
  console.log(dataForm);
}
// // form?.addEventListener('submit', resetLocalStorageModal);
// // form?.addEventListener('input', saveInLocalStorageModal);


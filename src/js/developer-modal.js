import { createModal } from './open-any-modal.js';
import manImage from '../images/images-developer/man-image.webp';
import womanImage from '../images/images-developer/woman-image.webp';

const developerOpenBtn = document.querySelector('.dev-btn');

developerOpenBtn?.addEventListener('click', openTeamModal);

function openTeamModal() {
  createModal(getModalContent());
}

function getModalContent() {
  return `<div class="developer-list">
  <div class="developer-list-item">
      <img class="footer-modal-image" src="${manImage}">
      <span class="developer-name">Vladyslav Holodniuk</span><br>
      <span class="developer-role">Team Lead</span>
  </div>
  <div class="developer-list-item">
      <img class="footer-modal-image" src="${womanImage}">
      <span class="developer-name">Olena Kondrachuk</span><br>
      <span class="developer-role">Scrum Master</span>
  </div>
  <div class="developer-list-item">
      <img class="footer-modal-image" src="${manImage}">
      <span class="developer-name">Oleksandr Andrushchenko</span>
      <span class="developer-role">Developer</span>
  </div>
  <div class="developer-list-item">
      <img class="footer-modal-image" src="${womanImage}">
      <span class="developer-name">Kateryna Kalmykova</span>
      <span class="developer-role">Developer</span>
  </div>
  <div class="developer-list-item">
      <img class="footer-modal-image" src="${womanImage}">
      <span class="developer-name">Karyna Pavliuk</span>
      <span class="developer-role">Developer</span>
  </div>
  <div class="developer-list-item">
      <img class="footer-modal-image" src="${manImage}">
      <span class="developer-name">Andrii Kozyr</span>
      <span class="developer-role">Developer</span>
  </div>
  <div class="developer-list-item">
      <img class="footer-modal-image" src="${manImage}">
      <span class="developer-name">Viacheslav Sosiedko</span>
      <span class="developer-role">Developer</span>
  </div>
  <div class="developer-list-item">
      <img class="footer-modal-image" src="${manImage}">
      <span class="developer-name">Andrii Kharchenko</span>
      <span class="developer-role">Developer</span>
  </div>
  <div class="developer-list-item">
      <img class="footer-modal-image" src="${womanImage}">
      <span class="developer-name">Anna Turchenko</span>
      <span class="developer-role">Developer</span>
  </div>
  <div class="developer-list-item">
      <img class="footer-modal-image" src="${manImage}">
      <span class="developer-name">Roman Protsenko</span>
      <span class="developer-role">Developer</span>
  </div>
</div>
<button class="close-button">&#10006;</button>
</div>`;
}


import { createModal } from './open-any-modal.js';

const developerOpenBtn = document.querySelector('.team-section');

developerOpenBtn?.addEventListener('click', openTeamModal);

function openTeamModal() {
  createModal(getModalContent());
}

function getModalContent() {
  return `<div class="developer-list">
  <div class="developer-list-item">
      <img class="footer-modal-image" src="/images/images-developer/man-image.webp">
      <span class="developer-name">Vladyslav Holodniuk</span><br>
      <span class="developer-role">Team Lead</span>
  </div>
  <div class="developer-list-item">
      <img class="footer-modal-image" src="/images/images-developer/woman-image.webp">
      <span class="developer-name">Olena Kondrachuk</span><br>
      <span class="developer-role">Scrum Master</span>
  </div>
  <div class="developer-list-item">
      <img class="footer-modal-image" src="/images/images-developer/man-image.webp">
      <span class="developer-name">Oleksandr Andrushchenko</span>
      <span class="developer-role">Developer</span>
  </div>
  <div class="developer-list-item">
      <img class="footer-modal-image" src="/images/images-developer/woman-image.webp">
      <span class="developer-name">Kateryna Kalmykova</span>
      <span class="developer-role">Developer</span>
  </div>
  <div class="developer-list-item">
      <img class="footer-modal-image" src="/images/images-developer/woman-image.webp">
      <span class="developer-name">Karyna Pavliuk</span>
      <span class="developer-role">Developer</span>
  </div>
  <div class="developer-list-item">
      <img class="footer-modal-image" src="/images/images-developer/man-image.webp">
      <span class="developer-name">Andrii Kozyr</span>
      <span class="developer-role">Developer</span>
  </div>
  <div class="developer-list-item">
      <img class="footer-modal-image" src="/images/images-developer/man-image.webp">
      <span class="developer-name">Viacheslav Sosiedko</span>
      <span class="developer-role">Developer</span>
  </div>
  <div class="developer-list-item">
      <img class="footer-modal-image" src="/images/images-developer/man-image.webp">
      <span class="developer-name">Andrii Kharchenko</span>
      <span class="developer-role">Developer</span>
  </div>
  <div class="developer-list-item">
      <img class="footer-modal-image" src="/images/images-developer/woman-image.webp">
      <span class="developer-name">Anna Turchenko</span>
      <span class="developer-role">Developer</span>
  </div>
  <div class="developer-list-item">
      <img class="footer-modal-image" src="/images/images-developer/man-image.webp">
      <span class="developer-name">Roman Protsenko</span>
      <span class="developer-role">Developer</span>
  </div>
</div>
<button class="close-button" onclick="closeTeamModal()">&#10006;</button>
</div>`;
}


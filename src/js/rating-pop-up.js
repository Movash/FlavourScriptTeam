import { createModal } from './open-any-modal';

const ratingOpenBtn = document.querySelector('.open-rating-btn');
// const ratingPopUpEl = document.querySelector('.container-rating');
ratingOpenBtn?.addEventListener('click', openRatingModal);

// function toggleRatingPopUp() {
//   ratingPopUpEl.classList.toggle('is-hidden');
// }

function openRatingModal() {
  createModal(ratingMarkUp());
  showRating();
}

function ratingMarkUp() {
  return `<div class="container-rating rad-img">
  <button class="rating-btn-close close-button">&#10006;</button>
  <div>
    <div class="rating-pop-up">
      <p class="rating-text">Rating</p>
      <div class="rating stars-pop-up">
        <div class="rating-value number-text">3.5</div>
        <div class="rating-body">
          <div class="rating-active"></div>
          <div class="rating-items">
            <input
              type="radio"
              class="rating-item"
              name="recipe-rating"
              value="1"
            />
            <input
              type="radio"
              class="rating-item"
              name="recipe-rating"
              value="2"
            />
            <input
              type="radio"
              class="rating-item"
              name="recipe-rating"
              value="3"
            />
            <input
              type="radio"
              class="rating-item"
              name="recipe-rating"
              value="4"
            />
            <input
              type="radio"
              class="rating-item"
              name="recipe-rating"
              value="5"
            />
          </div>
        </div>
      </div>
      <input
        class="rating-input rad-img"
        type="email"
        name="email"
        value=""
        placeholder="Enter email"
      />
      <button class="base-btn btn-rating" type="button">Send</button>
    </div>
  </div>
</div>`;
}

function showRating() {
  const ratings = document.querySelectorAll('.rating');
  if (ratings.length > 0) {
    initRatings();
  }

  function initRatings() {
    let ratingActive, ratingVale;
    for (let index = 0; index < ratings.length; index += 1) {
      const rating = ratings[index];
      initRatings(rating);
    }

    function initRatings(rating) {
      initRatingVars(rating);
      setRatingActiveWidth();
    }

    function initRatingVars(rating) {
      ratingActive = rating.querySelector('.rating-active');
      ratingVale = rating.querySelector('.rating-value');
    }

    function setRatingActiveWidth(index = ratingVale.innerHTML) {
      const ratingActiveWidth = index / 0.05;
      ratingActive.style.width = `${ratingActiveWidth}%`;
    }
  }
}

export { showRating };

import { createModal } from './open-any-modal';
import { FetchInfo } from './fetch-requests';
import { Notify } from 'notiflix';

const ratingOpenBtn = document.querySelector('.open-rating-btn');

// ratingOpenBtn?.addEventListener('click', openRatingModal);

const fetchUse = new FetchInfo();

function openRatingModal(id, name, rating) {
  createModal(ratingMarkUp(id, name, rating));
  showRating();
}

function ratingMarkUp(id, name, rating) {
  return `<div class="container-rating rad-img">
  <button class="rating-btn-close close-button">&#10006;</button>
  <div>
    <div class="rating-pop-up">
      <p class="rating-text">Rating</p>
      <div class="rating stars-pop-up">
        <div class="rating-value number-text" id="${id}" name="${name}">${rating}</div>
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
    const ratingEmailEl = document.querySelector('.rating-input');
    const ratingSendRateBtnEl = document.querySelector('.btn-rating');

    ratingSendRateBtnEl?.addEventListener('click', sendRating);

    let ratingActive, ratingValue;
    for (let index = 0; index < ratings.length; index += 1) {
      const rating = ratings[index];
      initRatings(rating);
    }

    function initRatings(rating) {
      initRatingVars(rating);
      setRatingActiveWidth();
      if (rating.classList.contains('stars-pop-up')) {
        setRating(rating);
      }
    }

    function initRatingVars(rating) {
      ratingActive = rating.querySelector('.rating-active');
      ratingValue = rating.querySelector('.rating-value');
    }

    function setRatingActiveWidth(index = ratingValue.innerHTML) {
      const ratingActiveWidth = index / 0.05;
      ratingActive.style.width = `${ratingActiveWidth}%`;
    }

    let isChecked = false;

    function setRating(rating) {
      const ratingItems = rating.querySelectorAll('.rating-item');
      for (let index = 0; index < ratingItems.length; index += 1) {
        const ratingItem = ratingItems[index];

        ratingItem.addEventListener('mouseenter', function (e) {
          initRatingVars(rating);
          setRatingActiveWidth(ratingItem.value);
        });

        ratingItem.addEventListener('mouseleave', function (e) {
          setRatingActiveWidth();
        });

        ratingItem.addEventListener('click', function (e) {
          initRatingVars(rating);
          ratingValue.innerHTML = index + 1;
          setRatingActiveWidth();
          informCheck(ratingItem.checked);
        });
      }
    }

    function sendRating(evt) {
      const objToSendLocal = {
        rate: Number(ratingValue.innerHTML),
        email: ratingEmailEl.value,
        _id: ratingValue.id,
        dishName: ratingValue.name,
      };
      const objToSendBack = {
        rate: Number(ratingValue.innerHTML),
        email: ratingEmailEl.value,
      };

      if (!isChecked) {
        return Notify.warning('Choose rating to set');
      }
      console.log('змінити ID заглушку');
      console.log('info in local storage (148)', objToSendLocal);
      fetchUse
        .patchRatingRecipe(ratingValue.id, objToSendBack)
        .then(res => {
          ratingSendRateBtnEl.classList.add('close');
          Notify.success('Thank you for your feedback');
          console.log(res.statusText);
        })
        .catch(err => {
          Notify.warning(err.response.data.message);
          console.log(err.response.data.message);
        });
    }

    function informCheck(doChecked) {
      if (doChecked) isChecked = true;
    }
  }
}

export { showRating, openRatingModal };

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

// До кнопки закриття потрібно додати клас "close-button"
function createModal(content) {
  const bodyEl = document.querySelector('body');
  const recipeModalEl = document.querySelector('.modal-recipe');
  bodyEl.classList.add('no-scroll');

  const instance = basicLightbox.create(
    `
    <div class="modal no-scroll">
      ${content}
    </div>
    `,
    {
      onShow: instance => {
        instance.element().addEventListener('click', adListenerToCloseBtn);
        document.addEventListener('keydown', escListener);
        const btnToCloseAuto = instance.element().querySelector('.btn-rating');
        const btnSubmitFormEl = instance
          .element()
          .querySelector('.order-submit');
        if (btnToCloseAuto) mutationObserver(btnToCloseAuto, instance);
        if (btnSubmitFormEl) mutationObserver(btnSubmitFormEl, instance);
      },
    }
  );

  function mutationObserver(mutations, instance) {
    const config = { attributes: true };

    function fnCallback(mutations, observer) {
      for (const mutation of mutations) {
        if (mutation.target.classList.contains('close')) {
          closeAuto(instance, observer);
          return;
        }
      }
    }

    const observer = new MutationObserver(fnCallback);
    observer.observe(mutations, config);
  }

  function adListenerToCloseBtn(e) {
    if (
      e.target === instance.element() ||
      e.target.classList.contains('close-button')
    ) {
      instance.close();
      if (!recipeModalEl) bodyEl.classList.remove('no-scroll');
    }
  }

  function escListener(e) {
    if (e.key === 'Escape') {
      removeListeners(instance, escListener);
      instance.close();
      if (!recipeModalEl) bodyEl.classList.remove('no-scroll');
    }
  }

  function removeListeners(instance) {
    const element = instance.element();
    if (element) {
      element.removeEventListener('click', adListenerToCloseBtn);
    }
    document.removeEventListener('keydown', escListener);
  }

  function closeAuto(instance, observer) {
    const element = instance.element();
    element.removeEventListener('click', adListenerToCloseBtn);
    document.removeEventListener('keydown', escListener);
    observer.disconnect();
    instance.close();
    if (!recipeModalEl) bodyEl.classList.remove('no-scroll');
  }

  instance.show();
}

export { createModal };

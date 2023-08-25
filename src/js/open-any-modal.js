import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

// До кнопки закриття потрібно додати клас "close-button"
function createModal(content) {
  const instance = basicLightbox.create(
    `
    <div class="modal">
      ${content}
    </div>
    `,
    {
      onShow: instance => {
        instance.element().addEventListener('click', adListenerToCloseBtn);
        document.addEventListener('keydown', escListener);
      },
    }
  );

  function adListenerToCloseBtn(e) {
    if (
      e.target === instance.element() ||
      e.target.classList.contains('close-button')
    ) {
      instance.close();
    }
  }

  function escListener(e) {
    if (e.key === 'Escape') {
      removeListeners(instance, escListener);
      instance.close();
    }
  }

  function removeListeners(instance, escListener) {
    const element = instance.element();
    if (element) {
      element.removeEventListener('click', adListenerToCloseBtn);
    }
    document.removeEventListener('keydown', escListener);
  }

  instance.show();
}

export { createModal };

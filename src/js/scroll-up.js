const btnUp = {
  el: document.querySelector('.btn-up'),
  scrolling: false,
  show() {
    if (this.el.classList.contains('btn-up_hide') && !this.el.classList.contains('btn-up_hiding')) {
      this.el.classList.remove('btn-up_hide');
      this.el.classList.add('btn-up_hiding');
      window.setTimeout(() => {
        this.el.classList.remove('btn-up_hiding');
      }, 300);
    }
  },
  hide() {
    if (!this.el.classList.contains('btn-up_hide') && !this.el.classList.contains('btn-up_hiding')) {
      this.el.classList.add('btn-up_hiding');
      window.setTimeout(() => {
        this.el.classList.add('btn-up_hide');
        this.el.classList.remove('btn-up_hiding');
      }, 300);
    }
  },
  addEventListener() {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      let scrollThreshold = 400;

      if (window.matchMedia('(min-width: 375px)').matches) {
        scrollThreshold = 1000;
      }
      
      else if (window.matchMedia('(min-width: 768px)').matches) {
        scrollThreshold = 500;
      }

      if (this.scrolling && scrollY > 0) {
        return;
      }
      this.scrolling = false;
      if (scrollY > scrollThreshold) {
        this.show();
      } else {
        this.hide();
      }
    });

    document.querySelector('.btn-up').onclick = () => {
      this.scrolling = true;
      this.hide();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
}

btnUp.addEventListener();

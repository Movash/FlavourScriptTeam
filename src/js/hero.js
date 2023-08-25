// console.log('4. Hero');

// import { FetchInfo, FetchInfoByFilter } from './fetch-requests';

// // const heroTest = new FetchInfo();

// // heroTest.fetchAllAreas().then(response => console.log(response.data[0]));

// const filter = new FetchInfoByFilter(gdgfdg);

// filter.fetchFilteredItems().then(response => console.log(response));

import Swiper, {  Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
// export function openOrderModal()
import { openOrderModal } from "./order-pop-up"; 

import axios from 'axios';
const paginationPosition = document.querySelector('.swiper-pagination');
const swiperSlide = document.querySelector('.swiper-slide');
const heroBtn = document.querySelector('.hero-btn');

const swiperWrapper = document.querySelector('.swiper-wrapper');

const fetchListItems = async () => {
  const events = await axios.get(`https://tasty-treats-backend.p.goit.global/api/events`);
  return events.data;
};

heroBtn.addEventListener("click", openOrderModal);


fetchListItems()
  .then(response => {
    console.log(response);
    swiperRendering(response);
    const swiper = new Swiper('.swiper', {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 10,
    
      // setWrapperSize: true,
   
      modules: [Pagination, Navigation],
      pagination: {
        clickable: true,
        bulletClass: `swiper-pagination-bullet`,
        el: '.swiper-pagination',
      },
      
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      keyboard: {
        enabled: true,
        onlyInViewport: false,
      }
    });
    
  
    
    return swiper;
    
  })
  .catch(err => {
    console.log(err);
    // errorSwiperRendering();
    

  })

const picErr = "../images/error-img.webp";


function swiperRendering(elements) {
  const markup = elements.map((element) => {
            return ` 
    <div class="swiper-slide">
      <div class="hero-slide-wrap">
        <div class="first-pic">
          <img class="cook" src="${element.cook.imgWebpUrl}" alt="Photo of the cook who prepared the dish" />
        </div>
        <div class="second-pic">
          <img  class="pic" src="${element.topic.previewWebpUrl}" alt = "The name of the finished dish and the country of origin" />
          <p class="dish-description">${element.topic.name}</p>
          <p class="dish-area">${element.topic.area}</p>
        </div>
        <div class="third-pic">
          <img class="zoom-dish zoom-one zoom-two zoom-three" src="${element.topic.imgWebpUrl}" alt = "zoom image of the finished dish" />
        </div>
      </div>
    </div>
    `;
  })
  .join("");
  swiperWrapper.insertAdjacentHTML("beforeend", markup);
};
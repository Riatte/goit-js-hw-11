import './css/styles.css';
import { fetchGallery } from './js/fetchGallery';
import Notiflix from 'notiflix';

const form = document.querySelector('.search-form');
const galleryList = document.querySelector('.gallery');
const btnMore = document.querySelector('.load-more')

btnMore.style.display = 'none';
let page = 0;

form.addEventListener('submit', createGalerry);
btnMore.addEventListener('click', loadMore);


async function createGalerry(evt) {
    evt.preventDefault();

    let inputValue = form.elements.searchQuery.value.trim();
    page = 1;
    cleanGallery();
    btnMore.style.display = 'none';

    if (!inputValue) {
        Notiflix.Notify.warning('Please enter a search term');
        cleanGallery();
        return;
    }

    try {
        const pages = await fetchGallery(inputValue, page)
        let totalHits = pages.data.totalHits;
        btnMore.style.display = 'block';
        renderImage(pages.data.hits)
        
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
    }
    catch (err) {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }

};

function renderImage(images) {
    const markup = images
        .map(({ webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads }) => {
            return `<div class="photo-card">
      <a href="${largeImageURL}">
      <img class="photo" src="${webformatURL}" 
      alt="${tags}" loading="lazy"/>
      <div class="info">
      <p class="info-item">
      <b>Likes</b>
      <span class="info-item"> ${likes}</span>
      </p>
       <p class="info-item">
       <b>Views</b> <span class="info-item">${views}</span>  
       </p>
       <p class="info-item">
           <b>Comments</b>
           <span class="info-item">${comments}</span>  
       </p>
       <p class="info-item">
           <b>Downloads</b>
           <span class="info-item">${downloads}</span> 
       </p>
    </div>
      </a>
    
    </div>`;
    
})
    .join("");  
    return galleryList.insertAdjacentHTML('beforeend', markup);
}


async function loadMore() {
    page++;
    const inputValue = form.elements.searchQuery.value.trim();
    try {
        const pages = await fetchGallery(inputValue, page);
        const pageLast = pages.data.totalHits;
        if (page > pageLast) { 
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
            form.reset();
            btnMore.style.display = 'none';
        }
        renderImage(pages.data.hits)
        btnMore.style.display = 'block';
    }
    catch (error) {
  Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
}};





//////////////////
function cleanGallery() { 
    galleryList.innerHTML = '';
};
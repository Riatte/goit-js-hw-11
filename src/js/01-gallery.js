// Add imports above this line
// Описаний в документації
import { galleryItems } from './gallery-items';

import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";


// Change code below this line
const galleryList = document.querySelector(".gallery");

galleryList.insertAdjacentHTML("beforeend", createGallery(galleryItems));


function createGallery(items){
    return items.map(({ preview, original, description }) => {
        return `<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>`
    }).join('');
};


new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: "alt",
    captionDelay: 250,
});



console.log(galleryItems);

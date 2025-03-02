import { galleryItems } from './gallery-items.js';

// це gallery DOM element
const galleryContainer = document.querySelector(".gallery");

// створення (відтворення) картки 
function createElementMarkup(markup) {
   return markup.map(({ description, preview, original }) => {
    
    return `
    <li class="gallery__item">
    <a class="gallery__link" href="${original}">
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
        />
    </a>
</li>
`;
}).join("")}

galleryContainer.insertAdjacentHTML("beforeend",
    createElementMarkup(galleryItems));

 new SimpleLightbox('.gallery a',
    {
    captionDelay: 250,
    captionsData: "alt",
    }
);
 
console.log(galleryItems);

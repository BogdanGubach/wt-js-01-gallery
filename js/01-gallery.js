import { galleryItems } from './gallery-items.js';

const refs = {
  galleryListEl: document.querySelector('ul.gallery'),
  modalContainerEl: document.querySelector('div.lightbox'),
  lightboxOverlayEl: document.querySelector('div.lightbox__overlay'),
  modalImgEl: document.querySelector('img.lightbox__image'),
  modalCloseBtnEl: document.querySelector('[data-action="close-lightbox"]'),
};

// Додаємо розмітку в галерею
const galleryMarkup = createGalleryMarkup(galleryItems);
refs.galleryListEl.insertAdjacentHTML('beforeend', galleryMarkup);

// Додаємо обробники подій
refs.galleryListEl.addEventListener('click', onGalleryItemClick);
refs.modalCloseBtnEl.addEventListener('click', closeModal);
refs.lightboxOverlayEl.addEventListener('click', closeModal);

function createGalleryMarkup(galleryItems) {
    return galleryItems
        .map(({ preview, original, description }) => {
            return `<li class="gallery__item">
                    <a class="gallery__link" href="${original}">
                        <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"/>
                    </a>
                </li>`;
        })
        .join('');
}

function onGalleryItemClick(event) {
    event.preventDefault();

    if (!event.target.classList.contains('gallery__image')) {
        return;
    }

    refs.modalContainerEl.classList.add('is-open');
    refs.modalImgEl.src = event.target.dataset.source;
    refs.modalImgEl.alt = event.target.getAttribute('alt');

    document.addEventListener('keydown', onEscPress);
    document.addEventListener('keydown', onArrowPress);
}

function closeModal() {
    refs.modalContainerEl.classList.remove('is-open');
    refs.modalImgEl.src = '';
    refs.modalImgEl.alt = '';

    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('keydown', onArrowPress);
}

function onEscPress(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
}

function turnRight(currentIndex) {
    const nextIndex = (currentIndex + 1) % galleryItems.length;
    refs.modalImgEl.setAttribute('src', galleryItems[nextIndex].original);
}

function turnLeft(currentIndex) {
    const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    refs.modalImgEl.setAttribute('src', galleryItems[prevIndex].original);
}

function onArrowPress(event) {
    if (!refs.modalContainerEl.classList.contains('is-open')) {
        return;
    }

    const currentImg = refs.modalImgEl.getAttribute('src');
    const currentIndex = galleryItems.findIndex(item => item.original === currentImg);

    if (event.code === 'ArrowRight') turnRight(currentIndex);
    if (event.code === 'ArrowLeft') turnLeft(currentIndex);
}

console.log(galleryItems);

import { renderFullSizePhoto } from './full-size-photo.js';

const userPhotosContainer = document.querySelector('.pictures');
const userPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const userPhotosFragment = document.createDocumentFragment();

const renderPhoto = (photo) => {
  const photoElement = userPhotoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__img').alt = photo.description;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

  photoElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    renderFullSizePhoto(photo);
  });

  return photoElement;
};

const renderPhotos = (photos) => {
  photos?.forEach((photo) => {
    userPhotosFragment.appendChild(renderPhoto(photo));
  });

  userPhotosContainer.querySelectorAll('.picture').forEach((photo) => photo.remove());
  userPhotosContainer.appendChild(userPhotosFragment);
};

export { renderPhotos };

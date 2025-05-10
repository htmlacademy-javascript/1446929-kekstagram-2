import {addPhotos} from './data.js';

const userPhotosContainer = document.querySelector('.pictures');
const userPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const userPhotos = addPhotos();

const userPhotosFragment = document.createDocumentFragment();

userPhotos.forEach((photo) => {
  const photoElement = userPhotoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__img').alt = photo.description;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

  userPhotosFragment.appendChild(photoElement);
});

userPhotosContainer.appendChild(userPhotosFragment);

import { renderPhotos } from './photos.js';
import { getData } from './api.js';
import { initPhotoUploadForm } from './upload-photo.js';
import { initFilters } from './photos-filters.js';
import { showErrorMessage } from './util.js';

initPhotoUploadForm();

const displayPhotos = (data) => {
  renderPhotos(data);
  initFilters(data);
};

getData()
  .then((photos) => {
    displayPhotos(photos.slice());
  })
  .catch((showErrorMessage));


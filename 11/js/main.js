import { renderPhotos } from './photos.js';
import { getData } from './api.js';
import { initPhotoUploadForm, setUserFormSubmit, showSuccess, showError } from './upload-photo.js';

getData((photos) => {
  renderPhotos(photos);
});

setUserFormSubmit(showSuccess, showError);

initPhotoUploadForm();


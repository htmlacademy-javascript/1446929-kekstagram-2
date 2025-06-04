import { addPhotos } from './data.js';
import { renderPhotos } from './photos.js';
import { initPhotoUploadForm } from './upload-photo.js';

renderPhotos(addPhotos());

initPhotoUploadForm();

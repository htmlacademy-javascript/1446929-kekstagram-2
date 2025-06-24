import { toggleClass, isEscapeKey, showWrongFileMessage } from './util.js';
import { updateScale, resetScale, updateEffect, resetSlider } from './update-photo-mode.js';
import { sendData } from './api.js';

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_MAX_COUNT = 5;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DESCRIPTION_MAX_LENGTH = 140;

const HashtagLength = {
  MIN: 2,
  MAX: 20
};

const photoUploadForm = document.querySelector('.img-upload__form');
const photoUploadInput = photoUploadForm.querySelector('.img-upload__input');
const photoUploadOverlay = photoUploadForm.querySelector('.img-upload__overlay');
const preview = document.querySelector('.img-upload__preview img');
const hashtagInput = photoUploadForm.querySelector('.text__hashtags');
const photoDescriptionField = photoUploadForm.querySelector('.text__description');
const cancelPhotoUploadButton = photoUploadForm.querySelector('#upload-cancel');
const photoSubmitButton = photoUploadForm.querySelector('#upload-submit');
const effectPreviewImages = document.querySelectorAll('.effects__preview');

const successTemplate = document.querySelector('#success').content;
const successElement = successTemplate.cloneNode(true);
const successSubmitMessage = successElement.querySelector('.success');
const successUploadButton = successElement.querySelector('.success__button');

const errorTemplate = document.querySelector('#error').content;
const errorElement = errorTemplate.cloneNode(true);
const errorSubmitMessage = errorElement.querySelector('.error');
const errorUploadButton = errorElement.querySelector('.error__button');

let errorMessage = '';

const getHashtagErrorMessage = () => errorMessage;

const getDescriptionErrorMessage = () => `Длина комментария не может составлять больше ${DESCRIPTION_MAX_LENGTH} символов`;

const pristine = new Pristine(photoUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const validatePhotoDescription = (description) => description.length < DESCRIPTION_MAX_LENGTH;

const validateHashtags = (value) => {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if (!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  const rules = [
    {
      check: inputArray.some((item) => item.indexOf('#', 1) >= 1),
      error: 'Хэштеги разделяются пробелами'
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэштег должен начинаться с символа #'
    },
    {
      check: inputArray.some((item, index, arrayItems) => arrayItems.includes(item, index + 1)),
      error: 'Хэштеги не должны повторяться'
    },
    {
      check: inputArray.some((item) => item.length > HashtagLength.MAX),
      error: `Максимальная длина одного хэштега ${HashtagLength.MAX} символов, включая решётку`
    },
    {
      check: inputArray.some((item) => item.length < HashtagLength.MIN),
      error: 'Хештег не может состоять только из одной решётки'
    },
    {
      check: inputArray.length > HASHTAG_MAX_COUNT,
      error: `Нельзя указать больше ${HASHTAG_MAX_COUNT} хэштегов`
    },
    {
      check: inputArray.some((item) => !HASHTAG_REGEX.test(item)),
      error: 'Хештег содержит недопустимые символы'
    }
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });

};

pristine.addValidator(photoDescriptionField, validatePhotoDescription, getDescriptionErrorMessage);
pristine.addValidator(hashtagInput, validateHashtags, getHashtagErrorMessage);


const toggleSubmitButton = () => {
  photoSubmitButton.disabled = !pristine.validate();
};

const onHashtagInput = () => toggleSubmitButton();
const onDescriptionInput = () => toggleSubmitButton();

const toggleModal = () => {
  toggleClass(photoUploadOverlay, 'hidden');
  toggleClass(document.body, 'modal-open');
};

const resetForm = () => {
  const errors = document.querySelectorAll('.img-upload__field-wrapper--error');
  if (errors.length !== 0) {
    errors.forEach((error) => {
      error.textContent = '';
    });
  }
  photoUploadForm.reset();
  resetScale();
  resetSlider();
};

const onCancelPhotoUpload = (evt) => {
  evt.preventDefault();
  resetForm();
  closePhotoUploadForm();
};

const onPhotoUploadEscKey = (evt) => {
  const errorPopup = document.querySelector('.popup');
  if (isEscapeKey(evt) && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description') && !errorPopup) {
    evt.preventDefault();
    resetForm();
    closePhotoUploadForm();
  }
};

const onOpenPhotoUploadForm = (evt) => {
  if (evt.target.value) {
    openPhotoUploadForm();
  }
};

function openPhotoUploadForm() {
  const file = photoUploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    const url = URL.createObjectURL(file);
    preview.src = url;
    effectPreviewImages.forEach((previewImage) => {
      previewImage.style.backgroundImage = `url(${url})`;
    });
  } else {
    showWrongFileMessage();
    closePhotoUploadForm();
  }
  document.addEventListener('keydown', onPhotoUploadEscKey);
  toggleModal();
  toggleSubmitButton();
  resetSlider();
  pristine.reset();
}

function closePhotoUploadForm() {
  document.removeEventListener('keydown', onPhotoUploadEscKey);
  photoUploadInput.value = '';
  toggleModal();
}

const onFailUploadEscKey = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    errorSubmitMessage.remove();
    document.removeEventListener('keydown', onFailUploadEscKey);
  }
};

const onSuccessUploadEscKey = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    successSubmitMessage.remove();
    document.removeEventListener('keydown', onSuccessUploadEscKey);
  }
};

const onUploadSucceedClick = (evt) => {
  evt.preventDefault();
  successSubmitMessage.remove();
};

const onUploadFailClick = (evt) => {
  evt.preventDefault();
  errorSubmitMessage.remove();
};

const showSuccess = () => {
  document.addEventListener('keydown', onSuccessUploadEscKey);
  document.body.appendChild(successSubmitMessage);
  closePhotoUploadForm();
  resetForm();
};

const showError = () => {
  document.addEventListener('keydown', onFailUploadEscKey);
  document.body.appendChild(errorSubmitMessage);
};

const blockSubmitButton = () => {
  photoSubmitButton.disabled = true;
};

const unblockSubmitButton = () => {
  photoSubmitButton.disabled = false;
};

const onUserFormSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    blockSubmitButton();
    sendData(new FormData(photoUploadForm))
      .then(showSuccess)
      .catch(showError)
      .finally(unblockSubmitButton);
  }
};

const initPhotoUploadForm = () => {
  photoUploadForm.addEventListener('submit', onUserFormSubmit);
  photoUploadInput.addEventListener('change', onOpenPhotoUploadForm);
  cancelPhotoUploadButton.addEventListener('click', onCancelPhotoUpload);
  hashtagInput.addEventListener('input', onHashtagInput);
  photoDescriptionField.addEventListener('input', onDescriptionInput);
  successUploadButton.addEventListener('click', onUploadSucceedClick);
  errorUploadButton.addEventListener('click', onUploadFailClick);

  updateScale();
  updateEffect();
};

document.addEventListener('click', (evt) => {
  if (evt.target === successElement || successElement.contains(evt.target) || evt.target === errorElement || errorElement.contains(evt.target)) {
    return;
  }
  successSubmitMessage.remove();
  errorSubmitMessage.remove();
});

export { initPhotoUploadForm };

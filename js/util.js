const DATA_DELAY_TIME = 5000;
const WRONG_FILE_DELAY_TIME = 2000;

const toggleClass = (element, className = '') => {
  if (element) {
    element.classList.toggle(className);
  }
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const showErrorMessage = () => {
  const dataErrorTemplate = document.querySelector('#data-error').content;
  const errorElement = dataErrorTemplate.cloneNode(true);
  const errorMessage = errorElement.querySelector('.data-error');
  document.body.appendChild(errorMessage);
  setTimeout(() => {
    document.body.removeChild(errorMessage);
  }, DATA_DELAY_TIME);
  return errorMessage;
};

const showWrongFileMessage = () => {
  const wrongFileMessage = document.createElement('h2');
  wrongFileMessage.classList.add('data-error');
  wrongFileMessage.innerHTML = 'Выберите файл в формате jpg, jpeg, png, gif';
  document.body.appendChild(wrongFileMessage);
  setTimeout(() => {
    document.body.removeChild(wrongFileMessage);
  }, WRONG_FILE_DELAY_TIME);
  return wrongFileMessage;
};

export { toggleClass, isEscapeKey, debounce, showErrorMessage, showWrongFileMessage };

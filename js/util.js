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


export { toggleClass, isEscapeKey, debounce };

const toggleClass = (element, className = '') => {
  if (element) {
    element.classList.toggle(className);
  }
};

const isEscapeKey = (evt) => evt.key === 'Escape';


export { toggleClass, isEscapeKey };

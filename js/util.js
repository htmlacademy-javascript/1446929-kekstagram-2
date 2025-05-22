const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const getRandomArrayItem = (items) => items[getRandomNumber(0, items.length - 1)];

const toggleClass = (element, className = '') => {
  if (element) {
    element.classList.toggle(className);
  }
};

const isEscapeKey = (evt) => evt.key === 'Escape';


export { getRandomNumber, getRandomArrayItem, toggleClass, isEscapeKey };

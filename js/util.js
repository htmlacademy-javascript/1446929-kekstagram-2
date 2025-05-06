const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const getRandomArrayItem = (items) => items[randomNumber(0 , items.length - 1)];

export {randomNumber, getRandomArrayItem};

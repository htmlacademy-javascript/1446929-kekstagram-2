import { renderPhotos } from './photos.js';
import { debounce } from './util.js';

const MAX_RANDOM_PHOTO_COUNT = 10;

const RENDER_DELAY = 500;

const FilterName = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  POPULAR: 'filter-discussed'
};

const filterFunctions = {
  setDefault: (photos) => photos.slice(),
  setRandom: (photos) => photos.toSorted(() => 0.5 - Math.random()).slice(0, MAX_RANDOM_PHOTO_COUNT),
  setPopular: (photos) => photos.slice().sort((a, b) => b.comments.length - a.comments.length)
};

const photosFilterContainer = document.querySelector('.img-filters');
const photosFilterForm = document.querySelector('.img-filters__form');
let currentFilterButton = photosFilterForm.querySelector('.img-filters__button--active');

let posts = [];

const renderWithDelay = debounce(renderPhotos, RENDER_DELAY);

const setFilter = (filter) => {
  let filterFunction = filterFunctions.setDefault;

  switch (filter) {
    case FilterName.RANDOM:
      filterFunction = filterFunctions.setRandom;
      break;
    case FilterName.POPULAR:
      filterFunction = filterFunctions.setPopular;
      break;
  }

  renderWithDelay(filterFunction(posts));
};

const onPhotosFilterFormClick = (evt) => {
  const targetFilterButton = evt.target.closest('.img-filters__button');

  if (targetFilterButton && targetFilterButton !== currentFilterButton) {
    currentFilterButton.classList.toggle('img-filters__button--active');
    targetFilterButton.classList.toggle('img-filters__button--active');
    currentFilterButton = targetFilterButton;

    setFilter(targetFilterButton.id);
  }
};

const initFilters = (data) => {
  posts = data;
  photosFilterContainer.classList.remove('img-filters--inactive');
  photosFilterForm.addEventListener('click', onPhotosFilterFormClick);
};

export { initFilters };

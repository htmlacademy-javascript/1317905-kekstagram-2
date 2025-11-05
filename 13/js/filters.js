import { debounce } from './util.js';
import { createPhotosList } from './make-pictures.js';


const filtersForm = document.querySelector('.img-filters');

const RANDOM_COUNT = 10;
const DEBOUNCE_DELAY = 500;

const FILTERS = {
  FILTER_DEFAULT: 'filter-default',
  FILTER_RANDOM: 'filter-random',
  FILTER_DISCUSSED: 'filter-discussed'
};

let currentPhotos = [];

// Функции фильтрации
const getDefaultPhotos = () => [...currentPhotos];

const getRandomPhotos = () => [...currentPhotos].sort(() => 0.5 - Math.random()).slice(0, RANDOM_COUNT);

const getDiscussedPhotos = () => [...currentPhotos].sort((a, b) => b.comments.length - a.comments.length);

// Очистка старых фото
const replacePhotos = (photos) => {
  document.querySelectorAll('.picture').forEach((pic) => pic.remove());
  createPhotosList(photos);
};

const debouncedRender = debounce(replacePhotos, DEBOUNCE_DELAY);


// Обработчик клика по фильтру
const onFiltersFormClick = (evt) => {
  const filterActiveButton = document.querySelector('.img-filters__button--active');
  const filterClickedButton = evt.target.closest('.img-filters__button');
  if (!filterClickedButton) {
    return;
  }

  // Подсветка активного фильтра
  filterActiveButton.classList.remove('img-filters__button--active');
  filterClickedButton.classList.add('img-filters__button--active');

  let filteredPhotos;
  switch (filterClickedButton.id) {
    case FILTERS.FILTER_DEFAULT:
      filteredPhotos = getDefaultPhotos();
      break;
    case FILTERS.FILTER_RANDOM:
      filteredPhotos = getRandomPhotos();
      break;
    case FILTERS.FILTER_DISCUSSED:
      filteredPhotos = getDiscussedPhotos();
      break;
  }

  debouncedRender(filteredPhotos);
};

// Инициализация фильтров
const initFilters = (photos) => {
  currentPhotos = photos;

  filtersForm.classList.remove('img-filters--inactive');
  filtersForm.addEventListener('click', onFiltersFormClick);

};

export { initFilters };

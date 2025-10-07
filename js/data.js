import {getRandomArrayElement, getRandomInteger, generatePhotoId, generatePhotoUrl} from './util.js';
import {createComment} from './create-comment.js';

const DESCRIPTIONS = [
  'Отличный день для фото!',
  'Сегодня волшебный закат',
  'Момент, который стоит запомнить',
  'Природа во всей красе',
  'Городские огни',
  'Путешествие мечты',
  'Тишина и покой',
  'Эмоции через объектив',
  'Архитектурный шедевр',
  'Уличное искусство'
];


const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_COMMENTS = 30;
const PHOTO_ARRAY_COUNT = 25;

const createPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from({length: getRandomInteger(0, MAX_COMMENTS)}, createComment)
});

const createPhotos = () => Array.from({length: PHOTO_ARRAY_COUNT}, createPhoto);

export {createPhotos};
console.log(createPhotos());

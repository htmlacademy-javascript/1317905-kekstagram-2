import {getRandomArrayElement, getRandomInteger, generateCommentId} from './util.js';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = ['Артём', 'Мария', 'Дмитрий', 'Анна', 'Александр', 'Светлана', 'Николай', 'Елена', 'Кирилл', 'Ольга'];

const MAX_AVATAR_NUMBER = 6;

//Создание одного комментария
const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1 , MAX_AVATAR_NUMBER)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

export {createComment};

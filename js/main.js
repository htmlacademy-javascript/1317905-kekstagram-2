const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = ['Артём', 'Мария', 'Дмитрий', 'Анна', 'Александр', 'Светлана', 'Николай', 'Елена', 'Кирилл', 'Ольга'];

const DESCRIPTION = [
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

const MAX_PHOTO_ID = 25;
const MAX_PHOTO_NUMBER = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_COMMENT_ID = 200;
const MAX_AVATAR_NUMBER = 6;
const MAX_COMMENTS = 30;
const PHOTO_ARRAY_COUNT = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];


//Генерация ID
function createRandomIdGenerator(min, max) {
  const previousValues = [];

  return function() {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const generatePhotoId = createRandomIdGenerator(1, MAX_PHOTO_ID);
const generateCommentId = createRandomIdGenerator(1, MAX_COMMENT_ID);

//Создание одного комментария
const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1 , MAX_AVATAR_NUMBER)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});


//Создание объекта фото
const creatPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${getRandomInteger(1 , MAX_PHOTO_NUMBER)}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from({length: getRandomInteger(0, MAX_COMMENTS)}, createComment)
});

const photosArray = Array.from({length: PHOTO_ARRAY_COUNT}, creatPhoto);

//console.log(photosArray);

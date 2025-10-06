const MAX_PHOTO_ID = 25;
const MAX_COMMENT_ID = 1000;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Генератор ID
function createRandomIdGenerator(min, max) {
  const previousValues = [];

  return function() {
    if (previousValues.length >= (max - min + 1)) {
      previousValues.length = 0; // Очищаем массив
    }
    let currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const generatePhotoId = createRandomIdGenerator(1, MAX_PHOTO_ID);
const generateCommentId = createRandomIdGenerator(1, MAX_COMMENT_ID);

export {getRandomInteger, getRandomArrayElement, generatePhotoId, generateCommentId};

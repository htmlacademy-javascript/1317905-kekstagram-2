
const uploadForm = document.querySelector('.img-upload__form');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

const HASHTAG_LENGTH = 20;
const HASHTAG_ARRAY_LENGTH = 5;
const COMMENT_LENGTH = 140;


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});


// Валидация хэштегов
const validateHashtags = (value) => {
  if (value.trim() === '') {
    return { valid: true };
  }

  const hashtagsArray = value.trim().split(' ').filter((tag) => tag.length > 0);
  const seenHashtags = new Set();
  const regex = /^#[a-zA-Zа-яА-ЯёЁ0-9]{1,19}$/;

  if (hashtagsArray.length > HASHTAG_ARRAY_LENGTH) {
    return { valid: false, message: `Нельзя указать больше ${HASHTAG_ARRAY_LENGTH} хэштегов` };
  }

  for (const hashtag of hashtagsArray) {
    const lowerCaseHashtag = hashtag.toLowerCase();
    if (!hashtag.startsWith('#')) {
      return { valid: false, message: 'Хэштег должен начинаться с символа #' };
    }
    if (hashtag === '#') {
      return { valid: false, message: 'Хэштег не может состоять только из решётки' };
    }
    if (hashtag.length > HASHTAG_LENGTH) {
      return { valid: false, message: `Максимальная длина хэштега не более ${HASHTAG_LENGTH} символов` };
    }
    if (hashtag.indexOf('#', 1) !== -1) {
      return { valid: false, message: 'Хэштеги должны разделяться пробелами' };
    }
    if (!regex.test(hashtag)) {
      return { valid: false, message: 'Хэштег содержит недопустимые символы' };
    }
    if (seenHashtags.has(lowerCaseHashtag)) {
      return { valid: false, message: 'Хэштеги не должны повторяться' };
    }
    seenHashtags.add(lowerCaseHashtag);
  }

  return { valid: true };
};

const validateResult = (value) => validateHashtags(value).valid;

const validateErrorMessage = (value) => validateHashtags(value).message;

//Валидация хэштегов
pristine.addValidator(hashtagInput, validateResult, validateErrorMessage);


//Валидация формы комментария
const validateDescriptionInput = (value) => value.length <= COMMENT_LENGTH;

pristine.addValidator(descriptionInput, validateDescriptionInput, `Не более ${COMMENT_LENGTH} символов`);


export { pristine };

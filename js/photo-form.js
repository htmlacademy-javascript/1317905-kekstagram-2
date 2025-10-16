import { isEscapeKey } from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploaderControll = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');


// Обработчик клавиатуры
const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImgUploader();
  }
};


// Обработчики для полей ввода
const onFieldKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

//Открытие загрузчика
const openImgUploader = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);

  hashtagInput.addEventListener('keydown', onFieldKeyDown);
  descriptionInput.addEventListener('keydown', onFieldKeyDown);
};


uploaderControll.addEventListener('change' , () => {
  openImgUploader();
});


uploadCancel.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeImgUploader();
});


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

  if (hashtagsArray.length > 5) {
    return { valid: false, message: 'Нельзя указать больше пяти хэштегов' };
  }

  for (const hashtag of hashtagsArray) {
    const lowerCaseHashtag = hashtag.toLowerCase();
    if (!hashtag.startsWith('#')) {
      return { valid: false, message: 'Хэштег должен начинаться с символа #' };
    }
    if (hashtag === '#') {
      return { valid: false, message: 'Хэштег не может состоять только из решётки' };
    }
    if (hashtag.length > 20) {
      return { valid: false, message: 'Максимальная длина хэштега не более 20 символов' };
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
const validateDescriptionInput = (value) => value.length <= 140;

pristine.addValidator(descriptionInput, validateDescriptionInput, 'Не более 140 символов');


uploadForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});

//  Закрытие формы редактирования
function closeImgUploader () {
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeyDown);
  document.body.classList.remove('modal-open');

  hashtagInput.removeEventListener('keydown', onFieldKeyDown);
  descriptionInput.removeEventListener('keydown', onFieldKeyDown);

  uploadForm.reset();
  pristine.reset();
}

import { isEscapeKey } from './util.js';
import { pristine } from './photo-form-validation.js';
import { onScaleSmaller, onScaleBigger, resetScaleEditor, resetSlider } from './photo-editor.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploaderControll = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

const scaleSmaller = uploadForm.querySelector('.scale__control--smaller');
const scaleBigger = uploadForm.querySelector('.scale__control--bigger');


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

  scaleSmaller.addEventListener('click', onScaleSmaller);
  scaleBigger.addEventListener('click', onScaleBigger);

};


uploaderControll.addEventListener('change' , () => {
  openImgUploader();
});


uploadCancel.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeImgUploader();
});

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

  scaleSmaller.removeEventListener('click', onScaleSmaller);
  scaleBigger.removeEventListener('click', onScaleBigger);

  resetSlider('none');
  resetScaleEditor();

  uploadForm.reset();
  pristine.reset();
}

import { isEscapeKey } from './util.js';
import { pristine } from './photo-form-validation.js';
import { onScaleSmaller, onScaleBigger, resetScaleEditor, resetSlider } from './photo-editor.js';
import { errorMessage, successMessage } from './messages.js';
import { sendData } from './api.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploaderControll = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');

const submitButton = uploadForm.querySelector('.img-upload__submit');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

const scaleSmaller = uploadForm.querySelector('.scale__control--smaller');
const scaleBigger = uploadForm.querySelector('.scale__control--bigger');

const imgPreview = uploadForm.querySelector('.img-upload__preview img');
const effectsPreview = uploadForm.querySelectorAll('.effects__preview');

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const SubmitButtonText = {
  IDLE: submitButton.textContent,
  SENDING: 'Сохраняю...'
};


// Обработчик клавиатуры
const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.querySelector('.error')) {
      return;
    }
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

  const file = uploaderControll.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgPreview.src = URL.createObjectURL(file);
    effectsPreview.forEach((preview) => {
      preview.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  }

};


uploaderControll.addEventListener('change' , () => {
  openImgUploader();
});


uploadCancel.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeImgUploader();
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};


const setUserFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      try {
        await sendData(new FormData(evt.target));
        onSuccess();
        successMessage();
      } catch {
        errorMessage();
      } finally {
        unblockSubmitButton();
      }
    }
  });
};

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

  imgPreview.src = '';
  effectsPreview.forEach((preview) => {
    preview.style.backgroundImage = '';
  });
}

export {setUserFormSubmit, openImgUploader, closeImgUploader};

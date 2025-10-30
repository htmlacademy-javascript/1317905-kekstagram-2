import { isEscapeKey } from './util.js';
//import { userPhotos } from './data.js';
import { clearComments, initComments } from './render-comments.js';


const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');


let photos = [];

// Обработчик клавиатуры
const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};


const setPhotoData = (data) => {
  photos = data;
};

// Функция заполнения данными
const createFullPhotoData = (pictureId) => {
  const currentPhoto = photos.find((photo) => photo.id === Number(pictureId));

  bigPictureImg.src = currentPhoto.url;
  bigPictureImg.alt = currentPhoto.description;
  likesCount.textContent = currentPhoto.likes;
  socialCaption.textContent = currentPhoto.description;

  initComments(currentPhoto.comments);
};

// Открытие полноразмерного фото
const openBigPicture = (pictureId) => {
  bigPicture.classList.remove('hidden');
  createFullPhotoData(pictureId);
  document.addEventListener('keydown', onDocumentKeyDown);
  document.body.classList.add('modal-open');
};

//  Закрытие полноразмерного фото
function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeyDown);
  document.body.classList.remove('modal-open');
  clearComments();
}


pictures.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');
  if (currentPicture) {
    evt.preventDefault();
    openBigPicture(currentPicture.dataset.pictureId);
  }
});

bigPictureClose.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeBigPicture();
});

export {setPhotoData};

import { isEscapeKey } from './util.js';
import {userPhotos} from './data.js';

const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const socialCommentsLoader = bigPicture.querySelector('.social__comments-loader');
const socialCommentShowCount = bigPicture.querySelector('.social__comment-shown-count');
const socialCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialCommentList = bigPicture.querySelector('.social__comments');
const socialCommentItem = socialCommentList.querySelector('.social__comment');
const socialCaption = bigPicture.querySelector('.social__caption');

const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

// Создаем элемент комментария
function createCommentElement(comment) {
  const commentElementFragment = document.createDocumentFragment();
  const commentElement = socialCommentItem.cloneNode(true);

  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;

  commentElementFragment.appendChild(commentElement);
  socialCommentList.appendChild(commentElementFragment);
}

// Функция заполнения данными
function createFullPhotoData(pictureId) {
  const currentPhoto = userPhotos.find((photo) =>photo.id === Number(pictureId));

  bigPictureImg.src = currentPhoto.url;
  bigPictureImg.alt = currentPhoto.description;
  likesCount.textContent = currentPhoto.likes;
  socialCommentTotalCount.textContent = currentPhoto.comments.length;
  socialCommentShowCount.textContent = currentPhoto.comments.length;
  socialCaption.textContent = currentPhoto.description;

  socialCommentList.innerHTML = '';
  currentPhoto.comments.forEach((comment) => {
    createCommentElement(comment);
  });
}

// Открытие полноразмерного фото
function openBigPicture(pictureId) {
  bigPicture.classList.remove('hidden');
  createFullPhotoData(pictureId);

  document.addEventListener('keydown', onDocumentKeyDown);

  socialCommentCount.classList.add('hidden');
  socialCommentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
}


// Закрытие полноразмерного фото
function closeBigPicture() {
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeyDown);

  document.body.classList.remove('modal-open');

}

//Клик на миниатюру
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

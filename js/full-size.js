import { isEscapeKey } from './util.js';
import { userPhotos } from './gallery.js';

const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const socialCommentsLoader = bigPicture.querySelector('.social__comments-loader');
const likesCount = bigPicture.querySelector('.likes-count');
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
function createFullPhotoData(photo) {
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  likesCount.textContent = photo.likes;
  socialCommentTotalCount.textContent = photo.comments.length;
  socialCommentShowCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;

  socialCommentList.innerHTML = '';
  photo.comments.forEach((comment) => {
    createCommentElement(comment);
  });
}

// Открытие полноразмерного фото
function openBigPicture(photo) {
  createFullPhotoData(photo);
  bigPicture.classList.remove('hidden');
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

//Клик по миниатюре
function onPictureClick(evt) {
  const currentPicture = evt.target.closest('.picture');
  if (currentPicture) {
    evt.preventDefault();
    // Получаем индекс из data-атрибута и находим соответствующие данные
    const index = currentPicture.dataset.index;
    const photoData = userPhotos[index];
    openBigPicture(photoData);
  }
}

pictures.addEventListener('click', onPictureClick);

bigPictureClose.addEventListener('click', () => {
  closeBigPicture();
});

import { isEscapeKey } from './util.js';
import { userPhotos } from './data.js';

const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCommentsLoader = bigPicture.querySelector('.social__comments-loader');
const socialCommentShowCount = bigPicture.querySelector('.social__comment-shown-count');
const socialCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialCommentList = bigPicture.querySelector('.social__comments');
const socialCommentItem = socialCommentList.querySelector('.social__comment');
const socialCaption = bigPicture.querySelector('.social__caption');

let comments = [];
let currentCommentsCount = 0;
const COMMENTS_STEP = 5;

// Обработчик клавиатуры
const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

// Создание элемента комментария
const createCommentElement = (comment) => {
  const commentElement = socialCommentItem.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
};

// Создание блока комментариев
const renderCommentsBlock = () => {
  const commentElementFragment = document.createDocumentFragment();
  const shownComments = comments.slice(currentCommentsCount, currentCommentsCount + COMMENTS_STEP);
  const shownCommentsLength = shownComments.length + currentCommentsCount;

  shownComments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    commentElementFragment.appendChild(commentElement);
  });

  socialCommentList.appendChild(commentElementFragment);

  socialCommentShowCount.textContent = shownCommentsLength;
  socialCommentTotalCount.textContent = comments.length;

  if (shownCommentsLength >= comments.length) {
    socialCommentsLoader.classList.add('hidden');
  } else {
    socialCommentsLoader.classList.remove('hidden');
  }

  currentCommentsCount += COMMENTS_STEP;
};

// Очистка комментариев
const clearComments = () => {
  currentCommentsCount = 0;
  comments = [];
  socialCommentList.innerHTML = '';
  socialCommentsLoader.classList.add('hidden');
  socialCommentsLoader.removeEventListener('click', renderCommentsBlock);
};

// Инициализация комментариев
const initComments = (currentComments) => {
  comments = currentComments;
  currentCommentsCount = 0;
  socialCommentList.innerHTML = '';

  if (comments.length > COMMENTS_STEP) {
    socialCommentsLoader.classList.remove('hidden');
    socialCommentsLoader.addEventListener('click', renderCommentsBlock);
  } else {
    socialCommentsLoader.classList.add('hidden');
  }

  renderCommentsBlock();
};

// Функция заполнения данными
const createFullPhotoData = (pictureId) => {
  const currentPhoto = userPhotos.find((photo) => photo.id === Number(pictureId));

  bigPictureImg.src = currentPhoto.url;
  bigPictureImg.alt = currentPhoto.description;
  likesCount.textContent = currentPhoto.likes;
  socialCommentTotalCount.textContent = currentPhoto.comments.length;
  socialCommentShowCount.textContent = currentPhoto.comments.length;
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

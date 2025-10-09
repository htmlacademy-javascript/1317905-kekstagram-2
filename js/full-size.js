import { isEscapeKey } from './util.js';
import { photosData } from './gallery.js';

const pictures = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const socialCommentsLoader = bigPicture.querySelector('.social__comments-loader');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCommentShowCount = bigPicture.querySelector('.social__comment-shown-count');
const socialCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialCommentList = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');


const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

// Создаем элемент комментария
function createCommentElement(comment) {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  commentElement.innerHTML = `<img
    class="social__picture"
    src="${comment.avatar}"
    alt="${comment.name}"
    width="35" height="35">
  <p class="social__text">${comment.message}</p>
  `;
  return commentElement;
}

//Создаем функцию заполнения данными полноразмерного фото
function createFullPhotoData(photoData) {
  bigPictureImg.src = photoData.url;
  bigPictureImg.alt = photoData.description;
  likesCount.textContent = photoData.likes;
  socialCommentTotalCount.textContent = photoData.comments.length;
  socialCommentShowCount.textContent = photoData.comments.length;
  socialCaption.textContent = photoData.description;

  socialCommentList.innerHTML = '';
  photoData.comments.forEach((comment) => {
    socialCommentList.appendChild(createCommentElement(comment));
  });
}

// Открытие полноразмерного фото
function openBigPicture() {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeyDown);
  socialCommentCount.classList.add('hidden');
  socialCommentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeyDown);
  document.body.classList.remove('modal-open');
}


const addPictureClickHandler = function (picture, photo) {
  picture.addEventListener('click', () => {
    createFullPhotoData(photo);
    openBigPicture();
  });
};

for (let i = 0; i < pictures.length; i++) {
  addPictureClickHandler(pictures[i], photosData[i]);
}

bigPictureClose.addEventListener('click', () => {
  closeBigPicture();
});


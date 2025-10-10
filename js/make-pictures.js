import { userPhotos } from './gallery.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureList = document.querySelector('.pictures');
const picturesFragment = document.createDocumentFragment();

userPhotos.forEach(({ url, description, likes, comments }, index) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  pictureElement.dataset.index = index;

  picturesFragment.appendChild(pictureElement);
});

pictureList.appendChild(picturesFragment);



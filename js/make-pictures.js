import { photosData } from './gallery.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const pictureList = document.querySelector('.pictures');


const userPhotos = photosData;


const picturesFragment = document.createDocumentFragment();

userPhotos.forEach(({ url, description, likes, comments }) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;


  picturesFragment.appendChild(pictureElement);
});

pictureList.appendChild(picturesFragment);



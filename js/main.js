import {createPhotosList} from './make-pictures.js';
import {setPhotoData} from './full-size.js';
import { setUserFormSubmit, closeImgUploader } from './photo-form.js';
import { getData } from './api.js';
import { dataErrorMessage } from './messages.js';


getData()
  .then((photos) => {
    //console.log(photos);
    createPhotosList(photos);
    setPhotoData(photos);
  })
  .catch(() => {
    dataErrorMessage();
  });

setUserFormSubmit(closeImgUploader);

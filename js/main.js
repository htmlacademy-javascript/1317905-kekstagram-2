import { createPhotosList } from './make-pictures.js';
import { setPhotoData } from './full-size.js';
import { setUserFormSubmit, closeImgUploader } from './photo-form.js';
import { getData } from './api.js';
import { dataErrorMessage } from './messages.js';
import { initFilters } from './filters.js';


(async () => {
  try {
    const photos = await getData();
    createPhotosList(photos);
    setPhotoData(photos);
    initFilters(photos);
  } catch {
    dataErrorMessage();
  }
}) ();


setUserFormSubmit(closeImgUploader);

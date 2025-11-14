import { isEscapeKey } from './util.js';


const ALERT_SHOW_TIME = 5000;

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

let currentMessage = null;

// Обработчики
const onOutsideClick = (evt) => {
  const inner = currentMessage.querySelector('.success__inner, .error__inner');
  if (inner && !inner.contains(evt.target)){
    removeMessage();
  }
};

const onDocumentEscDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeMessage();
  }
};

const onCloseButtonClick = () => removeMessage();

//Удаление сообщения об ошибке
function removeMessage () {
  if (currentMessage) {

    const button = currentMessage.querySelector('.success__button, .error__button');
    if (button) {
      button.removeEventListener('click', onCloseButtonClick);
    }

    currentMessage.remove();
    currentMessage = null;


    document.removeEventListener('keydown', onDocumentEscDown);
    document.removeEventListener('click', onOutsideClick);
  }
}


const showSuccessMessage = () => {
  const success = successTemplate.cloneNode(true);
  const successButton = success.querySelector('.success__button');

  currentMessage = success;
  document.body.append(success);

  successButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentEscDown);
  document.addEventListener('click', onOutsideClick);

};

const showErrorMessage = () => {
  const error = errorTemplate.cloneNode(true);
  const errorButton = error.querySelector('.error__button');

  currentMessage = error;
  document.body.append(error);

  errorButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentEscDown);
  document.addEventListener('click', onOutsideClick);

};


const showDataErrorMessage = () => {
  const dataError = dataErrorTemplate.cloneNode(true);
  currentMessage = dataError;
  document.body.append(dataError);

  setTimeout(() => {
    dataError.remove();
  }, ALERT_SHOW_TIME);

};

export {showSuccessMessage, showErrorMessage, showDataErrorMessage};


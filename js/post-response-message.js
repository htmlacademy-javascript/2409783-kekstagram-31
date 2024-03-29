import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const successSubmition = document.querySelector('#success').content.querySelector('.success');
const errorSubmition = document.querySelector('#error').content.querySelector('.error');

const closeSuccessByClick = function (clickEvt) {
  const successMessage = body.querySelector('.success');
  const successInner = successMessage.querySelector('.success__inner');
  if (!clickEvt.composedPath().includes(successInner)) {
    removeSuccessListeners();
  }
};

const closeErrorByClick = function (clickEvt) {
  const errorMessage = body.querySelector('.error');
  const errorInner = errorMessage.querySelector('.error__inner');
  if (!clickEvt.composedPath().includes(errorInner)) {
    removeErrorListeners();
  }
};

const closeSuccessByKeydown = function (keydownEvt) {
  if (isEscapeKey(keydownEvt)) {
    removeSuccessListeners();
  }
};

const closeErrorByKeydown = function (keydownEvt) {
  if (isEscapeKey(keydownEvt)) {
    removeErrorListeners();
  }
};

const handleSuccessMessage = function () {
  body.appendChild(successSubmition);
  const successButton = body.querySelector('.success__button');
  document.addEventListener('click', closeSuccessByClick);
  document.addEventListener('keydown', closeSuccessByKeydown);
  successButton.addEventListener('click', removeSuccessListeners);
};

function removeSuccessListeners () {
  document.removeEventListener('click', closeSuccessByClick);
  document.removeEventListener('keydown', closeSuccessByKeydown);

  const successMessage = body.querySelector('.success');
  successMessage.parentNode.removeChild(successMessage);
}

const handleErrorMessage = function () {
  body.appendChild(errorSubmition);
  const errorButton = body.querySelector('.error__button');
  document.addEventListener('click', closeErrorByClick);
  document.addEventListener('keydown', closeErrorByKeydown);
  errorButton.addEventListener('click', removeErrorListeners);
};

function removeErrorListeners () {
  document.removeEventListener('click', closeErrorByClick);
  document.removeEventListener('keydown', closeErrorByKeydown);

  const errorMessage = body.querySelector('.error');
  errorMessage.parentNode.removeChild(errorMessage);
}

export {handleSuccessMessage, handleErrorMessage};

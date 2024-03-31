import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const successSubmition = document.querySelector('#success').content.querySelector('.success');
const errorSubmition = document.querySelector('#error').content.querySelector('.error');

const onDocumentSuccessClick = (clickEvt) => {
  const successMessage = body.querySelector('.success');
  const successInner = successMessage.querySelector('.success__inner');
  if (!clickEvt.composedPath().includes(successInner)) {
    removeSuccessListeners();
  }
};

const onDocumentErrorClick = (clickEvt) => {
  const errorMessage = body.querySelector('.error');
  const errorInner = errorMessage.querySelector('.error__inner');
  if (!clickEvt.composedPath().includes(errorInner)) {
    removeErrorListeners();
  }
};

const onDocumentSuccessKeydown = (keydownEvt) => {
  if (isEscapeKey(keydownEvt)) {
    removeSuccessListeners();
  }
};

const onDocumentErrorKeydown = (keydownEvt) => {
  if (isEscapeKey(keydownEvt)) {
    removeErrorListeners();
  }
};

const onSuccessButtonClick = () => removeSuccessListeners();

const onErrorButtonClick = () => removeErrorListeners();

const handleSuccessMessage = () => {
  body.appendChild(successSubmition);
  const successButton = body.querySelector('.success__button');
  document.addEventListener('click', onDocumentSuccessClick);
  document.addEventListener('keydown', onDocumentSuccessKeydown);
  successButton.addEventListener('click', onSuccessButtonClick);
};

function removeSuccessListeners () {
  document.removeEventListener('click', onDocumentSuccessClick);
  document.removeEventListener('keydown', onDocumentSuccessKeydown);

  const successMessage = body.querySelector('.success');
  successMessage.parentNode.removeChild(successMessage);
}

const handleErrorMessage = () => {
  body.appendChild(errorSubmition);
  const errorButton = body.querySelector('.error__button');
  document.addEventListener('click', onDocumentErrorClick);
  document.addEventListener('keydown', onDocumentErrorKeydown);
  errorButton.addEventListener('click', onErrorButtonClick);
};

function removeErrorListeners () {
  document.removeEventListener('click', onDocumentErrorClick);
  document.removeEventListener('keydown', onDocumentErrorKeydown);

  const errorMessage = body.querySelector('.error');
  errorMessage.parentNode.removeChild(errorMessage);
}

export {handleSuccessMessage, handleErrorMessage};

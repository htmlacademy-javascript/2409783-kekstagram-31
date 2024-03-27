import {isEscapeKey} from './util.js';
import {addScaleListeners, removeScaleListeners, addEffects, removeEffects} from './photo-editor.js';
import {sendData} from './api.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const imagePreview = form.querySelector('.img-upload__preview');
const imageInput = form.querySelector('.img-upload__input');
const imageOverlay = form.querySelector('.img-upload__overlay');
const imageHashtags = form.querySelector('.text__hashtags');
const imageDescription = form.querySelector('.text__description');
const uploadCloseButton = imageOverlay.querySelector('.img-upload__cancel');
const submitButton = form.querySelector('.img-upload__submit');

const successSubmition = document.querySelector('#success').content;
const errorSubmition = document.querySelector('#error').content;

body.appendChild(successSubmition);
const successMessage = body.querySelector('.success');
successMessage.classList.add('hidden');

body.appendChild(errorSubmition);
const errorMessage = body.querySelector('.error');
errorMessage.classList.add('hidden');

const successInner = successMessage.querySelector('.success__inner');
const errorInner = errorMessage.querySelector('.error__inner');

const errorButton = errorInner.querySelector('.error__button');
const successButton = successInner.querySelector('.success__button');

const onDocumentKeydown = function (keydownEvt) {
  if (isEscapeKey(keydownEvt) && document.activeElement !== imageDescription &&
      document.activeElement !== imageHashtags && errorMessage.classList.contains('hidden')) {
    keydownEvt.preventDefault();
    closeUploadImgModal();
  }
};

const closeSuccessByClick = function (clickEvt) {
  if (!clickEvt.composedPath().includes(successInner)) {
    successMessage.classList.add('hidden');
    removeSuccessListeners();
  }
};

const closeErrorByClick = function (clickEvt) {
  if (!clickEvt.composedPath().includes(errorInner)) {
    errorMessage.classList.add('hidden');
    removeErrorListeners();
  }
};

const closeSuccessByKeydown = function (keydownEvt) {
  if (isEscapeKey(keydownEvt)) {
    successMessage.classList.add('hidden');
    removeSuccessListeners();
  }
};

const closeErrorByKeydown = function (keydownEvt) {
  if (isEscapeKey(keydownEvt)) {
    errorMessage.classList.add('hidden');
    removeErrorListeners();
  }
};

const onSuccessButton = () => {
  successMessage.classList.add('hidden');
  removeSuccessListeners();
};

const onErrorButton = () => {
  errorMessage.classList.add('hidden');
  removeErrorListeners();
};

const handleSuccessMessage = function () {
  document.addEventListener('click', closeSuccessByClick);
  document.addEventListener('keydown', closeSuccessByKeydown);
  successButton.addEventListener('click', onSuccessButton);
};

function removeSuccessListeners () {
  document.removeEventListener('click', closeSuccessByClick);
  document.removeEventListener('keydown', closeSuccessByKeydown);
  successButton.removeEventListener('click', onSuccessButton);
}

const handleErrorMessage = function () {
  document.addEventListener('click', closeErrorByClick);
  document.addEventListener('keydown', closeErrorByKeydown);
  errorButton.addEventListener('click', onErrorButton);
};

function removeErrorListeners () {
  document.removeEventListener('click', closeErrorByClick);
  document.removeEventListener('keydown', closeErrorByKeydown);
  errorButton.removeEventListener('click', onErrorButton);
}

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text__error'
}, false);

function validateDescription (value) {
  return value.length <= 140;
}

pristine.addValidator(imageDescription, validateDescription, 'Длина комментария не может превышать 140 символов.');

let errorType = 0;

function validateHashtags (value) {
  let hashtagsList = value.split(' ');
  const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;

  hashtagsList = hashtagsList.filter((hashtag) => hashtag !== '');

  if (hashtagsList.length > 5) {
    errorType = 1;
    return false;
  }

  if (hashtagsList.length === 0) {
    return true;
  }

  errorType = 0;
  for (let i = 0; i < hashtagsList.length; i++) {
    hashtagsList[i] = hashtagsList[i].toLowerCase();
    if(!hashtagRegExp.test(hashtagsList[i])) {
      errorType = 2;
      return false;
    }
  }

  const uniqueHashtags = new Set(hashtagsList);
  const uniqueHashtagsList = Array.from(uniqueHashtags);
  if (uniqueHashtagsList.length !== hashtagsList.length) {
    errorType = 3;
    return false;
  }

  return true;
}

function createErrorMessage () {
  switch(errorType) {
    case 1: return 'Хэштегов должно быть менее 5 штук.';
    case 2: return 'Хэштег неправильного формата.';
    case 3: return 'Хэштеги должны быть уникальны.';
  }
}

pristine.addValidator(imageHashtags, validateHashtags, createErrorMessage);

const setUserFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      submitButton.disabled = true;
      sendData(new FormData(evt.target))
        .then(() => {
          closeUploadImgModal();
          successMessage.classList.remove('hidden');
          handleSuccessMessage();
        })
        .catch(() => {
          errorMessage.classList.remove('hidden');
          handleErrorMessage();
        })
        .finally(() => {
          submitButton.disabled = false;
        });
    }
  });
};

imageInput.addEventListener('change', () => {
  imageOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  const file = imageInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imagePreview.querySelector('img').src = URL.createObjectURL(file);
  }

  addScaleListeners();
  addEffects();

  document.addEventListener('keydown', onDocumentKeydown);
});

function closeUploadImgModal () {
  removeScaleListeners();
  removeEffects();

  document.removeEventListener('keydown', onDocumentKeydown);

  imageOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  form.reset();

  form.querySelectorAll('.text__error').forEach(error => error.remove());
  form.querySelectorAll('.img-upload__field-wrapper').forEach(field => field.classList.remove('img-upload__field-wrapper--error'));
}

uploadCloseButton.addEventListener('click', closeUploadImgModal);

export {setUserFormSubmit};

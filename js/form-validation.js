import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const imageInput = form.querySelector('.img-upload__input');
const imageOverlay = form.querySelector('.img-upload__overlay');
const imageHashtags = form.querySelector('.text__hashtags');
const imageDescription = form.querySelector('.text__description');
const uploadCloseButton = imageOverlay.querySelector('.img-upload__cancel');

const onDocumentKeydown = function (keydownEvt) {
  if (isEscapeKey(keydownEvt) && document.activeElement !== imageDescription && document.activeElement !== imageHashtags) {
    keydownEvt.preventDefault();
    closeUploadImgModal();
  }
};

imageInput.addEventListener('input', () => {
  imageOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
});

function closeUploadImgModal () {
  document.removeEventListener('keydown', onDocumentKeydown);
  imageOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
}

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__field-wrapper--success',
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
  const hashtagsList = value.split(' ');
  const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;
  if (hashtagsList.length > 5) {
    errorType = 1;
    return false;
  }

  if (hashtagsList.length === 1 && hashtagsList[0] === '') {
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

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const validation = pristine.validate();
  if (validation) {
    form.submit();
  }
});

uploadCloseButton.addEventListener('click', closeUploadImgModal);

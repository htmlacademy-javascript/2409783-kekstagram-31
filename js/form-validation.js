import {sendData} from './api.js';
import {closeUploadImgModal} from './form.js';
import {handleSuccessMessage, handleErrorMessage} from './post-response-message.js';

const form = document.querySelector('.img-upload__form');
const imageHashtags = form.querySelector('.text__hashtags');
const imageDescription = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');

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
          handleSuccessMessage();
          closeUploadImgModal();
        })
        .catch(() => {
          handleErrorMessage();
        })
        .finally(() => {
          submitButton.disabled = false;
        });
    }
  });
};

export {setUserFormSubmit};

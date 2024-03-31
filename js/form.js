import {isEscapeKey} from './util.js';
import {addScaleListeners, removeScaleListeners, addEffects, removeEffects} from './photo-editor.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const imagePreview = form.querySelector('.img-upload__preview');
const imageInput = form.querySelector('.img-upload__input');
const imageOverlay = form.querySelector('.img-upload__overlay');
const imageHashtags = form.querySelector('.text__hashtags');
const imageDescription = form.querySelector('.text__description');
const uploadCloseButton = imageOverlay.querySelector('.img-upload__cancel');

const onDocumentKeydown = (keydownEvt) => {
  const errorMessage = body.querySelector('.error');
  if (isEscapeKey(keydownEvt) && document.activeElement !== imageDescription &&
      document.activeElement !== imageHashtags && !errorMessage) {
    keydownEvt.preventDefault();
    closeUploadImgModal();
  }
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

  form.querySelectorAll('.text__error').forEach((error) => error.remove());
  form.querySelectorAll('.img-upload__field-wrapper').forEach((field) => field.classList.remove('img-upload__field-wrapper--error'));
}

const onCloseButtonClick = () => closeUploadImgModal();

uploadCloseButton.addEventListener('click', onCloseButtonClick);

export {closeUploadImgModal};

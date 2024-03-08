import {isEscapeKey} from './util.js';
import {publicationsList} from './generate-pictures.js';

const body = document.querySelector('body');
const pictures = document.querySelector('.pictures');
const bigPictureModal = document.querySelector('.big-picture');
const modalCloseButton = bigPictureModal.querySelector('.big-picture__cancel');
const comments = bigPictureModal.querySelector('.social__comments');
const shownComments = bigPictureModal.querySelector('.social__comment-shown-count');
const commentsLoader = bigPictureModal.querySelector('.comments-loader');

const commentIncrement = 5;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPictureModal();
  }
};

const commentsCounter = () => {
  let counter = 0;
  return function (val) {
    counter += val;
    return counter;
  };
};

const renderComments = (commentsList) => {
  const commentFragment = document.createDocumentFragment(); // Создаём "коробочку"

  for (let i = 0; i < commentsList.length; i++) {
    const newComment = document.createElement('li');
    newComment.classList.add('social__comment');

    const commentImage = document.createElement('img');
    commentImage.classList.add('social__picture');
    commentImage.src = commentsList[i].avatar;
    commentImage.alt = 'Аватар комментатора фотографии';
    commentImage.width = '35';
    commentImage.height = '35';
    newComment.appendChild(commentImage);

    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = commentsList[i].message;
    newComment.appendChild(commentText);

    commentFragment.appendChild(newComment);
  }

  comments.appendChild(commentFragment);
};

const clearComments = () => {
  comments.innerHTML = '';
};

function openBigPictureModal (evt) {
  if (evt.target.parentNode.nodeName === 'A') {
    bigPictureModal.classList.remove('hidden');

    const parent = evt.target.parentNode;
    const pictureId = parent.dataset.pictureId;
    const bigPictureInfo = publicationsList.filter((item) => item.id === Number(pictureId))[0];

    const bigPictureImage = bigPictureModal.querySelector('.big-picture__img');
    bigPictureImage.querySelector('img').src = bigPictureInfo.url;
    bigPictureImage.querySelector('img').alt = bigPictureInfo.description;
    bigPictureModal.querySelector('.likes-count').textContent = bigPictureInfo.likes;
    bigPictureModal.querySelector('.social__comment-total-count').textContent = bigPictureInfo.comments.length;

    const commentsNumber = commentsCounter();
    const commentsLength = bigPictureInfo.comments.length;
    if (commentsLength - commentIncrement >= 0) {
      shownComments.textContent = commentsNumber(commentIncrement);
      renderComments(bigPictureInfo.comments.slice(0,commentIncrement));
    } else {
      shownComments.textContent = commentsNumber(commentsLength);
      renderComments(bigPictureInfo.comments.slice(0,commentsLength));
    }

    document.addEventListener('keydown', onDocumentKeydown);

    commentsLoader.classList.add('hidden');
    body.classList.add('modal-open');
  }
}

function closeBigPictureModal () {
  bigPictureModal.classList.add('hidden');
  clearComments();

  document.removeEventListener('keydown', onDocumentKeydown);

  body.classList.remove('modal-open');
}

pictures.addEventListener('click', openBigPictureModal);

modalCloseButton.addEventListener('click', closeBigPictureModal);


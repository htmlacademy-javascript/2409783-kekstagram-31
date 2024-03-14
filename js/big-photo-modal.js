import {isEscapeKey} from './util.js';
import {publicationsList} from './generate-pictures.js';

const body = document.querySelector('body');
const pictures = document.querySelector('.pictures');
const bigPictureModal = document.querySelector('.big-picture');
const modalCloseButton = bigPictureModal.querySelector('.big-picture__cancel');
const comments = bigPictureModal.querySelector('.social__comments');
const shownComments = bigPictureModal.querySelector('.social__comment-shown-count');
const commentsLoader = bigPictureModal.querySelector('.social__comments-loader');

const commentIncrement = 5;

const eventListeners = {};

const commentsCounter = () => {
  let counter = 0;
  return function (val) {
    counter += val;
    return counter;
  };
};

const renderComments = (commentsList) => {
  const commentFragment = document.createDocumentFragment();

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

function loadMoreComments (commentsNumber, commentsLength, bigPictureInfo) {
  const newCommentsLength = commentsNumber(commentIncrement);
  if (commentsLength >= newCommentsLength) {
    shownComments.textContent = newCommentsLength;
    renderComments(bigPictureInfo.comments.slice(newCommentsLength - commentIncrement, newCommentsLength));
    commentsLoader.classList.remove('hidden');
  } else {
    shownComments.textContent = commentsLength;
    renderComments(bigPictureInfo.comments.slice(newCommentsLength - commentIncrement,commentsLength));
    commentsLoader.classList.add('hidden');
  }

  if (commentsLength === newCommentsLength) {
    commentsLoader.classList.add('hidden');
  }
}

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

    loadMoreComments(commentsNumber, commentsLength, bigPictureInfo);

    eventListeners.handleLoadMoreCommentsClick = function () {
      loadMoreComments(commentsNumber, commentsLength, bigPictureInfo);
    };

    commentsLoader.addEventListener('click', eventListeners.handleLoadMoreCommentsClick);

    eventListeners.onDocumentKeydown = function (keydownEvt) {
      if (isEscapeKey(keydownEvt)) {
        keydownEvt.preventDefault();
        closeBigPictureModal();
      }
    };

    document.addEventListener('keydown', eventListeners.onDocumentKeydown);

    body.classList.add('modal-open');
  }
}

function closeBigPictureModal () {
  bigPictureModal.classList.add('hidden');
  clearComments();

  commentsLoader.removeEventListener('click', eventListeners.handleLoadMoreCommentsClick);
  document.removeEventListener('keydown', eventListeners.onDocumentKeydown);

  body.classList.remove('modal-open');
}

pictures.addEventListener('click', openBigPictureModal);

modalCloseButton.addEventListener('click', closeBigPictureModal);


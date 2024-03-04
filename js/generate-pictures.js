import {createPublications} from './data.js';

const pictures = document.querySelector('.pictures');

const publicationTemplate = document.querySelector('#picture').content;
const publicationTemplateItem = publicationTemplate.querySelector('.picture');

const publications = createPublications();

const publicationFragment = document.createDocumentFragment();

publications.forEach(({url, description, likes, comments}) => {
  const publication = publicationTemplateItem.cloneNode(true);
  publication.querySelector('.picture__img').src = url;
  publication.querySelector('.picture__img').alt = description;
  publication.querySelector('.picture__likes').textContent = likes;
  publication.querySelector('.picture__comments').textContent = comments.length;
  publicationFragment.appendChild(publication);
});

pictures.appendChild(publicationFragment);

import {debounce, getUniqueRandomInteger} from './util';

const pictures = document.querySelector('.pictures');

const publicationTemplate = document.querySelector('#picture').content;
const publicationTemplateItem = publicationTemplate.querySelector('.picture');

const filter = document.querySelector('.img-filters');
const defaultFilter = filter.querySelector('#filter-default');
const randomFilter = filter.querySelector('#filter-random');
const discussedFilter = filter.querySelector('#filter-discussed');

let publicationsList;

const clearPublications = () => {
  const picturesList = pictures.querySelectorAll('.picture');

  for (let i = picturesList.length - 1; i >= 0; i--) {
    pictures.removeChild(picturesList[i]);
  }
};

const renderPublications = (publications) => {
  const publicationFragment = document.createDocumentFragment();

  publications.forEach(({id, url, description, likes, comments}) => {
    const publication = publicationTemplateItem.cloneNode(true);
    publication.dataset.pictureId = id;
    publication.querySelector('.picture__img').src = url;
    publication.querySelector('.picture__img').alt = description;
    publication.querySelector('.picture__likes').textContent = likes;
    publication.querySelector('.picture__comments').textContent = comments.length;
    publicationFragment.appendChild(publication);
  });

  clearPublications();
  pictures.appendChild(publicationFragment);
};

const renderPublicationsWithDebounce = debounce(renderPublications);

const comparePictures = (pictureA, pictureB) => {
  const commentsA = pictureA.comments.length;
  const commentsB = pictureB.comments.length;

  return commentsB - commentsA;
};

const createFiltersListeners = () => {
  let activeFilter = defaultFilter;
  let filteredPictures = [];

  const onDefaultFilterClick = () => {
    activeFilter.classList.remove('img-filters__button--active');
    defaultFilter.classList.add('img-filters__button--active');
    activeFilter = defaultFilter;
    renderPublicationsWithDebounce(publicationsList);
  };

  const onRandomFilterClick = () => {
    activeFilter.classList.remove('img-filters__button--active');
    randomFilter.classList.add('img-filters__button--active');
    activeFilter = randomFilter;
    const index = getUniqueRandomInteger(0,24);
    for (let i = 0; i < 10; i++) {
      const randomIndex = index();
      filteredPictures.push(publicationsList[randomIndex]);
    }
    renderPublicationsWithDebounce(filteredPictures);
    filteredPictures = [];
  };

  const onDiscussedFilterClick = () => {
    activeFilter.classList.remove('img-filters__button--active');
    discussedFilter.classList.add('img-filters__button--active');
    activeFilter = discussedFilter;
    filteredPictures = publicationsList.slice().sort(comparePictures);
    renderPublicationsWithDebounce(filteredPictures);
    filteredPictures = [];
  };

  return {
    onDefaultFilterClick,
    onRandomFilterClick,
    onDiscussedFilterClick
  };
};

const filterPublications = (publications) => {
  filter.classList.remove('img-filters--inactive');
  const filterListeners = createFiltersListeners();

  publicationsList = publications;
  renderPublications(publicationsList);

  defaultFilter.addEventListener('click', filterListeners.onDefaultFilterClick);

  randomFilter.addEventListener('click', filterListeners.onRandomFilterClick);

  discussedFilter.addEventListener('click', filterListeners.onDiscussedFilterClick);
};

export{publicationsList, renderPublications, filterPublications};

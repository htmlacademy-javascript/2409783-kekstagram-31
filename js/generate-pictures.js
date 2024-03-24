const pictures = document.querySelector('.pictures');

const publicationTemplate = document.querySelector('#picture').content;
const publicationTemplateItem = publicationTemplate.querySelector('.picture');

let publicationsList;

const renderPublications = (publications) => {
  const publicationFragment = document.createDocumentFragment();

  publicationsList = publications;

  publications.forEach(({id, url, description, likes, comments}) => {
    const publication = publicationTemplateItem.cloneNode(true);
    publication.dataset.pictureId = id;
    publication.querySelector('.picture__img').src = url;
    publication.querySelector('.picture__img').alt = description;
    publication.querySelector('.picture__likes').textContent = likes;
    publication.querySelector('.picture__comments').textContent = comments.length;
    publicationFragment.appendChild(publication);
  });

  pictures.appendChild(publicationFragment);
};

export{publicationsList, renderPublications};

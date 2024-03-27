import './generate-pictures.js';
import './big-photo-modal.js';
import {setUserFormSubmit} from './form.js';
import './photo-editor.js';

import {filterPublications} from './generate-pictures.js';
import {getData, errorShow} from './api.js';


getData.then((publications) => {
  filterPublications(publications);
})
  .catch(() => {
    errorShow();
  });

setUserFormSubmit();

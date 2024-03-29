import './generate-pictures.js';
import './big-photo-modal.js';
import {setUserFormSubmit} from './form-validation.js';
import './photo-editor.js';

import {filterPublications} from './generate-pictures.js';
import {getData, showError} from './api.js';


getData()
  .then((publications) => {
    filterPublications(publications);
  })
  .catch(() => {
    showError();
  });

setUserFormSubmit();

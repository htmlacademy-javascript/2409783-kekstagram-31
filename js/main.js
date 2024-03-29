import './generate-pictures.js';
import './big-photo-modal.js';
import {setUserFormSubmit} from './form.js';
import './photo-editor.js';

import {renderPublications} from './generate-pictures.js';
import {getData} from './api.js';


getData.then((publications) => {
  renderPublications(publications);
});

setUserFormSubmit();

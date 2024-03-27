const body = document.querySelector('body');
const errorTemplate = document.querySelector('#data-error').content;

const getData = fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  })
  .catch(() => {
    body.appendChild(errorTemplate);
    setTimeout(() => {
      const error = body.querySelector('.data-error');
      body.removeChild(error);
    }, 5000);
  });

const sendData = (requestBody) => fetch(
  'https://31.javascript.htmlacademy.pro/kekstagram',
  {
    method: 'POST',
    body: requestBody,
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
  })
  .catch(() => {
    throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
  });

export {getData, sendData};

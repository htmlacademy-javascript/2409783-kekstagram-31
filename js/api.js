const errorTemplate = document.querySelector('#data-error').content;

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const showError = () => {
  const body = document.querySelector('body');
  body.appendChild(errorTemplate);
  setTimeout(() => {
    const error = body.querySelector('.data-error');
    body.removeChild(error);
  }, 5000);
};

const request = async(url, errorText, method = Method.GET, body = null) => {
  const response = await fetch(url, {method, body});
  if (!response.ok) {
    throw new Error(errorText);
  }
  return response.json();
};

const sendData = async(requestBody) => request(
  `${BASE_URL}${Route.SEND_DATA}`, ErrorText.SEND_DATA, Method.POST, requestBody
);

const getData = async() => request(
  `${BASE_URL}${Route.GET_DATA}`, ErrorText.GET_DATA
);

export {getData, sendData, showError};

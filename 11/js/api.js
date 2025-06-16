const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const DELAY_TIME = 5000;

const dataErrorTemplate = document.querySelector('#data-error').content;

const showErrorMessage = () => {
  const errorElement = dataErrorTemplate.cloneNode(true);
  const errorMessage = errorElement.querySelector('.data-error');
  document.body.appendChild(errorMessage);
  setTimeout(() => {
    document.body.removeChild(errorMessage);
  }, DELAY_TIME);
  return errorMessage;
};


const getData = (onSuccess) => {
  fetch(`${BASE_URL}${Route.GET_DATA}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(showErrorMessage);
      }
      return response.json();
    })
    .then((photos) => onSuccess(photos))
    .catch((error) => showErrorMessage(error));
};

const sendData = (onSuccess, onFail, body) => {
  fetch(`${BASE_URL}${Route.SEND_DATA}`,
    {
      method: 'POST',
      body,
    },
  )
    .then(() => {
      onSuccess();
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };

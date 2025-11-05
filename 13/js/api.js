const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};


const load = async (route, method = Method.GET, body = null) => {
  try {
    const response = await fetch(`${BASE_URL}${route}`, {method, body});
    if (!response.ok) {
      throw new Error(`Произошла ошибка ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
};

const getData = () => load(Route.GET_DATA);
const sendData = (body) => load(Route.SEND_DATA, Method.POST, body);

export { getData, sendData };


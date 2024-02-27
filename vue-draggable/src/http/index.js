import axios from 'axios';
import store, { fetchBaseUrl } from '@/store';
const defaultConfig = {
  timeout: 5 * 1000
};

const instance = axios.create(Object.assign({}, defaultConfig));

instance.interceptors.request.use(
  async function (config) {
    let baseUrl = store.getters.finalBaseUrl;

    if (!baseUrl) {
      baseUrl = await fetchBaseUrl();
    }

    console.log('baseUrl-----请求触发', baseUrl);

    config.url = baseUrl + config.url;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default instance;

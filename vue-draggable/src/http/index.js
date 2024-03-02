import axios from 'axios';
import store, { fetchBaseUrl } from '@/store';
const defaultConfig = {
  timeout: 5 * 1000
};

const instance = axios.create(Object.assign({}, defaultConfig));

instance.interceptors.request.use(
  async function (config) {
    // 拦截器

    console.log('拦截器------');
    let baseUrl = store.getters.finalBaseUrl;

    if (!baseUrl) {
      console.log('here------');
      baseUrl = await fetchBaseUrl();
      store.commit('setBaseUrl', baseUrl); //触发一次存储
    }

    console.log('baseUrl-----请求触发', baseUrl);

    //这两种都可行
    // config.url = baseUrl + config.url;

    config.baseURL = baseUrl; //这里可以特定配置

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

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export const fetchBaseUrl = () =>
  new Promise((r) =>
    axios({
      url: '/baseUrl',
      method: 'get'
    })
      .then(() => {
        r('https://www.baidu.com');
      })
      .catch(() => {
        r('https://www.sina.com');
      })
  );

export default new Vuex.Store({
  state: {
    baseUrl: ''
  },
  getters: {
    finalBaseUrl(state) {
      return state.baseUrl;
    }
  },
  mutations: {
    setBaseUrl(state, payload) {
      state.baseUrl = payload;
    }
  },
  actions: {
    async getBaseUrl({ commit }) {
      const baseUrl = await fetchBaseUrl();
      console.log('baseUrl', baseUrl);

      commit('setBaseUrl', baseUrl);
    }
  },
  modules: {}
});

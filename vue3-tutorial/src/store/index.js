import { createStore } from 'vuex';
import { permissions } from '../mock/mock_permission';

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      menus: []
    };
  },
  mutations: {
    setMenus(state, payload) {
      state.menus.push(payload);
    }
  },
  actions: {
    collectMeuns({ commit }, payload) {
      commit('setMenus', payload);
    }
  },
  getters: {
    permissions() {
      return permissions;
    }
  }
});

export default store;

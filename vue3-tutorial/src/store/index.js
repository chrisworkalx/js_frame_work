import { createStore } from 'vuex';

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
  }
});

export default store;

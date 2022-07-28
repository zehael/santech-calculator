import { createStore } from "vuex";

export default createStore({
  state: {
    total: 0,
  },
  getters: {
    total: (s) => s.total,
  },
  mutations: {
    SET_TOTAL(state, payload: number) {
      state.total = payload;
    },
  },
  actions: {},
  modules: {},
});

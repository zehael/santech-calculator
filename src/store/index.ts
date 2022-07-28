import { createStore } from "vuex";
import { ICalcItem } from "@/types/Calc";
import DataService from "@/services/data-service";
import { ICalcResult } from "@/types/CalcResult";

const dataService = new DataService();

export default createStore({
  state: {
    calcItems: [] as ICalcItem[],
    calcResult: null as ICalcResult | null,
  },
  getters: {
    calcItems: (s) => s.calcItems,
    calcResult: (s) => s.calcResult,
  },
  mutations: {
    SET_CALC_ITEMS(state, payload: ICalcItem[]) {
      state.calcItems = payload;
    },
    SET_CALC_RESULT(state, payload: ICalcResult) {
      state.calcResult = payload;
    },
  },
  actions: {
    fetchCalcItems({ commit }) {
      const items = dataService.fetchCalcItems();
      commit("SET_CALC_ITEMS", items);
    },
  },
  modules: {},
});

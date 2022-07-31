import { createStore } from "vuex";
import { ICalcItem } from "@/types/Calc";
import DataService from "@/services/data-service";
import { ICalcResult, IMarkup } from "@/types/CalcResult";

const dataService = new DataService();

export default createStore({
  state: {
    calcItems: [] as ICalcItem[],
    calcResult: null as ICalcResult | null,
    markups: [] as IMarkup[],
  },
  getters: {
    calcItems: (s) => s.calcItems,
    calcResult: (s) => s.calcResult,
    markups: (s) => s.markups,
  },
  mutations: {
    SET_CALC_ITEMS(state, payload: ICalcItem[]) {
      state.calcItems = payload;
    },
    SET_CALC_RESULT(state, payload: ICalcResult) {
      state.calcResult = payload;
    },
    SET_MARKUPS(state, payload: IMarkup[]) {
      state.markups = payload;
    },
  },
  actions: {
    fetchCalcItems({ commit }) {
      const items = dataService.fetchCalcItems();
      commit("SET_CALC_ITEMS", items);
    },
    fetchMarkups({ commit }) {
      const markups = dataService.fetchMarkups();
      commit("SET_MARKUPS", markups);
    },
  },
  modules: {},
});

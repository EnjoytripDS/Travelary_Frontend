import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import QnaBoardStore from "@/store/modules/QnaBoard";
import UserStore from "@/store/modules/User";
import TripPlanStore from "@/store/modules/TripPlan";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    QnaBoardStore,
    UserStore,
    TripPlanStore,
  },
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
      paths: ["UserStore"],
    }),
  ],
  state: {},
  mutations: {},
  actions: {},
  getters: {},
});

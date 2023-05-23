import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const TripPlanStore = {
  namespaced: true,
  state: {
    trip: {
      tripName: "",
    },
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
};

export default TripPlanStore;

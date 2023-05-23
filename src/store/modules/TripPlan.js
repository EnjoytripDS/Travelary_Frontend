import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import qs from "qs";

Vue.use(Vuex);
const REST_API = "http://localhost:9999/api/v1";
const TripPlanStore = {
  namespaced: true,
  state: {
    guguns: [],
    sidoCode: "",
    trip: {
      tripName: "",
    },
  },
  getters: {},
  mutations: {
    SET_GUGUN_LIST(state, guguns) {
      state.guguns = [];
      state.guguns.push({ value: 0, text: "전체 구/군" });
      guguns.forEach((gugun) => {
        state.guguns.push({
          value: gugun.gugunCode,
          text: gugun.gugunName,
        });
      });
    },
  },
  actions: {
    getGugun({ commit }, sidoCode) {
      // console.log("액션 들어옴" + sidoCode);
      const API_URI = `${REST_API}/search/${sidoCode}/gugun`;
      axios({
        url: API_URI,
        method: "get",
      })
        .then((res) => {
          commit("SET_GUGUN_LIST", res.data.data);
        })
        .catch((err) => {
          console.log("ERROR!!: " + err);
        });
    },
    searchAttractions({ commit }, searchConditions) {
      const API_URI = `${REST_API}/search`;
      axios({
        url: API_URI,
        method: "get",
        params: {
          contentTypeId: searchConditions.contentTypeId,
          sidoCode: searchConditions.sidoCode,
          gugunCode: searchConditions.gugunCode,
          keyword: searchConditions.keyword,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params);
        },
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log("ERROR!!: " + err);
        });
      commit("SEARCH_ATTRACTIONS", searchConditions);
    },
  },
  modules: {},
};

export default TripPlanStore;

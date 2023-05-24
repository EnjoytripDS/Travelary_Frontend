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
    tripDates: [],
    selectedAttractions: [],
    trip: {
      tripName: "",
      tripFirstDate: "",
      tripLastDate: "",
      numberOfDays: 1,
      tripAttractions: [],
      tripOrderByAttr: [{ contentId: 0, dayByAttraction: 0, orderByDay: 0 }],
    },
    searchResults: [],
  },
  getters: {
    calNumberOfDays(state) {
      const date1 = new Date(state.trip.tripFirstDate);
      const date2 = new Date(state.trip.tripLastDate);
      const timeDiff = Math.abs(date2.getTime() - date1.getTime());
      // 일 수로 변환
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if (!daysDiff) {
        state.trip.numberOfDays = 1;
        return 1;
      } else {
        state.trip.numberOfDays = daysDiff + 1;
        return daysDiff + 1;
      }
    },
  },
  mutations: {
    // ADD_DAY_ORDER_BY_ATTRACTION(state, attractionItem) {
    //   let tripOrder = {

    //   };

    // },

    UPDATE_DATES(state, newDates) {
      if (newDates[0] > newDates[1]) {
        state.trip.tripFirstDate = newDates[1];
        state.trip.tripLastDate = newDates[0];
      } else {
        state.trip.tripFirstDate = newDates[0];
        state.trip.tripLastDate = newDates[1];
      }
      state.tripDates.splice(0, 1, newDates);
    },
    ADD_TRIP_ATTRACTION(state, attractionItem) {
      state.selectedAttractions.push(attractionItem);
    },
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
    SEARCH_ATTRACTIONS(state, results) {
      console.log(results.data); //
      state.searchResults = results.data;
    },
  },
  actions: {
    addTimeLines({ commit }, attractionItem) {
      commit;
      // commit("ADD_DAY_ORDER_BY_ATTRACTION", attractionItem);
      console.log(attractionItem);
    },
    addPlan({ commit }, attractionItem) {
      commit("ADD_TRIP_ATTRACTION", attractionItem);
    },
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
          contentTypeId: searchConditions.contentTypeId.join(","),
          sidoCode: searchConditions.sidoCode,
          gugunCode: searchConditions.gugunCode,
          keyword: searchConditions.keyword,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params);
        },
      })
        .then((res) => {
          console.log(res.data); //
          commit("SEARCH_ATTRACTIONS", res.data);
        })
        .catch((err) => {
          console.log("ERROR!!: " + err);
        });
    },
  },
  modules: {},
};

export default TripPlanStore;

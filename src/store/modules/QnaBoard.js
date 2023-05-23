import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "@/router";

import Store from "@/store";

Vue.use(Vuex);

const REST_API = "http://localhost:9999/api/v1";
const QnaBoardStore = {
  namespaced: true,
  state: {
    qnaBoards: [],
    qnaBoard: {},
  },
  getters: {},
  mutations: {
    CREATE_QNA_BOARD(state, qnaBoard) {
      state.qnaBoards.push(qnaBoard);
    },
    GET_QNA_BOARDS(state, qnaBoards) {
      state.qnaBoards = qnaBoards;
    },
    GET_QNA_BOARD_DETAIL(state, qnaBoard) {
      state.qnaBoard = qnaBoard;
    },
    UPDATE_QNA_BOARD(state, qnaBoard) {
      state.qnaBoard = qnaBoard;
    },
    DELETE_QNA_BOARD() { },
    GET_SEARCHED_QNA_BOARDS(state, qnaBoards) {
      state.qnaBoards = qnaBoards;
    },
  },
  actions: {
    async createQnaBoard({commit}, qnaBoard) {
      const API_URI = `${REST_API}/qna-board`;
      await axios({
        url: API_URI,
        method: "post",
        data: qnaBoard,
      }).then(() => {
        commit("CREATE_QNA_BOARD", qnaBoard);
        router.push("/qna-board");
      }).catch(() => {
        alert("모든 항목을 작성해주세요");
      });
    },
    async getQnaBoards({ commit }) {
      const API_URI = `${REST_API}/qna-board`;
      const accessToken = sessionStorage.getItem("access-token");
      await axios({
        url: API_URI,
        method: "get",
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      }).then((res) => {
        if (res.data.success == true)
          commit("GET_QNA_BOARDS", res.data.data);
        else
          alert("리스트를 불러올 수 없습니다");
      }).catch(() => {
        console.log(3);
        Store.commit("UserStore/SET_IS_VALID_TOKEN", false);
        Store.dispatch("UserStore/tokenRegeneration");
      });
    },
    searchQnaBoards({ commit }, payload) {
      const API_URI = `${REST_API}/qna-board/search`;
      const { mode, keyword } = payload;
      axios({
        url: API_URI,
        params: {
          mode,
          keyword,
        },
        method: "get",
      }).then((res) => {
        commit("GET_SEARCHED_QNA_BOARDS", res.data);
      });
    },
    getQnaBoardDetail({ commit }, id) {
      const API_URI = `${REST_API}/qna-board/${id}`;
      axios({
        url: API_URI,
        method: "get",
      }).then((res) => {
        commit("GET_QNA_BOARD_DETAIL", res.data);
      });
    },
    updateQnaBoard({ commit }, qnaBoard) {
      const API_URI = `${REST_API}/qna-board/${qnaBoard.id}`;
      axios({
        url: API_URI,
        method: "put",
        data: qnaBoard,
      }).then(() => {
        commit("UPDATE_QNA_BOARD", qnaBoard);
        router.push({ name: "qnaboard-detail", params: { no: qnaBoard.id } });
      }).catch(() => {
        alert("모든 항목을 작성해주세요");
      });
    },
    deleteQnaBoard({ commit }, id) {
      const API_URI = `${REST_API}/qna-board/${id}`;
      axios({
        url: API_URI,
        method: "delete",
      }).then(() => {
        commit;
        router.push({ name: "qnaboard-list" });
      });
    },
  },
  modules: {},
};

export default QnaBoardStore;
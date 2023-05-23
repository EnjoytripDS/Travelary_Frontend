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
    SET_QNA_BOARDS(state, qnaBoards) {
      state.qnaBoards = qnaBoards;
    },
    SET_QNA_BOARD_DETAIL(state, qnaBoard) {
      state.qnaBoard = qnaBoard;
    },
    UPDATE_QNA_BOARD(state, qnaBoard) {
      state.qnaBoard = qnaBoard;
    },
    DELETE_QNA_BOARD(state) {
      state.qnaBoard = {};
    },
    SET_SEARCHED_QNA_BOARDS(state, qnaBoards) {
      state.qnaBoards = qnaBoards;
    },
  },
  actions: {
    async createQnaBoard({ commit }, qnaBoard) {
      const API_URI = `${REST_API}/qna-board`;
      axios.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
      await axios({
        url: API_URI,
        method: "post",
        data: qnaBoard,
      }).then((res) => {
        if (res.data.success == true)
          commit("CREATE_QNA_BOARD", qnaBoard);
        else
          alert("작성 실패");
        router.push("/qna-board");
      }).catch(() => {
        Store.commit("UserStore/SET_IS_VALID_TOKEN", false);
        Store.dispatch("UserStore/tokenRegeneration");
      });
    },
    async getQnaBoards({ commit }) {
      const API_URI = `${REST_API}/qna-board`;
      axios.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
      await axios({
        url: API_URI,
        method: "get",
      }).then((res) => {
        if (res.data.success == true)
          commit("SET_QNA_BOARDS", res.data.data);
        else
          alert("리스트를 불러올 수 없습니다");
      }).catch(() => {
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
        commit("SET_SEARCHED_QNA_BOARDS", res.data);
      });
    },
    getQnaBoardDetail({ commit }, id) {
      const API_URI = `${REST_API}/qna-board/${id}`;
      axios.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
      axios({
        url: API_URI,
        method: "get",
      }).then((res) => {
        if (res.data.success == true)
          commit("SET_QNA_BOARD_DETAIL", res.data.data);
        else
          alert("게시글을 불러올 수 없습니다");
      }).catch(() => {
        Store.commit("UserStore/SET_IS_VALID_TOKEN", false);
        Store.dispatch("UserStore/tokenRegeneration");
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
      axios.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
      axios({
        url: API_URI,
        method: "delete",
      }).then((res) => {
        if (res.data.success == true)
          commit("DELETE_QNA_BOARD");
        else
          alert("게시글을 삭제할 수 없습니다");
        router.push({ name: "qnaboard-list" });
      }).catch(() => {
        Store.commit("UserStore/SET_IS_VALID_TOKEN", false);
        Store.dispatch("UserStore/tokenRegeneration");
      });
    },
  },
  modules: {},
};

export default QnaBoardStore;
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
    boardComments: [{
      boardComment: {},
      inUpdate: 0,
    }],
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
    SET_BOARD_COMMENTS(state, boardComments) {
      boardComments.forEach((item) => {
        state.boardComments.push({ boardComment: item, inUpdate: 0 });
      });
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
      axios.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
      const { mode, keyword } = payload;
      axios({
        url: API_URI,
        params: {
          mode,
          keyword,
        },
        method: "get",
      }).then((res) => {
        if (res.data.success == true)
          commit("SET_SEARCHED_QNA_BOARDS", res.data.data);
        else
          alert("리스트를 불러올 수 없습니다");
      }).catch(() => {
        Store.commit("UserStore/SET_IS_VALID_TOKEN", false);
        Store.dispatch("UserStore/tokenRegeneration");
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
      axios.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
      axios({
        url: API_URI,
        method: "put",
        data: qnaBoard,
      }).then((res) => {
        if (res.data.success == true)
          commit("UPDATE_QNA_BOARD", qnaBoard);
        else
          alert("게시글을 수정할 수 없습니다");
        router.push({ name: "qnaboard-detail", params: { no: qnaBoard.id } });
      }).catch(() => {
        Store.commit("UserStore/SET_IS_VALID_TOKEN", false);
        Store.dispatch("UserStore/tokenRegeneration")
      });
    },
    deleteQnaBoard({ commit }, id) {
      const API_URI = `${REST_API}/qna-board/${id}`;
      axios.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
      axios({
        url: API_URI,
        method: "delete",
      }).then((res) => {
        if (res.data.success == true) {
          commit("DELETE_QNA_BOARD");
          alert("게시글이 삭제되었습니다");
        }
        else
          alert("게시글을 삭제할 수 없습니다");
        router.push({ name: "qnaboard-list" });
      }).catch(() => {
        Store.commit("UserStore/SET_IS_VALID_TOKEN", false);
        Store.dispatch("UserStore/tokenRegeneration");
      });
    },
    async createBoardComment({ dispatch }, boardComment) {
      const API_URI = `${REST_API}/qna-board/${boardComment.id}/comment`;
      axios.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
      let requestComment = {
        nickname: boardComment.nickname,
        content: boardComment.content,
      }
      await axios({
        url: API_URI,
        method: "post",
        data: requestComment,
      }).then((res) => {
        if (res.data.success == true)
          dispatch("getBoardComments", boardComment.id);
        else
          alert("작성 실패");
      }).catch(() => {
        Store.commit("UserStore/SET_IS_VALID_TOKEN", false);
        Store.dispatch("UserStore/tokenRegeneration");
      });
    },
    getBoardComments({ commit }, boardId) {
      const API_URI = `${REST_API}/qna-board/${boardId}/comment`;
      axios.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
      axios({
        url: API_URI,
        method: "get",
      }).then((res) => {
        if (res.data.success == true)
          commit("SET_BOARD_COMMENTS", res.data.data);
        else
          alert("댓글을 불러올 수 없습니다 ㅠㅠ");
      }).catch(() => {
        Store.commit("UserStore/SET_IS_VALID_TOKEN", false);
        Store.dispatch("UserStore/tokenRegeneration");
      });
    },
    updateBoardComment({ dispatch }, boardComment) {
      const API_URI = `${REST_API}/qna-board/${boardComment.boardId}/comment/${boardComment.id}`;
      axios.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
      let req = {
        content: boardComment.content,
        nickname: boardComment.nickname,
      }
      axios({
        url: API_URI,
        method: "put",
        data: req,
      }).then((res) => {
        if (res.data.success == true)
          dispatch("getBoardComments", boardComment.boardId);
        else
          alert("댓글을 수정할 수 없습니다");
      }).catch(() => {
        Store.commit("UserStore/SET_IS_VALID_TOKEN", false);
        Store.dispatch("UserStore/tokenRegeneration")
      });
    },
    deleteBoardComment({ dispatch }, ids) {
      const API_URI = `${REST_API}/qna-board/${ids.boardId}/comment/${ids.commentId}`;
      axios.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
      axios({
        url: API_URI,
        method: "delete",
      }).then((res) => {
        if (res.data.success == true) {
          dispatch("getBoardComments", ids.boardId);
          alert("댓글이 삭제되었습니다");
        }
        else
          alert("댓글을 삭제할 수 없습니다");
      }).catch(() => {
        Store.commit("UserStore/SET_IS_VALID_TOKEN", false);
        Store.dispatch("UserStore/tokenRegeneration");
      });
    },
  },
  modules: {},
};

export default QnaBoardStore;
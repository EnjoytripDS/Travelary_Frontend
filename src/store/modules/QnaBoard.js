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
    boardImages: [],
    imgUrls: [],
  },
  getters: {},
  mutations: {
    SET_QNA_BOARDS(state, qnaBoards) {
      state.qnaBoards = qnaBoards;
    },
    SET_QNA_BOARD_DETAIL(state, qnaBoard) {
      state.imgUrls.length = 0;
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
      state.boardComments.length = 0;
      boardComments.forEach((item) => {
        state.boardComments.push({ boardComment: item, inUpdate: 0 });
      });
    },
    SET_BOARD_IMAGES(state, boardImages) {
      state.imgUrls.length = 0;
      state.boardImages = boardImages;
      boardImages.forEach((item) => {
        state.imgUrls.push("http://localhost:9999" + item.imageUrl);
      });
    },
    SET_IMAGE_NULLS(state) {
      state.imgUrls.length = 0;
      state.boardImages.length = 0;
    },
  },
  actions: {
    async createQnaBoard({ dispatch }, qnaBoard) {
      const API_URI = `${REST_API}/qna-board`;
      axios.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
      let req = {
        title: qnaBoard.title,
        nickname: qnaBoard.nickname,
        content: qnaBoard.content,
      }
      await axios({
        url: API_URI,
        method: "post",
        data: req,
      }).then((res) => {
        if (res.data.success == true) {
          if(qnaBoard.uploadFile != null) {
              let uploadReq = {
                uploadFile: qnaBoard.uploadFile,
                id: res.data.data,
              };
              dispatch("uploadBoardImage", uploadReq);
          }
        }
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
    async deleteQnaBoard({ commit }, id) {
      const API_URI = `${REST_API}/qna-board/${id}`;
      axios.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
      await axios({
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
    uploadBoardImage({ commit }, uploadReq) {
      const API_URI = `${REST_API}/qna-board/${uploadReq.id}/image`;
      axios.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
      var formData = new FormData();
      for(let i = 0; i < uploadReq.uploadFile.length; i++) {
        formData.append("uploadFile", uploadReq.uploadFile[i]);
      }
      axios({
        url: API_URI,
        method: "post",
        data: formData,
      }).then((res) => {
        if (res.data.success == true)
          commit;
        else
          alert("파일을 업로드 할 수 없습니다!");
      }).catch(() => {
        Store.commit("UserStore/SET_IS_VALID_TOKEN", false);
        Store.dispatch("UserStore/tokenRegeneration");
      });
    },
    getBoardImage({ commit }, id) {
      const API_URI = `${REST_API}/qna-board/${id}/image`;
      axios.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
      axios({
        url: API_URI,
        method: "get",
      }).then((res) => {
        if (res.data.success == true) {
          commit("SET_BOARD_IMAGES", res.data.data);
        }
        else {
          alert("파일을 불러 올 수 없습니다!");
        }
      }).catch(() => {
        Store.commit("UserStore/SET_IS_VALID_TOKEN", false);
        Store.dispatch("UserStore/tokenRegeneration");
      });
    },
    deleteBoardAllImage({ commit }, id) {
      const API_URI = `${REST_API}/qna-board/${id}/image`;
      axios.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
      axios({
        url: API_URI,
        method: "delete",
      }).then((res) => {
        if (res.data.success == true) {
          commit("SET_IMAGE_NULLS");
        }
        else
          alert("이미지들을 삭제할 수 없습니다");
      }).catch(() => {
        Store.commit("UserStore/SET_IS_VALID_TOKEN", false);
        Store.dispatch("UserStore/tokenRegeneration");
      });
    },
  },
  modules: {},
};

export default QnaBoardStore;
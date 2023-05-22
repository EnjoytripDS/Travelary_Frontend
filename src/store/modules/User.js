import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "@/router";

Vue.use(Vuex);

const REST_API = "http://localhost:9999/api/v1";
const UserStore = {
    namespaced: true,
    state: {
        users: [],
        user: {},
        sessionId: null,
        userId: null,
    },
    getters: {

    },
    mutations: {
        SET_LOGIN_USER(state, userId) {
            state.userId = userId
        },
        SET_SESSION_ID(state, sessionId) {
            state.sessionId = sessionId;
        },
        GET_USER(state, user) {
            state.user = user;
        },
        LOGOUT(state) {
            state.user = null;
            state.userId = null;
            state.sessionId = null;
        },
        UPDATE_USER(state, moduser) {
            state.user.nickname = moduser.nickname;
            state.user.email =  moduser.email;
        },
        DELETE_USER(state) {
            state.user = null;
            state.sessionId = null;
        },
    },
    actions: {
        async createUser({ commit }, newUser) {
            const API_URI = `${REST_API}/user`;
            await axios({
                url: API_URI,
                method: "post",
                data: newUser,
            }).then(() => {
                commit;
                router.push({name : "register-check"});
            }).catch((error) => {
                if(error.response.data.status == "400")
                    alert("빈 칸을 모두 채워주세요");
                else if(error.response.data.status == "801")
                    alert("중복된 이메일입니다");
                else if(error.response.data.status == "802")
                    alert("중복된 닉네임입니다");
            });
        },
        async setLoginUser({ commit }, user) {
            const API_URI = `${REST_API}/user/login`;
            await axios({
                url: API_URI,
                method: "post",
                data: user,
            }).then((response) => {
                if (response.data.success == true)
                {
                    const sessionId = response.data.data.jsessionId;
                    const userId = response.data.data.userId;
                    commit("SET_SESSION_ID", sessionId);
                    commit("SET_LOGIN_USER", userId);
                    router.push({ name: "home" }).catch(() => { });
                }
                else {
                    if (response.data.error.code == "USER_NOT_FOUND")
                        alert("가입되지 않은 계정입니다.");
                    else if (response.data.error.code == "PASSWORD_NOT_MATCHED")
                        alert("잘못된 비밀번호입니다.");
                }
            }).catch(() => {
                alert("잘못된 입력 형식입니다.");
            });
        },
        getUser({ commit }, id) {
            const API_URI = `${REST_API}/user/${id}`;
            axios({
                url: API_URI,
                method: "get",
            }).then((res) => {
                commit("GET_USER", res.data);
            });
        },
        updateUser({ commit }, modUser) {
            const API_URI = `${REST_API}/user/${modUser.id}`;
            let upUser = {
                email: modUser.email,
                nickname: modUser.nickname,
            };
            axios({
                url: API_URI,
                method: "put",
                data: upUser,
            }).then(() => {
                commit("UPDATE_USER", upUser);
                alert("수정 완료되었습니다!");
            }).catch(() => {
                alert("이미 있는 닉네임입니다");
            });
        },
        deleteUser({ commit }, dropUserInfo) {
            const API_URI = `${REST_API}/user/${dropUserInfo.id}`;
            axios({
                url: API_URI,
                method: "delete",
                data: dropUserInfo.password,
            }).then(() => {
                commit("DELETE_USER");
                alert("회원 탈퇴가 완료되었습니다");
                router.push({ name: "home" });
            }).catch(() => {
                alert("잘못된 비밀번호 입니다");
            });
        },
        logout({ commit }) {
            const API_URI = `${REST_API}/user/logout`;
            axios({
                url: API_URI,
                method: "post",
            }).then(() => {
                commit("LOGOUT");
                alert("로그아웃 완료");
                router.push({ name: "home" }).catch(() => { });
            }).catch(() => {
                alert("로그아웃 실패");
            });
        },
    },
    modules: {

    },
};

export default UserStore;
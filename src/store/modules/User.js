import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "@/router";
import jwtDecode from "jwt-decode";

Vue.use(Vuex);

const REST_API = "http://localhost:9999/api/v1";
const UserStore = {
    namespaced: true,
    state: {
        users: [],
        user: null,
        isLogin: false,
        isLoginError: false,
        isValidToken: false,
    },
    getters: {
        checkUserInfo(state) {
          return state.user;
        },
        checkToken(state) {
          return state.isValidToken;
        },
    },
    mutations: {
        SET_IS_LOGIN(state, isLogin) {
            state.isLogin = isLogin;
        },
        SET_IS_LOGIN_ERROR(state, isLoginError) {
            state.isLoginError = isLoginError;
        },
        SET_IS_VALID_TOKEN(state, isValidToken) {
            state.isValidToken = isValidToken;
        },
        SET_USER(state, userInfo) {
            state.isLogin = true;
            state.user = userInfo;
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
                if (response.data.message === "success") {
                    let accessToken = response.data["access-token"];
                    let refreshToken = response.data["refresh-token"];
                    commit("SET_IS_LOGIN", true);
                    commit("SET_IS_LOGIN_ERROR", false);
                    commit("SET_IS_VALID_TOKEN", true);
                    sessionStorage.setItem("access-token", accessToken);
                    sessionStorage.setItem("refresh-token", refreshToken);
                } else {
                    commit("SET_IS_LOGIN", false);
                    commit("SET_IS_LOGIN_ERROR", true);
                    commit("SET_IS_VALID_TOKEN", false);
                    alert("로그인 실패");
                }
            }).catch(() => {
                alert("아이디 혹은 비밀번호를 확인해 주세요");
                router.push({name : "login"}).catch(() => {});
            });
        },
        async tokenRegeneration({ commit, state }) {
            const API_URI = `${REST_API}/user/refresh`;
            axios.defaults.headers["refresh-token"] = sessionStorage.getItem("refresh-token");
            await axios({
                url: API_URI,
                method: "post",
                data: state.user,
            }).then((response) => {
                if (response.data.message === "success") {
                    let accessToken = response.data["access-token"];
                    sessionStorage.setItem("access-token", accessToken);
                    commit("SET_IS_VALID_TOKEN", true);
                }
            }).catch((error) => {
                if (error.response.data.status === 401) {
                    const API_URI_E = `${REST_API}/user/logout/${state.user.id}`;
                    axios({
                        url: API_URI_E,
                        method: "get",
                    }).then((response) => {
                        if (response.data.message === "success") {
                            commit("SET_IS_LOGIN", false);
                            commit("SET_USER", null);
                            commit("SET_IS_VALID_TOKEN", false);
                            alert("만료되었습니다. 다시 로그인 해 주세요");
                        } else {
                            alert("잘못된 요청");
                        }
                        router.push({ name: "home" }).catch(() => {});
                    }).catch(() => {
                        alert("로그아웃 실패");
                        commit("SET_IS_LOGIN", false);
                        commit("SET_USER", null);
                    });
                }
            });
        },
        getUser({ commit, dispatch }, token) {
            let decodeToken = jwtDecode(token);
            axios.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
            const API_URI = `${REST_API}/user/${decodeToken.userid}`;
            axios({
                url: API_URI,
                method: "get",
            }).then((res) => {
                if (res.data.message === "success") {
                    commit("SET_USER", res.data.userInfo);
                } else {
                    alert("유저 정보 없음");
                }
            }).catch(() => {
                commit("SET_IS_VALID_TOKEN", false);
                dispatch("tokenRegeneration");
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
        async logout({ commit }, userid) {
            const API_URI = `${REST_API}/user/logout/${userid}`;
            await axios({
                url: API_URI,
                method: "get",
            }).then((response) => {
                if (response.data.message === "success") {
                    commit("SET_IS_LOGIN", false);
                    commit("SET_USER", null);
                    commit("SET_IS_VALID_TOKEN", false);
                    alert("로그아웃 완료");
                } else {
                    alert("잘못된 요청");
                }
                router.push({ name: "home" }).catch(() => {});
            }).catch(() => {
                alert("로그아웃 실패");
            });
        },
    },
    modules: {

    },
};

export default UserStore;
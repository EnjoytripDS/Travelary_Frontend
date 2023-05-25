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
            state.isLogin = false;
            state.isLoginError = false;
            state.isValidToken = false;
        },
    },
    actions: {
        async createUser({ commit }, newUser) {
            const API_URI = `${REST_API}/user`;
            await axios({
                url: API_URI,
                method: "post",
                data: newUser,
            }).then((response) => {
                if (response.data.success == true) {
                    commit;
                    alert("회원 가입이 완료되었습니다!! 환영합니다!!");
                    router.push({name : "login"});
                }
                else {
                    if (response.data.error.code == "DUPLICATED_EMAIL")
                        alert("중복된 이메일입니다. 다른 이메일로 작성해 주세요");
                    else if (response.data.error.code == "DUPLICATED_NICKNAME")
                        alert("중복된 닉네임입니다. 다른 닉네임으로 정해 주세요");
                }
            }).catch(() => {
                    alert("입력한 항목들의 형식이 올바른지 확인해주세요");
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
                    let accessToken = response.data.data["access-token"];
                    let refreshToken = response.data.data["refresh-token"];
                    commit("SET_IS_LOGIN", true);
                    commit("SET_IS_LOGIN_ERROR", false);
                    commit("SET_IS_VALID_TOKEN", true);
                    sessionStorage.setItem("access-token", accessToken);
                    sessionStorage.setItem("refresh-token", refreshToken);
                }
                else {
                    if (response.data.error.code == "USER_NOT_FOUND")
                        alert("가입되지 않은 계정입니다.");
                    else if (response.data.error.code == "PASSWORD_NOT_MATCHED")
                        alert("비밀번호가 다릅니다.");
                    else
                        alert("로그인에 실패했습니다.");
                }
            }).catch(() => {
                alert("로그인에 실패했습니다.");
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
                if (response.data.success == true) {
                    let accessToken = response.data.data["access-token"];
                    sessionStorage.setItem("access-token", accessToken);
                    commit("SET_IS_VALID_TOKEN", true);
                }
            }).catch(() => {
                // if (error.data.error === "UN_AUTHENTICATED") {
                    const API_URI_E = `${REST_API}/user/logout/${state.user.id}`;
                    axios({
                        url: API_URI_E,
                        method: "get",
                    }).then((response) => {
                        if (response.data.success == true) {
                            commit("SET_IS_LOGIN", false);
                            commit("SET_USER", null);
                            commit("SET_IS_VALID_TOKEN", false);
                            alert("만료되었습니다. 다시 로그인 해 주세요");
                        } else {
                            commit("SET_IS_LOGIN", false);
                            commit("SET_USER", null);
                            commit("SET_IS_VALID_TOKEN", false);
                            alert("만료되었습니다. 다시 로그인 해 주세요");
                        }
                        router.push({ name: "home" }).catch(() => {});
                    }).catch(() => {
                        alert("로그아웃에 실패했습니다");
                        commit("SET_IS_LOGIN", false);
                        commit("SET_USER", null);
                        commit("SET_IS_VALID_TOKEN", false);
                    });
                // }
            });
        },
        async getUser({ commit, dispatch }, token) {
            let decodeToken = jwtDecode(token);
            axios.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
            const API_URI = `${REST_API}/user/${decodeToken.userid}`;
            await axios({
                url: API_URI,
                method: "get",
            }).then((res) => {
                if (res.data.success == true)
                    commit("SET_USER", res.data.data.userInfo);
                else
                    alert("마이페이지를 불러오는데 실패했습니다");
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
            }).then((response) => {
                if (response.data.success == true)
                {
                    commit("UPDATE_USER", upUser);
                    alert("수정 완료되었습니다!");
                }
                else
                    alert("이미 존재하는 닉네임입니다");
            }).catch(() => {
                alert("수정에 실패했습니다");
            });
        },
        updatePwd({ state }, userPwd) {
            const API_URI = `${REST_API}/user/password}`;
            let upPwd = {
                userId: state.userId,
                curPwd: userPwd.curPwd,
                newPwd: userPwd.newPwd,
            };
            axios({
                url: API_URI,
                method: "put",
                data: upPwd,
            }).then((response) => {
                if (response.data.success == true)
                    alert("수정 완료되었습니다!");
                else
                    alert("현재 비밀번호가 틀렸습니다");
            }).catch(() => {
                alert("비밀번호 형식을 확인해주세요");
            });
        },
        deleteUser({ commit }, dropUserInfo) {
            const API_URI = `${REST_API}/user/${dropUserInfo.id}`;
            axios({
                url: API_URI,
                method: "delete",
                data: dropUserInfo.password,
            }).then((response) => {
                if (response.data.success == true) {
                    commit("DELETE_USER");
                    alert("회원 탈퇴가 완료되었습니다. 언젠가 다시 만나요!");
                    router.push({ name: "home" }).catch(() => { });
                }
                else {
                    alert("비밀번호가 다릅니다");
                }
            }).catch(() => {
                alert("요청에 실패했습니다");
            });
        },
        async logout({ commit }, userid) {
            const API_URI = `${REST_API}/user/logout/${userid}`;
            await axios({
                url: API_URI,
                method: "get",
            }).then((response) => {
                if (response.data.success == true) {
                    commit("SET_IS_LOGIN", false);
                    commit("SET_USER", null);
                    commit("SET_IS_VALID_TOKEN", false);
                    alert("로그아웃 완료");
                } else {
                    alert("로그아웃에 실패했습니다");
                }
                router.push({ name: "home" }).catch(() => { });
            }).catch(() => {
                commit("SET_IS_LOGIN", false);
                commit("SET_USER", null);
                commit("SET_IS_VALID_TOKEN", false);
                alert("요청에 실패했습니다. 다시 로그인 해 주세요");
            })
        },
        dupEmailCheck({ commit }, reqemail) {
            const API_URI = `${REST_API}/user/check/email`;
            const reqEmail = {
                email: reqemail,
            }
            axios({
                url: API_URI,
                method: "post",
                data: reqEmail,
            }).then((response) => {
                if (response.data.success == true) {
                    commit;
                    alert("사용 가능한 이메일입니다!");
                }
                else {
                    alert("이미 사용 중인 이메일입니다!")
                }
            }).catch(() => {
                alert("이메일 형식을 맞춰 주세요");
            });
        },
        dupNicknameCheck({ commit }, reqnickname) {
            const API_URI = `${REST_API}/user/check/nickname`;
            const reqNickname = {
                nickname: reqnickname,
            }
            axios({
                url: API_URI,
                method: "post",
                data: reqNickname,
            }).then((response) => {
                if (response.data.success == true) {
                    commit;
                    alert("사용 가능한 닉네임입니다!");
                }
                else {
                    alert("이미 사용 중인 닉네임입니다!")
                }
            }).catch(() => {
                alert("닉네임 형식을 맞춰 주세요");
            });
        }
    },
    modules: {

    },
};

export default UserStore;
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
        userId: null,
    },
    getters: {

    },
    mutations: {
        SET_USER_ID(state, userId) {
            state.userId = userId;
        },
        SET_USER(state, user) {
            state.user = user;
        },
        LOGOUT(state) {
            state.user = null;
            state.userId = null;
        },
        UPDATE_USER(state, moduser) {
            state.user.nickname = moduser.nickname;
            state.user.email =  moduser.email;
        },
        DELETE_USER(state) {
            state.user = null;
            state.userId = null;
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
                    router.push({name : "register-check"});
                }
                else {
                    if (response.data.error.code == "DUPLICATED_EMAIL")
                        alert("중복된 이메일입니다. 다른 이메일로 작성해 주세요");
                    else if (response.data.error.code == "DUPLICATED_NICKNAME")
                        alert("중복된 닉네임입니다. 다른 닉네임으로 정해 주세요");
                }
            }).catch(() => {
                    alert("형식을 확인해주세요");
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
                    const userId = response.data.data.userId;
                    commit("SET_USER_ID", userId);
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
                if (res.data.success == true)
                    commit("SET_USER", res.data.data);
                else
                    alert("잘못된 요청입니다.");
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
                alert("잘못된 요청입니다");
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
                    alert("회원 탈퇴가 완료되었습니다");
                    router.push({ name: "home" }).catch(() => { });
                }
                else {
                    alert("잘못된 비밀번호 입니다");
                }
            }).catch(() => {
                alert("잘못된 요청입니다");
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
                alert("잘못된 형식입니다");
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
                alert("잘못된 형식입니다");
            });
        }
    },
    modules: {

    },
};

export default UserStore;
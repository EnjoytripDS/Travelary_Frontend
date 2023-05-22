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
    },
    getters: {

    },
    mutations: {
        CREATE_USER(state, newUser) {
            state.users.push(newUser);
        },
        // SET_USER: function (state, user) {
        //     state.user = user;
        // },
        SET_LOGIN_USER(state, user) {
            state.user = user;
        },
        LOGOUT(state) {
            state.user = null;
            state.sessionId = null;
        },
        SET_SESSION_ID(state, sessionId) {
            state.sessionId = sessionId;
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
                commit("CREATE_USER", newUser);
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
                console.log(response);
                const sessionId = response.data.sessionId;
                commit("SET_SESSION_ID", sessionId);
                router.push({name : "home"});
            }).catch(() => {
                alert("아이디 혹은 비밀번호를 확인해 주세요");
                router.push({name : "login"}).catch(() => {});
            });
        },
        // updateUser: function ({ state }, user) {
        //     for (let i = 0; i < state.users.length; i++) {
        //         if (state.users[i].id === user.id) {
        //             Vue.set(state.users, i, user);
        //             alert("수정 완료");
        //             break;
        //         }
        //     }
        //     router.push("/user");
        // },
        // deleteUser: function ({ state }, id) {
        //     for (let i = 0; i < state.users.length; i++) {
        //         if (state.users[i].id === id) {
        //             state.users.splice(i, 1);
        //             alert("삭제 완료");
        //             break;
        //         }
        //     }
        //     router.push("/user");
        // },
        // setUser: function ({ commit, state }, id) {
        //     for (let i = 0; i < state.users.length; i++) {
        //         if (state.users[i].id === id) {
        //             // 상세보기할 사용자 정보 정하는 mutation
        //             commit("SET_USER", state.users[i]);
        //             break;
        //         }
        //     }
        // },
    },
    modules: {

    },
};

export default UserStore;
import Vue from "vue";
import VueRouter from "vue-router";
import AppHome from "@/views/AppHome";
import AppTripList from "@/views/AppTripList";

import store from "@/store";

Vue.use(VueRouter);


const onlyAuthUser = async (to, from, next) => {
  const checkUserInfo = store.getters["UserStore/checkUserInfo"];
  const checkToken = store.getters["UserStore/checkToken"];
  let token = sessionStorage.getItem("access-token");

  if (checkUserInfo != null && token) {
    await store.dispatch("UserStore/getUser", token);
  }
  if (!checkToken || checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다");
    router.push({ name: "login" }).catch(() => { });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    component: AppHome,
  },
  {
    path: "/trip-plan",
    name: "trip-plan",
    beforeEnter: onlyAuthUser,
    component: () => import(/* webpackChunkName: "trip-plan" */ "@/views/AppTripPlan"),
  },
  {
    path: "/trips",
    name: "trips",
    beforeEnter: onlyAuthUser,
    component: AppTripList,
  },
  {
    path: "/qna-board",
    name: "qnaboard",
    component: () => import(/* webpackChunkName: "qnaboard" */ "@/views/AppQnaBoard"),
    redirect: "/qna-board/list",
    children: [
      {
        path: "list",
        name: "qnaboard-list",
        beforeEnter: onlyAuthUser,
        component: () => import(/* webpackChunkName: "qnaboard" */ "@/components/qnaboard/QnaBoardList"),
      },
      {
        path: "create",
        name: "qnaboard-create",
        beforeEnter: onlyAuthUser,
        component: () => import(/* webpackChunkName: "qnaboard" */ "@/components/qnaboard/QnaBoardCreate"),
      },
      {
        path: "update",
        name: "qnaboard-update",
        beforeEnter: onlyAuthUser,
        component: () => import(/* webpackChunkName: "qnaboard" */ "@/components/qnaboard/QnaBoardUpdate"),
      },
      {
        path: "detail/:no",
        name: "qnaboard-detail",
        beforeEnter: onlyAuthUser,
        component: () => import(/* webpackChunkName: "qnaboard" */ "@/components/qnaboard/QnaBoardDetail"),
      },
    ],
  },
  {
    path: "/users",
    name: "users",
    component: () => import(/* webpackChunkName: "users" */ "@/views/AppUser"),
    children: [
      {
        path: "register",
        name: "register",
        component: () => import(/* webpackChunkName: "users" */ "@/components/users/UserRegister"),
      },
      {
        path: "login",
        name: "login",
        component: () => import(/* webpackChunkName: "users" */ "@/components/users/UserLogin"),
      },
      {
        path: "register-check",
        name: "register-check",
        component: () => import(/* webpackChunkName: "users" */ "@/components/users/UserRegisterCheck"),
      },

      {
        path: "mypage/:id",
        name: "user-mypage",
        component: () => import(/* webpackChunkName: "mypage" */ "@/components/users/UserMyPage"),
        redirect: "/users/mypage/:id/info",
        children: [
          {
            path: "info",
            name: "mypage-info",
            beforeEnter: onlyAuthUser,
            component: () => import(/* webpackChunkName: "mypage" */ "@/components/users/mypage/MyPageInfo")
          },
          {
            path: "change-pwd",
            name: "mypage-change-pwd",
            beforeEnter: onlyAuthUser,
            component: () => import(/* webpackChunkName: "mypage" */ "@/components/users/mypage/MyPageChangePwd")
          },
          {
            path: "dropout",
            name: "mypage-dropout",
            beforeEnter: onlyAuthUser,
            component: () => import(/* webpackChunkName: "mypage" */ "@/components/users/mypage/MyPageDropOut")
          },
        ],
      },

    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

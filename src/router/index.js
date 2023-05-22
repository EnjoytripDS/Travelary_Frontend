import Vue from "vue";
import VueRouter from "vue-router";
import AppHome from "@/views/AppHome";
import AppTripList from "@/views/AppTripList";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: AppHome,
  },
  {
    path: "/trip-plan",
    name: "trip-plan",
    component: () => import(/* webpackChunkName: "trip-plan" */ "@/views/AppTripPlan"),
  },
  {
    path: "/trips",
    name: "trips",
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
        component: () => import(/* webpackChunkName: "qnaboard" */ "@/components/qnaboard/QnaBoardList"),
      },
      {
        path: "create",
        name: "qnaboard-create",
        component: () => import(/* webpackChunkName: "qnaboard" */ "@/components/qnaboard/QnaBoardCreate"),
      },
      {
        path: "update",
        name: "qnaboard-update",
        component: () => import(/* webpackChunkName: "qnaboard" */ "@/components/qnaboard/QnaBoardUpdate"),
      },
      {
        path: "detail/:no",
        name: "qnaboard-detail",
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
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

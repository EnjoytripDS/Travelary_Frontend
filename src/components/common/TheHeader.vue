<template>
  <v-container>
    <v-card dense white>
      <ul class="menu">
        <li class="logo">
          <router-link :to="{ name: 'home' }">
            <v-img src="@/assets/logo.png" max-height="100" max-width="100" />
          </router-link>
        </li>
        <li class="menu-nav">
          <router-link
            :to="{ name: 'home' }"
            class="link"
            :class="{ active: isActiveRoute('home') }"
          >
            홈
          </router-link>
          <router-link
            :to="{ name: 'trip-plan' }"
            class="link"
            :class="{ active: isActiveRoute('trip-plan') }"
          >
            여행 생성
          </router-link>
          <router-link
            :to="{ name: 'trips' }"
            class="link"
            :class="{ active: isActiveRoute('trips') }"
          >
            내 여행
          </router-link>
          <router-link
            :to="{ name: 'qnaboard' }"
            class="link"
            :class="{ active: isActiveRoute('qnaboard') }"
          >
            여행 후기
          </router-link>
        </li>
        <li class="menu-buttons">
          <template v-if="user">
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" class="profilebutton" color="blue" rounded>
                  <v-icon>mdi-account-box</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="toMyPage">
                  <v-list-item-icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>마이 페이지</v-list-item-title>
                </v-list-item>
                <v-list-item @click="toLogout">
                  <v-list-item-icon>
                    <v-icon>mdi-logout</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>로그아웃</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
          <template v-else>
            <v-btn @click="toLogin" class="loginbutton" color="blue">
              Log In
            </v-btn>
            <v-btn @click="toRegist" class="registbutton"> 회원 가입 </v-btn>
          </template>
        </li>
      </ul>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";

const UserStore = "UserStore";

export default {
  name: "TheHeader",
  data() {
    return {};
  },
  props: ["active"],
  methods: {
    ...mapActions(UserStore, ["logout"]),
    isActiveRoute(routeName) {
      if (
        routeName === "home" &&
        (this.$route.name === "users" ||
          this.$route.matched.some((route) => route.name === "users"))
      )
        return true;
      return (
        this.$route.name === routeName ||
        this.$route.matched.some((route) => route.name === routeName)
      );
    },
    toLogin() {
      this.$router.push({ name: "login" }).catch(() => {}); // 로그인 경로로 이동
    },
    toRegist() {
      this.$router.push({ name: "register" }).catch(() => {}); // 회원 가입 경로로 이동
    },
    toMyPage() {
      this.$router.push({name: "user-mypage", params: {id: this.user.id}}).catch(() => {});
    },
    toLogout() {
      this.logout(this.user.id);
      sessionStorage.removeItem("access-token"); //저장된 토큰 없애기
      sessionStorage.removeItem("refresh-token"); //저장된 토큰 없애기
    },
  },
  computed: {
    ...mapState(UserStore, ["isLogin", "user"]),
    ...mapGetters(["checkUserInfo"]),
  },
};
</script>

<style scoped>
ul.menu {
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  flex-wrap: wrap; /* Wrap menu items to a new line */
}

ul.menu li {
  margin-bottom: 10px; /* Add bottom margin between menu items */
  height: 100px;
  display: flex;
  align-items: flex-end; /* Align items to the top */
}

.menu-buttons {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}

.menu-nav {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  font-family: "line-seed";
}

.loginbutton {
  margin-inline: 10px; /* Add margin between buttons */
  color: white;
}

.registbutton {
  margin-inline: 10px; /* Add margin between buttons */
}

.profilebutton {
  margin-inline: 10px; /* Add margin between buttons */
  color: white;
  margin-right: 80px;
}

.link {
  text-decoration: none;
  color: black; /* Set font color to black */
  font-weight: bold; /* Set font weight to bold */
  font-size: 26px; /* Increase font size */
  margin-inline: 35px;
}

.link.active {
  color: powderblue; /* Set font color to blue for active route */
}
</style>

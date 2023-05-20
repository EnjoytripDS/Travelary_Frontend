<template>
    <v-container class="userinfo grey lighten-3" rounded>
        <v-row>
            <v-col cols="2">
                <v-sheet rounded="lg">
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title class="title-my-page">
                                MY PAGE
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider class="my-2"></v-divider>
                    <v-list color="transparent">
                        <v-list-item>
                            <v-list-item-content>
                                <router-link :to="{ name: 'mypage-info' }" class="mypage-link" :class="{ active: isActiveRoute('mypage-info')}"> 회원 정보 </router-link>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <router-link :to="{ name: 'mypage-change-pwd' }" class="mypage-link" :class="{ active: isActiveRoute('mypage-change-pwd')}"> 비밀번호 변경 </router-link>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                친구 목록
                                <!-- <router-link :to="{ name: 'mypage-change-pwd' }" class="mypage-link" :class="{ active: isActiveRoute('mypage-change-pwd')}"> 비밀번호 변경 </router-link> -->
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                회원 탈퇴
                                <!-- <router-link :to="{ name: 'mypage-change-pwd' }" class="mypage-link" :class="{ active: isActiveRoute('mypage-change-pwd')}"> 비밀번호 변경 </router-link> -->
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-sheet>
            </v-col>

            <v-col>
                <v-sheet
                min-height="77vh"
                rounded="lg"
                >
                    <router-view/>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "UserMyPage",
    methods: {
        isActiveRoute(routeName) {
            return this.$route.name === routeName || this.$route.matched.some((route) => route.name === routeName);
        },
    }
}
</script>

<style>
.userinfo {
    margin-top: 30px;
}
.title-my-page{
    margin-top: 10px;
    color: powderblue;
    font-size: 30px;
}
.mypage-link {
  text-decoration: none;
  color: black !important; /* Set font color to black */
  font-weight: bold; /* Set font weight to bold */
  font-size: 20px; /* Increase font size */
}
.mypage-link.active {
  color: powderblue !important; /* Set font color to blue for active route */
}
</style>
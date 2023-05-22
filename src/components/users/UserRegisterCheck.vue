<template>
    <v-container>
        <v-row class="temp-check">
        <v-col cols="3"/>
        <v-col class="user-login-title-text">
            <div
            :class="[`text-h3`, active && `mb-0`]"
            >
            회원가입 완료!
            </div>
        </v-col>
        </v-row>
        <v-row class="temp-check">
            <v-col cols="5"/>
            <v-btn @click="toLogin" class="loginbutton" color="blue"> 확인 </v-btn>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "UserRegisterCheck",
    methods: {
        toLogin() {
            this.$router.push({ name: "login" }).catch(() => {}); // 로그인 경로로 이동
    },
    }
}
</script>

<style>
.temp-check {
    margin-top: 250px;
    margin-bottom: 50px;
}

.loginbutton {
    margin-inline: 10px; /* Add margin between buttons */
    color: white !important;
}
</style>
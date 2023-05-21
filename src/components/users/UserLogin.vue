<template>
  <v-container>
    <v-row class="user-login-top-row">
      <v-col cols="3"/>
      <v-col class="user-login-title-text">
        <div
          :class="[`text-h3`, active && `mb-0`]"
        >
          로그인
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-divider class="custom-divider"></v-divider>
    </v-row>
    <v-row>
      <v-col>
        <v-form>
          <v-container>
            <v-row class="user-login-infor-row"> 
              <v-col cols="3"/>
              <v-col cols="4">
                <v-container>
                  <v-row>
                    <v-col cols="2" class="user-login-input-col">
                      <v-icon left size="45">mdi-account</v-icon>
                    </v-col>
                    <v-col>
                      <v-text-field v-model="useremail" label="이메일을 입력하세요" hide-details="auto" required outlined></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
            <v-row class="user-login-pw-row">
              <v-col cols="3"/>
              <v-col cols="4">
                <v-container>
                  <v-row>
                    <v-col cols="2" class="user-login-input-col">
                      <v-icon left size="45">mdi-key</v-icon>
                    </v-col>
                    <v-col>
                      <v-text-field v-model="userpwd" type="password" label="비밀번호를 입력하세요" hide-details="auto" required outlined></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4"/>
              <v-col cols="3">
                <v-btn color="primary" @click="login" block>로그인</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4"/>
              <v-col cols="3">
                <v-btn color="gray" @click="goToRegist" block>회원 가입</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const UserStore = "UserStore";

export default {
  name: "UserLogin",
  data() {
    return {
      useremail: null,
      userpwd: null,
    };
  },
  props: [
    'active'
  ],
  computed: {
    ...mapState(UserStore, ["isLogin", "isLoginError", "user"]),
  },
  methods: {
    ...mapActions(UserStore, ["setLoginUser", "getUser"]),
    async login() {
      let user = {
        email: this.useremail,
        password: this.userpwd,
      };
      await this.setLoginUser(user);
      let token = sessionStorage.getItem("access-token");
      if (this.isLogin) {

        await this.getUser(token);
        this.$router.push({ name: "home" });
      }
    },
    goToRegist() {
      this.$router.push({ name: "register" });
    }
  },
};
</script>

<style>
.user-login-top-row {
  margin-top: 55px;
}

.user-login-title-text {
  margin-left: 40px;
}

.custom-divider{
  margin-left: 480px;
  margin-right: 575px;
  margin-bottom: 20px;
  border-top: 2px solid #333;
}

.user-login-infor-row {
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 55px;
}

.user-login-pw-row {
  align-items: center;
  margin-top: 5px;
  margin-bottom: 55px;
  margin-left: 55px;
}

.user-login-input-col {
  margin-top: 10px;
  padding-left: 20px;
  text-align: center;
  height: 80%;
}
</style>

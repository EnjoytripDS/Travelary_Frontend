<template>
  <v-container>
    <v-row class="user-register-top-row">
      <v-col cols="3"/>
      <v-col class="user-register-title-text">
        <div
          :class="[`text-h4`, active && `mb-0`]"
        >
          회원 가입
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-divider class="custom-divider"></v-divider>
    </v-row>
    <v-form>
      <v-row>
        <v-col cols="3">
        </v-col>
        <v-col>
          <v-container>
            <v-row class="user-reg-inpt-row">
              <v-col cols="1" class="user-reg-input-col">이메일</v-col>
              <v-col cols="4">
                <v-text-field :counter="30" v-model="useremail" label="이메일을 입력하세요" hide-details="auto" required outlined></v-text-field>
              </v-col>
              <v-col cols="1" class="reg-dup-check">
                <v-btn color="gray" small @click="dupCheckEmail">중복 확인</v-btn>
              </v-col>
            </v-row>
            <v-row class="user-reg-inpt-row">
              <v-col cols="1" class="user-reg-input-col">닉네임</v-col>
              <v-col cols="4">
                <v-text-field :counter="20" v-model="nickname" label="닉네임을 입력하세요" hide-details="auto" required outlined></v-text-field>
              </v-col>
              <v-col cols="1" class="reg-dup-check">
                <v-btn color="gray" small @click="dupCheckNickname">중복 확인</v-btn>
              </v-col>
            </v-row>
            <v-row class="user-reg-note-row">
              비밀번호는 영문 소문자 + 숫자의 조합을 6 ~ 10글자로 입력해 주세요!
            </v-row>
            <v-row class="user-reg-inpt-row">
              <v-col cols="1" class="user-reg-input-col">비밀번호</v-col>
              <v-col cols="4">
                <v-text-field :counter="10" type="password" v-model="userpwd" label="비밀번호를 입력하세요" hide-details="auto" required outlined></v-text-field>
              </v-col>
            </v-row>
            <v-row class="user-reg-inpt-row">
              <v-col cols="1" class="user-reg-input-col">비밀번호 확인</v-col>
              <v-col cols="4">
                <v-text-field :counter="10" type="password" v-model="pwdcheck" label="한 번 더 입력하세요" hide-details="auto" required outlined></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5"/>
        <v-col>
          <v-btn color="success" @click="userRegist">다음 단계</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

const UserStore = "UserStore";

export default {
  name: "UserRegister",
  data() {
    return{
      useremail: "",
      userpwd: "",
      nickname: "",
      pwdcheck: "",
    }
  },
  props: [
    'active'
  ],
  methods: {
    ...mapActions(UserStore, ["createUser", "dupEmailCheck", "dupNicknameCheck"]),
    userRegist() {
      if(this.userpwd !== this.pwdcheck)
        alert("비밀번호를 다시 확인해주세요!");
      else if(this.useremail == "" || this.nickname == "" || this.userpwd == "")
        alert("모든 칸을 작성해주세요");
      else {
        let newUser = {
            email: this.useremail,
            password: this.userpwd,
            nickname: this.nickname,
        };
        this.createUser(newUser);
      }
    },
    dupCheckEmail() {
      if(this.useremail == "")
        alert("이메일을 작성해주세요!");
      else 
        this.dupEmailCheck(this.useremail);
    },
    dupCheckNickname() {
      if(this.nickname == "")
        alert("닉네임을 작성해주세요!");
      else
        this.dupNicknameCheck(this.nickname);
    },
  }
};
</script>

<style>
.user-register-top-row {
  margin-top: 55px;
}

.user-register-title-text {
  margin-left: 40px;
}

.custom-divider{
  margin-left: 480px;
  margin-right: 575px;
  margin-bottom: 20px;
  border-top: 2px solid #333;
}

.user-reg-inpt-row {
  margin-top: 15px;
  margin-bottom: 15px;
}

.user-reg-input-col {
  margin-top: 20px;
  text-align: right;
  height: 80%;
  font-size: 13px;
}

.user-reg-note-row {
  font-size: 13px;
  margin-left: 35px;
  color: blue;
}

.reg-dup-check {
  margin-top: 12px;
}
</style>
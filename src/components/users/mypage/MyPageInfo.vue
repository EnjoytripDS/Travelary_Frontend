<template>
  <v-container>
    <v-row class="mypageinfo-start-row">
      <v-col cols="1" />
      <v-col class="mypageinfo-title">
        <div :class="[`text-h3`, active && `mb-0`]">회원 정보</div>
      </v-col>
    </v-row>
    <v-row>
      <v-divider class="mypage-custom-divider"></v-divider>
    </v-row>
    <v-row>
      <v-col cols="5">
        <v-container>
          <v-row class="mypageinfo-content-row">
            <v-img src="@/assets/image/tripimage.jpg" class="profile-img" />
          </v-row>
          <!-- <v-row class="mypageinfo-content-row">
            <v-file-input class="profile-input" v-model="file" accept="image/*" label="프로필 사진 업로드" @change="handleFileUpload"></v-file-input>
          </v-row> -->
        </v-container>
      </v-col>
      <v-col>
        <v-container>
          <v-row class="mypageinfo-content-row">
            <v-col cols="1" />
            <v-col cols="2" class="mypageinfo-item">이메일</v-col>
            <v-col cols="4">
              <v-text-field
                :counter="30"
                name="email"
                required
                v-model="user.email"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mypageinfo-content-row">
            <v-col cols="1" />
            <v-col cols="2" class="mypageinfo-item">닉네임</v-col>
            <v-col cols="4" class="mypageinfo-btn-left">
              <v-text-field
                :counter="20"
                v-model="user.nickname"
                hide-details="auto"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-btn color="gray" small @click="dupCheckNickname"
              >중복 확인</v-btn
            >
          </v-row>
          <v-row class="mypageinfo-btn-row">
            <v-col cols="4" />
            <v-col cols="4">
              <v-btn color="blue" @click="userModify" class="modbutton" block>
                수정
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const UserStore = "UserStore";

export default {
  name: "MyPageInfo",
  data() {
    return {
      file: null,
    };
  },
  computed: {
    ...mapState(UserStore, ["user"]),
  },
  methods: {
    ...mapActions(UserStore, ["updateUser", "dupNicknameCheck"]),
    userModify() {
      if (this.user.nickname == "") alert("빈 칸이 있습니다!");
      else {
        let modUser = {
          id: this.user.id,
          email: this.user.email,
          nickname: this.user.nickname,
        };
        this.updateUser(modUser);
      }
    },
    dupCheckNickname() {
      if (this.user.nickname == "") alert("닉네임을 작성해주세요!");
      else this.dupNicknameCheck(this.user.nickname);
    },
  },
};
</script>

<style>
.mypageinfo-start-row {
  margin-top: 30px;
}

.mypageinfo-title {
  margin-left: 40px;
}

.mypage-custom-divider {
  margin-left: 160px;
  margin-right: 15px;
  margin-bottom: 20px;
  border-top: 3px solid #333;
}

.mypageinfo-content-row {
  align-items: center;
  margin-left: 55px;
  margin-top: 95px;
  margin-bottom: 5px;
}

.profile-img {
  margin-left: 100px;
}

.profile-input {
  margin-left: 100px;
}

.mypageinfo-btn-row {
  margin-right: 35px;
}

.mypageinfo-btn-left {
  margin-right: 50px;
  margin-top: 25px;
}

.mypageinfo-item {
  color: rgb(13, 24, 184); /* Set font color to black */
  font-weight: bold; /* Set font weight to bold */
}

.modbutton {
  margin-top: 20px;
  color: white !important;
  font-weight: bold;
}
</style>

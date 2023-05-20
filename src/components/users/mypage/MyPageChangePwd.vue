<template>
    <v-container>
        <v-row class="mypagepwd-start-row">
            <v-col cols="1"/>
            <v-col class="mypagepwd-title">
                <div
                :class="[`text-h4`, active && `mb-0`]"
                >
                    비밀번호 변경
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-divider class="mypagepwd-custom-divider"></v-divider>
        </v-row>
        <v-row class="mypagepwd-content-row">
            <v-col cols="3"/>
            <v-col cols="2" class="mypagepwd-item">현재 비밀번호</v-col>
            <v-col cols="3" class="mypagepwd-input-col">
                <v-text-field :counter="10" name="curpwd" type="password" required outlined dense></v-text-field>
            </v-col>
        </v-row>
        <v-row class="mypagepwd-note-row">
            <v-col cols="3"/>
            비밀번호는 영문 소문자 + 숫자의 조합을 6 ~ 10글자로 입력해 주세요!
        </v-row>
        <v-row class="mypagepwd-content-row">
            <v-col cols="3"/>
            <v-col cols="2" class="mypagepwd-item">새 비밀번호</v-col>
            <v-col cols="3" class="mypagepwd-input-col">
                <v-text-field :counter="10" name="newpwd" type="password" required outlined dense></v-text-field>
            </v-col>
        </v-row>
        <v-row class="mypagepwd-content-row">
            <v-col cols="3"/>
            <v-col cols="2" class="mypagepwd-item">비밀번호 재입력</v-col>
            <v-col cols="3" class="mypagepwd-input-col">
                <v-text-field :counter="10" name="newpwdchk" type="password" required outlined dense></v-text-field>
            </v-col>
        </v-row> 
        <v-row class="mypagepwd-btn-row">
            <v-col cols="4"/>
            <v-col cols="4">
                <v-btn color="blue" class="pwdchbutton" block> 비밀번호 변경 </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "MyPageChangePwd",
}
</script>

<style>
.mypagepwd-start-row {
margin-top: 30px;
}

.mypagepwd-title {
margin-left: 40px;
}

.mypagepwd-custom-divider{
margin-left: 160px;
margin-right: 15px;
margin-bottom: 55px;
border-top: 3px solid #333;
}

.mypagepwd-content-row {
align-items: center;
margin-left: 55px;
margin-bottom: 5px;
}

.mypagepwd-input-col {
    margin-top: 20px;
}

.mypagepwd-btn-row {
margin-right: 35px;
}

.mypagepwd-item {
color: rgb(13, 24, 184); /* Set font color to black */
font-weight: bold; /* Set font weight to bold */
font-size: 24px; /* Increase font size */
}

.mypagepwd-note-row {
  font-size: 15px;
  margin-left: 75px;
  color: red;
}

.pwdchbutton {
margin-top: 30px;
color: white !important;
font-weight: bold;
}
</style>
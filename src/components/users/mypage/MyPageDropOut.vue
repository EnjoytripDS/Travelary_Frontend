<template>
    <v-container>
        <v-row class="mypagedrop-start-row">
            <v-col cols="1"/>
            <v-col class="mypagedrop-title">
                <div
                :class="[`text-h3`, active && `mb-0`]"
                >
                    회원 탈퇴
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-divider class="mypagedrop-custom-divider"></v-divider>
        </v-row>
        <v-row class="mypagedrop-content-row">
            <v-col cols="3"/>
            <v-col cols="2" class="mypagedrop-item">현재 비밀번호</v-col>
            <v-col cols="3" class="mypagedrop-input-col">
                <v-text-field :counter="10" v-model="password" name="curpwd" type="password" required outlined dense></v-text-field>
            </v-col>
        </v-row>
        <v-row class="mypagedrop-btn-row">
            <v-col cols="4"/>
            <v-col cols="4">
                <v-btn color="red" @click="dropOutUser" class="deletebtn" block> 회원 탈퇴 </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const UserStore = "UserStore";

export default {
    name: "MyPageDropOut",
    data() {
        return {
            password: "",
        }
    },
    computed: {
        ...mapState(UserStore, ["user"]),
    },
    methods: {
        ...mapActions(UserStore, ["deleteUser"]),
        dropOutUser() {
            let dropUserInfo = {
                id: this.user.id,
                password: this.password,
            };
            this.deleteUser(dropUserInfo);
        }
    }
}
</script>

<style>
.mypagedrop-start-row {
margin-top: 30px;
}

.mypagedrop-title {
margin-left: 40px;
color: red;
font-weight: bolder;
}

.mypagedrop-custom-divider{
margin-left: 160px;
margin-right: 15px;
margin-bottom: 185px;
border-top: 3px solid #333;
}

.mypagedrop-content-row {
align-items: center;
margin-left: 55px;
margin-bottom: 5px;
}

.mypagedrop-item {
color: rgb(13, 24, 184); /* Set font color to black */
font-weight: bold; /* Set font weight to bold */
font-size: 24px; /* Increase font size */
}

.mypagedrop-input-col {
    margin-top: 20px;
}

.mypagedrop-btn-row {
margin-right: 35px;
}

.deletebtn {
margin-top: 30px;
color: white !important;
font-weight: bold;
}
</style>
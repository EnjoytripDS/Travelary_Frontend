<template>
    <v-container>
        <v-list>
            <v-list-item v-for="item in boardComments" :key="item.id" class="comment-list">
                <v-list-item-content>
                    <v-list-item-title class="comment-name-row">{{item.nickname}}</v-list-item-title>
                    <v-list-item-content class="comment-content-row">{{item.content}}</v-list-item-content>
                    <v-row>
                        <v-col cols="2" class="comment-date-row">
                            {{item.createtime}}
                        </v-col>
                        <template v-if="item.nickname == user.nickname">
                            <v-col cols="1">
                                <v-btn color="blue" @click="upcmt" class="upcommentbtn" height="20px"> 수정 </v-btn>
                            </v-col>
                            <v-col cols="1">
                                <v-btn color="red" @click="rmcmt" class="rmcommentbtn" height="20px"> 삭제 </v-btn>
                            </v-col>
                        </template>
                    </v-row>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-row class="list-final-row"/>
    </v-container>
</template>

<script>
import {mapState, mapActions} from "vuex";

const QnaBoardStore = "QnaBoardStore";
const UserStore = "UserStore";

export default {
    name: "BoardCommentList",
    created() {
        const pathname = new URL(document.location).pathname.split("/");
        const id = pathname[pathname.length - 1];
        this.getBoardComments(id);
    },
    computed: {
        ...mapState(QnaBoardStore, ["boardComments", "qnaBoard"]),
        ...mapState(UserStore, ["user"]),
    },
    data() {
        return {

        }
    },
    methods: {
        ...mapActions(QnaBoardStore, ["getBoardComments"]),
        upcmt() {

        },
    }
}
</script>

<style>
.comment-name-row {
    color: blue;
    font-size: 14px;
}

.comment-content-row {
    margin-left: 15px;
    font-size: 17px;
}

.comment-date-row {
    font-size: 12px;
}

.comment-list {
    margin-left: 500px;
}

.list-final-row {
    margin-bottom: 75px;
}

.upcommentbtn {
    margin-left: 120px;
    color: white !important;
}

.rmcommentbtn {
    margin-left: 95px;
    color: white !important;
}
</style>
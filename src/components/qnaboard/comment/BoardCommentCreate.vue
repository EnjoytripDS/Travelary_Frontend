<template>
    <v-container>
        <v-row>
            <v-divider class="comment-custom-divider"></v-divider>
        </v-row>
        <v-row class="comment-create-row">
            <v-col cols="3"/>
            <v-col class="comment-create-col">
                댓글 작성
            </v-col>
        </v-row>
        <v-row class="comment-create-row">
            <v-col cols="3"/>
            <v-col cols="4">
                <v-textarea filled name="content" hint="댓글을 작성해주세요." v-model="content" :counter="255" maxlength="255" height="90px" />
            </v-col>
            <v-col cols="2">
                <v-btn color="blue" @click="commentCreate" class="comment-btn"> 작성 </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const QnaBoardStore = "QnaBoardStore";
const UserStore = "UserStore";

export default {
    name: "BoardCommentCreate",
    computed: {
        ...mapState(UserStore, ["user"]),
        ...mapState(QnaBoardStore, ["qnaBoard", "boardComments"])
    },
    data() {
        return {
            content: "",
        }
    },
    methods: {
        ...mapActions(QnaBoardStore, ["createBoardComment"]),
        commentCreate() {
            if(this.content == "") {
                alert("댓글을 작성해주세요");
                return;
            }
            let boardComment = {
                id: this.qnaBoard.id,
                nickname: this.user.nickname,
                content: this.content,
            }
            this.boardComments.length = 0;
            this.createBoardComment(boardComment);
            this.content = "";
        },
    }
}
</script>

<style>
.comment-custom-divider{
margin-left: 480px;
margin-right: 575px;
margin-top: 50px;
border-top: 2px solid #333;
}

.comment-create-col{
margin-top: 30px;
}

.comment-create-row{
margin-left: 65px;
}

.comment-btn{
    margin-top: 55px;
    margin-left: 30px;
    color: white !important;
}
</style>
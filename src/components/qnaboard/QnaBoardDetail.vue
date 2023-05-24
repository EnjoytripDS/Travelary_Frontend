<template>
    <v-container>
        <v-row class="qna-board-detail-top-row">
        <v-col cols="3"/>
        <v-col class="qna-board-detail-title-text">
            <div
            :class="[`text-h3`, active && `mb-0`]"
            >
            여행 후기 보기
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
                    <v-row class="qna-board-detail-first-row"> 
                        <v-col cols="3"/>
                        <v-col cols="1" class="board-item">작성자 </v-col>
                        <v-col cols="3" class="board-text">
                            {{ qnaBoard.nickname }}
                        </v-col>
                    </v-row>
                    <v-row class="qna-board-detail-infor-row">
                        <v-col cols="3"/>
                        <v-col cols="1" class="board-item"> 제목 </v-col>
                        <v-col cols="3" class="board-text">
                            {{ qnaBoard.title }}
                        </v-col>
                    </v-row>
                    <v-row class="qna-board-detail-infor-row">
                        <v-col cols="3"/>
                        <v-col cols="1" class="board-item"> 내용 </v-col>
                    </v-row>
                    <v-row class="qna-board-detail-btn-row">
                        <v-col cols="3"/>
                        <v-col cols="5" class="board-text">
                            <v-textarea
                            background-color="amber lighten-4"
                            color="orange orange-darken-4"
                            v-model="qnaBoard.content"
                            readonly
                            auto-grow
                            filled
                            label="text"
                            class="board-text"
                            >
                            </v-textarea>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-img :src=imgUrls[0] max-height="400px" max-width="500px" />
                    </v-row>
                    <v-row>
                        <template v-if="checkWriter">
                            <v-col cols="6"/>
                            <v-btn color="red" @click="qnaRemove" class="removebutton"> 삭제 </v-btn>
                            <v-btn color="blue" @click="goToUpdate" class="updatebutton"> 수정 </v-btn>
                            <v-btn color="gray" @click="goToQnaList" class="backbutton"> 돌아가기 </v-btn>
                        </template>
                        <template v-else>
                            <v-col cols="7"/>
                            <v-btn color="gray" @click="goToQnaList" class="backbutton2"> 돌아가기 </v-btn>
                        </template>
                    </v-row>
                </v-container>
            </v-form>
        </v-col>
        </v-row>
        <v-row>
            <board-comment-create/>
        </v-row>
        <v-row>
            <board-comment-list/>
        </v-row>
    </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import BoardCommentCreate from "@/components/qnaboard/comment/BoardCommentCreate.vue";
import BoardCommentList from "./comment/BoardCommentList.vue";

const QnaBoardStore = "QnaBoardStore";
const UserStore = "UserStore";

export default {
    components: { BoardCommentCreate, BoardCommentList },
    name: "QnaBoardDetail",
    data() {
        return {

        }
    },
    props: [
        'active'
    ],
    computed: {
        ...mapState(QnaBoardStore, ["qnaBoard", "boardComments", "boardImages", "imgUrls"]),
        ...mapState(UserStore, ["user"]),
        checkWriter() {
            return this.user.nickname == this.qnaBoard.nickname;
        }
    },
    created() {
        const pathname = new URL(document.location).pathname.split("/");
        const id = pathname[pathname.length - 1];
        this.getQnaBoardDetail(id);
        this.getBoardImage(id);
    },
    methods: {
        ...mapActions(QnaBoardStore, ["getQnaBoardDetail", "deleteQnaBoard", "getBoardImage"]),
        qnaRemove() {
            if(confirm(`정말 삭제하실 건가요?`) == true)
                this.deleteQnaBoard(this.qnaBoard.id);
        },
        goToUpdate() {
            this.$router.push({ name: "qnaboard-update" });
        },
        goToQnaList() {
            this.boardComments.length = 0;
            this.$router.push({ name: "qnaboard-list" });
        },
    },
};
</script>

<style>
.qna-board-detail-top-row {
margin-top: 55px;
}

.qna-board-detail-title-text {
margin-left: 40px;
}

.custom-divider{
margin-left: 480px;
margin-right: 575px;
margin-bottom: 20px;
border-top: 2px solid #333;
}

.qna-board-detail-first-row {
align-items: center;
margin-left: 55px;
}

.qna-board-detail-infor-row {
align-items: center;
margin-top: 5px;
margin-bottom: 5px;
margin-left: 55px;
}

.qna-board-detail-btn-row {
align-items: center;
margin-bottom: 15px;
margin-left: 55px;
}

.board-item {
color: rgb(13, 24, 184); /* Set font color to black */
font-weight: bold; /* Set font weight to bold */
font-size: 26px; /* Increase font size */
}

.board-text {
font-size: 18px; /* Increase font size */
font-family: 'line-seed';
}

.removebutton {
margin-inline: 5px;
margin-left: 60px;
color: white !important;
}

.updatebutton {
margin-inline: 5px;
color: white !important;
}

.backbutton {
margin-inline: 5px;
}

.backbutton2 {
margin-left: 65px;
}
</style>
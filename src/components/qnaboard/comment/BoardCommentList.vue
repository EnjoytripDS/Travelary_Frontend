<template>
  <v-container>
    <v-list>
      <v-list-item
        v-for="(item, index) in boardComments"
        :key="item.id"
        class="comment-list"
      >
        <v-list-item-content>
          <v-list-item-title class="comment-name-row">{{
            item.boardComment.nickname
          }}</v-list-item-title>
          <template v-if="item.inUpdate == 0">
            <v-list-item-content class="comment-content-row">{{
              item.boardComment.content
            }}</v-list-item-content>
            <v-row>
              <v-col cols="2" class="comment-date-row">
                {{ item.boardComment.createtime }}
              </v-col>
              <template v-if="item.boardComment.nickname == user.nickname">
                <v-col cols="1">
                  <v-btn
                    color="blue"
                    @click="upToggle(index)"
                    class="uptogglebtn"
                    height="20px"
                  >
                    수정
                  </v-btn>
                </v-col>
                <v-col cols="1">
                  <v-btn
                    color="red"
                    @click="rmcmt(index)"
                    class="rmcommentbtn"
                    height="20px"
                  >
                    삭제
                  </v-btn>
                </v-col>
              </template>
            </v-row>
          </template>
          <template v-else>
            <v-col cols="5">
              <v-textarea
                filled
                name="content"
                hint="댓글을 작성해주세요."
                v-model="item.boardComment.content"
                :counter="255"
                maxlength="255"
                height="90px"
              />
            </v-col>
            <v-col>
              <v-btn
                color="blue"
                @click="upcmt(index)"
                class="uptbtn"
                height="20px"
              >
                수정
              </v-btn>
              <v-btn
                color="red"
                @click="cancel(index)"
                class="cancelcmtbtn"
                height="20px"
              >
                취소
              </v-btn>
            </v-col>
          </template>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-row class="list-final-row" />
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const QnaBoardStore = "QnaBoardStore";
const UserStore = "UserStore";

export default {
  name: "BoardCommentList",
  created() {
    const pathname = new URL(document.location).pathname.split("/");
    this.id = pathname[pathname.length - 1];
    this.getBoardComments(this.id);
  },
  computed: {
    ...mapState(QnaBoardStore, ["boardComments"]),
    ...mapState(UserStore, ["user"]),
  },
  data() {
    return {
      id: "",
      originalContent: "",
    };
  },
  methods: {
    ...mapActions(QnaBoardStore, [
      "getBoardComments",
      "updateBoardComment",
      "deleteBoardComment",
    ]),
    upToggle(index) {
      this.originalContent = this.boardComments[index].boardComment.content;
      this.boardComments[index].inUpdate = 1;
    },
    cancel(index) {
      this.boardComments[index].boardComment.content = this.originalContent;
      this.boardComments[index].inUpdate = 0;
    },
    upcmt(index) {
      if (this.boardComments[index].boardComment.content == "") {
        alert("빈 칸을 채워주세요");
        return;
      }
      let boardComment = {
        id: this.boardComments[index].boardComment.id,
        content: this.boardComments[index].boardComment.content,
        nickname: this.boardComments[index].boardComment.nickname,
        boardId: this.id,
      };
      this.updateBoardComment(boardComment);
      this.boardComments[index].inUpdate = 0;
    },
    rmcmt(index) {
      let ids = {
        boardId: this.id,
        commentId: this.boardComments[index].boardComment.id,
      };
      this.deleteBoardComment(ids);
      this.boardComments.splice(index, 1);
    },
  },
};
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

.uptogglebtn {
  margin-left: 120px;
  color: white !important;
}

.rmcommentbtn {
  margin-left: 95px;
  color: white !important;
}

.uptbtn {
  margin-left: 350px;
  color: white !important;
}

.cancelcmtbtn {
  margin-left: 20px;
  color: white !important;
}
</style>

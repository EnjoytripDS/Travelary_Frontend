<template>
  <v-container>
    <v-row class="qna-board-detail-top-row">
      <v-col cols="3" />
      <v-col class="qna-board-detail-title-text">
        <div :class="[`text-h4`, active && `mb-0`]">
          {{ qnaBoard.title }}
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form>
          <v-container>
            <v-row class="qna-board-detail-first-row">
              <v-col cols="3" />
              <v-col cols="1" class="board-item">작성자 </v-col>
              <v-col cols="3" class="board-text">
                {{ qnaBoard.nickname }}
              </v-col>
            </v-row>
            <v-row class="qna-board-detail-infor-row">
              <v-col cols="3" />
              <v-col cols="1" class="board-item"> 내용 </v-col>
            </v-row>
            <v-row class="qna-board-detail-infor-row">
              <v-col cols="3" />
              <v-col cols="5" class="board-text">
                <v-textarea
                  background-color="white"
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
            <v-row class="qna-board-detail-btn-row">
              <v-col cols="3" />
              <v-col cols="5">
                <template v-if="imgUrls.length != 0">
                  <v-carousel>
                    <v-carousel-item
                      v-for="(item, i) in imgUrls"
                      :key="i"
                      :src="item"
                      reverse-transition="fade-transition"
                      transition="fade-transition"
                    ></v-carousel-item>
                  </v-carousel>
                </template>
              </v-col>
            </v-row>
            <v-row>
              <template v-if="checkWriter">
                <v-col cols="6" />
                <v-btn color="red" @click="qnaRemove" class="removebutton">
                  삭제
                </v-btn>
                <v-btn color="indigo" @click="goToUpdate" class="updatebutton">
                  수정
                </v-btn>
                <v-btn color="gray" @click="goToQnaList" class="backbutton">
                  돌아가기
                </v-btn>
              </template>
              <template v-else>
                <v-col cols="7" />
                <v-btn color="gray" @click="goToQnaList" class="backbutton2">
                  돌아가기
                </v-btn>
              </template>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <board-comment-create />
    </v-row>
    <v-row>
      <board-comment-list />
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
    return {};
  },
  props: ["active"],
  computed: {
    ...mapState(QnaBoardStore, [
      "qnaBoard",
      "boardComments",
      "boardImages",
      "imgUrls",
    ]),
    ...mapState(UserStore, ["user"]),
    checkWriter() {
      return this.user.nickname == this.qnaBoard.nickname;
    },
  },
  created() {
    const pathname = new URL(document.location).pathname.split("/");
    const id = pathname[pathname.length - 1];
    this.getQnaBoardDetail(id);
    this.getBoardImage(id);
  },
  methods: {
    ...mapActions(QnaBoardStore, [
      "deleteBoardAllComment",
      "getQnaBoardDetail",
      "deleteQnaBoard",
      "getBoardImage",
      "deleteBoardAllImage",
    ]),
    qnaRemove() {
      if (confirm(`정말 삭제하실 건가요?`) == true) {
        if (this.imgUrls.length != 0) {
          this.deleteBoardAllImage(this.qnaBoard.id);
        }
        if (this.boardComments.length != 0) {
          this.deleteBoardAllComment(this.qnaBoard.id);
        }
        this.deleteQnaBoard(this.qnaBoard.id);
      }
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
  font-weight: bold; /* Set font weight to bold */
}

.board-text {
  font-size: 18px; /* Increase font size */
  font-family: "line-seed";
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

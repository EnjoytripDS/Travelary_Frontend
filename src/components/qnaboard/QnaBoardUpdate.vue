<template>
  <v-container>
    <v-row class="qna-board-update-top-row">
      <v-col cols="3"/>
      <v-col class="qna-board-update-title-text">
        <div
          :class="[`text-h3`, active && `mb-0`]"
        >
          작성글 수정
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
            <v-row class="qna-board-update-first-row"> 
              <v-col cols="3"/>
              <v-col cols="1">작성자 </v-col>
              <v-col cols="3">
                <v-text-field :counter="50" label="작성자" name="nickname" required v-model="qnaBoard.nickname" maxlength="50" readonly></v-text-field>
              </v-col>
            </v-row>
            <v-row class="qna-board-update-infor-row">
              <v-col cols="3"/>
              <v-col cols="1"> 제목 </v-col>
              <v-col cols="3">
                <v-text-field :counter="50" label="제목" name="title" required v-model="qnaBoard.title" maxlength="50"></v-text-field>
              </v-col>
            </v-row>
            <v-row class="qna-board-update-infor-row">
              <v-col cols="3"/>
              <v-col cols="1"> 내용 </v-col>
            </v-row>
            <v-row class="qna-board-update-infor-row">
              <v-col cols="3"/>
              <v-col cols="5">
                <v-textarea filled name="content" hint="내용을 입력해주세요." v-model="qnaBoard.content" :counter="1000" maxlength="1000"></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="7"/>
              <v-btn color="blue" @click="updateQna" class="updatebutton"> 수정 </v-btn>
              <v-btn color="gray" @click="cancel" class="cancelbutton"> 취소 </v-btn>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const QnaBoardStore = "QnaBoardStore";

export default {
  name: "QnaBoardUpdate",
  data() {
    return {

    };
  },
  props: [
    'active',
  ],
  computed: {
    ...mapState(QnaBoardStore, ["qnaBoard"]),
  },
  methods: {
    ...mapActions(QnaBoardStore, ["updateQnaBoard"]),
    updateQna() {
      let updateQna = {
        id: this.qnaBoard.id,
        title: this.qnaBoard.title,
        content: this.qnaBoard.content,
        nickname: this.qnaBoard.nickname,
      };
      this.updateQnaBoard(updateQna);
    },
    cancel() {
      this.$router.push({ name: "qnaboard-list" })
    },
  },
};
</script>

<style>
.qna-board-update-top-row {
  margin-top: 55px;
}

.qna-board-update-title-text {
  margin-left: 40px;
}

.custom-divider{
  margin-left: 480px;
  margin-right: 575px;
  margin-bottom: 20px;
  border-top: 2px solid #333;
}

.qna-board-update-first-row {
  align-items: center;
  margin-left: 55px;
}

.qna-board-update-infor-row {
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 55px;
}

.updatebutton {
  margin-inline: 5px;
  color: white !important;
}

.cancelbutton {
  margin-inline: 5px;
}
</style>
<template>
  <v-container>
    <v-row class="qna-board-create-top-row">
      <v-col cols="3"/>
      <v-col class="qna-board-create-title-text">
        <div
          :class="[`text-h3`, active && `mb-0`]"
        >
          여행 후기 작성
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
            <v-row class="qna-board-create-first-row"> 
              <v-col cols="3"/>
              <v-col cols="1">작성자 </v-col>
              <v-col cols="3">
                <v-text-field :counter="20" label="작성자" name="nickname" readonly required v-model="user.nickname" maxlength="20"></v-text-field>
              </v-col>
            </v-row>
            <v-row class="qna-board-create-infor-row">
              <v-col cols="3"/>
              <v-col cols="1"> 제목 </v-col>
              <v-col cols="3">
                <v-text-field :counter="50" label="제목" name="title" required v-model="title" maxlength="50"></v-text-field>
              </v-col>
            </v-row>
            <v-row class="qna-board-create-infor-row">
              <v-col cols="3"/>
              <v-col cols="1"> 내용 </v-col>
            </v-row>
            <v-row class="qna-board-create-infor-row">
              <v-col cols="3"/>
              <v-col cols="5">
                <v-textarea filled name="content" hint="내용을 입력해주세요." v-model="content" :counter="1000" maxlength="1000"></v-textarea>
              </v-col>
            </v-row>
            <v-row class="qna-board-create-infor-row">
              <v-col cols="3"/>
              <v-col cols="2"> 이미지 추가 </v-col>
              <v-col cols="4">
                <input type="file" name="uploadFile" accept="image/*" label="이미지 업로드" @change="handleFileUpload" multiple>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="7"/>
              <v-btn color="blue" @click="createQna" class="regbutton"> 등록 </v-btn>
              <v-btn color="gray" @click="cancel" class="cancelbutton"> 취소 </v-btn>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

const QnaBoardStore = "QnaBoardStore";
const UserStore = "UserStore";

export default {
  name: "QnaBoardCreate",
  data() {
    return {
      title: "",
      content: "",
      uploadFile: null,
    };
  },
  props: [
    'active'
  ],
  methods: {
    // qna 게시글 등록
    ...mapActions(QnaBoardStore, ["createQnaBoard"]),
    createQna() {
      if(this.title == "" || this.content == "")
      {
        alert("빈 칸 없이 작성해 주세요");
        return;
      }
      let qnaBoard = {
        title: this.title,
        nickname: this.user.nickname,
        content: this.content,
        uploadFile: this.uploadFile,
      };
      this.createQnaBoard(qnaBoard);
    },
    // 게시글 등록 취소 -> 목록 페이지 이동
    cancel() {
      this.$router.push({ name: "qnaboard-list" });
    },
    handleFileUpload(e) {
      this.uploadFile = e.target.files;
    },
  },
  computed: {
    ...mapState(UserStore, ["user"]),
  },
};
</script>

<style>
.qna-board-create-top-row {
  margin-top: 55px;
}

.qna-board-create-title-text {
  margin-left: 40px;
}

.custom-divider{
  margin-left: 480px;
  margin-right: 575px;
  margin-bottom: 20px;
  border-top: 2px solid #333;
}

.qna-board-create-first-row {
  align-items: center;
  margin-left: 55px;
}

.qna-board-create-infor-row {
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 55px;
}

.regbutton {
  margin-inline: 5px;
  color: white !important;
}

.cancelbutton {
  margin-inline: 5px;
}
</style>
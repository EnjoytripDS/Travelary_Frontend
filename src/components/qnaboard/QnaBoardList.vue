<template>
  <v-container>
    <v-card class="qnalist">
      <v-card-title> Q&A 게시판 </v-card-title>
      <v-data-table :headers="headers" :items="qnaBoards" :items-per-page="10" :search="search">
        <template #item="{ item }">
          <tr>
            <td>{{ item.id }}</td>
            <td>
              <router-link :to="`detail/${item.id}`" class="qna-detail-link">{{ item.title }}</router-link>
            </td>
            <td>{{ item.nickname }}</td>
            <td>{{ item.createtime }}</td>
            <td>{{ item.hit }}</td>
          </tr>
        </template>
      </v-data-table>
      <v-row>
        <v-col cols="7"/>
        <v-col cols="1">
          <v-select
            :items="searchOption"
            item-text="name"
            item-value="mode"
            v-model="searchoptionselected"
            label="검색 기준"
            dense
            class="qna-board-list-input"
          ></v-select>
        </v-col>
        <v-col cols="2">
          <v-text-field label="검색어" v-model="searchKeyword" placeholder="검색어를 입력해주세요" dense class="qna-board-list-input"></v-text-field>
        </v-col>
        <v-col cols="12" md="1">
          <v-btn @click="searchstart" :style="{ marginTop: '10px' }">검색</v-btn>
        </v-col>
        <v-col>
          <v-btn color="success" class="writebutton" @click="goToWrite">
            <v-icon left>mdi-pencil</v-icon>
            글쓰기
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import {mapState, mapActions} from "vuex";

const QnaBoardStore = "QnaBoardStore";

export default {
  name: "QnaBoardList",
  data() {
    return {
      headers: [
        {
          text: "글번호",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "제목", value: "title" },
        { text: "작성자", value: "nickname" },
        { text: "작성일", value: "createtime" },
        { text: "조회수", value: "hit" },
      ],
      searchOption: [
        { name: "전체", mode: 1 },
        { name: "제목", mode: 2 },
        { name: "내용", mode: 3 },
        { name: "작성자", mode: 4 },
      ], // 검색 옵션
      searchoptionselected: 1, // 검색옵션값 받아오기, 기본값은 '전체'로 지정
      searchKeyword: "", // 검색 키워드
    };
  },
  props: [
    'search', 'items', 'active'
  ],
  methods: {
    ...mapActions(QnaBoardStore, ["getQnaBoards", "searchQnaBoards"]),
    goToWrite() {
      this.$router.push({ name: "qnaboard-create" });
    },
    searchstart() {
      if (!this.searchKeyword) alert("검색어를 입력해주세요");
      this.searchQnaBoards({ mode: this.searchoptionselected, keyword: this.searchKeyword });
    },
  },
  computed: {
    ...mapState(QnaBoardStore, ["qnaBoards"]),
  },
  created() {
    this.getQnaBoards(this.searchoptionselected, this.searchKeyword);
  },
};
</script>

<style>
.qnalist {
  margin-top: 75px;
}

.qna-detail-link {
  text-decoration: none;
  color: rgb(32, 32, 92) !important; /* Set font color to black */
  font-weight: bold; /* Set font weight to bold */
}

.writebutton {
  margin-top: 10px;
}

.qna-board-list-input {
  margin-top: 22px;
}
</style>
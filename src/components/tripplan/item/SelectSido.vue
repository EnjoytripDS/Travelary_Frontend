<template>
  <v-col cols="6">
    <v-select :items="sidoItems" label="시/도" prepend-icon="mdi-map" solo @change="changeSido"></v-select>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      items: [
        "전체",
        "서울",
        "인천",
        "대전",
        "대구",
        "광주",
        "부산",
        "울산",
        "세종특별자치시",
        "경기도",
        "강원도",
        "충청북도",
        "충청남도",
        "경상북도",
        "경상남도",
        "전라북도",
        "전라남도",
        "제주도",
      ],
      value: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "31", "32", "33", "34", "35", "36", "37", "38", "39"],
    };
  },
  methods: {
    changeSido() {
      this.$emit("select-sido");
    },
  },
};
</script>

<style></style>

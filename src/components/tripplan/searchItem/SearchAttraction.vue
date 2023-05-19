<template>
  <v-card class="mx-auto" max-width="500">
    <v-toolbar color="transparent" flat>
      <v-toolbar-title>관광지 검색</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon="mdi-magnify" @click="$refs.search.focus()"> </v-btn>
    </v-toolbar>

    <span style="width: 200px">
      <v-select v-model="selectSido" :items="sidoItems" item-title="state" item-value="code" label="시/도 선택"></v-select>

      <v-select
        clearable
        label="전체 시/도"
        :items="[
          '서울',
          '인천',
          '대전',
          '대구',
          '광주',
          '부산',
          '울산',
          '세종특별자치시',
          '경기도',
          '강원도',
          '충청북도',
          '충청남도',
          '경상북도',
          '경상남도',
          '전라북도',
          '전라남도',
          '제주도',
        ]"
        variant="solo-filled"
      ></v-select>
      <v-select clearable label="전체 구/군" :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']" variant="solo-filled"></v-select>
    </span>

    <v-container>
      <v-row align="center" justify="start">
        <v-col v-for="(selection, i) in selections" :key="selection.text" cols="auto" class="py-1 pe-0">
          <v-chip :disabled="loading" closable @click:close="selected.splice(i, 1)">
            <v-icon :icon="selection.icon" start></v-icon>

            {{ selection.text }}
          </v-chip>
        </v-col>

        <v-col v-if="!allSelected" cols="12">
          <v-text-field ref="search" v-model="search" hide-details label="Search" single-line></v-text-field>
        </v-col>
      </v-row>
    </v-container>

    <v-divider v-if="!allSelected"></v-divider>

    <v-list>
      <template v-for="item in categories">
        <v-list-item v-if="!selected.includes(item)" :key="item.text" :disabled="loading" @click="selected.push(item)">
          <template v-slot:prepend>
            <v-icon :disabled="loading" :icon="item.icon"></v-icon>
          </template>

          <!-- <v-list-item-title v-text="item.text"></v-list-item-title> -->
        </v-list-item>
      </template>
    </v-list>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn :disabled="!selected.length" :loading="loading" color="purple" variant="text" @click="next"> 검색 </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    selectSido: { state: "전체 시/도", code: "0" },
    sidoItems: [
      { text: "서울 ", code: "FL" },
      { state: "인천", code: "GA" },
      { state: "Nebraska", code: "NE" },
      { state: "California", code: "CA" },
      { state: "New York", code: "NY" },
    ],
    items: [
      {
        text: "관광지",
        icon: "mdi-nature",
      },
      {
        text: "문화시설",
        icon: "mdi-glass-wine",
      },
      {
        text: "축제공연행사",
        icon: "mdi-calendar-range",
      },
      {
        text: "여행코스",
        icon: "mdi-map-marker",
      },
      {
        text: "레포츠",
        icon: "mdi-bike",
      },
      {
        text: "숙박",
        icon: "mdi-bike",
      },
      {
        text: "쇼핑",
        icon: "mdi-bike",
      },
      {
        text: "음식점",
        icon: "mdi-bike",
      },
    ],
    loading: false,
    search: "",
    selected: [],
  }),

  computed: {
    allSelected() {
      return this.selected.length === this.items.length;
    },
    categories() {
      const search = this.search.toLowerCase();

      if (!search) return this.items;

      return this.items.filter((item) => {
        const text = item.text.toLowerCase();

        return text.indexOf(search) > -1;
      });
    },
    selections() {
      const selections = [];

      for (const selection of this.selected) {
        selections.push(selection);
      }

      return selections;
    },
  },

  watch: {
    selected() {
      this.search = "";
    },
  },

  methods: {
    next() {
      this.loading = true;

      setTimeout(() => {
        this.search = "";
        this.selected = [];
        this.loading = false;
      }, 2000);
    },
  },
};
</script>

<style></style>

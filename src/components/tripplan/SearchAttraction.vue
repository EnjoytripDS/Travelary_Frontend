<template>
  <!-- <v-container> -->
  <!-- 관광지 추가 / 삭제 가능한 임시 여행 계획 리스트 -->
  <v-row>
    <!-- <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>여행 가자!</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-col>
      <v-row>
        <v-col cols="6">
          <v-select
            :items="selectSido"
            label="시/도"
            prepend-icon="mdi-map"
            solo
          ></v-select>
        </v-col>
        <v-col cols="6">
          <v-select :items="selectGugun" label="구/군" solo></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            v-model="value"
            :items="items"
            chips
            label="관광지 유형"
            multiple
            solo
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="10">
          <v-text-field
            label="검색어를 입력해주세요"
            placeholder="검색어"
            solo
            v-model="keyword"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-btn icon @click="$refs.search.focus()" style="color: darkblue">
            <v-icon large>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <!-- 관광지 검색 결과 리스트-->
      <v-row>
        <v-col padding="0">
          <v-virtual-scroll :items="items" :item-height="380" height="800">
            <v-card class="mx-auto" max-height="350" max-width="500">
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                height="160px"
                cover
              ></v-img>

              <v-card-title> Top western road trips </v-card-title>

              <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

              <v-card-actions>
                <v-btn color="orange-lighten-2" variant="text"> DETAILS </v-btn>

                <v-spacer></v-spacer>

                <v-btn class="sx-2" fab dark color="indigo">
                  <v-icon dark> mdi-plus </v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-virtual-scroll>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <!-- </v-container> -->
</template>

<script>
export default {
  components: {},
  data: () => ({
    drawer: true,
    mini: true,
    active: true,
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
      },
      {
        text: "문화시설",
      },
      {
        text: "축제공연행사",
      },
      {
        text: "여행코스",
      },
      {
        text: "레포츠",
      },
      {
        text: "숙박",
      },
      {
        text: "쇼핑",
      },
      {
        text: "음식점",
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

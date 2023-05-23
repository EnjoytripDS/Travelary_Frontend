<template>
  <!-- <v-container> -->
  <v-row>
    <v-col>
      <v-row>
        <v-col cols="6">
          <v-select
            :items="sidoItems"
            v-model="sidoCode"
            label="시/도"
            prepend-icon="mdi-map"
            solo
            @change="changeSido"
          ></v-select>
        </v-col>
        <v-col cols="6">
          <v-select
            :items="gugunItems"
            v-model="gugunCode"
            label="구/군"
            solo
          ></v-select>
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
import TripPlanStore from "@/store/modules/TripPlan";
// import SelectSido from "./item/SelectSido.vue";
import { mapActions } from "vuex";
export default {
  components: {
    // SelectSido,
  },
  data: () => ({
    drawer: true,
    mini: true,
    active: true,
    sidoCode: "",
    gugunCode: "",
    sidoItems: [
      { text: "전체 ", value: "0" },
      { text: "서울", value: "1" },
      { text: "인천", value: "2" },
      { text: "대전", value: "3" },
      { text: "대구", value: "4" },
      { text: "광주", value: "5" },
      { text: "부산", value: "6" },
      { text: "울산", value: "7" },
      { text: "세종특별자치시", value: "8" },
      { text: "경기도", value: "31" },
      { text: "강원도", value: "32" },
      { text: "충청북도", value: "33" },
      { text: "충청남도", value: "34" },
      { text: "경상북도", value: "35" },
      { text: "경상남도", value: "36" },
      { text: "전라북도", value: "37" },
      { text: "전라남도", value: "38" },
      { text: "제주도", value: "39" },
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
    gugunItems() {
      return this.$store.state.TripPlanStore.guguns;
    },
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
    ...mapActions(TripPlanStore, ["getGugun"]),
    sidoCode() {
      if (this.sidoCode) {
        this.$store.dispatch("TripPlanStore/getGugun", this.sidoCode);
      }
    },
    //
    selected() {
      this.search = "";
    },
  },

  methods: {
    //
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

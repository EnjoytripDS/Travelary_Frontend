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
            v-model="contentTypeList"
            :items="contentItems"
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
          <v-btn icon @click="search" style="color: darkblue">
            <v-icon large>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <!-- 관광지 검색 결과 리스트-->
      <!-- <v-row>
        <tr v-for="result in searchResults" :key="result.title">
          <td>{{ result.title }}</td>
        </tr>
      </v-row> -->
      <v-row>
        <v-col padding="0">
          <v-virtual-scroll :items="items" :item-height="380" height="800">
            <v-card
              v-for="(result, index) in items"
              :key="index"
              class="mx-auto"
              max-height="350"
              max-width="500"
            >
              <v-img :src="result.firstImage" height="160px" cover></v-img>

              <v-card-title> {{ result.title }}</v-card-title>

              <v-card-subtitle>{{ result.addr1 }}</v-card-subtitle>

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
import { mapActions, mapState } from "vuex";
export default {
  components: {},
  data: () => ({
    // drawer: true,
    // mini: true,
    // active: true,
    sidoCode: "",
    gugunCode: "",
    contentTypeList: [],
    keyword: "",
    searchTest: [],

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
    contentItems: [
      {
        text: "관광지",
        value: "12",
      },
      {
        text: "문화시설",
        value: "14",
      },
      {
        text: "축제공연행사",
        value: "15",
      },
      {
        text: "여행코스",
        value: "25",
      },
      {
        text: "레포츠",
        value: "28",
      },
      {
        text: "숙박",
        value: "32",
      },
      {
        text: "쇼핑",
        value: "38",
      },
      {
        text: "음식점",
        value: "39",
      },
    ],
    // loading: false,
    // search: "",
    // selected: [],
  }),

  computed: {
    ...mapState(TripPlanStore, ["guguns", "searchResults"]),
    gugunItems() {
      return this.$store.state.TripPlanStore.guguns;
    },
    searchResults() {
      return this.$store.state.TripPlanStore.searchResults;
    },
    items() {
      return this.searchResults;
    },
    length() {
      return this.searchResults.length; // 50개 보여주기..
    },

    //
    // allSelected() {
    //   return this.selected.length === this.items.length;
    // },
    // categories() {
    //   const search = this.keyword.toLowerCase();

    //   if (!search) return this.searchResults;

    //   return this.searchResults.filter((result) => {
    //     const text = result.title.toLowerCase();

    //     return text.indexOf(search) > -1;
    //   });
    // },
    // selections() {
    //   const selections = [];

    //   for (const selection of this.selected) {
    //     selections.push(selection);
    //   }

    //   return selections;
    // },
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
    search() {
      let searchConditions = {
        sidoCode: this.sidoCode,
        gugunCode: this.gugunCode,
        contentTypeId: this.contentTypeList,
        keyword: this.keyword,
      };

      this.$store.dispatch("TripPlanStore/searchAttractions", searchConditions);
    },
  },
};
</script>

<style></style>

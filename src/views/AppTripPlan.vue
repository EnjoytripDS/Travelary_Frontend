<template>
  <v-container>
    <TheContentHeaderVue />
    <v-row>
      <v-col cols="4">
        <search-attraction margin="0"></search-attraction>
      </v-col>
      <v-col cols="8">
        <the-kakao-map :attractions="attractions"></the-kakao-map>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TheKakaoMap from "@/components/TheKakaoMap.vue";
import SearchAttraction from "@/components/tripplan/SearchAttraction.vue";
import TheContentHeaderVue from "@/components/common/TheContentHeader.vue";
export default {
  name: "AppTripPlan",
  components: {
    TheKakaoMap,
    SearchAttraction,
    TheContentHeaderVue,
  },
  data() {
    return {
      attractions: [],
    };
  },
};
</script>

<style></style>

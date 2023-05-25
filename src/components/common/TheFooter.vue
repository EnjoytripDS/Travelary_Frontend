<template>
  <v-footer dark padless>
    <v-card flat tile class="indigo lighten-1 white--text text-center">
      <v-card-text> </v-card-text>

      <v-card-text class="white--text pt-0">
        Travelary의 서비스와 함께 잊지 못할 추억을 만들어봐요! Travelary는 다양한 여행지 정보 제공합니다. 여행지를 검색하고 편리하게 나만의 여행 계획을
        만들어보세요. 다른 사람들과 여행 경험을 공유해보세요~
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text"> {{ new Date().getFullYear() }} — <strong>Vuetify</strong> </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "TheFooter",
};
</script>

<style></style>

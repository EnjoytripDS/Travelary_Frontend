<template>
  <v-app id="travelary">
    <TheHeader />
    <v-main>
      <router-view />
    </v-main>
    <TheFooter />
  </v-app>
</template>

<script>
import TheHeader from "@/components/common/TheHeader.vue";
import TheFooter from "./components/common/TheFooter.vue";

export default {
  components: { TheHeader, TheFooter },
  name: "App",
  data: () => ({}),
};
</script>

<style scoped lang="scss">
@font-face {
  font-family: "line-seed";
  src: url("@/assets/fonts/LINESeedKR-Rg.ttf");
}

#travelary {
  font-family: "line-seed";
}
</style>

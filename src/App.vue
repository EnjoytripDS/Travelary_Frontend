<template>
  <v-app>
    <the-header />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import TheHeader from "@/components/common/TheHeader.vue";

export default {
  components: { TheHeader },
  name: "App",
  data: () => ({}),
};
</script>

<style scoped lang="scss">
@font-face {
  font-family: "line-seed";
  src: url("@/assets/fonts/LINESeedKR-Rg.ttf");
}
</style>

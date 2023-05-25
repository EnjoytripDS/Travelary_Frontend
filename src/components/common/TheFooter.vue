<template>
  <v-footer
    flat
    tile
    class="indigo lighten-1 white--text text-center"
    style="margin-top: 400px;"
  >
    <v-card-text class="white--text pt-0" style="margin-top: 25px;">
      노성호 윤다정
    </v-card-text>
    <v-card-text class="white--text">
      {{ new Date().getFullYear() }} — <strong>Travelary</strong>
    </v-card-text>
  </v-footer>
</template>

<script>
export default {
  name: "TheFooter",
};
</script>

<style>
</style>

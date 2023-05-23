<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-date-picker v-model="dates" range full-width></v-date-picker>
      </v-col>
      <v-col cols="6">
        <v-text-field v-model="dateRangeText" label="여행 기간" prepend-icon="mdi-calendar" readonly></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      dates: ["2023-05-26"],
    };
  },

  watch: {},

  methods: {},
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },
};
</script>

<style></style>

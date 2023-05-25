<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-date-picker
          v-model="dates"
          range
          full-width
          color="indigo"
        ></v-date-picker>
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="dateRangeText"
          label="여행 기간"
          prepend-icon="mdi-calendar"
          readonly
          color="indigo"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      dates: [],
    };
  },

  watch: {
    dates(newDates) {
      // console.log(newDates);
      this.$store.commit("TripPlanStore/UPDATE_DATES", newDates);
    },
  },

  methods: {},
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },
};
</script>

<style></style>

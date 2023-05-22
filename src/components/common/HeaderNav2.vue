<template>
  <v-navigation-drawer app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6"> Application </v-list-item-title>
        <v-list-item-subtitle> subtext </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: "Home", icon: "mdi-view-dashboard", to: "/" },
      { title: "Q&A", icon: "mdi-image", to: "/qna" },
    ],
    right: null,
  }),
};
</script>

<style></style>

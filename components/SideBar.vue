<template>
  <v-navigation-drawer v-model="drawer" app class="pt-4" color="white lighten-3" mini-variant>
    <v-img
      lazy-src="https://picsum.photos/id/11/10/6"
      max-height="300"
      max-width="500"
      cover
      src="../assets/logo.png"
    ></v-img>
    <v-divider></v-divider>
    <v-list v-for="(item, n) in items" :key="item.icon">
      <v-avatar size="50" class="d-block text-center mx-auto">
        <v-icon :icon="item.icon" size="large"></v-icon>
      </v-avatar>
      <v-list-item class="d-block text-center mx-auto">
        <nuxt-link to="/">{{ item.title }}</nuxt-link>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">


interface Item {
  title: string;
  icon: string;
}
const items: Item[] = [
  // { icon: "mdi-home", title: "Home" },
  { icon: "mdi-github", title: "View On Github" },
];
defineProps({
  drawer: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.border {
  margin-left: 12px;
  margin-right: 12px;
  background: #49d9a0;
  border-radius: 50%;
  text-decoration: none;
}
.v-list-item-group .v-list-item--active {
  color: white !important;
}
.v-icon--size-large {
  font-size: 50px;
}
.v-list {
  i {
    color: #0098ee;
    cursor: pointer;
  }
  a {
    text-decoration: none;
    color: #0098ee;
    font-weight: 700;
  }
}
</style>

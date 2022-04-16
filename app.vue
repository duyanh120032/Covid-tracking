<template>
  <v-app id="inspire" :theme="theme">
    <v-card max-width="1200" :style="{ background: $vuetify.theme.themes.light.background }">
      <v-layout>
        <SideBar :drawer="drawer" />
        <v-app-bar color="white" >
          <template v-slot:prepend>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          </template>

          <v-app-bar-title tag="h1">Covid-19 Tracker </v-app-bar-title>

          <v-spacer></v-spacer>
          <v-btn icon @click="toggleTheme">
            <v-icon>{{`${theme==='light'?'mdi-brightness-4':'mdi-brightness-6'}`}}</v-icon>
          </v-btn>
        </v-app-bar>

        <v-main>
          <v-container>
            <NuxtPage />
          </v-container>
        </v-main>
      </v-layout>

      <Footer />
    </v-card>
  </v-app>
</template>
<script setup >
import { ref } from "vue";
const drawer = ref(false);
const theme = ref("light");
function toggleTheme (){
  theme.value = theme.value === "light" ? "dark" : "light";
};
</script>
<style>
.v-container {
  min-height: 85vh;
}
</style>

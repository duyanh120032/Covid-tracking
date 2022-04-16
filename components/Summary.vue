<template>
  <div>
    <v-row dense v-if="!loading">
      <v-col cols="6" md="3">
        <v-card :loading="false" text-color="white" class="card card-left fill-height">
          <v-card-title>
            <h4 class="">Total Cases</h4>
            <v-icon size="large" right icon="mdi-robot-dead-outline"></v-icon>
          </v-card-title>
          <v-card-text class="text-white">
            <h1 class="my-3">{{ summary.TotalConfirmed }}</h1>
            <div class="text--primary">last updated:{{ summary.Date }}</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" md="3">
        <v-card :loading="false" text-color="white" class="card card-right fill-height">
          <v-card-title>
            <h4 class="">Deaths</h4>
            <v-icon size="large" right icon="mdi-cards-heart-outline"></v-icon>
          </v-card-title>
          <v-card-text class="text-white">
            <h1 class="my-3">{{ summary.TotalDeaths }}</h1>
            <div class="text--primary">last updated:{{ summary.Date }}</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="6" md="3">
        <v-card class="text-blue fill-height">
          <v-card-title>
            <h4>New Case</h4>
            <v-icon size="large" right icon="mdi-face-mask-outline" color="#0098EE"></v-icon>
          </v-card-title>
          <v-card-text class="text-blue">
            <h1 class="my-3">{{ summary.NewConfirmed }}</h1>
            <h4>last updated:{{ summary.Date }}</h4>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" md="3">
        <v-card class="text-blue fill-height">
          <v-card-title>
            <h4>Active Cases</h4>
            <v-icon size="large" right icon="mdi-bed" color="#0098EE"></v-icon>
          </v-card-title>
          <v-card-text class="text-blue">
            <h1 class="my-3">{{ summary.NewConfirmed }}</h1>
            <h4>last updated:{{ summary.Date }}</h4>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-progress-circular indeterminate color="purple" v-if="loading"></v-progress-circular>
  </div>
</template>

<script setup lang="ts">
import { GlobalSummary } from "../pages/index.vue";
import { PropType } from "vue";

defineProps({
  summary: {
    type: Object as PropType<GlobalSummary>,
    default: () => ({}),
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.card-left {
  background-image: linear-gradient(to right, #0098ee, #00eeb5);
  font-weight: bold;
}
.card-right {
  background-image: linear-gradient(to left, #00eeb5, #00eeb5);
  font-weight: bold;
}
.v-card-title {
  justify-content: space-between;
  font-weight: 400;
}
</style>

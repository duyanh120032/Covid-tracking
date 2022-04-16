<template>
  <v-card class="mx-auto fill-height" color="#26c6da" theme="dark" max-width="400">
    <v-card-title>
      <v-icon size="large" left icon="mdi-emoticon-sick"></v-icon>
      <span class="text-h6 font-weight-light">{{ report.Country }}</span>
    </v-card-title>

    <v-card-text>
      <h1 class="my-3">New Cases:{{ report.NewConfirmed }}</h1>
      <h4 class="my-3">Total Comfirmed:{{ report.TotalConfirmed }}</h4>
      <p>last updated:{{ report.Date }}</p>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="orange-lighten-2"
        variant="text"
        :to="{ name: 'CountryDetail', params: { id: report.CountryCode } }"
      >
        Explore
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he could deliver. You won't
          have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll
          go with that data file! Hey, you add a one and two zeros to that or we walk! You're going
          to do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
const show = ref(false);
const props = defineProps({
  report: {
    type: Object,
    default: () => ({}),
  },
});

props.report.Date = new Date(props.report.Date).toLocaleDateString();
</script>

<style lang="scss" scoped></style>

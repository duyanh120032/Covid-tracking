<!-- <template>
  <Suspense>
    <template #default>
      <div v-if="dataCountries.countries.length > 0">
      <v-row>
        <v-col cols="12">
          <Summary :summary="dataSummary.globalSummary" :loading="dataSummary.loading"></Summary>
        </v-col>
        <v-col cols="12">
          <v-autocomplete
            v-model="dataCountries.selectedCountry"
            :items="dataCountries.contriesNames"
            dense
            filled
            dark
            label="Select a country"
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row v-if="dataCountries.reportByCountry">
        <v-col cols="12" md="6">
          <ReportByCountry :report="dataCountries.reportByCountry" />
        </v-col>
      </v-row>
      <v-row class="report" v-if="dataSummary.countriesSummary">
        <v-col cols="6" md="3" v-for="(report, idx) in computedCountriesSummary">
          <Report :report="report" v-if="idx <= index" />
        </v-col>
      </v-row>
      <div class="fill-height my-3">
        <v-btn block color="secondary" @click="index = index + 4"> More </v-btn>
      </div>
    </div>
    </template>
    <template #fallback>
      <v-progress-circular indeterminate color="purple"></v-progress-circular>
    </template>
  </Suspense>
</template> -->
<template>
  <div>
    <Suspense>
      <template #default>
        <div v-if="dataCountries.countries.length > 0">
          <v-row>
            <v-col cols="12">
              <Summary
                :summary="dataSummary.globalSummary"
                :loading="dataSummary.loading"
              ></Summary>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                v-model="dataCountries.selectedCountry"
                :items="dataCountries.contriesNames"
                dense
                filled
                dark
                label="Select a country"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row v-if="dataCountries.reportByCountry">
            <v-col cols="12" md="6">
              <ReportByCountry :report="dataCountries.reportByCountry" />
            </v-col>
          </v-row>
          <v-row class="report" v-if="dataSummary.countriesSummary">
            <v-col cols="6" md="3" v-for="(report, idx) in computedCountriesSummary">
              <Report :report="report" v-if="idx <= index" />
            </v-col>
          </v-row>
          <div class="fill-height my-3">
            <v-btn block color="secondary" @click="index = index + 4"> More </v-btn>
          </div>
        </div>
      </template>
      <template #fallback>
        <v-progress-circular indeterminate color="purple"></v-progress-circular>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { getCountries, getSummary } from "../api/index";
import { ref, onMounted, watch, reactive, computed } from "vue";

export interface CountrySummaryOld {
  Country: string;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  population: number;
  continent: string;
  oneCasePerPeople: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
  activePerOneMillion: number;
  recoveredPerOneMillion: number;
  criticalPerOneMillion: number;
}
export interface CountrySummary {
  ID: string;
  Country: string;
  CountryCode: string;
  Slug: string;
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: Date;
  Premium: Object;
}

export interface GlobalSummary {
  NewConfirmed: number;
  TotalConfirmed: number;
  todayCases: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: number;
}

const index = ref(6);
const dataCountries = reactive({
  countries: [],
  selectedCountry: "",
  selectedIdCountry: null,
  contriesNames: [],
  countryIso02: null,
  reportByCountry: null,
});
const dataSummary = reactive({
  summary: {} as {
    Countries: CountrySummary[];
    Global: GlobalSummary;
  },

  globalSummary: null as GlobalSummary,
  countriesSummary: null as CountrySummary[],
  loading: false,
});

onMounted(async () => {
  dataSummary.loading = true;
  dataCountries.countries = await getCountries();
  dataCountries.contriesNames = dataCountries.countries.map((country) => country.Country);

  // summary

  dataSummary.summary = await getSummary();
  dataSummary.countriesSummary = dataSummary.summary.Countries;
  dataSummary.globalSummary = dataSummary.summary.Global;
  dataSummary.loading = false;
});

const computedCountriesSummary = computed(() => {
  if (dataSummary.countriesSummary) {
    return dataSummary.countriesSummary.slice(0, index.value);
  }
});
watchEffect(() => {
  if (dataCountries.selectedCountry) {
    dataCountries.reportByCountry = dataSummary.countriesSummary.find(
      (country) => country.Country === dataCountries.selectedCountry
    );
    dataCountries.countryIso02 = dataCountries.countries.find(
      (country) => country.Country === dataCountries.selectedCountry
    ).ISO2;
  }
});
</script>

<style scoped lang="scss">
.report {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  background: rgb(246, 246, 246);
  justify-content: center;

  .v-card {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
}
</style>

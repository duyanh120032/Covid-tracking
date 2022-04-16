<template>
  <div>
    <Suspense>
      <div>
        <v-row class="align-center pa-2">
          <v-col cols="4" centered>
            <v-img :src="data.country.flags?.png"></v-img>
          </v-col>
          <v-col cols="8">
            <v-img src="../assets/Map.png"></v-img>
          </v-col>
        </v-row>
        <v-divider class="my-4"></v-divider>
        <v-row class="align-center">
          <v-col cols="6" md="4">
            <v-card color="#00EEB5" dark class="pa-3">
              <v-card-header
                ><v-row class="justify-space-between pa-2">
                  <span>New Case</span>
                  <v-icon icon="mdi-emoticon-sick" left></v-icon> </v-row
              ></v-card-header>
              <v-card-title class="text-h5">
                {{ data.report.CountryReport.NewCases }}
              </v-card-title>
              <v-card-subtitle> last updated: 22min ago, </v-card-subtitle>
            </v-card>
          </v-col>
          <v-col cols="6" md="4">
            <v-card color="#00EEB5" class="pa-3">
              <v-card-header
                ><v-row class="justify-space-between pa-2">
                  <span>Total Case</span>
                  <v-icon icon="mdi-emoticon-sick" left></v-icon> </v-row
              ></v-card-header>
              <v-card-title class="text-h5">
                {{ data.report.CountryReport.TotalCases }}
              </v-card-title>
              <v-card-subtitle> last updated: 22min ago, </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
        <v-spacer class="my-4"></v-spacer>
        <v-row class="align-center">
          <v-col cols="6" md="4">
            <v-card color="#fff" dark class="pa-3">
              <v-card-header
                ><v-row class="justify-space-between pa-2">
                  <span>New Cases Per Million</span>
                  <v-icon icon="mdi-emoticon-sick" left></v-icon> </v-row
              ></v-card-header>
              <v-card-title class="text-h5">
                {{ data.report.CountryReport.NewCasesPerMillion }}
              </v-card-title>
              <v-card-subtitle> last updated: 22min ago, </v-card-subtitle>
            </v-card>
          </v-col>
          <v-col cols="6" md="4">
            <v-card color="#fff" class="pa-3">
              <v-card-header
                ><v-row class="justify-space-between pa-2">
                  <span>Total Cases Per Million</span>
                  <v-icon icon="mdi-emoticon-sick" left></v-icon> </v-row
              ></v-card-header>
              <v-card-title class="text-h5">
                {{ data.report.CountryReport.TotalCasesPerMillion }}
              </v-card-title>
              <v-card-subtitle> last updated: 22min ago, </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="align-center">
          <v-col cols="6" md="4">
            <v-card color="#fff" dark class="pa-3">
              <v-card-header
                ><v-row class="justify-space-between pa-2">
                  <span>New Deaths</span>
                  <v-icon icon="mdi-emoticon-sick" left></v-icon> </v-row
              ></v-card-header>
              <v-card-title class="text-h5">
                {{ data.report.CountryReport.NewDeaths }}
              </v-card-title>
              <v-card-subtitle> last updated: 22min ago, </v-card-subtitle>
            </v-card>
          </v-col>
          <v-col cols="6" md="4">
            <v-card color="#fff" class="pa-3">
              <v-card-header
                ><v-row class="justify-space-between pa-2">
                  <span>Total Deaths </span>
                  <v-icon icon="mdi-emoticon-sick" left></v-icon> </v-row
              ></v-card-header>
              <v-card-title class="text-h5">
                {{ data.report.CountryReport.TotalDeaths }}
              </v-card-title>
              <v-card-subtitle> last updated: 22min ago, </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="pa-3">
          <LineChart :idCountry="id" />
        </v-row>
      </div>

      <template #fallback> Loading... </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { getPremiumSummary, getCountry } from "../api/index";
import { reactive } from "vue";
import { useRoute } from "vue-router";

type CountrySummary = {
  ID: String;
  CountryISO: String;
  Country: String;
  Continent: String;
  Date: Date;
  TotalCases: Number;
  NewCases: Number;
  TotalDeaths: Number;
  NewDeaths: Number;
  TotalCasesPerMillion: Number;
  NewCasesPerMillion: Number;
  TotalDeathsPerMillion: Number;
  NewDeathsPerMillion: Number;
  StringencyIndex: Number;
  DailyIncidenceConfirmedCases: Number;
  DailyIncidenceConfirmedDeaths: Number;
  DailyIncidenceConfirmedCasesPerMillion: Number;
  DailyIncidenceConfirmedDeathsPerMillion: Number;
  IncidenceRiskConfirmedPerHundredThousand: Number;
  IncidenceRiskDeathsPerHundredThousand: Number;
  IncidenceRiskNewConfirmedPerHundredThousand: Number;
  IncidenceRiskNewDeathsPerHundredThousand: Number;
  CaseFatalityRatio: Number;
};

interface report extends Object {
  ID: String;
  Message: String;
  Countries: CountrySummary[];
  Date: Date;
  CountryReport: CountrySummary;
}
interface Country {
  flags: {
    [key: string]: string;
  };
}
const route = useRoute();
const id = ref(route.params.id || "VN");

const data = reactive({
  country: {} as Country,
  report: {} as report,
});
data.country = await getCountry(id.value);
data.country = data.country[0];
data.report = await getPremiumSummary();
data.report.CountryReport = data.report.Countries.find((item) => item.CountryISO === id.value);
</script>

<style lang="scss" scoped></style>

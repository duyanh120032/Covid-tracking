<template>
  <div style="width: 400px">
    <div style="display: flex; justify-content: center">
      <h2 type="button">Chart</h2>
    </div>
    <LineChart v-bind="lineChartProps" />
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import { LineChart, useLineChart } from "vue-chart-3";
import { Chart, ChartData, ChartOptions, registerables } from "chart.js";
import { getConfirmedCases } from "../api/index";
Chart.register(...registerables);

export default {
  name: "LineChart1",
  components: { LineChart },
  props: {
    idCountry: {
      type: String,
      required: false,
    },
  },
  async setup(props) {
    const idCountry = props.idCountry === undefined ? "VN" : props.idCountry;
    const data1 = await getConfirmedCases(idCountry);
    const getData = computed<ChartData<"line">>(() => ({
      labels: ["January", "February", "March", "April"],
      datasets: [
        {
          label: "Cases",
          data: data1,
          fill: false,
          borderColor: "#4bc0c0",
        },
      ],
    }));

    const options = computed<ChartOptions<"line">>(() => ({
      plugins: {
        legend: {
          display: false,
        },
      },
    }));

    const { lineChartProps } = useLineChart({
      options,
      chartData: getData,
    });

    return {
      getData,
      options,
      lineChartProps,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

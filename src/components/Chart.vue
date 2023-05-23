<template>
  <div class="chart-container">
    <div class="chart-container-body">
      <div class="chart-wrapper">
        <Line ref="lineChartRef" id="chart" :data="(data as any)" :options="(options as any)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { useChart } from './useChart'
import annotationPlugin from 'chartjs-plugin-annotation'
import zoomPlugin from 'chartjs-plugin-zoom'
import 'chartjs-adapter-moment'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  zoomPlugin,
  annotationPlugin
)

const { lineChartRef, data, options } = useChart()
</script>

<style>
.chart-container {
  overflow-x: auto;
}

.chart-container-body {
  overflow-x: auto;
  position: relative;
  width: fit-content;
}

.chart-wrapper {
  height: calc(100vh - 200px);
  width: calc(100vw - 10px);
  min-width: 900px;
}
</style>

<template>
  <div class="chart-container">
    <Line ref="lineChartRef" id="chart" :data="(data as any)" :options="(options as any)" />
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
  position: relative;
  height: 95vh;
}
</style>

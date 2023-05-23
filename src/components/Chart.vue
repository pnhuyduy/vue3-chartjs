<template>
  <div class="chart-container">
    <div class="chart-container-body">
      <!-- <NSpace>
      <NButtonGroup>
        <NButton
          v-for="(btn, index) in btns"
          :key="index"
          @click="onClickBtn(btn.value)"
          :type="btn.value === activeBtn ? 'primary' : 'default'"
        >
          {{ btn.label }}
        </NButton>
      </NButtonGroup>
    </NSpace> -->
      <Line ref="lineChartRef" :data="(data as any)" :options="(options as any)" />
    </div>
  </div>
</template>

<script setup lang="ts">
// import { NSpace, NButtonGroup, NButton } from 'naive-ui'
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

// const activeBtn = ref(1)

// const btns = [
//   {
//     label: '오늘',
//     value: 1,
//   },
//   {
//     label: '주',
//     value: 7,
//   },
//   {
//     label: '월',
//     value: 30,
//   },
//   {
//     label: '년',
//     value: 365,
//   },
// ]

const { data, options } = useChart()

// const onClickBtn = (value: number) => {
//   setData(value)
//   activeBtn.value = value
// }
</script>

<style>
.chart-container {
  position: relative;
  overflow: auto;
  width: 100%;
}

.chart-container-body {
  position: relative;
  height: 300px;
}
</style>

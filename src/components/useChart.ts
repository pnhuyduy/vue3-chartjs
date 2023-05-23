import { computed, onMounted, ref } from 'vue'
import { Tick } from 'chart.js'
import moment from 'moment'
import { nanoid } from 'nanoid/non-secure'

const redDotColor = 'rgba(224, 24, 57, 1)'
const blueDotColor = 'rgba(0, 91, 187, 1)'

const randomFloat = (min: number, max: number) => Math.random() * (max - min) + min
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

interface LineData {
  id: string
  data: {
    timestamp: number
    value: number
  }
}

const defaultxAxisOptions = {
  type: 'time',
  min: moment().startOf('day').toDate().getTime(),
  beginAtZero: true,
  time: {
    unit: 'hour',
    displayFormats: {
      minute: 'HH:mm',
      hour: 'HH:mm',
      day: 'DD/MM',
    },
  },
}
const xAxisOptions = ref(defaultxAxisOptions)

const randomDataInDay = (day = moment().startOf('day')): LineData[] => {
  const hours = randomInt(8, 21)

  const data = Array.from({ length: hours }, (_, index) => {
    const randomSeconds = randomInt(0, 3600)
    let item: LineData = {
      id: nanoid(5),
      data: {
        timestamp: day.add(index, 'h').add(randomSeconds, 's').toDate().getTime(),
        value: randomFloat(70, 210),
      },
    }

    return item
  })

  return data
}

// const randomDataInWeek = (): LineData[] => {
//   let data = []
//   for (let index = 0; index < 7; index++) {
//     data.push(randomDataInDay(moment().startOf('week').add(index, 'd')))
//   }

//   xAxisOptions.value = {
//     type: 'time',
//     min: moment().startOf('week').toDate().getTime(),
//     time: {
//       displayFormats: {
//         day: 'DD/MM'
//       }
//     }
//   }

//   return data.flat()

// }

export const useChart = () => {
  const lineChartRef = ref(null)
  const datasets = ref<LineData[]>([])
  const data = computed(() => {
    return {
      datasets: [
        {
          backgroundColor: '#f87979',
          pointBackgroundColor: function (context: any) {
            if (!context.parsed) return

            const {
              parsed: { y },
            } = context

            return y >= 70 && y <= 180 ? blueDotColor : redDotColor
          },
          data: datasets.value,
        },
      ],
    }
  })

  const options = computed(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        annotation: {
          annotations: {
            box1: {
              drawTime: 'beforeDatasetsDraw',
              type: 'box',
              xMin: 0,
              xMax: Infinity,
              yMin: 70,
              yMax: 180,
              backgroundColor: 'rgba(241, 246, 251, 0.6)',
              borderColor: 'rgba(45, 93, 169, 0.25)',
            },
          },
        },
      },
      scales: {
        x: xAxisOptions.value,
        y: {
          title: {
            display: true,
            text: 'mg/dL',
          },
          beginAtZero: true,
          min: 0,
          max: 300,
          ticks: {
            stepSize: 10,
            callback: function (val: number) {
              if ([60].includes(val)) return ''
              if (val === 70) return val
              return val % 30 === 0 ? val : ''
            },
            color: function (data: { tick: Tick }) {
              if ([70, 180].includes(data.tick.value)) return 'rgba(0, 69, 142, 1)'
              return 'rgba(98, 101, 118, 1)'
            },
            font: {
              size: 12,
              weight: 700,
            },
          },
        },
      },
      parsing: {
        yAxisKey: 'data.value',
        xAxisKey: 'data.timestamp',
      },
    }
  })

  const setData = (days = 1) => {
    let newDatasets: LineData[] = []

    if (days === 1) {
      xAxisOptions.value = JSON.parse(JSON.stringify(defaultxAxisOptions))
      newDatasets = randomDataInDay()
    }

    datasets.value = newDatasets
  }

  onMounted(() => {
    setData()
  })

  return {
    datasets,
    data,
    lineChartRef,
    options,
    setData,
  }
}

import { computed, ref } from "vue"
import { Tick } from 'chart.js';
import moment from 'moment';
import { nanoid } from 'nanoid/non-secure';

const redDotColor = 'rgba(224, 24, 57, 1)'
const blueDotColor = 'rgba(0, 91, 187, 1)'

const randomFloat = (min: number, max: number) => Math.random() * (max - min) + min
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

interface LineData {
  id: string
  data: {
    timestamp: number,
    value: number
  }
}

// Day
const startOfDay = moment().startOf('day')
const startOfWeek = moment().startOf('week')


const defaultxAxisOptions = {
  type: 'time',
  min: startOfDay.toDate().getTime(),
  time: {
    displayFormats: {
      hour: 'HH:mm'
    }
  }
}
const xAxisOptions = ref(JSON.parse(JSON.stringify(defaultxAxisOptions)))

const randomDataInDay = (day = moment().startOf('day')): LineData[] => {
  const hours = randomInt(0, 24)

  const data = Array.from({ length: hours }, (_, index) => {
    const randomSeconds = randomInt(0, 3600)
    let item: LineData = {
      id: nanoid(5),
      data: {
        timestamp: day.add(index, 'hours').add(randomSeconds, 'seconds').toDate().getTime(),
        value: randomFloat(70, 210)
      }
    }

    return item
  })

  xAxisOptions.value = JSON.parse(JSON.stringify(defaultxAxisOptions))


  return data
}

const randomDataInWeek = (): LineData[] => {
  let data = []
  for (let index = 0; index < 6; index++) {
    data.push(randomDataInDay(startOfWeek.add(index, 'days')))
  }

  xAxisOptions.value = {
    type: 'time',
    min: startOfWeek.toDate().getTime(),
    time: {
      displayFormats: {
        hour: 'HH:mm'
      }
    }
  }

  return data.flat()

}

export const useChart = () => {
  const datasets = ref(randomDataInDay())
  const data = computed(() => {
    return {
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          pointBackgroundColor: function (context: any) {
            const {
              parsed: { y },
            } = context

            return y >= 70 && y <= 180 ? blueDotColor : redDotColor
          },
          data: datasets.value
        }
      ]
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
              return val % 30 === 0 ? val : '';
            },
            color: function (data: { tick: Tick }) {
              if ([70, 180].includes(data.tick.value)) return 'rgba(0, 69, 142, 1)'
              return 'rgba(98, 101, 118, 1)'
            },
            font: {
              size: 12,
              weight: 700
            }
          },
        },

      },
      parsing: {
        yAxisKey: 'data.value',
        xAxisKey: 'data.timestamp'
      }
    }
  })

  const setData = (days = 1) => {
    let newDatasets: LineData[] = []


    if (days === 1) {
      newDatasets = randomDataInDay()
    } else if (days === 7) {
      newDatasets = randomDataInWeek()
    }

    datasets.value = newDatasets
  }

  return {
    datasets,
    data,
    options,
    setData
  }
}
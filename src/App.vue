<script setup lang="ts">
import { NConfigProvider, GlobalThemeOverrides } from 'naive-ui'
import Chart from './components/Chart.vue'

const baseColor = 'rgba(222, 234, 246, 1)'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: baseColor,
    primaryColorHover: baseColor,
    primaryColorPressed: baseColor,
    baseColor: '#5482AB',
  },
  Button: {
    textColor: '#A3A5AE',
  },
}
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <Chart />
  </n-config-provider>
</template>

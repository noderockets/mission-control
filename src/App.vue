<template>
  <div id="app">
    <div>
      <Button @click="handleClick" label="LAUNCH THE MISSILES" />
      <Button @click="increment" label="LOAD IT UP" />
      <Button @click="randomData" label="CHART DATA" />
    </div>
    <Gauge :progress="num" />
    <LineChart :data="chartData" />
    <Rocket :rocketData="rocketData" width="499px" height="499px"/>
    <Logger :logStream="bus" />
  </div>
</template>

<script>
import Vue from 'vue'

import Rocket from './components/rocketModel/index.vue'
import api from './api'
import Button from './components/button.vue'
import Gauge from './components/gauge.vue'
import LineChart from './components/lineChart.vue'
import Logger from './components/logger.vue'

const rocketApi = api({
  rocketURL: 'http://10.0.0.118'
})

const bus = new Vue()

rocketApi.onData(msg => {
  bus.$emit('data', msg)
})

rocketApi.onRocketData(msg => {
  bus.$emit('rocketData', msg)
})

export default {
  name: 'app',
  components: {
    Button,
    Gauge,
    LineChart,
    Logger,
    Rocket
  },
  data: () => ({
    chartData: [],
    num: 0,
    bus,
    rocketData: {}
  }),
  methods: {
    increment() {
      this.num += 5
    },
    randomData() {
      const prevX = this.chartData.length 
      this.chartData.push({x: prevX + 1, y: Math.random() * 500})
    },
    handleClick() {
      rocketApi.armParachute()
    }
  },
  mounted() {
    bus.$on('rocketData', msg => {
      this.rocketData = msg
    })
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: sans-serif;
}

#app {
  height: 100vh;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 2fr 1fr;
}

.logs {
  grid-column: 1 / 3;
  grid-row: 2 / 4;
}
</style>

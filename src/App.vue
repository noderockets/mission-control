<template>
  <div id="app">
    <Button @click="handleClick" label="LAUNCH THE MISSILES" />
    <Button @click="increment" label="LOAD IT UP" />
    <Button @click="randomData" label="CHART DATA" />
    <Gauge :progress="num" />
    <LineChart :data="chartData" />
    <Logger :logs="logs"/>
    <Rocket width="499px" height="499px"/>
   </div>
</template>

<script>
import Vue from 'vue'

import Rocket from './components/rocketModel/index.vue'
import Button from './components/button.vue'
import Gauge from './components/gauge.vue'
import LineChart from './components/lineChart.vue'
import Logger from './components/logger.vue'
import api from './api'

const rocketApi = api({
  rocketURL: 'http://10.0.0.118'
})

const bus = new Vue()

rocketApi.onData((type, msg) => {
  msg = msg || {}
  msg.type = type
  bus.$emit('data', msg)
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
  mounted () {
    bus.$on('data', msg => {
      this.logs.unshift(msg)
      if (this.logs.length > 1000) this.logs.length = 1000
    })
  },
  data: () => ({
    chartData: [],
    num: 0,
    logs: []
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
  }
}
</script>

<style>
</style>

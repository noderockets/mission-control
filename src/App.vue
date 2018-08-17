<template>
  <div id="app">
    <Gauge :progress="50" />
    <LineChart :data="chartData" />
    <Rocket :rocketData="rocketData" width="499px" height="499px"/>
    <Parsed :rocketData="rocketData" />
    <Actions
      @arm-parachute="armParachute"
      @disarm-parachute="disarmParachute"
      @deploy-parachute="deployParachute"
    />
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
import Actions from './components/actions.vue'
import Parsed from './components/parsed.vue'
import Logger from './components/logger.vue'

const rocketApi = api({
  rocketURL: 'http://10.0.0.118'
})

const bus = new Vue()

rocketApi.onData(msg => {
  bus.$emit('data', msg)
})

rocketApi.onRocketData(msg => {
  bus.$emit('rocket-data', msg)
})

export default {
  name: 'app',
  components: {
    Actions,
    Button,
    Gauge,
    LineChart,
    Logger,
    Parsed,
    Rocket
  },
  data: () => ({
    rocketData: {},
    bus
  }),
  methods: {
    armParachute: rocketApi.armParachute,
    disarmParachute: rocketApi.disarmParachute,
    deployParachute: rocketApi.deployParachute
  },
  mounted() {
    bus.$on('rocket-data', msg => {
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

<template>
  <div id="app">
    <LineChart :data="chartData" />
    <Rocket :rocketData="rocketData" width="499px" height="499px"/>
    <Gauge :progress="50" />
    <Tabs>
      <Tab title="Logs">
        <Logger :logStream="bus" />
      </Tab>
      <Tab title="Parsed">
        <Parsed :rocketData="rocketData" />
      </Tab>
      <Tab title="Actions">
        <Actions
          @arm-parachute="armParachute"
          @disarm-parachute="disarmParachute"
          @deploy-parachute="deployParachute"
        />
      </Tab>
      <Tab title="Strategies">
        Strategies will go here!
      </Tab>
    </Tabs>
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
import Tabs from './components/tabs.vue'
import Tab from './components/tab.vue'
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
    Rocket,
    Tabs,
    Tab
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
}
</style>

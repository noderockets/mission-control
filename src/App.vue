<template>
  <div id="app">
    <LineChart id="line" :data="altitude" :headers="['Time', 'Altitude']"/>
    <div class="right-section">
      <Rocket :rocketData="rocketData" :width="200" :height="500"/>
      <Gauge :progress="50" />
      <MaxMin :data="altitude" label="Altitude" />
    </div>
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

import api from './api'
import Actions from './components/actions.vue'
import Button from './components/button.vue'
import Gauge from './components/gauge.vue'
import LineChart from './components/lineChart.vue'
import MaxMin from './components/maxMin.vue'
import Logger from './components/logger.vue'
import Parsed from './components/parsed.vue'
import Rocket from './components/rocketModel/index.vue'
import Tabs from './components/tabs.vue'
import Tab from './components/tab.vue'

const rocketApi = api({
  // rocketURL: 'http://10.0.0.118'
  rocketURL: 'localhost:1235'
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
    MaxMin,
    Parsed,
    Rocket,
    Tabs,
    Tab
  },
  data: () => ({
    rocketData: {},
    bus
  }),
  computed: {
    accelerometer () {
      return this.rocketData.accelerometer || {}
    },
    altitude () {
      // Convert meters to feet
      return Math.round((this.rocketData.altitude || 0) * 3.28084)
    },
    gyroscope () {
      return this.rocketData.gyroscope || {}
    },
    magnetometer () {
      return this.rocketData.magnetometer || {}
    }
  },
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
  display: flex;
}

#line {
  flex: 1;
}

.right-section {
  display: flex;
  flex-direction: column;
}

.right-section > :last-child {
  padding-top: 30px;
}
</style>

<template>
  <div id="app">
    <LineChart id="line" :data="rocketData" :headers="['Time', 'Altitude']"/>
    <div class="right-section">
      <Rocket :rocketData="rocketData" :width="200" :height="500"/>
      <Gauge :progress="50" />
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
          @reset-parachute="resetParachute"
        />
      </Tab>
      <Tab title="Strategies">
        <Strategies
          :strategies="strategies"
          @activate-strategy="activateStrategy"
          @deactivate-strategy="deactivateStrategy"
          @update-strategy="updateStrategy"
        />
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
import Logger from './components/logger.vue'
import Parsed from './components/parsed.vue'
import Rocket from './components/rocketModel/index.vue'
import Strategies from './components/strategies.vue'
import Tabs from './components/tabs.vue'
import Tab from './components/tab.vue'

const rocketApi = api({
  // rocketURL: 'http://10.0.0.118'
  // rocketURL: 'localhost:1235'
  // rocketURL: 'ws://10.0.0.141'
  rocketURL: 'ws://10.0.0.50'
})

const bus = new Vue()

rocketApi.onData(msg => {
  bus.$emit('data', msg)
})

rocketApi.onRocketData(msg => {
  bus.$emit('rocket-data', msg)
})

rocketApi.onStrategyData(msg => {
  bus.$emit('strategy-data', msg)
})

rocketApi.onStrategyLog(msg => {
  bus.$emit('strategy-log', msg)
})

rocketApi.onStrategyError(msg => {
  bus.$emit('strategy-error', msg)
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
    Strategies,
    Tabs,
    Tab
  },
  data: () => ({
    rocketData: {},
    strategies: [],
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
    deployParachute: rocketApi.deployParachute,
    resetParachute: rocketApi.resetParachute,
    activateStrategy: rocketApi.activateStrategy,
    updateStrategy: rocketApi.updateStrategy,
    deactivateStrategy: rocketApi.deactivateStrategy
  },
  mounted() {
    bus.$on('rocket-data', msg => {
      this.rocketData = msg
    })
    bus.$on('strategy-data', msg => {
      this.strategies = msg
    })
    bus.$on('strategy-log', msg => {
      console.log('strategy log:', JSON.stringify(msg, null, 2))
    })
    bus.$on('strategy-error', msg => {
      console.error('strategy error:', JSON.stringify(msg, null, 2))
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

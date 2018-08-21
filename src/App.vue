<template>
  <div id="app">
    <LineChart id="line" :data="accelerometer" :height="400" :width="400"/>
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
        />
      </Tab>
      <Tab title="Strategies">
        <Strategies
          :strategies="strategies"
          @activate-strategy="activateStrategy"
          @deactivate-strategy="deactivateStrategy"
        />
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
import Strategies from './components/strategies.vue'
import Tabs from './components/tabs.vue'
import Tab from './components/tab.vue'
import Parsed from './components/parsed.vue'
import Logger from './components/logger.vue'

const rocketApi = api({
  rocketURL: 'ws://10.0.0.141'
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
    activateStrategy: rocketApi.activateStrategy,
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
      console.log('strategy log:', msg)
    })
    bus.$on('strategy-error', msg => {
      console.error('strategy error:', msg)
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

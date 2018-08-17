<template>
  <div id="app">
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

import api from './api'
import Button from './components/button.vue'
import Gauge from './components/gauge.vue'
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
    Button,
    Gauge,
    Actions,
    Tabs,
    Tab,
    Parsed,
    Logger
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
  mounted () {
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
  grid-template-columns: repeat(4, 25vw);
  grid-template-rows: repeat(3, 33.33vh);
  grid-template:
    'a a a b'
    'a a a c'
    'd d d d';
}
</style>

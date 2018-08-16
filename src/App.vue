<template>
  <div id="app">
    <div>
      <Button @click="handleClick" label="LAUNCH THE MISSILES" />
      <Button @click="increment" label="LOAD IT UP" />
    </div>
    <Gauge :progress="num" />
    <Logger :logStream="bus" />
  </div>
</template>

<script>
import Vue from 'vue'

import api from './api'
import Button from './components/button.vue'
import Gauge from './components/gauge.vue'
import Logger from './components/logger.vue'

const rocketApi = api({
  rocketURL: 'http://10.0.0.118'
})

const bus = new Vue()

rocketApi.onData(msg => {
  bus.$emit('data', msg)
})

export default {
  name: 'app',
  components: {
    Button,
    Gauge,
    Logger
  },
  data: () => ({
    num: 0,
    bus
  }),
  methods: {
    increment() {
      this.num += 5
    },
    handleClick() {
      rocketApi.armParachute()
    }
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

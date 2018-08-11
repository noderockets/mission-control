<template>
  <div id="app">
    <Button @click="handleClick" label="LAUNCH THE MISSILES" />
    <Button @click="increment" label="LOAD IT UP" />
    <Gauge :progress="num" />
    <Logger :logs="logs"/>
   </div>
</template>

<script>
import Vue from 'vue'

import Button from './components/button.vue'
import Gauge from './components/gauge.vue'
import Logger from './components/logger.vue'
import api from './api'

const rocketApi = api({
  rocketURL: 'http://10.0.0.117'
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
    Logger
  },
  mounted () {
    bus.$on('data', msg => {
      this.logs.unshift(msg)
      if (this.logs.length > 1000) this.logs.length = 1000
    })
  },
  data: () => ({
    num: 0,
    logs: []
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
</style>

<template>
  <div id="app">
    <Logger :logs="logs"/>
  </div>
</template>

<script>
import Vue from 'vue'

import Logger from './components/logger.vue'
import api from './api'

const rocketApi = api({
  rocketIP: '10.0.0.117'
})

const bus = new Vue()

rocketApi.onRocketData((msg) => {
  bus.$emit('data', msg)
})

export default {
  name: 'app',
  components: {
    Logger
  },
  mounted () {
    bus.$on('data', msg => {
      this.logs.unshift(msg)
      if (this.logs.length > 10) this.logs.length = 10
    })
  },
  data: () => ({
    logs: []
  })
}
</script>

<style>
</style>

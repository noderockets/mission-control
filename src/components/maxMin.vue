<template>
  <div class="wrapper" :data="data">
    <h3>{{label}}</h3>
    <h4 class="max">Max: {{max}}</h4>
    <h4 class="min">Min: {{min}}</h4>
    <h4 class="current">Current: {{current}}</h4>
  </div>
</template>

<script>
export default {
  name: 'MaxMin',
  props: {
    data: Number,
    label: String
  },
  methods: {
  },
  created () {
    this.max = -Infinity
    this.min = Infinity
    this.current = 0
  },
  updated () {
    this.current = this.data
    if (this.current > this.max) this.max = this.current
    if (this.current < this.min) this.min = this.current
  }
}
</script>

<style scoped>
</style>

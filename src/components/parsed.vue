<template>
  <div>
    <h3>Parsed</h3>
    <table>
      <thead>
        <th>Statistic</th>
        <th>Current</th>
        <th>Min</th>
        <th>Max</th>
      </thead>
      <tbody>
        <tr>
          <td>Temperature</td>
          <td>{{temperature.current}}</td>
          <td>{{temperature.min}}</td>
          <td>{{temperature.max}}</td>
        </tr>
        <tr>
          <td>Pressure</td>
          <td>{{pressure.current}}</td>
          <td>{{pressure.min}}</td>
          <td>{{pressure.max}}</td>
        </tr>
        <tr>
          <td>Altitude</td>
          <td>{{altitude.current}}</td>
          <td>{{altitude.min}}</td>
          <td>{{altitude.max}}</td>
        </tr>
      </tbody>
    </table>
    <div>Accelerometer: X: {{accelerometer.x}} Y: {{accelerometer.y}} Z: {{accelerometer.z}}</div>
    <div>Gyroscope: X: {{gyroscope.x}} Y: {{gyroscope.y}} Z: {{gyroscope.z}}</div>
    <div>Magnetometer: X: {{magnetometer.x}} Y: {{magnetometer.y}} Z: {{magnetometer.z}}</div>
    <div>Time: {{new Date(rocketData.timestamp).toLocaleTimeString()}}</div>
  </div>
</template>

<script>

function trim (num) {
  return Math.round(num * 100) / 100
}

export default {
  name: 'Parsed',
  props: ['rocketData'],
  data: () => ({
    temperature: { current: null, max: -Infinity, min: Infinity },
    pressure: { current: null, max: -Infinity, min: Infinity },
    altitude: { current: null, max: -Infinity, min: Infinity }
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
  methods:{
    calculate (stat) {
      const val = this[stat].current = trim(this.rocketData[stat])
      if (val > this[stat].max) this[stat].max = val
      if (val < this[stat].min) this[stat].min = val
    }
  },
  updated () {
    this.calculate('temperature')
    this.calculate('pressure')
    this.calculate('altitude')
  }
}
</script>

<style scoped>
td {
  width: 200px;
  text-align: center;
}
</style>

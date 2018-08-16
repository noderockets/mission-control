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
          <td>{{truncated.temperature}}</td>
          <td>{{temperature.min}}</td>
          <td>{{temperature.max}}</td>
        </tr>
        <tr>
          <td>Pressure</td>
          <td>{{truncated.pressure}}</td>
          <td>{{pressure.min}}</td>
          <td>{{pressure.max}}</td>
        </tr>
        <tr>
          <td>Altitude</td>
          <td>{{truncated.altitude}}</td>
          <td>{{altitude.min}}</td>
          <td>{{altitude.max}}</td>
        </tr>
      </tbody>
    </table>
    <div>Accelerometer: X: {{rocketData.accelerometer.x}} Y: {{rocketData.accelerometer.y}} Z: {{rocketData.accelerometer.z}}</div>
    <div>Gyroscope: X: {{rocketData.gyroscope.x}} Y: {{rocketData.gyroscope.y}} Z: {{rocketData.gyroscope.z}}</div>
    <div>Magnetometer: X: {{rocketData.magnetometer.x}} Y: {{rocketData.magnetometer.y}} Z: {{rocketData.magnetometer.z}}</div>
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
    temperature: { max: -Infinity, min: Infinity },
    pressure: { max: -Infinity, min: Infinity },
    altitude: { max: -Infinity, min: Infinity }
  }),
  computed: {
    truncated () {
      return {
        temperature: trim(this.rocketData.temperature),
        pressure: trim(this.rocketData.pressure),
        altitude: trim(this.rocketData.altitude),
      }
    }
  },
  methods:{
    calculateExtremes (stat) {
      if (this.truncated[stat] > this[stat].max) this[stat].max = this.truncated[stat]
      if (this.truncated[stat] < this[stat].min) this[stat].min = this.truncated[stat]
    }
  },
  updated () {
    this.calculateExtremes('temperature')
    this.calculateExtremes('pressure')
    this.calculateExtremes('altitude')
  }
}
</script>

<style scoped>
td {
  width: 200px;
  text-align: center;
}
</style>

<template>
  <div :data="data" class="wrapper">
    <GChart
      class="chart"
      type="LineChart"
      :data="chartData"
      :options="chartOptions"
      ref="gChart"
    />
  </div>
</template>

<script>
  import { GChart } from 'vue-google-charts'
  import { get } from 'lodash'

  export default {
    components: {
      GChart
    },
    props: {
      data: { type: Number, default: 0 },
      headers: { type: Array, default: ["Time", "Variation"] },
      height: { type: Number, default: 500 },
      width: { type: Number, default: 500 }
    },
    created() {
      this.startTime = Date.now()
      
      this._headers = [ this.headers ]
      this.chartPoints = []

      this.drawChart()

      this.chartOptions = {
        chart: { title: "Rocket Line Chart" }
      }
    },
    methods: {
      drawChart: function () {
        const chart = this.$refs.gChart
        this.chartData = this._headers.concat(this.chartPoints)
        if (chart) {
          chart.drawChart()
        }
      }
    },
    updated () {
      const curTime = Date.now()
      const deltaT = (curTime - this.startTime) / 1000 // convert to seconds

      this.chartPoints.unshift([deltaT, this.data])
      // Rolling 3 second window
      if (deltaT > 3) this.chartPoints.pop()

      this.drawChart()
    }
  }
</script>

<style scoped>
</style>
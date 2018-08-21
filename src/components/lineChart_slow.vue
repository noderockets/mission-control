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

  const REFRESH_INTERVAL = .5
  const WINDOW_SIZE_SECONDS = 15

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
        if (chart) chart.drawChart()
      },
      shouldUpdate: function () {
        // initialize
        if (!this.timeA) this.timeA = Date.now()
        if (!this.timeB) this.timeB = Date.now()

        // when first coming set timeB to Date.now
        this.timeB = Date.now()

        if ((this.timeB - this.timeA) / 1000 > REFRESH_INTERVAL) {
          this.timeA = Date.now()
          return true
        } else {
          return false
        }
      }
    },
    updated () {
      if (! this.shouldUpdate()) return
      const curTime = Date.now()
      const deltaT = (curTime - this.startTime) / 1000 // convert to seconds

      this.chartPoints.unshift([deltaT, this.data])
      
      console.log(this.chartPoints.length)
      // Rolling 3 second window
      if (deltaT > WINDOW_SIZE_SECONDS) this.chartPoints.pop()

      this.drawChart()
    }
  }
</script>

<style scoped>
</style>
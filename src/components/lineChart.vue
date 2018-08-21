<template>
  <svg :width="width" :height="height">
    <g :transform="`translate(${margin.left},${margin.top})`">
      <g ref="xAxis" class="x axis" :transform="`translate(0, ${_height})`" />
      <g ref="yAxis" class="y axis" />
      <path class="line" :d="line(chartData)" fill="none" stroke="steelblue" :stroke-width="1.5" />
    </g>
  </svg>
</template>

<script>
  import * as d3 from 'd3'
  import { get } from 'lodash'

  export default {
    props: {
      data: { type: Object },
      headers: { type: Array, default: ["Time", "Variation"] },
      height: { type: Number, default: 500 },
      width: { type: Number, default: 500 }
    },
    data: () => ({
      chartData: [],
      margin: { top: 20, right: 20, bottom: 30, left: 50 }
    }),
    computed: {
      _width () {
        return this.width - this.margin.left - this.margin.right
      },
      _height () {
        return this.height - this.margin.top - this.margin.bottom
      },
      line () {
        return d3.line()
          .x(d => this.xScale(d.timestamp))
          .y(d => this.yScale(d.altitude))
      }
    },
    mounted() {
      this.startTime = Date.now()

      this.xScale = d3.scaleTime().rangeRound([0, this._width])
      this.yScale = d3.scaleLinear().rangeRound([this._height, 0])

      this.xAxis = d3.axisBottom().scale(this.xScale)
      this.yAxis = d3.axisLeft().scale(this.yScale)

      d3.select(this.$refs.xAxis).call(this.xAxis)
      d3.select(this.$refs.yAxis).call(this.yAxis)
    },
    watch: {
      data (data) {
      if (!this.xScale || !this.yScale) return
        if (this.chartData.length > 1000) this.chartData.shift()
        this.chartData.push(data)

        this.xScale.domain(d3.extent(this.chartData, d => d.timestamp))
        this.yScale.domain(d3.extent(this.chartData, d => d.altitude))

        d3.select(this.$refs.xAxis).call(this.xAxis)
        d3.select(this.$refs.yAxis).call(this.yAxis)
      }
    },
    updated () {
    }
  }
</script>

<style scoped>
.line {
  fill: none;
  stroke: steelblue;
  stroke-width: 3px;
}
</style>
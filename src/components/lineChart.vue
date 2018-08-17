<template>
  <svg :width="width" :height="height" :data="data" ref="svg">
    <g ref="chart"></g>
    <g ref="axis"></g>
  </svg>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'LineChart',
  props: {
    data: {
      type: Object,
      default: { x: 0, y: 0}
    },
    height: {
      type: Number,
      default: 500
    },
    width: {
      type: Number,
      default: 500
    }
  },
  computed: {
    xScale: function () {
      return d3.scaleLinear().domain([0, 5]).range([0, this.width - 40])
    },
    yScale: function () {
      return d3.scaleLinear().domain([5, -5]).range([0, this.height - 80])
    }
  },
  mounted() {
    const margin = { top: 40, left: 40, bottom: 40, right: 0 }

    const yAxis = d3.axisLeft(this.yScale).tickSizeInner(0 - this.height)
    const xAxis = d3.axisBottom(this.xScale)

    const chartWidth = this.width
    const chartHeight = this.height

    d3.select(this.$refs.chart)
      .attr('width', chartWidth)
      .attr('height', chartHeight)
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    d3.select(this.$refs.axis)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .attr('class', 'axis y')
      .call(yAxis)

    d3.select(this.$refs.axis)
      .append('g')
      .attr(
        'transform',
        `translate(${margin.left}, ${chartHeight - 40})`
      )
      .attr('class', 'axis x')
      .call(xAxis)
  },
  updated () {
    // const now = Date.now()
    // const deltaTime = now - (this.prevTime || now)

    // const { x, y } = this.data
    // const line = d3.line().x(d => x).y(d => y)

    // const chart = d3.select(this.$refs.chart)

    // chart.transition().duration(deltaTime).ease('linear')
    //   .append('svg:path')
    //   .attr('transform', 'translate(' + 40 + ',0)')
    //   .attr('g', line)

    // this.prevTime = now
  }
}
</script>

<style>
</style>
<template>
  <svg :width="width" :height="height" :data="data" ref="svg">
    <g ref="chart"></g>
    <g ref="axis"></g>
  </svg>
</template>

<script>
import * as d3 from 'd3'
import { each } from 'lodash'

const MAX_LENGTH = 100

export default {
  name: 'LineChart',
  props: {
    data: {
      type: Object,
      default: { x: 0, y: 0 }
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
      return d3.scaleLinear().domain([0, 5]).range([0, this.width])
    },
    yScale: function () {
      return d3.scaleLinear().domain([5, -5]).range([0, this.height - (this.margin.top + this.margin.bottom)])
    }
  },
  mounted() {
    this.snapshot = [
      { x: 0, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 4 },
      { x: 4, y: 5 },
      { x: 5, y: 6 }
    ]
    this.margin = { top: 40, left: 40, bottom: 40, right: 0 }

    const buildLine = d3.line()
      .x(d => {
        console.log(d)
        console.log(this.xScale(d.x))
        return this.xScale(d.x)
      })
      .y(d => this.yScale(d.y))

    const yAxis = d3.axisLeft(this.yScale).tickSizeInner(0 - this.height)
    const xAxis = d3.axisBottom(this.xScale)

    const chartWidth = this.width
    const chartHeight = this.height

    d3.select(this.$refs.chart)
      .attr('width', chartWidth)
      .attr('height', chartHeight)
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)

    d3.select(this.$refs.chart)
      .append('path')
      .attr('class', 'line')
      .attr('d', buildLine(this.snapshot))

    d3.select(this.$refs.axis)
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .attr('class', 'axis y')
      .call(yAxis)

    d3.select(this.$refs.axis)
      .append('g')
      .attr(
        'transform',
        `translate(${this.margin.left}, ${chartHeight - 40})`
      )
      .attr('class', 'axis x')
      .call(xAxis)
  },
  updated () {
    // const now = Date.now()
    // const deltaTime = now - (this.prevTime || now)

    // this.snapshot.unshift(this.data)

    // if (this.snapshot.length > MAX_LENGTH) {
    //   this.snapshot.length = MAX_LENGTH
    // }




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
.line {
  fill: none;
  opacity: 0;
  stroke: grey;
}
</style>
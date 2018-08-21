<template>
  <div :data="data">
    <svg :width="width" :height="height"/>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import { get } from 'lodash'

  const margin = { top: 20, right: 20, bottom: 30, left: 50 }

  export default {
    props: {
      data: { type: Number, default: 0 },
      headers: { type: Array, default: ["Time", "Variation"] },
      height: { type: Number, default: 500 },
      width: { type: Number, default: 500 }
    },
    mounted() {
      this.startTime = Date.now()
      this.chartData = []

      this._width = this.width - margin.left - margin.right
      this._height = this.height - margin.top - margin.bottom

      this.xScale = d3.scaleTime().rangeRound([0, this._width])
      this.yScale = d3.scaleLinear().rangeRound([this._height, 0])
      
      this.xAxis = d3.axisBottom().scale(this.xScale)
      this.yAxis = d3.axisLeft().scale(this.yScale)

      const svg = d3.select('svg')
        .attr('width', this._width + margin.left + margin.right)
        .attr('height', this._height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)

      svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0,${this._height})`)
        .call(this.xAxis)

      svg.append('g')
        .attr('class', 'y axis')
        .call(this.yAxis)
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', ".71em")
        .style('text-anchor', 'end')
        .text('Altitude')

      svg.append('path')
        .datum(this.chartData)
        .attr('class', 'line')
        .attr('d', this.line)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
    },
    updated () {
      const updateTime = Date.now()
      const deltaTime = (updateTime - this.startTime) / 1000 // in seconds
      
      const newPoint = { time: Date.now(), altitude: this.data }

      this.chartData.push(newPoint)

      if (deltaTime > 30) this.chartData.shift()

      const yScale = this.yScale
      const xScale = this.xScale

      this.xScale.domain(d3.extent(this.chartData, function (d) {
        return d.time
      }))

      this.yScale.domain(d3.extent(this.chartData, function (d) {
        return d.altitude
      }))

      const line = d3.line()
        .x(function (d) { 
          return xScale(d.time)
        })
        .y(function (d) {
          return yScale(d.altitude)
        })

      const svg = d3.select('svg').transition()
      // Make the changes
      svg.select('.line')   // change the line
        .duration(10)
        .attr('d', line(this.chartData))
      svg.select('.x.axis') // change the x axis
        .duration(10)
        .call(this.xAxis)
      svg.select('.y.axis') // change the y axis
        .duration(10)
        .call(this.yAxis)
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
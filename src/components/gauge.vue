<template>
  <svg :style="{ width: outerRadius * 2, height: outerRadius }">
    <g :style="{ transform: `translate(${outerRadius}px, ${outerRadius}px)` }">
      <path
        :d="arc(100)"
        fill="#ddd"
      />
      <path
        :d="arc(progress)"
        :fill="color(progress)"
      />
    </g>
  </svg>
</template>

<script>
import * as d3 from 'd3'

const x = d3.scaleLinear()
  .range([-Math.PI / 2, Math.PI / 2])
  .domain([0, 100])

export default {
  name: 'Gauge',
  props: {
    progress: Number,
    innerRadius: {
      type: Number,
      default: 50
    },
    outerRadius: {
      type: Number,
      default: 90
    }
  },
  methods: {
    arc(endAngle) {
      return d3.arc().innerRadius(this.innerRadius).outerRadius(this.outerRadius).startAngle(x(0)).endAngle(x(endAngle))()
    },
    color: d3.scaleLinear()
      .range(['#1a9641', '#efef5d', '#d7191c'])
      .domain([0, 70, 100])
  }
}
</script>

<style>
</style>

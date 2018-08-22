<template>
  <svg ref='logo' />
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'Logo',
  props: {
    scale: {
      type: Number,
      default: 120
    }
  },
  mounted() {
    const THEME = {
      border: 'white',
      fill: '#7b7b7b',
      fuselage: 'white',
      wings: 'white',
      window: '#70bd44'
    }

    const borderData = [
      {x: 500, y: 43.5},
      {x: 908, y: 281.5},
      {x: 908, y: 715},
      {x: 500, y: 953},
      {x: 92, y: 715},
      {x: 92, y: 281.5},
      {x: 500, y: 43.5}
    ]

    const fuselageData = [
      {x: 500, y: 87.5},
      {x: 602, y: 147},
      {x: 602, y: 527.5},
      {x: 500, y: 471},
      {x: 398, y: 527.5},
      {x: 398, y: 147},
      {x: 500, y: 87.5}
    ];

    const fuselageNData = [
      {x: 500, y: 509},
      {x: 602, y: 565.5},
      {x: 602, y: 708},
      {x: 545.33, y: 674},
      {x: 545.33, y: 597.5},
      {x: 500, y: 574.81},
      {x: 454.66, y: 597.5},
      {x: 454.66, y: 674},
      {x: 398, y: 708},
      {x: 398, y: 565.5},
      {x: 500, y: 509}
    ];

    const rightWingData = [
      {x: 636, y: 554},
      {x: 738, y: 613.5},
      {x: 738, y: 770.75},
      {x: 636, y: 711.25},
      {x: 636, y: 554}
    ];

    const leftWingData = [
      {x: 364, y: 554},
      {x: 262, y: 613.5},
      {x: 262, y: 770.75},
      {x: 364, y: 711.25},
      {x: 364, y: 554}
    ];

    const windowData = [
      {x: 500, y: 227.5},
      {x: 551, y: 257.25},
      {x: 551, y: 312.5},
      {x: 500, y: 342.25},
      {x: 449, y: 312.5},
      {x: 449, y: 257.25},
      {x: 500, y: 227.5}
    ]

    const SCALE = this.scale / 1000;
    const WIDTH = 1000 * SCALE;
    const HEIGHT = 1000 * SCALE;
    const STROKE = 20 * SCALE;

    scale(borderData, SCALE, SCALE);
    scale(fuselageData, SCALE, SCALE);
    scale(fuselageNData, SCALE, SCALE);
    scale(rightWingData, SCALE, SCALE);
    scale(leftWingData, SCALE, SCALE);
    scale(windowData, SCALE, SCALE);

    const lineFunction = d3.line()
      .x(function(d) { return d.x; })
      .y(function(d) { return d.y; })

    const svg = d3.select(this.$refs.logo)
      .style('stroke-linecap', 'round')
      .style('stroke-linejoin', 'round')
      .style('stroke-width', STROKE)
      .attr('width', WIDTH)
      .attr('height', HEIGHT);

    const borderGraph = svg.append('path')
      .style('stroke-width', STROKE * 1.5)
      .attr('d', lineFunction(borderData))
      .attr('stroke', THEME.border)
      .attr('fill', THEME.fill);

    const fuselageGraph = svg.append('path')
      .attr('d', lineFunction(fuselageData))
      .attr('stroke', THEME.fuselage)
      .attr('fill', THEME.fuselage);

    const fuselageNGraph = svg.append('path')
      .attr('d', lineFunction(fuselageNData))
      .attr('stroke', THEME.window)
      .attr('fill', THEME.window);

    const rightWingGraph = svg.append('path')
      .attr('d', lineFunction(rightWingData))
      .attr('stroke', THEME.wings)
      .attr('fill', THEME.wings);

    const leftWingGraph = svg.append('path')
      .attr('d', lineFunction(leftWingData))
      .attr('stroke', THEME.wings)
      .attr('fill', THEME.wings);

    const windowGraph = svg.append('path')
      .attr('d', lineFunction(windowData))
      .attr('stroke', THEME.window)
      .attr('fill', THEME.window);

    /**
    * Scale the values numerically so that we don't have to use CSS Scaling
    * @param data
    * @param x
    * @param y
    */
    function scale(data, x, y) {
      for (let i = 0; i < data.length; ++i) {
        data[i].x *= x;
        data[i].y *= y;
      }
    }
  }
}
</script>

<style scoped>
</style>


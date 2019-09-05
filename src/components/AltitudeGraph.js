import React from "react";
import { axisLeft, axisBottom } from "d3-axis";
import { scaleTime, scaleLinear } from "d3-scale";
import { line as d3Line, curveBasisOpen } from "d3-shape";
import { extent } from "d3-array";
import "./graph.css";
import Axis from "./Axis";
import useWindowSize from "@rehooks/window-size";

var margin = { top: 20.5, right: 30, bottom: 30, left: 40.5 },
  height = 500 - margin.top - margin.bottom;

export default function AltitudeGraph({ data = [] }) {
  const { innerWidth } = useWindowSize();
  const width = innerWidth - margin.left - margin.right;

  var x = scaleTime().range([0, width]);
  var y = scaleLinear().range([height, 0]);

  const xAxis = axisBottom(x);
  const yAxis = axisLeft(y);

  const line = d3Line()
    .curve(curveBasisOpen)
    .x(d => x(d.timestamp))
    .y(d => y(d.altitude));

  x.domain(extent(data, d => d.timestamp));
  y.domain(
    extent(data, d => d.altitude)
      .map((e, i) => {
        if (!e) return false;
        if (i === 0) {
          return e - 5;
        }
        return e + 5;
      })
  );

  return (
    <div>
      <svg
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <Axis className="x axis" axis={xAxis} translate={[0, height]} />
          <Axis className="y axis" axis={yAxis} />
          <path className="line" d={line(data)} />
        </g>
      </svg>
    </div>
  );
}

import React, { useState } from "react";
import { axisLeft, axisBottom } from "d3-axis";
import { scaleTime, scaleLinear } from "d3-scale";
import { line as d3Line, curveBasisOpen } from "d3-shape";
import { extent } from "d3-array";
import "./graph.css";
import Axis from "./Axis";
import { CheckBox, Box } from "grommet";
import useWindowSize from "@rehooks/window-size";

var margin = { top: 20.5, right: 30, bottom: 30, left: 40.5 },
  height = 500 - margin.top - margin.bottom;

export default function AltitudeGraph({ altitude = [], events, strategyData }) {
  const [showEvents, setShowEvents] = useState(true);
  const [showStrategy, setShowStrategy] = useState(false);

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

  x.domain(extent(altitude, d => d.timestamp));
  y.domain(
    extent(altitude, d => d.altitude).map((e, i) => {
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
          <path className="line" d={line(altitude)} />
          {showEvents &&
            events &&
            events.map(evt => (
              <g
                class="event"
                transform={`translate(${x(evt.timestamp)},${y(evt.altitude)})`}
              >
                <circle cx="-2.5" cy="2.5" r="5" />
                <text x="-20" y="20">
                  {evt.event}
                </text>
              </g>
            ))}
          {showStrategy &&
            strategyData &&
            strategyData.map((evt, i) => (
              <g
                class="event"
                transform={`translate(${x(evt.timestamp)},${y(evt.altitude)})`}
              >
                <circle cx="-2.5" cy="2.5" r="5" />
                <text x="-20" y={-(i + 1) * 14}>
                  {evt.payload}
                </text>
              </g>
            ))}
        </g>
      </svg>
      {strategyData && (
        <Box pad="xsmall">
          <CheckBox
            checked={showStrategy}
            label="Show Strategy Data"
            onChange={event => setShowStrategy(event.target.checked)}
          />
        </Box>
      )}
      {events && (
        <Box pad="xsmall">
          <CheckBox
            checked={showEvents}
            label="Show Launch and Parachute"
            onChange={event => setShowEvents(event.target.checked)}
          />
        </Box>
      )}
    </div>
  );
}

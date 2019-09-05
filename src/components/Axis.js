import React, { useRef, useEffect } from "react";
import { select } from "d3-selection";

export default function Axis({ className, axis, translate = [0, 0] }) {
  const axisEl = useRef(null);

  useEffect(() => {
    select(axisEl.current).call(axis);
  }, [axisEl, axis]);

  return (
    <>
      <g
        className={className}
        ref={axisEl}
        transform={`translate(${translate.join(",")})`}
      />
    </>
  );
}

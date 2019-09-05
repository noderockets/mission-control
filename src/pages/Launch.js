import React, { useState, useEffect } from "react";
import { getLaunch } from "../api";
import AltitudeGraph from "../components/AltitudeGraph";

export default function Launch({ match }) {
  const {
    params: { filename }
  } = match;

  const [launch, setLaunch] = useState();

  useEffect(() => {
    getLaunch(filename)
      .then(setLaunch)
      .catch(console.error);
  }, [filename]);

  return (
    <div>
      <h1>Launch {filename}</h1>
      <AltitudeGraph data={launch}></AltitudeGraph>
    </div>
  );
}

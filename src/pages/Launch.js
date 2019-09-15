import React, { useState, useEffect } from "react";
import { getLaunch } from "../api";
import AltitudeGraph from "../components/AltitudeGraph";

export default function Launch({ match }) {
  const {
    params: { filename }
  } = match;

  const [launchData, setLaunchData] = useState();

  useEffect(() => {
    getLaunch(filename)
      .then(setLaunchData)
      .catch(console.error);
  }, [filename]);

  return (
    <div>
      <h1>Launch {filename}</h1>
      {launchData && (
        <AltitudeGraph
          data={launchData.altitude}
          launch={launchData.launch}
          parachute={launchData.parachute}
        ></AltitudeGraph>
      )}
    </div>
  );
}

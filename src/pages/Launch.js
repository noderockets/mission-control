import React, { useState, useEffect } from "react";
import { getLaunch } from "../api";
import AltitudeGraph from "../components/AltitudeGraph";
import { Box, Heading } from "grommet";

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

  const maxAltitude = launchData => {
    if (!launchData) return 0;
    const max = launchData.altitude.reduce(
      (curr, { altitude }) => Math.max(curr, altitude),
      0
    );
    return parseInt(max - launchData.events[0].altitude, 10);
  };
  return (
    <div>
      <Box direction="row" justify="between" pad="small" align="center">
        <Heading level="3" margin="none">
          Launch {filename}
        </Heading>
        <Heading level="4" margin="none">
          Max Altitude: {maxAltitude(launchData)}ft
        </Heading>
      </Box>
      {launchData && (
        <AltitudeGraph
          altitude={launchData.altitude}
          events={launchData.events}
          strategyData={launchData.strategyData}
        ></AltitudeGraph>
      )}
    </div>
  );
}

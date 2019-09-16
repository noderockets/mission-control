import React, { useState } from "react";
import { useSocket, transform } from "../api";
import AltitudeGraph from "../components/AltitudeGraph";
import { Box } from "grommet";
function Index() {
  const [rocketData, setRocketData] = useState([]);

  useSocket("rocket-data", newData => {
    const d = transform(newData);

    setRocketData(data => {
      const newArr = [...data, d];
      if (newArr.length > 800) {
        return newArr.slice(Math.max(newArr.length - 800, 1));
      }
      return newArr;
    });
  });
  return (
    <Box margin="medium">
      <h1>Altitude Graph</h1>
      <AltitudeGraph altitude={rocketData} />
    </Box>
  );
}

export default Index;

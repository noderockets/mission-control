import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSocket, getLaunches, deleteLaunch } from "../api";
import { Heading, Button } from "grommet";
import { FormClose } from "grommet-icons";
function Launches() {
  const [launches, setLaunches] = useState([]);
  useEffect(() => {
    getLaunches().then(setLaunches);
  }, []);
  const deleteIt = async launch => {
    await deleteLaunch(launch);
    getLaunches().then(setLaunches);
  };
  useSocket("launch-recorded", () => {
    getLaunches().then(setLaunches);
  });
  return (
    <div>
      <Heading level="2" margin="medium">
        Launches
      </Heading>
      <ul>
        {launches.length
          ? launches.map(launch => (
              <li key={launch}>
                <Link to={`/launch/${launch}`}>{launch}</Link>
                <Button onClick={() => deleteIt(launch)}>
                  <FormClose />
                </Button>
              </li>
            ))
          : "No Launches yet."}
      </ul>
    </div>
  );
}

export default Launches;

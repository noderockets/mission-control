import React, { useState } from "react";
import { emit, useSocket } from "../api";
import { Button, Box, Heading } from "grommet";
export default function Actions() {
  const [isArmed, setIsArmed] = useState();
  const [isDeployed, setIsDeployed] = useState();

  useSocket("status", ({ parachuteDeployed, parachuteArmed }) => {
    setIsArmed(parachuteArmed);
    setIsDeployed(parachuteDeployed);
  });

  return (
    <>
      <Heading level="3" margin="medium">
        Actions
      </Heading>
      <Box direction="row" margin="medium" align="center" wrap>
        {isArmed ? (
          <Button
            margin="xsmall"
            label="Disarm Parachute"
            color="red"
            primary
            onClick={() => emit("disarm-parachute")}
          />
        ) : (
          <Button
            margin="xsmall"
            label="Arm Parachute"
            color="green"
            primary
            onClick={() => emit("arm-parachute")}
          />
        )}
        {isDeployed ? (
          <Button
            margin="xsmall"
            label="Reset Parachute"
            color="red"
            primary
            onClick={() => emit("reset-parachute")}
          />
        ) : (
          <Button
            margin="xsmall"
            label="Deploy Parachute"
            color="green"
            primary
            onClick={() => emit("deploy-parachute")}
          />
        )}
        <Button
          margin="xsmall"
          label="🚀Launch"
          onClick={() => emit("launch")}
        />
      </Box>
    </>
  );
}

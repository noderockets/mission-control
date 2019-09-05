import React from "react";
import { emit } from "../api";
import { Button, Box, Heading } from "grommet";
export default function Actions() {
  return (
    <>
      <Heading level="3" margin="medium">
        Actions
      </Heading>
      <Box direction="row" margin="medium" align="center" wrap>
        <Button
          margin="xsmall"
          label="Arm Parachute"
          onClick={() => emit("arm-parachute")}
        />
        <Button
          margin="xsmall"
          label="Disarm Parachute"
          onClick={() => emit('disarm-parachute')}
        />
        <Button
          margin="xsmall"
          label="Deploy Parachute"
          onClick={() => emit('deploy-parachute')}
        />
        <Button
          margin="xsmall"
          label="Reset Parachute"
          onClick={() => emit('reset-parachute')}
        />
        <Button margin="xsmall" label="🚀Launch" onClick={() => emit('launch')} />
      </Box>
    </>
  );
}

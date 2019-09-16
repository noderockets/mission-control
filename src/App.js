import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Other from "./pages/other";
import Launches from "./pages/Launches";
import Launch from "./pages/Launch";
import { Grommet, Box, Anchor, TextInput, Button } from "grommet";
import Actions from "./components/Actions";
import Notifications from "./components/Notifications";
import Strategies from "./pages/Strategies";
import Logo from "./white-logo.png";
import { setBase, getBase, useSocket } from "./api";
const AppBar = props => (
  <Box
    tag="header"
    direction="row"
    align="center"
    background="brand"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    elevation="medium"
    style={{ zIndex: "1" }}
    {...props}
  />
);

function App() {
  const [base, setBaseState] = useState(getBase());
  const [baseChanged, setBaseChanged] = useState(getBase());
  const [connected, setConnected] = useState(false);

  useSocket("connect", () => setConnected(true));
  useSocket("disconnect", () => setConnected(false));

  let theme = {
    global: {
      colors: {
        green: "#43A047",
        red: "#F4511E"
      },
      font: {
        family: "Roboto",
        size: "14px",
        height: "20px"
      }
    }
  };

  if (!connected) {
    theme.global.colors = {
      brand: "#666",
      "accent-1": "#777",
      "accent-2": "#777",
      "accent-3": "#777",
      "accent-4": "#777",
      green: "#777",
      red: "#777"
    };
  }

  return (
    <Grommet theme={theme}>
      <Notifications />
      <Router>
        <AppBar>
          <Box direction="row" align="center">
            <img
              style={{ height: 60, width: 70 }}
              src={Logo}
              alt="Node Rockets Logo"
            />
          </Box>
          <Box margin="medium">
            <nav>
              <Link to="/">
                <Anchor
                  tag="span"
                  primary
                  label="Data Stream"
                  color="light-1"
                  margin="xsmall"
                ></Anchor>
              </Link>
              <Link to="/launches">
                <Anchor
                  tag="span"
                  label="Launches"
                  color="light-1"
                  margin="xsmall"
                ></Anchor>
              </Link>
              <Link to="/strategies">
                <Anchor
                  tag="span"
                  label="Strategies"
                  color="light-1"
                  margin="xsmall"
                ></Anchor>
              </Link>
            </nav>
          </Box>
          <Box alignSelf="end" direction="row" align="center">
            <TextInput
              id="base"
              placeholder="IP of Pi"
              value={base}
              onChange={({ target: { value } }) => {
                setBase(value);
                setBaseState(value);
              }}
            />
            {baseChanged !== base && (
              <Button
                primary
                margin="small"
                onClick={() => window.location.reload()}
                label="Refresh!"
              />
            )}
          </Box>
        </AppBar>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/other" component={Other}></Route>
          <Route path="/launches" component={Launches}></Route>
          <Route path="/launch/:filename" component={Launch}></Route>
          <Route path="/strategies" exact component={Strategies}></Route>
        </Switch>
        <Actions />
      </Router>
    </Grommet>
  );
}

export default App;

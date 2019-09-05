import React, { useState } from "react";
import { useSocket, emit } from "../api";
import { TextInput, Heading, Box, CheckBox, FormField } from "grommet";

export default function Strategies() {
  const [strategies, setStrategies] = useState([]);
  const [activeStrategies, setActiveStrategies] = useState([]);
  useSocket("strategy-data", data => {
    setStrategies(data);
    setActiveStrategies(data.filter(strat => strat.data.enabled));
  });

  const toggleStrategy = strategy => {
    if (!strategy.data.enabled) {
      emit("activate-strategy", strategy.key);
    } else {
      emit("deactivate-strategy", strategy.key);
    }
  };
  const updateStrategy = (strategy, key, type, e) => {
    const rawValue = type === "boolean" ? e.target.checked : e.target.value;
    const value = type === "number" ? +rawValue : rawValue;
    emit("update-strategy", { strategyKey: strategy.key, key, value });
  };

  return (
    <Box margin="medium">
      <Heading level="3">Strategies</Heading>
      <Box direction="row">
        <Box border={{ color: "brand", size: "medium" }} pad="medium">
          {strategies.map(strategy => (
            <Box key={strategy.key} margin="xsmall">
              <CheckBox
                checked={strategy.data.enabled}
                label={strategy.name}
                onChange={() => toggleStrategy(strategy)}
              />
            </Box>
          ))}
        </Box>
        <Box
          margin={{
            left: "medium"
          }}
          border={{ color: "brand", size: "medium" }}
          pad="medium"
        >
          {activeStrategies.map(strategy => (
            <Box key={strategy.key} margin="xsmall">
              <Heading level="4" margin="none">
                {strategy.name}
              </Heading>
              {Object.keys(strategy.props).map(key => {
                const prop = strategy.props[key];
                return (
                  <>
                    {prop.type === "boolean" ? (
                      <CheckBox
                        checked={true}
                        label={prop.displayName || key}
                      ></CheckBox>
                    ) : (
                      <FormField label={prop.displayName || key} margin="none">
                        <TextInput
                          margin="none"
                          value={strategy.data.props[key] || prop.default}
                          onChange={evt =>
                            updateStrategy(strategy, key, prop.type, evt)
                          }
                        />
                      </FormField>
                    )}
                  </>
                );
              })}
            </Box>
          ))}
        </Box>
      </Box>
      {/*<div class="strategies">
  <div>
    <div v-for="strategy in activeStrategies" :key="strategy.key">
      <h2>{{strategy.name}}</h2>
      <ul>
        <li v-for="(prop, key) in strategy.props" :key="key">
          <label :title="prop.description">{{prop.displayName || key}}:</label>
          <input
            :type="prop.type === 'boolean' ? 'checkbox' : 'text'"
            :value="key in strategy.data.props ? strategy.data.props[key] : prop.default"
            :checked="key in strategy.data.props ? strategy.data.props[key] : prop.default"
            @change="updateStrategy(strategy, key, prop.type, $event)"
          />
        </li>
      </ul>
    </div>
  </div>
</div>*/}
    </Box>
  );
}

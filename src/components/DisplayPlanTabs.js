/*global google*/
import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  withStyles,
  AppBar,
  Tabs,
  Tab,
  Grid,
  Button,
  Typography,
  Box,
} from "@material-ui/core";
import Paper from "@mui/material/Paper";

const DisplayPlanTabs = ({ trips, tabKey, handleTabChange }) => {
  function renderDayTrip(trip) {
    let result = "";

    for (let i = 0; i < trip.length; i++) {
      result =
        result +
        " (" +
        (i + 1) +
        ") " +
        trip[i].name +
        " (" +
        trip[i].address +
        ") " +
        "\n";
    }

    return <p>{result}</p>;
  }

  // const [value, setValue] = useState(0);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  return (
    <div>
      <Tabs
        value={tabKey}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        {trips.map((trip, i) => (
          <Tab key={i} value={i} label={`day ${i + 1}`} className="mytab" />
        ))}
      </Tabs>
      <Paper>
        {trips[tabKey]?.map((t, j) => (
          <li>{t.name + ", Address: " + t.address}</li>
        ))}
      </Paper>
    </div>
  );
};

export default DisplayPlanTabs;

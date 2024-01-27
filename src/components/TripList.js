import React, { useState, useEffect, createRef } from "react";
import { Spin } from "antd";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";

import { PLACES, GOOGLE_MAP_API_KEY } from "../constants.js";
import TripDetail from "./TripDetail.js";
import useStyles from "../styles/TripListStyle.js";

function TripList({ tripArr, DeleteOneTrip }) {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={3} className={classes.list}>
        {tripArr?.map((trip, i) => (
          <Grid item xs={12}>
            <TripDetail trip={trip} DeleteOneTrip={DeleteOneTrip} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default TripList;

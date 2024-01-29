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
import PlaceDetail from "./PlaceDetail";
import useStyles from "../styles/PlaceListStyle.js";

function PlaceList({
  isLoading,
  placeArr,
  placeClicked,
  elRefs,
  dateInput,
  numOfDays,
  trips,
  addOnePlace,
}) {
  const classes = useStyles();
  console.log("numOfDays in placelist: ", numOfDays);

  return isLoading ? (
    <Spin size="large" style={{ margin: "10px" }} />
  ) : (
    <>
      <Grid container spacing={3} className={classes.list}>
        {placeArr?.map((place, i) => (
          <Grid key={i} ref={elRefs[i]} item xs={12}>
            <PlaceDetail
              selected={placeClicked === i}
              refProp={elRefs[i]}
              place={place}
              dateInput={dateInput}
              numOfDays={numOfDays}
              trips={trips}
              addOnePlace={addOnePlace}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default PlaceList;

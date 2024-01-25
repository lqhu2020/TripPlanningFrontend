/*global google*/
import { Button, Space } from "antd";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import DisplayPlanMap from "./DisplayPlanMap";
import DisplayPlanTabs from "./DisplayPlanTabs";
import { useLoadScript } from "@react-google-maps/api";
import { GOOGLE_MAP_API_KEY } from "../constants";
import { daysInWeek } from "date-fns";

import {
  withStyles,
  AppBar,
  Tabs,
  Tab,
  Grid,
  Typography,
  Box,
} from "@material-ui/core";
import Paper from "@mui/material/Paper";

function DisplayPlan(props) {
  const { generatedPlan } = props.location.state;

  const {
    EndDay,
    StartDay,
    SamplePlaceName,
    Transportation,
    TripName,
    places,
    tripID,
  } = generatedPlan;

  console.log(places);

  const formatPlaces = (places) => {
    if (!places || places.length === 0) {
      return null;
    }

    const placeArr = places.map((place, i) => {
      return place.map((p, j) => {
        return {
          id: p.id,
          name: p.DisplayName.text,
          address: p.formattedAddress,
          latitude: p.location.latitude,
          longitude: p.location.longitude,
        };
      });
    });
    console.log("placeArr", placeArr);
    return placeArr;
  };

  // formatPlaces(places);
  const trips = formatPlaces(places);

  const addToSavedPlans = () => {
    console.log("plan added!");
  };

  const homeButtonStyle = {
    position: "absolute",
    right: "0",
    padding: "40px",
  };

  const editButtonStyle = {
    paddingTop: "10vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const isLoaded = useLoadScript({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
  });

  // to set the active tab;
  // const [activeTab, setActiveTab] = useState(0);
  // function handleTabChange(key) {
  //   // setDay(parseInt(key, 10));
  //   setActiveTab(key);
  // }

  // console.log("activeTab");
  // console.log(activeTab);
  const [tabKey, setTabKey] = useState(0);
  const [tmpTrip, setTmpTrip] = useState(trips[tabKey]);

  const handleTabChange = (event, newValue) => {
    event.stopPropagation();
    setTabKey(newValue);
  };
  useEffect(() => {
    setTmpTrip(trips[tabKey]);
  }, [tabKey]);

  console.log("tab Value");
  console.log(tabKey);

  return (
    <>
      <div style={{ padding: "20px" }}>
        <div style={homeButtonStyle}>
          <Link to="/Home">
            <Button>Home</Button>
          </Link>
        </div>
        <h1>Plan 1</h1>
        <div style={{ display: "flex", width: "100%" }}>
          <DisplayPlanMap trip={tmpTrip}></DisplayPlanMap>
          <div style={{ paddingLeft: "10vw" }}>
            <DisplayPlanTabs
              trips={trips}
              tabKey={tabKey}
              handleTabChange={handleTabChange}
            />
          </div>
        </div>
        <Space style={editButtonStyle}>
          <span>
            <Link to="/AddPlan">
              <Button onClick={addToSavedPlans}>Edit Plans</Button>
            </Link>
          </span>
          <span>
            <Button type="primary" onClick={addToSavedPlans}>
              Add To Saved Plans
            </Button>
          </span>
        </Space>
      </div>
    </>
  );
}

export default DisplayPlan;

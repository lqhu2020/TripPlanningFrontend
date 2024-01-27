import React, { useState, useEffect } from "react";
import { Button, Space, Tabs } from "antd";
import axios from "axios";

import SearchBar from "./SearchBar";
import CreatePlanButton from "./CreatePlanButton";
// import PhotoGallery from "./PhotoGallery";
import PlanGallery from "./PlanGallery";
import {
  PLACES,
  GOOGLE_MAP_API_KEY,
  BACKEND,
  PROXY_URL,
  BASE_URL,
  USER_NAME,
} from "../constants.js";
import { Link } from "react-router-dom";
import TripList from "./TripList";

import {
  CircularProgress,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import { Typography } from "antd";
const { Title } = Typography;
const { TabPane } = Tabs;

function Home(props) {
  const [trips, setTrips] = useState([]);

  const username = localStorage.getItem(USER_NAME);

  function fetchTrips(username) {
    const opt = {
      method: "GET",
      url: `${BASE_URL}/getAllPlansOfUser`,
      params: {
        username: username,
      },
      headers: { "Content-Type": "application/json" },
    };
    axios(opt)
      .then((res) => {
        if (res.status === 200) {
          setTrips(res.data);
        }
      })
      .catch((err) => {
        console.log("fetch failed: ", err.message);
      });
  }

  useEffect(() => {
    fetchTrips(username);
    // fetchRecommendation();
  }, [username]);

  console.log(trips);

  // function fetchRecommendation() {
  //   const opt = {
  //     method: "GET",
  //     url: PROXY_URL + BACKEND + "/recommendation",
  //     data: {
  //       City: "New York",
  //       StartDay: "2024-01-25",
  //       EndDay: "2024-01-30",
  //     },
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization:
  //         "Bearer " + "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",
  //     },
  //   };
  //   axios(opt)
  //     .then((res) => {
  //       if (res.status === 200) {
  //         console.log(res);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("fetch failed: ", err.message);
  //     });
  // }

  // only for render
  function DeleteOneTrip(tripID) {
    let newTrips = [...trips];

    newTrips = newTrips.filter((v, i) => v.tripID != tripID);
    setTrips(newTrips);
  }

  return (
    <>
      {/* <button onClick={fetchRecommendation}>Recommendation</button> */}
      <Grid
        container
        spacing={3}
        style={{ width: "80%" }}
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid item xs={8} md={1}></Grid>
        <Grid item xs={8} md={6}>
          <Title level={3}> {"\t\t\t"} Saved Trips </Title>

          <TripList tripArr={trips} DeleteOneTrip={DeleteOneTrip} />
          <Link to="/addplan">
            <button>Add New Plan</button>
          </Link>
        </Grid>
        <Grid item xs={8} md={1}></Grid>
      </Grid>
    </>
  );
}

export default Home;

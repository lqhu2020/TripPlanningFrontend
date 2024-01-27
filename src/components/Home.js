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
  const [tripsIsLoading, setTripIsLoading] = useState(false);

  const [images, setImages] = useState([]);

  const username = "user_signup_uuidtestxwd";
  // const username = "tester1";
  function fetchTrips(username) {
    setTripIsLoading(true);

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
  }, [username]);

  // const trips = [
  //   {
  //     tripID: "fee254fa-4dd6-4538-903c-df50fdb2b814",
  //     TripName: "postman testing trip",
  //     StartDay: "2024-01-10",
  //     EndDay: "2024-01-11",
  //     Transportation: "driving",
  //     places: null,
  //     SamplePlaceName: "Rockefeller Center",
  //   },
  //   {
  //     tripID: "046082d8-ec51-4e58-acf8-ed618f4eb9d1",
  //     TripName: "postman testing trip",
  //     StartDay: "2024-01-11",
  //     EndDay: "2024-01-12",
  //     Transportation: "driving",
  //     places: null,
  //     SamplePlaceName: "Rockefeller Center",
  //   },
  // ];

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

  function handleAddNewPlan() {}

  return (
    <>
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

          <TripList tripArr={trips} />
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

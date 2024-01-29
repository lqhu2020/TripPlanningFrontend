/* global google */
import axios from "axios";

import React, { useEffect, useState, createRef } from "react";
import { Link, useHistory } from "react-router-dom";
import DateInput from "./DateInput";
import PlanMap from "./PlanMap";
import PlaceList from "./PlaceList";
import { Grid } from "@material-ui/core";
import { differenceInDays } from "date-fns";
import {
  PLACES,
  GOOGLE_MAP_API_KEY,
  BACKEND,
  PROXY_URL,
  USER_NAME,
} from "../constants.js";
import PlaceMenu from "./PlaceMenu.js";

import { Typography, Divider, message, Input, Button } from "antd";

function ModifyPlan(props) {
  const homeButtonStyle = {
    position: "absolute",
    right: "0",
    padding: "40px",
  };

  const { generatedPlan } = props.location.state;
  console.log(generatedPlan);

  const { EndDay, StartDay, Transportation, TripName, places, tripID } =
    generatedPlan;

  const username = localStorage.getItem(USER_NAME);
  const { Title } = Typography;

  // ========== for search
  const { Search } = Input;
  const [searchValue, setSearchValue] = useState("");

  // search place
  const onSearch = async (user_input) => {
    // Clear the search input
    setSearchValue("");
    setPlaceIsLoading(true);

    // get the searched places by calling backend api
    try {
      const response = await axios.get(`${BACKEND}/searchPlaces`, {
        params: {
          max_num_display: 100,
          user_input,
        },
      });
      console.log(response.data);
      formatPlaces(response.data);
    } catch (error) {
      console.error(`Error: ${error}`);
    } finally {
      setPlaceIsLoading(false);
    }
    // update the places to show
  };

  // reload the default places
  const handleReload = () => {
    console.log("reload");
    formatPlaces(PLACES);
  };

  const [dateInput, setDateInput] = useState({
    startDate: new Date(StartDay),
    endDate: new Date(EndDay),
  });

  const days = differenceInDays(dateInput.endDate, dateInput.startDate);
  const [numOfDays, setNumOfDays] = useState(days + 1);

  function handleDateChange(dateIdentifier, newDate) {
    setDateInput((prevDate) => {
      return {
        ...prevDate,
        [dateIdentifier]: newDate,
      };
    });
  }

  console.log(dateInput);
  console.log(numOfDays);

  //========== fetch default places and trips
  const [placeArr, setPlaceArr] = useState([]);
  const [placeIsLoading, setPlaceIsLoading] = useState(false);

  // useEffect(() => {
  //   formatTrips(trips);
  // }, [places]);

  const formatTrips = (trips) => {
    const tripsArr = trips.map((trip) => {
      return trip.map((p) => {
        return {
          id: p.id,
          name: p.DisplayName.text,
          address: p.formattedAddress,
          latitude: p.location.latitude,
          longitude: p.location.longitude,
          //reviews: p.reviews,
          // to add photos
          photoUrl:
            "https://places.googleapis.com/v1/" +
            p.photos[0].name +
            "/media?maxHeightPx=400&maxWidthPx=400&key=" +
            GOOGLE_MAP_API_KEY,
          original: p,
        };
      });
    });

    return tripsArr;
  };

  const [trips, setTrips] = useState(formatTrips(places));

  useEffect(() => {
    formatPlaces(PLACES);
  }, [PLACES]);

  const formatPlaces = (places) => {
    if (!places || places.length === 0) {
      return <div>No Data!</div>;
    }

    const placeArr = places.map((p) => {
      return {
        id: p.id,
        name: p.DisplayName.text,
        address: p.formattedAddress,
        latitude: p.location.latitude,
        longitude: p.location.longitude,
        //reviews: p.reviews,
        // to add photos
        photoUrl:
          "https://places.googleapis.com/v1/" +
          p.photos[0].name +
          "/media?maxHeightPx=400&maxWidthPx=400&key=" +
          GOOGLE_MAP_API_KEY,
        original: p,
      };
    });
    setPlaceArr(placeArr);
  };

  function handleNumOfDaysChange(newDays) {
    const preDays = numOfDays;
    setNumOfDays(newDays);

    if (newDays < preDays) {
      const newTrips = trips.slice(0, newDays);
      setTrips(newTrips);
      setNumOfDays(newDays);
    } else if (newDays > preDays) {
      const newTrips = trips;
      for (let i = 0; i < newDays - preDays; i++) {
        newTrips.push(new Array(0));
      }
      setTrips(newTrips);
      setNumOfDays(newDays);
    }
  }
  console.log("numOfDays", numOfDays);

  console.log("placeArr", placeArr);
  const [placeClicked, setPlaceClicked] = useState();

  const [elRefs, setElRefs] = useState([]);
  useEffect(() => {
    setElRefs((refs) =>
      Array(placeArr.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [placeArr]);

  function addOnePlace(idx, pname) {
    let newTrips = [...trips];
    newTrips[idx] = [...newTrips[idx], pname];
    setTrips(newTrips);
  }

  function deleteOnePlace(dateIndex, pname) {
    let newTrips = [...trips];

    newTrips[dateIndex] = newTrips[dateIndex].filter((v, i) => v.name != pname);
    setTrips(newTrips);
    // console.log("newTrips after delete is");
    // console.log(newTrips);
    // console.log("Trips after delete is");
    // console.log(trips);
  }

  const [openList, setOpenList] = useState([]);
  const num = trips.length;

  useEffect(() => {
    const newList = [];
    for (let i = 0; i < num; i++) {
      newList.push(false);
    }
    setOpenList(newList);
  }, [num]);

  function handleClickDay(index) {
    let temp = [...openList];
    temp[index] = temp[index] === true ? false : true;
    // console.log("a");
    setOpenList(temp);
  }

  function formatDate(date) {
    const dateObj = date;
    const month = dateObj.getUTCMonth() + 1; // months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    const pMonth = month.toString().padStart(2, "0");
    const pDay = day.toString().padStart(2, "0");

    const newDate = `${year}-${pMonth}-${pDay}`;
    return newDate;
  }

  const history = useHistory();

  function handleConfirmPlaces() {
    // formate trips with original place object

    const StartDay = formatDate(dateInput.startDate);
    const EndDay = formatDate(dateInput.endDate);

    const TripName = "Trip_New_York_" + "_" + StartDay + "_" + EndDay;
    const places = trips.map((trip, i) => {
      return trip.map((t, j) => {
        return t.original;
      });
    });

    console.log("trips in confirm modify: ", trips);
    console.log("places in confirm modify: ", places);

    const opt = {
      method: "POST",
      url: PROXY_URL + BACKEND + "/modifyTrip",
      data: {
        tripID: tripID,
        TripName: TripName,
        // username: username,
        StartDay: StartDay,
        EndDay: EndDay,
        Transportation: "driving",
        places: places,
      },
      params: {
        username: username,
      },
      headers: { "content-type": "application/json" },
    };

    axios(opt)
      .then((response) => {
        if (response.status === 200) {
          message.success("modify trip and save succeed!");
          console.log(response.data);
          // setGeneratedPlan(response.data);
          // const generatedPlan = response.data;

          // console.log(generatedPlan);
          history.push("/home");
        }
      })
      .catch((error) => {
        console.log("modify trip failed: ", error.message);
        message.error("modify trip failed!");
      });
  }

  return username === null ? (
    <Title level={5}> Please log in first ! </Title>
  ) : (
    <>
      <div style={homeButtonStyle}>
        <Link to="/Home">
          <Button>Home</Button>
        </Link>
      </div>
      <Title level={5}>Choose Your Plan Date </Title>
      <DateInput
        dateInput={dateInput}
        handleDateChange={handleDateChange}
        minDate={
          dateInput.startDate < new Date() ? dateInput.startDate : new Date()
        }
      >
        <button
          disabled={days >= 14 || !dateInput.endDate}
          onClick={() => {
            //setNumOfDays(days + 1);
            handleNumOfDaysChange(days + 1);
            message.success("Dates are confirmed! Explore New Your City");
          }}
        >
          Change Dates
        </button>
        <Divider></Divider>
      </DateInput>

      {numOfDays <= 15 && numOfDays > 0 ? (
        <>
          <div>
            <Title level={5}> Explore New York By Yourself </Title>

            <Grid
              container
              spacing={3}
              style={{ width: "60%" }}
              direction="row"
              justifyContent="left"
              alignItems="flex-start"
            >
              <Grid item xs={6} md={4}>
                <Search
                  placeholder="search for places"
                  style={{
                    width: 380,
                  }}
                  // enterButton="Ask"
                  size="large"
                  onSearch={onSearch}
                  // loading={isLoading}
                  value={searchValue} // Control the value
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }} // Update the value when changed
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <button
                  style={{ height: "40px" }}
                  onClick={() => {
                    console.log("reload");
                    handleReload();
                  }}
                >
                  reload default places
                </button>
              </Grid>
            </Grid>
          </div>

          <Title level={5}>Choose Your Places You Want To Visit </Title>
          <Grid
            container
            spacing={3}
            style={{ width: "100%" }}
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Grid item xs={12} md={8}>
              <PlanMap placeArr={placeArr} setPlaceClicked={setPlaceClicked} />
            </Grid>
            <Grid item xs={12} md={2}>
              <PlaceList
                isLoading={placeIsLoading}
                placeArr={placeArr}
                placeClicked={placeClicked}
                elRefs={elRefs}
                dateInput={dateInput}
                numOfDays={numOfDays}
                addOnePlace={addOnePlace}
              />
            </Grid>

            {Array.isArray(trips) && (
              <Grid
                container
                xs={12}
                md={2}
                display="flex"
                justifyContent="space-between"
                direction="column"
              >
                <Grid item xs={12} md={12}>
                  <PlaceMenu
                    trips={trips}
                    deleteOnePlace={deleteOnePlace}
                    openList={openList}
                    handleClick={handleClickDay}
                  />
                </Grid>

                <Divider></Divider>
                <Grid item>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {/* <Link
                    to={{
                      pathname: "/displayplan",
                      state: generatedPlan,
                    }}
                  > */}
                  <button onClick={handleConfirmPlaces}>
                    Confirm to Modify Plan
                  </button>
                  {/* </Link> */}
                </Grid>
              </Grid>
            )}
          </Grid>
        </>
      ) : null}
    </>
  );
}

export default ModifyPlan;

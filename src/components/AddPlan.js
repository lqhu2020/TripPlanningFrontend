/* global google */
import axios from "axios";

import React, { useEffect, useState, createRef } from "react";
import { Link } from "react-router-dom";
import DateInput from "./DateInput";
import PlanMap from "./PlanMap";
import PlaceList from "./PlaceList";
import { Grid } from "@material-ui/core";
import { differenceInDays } from "date-fns";
import { PLACES, GOOGLE_MAP_API_KEY, BACKEND } from "../constants.js";
import PlaceMenu from "./PlaceMenu.js";

import { Typography, Divider, message, Input} from "antd";

function AddPlan() {
  const { Title } = Typography;
  const { Search } = Input

  //========== for date
  const [dateInput, setDateInput] = useState({
    startDate: null,
    endDate: null,
  });
  const [numOfDays, setNumOfDays] = useState(0);

  function handleDateChange(dateIdentifier, newDate) {
    setDateInput((prevDate) => {
      return {
        ...prevDate,
        [dateIdentifier]: newDate,
      };
    });
  }

  const days = differenceInDays(dateInput.endDate, dateInput.startDate);
  if (days >= 14) {
    message.warning("no more than 15 days");
  }
  console.log(numOfDays);

  //========== fetch default places
  const [placeArr, setPlaceArr] = useState([]);
  const [placeIsLoading, setPlaceIsLoading] = useState(false)
  const [searchValue, setSearchValue] = useState("");

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
        reviews: p.reviews,
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

  const [placeClicked, setPlaceClicked] = useState();

  const onSearch = async (user_input) => {
    // Clear the search input
    setSearchValue("");
    setPlaceIsLoading(true);

    // get the searched places by calling backend api
    try {
        const response = await axios.get(`${BACKEND}/searchPlaces`, {
            params: {
                max_num_display: 100,
                user_input
            }
        });
        console.log(response.data)
        formatPlaces(response.data)
        
      } catch (error) {
        console.error(`Error: ${error}`);
        
      } finally {
        setPlaceIsLoading(false);
      }
    // update the places to show

  }
  // console.log(placeClicked);

  const [elRefs, setElRefs] = useState([]);
  useEffect(() => {
    setElRefs((refs) =>
      Array(placeArr.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [placeArr]);

  //========== add places to each day

  const [trips, setTrips] = useState(new Array(0));

  function initializeTrips() {
    setTrips(new Array(0));
    for (let i = 0; i < numOfDays; i++) {
      setTrips((trips) => [...trips, new Array(0)]);
    }
    // console.log(typeof trips);
    // console.log(Array.isArray(trips));
  }

  useEffect(() => {
    if (numOfDays > 0) {
      initializeTrips();
    }
  }, [numOfDays]);

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

//   console.log("trips in addplan is");
//   console.log(trips);
//   console.log(typeof trips);

  //========== delete places to each day

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

  // console.log("openlist:");
  // console.log(openList);
  // console.log(typeof trips);
  // console.log(Array.isArray(trips));

  //========== generate trip object

  function handleConfirmPlaces() {
    // formate trips with original place object

    const tripList = trips.map((trip, i) => {
      return trip.map((t, j) => {
        return t.original;
      });
    });

    // to generate object

    // for (let i = 0; i < tripList.length; i++) {
    //   localStorage.setItem(`trips${0}`, JSON.stringify(tripList[0]));
    // }
    // localStorage.setItem(`trips`, JSON.stringify(tripList));

    // localStorage.setItem(`fTrips`, JSON.stringify(tripList));
    // localStorage.setItem("startDate", JSON.stringify(dateInput.startDate));
    // localStorage.setItem("endDate", JSON.stringify(dateInput.endDate));
  }

  return (
    <>
    
      <Title level={5}>Choose Your Plan Date </Title>
      <DateInput dateInput={dateInput} handleDateChange={handleDateChange}>
        <button
          disabled={days >= 14 || !dateInput.endDate}
          onClick={() => {
            setNumOfDays(days + 1);
            message.success("Dates are confirmed! Explore New Your City");
          }}
        >
          Confirm Dates
        </button>
        <Divider></Divider>
      </DateInput>

      {numOfDays <= 15 && numOfDays > 0 ? (
        
        <>
          <div>
                <Search
                placeholder="search for places"
                // enterButton="Ask"
                size="large"
                onSearch={onSearch}
                // loading={isLoading}
                value={searchValue} // Control the value
                onChange={(e)=>{ setSearchValue(e.target.value);}} // Update the value when changed
                />
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
                  <Link
                    to={{
                      pathname: "/displayplan",
                      state: { trips: trips },
                    }}
                  >
                    {" "}
                    Confirm to Generate Plan
                    {/* <button onClick={handleConfirmPlaces}>
                      Confirm to Generate Plan
                    </button> */}
                    {/* <button>
                      Confirm to Generate Plan
                    </button> */}
                  </Link>
                </Grid>
              </Grid>
            )}
          </Grid>
        </>
      ) : null}
    </>
  );
}

export default AddPlan;

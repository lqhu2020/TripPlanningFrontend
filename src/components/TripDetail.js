import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { Button, Modal } from "antd";
import Overlay from "./Overlay";
import DatePicker from "react-datepicker";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  PLACES,
  GOOGLE_MAP_API_KEY,
  BACKEND,
  PROXY_URL,
} from "../constants.js";
import { message } from "antd";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 300,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

function TripDetail({ trip, DeleteOneTrip }) {
  const [photoUrl, setPhotoUrl] = useState("");

  function fetchTripImage(placeName) {
    const opt = {
      method: "GET",
      url: PROXY_URL + BACKEND + "/searchPlaces",
      params: {
        max_num_display: 1,
        user_input: placeName,
      },
      headers: { "content-type": "application/json" },
    };

    axios(opt)
      .then((response) => {
        if (response.status === 200) {
          //   message.success("generate trip and save succeed!");
          console.log(response.data);

          const place = response.data[0].photos[0].name;
          const Url =
            "https://places.googleapis.com/v1/" +
            place +
            "/media?maxHeightPx=400&maxWidthPx=400&key=" +
            GOOGLE_MAP_API_KEY;
          setPhotoUrl(Url);
        }
      })
      .catch((error) => {
        console.log(": ", error.message);
      });
  }

  useEffect(() => {
    fetchTripImage(trip.SamplePlaceName);
  }, [trip]);

  const classes = useStyles();
  const theme = useTheme();

  const history = useHistory();

  function handleCheckTrip() {
    const opt = {
      method: "GET",
      url: PROXY_URL + BACKEND + "/getTripInfo",
      params: {
        trip_id: trip.tripID,
      },
      headers: { "content-type": "application/json" },
    };

    axios(opt)
      .then((response) => {
        if (response.status === 200) {
          //   message.success("get trip info!");
          console.log(response.data);
          // setGeneratedPlan(response.data);
          const generatedPlan = response.data;

          console.log(generatedPlan);
          history.push("/displayplan", { generatedPlan });
        }
      })
      .catch((error) => {
        console.log("get trip info failed : ", error.message);
      });
  }

  function deleteTrip(tripID) {
    const opt = {
      method: "DELETE",
      url: PROXY_URL + BACKEND + "/deleteTrip",
      params: {
        tripID: tripID,
      },
      headers: { "content-type": "application/json" },
    };

    axios(opt)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          message.success("trip delete succeed!");
          // setGeneratedPlan(response.data);
        }
      })
      .catch((error) => {
        console.log("trip delete failed: ", error.message);
      });
  }

  const [isOpen, setIsOpen] = useState(false);

  const openOverlay = () => {
    setIsOpen(true);
  };

  const closeOverlay = () => {
    setIsOpen(false);
  };

  const confirmDelete = (tripID) => {
    setIsOpen(false);
    DeleteOneTrip(tripID);
    deleteTrip(tripID);
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={photoUrl}
        title="Live from space album cover"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {trip.TripName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {"From  " + trip.StartDay + " To  " + trip.EndDay}
          </Typography>
        </CardContent>

        <CardActions>
          <button onClick={handleCheckTrip}>Check Trip</button>

          <button onClick={openOverlay}>Delete Trip</button>
          <Overlay isOpen={isOpen} onClose={closeOverlay}>
            <div>
              <button onClick={() => confirmDelete(trip.tripID)}>
                {" "}
                Confirm Delete
              </button>
            </div>
          </Overlay>
        </CardActions>
        <div className={classes.controls}></div>
      </div>
    </Card>
  );
}

export default TripDetail;

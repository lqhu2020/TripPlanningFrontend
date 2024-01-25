import React, { useState } from "react";
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
import { differenceInDays } from "date-fns";

function PlaceDetail({
  selected,
  refProp,
  place,
  dateInput,
  numOfDates,
  addOnePlace,
}) {
  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const [date, setDate] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const openOverlay = () => {
    setIsOpen(true);
  };

  const closeOverlay = () => {
    setIsOpen(false);

    const dateIndex = differenceInDays(date, dateInput.startDate);
    console.log(place);
    console.log(dateIndex);
    addOnePlace(dateIndex, place);
    setDate(null);
  };

  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 150, width: 300 }}
        image={place.photoUrl}
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6">
          {place.name}
        </Typography>
        {place.address && (
          <Typography
            gutterBottom
            variant="body2"
            color="textSecondary"
            // className={classes.subtitle}
          >
            {/* <LocationOnIcon /> */}
            {place.address}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <button onClick={openOverlay}>Add to Plan</button>
        <Overlay isOpen={isOpen} onClose={closeOverlay}>
          Which Day you want to visit
          {place.name}
          <DatePicker
            selected={date}
            onChange={(date) => {
              setDate(date);
            }}
            // startDate={startDate}
            minDate={dateInput.startDate}
            maxDate={dateInput.endDate}
          />
          <div>
            <button
                onClick={closeOverlay}> ok
            </button>
          </div>
          
        </Overlay>
      </CardActions>
    </Card>
  );
}

export default PlaceDetail;

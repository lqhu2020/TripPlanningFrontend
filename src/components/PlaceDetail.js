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
  };

  const handleConfirmDate = () => {
    setIsOpen(false);

    let dateIndex = date.getDate() - dateInput.startDate.getDate();

    // console.log("date is:", date);
    // console.log("start date is:", dateInput.startDate);
    // console.log("date index:", dateIndex);

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
            <button onClick={handleConfirmDate}> Confirm Date</button>
          </div>
        </Overlay>
      </CardActions>
    </Card>
  );
}

export default PlaceDetail;

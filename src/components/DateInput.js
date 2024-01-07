import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInDays } from "date-fns";

const today = new Date();

function DateInput() {
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState();
  // const [isDateValid, setIsDateValid] = useState(false);

  const [dateInput, setDateInput] = useState({
    startDate: new Date(),
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
  console.log(numOfDays);

  return (
    <div>
      {days < 14 ? (
        <p> if selected dates are correct, please comfirm the selection !</p>
      ) : (
        <p> Please select dates, no more than 15 days</p>
      )}

      <DatePicker
        selectsStart
        selected={dateInput.startDate}
        onChange={(date) => handleDateChange("startDate", date)}
        startDate={dateInput.startDate}
        minDate={today}
      />
      <DatePicker
        selectsEnd
        selected={dateInput.endDate}
        onChange={(date) => handleDateChange("endDate", date)}
        endDate={dateInput.endDate}
        startDate={dateInput.startDate}
        minDate={today}
      />
      <button onClick={() => setNumOfDays(days + 2)}>Confirm</button>
    </div>
  );
}

export default DateInput;

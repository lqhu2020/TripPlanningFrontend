import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInDays } from "date-fns";
import { Space, message } from "antd";

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
      {!dateInput.endDate ? (
        <p>Please select dates</p>
      ) : days >= 14 ? (
        <p style={{ color: "red" }}> no more than 15 days </p>
      ) : (
        <p style={{ color: "green" }}>if dates are correct, please comfirm !</p>
      )}
      <Space direction="horizontal" size={12}>
        Start Date
        <DatePicker
          selectsStart
          selected={dateInput.startDate}
          onChange={(date) => handleDateChange("startDate", date)}
          startDate={dateInput.startDate}
          minDate={today}
        />
        End Date
        <DatePicker
          selectsEnd
          selected={dateInput.endDate}
          onChange={(date) => handleDateChange("endDate", date)}
          endDate={dateInput.endDate}
          startDate={dateInput.startDate}
          minDate={today}
        />
        <button
          disabled={days >= 14 || !dateInput.endDate}
          onClick={() => {
            setNumOfDays(days + 2);
            message.success("Dates are confirmed !");
          }}
        >
          Confirm
        </button>
      </Space>
    </div>
  );
}

export default DateInput;

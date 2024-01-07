import React, { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import DateInput from "./DateInput";

function AddPlan() {
  return (
    <div>
      <p>This is AddPlan page</p>
      <DateInput  />
       {/* <>select location</> startDate, endDate, numOfDays */}
      <Link to="/DisplayPlan">
        <button>DisplayPlan</button>
      </Link>
    </div>
  );
}

export default AddPlan;

import React, { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import DateInput from "./DateInput";
import PlanMap from "./PlanMap";

function AddPlan() {
  return (
    <div>
      <p>This is AddPlan page</p>
      <DateInput />
      <PlanMap />
      <Link to="/DisplayPlan">
        <button>DisplayPlan</button>
      </Link>
    </div>
  );
}

export default AddPlan;

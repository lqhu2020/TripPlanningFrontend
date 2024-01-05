import React from "react";
import { Link } from "react-router-dom";

function AddPlan() {
  console.log("add plan");

  return (
    <div>
      <p>This is AddPlan page</p>

      <Link to="/DisplayPlan">
        <button>DisplayPlan</button>
      </Link>
    </div>
  );
}



export default AddPlan;

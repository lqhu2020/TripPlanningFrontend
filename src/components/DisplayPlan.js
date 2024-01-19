import { Button, Space } from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DisplayPlanMap from "./DisplayPlanMap";
import DisplayPlanTabs from "./DisplayPlanTabs";

function DisplayPlan() {
  const [generatedTrips, setGeneratedTrips] = useState();

  useEffect(() => {
    const tempTrips = JSON.parse(localStorage.getItem("trips"));
    if (tempTrips) {
      setGeneratedTrips(tempTrips);
    }
  }, []);

  console.log(generatedTrips);

  const addToSavedPlans = () => {
    console.log("plan added!");
  };

  const homeButtonStyle = {
    position: "absolute",
    right: "0",
    padding: "40px",
  };

  const editButtonStyle = {
    paddingTop: "10vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={homeButtonStyle}>
        <Link to="/Home">
          <Button>Home</Button>
        </Link>
      </div>
      <h1>Plan 1</h1>
      <div style={{ display: "flex", width: "100%" }}>
        <DisplayPlanMap />
        <div style={{ paddingLeft: "10vw" }}>
          <DisplayPlanTabs />
        </div>
      </div>
      <Space style={editButtonStyle}>
        <span>
          <Link to="/AddPlan">
            <Button onClick={addToSavedPlans}>Edit Plans</Button>
          </Link>
        </span>
        <span>
          <Button type="primary" onClick={addToSavedPlans}>
            Add To Saved Plans
          </Button>
        </span>
      </Space>
    </div>
  );
}

export default DisplayPlan;

import { Button, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function DisplayPlan() {
  console.log("display plan");

  const addToSavedPlans = () => {
    console.log("plan added!")
  }

  return (
    <div>
      <div>
        <Link to="/Home">
          <Button>Home</Button>
        </Link>
      </div>
      <Space>
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

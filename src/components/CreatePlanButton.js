import React, { Component, createRef } from "react";
import { Modal, Button, message } from "antd";
import { Link } from "react-router-dom";

function CreatePlanButton(props) {
    const routeChange = () => {
        
    }

    return (
        <div>
            <Link to="/AddPlan">
                <Button type="primary" onClick={routeChange}>
                    Create New Plans
                </Button>
            </Link>
        </div>
    )
}
export default CreatePlanButton
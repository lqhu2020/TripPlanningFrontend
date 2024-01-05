import React from "react";
import { Button } from "antd";
// import { Form, Input, Button, message } from "antd";
// import axios from "axios";

// import { BASE_URL } from "../constants";

function Register(props) {
  function toLoggin(props) {
    console.log("Registration succeed!");
    props.history.push("/login");
  }
  return (
    <Button className="register-btn" onClick={() => toLoggin(props)}>
      Log in
    </Button>
  );
}

export default Register;

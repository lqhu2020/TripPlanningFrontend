import React from "react";
import { Button, Divider } from "antd";
// import { Form, Input, Button, message } from "antd";
// import { UserOutlined, LockOutlined } from "@ant-design/icons";
// import { Link } from "react-router-dom";
// import axios from "axios";

import { BASE_URL } from "../constants";

function Login({ handleLoggedIn }) {
  return (
    
    <Button className="login-form-button" onClick={handleLoggedIn}>
      Log in
    </Button>
  );
}

export default Login;

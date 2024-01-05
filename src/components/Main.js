import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router";

import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import AddPlan from "./AddPlan";
import DisplayPlan from "./DisplayPlan";

// main is use to direct different web pages
function Main({ isLoggedIn, handleLoggedIn }) {
  const showLogin = () => {
    return isLoggedIn ? (
      <Redirect to="/home" />
    ) : (
      <Login handleLoggedIn={handleLoggedIn} />
    );
  };

  const showHome = () => {
    return isLoggedIn ? <Home /> : <Redirect to="/login" />;
  };

  return (
    <div className="main">
      <Switch>
        <Route path="/" exact render={showLogin} />
        <Route path="/login" render={showLogin} />
        <Route path="/register" component={Register} />
        <Route path="/home" render={showHome} />
        <Route path="/addplan" component={AddPlan} />
        <Route path="/displayplan" component={DisplayPlan} />
      </Switch>
    </div>
  );
}

export default Main;

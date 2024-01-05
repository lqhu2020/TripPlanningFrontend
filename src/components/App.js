import React, { useState } from "react";
import TopBar from "./TopBar";
import Main from "./Main";

// import { TOKEN_KEY } from "../constants";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = () => {
    console.log("log out");
    setIsLoggedIn(false);
  };

  const loggedIn = () => {
    console.log("log in");
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <TopBar isLoggedIn={isLoggedIn} handleLogout={logout} />
      <Main isLoggedIn={isLoggedIn} handleLoggedIn={loggedIn} />
    </div>
  );
}

export default App;

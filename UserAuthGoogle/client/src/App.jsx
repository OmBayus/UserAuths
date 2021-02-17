import React from "react"
import {
  Switch,
  Route
} from "react-router-dom";

import Login from "./components/Login"
import Register from "./components/Register"
import Main from "./components/Main"

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Login/>
      </Route>
      <Route path="/register">
        <Register/>
      </Route>
      <Route path="/main">
        <Main/>
      </Route>
    </Switch>
  );
}

export default App;
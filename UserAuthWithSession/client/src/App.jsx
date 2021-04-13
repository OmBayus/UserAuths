import React from "react"
import {
  Switch,
  Route
} from "react-router-dom";

import Login from "./Login"
import Main from "./Main"

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Login/>
      </Route>
      <Route path="/main">
        <Main/>
      </Route>
    </Switch>
  );
}

export default App;

import React from "react"
import {
  Switch,
  Route
} from "react-router-dom";
import { ApolloClient, InMemoryCache , ApolloProvider } from '@apollo/client';

//Components
import Login from "./Login"
import Main from "./Main"

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Switch>
        <Route path="/" exact>
          <Login/>
        </Route>
        <Route path="/main">
          <Main/>
        </Route>
      </Switch>
    </ApolloProvider>
  );
}

export default App;

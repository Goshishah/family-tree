import React from "react";
import AppTree from "./AppTree";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "./styles.css";

export default function App() {
  return (
    <ChakraProvider>
      <Router>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <AppTree />
          </Route>
          <Route path="/admin">
            <AppTree readOnly={false} />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

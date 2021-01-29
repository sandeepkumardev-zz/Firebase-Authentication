import React from "react";
import SignInPage from "./auth/SignInPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import SignUpPage from "./auth/SignUpPage";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={SignInPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default App;

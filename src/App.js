import React from "react";
import SignInPage from "./auth/SignInPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import SignUpPage from "./auth/SignUpPage";
import ErrorPage from "./components/ErrorPage";
import { useData } from "./contexts";

function App() {
  const { data } = useData();
  React.useEffect(() => {
    console.log(data);
  }, [data]);
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

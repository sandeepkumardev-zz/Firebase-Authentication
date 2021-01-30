import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import DashboardPage from "../Dashboard";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import ErrorPage from "../Error";
import { auth, useData } from "../../firebase";
import * as ROUTES from "../../constants/routes";

function App() {
  const { dispatch } = useData();
  console.log(auth);
  React.useEffect(() => {
    if (auth) {
      dispatch({ type: "ADD_USER", auth });
    }
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.DASHBOARD} component={DashboardPage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default App;

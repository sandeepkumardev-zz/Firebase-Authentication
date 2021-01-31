import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import DashboardPage from "../Dashboard";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import Navigation from "../Navigation";
import ErrorPage from "../Error";
import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";

function App() {
  return (
    <Router>
      <Navigation />
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

export default withAuthentication(App);

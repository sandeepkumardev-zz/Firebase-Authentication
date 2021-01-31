import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import CssBaseline from "@material-ui/core/CssBaseline";

const Landing = () => {
  return (
    <div>
      Landing <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      <CssBaseline />
    </div>
  );
};

export default Landing;

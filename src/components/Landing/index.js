import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { Button, makeStyles, Typography } from "@material-ui/core";
import AuthUserContext from "../Session/context";

const useStyle = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    "& *, *::before, *::after": {
      textDecoration: "none",
    },
    "& .MuiTypography-h1": {
      fontFamily: "Acme, sans-serif",
      fontSize: "80px",
      margin: "50px 0",
    },
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  authButton: {
    margin: "15px",
    fontWeight: "bold",
  },
  dashboard: {
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "#9826C8",
    "&:hover": {
      backgroundColor: "#7B1FA2",
    },
  },
}));

const Landing = () => {
  const classes = useStyle();
  const { authUser } = React.useContext(AuthUserContext);
  return (
    <div className={classes.root}>
      <Typography variant="h1">
        Welcome {authUser && authUser.displayName}
      </Typography>
      {authUser ? <Dashboard /> : <AuthButton />}
    </div>
  );
};

function AuthButton() {
  const classes = useStyle();
  return (
    <div>
      <Link to={ROUTES.SIGN_IN}>
        <Button
          className={classes.authButton}
          variant="contained"
          color="primary"
        >
          Sign In
        </Button>
      </Link>
      <Link to={ROUTES.SIGN_UP}>
        <Button
          className={classes.authButton}
          variant="outlined"
          color="primary"
        >
          Sign Up
        </Button>
      </Link>
    </div>
  );
}

function Dashboard() {
  const classes = useStyle();
  return (
    <Link to={ROUTES.DASHBOARD}>
      <Button className={classes.dashboard}>Dashboard</Button>
    </Link>
  );
}

export default Landing;

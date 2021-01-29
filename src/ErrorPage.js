import { Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  link: {
    textDecoration: "none",
  },
}));

function ErrorPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h2" component="h1">
        🤷‍♂️ Page not found!
      </Typography>
      <br />
      <Typography variant="h6">
        <Link className={classes.link} to="/">
          👉 Go to home.
        </Link>
      </Typography>
    </div>
  );
}

export default ErrorPage;

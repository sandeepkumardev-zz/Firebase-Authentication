import {
  Avatar,
  Button,
  FormControl,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    width: "270px",
    padding: theme.spacing(3),
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  form: {
    width: "100%",
    marginBottom: "8px",
  },
  input: {
    margin: "8px 0",
  },
  link: {
    textDecoration: "none",
    color: "#25317F",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: "#25317F",
  },
  header: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: "25px",
    "& .MuiTypography-h5": {
      fontWeight: "bold",
      fontFamily: "Acme, sans-serif",
      color: "#25317F",
    },
  },
}));

function SignUpPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={10} className={classes.paper}>
        <div className={classes.header}>
          <Avatar className={classes.large}>
            <LockIcon />
          </Avatar>
          <Typography variant="h5">Sign Up</Typography>
        </div>
        <FormControl className={classes.form}>
          <TextField
            className={classes.input}
            label="Name"
            variant="outlined"
          />
          <TextField
            className={classes.input}
            label="Email"
            variant="outlined"
          />
          <TextField
            className={classes.input}
            label="Password"
            variant="outlined"
          />
          <TextField
            className={classes.input}
            label="Confirm Password"
            variant="outlined"
          />
          <Button className={classes.input} variant="contained" color="primary">
            Sign Up
          </Button>
        </FormControl>
        <Typography variant="subtitle2" component="p">
          Already have an account{" "}
          <Link className={classes.link} to="/signin">
            SignIn
          </Link>
        </Typography>
      </Paper>
    </div>
  );
}

export default SignUpPage;

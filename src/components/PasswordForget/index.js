import {
  Avatar,
  Button,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useForm } from "react-hook-form";
import { PasswordReset } from "../../firebase";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  paper: { margin: "10px", maxWidth: "320px", padding: theme.spacing(3) },
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
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: "#25317F",
  },
  input: {
    margin: "10px 0 10px 0",
    width: "100%",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
  link: {
    textDecoration: "none",
    color: "#25317F",
  },
}));

const PasswordForget = () => {
  const classes = useStyle();
  const [error, seterror] = React.useState(null);
  const [msg, setmsg] = React.useState(null);
  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = (data) => {
    PasswordReset(data.email)
      .then(() => {
        reset();
        seterror(null);
        setmsg("Check your email.");
      })
      .catch((err) => {
        setmsg(null);
        seterror(err.message);
      });
  };
  return (
    <div className={classes.root}>
      <Paper elevation={10} className={classes.paper}>
        <div className={classes.header}>
          <Avatar className={classes.large}>
            <VpnKeyIcon />
          </Avatar>
          <Typography variant="h5">Forget Password</Typography>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            name="email"
            inputRef={register({
              required: "Email is empty!",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span className={classes.error}>{errors.email.message}</span>
          )}
          {msg && (
            <span style={{ textDecoration: "none", color: "green" }}>
              {msg}
            </span>
          )}
          {error && <span className={classes.error}>{error}</span>}
          <Button
            type="submit"
            className={classes.input}
            variant="contained"
            color="primary"
          >
            Send reset email
          </Button>
        </form>
        <Typography variant="subtitle2" component="p">
          Try again{" "}
          <Link className={classes.link} to={ROUTES.SIGN_IN}>
            SignIn
          </Link>
        </Typography>
      </Paper>
    </div>
  );
};

export default PasswordForget;

import { Avatar, Button, Paper, Typography } from "@material-ui/core";
import React from "react";
import {
  IconButton,
  OutlinedInput,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import { signIn, user } from "../../firebase/firebase";
import { useForm } from "react-hook-form";
import * as ROUTES from "../../constants/routes";
import withSignIn_Up from "../Session/withSignIn_Up";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    "& .firebaseui-idp-google>.firebaseui-idp-text": {
      color: "#25317F",
    },
    "& ul": {
      marginBlockEnd: "0px",
    },
    "& .firebaseui-idp-list>.firebaseui-list-item": {
      marginBottom: "0px",
    },
  },
  lable: {
    padding: "0px 5px",
    backgroundColor: "#fff",
  },
  paper: { margin: "10px", maxWidth: "320px", padding: theme.spacing(3) },
  form: {
    width: "100%",
    marginBottom: "8px",
  },
  input: {
    margin: "10px 0 0 0",
    width: "100%",
  },
  inputb: {
    margin: "5px 0 0 0",
    width: "100%",
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
  error: {
    color: "red",
    fontSize: "14px",
  },
}));

var uiConfig = {
  signInFlow: "popup",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: (authResult) => {
      const newUser = authResult.additionalUserInfo.isNewUser;
      const { displayName, email, photoURL, uid } = authResult.user;
      if (newUser) {
        user(uid).set({
          name: displayName,
          email,
          photoURL,
        });
      }
      return false;
    },
  },
};

function SignInPage() {
  const [error, seterror] = React.useState(null);
  const classes = useStyles();
  const { register, handleSubmit, errors, reset } = useForm();
  const [showPassword, setshowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = (data) => {
    const { email, password } = data;
    signIn(email, password)
      .then(() => {
        seterror(null);
        reset();
      })
      .catch((err) => {
        seterror(err);
      });
  };

  return (
    <div className={classes.root}>
      <Paper elevation={10} className={classes.paper}>
        <div className={classes.header}>
          <Avatar className={classes.large}>
            <LockIcon />
          </Avatar>
          <Typography variant="h5">Sign In</Typography>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classes.form}
          noValidate
        >
          <TextField
            className={classes.input}
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
          <FormControl className={classes.input} variant="outlined">
            <InputLabel
              className={classes.lable}
              htmlFor="outlined-adornment-password"
            >
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              // type={showPassword ? "text" : "password"}
              name="password"
              inputRef={register({
                required: "Password is empty!",
                minLength: { value: 6, message: "Too short" },
              })}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {errors.password && (
            <span className={classes.error}>{errors.password.message}</span>
          )}
          <Button
            type="submit"
            className={classes.input}
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
          {error && <span className={classes.error}>{error.message}</span>}
        </form>

        <Typography variant="subtitle2" component="p">
          <Link className={classes.link} to={ROUTES.PASSWORD_FORGET}>
            Forget Password
          </Link>
        </Typography>
        <Typography variant="subtitle2" component="p">
          Don't have an account{" "}
          <Link className={classes.link} to={ROUTES.SIGN_UP}>
            Sign Up
          </Link>
        </Typography>
        <hr />
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </Paper>
    </div>
  );
}

export default withSignIn_Up(SignInPage);

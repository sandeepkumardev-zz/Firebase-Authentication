import { Avatar, Button, Paper, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import { auth } from "../../firebase";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .firebaseui-idp-google>.firebaseui-idp-text": {
      color: "#25317F",
    },
  },
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
    marginLeft: "10px",
  },
}));

var uiConfig = {
  signInFlow: "popup",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: async (authResult) => {
      const userInfo = authResult.additionalUserInfo;
      if (userInfo.isNewUser && userInfo.providerId === "password") {
        try {
          await authResult.user.sendEmailVerification();
          console.log("Check your email.");
        } catch (e) {
          console.log(e);
        }
      }
      return false;
    },
  },
};

function SignInPage(props) {
  const classes = useStyles();
  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  React.useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        props.history.push("/");
      }
    });
  }, [props.history]);

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
          <TextField
            className={classes.input}
            label="Password"
            variant="outlined"
            name="password"
            inputRef={register({
              required: "Password is empty!",
              minLength: { value: 6, message: "Too short" },
            })}
          />
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
        </form>
        <Typography variant="subtitle2" component="p">
          <Link className={classes.link} to="/forget-password">
            Forget Password
          </Link>
        </Typography>
        <Typography variant="subtitle2" component="p">
          Don't have an account{" "}
          <Link className={classes.link} to="/signup">
            Sign Up
          </Link>
        </Typography>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </Paper>
    </div>
  );
}

export default withRouter(SignInPage);
